/* =========================================================
   HOME - CAMPAIGN LAB
========================================================= */

if (document.body.classList.contains("home-page")) {
  const systemCards = document.querySelectorAll(".system-card");
  const profileButtons = document.querySelectorAll(".profile-btn");

  const selectedSystemText = document.getElementById("selectedSystem");
  const previewSystem = document.getElementById("previewSystem");
  const previewProfile = document.getElementById("previewProfile");
  const previewCampaign = document.getElementById("previewCampaign");

  const campaignInput = document.getElementById("campaign");
  const loginForm = document.getElementById("loginForm");

  const lastCampaignTitle = document.getElementById("lastCampaignTitle");
  const lastPlayersCount = document.getElementById("lastPlayersCount");
  const lastSessionsCount = document.getElementById("lastSessionsCount");
  const lastSheetsCount = document.getElementById("lastSheetsCount");
  const lastItemsCount = document.getElementById("lastItemsCount");

  const lastCampaign = JSON.parse(localStorage.getItem("lastCampaign"));

  if (lastCampaign) {
    if (lastCampaignTitle) lastCampaignTitle.textContent = lastCampaign.name;
    if (lastPlayersCount) lastPlayersCount.textContent = lastCampaign.players;
    if (lastSessionsCount) lastSessionsCount.textContent = lastCampaign.sessions;
    if (lastSheetsCount) lastSheetsCount.textContent = lastCampaign.sheets;
    if (lastItemsCount) lastItemsCount.textContent = lastCampaign.items;
  }

  let selectedSystem = "";
  let selectedProfile = "Mestre";

  localStorage.removeItem("system");
  localStorage.removeItem("profile");
  localStorage.removeItem("campaignName");
  localStorage.removeItem("campaignId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");

  systemCards.forEach((card) => {
    card.addEventListener("click", () => {
      systemCards.forEach((item) => item.classList.remove("active"));
      card.classList.add("active");

      selectedSystem = card.dataset.system;

      if (selectedSystemText) selectedSystemText.textContent = selectedSystem;
      if (previewSystem) previewSystem.textContent = selectedSystem;
    });
  });

  profileButtons.forEach((button) => {
    button.addEventListener("click", () => {
      profileButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      selectedProfile = button.dataset.profile;

      if (previewProfile) previewProfile.textContent = selectedProfile;
    });
  });

  if (campaignInput && previewCampaign) {
    campaignInput.addEventListener("input", () => {
      previewCampaign.textContent = campaignInput.value || "---";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      if (!selectedSystem) {
        alert("Escolha um sistema antes de entrar.");
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const campaignName = campaignInput.value.trim();

      if (!name || !email || !password || !campaignName) {
        alert("Preencha todos os campos.");
        return;
      }

      try {
        const user = await loginOrCreateUser(email, password, name);

        const campaign = await getOrCreateCampaign({
          name: campaignName,
          system: selectedSystem,
          profile: selectedProfile,
          userId: user.id,
        });

        await saveCampaignMember({
          campaignId: campaign.id,
          userId: user.id,
          profile: selectedProfile,
          displayName: name,
          email,
        });

        const lastCampaignData = {
          id: campaign.id,
          name: campaign.name,
          system: selectedSystem,
          profile: selectedProfile,
          players: "01",
          sessions: "00",
          sheets: "00",
          items: "00",
        };

        localStorage.setItem("lastCampaign", JSON.stringify(lastCampaignData));

        localStorage.setItem("system", selectedSystem);
        localStorage.setItem("profile", selectedProfile);
        localStorage.setItem("campaignName", campaign.name);
        localStorage.setItem("campaignId", campaign.id);
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", user.id);

        if (selectedSystem === "Altherium" && selectedProfile === "Mestre") {
          window.location.href = "altherium-mestre.html";
          return;
        }

        if (selectedSystem === "Altherium" && selectedProfile === "Jogador") {
          window.location.href = "altherium-jogador.html";
          return;
        }

        if (selectedSystem === "D&D" && selectedProfile === "Mestre") {
          window.location.href = "dnd-mestre.html";
          return;
        }

        if (selectedSystem === "D&D" && selectedProfile === "Jogador") {
          window.location.href = "dnd-jogador.html";
          return;
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }
}

/* =========================================================
   SUPABASE - LOGIN E CAMPANHAS
========================================================= */

async function loginOrCreateUser(email, password, name) {
  let { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (!error && data.user) {
    return data.user;
  }

  const signUpResult = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  if (signUpResult.error) {
    throw new Error(signUpResult.error.message);
  }

  if (!signUpResult.data.user) {
    throw new Error("Não foi possível criar o usuário.");
  }

  if (!signUpResult.data.session) {
    throw new Error(
      "Conta criada. Confirme seu e-mail antes de entrar, ou desative a confirmação de e-mail no Supabase durante os testes."
    );
  }

  return signUpResult.data.user;
}

async function getOrCreateCampaign({ name, system, profile, userId }) {
  if (profile === "Mestre") {
    const { data: existingCampaigns, error: searchError } = await supabaseClient
      .from("campaigns")
      .select("*")
      .eq("name", name)
      .eq("system", system)
      .eq("master_id", userId)
      .limit(1);

    if (searchError) {
      throw new Error(searchError.message);
    }

    if (existingCampaigns.length > 0) {
      return existingCampaigns[0];
    }

    const { data: createdCampaign, error: createError } = await supabaseClient
      .from("campaigns")
      .insert({
        name,
        system,
        master_id: userId,
      })
      .select()
      .single();

    if (createError) {
      throw new Error(createError.message);
    }

    return createdCampaign;
  }

  const { data: foundCampaigns, error: findError } = await supabaseClient
    .from("campaigns")
    .select("*")
    .eq("name", name)
    .eq("system", system)
    .limit(1);

  if (findError) {
    throw new Error(findError.message);
  }

  if (!foundCampaigns || foundCampaigns.length === 0) {
    throw new Error("Campanha não encontrada. Verifique o nome com o mestre.");
  }

  return foundCampaigns[0];
}

async function saveCampaignMember({
  campaignId,
  userId,
  profile,
  displayName,
  email,
}) {
  const { error } = await supabaseClient.from("campaign_members").upsert(
    {
      campaign_id: campaignId,
      user_id: userId,
      profile,
      display_name: displayName,
      email,
    },
    {
      onConflict: "campaign_id,user_id",
    }
  );

  if (error) {
    throw new Error(error.message);
  }
}

/* =========================================================
   ALTHERIUM - PAINEL DO MESTRE
========================================================= */

if (document.body.classList.contains("altherium-page")) {
  const system = localStorage.getItem("system");
  const profile = localStorage.getItem("profile");

  if (system !== "Altherium" || profile !== "Mestre") {
    alert("Acesso negado. Escolha Altherium e perfil Mestre na página inicial.");
    window.location.href = "index.html";
  } else {
    const players = [];
    const sheets = [];
    const monsters = [];

    const modal = document.getElementById("altheriumModal");
    const modalTitle = document.getElementById("altheriumModalTitle");
    const formFields = document.getElementById("altheriumFormFields");
    const mainForm = document.getElementById("altheriumForm");

    const playersGrid = document.getElementById("playersGrid");
    const sheetsGrid = document.getElementById("sheetsGrid");
    const monsterGrid = document.getElementById("monsterGrid");

    const onlineCount = document.getElementById("onlineCount");
    const sheetCount = document.getElementById("sheetCount");
    const monsterCount = document.getElementById("monsterCount");

    let currentMode = "";

    function updateCounters() {
      onlineCount.textContent = players.length;
      sheetCount.textContent = sheets.length;
      monsterCount.textContent = monsters.length;
    }

    function renderPlayers() {
      if (players.length === 0) {
        playersGrid.innerHTML = `
          <div class="altherium-empty">
            <h3>Nenhum player adicionado</h3>
            <p>Use o botão acima para adicionar o primeiro player.</p>
          </div>
        `;
        return;
      }

      playersGrid.innerHTML = players
        .map(
          (player, index) => `
            <div class="altherium-card">
              <h3>${player.nome}</h3>
              <p>Personagem: ${player.personagem}</p>
              <div class="altherium-actions">
                <button data-delete-player="${index}">Excluir</button>
              </div>
            </div>
          `
        )
        .join("");
    }

    function renderSheets() {
      if (sheets.length === 0) {
        sheetsGrid.innerHTML = `
          <div class="altherium-empty">
            <h3>Nenhuma ficha criada</h3>
            <p>Use o botão acima para criar a primeira ficha.</p>
          </div>
        `;
        return;
      }

      sheetsGrid.innerHTML = sheets
        .map(
          (sheet, index) => `
            <div class="altherium-card">
              <h3>${sheet.nome}</h3>
              <p>Raiz: ${sheet.raiz}</p>
              <div class="altherium-actions">
                <button data-delete-sheet="${index}">Excluir</button>
              </div>
            </div>
          `
        )
        .join("");
    }

    function renderMonsters() {
      if (monsters.length === 0) {
        monsterGrid.innerHTML = `
          <div class="altherium-empty">
            <h3>Nenhuma criatura cadastrada</h3>
            <p>Use o botão acima para cadastrar a primeira criatura.</p>
          </div>
        `;
        return;
      }

      monsterGrid.innerHTML = monsters
        .map(
          (monster, index) => `
            <div class="altherium-card">
              <h3>${monster.nome}</h3>
              <p>Tipo: ${monster.tipo}</p>
              <div class="altherium-actions">
                <button data-delete-monster="${index}">Excluir</button>
              </div>
            </div>
          `
        )
        .join("");
    }

    function renderAll() {
      renderPlayers();
      renderSheets();
      renderMonsters();
      updateCounters();
    }

    function openModal(type) {
      currentMode = type;
      modal.classList.add("active");
      mainForm.reset();

      if (type === "player") {
        modalTitle.textContent = "Novo Player";
        formFields.innerHTML = `
          <input name="nome" placeholder="Nome do player" required />
          <input name="personagem" placeholder="Nome do personagem" required />
        `;
      }

      if (type === "sheet") {
        modalTitle.textContent = "Nova Ficha";
        formFields.innerHTML = `
          <input name="nome" placeholder="Nome do personagem" required />
          <select name="raiz" required>
            <option value="Berserker">Berserker</option>
            <option value="Runaskin">Runaskin</option>
            <option value="Pilar">Pilar</option>
          </select>
        `;
      }

      if (type === "monster") {
        modalTitle.textContent = "Nova Criatura";
        formFields.innerHTML = `
          <input name="nome" placeholder="Nome da criatura" required />
          <input name="tipo" placeholder="Tipo da criatura" required />
        `;
      }
    }

    function closeModal() {
      modal.classList.remove("active");
      currentMode = "";
      mainForm.reset();
    }

    mainForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = Object.fromEntries(new FormData(mainForm));

      if (currentMode === "player") players.push(data);
      if (currentMode === "sheet") sheets.push(data);
      if (currentMode === "monster") monsters.push(data);

      closeModal();
      renderAll();
    });

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest("[data-clear-access]")) {
        clearAccess();
      }

      if (target.dataset.openModal) {
        openModal(target.dataset.openModal);
      }

      if (target.dataset.closeModal !== undefined) {
        closeModal();
      }

      if (target.classList.contains("altherium-modal")) {
        closeModal();
      }

      if (target.dataset.deletePlayer !== undefined) {
        players.splice(Number(target.dataset.deletePlayer), 1);
        renderAll();
      }

      if (target.dataset.deleteSheet !== undefined) {
        sheets.splice(Number(target.dataset.deleteSheet), 1);
        renderAll();
      }

      if (target.dataset.deleteMonster !== undefined) {
        monsters.splice(Number(target.dataset.deleteMonster), 1);
        renderAll();
      }

      handleTabs(target);
    });

    renderAll();
  }
}

/* =========================================================
   ALTHERIUM - PAINEL DO JOGADOR
========================================================= */

if (document.body.classList.contains("altherium-player-page")) {
  const system = localStorage.getItem("system");
  const profile = localStorage.getItem("profile");
  const userName = localStorage.getItem("userName");
  const campaignName = localStorage.getItem("campaignName");

  if (system !== "Altherium" || profile !== "Jogador") {
    alert("Acesso negado. Escolha Altherium e perfil Jogador na página inicial.");
    window.location.href = "index.html";
  } else {
    const playerNameView = document.getElementById("playerNameView");
    const campaignNameView = document.getElementById("campaignNameView");
    const playerSheetForm = document.getElementById("playerSheetForm");
    const savePlayerSheet = document.getElementById("savePlayerSheet");

    const storageKey = `altherium-sheet-${userName}-${campaignName}`;

    if (playerNameView) playerNameView.textContent = userName || "---";
    if (campaignNameView) campaignNameView.textContent = campaignName || "---";

    function loadPlayerSheet() {
      const savedSheet = localStorage.getItem(storageKey);
      if (!savedSheet) return;

      const sheetData = JSON.parse(savedSheet);

      Object.keys(sheetData).forEach((key) => {
        const field = playerSheetForm.elements[key];
        if (field) field.value = sheetData[key];
      });
    }

    function saveSheet(showAlert = true) {
      const formData = new FormData(playerSheetForm);
      const sheetData = Object.fromEntries(formData);

      localStorage.setItem(storageKey, JSON.stringify(sheetData));

      if (showAlert) alert("Ficha salva com sucesso.");
    }

    if (savePlayerSheet) {
      savePlayerSheet.addEventListener("click", () => {
        saveSheet(true);
      });
    }

    if (playerSheetForm) {
      playerSheetForm.addEventListener("input", () => {
        saveSheet(false);
      });
    }

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest("[data-clear-access]")) {
        clearAccess();
      }
    });

    loadPlayerSheet();
  }
}

/* =========================================================
   D&D - PAINEL DO MESTRE
========================================================= */

if (document.body.classList.contains("dnd-master-page")) {
  const system = localStorage.getItem("system");
  const profile = localStorage.getItem("profile");

  if (system !== "D&D" || profile !== "Mestre") {
    alert("Acesso negado. Escolha D&D e perfil Mestre na página inicial.");
    window.location.href = "index.html";
  } else {
    const dndPlayers = [];
    const dndCharacters = [];
    const dndMonsters = [];

    const dndModal = document.getElementById("dndModal");
    const dndModalTitle = document.getElementById("dndModalTitle");
    const dndFormFields = document.getElementById("dndFormFields");
    const dndForm = document.getElementById("dndForm");

    const dndPlayersGrid = document.getElementById("dndPlayersGrid");
    const dndCharactersGrid = document.getElementById("dndCharactersGrid");
    const dndMonstersGrid = document.getElementById("dndMonstersGrid");

    const dndPlayerCount = document.getElementById("dndPlayerCount");
    const dndCharacterCount = document.getElementById("dndCharacterCount");
    const dndMonsterCount = document.getElementById("dndMonsterCount");

    let currentDndMode = "";

    function updateDndCounters() {
      dndPlayerCount.textContent = dndPlayers.length;
      dndCharacterCount.textContent = dndCharacters.length;
      dndMonsterCount.textContent = dndMonsters.length;
    }

    function renderDndPlayers() {
      if (dndPlayers.length === 0) {
        dndPlayersGrid.innerHTML = `
          <div class="altherium-empty">
            <h3>Nenhum player adicionado</h3>
            <p>Use o botão acima para adicionar o primeiro player.</p>
          </div>
        `;
        return;
      }

      dndPlayersGrid.innerHTML = dndPlayers
        .map(
          (player, index) => `
            <div class="altherium-card">
              <h3>${player.nome}</h3>
              <p>Personagem: ${player.personagem}</p>
              <div class="altherium-actions">
                <button data-delete-dnd-player="${index}">Excluir</button>
              </div>
            </div>
          `
        )
        .join("");
    }

    function renderDndCharacters() {
      if (dndCharacters.length === 0) {
        dndCharactersGrid.innerHTML = `
          <div class="altherium-empty">
            <h3>Nenhum personagem criado</h3>
            <p>Use o botão acima para criar o primeiro personagem.</p>
          </div>
        `;
        return;
      }

      dndCharactersGrid.innerHTML = dndCharacters
        .map(
          (character, index) => `
            <div class="altherium-card">
              <h3>${character.nome}</h3>
              <p>Classe: ${character.classe}</p>
              <p>Raça: ${character.raca}</p>
              <p>Nível: ${character.nivel}</p>
              <div class="altherium-actions">
                <button data-delete-dnd-character="${index}">Excluir</button>
              </div>
            </div>
          `
        )
        .join("");
    }

    function renderDndMonsters() {
      if (dndMonsters.length === 0) {
        dndMonstersGrid.innerHTML = `
          <div class="altherium-empty">
            <h3>Nenhum monstro cadastrado</h3>
            <p>Use o botão acima para cadastrar o primeiro monstro.</p>
          </div>
        `;
        return;
      }

      dndMonstersGrid.innerHTML = dndMonsters
        .map(
          (monster, index) => `
            <div class="altherium-card">
              <h3>${monster.nome}</h3>
              <p>Tipo: ${monster.tipo}</p>
              <p>ND: ${monster.nd}</p>
              <p>PV: ${monster.pv}</p>
              <div class="altherium-actions">
                <button data-delete-dnd-monster="${index}">Excluir</button>
              </div>
            </div>
          `
        )
        .join("");
    }

    function renderAllDnd() {
      renderDndPlayers();
      renderDndCharacters();
      renderDndMonsters();
      updateDndCounters();
    }

    function openDndModal(type) {
      currentDndMode = type;
      dndModal.classList.add("active");
      dndForm.reset();

      if (type === "player") {
        dndModalTitle.textContent = "Novo Player";
        dndFormFields.innerHTML = `
          <input name="nome" placeholder="Nome do player" required />
          <input name="personagem" placeholder="Nome do personagem" required />
        `;
      }

      if (type === "character") {
        dndModalTitle.textContent = "Novo Personagem";
        dndFormFields.innerHTML = `
          <input name="nome" placeholder="Nome do personagem" required />

          <select name="classe" required>
            <option value="Bárbaro">Bárbaro</option>
            <option value="Bardo">Bardo</option>
            <option value="Bruxo">Bruxo</option>
            <option value="Clérigo">Clérigo</option>
            <option value="Druida">Druida</option>
            <option value="Feiticeiro">Feiticeiro</option>
            <option value="Guerreiro">Guerreiro</option>
            <option value="Ladino">Ladino</option>
            <option value="Mago">Mago</option>
            <option value="Monge">Monge</option>
            <option value="Paladino">Paladino</option>
            <option value="Patrulheiro">Patrulheiro</option>
          </select>

          <input name="raca" placeholder="Raça. Ex: Humano, Elfo, Anão" required />
          <input name="nivel" type="number" min="1" value="1" placeholder="Nível" required />
        `;
      }

      if (type === "monster") {
        dndModalTitle.textContent = "Novo Monstro";
        dndFormFields.innerHTML = `
          <input name="nome" placeholder="Nome do monstro" required />
          <input name="tipo" placeholder="Tipo. Ex: Morto-vivo, Dragão" required />
          <input name="nd" placeholder="ND. Ex: 1/4, 1, 5, 10" required />
          <input name="pv" type="number" min="1" placeholder="Pontos de vida" required />
        `;
      }
    }

    function closeDndModal() {
      dndModal.classList.remove("active");
      currentDndMode = "";
      dndForm.reset();
    }

    dndForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = Object.fromEntries(new FormData(dndForm));

      if (currentDndMode === "player") dndPlayers.push(data);
      if (currentDndMode === "character") dndCharacters.push(data);
      if (currentDndMode === "monster") dndMonsters.push(data);

      closeDndModal();
      renderAllDnd();
    });

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest("[data-clear-access]")) {
        clearAccess();
      }

      if (target.dataset.openDndModal) {
        openDndModal(target.dataset.openDndModal);
      }

      if (target.dataset.closeDndModal !== undefined) {
        closeDndModal();
      }

      if (target.classList.contains("altherium-modal")) {
        closeDndModal();
      }

      if (target.dataset.deleteDndPlayer !== undefined) {
        dndPlayers.splice(Number(target.dataset.deleteDndPlayer), 1);
        renderAllDnd();
      }

      if (target.dataset.deleteDndCharacter !== undefined) {
        dndCharacters.splice(Number(target.dataset.deleteDndCharacter), 1);
        renderAllDnd();
      }

      if (target.dataset.deleteDndMonster !== undefined) {
        dndMonsters.splice(Number(target.dataset.deleteDndMonster), 1);
        renderAllDnd();
      }

      handleTabs(target);
    });

    renderAllDnd();
  }
}

/* =========================================================
   D&D - PAINEL DO JOGADOR
========================================================= */

if (document.body.classList.contains("dnd-player-page")) {
  const system = localStorage.getItem("system");
  const profile = localStorage.getItem("profile");
  const userName = localStorage.getItem("userName");
  const campaignName = localStorage.getItem("campaignName");

  if (system !== "D&D" || profile !== "Jogador") {
    alert("Acesso negado. Escolha D&D e perfil Jogador na página inicial.");
    window.location.href = "index.html";
  } else {
    const playerNameView = document.getElementById("dndPlayerNameView");
    const campaignNameView = document.getElementById("dndCampaignNameView");
    const playerSheetForm = document.getElementById("dndPlayerSheetForm");
    const saveDndSheet = document.getElementById("saveDndSheet");

    const storageKey = `dnd-sheet-${userName}-${campaignName}`;

    if (playerNameView) playerNameView.textContent = userName || "---";
    if (campaignNameView) campaignNameView.textContent = campaignName || "---";

    function loadDndSheet() {
      const savedSheet = localStorage.getItem(storageKey);
      if (!savedSheet) return;

      const sheetData = JSON.parse(savedSheet);

      Object.keys(sheetData).forEach((key) => {
        const field = playerSheetForm.elements[key];
        if (field) field.value = sheetData[key];
      });
    }

    function saveDndSheetData(showAlert = true) {
      const formData = new FormData(playerSheetForm);
      const sheetData = Object.fromEntries(formData);

      localStorage.setItem(storageKey, JSON.stringify(sheetData));

      if (showAlert) alert("Ficha de D&D salva com sucesso.");
    }

    if (saveDndSheet) {
      saveDndSheet.addEventListener("click", () => {
        saveDndSheetData(true);
      });
    }

    if (playerSheetForm) {
      playerSheetForm.addEventListener("input", () => {
        saveDndSheetData(false);
      });
    }

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest("[data-clear-access]")) {
        clearAccess();
      }
    });

    loadDndSheet();
  }
}

/* =========================================================
   FUNÇÕES GLOBAIS
========================================================= */

function clearAccess() {
  localStorage.removeItem("system");
  localStorage.removeItem("profile");
  localStorage.removeItem("campaignName");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
}

function handleTabs(target) {
  if (!target.classList.contains("altherium-tab")) {
    return;
  }

  document
    .querySelectorAll(".altherium-tab")
    .forEach((button) => button.classList.remove("active"));

  document
    .querySelectorAll(".altherium-section")
    .forEach((section) => section.classList.remove("active"));

  target.classList.add("active");

  const selectedSection = document.getElementById(target.dataset.tab);

  if (selectedSection) {
    selectedSection.classList.add("active");
  }
}