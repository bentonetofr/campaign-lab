const usuariosPermitidos = [
  { id: "cisco", nome: "Cisco", senha: "1234" },
  { id: "bolo", nome: "Bolo", senha: "1408" },
  { id: "emu", nome: "Emu", senha: "1234" },
  { id: "nat", nome: "Nat", senha: "1234" },
  { id: "bruna", nome: "Bruna", senha: "1234" },
  { id: "sarah", nome: "Sarah", senha: "1234" },
  { id: "nico", nome: "Nico", senha: "1234" },
  { id: "nub", nome: "Nub", senha: "1234" },
  { id: "matheus", nome: "Matheus", senha: "1234" },
  { id: "igor", nome: "Igor", senha: "1234" },
  { id: "galaxy", nome: "Galaxy", senha: "1234" },
  { id: "braba", nome: "Braba", senha: "1234" },
  { id: "milla", nome: "Milla", senha: "1234" },
];

const campanhasBase = [
  {
    id: "altherium-torvalenn",
    nome: "A Queda de Torvalenn",
    sistema: "Altherium",
    mestreId: "cisco",
    jogadores: ["bolo"],
    descricao:
      "Campanha principal de Altherium, marcada por runas, guerra e o destino de Torvalenn.",
  },
  {
    id: "dnd-reinos-perdidos",
    nome: "Reinos Perdidos",
    sistema: "D&D",
    mestreId: "cisco",
    jogadores: ["nat"],
    descricao:
      "Uma aventura clássica de D&D com exploração, monstros lendários e reinos esquecidos.",
  },
];

const ALTHERIUM_DOMAINS = [
  ["brutalidade", "Brutalidade", "Fúria"],
  ["crime", "Crime", "Estratégia"],
  ["determinacao", "Determinação", "Espírito"],
  ["direcao", "Direção", "Impulso"],
  ["esconder", "Esconder", "Estratégia"],
  ["furtividade", "Furtividade", "Impulso"],
  ["iniciativa", "Iniciativa", "Impulso"],
  ["intimidacao", "Intimidação", "Fúria"],
  ["investigacao", "Investigação", "Estratégia"],
  ["leveza", "Leveza", "Impulso"],
  ["luta", "Luta", "Fúria"],
  ["medicina", "Medicina", "Estratégia"],
  ["percepcao", "Percepção", "Destino"],
  ["persuasao", "Persuasão", "Destino"],
  ["precisao", "Precisão", "Impulso"],
  ["pressentimento", "Pressentimento", "Destino"],
  ["reflexo", "Reflexo", "Impulso"],
  ["religiao", "Religião", "Destino"],
  ["resiliencia", "Resiliência", "Espírito"],
  ["runologia", "Runologia", "Rúnico"],
  ["saberes", "Saberes", "Estratégia"],
  ["sobrevivencia", "Sobrevivência", "Estratégia"],
  ["tatica", "Tática", "Estratégia"],
  ["vontade", "Vontade", "Espírito"],
].map(([key, label, attr]) => ({ key, label, attr }));

const DND_SKILLS = [
  ["skillAcrobatics", "Acrobacia"],
  ["skillArcana", "Arcanismo"],
  ["skillAthletics", "Atletismo"],
  ["skillDeception", "Enganação"],
  ["skillStealth", "Furtividade"],
  ["skillHistory", "História"],
  ["skillInsight", "Intuição"],
  ["skillIntimidation", "Intimidação"],
  ["skillInvestigation", "Investigação"],
  ["skillAnimalHandling", "Lidar Animais"],
  ["skillMedicine", "Medicina"],
  ["skillNature", "Natureza"],
  ["skillPerception", "Percepção"],
  ["skillPerformance", "Performance"],
  ["skillPersuasion", "Persuasão"],
  ["skillSleightOfHand", "Prestidigitação"],
  ["skillReligion", "Religião"],
  ["skillSurvival", "Sobrevivência"],
];

/* =========================================================
   LOGIN
========================================================= */

if (document.body.classList.contains("login-page")) {
  const loginBtn = document.getElementById("loginBtn");
  const userNameInput = document.getElementById("userNameInput");
  const passwordInput = document.getElementById("password");

  if (loginBtn) loginBtn.addEventListener("click", loginUser);

  if (passwordInput) {
    passwordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") loginUser();
    });
  }

  function loginUser() {
    const typedName = userNameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!typedName) {
      alert("Digite seu nome.");
      return;
    }

    const user = usuariosPermitidos.find((item) => item.id === typedName);

    if (!user) {
      alert("sai fora chefe, vc n faz parte dos casas. Mete o pé!");
      return;
    }

    if (user.senha !== password) {
      alert("Para de ser burro fi, coloca a senha certa krai.");
      return;
    }

    sessionStorage.setItem("loggedUserId", user.id);
    window.location.href = "minhas-campanhas.html";
  }
}

/* =========================================================
   MINHAS CAMPANHAS
========================================================= */

if (document.body.classList.contains("my-campaigns-page")) {
  renderMyCampaignsPage();
  window.addEventListener("storage", renderMyCampaignsPage);
  setInterval(renderMyCampaignsPage, 1000);
}

function renderMyCampaignsPage() {
  const user = getLoggedUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const userCampaigns = getUserCampaigns(user.id);
  const campaignsAsMaster = userCampaigns.filter((campaign) => campaign.perfil === "Mestre");
  const campaignsAsPlayer = userCampaigns.filter((campaign) => campaign.perfil === "Jogador");

  setText("userNameView", user.nome);
  setText("campaignCount", userCampaigns.length);
  setText("masterCount", campaignsAsMaster.length);
  setText("playerCount", campaignsAsPlayer.length);

  renderCampaigns(document.getElementById("masterCampaigns"), campaignsAsMaster);
  renderCampaigns(document.getElementById("playerCampaigns"), campaignsAsPlayer);

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.onclick = logout;
}

function renderCampaigns(container, campaigns) {
  if (!container) return;

  if (!campaigns.length) {
    container.innerHTML = `
      <div class="altherium-empty premium-empty">
        <h3>Nenhuma campanha encontrada</h3>
        <p>Você ainda não tem campanhas liberadas nesta categoria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = campaigns
    .map((campaign) => {
      const actionButton =
        campaign.perfil === "Mestre"
          ? `
            <button type="button" class="campaign-danger-btn" onclick="deleteCampaign(event, '${campaign.id}')">
              Excluir campanha
            </button>
          `
          : `
            <button type="button" class="campaign-leave-btn" onclick="leaveCampaign(event, '${campaign.id}')">
              Sair da campanha
            </button>
          `;

      return `
        <div class="premium-campaign-card campaign-card-wrapper">
          <button type="button" class="campaign-main-action" onclick="enterCampaignById('${campaign.id}', '${campaign.perfil}')">
            <div class="campaign-card-top">
              <span>${campaign.sistema}</span>
              <strong>${campaign.perfil}</strong>
            </div>

            <h3>${campaign.nome}</h3>
            <p>${campaign.descricao}</p>

            <div class="campaign-card-footer">
              <span>Acessar campanha</span>
              <strong>→</strong>
            </div>
          </button>

          <div class="campaign-management-actions">
            ${actionButton}
          </div>
        </div>
      `;
    })
    .join("");
}

/* =========================================================
   CRIAR CAMPANHA
========================================================= */

if (document.body.classList.contains("create-campaign-page")) {
  const user = getLoggedUser();

  if (!user) {
    window.location.href = "index.html";
  } else {
    setupCreateCampaignPage(user);
  }
}

function setupCreateCampaignPage(user) {
  const creatorNameView = document.getElementById("creatorNameView");
  const playersPickerGrid = document.getElementById("playersPickerGrid");
  const createCampaignForm = document.getElementById("createCampaignForm");

  if (creatorNameView) creatorNameView.textContent = user.nome;
  if (!playersPickerGrid || !createCampaignForm) return;

  const availablePlayers = usuariosPermitidos.filter((player) => player.id !== user.id);

  playersPickerGrid.innerHTML = availablePlayers
    .map(
      (player) => `
        <label class="player-check-card">
          <input type="checkbox" value="${player.id}" />
          <span>${player.nome}</span>
        </label>
      `
    )
    .join("");

  createCampaignForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const campaignName = document.getElementById("campaignName").value.trim();
    const campaignSystem = document.getElementById("campaignSystem").value;

    const selectedPlayers = Array.from(playersPickerGrid.querySelectorAll("input:checked")).map(
      (input) => input.value
    );

    if (!campaignName || !campaignSystem) {
      alert("Preencha o nome e escolha o sistema.");
      return;
    }

    const customCampaigns = getCustomCampaigns();

    const newCampaign = {
      id: createCampaignId(campaignName),
      nome: campaignName,
      sistema: campaignSystem,
      mestreId: user.id,
      jogadores: selectedPlayers,
      descricao: `Campanha de ${campaignSystem} criada por ${user.nome}.`,
      criadaEm: new Date().toISOString(),
    };

    customCampaigns.push(newCampaign);
    saveCustomCampaigns(customCampaigns);

    selectedPlayers.forEach((playerId) => {
      if (campaignSystem === "Altherium") {
        getOrCreateCampaignSheet(newCampaign.id, playerId, campaignSystem);
      }

      if (campaignSystem === "D&D") {
        getOrCreateDndSheet(newCampaign.id, playerId, campaignSystem);
      }
    });

    alert("Campanha criada com sucesso.");
    window.location.href = "minhas-campanhas.html";
  });
}

/* =========================================================
   PÁGINAS
========================================================= */

if (document.body.classList.contains("altherium-page")) {
  protectPage("Altherium", "Mestre");
  setupMasterCampaignName();
  setupMasterPlayersRealtime("playersGrid", "onlineCount");
  setupAltheriumMasterSheets();
  setupInitiativeBoard({
    system: "Altherium",
    boardId: "initiativeBoard",
    clearButtonId: "clearInitiativeBtn",
    getSheet: getOrCreateCampaignSheet,
    updateSheet: updateCampaignSheet,
  });
  setupAddPlayersToCampaign({
    modalId: "altheriumModal",
    titleId: "altheriumModalTitle",
    fieldsId: "altheriumFormFields",
    formId: "altheriumForm",
    openSelector: "[data-open-modal='player']",
    closeSelector: "[data-close-modal]",
  });
}

if (document.body.classList.contains("altherium-player-page")) {
  protectPage("Altherium", "Jogador");
  setupPlayerInfo("playerNameView", "campaignNameView");
  setupAltheriumPlayerSheet();
}

if (document.body.classList.contains("dnd-master-page")) {
  protectPage("D&D", "Mestre");
  setupMasterCampaignName();
  setupMasterPlayersRealtime("dndPlayersGrid", "dndPlayerCount");
  setupDndMasterSheets();
  setupInitiativeBoard({
    system: "D&D",
    boardId: "dndInitiativeBoard",
    clearButtonId: "clearDndInitiativeBtn",
    getSheet: getOrCreateDndSheet,
    updateSheet: updateDndSheet,
  });
  setupAddPlayersToCampaign({
    modalId: "dndModal",
    titleId: "dndModalTitle",
    fieldsId: "dndFormFields",
    formId: "dndForm",
    openSelector: "[data-open-dnd-modal='player']",
    closeSelector: "[data-close-dnd-modal]",
  });
}

if (document.body.classList.contains("dnd-player-page")) {
  protectPage("D&D", "Jogador");
  setupPlayerInfo("dndPlayerNameView", "dndCampaignNameView");
  setupDndPlayerSheet();
}

/* =========================================================
   CAMPANHAS
========================================================= */

function getAllCampaigns() {
  const deletedIds = getDeletedCampaignIds();

  return [...campanhasBase, ...getCustomCampaigns()].filter(
    (campaign) => !deletedIds.includes(campaign.id)
  );
}

function getCustomCampaigns() {
  return JSON.parse(localStorage.getItem("customCampaigns")) || [];
}

function saveCustomCampaigns(campaigns) {
  localStorage.setItem("customCampaigns", JSON.stringify(campaigns));
}

function getDeletedCampaignIds() {
  return JSON.parse(localStorage.getItem("deletedCampaignIds")) || [];
}

function saveDeletedCampaignIds(ids) {
  localStorage.setItem("deletedCampaignIds", JSON.stringify(ids));
}

function getLeftCampaigns() {
  return JSON.parse(localStorage.getItem("leftCampaigns")) || [];
}

function saveLeftCampaigns(leftCampaigns) {
  localStorage.setItem("leftCampaigns", JSON.stringify(leftCampaigns));
}

function getRemovedCampaignPlayers() {
  return JSON.parse(localStorage.getItem("removedCampaignPlayers")) || [];
}

function saveRemovedCampaignPlayers(players) {
  localStorage.setItem("removedCampaignPlayers", JSON.stringify(players));
}

function getAddedCampaignPlayers() {
  return JSON.parse(localStorage.getItem("addedCampaignPlayers")) || [];
}

function saveAddedCampaignPlayers(players) {
  localStorage.setItem("addedCampaignPlayers", JSON.stringify(players));
}

function getCampaignPlayerIds(campaign) {
  const removedPlayers = getRemovedCampaignPlayers();
  const leftCampaigns = getLeftCampaigns();
  const addedPlayers = getAddedCampaignPlayers();

  const basePlayers = Array.isArray(campaign.jogadores) ? [...campaign.jogadores] : [];

  const extraPlayers = addedPlayers
    .filter((item) => item.campaignId === campaign.id)
    .map((item) => item.userId);

  const allPlayers = [...new Set([...basePlayers, ...extraPlayers])];

  return allPlayers.filter((playerId) => {
    const wasRemoved = removedPlayers.some(
      (item) => item.campaignId === campaign.id && item.userId === playerId
    );

    const hasLeft = leftCampaigns.some(
      (item) => item.campaignId === campaign.id && item.userId === playerId
    );

    return !wasRemoved && !hasLeft;
  });
}

function getUserCampaigns(userId) {
  const campaigns = [];

  getAllCampaigns().forEach((campaign) => {
    const activePlayers = getCampaignPlayerIds(campaign);

    if (campaign.mestreId === userId) {
      campaigns.push({
        ...campaign,
        jogadores: activePlayers,
        perfil: "Mestre",
        pagina: getCampaignPage(campaign.sistema, "Mestre"),
      });
    }

    if (activePlayers.includes(userId)) {
      campaigns.push({
        ...campaign,
        jogadores: activePlayers,
        perfil: "Jogador",
        pagina: getCampaignPage(campaign.sistema, "Jogador"),
      });
    }
  });

  return campaigns;
}

function getCampaignPage(system, profile) {
  if (system === "Altherium" && profile === "Mestre") return "altherium-mestre.html";
  if (system === "Altherium" && profile === "Jogador") return "altherium-jogador.html";
  if (system === "D&D" && profile === "Mestre") return "dnd-mestre.html";
  if (system === "D&D" && profile === "Jogador") return "dnd-jogador.html";

  return "minhas-campanhas.html";
}

function enterCampaignById(id, perfil) {
  const campaign = getAllCampaigns().find((item) => item.id === id);

  if (!campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  enterCampaign(id, campaign.nome, campaign.sistema, perfil, getCampaignPage(campaign.sistema, perfil));
}

function enterCampaign(id, nome, sistema, perfil, pagina) {
  sessionStorage.setItem("campaignId", id);
  sessionStorage.setItem("campaignName", nome);
  sessionStorage.setItem("system", sistema);
  sessionStorage.setItem("profile", perfil);

  const campaign = getAllCampaigns().find((item) => item.id === id);
  const playerIds = campaign ? getCampaignPlayerIds(campaign) : [];

  sessionStorage.setItem(
    "lastCampaign",
    JSON.stringify({
      id,
      name: nome,
      system: sistema,
      profile: perfil,
      players: String(playerIds.length).padStart(2, "0"),
      sessions: "00",
      sheets: String(playerIds.length).padStart(2, "0"),
      items: "00",
    })
  );

  window.location.href = pagina;
}

function deleteCampaign(event, campaignId) {
  event.stopPropagation();

  const user = getLoggedUser();
  const campaign = getAllCampaigns().find((item) => item.id === campaignId);

  if (!user || !campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (campaign.mestreId !== user.id) {
    alert("Você só pode excluir campanhas que você mestra.");
    return;
  }

  if (!confirm(`Tem certeza que quer excluir a campanha "${campaign.nome}"?`)) return;

  const customCampaigns = getCustomCampaigns();
  const isCustom = customCampaigns.some((item) => item.id === campaignId);

  if (isCustom) {
    saveCustomCampaigns(customCampaigns.filter((item) => item.id !== campaignId));
  } else {
    const deletedIds = getDeletedCampaignIds();

    if (!deletedIds.includes(campaignId)) {
      deletedIds.push(campaignId);
      saveDeletedCampaignIds(deletedIds);
    }
  }

  deleteSheetsByCampaign(campaignId);
  deleteDndSheetsByCampaign(campaignId);

  if (getCurrentCampaignId() === campaignId) clearCurrentCampaign();

  renderMyCampaignsPage();
}

function leaveCampaign(event, campaignId) {
  event.stopPropagation();

  const user = getLoggedUser();
  const campaign = getAllCampaigns().find((item) => item.id === campaignId);

  if (!user || !campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (!getCampaignPlayerIds(campaign).includes(user.id)) {
    alert("Você não é jogador desta campanha.");
    return;
  }

  if (!confirm(`Tem certeza que quer sair da campanha "${campaign.nome}"?`)) return;

  const customCampaigns = getCustomCampaigns();
  const customCampaign = customCampaigns.find((item) => item.id === campaignId);

  if (customCampaign) {
    customCampaign.jogadores = customCampaign.jogadores.filter((playerId) => playerId !== user.id);
    saveCustomCampaigns(customCampaigns);
  }

  const leftCampaigns = getLeftCampaigns();
  const alreadyLeft = leftCampaigns.some(
    (item) => item.userId === user.id && item.campaignId === campaignId
  );

  if (!alreadyLeft) {
    leftCampaigns.push({ userId: user.id, campaignId });
    saveLeftCampaigns(leftCampaigns);
  }

  if (getCurrentCampaignId() === campaignId) clearCurrentCampaign();

  renderMyCampaignsPage();
}

function createCampaignId(name) {
  return (
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now()
  );
}

/* =========================================================
   ABAS
========================================================= */

document.addEventListener("click", (event) => {
  const tab = event.target.closest(".altherium-tab");
  if (!tab) return;

  document.querySelectorAll(".altherium-tab").forEach((button) => button.classList.remove("active"));
  document.querySelectorAll(".altherium-section").forEach((section) => section.classList.remove("active"));

  tab.classList.add("active");

  const selectedSection = document.getElementById(tab.dataset.tab);
  if (selectedSection) selectedSection.classList.add("active");
});

/* =========================================================
   PLAYERS NO PAINEL DO MESTRE
========================================================= */

function setupMasterPlayersRealtime(gridId, counterId) {
  const grid = document.getElementById(gridId);
  const counter = document.getElementById(counterId);

  if (!grid) return;

  renderCampaignPlayers(grid, counter);

  window.addEventListener("storage", () => {
    renderCampaignPlayers(grid, counter);
    renderMasterSheets();
    renderDndMasterSheets();
    setupMasterCampaignName();
  });

  setInterval(() => {
    renderCampaignPlayers(grid, counter);
    renderMasterSheets();
    renderDndMasterSheets();
    setupMasterCampaignName();
  }, 1000);
}

function renderCampaignPlayers(grid, counter) {
  const campaign = getCurrentCampaign();

  if (!campaign) {
    grid.innerHTML = `
      <div class="altherium-empty">
        <h3>Campanha não encontrada</h3>
        <p>Volte para suas campanhas e entre novamente.</p>
      </div>
    `;

    if (counter) counter.textContent = "0";
    return;
  }

  const players = getCampaignPlayerIds(campaign)
    .map((playerId) => usuariosPermitidos.find((user) => user.id === playerId))
    .filter(Boolean);

  if (counter) counter.textContent = players.length;

  if (!players.length) {
    grid.innerHTML = `
      <div class="altherium-empty">
        <h3>Nenhum jogador na campanha</h3>
        <p>Quando jogadores forem adicionados, eles aparecerão aqui.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = players
    .map(
      (player) => `
        <div class="altherium-card">
          <h3>${player.nome}</h3>
          <p>Status: Jogador da campanha</p>

          <div class="altherium-actions">
            <button onclick="removePlayerFromCampaign('${campaign.id}', '${player.id}')">
              Remover
            </button>
          </div>
        </div>
      `
    )
    .join("");
}

/* =========================================================
   ADICIONAR PLAYERS
========================================================= */

function setupAddPlayersToCampaign(config) {
  const modal = document.getElementById(config.modalId);
  const modalTitle = document.getElementById(config.titleId);
  const formFields = document.getElementById(config.fieldsId);
  const form = document.getElementById(config.formId);

  if (!modal || !modalTitle || !formFields || !form) return;

  const submitButton = form.querySelector("button[type='submit']");

  document.addEventListener("click", (event) => {
    const openButton = event.target.closest(config.openSelector);
    const closeButton = event.target.closest(config.closeSelector);

    if (openButton) {
      event.preventDefault();
      openAddPlayersModal(modal, modalTitle, formFields, form, submitButton);
    }

    if (closeButton || event.target === modal) {
      closeSharedModal(modal, form, submitButton);
    }
  });

  form.addEventListener("submit", (event) => {
    if (form.dataset.mode !== "add-players") return;

    event.preventDefault();
    addSelectedPlayersToCampaign(form, modal, submitButton);
  });
}

function openAddPlayersModal(modal, modalTitle, formFields, form, submitButton) {
  const loggedUser = getLoggedUser();
  const campaign = getCurrentCampaign();

  if (!loggedUser || !campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (campaign.mestreId !== loggedUser.id) {
    alert("Apenas o mestre pode adicionar jogadores.");
    return;
  }

  const activePlayers = getCampaignPlayerIds(campaign);

  const availablePlayers = usuariosPermitidos.filter((user) => {
    const isMaster = user.id === campaign.mestreId;
    const alreadyInCampaign = activePlayers.includes(user.id);
    return !isMaster && !alreadyInCampaign;
  });

  modalTitle.textContent = "Adicionar jogadores";

  if (!availablePlayers.length) {
    formFields.innerHTML = `
      <div class="altherium-empty">
        <h3>Nenhum jogador disponível</h3>
        <p>Todos os usuários cadastrados já estão nesta campanha.</p>
      </div>
    `;

    if (submitButton) submitButton.disabled = true;
  } else {
    formFields.innerHTML = `
      <div class="players-picker-grid">
        ${availablePlayers
          .map(
            (player) => `
              <label class="player-check-card">
                <input type="checkbox" name="players" value="${player.id}" />
                <span>${player.nome}</span>
              </label>
            `
          )
          .join("")}
      </div>
    `;

    if (submitButton) submitButton.disabled = false;
  }

  form.dataset.mode = "add-players";
  if (submitButton) submitButton.textContent = "Aplicar";
  modal.classList.add("active");
}

function addSelectedPlayersToCampaign(form, modal, submitButton) {
  const loggedUser = getLoggedUser();
  const campaign = getCurrentCampaign();

  if (!loggedUser || !campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (campaign.mestreId !== loggedUser.id) {
    alert("Apenas o mestre pode adicionar jogadores.");
    return;
  }

  const selectedPlayers = Array.from(form.querySelectorAll("input[name='players']:checked")).map(
    (input) => input.value
  );

  if (!selectedPlayers.length) {
    alert("Selecione pelo menos um jogador.");
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Aplicando...";
  }

  const customCampaigns = getCustomCampaigns();
  const customCampaign = customCampaigns.find((item) => item.id === campaign.id);

  if (customCampaign) {
    selectedPlayers.forEach((playerId) => {
      if (!customCampaign.jogadores.includes(playerId)) customCampaign.jogadores.push(playerId);
    });

    saveCustomCampaigns(customCampaigns);
  } else {
    const addedPlayers = getAddedCampaignPlayers();

    selectedPlayers.forEach((playerId) => {
      const alreadyAdded = addedPlayers.some(
        (item) => item.campaignId === campaign.id && item.userId === playerId
      );

      if (!alreadyAdded) addedPlayers.push({ campaignId: campaign.id, userId: playerId });
    });

    saveAddedCampaignPlayers(addedPlayers);
  }

  removePlayerBlocks(campaign.id, selectedPlayers);

  selectedPlayers.forEach((playerId) => {
    if (campaign.sistema === "Altherium") getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);
    if (campaign.sistema === "D&D") getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);
  });

  refreshCurrentMasterPanel();
  closeSharedModal(modal, form, submitButton);
  window.dispatchEvent(new Event("storage"));

  alert("Jogador adicionado com sucesso.");
}

function removePlayerFromCampaign(campaignId, playerId) {
  const campaign = getAllCampaigns().find((item) => item.id === campaignId);
  const loggedUser = getLoggedUser();

  if (!campaign || !loggedUser) {
    alert("Erro ao encontrar campanha ou usuário.");
    return;
  }

  if (campaign.mestreId !== loggedUser.id) {
    alert("Apenas o mestre desta campanha pode remover jogadores.");
    return;
  }

  const player = usuariosPermitidos.find((item) => item.id === playerId);

  if (!confirm(`Remover ${player ? player.nome : "este jogador"} da campanha?`)) return;

  const customCampaigns = getCustomCampaigns();
  const customCampaign = customCampaigns.find((item) => item.id === campaignId);

  if (customCampaign) {
    customCampaign.jogadores = customCampaign.jogadores.filter((id) => id !== playerId);
    saveCustomCampaigns(customCampaigns);
  }

  const removedPlayers = getRemovedCampaignPlayers();
  const alreadyRemoved = removedPlayers.some(
    (item) => item.campaignId === campaignId && item.userId === playerId
  );

  if (!alreadyRemoved) {
    removedPlayers.push({ campaignId, userId: playerId });
    saveRemovedCampaignPlayers(removedPlayers);
  }

  saveAddedCampaignPlayers(
    getAddedCampaignPlayers().filter(
      (item) => !(item.campaignId === campaignId && item.userId === playerId)
    )
  );

  refreshCurrentMasterPanel();
  window.dispatchEvent(new Event("storage"));
}

function removePlayerBlocks(campaignId, playerIds) {
  saveRemovedCampaignPlayers(
    getRemovedCampaignPlayers().filter(
      (item) => !(item.campaignId === campaignId && playerIds.includes(item.userId))
    )
  );

  saveLeftCampaigns(
    getLeftCampaigns().filter(
      (item) => !(item.campaignId === campaignId && playerIds.includes(item.userId))
    )
  );
}

/* =========================================================
   FICHAS DE ALTHERIUM
========================================================= */

function getCampaignSheets() {
  return JSON.parse(localStorage.getItem("campaignSheets")) || [];
}

function saveCampaignSheets(sheets) {
  localStorage.setItem("campaignSheets", JSON.stringify(sheets));
}

function getDefaultSheet(campaignId, playerId, system) {
  const player = usuariosPermitidos.find((item) => item.id === playerId);

  const sheet = {
    campaignId,
    playerId,
    ownerName: player ? player.nome : "Jogador",
    system,
    characterName: "",
    root: "",
    genesis: "",
    pvCurrent: "0",
    pvMax: "0",
    peCurrent: "0",
    peMax: "0",
    prCurrent: "0",
    prMax: "0",
    combatInitiative: "",
    furia: "0",
    destino: "0",
    espirito: "0",
    impulso: "0",
    estrategia: "0",
    runico: "0",
    bodyLegs: "",
    bodyArms: "",
    bodyTorso: "",
    bodyHead: "",
    weapon1Name: "",
    weapon1Damage: "",
    weapon1Range: "",
    weapon2Name: "",
    weapon2Damage: "",
    weapon2Range: "",
    weapon3Name: "",
    weapon3Damage: "",
    weapon3Range: "",
    weapon4Name: "",
    weapon4Damage: "",
    weapon4Range: "",
    hacksilvers: "550",
    triumphs: "",
    notes: "",
    updatedAt: new Date().toISOString(),
  };

  ALTHERIUM_DOMAINS.forEach((domain) => {
    sheet[`domain_${domain.key}`] = "";
  });

  for (let index = 1; index <= 13; index += 1) {
    sheet[`inventory${index}`] = "";
  }

  return sheet;
}

function getOrCreateCampaignSheet(campaignId, playerId, system) {
  const sheets = getCampaignSheets();

  const index = sheets.findIndex(
    (item) => item.campaignId === campaignId && item.playerId === playerId
  );

  if (index >= 0) {
    const normalized = {
      ...getDefaultSheet(campaignId, playerId, system),
      ...sheets[index],
    };

    sheets[index] = normalized;
    saveCampaignSheets(sheets);

    return normalized;
  }

  const newSheet = getDefaultSheet(campaignId, playerId, system);
  sheets.push(newSheet);
  saveCampaignSheets(sheets);

  return newSheet;
}

function updateCampaignSheet(campaignId, playerId, data) {
  const sheets = getCampaignSheets();
  const campaign = getAllCampaigns().find((item) => item.id === campaignId);

  const index = sheets.findIndex(
    (item) => item.campaignId === campaignId && item.playerId === playerId
  );

  const oldSheet =
    index >= 0
      ? { ...getDefaultSheet(campaignId, playerId, campaign ? campaign.sistema : "Altherium"), ...sheets[index] }
      : getDefaultSheet(campaignId, playerId, campaign ? campaign.sistema : "Altherium");

  const updatedSheet = {
    ...oldSheet,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) sheets[index] = updatedSheet;
  else sheets.push(updatedSheet);

  saveCampaignSheets(sheets);
  window.dispatchEvent(new Event("storage"));
}

function deleteSheetsByCampaign(campaignId) {
  saveCampaignSheets(getCampaignSheets().filter((sheet) => sheet.campaignId !== campaignId));
}

function createMissingSheetsForCurrentCampaign() {
  const campaign = getCurrentCampaign();
  if (!campaign || campaign.sistema !== "Altherium") return;

  getCampaignPlayerIds(campaign).forEach((playerId) => {
    getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);
  });
}

function setupAltheriumMasterSheets() {
  renderMasterSheets();

  document.addEventListener("click", (event) => {
    const createSheetsButton = event.target.closest("[data-create-player-sheets]");
    const openSheetButton = event.target.closest("[data-open-sheet]");

    if (createSheetsButton) {
      createMissingSheetsForCurrentCampaign();
      renderMasterSheets();
      alert("Fichas sincronizadas.");
    }

    if (openSheetButton) {
      openMasterSheetModal(openSheetButton.dataset.openSheet);
    }
  });

  const form = document.getElementById("altheriumForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      if (form.dataset.mode !== "edit-sheet") return;

      event.preventDefault();
      saveSheetFromModal(true);
    });

    form.addEventListener("input", () => {
      if (form.dataset.mode !== "edit-sheet") return;
      saveSheetFromModal(false);
    });
  }

  window.addEventListener("storage", () => {
    renderMasterSheets();
    refreshOpenSheetModal();
  });

  setInterval(renderMasterSheets, 1000);
}

function renderMasterSheets() {
  const grid = document.getElementById("sheetsGrid");
  const counter = document.getElementById("sheetCount");
  if (!grid) return;

  const campaign = getCurrentCampaign();

  if (!campaign || campaign.sistema !== "Altherium") {
    grid.innerHTML = `
      <div class="altherium-empty">
        <h3>Campanha não encontrada</h3>
        <p>Volte para suas campanhas e entre novamente.</p>
      </div>
    `;
    if (counter) counter.textContent = "0";
    return;
  }

  const playerIds = getCampaignPlayerIds(campaign);

  playerIds.forEach((playerId) => {
    getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);
  });

  if (counter) counter.textContent = playerIds.length;

  if (!playerIds.length) {
    grid.innerHTML = `
      <div class="altherium-empty">
        <h3>Nenhuma ficha disponível</h3>
        <p>Adicione jogadores à campanha para gerar fichas.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = playerIds
    .map((playerId) => {
      const player = usuariosPermitidos.find((item) => item.id === playerId);
      const sheet = getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);

      return `
        <button class="sheet-card" data-open-sheet="${playerId}">
          <div class="sheet-card-top">
            <span>${player ? player.nome : "Jogador"}</span>
            <strong>${sheet.root || "Sem raíz"}</strong>
          </div>

          <h3>${sheet.characterName || "Personagem sem nome"}</h3>
          <p>Genesis: ${sheet.genesis || "---"}</p>
          <p>
            PV ${sheet.pvCurrent || "0"}/${sheet.pvMax || "0"} •
            PE ${sheet.peCurrent || "0"}/${sheet.peMax || "0"} •
            Iniciativa ${sheet.combatInitiative || "--"}
          </p>

          <div class="sheet-card-footer">
            <span>Abrir ficha completa</span>
            <strong>→</strong>
          </div>
        </button>
      `;
    })
    .join("");
}

function openMasterSheetModal(playerId) {
  const modal = document.getElementById("altheriumModal");
  const modalTitle = document.getElementById("altheriumModalTitle");
  const form = document.getElementById("altheriumForm");
  const formFields = document.getElementById("altheriumFormFields");
  const submitButton = form ? form.querySelector("button[type='submit']") : null;
  const campaign = getCurrentCampaign();

  if (!modal || !modalTitle || !form || !formFields || !campaign) return;

  const sheet = getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);

  modalTitle.textContent = `Ficha de ${sheet.ownerName}`;
  formFields.innerHTML = buildMasterSheetEditor(sheet);

  form.dataset.mode = "edit-sheet";
  form.dataset.playerId = playerId;

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = "Salvar ficha";
  }

  modal.classList.add("active");
}

function buildMasterSheetEditor(sheet) {
  return `
    <div class="altherium-rune-sheet master-rune-sheet">
      <section class="rune-paper-page">
        <div class="rune-frame">
          <div class="rune-page-header">
            ${textInput("Nome", "characterName", sheet.characterName)}
            ${textInput("Raíz", "root", sheet.root)}
            ${textInput("Genesis", "genesis", sheet.genesis)}
          </div>

          <div class="rune-resource-list">
            ${resourceLine("PV", "pvCurrent", sheet.pvCurrent, "pvMax", sheet.pvMax)}
            ${resourceLine("PE", "peCurrent", sheet.peCurrent, "peMax", sheet.peMax)}
            ${resourceLine("PR - FV", "prCurrent", sheet.prCurrent, "prMax", sheet.prMax)}
          </div>

          <div class="initiative-sheet-box">
            <label>
              <span>Iniciativa</span>
              <input type="number" name="combatInitiative" value="${escapeHtml(sheet.combatInitiative)}" placeholder="0" />
            </label>
            <p>Esse valor entra automaticamente na ordem de iniciativa.</p>
          </div>

          <div class="rune-attributes-table">
            ${attributeInput("Fúria", "furia", sheet.furia)}
            ${attributeInput("Destino", "destino", sheet.destino)}
            ${attributeInput("Espírito", "espirito", sheet.espirito)}
            ${attributeInput("Impulso", "impulso", sheet.impulso)}
            ${attributeInput("Estratégia", "estrategia", sheet.estrategia)}
            ${attributeInput("Rúnico", "runico", sheet.runico)}
          </div>

          <div class="rune-body-table">
            ${bodyInput("Pernas", "(1-3)", "bodyLegs", sheet.bodyLegs)}
            ${bodyInput("Braços", "(4-6)", "bodyArms", sheet.bodyArms)}
            ${bodyInput("Tronco", "(7-9)", "bodyTorso", sheet.bodyTorso)}
            ${bodyInput("Cabeça", "(10)", "bodyHead", sheet.bodyHead)}
          </div>

          <div class="rune-weapons-table">
            <h3>Armas</h3>
            <div class="rune-weapon-head"><span>Nome</span><span>Dano</span><span>Alcance</span></div>
            ${[1, 2, 3, 4]
              .map(
                (index) => `
                  <div class="rune-weapon-row">
                    <input type="text" name="weapon${index}Name" value="${escapeHtml(sheet[`weapon${index}Name`])}" />
                    <input type="text" name="weapon${index}Damage" value="${escapeHtml(sheet[`weapon${index}Damage`])}" />
                    <input type="text" name="weapon${index}Range" value="${escapeHtml(sheet[`weapon${index}Range`])}" />
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="rune-paper-page">
        <div class="rune-frame">
          <div class="rune-section-title"><h3>Domínios</h3></div>
          <div class="rune-domains-table">
            <div class="rune-domain-head"><span>Domínios</span><span>Atributos</span><span>Dados</span></div>
            ${ALTHERIUM_DOMAINS.map(
              (domain) => `
                <label>
                  <span>${domain.label}</span>
                  <small>${domain.attr}</small>
                  <input type="text" name="domain_${domain.key}" value="${escapeHtml(sheet[`domain_${domain.key}`])}" />
                </label>
              `
            ).join("")}
          </div>
        </div>
      </section>

      <section class="rune-paper-page">
        <div class="rune-frame">
          <div class="rune-section-title"><h3>Inventário</h3></div>
          <div class="rune-inventory-list">
            ${Array.from({ length: 13 }, (_, index) => index + 1)
              .map(
                (slot) => `
                  <input type="text" name="inventory${slot}" value="${escapeHtml(sheet[`inventory${slot}`])}" placeholder="- item" />
                `
              )
              .join("")}
          </div>

          <label class="rune-money-field">
            <span>Hacksilvers</span>
            <input type="number" min="0" name="hacksilvers" value="${escapeHtml(sheet.hacksilvers)}" />
          </label>
        </div>
      </section>

      <section class="rune-paper-page">
        <div class="rune-frame">
          <div class="rune-section-title centered"><h3>- Triunfos -</h3></div>
          <textarea class="rune-triumphs-area" name="triumphs" rows="14">${escapeHtml(sheet.triumphs)}</textarea>
          <div class="rune-section-title"><h3>Anotações</h3></div>
          <textarea class="rune-triumphs-area" name="notes" rows="8">${escapeHtml(sheet.notes)}</textarea>
        </div>
      </section>
    </div>
  `;
}

function saveSheetFromModal(showAlert = false) {
  const form = document.getElementById("altheriumForm");
  if (!form) return;

  const campaignId = getCurrentCampaignId();
  const playerId = form.dataset.playerId;

  if (!campaignId || !playerId) return;

  updateCampaignSheet(campaignId, playerId, Object.fromEntries(new FormData(form)));
  refreshCurrentMasterPanel();

  if (showAlert) alert("Ficha salva com sucesso.");
}

function refreshOpenSheetModal() {
  const form = document.getElementById("altheriumForm");
  const formFields = document.getElementById("altheriumFormFields");

  if (!form || !formFields || form.dataset.mode !== "edit-sheet") return;

  const focused = document.activeElement;
  if (focused && form.contains(focused)) return;

  const campaign = getCurrentCampaign();
  const playerId = form.dataset.playerId;

  if (!campaign || !playerId) return;

  formFields.innerHTML = buildMasterSheetEditor(
    getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema)
  );
}

function setupAltheriumPlayerSheet() {
  const user = getLoggedUser();
  const campaign = getCurrentCampaign();
  const form = document.getElementById("playerSheetForm");
  const saveButton = document.getElementById("savePlayerSheet");

  if (!user || !campaign || !form) return;

  getOrCreateCampaignSheet(campaign.id, user.id, campaign.sistema);
  loadSheetIntoPlayerForm();

  form.addEventListener("input", () => savePlayerSheet(false));

  if (saveButton) saveButton.addEventListener("click", () => savePlayerSheet(true));

  window.addEventListener("storage", loadSheetIntoPlayerForm);
  setInterval(loadSheetIntoPlayerForm, 1000);
}

function loadSheetIntoPlayerForm() {
  const user = getLoggedUser();
  const campaign = getCurrentCampaign();
  const form = document.getElementById("playerSheetForm");

  if (!user || !campaign || !form) return;

  const focused = document.activeElement;

  if (focused && form.contains(focused)) {
    updatePlayerSheetPreview();
    updateResourceBars();
    return;
  }

  const sheet = getOrCreateCampaignSheet(campaign.id, user.id, campaign.sistema);

  Object.keys(sheet).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = sheet[key] || "";
  });

  updatePlayerSheetPreview();
  updateResourceBars();
}

function savePlayerSheet(showAlert) {
  const user = getLoggedUser();
  const campaign = getCurrentCampaign();
  const form = document.getElementById("playerSheetForm");

  if (!user || !campaign || !form) return;

  updateCampaignSheet(campaign.id, user.id, Object.fromEntries(new FormData(form)));
  updatePlayerSheetPreview();
  updateResourceBars();

  if (showAlert) alert("Ficha salva com sucesso.");
}

function updatePlayerSheetPreview() {
  const form = document.getElementById("playerSheetForm");
  if (!form) return;

  setText("sheetCharacterMini", form.elements.characterName?.value || "---");
  setText("sheetRootMini", form.elements.root?.value || "---");
  setText("sheetInitiativeMini", form.elements.combatInitiative?.value || "--");
}

function updateResourceBars() {
  const form = document.getElementById("playerSheetForm");
  if (!form) return;

  setBarFill("pvBarFill", form.elements.pvCurrent.value, form.elements.pvMax.value);
  setBarFill("peBarFill", form.elements.peCurrent.value, form.elements.peMax.value);
  setBarFill("prBarFill", form.elements.prCurrent.value, form.elements.prMax.value);
}

/* =========================================================
   FICHAS DE D&D
========================================================= */

function getDndSheets() {
  return JSON.parse(localStorage.getItem("dndSheets")) || [];
}

function saveDndSheets(sheets) {
  localStorage.setItem("dndSheets", JSON.stringify(sheets));
}

function getDefaultDndSheet(campaignId, playerId, system) {
  const player = usuariosPermitidos.find((item) => item.id === playerId);

  const sheet = {
    campaignId,
    playerId,
    ownerName: player ? player.nome : "Jogador",
    system,
    characterName: "",
    classLevel: "",
    race: "",
    background: "",
    alignment: "",
    experience: "0",
    strScore: "8",
    dexScore: "8",
    conScore: "8",
    intScore: "8",
    wisScore: "8",
    chaScore: "8",
    saveStr: "-1",
    saveDex: "-1",
    saveCon: "-1",
    saveInt: "-1",
    saveWis: "-1",
    saveCha: "-1",
    armorClass: "8",
    initiative: "-1",
    combatInitiative: "",
    speed: "40 ft.",
    proficiencyBonus: "+2",
    hpCurrent: "0",
    hpMax: "0",
    hpTemp: "0",
    hitDiceTotal: "1d8",
    hitDiceRemaining: "1d8",
    deathSuccesses: "",
    deathFailures: "",
    attack1Name: "",
    attack1Bonus: "",
    attack1Damage: "",
    attack2Name: "",
    attack2Bonus: "",
    attack2Damage: "",
    attack3Name: "",
    attack3Bonus: "",
    attack3Damage: "",
    equipment: "",
    features: "",
    age: "",
    height: "",
    weight: "",
    eyes: "",
    skin: "",
    hair: "",
    faction: "",
    personalityTraits: "",
    ideals: "",
    bonds: "",
    flaws: "",
    quirks: "",
    appearance: "",
    additionalFeatures: "",
    inventory: "",
    spellcastingClass: "",
    spellAbility: "",
    spellSaveDc: "",
    spellAttackBonus: "",
    cantrips: "",
    preparedSpells: "",
    spellNotes: "",
    updatedAt: new Date().toISOString(),
  };

  DND_SKILLS.forEach(([key]) => {
    sheet[key] = "-1";
  });

  for (let level = 1; level <= 9; level += 1) {
    sheet[`spellSlots${level}`] = "";
  }

  return sheet;
}

function getOrCreateDndSheet(campaignId, playerId, system) {
  const sheets = getDndSheets();

  const index = sheets.findIndex(
    (sheet) => sheet.campaignId === campaignId && sheet.playerId === playerId
  );

  if (index >= 0) {
    const normalized = {
      ...getDefaultDndSheet(campaignId, playerId, system),
      ...sheets[index],
    };

    sheets[index] = normalized;
    saveDndSheets(sheets);

    return normalized;
  }

  const newSheet = getDefaultDndSheet(campaignId, playerId, system);
  sheets.push(newSheet);
  saveDndSheets(sheets);

  return newSheet;
}

function updateDndSheet(campaignId, playerId, data) {
  const sheets = getDndSheets();
  const campaign = getAllCampaigns().find((item) => item.id === campaignId);

  const index = sheets.findIndex(
    (sheet) => sheet.campaignId === campaignId && sheet.playerId === playerId
  );

  const oldSheet =
    index >= 0
      ? { ...getDefaultDndSheet(campaignId, playerId, campaign ? campaign.sistema : "D&D"), ...sheets[index] }
      : getDefaultDndSheet(campaignId, playerId, campaign ? campaign.sistema : "D&D");

  const updatedSheet = {
    ...oldSheet,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) sheets[index] = updatedSheet;
  else sheets.push(updatedSheet);

  saveDndSheets(sheets);
  window.dispatchEvent(new Event("storage"));
}

function deleteDndSheetsByCampaign(campaignId) {
  saveDndSheets(getDndSheets().filter((sheet) => sheet.campaignId !== campaignId));
}

function createMissingDndSheetsForCurrentCampaign() {
  const campaign = getCurrentCampaign();
  if (!campaign || campaign.sistema !== "D&D") return;

  getCampaignPlayerIds(campaign).forEach((playerId) => {
    getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);
  });
}

function setupDndMasterSheets() {
  renderDndMasterSheets();

  document.addEventListener("click", (event) => {
    const syncButton = event.target.closest("[data-create-dnd-sheets]");
    const openSheetButton = event.target.closest("[data-open-dnd-sheet]");

    if (syncButton) {
      createMissingDndSheetsForCurrentCampaign();
      renderDndMasterSheets();
      alert("Fichas de D&D sincronizadas.");
    }

    if (openSheetButton) {
      openDndMasterSheetModal(openSheetButton.dataset.openDndSheet);
    }
  });

  const form = document.getElementById("dndForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      if (form.dataset.mode !== "edit-dnd-sheet") return;

      event.preventDefault();
      saveDndSheetFromModal(true);
    });

    form.addEventListener("input", () => {
      if (form.dataset.mode !== "edit-dnd-sheet") return;
      saveDndSheetFromModal(false);
    });
  }

  window.addEventListener("storage", () => {
    renderDndMasterSheets();
    refreshOpenDndSheetModal();
  });

  setInterval(renderDndMasterSheets, 1000);
}

function renderDndMasterSheets() {
  const grid = document.getElementById("dndCharactersGrid");
  const counter = document.getElementById("dndCharacterCount");

  if (!grid) return;

  const campaign = getCurrentCampaign();

  if (!campaign || campaign.sistema !== "D&D") {
    grid.innerHTML = `
      <div class="altherium-empty">
        <h3>Campanha não encontrada</h3>
        <p>Volte para suas campanhas e entre novamente.</p>
      </div>
    `;

    if (counter) counter.textContent = "0";
    return;
  }

  const playerIds = getCampaignPlayerIds(campaign);

  playerIds.forEach((playerId) => {
    getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);
  });

  if (counter) counter.textContent = playerIds.length;

  if (!playerIds.length) {
    grid.innerHTML = `
      <div class="altherium-empty">
        <h3>Nenhuma ficha disponível</h3>
        <p>Adicione jogadores à campanha para gerar fichas.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = playerIds
    .map((playerId) => {
      const player = usuariosPermitidos.find((item) => item.id === playerId);
      const sheet = getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);

      return `
        <button class="sheet-card dnd-sheet-card" data-open-dnd-sheet="${playerId}">
          <div class="sheet-card-top">
            <span>${player ? player.nome : "Jogador"}</span>
            <strong>${sheet.classLevel || "Sem classe"}</strong>
          </div>

          <h3>${sheet.characterName || "Personagem sem nome"}</h3>
          <p>Raça: ${sheet.race || "---"} • CA ${sheet.armorClass || "0"}</p>
          <p>
            PV ${sheet.hpCurrent || "0"}/${sheet.hpMax || "0"} •
            Iniciativa ${sheet.combatInitiative || "--"}
          </p>

          <div class="sheet-card-footer">
            <span>Abrir ficha completa</span>
            <strong>→</strong>
          </div>
        </button>
      `;
    })
    .join("");
}

function openDndMasterSheetModal(playerId) {
  const modal = document.getElementById("dndModal");
  const modalTitle = document.getElementById("dndModalTitle");
  const form = document.getElementById("dndForm");
  const formFields = document.getElementById("dndFormFields");
  const submitButton = form ? form.querySelector("button[type='submit']") : null;
  const campaign = getCurrentCampaign();

  if (!modal || !modalTitle || !form || !formFields || !campaign) return;

  const sheet = getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);

  modalTitle.textContent = `Ficha de ${sheet.ownerName}`;
  formFields.innerHTML = buildDndSheetEditor(sheet, true);

  form.dataset.mode = "edit-dnd-sheet";
  form.dataset.playerId = playerId;

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = "Salvar ficha";
  }

  modal.classList.add("active");
}

function buildDndSheetEditor(sheet, isModal = false) {
  return `
    <div class="dnd-character-sheet ${isModal ? "master-dnd-sheet" : ""}">
      <section class="dnd-paper-page">
        <div class="dnd-frame">
          <div class="dnd-banner"><h3>Dungeons & Dragons</h3></div>

          <div class="dnd-identity-grid">
            ${dndInput("Nome do personagem", "characterName", sheet.characterName)}
            ${dndInput("Classe & Nível", "classLevel", sheet.classLevel)}
            ${dndInput("Raça", "race", sheet.race)}
            ${dndInput("Antecedente", "background", sheet.background)}
            ${dndInput("Alinhamento", "alignment", sheet.alignment)}
            ${dndInput("Experiência", "experience", sheet.experience, "number")}
          </div>

          <div class="dnd-main-grid">
            <div class="dnd-abilities-column">
              ${dndAbility("Força", "strScore", sheet.strScore)}
              ${dndAbility("Destreza", "dexScore", sheet.dexScore)}
              ${dndAbility("Constituição", "conScore", sheet.conScore)}
              ${dndAbility("Inteligência", "intScore", sheet.intScore)}
              ${dndAbility("Sabedoria", "wisScore", sheet.wisScore)}
              ${dndAbility("Carisma", "chaScore", sheet.chaScore)}
            </div>

            <div class="dnd-middle-column">
              <div class="dnd-box">
                <h3>Testes de resistência</h3>
                <div class="dnd-list">
                  ${dndMiniInput("Força", "saveStr", sheet.saveStr)}
                  ${dndMiniInput("Destreza", "saveDex", sheet.saveDex)}
                  ${dndMiniInput("Constituição", "saveCon", sheet.saveCon)}
                  ${dndMiniInput("Inteligência", "saveInt", sheet.saveInt)}
                  ${dndMiniInput("Sabedoria", "saveWis", sheet.saveWis)}
                  ${dndMiniInput("Carisma", "saveCha", sheet.saveCha)}
                </div>
              </div>

              <div class="dnd-box">
                <h3>Perícias</h3>
                <div class="dnd-list two-cols">
                  ${DND_SKILLS.map(([key, label]) => dndMiniInput(label, key, sheet[key])).join("")}
                </div>
              </div>
            </div>

            <div class="dnd-right-column">
              <div class="dnd-stats-grid">
                ${dndStat("CA", "armorClass", sheet.armorClass)}
                ${dndStat("Iniciativa", "initiative", sheet.initiative)}
                ${dndStat("Velocidade", "speed", sheet.speed)}
                ${dndStat("Bônus prof.", "proficiencyBonus", sheet.proficiencyBonus)}
              </div>

              <div class="initiative-sheet-box dnd-initiative-box">
                <label>
                  <span>Iniciativa de combate</span>
                  <input type="number" name="combatInitiative" value="${escapeHtml(sheet.combatInitiative)}" placeholder="0" />
                </label>
                <p>Esse valor entra automaticamente na ordem de iniciativa.</p>
              </div>

              <div class="dnd-hp-box">
                <h3>Pontos de vida</h3>
                <div class="dnd-hp-row">
                  ${dndHpInput("Atual", "hpCurrent", sheet.hpCurrent)}
                  <span>/</span>
                  ${dndHpInput("Máximo", "hpMax", sheet.hpMax)}
                </div>
                ${dndInput("PV temporários", "hpTemp", sheet.hpTemp, "number")}
              </div>

              <div class="dnd-box">
                <h3>Dados de vida</h3>
                <div class="dnd-list">
                  ${dndMiniInput("Dado total", "hitDiceTotal", sheet.hitDiceTotal)}
                  ${dndMiniInput("Restantes", "hitDiceRemaining", sheet.hitDiceRemaining)}
                </div>
              </div>

              <div class="dnd-box">
                <h3>Testes contra morte</h3>
                <div class="dnd-list">
                  ${dndMiniInput("Sucessos", "deathSuccesses", sheet.deathSuccesses)}
                  ${dndMiniInput("Falhas", "deathFailures", sheet.deathFailures)}
                </div>
              </div>
            </div>
          </div>

          <div class="dnd-bottom-grid">
            <div class="dnd-box">
              <h3>Ataques & Magia</h3>
              <div class="dnd-attack-table">
                <div><span>Nome</span><span>Bônus</span><span>Dano / Tipo</span></div>
                ${[1, 2, 3].map((index) => dndAttackRow(index, sheet)).join("")}
              </div>
            </div>

            ${dndTextareaBox("Equipamento", "equipment", sheet.equipment, 10)}
            ${dndTextareaBox("Características", "features", sheet.features, 10)}
          </div>
        </div>
      </section>

      <section class="dnd-paper-page">
        <div class="dnd-frame">
          <div class="dnd-section-title"><h3>Detalhes do personagem</h3></div>

          <div class="dnd-details-grid">
            ${dndInput("Idade", "age", sheet.age)}
            ${dndInput("Altura", "height", sheet.height)}
            ${dndInput("Peso", "weight", sheet.weight)}
            ${dndInput("Olhos", "eyes", sheet.eyes)}
            ${dndInput("Pele", "skin", sheet.skin)}
            ${dndInput("Cabelo", "hair", sheet.hair)}
            ${dndInput("Facção", "faction", sheet.faction)}
          </div>

          <div class="dnd-story-grid">
            ${dndTextareaBox("Traços de personalidade", "personalityTraits", sheet.personalityTraits, 6)}
            ${dndTextareaBox("Ideais", "ideals", sheet.ideals, 6)}
            ${dndTextareaBox("Laços", "bonds", sheet.bonds, 6)}
            ${dndTextareaBox("Defeitos", "flaws", sheet.flaws, 6)}
            ${dndTextareaBox("Manias", "quirks", sheet.quirks, 6)}
            ${dndTextareaBox("Aparência", "appearance", sheet.appearance, 6)}
          </div>

          ${dndTextareaBox("Características & Traços adicionais", "additionalFeatures", sheet.additionalFeatures, 10)}
          ${dndTextareaBox("Inventário", "inventory", sheet.inventory, 10)}
        </div>
      </section>

      <section class="dnd-paper-page">
        <div class="dnd-frame">
          <div class="dnd-section-title"><h3>Magias</h3></div>

          <div class="dnd-spell-header">
            ${dndInput("Classe mágica", "spellcastingClass", sheet.spellcastingClass)}
            ${dndInput("Habilidade de conjuração", "spellAbility", sheet.spellAbility)}
            ${dndInput("CD de resistência", "spellSaveDc", sheet.spellSaveDc)}
            ${dndInput("Bônus de ataque", "spellAttackBonus", sheet.spellAttackBonus)}
          </div>

          <div class="dnd-spell-slots">
            <h3>Espaços de magia</h3>
            <div>
              ${Array.from({ length: 9 }, (_, index) => index + 1)
                .map(
                  (level) => `
                    <label>${level}º
                      <input name="spellSlots${level}" type="text" value="${escapeHtml(sheet[`spellSlots${level}`])}" />
                    </label>
                  `
                )
                .join("")}
            </div>
          </div>

          <div class="dnd-spells-grid">
            ${dndTextareaBox("Truques", "cantrips", sheet.cantrips, 10)}
            ${dndTextareaBox("Magias preparadas / conhecidas", "preparedSpells", sheet.preparedSpells, 10)}
            ${dndTextareaBox("Magias e efeitos", "spellNotes", sheet.spellNotes, 14)}
          </div>
        </div>
      </section>
    </div>
  `;
}

function saveDndSheetFromModal(showAlert = false) {
  const form = document.getElementById("dndForm");
  if (!form) return;

  const campaignId = getCurrentCampaignId();
  const playerId = form.dataset.playerId;

  if (!campaignId || !playerId) return;

  updateDndSheet(campaignId, playerId, Object.fromEntries(new FormData(form)));
  refreshCurrentMasterPanel();

  if (showAlert) alert("Ficha de D&D salva com sucesso.");
}

function refreshOpenDndSheetModal() {
  const form = document.getElementById("dndForm");
  const formFields = document.getElementById("dndFormFields");

  if (!form || !formFields || form.dataset.mode !== "edit-dnd-sheet") return;

  const focused = document.activeElement;
  if (focused && form.contains(focused)) return;

  const campaign = getCurrentCampaign();
  const playerId = form.dataset.playerId;

  if (!campaign || !playerId) return;

  formFields.innerHTML = buildDndSheetEditor(getOrCreateDndSheet(campaign.id, playerId, campaign.sistema), true);
}

function setupDndPlayerSheet() {
  const user = getLoggedUser();
  const campaign = getCurrentCampaign();
  const form = document.getElementById("dndPlayerSheetForm");
  const saveButton = document.getElementById("saveDndSheet");

  if (!user || !campaign || !form) return;

  getOrCreateDndSheet(campaign.id, user.id, campaign.sistema);
  loadDndSheetIntoPlayerForm();

  form.addEventListener("input", () => saveDndPlayerSheet(false));

  if (saveButton) saveButton.addEventListener("click", () => saveDndPlayerSheet(true));

  window.addEventListener("storage", loadDndSheetIntoPlayerForm);
  setInterval(loadDndSheetIntoPlayerForm, 1000);
}

function loadDndSheetIntoPlayerForm() {
  const user = getLoggedUser();
  const campaign = getCurrentCampaign();
  const form = document.getElementById("dndPlayerSheetForm");

  if (!user || !campaign || !form) return;

  const focused = document.activeElement;

  if (focused && form.contains(focused)) {
    updateDndPlayerPreview();
    updateDndAutoNumbers();
    return;
  }

  const sheet = getOrCreateDndSheet(campaign.id, user.id, campaign.sistema);

  Object.keys(sheet).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = sheet[key] || "";
  });

  updateDndPlayerPreview();
  updateDndAutoNumbers();
}

function saveDndPlayerSheet(showAlert) {
  const user = getLoggedUser();
  const campaign = getCurrentCampaign();
  const form = document.getElementById("dndPlayerSheetForm");

  if (!user || !campaign || !form) return;

  updateDndSheet(campaign.id, user.id, Object.fromEntries(new FormData(form)));
  updateDndPlayerPreview();
  updateDndAutoNumbers();

  if (showAlert) alert("Ficha de D&D salva com sucesso.");
}

function updateDndPlayerPreview() {
  const form = document.getElementById("dndPlayerSheetForm");
  if (!form) return;

  setText("dndCharacterMini", form.elements.characterName?.value || "---");
  setText("dndClassMini", form.elements.classLevel?.value || "---");
  setText("dndInitiativeMini", form.elements.combatInitiative?.value || "--");
}

function updateDndAutoNumbers() {
  const form = document.getElementById("dndPlayerSheetForm");
  if (!form) return;

  updateDndModView("strScore", "strModView");
  updateDndModView("dexScore", "dexModView");
  updateDndModView("conScore", "conModView");
  updateDndModView("intScore", "intModView");
  updateDndModView("wisScore", "wisModView");
  updateDndModView("chaScore", "chaModView");

  setBarFill("dndHpBarFill", form.elements.hpCurrent.value, form.elements.hpMax.value);
}

function updateDndModView(inputName, viewId) {
  const form = document.getElementById("dndPlayerSheetForm");
  const view = document.getElementById(viewId);
  if (!form || !view) return;

  view.textContent = formatDndMod(form.elements[inputName].value);
}

/* =========================================================
   INICIATIVA
========================================================= */

function setupInitiativeBoard(config) {
  const board = document.getElementById(config.boardId);
  const clearButton = document.getElementById(config.clearButtonId);

  if (!board) return;

  renderInitiativeBoard(config);
  window.addEventListener("storage", () => renderInitiativeBoard(config));
  setInterval(() => renderInitiativeBoard(config), 1000);

  if (clearButton) {
    clearButton.addEventListener("click", () => clearInitiative(config));
  }
}

function renderInitiativeBoard(config) {
  const board = document.getElementById(config.boardId);
  const campaign = getCurrentCampaign();

  if (!board) return;

  if (!campaign) {
    board.innerHTML = `
      <div class="altherium-empty">
        <h3>Campanha não encontrada</h3>
        <p>Volte para suas campanhas e entre novamente.</p>
      </div>
    `;
    return;
  }

  const playerIds = getCampaignPlayerIds(campaign);

  if (!playerIds.length) {
    board.innerHTML = `
      <div class="altherium-empty">
        <h3>Nenhum personagem na iniciativa</h3>
        <p>Adicione jogadores à campanha para montar a ordem.</p>
      </div>
    `;
    return;
  }

  const initiativeList = playerIds
    .map((playerId) => {
      const sheet = config.getSheet(campaign.id, playerId, campaign.sistema);
      const initiativeValue = sheet.combatInitiative;

      return {
        playerId,
        characterName: sheet.characterName || sheet.personagem || sheet.ownerName || "Personagem sem nome",
        initiative: initiativeValue,
        initiativeNumber:
          initiativeValue === "" || initiativeValue === undefined || initiativeValue === null
            ? null
            : Number(initiativeValue),
      };
    })
    .sort((a, b) => {
      if (a.initiativeNumber === null && b.initiativeNumber === null) return 0;
      if (a.initiativeNumber === null) return 1;
      if (b.initiativeNumber === null) return -1;
      return b.initiativeNumber - a.initiativeNumber;
    });

  board.innerHTML = initiativeList
    .map((item, index) => {
      const value = item.initiativeNumber === null ? "--" : item.initiativeNumber;

      return `
        <div class="initiative-row ${index === 0 ? "active" : ""}">
          <div class="initiative-position">${index + 1}</div>

          <div class="initiative-character">
            <strong>${escapeHtml(item.characterName)}</strong>
            <span>${index === 0 ? "Turno atual" : "Aguardando turno"}</span>
          </div>

          <div class="initiative-value">${value}</div>
        </div>
      `;
    })
    .join("");
}

function clearInitiative(config) {
  const campaign = getCurrentCampaign();

  if (!campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (!confirm("Limpar a iniciativa de todos os personagens?")) return;

  getCampaignPlayerIds(campaign).forEach((playerId) => {
    config.updateSheet(campaign.id, playerId, {
      combatInitiative: "",
    });
  });

  renderInitiativeBoard(config);
}

/* =========================================================
   MODAL / REFRESH / TÍTULOS
========================================================= */

function closeSharedModal(modal, form, submitButton) {
  modal.classList.remove("active");

  if (form) {
    form.reset();
    form.dataset.mode = "";
    form.dataset.playerId = "";
  }

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = "Aplicar";
  }
}

function refreshCurrentMasterPanel() {
  if (document.body.classList.contains("altherium-page")) {
    const grid = document.getElementById("playersGrid");
    const counter = document.getElementById("onlineCount");

    if (grid) renderCampaignPlayers(grid, counter);

    renderMasterSheets();
  }

  if (document.body.classList.contains("dnd-master-page")) {
    const grid = document.getElementById("dndPlayersGrid");
    const counter = document.getElementById("dndPlayerCount");

    if (grid) renderCampaignPlayers(grid, counter);

    renderDndMasterSheets();
  }

  setupMasterCampaignName();
}

function setupMasterCampaignName() {
  const campaignName = sessionStorage.getItem("campaignName");
  const masterCampaignName = document.getElementById("masterCampaignName");

  if (masterCampaignName) {
    masterCampaignName.textContent = campaignName || "Campanha não identificada";
  }
}

function setupPlayerInfo(playerElementId, campaignElementId) {
  const user = getLoggedUser();
  const campaignName = sessionStorage.getItem("campaignName");

  setText(playerElementId, user ? user.nome : "---");
  setText(campaignElementId, campaignName || "---");
}

/* =========================================================
   HELPERS
========================================================= */

function getLoggedUser() {
  const loggedUserId =
    sessionStorage.getItem("loggedUserId") || localStorage.getItem("loggedUserId");

  return usuariosPermitidos.find((item) => item.id === loggedUserId);
}

function getCurrentCampaignId() {
  return sessionStorage.getItem("campaignId") || localStorage.getItem("campaignId");
}

function getCurrentCampaign() {
  const campaignId = getCurrentCampaignId();
  return getAllCampaigns().find((item) => item.id === campaignId);
}

function protectPage(requiredSystem, requiredProfile) {
  const loggedUserId =
    sessionStorage.getItem("loggedUserId") || localStorage.getItem("loggedUserId");

  const system = sessionStorage.getItem("system") || localStorage.getItem("system");
  const profile = sessionStorage.getItem("profile") || localStorage.getItem("profile");
  const campaignId = getCurrentCampaignId();

  if (!loggedUserId || system !== requiredSystem || profile !== requiredProfile) {
    alert("Acesso negado.");
    window.location.href = "index.html";
    return;
  }

  const hasAccess = getUserCampaigns(loggedUserId).some(
    (campaign) => campaign.id === campaignId && campaign.perfil === requiredProfile
  );

  if (!hasAccess) {
    alert("Você não tem acesso a esta campanha.");
    window.location.href = "minhas-campanhas.html";
  }
}

function clearCurrentCampaign() {
  sessionStorage.removeItem("campaignId");
  sessionStorage.removeItem("campaignName");
  sessionStorage.removeItem("system");
  sessionStorage.removeItem("profile");
  sessionStorage.removeItem("lastCampaign");
}

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setBarFill(id, currentValue, maxValue) {
  const element = document.getElementById(id);
  if (!element) return;

  const current = Number(currentValue) || 0;
  const max = Number(maxValue) || 0;

  let percent = 0;
  if (max > 0) percent = Math.max(0, Math.min(100, (current / max) * 100));

  element.style.width = `${percent}%`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function textInput(label, name, value) {
  return `
    <label>
      <span>${label}</span>
      <input type="text" name="${name}" value="${escapeHtml(value)}" />
    </label>
  `;
}

function resourceLine(label, currentName, currentValue, maxName, maxValue) {
  return `
    <div class="rune-resource-line">
      <strong>${label}</strong>
      <input type="number" min="0" name="${currentName}" value="${escapeHtml(currentValue)}" />
      <span>/</span>
      <input type="number" min="0" name="${maxName}" value="${escapeHtml(maxValue)}" />
    </div>
  `;
}

function attributeInput(label, name, value) {
  return `<label><span>${label}</span><input type="number" name="${name}" value="${escapeHtml(value)}" /></label>`;
}

function bodyInput(label, roll, name, value) {
  return `<label><span>${label}</span><small>${roll}</small><input type="text" name="${name}" value="${escapeHtml(value)}" /></label>`;
}

function dndInput(label, name, value, type = "text") {
  return `
    <label>
      ${label}
      <input name="${name}" type="${type}" value="${escapeHtml(value)}" />
    </label>
  `;
}

function dndMiniInput(label, name, value) {
  return `
    <label>
      <span>${label}</span>
      <input name="${name}" type="text" value="${escapeHtml(value)}" />
    </label>
  `;
}

function dndAbility(label, name, value) {
  return `
    <label class="dnd-ability-card">
      <span>${label}</span>
      <input name="${name}" type="number" value="${escapeHtml(value)}" />
      <strong>${formatDndMod(value)}</strong>
    </label>
  `;
}

function dndStat(label, name, value) {
  return `
    <label>
      <span>${label}</span>
      <input name="${name}" type="text" value="${escapeHtml(value)}" />
    </label>
  `;
}

function dndHpInput(label, name, value) {
  return `
    <label>
      ${label}
      <input name="${name}" type="number" min="0" value="${escapeHtml(value)}" />
    </label>
  `;
}

function dndAttackRow(index, sheet) {
  return `
    <label>
      <input name="attack${index}Name" type="text" value="${escapeHtml(sheet[`attack${index}Name`])}" />
      <input name="attack${index}Bonus" type="text" value="${escapeHtml(sheet[`attack${index}Bonus`])}" />
      <input name="attack${index}Damage" type="text" value="${escapeHtml(sheet[`attack${index}Damage`])}" />
    </label>
  `;
}

function dndTextareaBox(label, name, value, rows) {
  return `
    <label class="dnd-box dnd-textarea-box">
      <h3>${label}</h3>
      <textarea name="${name}" rows="${rows}">${escapeHtml(value)}</textarea>
    </label>
  `;
}

function formatDndMod(value) {
  const score = Number(value) || 10;
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : String(mod);
}
