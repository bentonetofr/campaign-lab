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
    jogadores: [],
    descricao:
      "Uma aventura clássica de D&D com exploração, monstros lendários e reinos esquecidos.",
  },
];

/* LOGIN */

if (document.body.classList.contains("login-page")) {
  const loginBtn = document.getElementById("loginBtn");
  const userNameInput = document.getElementById("userNameInput");
  const passwordInput = document.getElementById("password");

  loginBtn.addEventListener("click", loginUser);

  passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      loginUser();
    }
  });

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

    localStorage.setItem("loggedUserId", user.id);
    window.location.href = "minhas-campanhas.html";
  }
}

/* MINHAS CAMPANHAS */

if (document.body.classList.contains("my-campaigns-page")) {
  renderMyCampaignsPage();

  window.addEventListener("storage", (event) => {
    if (
      event.key === "customCampaigns" ||
      event.key === "deletedCampaignIds" ||
      event.key === "leftCampaigns"
    ) {
      renderMyCampaignsPage();
    }
  });
}

function renderMyCampaignsPage() {
  const user = getLoggedUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const userNameView = document.getElementById("userNameView");
  const campaignCount = document.getElementById("campaignCount");
  const masterCount = document.getElementById("masterCount");
  const playerCount = document.getElementById("playerCount");

  const masterCampaigns = document.getElementById("masterCampaigns");
  const playerCampaigns = document.getElementById("playerCampaigns");
  const logoutBtn = document.getElementById("logoutBtn");

  const userCampaigns = getUserCampaigns(user.id);

  const campaignsAsMaster = userCampaigns.filter(
    (campaign) => campaign.perfil === "Mestre"
  );

  const campaignsAsPlayer = userCampaigns.filter(
    (campaign) => campaign.perfil === "Jogador"
  );

  if (userNameView) userNameView.textContent = user.nome;
  if (campaignCount) campaignCount.textContent = userCampaigns.length;
  if (masterCount) masterCount.textContent = campaignsAsMaster.length;
  if (playerCount) playerCount.textContent = campaignsAsPlayer.length;

  renderCampaigns(masterCampaigns, campaignsAsMaster);
  renderCampaigns(playerCampaigns, campaignsAsPlayer);

  if (logoutBtn) {
    logoutBtn.onclick = logout;
  }
}

/* CRIAR CAMPANHA */

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

  if (creatorNameView) {
    creatorNameView.textContent = user.nome;
  }

  const availablePlayers = usuariosPermitidos.filter(
    (player) => player.id !== user.id
  );

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

    const selectedPlayers = Array.from(
      playersPickerGrid.querySelectorAll("input:checked")
    ).map((input) => input.value);

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

    alert("Campanha criada com sucesso.");
    window.location.href = "minhas-campanhas.html";
  });
}

/* PROTEÇÃO */

if (document.body.classList.contains("altherium-page")) {
  protectPage("Altherium", "Mestre");
}

if (document.body.classList.contains("altherium-player-page")) {
  protectPage("Altherium", "Jogador");
  setupPlayerInfo("playerNameView", "campaignNameView");
}

if (document.body.classList.contains("dnd-master-page")) {
  protectPage("D&D", "Mestre");
}

if (document.body.classList.contains("dnd-player-page")) {
  protectPage("D&D", "Jogador");
  setupPlayerInfo("dndPlayerNameView", "dndCampaignNameView");
}

/* CAMPANHAS */

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

function hasPlayerLeftCampaign(userId, campaignId) {
  const leftCampaigns = getLeftCampaigns();

  return leftCampaigns.some(
    (item) => item.userId === userId && item.campaignId === campaignId
  );
}

function getUserCampaigns(userId) {
  const allCampaigns = getAllCampaigns();
  const campaigns = [];

  allCampaigns.forEach((campaign) => {
    if (campaign.mestreId === userId) {
      campaigns.push({
        ...campaign,
        perfil: "Mestre",
        pagina: getCampaignPage(campaign.sistema, "Mestre"),
      });
    }

    if (
      campaign.jogadores.includes(userId) &&
      !hasPlayerLeftCampaign(userId, campaign.id)
    ) {
      campaigns.push({
        ...campaign,
        perfil: "Jogador",
        pagina: getCampaignPage(campaign.sistema, "Jogador"),
      });
    }
  });

  return campaigns;
}

function getCampaignPage(system, profile) {
  if (system === "Altherium" && profile === "Mestre") {
    return "altherium-mestre.html";
  }

  if (system === "Altherium" && profile === "Jogador") {
    return "altherium-jogador.html";
  }

  if (system === "D&D" && profile === "Mestre") {
    return "dnd-mestre.html";
  }

  if (system === "D&D" && profile === "Jogador") {
    return "dnd-jogador.html";
  }

  return "minhas-campanhas.html";
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
            <button
              type="button"
              class="campaign-danger-btn"
              onclick="deleteCampaign(event, '${campaign.id}')"
            >
              Excluir campanha
            </button>
          `
          : `
            <button
              type="button"
              class="campaign-leave-btn"
              onclick="leaveCampaign(event, '${campaign.id}')"
            >
              Sair da campanha
            </button>
          `;

      return `
        <div class="premium-campaign-card campaign-card-wrapper">
          <button
            type="button"
            class="campaign-main-action"
            onclick="enterCampaign('${campaign.id}', '${campaign.nome}', '${campaign.sistema}', '${campaign.perfil}', '${campaign.pagina}')"
          >
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

function enterCampaign(id, nome, sistema, perfil, pagina) {
  localStorage.setItem("campaignId", id);
  localStorage.setItem("campaignName", nome);
  localStorage.setItem("system", sistema);
  localStorage.setItem("profile", perfil);

  const lastCampaignData = {
    id,
    name: nome,
    system: sistema,
    profile: perfil,
    players: "01",
    sessions: "00",
    sheets: "00",
    items: "00",
  };

  localStorage.setItem("lastCampaign", JSON.stringify(lastCampaignData));

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

  const confirmDelete = confirm(
    `Tem certeza que quer excluir a campanha "${campaign.nome}"?`
  );

  if (!confirmDelete) return;

  const customCampaigns = getCustomCampaigns();
  const isCustom = customCampaigns.some((item) => item.id === campaignId);

  if (isCustom) {
    const updatedCampaigns = customCampaigns.filter(
      (item) => item.id !== campaignId
    );

    saveCustomCampaigns(updatedCampaigns);
  } else {
    const deletedIds = getDeletedCampaignIds();

    if (!deletedIds.includes(campaignId)) {
      deletedIds.push(campaignId);
      saveDeletedCampaignIds(deletedIds);
    }
  }

  const currentCampaignId = localStorage.getItem("campaignId");

  if (currentCampaignId === campaignId) {
    localStorage.removeItem("campaignId");
    localStorage.removeItem("campaignName");
    localStorage.removeItem("system");
    localStorage.removeItem("profile");
  }

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

  if (!campaign.jogadores.includes(user.id)) {
    alert("Você não é jogador desta campanha.");
    return;
  }

  const confirmLeave = confirm(
    `Tem certeza que quer sair da campanha "${campaign.nome}"?`
  );

  if (!confirmLeave) return;

  const customCampaigns = getCustomCampaigns();
  const customCampaign = customCampaigns.find((item) => item.id === campaignId);

  if (customCampaign) {
    customCampaign.jogadores = customCampaign.jogadores.filter(
      (playerId) => playerId !== user.id
    );

    saveCustomCampaigns(customCampaigns);
  } else {
    const leftCampaigns = getLeftCampaigns();

    const alreadyLeft = leftCampaigns.some(
      (item) => item.userId === user.id && item.campaignId === campaignId
    );

    if (!alreadyLeft) {
      leftCampaigns.push({
        userId: user.id,
        campaignId,
      });

      saveLeftCampaigns(leftCampaigns);
    }
  }

  const currentCampaignId = localStorage.getItem("campaignId");

  if (currentCampaignId === campaignId) {
    localStorage.removeItem("campaignId");
    localStorage.removeItem("campaignName");
    localStorage.removeItem("system");
    localStorage.removeItem("profile");
  }

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

/* GLOBAIS */

function getLoggedUser() {
  const loggedUserId = localStorage.getItem("loggedUserId");
  return usuariosPermitidos.find((item) => item.id === loggedUserId);
}

function protectPage(requiredSystem, requiredProfile) {
  const loggedUserId = localStorage.getItem("loggedUserId");
  const system = localStorage.getItem("system");
  const profile = localStorage.getItem("profile");
  const campaignId = localStorage.getItem("campaignId");

  if (!loggedUserId || system !== requiredSystem || profile !== requiredProfile) {
    alert("Acesso negado.");
    window.location.href = "index.html";
    return;
  }

  const userCampaigns = getUserCampaigns(loggedUserId);

  const hasAccess = userCampaigns.some(
    (campaign) =>
      campaign.id === campaignId && campaign.perfil === requiredProfile
  );

  if (!hasAccess) {
    alert("Você não tem acesso a esta campanha.");
    window.location.href = "minhas-campanhas.html";
  }
}

function setupPlayerInfo(playerElementId, campaignElementId) {
  const user = getLoggedUser();
  const campaignName = localStorage.getItem("campaignName");

  const playerElement = document.getElementById(playerElementId);
  const campaignElement = document.getElementById(campaignElementId);

  if (playerElement) {
    playerElement.textContent = user ? user.nome : "---";
  }

  if (campaignElement) {
    campaignElement.textContent = campaignName || "---";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}