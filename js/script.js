const SUPABASE_URL = "https://yybcfzwrjdjgybagjcgm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5YmNmendyamRqZ3liYWdqY2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NTM3MzksImV4cCI6MjA5MzMyOTczOX0.yBYSGoBgbCOJR0hDKr2lsY7f12amhbjm1qd36pkK4cE";

const DB =
  window.supabaseClient ||
  (window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null);

window.supabaseClient = DB;

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

const ALTHERIUM_ROOT_OPTIONS = [
  { value: "", label: "Selecione a raíz" },
  { value: "Berserk", label: "Berserk" },
  { value: "Runaskin", label: "Runaskin" },
  { value: "Pilar", label: "Pilar" },
];

const PILAR_TRIUMPH_GROUPS = [
  {
    cards: 1,
    triumphs: [
      {
        name: "Fio do Destino",
        action: "Ação Bônus",
        description: "Adicione -20 a um teste relacionado à sorte ou evento imprevisto. Já que o dado de sorte é 1d100.",
      },
      {
        name: "Língua de Ferro",
        action: "Ação Bônus",
        description: "Adicione +1d10 ao teste de Intimidação ou Persuasão.",
      },
      {
        name: "Mira do Capitão",
        action: "Ação Bônus",
        description: "Conceda +1d10 em um teste de ataque de um aliado no próximo ataque.",
      },
      {
        name: "Olhar de Lodin",
        action: "Ação Bônus",
        description: "Você recebe +2 em Investigação durante a cena.",
      },
      {
        name: "Punhal na Sombra",
        action: "Ação Bônus",
        description: "Quando atacar oculto, adicione +4 de dano.",
      },
      {
        name: "Rastro dos Deuses",
        action: "Ação Bônus",
        description: "Adicione +1d10 a um teste de Investigação.",
      },
      {
        name: "Toque do Ermitão",
        action: "Ação Bônus",
        description: "Ao tocar ou inspecionar um material ou substância desconhecida, você identifica sua natureza e usos possíveis instantaneamente.",
      },
    ],
  },
  {
    cards: 2,
    triumphs: [
      {
        name: "Fúria Moldada",
        action: "Ação Bônus",
        description: "Numa rolagem que normalmente usa Fúria, você pode substituir Fúria por outro atributo à sua escolha para esse teste.",
      },
      {
        name: "Ladrão de Sorte",
        action: "Ação Bônus",
        description: "Escolha um aliado ou inimigo que acabou de rolar. Transfira o resultado dele para você.",
      },
      {
        name: "Sangue Ardente",
        action: "Ação Bônus",
        description: "Em testes que usam Fúria, adicione +1d10.",
      },
      {
        name: "Sopro de Níðhöggr",
        action: "Ação Bônus",
        description: "Escolha um inimigo. No próximo teste importante dele, aplique -1d10 ao teste dele.",
      },
      {
        name: "Voz de Mjörr",
        action: "Ação Bônus",
        description: "Por uma cena, você recebe +4 em testes sociais, como Persuasão, Enganação e Intimidação, quando fala com presença firme.",
      },
      {
        name: "Passo Fantasma",
        action: "Ação Bônus",
        description: "Durante este turno você se move sem ser notado. Ganha +4 em Furtividade e não provoca ataques de oportunidade por movimento.",
      },
      {
        name: "Olhos do Augúrio",
        action: "Ação Bônus",
        description: "Marque um alvo por até a cena inteira. Enquanto marcado, você recebe +1d10 na próxima ação direta.",
      },
    ],
  },
  {
    cards: 3,
    triumphs: [
      {
        name: "Bênção de Hamingja",
        action: "Ação Bônus",
        description: "Quando fizer um teste importante, você pode rerrolar os dados e escolher o resultado melhor.",
      },
      {
        name: "Chama Inspiradora",
        action: "Ação Bônus",
        description: "Escolha um aliado. Ele adiciona +2 a um atributo para um teste específico. Aplica-se a um único teste.",
      },
      {
        name: "Conselho dos Caçadores",
        action: "Ação Bônus",
        description: "Enquanto você coordena uma investigação em grupo, todos ganham +4 em testes de Investigação nessa cena.",
      },
      {
        name: "Guarda de Skaldir",
        action: "Ação Bônus",
        description: "Por uma cena, aliados próximos recebem +4 em Impulso.",
      },
      {
        name: "Mão Precisa",
        action: "Ação Bônus",
        description: "Escolha uma rolagem importante. Todos os dados nessa rolagem têm mínimo 5. Resultados 1 a 4 contam como 5.",
      },
      {
        name: "Ouvido do Julgador",
        action: "Ação Bônus",
        description: "Ao ouvir alguém falar por até 1 minuto, você identifica variações que denunciam mentira. O mestre confirma ou nega.",
      },
      {
        name: "Retorno do Baralho",
        action: "Ação Bônus",
        description: "Você recupera 1d20+3 cartas do descarte para a sua mão.",
      },
      {
        name: "Teia de Urðr",
        action: "Ação Bônus",
        description: "Uma vez por cena, anule um evento recente. Substitua um teste anterior de um aliado ou oponente por uma nova rolagem. O mestre aplica consequências narrativas.",
      },
      {
        name: "Sombra Antecipada",
        action: "Ação Bônus",
        description: "Escolha um inimigo visível. Você recebe uma visão lúgubre do próximo ato dele. Ele deve declarar se irá atacar, recuar ou usar habilidade especial.",
      },
      {
        name: "Trilha do Presságio",
        action: "Ação Bônus",
        description: "Até o fim do turno, seu deslocamento dobra.",
      },
    ],
  },
  {
    cards: 4,
    triumphs: [
      {
        name: "Ecos do Acontecido",
        action: "Ação Bônus",
        description: "Ao investigar um local por atenção ou tempo, você reconstrói eventos recentes. Receba +4 em Investigação e revele até 3 detalhes relevantes escolhidos pelo mestre.",
      },
      {
        name: "Instinto Ancestral",
        action: "Ação Bônus",
        description: "Antes de tomar uma ação decisiva, role com vantagem narrativa. Receba +2 no teste e um breve insight do mestre sobre a probabilidade.",
      },
    ],
  },
];

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

let profilesCache = [];
let campaignsCache = [];
let realtimeChannel = null;
let saveTimer = null;

/* =========================================================
   BOOT
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  setupCampaignLabNumberControls();
  setupHeaderBackButton();
  setupAltheriumRootDynamicControls();
  if (!DB) {
    alert("Supabase não carregou. Verifique se supabase-config.js está antes do script.js.");
    return;
  }

  if (document.body.classList.contains("login-page")) {
    setupLoginPage();
    return;
  }

  const user = getLoggedUserFromSession();

  if (!user && needsLoggedUser()) {
    window.location.href = "index.html";
    return;
  }

  if (document.body.classList.contains("my-campaigns-page")) {
    await renderMyCampaignsPage();
    subscribeGlobalRealtime(renderMyCampaignsPage);
  }

  if (document.body.classList.contains("create-campaign-page")) {
    await setupCreateCampaignPage();
  }

  if (document.body.classList.contains("altherium-page")) {
    await protectPage("Altherium", "Mestre");
    await setupMasterCampaignName();
    await setupMasterPlayersRealtime("playersGrid", "onlineCount");
    await setupAltheriumMasterSheets();
    await setupInitiativeBoard({
      system: "Altherium",
      boardId: "initiativeBoard",
      clearButtonId: "clearInitiativeBtn",
      getSheet: getOrCreateCampaignSheet,
      updateSheet: updateCampaignSheet,
    });
    await setupAltheriumBestiary();
    setupAddPlayersToCampaign({
      modalId: "altheriumModal",
      titleId: "altheriumModalTitle",
      fieldsId: "altheriumFormFields",
      formId: "altheriumForm",
      openSelector: "[data-open-modal='player']",
      closeSelector: "[data-close-modal]",
    });
    subscribeCampaignRealtime(refreshCurrentMasterPanel);
  }

  if (document.body.classList.contains("altherium-player-page")) {
    await protectPage("Altherium", "Jogador");
    setupPlayerInfo("playerNameView", "campaignNameView");
    await setupAltheriumPlayerSheet();
    subscribeCampaignRealtime(loadSheetIntoPlayerForm);
  }

  if (document.body.classList.contains("dnd-master-page")) {
    await protectPage("D&D", "Mestre");
    await setupMasterCampaignName();
    await setupMasterPlayersRealtime("dndPlayersGrid", "dndPlayerCount");
    await setupDndMasterSheets();
    await setupInitiativeBoard({
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
    subscribeCampaignRealtime(refreshCurrentMasterPanel);
  }

  if (document.body.classList.contains("dnd-player-page")) {
    await protectPage("D&D", "Jogador");
    setupPlayerInfo("dndPlayerNameView", "dndCampaignNameView");
    await setupDndPlayerSheet();
    subscribeCampaignRealtime(loadDndSheetIntoPlayerForm);
  }

  setupTabs();
});

function needsLoggedUser() {
  return (
    document.body.classList.contains("my-campaigns-page") ||
    document.body.classList.contains("create-campaign-page") ||
    document.body.classList.contains("altherium-page") ||
    document.body.classList.contains("altherium-player-page") ||
    document.body.classList.contains("dnd-master-page") ||
    document.body.classList.contains("dnd-player-page")
  );
}

/* =========================================================
   LOGIN
========================================================= */

function setupLoginPage() {
  const loginBtn = document.getElementById("loginBtn");
  const userNameInput = document.getElementById("userNameInput");
  const passwordInput = document.getElementById("password");

  if (loginBtn) loginBtn.addEventListener("click", loginUser);

  if (passwordInput) {
    passwordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") loginUser();
    });
  }

  async function loginUser() {
    const typedName = userNameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!typedName) {
      alert("Digite seu nome.");
      return;
    }

    const { data: user, error } = await DB
      .from("profiles")
      .select("id, name, password")
      .eq("id", typedName)
      .maybeSingle();

    if (error) {
      console.error(error);
      alert("Erro ao buscar usuário no Supabase.");
      return;
    }

    if (!user) {
      alert("sai fora chefe, vc n faz parte dos casas. Mete o pé!");
      return;
    }

    if (user.password !== password) {
      alert("Para de ser burro fi, coloca a senha certa krai.");
      return;
    }

    sessionStorage.setItem("loggedUserId", user.id);
    sessionStorage.setItem("loggedUserName", user.name);
    window.location.href = "minhas-campanhas.html";
  }
}

/* =========================================================
   PROFILES
========================================================= */

async function getProfiles(force = false) {
  if (profilesCache.length && !force) return profilesCache;

  const { data, error } = await DB
    .from("profiles")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error(error);
    return profilesCache;
  }

  profilesCache = data || [];
  return profilesCache;
}

function getLoggedUserFromSession() {
  const id = sessionStorage.getItem("loggedUserId");
  const name = sessionStorage.getItem("loggedUserName");

  if (!id) return null;

  return {
    id,
    nome: name || id,
    name: name || id,
  };
}

/* =========================================================
   CAMPANHAS
========================================================= */

async function getAllCampaigns(force = false) {
  if (campaignsCache.length && !force) return campaignsCache;

  const { data, error } = await DB
    .from("campaigns")
    .select(
      `
      id,
      name,
      system,
      master_id,
      description,
      created_at,
      campaign_members (
        user_id,
        role
      )
    `
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    alert("Erro ao carregar campanhas do Supabase.");
    return campaignsCache;
  }

  campaignsCache = (data || []).map(mapCampaignFromDb);
  return campaignsCache;
}

function mapCampaignFromDb(row) {
  const members = row.campaign_members || [];
  const jogadores = members
    .filter((member) => member.role === "Jogador")
    .map((member) => member.user_id);

  return {
    id: row.id,
    nome: row.name,
    name: row.name,
    sistema: row.system,
    system: row.system,
    mestreId: row.master_id,
    master_id: row.master_id,
    descricao: row.description || "",
    description: row.description || "",
    membros: members,
    jogadores,
  };
}

async function getCurrentCampaign(force = false) {
  const campaignId = getCurrentCampaignId();
  if (!campaignId) return null;

  const campaigns = await getAllCampaigns(force);
  return campaigns.find((item) => item.id === campaignId) || null;
}

function getCampaignPlayerIds(campaign) {
  return Array.isArray(campaign.jogadores) ? campaign.jogadores : [];
}

async function getUserCampaigns(userId) {
  const campaigns = await getAllCampaigns(true);
  const userCampaigns = [];

  campaigns.forEach((campaign) => {
    const activePlayers = getCampaignPlayerIds(campaign);

    if (campaign.mestreId === userId) {
      userCampaigns.push({
        ...campaign,
        perfil: "Mestre",
        pagina: getCampaignPage(campaign.sistema, "Mestre"),
      });
    }

    if (activePlayers.includes(userId)) {
      userCampaigns.push({
        ...campaign,
        perfil: "Jogador",
        pagina: getCampaignPage(campaign.sistema, "Jogador"),
      });
    }
  });

  return userCampaigns;
}

async function renderMyCampaignsPage() {
  const user = getLoggedUserFromSession();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const userCampaigns = await getUserCampaigns(user.id);
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

async function enterCampaignById(id, perfil) {
  const campaigns = await getAllCampaigns(true);
  const campaign = campaigns.find((item) => item.id === id);

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

  window.location.href = pagina;
}

function getCampaignPage(system, profile) {
  if (system === "Altherium" && profile === "Mestre") return "altherium-mestre.html";
  if (system === "Altherium" && profile === "Jogador") return "altherium-jogador.html";
  if (system === "D&D" && profile === "Mestre") return "dnd-mestre.html";
  if (system === "D&D" && profile === "Jogador") return "dnd-jogador.html";

  return "minhas-campanhas.html";
}

async function deleteCampaign(event, campaignId) {
  event.stopPropagation();

  const user = getLoggedUserFromSession();
  const campaigns = await getAllCampaigns(true);
  const campaign = campaigns.find((item) => item.id === campaignId);

  if (!user || !campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (campaign.mestreId !== user.id) {
    alert("Você só pode excluir campanhas que você mestra.");
    return;
  }

  if (!confirm(`Tem certeza que quer excluir a campanha "${campaign.nome}"?`)) return;

  const { error } = await DB
    .from("campaigns")
    .delete()
    .eq("id", campaignId)
    .eq("master_id", user.id);

  if (error) {
    console.error(error);
    alert("Erro ao excluir campanha.");
    return;
  }

  campaignsCache = [];

  if (getCurrentCampaignId() === campaignId) clearCurrentCampaign();

  await renderMyCampaignsPage();
}

async function leaveCampaign(event, campaignId) {
  event.stopPropagation();

  const user = getLoggedUserFromSession();

  if (!user) return;

  if (!confirm("Tem certeza que quer sair desta campanha?")) return;

  const { error } = await DB
    .from("campaign_members")
    .delete()
    .eq("campaign_id", campaignId)
    .eq("user_id", user.id)
    .eq("role", "Jogador");

  if (error) {
    console.error(error);
    alert("Erro ao sair da campanha.");
    return;
  }

  campaignsCache = [];

  if (getCurrentCampaignId() === campaignId) clearCurrentCampaign();

  await renderMyCampaignsPage();
}

/* =========================================================
   CRIAR CAMPANHA
========================================================= */

async function setupCreateCampaignPage() {
  const user = getLoggedUserFromSession();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  setText("creatorNameView", user.nome);

  const playersPickerGrid = document.getElementById("playersPickerGrid");
  const createCampaignForm = document.getElementById("createCampaignForm");

  if (!playersPickerGrid || !createCampaignForm) return;

  const profiles = (await getProfiles(true)).filter((profile) => profile.id !== user.id);

  playersPickerGrid.innerHTML = profiles
    .map(
      (player) => `
        <label class="player-check-card">
          <input type="checkbox" value="${player.id}" />
          <span>${player.name}</span>
        </label>
      `
    )
    .join("");

  createCampaignForm.addEventListener("submit", async (event) => {
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

    const { data: campaign, error: campaignError } = await DB
      .from("campaigns")
      .insert({
        name: campaignName,
        system: campaignSystem,
        master_id: user.id,
        description: `Campanha de ${campaignSystem} criada por ${user.nome}.`,
      })
      .select("id, name, system")
      .single();

    if (campaignError) {
      console.error(campaignError);
      alert("Erro ao criar campanha.");
      return;
    }

    const members = [
      {
        campaign_id: campaign.id,
        user_id: user.id,
        role: "Mestre",
      },
      ...selectedPlayers.map((playerId) => ({
        campaign_id: campaign.id,
        user_id: playerId,
        role: "Jogador",
      })),
    ];

    const { error: membersError } = await DB.from("campaign_members").insert(members);

    if (membersError) {
      console.error(membersError);
      alert("Campanha criada, mas houve erro ao adicionar membros.");
      return;
    }

    for (const playerId of selectedPlayers) {
      if (campaignSystem === "Altherium") {
        await getOrCreateCampaignSheet(campaign.id, playerId, campaignSystem);
      }

      if (campaignSystem === "D&D") {
        await getOrCreateDndSheet(campaign.id, playerId, campaignSystem);
      }
    }

    campaignsCache = [];

    alert("Campanha criada com sucesso.");
    window.location.href = "minhas-campanhas.html";
  });
}

/* =========================================================
   PROTEÇÃO
========================================================= */

async function protectPage(requiredSystem, requiredProfile) {
  const user = getLoggedUserFromSession();
  const system = sessionStorage.getItem("system");
  const profile = sessionStorage.getItem("profile");
  const campaignId = getCurrentCampaignId();

  if (!user || system !== requiredSystem || profile !== requiredProfile || !campaignId) {
    alert("Acesso negado.");
    window.location.href = "index.html";
    return;
  }

  const userCampaigns = await getUserCampaigns(user.id);

  const hasAccess = userCampaigns.some(
    (campaign) => campaign.id === campaignId && campaign.perfil === requiredProfile
  );

  if (!hasAccess) {
    alert("Você não tem acesso a esta campanha.");
    window.location.href = "minhas-campanhas.html";
  }
}

/* =========================================================
   ABAS
========================================================= */

function setupTabs() {
  document.addEventListener("click", (event) => {
    const tab = event.target.closest(".altherium-tab");
    if (!tab) return;

    document.querySelectorAll(".altherium-tab").forEach((button) => button.classList.remove("active"));
    document.querySelectorAll(".altherium-section").forEach((section) => section.classList.remove("active"));

    tab.classList.add("active");

    const selectedSection = document.getElementById(tab.dataset.tab);
    if (selectedSection) selectedSection.classList.add("active");
  });
}

/* =========================================================
   PLAYERS NO PAINEL DO MESTRE
========================================================= */

async function setupMasterPlayersRealtime(gridId, counterId) {
  await renderCampaignPlayers(gridId, counterId);
}

async function renderCampaignPlayers(gridIdOrElement, counterIdOrElement) {
  const grid =
    typeof gridIdOrElement === "string" ? document.getElementById(gridIdOrElement) : gridIdOrElement;
  const counter =
    typeof counterIdOrElement === "string" ? document.getElementById(counterIdOrElement) : counterIdOrElement;

  if (!grid) return;

  const campaign = await getCurrentCampaign(true);

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

  const profiles = await getProfiles();
  const players = getCampaignPlayerIds(campaign)
    .map((playerId) => profiles.find((profile) => profile.id === playerId))
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
          <h3>${player.name}</h3>
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
   ADICIONAR / REMOVER PLAYERS
========================================================= */

function setupAddPlayersToCampaign(config) {
  const modal = document.getElementById(config.modalId);
  const modalTitle = document.getElementById(config.titleId);
  const formFields = document.getElementById(config.fieldsId);
  const form = document.getElementById(config.formId);

  if (!modal || !modalTitle || !formFields || !form) return;

  const submitButton = form.querySelector("button[type='submit']");

  document.addEventListener("click", async (event) => {
    const openButton = event.target.closest(config.openSelector);
    const closeButton = event.target.closest(config.closeSelector);

    if (openButton) {
      event.preventDefault();
      await openAddPlayersModal(modal, modalTitle, formFields, form, submitButton);
    }

    if (closeButton || event.target === modal) {
      closeSharedModal(modal, form, submitButton);
    }
  });

  form.addEventListener("submit", async (event) => {
    if (form.dataset.mode !== "add-players") return;

    event.preventDefault();
    await addSelectedPlayersToCampaign(form, modal, submitButton);
  });
}

async function openAddPlayersModal(modal, modalTitle, formFields, form, submitButton) {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign(true);

  if (!user || !campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (campaign.mestreId !== user.id) {
    alert("Apenas o mestre pode adicionar jogadores.");
    return;
  }

  const profiles = await getProfiles(true);
  const activePlayers = getCampaignPlayerIds(campaign);

  const availablePlayers = profiles.filter((profile) => {
    const isMaster = profile.id === campaign.mestreId;
    const alreadyInCampaign = activePlayers.includes(profile.id);
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
                <span>${player.name}</span>
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

async function addSelectedPlayersToCampaign(form, modal, submitButton) {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign(true);

  if (!user || !campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (campaign.mestreId !== user.id) {
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

  const rows = selectedPlayers.map((playerId) => ({
    campaign_id: campaign.id,
    user_id: playerId,
    role: "Jogador",
  }));

  const { error } = await DB
    .from("campaign_members")
    .upsert(rows, { onConflict: "campaign_id,user_id" });

  if (error) {
    console.error(error);
    alert("Erro ao adicionar jogadores.");
    if (submitButton) submitButton.disabled = false;
    return;
  }

  for (const playerId of selectedPlayers) {
    if (campaign.sistema === "Altherium") {
      await getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);
    }

    if (campaign.sistema === "D&D") {
      await getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);
    }
  }

  campaignsCache = [];

  await refreshCurrentMasterPanel();
  closeSharedModal(modal, form, submitButton);

  alert("Jogador adicionado com sucesso.");
}

async function removePlayerFromCampaign(campaignId, playerId) {
  const user = getLoggedUserFromSession();
  const campaign = (await getAllCampaigns(true)).find((item) => item.id === campaignId);

  if (!user || !campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (campaign.mestreId !== user.id) {
    alert("Apenas o mestre desta campanha pode remover jogadores.");
    return;
  }

  if (!confirm("Remover este jogador da campanha?")) return;

  const { error } = await DB
    .from("campaign_members")
    .delete()
    .eq("campaign_id", campaignId)
    .eq("user_id", playerId)
    .eq("role", "Jogador");

  if (error) {
    console.error(error);
    alert("Erro ao remover jogador.");
    return;
  }

  campaignsCache = [];
  await refreshCurrentMasterPanel();
}

/* =========================================================
   FICHAS DE ALTHERIUM
========================================================= */

function getDefaultSheet(campaignId, playerId, system) {
  const sheet = {
    campaignId,
    playerId,
    ownerName: "",
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
    nr: "0",
    nrCurrent: "0",
    nrMax: "0",
    pilarCardsCurrent: "0",
    pilarCardsMax: "0",
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
  };

  ALTHERIUM_DOMAINS.forEach((domain) => {
    sheet[`domain_${domain.key}`] = "";
  });

  for (let index = 1; index <= 13; index += 1) {
    sheet[`inventory${index}`] = "";
  }

  return sheet;
}

async function getOrCreateCampaignSheet(campaignId, playerId, system) {
  const { data, error } = await DB
    .from("altherium_sheets")
    .select("id, campaign_id, user_id, data")
    .eq("campaign_id", campaignId)
    .eq("user_id", playerId)
    .maybeSingle();

  if (error) {
    console.error(error);
    return getDefaultSheet(campaignId, playerId, system);
  }

  const profiles = await getProfiles();
  const profile = profiles.find((item) => item.id === playerId);

  if (data) {
    return {
      ...getDefaultSheet(campaignId, playerId, system),
      ...(data.data || {}),
      campaignId,
      playerId,
      ownerName: profile ? profile.name : playerId,
      system,
    };
  }

  const newSheet = {
    ...getDefaultSheet(campaignId, playerId, system),
    ownerName: profile ? profile.name : playerId,
  };

  const { error: insertError } = await DB.from("altherium_sheets").insert({
    campaign_id: campaignId,
    user_id: playerId,
    data: newSheet,
  });

  if (insertError) console.error(insertError);

  return newSheet;
}

async function updateCampaignSheet(campaignId, playerId, data) {
  const oldSheet = await getOrCreateCampaignSheet(campaignId, playerId, "Altherium");

  const updatedSheet = {
    ...oldSheet,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  const { error } = await DB
    .from("altherium_sheets")
    .upsert(
      {
        campaign_id: campaignId,
        user_id: playerId,
        data: updatedSheet,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "campaign_id,user_id" }
    );

  if (error) {
    console.error(error);
    alert("Erro ao salvar ficha de Altherium.");
  }
}

async function setupAltheriumMasterSheets() {
  await renderMasterSheets();

  document.addEventListener("click", async (event) => {
    const createSheetsButton = event.target.closest("[data-create-player-sheets]");
    const openSheetButton = event.target.closest("[data-open-sheet]");

    if (createSheetsButton) {
      const campaign = await getCurrentCampaign(true);
      if (!campaign) return;

      for (const playerId of getCampaignPlayerIds(campaign)) {
        await getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);
      }

      await renderMasterSheets();
      alert("Fichas sincronizadas.");
    }

    if (openSheetButton) {
      await openMasterSheetModal(openSheetButton.dataset.openSheet);
    }
  });

  const form = document.getElementById("altheriumForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      if (form.dataset.mode !== "edit-sheet") return;
      event.preventDefault();
      await saveSheetFromModal(true);
    });

    form.addEventListener("input", () => {
      if (form.dataset.mode !== "edit-sheet") return;
      updateAltheriumRootSections(form);
      saveDebounced(() => saveSheetFromModal(false));
    });

    form.addEventListener("change", () => {
      if (form.dataset.mode !== "edit-sheet") return;
      updateAltheriumRootSections(form);
      saveDebounced(() => saveSheetFromModal(false));
    });
  }
}

async function renderMasterSheets() {
  const grid = document.getElementById("sheetsGrid");
  const counter = document.getElementById("sheetCount");
  if (!grid) return;

  const campaign = await getCurrentCampaign(true);

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

  const cards = [];

  for (const playerId of playerIds) {
    const profiles = await getProfiles();
    const player = profiles.find((item) => item.id === playerId);
    const sheet = await getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);

    cards.push(`
      <button class="sheet-card" data-open-sheet="${playerId}">
        <div class="sheet-card-top">
          <span>${player ? player.name : "Jogador"}</span>
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
    `);
  }

  grid.innerHTML = cards.join("");
}

async function openMasterSheetModal(playerId) {
  const modal = document.getElementById("altheriumModal");
  const modalTitle = document.getElementById("altheriumModalTitle");
  const form = document.getElementById("altheriumForm");
  const formFields = document.getElementById("altheriumFormFields");
  const submitButton = form ? form.querySelector("button[type='submit']") : null;
  const campaign = await getCurrentCampaign(true);

  if (!modal || !modalTitle || !form || !formFields || !campaign) return;

  const sheet = await getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);

  modalTitle.textContent = `Ficha de ${sheet.ownerName}`;
  formFields.innerHTML = buildMasterSheetEditor(sheet);
  setupAltheriumRootFeatureSections(form, sheet);

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
            ${rootSelectInput("Raíz", "root", sheet.root)}
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
            ${[1, 2, 3, 4].map((index) => `
              <div class="rune-weapon-row">
                <input type="text" name="weapon${index}Name" value="${escapeHtml(sheet[`weapon${index}Name`])}" />
                <input type="text" name="weapon${index}Damage" value="${escapeHtml(sheet[`weapon${index}Damage`])}" />
                <input type="text" name="weapon${index}Range" value="${escapeHtml(sheet[`weapon${index}Range`])}" />
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="rune-paper-page">
        <div class="rune-frame">
          <div class="rune-section-title"><h3>Domínios</h3></div>
          <div class="rune-domains-table">
            <div class="rune-domain-head"><span>Domínios</span><span>Atributos</span><span>Dados</span></div>
            ${ALTHERIUM_DOMAINS.map((domain) => `
              <label>
                <span>${domain.label}</span>
                <small>${domain.attr}</small>
                <input type="text" name="domain_${domain.key}" value="${escapeHtml(sheet[`domain_${domain.key}`])}" />
              </label>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="rune-paper-page">
        <div class="rune-frame">
          <div class="rune-section-title"><h3>Inventário</h3></div>
          <div class="rune-inventory-list">
            ${Array.from({ length: 13 }, (_, index) => index + 1).map((slot) => `
              <input type="text" name="inventory${slot}" value="${escapeHtml(sheet[`inventory${slot}`])}" placeholder="- item" />
            `).join("")}
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
          ${buildAltheriumRootDynamicSections(sheet)}
          <div class="normal-triumphs-box" data-hide-when-root="pilar">
            <textarea class="rune-triumphs-area" name="triumphs" rows="14">${escapeHtml(sheet.triumphs)}</textarea>
          </div>
          <div class="rune-section-title"><h3>Anotações</h3></div>
          <textarea class="rune-triumphs-area" name="notes" rows="8">${escapeHtml(sheet.notes)}</textarea>
        </div>
      </section>
    </div>
  `;
}

async function saveSheetFromModal(showAlert = false) {
  const form = document.getElementById("altheriumForm");
  if (!form) return;

  const campaignId = getCurrentCampaignId();
  const playerId = form.dataset.playerId;

  if (!campaignId || !playerId) return;

  await updateCampaignSheet(campaignId, playerId, Object.fromEntries(new FormData(form)));
  await refreshCurrentMasterPanel();

  if (showAlert) alert("Ficha salva com sucesso.");
}

async function setupAltheriumPlayerSheet() {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign(true);
  const form = document.getElementById("playerSheetForm");
  const saveButton = document.getElementById("savePlayerSheet");

  if (!user || !campaign || !form) return;

  await getOrCreateCampaignSheet(campaign.id, user.id, campaign.sistema);
  await loadSheetIntoPlayerForm();

  form.addEventListener("input", () => savePlayerSheet(false));
  form.addEventListener("change", () => savePlayerSheet(false));

  if (saveButton) saveButton.addEventListener("click", () => savePlayerSheet(true));
}

async function loadSheetIntoPlayerForm() {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign(true);
  const form = document.getElementById("playerSheetForm");

  if (!user || !campaign || !form) return;

  const focused = document.activeElement;

  if (focused && form.contains(focused)) {
    setupAltheriumRootFeatureSections(form);
    updateAltheriumRootSections(form);
    updatePlayerSheetPreview();
    updateResourceBars();
    return;
  }

  const sheet = await getOrCreateCampaignSheet(campaign.id, user.id, campaign.sistema);

  setupAltheriumRootFeatureSections(form, sheet);

  Object.keys(sheet).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = sheet[key] || "";
  });

  setAltheriumRootSelectorValue(form.elements.root, sheet.root);
  updateAltheriumRootSections(form);
  updatePlayerSheetPreview();
  updateResourceBars();
}

async function savePlayerSheet(showAlert) {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign();
  const form = document.getElementById("playerSheetForm");

  if (!user || !campaign || !form) return;

  setupAltheriumRootFeatureSections(form);
  updateAltheriumRootSections(form);

  await updateCampaignSheet(campaign.id, user.id, Object.fromEntries(new FormData(form)));
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

function getDefaultDndSheet(campaignId, playerId, system) {
  const sheet = {
    campaignId,
    playerId,
    ownerName: "",
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
  };

  DND_SKILLS.forEach(([key]) => {
    sheet[key] = "-1";
  });

  for (let level = 1; level <= 9; level += 1) {
    sheet[`spellSlots${level}`] = "";
  }

  return sheet;
}

async function getOrCreateDndSheet(campaignId, playerId, system) {
  const { data, error } = await DB
    .from("dnd_sheets")
    .select("id, campaign_id, user_id, data")
    .eq("campaign_id", campaignId)
    .eq("user_id", playerId)
    .maybeSingle();

  if (error) {
    console.error(error);
    return getDefaultDndSheet(campaignId, playerId, system);
  }

  const profiles = await getProfiles();
  const profile = profiles.find((item) => item.id === playerId);

  if (data) {
    return {
      ...getDefaultDndSheet(campaignId, playerId, system),
      ...(data.data || {}),
      campaignId,
      playerId,
      ownerName: profile ? profile.name : playerId,
      system,
    };
  }

  const newSheet = {
    ...getDefaultDndSheet(campaignId, playerId, system),
    ownerName: profile ? profile.name : playerId,
  };

  const { error: insertError } = await DB.from("dnd_sheets").insert({
    campaign_id: campaignId,
    user_id: playerId,
    data: newSheet,
  });

  if (insertError) console.error(insertError);

  return newSheet;
}

async function updateDndSheet(campaignId, playerId, data) {
  const oldSheet = await getOrCreateDndSheet(campaignId, playerId, "D&D");

  const updatedSheet = {
    ...oldSheet,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  const { error } = await DB
    .from("dnd_sheets")
    .upsert(
      {
        campaign_id: campaignId,
        user_id: playerId,
        data: updatedSheet,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "campaign_id,user_id" }
    );

  if (error) {
    console.error(error);
    alert("Erro ao salvar ficha de D&D.");
  }
}

async function setupDndMasterSheets() {
  await renderDndMasterSheets();

  document.addEventListener("click", async (event) => {
    const syncButton = event.target.closest("[data-create-dnd-sheets]");
    const openSheetButton = event.target.closest("[data-open-dnd-sheet]");

    if (syncButton) {
      const campaign = await getCurrentCampaign(true);
      if (!campaign) return;

      for (const playerId of getCampaignPlayerIds(campaign)) {
        await getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);
      }

      await renderDndMasterSheets();
      alert("Fichas de D&D sincronizadas.");
    }

    if (openSheetButton) {
      await openDndMasterSheetModal(openSheetButton.dataset.openDndSheet);
    }
  });

  const form = document.getElementById("dndForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      if (form.dataset.mode !== "edit-dnd-sheet") return;

      event.preventDefault();
      await saveDndSheetFromModal(true);
    });

    form.addEventListener("input", () => {
      if (form.dataset.mode !== "edit-dnd-sheet") return;
      saveDebounced(() => saveDndSheetFromModal(false));
    });
  }
}

async function renderDndMasterSheets() {
  const grid = document.getElementById("dndCharactersGrid");
  const counter = document.getElementById("dndCharacterCount");

  if (!grid) return;

  const campaign = await getCurrentCampaign(true);

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

  const profiles = await getProfiles();
  const cards = [];

  for (const playerId of playerIds) {
    const player = profiles.find((item) => item.id === playerId);
    const sheet = await getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);

    cards.push(`
      <button class="sheet-card dnd-sheet-card" data-open-dnd-sheet="${playerId}">
        <div class="sheet-card-top">
          <span>${player ? player.name : "Jogador"}</span>
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
    `);
  }

  grid.innerHTML = cards.join("");
}

async function openDndMasterSheetModal(playerId) {
  const modal = document.getElementById("dndModal");
  const modalTitle = document.getElementById("dndModalTitle");
  const form = document.getElementById("dndForm");
  const formFields = document.getElementById("dndFormFields");
  const submitButton = form ? form.querySelector("button[type='submit']") : null;
  const campaign = await getCurrentCampaign(true);

  if (!modal || !modalTitle || !form || !formFields || !campaign) return;

  const sheet = await getOrCreateDndSheet(campaign.id, playerId, campaign.sistema);

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

async function saveDndSheetFromModal(showAlert = false) {
  const form = document.getElementById("dndForm");
  if (!form) return;

  const campaignId = getCurrentCampaignId();
  const playerId = form.dataset.playerId;

  if (!campaignId || !playerId) return;

  await updateDndSheet(campaignId, playerId, Object.fromEntries(new FormData(form)));
  await refreshCurrentMasterPanel();

  if (showAlert) alert("Ficha de D&D salva com sucesso.");
}

async function setupDndPlayerSheet() {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign(true);
  const form = document.getElementById("dndPlayerSheetForm");
  const saveButton = document.getElementById("saveDndSheet");

  if (!user || !campaign || !form) return;

  await getOrCreateDndSheet(campaign.id, user.id, campaign.sistema);
  await loadDndSheetIntoPlayerForm();

  form.addEventListener("input", () => saveDndPlayerSheet(false));

  if (saveButton) saveButton.addEventListener("click", () => saveDndPlayerSheet(true));
}

async function loadDndSheetIntoPlayerForm() {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign(true);
  const form = document.getElementById("dndPlayerSheetForm");

  if (!user || !campaign || !form) return;

  const focused = document.activeElement;

  if (focused && form.contains(focused)) {
    updateDndPlayerPreview();
    updateDndAutoNumbers();
    return;
  }

  const sheet = await getOrCreateDndSheet(campaign.id, user.id, campaign.sistema);

  Object.keys(sheet).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = sheet[key] || "";
  });

  updateDndPlayerPreview();
  updateDndAutoNumbers();
}

async function saveDndPlayerSheet(showAlert) {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign();
  const form = document.getElementById("dndPlayerSheetForm");

  if (!user || !campaign || !form) return;

  await updateDndSheet(campaign.id, user.id, Object.fromEntries(new FormData(form)));
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

/* =========================================================
   INICIATIVA
========================================================= */

async function setupInitiativeBoard(config) {
  await renderInitiativeBoard(config);

  const clearButton = document.getElementById(config.clearButtonId);
  if (clearButton) clearButton.addEventListener("click", () => clearInitiative(config));
}

async function renderInitiativeBoard(config) {
  const board = document.getElementById(config.boardId);
  const campaign = await getCurrentCampaign(true);

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

  const initiativeList = [];

  for (const playerId of playerIds) {
    const sheet = await config.getSheet(campaign.id, playerId, campaign.sistema);
    const initiativeValue = sheet.combatInitiative;

    initiativeList.push({
      playerId,
      characterName: sheet.characterName || sheet.personagem || sheet.ownerName || "Personagem sem nome",
      initiativeNumber:
        initiativeValue === "" || initiativeValue === undefined || initiativeValue === null
          ? null
          : Number(initiativeValue),
    });
  }

  initiativeList.sort((a, b) => {
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

async function clearInitiative(config) {
  const campaign = await getCurrentCampaign(true);

  if (!campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (!confirm("Limpar a iniciativa de todos os personagens?")) return;

  for (const playerId of getCampaignPlayerIds(campaign)) {
    await config.updateSheet(campaign.id, playerId, {
      combatInitiative: "",
    });
  }

  await renderInitiativeBoard(config);
}

/* =========================================================
   REALTIME
========================================================= */

function subscribeGlobalRealtime(callback) {
  if (realtimeChannel) DB.removeChannel(realtimeChannel);

  realtimeChannel = DB
    .channel("global-campaign-lab")
    .on("postgres_changes", { event: "*", schema: "public", table: "campaigns" }, async () => {
      campaignsCache = [];
      await callback();
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "campaign_members" }, async () => {
      campaignsCache = [];
      await callback();
    })
    .subscribe();
}

function subscribeCampaignRealtime(callback) {
  const campaignId = getCurrentCampaignId();

  if (!campaignId) return;

  if (realtimeChannel) DB.removeChannel(realtimeChannel);

  realtimeChannel = DB
    .channel(`campaign-${campaignId}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "campaign_members", filter: `campaign_id=eq.${campaignId}` },
      async () => {
        campaignsCache = [];
        await callback();
      }
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "altherium_sheets", filter: `campaign_id=eq.${campaignId}` },
      async () => {
        await callback();
      }
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "altherium_bestiary", filter: `campaign_id=eq.${campaignId}` },
      async () => {
        await callback();
      }
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "dnd_sheets", filter: `campaign_id=eq.${campaignId}` },
      async () => {
        await callback();
      }
    )
    .subscribe();
}

/* =========================================================
   MODAL / REFRESH / HELPERS
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

async function refreshCurrentMasterPanel() {
  if (document.body.classList.contains("altherium-page")) {
    await renderCampaignPlayers("playersGrid", "onlineCount");
    await renderMasterSheets();
    await renderInitiativeBoard({
      system: "Altherium",
      boardId: "initiativeBoard",
      clearButtonId: "clearInitiativeBtn",
      getSheet: getOrCreateCampaignSheet,
      updateSheet: updateCampaignSheet,
    });
    await renderAltheriumBestiary();
  }

  if (document.body.classList.contains("dnd-master-page")) {
    await renderCampaignPlayers("dndPlayersGrid", "dndPlayerCount");
    await renderDndMasterSheets();
    await renderInitiativeBoard({
      system: "D&D",
      boardId: "dndInitiativeBoard",
      clearButtonId: "clearDndInitiativeBtn",
      getSheet: getOrCreateDndSheet,
      updateSheet: updateDndSheet,
    });
  }

  await setupMasterCampaignName();
}

async function setupMasterCampaignName() {
  const campaignName = sessionStorage.getItem("campaignName");
  setText("masterCampaignName", campaignName || "Campanha não identificada");
}

function setupPlayerInfo(playerElementId, campaignElementId) {
  const user = getLoggedUserFromSession();
  const campaignName = sessionStorage.getItem("campaignName");

  setText(playerElementId, user ? user.nome : "---");
  setText(campaignElementId, campaignName || "---");
}

function getCurrentCampaignId() {
  return sessionStorage.getItem("campaignId");
}

function clearCurrentCampaign() {
  sessionStorage.removeItem("campaignId");
  sessionStorage.removeItem("campaignName");
  sessionStorage.removeItem("system");
  sessionStorage.removeItem("profile");
}

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function saveDebounced(callback) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(callback, 450);
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

function updateDndModView(inputName, viewId) {
  const form = document.getElementById("dndPlayerSheetForm");
  const view = document.getElementById(viewId);

  if (!form || !view) return;

  view.textContent = formatDndMod(form.elements[inputName].value);
}

function formatDndMod(value) {
  const score = Number(value) || 10;
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : String(mod);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}


function setupAltheriumRootDynamicControls() {
  if (window.altheriumRootDynamicControlsReady) return;

  window.altheriumRootDynamicControlsReady = true;

  document.addEventListener("change", (event) => {
    if (!event.target.matches("[name='root']")) return;

    const form = event.target.closest("form");
    updateAltheriumRootSections(form);
  });

  document.addEventListener("input", (event) => {
    if (!event.target.matches("[name='root']")) return;

    const form = event.target.closest("form");
    updateAltheriumRootSections(form);
  });
}

function setupAltheriumRootFeatureSections(form, sheet = {}) {
  if (!form) return;

  enhanceAltheriumRootSelector(form, sheet.root);
  ensureAltheriumRootFeatureSections(form, sheet);
  updateAltheriumRootSections(form);
}

function enhanceAltheriumRootSelector(form, rootValue = "") {
  if (!form || !form.elements.root) return;

  const currentField = form.elements.root;

  if (currentField.tagName === "SELECT") {
    ensureAltheriumRootOptions(currentField);
    setAltheriumRootSelectorValue(currentField, currentField.value || rootValue);
    currentField.dataset.rootSelector = "true";
    return;
  }

  const select = document.createElement("select");
  select.name = currentField.name;
  select.className = `${currentField.className || ""} altherium-root-select`.trim();
  select.dataset.rootSelector = "true";

  ensureAltheriumRootOptions(select);
  setAltheriumRootSelectorValue(select, currentField.value || rootValue);

  currentField.replaceWith(select);
}

function ensureAltheriumRootOptions(select) {
  if (!select || select.dataset.rootOptionsReady) return;

  select.innerHTML = ALTHERIUM_ROOT_OPTIONS
    .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
    .join("");

  select.dataset.rootOptionsReady = "true";
}

function setAltheriumRootSelectorValue(field, value) {
  if (!field) return;

  const normalized = normalizeAltheriumRoot(value);
  const rootValue = getAltheriumRootValue(normalized, value);

  field.value = rootValue;
}

function getAltheriumRootValue(normalized, originalValue = "") {
  if (normalized === "berserk") return "Berserk";
  if (normalized === "runaskin") return "Runaskin";
  if (normalized === "pilar") return "Pilar";

  return originalValue || "";
}

function ensureAltheriumRootFeatureSections(form, sheet = {}) {
  if (!form) return;

  /*
    Importante:
    Antes essa função colocava NR e Triunfos de Pilar logo depois de .rune-resource-list.
    Isso fazia essas partes aparecerem no começo da ficha.
    Agora, se o HTML já tem #runaskinNrBox ou #pilarTriumphsBox, não injetamos nada.
  */
  if (form.querySelector("#runaskinNrBox") || form.querySelector("#pilarTriumphsBox")) return;
  if (form.querySelector("[data-root-dynamic-zone]")) return;

  const triumphTextarea = form.querySelector("textarea[name='triumphs']");
  if (!triumphTextarea) return;

  const normalTriumphsBox = triumphTextarea.closest(".normal-triumphs-box");
  const target = normalTriumphsBox || triumphTextarea;

  target.insertAdjacentHTML("beforebegin", buildAltheriumRootDynamicSections(sheet));
}

function updateAltheriumRootSections(form) {
  if (!form) return;

  const rootField = form.elements.root;
  const root = normalizeAltheriumRoot(rootField ? rootField.value : "");

  form.querySelectorAll("[data-root-section]").forEach((section) => {
    const shouldShow = section.dataset.rootSection === root;

    section.hidden = !shouldShow;
    section.classList.toggle("active", shouldShow);
  });

  const runaskinBox = form.querySelector("#runaskinNrBox");
  if (runaskinBox && !runaskinBox.matches("[data-root-section]")) {
    const showRunaskin = root === "runaskin";

    runaskinBox.classList.toggle("active", showRunaskin);
    runaskinBox.classList.toggle("show", showRunaskin);
    runaskinBox.style.display = showRunaskin ? "grid" : "none";
  }

  const pilarBox = form.querySelector("#pilarTriumphsBox");
  if (pilarBox && !pilarBox.matches("[data-root-section]")) {
    const showPilar = root === "pilar";

    pilarBox.classList.toggle("active", showPilar);
    pilarBox.classList.toggle("show", showPilar);
    pilarBox.style.display = showPilar ? "block" : "none";
  }

  const normalTriumphsBox = form.querySelector("#normalTriumphsBox, .normal-triumphs-box");
  if (normalTriumphsBox) {
    const hideNormalTriumphs = root === "pilar";

    normalTriumphsBox.classList.toggle("hidden-by-root", hideNormalTriumphs);
    normalTriumphsBox.style.display = hideNormalTriumphs ? "none" : "block";
  }
}

function normalizeAltheriumRoot(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized.includes("bers")) return "berserk";
  if (normalized.includes("runa")) return "runaskin";
  if (normalized.includes("pilar")) return "pilar";

  return "";
}

function rootSelectInput(label, name, value) {
  const normalizedValue = getAltheriumRootValue(normalizeAltheriumRoot(value), value);

  return `
    <label class="altherium-root-field">
      <span>${label}</span>
      <select name="${name}" data-root-selector="true">
        ${ALTHERIUM_ROOT_OPTIONS
          .map(
            (option) => `
              <option value="${escapeHtml(option.value)}" ${option.value === normalizedValue ? "selected" : ""}>
                ${escapeHtml(option.label)}
              </option>
            `
          )
          .join("")}
      </select>
    </label>
  `;
}

function buildAltheriumRootDynamicSections(sheet = {}) {
  return `
    <div class="altherium-root-dynamic-zone" data-root-dynamic-zone>
      <section class="altherium-root-section runaskin-root-section runaskin-nr-mini" data-root-section="runaskin" hidden>
        <label class="runaskin-nr-mini-field">
          <span>NR</span>
          <input
            type="number"
            min="0"
            name="nr"
            value="${escapeHtml(sheet.nr || sheet.nrCurrent || "0")}"
            placeholder="0"
          />
        </label>
      </section>

      <section class="altherium-root-section pilar-root-section" data-root-section="pilar" hidden>
        <div class="pilar-card-counter">
          <div>
            <span>Cartas do Pilar</span>
            <strong>Controle de cartas</strong>
            <p>Controle as cartas disponíveis e o limite máximo do personagem Pilar.</p>
          </div>

          <div class="pilar-card-counter-values">
            <label>
              <span>Atual</span>
              <input
                type="number"
                min="0"
                name="pilarCardsCurrent"
                value="${escapeHtml(sheet.pilarCardsCurrent || sheet.pilarCards || "0")}"
                placeholder="0"
              />
            </label>

            <span class="pilar-card-counter-divider">/</span>

            <label>
              <span>Máximo</span>
              <input
                type="number"
                min="0"
                name="pilarCardsMax"
                value="${escapeHtml(sheet.pilarCardsMax || "0")}"
                placeholder="0"
              />
            </label>
          </div>
        </div>

        <div class="pilar-triumphs-groups">
          ${PILAR_TRIUMPH_GROUPS.map(buildPilarTriumphGroup).join("")}
        </div>
      </section>
    </div>
  `;
}

function buildPilarTriumphGroup(group) {
  return `
    <div class="pilar-triumph-group">
      <div class="pilar-triumph-group__header">
        <span>${group.cards} 🂡</span>
        <strong>${group.cards === 1 ? "1 carta" : `${group.cards} cartas`}</strong>
      </div>

      <div class="pilar-triumph-list">
        ${group.triumphs.map((triumph) => buildPilarTriumphCard(triumph, group.cards)).join("")}
      </div>
    </div>
  `;
}

function buildPilarTriumphCard(triumph, cards) {
  return `
    <details class="pilar-triumph-card">
      <summary>
        <span>${escapeHtml(triumph.name)}</span>
        <strong>${cards} 🂡</strong>
        <em>⌄</em>
      </summary>

      <div class="pilar-triumph-card__content">
        <small>${escapeHtml(triumph.action)}</small>
        <p>${escapeHtml(triumph.description)}</p>
      </div>
    </details>
  `;
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

/* =========================================================
   BESTIÁRIO AUTOMÁTICO DE ALTHERIUM
========================================================= */

const ALTHERIUM_DICE_SIDES = [4, 6, 8, 10, 12, 20];

const ALTHERIUM_BOSS_DIFFICULTIES = {
  fraco: {
    label: "Boss fraco",
    minPercent: 0.15,
    maxPercent: 0.2,
  },
  medio: {
    label: "Boss médio",
    minPercent: 0.2,
    maxPercent: 0.3,
  },
  forte: {
    label: "Boss forte",
    minPercent: 0.3,
    maxPercent: 0.4,
  },
};

async function setupAltheriumBestiary() {
  injectAltheriumEnemyDeleteButtonStyles();
  const form = getFirstElement([
    "bossForm",
    "bestiaryForm",
    "altheriumBestiaryForm",
  ]);

  if (form && !form.dataset.bestiaryReady) {
    form.dataset.bestiaryReady = "true";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await generateAltheriumBoss();
    });

    form.addEventListener("input", () => {
      saveDebounced(renderAltheriumBestiary);
    });

    form.addEventListener("change", () => {
      saveDebounced(renderAltheriumBestiary);
    });
  }

  const generateButton = getFirstElement([
    "generateBossBtn",
    "generateEnemyBtn",
    "gerarInimigoBtn",
  ]);

  if (generateButton && !generateButton.dataset.bestiaryReady) {
    generateButton.dataset.bestiaryReady = "true";
    generateButton.addEventListener("click", generateAltheriumBoss);
  }

  const refreshButton = document.getElementById("refreshBestiaryBtn");
  if (refreshButton && !refreshButton.dataset.bestiaryReady) {
    refreshButton.dataset.bestiaryReady = "true";
    refreshButton.addEventListener("click", renderAltheriumBestiary);
  }

  const deleteContainers = [
    getFirstElement(["generatedEnemiesList", "monsterGrid", "generated-enemies-list"]),
    getFirstElement(["bestiaryResult", "bossResult", "boss-result", "altheriumBossResult"]),
  ].filter(Boolean);

  deleteContainers.forEach((container) => {
    if (container.dataset.deleteReady) return;

    container.dataset.deleteReady = "true";

    container.addEventListener("click", async (event) => {
      const deleteButton = event.target.closest("[data-delete-enemy-id]");
      if (!deleteButton) return;

      const enemyId = deleteButton.dataset.deleteEnemyId;
      const shouldDelete = window.confirm("Deseja excluir este inimigo do bestiário?");
      if (!shouldDelete) return;

      await deleteAltheriumGeneratedEnemy(enemyId);
    });
  });

  const clearEnemiesButton = document.getElementById("clearGeneratedEnemiesBtn");
  if (clearEnemiesButton && !clearEnemiesButton.dataset.clearReady) {
    clearEnemiesButton.dataset.clearReady = "true";

    clearEnemiesButton.addEventListener("click", async () => {
      const shouldClear = window.confirm("Deseja excluir todos os inimigos gerados?");
      if (!shouldClear) return;

      await clearAltheriumGeneratedEnemies();
    });
  }

  await renderAltheriumBestiary();
}

async function renderAltheriumBestiary() {
  if (!document.body.classList.contains("altherium-page")) return;

  const party = await getAltheriumPartyCombatData();

  renderAltheriumPartyStats(party);
  renderAltheriumBestiaryPlayers(party);
  renderAltheriumBossPreview(party);
  await renderAltheriumGeneratedEnemiesList();
  await updateAltheriumMonsterCount();
}

async function generateAltheriumBoss() {
  const party = await getAltheriumPartyCombatData();
  const bossConfig = getAltheriumBossFormConfig();
  const boss = calculateAltheriumBoss(party, bossConfig);
  const savedEnemy = canSaveAltheriumBoss(boss)
    ? await saveAltheriumGeneratedEnemy(boss)
    : null;

  renderAltheriumPartyStats(party);
  renderAltheriumBestiaryPlayers(party);
  renderAltheriumBossPreview(party, boss);
  renderAltheriumBossResult(boss, savedEnemy ? savedEnemy.id : "");
  await renderAltheriumGeneratedEnemiesList();
  await updateAltheriumMonsterCount();
}

async function getAltheriumPartyCombatData() {
  const campaign = await getCurrentCampaign(true);

  if (!campaign) {
    return {
      campaign: null,
      players: [],
      validPlayers: [],
      totalHp: 0,
      averageHp: 0,
      totalDamageAverage: 0,
      averageDamagePerPlayer: 0,
      highestDamageAverage: 0,
    };
  }

  const profiles = await getProfiles();
  const playerIds = getCampaignPlayerIds(campaign);
  const players = [];

  for (const playerId of playerIds) {
    const profile = profiles.find((item) => item.id === playerId);
    const sheet = await getOrCreateCampaignSheet(campaign.id, playerId, campaign.sistema);
    const sheetStats = getAltheriumSheetCombatStats(sheet);

    players.push({
      id: playerId,
      profileName: profile ? profile.name : playerId,
      sheet,
      ...sheetStats,
    });
  }

  const validPlayers = players.filter((player) => player.hpMax > 0 || player.damageAverage > 0);
  const hpPlayers = players.filter((player) => player.hpMax > 0);
  const damagePlayers = players.filter((player) => player.damageAverage > 0);

  const totalHp = hpPlayers.reduce((sum, player) => sum + player.hpMax, 0);
  const averageHp = hpPlayers.length ? totalHp / hpPlayers.length : 0;
  const totalDamageAverage = damagePlayers.reduce((sum, player) => sum + player.damageAverage, 0);
  const averageDamagePerPlayer = damagePlayers.length ? totalDamageAverage / damagePlayers.length : 0;
  const highestDamageAverage = damagePlayers.reduce(
    (highest, player) => Math.max(highest, player.damageAverage),
    0
  );

  return {
    campaign,
    players,
    validPlayers,
    totalHp,
    averageHp,
    totalDamageAverage,
    averageDamagePerPlayer,
    highestDamageAverage,
  };
}

function getAltheriumSheetCombatStats(sheet) {
  const hpMax = Math.max(
    toCombatNumber(sheet.pvMax),
    toCombatNumber(sheet.pvCurrent)
  );

  const weapons = [1, 2, 3, 4]
    .map((index) => {
      const name = sheet[`weapon${index}Name`] || `Arma ${index}`;
      const damage = sheet[`weapon${index}Damage`] || "";
      const average = getDamageAverageFromExpression(damage);

      return {
        name,
        damage,
        average,
      };
    })
    .filter((weapon) => weapon.average > 0);

  const bestWeapon = weapons.reduce(
    (best, weapon) => (!best || weapon.average > best.average ? weapon : best),
    null
  );

  return {
    characterName: sheet.characterName || "Personagem sem nome",
    ownerName: sheet.ownerName || "Jogador",
    hpMax,
    damageAverage: bestWeapon ? bestWeapon.average : 0,
    damageExpression: bestWeapon ? bestWeapon.damage : "",
    damageWeaponName: bestWeapon ? bestWeapon.name : "Sem arma cadastrada",
    weapons,
  };
}

function getAltheriumBossFormConfig() {
  const bossNameInput = getFirstElement([
    "bossName",
    "bestiaryBossName",
    "altheriumBossName",
  ]);

  const roundsInput = getFirstElement([
    "bossRounds",
    "bestiaryRounds",
    "altheriumBossRounds",
  ]);

  const difficultyInput = getFirstElement([
    "bossDifficulty",
    "bestiaryDifficulty",
    "altheriumBossDifficulty",
  ]);

  const bossName = bossNameInput ? bossNameInput.value.trim() : "";
  const rounds = Math.max(1, Math.round(toCombatNumber(roundsInput ? roundsInput.value : 4) || 4));
  const difficulty = normalizeBossDifficulty(difficultyInput ? difficultyInput.value : "medio");

  return {
    bossName: bossName || "Boss de Altherium",
    rounds,
    difficulty,
  };
}

function calculateAltheriumBoss(party, config) {
  const difficulty = ALTHERIUM_BOSS_DIFFICULTIES[config.difficulty] || ALTHERIUM_BOSS_DIFFICULTIES.medio;
  const bossHp = Math.max(1, Math.ceil(party.totalDamageAverage * config.rounds));
  const minDamage = party.averageHp * difficulty.minPercent;
  const maxDamage = party.averageHp * difficulty.maxPercent;
  const recommendedDamage = (minDamage + maxDamage) / 2;
  const recommendedDice = getClosestDiceByAverage(recommendedDamage);
  const minDice = getClosestDiceByAverage(minDamage);
  const maxDice = getClosestDiceByAverage(maxDamage);

  return {
    name: config.bossName,
    rounds: config.rounds,
    difficultyKey: config.difficulty,
    difficultyLabel: difficulty.label,
    bossHp,
    minDamage,
    maxDamage,
    recommendedDamage,
    recommendedDice,
    minDice,
    maxDice,
    party,
  };
}

function renderAltheriumPartyStats(party) {
  const container = getFirstElement([
    "partyStats",
    "party-stats",
    "bestiaryPartyStats",
    "altheriumPartyStats",
  ]);

  if (!container) return;

  container.innerHTML = `
    <div class="stat-card">
      <span>Jogadores com ficha</span>
      <strong>${party.players.length}</strong>
    </div>

    <div class="stat-card">
      <span>Vida média do grupo</span>
      <strong>${formatCombatNumber(party.averageHp)}</strong>
    </div>

    <div class="stat-card">
      <span>Dano médio total</span>
      <strong>${formatCombatNumber(party.totalDamageAverage)}</strong>
    </div>

    <div class="stat-card">
      <span>Dano médio por jogador</span>
      <strong>${formatCombatNumber(party.averageDamagePerPlayer)}</strong>
    </div>
  `;
}

function renderAltheriumBestiaryPlayers(party) {
  const container = getFirstElement([
    "bestiaryPlayersList",
    "bestiary-players-list",
    "playersList",
    "players-list",
  ]);

  if (!container) return;

  if (!party.players.length) {
    container.innerHTML = `
      <div class="altherium-empty">
        <h3>Nenhum jogador na campanha</h3>
        <p>Adicione jogadores e preencha as fichas para calcular bosses automaticamente.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = party.players
    .map(
      (player) => `
        <article class="player-card">
          <div class="player-card__header">
            <div>
              <h3>${escapeHtml(player.characterName)}</h3>
              <span class="player-card__owner">${escapeHtml(player.profileName)}</span>
            </div>
          </div>

          <div class="player-card__stats">
            <div>
              <span>PV máximo</span>
              <strong>${formatCombatNumber(player.hpMax)}</strong>
            </div>

            <div>
              <span>Melhor dano</span>
              <strong>${escapeHtml(player.damageExpression || "---")}</strong>
            </div>

            <div>
              <span>Dano médio</span>
              <strong>${formatCombatNumber(player.damageAverage)}</strong>
            </div>
          </div>

          <p class="player-card__notes">
            Arma usada no cálculo: <strong>${escapeHtml(player.damageWeaponName)}</strong>
          </p>
        </article>
      `
    )
    .join("");
}

function renderAltheriumBossPreview(party, boss = null) {
  const container = getFirstElement([
    "bossPreview",
    "boss-preview",
    "bestiaryPreview",
    "altheriumBossPreview",
  ]);

  if (!container) return;

  const previewBoss = boss || calculateAltheriumBoss(party, getAltheriumBossFormConfig());

  if (!party.players.length || party.totalDamageAverage <= 0 || party.averageHp <= 0) {
    container.innerHTML = `
      <div class="preview-card">
        <span>Prévia automática</span>
        <h3>Preencha as fichas do grupo</h3>
        <p>O sistema precisa de PV máximo e dano de arma nas fichas para calcular o boss.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="preview-card">
      <span>Prévia automática</span>
      <h3>${escapeHtml(previewBoss.name)}</h3>

      <div class="preview-grid">
        <div>
          <small>Vida do boss</small>
          <strong>${formatCombatNumber(previewBoss.bossHp)}</strong>
        </div>

        <div>
          <small>Dano recomendado</small>
          <strong>${previewBoss.recommendedDice.formula}</strong>
        </div>

        <div>
          <small>Dificuldade</small>
          <strong>${previewBoss.difficultyLabel}</strong>
        </div>

        <div>
          <small>Rodadas desejadas</small>
          <strong>${previewBoss.rounds}</strong>
        </div>
      </div>
    </div>
  `;
}

function renderAltheriumBossResult(boss, savedEnemyId = "") {
  const container = getFirstElement([
    "bestiaryResult",
    "bossResult",
    "boss-result",
    "altheriumBossResult",
  ]);

  if (!container) return;

  const party = boss.party;

  if (!party.players.length || party.totalDamageAverage <= 0 || party.averageHp <= 0) {
    container.innerHTML = `
      <div class="altherium-empty">
        <h3>Não foi possível gerar o boss</h3>
        <p>Preencha pelo menos o PV máximo e o dano de arma nas fichas dos jogadores.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <article class="boss-result-card">
      <div class="boss-result-card__header">
        <div>
          <span class="boss-result-card__tag">${boss.difficultyLabel}</span>
          <h2>${escapeHtml(boss.name)}</h2>
        </div>

        <div class="boss-result-card__header-actions">
          <strong class="boss-result-card__hp">PV ${formatCombatNumber(boss.bossHp)}</strong>
          ${
            savedEnemyId
              ? `<button
                  type="button"
                  class="altherium-btn btn-remove-player"
                  data-delete-enemy-id="${savedEnemyId}"
                >
                  Excluir inimigo
                </button>`
              : ""
          }
        </div>
      </div>

      <div class="boss-result-grid">
        <div>
          <span>Rodadas</span>
          <strong>${boss.rounds}</strong>
        </div>

        <div>
          <span>Vida média do grupo</span>
          <strong>${formatCombatNumber(party.averageHp)}</strong>
        </div>

        <div>
          <span>Dano médio total</span>
          <strong>${formatCombatNumber(party.totalDamageAverage)}</strong>
        </div>

        <div>
          <span>Jogadores calculados</span>
          <strong>${party.validPlayers.length}</strong>
        </div>
      </div>

      <div class="boss-damage-box">
        <h3>Dano do boss</h3>
        <p>
          Pela vida média do grupo, este boss deve causar entre
          <strong>${formatCombatNumber(boss.minDamage)}</strong> e
          <strong>${formatCombatNumber(boss.maxDamage)}</strong> de dano por ataque.
        </p>
      </div>

      <div class="boss-dice-options">
        <div>
          <span>Mínimo</span>
          <strong>${boss.minDice.formula}</strong>
          <small>Média ${formatCombatNumber(boss.minDice.average)}</small>
        </div>

        <div class="recommended">
          <span>Recomendado</span>
          <strong>${boss.recommendedDice.formula}</strong>
          <small>Média ${formatCombatNumber(boss.recommendedDice.average)}</small>
        </div>

        <div>
          <span>Máximo</span>
          <strong>${boss.maxDice.formula}</strong>
          <small>Média ${formatCombatNumber(boss.maxDice.average)}</small>
        </div>
      </div>

      <div class="boss-formula-box">
        <h3>Fórmula usada</h3>
        <p>
          Vida do boss = dano médio total do grupo
          (<strong>${formatCombatNumber(party.totalDamageAverage)}</strong>) × rodadas desejadas
          (<strong>${boss.rounds}</strong>) =
          <strong>${formatCombatNumber(boss.bossHp)} PV</strong>.
        </p>
      </div>
    </article>
  `;
}


async function saveAltheriumGeneratedEnemy(boss) {
  const campaign = boss.party.campaign || (await getCurrentCampaign(true));

  if (!campaign || !campaign.id) {
    alert("Campanha não encontrada. Não foi possível salvar o inimigo.");
    return null;
  }

  const enemy = buildAltheriumEnemyRecord(boss);
  const row = mapAltheriumEnemyToDbRow(campaign, enemy);

  const { data, error } = await DB
    .from("altherium_bestiary")
    .insert(row)
    .select("*")
    .single();

  if (error) {
    console.error("Erro ao salvar inimigo no Supabase:", error);
    alert(
      "Erro ao salvar o inimigo no Supabase. Verifique se a tabela altherium_bestiary foi criada."
    );
    return null;
  }

  return mapAltheriumEnemyFromDbRow(data);
}

function canSaveAltheriumBoss(boss) {
  const party = boss.party;

  return Boolean(
    party &&
      party.players.length &&
      party.totalDamageAverage > 0 &&
      party.averageHp > 0 &&
      boss.bossHp > 0
  );
}

function buildAltheriumEnemyRecord(boss) {
  const now = new Date();

  return {
    id: "",
    name: boss.name,
    difficultyKey: boss.difficultyKey,
    difficultyLabel: boss.difficultyLabel,
    bossHp: boss.bossHp,
    rounds: boss.rounds,
    minDamage: boss.minDamage,
    maxDamage: boss.maxDamage,
    recommendedDamage: boss.recommendedDamage,
    recommendedDice: boss.recommendedDice,
    minDice: boss.minDice,
    maxDice: boss.maxDice,
    averageHp: boss.party.averageHp,
    totalDamageAverage: boss.party.totalDamageAverage,
    validPlayersCount: boss.party.validPlayers.length,
    createdAt: now.toISOString(),
  };
}

function mapAltheriumEnemyToDbRow(campaign, enemy) {
  return {
    campaign_id: campaign.id,

    name: enemy.name || "Boss de Altherium",

    difficulty_key: enemy.difficultyKey || "medio",
    difficulty_label: enemy.difficultyLabel || "Boss médio",

    boss_hp: Math.max(0, Math.round(Number(enemy.bossHp) || 0)),
    rounds: Math.max(1, Math.round(Number(enemy.rounds) || 1)),

    min_damage: Number(enemy.minDamage) || 0,
    max_damage: Number(enemy.maxDamage) || 0,
    recommended_damage: Number(enemy.recommendedDamage) || 0,

    recommended_dice: enemy.recommendedDice || {},
    min_dice: enemy.minDice || {},
    max_dice: enemy.maxDice || {},

    average_hp: Number(enemy.averageHp) || 0,
    total_damage_average: Number(enemy.totalDamageAverage) || 0,
    valid_players_count: Math.max(0, Math.round(Number(enemy.validPlayersCount) || 0)),

    data: enemy || {},
  };
}

function mapAltheriumEnemyFromDbRow(row) {
  const extraData = row.data || {};

  return {
    ...extraData,

    id: row.id || extraData.id || "",
    name: row.name || extraData.name || "Boss de Altherium",

    difficultyKey: row.difficulty_key || extraData.difficultyKey || "medio",
    difficultyLabel: row.difficulty_label || extraData.difficultyLabel || "Boss médio",

    bossHp: row.boss_hp ?? extraData.bossHp ?? 0,
    rounds: row.rounds ?? extraData.rounds ?? 1,

    minDamage: row.min_damage ?? extraData.minDamage ?? 0,
    maxDamage: row.max_damage ?? extraData.maxDamage ?? 0,
    recommendedDamage: row.recommended_damage ?? extraData.recommendedDamage ?? 0,

    recommendedDice: row.recommended_dice || extraData.recommendedDice || { formula: "0", average: 0 },
    minDice: row.min_dice || extraData.minDice || { formula: "0", average: 0 },
    maxDice: row.max_dice || extraData.maxDice || { formula: "0", average: 0 },

    averageHp: row.average_hp ?? extraData.averageHp ?? 0,
    totalDamageAverage: row.total_damage_average ?? extraData.totalDamageAverage ?? 0,
    validPlayersCount: row.valid_players_count ?? extraData.validPlayersCount ?? 0,

    createdAt: row.created_at || extraData.createdAt || "",
    updatedAt: row.updated_at || extraData.updatedAt || "",
  };
}

async function getAltheriumBestiaryEnemies(campaign) {
  if (!campaign || !campaign.id) return [];

  await migrateLocalAltheriumEnemiesToSupabase(campaign);

  const { data, error } = await DB
    .from("altherium_bestiary")
    .select("*")
    .eq("campaign_id", campaign.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao carregar inimigos do Supabase:", error);
    return [];
  }

  return (data || []).map(mapAltheriumEnemyFromDbRow);
}

async function migrateLocalAltheriumEnemiesToSupabase(campaign) {
  if (!campaign || !campaign.id) return;

  const storageKey = getAltheriumEnemiesStorageKey(campaign);
  const rawEnemies = localStorage.getItem(storageKey);

  if (!rawEnemies) return;

  let localEnemies = [];

  try {
    localEnemies = JSON.parse(rawEnemies);
  } catch (error) {
    console.error("Erro ao ler inimigos antigos do localStorage:", error);
    return;
  }

  if (!Array.isArray(localEnemies) || !localEnemies.length) {
    localStorage.removeItem(storageKey);
    return;
  }

  const rows = localEnemies.slice(0, 50).map((enemy) => {
    const migratedEnemy = {
      ...enemy,
      oldLocalId: enemy.id,
      migratedFromLocalStorage: true,
      migratedAt: new Date().toISOString(),
    };

    return mapAltheriumEnemyToDbRow(campaign, migratedEnemy);
  });

  const { error } = await DB.from("altherium_bestiary").insert(rows);

  if (error) {
    console.error("Erro ao migrar inimigos antigos para o Supabase:", error);
    return;
  }

  localStorage.removeItem(storageKey);
}

function getAltheriumEnemiesStorageKey(campaign) {
  const campaignId = campaign ? campaign.id : "sem-campanha";

  return `campaign-lab-altherium-enemies-${campaignId}`;
}

async function renderAltheriumGeneratedEnemiesList() {
  const container = getFirstElement([
    "generatedEnemiesList",
    "monsterGrid",
    "generated-enemies-list",
  ]);

  if (!container) return;

  const campaign = await getCurrentCampaign(true);
  const enemies = await getAltheriumBestiaryEnemies(campaign);

  if (!enemies.length) {
    container.innerHTML = `
      <div class="altherium-empty">
        <h3>Nenhum inimigo cadastrado</h3>
        <p>Gere um inimigo para ele aparecer nesta lista.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = enemies
    .map(
      (enemy) => `
        <article class="boss-result-card generated-enemy-card">
          <div class="boss-result-card__header">
            <div>
              <span class="boss-result-card__tag">${escapeHtml(enemy.difficultyLabel)}</span>
              <h2>${escapeHtml(enemy.name)}</h2>
            </div>

            <div class="boss-result-card__header-actions">
              <strong class="boss-result-card__hp">PV ${formatCombatNumber(enemy.bossHp)}</strong>

              <button
                type="button"
                class="altherium-btn btn-remove-player"
                data-delete-enemy-id="${escapeHtml(enemy.id)}"
              >
                Excluir inimigo
              </button>
            </div>
          </div>

          <div class="boss-result-grid">
            <div>
              <span>Rodadas</span>
              <strong>${formatCombatNumber(enemy.rounds)}</strong>
            </div>

            <div>
              <span>Dano recomendado</span>
              <strong>${escapeHtml(enemy.recommendedDice.formula || "0")}</strong>
            </div>

            <div>
              <span>Faixa de dano</span>
              <strong>${formatCombatNumber(enemy.minDamage)} - ${formatCombatNumber(enemy.maxDamage)}</strong>
            </div>

            <div>
              <span>Jogadores usados</span>
              <strong>${formatCombatNumber(enemy.validPlayersCount)}</strong>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

async function deleteAltheriumGeneratedEnemy(enemyId) {
  const campaign = await getCurrentCampaign(true);

  if (!campaign || !campaign.id) {
    alert("Campanha não encontrada.");
    return;
  }

  const { error } = await DB
    .from("altherium_bestiary")
    .delete()
    .eq("id", enemyId)
    .eq("campaign_id", campaign.id);

  if (error) {
    console.error("Erro ao excluir inimigo do Supabase:", error);
    alert("Erro ao excluir inimigo.");
    return;
  }

  await renderAltheriumGeneratedEnemiesList();
  await updateAltheriumMonsterCount();

  const currentResult = getFirstElement([
    "bestiaryResult",
    "bossResult",
    "boss-result",
    "altheriumBossResult",
  ]);

  const deletedButton = currentResult
    ? [...currentResult.querySelectorAll("[data-delete-enemy-id]")].find(
        (button) => button.dataset.deleteEnemyId === enemyId
      )
    : null;

  if (deletedButton) {
    currentResult.innerHTML = `
      <div class="altherium-empty">
        <h3>Inimigo excluído</h3>
        <p>O inimigo foi removido do bestiário da campanha.</p>
      </div>
    `;
  }
}

async function clearAltheriumGeneratedEnemies() {
  const campaign = await getCurrentCampaign(true);

  if (!campaign || !campaign.id) {
    alert("Campanha não encontrada.");
    return;
  }

  const { error } = await DB
    .from("altherium_bestiary")
    .delete()
    .eq("campaign_id", campaign.id);

  if (error) {
    console.error("Erro ao limpar bestiário no Supabase:", error);
    alert("Erro ao limpar o bestiário.");
    return;
  }

  await renderAltheriumGeneratedEnemiesList();
  await updateAltheriumMonsterCount();

  const result = getFirstElement([
    "bestiaryResult",
    "bossResult",
    "boss-result",
    "altheriumBossResult",
  ]);

  if (result) {
    result.innerHTML = `
      <div class="altherium-empty">
        <h3>Bestiário limpo</h3>
        <p>Todos os inimigos gerados foram removidos.</p>
      </div>
    `;
  }
}

async function updateAltheriumMonsterCount() {
  const counter = document.getElementById("monsterCount");
  if (!counter) return;

  const campaign = await getCurrentCampaign(true);

  if (!campaign || !campaign.id) {
    counter.textContent = "0";
    return;
  }

  const { count, error } = await DB
    .from("altherium_bestiary")
    .select("id", { count: "exact", head: true })
    .eq("campaign_id", campaign.id);

  if (error) {
    console.error("Erro ao contar inimigos do Supabase:", error);
    counter.textContent = "0";
    return;
  }

  counter.textContent = count || 0;
}



function injectAltheriumEnemyDeleteButtonStyles() {
  if (document.getElementById("altherium-enemy-delete-button-style")) return;

  const style = document.createElement("style");
  style.id = "altherium-enemy-delete-button-style";

  style.textContent = `
    .boss-result-card__header-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      gap: 12px;
      flex-shrink: 0;
    }

    .boss-result-card__header-actions .boss-result-card__hp {
      margin: 0;
    }

    .boss-result-card__header-actions button[data-delete-enemy-id] {
      width: auto;
      min-width: 150px;
      min-height: 42px;
      padding: 0 18px;

      display: inline-flex;
      align-items: center;
      justify-content: center;

      border: 1px solid rgba(239, 68, 68, 0.55);
      border-radius: 999px;

      background: rgba(239, 68, 68, 0.1);
      color: #fecaca;

      font-size: 13px;
      font-weight: 900;
      line-height: 1;
      text-align: center;
      white-space: nowrap;

      box-shadow: none;
      cursor: pointer;
      transition: 0.25s ease;
    }

    .boss-result-card__header-actions button[data-delete-enemy-id]:hover {
      transform: translateY(-2px);
      border-color: rgba(239, 68, 68, 0.9);
      background: rgba(239, 68, 68, 0.2);
      color: #ffffff;
      box-shadow: 0 12px 28px rgba(239, 68, 68, 0.18);
    }

    .boss-result-card__header-actions button[data-delete-enemy-id]:active {
      transform: translateY(0);
    }

    @media (max-width: 760px) {
      .boss-result-card__header-actions {
        width: 100%;
        align-items: stretch;
      }

      .boss-result-card__header-actions .boss-result-card__hp {
        width: 100%;
        text-align: center;
      }

      .boss-result-card__header-actions button[data-delete-enemy-id] {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(style);
}

function getDamageAverageFromExpression(expression) {
  const value = String(expression || "").trim().toLowerCase().replaceAll(",", ".");

  if (!value) return 0;

  if (/^[+-]?\d+(\.\d+)?$/.test(value)) {
    return Math.max(0, Number(value));
  }

  const compact = value.replace(/\s+/g, "");
  const tokenRegex = /([+-]?\d*)d(\d+)|([+-]?\d+(?:\.\d+)?)/g;
  let total = 0;
  let foundToken = false;
  let match;

  while ((match = tokenRegex.exec(compact)) !== null) {
    foundToken = true;

    if (match[2]) {
      const rawQuantity = match[1];
      const quantity = rawQuantity === "" || rawQuantity === "+" ? 1 : rawQuantity === "-" ? -1 : Number(rawQuantity);
      const sides = Number(match[2]);

      if (Number.isFinite(quantity) && Number.isFinite(sides) && sides > 0) {
        total += quantity * ((sides + 1) / 2);
      }
    } else if (match[3]) {
      total += Number(match[3]);
    }
  }

  if (!foundToken) return 0;

  return Math.max(0, total);
}

function getClosestDiceByAverage(targetAverage) {
  const target = Math.max(0, Number(targetAverage) || 0);

  if (target <= 0) {
    return {
      formula: "0",
      average: 0,
      quantity: 0,
      sides: 0,
    };
  }

  let best = null;

  for (let quantity = 1; quantity <= 12; quantity += 1) {
    for (const sides of ALTHERIUM_DICE_SIDES) {
      const average = quantity * ((sides + 1) / 2);
      const difference = Math.abs(average - target);
      const complexity = quantity * 0.01;
      const score = difference + complexity;

      if (!best || score < best.score) {
        best = {
          formula: `${quantity}d${sides}`,
          average,
          quantity,
          sides,
          difference,
          score,
        };
      }
    }
  }

  return best;
}

function normalizeBossDifficulty(value) {
  const normalized = String(value || "medio")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized.includes("frac")) return "fraco";
  if (normalized.includes("fort")) return "forte";
  return "medio";
}

function toCombatNumber(value) {
  if (value === null || value === undefined || value === "") return 0;

  const parsed = Number(String(value).replaceAll(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCombatNumber(value) {
  const number = Number(value) || 0;

  if (Number.isInteger(number)) return String(number);
  return number.toFixed(1).replace(".0", "");
}

function getFirstElement(ids) {
  for (const id of ids) {
    const element = document.getElementById(id);
    if (element) return element;
  }

  return null;
}


/* =========================================================
   BOTÃO VOLTAR NO HEADER - TODAS AS PÁGINAS
========================================================= */

function setupHeaderBackButton() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (currentPage === "index.html") return;

  injectHeaderButtonFixedStyles();

  document
    .querySelectorAll(".header-nav-actions, .header-back-area, .header-logout-area")
    .forEach((element) => element.remove());

  const backArea = document.createElement("div");
  backArea.className = "header-back-area";

  const logoutArea = document.createElement("div");
  logoutArea.className = "header-logout-area";

  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "header-back-button";
  backButton.setAttribute("aria-label", "Voltar para a página anterior");
  backButton.title = "Voltar";

  backButton.innerHTML = `
    <span class="header-back-button__icon">‹</span>
    <span class="header-back-button__text">Voltar</span>
  `;

  backButton.addEventListener("click", () => {
    const clickedPage = window.location.pathname.split("/").pop() || "index.html";

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    if (
      clickedPage === "altherium-mestre.html" ||
      clickedPage === "altherium-jogador.html" ||
      clickedPage === "dnd-mestre.html" ||
      clickedPage === "dnd-jogador.html" ||
      clickedPage === "criar-campanha.html"
    ) {
      window.location.href = "minhas-campanhas.html";
      return;
    }

    if (clickedPage === "minhas-campanhas.html") {
      window.location.href = "index.html";
      return;
    }

    window.location.href = "index.html";
  });

  const logoutButton = document.createElement("button");
  logoutButton.type = "button";
  logoutButton.className = "header-logout-button";
  logoutButton.setAttribute("aria-label", "Sair da conta");
  logoutButton.title = "Logout";

  logoutButton.innerHTML = `
    <span class="header-logout-button__icon">⏻</span>
    <span class="header-logout-button__text">Logout</span>
  `;

  logoutButton.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });

  backArea.appendChild(backButton);
  logoutArea.appendChild(logoutButton);

  document.body.appendChild(backArea);
  document.body.appendChild(logoutArea);

  forceHeaderButtonLayout(backArea, logoutArea, backButton, logoutButton);
}

function injectHeaderButtonFixedStyles() {
  const oldStyle = document.getElementById("campaign-lab-header-buttons-fixed-style");
  if (oldStyle) oldStyle.remove();

  const style = document.createElement("style");
  style.id = "campaign-lab-header-buttons-fixed-style";

  style.textContent = `
    body > .header-back-area,
    body > .header-logout-area {
      position: fixed !important;
      top: 46px !important;
      z-index: 999999 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transform: translateY(-50%) !important;
      pointer-events: auto !important;
    }

    body > .header-back-area {
      left: 28px !important;
      right: auto !important;
    }

    body > .header-logout-area {
      right: 28px !important;
      left: auto !important;
    }

    .header-nav-actions {
      display: none !important;
    }

    body > .header-back-area .header-back-button,
    body > .header-logout-area .header-logout-button,
    body > .header-back-area .header-back-button:hover,
    body > .header-logout-area .header-logout-button:hover,
    body > .header-back-area .header-back-button:active,
    body > .header-logout-area .header-logout-button:active {
      transform: none !important;
    }

    body > .header-back-area .header-back-button {
      width: auto !important;
      min-width: 128px !important;
      height: 46px !important;
      padding: 0 18px 0 10px !important;
      gap: 9px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 999px !important;
      border: 1px solid rgba(34, 211, 238, 0.68) !important;
      background: #020617 !important;
      color: #f8fafc !important;
      font-family: "Quantico", sans-serif !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      letter-spacing: 0.4px !important;
      text-transform: uppercase !important;
      cursor: pointer !important;
      transition: border-color 0.22s ease, background 0.22s ease, color 0.22s ease, box-shadow 0.22s ease !important;
      box-shadow:
        0 0 0 1px rgba(34, 211, 238, 0.1),
        0 0 22px rgba(34, 211, 238, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body > .header-logout-area .header-logout-button {
      width: 46px !important;
      min-width: 46px !important;
      max-width: 46px !important;
      height: 46px !important;
      min-height: 46px !important;
      max-height: 46px !important;
      padding: 0 !important;
      gap: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 999px !important;
      border: 1px solid rgba(248, 113, 113, 0.68) !important;
      background: #120812 !important;
      color: #f8fafc !important;
      cursor: pointer !important;
      transition: border-color 0.22s ease, background 0.22s ease, color 0.22s ease, box-shadow 0.22s ease !important;
      box-shadow:
        0 0 0 1px rgba(248, 113, 113, 0.08),
        0 0 20px rgba(248, 113, 113, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body > .header-back-area .header-back-button__icon,
    body > .header-logout-area .header-logout-button__icon {
      width: 30px !important;
      height: 30px !important;
      min-width: 30px !important;
      display: grid !important;
      place-items: center !important;
      border-radius: 999px !important;
      font-family: "Quantico", sans-serif !important;
      font-weight: 900 !important;
      line-height: 1 !important;
    }

    body > .header-back-area .header-back-button__icon {
      background: rgba(34, 211, 238, 0.16) !important;
      color: #67e8f9 !important;
      font-size: 24px !important;
    }

    body > .header-logout-area .header-logout-button__icon {
      background: rgba(248, 113, 113, 0.14) !important;
      color: #fca5a5 !important;
      font-size: 13px !important;
    }

    body > .header-back-area .header-back-button__text {
      display: inline-block !important;
      color: #f8fafc !important;
    }

    body > .header-logout-area .header-logout-button__text {
      display: none !important;
    }

    body > .header-back-area .header-back-button:hover {
      border-color: rgba(34, 211, 238, 0.95) !important;
      background: #062133 !important;
      color: #ffffff !important;
    }

    body > .header-logout-area .header-logout-button:hover {
      border-color: rgba(248, 113, 113, 0.95) !important;
      background: #2a0d13 !important;
      color: #ffffff !important;
    }

    @media (max-width: 760px) {
      body > .header-back-area,
      body > .header-logout-area {
        top: 41px !important;
      }

      body > .header-back-area {
        left: 10px !important;
      }

      body > .header-logout-area {
        right: 10px !important;
      }

      body > .header-back-area .header-back-button,
      body > .header-logout-area .header-logout-button {
        width: 42px !important;
        min-width: 42px !important;
        max-width: 42px !important;
        height: 42px !important;
        min-height: 42px !important;
        max-height: 42px !important;
        padding: 0 !important;
        gap: 0 !important;
      }

      body > .header-back-area .header-back-button__text,
      body > .header-logout-area .header-logout-button__text {
        display: none !important;
      }

      body > .header-back-area .header-back-button__icon,
      body > .header-logout-area .header-logout-button__icon {
        width: 28px !important;
        height: 28px !important;
        min-width: 28px !important;
      }
    }
  `;

  document.head.appendChild(style);
}

function forceHeaderButtonLayout(backArea, logoutArea, backButton, logoutButton) {
  backArea.style.setProperty("position", "fixed", "important");
  backArea.style.setProperty("top", "46px", "important");
  backArea.style.setProperty("left", "28px", "important");
  backArea.style.setProperty("right", "auto", "important");
  backArea.style.setProperty("z-index", "999999", "important");
  backArea.style.setProperty("transform", "translateY(-50%)", "important");

  logoutArea.style.setProperty("position", "fixed", "important");
  logoutArea.style.setProperty("top", "46px", "important");
  logoutArea.style.setProperty("right", "28px", "important");
  logoutArea.style.setProperty("left", "auto", "important");
  logoutArea.style.setProperty("z-index", "999999", "important");
  logoutArea.style.setProperty("transform", "translateY(-50%)", "important");

  backButton.style.setProperty("transform", "none", "important");
  logoutButton.style.setProperty("transform", "none", "important");

  ["mouseenter", "mouseover", "mousemove", "mouseleave", "mousedown", "mouseup"].forEach((eventName) => {
    backButton.addEventListener(eventName, () => {
      backButton.style.setProperty("transform", "none", "important");
    });

    logoutButton.addEventListener(eventName, () => {
      logoutButton.style.setProperty("transform", "none", "important");
    });
  });
}

/* =========================================================
   RAIZ - SELECT CUSTOMIZADO
========================================================= */

function setupRootCustomSelect() {
  const nativeSelect = document.getElementById("rootSelect");
  const trigger = document.getElementById("rootCustomTrigger");
  const menu = document.getElementById("rootCustomMenu");

  if (!nativeSelect || !trigger || !menu) return;

  const label = trigger.querySelector(".root-custom-trigger__label");
  const options = Array.from(menu.querySelectorAll(".root-custom-option"));

  function formatRootLabel(value) {
    if (value === "berserk") return "BERSERK";
    if (value === "runaskin") return "RUNASKIN";
    if (value === "pilar") return "PILAR";
    return "Selecione a raiz";
  }

  function syncUI(value) {
    label.textContent = formatRootLabel(value);

    options.forEach((option) => {
      option.classList.toggle("active", option.dataset.rootValue === value);
    });
  }

  function openMenu() {
    trigger.classList.add("open");
    menu.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    trigger.classList.remove("open");
    menu.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (menu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  trigger.addEventListener("click", toggleMenu);

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.rootValue || "";

      nativeSelect.value = value;
      syncUI(value);
      closeMenu();

      nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
      nativeSelect.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  document.addEventListener("click", (event) => {
    const wrapper = document.querySelector("[data-root-custom-select]");
    if (!wrapper) return;

    if (!wrapper.contains(event.target)) {
      closeMenu();
    }
  });

  nativeSelect.addEventListener("change", () => {
    syncUI(nativeSelect.value);
  });

  syncUI(nativeSelect.value);
}

document.addEventListener("DOMContentLoaded", () => {
  setupRootCustomSelect();
});


/* =========================================================
   CONTROLES PREMIUM DE NÚMERO - FICHA D&D
========================================================= */

function setupCampaignLabNumberControls() {
  if (window.campaignLabNumberControlsReady) return;

  window.campaignLabNumberControlsReady = true;

  function upgradeAllNumberInputs() {
    const numberInputs = document.querySelectorAll(
      [
        ".dnd-character-sheet input[type='number']",
        ".master-dnd-sheet input[type='number']",
        ".dnd-player-page input[type='number']",
        ".dnd-master-page .altherium-modal input[type='number']"
      ].join(",")
    );

    numberInputs.forEach(upgradeNumberInput);
  }

  function upgradeNumberInput(input) {
    if (!input || input.dataset.numberControlReady === "true") return;
    if (input.closest(".number-control")) return;

    input.dataset.numberControlReady = "true";

    const wrapper = document.createElement("div");
    wrapper.className = "number-control dnd-number-control";

    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const buttons = document.createElement("div");
    buttons.className = "number-control-buttons dnd-number-control-buttons";

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.className = "number-control-btn dnd-number-control-btn up";
    upButton.innerHTML = "<span>⌃</span>";
    upButton.setAttribute("aria-label", "Aumentar valor");

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.className = "number-control-btn dnd-number-control-btn down";
    downButton.innerHTML = "<span>⌄</span>";
    downButton.setAttribute("aria-label", "Diminuir valor");

    buttons.appendChild(upButton);
    buttons.appendChild(downButton);
    wrapper.appendChild(buttons);

    upButton.addEventListener("click", () => {
      changeNumberInputValue(input, 1);
    });

    downButton.addEventListener("click", () => {
      changeNumberInputValue(input, -1);
    });

    input.addEventListener("input", () => {
      updateNumberButtons(input, upButton, downButton);
    });

    input.addEventListener("change", () => {
      updateNumberButtons(input, upButton, downButton);
    });

    updateNumberButtons(input, upButton, downButton);
  }

  function changeNumberInputValue(input, direction) {
    if (input.disabled || input.readOnly) return;

    const step = getNumberAttribute(input, "step", 1);
    const min = getNumberAttribute(input, "min", null);
    const max = getNumberAttribute(input, "max", null);

    const currentValue =
      input.value === "" ? (min !== null ? min : 0) : Number(input.value);

    let newValue = currentValue + step * direction;

    if (min !== null) newValue = Math.max(min, newValue);
    if (max !== null) newValue = Math.min(max, newValue);

    input.value = formatNumberControlValue(newValue, step);

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function updateNumberButtons(input, upButton, downButton) {
    const min = getNumberAttribute(input, "min", null);
    const max = getNumberAttribute(input, "max", null);
    const value = Number(input.value);
    const hasValue = input.value !== "" && Number.isFinite(value);

    upButton.disabled =
      input.disabled || input.readOnly || (hasValue && max !== null && value >= max);

    downButton.disabled =
      input.disabled || input.readOnly || (hasValue && min !== null && value <= min);
  }

  function getNumberAttribute(input, attribute, fallback) {
    const value = input.getAttribute(attribute);

    if (value === null || value === "" || value === "any") return fallback;

    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function formatNumberControlValue(value, step) {
    if (Number.isInteger(step)) return String(Math.round(value));

    const decimalPlaces = String(step).split(".")[1]?.length || 0;
    return value.toFixed(decimalPlaces);
  }

  upgradeAllNumberInputs();

  const observer = new MutationObserver(() => {
    upgradeAllNumberInputs();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

