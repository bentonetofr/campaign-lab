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


const ALTHERIUM_GENESIS_OPTIONS = [
  {
    key: "",
    value: "",
    label: "Selecione o Genesis",
    description: "Escolha o passado do personagem para aplicar os bônus automáticos.",
    automatic: [],
    notes: [],
  },
  {
    key: "cacador",
    value: "Caçador",
    label: "Caçador",
    description: "Adiciona +1d4 no acerto em armas à distância.",
    automatic: [
      { type: "number", field: "domain_furtividade", bonus: 1, label: "Furtividade" },
    ],
    notes: [],
  },
  {
    key: "curandeiro",
    value: "Curandeiro",
    label: "Curandeiro",
    description: "Adiciona +1d10 na cura.",
    automatic: [
      { type: "number", field: "domain_medicina", bonus: 1, label: "Medicina" },
    ],
    notes: [],
  },
  {
    key: "determinado",
    value: "Determinado",
    label: "Determinado",
    description: "Adiciona +1d10 em Equilíbrio.",
    automatic: [
      { type: "number", field: "domain_determinacao", bonus: 1, label: "Determinação" },
    ],
    notes: [],
  },
  {
    key: "devoto",
    value: "Devoto",
    label: "Devoto",
    description: "Pode usar a Religião no lugar de qualquer teste social.",
    automatic: [],
    notes: [],
  },
  {
    key: "filho_de_mercante",
    value: "Filho de mercante",
    label: "Filho de mercante",
    description: "Ganha ¤800 adicionais na criação do personagem.",
    automatic: [
      { type: "number", field: "hacksilvers", bonus: 800, label: "Hacksilvers" },
      { type: "number", field: "domain_persuasao", bonus: 1, label: "Persuasão" },
    ],
    notes: [],
  },
  {
    key: "guerreiro",
    value: "Guerreiro",
    label: "Guerreiro",
    description: "Adiciona +1d4 no acerto em armas corpo a corpo.",
    automatic: [
      { type: "number", field: "domain_intimidacao", bonus: 1, label: "Intimidação" },
    ],
    notes: [],
  },
  {
    key: "guia_espiritual",
    value: "Guia espiritual",
    label: "Guia espiritual",
    description: "Adiciona +1d10 na cura do equilíbrio.",
    automatic: [
      { type: "number", field: "domain_pressentimento", bonus: 1, label: "Pressentimento" },
    ],
    notes: [],
  },
  {
    key: "corredor",
    value: "Corredor",
    label: "Corredor",
    description: "Tem +5m de movimento no deslocamento.",
    automatic: [
      { type: "number", field: "domain_leveza", bonus: 1, label: "Leveza" },
    ],
    notes: [],
  },
  {
    key: "peregrino",
    value: "Peregrino",
    label: "Peregrino",
    description: "Pode recuperar +1d10 em todos os pontos básicos em cenas de descanso.",
    automatic: [
      { type: "number", field: "domain_sobrevivencia", bonus: 1, label: "Sobrevivência" },
    ],
    notes: [],
  },
  {
    key: "rastreador",
    value: "Rastreador",
    label: "Rastreador",
    description: "Recebe +1d10 em teste de investigação.",
    automatic: [
      { type: "number", field: "domain_investigacao", bonus: 1, label: "Investigação" },
      { type: "number", field: "domain_percepcao", bonus: 1, label: "Percepção" },
    ],
    notes: [],
  },
  {
    key: "robusto",
    value: "Robusto",
    label: "Robusto",
    description: "Consegue +1 de DB em todas as partes do corpo.",
    automatic: [
      { type: "number", field: "bodyLegs", bonus: 1, label: "DB Pernas" },
      { type: "number", field: "bodyArms", bonus: 1, label: "DB Braços" },
      { type: "number", field: "bodyTorso", bonus: 1, label: "DB Tronco" },
      { type: "number", field: "bodyHead", bonus: 1, label: "DB Cabeça" },
      { type: "number", field: "domain_resiliencia", bonus: 1, label: "Resiliência" },
    ],
    notes: [],
  },
  {
    key: "sem_passado",
    value: "Sem passado",
    label: "Sem passado",
    description: "O mestre define sua habilidade.",
    automatic: [],
    notes: [],
  },
];


const BERSERK_TRIUMPH_OPTIONS = [
  {
    "name": "Briga de Bar",
    "description": "Usa qualquer objeto como arma (1d8).",
    "action": "Ação Padrão",
    "cost": "4 FV",
    "range": "Toque/curto",
    "test": "Teste de luta com fúria"
  },
  {
    "name": "Corrente Predadora",
    "description": "Coloca corrente em uma arma pesada ou leve, puxa o inimigo em sua direção e o deixa perto ao acertar.",
    "action": "Ação Bônus",
    "cost": "2 FV",
    "range": "Curto",
    "test": "Teste de luta com Impulso"
  },
  {
    "name": "Crítico Selvagem",
    "description": "Acertos críticos maximizam 1 dado do dano.",
    "action": "Ação Bônus",
    "cost": "2 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Fôlego Extra",
    "description": "Ganha 1 ação padrão adicional no turno.",
    "action": "Ação Livre",
    "cost": "4 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Fúria Alucinada",
    "description": "Com Cogumelo Berserkr, ganha +1 dado em FÚRIA extra na cena.",
    "action": "Ação Livre",
    "cost": "4 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Golpe Duas Mãos",
    "description": "Ataque usando uma arma com cada mão por 1d4 turnos.",
    "action": "Ação Bônus",
    "cost": "6 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Impacto Trovejante",
    "description": "Crítico com martelo derruba inimigos em um raio de 5 metros contra teste de Equilíbrio.",
    "action": "Ação Bônus",
    "cost": "2 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Machado Incansável",
    "description": "Com machados, ganha +1d10 para acertar se atacar o mesmo inimigo até o fim da cena.",
    "action": "Ação Bônus",
    "cost": "4 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Mão de Ferro",
    "description": "Com maças ou martelos, ignora até 1d4 de DB da armadura inimiga por 1d4 turnos.",
    "action": "Ação Bônus",
    "cost": "2 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Olho de Caçador",
    "description": "Com armas de longa distância, recebe +2 para acertar e +1 no dano por ponto de Fúria.",
    "action": "Ação Bônus",
    "cost": "2 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Pele Endurecida",
    "description": "Reduz 1d8 de dano recebido por uso.",
    "action": "Reação",
    "cost": "2 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Punhos de Ferro",
    "description": "Causa mais dano quando luta desarmado (1d6).",
    "action": "Ação Bônus",
    "cost": "1 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Quebra-Armadura",
    "description": "Crítico com arma pesada ignora armadura do inimigo.",
    "action": "Ação Bônus",
    "cost": "4 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Rasteira",
    "description": "Teste de brutalidade com o inimigo. Se vencer, ele cai e gasta 1 ação para se levantar.",
    "action": "Ação Bônus",
    "cost": "2 FV",
    "range": "Toque",
    "test": "Brutalidade com fúria"
  },
  {
    "name": "Rugido de Guerra",
    "description": "Fortalece e revigora suas energias. +1d10 de FV.",
    "action": "Ação Bônus",
    "cost": "4 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Sangue Quente",
    "description": "Ao ficar com menos de 50% de Vida, ganha +2 de bônus em FÚRIA até o fim da cena.",
    "action": "Ação Bônus",
    "cost": "4 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Saque Rápido",
    "description": "Pode sacar a sua arma ou itens com uma ação livre.",
    "action": "Ação Livre",
    "cost": "2 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Carga Imparável",
    "description": "Avança até o inimigo em linha reta e ganha +2 no dano do primeiro ataque.",
    "action": "Ação Padrão",
    "cost": "4 FV",
    "range": "Curto",
    "test": "Teste de brutalidade com Impulso"
  },
  {
    "name": "Sangue na Lâmina",
    "description": "Ao chegar pela primeira vez na metade da vida do inimigo ou menos, recupera 1d10 PV. Uma vez por cena.",
    "action": "Ação Bônus",
    "cost": "2 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Ação Sangrenta",
    "description": "Quando mata um inimigo corpo a corpo, pode usar a mesma ação para atacar outro inimigo corpo a corpo.",
    "action": "Ação Bônus",
    "cost": "3 FV",
    "range": "Toque",
    "test": "Sem teste"
  },
  {
    "name": "Último Grito",
    "description": "Ganha 5 de resistência a um tipo de dano à sua escolha por 1d4 turno.",
    "action": "Ação Bônus",
    "cost": "4 FV",
    "range": "Qualquer",
    "test": "Resiliência com espírito"
  },
  {
    "name": "Salto de Matias",
    "description": "Executa um grande salto, aumentando a movimentação. Adiciona mais 5 metros na movimentação por 1d4 turnos.",
    "action": "Ação Bônus",
    "cost": "4 FV",
    "range": "Qualquer",
    "test": "Leveza com Impulso"
  },
  {
    "name": "Ferro Temperado",
    "description": "Empunhando uma arma pesada, seus críticos causam +1 dado do dano ou ignoram 5 pontos de armadura.",
    "action": "Ação Bônus",
    "cost": "6 FV",
    "range": "Qualquer",
    "test": "Sem teste"
  },
  {
    "name": "Cadeia de Sangue",
    "description": "Ao acertar um inimigo, você pode gastar 1 FV para saltar para outro inimigo a curto alcance e atacá-lo com -2 na rolagem.",
    "action": "Ação Bônus",
    "cost": "1 FV",
    "range": "Curto",
    "test": "Sem teste"
  }
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


const BERSERK_TRIUMPH_NOTES_START = "===== TRIUNFOS BERSERK SELECIONADOS =====";
const BERSERK_TRIUMPH_NOTES_END = "===== FIM DOS TRIUNFOS BERSERK =====";
const RUNASKIN_VISUAL_NOTE_COUNT = 8;
const RUNASKIN_VISUAL_NOTE_INCREMENT = 4;


const PLAYER_CHAT_EMOJI_OPTIONS = [
  "😀", "😂", "😎", "😈", "😭", "😱", "😤", "🤝", "❤️", "✨",
  "🎲", "⚔️", "🛡️", "🏹", "🧙", "🐺", "👑", "💀", "🔥", "🩸",
  "🌙", "⭐", "🍻", "🧪", "📜", "🗡️", "🪓", "🔮", "🧿", "🏆"
];

const PLAYER_CHAT_STICKER_OPTIONS = [
  { id: "critico", icon: "🎲", title: "Crítico!", text: "Crítico!" },
  { id: "falha", icon: "💀", title: "Falha", text: "Falha crítica" },
  { id: "ataque", icon: "⚔️", title: "Ataque", text: "Vou atacar" },
  { id: "defesa", icon: "🛡️", title: "Defesa", text: "Eu defendo" },
  { id: "fogo", icon: "🔥", title: "Fogo", text: "Queime tudo" },
  { id: "sangue", icon: "🩸", title: "Sangue", text: "Sangue por sangue" },
  { id: "mestre", icon: "👑", title: "Mestre", text: "Chamando o mestre" },
  { id: "misterio", icon: "🔮", title: "Mistério", text: "Algo estranho aconteceu" },
  { id: "vitoria", icon: "🏆", title: "Vitória", text: "Vitória da mesa" },
  { id: "taverna", icon: "🍻", title: "Taverna", text: "Hora da taverna" },
  { id: "lobo", icon: "🐺", title: "Lobo", text: "Instinto de lobo" },
  { id: "perigo", icon: "😱", title: "Perigo", text: "Estamos em perigo" }
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
let diceRealtimeChannel = null;
let campaignPresenceChannel = null;
let campaignChatRealtimeChannel = null;
let campaignChatAudioContext = null;
let campaignChatNotificationReady = false;
let campaignPresenceState = {};
let campaignPresenceReady = false;
let saveTimer = null;

const MAX_MASTER_CAMPAIGNS = 10;
const CAMPAIGN_COVER_MAX_SIZE = 2.5 * 1024 * 1024;
const CAMPAIGN_COVER_MAX_WIDTH = 1400;
const CAMPAIGN_COVER_JPEG_QUALITY = 0.82;
const CAMPAIGN_COVER_ADJUST_SAVE_DELAY = 450;
const CAMPAIGN_COVER_MIN_ZOOM = 1;
const CAMPAIGN_COVER_MAX_ZOOM = 1.8;
const DEFAULT_CAMPAIGN_COVER_SETTINGS = {
  x: 50,
  y: 50,
  zoom: 1,
};

/* =========================================================
   BOOT
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  setupCampaignLabNumberControls();
  setupHeaderBackButton();
  setupAltheriumRootDynamicControls();
  setupAltheriumGenesisDynamicControls();
  setupCharacterPortraitControls();
  setupFloatingSheetSaveButton();
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
    await setupMasterCampaignCoverPanel("Altherium");
    await setupCampaignPresence();
    await setupOnlinePlayersInfoPanel();
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
    await setupCampaignDiceRoller("Altherium");
    await setupMasterCampaignChat("Altherium");
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
    await setupPlayerInfo("playerNameView", "campaignNameView");
    await setupCampaignPresence();
    await setupOnlinePlayersInfoPanel();
    await setupAltheriumPlayerSheet();
    await setupInitiativeBoard(getAltheriumPlayerInitiativeConfig());
    await setupCampaignDiceRoller("Altherium");
    await setupPlayerCampaignChat("Altherium");
    subscribeCampaignRealtime(refreshCurrentPlayerPanel);
  }

  if (document.body.classList.contains("dnd-master-page")) {
    await protectPage("D&D", "Mestre");
    await setupMasterCampaignName();
    await setupMasterCampaignCoverPanel("D&D");
    await setupCampaignPresence();
    await setupOnlinePlayersInfoPanel();
    await setupMasterPlayersRealtime("dndPlayersGrid", "dndPlayerCount");
    await setupDndMasterSheets();
    await setupInitiativeBoard({
      system: "D&D",
      boardId: "dndInitiativeBoard",
      clearButtonId: "clearDndInitiativeBtn",
      getSheet: getOrCreateDndSheet,
      updateSheet: updateDndSheet,
    });
    await setupCampaignDiceRoller("D&D");
    await setupMasterCampaignChat("D&D");
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
    await setupPlayerInfo("dndPlayerNameView", "dndCampaignNameView");
    await setupCampaignPresence();
    await setupOnlinePlayersInfoPanel();
    await setupDndPlayerSheet();
    await setupInitiativeBoard(getDndPlayerInitiativeConfig());
    await setupCampaignDiceRoller("D&D");
    await setupPlayerCampaignChat("D&D");
    subscribeCampaignRealtime(refreshCurrentPlayerPanel);
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
    .select("id, name, avatar_url")
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
      cover_url,
      cover_position_x,
      cover_position_y,
      cover_zoom,
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
    coverUrl: row.cover_url || "",
    cover_url: row.cover_url || "",
    coverPositionX: row.cover_position_x ?? DEFAULT_CAMPAIGN_COVER_SETTINGS.x,
    cover_position_x: row.cover_position_x ?? DEFAULT_CAMPAIGN_COVER_SETTINGS.x,
    coverPositionY: row.cover_position_y ?? DEFAULT_CAMPAIGN_COVER_SETTINGS.y,
    cover_position_y: row.cover_position_y ?? DEFAULT_CAMPAIGN_COVER_SETTINGS.y,
    coverZoom: row.cover_zoom ?? DEFAULT_CAMPAIGN_COVER_SETTINGS.zoom,
    cover_zoom: row.cover_zoom ?? DEFAULT_CAMPAIGN_COVER_SETTINGS.zoom,
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

function getCampaignCoverUrl(campaign = {}) {
  return campaign.coverUrl || campaign.cover_url || campaign.capaUrl || campaign.campaignCoverUrl || "";
}

function normalizeCampaignCoverNumber(value, fallback, min, max) {
  const number = Number(value);

  if (!Number.isFinite(number)) return fallback;

  return Math.min(max, Math.max(min, number));
}

function getCampaignCoverSettings(campaign = {}) {
  const x = normalizeCampaignCoverNumber(
    campaign.coverPositionX ?? campaign.cover_position_x,
    DEFAULT_CAMPAIGN_COVER_SETTINGS.x,
    0,
    100
  );
  const y = normalizeCampaignCoverNumber(
    campaign.coverPositionY ?? campaign.cover_position_y,
    DEFAULT_CAMPAIGN_COVER_SETTINGS.y,
    0,
    100
  );
  const zoom = normalizeCampaignCoverNumber(
    campaign.coverZoom ?? campaign.cover_zoom,
    DEFAULT_CAMPAIGN_COVER_SETTINGS.zoom,
    CAMPAIGN_COVER_MIN_ZOOM,
    CAMPAIGN_COVER_MAX_ZOOM
  );

  return { x, y, zoom };
}

function getCampaignCoverStyleAttribute(campaign = {}) {
  const coverUrl = getCampaignCoverUrl(campaign);

  if (!coverUrl) return "";

  const settings = getCampaignCoverSettings(campaign);
  const scale = (1.02 * settings.zoom).toFixed(3);
  const hoverScale = (1.08 * settings.zoom).toFixed(3);

  return ` style="--campaign-card-cover: url(&quot;${escapeHtml(coverUrl)}&quot;); --campaign-card-cover-position-x: ${settings.x}%; --campaign-card-cover-position-y: ${settings.y}%; --campaign-card-cover-scale: ${scale}; --campaign-card-cover-hover-scale: ${hoverScale};"`;
}

function getCampaignCoverClass(campaign = {}) {
  return getCampaignCoverUrl(campaign) ? " campaign-card-wrapper--has-cover" : "";
}

async function setupMasterCampaignCoverPanel(systemName = "Sistema") {
  const campaign = await getCurrentCampaign(true);
  const user = getLoggedUserFromSession();

  if (!campaign || !user) return;
  if (String(campaign.mestreId || campaign.master_id || "") !== String(user.id || "")) return;

  const oldPanel = document.getElementById("campaignCoverPanel");
  if (oldPanel) oldPanel.remove();

  const coverUrl = getCampaignCoverUrl(campaign);
  const settings = getCampaignCoverSettings(campaign);
  const panel = document.createElement("section");
  panel.id = "campaignCoverPanel";
  panel.className = `campaign-cover-panel${coverUrl ? " campaign-cover-panel--has-image" : ""}`;

  panel.innerHTML = `
    <div class="campaign-cover-panel__preview" data-campaign-cover-preview style="--campaign-cover-preview-x: ${settings.x}%; --campaign-cover-preview-y: ${settings.y}%; --campaign-cover-preview-zoom: ${settings.zoom};">
      ${coverUrl ? `<img src="${escapeHtml(coverUrl)}" alt="Imagem da campanha ${escapeHtml(campaign.nome || campaign.name)}" loading="lazy" />` : `<span>Imagem da campanha</span>`}
    </div>

    <div class="campaign-cover-panel__content">
      <span>${escapeHtml(systemName)}</span>
      <h2>Imagem da campanha</h2>
      <p>Clique em escolher imagem. Depois use a janela de edição para arrastar, dar zoom e enquadrar a capa antes de salvar.</p>
    </div>

    <div class="campaign-cover-panel__actions">
      <label class="campaign-cover-upload-btn" for="campaignCoverInput">
        Escolher imagem
      </label>

      <button type="button" class="campaign-cover-remove-btn" data-remove-campaign-cover ${coverUrl ? "" : "disabled"}>
        Remover
      </button>

      <input
        id="campaignCoverInput"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        hidden
      />
    </div>
  `;

  const target =
    document.querySelector(".altherium-hero") ||
    document.querySelector(".dnd-hero") ||
    document.querySelector(".master-hero") ||
    document.querySelector(".altherium-main") ||
    document.querySelector("main") ||
    document.body;

  if (target.parentNode) {
    target.parentNode.insertBefore(panel, target.nextSibling);
  } else {
    document.body.appendChild(panel);
  }

  const input = panel.querySelector("#campaignCoverInput");
  const removeButton = panel.querySelector("[data-remove-campaign-cover]");

  if (input) {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];

      if (!file) return;

      await uploadCampaignCoverFromFile(file, campaign, panel);
      input.value = "";
    });
  }

  if (removeButton) {
    removeButton.addEventListener("click", async () => {
      await saveCampaignCoverUrl(campaign, "", panel, DEFAULT_CAMPAIGN_COVER_SETTINGS);
    });
  }

  setupCampaignCoverAdjustments(campaign, panel);
}

function getCampaignCoverPanelSettings(panel) {
  return {
    x: normalizeCampaignCoverNumber(
      panel?.querySelector("[data-campaign-cover-x]")?.value,
      DEFAULT_CAMPAIGN_COVER_SETTINGS.x,
      0,
      100
    ),
    y: normalizeCampaignCoverNumber(
      panel?.querySelector("[data-campaign-cover-y]")?.value,
      DEFAULT_CAMPAIGN_COVER_SETTINGS.y,
      0,
      100
    ),
    zoom: normalizeCampaignCoverNumber(
      panel?.querySelector("[data-campaign-cover-zoom]")?.value,
      DEFAULT_CAMPAIGN_COVER_SETTINGS.zoom,
      CAMPAIGN_COVER_MIN_ZOOM,
      CAMPAIGN_COVER_MAX_ZOOM
    ),
  };
}

function applyCampaignCoverPreviewSettings(panel, settings = DEFAULT_CAMPAIGN_COVER_SETTINGS) {
  if (!panel) return;

  const preview = panel.querySelector("[data-campaign-cover-preview]");

  if (!preview) return;

  preview.style.setProperty("--campaign-cover-preview-x", `${settings.x}%`);
  preview.style.setProperty("--campaign-cover-preview-y", `${settings.y}%`);
  preview.style.setProperty("--campaign-cover-preview-zoom", settings.zoom);
}

function setCampaignCoverPanelControlValues(panel, settings = DEFAULT_CAMPAIGN_COVER_SETTINGS) {
  if (!panel) return;

  const xInput = panel.querySelector("[data-campaign-cover-x]");
  const yInput = panel.querySelector("[data-campaign-cover-y]");
  const zoomInput = panel.querySelector("[data-campaign-cover-zoom]");

  if (xInput) xInput.value = settings.x;
  if (yInput) yInput.value = settings.y;
  if (zoomInput) zoomInput.value = settings.zoom;

  applyCampaignCoverPreviewSettings(panel, settings);
}

function setupCampaignCoverAdjustments(campaign, panel) {
  if (!campaign || !panel) return;

  const controls = panel.querySelectorAll("[data-campaign-cover-x], [data-campaign-cover-y], [data-campaign-cover-zoom]");
  const resetButton = panel.querySelector("[data-reset-campaign-cover-adjust]");
  let saveAdjustTimer = null;

  const scheduleSave = () => {
    window.clearTimeout(saveAdjustTimer);
    saveAdjustTimer = window.setTimeout(async () => {
      const coverUrl = getCampaignCoverUrl(campaign);
      if (!coverUrl) return;

      await saveCampaignCoverSettings(campaign, getCampaignCoverPanelSettings(panel), panel, false);
    }, CAMPAIGN_COVER_ADJUST_SAVE_DELAY);
  };

  controls.forEach((control) => {
    control.addEventListener("input", () => {
      const settings = getCampaignCoverPanelSettings(panel);
      applyCampaignCoverPreviewSettings(panel, settings);
      scheduleSave();
    });

    control.addEventListener("change", async () => {
      window.clearTimeout(saveAdjustTimer);
      const coverUrl = getCampaignCoverUrl(campaign);
      if (!coverUrl) return;

      await saveCampaignCoverSettings(campaign, getCampaignCoverPanelSettings(panel), panel, false);
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", async () => {
      window.clearTimeout(saveAdjustTimer);
      setCampaignCoverPanelControlValues(panel, DEFAULT_CAMPAIGN_COVER_SETTINGS);

      const coverUrl = getCampaignCoverUrl(campaign);
      if (!coverUrl) return;

      await saveCampaignCoverSettings(campaign, DEFAULT_CAMPAIGN_COVER_SETTINGS, panel, false);
    });
  }
}

async function uploadCampaignCoverFromFile(file, campaign, panel) {
  if (!file.type || !file.type.startsWith("image/")) {
    alert("Escolha um arquivo de imagem.");
    return;
  }

  if (file.size > CAMPAIGN_COVER_MAX_SIZE) {
    alert("A imagem da campanha precisa ter no máximo 2.5MB.");
    return;
  }

  const uploadButton = panel ? panel.querySelector(".campaign-cover-upload-btn") : null;
  const oldText = uploadButton ? uploadButton.textContent : "";

  if (uploadButton) {
    uploadButton.textContent = "Abrindo editor...";
    uploadButton.classList.add("is-loading");
  }

  try {
    const editedFile = await openCampaignLabImageCropper(file, {
      title: "Editar imagem da campanha",
      helperText: "Arraste a imagem e use o zoom para enquadrar a capa do card.",
      cropWidth: 560,
      cropHeight: 330,
      outputWidth: 1400,
      outputHeight: 825,
      mask: "rectangle",
      buttonText: "Usar imagem",
      fileNameSuffix: "capa-campanha",
    });

    if (!editedFile) return;

    if (uploadButton) uploadButton.textContent = "Salvando...";

    const imageUrl = await resizeCampaignCoverImage(editedFile);
    await saveCampaignCoverUrl(campaign, imageUrl, panel, DEFAULT_CAMPAIGN_COVER_SETTINGS);
  } catch (error) {
    console.error("Erro ao preparar imagem da campanha:", error);
    alert("Erro ao carregar a imagem da campanha.");
  } finally {
    if (uploadButton) {
      uploadButton.textContent = oldText || "Escolher imagem";
      uploadButton.classList.remove("is-loading");
    }
  }
}

function resizeCampaignCoverImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.onload = () => {
      const image = new Image();

      image.onerror = () => reject(new Error("Não foi possível carregar a imagem."));
      image.onload = () => {
        const scale = Math.min(CAMPAIGN_COVER_MAX_WIDTH / image.width, 1);
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", CAMPAIGN_COVER_JPEG_QUALITY));
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

async function saveCampaignCoverUrl(campaign, coverUrl, panel = null, settings = null) {
  const user = getLoggedUserFromSession();

  if (!campaign || !user) return;

  const finalSettings = coverUrl ? getCampaignCoverSettings(settings || campaign) : DEFAULT_CAMPAIGN_COVER_SETTINGS;

  const { error } = await DB
    .from("campaigns")
    .update({
      cover_url: coverUrl || null,
      cover_position_x: finalSettings.x,
      cover_position_y: finalSettings.y,
      cover_zoom: finalSettings.zoom,
    })
    .eq("id", campaign.id)
    .eq("master_id", user.id);

  if (error) {
    console.error("Erro ao salvar imagem da campanha:", error);
    alert("Erro ao salvar imagem da campanha. Rode o SQL de atualização no Supabase e tente novamente.");
    return;
  }

  campaignsCache = [];

  campaign.coverUrl = coverUrl;
  campaign.cover_url = coverUrl;
  campaign.coverPositionX = finalSettings.x;
  campaign.cover_position_x = finalSettings.x;
  campaign.coverPositionY = finalSettings.y;
  campaign.cover_position_y = finalSettings.y;
  campaign.coverZoom = finalSettings.zoom;
  campaign.cover_zoom = finalSettings.zoom;

  const updatedCampaign = { ...campaign };

  if (panel) updateCampaignCoverPanelPreview(panel, updatedCampaign);
}

async function saveCampaignCoverSettings(campaign, settings, panel = null, showError = true) {
  const user = getLoggedUserFromSession();

  if (!campaign || !user) return;

  const finalSettings = getCampaignCoverSettings(settings);

  const { error } = await DB
    .from("campaigns")
    .update({
      cover_position_x: finalSettings.x,
      cover_position_y: finalSettings.y,
      cover_zoom: finalSettings.zoom,
    })
    .eq("id", campaign.id)
    .eq("master_id", user.id);

  if (error) {
    console.error("Erro ao salvar ajuste da imagem da campanha:", error);
    if (showError) alert("Erro ao salvar ajuste da imagem. Rode o SQL de atualização no Supabase e tente novamente.");
    return;
  }

  campaignsCache = [];

  campaign.coverPositionX = finalSettings.x;
  campaign.cover_position_x = finalSettings.x;
  campaign.coverPositionY = finalSettings.y;
  campaign.cover_position_y = finalSettings.y;
  campaign.coverZoom = finalSettings.zoom;
  campaign.cover_zoom = finalSettings.zoom;

  if (panel) applyCampaignCoverPreviewSettings(panel, finalSettings);
}

function updateCampaignCoverPanelPreview(panel, campaign) {
  if (!panel) return;

  const coverUrl = getCampaignCoverUrl(campaign);
  const settings = getCampaignCoverSettings(campaign);
  const preview = panel.querySelector("[data-campaign-cover-preview]");
  const removeButton = panel.querySelector("[data-remove-campaign-cover]");
  const adjustments = panel.querySelector("[data-campaign-cover-adjustments]");

  panel.classList.toggle("campaign-cover-panel--has-image", Boolean(coverUrl));

  if (preview) {
    applyCampaignCoverPreviewSettings(panel, settings);
    preview.innerHTML = coverUrl
      ? `<img src="${escapeHtml(coverUrl)}" alt="Imagem da campanha ${escapeHtml(campaign.nome || campaign.name || "")}" loading="lazy" />`
      : `<span>Imagem da campanha</span>`;
  }

  if (removeButton) {
    removeButton.disabled = !coverUrl;
  }

  if (adjustments) {
    adjustments.classList.toggle("is-disabled", !coverUrl);
  }

  setCampaignCoverPanelControlValues(panel, settings);
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


async function getMasterCampaignCount(userId) {
  if (!userId) return 0;

  const campaigns = await getAllCampaigns(true);
  return campaigns.filter((campaign) => campaign.mestreId === userId).length;
}

function hasReachedMasterCampaignLimit(count) {
  return Number(count || 0) >= MAX_MASTER_CAMPAIGNS;
}

function getRemainingMasterCampaignSlots(count) {
  return Math.max(MAX_MASTER_CAMPAIGNS - Number(count || 0), 0);
}

function renderMasterCampaignLimitNotice(masterCount) {
  const masterCampaignsContainer = document.getElementById("masterCampaigns");
  if (!masterCampaignsContainer) return;

  const parent = masterCampaignsContainer.parentElement || masterCampaignsContainer;
  let notice = document.getElementById("masterCampaignLimitNotice");

  if (!notice) {
    notice = document.createElement("div");
    notice.id = "masterCampaignLimitNotice";
    notice.className = "campaign-limit-notice";
    parent.insertBefore(notice, masterCampaignsContainer);
  }

  const remaining = getRemainingMasterCampaignSlots(masterCount);
  const reachedLimit = hasReachedMasterCampaignLimit(masterCount);

  notice.classList.toggle("campaign-limit-notice--full", reachedLimit);
  notice.innerHTML = reachedLimit
    ? `
      <strong>Limite de campanhas atingido</strong>
      <span>Você já criou ${MAX_MASTER_CAMPAIGNS} campanhas como mestre. Exclua uma campanha para criar outra.</span>
    `
    : `
      <strong>${masterCount}/${MAX_MASTER_CAMPAIGNS} campanhas como mestre</strong>
      <span>Você ainda pode criar ${remaining} ${remaining === 1 ? "campanha" : "campanhas"} como mestre.</span>
    `;
}

function getCreateCampaignButtons() {
  return Array.from(
    document.querySelectorAll(
      `a[href*="criar-campanha"],
       a[href*="nova-campanha"],
       button[data-create-campaign],
       a[data-create-campaign],
       .create-campaign-button,
       .new-campaign-button`
    )
  );
}

function updateCreateCampaignButtonsByLimit(masterCount) {
  const reachedLimit = hasReachedMasterCampaignLimit(masterCount);

  getCreateCampaignButtons().forEach((button) => {
    if (!button.dataset.originalTitle) {
      button.dataset.originalTitle = button.getAttribute("title") || "Criar campanha";
    }

    button.classList.toggle("campaign-create-disabled", reachedLimit);
    button.setAttribute("aria-disabled", reachedLimit ? "true" : "false");
    button.title = reachedLimit
      ? `Limite de ${MAX_MASTER_CAMPAIGNS} campanhas como mestre atingido.`
      : button.dataset.originalTitle;
  });
}

function setupCreateCampaignLimitNavigationGuard() {
  if (window.createCampaignLimitNavigationGuardReady) return;

  window.createCampaignLimitNavigationGuardReady = true;

  document.addEventListener("click", async (event) => {
    const createButton = event.target.closest(
      `a[href*="criar-campanha"],
       a[href*="nova-campanha"],
       button[data-create-campaign],
       a[data-create-campaign],
       .create-campaign-button,
       .new-campaign-button`
    );

    if (!createButton) return;

    const user = getLoggedUserFromSession();
    if (!user) return;

    const masterCount = await getMasterCampaignCount(user.id);

    if (!hasReachedMasterCampaignLimit(masterCount)) return;

    event.preventDefault();
    event.stopPropagation();
    alert(`Você já criou ${MAX_MASTER_CAMPAIGNS} campanhas como mestre. Exclua uma campanha para criar outra.`);
  }, true);
}

function renderCreateCampaignPageLimitNotice(form, masterCount) {
  if (!form) return;

  let notice = document.getElementById("createCampaignLimitNotice");

  if (!notice) {
    notice = document.createElement("div");
    notice.id = "createCampaignLimitNotice";
    notice.className = "campaign-limit-notice create-campaign-limit-notice";
    form.insertAdjacentElement("beforebegin", notice);
  }

  const remaining = getRemainingMasterCampaignSlots(masterCount);
  const reachedLimit = hasReachedMasterCampaignLimit(masterCount);

  notice.classList.toggle("campaign-limit-notice--full", reachedLimit);
  notice.innerHTML = reachedLimit
    ? `
      <strong>Limite de campanhas atingido</strong>
      <span>Você já criou ${MAX_MASTER_CAMPAIGNS} campanhas como mestre. Volte em Minhas Campanhas e exclua uma campanha para criar outra.</span>
    `
    : `
      <strong>${masterCount}/${MAX_MASTER_CAMPAIGNS} campanhas como mestre</strong>
      <span>Você ainda pode criar ${remaining} ${remaining === 1 ? "campanha" : "campanhas"} como mestre.</span>
    `;
}

function setCreateCampaignFormLocked(form, locked) {
  if (!form) return;

  form.classList.toggle("campaign-create-form-locked", locked);

  form.querySelectorAll("input, select, textarea, button").forEach((field) => {
    field.disabled = locked;
  });
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
  setText("masterCount", `${campaignsAsMaster.length}/${MAX_MASTER_CAMPAIGNS}`);
  setText("playerCount", campaignsAsPlayer.length);

  await renderProfileAvatarPanel(user);

  renderCampaigns(document.getElementById("masterCampaigns"), campaignsAsMaster);
  renderCampaigns(document.getElementById("playerCampaigns"), campaignsAsPlayer);
  renderMasterCampaignLimitNotice(campaignsAsMaster.length);
  updateCreateCampaignButtonsByLimit(campaignsAsMaster.length);
  setupCreateCampaignLimitNavigationGuard();

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

      const coverStyle = getCampaignCoverStyleAttribute(campaign);
      const coverClass = getCampaignCoverClass(campaign);

      return `
        <div class="premium-campaign-card campaign-card-wrapper${coverClass}"${coverStyle}>
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

  const masterCampaignCount = await getMasterCampaignCount(user.id);
  const masterCampaignLimitReached = hasReachedMasterCampaignLimit(masterCampaignCount);

  renderCreateCampaignPageLimitNotice(createCampaignForm, masterCampaignCount);
  setCreateCampaignFormLocked(createCampaignForm, masterCampaignLimitReached);

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

    const currentMasterCampaignCount = await getMasterCampaignCount(user.id);

    if (hasReachedMasterCampaignLimit(currentMasterCampaignCount)) {
      renderCreateCampaignPageLimitNotice(createCampaignForm, currentMasterCampaignCount);
      setCreateCampaignFormLocked(createCampaignForm, true);
      alert(`Você já criou ${MAX_MASTER_CAMPAIGNS} campanhas como mestre. Exclua uma campanha para criar outra.`);
      return;
    }

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
   CHAT DA MESA - JOGADORES
========================================================= */

async function setupPlayerCampaignChat(system = "") {
  const campaignId = getCurrentCampaignId();
  const user = getLoggedUserFromSession();

  if (!campaignId || !user || !DB) return;

  ensurePlayerCampaignChatTab(system);
  setupPlayerCampaignChatNotifications();
  setupPlayerCampaignChatForm(system);
  await renderPlayerCampaignChatRecipientOptions();
  await renderPlayerCampaignChat(system);
  subscribePlayerCampaignChatRealtime(system);
}

async function setupMasterCampaignChat(system = "") {
  const campaignId = getCurrentCampaignId();
  const user = getLoggedUserFromSession();

  if (!campaignId || !user || !DB) return;

  ensureMasterCampaignChatTab(system);
  setupPlayerCampaignChatNotifications();
  setupPlayerCampaignChatForm(system);
  await renderPlayerCampaignChatRecipientOptions();
  await renderPlayerCampaignChat(system);
  subscribePlayerCampaignChatRealtime(system);
}

function ensureMasterCampaignChatTab(system = "") {
  if (document.getElementById("masterMessagesSection")) return;

  const tabs = ensureMasterCampaignTabsContainer();
  const target = findMasterCampaignTabInsertionTarget();

  if (!tabs || !target) return;

  const chatButton = document.createElement("button");
  chatButton.className = "altherium-tab";
  chatButton.type = "button";
  chatButton.dataset.tab = "masterMessagesSection";
  chatButton.textContent = "Mensagens";
  tabs.appendChild(chatButton);

  const chatSection = document.createElement("section");
  chatSection.id = "masterMessagesSection";
  chatSection.className = "altherium-section master-messages-section player-messages-section";
  chatSection.innerHTML = buildPlayerCampaignChatMarkup(system);

  target.insertAdjacentElement("afterend", chatSection);
}

function ensureMasterCampaignTabsContainer() {
  let tabs = document.querySelector(".altherium-tabs:not(.player-campaign-tabs)");

  if (tabs) return tabs;

  tabs = document.querySelector(".altherium-tabs");

  if (tabs) return tabs;

  const main = document.querySelector(".altherium-main, main");
  const firstSection = main
    ? main.querySelector(":scope > .altherium-section, :scope > section")
    : document.querySelector(".altherium-section, section");

  if (!main) return null;

  tabs = document.createElement("div");
  tabs.className = "altherium-tabs master-campaign-tabs campaign-chat-auto-tabs";

  if (firstSection && firstSection.parentElement === main) {
    firstSection.insertAdjacentElement("beforebegin", tabs);
  } else {
    main.appendChild(tabs);
  }

  return tabs;
}

function findMasterCampaignTabInsertionTarget() {
  const main = document.querySelector(".altherium-main, main");

  if (main) {
    const sections = main.querySelectorAll(":scope > .altherium-section, :scope > section");

    if (sections.length) return sections[sections.length - 1];
  }

  const sections = document.querySelectorAll(".altherium-section");

  if (sections.length) return sections[sections.length - 1];

  return main || document.querySelector("main") || document.body;
}

function isMasterCampaignChatPage() {
  return (
    document.body.classList.contains("altherium-page") ||
    document.body.classList.contains("dnd-master-page")
  );
}

function ensurePlayerCampaignChatTab(system = "") {
  if (document.getElementById("playerMessagesSection")) return;

  const tabs = ensurePlayerCampaignTabsContainer();
  const target = findPlayerCampaignTabInsertionTarget();

  if (!tabs || !target) return;

  const chatButton = document.createElement("button");
  chatButton.className = "altherium-tab";
  chatButton.type = "button";
  chatButton.dataset.tab = "playerMessagesSection";
  chatButton.textContent = "Mensagens";
  tabs.appendChild(chatButton);

  const chatSection = document.createElement("section");
  chatSection.id = "playerMessagesSection";
  chatSection.className = "altherium-section player-campaign-tab-panel player-messages-section";
  chatSection.innerHTML = buildPlayerCampaignChatMarkup(system);

  target.insertAdjacentElement("afterend", chatSection);
}

function ensurePlayerCampaignTabsContainer() {
  let tabs = document.querySelector(".player-campaign-tabs");

  if (tabs) return tabs;

  const main = document.querySelector(".altherium-main, main");
  const firstSection = document.querySelector(".altherium-section, section");

  if (!main) return null;

  tabs = document.createElement("div");
  tabs.className = "altherium-tabs player-campaign-tabs campaign-chat-auto-tabs";

  if (firstSection && firstSection.parentElement === main) {
    firstSection.insertAdjacentElement("beforebegin", tabs);
  } else {
    main.appendChild(tabs);
  }

  return tabs;
}

function findPlayerCampaignTabInsertionTarget() {
  const panels = document.querySelectorAll(".player-campaign-tab-panel");

  if (panels.length) return panels[panels.length - 1];

  return document.querySelector(".altherium-section:last-of-type, main > section:last-of-type, main");
}

function buildPlayerCampaignChatMarkup(system = "") {
  const systemName = system || sessionStorage.getItem("system") || "Sistema";
  const isMasterPage = isMasterCampaignChatPage();
  const description = isMasterPage
    ? "Converse com os jogadores desta campanha em tempo real."
    : "Converse com os outros jogadores desta campanha em tempo real.";

  return `
    <div class="altherium-panel player-chat-panel">
      <div class="altherium-panel-header player-chat-header">
        <div>
          <span class="panel-kicker">Chat da mesa</span>
          <h2>Mensagens</h2>
          <p>${escapeHtml(description)}</p>
        </div>
        <span class="player-chat-system-pill">${escapeHtml(systemName)}</span>
      </div>

      <div class="player-chat-shell">
        <div class="player-chat-messages" id="playerCampaignChatMessages" aria-live="polite">
          <div class="player-chat-empty">
            <h3>Carregando mensagens</h3>
            <p>Aguarde um instante.</p>
          </div>
        </div>

        <form class="player-chat-form" id="playerCampaignChatForm" autocomplete="off">
          <div class="player-chat-recipient-row">
            <label for="playerCampaignChatRecipient">Enviar para</label>
            <select id="playerCampaignChatRecipient">
              <option value="">Mesa inteira</option>
            </select>
          </div>

          ${buildPlayerCampaignChatToolsMarkup()}

          <div class="player-chat-compose-row">
            <textarea
              id="playerCampaignChatInput"
              maxlength="800"
              rows="2"
              placeholder="Digite sua mensagem para a mesa..."
            ></textarea>
            <button class="altherium-btn" type="submit" id="playerCampaignChatSendBtn">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function buildPlayerCampaignChatToolsMarkup() {
  return `
    <div class="player-chat-tools player-chat-tools--emoji-only">
      <button class="player-chat-tool-btn" type="button" data-player-chat-tool="emoji" aria-expanded="false">
        <span>😊</span>
        Emojis
      </button>
    </div>

    <div class="player-chat-picker" id="playerCampaignEmojiPicker" data-player-chat-picker="emoji" hidden>
      <div class="player-chat-picker-title">Escolha um emoji</div>
      <div class="player-chat-emoji-grid">
        ${PLAYER_CHAT_EMOJI_OPTIONS.map((emoji) => `
          <button class="player-chat-emoji-btn" type="button" data-player-chat-emoji="${escapeHtml(emoji)}">${escapeHtml(emoji)}</button>
        `).join("")}
      </div>
    </div>
  `;
}

async function renderPlayerCampaignChatRecipientOptions() {
  const select = document.getElementById("playerCampaignChatRecipient");
  const user = getLoggedUserFromSession();

  if (!select || !user) return;

  const currentValue = select.value;
  const participants = await getPlayerCampaignChatParticipants();
  const otherParticipants = participants.filter((participant) => String(participant.id) !== String(user.id));

  select.innerHTML = `
    <option value="">Mesa inteira</option>
    ${otherParticipants
      .map(
        (participant) => `
          <option value="${escapeHtml(participant.id)}" data-user-name="${escapeHtml(participant.name)}">
            ${escapeHtml(participant.label)}
          </option>
        `
      )
      .join("")}
  `;

  if (currentValue && otherParticipants.some((participant) => String(participant.id) === String(currentValue))) {
    select.value = currentValue;
  }
}

async function getPlayerCampaignChatParticipants() {
  const campaign = await getCurrentCampaign();
  const profiles = await getProfiles();
  const user = getLoggedUserFromSession();

  if (!campaign) {
    return user ? [{ id: String(user.id), name: user.name || user.nome || user.id, label: user.name || user.nome || user.id, role: "Jogador" }] : [];
  }

  const ids = [];

  if (campaign.mestreId) ids.push(String(campaign.mestreId));
  getCampaignPlayerIds(campaign).forEach((playerId) => ids.push(String(playerId)));

  if (user && !ids.includes(String(user.id))) ids.push(String(user.id));

  return Array.from(new Set(ids))
    .map((id) => {
      const profile = profiles.find((item) => String(item.id) === String(id));
      const isMaster = String(campaign.mestreId) === String(id);
      const name = profile?.name || (user && String(user.id) === String(id) ? user.name || user.nome : id);

      return {
        id,
        name,
        label: isMaster ? `${name} (Mestre)` : name,
        role: isMaster ? "Mestre" : "Jogador",
      };
    })
    .sort((a, b) => {
      if (a.role !== b.role) return a.role === "Mestre" ? -1 : 1;
      return a.name.localeCompare(b.name, "pt-BR");
    });
}

function getPlayerCampaignChatSelectedRecipient() {
  const select = document.getElementById("playerCampaignChatRecipient");

  if (!select || !select.value) return null;

  const option = select.selectedOptions && select.selectedOptions[0];
  const name = option?.dataset?.userName || option?.textContent?.trim() || select.value;

  return {
    id: String(select.value),
    name,
  };
}

async function getPlayerCampaignChatCurrentUserName() {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign();

  if (!user) return "Jogador";

  const baseUserName = user.nome || user.name || user.id;
  const isMaster =
    (campaign && String(campaign.mestreId) === String(user.id)) || isMasterCampaignChatPage();

  return isMaster ? `${baseUserName} (Mestre)` : baseUserName;
}

function setupPlayerCampaignChatForm(system = "") {
  const form = document.getElementById("playerCampaignChatForm");
  const input = document.getElementById("playerCampaignChatInput");

  if (!form || !input || form.dataset.chatReady === "true") return;

  form.dataset.chatReady = "true";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await sendPlayerCampaignChatMessage(system);
  });

  input.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();
    await sendPlayerCampaignChatMessage(system);
  });

  setupPlayerCampaignChatTools(form, input, system);

  const recipientSelect = document.getElementById("playerCampaignChatRecipient");

  if (recipientSelect) {
    recipientSelect.addEventListener("change", () => {
      const recipient = getPlayerCampaignChatSelectedRecipient();
      input.placeholder = recipient
        ? `Mensagem privada para ${recipient.name}...`
        : "Digite sua mensagem para a mesa...";
    });
  }
}

function setupPlayerCampaignChatTools(form, input, system = "") {
  if (!form || !input) return;

  form.querySelectorAll("[data-player-chat-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      const tool = button.dataset.playerChatTool;
      togglePlayerCampaignChatPicker(form, tool);
    });
  });

  form.querySelectorAll("[data-player-chat-emoji]").forEach((button) => {
    button.addEventListener("click", () => {
      insertPlayerCampaignChatTextAtCursor(input, button.dataset.playerChatEmoji || button.textContent || "");
      input.focus();
    });
  });
}

function togglePlayerCampaignChatPicker(form, selectedTool = "") {
  if (!form) return;

  form.querySelectorAll("[data-player-chat-picker]").forEach((picker) => {
    const shouldOpen = picker.dataset.playerChatPicker === selectedTool && picker.hidden;
    picker.hidden = !shouldOpen;
  });

  form.querySelectorAll("[data-player-chat-tool]").forEach((button) => {
    const isOpen = !form.querySelector(`[data-player-chat-picker="${button.dataset.playerChatTool}"]`)?.hidden;
    button.classList.toggle("active", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function insertPlayerCampaignChatTextAtCursor(input, text = "") {
  if (!input || !text) return;

  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const before = input.value.slice(0, start);
  const after = input.value.slice(end);
  const spacerBefore = before && !/\s$/.test(before) ? " " : "";
  const spacerAfter = after && !/^\s/.test(after) ? " " : "";
  const insertText = `${spacerBefore}${text}${spacerAfter}`;

  input.value = `${before}${insertText}${after}`;
  const cursor = start + insertText.length;
  input.setSelectionRange(cursor, cursor);
}

function getPlayerCampaignChatStickerToken(stickerId = "") {
  return `[[campaign-sticker:${String(stickerId).trim()}]]`;
}

function getPlayerCampaignChatStickerById(stickerId = "") {
  return PLAYER_CHAT_STICKER_OPTIONS.find((sticker) => sticker.id === String(stickerId).trim()) || null;
}

function getPlayerCampaignChatStickerFromMessage(message = "") {
  const match = String(message || "").trim().match(/^\[\[campaign-sticker:([a-z0-9-]+)\]\]$/i);

  if (!match) return null;

  return getPlayerCampaignChatStickerById(match[1]);
}

async function sendPlayerCampaignChatMessage(system = "") {
  const campaignId = getCurrentCampaignId();
  const user = getLoggedUserFromSession();
  const input = document.getElementById("playerCampaignChatInput");
  const sendButton = document.getElementById("playerCampaignChatSendBtn");

  if (!campaignId || !user || !input || !DB) return;

  const message = input.value.trim();

  if (!message) return;

  input.disabled = true;
  if (sendButton) sendButton.disabled = true;

  const recipient = getPlayerCampaignChatSelectedRecipient();
  const row = {
    campaign_id: String(campaignId),
    system: system || sessionStorage.getItem("system") || "",
    user_id: String(user.id),
    user_name: await getPlayerCampaignChatCurrentUserName(),
    message,
    message_scope: recipient ? "private" : "public",
    recipient_user_id: recipient ? recipient.id : null,
    recipient_user_name: recipient ? recipient.name : null,
  };

  const { error } = await DB.from("campaign_messages").insert(row);

  input.disabled = false;
  if (sendButton) sendButton.disabled = false;
  input.focus();

  if (error) {
    console.error("Erro ao enviar mensagem:", error);
    showPlayerCampaignChatError(
      "Não consegui enviar. Rode o SQL atualizado do chat no Supabase para ativar mensagens privadas."
    );
    return;
  }

  input.value = "";

  const form = document.getElementById("playerCampaignChatForm");
  if (form) togglePlayerCampaignChatPicker(form, "");

  await renderPlayerCampaignChat(system, { forceScroll: true });
}

async function renderPlayerCampaignChat(system = "", options = {}) {
  const messagesBox = document.getElementById("playerCampaignChatMessages");
  const campaignId = getCurrentCampaignId();

  if (!messagesBox || !campaignId || !DB) return;

  const { data, error } = await DB
    .from("campaign_messages")
    .select("id, campaign_id, system, user_id, user_name, message, message_scope, recipient_user_id, recipient_user_name, created_at")
    .eq("campaign_id", String(campaignId))
    .order("created_at", { ascending: true })
    .limit(120);

  if (error) {
    console.error("Erro ao carregar mensagens:", error);
    messagesBox.innerHTML = `
      <div class="player-chat-empty player-chat-empty--error">
        <h3>Chat ainda não configurado</h3>
        <p>Rode o SQL atualizado da tabela <strong>campaign_messages</strong> no Supabase para ativar mensagens públicas e privadas.</p>
      </div>
    `;
    return;
  }

  await getProfiles();

  const visibleMessages = (data || []).filter(isPlayerCampaignChatMessageVisible);

  if (!visibleMessages.length) {
    messagesBox.innerHTML = `
      <div class="player-chat-empty">
        <h3>Nenhuma mensagem ainda</h3>
        <p>Envie a primeira mensagem da mesa ou uma mensagem privada para alguém.</p>
      </div>
    `;
    return;
  }

  messagesBox.innerHTML = visibleMessages.map(renderPlayerCampaignChatMessage).join("");

  if (options.forceScroll || isPlayerCampaignChatNearBottom(messagesBox)) {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
}

function renderPlayerCampaignChatMessage(row = {}) {
  const user = getLoggedUserFromSession();
  const isMine = user && String(row.user_id) === String(user.id);
  const isPrivate = isPlayerCampaignChatMessagePrivate(row);
  const date = row.created_at ? new Date(row.created_at) : null;
  const time = date
    ? date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const privateLabel = isPrivate ? getPlayerCampaignChatPrivateLabel(row, isMine) : "";

  return `
    <article class="player-chat-message ${isMine ? "mine" : ""} ${isPrivate ? "private" : ""}">
      ${renderPlayerCampaignChatAvatar(row)}
      <div class="player-chat-message-bubble">
        <div class="player-chat-message-meta">
          <strong>${escapeHtml(row.user_name || "Jogador")}</strong>
          <span>${escapeHtml(time)}</span>
        </div>
        ${privateLabel}
        <p>${formatPlayerCampaignChatText(row.message || "")}</p>
      </div>
    </article>
  `;
}

function isPlayerCampaignChatMessagePrivate(row = {}) {
  return row.message_scope === "private" || Boolean(row.recipient_user_id);
}

function isPlayerCampaignChatMessageVisible(row = {}) {
  const user = getLoggedUserFromSession();

  if (!isPlayerCampaignChatMessagePrivate(row)) return true;
  if (!user) return false;

  return (
    String(row.user_id) === String(user.id) ||
    String(row.recipient_user_id) === String(user.id)
  );
}

function getPlayerCampaignChatPrivateLabel(row = {}, isMine = false) {
  const user = getLoggedUserFromSession();
  const recipientName = row.recipient_user_name || "jogador";

  if (isMine) {
    return `<span class="player-chat-private-label">Privado para ${escapeHtml(recipientName)}</span>`;
  }

  if (user && String(row.recipient_user_id) === String(user.id)) {
    return `<span class="player-chat-private-label">Privado para você</span>`;
  }

  return `<span class="player-chat-private-label">Privado</span>`;
}


function formatPlayerCampaignChatText(value = "") {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function renderPlayerCampaignChatAvatar(row = {}) {
  const profile = profilesCache.find((item) => String(item.id) === String(row.user_id));
  const name = profile?.name || row.user_name || "Jogador";
  const avatarUrl = profile?.avatar_url || profile?.avatarUrl || row.user_avatar_url || "";

  if (avatarUrl) {
    return `
      <div class="player-chat-message-avatar player-chat-message-avatar--photo" title="${escapeHtml(name)}">
        <img src="${escapeHtml(avatarUrl)}" alt="Foto de perfil de ${escapeHtml(name)}" loading="lazy" />
      </div>
    `;
  }

  return `<div class="player-chat-message-avatar" title="${escapeHtml(name)}">${escapeHtml(getPlayerCampaignChatInitials(name))}</div>`;
}

function getPlayerCampaignChatInitials(name = "") {
  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return "J";

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function isPlayerCampaignChatNearBottom(element) {
  if (!element) return true;

  return element.scrollHeight - element.scrollTop - element.clientHeight < 90;
}

function showPlayerCampaignChatError(message) {
  const messagesBox = document.getElementById("playerCampaignChatMessages");

  if (!messagesBox) return;

  messagesBox.insertAdjacentHTML(
    "beforeend",
    `
      <div class="player-chat-local-error">
        ${escapeHtml(message)}
      </div>
    `
  );

  messagesBox.scrollTop = messagesBox.scrollHeight;
}


function setupPlayerCampaignChatNotifications() {
  if (campaignChatNotificationReady) return;

  campaignChatNotificationReady = true;

  document.addEventListener(
    "click",
    () => {
      unlockPlayerCampaignChatNotificationSound();
    },
    { once: true }
  );

  document.addEventListener(
    "keydown",
    () => {
      unlockPlayerCampaignChatNotificationSound();
    },
    { once: true }
  );
}

function shouldNotifyPlayerCampaignChatMessage(row = null) {
  const user = getLoggedUserFromSession();

  if (!row || !user) return false;
  if (String(row.user_id) === String(user.id)) return false;
  if (!isPlayerCampaignChatMessageVisible(row)) return false;

  return true;
}

function unlockPlayerCampaignChatNotificationSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    if (!campaignChatAudioContext) {
      campaignChatAudioContext = new AudioContext();
    }

    if (campaignChatAudioContext.state === "suspended") {
      campaignChatAudioContext.resume().catch(() => {});
    }
  } catch (error) {
    // O navegador pode bloquear áudio automático até o primeiro clique do usuário.
  }
}

function playPlayerCampaignChatNotificationSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    if (!campaignChatAudioContext) {
      campaignChatAudioContext = new AudioContext();
    }

    const context = campaignChatAudioContext;

    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    const now = context.currentTime;
    const masterGain = context.createGain();

    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.16, now + 0.015);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    masterGain.connect(context.destination);

    createPlayerCampaignChatNotificationTone(context, masterGain, 740, now, 0.13);
    createPlayerCampaignChatNotificationTone(context, masterGain, 980, now + 0.15, 0.17);
  } catch (error) {
    console.warn("Som de notificação do chat bloqueado pelo navegador.", error);
  }
}

function createPlayerCampaignChatNotificationTone(context, destination, frequency, startTime, duration) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.9, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

function ensurePlayerCampaignChatNotificationContainer() {
  let container = document.getElementById("playerCampaignChatNotificationStack");

  if (container) return container;

  container = document.createElement("div");
  container.id = "playerCampaignChatNotificationStack";
  container.className = "player-chat-notification-stack";
  container.setAttribute("aria-live", "polite");
  container.setAttribute("aria-atomic", "false");

  document.body.appendChild(container);

  return container;
}

function showPlayerCampaignChatNotification(row = {}) {
  const container = ensurePlayerCampaignChatNotificationContainer();
  const notification = document.createElement("button");
  const isPrivate = isPlayerCampaignChatMessagePrivate(row);
  const senderName = row.user_name || "Jogador";
  const messagePreview = getPlayerCampaignChatNotificationPreview(row.message || "");

  notification.type = "button";
  notification.className = `player-chat-notification ${isPrivate ? "private" : ""}`;
  notification.innerHTML = `
    ${renderPlayerCampaignChatAvatar(row)}
    <span class="player-chat-notification-content">
      <strong>${escapeHtml(senderName)}</strong>
      <small>${isPrivate ? "Mensagem privada" : "Mensagem da mesa"}</small>
      <em>${escapeHtml(messagePreview)}</em>
    </span>
  `;

  notification.addEventListener("click", () => {
    openPlayerCampaignChatTab();
    notification.remove();
  });

  container.prepend(notification);

  while (container.children.length > 4) {
    container.lastElementChild?.remove();
  }

  window.setTimeout(() => {
    notification.classList.add("leaving");
    window.setTimeout(() => notification.remove(), 260);
  }, 5600);
}

function getPlayerCampaignChatNotificationPreview(message = "") {
  const preview = String(message || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!preview) return "Nova mensagem";

  return preview.length > 72 ? `${preview.slice(0, 72)}...` : preview;
}

function openPlayerCampaignChatTab() {
  const section = document.getElementById("playerMessagesSection") || document.getElementById("masterMessagesSection");

  if (!section) return;

  const tab = document.querySelector(`.altherium-tab[data-tab="${section.id}"]`);

  if (tab) {
    tab.click();
  } else {
    document
      .querySelectorAll(".altherium-section, .player-campaign-tab-panel")
      .forEach((item) => item.classList.remove("active"));
    section.classList.add("active");
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });

  const messagesBox = document.getElementById("playerCampaignChatMessages");
  if (messagesBox) messagesBox.scrollTop = messagesBox.scrollHeight;
}

function subscribePlayerCampaignChatRealtime(system = "") {
  const campaignId = getCurrentCampaignId();

  if (!campaignId || !DB) return;

  if (campaignChatRealtimeChannel) DB.removeChannel(campaignChatRealtimeChannel);

  campaignChatRealtimeChannel = DB
    .channel(`campaign-messages-${campaignId}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "campaign_messages", filter: `campaign_id=eq.${campaignId}` },
      async (payload) => {
        const incomingMessage = payload?.new || null;
        const shouldNotify = shouldNotifyPlayerCampaignChatMessage(incomingMessage);

        await renderPlayerCampaignChat(system, { forceScroll: true });

        if (shouldNotify) {
          playPlayerCampaignChatNotificationSound();
          showPlayerCampaignChatNotification(incomingMessage);
        }
      }
    )
    .subscribe();
}

/* =========================================================
   ABAS
========================================================= */

function setupTabs() {
  document.addEventListener("click", (event) => {
    const tab = event.target.closest(".altherium-tab");
    if (!tab) return;

    const targetId = tab.dataset.tab;
    const selectedSection = document.getElementById(targetId);

    if (!targetId || !selectedSection) return;

    const tabsContainer = tab.closest(".altherium-tabs");
    const isPlayerTabs = tabsContainer && tabsContainer.classList.contains("player-campaign-tabs");

    if (isPlayerTabs) {
      tabsContainer
        .querySelectorAll(".altherium-tab")
        .forEach((button) => button.classList.remove("active"));

      document
        .querySelectorAll(".player-campaign-tab-panel")
        .forEach((section) => section.classList.remove("active"));

      tab.classList.add("active");
      selectedSection.classList.add("active");
      return;
    }

    document
      .querySelectorAll(".altherium-tab")
      .forEach((button) => button.classList.remove("active"));

    document
      .querySelectorAll(".altherium-section")
      .forEach((section) => section.classList.remove("active"));

    tab.classList.add("active");
    selectedSection.classList.add("active");
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
    await renderCampaignOnlinePlayersPanel();
    return;
  }

  const profiles = await getProfiles();
  const players = getCampaignPlayerIds(campaign)
    .map((playerId) => profiles.find((profile) => profile.id === playerId))
    .filter(Boolean);

  if (counter) counter.textContent = getCampaignOnlinePlayerIds(campaign).length;

  await renderCampaignOnlinePlayersPanel(campaign, profiles);

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
    .map((player) => {
      const isOnline = isCampaignUserOnline(player.id);

      return `
        <div class="altherium-card player-profile-card ${isOnline ? "player-profile-card--online" : "player-profile-card--offline"}">
          <div class="player-profile-card__header">
            ${getProfileAvatarHtml(player, "small")}
            <h3>${escapeHtml(player.name)}</h3>
          </div>

          <p>Status: ${isOnline ? "Online na mesa" : "Offline"}</p>

          <div class="altherium-actions">
            <button onclick="removePlayerFromCampaign('${campaign.id}', '${player.id}')">
              Remover
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

async function setupCampaignPresence() {
  if (!DB || typeof DB.channel !== "function") return;

  const user = getLoggedUserFromSession();
  const campaignId = getCurrentCampaignId();

  if (!user || !campaignId) return;

  if (campaignPresenceChannel) {
    try {
      DB.removeChannel(campaignPresenceChannel);
    } catch (error) {
      console.warn("Não foi possível limpar o canal de presença anterior.", error);
    }
  }

  campaignPresenceState = {};
  campaignPresenceReady = false;

  campaignPresenceChannel = DB.channel(`campaign-presence-${campaignId}`, {
    config: {
      presence: {
        key: String(user.id),
      },
    },
  });

  const refreshPresenceUi = async () => {
    if (!campaignPresenceChannel || typeof campaignPresenceChannel.presenceState !== "function") return;

    campaignPresenceReady = true;
    campaignPresenceState = campaignPresenceChannel.presenceState() || {};

    await updateCampaignOnlineCounters();
    await renderCampaignOnlinePlayersPanel();
  };

  campaignPresenceChannel
    .on("presence", { event: "sync" }, refreshPresenceUi)
    .on("presence", { event: "join" }, refreshPresenceUi)
    .on("presence", { event: "leave" }, refreshPresenceUi)
    .subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;

      await campaignPresenceChannel.track({
        user_id: String(user.id),
        name: user.nome || user.name || user.id,
        profile: sessionStorage.getItem("profile") || "",
        system: sessionStorage.getItem("system") || "",
        campaign_id: campaignId,
        online_at: new Date().toISOString(),
      });

      await refreshPresenceUi();
    });
}

async function setupOnlinePlayersInfoPanel() {
  const existingPanel = document.getElementById("campaignOnlinePanel");

  if (existingPanel) {
    await renderCampaignOnlinePlayersPanel();
    return;
  }

  const isPlayerPage =
    document.body.classList.contains("altherium-player-page") ||
    document.body.classList.contains("dnd-player-page");

  const panel = createCampaignOnlinePlayersPanel(isPlayerPage ? "player" : "master");

  if (isPlayerPage) {
    insertOnlinePlayersPanelOnPlayerPage(panel);
    await renderCampaignOnlinePlayersPanel();
    return;
  }

  const dashboard = document.querySelector(".altherium-dashboard");

  if (!dashboard) {
    insertOnlinePlayersPanelFallback(panel);
    await renderCampaignOnlinePlayersPanel();
    return;
  }

  const hero = dashboard.closest(".altherium-hero");
  if (hero) hero.classList.add("altherium-hero--with-online-panel");

  dashboard.insertAdjacentElement("afterend", panel);
  await renderCampaignOnlinePlayersPanel();
}

function createCampaignOnlinePlayersPanel(variant = "master") {
  const panel = document.createElement("aside");
  panel.className = `campaign-online-panel campaign-online-panel--${variant}`;
  panel.id = "campaignOnlinePanel";
  panel.innerHTML = `
    <div class="campaign-online-panel__header">
      <div>
        <span>${variant === "player" ? "Mesa ativa" : "Painel da mesa"}</span>
        <h3>Jogadores online</h3>
      </div>
      <strong id="campaignOnlineTotal">0</strong>
    </div>

    <div class="campaign-online-panel__list" id="campaignOnlineList">
      <div class="campaign-online-empty">
        Carregando jogadores online...
      </div>
    </div>
  `;

  return panel;
}

function insertOnlinePlayersPanelOnPlayerPage(panel) {
  const slot = document.getElementById("playerOnlinePanelSlot") || document.getElementById("campaignOnlinePanelSlot");

  if (slot) {
    slot.innerHTML = "";
    slot.appendChild(panel);
    return;
  }

  const playerForm =
    document.getElementById("playerSheetForm") ||
    document.getElementById("dndPlayerSheetForm");

  const playerSection =
    playerForm?.closest(".player-sheet-section") ||
    playerForm?.closest(".altherium-section") ||
    playerForm?.parentElement;

  const dashboard = document.querySelector(".altherium-dashboard");
  const hero = document.querySelector(".altherium-hero");
  const main = document.querySelector(".altherium-main") || document.querySelector("main") || document.body;

  panel.classList.add("campaign-online-panel--player-page");

  if (hero && dashboard && hero.contains(dashboard)) {
    hero.classList.add("altherium-hero--player-online-side");
    panel.classList.add("campaign-online-panel--player-side");
    dashboard.insertAdjacentElement("afterend", panel);
    return;
  }

  if (hero && hero.parentElement) {
    hero.classList.add("altherium-hero--player-online-panel");
    hero.insertAdjacentElement("afterend", panel);
    return;
  }

  if (playerSection && playerSection.parentElement) {
    playerSection.insertAdjacentElement("beforebegin", panel);
    return;
  }

  main.insertBefore(panel, main.firstChild);
}

function insertOnlinePlayersPanelFallback(panel) {
  const hero = document.querySelector(".altherium-hero");
  const main = document.querySelector(".altherium-main") || document.querySelector("main") || document.body;

  panel.classList.add("campaign-online-panel--fallback");

  if (hero && hero.parentElement) {
    hero.insertAdjacentElement("afterend", panel);
    return;
  }

  main.insertBefore(panel, main.firstChild);
}

async function renderCampaignOnlinePlayersPanel(campaignParam = null, profilesParam = null) {
  const panel = document.getElementById("campaignOnlinePanel");
  const list = document.getElementById("campaignOnlineList");
  const total = document.getElementById("campaignOnlineTotal");

  if (!panel || !list) return;

  const campaign = campaignParam || (await getCurrentCampaign(false));

  if (!campaign) {
    if (total) total.textContent = "0";
    list.innerHTML = `
      <div class="campaign-online-empty">
        Campanha não encontrada.
      </div>
    `;
    return;
  }

  const profiles = profilesParam || (await getProfiles());
  const playerIds = getCampaignPlayerIds(campaign).map(String);
  const onlinePlayerIds = getCampaignOnlinePlayerIds(campaign);

  if (total) total.textContent = String(onlinePlayerIds.length);

  if (!onlinePlayerIds.length) {
    list.innerHTML = `
      <div class="campaign-online-empty">
        Nenhum jogador online agora.
      </div>
    `;
    return;
  }

  const sheetMap = await getCampaignOnlineSheetMap(campaign.id, campaign.sistema || campaign.system);

  list.innerHTML = onlinePlayerIds
    .map((playerId) => {
      const profile = profiles.find((item) => String(item.id) === String(playerId));
      const presence = getCampaignPresenceForUser(playerId);
      const sheet = sheetMap.get(String(playerId)) || {};
      const characterName = sheet.characterName || sheet.name || "Personagem sem nome";
      const extraInfo = getCampaignOnlineExtraInfo(sheet, campaign.sistema || campaign.system);

      return `
        <article class="campaign-online-player-card">
          <div class="campaign-online-player-card__top">
            ${profile ? getProfileAvatarHtml(profile, "tiny") : ""}
            <div>
              <strong>${escapeHtml(profile ? profile.name : playerId)}</strong>
              <span>${escapeHtml(characterName)}</span>
            </div>
            <i title="Online agora"></i>
          </div>

          <div class="campaign-online-player-card__meta">
            <span>${escapeHtml(extraInfo)}</span>
            <span>${escapeHtml(formatCampaignPresenceTime(presence?.online_at))}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

async function getCampaignOnlineSheetMap(campaignId, system) {
  const table = system === "D&D" ? "dnd_sheets" : "altherium_sheets";
  const map = new Map();

  if (!campaignId || !DB) return map;

  const { data, error } = await DB
    .from(table)
    .select("user_id, data")
    .eq("campaign_id", campaignId);

  if (error) {
    console.error(error);
    return map;
  }

  (data || []).forEach((row) => {
    map.set(String(row.user_id), row.data || {});
  });

  return map;
}

function getCampaignOnlineExtraInfo(sheet, system) {
  if (system === "D&D") {
    return sheet.classLevel || sheet.race || "Ficha D&D";
  }

  return sheet.root || sheet.raiz || sheet.classLevel || "Ficha Altherium";
}

function getCampaignPresenceForUser(userId) {
  const entries = Object.values(campaignPresenceState || {}).flat();
  return entries.find((entry) => String(entry.user_id || "") === String(userId)) || null;
}

function getCampaignPresenceOnlineUserIds() {
  const entries = Object.values(campaignPresenceState || {}).flat();
  const ids = new Set();

  entries.forEach((entry) => {
    if (entry && entry.user_id) ids.add(String(entry.user_id));
  });

  return Array.from(ids);
}

function getCampaignOnlinePlayerIds(campaign) {
  if (!campaign) return [];

  const playerIds = getCampaignPlayerIds(campaign).map(String);
  const onlineIds = getCampaignPresenceOnlineUserIds();

  if (!campaignPresenceReady) return [];

  return playerIds.filter((playerId) => onlineIds.includes(String(playerId)));
}

function isCampaignUserOnline(userId) {
  return getCampaignPresenceOnlineUserIds().includes(String(userId));
}

async function updateCampaignOnlineCounters() {
  const campaign = await getCurrentCampaign(false);
  if (!campaign) return;

  const onlineCount = String(getCampaignOnlinePlayerIds(campaign).length);

  const altheriumCounter = document.getElementById("onlineCount");
  const dndCounter = document.getElementById("dndPlayerCount");

  if (altheriumCounter) altheriumCounter.textContent = onlineCount;
  if (dndCounter) dndCounter.textContent = onlineCount;

  const panelTotal = document.getElementById("campaignOnlineTotal");
  if (panelTotal) panelTotal.textContent = onlineCount;
}

function formatCampaignPresenceTime(value) {
  if (!value) return "Agora";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Agora";

  return `Entrou ${date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
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
    characterAvatarUrl: "",
    characterPortraitUrl: "",
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
    berserkTriumphs: "[]",
    triumphs: "",
    notes: "",
  };

  ALTHERIUM_DOMAINS.forEach((domain) => {
    sheet[`domain_${domain.key}`] = "";
  });

  for (let index = 1; index <= RUNASKIN_VISUAL_NOTE_COUNT; index += 1) {
    sheet[`runaskinNote${index}Image`] = "";
    sheet[`runaskinNote${index}Title`] = "";
    sheet[`runaskinNote${index}Effect`] = "";
  }

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
      updateAltheriumGenesisSections(form);
      saveDebounced(() => saveSheetFromModal(false));
    });

    form.addEventListener("change", () => {
      if (form.dataset.mode !== "edit-sheet") return;
      updateAltheriumRootSections(form);
      updateAltheriumGenesisSections(form);
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
        <div class="sheet-card-top sheet-card-top--character">
          <span class="sheet-card-player">
            ${getCharacterPortraitHtml(sheet, "tiny")}
            <span>${escapeHtml(player ? player.name : "Jogador")}</span>
          </span>
          <strong>${escapeHtml(sheet.root || "Sem raíz")}</strong>
        </div>

        <h3>${sheet.characterName || "Personagem sem nome"}</h3>
        <p>Genesis: ${sheet.genesis || "---"}</p>
        <p>
          PV ${sheet.pvCurrent || "0"}/${sheet.pvMax || "0"} •
          PE ${sheet.peCurrent || "0"}/${sheet.peMax || "0"} •
          Iniciativa ${sheet.combatInitiative || "--"}
        </p>

        ${buildMasterCharacterHealthBar(sheet)}

        <div class="sheet-card-footer">
          <span>Abrir ficha completa</span>
          <strong>→</strong>
        </div>
      </button>
    `);
  }

  grid.innerHTML = cards.join("");
}



function buildMasterCharacterHealthBar(sheet = {}) {
  const current = getMasterCharacterHealthNumber(sheet.pvCurrent ?? sheet.hpCurrent ?? sheet.currentHp ?? sheet.hp);
  const max = getMasterCharacterHealthNumber(sheet.pvMax ?? sheet.hpMax ?? sheet.maxHp ?? sheet.hpTotal);

  const safeMax = max > 0 ? max : 0;
  const percent = safeMax > 0
    ? Math.max(0, Math.min(100, Math.round((current / safeMax) * 100)))
    : 0;

  const statusClass =
    percent <= 25
      ? "is-danger"
      : percent <= 50
        ? "is-warning"
        : "is-healthy";

  return `
    <div class="master-character-health ${statusClass}" title="PV ${escapeHtml(current)}/${escapeHtml(safeMax)}">
      <div class="master-character-health__top">
        <span>Vida</span>
        <strong>${escapeHtml(current)}/${escapeHtml(safeMax)}</strong>
      </div>

      <div class="master-character-health__bar" aria-label="Barra de vida">
        <i style="width: ${percent}%"></i>
      </div>
    </div>
  `;
}

function getMasterCharacterHealthNumber(value) {
  const number = Number(String(value ?? "0").replace(",", ".").replace(/[^\d.-]/g, ""));
  return Number.isFinite(number) ? Math.max(0, number) : 0;
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
  setupAltheriumGenesisFeatureSections(form, sheet);

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
    <div class="character-sheet-floating-layout character-sheet-floating-layout--altherium character-sheet-floating-layout--master-no-portrait">
      <div class="character-sheet-floating-main">
        <div class="altherium-rune-sheet master-rune-sheet">
      <section class="rune-paper-page">
        <div class="rune-frame">
          <div class="rune-page-header">
            ${textInput("Nome", "characterName", sheet.characterName)}
            ${rootSelectInput("Raíz", "root", sheet.root)}
            ${genesisSelectInput("Genesis", "genesis", sheet.genesis)}
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
      </div>
    </div>
  `;
}

async function saveSheetFromModal(showAlert = false) {
  const form = document.getElementById("altheriumForm");
  if (!form) return;

  const campaignId = getCurrentCampaignId();
  const playerId = form.dataset.playerId;

  if (!campaignId || !playerId) return;

  syncBerserkTriumphSelection(form);
  syncBerserkTriumphsToTriumphNotes(form);
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

  if (focused && form.contains(focused) && !focused.matches("[data-character-portrait-input]")) {
    setupAltheriumRootFeatureSections(form);
    setupAltheriumGenesisFeatureSections(form);
    updateAltheriumRootSections(form);
    updateAltheriumGenesisSections(form);
    updateCharacterPortraitFields(form, Object.fromEntries(new FormData(form)));
    updatePlayerSheetPreview();
    updateResourceBars();
  refreshCharacterPortraitFloatingPanels();
    return;
  }

  const sheet = await getOrCreateCampaignSheet(campaign.id, user.id, campaign.sistema);

  setupAltheriumRootFeatureSections(form, sheet);
  setupAltheriumGenesisFeatureSections(form, sheet);
  ensureCharacterPortraitFieldInForm(form, sheet, "Altherium");

  Object.keys(sheet).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = sheet[key] || "";
  });

  syncRunaskinNrFieldsFromSheet(form, sheet);
  hydrateRunaskinVisualNotePreviews(form);

  setAltheriumRootSelectorValue(form.elements.root, sheet.root);
  setAltheriumGenesisSelectorValue(form.elements.genesis, sheet.genesis);
  updateCharacterPortraitFields(form, sheet);
  updateAltheriumRootSections(form);
  updateAltheriumGenesisSections(form);
  updatePlayerSheetPreview();
  updateResourceBars();
}



function syncRunaskinNrFieldsFromSheet(form, sheet = {}) {
  if (!form) return;

  const currentField = form.elements.nrCurrent;
  const maxField = form.elements.nrMax;

  if (currentField) {
    currentField.value = sheet.nrCurrent || sheet.nr || "0";
  }

  if (maxField) {
    maxField.value = sheet.nrMax || "0";
  }
}

async function savePlayerSheet(showAlert) {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign();
  const form = document.getElementById("playerSheetForm");

  if (!user || !campaign || !form) return;

  setupAltheriumRootFeatureSections(form);
  setupAltheriumGenesisFeatureSections(form);
  updateAltheriumRootSections(form);
  updateAltheriumGenesisSections(form);

  syncBerserkTriumphSelection(form);
  syncBerserkTriumphsToTriumphNotes(form);
  await updateCampaignSheet(campaign.id, user.id, Object.fromEntries(new FormData(form)));
  updateCharacterPortraitFields(form, Object.fromEntries(new FormData(form)));
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
    characterAvatarUrl: "",
    characterPortraitUrl: "",
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
        <div class="sheet-card-top sheet-card-top--character">
          <span class="sheet-card-player">
            ${getCharacterPortraitHtml(sheet, "tiny")}
            <span>${escapeHtml(player ? player.name : "Jogador")}</span>
          </span>
          <strong>${escapeHtml(sheet.classLevel || "Sem classe")}</strong>
        </div>

        <h3>${sheet.characterName || "Personagem sem nome"}</h3>
        <p>Raça: ${sheet.race || "---"} • CA ${sheet.armorClass || "0"}</p>
        <p>
          PV ${sheet.hpCurrent || "0"}/${sheet.hpMax || "0"} •
          Iniciativa ${sheet.combatInitiative || "--"}
        </p>

        ${buildMasterCharacterHealthBar(sheet)}

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
    <div class="character-sheet-floating-layout character-sheet-floating-layout--dnd character-sheet-floating-layout--master-no-portrait">
      <div class="character-sheet-floating-main">
        <div class="dnd-character-sheet ${isModal ? "master-dnd-sheet" : ""}">
      <section class="dnd-paper-page">
        <div class="dnd-frame">
          <div class="dnd-banner">
            <h3>Dungeons & Dragons</h3>
          </div>

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

              <div class="dnd-skill-extra-grid dnd-skill-extra-grid--actions dnd-skill-extra-grid--attacks-full">
                <div class="dnd-box dnd-box--compact dnd-attacks-full-box">
                  <h3>Ataques & Magia</h3>
                  <div class="dnd-attack-table">
                    <div><span>Nome</span><span>Bônus</span><span>Dano / Tipo</span></div>
                    ${[1, 2, 3].map((index) => dndAttackRow(index, sheet)).join("")}
                  </div>
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

          <div class="dnd-bottom-grid dnd-bottom-grid--single">
            ${dndTextareaBox("Equipamento", "equipment", sheet.equipment, 10)}
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
      </div>
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
  setupDndSpellSlotTrackers(form);
  setupDndRestControls();

  form.addEventListener("input", () => {
    updateDndRestPreview();
    saveDndPlayerSheet(false);
  });

  if (saveButton) saveButton.addEventListener("click", () => saveDndPlayerSheet(true));
}

async function loadDndSheetIntoPlayerForm() {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign(true);
  const form = document.getElementById("dndPlayerSheetForm");

  if (!user || !campaign || !form) return;

  const focused = document.activeElement;

  if (focused && form.contains(focused) && !focused.matches("[data-character-portrait-input]")) {
    updateCharacterPortraitFields(form, Object.fromEntries(new FormData(form)));
    updateDndPlayerPreview();
    updateDndAutoNumbers();
    syncAllDndSpellSlotTrackers(form);
    updateDndRestPreview();
  refreshCharacterPortraitFloatingPanels();
    return;
  }

  const sheet = await getOrCreateDndSheet(campaign.id, user.id, campaign.sistema);

  ensureCharacterPortraitFieldInForm(form, sheet, "D&D");

  Object.keys(sheet).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = sheet[key] || "";
  });

  updateCharacterPortraitFields(form, sheet);
  updateDndPlayerPreview();
  updateDndAutoNumbers();
  setupDndSpellSlotTrackers(form);
  syncAllDndSpellSlotTrackers(form);
  setupDndRestControls();
  updateDndRestPreview();
}

async function saveDndPlayerSheet(showAlert) {
  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign();
  const form = document.getElementById("dndPlayerSheetForm");

  if (!user || !campaign || !form) return;

  syncAllDndSpellSlotTrackers(form);

  await updateDndSheet(campaign.id, user.id, Object.fromEntries(new FormData(form)));
  updateCharacterPortraitFields(form, Object.fromEntries(new FormData(form)));
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

  setDndHpBarFillWithTemp(
    form.elements.hpCurrent?.value,
    form.elements.hpMax?.value,
    form.elements.hpTemp?.value
  );
}





/* =========================================================
   D&D - ESPAÇOS DE MAGIA COM BOLINHAS SELECIONÁVEIS
========================================================= */
function setupDndSpellSlotTrackers(scope = document) {
  const root = scope && scope.querySelectorAll ? scope : document;
  const levels = root.querySelectorAll(".dnd-spell-slot-level");

  levels.forEach((levelBox) => {
    syncDndSpellSlotLevel(levelBox);

    if (levelBox.dataset.spellSlotReady === "true") return;
    levelBox.dataset.spellSlotReady = "true";

    levelBox.addEventListener("click", (event) => {
      const dot = event.target.closest(".dnd-spell-slot-dot");
      if (!dot) return;

      event.preventDefault();
      toggleDndSpellSlotDot(levelBox, dot);
    });

    levelBox.addEventListener("keydown", (event) => {
      const dot = event.target.closest(".dnd-spell-slot-dot");
      if (!dot) return;

      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      toggleDndSpellSlotDot(levelBox, dot);
    });
  });
}

function syncAllDndSpellSlotTrackers(scope = document) {
  const root = scope && scope.querySelectorAll ? scope : document;
  root.querySelectorAll(".dnd-spell-slot-level").forEach(syncDndSpellSlotLevel);
}

function syncDndSpellSlotLevel(levelBox) {
  if (!levelBox) return;

  const hidden = levelBox.querySelector("[data-spell-slot-hidden]");
  const dots = Array.from(levelBox.querySelectorAll(".dnd-spell-slot-dot"));

  if (!hidden || !dots.length) return;

  const normalized = normalizeDndSpellSlotValue(hidden.value, dots.length);
  hidden.value = normalized;

  dots.forEach((dot, index) => {
    const isChecked = normalized[index] === "1";
    dot.classList.toggle("is-checked", isChecked);
    dot.setAttribute("aria-pressed", isChecked ? "true" : "false");
  });
}

function toggleDndSpellSlotDot(levelBox, dot) {
  const hidden = levelBox.querySelector("[data-spell-slot-hidden]");
  const dots = Array.from(levelBox.querySelectorAll(".dnd-spell-slot-dot"));

  if (!hidden || !dots.length) return;

  const index = Number(dot.dataset.spellSlotDot);
  const current = normalizeDndSpellSlotValue(hidden.value, dots.length).split("");

  if (!Number.isInteger(index) || index < 0 || index >= current.length) return;

  current[index] = current[index] === "1" ? "0" : "1";
  hidden.value = current.join("");

  syncDndSpellSlotLevel(levelBox);

  const form = levelBox.closest("form");
  if (form) {
    hidden.dispatchEvent(new Event("input", { bubbles: true }));
    hidden.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

function normalizeDndSpellSlotValue(value, totalDots) {
  const safeLength = Math.max(0, Number(totalDots) || 0);
  const raw = String(value || "").replace(/[^01]/g, "");
  return (raw + "0".repeat(safeLength)).slice(0, safeLength);
}


/* =========================================================
   DESCANSO DE D&D
========================================================= */
function setupDndRestControls() {
  const form = document.getElementById("dndPlayerSheetForm");
  if (!form) return;

  let panel = document.getElementById("dndRestPanel");

  if (!panel) {
    const hpBox =
      form.querySelector(".dnd-hp-box") ||
      form.elements.hpCurrent?.closest(".dnd-hp-box") ||
      form.elements.hpCurrent?.closest(".dnd-box");

    if (!hpBox) return;

    hpBox.insertAdjacentHTML("beforeend", getDndRestControlsHtml());
    panel = document.getElementById("dndRestPanel");
  }

  if (form.dataset.dndRestControlsReady === "true") {
    updateDndRestPreview();
    return;
  }

  form.dataset.dndRestControlsReady = "true";

  const toggleButton = document.getElementById("openDndRestPanel");
  const shortRestButton = document.getElementById("applyDndShortRest");
  const longRestButton = document.getElementById("applyDndLongRest");
  const closeButton = document.getElementById("closeDndRestPanel");
  const diceTypeSelect = document.getElementById("dndRestHitDieType");
  const diceAmountInput = document.getElementById("dndRestHitDiceAmount");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const isOpen = panel?.classList.toggle("is-open");
      toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      updateDndRestPreview();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      panel?.classList.remove("is-open");
      toggleButton?.setAttribute("aria-expanded", "false");
    });
  }

  if (shortRestButton) shortRestButton.addEventListener("click", applyDndShortRest);
  if (longRestButton) longRestButton.addEventListener("click", applyDndLongRest);

  if (diceTypeSelect && !diceTypeSelect.dataset.dndRestDefaultReady) {
    const diceState = getDndHitDiceState(form);
    diceTypeSelect.value = String(diceState.primarySides || 8);
    diceTypeSelect.dataset.dndRestDefaultReady = "true";
  }

  if (diceTypeSelect) {
    diceTypeSelect.addEventListener("change", () => {
      diceTypeSelect.dataset.dndRestUserChanged = "true";
      updateDndRestPreview();
    });
  }

  if (diceAmountInput) diceAmountInput.addEventListener("input", updateDndRestPreview);

  updateDndRestPreview();
}

function getDndRestControlsHtml() {
  return `
    <div class="dnd-rest-wrapper">
      <button
        type="button"
        class="dnd-rest-toggle"
        id="openDndRestPanel"
        aria-expanded="false"
      >
        Gerenciar descanso
      </button>

      <div class="dnd-rest-panel" id="dndRestPanel">
        <div class="dnd-rest-panel__head">
          <div>
            <span>Recuperação</span>
            <h4>Descanso de D&D</h4>
          </div>

          <button type="button" id="closeDndRestPanel" aria-label="Fechar descanso">×</button>
        </div>

        <div class="dnd-rest-summary" id="dndRestSummary">
          PV atual: -- / -- • Dados de vida: --
        </div>

        <div class="dnd-rest-grid">
          <section class="dnd-rest-card">
            <h5>Descanso curto</h5>
            <p>Gaste Dados de Vida para recuperar PV.</p>

            <div class="dnd-rest-fields">
              <label>
                <span>Dados gastos</span>
                <input type="number" min="1" value="1" id="dndRestHitDiceAmount" />
              </label>

              <label>
                <span>Dado</span>
                <select id="dndRestHitDieType">
                  <option value="4">d4</option>
                  <option value="6">d6</option>
                  <option value="8" selected>d8</option>
                  <option value="10">d10</option>
                  <option value="12">d12</option>
                </select>
              </label>
            </div>

            <button type="button" class="dnd-rest-action dnd-rest-action--short" id="applyDndShortRest">
              Rolar descanso curto
            </button>
          </section>

          <section class="dnd-rest-card">
            <h5>Descanso longo</h5>
            <p>Restaura PV, zera PV temporário e recupera parte dos Dados de Vida.</p>

            <button type="button" class="dnd-rest-action dnd-rest-action--long" id="applyDndLongRest">
              Aplicar descanso longo
            </button>
          </section>
        </div>

        <div class="dnd-rest-result" id="dndRestResult">
          Escolha um tipo de descanso.
        </div>
      </div>
    </div>
  `;
}

async function applyDndShortRest() {
  const form = document.getElementById("dndPlayerSheetForm");
  if (!form) return;

  const amountInput = document.getElementById("dndRestHitDiceAmount");
  const diceSelect = document.getElementById("dndRestHitDieType");

  const current = getDndNumberValue(form.elements.hpCurrent?.value);
  const max = getDndNumberValue(form.elements.hpMax?.value);
  const conMod = getDndAbilityModifierValue(form.elements.conScore?.value);
  const requestedAmount = Math.max(1, Math.floor(getDndNumberValue(amountInput?.value) || 1));
  const sides = Math.max(4, Math.floor(getDndNumberValue(diceSelect?.value) || 8));

  const diceState = getDndHitDiceState(form);
  const available = Math.max(0, diceState.remainingTotal || 0);

  if (max <= 0) {
    setDndRestResult("Preencha o PV máximo antes de usar descanso.", "warning");
    return;
  }

  const spent = requestedAmount;
  const spentFromSheet = available > 0 ? Math.min(spent, available) : spent;
  const rolls = Array.from({ length: spent }, () => rollDndDie(sides));
  const rollTotal = rolls.reduce((sum, value) => sum + value, 0);
  const constitutionBonus = conMod * spent;
  const recovered = Math.max(0, rollTotal + constitutionBonus);
  const missingHp = Math.max(0, max - current);
  const appliedRecovery = Math.min(missingHp, recovered);
  const nextHp = Math.min(max, current + recovered);

  form.elements.hpCurrent.value = String(nextHp);
  updateDndRemainingHitDice(form, -spentFromSheet);

  updateDndAutoNumbers();
  updateDndRestPreview();
  await saveDndPlayerSheet(false);

  const conSign = conMod >= 0 ? "+" : "";
  const conTotalSign = constitutionBonus >= 0 ? "+" : "";
  const limitedWarning =
    available > 0 && spent > available
      ? `<p class="dnd-rest-warning">Você rolou ${spent} dados, mas sua ficha tinha só ${available} Dados de Vida restantes. O restante foi zerado.</p>`
      : "";

  setDndRestResultHtml(
    `
      <div class="dnd-rest-roll-result">
        <span>Descanso curto</span>
        <strong>${spent}d${sides}</strong>

        <div class="dnd-rest-roll-line">
          <small>Dados rolados</small>
          <b>[${rolls.join(", ")}]</b>
        </div>

        <div class="dnd-rest-roll-line">
          <small>Soma dos dados</small>
          <b>${rollTotal}</b>
        </div>

        <div class="dnd-rest-roll-line">
          <small>Constituição</small>
          <b>${conSign}${conMod} × ${spent} = ${conTotalSign}${constitutionBonus}</b>
        </div>

        <div class="dnd-rest-roll-total">
          <small>Total de cura</small>
          <b>${recovered}</b>
        </div>

        <div class="dnd-rest-roll-line">
          <small>Cura aplicada</small>
          <b>${appliedRecovery}</b>
        </div>

        <div class="dnd-rest-roll-hp">
          PV: <strong>${current}</strong> → <strong>${nextHp}</strong> / ${max}
        </div>

        ${limitedWarning}
      </div>
    `,
    "success"
  );
}

async function applyDndLongRest() {
  const form = document.getElementById("dndPlayerSheetForm");
  if (!form) return;

  const max = getDndNumberValue(form.elements.hpMax?.value);
  const diceState = getDndHitDiceState(form);
  const recoverAmount = Math.max(1, Math.floor(diceState.totalTotal / 2));
  const nextRemaining = Math.min(diceState.totalTotal, diceState.remainingTotal + recoverAmount);

  if (max <= 0) {
    setDndRestResult("Preencha o PV máximo antes de usar descanso longo.", "warning");
    return;
  }

  form.elements.hpCurrent.value = String(max);
  if (form.elements.hpTemp) form.elements.hpTemp.value = "0";
  if (form.elements.deathSuccesses) form.elements.deathSuccesses.value = "";
  if (form.elements.deathFailures) form.elements.deathFailures.value = "";

  if (form.elements.hitDiceRemaining && diceState.totalTotal > 0) {
    form.elements.hitDiceRemaining.value = formatDndHitDiceValue(nextRemaining, diceState.primarySides);
  }

  updateDndAutoNumbers();
  updateDndRestPreview();
  await saveDndPlayerSheet(false);

  setDndRestResult(
    `Descanso longo aplicado. PV voltou para ${max}, PV temporário zerou e Dados de Vida ficaram em ${form.elements.hitDiceRemaining?.value || "--"}.`,
    "success"
  );
}

function getDndHitDiceState(form) {
  const totalText = form.elements.hitDiceTotal?.value || "";
  const remainingText = form.elements.hitDiceRemaining?.value || "";

  const totalParsed = parseDndHitDiceValue(totalText);
  const remainingParsed = parseDndHitDiceValue(remainingText);
  const primarySides = remainingParsed.primarySides || totalParsed.primarySides || 8;

  return {
    totalTotal: totalParsed.total || remainingParsed.total || 1,
    remainingTotal: remainingParsed.total || totalParsed.total || 0,
    primarySides,
  };
}

function parseDndHitDiceValue(value) {
  const text = String(value || "").toLowerCase().replace(/\s+/g, "");
  const matches = [...text.matchAll(/(\d*)d(4|6|8|10|12)/g)];

  if (!matches.length) {
    const numberOnly = Math.max(0, Math.floor(getDndNumberValue(text)));
    return {
      total: numberOnly,
      primarySides: 8,
    };
  }

  let total = 0;
  let primarySides = 8;

  matches.forEach((match, index) => {
    const amount = Number(match[1] || "1");
    const sides = Number(match[2] || "8");

    if (index === 0) primarySides = sides;
    total += amount;
  });

  return { total, primarySides };
}

function updateDndRemainingHitDice(form, delta) {
  const diceState = getDndHitDiceState(form);
  const nextRemaining = Math.max(0, Math.min(diceState.totalTotal, diceState.remainingTotal + delta));

  if (form.elements.hitDiceRemaining) {
    form.elements.hitDiceRemaining.value = formatDndHitDiceValue(nextRemaining, diceState.primarySides);
  }
}

function formatDndHitDiceValue(amount, sides = 8) {
  const safeAmount = Math.max(0, Math.floor(Number(amount) || 0));
  const safeSides = Math.max(4, Math.floor(Number(sides) || 8));

  if (safeAmount <= 0) return `0d${safeSides}`;
  return `${safeAmount}d${safeSides}`;
}

function updateDndRestPreview() {
  const form = document.getElementById("dndPlayerSheetForm");
  const summary = document.getElementById("dndRestSummary");
  const diceSelect = document.getElementById("dndRestHitDieType");
  const amountInput = document.getElementById("dndRestHitDiceAmount");

  if (!form || !summary) return;

  const current = getDndNumberValue(form.elements.hpCurrent?.value);
  const max = getDndNumberValue(form.elements.hpMax?.value);
  const temp = getDndNumberValue(form.elements.hpTemp?.value);
  const diceState = getDndHitDiceState(form);
  const amount = Math.max(1, Math.floor(getDndNumberValue(amountInput?.value) || 1));
  const sides = Math.max(4, Math.floor(getDndNumberValue(diceSelect?.value) || diceState.primarySides || 8));

  summary.textContent = `PV atual: ${current} / ${max} • PV temp: ${temp} • Dados de vida: ${form.elements.hitDiceRemaining?.value || "--"} • Vai rolar: ${amount}d${sides}`;
}

function setDndRestResult(message, type = "neutral") {
  const resultBox = document.getElementById("dndRestResult");

  if (!resultBox) {
    if (message) alert(message);
    return;
  }

  resultBox.className = `dnd-rest-result dnd-rest-result--${type}`;
  resultBox.textContent = message;
}

function setDndRestResultHtml(html, type = "neutral") {
  const resultBox = document.getElementById("dndRestResult");

  if (!resultBox) return;

  resultBox.className = `dnd-rest-result dnd-rest-result--${type}`;
  resultBox.innerHTML = html;
}


function rollDndDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function getDndAbilityModifierValue(scoreValue) {
  const score = getDndNumberValue(scoreValue);
  if (!score) return 0;

  return Math.floor((score - 10) / 2);
}

function getDndNumberValue(value) {
  const number = Number(String(value ?? "0").replace(",", ".").replace(/[^\d.-]/g, ""));
  return Number.isFinite(number) ? number : 0;
}


/* =========================================================
   INICIATIVA
========================================================= */

















































function getAltheriumPlayerInitiativeConfig() {
  return {
    system: "Altherium",
    boardId: "playerInitiativeBoard",
    clearButtonId: "clearPlayerInitiativeBtn",
    getSheet: getOrCreateCampaignSheet,
    updateSheet: updateCampaignSheet,
  };
}

function getDndPlayerInitiativeConfig() {
  return {
    system: "D&D",
    boardId: "dndPlayerInitiativeBoard",
    clearButtonId: "clearDndPlayerInitiativeBtn",
    getSheet: getOrCreateDndSheet,
    updateSheet: updateDndSheet,
  };
}

async function setupInitiativeBoard(config) {
  await ensureInitiativeNextButton(config);
  await renderInitiativeBoard(config);

  const clearButton = document.getElementById(config.clearButtonId);
  if (clearButton && !clearButton.dataset.clearInitiativeReady) {
    clearButton.dataset.clearInitiativeReady = "true";
    clearButton.addEventListener("click", () => clearInitiative(config));
  }

  const nextButton = getInitiativeNextButton(config);
  if (nextButton && !nextButton.dataset.nextInitiativeReady) {
    nextButton.dataset.nextInitiativeReady = "true";
    nextButton.addEventListener("click", () => goToNextInitiativeTurn(config));
  }
}

async function ensureInitiativeNextButton(config) {
  const clearButton = document.getElementById(config.clearButtonId);
  const board = document.getElementById(config.boardId);

  if (!clearButton || !board) return;

  const nextButtonId = getInitiativeNextButtonId(config);
  let nextButton = document.getElementById(nextButtonId);

  if (!nextButton) {
    nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.id = nextButtonId;
    nextButton.className = "altherium-btn initiative-next-btn";
    nextButton.textContent = "Próximo";

    clearButton.insertAdjacentElement("afterend", nextButton);
  }

  injectInitiativeNextButtonStyles();
}

function getInitiativeNextButton(config) {
  return document.getElementById(getInitiativeNextButtonId(config));
}

function getInitiativeNextButtonId(config) {
  return `${config.boardId}NextTurnBtn`;
}

function injectInitiativeNextButtonStyles() {
  if (document.getElementById("initiative-next-button-style")) return;

  const style = document.createElement("style");
  style.id = "initiative-next-button-style";

  style.textContent = `
    .initiative-next-btn {
      margin-left: 10px;
      border: 1px solid rgba(34, 211, 238, 0.34) !important;
      background:
        linear-gradient(135deg, rgba(34, 211, 238, 0.94), rgba(6, 182, 212, 0.94)) !important;
      color: #020617 !important;
      box-shadow:
        0 0 24px rgba(34, 211, 238, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.18) !important;
    }

    .initiative-next-btn:hover {
      transform: translateY(-2px);
      box-shadow:
        0 16px 34px rgba(34, 211, 238, 0.18),
        0 0 34px rgba(34, 211, 238, 0.26) !important;
    }

    .initiative-next-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none;
      box-shadow: none !important;
    }

    .dnd-master-page .initiative-next-btn,
    .dnd-player-page .initiative-next-btn {
      border-color: rgba(239, 68, 68, 0.34) !important;
      background:
        linear-gradient(135deg, rgba(248, 113, 113, 0.96), rgba(220, 38, 38, 0.96)) !important;
      color: #160506 !important;
      box-shadow:
        0 0 24px rgba(239, 68, 68, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.18) !important;
    }

    @media (max-width: 700px) {
      .initiative-next-btn {
        width: 100%;
        margin-left: 0;
        margin-top: 10px;
      }
    }
  `;

  document.head.appendChild(style);
}

async function renderInitiativeBoard(config) {
  const board = document.getElementById(config.boardId);
  const campaign = await getCurrentCampaign(true);

  if (!board) return;

  await ensureInitiativeNextButton(config);

  const nextButton = getInitiativeNextButton(config);

  if (!campaign) {
    board.innerHTML = `
      <div class="altherium-empty">
        <h3>Campanha não encontrada</h3>
        <p>Volte para suas campanhas e entre novamente.</p>
      </div>
    `;

    if (nextButton) nextButton.disabled = true;
    return;
  }

  const initiativeList = await getInitiativeOrderedCharacters(config, campaign);

  if (!initiativeList.length) {
    board.innerHTML = `
      <div class="altherium-empty">
        <h3>Nenhum personagem na iniciativa</h3>
        <p>Adicione jogadores à campanha para montar a ordem.</p>
      </div>
    `;

    if (nextButton) nextButton.disabled = true;
    await saveInitiativeTurnState(config, campaign, 0, "");
    return;
  }

  const currentTurnIndex = await getCurrentInitiativeTurnIndex(
    config,
    campaign,
    initiativeList.length,
    initiativeList
  );

  if (nextButton) {
    nextButton.disabled = initiativeList.length <= 1;
  }

  board.innerHTML = initiativeList
    .map((item, index) => {
      const value = item.initiativeNumber === null ? "--" : item.initiativeNumber;
      const isActive = index === currentTurnIndex;

      return `
        <div class="initiative-row ${isActive ? "active" : ""}" data-initiative-index="${index}" data-player-id="${escapeHtml(item.playerId)}">
          ${renderInitiativeCharacterAvatar(item, index)}

          <div class="initiative-character">
            <strong>${escapeHtml(item.characterName)}</strong>
            <span>${isActive ? "Turno atual" : "Aguardando turno"}</span>
          </div>

          <div class="initiative-value">${value}</div>
        </div>
      `;
    })
    .join("");
}

function getInitiativeCharacterAvatarUrl(item = {}) {
  return (
    item.characterPortraitUrl ||
    item.characterAvatarUrl ||
    item.portraitUrl ||
    item.avatarUrl ||
    ""
  );
}

function renderInitiativeCharacterAvatar(item = {}, index = 0) {
  const avatarUrl = getInitiativeCharacterAvatarUrl(item);
  const characterName = escapeHtml(item.characterName || `Personagem ${index + 1}`);

  if (avatarUrl) {
    return `
      <div class="initiative-position initiative-position--avatar">
        <img src="${escapeHtml(avatarUrl)}" alt="${characterName}" loading="lazy" />
      </div>
    `;
  }

  return `
    <div class="initiative-position initiative-position--fallback">
      <span>${index + 1}</span>
    </div>
  `;
}

async function getInitiativeOrderedCharacters(config, campaign) {
  const playerIds = getCampaignPlayerIds(campaign);
  const initiativeList = [];

  for (const playerId of playerIds) {
    const sheet = await config.getSheet(campaign.id, playerId, campaign.sistema);
    const initiativeValue = sheet.combatInitiative;

    initiativeList.push({
      playerId,
      characterName: sheet.characterName || sheet.personagem || sheet.ownerName || "Personagem sem nome",
      characterAvatarUrl: sheet.characterAvatarUrl || "",
      characterPortraitUrl: sheet.characterPortraitUrl || sheet.characterAvatarUrl || "",
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

  return initiativeList;
}

async function goToNextInitiativeTurn(config) {
  const campaign = await getCurrentCampaign(true);
  if (!campaign) return;

  const initiativeList = await getInitiativeOrderedCharacters(config, campaign);

  if (!initiativeList.length) return;

  const currentIndex = await getCurrentInitiativeTurnIndex(
    config,
    campaign,
    initiativeList.length,
    initiativeList
  );

  const nextIndex = (currentIndex + 1) % initiativeList.length;
  const nextCharacter = initiativeList[nextIndex];

  await saveInitiativeTurnState(
    config,
    campaign,
    nextIndex,
    nextCharacter ? nextCharacter.playerId : ""
  );

  await renderInitiativeBoard(config);
}

async function getCurrentInitiativeTurnIndex(config, campaign, totalCharacters, initiativeList = []) {
  if (totalCharacters <= 0) return 0;

  const fallbackIndex = getLocalInitiativeTurnIndex(config, campaign, totalCharacters);

  if (!DB) return fallbackIndex;

  const { data, error } = await DB
    .from("campaign_initiative_state")
    .select("current_turn_index, current_player_id")
    .eq("campaign_id", String(campaign.id))
    .eq("system", config.system || "Sistema")
    .maybeSingle();

  if (error) {
    console.error("Erro ao carregar turno da iniciativa no Supabase:", error);
    return fallbackIndex;
  }

  if (!data) {
    const firstCharacter = initiativeList[0];

    await saveInitiativeTurnState(
      config,
      campaign,
      0,
      firstCharacter ? firstCharacter.playerId : ""
    );

    return 0;
  }

  if (data.current_player_id && initiativeList.length) {
    const playerIndex = initiativeList.findIndex((item) => item.playerId === data.current_player_id);

    if (playerIndex >= 0) {
      if (playerIndex !== Number(data.current_turn_index)) {
        await saveInitiativeTurnState(config, campaign, playerIndex, data.current_player_id);
      }

      return playerIndex;
    }
  }

  const savedIndex = Number(data.current_turn_index);

  if (!Number.isFinite(savedIndex) || savedIndex < 0 || savedIndex >= totalCharacters) {
    const firstCharacter = initiativeList[0];

    await saveInitiativeTurnState(
      config,
      campaign,
      0,
      firstCharacter ? firstCharacter.playerId : ""
    );

    return 0;
  }

  return savedIndex;
}

function getLocalInitiativeTurnIndex(config, campaign, totalCharacters) {
  const key = getInitiativeTurnStorageKey(config, campaign);
  const savedIndex = Number(localStorage.getItem(key));

  if (!Number.isFinite(savedIndex) || savedIndex < 0) {
    localStorage.setItem(key, "0");
    return 0;
  }

  if (totalCharacters <= 0) {
    localStorage.setItem(key, "0");
    return 0;
  }

  if (savedIndex >= totalCharacters) {
    localStorage.setItem(key, "0");
    return 0;
  }

  return savedIndex;
}

async function saveInitiativeTurnState(config, campaign, index, playerId = "") {
  const safeIndex = Math.max(0, Number(index) || 0);
  const safePlayerId = playerId ? String(playerId) : "";

  setLocalInitiativeTurnIndex(config, campaign, safeIndex);

  if (!DB || !campaign || !campaign.id) return;

  const { error } = await DB
    .from("campaign_initiative_state")
    .upsert(
      {
        campaign_id: String(campaign.id),
        system: config.system || "Sistema",
        current_turn_index: safeIndex,
        current_player_id: safePlayerId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "campaign_id,system" }
    );

  if (error) {
    console.error("Erro ao salvar turno da iniciativa no Supabase:", error);
  }
}

function setLocalInitiativeTurnIndex(config, campaign, index) {
  const key = getInitiativeTurnStorageKey(config, campaign);
  localStorage.setItem(key, String(Math.max(0, Number(index) || 0)));
}

function getInitiativeTurnStorageKey(config, campaign) {
  const campaignId = campaign && campaign.id ? campaign.id : "sem-campanha";
  const system = config.system || "Sistema";

  return `campaign-lab-current-initiative-${system}-${campaignId}`;
}

async function clearInitiative(config) {
  const campaign = await getCurrentCampaign(true);

  if (!campaign) {
    alert("Campanha não encontrada.");
    return;
  }

  if (!confirm("Limpar a iniciativa de todos os personagens?")) return;

  await clearAllCampaignSheetInitiatives(config, campaign);
  await saveInitiativeTurnState(config, campaign, 0, "");
  clearLocalInitiativeTurnState(config, campaign);
  clearVisibleInitiativeInputs();

  await renderInitiativeBoard(config);

  if (typeof refreshCurrentMasterPanel === "function") {
    await refreshCurrentMasterPanel();
  }
}

async function clearAllCampaignSheetInitiatives(config, campaign) {
  const table = config.system === "D&D" ? "dnd_sheets" : "altherium_sheets";
  const campaignId = String(campaign.id);
  const campaignPlayerIds = getCampaignPlayerIds(campaign).map((id) => String(id));
  const handledIds = new Set();

  if (DB) {
    const { data, error } = await DB
      .from(table)
      .select("user_id, data")
      .eq("campaign_id", campaignId);

    if (error) {
      console.error("Erro ao buscar fichas para limpar iniciativa:", error);
    } else {
      for (const row of data || []) {
        const playerId = String(row.user_id);
        handledIds.add(playerId);

        const currentData = row.data || {};
        const updatedData = {
          ...currentData,
          combatInitiative: "",
          updatedAt: new Date().toISOString(),
        };

        const { error: updateError } = await DB
          .from(table)
          .update({
            data: updatedData,
            updated_at: new Date().toISOString(),
          })
          .eq("campaign_id", campaignId)
          .eq("user_id", playerId);

        if (updateError) {
          console.error(`Erro ao limpar iniciativa do jogador ${playerId}:`, updateError);

          if (config.updateSheet) {
            await config.updateSheet(campaign.id, playerId, {
              combatInitiative: "",
            });
          }
        }
      }
    }
  }

  for (const playerId of campaignPlayerIds) {
    if (handledIds.has(playerId)) continue;

    if (config.updateSheet) {
      await config.updateSheet(campaign.id, playerId, {
        combatInitiative: "",
      });
    }
  }
}

function clearLocalInitiativeTurnState(config, campaign) {
  try {
    localStorage.removeItem(getInitiativeTurnStorageKey(config, campaign));
  } catch (error) {
    console.warn("Não consegui limpar o estado local da iniciativa:", error);
  }
}

function clearVisibleInitiativeInputs() {
  document
    .querySelectorAll("input[name='combatInitiative']")
    .forEach((input) => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
}


/* =========================================================
   ROLAGEM DE DADOS DA CAMPANHA
========================================================= */

async function setupCampaignDiceRoller(system) {
  const campaignId = getCurrentCampaignId();
  const user = getLoggedUserFromSession();

  if (!campaignId || !user || !DB) return;

  ensureCampaignDiceRoller(system);
  setupCampaignDiceWidgetPositioning();
  bindCampaignDiceRollerEvents(system);
  setupCampaignDiceGlobalFallback();
  positionCampaignDiceWidgetNearPortrait();
  await renderCampaignDiceHistory();
  subscribeDiceRollsRealtime();
}

function ensureCampaignDiceRoller(system) {
  const widget = document.getElementById("campaignDiceWidget");

  if (!widget) return;

  widget.dataset.diceSystem = system;

  const isOpen = localStorage.getItem("campaignLabDiceOpen") === "true";
  widget.classList.toggle("campaign-dice-widget--open", isOpen);

  const toggleButton = widget.querySelector("[data-dice-toggle]");
  if (toggleButton) {
    toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  widget.querySelectorAll("[data-dice-system-only]").forEach((block) => {
    const allowedSystem = block.dataset.diceSystemOnly;
    block.hidden = Boolean(allowedSystem && allowedSystem !== system);
  });
}


function setupCampaignDiceWidgetPositioning() {
  if (window.campaignDiceWidgetPositioningReady) {
    positionCampaignDiceWidgetNearPortrait();
    return;
  }

  window.campaignDiceWidgetPositioningReady = true;

  const refreshDiceWidgetPosition = () => {
    if (window.campaignDiceWidgetPositionFrame) {
      cancelAnimationFrame(window.campaignDiceWidgetPositionFrame);
    }

    window.campaignDiceWidgetPositionFrame = requestAnimationFrame(() => {
      positionCampaignDiceWidgetNearPortrait();
    });
  };

  window.addEventListener("resize", refreshDiceWidgetPosition);
  window.addEventListener("scroll", refreshDiceWidgetPosition, { passive: true });

  refreshDiceWidgetPosition();

  let tries = 0;
  const interval = setInterval(() => {
    positionCampaignDiceWidgetNearPortrait();
    tries += 1;
    if (tries >= 30) clearInterval(interval);
  }, 250);
}

function positionCampaignDiceWidgetNearPortrait() {
  const widget = document.getElementById("campaignDiceWidget");
  if (!widget) return;

  const isPlayerPage = Boolean(
    document.body.classList.contains("altherium-player-page") ||
      document.body.classList.contains("dnd-player-page")
  );

  const form =
    document.getElementById("playerSheetForm") ||
    document.getElementById("dndPlayerSheetForm");

  const portraitField = form
    ? form.querySelector("[data-character-portrait-field]")
    : null;

  if (!isPlayerPage || !form || !portraitField || window.innerWidth < 1100) {
    resetCampaignDiceWidgetPosition(widget);
    return;
  }

  const portraitWidth =
    Number.parseFloat(portraitField.style.width) ||
    portraitField.offsetWidth ||
    250;

  const portraitHeight = portraitField.offsetHeight || 320;
  const portraitTop =
    Number.parseFloat(portraitField.style.top) ||
    portraitField.offsetTop ||
    0;

  const portraitLeft =
    Number.parseFloat(portraitField.style.left) ||
    portraitField.offsetLeft ||
    0;

  const isOpen = widget.classList.contains("campaign-dice-widget--open");
  const safeViewportWidth = Math.max(320, window.innerWidth - 48);
  const closedWidth = portraitWidth;
  const openWidth = Math.min(
    560,
    safeViewportWidth,
    Math.max(500, portraitWidth + 280)
  );
  const widgetWidth = isOpen ? openWidth : closedWidth;
  const gap = 14;

  if (widget.parentElement !== form) {
    form.appendChild(widget);
  }

  form.style.setProperty("position", "relative", "important");

  widget.classList.add("campaign-dice-widget--near-portrait");
  widget.style.setProperty("position", "absolute", "important");
  widget.style.setProperty("right", "auto", "important");
  widget.style.setProperty("bottom", "auto", "important");
  widget.style.setProperty("width", `${widgetWidth}px`, "important");
  widget.style.setProperty("max-width", `${widgetWidth}px`, "important");
  widget.style.setProperty("margin", "0", "important");
  widget.style.setProperty("z-index", "999998", "important");
  widget.style.setProperty("display", "flex", "important");
  widget.style.setProperty("transform", "none", "important");

  const widgetHeight = widget.offsetHeight || (isOpen ? 520 : 46);
  const formHeight = Math.max(form.scrollHeight || 0, portraitTop + portraitHeight + widgetHeight + gap);

  let top = portraitTop + portraitHeight + gap;
  const maxTop = Math.max(0, formHeight - widgetHeight);
  top = Math.max(0, Math.min(top, maxTop));

  let left = isOpen
    ? portraitLeft + portraitWidth - widgetWidth
    : portraitLeft + portraitWidth / 2 - widgetWidth / 2;

  const formWidth = form.getBoundingClientRect().width || form.offsetWidth || 0;
  const minLeft = -520;
  const maxLeft = Math.max(minLeft, formWidth + 520 - widgetWidth);
  left = Math.max(minLeft, Math.min(left, maxLeft));

  widget.style.setProperty("top", `${top}px`, "important");
  widget.style.setProperty("left", `${left}px`, "important");
}

function resetCampaignDiceWidgetPosition(widget = document.getElementById("campaignDiceWidget")) {
  if (!widget) return;

  widget.classList.remove("campaign-dice-widget--near-portrait");
  widget.style.removeProperty("position");
  widget.style.removeProperty("left");
  widget.style.removeProperty("top");
  widget.style.removeProperty("right");
  widget.style.removeProperty("bottom");
  widget.style.removeProperty("width");
  widget.style.removeProperty("max-width");
  widget.style.removeProperty("transform");
}


function bindCampaignDiceRollerEvents(system) {
  const widget = document.getElementById("campaignDiceWidget");
  if (!widget || widget.dataset.diceReady === "true") return;

  widget.dataset.diceReady = "true";

  widget.addEventListener("click", async (event) => {
    const toggleButton = event.target.closest("[data-dice-toggle]");
    const refreshButton = event.target.closest("[data-dice-refresh]");
    const rollButton = event.target.closest("[data-dice-formula]");

    if (toggleButton) {
      widget.classList.toggle("campaign-dice-widget--open");

      const isOpen = widget.classList.contains("campaign-dice-widget--open");
      localStorage.setItem("campaignLabDiceOpen", isOpen ? "true" : "false");
      toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      positionCampaignDiceWidgetNearPortrait();
      return;
    }

    if (refreshButton) {
      await renderCampaignDiceHistory();
      return;
    }

    if (rollButton) {
      if (isCampaignDiceGenitalRollButton(rollButton)) {
        playCampaignGenitalDiceSound();
      }

      await handleCampaignDiceRoll({
        system,
        formula: rollButton.dataset.diceFormula,
        label: rollButton.dataset.diceLabel,
      });
    }
  });

  widget.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-dice-custom-form]");
    if (!form) return;

    event.preventDefault();

    await handleCampaignDiceRoll({
      system,
      formula: form.elements.diceFormula.value,
      label: form.elements.diceLabel.value || "Rolagem personalizada",
    });
  });
}


function playCampaignDiceRollSound() {
  const volume = 0.45;
  const customSoundPath = "sounds/dice-roll.mp3";

  try {
    const audio = new Audio(customSoundPath);
    audio.volume = volume;
    audio.currentTime = 0;

    audio.play().catch(() => {
      playCampaignDiceSyntheticSound(volume);
    });
  } catch (error) {
    playCampaignDiceSyntheticSound(volume);
  }
}

function playCampaignDiceSyntheticSound(volume = 0.45) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(volume * 0.12, audioContext.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.42);
    masterGain.connect(audioContext.destination);

    const rollTimes = [0, 0.06, 0.12, 0.19, 0.27];

    rollTimes.forEach((delay, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(260 + index * 42, audioContext.currentTime + delay);
      oscillator.frequency.exponentialRampToValueAtTime(
        120 + index * 20,
        audioContext.currentTime + delay + 0.08
      );

      gain.gain.setValueAtTime(0.0001, audioContext.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.65, audioContext.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + delay + 0.09);

      oscillator.connect(gain);
      gain.connect(masterGain);

      oscillator.start(audioContext.currentTime + delay);
      oscillator.stop(audioContext.currentTime + delay + 0.1);
    });

    setTimeout(() => {
      audioContext.close().catch(() => {});
    }, 700);
  } catch (error) {
    console.log("Não foi possível tocar o som da rolagem.");
  }
}

async function handleCampaignDiceRoll({ system, formula, label }) {
  const campaignId = getCurrentCampaignId();
  const user = getLoggedUserFromSession();

  if (!campaignId || !user || !formula) return;

  playCampaignDiceRollSound();

  const context = getCampaignDiceContext(system);
  const result = rollCampaignDiceFormula(formula, context.variables, { system });

  if (!result.ok) {
    showCampaignDiceLocalResult({
      total: "--",
      label: label || "Erro na rolagem",
      formula,
      message: result.error || "Não consegui ler essa fórmula.",
      error: true,
    });
    return;
  }

  showCampaignDiceLocalResult({
    total: result.total,
    label: label || "Rolagem",
    formula,
    message: result.summary,
  });

  const row = {
    campaign_id: String(campaignId),
    user_id: String(user.id),
    system,
    character_name: isMaster ? "Mestre" : (context.characterName || user.nome || user.name || user.id),
    roll_label: label || "Rolagem",
    roll_formula: formula,
    total: result.total,
    details: {
      summary: result.summary,
      parts: result.parts,
      variables: result.usedVariables,
      resolvedFormula: result.resolvedFormula,
    },
  };

  const { error } = await DB.from("dice_rolls").insert(row);

  if (error) {
    console.error("Erro ao salvar rolagem:", error);
    showCampaignDiceLocalResult({
      total: result.total,
      label: label || "Rolagem feita, mas não salva",
      formula,
      message: "A rolagem funcionou, mas a tabela dice_rolls ainda não está criada no Supabase.",
      error: true,
    });
    return;
  }

  await renderCampaignDiceHistory();
}

function getCampaignDiceContext(system) {
  const user = getLoggedUserFromSession();
  const form = getCampaignDiceActiveSheetForm();

  const variables = {};
  let characterName = user ? user.nome : "Mestre";

  function addVariable(name, value) {
    if (!name) return;
    variables[normalizeCampaignDiceToken(name)] = getCampaignDiceNumber(value);
  }

  if (form) {
    Array.from(form.elements).forEach((element) => {
      if (!element.name) return;
      addVariable(element.name, element.value);
    });

    if (form.elements.characterName && form.elements.characterName.value.trim()) {
      characterName = form.elements.characterName.value.trim();
    }
  }

  if (system === "Altherium") {
    addAltheriumDiceVariables(form, addVariable);
  }

  if (system === "D&D") {
    addDndDiceVariables(form, addVariable);
  }

  return { variables, characterName, hasSheetForm: Boolean(form) };
}

function getCampaignDiceActiveSheetForm() {
  return (
    document.getElementById("playerSheetForm") ||
    document.getElementById("dndPlayerSheetForm") ||
    null
  );
}

function addAltheriumDiceVariables(form, addVariable) {
  const attributeFields = {
    furia: "furia",
    destino: "destino",
    espirito: "espirito",
    impulso: "impulso",
    estrategia: "estrategia",
    runico: "runico",
  };

  Object.entries(attributeFields).forEach(([token, fieldName]) => {
    const value = getFormValue(form, fieldName);
    addVariable(token, value);
  });

  addVariable("fúria", getFormValue(form, "furia"));
  addVariable("espírito", getFormValue(form, "espirito"));
  addVariable("estratégia", getFormValue(form, "estrategia"));
  addVariable("rúnico", getFormValue(form, "runico"));

  ALTHERIUM_DOMAINS.forEach((domain) => {
    const domainValue = getFormValue(form, `domain_${domain.key}`);
    const attributeToken = getAltheriumAttributeToken(domain.attr);
    const attributeValue = getFormValue(form, attributeToken);

    addVariable(domain.label, domainValue);
    addVariable(domain.key, domainValue);
    addVariable(`domain_${domain.key}`, domainValue);
    addVariable(`pericia_${domain.key}`, domainValue);
    addVariable(`${domain.key}_atributo`, attributeValue);
    addVariable(`${domain.key}_bonus`, attributeValue);
  });
}

function addDndDiceVariables(form, addVariable) {
  const abilities = [
    { score: "strScore", save: "saveStr", mod: "strMod", label: "Força", aliases: ["forca", "força"] },
    { score: "dexScore", save: "saveDex", mod: "dexMod", label: "Destreza", aliases: ["destreza"] },
    { score: "conScore", save: "saveCon", mod: "conMod", label: "Constituição", aliases: ["constituicao", "constituição"] },
    { score: "intScore", save: "saveInt", mod: "intMod", label: "Inteligência", aliases: ["inteligencia", "inteligência"] },
    { score: "wisScore", save: "saveWis", mod: "wisMod", label: "Sabedoria", aliases: ["sabedoria"] },
    { score: "chaScore", save: "saveCha", mod: "chaMod", label: "Carisma", aliases: ["carisma"] },
  ];

  abilities.forEach((ability) => {
    const abilityMod = getDndAbilityModifierFromForm(form, ability.score);
    const saveValue = getFormValue(form, ability.save);

    addVariable(ability.mod, abilityMod);
    addVariable(ability.label, abilityMod);

    ability.aliases.forEach((alias) => {
      addVariable(alias, abilityMod);
    });

    addVariable(ability.save, saveValue);
    addVariable(`resistencia_${normalizeCampaignDiceToken(ability.label)}`, saveValue);
  });

  addVariable("initiative", getFormValue(form, "initiative"));
  addVariable("iniciativa", getFormValue(form, "initiative"));
  addVariable("combatInitiative", getFormValue(form, "combatInitiative"));
  addVariable("iniciativa_combate", getFormValue(form, "combatInitiative"));

  DND_SKILLS.forEach(([key, label]) => {
    const value = getFormValue(form, key);
    addVariable(label, value);
    addVariable(key, value);
    addVariable(`pericia_${key.replace(/^skill/, "").toLowerCase()}`, value);
  });
}

function getAltheriumAttributeToken(attributeLabel) {
  const token = normalizeCampaignDiceToken(attributeLabel);

  const map = {
    furia: "furia",
    destino: "destino",
    espirito: "espirito",
    impulso: "impulso",
    estrategia: "estrategia",
    runico: "runico",
  };

  return map[token] || token;
}

function getDndAbilityModifierFromForm(form, scoreName) {
  if (!form || !form.elements || !form.elements[scoreName]) return 0;

  const raw = String(form.elements[scoreName].value || "").trim();
  if (!raw) return 0;

  const score = Number(raw.replace(",", "."));
  if (!Number.isFinite(score)) return 0;

  return Math.floor((score - 10) / 2);
}

function getFormValue(form, name) {
  if (!form || !form.elements || !form.elements[name]) return "0";
  return form.elements[name].value || "0";
}

function normalizeCampaignDiceToken(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "");
}

function getCampaignDiceNumber(value) {
  const cleaned = String(value || "0")
    .replace(",", ".")
    .replace("+", "")
    .trim();

  const number = Number(cleaned);
  return Number.isFinite(number) ? number : 0;
}

function rollCampaignDiceFormula(formula, variables = {}, options = {}) {
  const originalFormula = String(formula || "").trim();
  const system = String(options.system || "").trim();

  if (!originalFormula) {
    return { ok: false, error: "Digite uma fórmula de rolagem." };
  }

  const compactFormula = originalFormula.replace(/\s+/g, "");
  const terms = compactFormula.match(/[+-]?[^+-]+/g) || [];

  if (!terms.length) {
    return { ok: false, error: "Fórmula inválida." };
  }

  const altheriumSkillInfo =
    system === "Altherium" ? getAltheriumSkillDiceFormulaInfo(terms, variables) : null;

  const isAltheriumSkillTest = Boolean(altheriumSkillInfo);

  const parts = [];
  const usedVariables = [];
  const resolvedParts = [];
  let total = 0;

  for (const rawTerm of terms) {
    let sign = 1;
    let token = rawTerm;

    if (token.startsWith("+")) token = token.slice(1);
    if (token.startsWith("-")) {
      sign = -1;
      token = token.slice(1);
    }

    if (!token) continue;

    /*
      Regra:
      - Em testes de perícia de Altherium, os pontos da perícia viram dados extras.
      - A perícia não soma como bônus.
      - Se o atributo do teste for maior que 0, rola os dados e usa o melhor.
      - Se o atributo do teste for 0, rola pelo menos 2 dados e usa o pior.
      - O símbolo # força pegar o melhor dado em qualquer rolagem.
    */
    const bestDiceMatch = token.match(/^(\d+)#d(\d+)$/i);
    const normalDiceMatch = token.match(/^(\d*)d(\d+)$/i);

    if (bestDiceMatch || normalDiceMatch) {
      const forcedBest = Boolean(bestDiceMatch);
      const baseCount = forcedBest
        ? Math.max(1, Math.min(100, Number(bestDiceMatch[1] || "1")))
        : Math.max(1, Math.min(100, Number(normalDiceMatch[1] || "1")));

      const sides = forcedBest
        ? Math.max(2, Math.min(1000, Number(bestDiceMatch[2])))
        : Math.max(2, Math.min(1000, Number(normalDiceMatch[2])));

      const skillExtraDice = isAltheriumSkillTest && !forcedBest
        ? Math.max(0, Number(altheriumSkillInfo.skillValue) || 0)
        : 0;

      const hasZeroAttributePenalty =
        isAltheriumSkillTest &&
        !forcedBest &&
        altheriumSkillInfo &&
        Number(altheriumSkillInfo.attributeValue) === 0;

      const countBeforePenalty = baseCount + skillExtraDice;
      const countAfterZeroAttributePenalty = hasZeroAttributePenalty
        ? countBeforePenalty - 1
        : countBeforePenalty;

      const count = hasZeroAttributePenalty
        ? Math.max(2, Math.min(100, countAfterZeroAttributePenalty))
        : Math.max(1, Math.min(100, countAfterZeroAttributePenalty));

      const useWorstDie = hasZeroAttributePenalty;
      const useBestDie = forcedBest || (isAltheriumSkillTest && !useWorstDie);

      const rolls = Array.from({ length: count }, () => getCampaignDiceRandomInt(sides));
      const chosen = useWorstDie
        ? Math.min(...rolls)
        : useBestDie
          ? Math.max(...rolls)
          : rolls.reduce((sum, value) => sum + value, 0);

      const subtotal = chosen * sign;
      const rawDice = forcedBest
        ? `${sign < 0 ? "-" : "+"}${baseCount}#d${sides}`
        : `${sign < 0 ? "-" : "+"}${count}d${sides}`;

      total += subtotal;

      parts.push({
        type: "dice",
        raw: rawDice,
        baseRaw: forcedBest
          ? `${baseCount}#d${sides}`
          : `${baseCount}d${sides}`,
        rolls,
        chosen,
        subtotal,
        mode: useWorstDie ? "worst" : useBestDie ? "best" : "sum",
        forcedBest,
        skillTest: isAltheriumSkillTest,
        skillExtraDice,
        skillName: altheriumSkillInfo ? altheriumSkillInfo.skillName : "",
        skillValue: altheriumSkillInfo ? altheriumSkillInfo.skillValue : 0,
        attributeName: altheriumSkillInfo ? altheriumSkillInfo.attributeName : "",
        attributeValue: altheriumSkillInfo ? altheriumSkillInfo.attributeValue : null,
        zeroAttributePenalty: hasZeroAttributePenalty,
        lostDiceByZeroAttribute: hasZeroAttributePenalty ? 1 : 0,
      });

      resolvedParts.push(`${subtotal >= 0 ? "+" : ""}${subtotal}`);
      continue;
    }

    if (/^\d+(\.\d+)?$/.test(token)) {
      const value = Number(token) * sign;
      total += value;
      parts.push({ type: "number", raw: `${sign < 0 ? "-" : "+"}${token}`, value });
      resolvedParts.push(`${value >= 0 ? "+" : ""}${value}`);
      continue;
    }

    const variableKey = normalizeCampaignDiceToken(token);

    if (Object.prototype.hasOwnProperty.call(variables, variableKey)) {
      const variableValue = Number(variables[variableKey]) || 0;

      /*
        Em Altherium, domain_* em teste de perícia representa quantidade de dados extras.
        Então não entra no total como bônus.
      */
      if (isAltheriumSkillTest && altheriumSkillInfo && variableKey === altheriumSkillInfo.skillKey) {
        usedVariables.push({
          name: token,
          value: variableValue,
          role: "skill-dice",
        });

        parts.push({
          type: "skill-dice",
          raw: `${sign < 0 ? "-" : "+"}${token}`,
          name: token,
          value: variableValue,
        });

        continue;
      }

      const value = variableValue * sign;
      total += value;
      usedVariables.push({ name: token, value: variableValue });
      parts.push({ type: "variable", raw: `${sign < 0 ? "-" : "+"}${token}`, name: token, value });
      resolvedParts.push(`${value >= 0 ? "+" : ""}${value}`);
      continue;
    }

    return {
      ok: false,
      error: `Não encontrei o valor de "${token}" na ficha.`,
    };
  }

  const normalizedTotal = Number.isInteger(total) ? total : Number(total.toFixed(2));
  const summary = buildCampaignDiceRollSummary(parts);

  return {
    ok: true,
    total: normalizedTotal,
    parts,
    usedVariables,
    summary,
    resolvedFormula: resolvedParts.join("").replace(/^\+/, ""),
  };
}

function buildCampaignDiceRollSummary(parts = []) {
  const diceParts = parts.filter((part) => part.type === "dice");
  const bonusParts = parts.filter((part) => part.type === "variable" || part.type === "number");
  const skillDiceParts = parts.filter((part) => part.type === "skill-dice");

  const diceText = diceParts
    .map((part) => {
      const raw = part.raw.replace(/^\+/, "");
      const rollsText = part.rolls.join(", ");

      if (part.mode === "worst") {
        const attrText = part.attributeName
          ? ` | atributo ${part.attributeName}: 0`
          : "";

        const penaltyText = part.lostDiceByZeroAttribute
          ? " | penalidade: -1 dado"
          : "";

        const skillText = part.skillTest
          ? ` | perícia ${part.skillName || "domínio"}: +${part.skillValue} dados`
          : "";

        return `${raw}: resultados ${rollsText} | usado pior ${part.chosen}${attrText}${penaltyText}${skillText}`;
      }

      if (part.mode === "best") {
        const skillText = part.skillTest
          ? ` | perícia ${part.skillName || "domínio"}: +${part.skillValue} dados`
          : "";

        return `${raw}: resultados ${rollsText} | usado melhor ${part.chosen}${skillText}`;
      }

      return `${raw}: resultados ${rollsText} | soma ${part.chosen}`;
    })
    .join(" • ");

  const bonusText = bonusParts
    .map((part) => {
      if (part.type === "variable") {
        const name = part.raw.replace(/^\+/, "");
        return `${name}: ${part.value}`;
      }

      const number = part.raw.replace(/^\+/, "");
      return `${number}`;
    })
    .join(" • ");

  const skillText = skillDiceParts
    .map((part) => {
      const name = part.raw.replace(/^\+/, "");
      return `${name}: ${part.value} dados extras`;
    })
    .join(" • ");

  const sections = [];

  if (diceText) sections.push(diceText);
  if (bonusText) sections.push(`Bônus: ${bonusText}`);
  if (skillText) sections.push(`Perícia: ${skillText}`);

  return sections.join(" • ") || "Rolagem feita.";
}

function getAltheriumSkillDiceFormulaInfo(terms = [], variables = {}) {
  const attributeKeys = [
    "furia",
    "destino",
    "espirito",
    "impulso",
    "estrategia",
    "runico",
    "fúria",
    "espírito",
    "estratégia",
    "rúnico",
  ].map((key) => normalizeCampaignDiceToken(key));

  let attributeKey = "";
  let attributeName = "";
  let attributeValue = null;

  for (const rawTerm of terms) {
    const token = String(rawTerm || "").replace(/^[+-]/, "");
    const normalized = normalizeCampaignDiceToken(token);

    if (!attributeKeys.includes(normalized)) continue;

    if (!Object.prototype.hasOwnProperty.call(variables, normalized)) continue;

    attributeKey = normalized;
    attributeName = token;
    attributeValue = Number(variables[normalized]) || 0;
    break;
  }

  for (const rawTerm of terms) {
    const token = String(rawTerm || "").replace(/^[+-]/, "");
    const normalized = normalizeCampaignDiceToken(token);

    const domain = ALTHERIUM_DOMAINS.find((item) => {
      return (
        normalized === normalizeCampaignDiceToken(`domain_${item.key}`) ||
        normalized === normalizeCampaignDiceToken(item.key) ||
        normalized === normalizeCampaignDiceToken(item.label)
      );
    });

    if (!domain) continue;

    const variableKeys = [
      normalizeCampaignDiceToken(`domain_${domain.key}`),
      normalizeCampaignDiceToken(domain.key),
      normalizeCampaignDiceToken(domain.label),
    ];

    const foundKey = variableKeys.find((key) =>
      Object.prototype.hasOwnProperty.call(variables, key)
    );

    const skillValue = Math.max(0, Number(foundKey ? variables[foundKey] : 0) || 0);

    return {
      skillKey: foundKey || normalizeCampaignDiceToken(`domain_${domain.key}`),
      skillName: domain.label,
      skillValue,
      attributeKey,
      attributeName,
      attributeValue,
    };
  }

  return null;
}

function isAltheriumSkillDiceFormula(terms = []) {
  return Boolean(getAltheriumSkillDiceFormulaInfo(terms, {}));
}

function getCampaignDiceRandomInt(sides) {
  const max = Math.floor(Number(sides) || 20);

  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return (array[0] % max) + 1;
  }

  return Math.floor(Math.random() * max) + 1;
}

function showCampaignDiceLocalResult({ total, label, formula, message, error = false }) {
  const resultBox = document.getElementById("campaignDiceLastResult");

  showCampaignDiceFloatingResult({
    total,
    label,
    formula,
    message,
    error,
  });

  if (!resultBox) return;

  resultBox.classList.toggle("campaign-dice-last-result--error", Boolean(error));
  resultBox.innerHTML = `
    <span>${escapeHtml(label || "Resultado")}</span>
    <strong>${escapeHtml(total)}</strong>
    <p>${escapeHtml(formula || "")} ${message ? `• ${escapeHtml(message)}` : ""}</p>
  `;
}

function showCampaignDiceFloatingResult({ total, label, formula, message, error = false, characterName = "" }) {
  const layer = getCampaignDiceToastLayer();
  if (!layer) return;

  const toast = document.createElement("article");
  toast.className = `campaign-dice-toast${error ? " campaign-dice-toast--error" : ""}`;

  toast.innerHTML = `
    <div class="campaign-dice-toast-content">
      <div class="campaign-dice-toast-info">
        <span>${escapeHtml(characterName || label || "Resultado")}</span>
        <strong>${escapeHtml(label || "Rolagem")}</strong>
        <code>${escapeHtml(formula || "")}</code>
        ${message ? `<p>${escapeHtml(message)}</p>` : ""}
      </div>

      <div class="campaign-dice-toast-total">
        ${escapeHtml(total)}
      </div>
    </div>
  `;

  layer.prepend(toast);

  requestAnimationFrame(() => {
    toast.classList.add("campaign-dice-toast--visible");
  });

  const removeToast = () => {
    toast.classList.remove("campaign-dice-toast--visible");
    window.setTimeout(() => toast.remove(), 260);
  };

  window.setTimeout(removeToast, 5000);
}

function getCampaignDiceToastLayer() {
  let layer = document.getElementById("campaignDiceToastLayer");

  if (layer) return layer;

  layer = document.createElement("div");
  layer.id = "campaignDiceToastLayer";
  layer.className = "campaign-dice-toast-layer";
  document.body.appendChild(layer);

  return layer;
}

async function renderCampaignDiceHistory() {
  const history = document.getElementById("campaignDiceHistory");
  const campaignId = getCurrentCampaignId();

  if (!history || !campaignId || !DB) return;

  const { data, error } = await DB
    .from("dice_rolls")
    .select("id, campaign_id, user_id, system, character_name, roll_label, roll_formula, total, details, created_at")
    .eq("campaign_id", String(campaignId))
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Erro ao carregar rolagens:", error);
    history.innerHTML = `
      <div class="campaign-dice-empty campaign-dice-empty--error">
        Crie a tabela dice_rolls no Supabase para ativar o histórico.
      </div>
    `;
    return;
  }

  if (!data || !data.length) {
    history.innerHTML = `
      <div class="campaign-dice-empty">
        Nenhuma rolagem ainda.
      </div>
    `;
    return;
  }

  history.innerHTML = data.map(renderCampaignDiceHistoryItem).join("");
}

function renderCampaignDiceHistoryItem(row) {
  const details = row.details || {};
  const date = row.created_at ? new Date(row.created_at) : null;
  const time = date
    ? date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return `
    <article class="campaign-dice-history-item">
      <div class="campaign-dice-history-top">
        <strong>${escapeHtml(row.character_name || "Jogador")}</strong>
        <span>${escapeHtml(time)}</span>
      </div>

      <div class="campaign-dice-history-middle">
        <div>
          <p>${escapeHtml(row.roll_label || "Rolagem")}</p>
          <code>${escapeHtml(row.roll_formula || "")}</code>
        </div>

        <b>${escapeHtml(row.total)}</b>
      </div>

      <small>${escapeHtml(details.summary || "")}</small>
    </article>
  `;
}

function subscribeDiceRollsRealtime() {
  const campaignId = getCurrentCampaignId();

  if (!campaignId || !DB) return;

  if (diceRealtimeChannel) DB.removeChannel(diceRealtimeChannel);

  diceRealtimeChannel = DB
    .channel(`dice-rolls-${campaignId}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "dice_rolls", filter: `campaign_id=eq.${campaignId}` },
      async () => {
        await renderCampaignDiceHistory();
      }
    )
    .subscribe();
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
      { event: "*", schema: "public", table: "campaign_initiative_state", filter: `campaign_id=eq.${campaignId}` },
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
   CORTAR / REDIMENSIONAR IMAGEM ANTES DO UPLOAD
========================================================= */

function openCampaignLabImageCropper(file, options = {}) {
  return new Promise((resolve) => {
    if (!file || !file.type || !file.type.startsWith("image/")) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const cropWidth = Number(options.cropWidth) || 360;
        const cropHeight = Number(options.cropHeight) || cropWidth;
        const outputWidth = Number(options.outputWidth || options.outputSize) || 720;
        const outputHeight = Number(options.outputHeight || options.outputSize) || outputWidth;
        const isRectangle = options.mask === "rectangle";
        const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
        const minZoom = Number(options.minZoom) || 0.2;
        const maxZoom = Number(options.maxZoom) || 4;

        let minScale = Math.max(cropWidth / image.naturalWidth, cropHeight / image.naturalHeight);
        let zoom = Math.max(minZoom, Math.min(maxZoom, Number(options.initialZoom) || 1));
        let offsetX = 0;
        let offsetY = 0;
        let dragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let startOffsetX = 0;
        let startOffsetY = 0;

        const modal = document.createElement("div");
        modal.className = `image-cropper-modal${isRectangle ? " image-cropper-modal--rectangle" : ""}`;
        modal.innerHTML = `
          <div class="image-cropper-box" role="dialog" aria-modal="true">
            <div class="image-cropper-header">
              <div>
                <span>${escapeHtml(options.kicker || "Editar imagem")}</span>
                <h2>${escapeHtml(options.title || "Cortar imagem")}</h2>
                <p>${escapeHtml(options.helperText || "Arraste a imagem e use o zoom para enquadrar melhor.")}</p>
              </div>

              <button type="button" class="image-cropper-close" data-crop-cancel>×</button>
            </div>

            <div
              class="image-cropper-stage-wrap"
              style="--image-cropper-stage-w: ${cropWidth}px; --image-cropper-stage-h: ${cropHeight}px; --image-cropper-stage-ratio: ${cropWidth} / ${cropHeight};"
            >
              <canvas
                class="image-cropper-canvas"
                width="${cropWidth}"
                height="${cropHeight}"
              ></canvas>
              <div class="image-cropper-circle-mask${isRectangle ? " image-cropper-rect-mask" : ""}"></div>
            </div>

            <div class="image-cropper-controls">
              <label>
                <span>Zoom</span>
                <input
                  type="range"
                  min="${minZoom}"
                  max="${maxZoom}"
                  step="0.01"
                  value="${zoom}"
                  data-crop-zoom
                />
              </label>

              <div class="image-cropper-tips">
                <span>Mouse/toque: arrastar</span>
                <span>Scroll para baixo: zoom out</span>
              </div>
            </div>

            <div class="image-cropper-actions">
              <button type="button" class="image-cropper-btn secondary" data-crop-center>
                Centralizar
              </button>

              <button type="button" class="image-cropper-btn secondary" data-crop-cancel>
                Cancelar
              </button>

              <button type="button" class="image-cropper-btn primary" data-crop-confirm>
                ${escapeHtml(options.buttonText || "Usar imagem")}
              </button>
            </div>
          </div>
        `;

        document.body.appendChild(modal);

        const canvas = modal.querySelector(".image-cropper-canvas");
        const context = canvas.getContext("2d");
        const zoomInput = modal.querySelector("[data-crop-zoom]");

        function clampOffsets() {
          const scale = minScale * zoom;
          const width = image.naturalWidth * scale;
          const height = image.naturalHeight * scale;

          /*
            Permite arrastar mesmo quando a imagem está em zoom out.
            Antes, quando a imagem ficava menor que a área de corte, o limite virava 0
            e a imagem travava no centro. Agora o usuário consegue reposicionar a imagem
            dentro da área visível sem ela sumir completamente.
          */
          const maxOffsetX = Math.abs(width - cropWidth) / 2;
          const maxOffsetY = Math.abs(height - cropHeight) / 2;

          offsetX = Math.max(-maxOffsetX, Math.min(maxOffsetX, offsetX));
          offsetY = Math.max(-maxOffsetY, Math.min(maxOffsetY, offsetY));
        }

        function drawPreview() {
          clampOffsets();

          const scale = minScale * zoom;
          const width = image.naturalWidth * scale;
          const height = image.naturalHeight * scale;
          const x = cropWidth / 2 - width / 2 + offsetX;
          const y = cropHeight / 2 - height / 2 + offsetY;

          context.clearRect(0, 0, cropWidth, cropHeight);
          context.fillStyle = "#020617";
          context.fillRect(0, 0, cropWidth, cropHeight);
          context.drawImage(image, x, y, width, height);
        }

        function getPointerPosition(event) {
          if (event.touches && event.touches[0]) {
            return {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
            };
          }

          return {
            x: event.clientX,
            y: event.clientY,
          };
        }

        function startDrag(event) {
          event.preventDefault();

          const point = getPointerPosition(event);

          dragging = true;
          dragStartX = point.x;
          dragStartY = point.y;
          startOffsetX = offsetX;
          startOffsetY = offsetY;

          canvas.classList.add("is-dragging");
        }

        function moveDrag(event) {
          if (!dragging) return;

          event.preventDefault();

          const point = getPointerPosition(event);

          offsetX = startOffsetX + (point.x - dragStartX);
          offsetY = startOffsetY + (point.y - dragStartY);

          drawPreview();
        }

        function endDrag() {
          dragging = false;
          canvas.classList.remove("is-dragging");
        }

        function centerCropImage() {
          offsetX = 0;
          offsetY = 0;
          if (zoomInput) zoomInput.value = String(zoom);
          drawPreview();
        }

        function changeZoom(newZoom, anchorEvent = null) {
          const oldZoom = zoom;
          zoom = Math.max(minZoom, Math.min(maxZoom, Number(newZoom) || 1));

          if (anchorEvent) {
            const ratio = zoom / oldZoom;
            offsetX *= ratio;
            offsetY *= ratio;
          }

          if (zoomInput) zoomInput.value = String(zoom);

          drawPreview();
        }

        function createCroppedFile() {
          return new Promise((cropResolve) => {
            const outputCanvas = document.createElement("canvas");
            outputCanvas.width = outputWidth;
            outputCanvas.height = outputHeight;

            const outputContext = outputCanvas.getContext("2d");
            const ratioX = outputWidth / cropWidth;
            const ratioY = outputHeight / cropHeight;
            const scaleX = minScale * zoom * ratioX;
            const scaleY = minScale * zoom * ratioY;
            const width = image.naturalWidth * scaleX;
            const height = image.naturalHeight * scaleY;
            const x = outputWidth / 2 - width / 2 + offsetX * ratioX;
            const y = outputHeight / 2 - height / 2 + offsetY * ratioY;

            outputContext.fillStyle = "#020617";
            outputContext.fillRect(0, 0, outputWidth, outputHeight);
            outputContext.drawImage(image, x, y, width, height);

            outputCanvas.toBlob(
              (blob) => {
                if (!blob) {
                  cropResolve(null);
                  return;
                }

                const extension = mimeType === "image/png" ? "png" : "jpg";
                const suffix = String(options.fileNameSuffix || "cortada")
                  .replace(/[^a-zA-Z0-9_-]/g, "-");
                const baseName = String(file.name || "imagem")
                  .replace(/\.[^/.]+$/, "")
                  .replace(/[^a-zA-Z0-9_-]/g, "-");

                const croppedFile = new File(
                  [blob],
                  `${baseName}-${suffix}.${extension}`,
                  { type: mimeType }
                );

                cropResolve(croppedFile);
              },
              mimeType,
              0.92
            );
          });
        }

        function closeModal(result) {
          modal.remove();
          resolve(result);
        }

        canvas.addEventListener("mousedown", startDrag);
        window.addEventListener("mousemove", moveDrag);
        window.addEventListener("mouseup", endDrag);

        canvas.addEventListener("touchstart", startDrag, { passive: false });
        window.addEventListener("touchmove", moveDrag, { passive: false });
        window.addEventListener("touchend", endDrag);

        canvas.addEventListener("wheel", (event) => {
          event.preventDefault();

          const direction = event.deltaY > 0 ? -0.1 : 0.1;
          changeZoom(zoom + direction, event);
        });

        if (zoomInput) {
          zoomInput.addEventListener("input", () => {
            changeZoom(zoomInput.value);
          });
        }

        const centerButton = modal.querySelector("[data-crop-center]");
        if (centerButton) {
          centerButton.addEventListener("click", centerCropImage);
        }

        modal.querySelectorAll("[data-crop-cancel]").forEach((button) => {
          button.addEventListener("click", () => closeModal(null));
        });

        const confirmButton = modal.querySelector("[data-crop-confirm]");
        if (confirmButton) {
          confirmButton.addEventListener("click", async () => {
            confirmButton.disabled = true;
            confirmButton.textContent = "Processando...";

            const cropped = await createCroppedFile();
            closeModal(cropped);
          });
        }

        modal.addEventListener("click", (event) => {
          if (event.target === modal) closeModal(null);
        });

        window.addEventListener(
          "keydown",
          function handleEscape(event) {
            if (event.key === "Escape" && document.body.contains(modal)) {
              event.preventDefault();
              window.removeEventListener("keydown", handleEscape);
              closeModal(null);
            }
          },
          { once: false }
        );

        centerCropImage();
      };

      image.onerror = () => {
        alert("Não foi possível carregar essa imagem.");
        resolve(null);
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      alert("Não foi possível ler essa imagem.");
      resolve(null);
    };

    reader.readAsDataURL(file);
  });
}

/* =========================================================
   FOTO DO PERSONAGEM
========================================================= */

const CHARACTER_PORTRAIT_BUCKET = "character-portraits";
const CHARACTER_PORTRAIT_MAX_SIZE = 5 * 1024 * 1024;

function setupCharacterPortraitControls() {
  injectCharacterPortraitFloatingRightStyles();

  if (window.characterPortraitControlsReady) return;

  window.characterPortraitControlsReady = true;

  document.addEventListener("change", async (event) => {
    const input = event.target.closest("[data-character-portrait-input]");
    if (!input) return;

    const file = input.files && input.files[0];
    if (!file) return;

    await uploadCharacterPortraitFromInput(input, file);
    input.value = "";
  });

  const refreshPortraitPanelPosition = () => {
    if (window.characterPortraitRefreshFrame) {
      cancelAnimationFrame(window.characterPortraitRefreshFrame);
    }

    window.characterPortraitRefreshFrame = requestAnimationFrame(() => {
      refreshCharacterPortraitFloatingPanels();
    });
  };

  window.addEventListener("resize", refreshPortraitPanelPosition);
  window.addEventListener("scroll", refreshPortraitPanelPosition, { passive: true });
}


function buildCharacterPortraitField(sheet = {}, system = "Altherium") {
  const imageUrl = getCharacterPortraitUrl(sheet);

  return `
    <div class="character-portrait-field character-portrait-field--side" data-character-portrait-field>
      <input
        type="hidden"
        name="characterAvatarUrl"
        value="${escapeHtml(imageUrl)}"
        data-character-portrait-url
      />

      <input
        type="hidden"
        name="characterPortraitUrl"
        value="${escapeHtml(imageUrl)}"
        data-character-portrait-url-secondary
      />

      <div class="character-portrait-field__preview" data-character-portrait-preview>
        ${getCharacterPortraitHtml(sheet, "large")}
      </div>

      <div class="character-portrait-field__content">
        <span>Imagem do personagem</span>
        <strong>${escapeHtml(sheet.characterName || "Personagem")}</strong>
        <p>Essa imagem aparece para o mestre na área de personagens.</p>

        <label class="character-portrait-upload-btn">
          Escolher imagem
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
            data-character-portrait-input
            data-character-system="${escapeHtml(system)}"
            hidden
          />
        </label>
      </div>
    </div>
  `;
}

function isPlayerCharacterSheetForm(form) {
  return Boolean(
    form &&
      (form.id === "playerSheetForm" || form.id === "dndPlayerSheetForm")
  );
}

function getCharacterSheetElement(form) {
  if (!form) return null;

  if (form.matches(".altherium-rune-sheet, .dnd-character-sheet")) {
    return form;
  }

  return form.querySelector(".altherium-rune-sheet, .dnd-character-sheet");
}

function getCharacterSheetReferenceElement(form) {
  if (!form) return null;

  return (
    form.querySelector(".rune-paper-page, .dnd-paper-page") ||
    getCharacterSheetElement(form) ||
    form
  );
}

function ensureCharacterPortraitFieldInForm(form, sheet = {}, system = "Altherium") {
  if (!form) return;

  let field = form.querySelector("[data-character-portrait-field]");

  if (!field) {
    form.insertAdjacentHTML("afterbegin", buildCharacterPortraitField(sheet, system));
    field = form.querySelector("[data-character-portrait-field]");
  }

  if (!field) return;

  field.classList.remove("character-portrait-force-right");
  field.classList.add("character-portrait-field--side");

  ensureCharacterPortraitFloatingLayout(form, field);
  updateCharacterPortraitFields(form, sheet);
}

function ensureCharacterPortraitFloatingLayout(form, field = null) {
  if (!form) return;

  injectCharacterPortraitFloatingRightStyles();

  const portraitField = field || form.querySelector("[data-character-portrait-field]");
  if (!portraitField) return;

  if (isPlayerCharacterSheetForm(form)) {
    positionPlayerCharacterPortraitField(form, portraitField);
  }
}

function positionPlayerCharacterPortraitField(form, portraitField) {
  if (!form || !portraitField) return;

  const isSmallScreen = window.innerWidth < 1100;
  const panelWidth = 250;
  const topOffset = 116;
  const sideGap = 18;
  const sheetReference = getCharacterSheetReferenceElement(form);

  form.style.setProperty("position", "relative", "important");
  portraitField.style.setProperty("box-sizing", "border-box", "important");
  portraitField.style.setProperty("display", "flex", "important");
  portraitField.style.setProperty("width", `${panelWidth}px`, "important");
  portraitField.style.setProperty("max-width", `${panelWidth}px`, "important");
  portraitField.style.setProperty("min-width", "0", "important");
  portraitField.style.setProperty("margin", "0", "important");
  portraitField.style.setProperty("z-index", "999999", "important");
  portraitField.style.setProperty("transform", "none", "important");

  if (isSmallScreen) {
    portraitField.style.setProperty("position", "relative", "important");
    portraitField.style.setProperty("top", "auto", "important");
    portraitField.style.setProperty("right", "auto", "important");
    portraitField.style.setProperty("bottom", "auto", "important");
    portraitField.style.setProperty("left", "auto", "important");
    portraitField.style.setProperty("width", "min(720px, 100%)", "important");
    portraitField.style.setProperty("max-width", "720px", "important");
    portraitField.style.setProperty("margin", "0 auto 24px", "important");
    portraitField.style.setProperty("z-index", "20", "important");
    return;
  }

  positionScopedFloatingElement({
    element: portraitField,
    container: form,
    horizontalReference: sheetReference,
    side: "right",
    gap: sideGap,
    width: panelWidth,
    topOffset,
  });
}

function injectCharacterPortraitFloatingRightStyles() {
  const oldStyle = document.getElementById("character-portrait-floating-right-style");
  if (oldStyle) oldStyle.remove();

  const style = document.createElement("style");
  style.id = "character-portrait-floating-right-style";

  style.textContent = `
    @media (min-width: 1100px) {
      #playerSheetForm,
      #dndPlayerSheetForm {
        position: relative !important;
      }

      #playerSheetForm > .character-portrait-field,
      #dndPlayerSheetForm > .character-portrait-field {
        width: 250px !important;
        max-width: 250px !important;
        margin: 0 !important;
        padding: 18px !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
      }

      #playerSheetForm > .character-portrait-field .character-portrait-field__content,
      #dndPlayerSheetForm > .character-portrait-field .character-portrait-field__content {
        text-align: center !important;
      }

      #playerSheetForm > .character-portrait-field .character-portrait-upload-btn,
      #dndPlayerSheetForm > .character-portrait-field .character-portrait-upload-btn {
        width: 100% !important;
      }
    }

    @media (max-width: 1099px) {
      #playerSheetForm > .character-portrait-field,
      #dndPlayerSheetForm > .character-portrait-field {
        position: relative !important;
        top: auto !important;
        right: auto !important;
        bottom: auto !important;
        left: auto !important;
        width: min(720px, 100%) !important;
        max-width: 720px !important;
        margin: 0 auto 24px !important;
        z-index: 20 !important;
      }
    }

    .rune-page-header > .character-portrait-field,
    .dnd-banner > .character-portrait-field {
      display: none !important;
    }

    .altherium-modal .character-floating-portrait-panel,
    .altherium-sheet-modal-box .character-floating-portrait-panel,
    .dnd-sheet-modal-box .character-floating-portrait-panel {
      position: sticky !important;
      top: 0 !important;
      right: auto !important;
      left: auto !important;
      bottom: auto !important;
      z-index: 20 !important;
      transform: none !important;
    }
  `;

  document.head.appendChild(style);
}




/* =========================================================
   BOTÃO SALVAR FICHA FIXO À ESQUERDA
========================================================= */

function setupFloatingSheetSaveButton() {
  injectFloatingSheetSaveButtonStyles();

  if (window.floatingSheetSaveButtonReady) {
    positionFloatingSheetSaveButtons();
    return;
  }

  window.floatingSheetSaveButtonReady = true;

  const refreshSaveButtonPosition = () => {
    if (window.floatingSheetSaveButtonFrame) {
      cancelAnimationFrame(window.floatingSheetSaveButtonFrame);
    }

    window.floatingSheetSaveButtonFrame = requestAnimationFrame(() => {
      positionFloatingSheetSaveButtons();
    });
  };

  window.addEventListener("resize", refreshSaveButtonPosition);
  window.addEventListener("scroll", refreshSaveButtonPosition, { passive: true });

  refreshSaveButtonPosition();

  let tries = 0;
  const interval = setInterval(() => {
    positionFloatingSheetSaveButtons();
    tries += 1;

    if (tries >= 20) clearInterval(interval);
  }, 250);
}

function getFloatingSheetSaveButtons() {
  return [
    document.getElementById("savePlayerSheet"),
    document.getElementById("saveDndSheet"),
  ].filter(Boolean);
}

function positionFloatingSheetSaveButtons() {
  const buttons = getFloatingSheetSaveButtons();
  if (!buttons.length) return;

  const isSmallScreen = window.innerWidth < 1100;
  const buttonWidth = 220;
  const topOffset = 116;
  const sideGap = 18;

  buttons.forEach((button) => {
    const wrapper = getFloatingSheetSaveScope(button);
    const sheetReference = wrapper ? getCharacterSheetReferenceElement(wrapper) : null;

    button.classList.add("sheet-save-floating-button");
    button.type = "button";

    if (wrapper) {
      wrapper.style.setProperty("position", "relative", "important");

      /*
        O botão original fica na toolbar, fora do form.
        Para o position:absolute seguir a ficha de verdade,
        o botão precisa virar filho do form da ficha.
      */
      if (button.parentElement !== wrapper) {
        wrapper.insertAdjacentElement("afterbegin", button);
      }
    }

    if (isSmallScreen || !wrapper) {
      button.style.setProperty("position", "relative", "important");
      button.style.setProperty("top", "auto", "important");
      button.style.setProperty("left", "auto", "important");
      button.style.setProperty("right", "auto", "important");
      button.style.setProperty("bottom", "auto", "important");
      button.style.setProperty("width", "100%", "important");
      button.style.setProperty("max-width", "100%", "important");
      button.style.setProperty("margin", "16px 0 0", "important");
      button.style.setProperty("z-index", "20", "important");
      button.style.setProperty("transform", "none", "important");
      button.style.setProperty("display", "inline-flex", "important");
      return;
    }

    positionScopedFloatingElement({
      element: button,
      container: wrapper,
      horizontalReference: sheetReference,
      side: "left",
      gap: sideGap,
      width: buttonWidth,
      topOffset,
    });
  });
}

function getFloatingSheetSaveScope(button) {
  if (!button) return null;

  return (
    document.getElementById("playerSheetForm") ||
    document.getElementById("dndPlayerSheetForm") ||
    button.closest("#playerSheetForm") ||
    button.closest("#dndPlayerSheetForm")
  );
}

function positionScopedFloatingElement(config) {
  const {
    element,
    container,
    horizontalReference,
    side,
    absoluteSideValue,
    gap = 18,
    width,
    topOffset,
  } = config;

  if (!element || !container) return;

  const containerRect = container.getBoundingClientRect();
  const referenceRect = horizontalReference
    ? horizontalReference.getBoundingClientRect()
    : containerRect;
  const elementHeight = Math.max(element.offsetHeight || 0, 80);
  const containerHeight = Math.max(
    container.scrollHeight || containerRect.height || 0,
    elementHeight
  );
  const containerDocumentTop = window.scrollY + containerRect.top;
  const desiredTop = window.scrollY + topOffset - containerDocumentTop;
  const maxAbsoluteTop = Math.max(0, containerHeight - elementHeight);
  const safeTop = Math.max(0, Math.min(maxAbsoluteTop, desiredTop));

  let leftValue;

  if (horizontalReference) {
    const referenceLeftInsideContainer = referenceRect.left - containerRect.left;

    if (side === "left") {
      leftValue = referenceLeftInsideContainer - width - gap;
    } else {
      leftValue = referenceLeftInsideContainer + referenceRect.width + gap;
    }
  } else if (side === "left") {
    leftValue = typeof absoluteSideValue === "number" ? absoluteSideValue : -width - gap;
  } else {
    const containerWidth = containerRect.width || container.offsetWidth || 0;
    const rightValue = typeof absoluteSideValue === "number" ? absoluteSideValue : -width - gap;
    leftValue = containerWidth - width - rightValue;
  }

  element.style.setProperty("position", "absolute", "important");
  element.style.setProperty("top", `${safeTop}px`, "important");
  element.style.setProperty("left", `${leftValue}px`, "important");
  element.style.setProperty("right", "auto", "important");
  element.style.removeProperty("bottom");

  element.style.setProperty("width", `${width}px`, "important");
  element.style.setProperty("max-width", `${width}px`, "important");
  element.style.setProperty("margin", "0", "important");
  element.style.setProperty("z-index", "999999", "important");
  element.style.setProperty("display", "flex", "important");
  element.style.setProperty("opacity", "1", "important");
  element.style.setProperty("visibility", "visible", "important");
  element.style.setProperty("pointer-events", "auto", "important");
  element.style.setProperty("transform", "none", "important");
}
function injectFloatingSheetSaveButtonStyles() {
  const oldStyle = document.getElementById("floating-sheet-save-button-style");
  if (oldStyle) oldStyle.remove();

  const style = document.createElement("style");
  style.id = "floating-sheet-save-button-style";

  style.textContent = `
    .altherium-sheet-wrapper,
    .dnd-sheet-wrapper {
      position: relative !important;
    }

    @media (min-width: 1100px) {
      html body.altherium-player-page #savePlayerSheet,
      html body.dnd-player-page #saveDndSheet,
      html body .sheet-save-floating-button {
        width: 220px !important;
        max-width: 220px !important;
        min-height: 58px !important;
        margin: 0 !important;
        z-index: 999999 !important;
        border-radius: 20px !important;
        transform: none !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow:
          0 18px 44px rgba(0, 0, 0, 0.34),
          0 0 32px rgba(34, 211, 238, 0.22) !important;
      }

      html body.altherium-player-page #savePlayerSheet:hover,
      html body.dnd-player-page #saveDndSheet:hover,
      html body .sheet-save-floating-button:hover {
        transform: translateY(-2px) !important;
      }
    }

    @media (max-width: 1099px) {
      html body.altherium-player-page #savePlayerSheet,
      html body.dnd-player-page #saveDndSheet,
      html body .sheet-save-floating-button {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        right: auto !important;
        bottom: auto !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 16px 0 0 !important;
        z-index: 20 !important;
        transform: none !important;
      }
    }
  `;

  document.head.appendChild(style);
}


async function uploadCharacterPortraitFromInput(input, file) {
  const form = input.closest("form");

  if (!form) {
    alert("Formulário da ficha não encontrado.");
    return;
  }

  if (!DB || !DB.storage) {
    alert("Supabase Storage não carregou.");
    return;
  }

  if (!file.type || !file.type.startsWith("image/")) {
    alert("Escolha um arquivo de imagem.");
    return;
  }

  if (file.size > CHARACTER_PORTRAIT_MAX_SIZE) {
    alert("A imagem precisa ter no máximo 5MB.");
    return;
  }

  const croppedFile = await openCampaignLabImageCropper(file, {
    title: "Cortar imagem do personagem",
  });

  if (!croppedFile) return;

  file = croppedFile;

  const user = getLoggedUserFromSession();
  const campaign = await getCurrentCampaign(true);

  if (!user || !campaign) {
    alert("Campanha ou usuário não encontrado.");
    return;
  }

  const system = input.dataset.characterSystem || sessionStorage.getItem("system") || "Sistema";
  const uploadButton = input.closest(".character-portrait-upload-btn");
  const oldText = uploadButton ? uploadButton.childNodes[0].textContent.trim() : "";

  if (uploadButton) {
    uploadButton.childNodes[0].textContent = "Enviando...";
    uploadButton.classList.add("is-loading");
  }

  const extension = getFileExtension(file.name, file.type);
  const safeCampaignId = String(campaign.id).replace(/[^a-zA-Z0-9_-]/g, "-");
  const safeUserId = String(user.id).replace(/[^a-zA-Z0-9_-]/g, "-");
  const safeSystem = String(system).replace(/[^a-zA-Z0-9_-]/g, "-");
  const filePath = `${safeCampaignId}/${safeSystem}/${safeUserId}/portrait-${Date.now()}.${extension}`;

  const { error: uploadError } = await DB.storage
    .from(CHARACTER_PORTRAIT_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    console.error("Erro ao enviar imagem do personagem:", uploadError);
    alert(
      "Erro ao enviar imagem do personagem. Verifique se o bucket character-portraits foi criado."
    );

    if (uploadButton) {
      uploadButton.childNodes[0].textContent = oldText || "Escolher imagem";
      uploadButton.classList.remove("is-loading");
    }

    return;
  }

  const { data: publicData } = DB.storage
    .from(CHARACTER_PORTRAIT_BUCKET)
    .getPublicUrl(filePath);

  const imageUrl = `${publicData.publicUrl}?v=${Date.now()}`;

  const urlInput = form.querySelector("[data-character-portrait-url]");
  const secondaryUrlInput = form.querySelector("[data-character-portrait-url-secondary]");

  if (urlInput) urlInput.value = imageUrl;
  if (secondaryUrlInput) secondaryUrlInput.value = imageUrl;

  updateCharacterPortraitFields(form, {
    ...Object.fromEntries(new FormData(form)),
    characterAvatarUrl: imageUrl,
    characterPortraitUrl: imageUrl,
  });

  if (form.id === "playerSheetForm") {
    await savePlayerSheet(false);
  } else if (form.id === "dndPlayerSheetForm") {
    await saveDndPlayerSheet(false);
  } else if (form.id === "altheriumForm" && form.dataset.mode === "edit-sheet") {
    await saveSheetFromModal(false);
  } else if (form.id === "dndForm" && form.dataset.mode === "edit-dnd-sheet") {
    await saveDndSheetFromModal(false);
  }

  if (uploadButton) {
    uploadButton.childNodes[0].textContent = oldText || "Escolher imagem";
    uploadButton.classList.remove("is-loading");
  }
}

function updateCharacterPortraitFields(form, sheet = {}) {
  if (!form) return;

  const existingField = form.querySelector("[data-character-portrait-field]");
  if (existingField) ensureCharacterPortraitFloatingLayout(form, existingField);

  const imageUrl = getCharacterPortraitUrl(sheet);
  const preview = form.querySelector("[data-character-portrait-preview]");
  const urlInput = form.querySelector("[data-character-portrait-url]");
  const secondaryUrlInput = form.querySelector("[data-character-portrait-url-secondary]");

  if (urlInput && imageUrl) urlInput.value = imageUrl;
  if (secondaryUrlInput && imageUrl) secondaryUrlInput.value = imageUrl;

  if (preview) {
    preview.innerHTML = getCharacterPortraitHtml(sheet, "large");
  }
}

function getCharacterPortraitUrl(sheet = {}) {
  return sheet.characterAvatarUrl || sheet.characterPortraitUrl || sheet.character_image_url || "";
}

function getCharacterPortraitHtml(sheet = {}, size = "small") {
  const name = sheet.characterName || sheet.personagem || sheet.ownerName || "Personagem";
  const imageUrl = getCharacterPortraitUrl(sheet);
  const initials = getProfileInitials(name);

  return `
    <span class="character-portrait character-portrait--${size}" title="${escapeHtml(name)}">
      <span class="character-portrait__fallback">${escapeHtml(initials)}</span>
      ${
        imageUrl
          ? `<img src="${escapeHtml(imageUrl)}" alt="Imagem de ${escapeHtml(name)}" loading="lazy" />`
          : ""
      }
    </span>
  `;
}

function refreshCharacterPortraitFloatingPanels() {
  document.querySelectorAll("form").forEach((form) => {
    const field = form.querySelector("[data-character-portrait-field]");
    if (field) ensureCharacterPortraitFloatingLayout(form, field);
  });

  positionCampaignDiceWidgetNearPortrait();
}

/* =========================================================
   AVATAR / FOTO DE PERFIL
========================================================= */

const PROFILE_AVATAR_BUCKET = "profile-avatars";
const PROFILE_AVATAR_MAX_SIZE = 5 * 1024 * 1024;

async function renderProfileAvatarPanel(user) {
  if (!document.body.classList.contains("my-campaigns-page")) return;
  if (!user) return;

  const profile = await getProfileById(user.id, true);

  const oldPanel = document.getElementById("profileAvatarPanel");
  if (oldPanel) oldPanel.remove();

  const panel = document.createElement("section");
  panel.id = "profileAvatarPanel";
  panel.className = "profile-avatar-panel";

  panel.innerHTML = `
    <div class="profile-avatar-panel__left">
      ${getProfileAvatarHtml(profile || user, "large")}

      <div>
        <span>Meu perfil</span>
        <h2>${escapeHtml(profile?.name || user.nome || user.name || user.id)}</h2>
        <p>Essa imagem aparece nos players logados e nos cards das fichas.</p>
      </div>
    </div>

    <div class="profile-avatar-panel__actions">
      <label class="profile-avatar-upload-btn" for="profileAvatarInput">
        Escolher imagem
      </label>

      <input
        id="profileAvatarInput"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        hidden
      />
    </div>
  `;

  const target =
    document.querySelector(".campaigns-area") ||
    document.querySelector(".altherium-main") ||
    document.querySelector("main");

  if (target && target.parentNode) {
    target.parentNode.insertBefore(panel, target);
  } else {
    document.body.appendChild(panel);
  }

  const input = panel.querySelector("#profileAvatarInput");

  if (input) {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];

      if (!file) return;

      await uploadCurrentUserProfileAvatar(file, user, panel);
      input.value = "";
    });
  }
}

async function uploadCurrentUserProfileAvatar(file, user, panel) {
  if (!DB || !DB.storage) {
    alert("Supabase Storage não carregou.");
    return;
  }

  if (!file.type || !file.type.startsWith("image/")) {
    alert("Escolha um arquivo de imagem.");
    return;
  }

  if (file.size > PROFILE_AVATAR_MAX_SIZE) {
    alert("A imagem precisa ter no máximo 5MB.");
    return;
  }

  const croppedFile = await openCampaignLabImageCropper(file, {
    title: "Cortar foto de perfil",
  });

  if (!croppedFile) return;

  file = croppedFile;

  const uploadButton = panel ? panel.querySelector(".profile-avatar-upload-btn") : null;
  const oldButtonText = uploadButton ? uploadButton.textContent : "";

  if (uploadButton) {
    uploadButton.textContent = "Enviando...";
    uploadButton.classList.add("is-loading");
  }

  const extension = getFileExtension(file.name, file.type);
  const safeUserId = String(user.id).replace(/[^a-zA-Z0-9_-]/g, "-");
  const filePath = `${safeUserId}/avatar-${Date.now()}.${extension}`;

  const { error: uploadError } = await DB.storage
    .from(PROFILE_AVATAR_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    console.error("Erro ao enviar avatar:", uploadError);
    alert(
      "Erro ao enviar imagem. Verifique se o bucket profile-avatars foi criado no Supabase."
    );

    if (uploadButton) {
      uploadButton.textContent = oldButtonText || "Escolher imagem";
      uploadButton.classList.remove("is-loading");
    }

    return;
  }

  const { data: publicData } = DB.storage
    .from(PROFILE_AVATAR_BUCKET)
    .getPublicUrl(filePath);

  const avatarUrl = `${publicData.publicUrl}?v=${Date.now()}`;

  const { error: updateError } = await DB
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", user.id);

  if (updateError) {
    console.error("Erro ao salvar avatar no profile:", updateError);
    alert("Imagem enviada, mas houve erro ao salvar o link no perfil.");

    if (uploadButton) {
      uploadButton.textContent = oldButtonText || "Escolher imagem";
      uploadButton.classList.remove("is-loading");
    }

    return;
  }

  profilesCache = await getProfiles(true);

  await renderMyCampaignsPage();

  if (uploadButton) {
    uploadButton.textContent = oldButtonText || "Escolher imagem";
    uploadButton.classList.remove("is-loading");
  }
}

function getFileExtension(fileName, mimeType = "") {
  const nameExtension = String(fileName || "").split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "webp", "gif"].includes(nameExtension)) {
    return nameExtension === "jpeg" ? "jpg" : nameExtension;
  }

  if (mimeType.includes("png")) return "png";
  if (mimeType.includes("webp")) return "webp";
  if (mimeType.includes("gif")) return "gif";

  return "jpg";
}

async function getProfileById(profileId, force = false) {
  const profiles = await getProfiles(force);
  return profiles.find((profile) => profile.id === profileId) || null;
}

function getProfileAvatarHtml(profile, size = "small") {
  const safeProfile = profile || {};
  const name = safeProfile.name || safeProfile.nome || safeProfile.id || "?";
  const initials = getProfileInitials(name);
  const avatarUrl = safeProfile.avatar_url || safeProfile.avatarUrl || "";

  return `
    <span class="profile-avatar profile-avatar--${size}" title="${escapeHtml(name)}">
      <span class="profile-avatar__fallback">${escapeHtml(initials)}</span>
      ${
        avatarUrl
          ? `<img src="${escapeHtml(avatarUrl)}" alt="Avatar de ${escapeHtml(name)}" loading="lazy" />`
          : ""
      }
    </span>
  `;
}

function getProfileInitials(name) {
  const cleanName = String(name || "?").trim();

  if (!cleanName) return "?";

  const parts = cleanName.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return cleanName.slice(0, 2).toUpperCase();
}

async function renderInlineAvatarNearElement(elementId, profileId) {
  const element = document.getElementById(elementId);
  if (!element || !profileId) return;

  const profile = await getProfileById(profileId);
  if (!profile) return;

  const wrapperClass = "inline-player-avatar-wrap";
  const parent = element.parentElement;

  if (!parent) return;

  if (parent.classList.contains(wrapperClass)) {
    const oldAvatar = parent.querySelector(".profile-avatar");
    if (oldAvatar) oldAvatar.outerHTML = getProfileAvatarHtml(profile, "tiny");
    return;
  }

  const wrapper = document.createElement("span");
  wrapper.className = wrapperClass;
  wrapper.innerHTML = getProfileAvatarHtml(profile, "tiny");

  parent.insertBefore(wrapper, element);
  wrapper.appendChild(element);
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
    await renderCampaignOnlinePlayersPanel();
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
    await renderCampaignOnlinePlayersPanel();
  }

  await setupMasterCampaignName();
}

async function refreshCurrentPlayerPanel() {
  if (document.body.classList.contains("altherium-player-page")) {
    await loadSheetIntoPlayerForm();
    await renderInitiativeBoard(getAltheriumPlayerInitiativeConfig());
    await renderCampaignOnlinePlayersPanel();
  }

  if (document.body.classList.contains("dnd-player-page")) {
    await loadDndSheetIntoPlayerForm();
    await renderInitiativeBoard(getDndPlayerInitiativeConfig());
    await renderCampaignOnlinePlayersPanel();
  }
}

async function setupMasterCampaignName() {
  const campaignName = sessionStorage.getItem("campaignName");
  setText("masterCampaignName", campaignName || "Campanha não identificada");
}

async function setupPlayerInfo(playerElementId, campaignElementId) {
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

function setDndHpBarFillWithTemp(currentValue, maxValue, tempValue) {
  const hpFill = document.getElementById("dndHpBarFill");
  if (!hpFill) return;

  const hpBar = hpFill.closest(".dnd-hp-bar");
  if (!hpBar) {
    setBarFill("dndHpBarFill", currentValue, maxValue);
    return;
  }

  let tempFill = document.getElementById("dndHpTempBarFill");

  if (!tempFill) {
    tempFill = document.createElement("div");
    tempFill.id = "dndHpTempBarFill";
    tempFill.className = "dnd-hp-temp-bar-fill";
    hpFill.insertAdjacentElement("afterend", tempFill);
  }

  const current = Math.max(0, Number(String(currentValue || "0").replace(",", ".")) || 0);
  const max = Math.max(0, Number(String(maxValue || "0").replace(",", ".")) || 0);
  const temp = Math.max(0, Number(String(tempValue || "0").replace(",", ".")) || 0);

  const totalLimit = Math.max(max, current + temp, 1);
  const currentPercent = Math.max(0, Math.min(100, (current / totalLimit) * 100));
  const tempPercent = Math.max(0, Math.min(100 - currentPercent, (temp / totalLimit) * 100));

  hpBar.classList.add("dnd-hp-bar--with-temp");
  hpFill.style.width = `${currentPercent}%`;
  tempFill.style.width = `${tempPercent}%`;
  tempFill.style.display = temp > 0 ? "block" : "none";
  tempFill.title = temp > 0 ? `${temp} PV temporários` : "";
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




/* =========================================================
   GENESIS AUTOMÁTICO DE ALTHERIUM
========================================================= */

function setupAltheriumGenesisDynamicControls() {
  injectAltheriumGenesisStyles();

  if (window.altheriumGenesisDynamicControlsReady) return;

  window.altheriumGenesisDynamicControlsReady = true;

  document.addEventListener("change", (event) => {
    if (!event.target.matches("[name='genesis']")) return;

    const form = event.target.closest("form");
    updateAltheriumGenesisSections(form, true);
  });

  document.addEventListener("input", (event) => {
    if (!event.target.matches("[name='genesis']")) return;

    const form = event.target.closest("form");
    updateAltheriumGenesisSections(form);
  });
}

function setupAltheriumGenesisFeatureSections(form, sheet = {}) {
  if (!form) return;

  injectAltheriumGenesisStyles();
  enhanceAltheriumGenesisSelector(form, sheet.genesis);
  ensureAltheriumGenesisStateInput(form);
  ensureAltheriumGenesisInfoPanel(form);
  updateAltheriumGenesisSections(form);
}

function enhanceAltheriumGenesisSelector(form, genesisValue = "") {
  if (!form || !form.elements.genesis) return;

  const currentField = form.elements.genesis;
  const fieldWrapper =
    currentField.closest(".root-field") ||
    currentField.closest("label") ||
    currentField.parentElement;

  if (fieldWrapper) {
    fieldWrapper.classList.add("root-field", "altherium-genesis-field");

    const title =
      fieldWrapper.querySelector(".root-field-label") ||
      fieldWrapper.querySelector("span") ||
      fieldWrapper.querySelector("label");

    if (title) title.classList.add("root-field-label");
  }

  if (currentField.tagName === "SELECT") {
    ensureAltheriumGenesisOptions(currentField);
    setAltheriumGenesisSelectorValue(currentField, currentField.value || genesisValue);
    currentField.dataset.genesisSelector = "true";
    currentField.classList.add("root-native-select", "altherium-genesis-select");
    return;
  }

  const select = document.createElement("select");
  select.name = currentField.name;
  select.className = `${currentField.className || ""} root-native-select altherium-genesis-select`.trim();
  select.dataset.genesisSelector = "true";

  ensureAltheriumGenesisOptions(select);
  setAltheriumGenesisSelectorValue(select, currentField.value || genesisValue);

  currentField.replaceWith(select);
}

function ensureAltheriumGenesisOptions(select) {
  if (!select || select.dataset.genesisOptionsReady) return;

  select.innerHTML = ALTHERIUM_GENESIS_OPTIONS
    .map((option) => {
      const disabled = option.key ? "" : "disabled";
      return `<option value="${escapeHtml(option.value)}" ${disabled}>${escapeHtml(option.label)}</option>`;
    })
    .join("");

  select.dataset.genesisOptionsReady = "true";
}

function setAltheriumGenesisSelectorValue(field, value) {
  if (!field) return;

  const genesis = getAltheriumGenesisByValue(value);
  field.value = genesis ? genesis.value : "";
}

function ensureAltheriumGenesisStateInput(form) {
  if (!form) return null;

  let input = form.querySelector("input[name='genesisAppliedState']");

  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = "genesisAppliedState";
    input.value = "";
    form.appendChild(input);
  }

  return input;
}

function ensureAltheriumGenesisInfoPanel(form) {
  removeAltheriumGenesisInfoPanel(form);
  return null;
}

function removeAltheriumGenesisInfoPanel(form = document) {
  const root = form || document;

  root.querySelectorAll("[data-altherium-genesis-panel], .altherium-genesis-panel").forEach((panel) => {
    panel.remove();
  });
}

function updateAltheriumGenesisSections(form, forceApply = false) {
  if (!form || !form.elements.genesis) return;

  setupAltheriumGenesisDynamicControls();
  ensureAltheriumGenesisStateInput(form);
  removeAltheriumGenesisInfoPanel(form);

  const genesis = getAltheriumGenesisByValue(form.elements.genesis.value);
  const currentKey = genesis ? genesis.key : "";
  const state = getAltheriumGenesisAppliedState(form);
  const hasLegacyMarkers = hasLegacyAltheriumGenesisMarkers(form);
  const shouldRefreshGenesis = forceApply || state.key !== currentKey || hasLegacyMarkers;

  if (shouldRefreshGenesis) {
    applyAltheriumGenesisBonuses(form, genesis);
    updateAltheriumGenesisNotes(form, genesis);
  }
}

function applyAltheriumGenesisBonuses(form, genesis) {
  const previousState = getAltheriumGenesisAppliedState(form);

  removeAltheriumGenesisBonuses(form, previousState);
  removeLooseAltheriumGenesisTextMarkers(form);

  const nextState = {
    key: genesis ? genesis.key : "",
    textBonuses: [],
    numberBonuses: [],
  };

  if (genesis && Array.isArray(genesis.automatic)) {
    genesis.automatic.forEach((effect) => {
      if (effect.type === "text") {
        const applied = applyAltheriumGenesisTextBonus(form, effect, genesis);
        if (applied) nextState.textBonuses.push(applied);
      }

      if (effect.type === "number") {
        const applied = applyAltheriumGenesisNumberBonus(form, effect);
        if (applied) nextState.numberBonuses.push(applied);
      }
    });
  }

  setAltheriumGenesisAppliedState(form, nextState);
}

function applyAltheriumGenesisTextBonus(form, effect, genesis) {
  const field = form.elements[effect.field];
  if (!field) return null;

  const marker = `${effect.bonus} [Genesis: ${genesis.label}]`;
  const value = String(field.value || "").trim();

  if (value.includes(marker)) {
    return {
      field: effect.field,
      marker,
    };
  }

  field.value = value ? `${value} ${marker}` : marker;

  return {
    field: effect.field,
    marker,
  };
}

function applyAltheriumGenesisNumberBonus(form, effect) {
  const field = form.elements[effect.field];
  if (!field) return null;

  field.value = cleanLegacyAltheriumGenesisMarkers(field.value);

  const current = getAltheriumGenesisNumber(field.value);
  const bonus = Number(effect.bonus) || 0;

  field.value = String(current + bonus);

  return {
    field: effect.field,
    bonus,
  };
}

function removeAltheriumGenesisBonuses(form, state = {}) {
  if (!form || !state) return;

  (state.textBonuses || []).forEach((bonus) => {
    const field = form.elements[bonus.field];
    if (!field || !bonus.marker) return;

    field.value = removeAltheriumGenesisMarkerFromText(field.value, bonus.marker);
  });

  (state.numberBonuses || []).forEach((bonus) => {
    const field = form.elements[bonus.field];
    if (!field) return;

    const current = getAltheriumGenesisNumber(field.value);
    const next = current - (Number(bonus.bonus) || 0);

    field.value = String(Math.max(0, next));
  });
}

function removeLooseAltheriumGenesisTextMarkers(form) {
  if (!form) return;

  Array.from(form.elements || []).forEach((field) => {
    if (!field || typeof field.value !== "string") return;

    field.value = cleanLegacyAltheriumGenesisMarkers(field.value);
  });
}

function hasLegacyAltheriumGenesisMarkers(form) {
  if (!form) return false;

  return Array.from(form.elements || []).some((field) => {
    if (!field || typeof field.value !== "string") return false;
    return /\+?\d+d\d+\s*\[Genesis:/i.test(field.value);
  });
}

function cleanLegacyAltheriumGenesisMarkers(value) {
  return String(value || "")
    .replace(/\s*\+?\d+d\d+\s*\[Genesis:[^\]]*\]?/gi, "")
    .replace(/\s*\+?\d+d\d+\s*\[G[eê]nesis:[^\]]*\]?/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function removeAltheriumGenesisMarkerFromText(value, marker) {
  return String(value || "")
    .replace(marker, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function getAltheriumGenesisAppliedState(form) {
  const input = ensureAltheriumGenesisStateInput(form);
  if (!input || !input.value) return { key: "", textBonuses: [], numberBonuses: [] };

  try {
    const parsed = JSON.parse(input.value);

    return {
      key: parsed.key || "",
      textBonuses: Array.isArray(parsed.textBonuses) ? parsed.textBonuses : [],
      numberBonuses: Array.isArray(parsed.numberBonuses) ? parsed.numberBonuses : [],
    };
  } catch (error) {
    return { key: "", textBonuses: [], numberBonuses: [] };
  }
}

function setAltheriumGenesisAppliedState(form, state) {
  const input = ensureAltheriumGenesisStateInput(form);
  if (!input) return;

  input.value = JSON.stringify(state || { key: "", textBonuses: [], numberBonuses: [] });
}

function renderAltheriumGenesisPanel(form, genesis) {
  removeAltheriumGenesisInfoPanel(form);
}



function updateAltheriumGenesisNotes(form, genesis) {
  if (!form || !form.elements.notes) return;

  const notesField = form.elements.notes;
  const cleanNotes = removeAltheriumGenesisNotesBlock(notesField.value);

  if (!genesis || !genesis.key) {
    notesField.value = cleanNotes;
    return;
  }

  const genesisText = buildAltheriumGenesisNotesText(genesis);
  notesField.value = cleanNotes
    ? `${cleanNotes}\n\n${genesisText}`
    : genesisText;
}

function buildAltheriumGenesisNotesText(genesis) {
  const notes = Array.isArray(genesis.notes) ? genesis.notes.filter(Boolean) : [];
  const lines = [
    "[Genesis]",
    `${genesis.label}: ${genesis.description}`,
    ...notes,
    "",
    "[Suas anotações]",
  ];

  return lines.join("\n");
}

function removeAltheriumGenesisNotesBlock(value) {
  let text = String(value || "");

  // Remove blocos antigos com fechamento, caso ainda existam.
  text = text.replace(/\n?\[Genesis\][\s\S]*?\[\/Genesis\]\n?/gi, "\n");

  const startIndex = text.search(/\[Genesis\]/i);
  if (startIndex < 0) {
    return text.replace(/\n{3,}/g, "\n\n").trim();
  }

  const beforeGenesis = text.slice(0, startIndex).trim();
  const afterGenesis = text.slice(startIndex);

  const userMarkerMatch = afterGenesis.match(/\[Suas anotações\]/i);

  if (userMarkerMatch) {
    const markerEnd = userMarkerMatch.index + userMarkerMatch[0].length;
    const userText = afterGenesis.slice(markerEnd).trim();

    return [beforeGenesis, userText]
      .filter(Boolean)
      .join("\n\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  // Compatibilidade com o formato antigo sem fechamento:
  // remove só as linhas iniciais do bloco Genesis, mas preserva qualquer texto
  // que o jogador escreveu depois de uma linha em branco.
  const lines = afterGenesis.split("\n");
  let cutIndex = lines.findIndex((line, index) => index > 0 && !line.trim());

  if (cutIndex < 0) {
    return beforeGenesis.replace(/\n{3,}/g, "\n\n").trim();
  }

  const userText = lines.slice(cutIndex + 1).join("\n").trim();

  return [beforeGenesis, userText]
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getAltheriumGenesisByValue(value) {
  const normalized = normalizeAltheriumGenesis(value);

  return (
    ALTHERIUM_GENESIS_OPTIONS.find((option) => option.key && option.key === normalized) ||
    ALTHERIUM_GENESIS_OPTIONS.find((option) => option.value === value) ||
    null
  );
}

function normalizeAltheriumGenesis(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const aliases = {
    cacador: "cacador",
    caçador: "cacador",
    curandeiro: "curandeiro",
    determinado: "determinado",
    devoto: "devoto",
    filho_de_mercante: "filho_de_mercante",
    filho_mercante: "filho_de_mercante",
    guerreiro: "guerreiro",
    guia_espiritual: "guia_espiritual",
    corredor: "corredor",
    peregrino: "peregrino",
    rastreador: "rastreador",
    robusto: "robusto",
    sem_passado: "sem_passado",
  };

  return aliases[normalized] || normalized;
}

function getAltheriumGenesisNumber(value) {
  const cleanedValue = cleanLegacyAltheriumGenesisMarkers(value);
  const text = String(cleanedValue || "0").replace(",", ".").trim();

  if (!/^-?\d+(\.\d+)?$/.test(text)) return 0;

  const number = Number(text);
  return Number.isFinite(number) ? number : 0;
}

function injectAltheriumGenesisStyles() {
  if (document.getElementById("altherium-genesis-auto-style")) return;

  const style = document.createElement("style");
  style.id = "altherium-genesis-auto-style";
  style.textContent = `
    .altherium-genesis-select {
      cursor: pointer;
    }

    .altherium-genesis-panel {
      display: none !important;
    }
  `;

  document.head.appendChild(style);
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

  document.addEventListener(
    "click",
    (event) => {
      const detailsButton = event.target.closest("[data-berserk-triumph-more]");

      if (detailsButton) {
        const card = detailsButton.closest(".berserk-triumph-card");
        if (!card) return;

        event.preventDefault();
        event.stopPropagation();

        toggleBerserkTriumphDetails(card);
        return;
      }

      const card = event.target.closest(".berserk-triumph-card");
      if (!card) return;

      const checkbox = card.querySelector("[data-berserk-triumph-checkbox]");
      if (!checkbox || checkbox.disabled) return;

      event.preventDefault();
      event.stopPropagation();

      checkbox.checked = !checkbox.checked;
      updateBerserkTriumphCheckboxState(checkbox);

      checkbox.dispatchEvent(new Event("input", { bubbles: true }));
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    },
    true
  );

  document.addEventListener(
    "change",
    (event) => {
      if (!event.target.matches("[data-berserk-triumph-checkbox]")) return;

      updateBerserkTriumphCheckboxState(event.target);
    },
    true
  );

  document.addEventListener("input", (event) => {
    if (!event.target.matches("[data-runaskin-note-image]")) return;

    updateRunaskinVisualNotePreview(event.target.closest(".runaskin-visual-note-card"));
  });

  document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-runaskin-note-image]")) return;

    updateRunaskinVisualNotePreview(event.target.closest(".runaskin-visual-note-card"));
  });

  document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-runaskin-note-file]")) return;

    handleRunaskinVisualNoteFileChange(event.target);
  });

  document.addEventListener(
    "click",
    (event) => {
      const removeButton = event.target.closest("[data-runaskin-note-remove-image]");

      if (!removeButton) return;

      event.preventDefault();
      event.stopPropagation();

      clearRunaskinVisualNoteImage(removeButton.closest(".runaskin-visual-note-card"));
    },
    true
  );

  document.addEventListener("input", (event) => {
    if (!isRunaskinVisualNoteField(event.target)) return;

    const form = event.target.closest("form");
    ensureRunaskinVisualNotesCapacity(form);
  });

  document.addEventListener("change", (event) => {
    if (!isRunaskinVisualNoteField(event.target)) return;

    const form = event.target.closest("form");
    ensureRunaskinVisualNotesCapacity(form);
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

  if (form.querySelector("[data-root-dynamic-zone]")) {
    hydrateBerserkTriumphSelection(form, sheet);
    hydrateRunaskinVisualNotePreviews(form);
    return;
  }

  const hasFixedRootSections =
    form.querySelector("#runaskinNrBox") ||
    form.querySelector("#pilarTriumphsBox") ||
    form.querySelector("#berserkTriumphsBox");

  if (hasFixedRootSections) {
    ensureBerserkTriumphBox(form, sheet);
    ensureRunaskinVisualNotesBox(form, sheet);
    hydrateBerserkTriumphSelection(form, sheet);
    hydrateRunaskinVisualNotePreviews(form);
    return;
  }

  const triumphTextarea = form.querySelector("textarea[name='triumphs']");
  if (!triumphTextarea) return;

  const normalTriumphsBox = triumphTextarea.closest(".normal-triumphs-box");
  const target = normalTriumphsBox || triumphTextarea;

  target.insertAdjacentHTML("beforebegin", buildAltheriumRootDynamicSections(sheet));
  hydrateBerserkTriumphSelection(form, sheet);
  hydrateRunaskinVisualNotePreviews(form);
}

function updateAltheriumRootSections(form) {
  if (!form) return;

  const rootField = form.elements.root;
  const root = normalizeAltheriumRoot(rootField ? rootField.value : "");

  ensureBerserkTriumphBox(form);
  ensureRunaskinVisualNotesBox(form);

  form.querySelectorAll("[data-root-section]").forEach((section) => {
    const shouldShow = section.dataset.rootSection === root;

    section.hidden = !shouldShow;
    section.classList.toggle("active", shouldShow);
    section.classList.toggle("show", shouldShow);
  });

  const berserkBox = form.querySelector("#berserkTriumphsBox");
  if (berserkBox && !berserkBox.matches("[data-root-section]")) {
    const showBerserk = root === "berserk";

    berserkBox.classList.toggle("active", showBerserk);
    berserkBox.classList.toggle("show", showBerserk);
    berserkBox.style.display = showBerserk ? "block" : "none";
  }

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
    const hideTriumphTextAreaOnly = root === "runaskin";

    normalTriumphsBox.classList.toggle("hidden-by-root", hideNormalTriumphs);
    normalTriumphsBox.classList.toggle(
      "normal-triumphs-box--hide-textarea",
      hideTriumphTextAreaOnly
    );
    normalTriumphsBox.style.display = hideNormalTriumphs ? "none" : "block";
  }

  ensureRunaskinVisualNotesCapacity(form);
  hydrateBerserkTriumphSelection(form);
  syncBerserkTriumphSelection(form);
  syncBerserkTriumphsToTriumphNotes(form);
  updateBerserkTriumphCounter(form);
  hydrateRunaskinVisualNotePreviews(form);
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

function genesisSelectInput(label, name, value) {
  const genesis = getAltheriumGenesisByValue(value);
  const selectedValue = genesis ? genesis.value : "";

  return `
    <div class="root-field altherium-genesis-field">
      <label class="root-field-label">${label}</label>
      <select name="${name}" class="root-native-select altherium-genesis-select" data-genesis-selector="true">
        ${ALTHERIUM_GENESIS_OPTIONS
          .map((option) => {
            const disabled = option.key ? "" : "disabled";
            return `
              <option value="${escapeHtml(option.value)}" ${disabled} ${option.value === selectedValue ? "selected" : ""}>
                ${escapeHtml(option.label)}
              </option>
            `;
          })
          .join("")}
      </select>
    </div>
  `;
}


function ensureBerserkTriumphBox(form, sheet = {}) {
  if (!form || form.querySelector("#berserkTriumphsBox")) return;

  const normalTriumphsBox = form.querySelector("#normalTriumphsBox, .normal-triumphs-box");
  const triumphTextarea = form.querySelector("textarea[name='triumphs']");
  const target = normalTriumphsBox || triumphTextarea;

  if (!target) return;

  target.insertAdjacentHTML("beforebegin", buildBerserkTriumphSection(sheet, false));
}

function getBerserkTriumphsFromSheet(sheet = {}) {
  return parseBerserkTriumphsValue(
    sheet.berserkTriumphs ??
      sheet.berserk_triumphs ??
      sheet.berserkSelectedTriumphs ??
      "[]"
  );
}

function parseBerserkTriumphsValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  const text = String(value || "").trim();

  if (!text) return [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item || "").trim()).filter(Boolean);
    }
  } catch (error) {
    // Permite compatibilidade com valores antigos separados por vírgula.
  }

  return text
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function hydrateBerserkTriumphSelection(form, sheet = null) {
  if (!form) return;

  const hiddenInput = form.querySelector("input[name='berserkTriumphs']");
  const sourceValue = sheet ? sheet.berserkTriumphs : hiddenInput?.value;
  const selected = new Set(parseBerserkTriumphsValue(sourceValue));

  if (hiddenInput && sheet && sheet.berserkTriumphs !== undefined) {
    hiddenInput.value = JSON.stringify(Array.from(selected));
  }

  form.querySelectorAll("[data-berserk-triumph-checkbox]").forEach((checkbox) => {
    const triumphName = checkbox.dataset.berserkTriumph || checkbox.value;
    const checked = selected.has(triumphName);

    checkbox.checked = checked;
    checkbox.closest(".berserk-triumph-card")?.classList.toggle("selected", checked);
  });

  updateBerserkTriumphCounter(form);
}

function syncBerserkTriumphSelection(form) {
  if (!form) return [];

  const selected = Array.from(form.querySelectorAll("[data-berserk-triumph-checkbox]:checked"))
    .map((checkbox) => checkbox.dataset.berserkTriumph || checkbox.value)
    .filter(Boolean);

  const hiddenInput = form.querySelector("input[name='berserkTriumphs']");

  if (hiddenInput) {
    hiddenInput.value = JSON.stringify(selected);
  }

  return selected;
}

function toggleBerserkTriumphDetails(card, force = null) {
  if (!card) return;

  const shouldOpen = force === null
    ? !card.classList.contains("details-open")
    : Boolean(force);

  card.classList.toggle("details-open", shouldOpen);

  const details = card.querySelector("[data-berserk-triumph-details]");
  if (details) {
    details.hidden = !shouldOpen;
  }

  const button = card.querySelector("[data-berserk-triumph-more]");
  if (button) {
    button.setAttribute("aria-expanded", String(shouldOpen));

    const label = button.querySelector("[data-berserk-triumph-more-label]");
    if (label) {
      label.textContent = shouldOpen ? "Ver menos" : "Ver mais";
    }
  }
}

function updateBerserkTriumphCheckboxState(checkbox) {
  if (!checkbox) return;

  const form = checkbox.closest("form");
  const card = checkbox.closest(".berserk-triumph-card");

  if (card) {
    card.classList.toggle("selected", checkbox.checked);
  }

  syncBerserkTriumphSelection(form);
  syncBerserkTriumphsToTriumphNotes(form);
  updateBerserkTriumphCounter(form);
}

function syncBerserkTriumphsToTriumphNotes(form) {
  if (!form) return;

  const triumphsTextarea = form.querySelector("textarea[name='triumphs']");
  if (!triumphsTextarea) return;

  const selected = parseBerserkTriumphsValue(
    form.querySelector("input[name='berserkTriumphs']")?.value
  );

  const manualText = removeBerserkTriumphNotesBlock(triumphsTextarea.value);
  const autoBlock = selected.length ? buildBerserkTriumphNotesBlock(selected) : "";
  const nextValue = autoBlock
    ? `${manualText ? `${manualText}\n\n` : ""}${autoBlock}`
    : manualText;

  if (triumphsTextarea.value === nextValue) return;

  triumphsTextarea.value = nextValue;
  triumphsTextarea.dispatchEvent(new Event("input", { bubbles: true }));
  triumphsTextarea.dispatchEvent(new Event("change", { bubbles: true }));
}

function removeBerserkTriumphNotesBlock(value) {
  const text = String(value || "");
  const blockRegex = new RegExp(
    `\\n*${escapeRegExp(BERSERK_TRIUMPH_NOTES_START)}[\\s\\S]*?${escapeRegExp(BERSERK_TRIUMPH_NOTES_END)}\\n*`,
    "g"
  );

  return text
    .replace(blockRegex, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildBerserkTriumphNotesBlock(selectedNames = []) {
  const selectedBlocks = selectedNames
    .map((name) => getBerserkTriumphByName(name))
    .filter(Boolean)
    .map((triumph) => {
      return [
        `◆ ${triumph.name}`,
        `Ação: ${triumph.action}`,
        `Custo: ${triumph.cost}`,
        `Alcance: ${triumph.range}`,
        `Teste: ${triumph.test}`,
        `Efeito: ${triumph.description}`,
      ].join("\n");
    });

  if (!selectedBlocks.length) return "";

  return [
    BERSERK_TRIUMPH_NOTES_START,
    selectedBlocks.join("\n\n"),
    BERSERK_TRIUMPH_NOTES_END,
  ].join("\n");
}

function getBerserkTriumphByName(name) {
  return BERSERK_TRIUMPH_OPTIONS.find(
    (triumph) => String(triumph.name) === String(name)
  );
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateBerserkTriumphCounter(form) {
  if (!form) return;

  const selected = parseBerserkTriumphsValue(form.querySelector("input[name='berserkTriumphs']")?.value);
  const counter = form.querySelector("[data-berserk-triumph-counter]");

  if (counter) {
    counter.textContent = String(selected.length);
  }
}

function buildBerserkTriumphSection(sheet = {}, useRootSection = true) {
  const selected = new Set(getBerserkTriumphsFromSheet(sheet));
  const selectedValue = escapeHtml(JSON.stringify(Array.from(selected)));
  const rootAttrs = useRootSection
    ? 'data-root-section="berserk" hidden'
    : 'data-root-extra="berserk" style="display: none"';

  return `
    <section class="altherium-root-section root-extra-box root-extra-box--berserk berserk-triumphs-box" id="berserkTriumphsBox" ${rootAttrs}>
      <input type="hidden" name="berserkTriumphs" value="${selectedValue}" />

      <div class="rune-section-title centered berserk-triumphs-title">
        <h3>Triunfos Berserk</h3>
        <p>Escolha os triunfos que o personagem possui. Ao selecionar, eles entram automaticamente nas anotações de triunfos.</p>
      </div>

      <div class="berserk-triumphs-summary">
        <span>Selecionados</span>
        <strong data-berserk-triumph-counter>${selected.size}</strong>
      </div>

      <div class="berserk-triumphs-grid">
        ${BERSERK_TRIUMPH_OPTIONS.map((triumph) => buildBerserkTriumphCard(triumph, selected)).join("")}
      </div>
    </section>
  `;
}

function buildBerserkTriumphCard(triumph, selectedSet = new Set()) {
  const checked = selectedSet.has(triumph.name);

  return `
    <label class="berserk-triumph-card ${checked ? "selected" : ""}">
      <input
        type="checkbox"
        value="${escapeHtml(triumph.name)}"
        data-berserk-triumph="${escapeHtml(triumph.name)}"
        data-berserk-triumph-checkbox="true"
        ${checked ? "checked" : ""}
      />

      <span class="berserk-triumph-checkmark"></span>

      <div class="berserk-triumph-card-content">
        <div class="berserk-triumph-card-head">
          <strong>${escapeHtml(triumph.name)}</strong>
          <em>${escapeHtml(triumph.cost)}</em>
        </div>

        <button
          type="button"
          class="berserk-triumph-more"
          data-berserk-triumph-more="true"
          aria-expanded="false"
        >
          <span data-berserk-triumph-more-label>Ver mais</span>
          <span class="berserk-triumph-more-arrow" aria-hidden="true">⌄</span>
        </button>

        <div
          class="berserk-triumph-details"
          data-berserk-triumph-details="true"
          hidden
        >
          <p>${escapeHtml(triumph.description)}</p>
        </div>

        <div class="berserk-triumph-tags">
          <small>${escapeHtml(triumph.action)}</small>
          <small>${escapeHtml(triumph.range)}</small>
          <small>${escapeHtml(triumph.test)}</small>
        </div>
      </div>
    </label>
  `;
}


function ensureRunaskinVisualNotesBox(form, sheet = {}) {
  if (!form) return;

  const runaskinBox =
    form.querySelector("#runaskinNrBox") ||
    form.querySelector("[data-root-section='runaskin']");

  if (!runaskinBox) return;

  if (runaskinBox.querySelector("[data-runaskin-notes-grid]")) {
    ensureRunaskinVisualNotesCapacity(form, sheet);
    hydrateRunaskinVisualNotePreviews(form);
    return;
  }

  const nrField = runaskinBox.querySelector(".runaskin-nr-mini-field");
  const notesHtml = buildRunaskinVisualNotesGrid(sheet);

  if (nrField) {
    nrField.insertAdjacentHTML("afterend", notesHtml);
  } else {
    runaskinBox.insertAdjacentHTML("beforeend", notesHtml);
  }

  ensureRunaskinVisualNotesCapacity(form, sheet);
  hydrateRunaskinVisualNotePreviews(form);
}

function clearRunaskinVisualNoteImage(card) {
  if (!card) return;

  const imageInput = card.querySelector("[data-runaskin-note-image]");
  const fileInput = card.querySelector("[data-runaskin-note-file]");

  if (!imageInput) return;

  imageInput.value = "";

  if (fileInput) {
    fileInput.value = "";
  }

  updateRunaskinVisualNotePreview(card);

  imageInput.dispatchEvent(new Event("input", { bubbles: true }));
  imageInput.dispatchEvent(new Event("change", { bubbles: true }));
  ensureRunaskinVisualNotesCapacity(card.closest("form"));
}

async function handleRunaskinVisualNoteFileChange(fileInput) {
  if (!fileInput) return;

  let file = fileInput.files && fileInput.files[0];

  if (!file) return;

  if (!file.type || !file.type.startsWith("image/")) {
    alert("Escolha um arquivo de imagem válido.");
    fileInput.value = "";
    return;
  }

  const card = fileInput.closest(".runaskin-visual-note-card");
  const imageInput = card?.querySelector("[data-runaskin-note-image]");

  if (!card || !imageInput) {
    fileInput.value = "";
    return;
  }

  try {
    const croppedFile = await openCampaignLabImageCropper(file, {
      title: "Editar imagem Runaskin",
      helperText: "Arraste a imagem e use o zoom para enquadrar o card.",
      buttonText: "Usar imagem",
      fileNameSuffix: "runaskin",
      cropWidth: 360,
      cropHeight: 360,
      outputWidth: 900,
      outputHeight: 900,
      minZoom: 0.2,
      maxZoom: 4,
      initialZoom: 1,
      mask: "rectangle",
    });

    if (!croppedFile) {
      fileInput.value = "";
      return;
    }

    file = croppedFile;

    const imageData = await readRunaskinVisualNoteFile(file);

    imageInput.value = imageData;
    updateRunaskinVisualNotePreview(card);

    imageInput.dispatchEvent(new Event("input", { bubbles: true }));
    imageInput.dispatchEvent(new Event("change", { bubbles: true }));
    ensureRunaskinVisualNotesCapacity(card.closest("form"));
  } catch (error) {
    console.error("Erro ao editar imagem Runaskin:", error);
    alert("Não foi possível carregar essa imagem. Tente outro arquivo.");
  } finally {
    fileInput.value = "";
  }
}

function readRunaskinVisualNoteFile(file) {
  const maxDirectSize = 850 * 1024;

  if (file.size <= maxDirectSize) {
    return readRunaskinVisualNoteFileAsDataUrl(file);
  }

  return resizeRunaskinVisualNoteImage(file).catch(() =>
    readRunaskinVisualNoteFileAsDataUrl(file)
  );
}

function readRunaskinVisualNoteFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Erro ao ler imagem"));
    reader.readAsDataURL(file);
  });
}

function resizeRunaskinVisualNoteImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxSize = 900;
        const largestSide = Math.max(image.width, image.height) || maxSize;
        const scale = Math.min(1, maxSize / largestSide);
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Canvas indisponível"));
          return;
        }

        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };

      image.onerror = () => reject(new Error("Imagem inválida"));
      image.src = String(reader.result || "");
    };

    reader.onerror = () => reject(reader.error || new Error("Erro ao ler imagem"));
    reader.readAsDataURL(file);
  });
}

function isRunaskinVisualNoteField(field) {
  if (!field || !field.name) return false;

  return /^runaskinNote\d+(Image|Title|Effect)$/.test(field.name);
}

function getRunaskinVisualNoteIndexFromName(name) {
  const match = String(name || "").match(/^runaskinNote(\d+)(Image|Title|Effect)$/);

  return match ? Number(match[1]) : 0;
}

function getRunaskinVisualNoteCardIndex(card) {
  if (!card) return 0;

  const field = card.querySelector("[name^='runaskinNote']");

  return getRunaskinVisualNoteIndexFromName(field?.name);
}

function getRunaskinVisualNotesGridElement(form) {
  if (!form) return null;

  return form.querySelector("[data-runaskin-notes-grid] .runaskin-visual-notes-grid");
}

function getRunaskinVisualNoteCards(form) {
  const grid = getRunaskinVisualNotesGridElement(form);

  if (!grid) return [];

  return Array.from(grid.querySelectorAll(".runaskin-visual-note-card"));
}

function isRunaskinVisualNoteCardFilled(card) {
  if (!card) return false;

  return Array.from(card.querySelectorAll("input[type='hidden'], input[type='text'], textarea"))
    .some((field) => String(field.value || "").trim());
}

function getRunaskinVisualNoteHighestSavedIndex(sheet = {}) {
  return Object.entries(sheet || {}).reduce((highest, [key, value]) => {
    if (!String(value || "").trim()) return highest;

    const index = getRunaskinVisualNoteIndexFromName(key);

    return Math.max(highest, index);
  }, 0);
}

function getRunaskinVisualNoteDesiredCount(form, sheet = {}) {
  const cards = getRunaskinVisualNoteCards(form);
  const highestSavedIndex = getRunaskinVisualNoteHighestSavedIndex(sheet);
  let desiredCount = Math.max(RUNASKIN_VISUAL_NOTE_COUNT, cards.length, highestSavedIndex);

  if (highestSavedIndex > RUNASKIN_VISUAL_NOTE_COUNT) {
    desiredCount = Math.ceil(highestSavedIndex / RUNASKIN_VISUAL_NOTE_INCREMENT) * RUNASKIN_VISUAL_NOTE_INCREMENT;

    if (highestSavedIndex % RUNASKIN_VISUAL_NOTE_INCREMENT === 0) {
      desiredCount += RUNASKIN_VISUAL_NOTE_INCREMENT;
    }
  }

  const sortedCards = [...cards].sort(
    (a, b) => getRunaskinVisualNoteCardIndex(a) - getRunaskinVisualNoteCardIndex(b)
  );
  const lastCard = sortedCards[sortedCards.length - 1];

  if (lastCard && isRunaskinVisualNoteCardFilled(lastCard)) {
    desiredCount = Math.max(desiredCount, cards.length + RUNASKIN_VISUAL_NOTE_INCREMENT);
  }

  return desiredCount;
}

function ensureRunaskinVisualNotesCapacity(form, sheet = {}) {
  if (!form) return;

  const grid = getRunaskinVisualNotesGridElement(form);

  if (!grid) return;

  let cards = getRunaskinVisualNoteCards(form);
  let highestIndex = cards.reduce(
    (highest, card) => Math.max(highest, getRunaskinVisualNoteCardIndex(card)),
    0
  );
  const desiredCount = getRunaskinVisualNoteDesiredCount(form, sheet);

  while (cards.length < desiredCount) {
    highestIndex += 1;
    grid.insertAdjacentHTML("beforeend", buildRunaskinVisualNoteCard(highestIndex, sheet));
    cards = getRunaskinVisualNoteCards(form);
  }

  hydrateRunaskinVisualNotePreviews(form);
}

function hydrateRunaskinVisualNotePreviews(form) {
  if (!form) return;

  form.querySelectorAll(".runaskin-visual-note-card").forEach((card) => {
    updateRunaskinVisualNotePreview(card);
  });
}

function updateRunaskinVisualNotePreview(card) {
  if (!card) return;

  const imageInput = card.querySelector("[data-runaskin-note-image]");
  const preview = card.querySelector("[data-runaskin-note-preview]");
  const image = preview?.querySelector("img");
  const emptyState = preview?.querySelector("span");
  const removeButton = preview?.querySelector("[data-runaskin-note-remove-image]");
  const imageUrl = String(imageInput?.value || "").trim();

  if (!preview || !image || !emptyState) return;

  if (imageUrl) {
    image.src = imageUrl;
    image.hidden = false;
    emptyState.hidden = true;
    if (removeButton) removeButton.hidden = false;
    preview.classList.add("has-image");
  } else {
    image.removeAttribute("src");
    image.hidden = true;
    emptyState.hidden = false;
    if (removeButton) removeButton.hidden = true;
    preview.classList.remove("has-image");
  }
}

function buildRunaskinVisualNotesGrid(sheet = {}) {
  return `
    <div class="runaskin-visual-notes" data-runaskin-notes-grid>
      <div class="runaskin-visual-notes-header">
        <span>Anotações Runaskin</span>
        <strong>Cards Triunficos</strong>
        <p>Clique no quadrado da imagem para escolher um arquivo do PC e registrar runas, marcas, espíritos, formas, bênçãos ou poderes visuais.</p>
      </div>

      <div class="runaskin-visual-notes-grid">
        ${Array.from({ length: RUNASKIN_VISUAL_NOTE_COUNT }, (_, index) =>
          buildRunaskinVisualNoteCard(index + 1, sheet)
        ).join("")}
      </div>
    </div>
  `;
}

function buildRunaskinVisualNoteCard(index, sheet = {}) {
  const imageValue = sheet[`runaskinNote${index}Image`] || "";
  const titleValue = sheet[`runaskinNote${index}Title`] || "";
  const effectValue = sheet[`runaskinNote${index}Effect`] || "";

  return `
    <article class="runaskin-visual-note-card" data-runaskin-note-card="true" data-runaskin-note-index="${index}">
      <label class="runaskin-visual-note-image-picker">
        <input
          type="hidden"
          name="runaskinNote${index}Image"
          value="${escapeHtml(imageValue)}"
          data-runaskin-note-image="true"
        />

        <input
          class="runaskin-visual-note-file-input"
          type="file"
          accept="image/*"
          data-runaskin-note-file="true"
        />

        <div class="runaskin-visual-note-preview ${imageValue ? "has-image" : ""}" data-runaskin-note-preview role="button" tabindex="0">
          <img src="${escapeHtml(imageValue)}" alt="Imagem da anotação Runaskin ${index}" ${imageValue ? "" : "hidden"} />
          <span ${imageValue ? "hidden" : ""}>Clique para escolher</span>
          <em>${imageValue ? "Trocar imagem" : "Selecionar imagem"}</em>
          <button
            type="button"
            class="runaskin-visual-note-remove-image"
            data-runaskin-note-remove-image="true"
            title="Excluir imagem"
            aria-label="Excluir imagem"
            ${imageValue ? "" : "hidden"}
          >×</button>
        </div>
      </label>

      <label>
        <small>Título</small>
        <input
          type="text"
          name="runaskinNote${index}Title"
          value="${escapeHtml(titleValue)}"
          placeholder="Nome da runa, forma ou poder"
        />
      </label>

      <label>
        <small>O que faz</small>
        <textarea
          name="runaskinNote${index}Effect"
          rows="4"
          placeholder="Descreva o efeito, custo, teste ou condição."
        >${escapeHtml(effectValue)}</textarea>
      </label>
    </article>
  `;
}

function buildAltheriumRootDynamicSections(sheet = {}) {
  return `
    <div class="altherium-root-dynamic-zone" data-root-dynamic-zone>
      ${buildBerserkTriumphSection(sheet)}

      <section class="altherium-root-section runaskin-root-section runaskin-nr-mini" data-root-section="runaskin" hidden>
        <div class="runaskin-nr-mini-field">
          <span>NR</span>

          <div class="runaskin-nr-mini-values">
            <label>
              <small>Atual</small>
              <input
                type="number"
                min="0"
                name="nrCurrent"
                value="${escapeHtml(sheet.nrCurrent || sheet.nr || "0")}"
                placeholder="0"
              />
            </label>

            <strong class="runaskin-nr-divider">/</strong>

            <label>
              <small>Máximo</small>
              <input
                type="number"
                min="0"
                name="nrMax"
                value="${escapeHtml(sheet.nrMax || "0")}"
                placeholder="0"
              />
            </label>
          </div>
        </div>

        ${buildRunaskinVisualNotesGrid(sheet)}
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
      const saveButton = event.target.closest("[data-save-enemy-details-id]");
      if (saveButton) {
        const enemyId = saveButton.dataset.saveEnemyDetailsId;
        const card = saveButton.closest("[data-enemy-edit-card]");
        await saveAltheriumEnemyEditableDetails(enemyId, card);
        return;
      }

      const deleteButton = event.target.closest("[data-delete-enemy-id]");
      if (!deleteButton) return;

      const enemyId = deleteButton.dataset.deleteEnemyId;
      const shouldDelete = window.confirm("Deseja excluir este inimigo do bestiário?");
      if (!shouldDelete) return;

      await deleteAltheriumGeneratedEnemy(enemyId);
    });

    container.addEventListener("input", (event) => {
      const input = event.target.closest("[data-enemy-field]");
      if (!input) return;

      const card = input.closest("[data-enemy-edit-card]");
      setAltheriumEnemyEditableStatus(card, "Alterações não salvas.", "warning");
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

  const detailBoxesHtml = renderAltheriumEnemyDetailBoxes({
    ...boss,
    id: savedEnemyId,
  });

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

      ${detailBoxesHtml}

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


function buildAltheriumEnemyGeneratedDetails(enemy) {
  const difficultyKey = normalizeBossDifficulty(enemy.difficultyKey || enemy.difficultyLabel || "medio");
  const scale = getAltheriumEnemyScale(enemy);
  const recommendedDice = enemy.recommendedDice || { formula: "0", average: 0 };
  const minDice = enemy.minDice || recommendedDice;
  const maxDice = enemy.maxDice || recommendedDice;
  const bossHp = Math.max(0, Math.round(Number(enemy.bossHp) || 0));
  const minDamage = formatCombatNumber(enemy.minDamage || 0);
  const maxDamage = formatCombatNumber(enemy.maxDamage || 0);
  const recommendedDamage = formatCombatNumber(enemy.recommendedDamage || recommendedDice.average || 0);
  const treasureValue = Math.max(100, Math.round((bossHp || 25) * (difficultyKey === "forte" ? 5 : difficultyKey === "fraco" ? 2 : 3)));
  const rareMaterial = difficultyKey === "forte" ? "Material raro" : difficultyKey === "fraco" ? "Material comum" : "Material incomum";

  return {
    weapons: [
      {
        name: "Ataque principal",
        value: recommendedDice.formula || "0",
        description: `Dano médio aproximado de ${recommendedDamage}. Use como ataque padrão do inimigo.`,
      },
      {
        name: "Ataque leve",
        value: minDice.formula || recommendedDice.formula || "0",
        description: `Opção segura para pressionar sem explodir o dano. Faixa baixa: ${minDamage}.`,
      },
      {
        name: "Ataque pesado",
        value: maxDice.formula || recommendedDice.formula || "0",
        description: `Opção perigosa para momentos importantes. Faixa alta: ${maxDamage}.`,
      },
    ],

    items: [
      {
        name: "Espólio sugerido",
        value: `${treasureValue} Hacksilvers`,
        description: "Recompensa base caso o grupo derrote este inimigo.",
      },
      {
        name: rareMaterial,
        value: difficultyKey === "forte" ? "1 peça especial" : "1 peça aproveitável",
        description: "Pode virar componente de criação, venda ou melhoria de equipamento.",
      },
      {
        name: "Item tático",
        value: "Defina na cena",
        description: "Poção, relíquia, chave, mapa, munição ou objeto ligado ao encontro.",
      },
    ],

    powers: [
      {
        name: "Pressão de combate",
        value: "1 vez por rodada",
        description: "Após atacar, o inimigo força um alvo próximo a escolher entre recuar, defender ou sofrer pressão narrativa.",
      },
      {
        name: "Fúria do boss",
        value: `+${Math.max(1, scale)} no dano`,
        description: "Use quando o inimigo estiver abaixo de metade do PV ou quando a luta precisar subir de tensão.",
      },
      {
        name: "Instinto de sobrevivência",
        value: "Reação",
        description: "Uma vez por combate, reduz ou evita um efeito que encerraria a ameaça cedo demais.",
      },
    ],

    attributes: [
      { name: "Fúria", value: scale + 3 },
      { name: "Impulso", value: scale + 1 },
      { name: "Espírito", value: scale },
      { name: "Estratégia", value: scale + 1 },
      { name: "Rúnico", value: Math.max(0, scale - 1) },
      { name: "Destino", value: Math.max(1, Math.round(scale / 2)) },
    ],

    skills: [
      { name: "Luta", value: `+${scale + 4}` },
      { name: "Reflexo", value: `+${scale + 2}` },
      { name: "Vigor", value: `+${scale + 3}` },
      { name: "Percepção", value: `+${scale + 1}` },
      { name: "Intimidação", value: `+${scale + 3}` },
      { name: "Sobrevivência", value: `+${scale + 1}` },
    ],
  };
}

function getAltheriumEnemyScale(enemy) {
  const difficultyKey = normalizeBossDifficulty(enemy.difficultyKey || enemy.difficultyLabel || "medio");
  const hpScale = Math.min(4, Math.floor((Number(enemy.bossHp) || 0) / 80));

  if (difficultyKey === "forte") return 5 + hpScale;
  if (difficultyKey === "fraco") return 2 + Math.min(2, hpScale);
  return 3 + Math.min(3, hpScale);
}

function getAltheriumEnemyDetailSections(enemy) {
  const safeEnemy = enemy || {};

  return {
    weapons: normalizeAltheriumEnemyDetailList(safeEnemy.weapons, []),
    items: normalizeAltheriumEnemyDetailList(safeEnemy.items, []),
    powers: normalizeAltheriumEnemyDetailList(safeEnemy.powers, []),
    attributes: normalizeAltheriumEnemyDetailList(safeEnemy.attributes, []),
    skills: normalizeAltheriumEnemyDetailList(safeEnemy.skills || safeEnemy.pericias, []),
  };
}

function getEmptyAltheriumEnemyEditableDetails() {
  return {
    weapons: [],
    items: [],
    powers: [],
    attributes: [],
    skills: [],
    weaponsText: "",
    itemsText: "",
    powersText: "",
    attributesText: "",
    skillsText: "",
  };
}

function getAltheriumEnemyEditableFields() {
  return [
    {
      key: "weapons",
      textKey: "weaponsText",
      title: "Armas",
      placeholder: "Exemplo:\nMachado enferrujado — 1d10+3 de dano\nGarras quebradas — 1d8+2 de dano\nArremesso de osso — alcance médio, 1d6+1",
    },
    {
      key: "items",
      textKey: "itemsText",
      title: "Itens",
      placeholder: "Exemplo:\nBolsa com 120 Hacksilvers\nChave enferrujada\nFragmento rúnico instável",
    },
    {
      key: "powers",
      textKey: "powersText",
      title: "Poderes",
      placeholder: "Exemplo:\nGrito de guerra — todos próximos testam Espírito\nSangue fervente — ganha +2 de dano abaixo de metade do PV\nInvestida brutal — avança e ataca o alvo mais próximo",
    },
    {
      key: "attributes",
      textKey: "attributesText",
      title: "Atributos",
      placeholder: "Exemplo:\nFúria: 5\nImpulso: 3\nEspírito: 2\nEstratégia: 1\nRúnico: 0\nDestino: 1",
    },
    {
      key: "skills",
      textKey: "skillsText",
      title: "Perícias",
      placeholder: "Exemplo:\nLuta: +6\nReflexo: +4\nVigor: +5\nPercepção: +2\nIntimidação: +5",
    },
  ];
}

function normalizeAltheriumEnemyDetailList(value, fallback = []) {
  const source = Array.isArray(value) && value.length ? value : fallback;

  if (Array.isArray(source)) {
    return source.map(normalizeAltheriumEnemyDetailItem).filter(Boolean);
  }

  if (source && typeof source === "object") {
    return Object.entries(source)
      .map(([name, itemValue]) =>
        normalizeAltheriumEnemyDetailItem({
          name,
          value: itemValue,
        })
      )
      .filter(Boolean);
  }

  return [];
}

function normalizeAltheriumEnemyDetailItem(item) {
  if (item === null || item === undefined || item === "") return null;

  if (typeof item === "string" || typeof item === "number") {
    return {
      name: String(item),
      value: "",
      description: "",
    };
  }

  if (typeof item !== "object") return null;

  return {
    name: item.name || item.label || item.title || "Detalhe",
    value: item.value ?? item.detail ?? item.damage ?? item.bonus ?? item.total ?? "",
    description: item.description || item.note || item.text || "",
  };
}

function getAltheriumEnemyFieldText(enemy, field) {
  if (!enemy || !field) return "";

  const directText = enemy[field.textKey];
  if (typeof directText === "string") return directText;

  const sections = getAltheriumEnemyDetailSections(enemy);
  return convertAltheriumEnemyDetailListToText(sections[field.key]);
}

function convertAltheriumEnemyDetailListToText(items) {
  if (!Array.isArray(items) || !items.length) return "";

  return items
    .map((item) => {
      const name = item && item.name ? String(item.name).trim() : "";
      const value = item && item.value !== undefined && item.value !== null ? String(item.value).trim() : "";
      const description = item && item.description ? String(item.description).trim() : "";
      const parts = [name, value, description].filter(Boolean);

      return parts.join(" — ");
    })
    .filter(Boolean)
    .join("\n");
}

function parseAltheriumEnemyDetailText(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const pipeParts = line.split("|").map((part) => part.trim()).filter(Boolean);

      if (pipeParts.length >= 3) {
        return {
          name: pipeParts[0],
          value: pipeParts[1],
          description: pipeParts.slice(2).join(" | "),
        };
      }

      if (pipeParts.length === 2) {
        return {
          name: pipeParts[0],
          value: pipeParts[1],
          description: "",
        };
      }

      const colonMatch = line.match(/^([^:]+):\s*(.+)$/);
      if (colonMatch) {
        return {
          name: colonMatch[1].trim(),
          value: colonMatch[2].trim(),
          description: "",
        };
      }

      const dashParts = line.split(/\s+[—-]\s+/).map((part) => part.trim()).filter(Boolean);
      if (dashParts.length >= 2) {
        return {
          name: dashParts[0],
          value: dashParts[1],
          description: dashParts.slice(2).join(" — "),
        };
      }

      return {
        name: line,
        value: "",
        description: "",
      };
    });
}

function renderAltheriumEnemyDetailBoxes(enemy) {
  const safeEnemy = enemy || {};
  const enemyId = safeEnemy.id || "";
  const fields = getAltheriumEnemyEditableFields();
  const generatedHints = buildAltheriumEnemyGeneratedDetails(safeEnemy);

  return `
    <div class="enemy-detail-editor" data-enemy-edit-card="${escapeHtml(enemyId)}">
      <div class="enemy-detail-editor__head">
        <div>
          <h3>Detalhes do inimigo</h3>
          <p>Preencha as caixas abaixo para cadastrar as informações próprias desse inimigo.</p>
        </div>

        ${
          enemyId
            ? `<button
                type="button"
                class="altherium-btn enemy-detail-save-btn"
                data-save-enemy-details-id="${escapeHtml(enemyId)}"
              >
                Salvar campos
              </button>`
            : `<span class="enemy-detail-save-warning">Gere e salve o inimigo para editar estes campos.</span>`
        }
      </div>

      <div class="enemy-detail-boxes enemy-detail-boxes--editable">
        ${fields
          .map((field) =>
            renderAltheriumEnemyEditableBox({
              enemy: safeEnemy,
              enemyId,
              field,
              placeholder: field.placeholder || convertAltheriumEnemyDetailListToText(generatedHints[field.key]),
            })
          )
          .join("")}
      </div>

      <p class="enemy-detail-save-status" data-enemy-save-status></p>
    </div>
  `;
}

function renderAltheriumEnemyEditableBox({ enemy, enemyId, field, placeholder }) {
  const value = getAltheriumEnemyFieldText(enemy, field);

  return `
    <section class="enemy-detail-box enemy-detail-box--editable">
      <label for="enemy-${escapeHtml(enemyId || "novo")}-${escapeHtml(field.key)}">
        ${escapeHtml(field.title)}
      </label>

      <textarea
        id="enemy-${escapeHtml(enemyId || "novo")}-${escapeHtml(field.key)}"
        data-enemy-field="${escapeHtml(field.key)}"
        data-enemy-text-key="${escapeHtml(field.textKey)}"
        placeholder="${escapeHtml(placeholder)}"
        rows="7"
        ${enemyId ? "" : "disabled"}
      >${escapeHtml(value)}</textarea>
    </section>
  `;
}

function getAltheriumEnemyEditableDetailsFromCard(card) {
  const details = getEmptyAltheriumEnemyEditableDetails();
  if (!card) return details;

  getAltheriumEnemyEditableFields().forEach((field) => {
    const input = card.querySelector(`[data-enemy-field="${field.key}"]`);
    const text = input ? input.value.trim() : "";

    details[field.textKey] = text;
    details[field.key] = parseAltheriumEnemyDetailText(text);
  });

  return details;
}

function setAltheriumEnemyEditableStatus(card, message, type = "") {
  if (!card) return;

  const status = card.querySelector("[data-enemy-save-status]");
  if (!status) return;

  status.textContent = message || "";
  status.dataset.statusType = type || "";
}

async function saveAltheriumEnemyEditableDetails(enemyId, card) {
  if (!enemyId) {
    alert("Gere e salve o inimigo antes de preencher estes campos.");
    return;
  }

  if (!DB) {
    alert("Supabase não carregou. Verifique se o script do Supabase está antes do script.js.");
    return;
  }

  const campaign = await getCurrentCampaign(true);

  if (!campaign || !campaign.id) {
    alert("Campanha não encontrada. Não foi possível salvar os campos do inimigo.");
    return;
  }

  const saveButton = card ? card.querySelector("[data-save-enemy-details-id]") : null;
  if (saveButton) {
    saveButton.disabled = true;
    saveButton.textContent = "Salvando...";
  }

  setAltheriumEnemyEditableStatus(card, "Salvando campos...", "loading");

  const editableDetails = getAltheriumEnemyEditableDetailsFromCard(card);

  const { data: currentRow, error: readError } = await DB
    .from("altherium_bestiary")
    .select("*")
    .eq("id", enemyId)
    .eq("campaign_id", campaign.id)
    .single();

  if (readError) {
    showAltheriumBestiarySupabaseError(
      "Erro ao buscar o inimigo para salvar os campos.",
      readError
    );
    setAltheriumEnemyEditableStatus(card, "Erro ao salvar os campos.", "error");

    if (saveButton) {
      saveButton.disabled = false;
      saveButton.textContent = "Salvar campos";
    }

    return;
  }

  const currentEnemy = mapAltheriumEnemyFromDbRow(currentRow);
  const updatedEnemy = {
    ...currentEnemy,
    ...editableDetails,
    updatedAt: new Date().toISOString(),
  };

  const { error } = await DB
    .from("altherium_bestiary")
    .update({
      data: updatedEnemy,
    })
    .eq("id", enemyId)
    .eq("campaign_id", campaign.id);

  if (error) {
    showAltheriumBestiarySupabaseError(
      "Erro ao salvar os campos do inimigo no Supabase.",
      error
    );
    setAltheriumEnemyEditableStatus(card, "Erro ao salvar os campos.", "error");

    if (saveButton) {
      saveButton.disabled = false;
      saveButton.textContent = "Salvar campos";
    }

    return;
  }

  setAltheriumEnemyEditableStatus(card, "Campos salvos.", "success");

  if (saveButton) {
    saveButton.disabled = false;
    saveButton.textContent = "Salvar campos";
  }

  await renderAltheriumGeneratedEnemiesList();
}

function renderAltheriumEnemyDetailBox(title, items, compact = false) {
  const safeItems = Array.isArray(items) ? items : [];

  if (!safeItems.length) {
    return `
      <section class="enemy-detail-box${compact ? " enemy-detail-box--compact" : ""}">
        <h3>${escapeHtml(title)}</h3>
        <p class="enemy-detail-empty">Nada cadastrado ainda.</p>
      </section>
    `;
  }

  return `
    <section class="enemy-detail-box${compact ? " enemy-detail-box--compact" : ""}">
      <h3>${escapeHtml(title)}</h3>
      <div class="enemy-detail-list">
        ${safeItems.map((item) => renderAltheriumEnemyDetailItem(item, compact)).join("")}
      </div>
    </section>
  `;
}

function renderAltheriumEnemyDetailItem(item, compact = false) {
  const value = item.value === null || item.value === undefined ? "" : String(item.value);
  const description = item.description ? String(item.description) : "";

  return `
    <div class="enemy-detail-item${compact ? " enemy-detail-item--compact" : ""}">
      <strong>${escapeHtml(item.name || "Detalhe")}</strong>
      ${value ? `<span>${escapeHtml(value)}</span>` : ""}
      ${description && !compact ? `<p>${escapeHtml(description)}</p>` : ""}
    </div>
  `;
}

function getSupabaseErrorText(error) {
  if (!error) return "Erro desconhecido.";

  const parts = [];

  if (error.code) parts.push(`Código: ${error.code}`);
  if (error.message) parts.push(`Mensagem: ${error.message}`);
  if (error.details) parts.push(`Detalhes: ${error.details}`);
  if (error.hint) parts.push(`Dica: ${error.hint}`);

  return parts.length ? parts.join("\n") : JSON.stringify(error, null, 2);
}

function showAltheriumBestiarySupabaseError(action, error) {
  const details = getSupabaseErrorText(error);

  console.error(action, error);

  alert(
    `${action}\n\n${details}\n\n` +
      "Se aparecer PGRST205 ou tabela não encontrada, rode o SQL da tabela e depois atualize com Ctrl + F5.\n" +
      "Se aparecer row-level security, desative RLS nessa tabela ou crie políticas."
  );
}

async function saveAltheriumGeneratedEnemy(boss) {
  if (!DB) {
    alert("Supabase não carregou. Verifique se o script do Supabase está antes do script.js.");
    return null;
  }

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
    showAltheriumBestiarySupabaseError(
      "Erro ao salvar o inimigo no Supabase.",
      error
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
  const emptyDetails = getEmptyAltheriumEnemyEditableDetails();

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
    ...emptyDetails,
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

          ${renderAltheriumEnemyDetailBoxes(enemy)}
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
    showAltheriumBestiarySupabaseError(
      "Erro ao excluir inimigo do Supabase.",
      error
    );
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
    showAltheriumBestiarySupabaseError(
      "Erro ao limpar bestiário no Supabase.",
      error
    );
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


/* =========================================================
   PATCH - ROLADOR EM MODAL CENTRAL
   Mantém o botão perto da imagem, mas abre o painel grande
   no centro da página.
========================================================= */

function ensureCampaignDiceRoller(system) {
  const widget = document.getElementById("campaignDiceWidget");

  if (!widget) return;

  widget.dataset.diceSystem = system;
  widget.classList.remove("campaign-dice-widget--open", "campaign-dice-widget--modal");
  document.body.classList.remove("campaign-dice-modal-open");
  localStorage.removeItem("campaignLabDiceOpen");

  const toggleButton = widget.querySelector("[data-dice-toggle]");
  if (toggleButton) {
    toggleButton.setAttribute("aria-expanded", "false");
  }

  widget.querySelectorAll("[data-dice-system-only]").forEach((block) => {
    const allowedSystem = block.dataset.diceSystemOnly;
    block.hidden = Boolean(allowedSystem && allowedSystem !== system);
  });
}

function setCampaignDiceWidgetOpen(widget, open) {
  if (!widget) return;

  widget.classList.toggle("campaign-dice-widget--open", open);
  widget.classList.toggle("campaign-dice-widget--modal", open);
  document.body.classList.toggle("campaign-dice-modal-open", open);

  const toggleButton = widget.querySelector("[data-dice-toggle]");
  if (toggleButton) {
    toggleButton.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (!open) {
    localStorage.removeItem("campaignLabDiceOpen");
  }

  positionCampaignDiceWidgetNearPortrait();
}

function setupCampaignDiceWidgetPositioning() {
  if (window.campaignDiceWidgetPositioningReady) {
    positionCampaignDiceWidgetNearPortrait();
    return;
  }

  window.campaignDiceWidgetPositioningReady = true;

  const refreshDiceWidgetPosition = () => {
    if (window.campaignDiceWidgetPositionFrame) {
      cancelAnimationFrame(window.campaignDiceWidgetPositionFrame);
    }

    window.campaignDiceWidgetPositionFrame = requestAnimationFrame(() => {
      positionCampaignDiceWidgetNearPortrait();
    });
  };

  window.addEventListener("resize", refreshDiceWidgetPosition);
  window.addEventListener("scroll", refreshDiceWidgetPosition, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const widget = document.getElementById("campaignDiceWidget");
    if (widget && widget.classList.contains("campaign-dice-widget--open")) {
      setCampaignDiceWidgetOpen(widget, false);
    }
  });

  document.addEventListener("click", (event) => {
    const widget = document.getElementById("campaignDiceWidget");
    if (!widget || !widget.classList.contains("campaign-dice-widget--open")) return;

    if (event.target.closest("#campaignDiceWidget")) return;

    setCampaignDiceWidgetOpen(widget, false);
  });

  refreshDiceWidgetPosition();

  let tries = 0;
  const interval = setInterval(() => {
    positionCampaignDiceWidgetNearPortrait();
    tries += 1;
    if (tries >= 30) clearInterval(interval);
  }, 250);
}

function positionCampaignDiceWidgetNearPortrait() {
  const widget = document.getElementById("campaignDiceWidget");
  if (!widget) return;

  const isOpen = widget.classList.contains("campaign-dice-widget--open");

  if (isOpen) {
    if (widget.parentElement !== document.body) {
      document.body.appendChild(widget);
    }

    document.body.classList.add("campaign-dice-modal-open");
    widget.classList.add("campaign-dice-widget--modal");

    widget.style.setProperty("position", "fixed", "important");
    widget.style.setProperty("left", "50%", "important");
    widget.style.setProperty("top", "50%", "important");
    widget.style.setProperty("right", "auto", "important");
    widget.style.setProperty("bottom", "auto", "important");
    widget.style.setProperty("width", "min(540px, calc(100vw - 32px))", "important");
    widget.style.setProperty("max-width", "min(540px, calc(100vw - 32px))", "important");
    widget.style.setProperty("max-height", "min(84vh, 720px)", "important");
    widget.style.setProperty("transform", "translate(-50%, -50%)", "important");
    widget.style.setProperty("z-index", "1000001", "important");
    widget.style.setProperty("display", "flex", "important");
    widget.style.setProperty("margin", "0", "important");
    return;
  }

  document.body.classList.remove("campaign-dice-modal-open");
  widget.classList.remove("campaign-dice-widget--modal");

  const isPlayerPage = Boolean(
    document.body.classList.contains("altherium-player-page") ||
      document.body.classList.contains("dnd-player-page")
  );

  const form =
    document.getElementById("playerSheetForm") ||
    document.getElementById("dndPlayerSheetForm");

  const portraitField = form
    ? form.querySelector("[data-character-portrait-field]")
    : null;

  if (!isPlayerPage || !form || !portraitField || window.innerWidth < 1100) {
    resetCampaignDiceWidgetPosition(widget);
    return;
  }

  const portraitWidth =
    Number.parseFloat(portraitField.style.width) ||
    portraitField.offsetWidth ||
    250;

  const portraitHeight = portraitField.offsetHeight || 320;
  const portraitTop =
    Number.parseFloat(portraitField.style.top) ||
    portraitField.offsetTop ||
    0;

  const portraitLeft =
    Number.parseFloat(portraitField.style.left) ||
    portraitField.offsetLeft ||
    0;

  const closedWidth = portraitWidth;
  const widgetWidth = closedWidth;
  const gap = 14;

  if (widget.parentElement !== form) {
    form.appendChild(widget);
  }

  form.style.setProperty("position", "relative", "important");

  widget.classList.add("campaign-dice-widget--near-portrait");
  widget.style.setProperty("position", "absolute", "important");
  widget.style.setProperty("right", "auto", "important");
  widget.style.setProperty("bottom", "auto", "important");
  widget.style.setProperty("width", `${widgetWidth}px`, "important");
  widget.style.setProperty("max-width", `${widgetWidth}px`, "important");
  widget.style.removeProperty("max-height");
  widget.style.setProperty("margin", "0", "important");
  widget.style.setProperty("z-index", "999998", "important");
  widget.style.setProperty("display", "flex", "important");
  widget.style.setProperty("transform", "none", "important");

  const widgetHeight = widget.offsetHeight || 54;
  const formHeight = Math.max(
    form.scrollHeight || 0,
    portraitTop + portraitHeight + widgetHeight + gap
  );

  let top = portraitTop + portraitHeight + gap;
  const maxTop = Math.max(0, formHeight - widgetHeight);
  top = Math.max(0, Math.min(top, maxTop));

  let left = portraitLeft + portraitWidth / 2 - widgetWidth / 2;

  const formWidth = form.getBoundingClientRect().width || form.offsetWidth || 0;
  const minLeft = -520;
  const maxLeft = Math.max(minLeft, formWidth + 520 - widgetWidth);
  left = Math.max(minLeft, Math.min(left, maxLeft));

  widget.style.setProperty("top", `${top}px`, "important");
  widget.style.setProperty("left", `${left}px`, "important");
}

function resetCampaignDiceWidgetPosition(widget = document.getElementById("campaignDiceWidget")) {
  if (!widget) return;

  document.body.classList.remove("campaign-dice-modal-open");
  widget.classList.remove("campaign-dice-widget--near-portrait", "campaign-dice-widget--modal");
  widget.style.removeProperty("position");
  widget.style.removeProperty("left");
  widget.style.removeProperty("top");
  widget.style.removeProperty("right");
  widget.style.removeProperty("bottom");
  widget.style.removeProperty("width");
  widget.style.removeProperty("max-width");
  widget.style.removeProperty("max-height");
  widget.style.removeProperty("margin");
  widget.style.removeProperty("z-index");
  widget.style.removeProperty("display");
  widget.style.removeProperty("transform");
}

function bindCampaignDiceRollerEvents(system) {
  const widget = document.getElementById("campaignDiceWidget");
  if (!widget || widget.dataset.diceReady === "true") return;

  widget.dataset.diceReady = "true";

  widget.addEventListener("click", async (event) => {
    const toggleButton = event.target.closest("[data-dice-toggle]");
    const refreshButton = event.target.closest("[data-dice-refresh]");
    const rollButton = event.target.closest("[data-dice-formula]");

    if (toggleButton) {
      event.stopPropagation();
      const isOpen = !widget.classList.contains("campaign-dice-widget--open");
      setCampaignDiceWidgetOpen(widget, isOpen);
      return;
    }

    if (refreshButton) {
      event.stopPropagation();
      await renderCampaignDiceHistory();
      return;
    }

    if (rollButton) {
      event.stopPropagation();
      await handleCampaignDiceRoll({
        system,
        formula: rollButton.dataset.diceFormula,
        label: rollButton.dataset.diceLabel,
      });
    }
  });

  widget.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-dice-custom-form]");
    if (!form) return;

    event.preventDefault();
    event.stopPropagation();

    await handleCampaignDiceRoll({
      system,
      formula: form.elements.diceFormula.value,
      label: form.elements.diceLabel.value || "Rolagem personalizada",
    });
  });
}


/* =========================================================
   PATCH - ROLAGEM PÚBLICA / ESCONDIDA + RESULTADO PARA A MESA
   - Rolagem aberta aparece para todos da campanha.
   - Rolagem escondida fica visível apenas para o mestre.
   - O mestre recebe resultados no canto inferior esquerdo.
========================================================= */

function ensureCampaignDiceRoller(system) {
  const widget = document.getElementById("campaignDiceWidget");

  if (!widget) return;

  widget.dataset.diceSystem = system;
  widget.classList.remove("campaign-dice-widget--open", "campaign-dice-widget--modal");
  document.body.classList.remove("campaign-dice-modal-open");
  localStorage.removeItem("campaignLabDiceOpen");

  ensureCampaignDicePrivacyToggle(widget);
  ensureCampaignDiceGenitalSizeRoll(widget);
  updateCampaignDicePrivacyToggle(widget);

  const toggleButton = widget.querySelector("[data-dice-toggle]");
  if (toggleButton) {
    toggleButton.setAttribute("aria-expanded", "false");
  }

  widget.querySelectorAll("[data-dice-system-only]").forEach((block) => {
    const allowedSystem = block.dataset.diceSystemOnly;
    block.hidden = Boolean(allowedSystem && allowedSystem !== system);
  });
}





function injectCampaignDiceGenitalSizeStyles() {
  if (document.getElementById("campaign-dice-genital-size-style")) return;

  const style = document.createElement("style");
  style.id = "campaign-dice-genital-size-style";
  style.textContent = `
    .campaign-dice-genital-size-box {
      width: 100%;
      margin: 10px 0 12px;
      padding: 10px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      border: 1px solid rgba(34, 211, 238, 0.22);
      border-radius: 14px;
      background:
        linear-gradient(145deg, rgba(15, 23, 42, 0.76), rgba(2, 6, 23, 0.9)),
        radial-gradient(circle at top right, rgba(34, 211, 238, 0.12), transparent 45%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.04),
        0 0 18px rgba(34, 211, 238, 0.06);
    }

    .campaign-dice-genital-size-box span {
      display: block;
      color: #f8fafc;
      font-size: 12px;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .campaign-dice-genital-size-box small {
      display: block;
      margin-top: 3px;
      color: rgba(226, 232, 240, 0.7);
      font-size: 11px;
      line-height: 1.2;
    }

    .campaign-dice-genital-size-btn {
      min-width: 86px;
      min-height: 38px;
      padding: 0 12px;
      border: 1px solid rgba(34, 211, 238, 0.45);
      border-radius: 12px;
      background: rgba(34, 211, 238, 0.12);
      color: #67e8f9;
      font-family: inherit;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
    }

    .campaign-dice-genital-size-btn:hover {
      border-color: rgba(34, 211, 238, 0.78);
      background: rgba(34, 211, 238, 0.18);
      box-shadow: 0 0 18px rgba(34, 211, 238, 0.12);
    }

    @media (max-width: 520px) {
      .campaign-dice-genital-size-box {
        grid-template-columns: 1fr;
      }

      .campaign-dice-genital-size-btn {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(style);
}




const CAMPAIGN_GENITAL_DICE_SOUND_SRC = "audio/orgao-genital.mp3";

/* =========================================================
   SOM DO DADO DE ÓRGÃO GENITAL
   Funciona em todos os sistemas usando Web Audio API.
========================================================= */
function isCampaignDiceGenitalRollButton(button) {
  if (!button) return false;

  const label = String(button.dataset?.diceLabel || "").toLowerCase();

  return (
    button.classList.contains("campaign-dice-genital-size-btn") ||
    Boolean(button.closest("[data-dice-genital-size-box]")) ||
    label.includes("órgão genital") ||
    label.includes("orgao genital")
  );
}

function playCampaignGenitalDiceSound() {
  playCampaignGenitalDiceCustomAudio()
    .catch(() => {
      playCampaignGenitalDiceGeneratedSound();
    });
}

async function playCampaignGenitalDiceCustomAudio() {
  if (!CAMPAIGN_GENITAL_DICE_SOUND_SRC) {
    throw new Error("Som próprio não configurado.");
  }

  const audio = new Audio(CAMPAIGN_GENITAL_DICE_SOUND_SRC);
  audio.volume = 0.85;
  audio.currentTime = 0;

  await audio.play();
}

function playCampaignGenitalDiceGeneratedSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext =
      window.campaignLabGenitalDiceAudioContext ||
      new AudioContextClass();

    window.campaignLabGenitalDiceAudioContext = audioContext;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const now = audioContext.currentTime;

    playCampaignGenitalDiceTone(audioContext, now, 180, 0.09, "triangle", 0.09);
    playCampaignGenitalDiceTone(audioContext, now + 0.08, 260, 0.08, "sine", 0.07);
    playCampaignGenitalDiceTone(audioContext, now + 0.15, 120, 0.11, "square", 0.035);
  } catch (error) {
    console.warn("Não foi possível tocar o som do dado especial.", error);
  }
}

function playCampaignGenitalDiceTone(audioContext, startTime, frequency, duration, type, volume) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(40, frequency * 0.72),
    startTime + duration
  );

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}


function ensureCampaignDiceGenitalSizeRoll(widget) {
  injectCampaignDiceGenitalSizeStyles();

  if (!widget || widget.querySelector("[data-dice-genital-size-box]")) return;

  const box = document.createElement("div");
  box.className = "campaign-dice-genital-size-box";
  box.dataset.diceGenitalSizeBox = "true";
  box.innerHTML = `
    <div>
      <span>Tamanho do órgão genital</span>
      <small>Rolagem simples 1d3</small>
    </div>

    <button
      type="button"
      class="campaign-dice-genital-size-btn"
      data-dice-formula="1d3"
      data-dice-label="Tamanho do órgão genital"
    >
      Rolar 1d3
    </button>
  `;

  const customForm = widget.querySelector("[data-dice-custom-form]");

  if (customForm) {
    const formulaCard =
      customForm.closest(".campaign-dice-custom-box") ||
      customForm.closest(".campaign-dice-custom-form") ||
      customForm.closest(".campaign-dice-form-box") ||
      customForm.closest("section") ||
      customForm;

    formulaCard.insertAdjacentElement("afterend", box);
    return;
  }

  const history = widget.querySelector("#campaignDiceHistory") || widget.querySelector("[data-dice-history]");

  if (history && history.parentNode) {
    history.parentNode.insertBefore(box, history);
    return;
  }

  const body = widget.querySelector(".campaign-dice-body");
  if (body) body.appendChild(box);
}


function ensureCampaignDicePrivacyToggle(widget) {
  if (!widget || widget.querySelector("[data-dice-hidden-toggle]")) return;

  const quickGrid = widget.querySelector(".campaign-dice-quick-grid");
  const form = widget.querySelector("[data-dice-custom-form]");
  const reference = form || quickGrid;

  const privacyBox = document.createElement("div");
  privacyBox.className = "campaign-dice-privacy-box";
  privacyBox.innerHTML = `
    <button
      type="button"
      class="campaign-dice-hidden-toggle"
      data-dice-hidden-toggle
      aria-pressed="false"
    >
      <span class="campaign-dice-hidden-toggle__icon">👁</span>
      <span class="campaign-dice-hidden-toggle__text">
        <strong>Rolagem aberta</strong>
        <small>Todos da mesa veem o resultado.</small>
      </span>
    </button>
  `;

  if (reference && reference.parentNode) {
    reference.parentNode.insertBefore(privacyBox, reference === form ? form : quickGrid.nextSibling);
    return;
  }

  const body = widget.querySelector(".campaign-dice-body");
  if (body) body.prepend(privacyBox);
}

function bindCampaignDiceRollerEvents(system) {
  const widget = document.getElementById("campaignDiceWidget");
  if (!widget || widget.dataset.diceReady === "true") return;

  widget.dataset.diceReady = "true";

  widget.addEventListener("click", async (event) => {
    const toggleButton = event.target.closest("[data-dice-toggle]");
    const hiddenToggle = event.target.closest("[data-dice-hidden-toggle]");
    const refreshButton = event.target.closest("[data-dice-refresh]");
    const rollButton = event.target.closest("[data-dice-formula]");

    if (toggleButton) {
      event.stopPropagation();
      const isOpen = !widget.classList.contains("campaign-dice-widget--open");
      setCampaignDiceWidgetOpen(widget, isOpen);
      return;
    }

    if (hiddenToggle) {
      event.preventDefault();
      event.stopPropagation();
      setCampaignDiceHiddenMode(!isCampaignDiceHiddenModeEnabled());
      updateCampaignDicePrivacyToggle(widget);
      return;
    }

    if (refreshButton) {
      event.stopPropagation();
      await renderCampaignDiceHistory();
      return;
    }

    if (rollButton) {
      event.stopPropagation();
      await handleCampaignDiceRoll({
        system,
        formula: rollButton.dataset.diceFormula,
        label: rollButton.dataset.diceLabel,
      });
    }
  });

  widget.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-dice-custom-form]");
    if (!form) return;

    event.preventDefault();
    event.stopPropagation();

    await handleCampaignDiceRoll({
      system,
      formula: form.elements.diceFormula.value,
      label: form.elements.diceLabel.value || "Rolagem personalizada",
    });
  });
}

function getCampaignDiceHiddenStorageKey() {
  const user = getLoggedUserFromSession();
  const campaignId = getCurrentCampaignId() || "sem-campanha";
  const userId = user && user.id ? user.id : "sem-usuario";

  return `campaign-lab-dice-hidden-mode-${campaignId}-${userId}`;
}

function isCampaignDiceHiddenModeEnabled() {
  return localStorage.getItem(getCampaignDiceHiddenStorageKey()) === "true";
}

function setCampaignDiceHiddenMode(enabled) {
  localStorage.setItem(getCampaignDiceHiddenStorageKey(), enabled ? "true" : "false");
}

function updateCampaignDicePrivacyToggle(widget = document.getElementById("campaignDiceWidget")) {
  if (!widget) return;

  const button = widget.querySelector("[data-dice-hidden-toggle]");
  if (!button) return;

  const enabled = isCampaignDiceHiddenModeEnabled();
  button.classList.toggle("is-hidden-mode", enabled);
  button.setAttribute("aria-pressed", enabled ? "true" : "false");

  const icon = button.querySelector(".campaign-dice-hidden-toggle__icon");
  const title = button.querySelector(".campaign-dice-hidden-toggle__text strong");
  const help = button.querySelector(".campaign-dice-hidden-toggle__text small");

  if (icon) icon.textContent = enabled ? "🙈" : "👁";
  if (title) title.textContent = enabled ? "Rolagem escondida" : "Rolagem aberta";
  if (help) help.textContent = enabled
    ? "Só você e o mestre veem o resultado."
    : "Todos da mesa veem o resultado.";
}

async function handleCampaignDiceRoll({ system, formula, label }) {
  const campaignId = getCurrentCampaignId();
  const user = getLoggedUserFromSession();

  if (!campaignId || !user || !formula) return;

  playCampaignDiceRollSound();

  const isHidden = isCampaignDiceHiddenModeEnabled();
  const isMaster = await isCurrentUserCampaignMaster();
  const context = getCampaignDiceContext(system);
  const result = rollCampaignDiceFormula(formula, context.variables, { system });

  if (!result.ok) {
    showCampaignDiceLocalResult({
      total: "--",
      label: label || "Erro na rolagem",
      formula,
      message: result.error || "Não consegui ler essa fórmula.",
      error: true,
      position: "right",
    });
    return;
  }

  const ownerHiddenMessage = isHidden
    ? "Rolagem escondida. Só você e o mestre veem este resultado."
    : result.summary;

  showCampaignDiceLocalResult({
    total: result.total,
    label: label || (isHidden ? "Rolagem escondida" : "Rolagem"),
    formula,
    message: ownerHiddenMessage,
    hidden: isHidden,
    position: isMaster ? "left" : "right",
  });

  const row = {
    campaign_id: String(campaignId),
    user_id: String(user.id),
    system,
    character_name: isMaster ? "Mestre" : (context.characterName || user.nome || user.name || user.id),
    roll_label: label || "Rolagem",
    roll_formula: formula,
    total: result.total,
    details: {
      summary: result.summary,
      parts: result.parts,
      variables: result.usedVariables,
      resolvedFormula: result.resolvedFormula,
      hidden: isHidden,
      isHidden: isHidden,
      visibility: isHidden ? "owner-master" : "table",
      rollOwnerId: String(user.id),
    },
  };

  const { error } = await DB.from("dice_rolls").insert(row);

  if (error) {
    console.error("Erro ao salvar rolagem:", error);
    showCampaignDiceLocalResult({
      total: result.total,
      label: label || "Rolagem feita, mas não salva",
      formula,
      message: "A rolagem funcionou, mas a tabela dice_rolls ainda não está criada no Supabase.",
      error: true,
      hidden: isHidden,
      position: isMaster ? "left" : "right",
    });
    return;
  }

  await renderCampaignDiceHistory();
}
function showCampaignDiceLocalResult({
  total,
  label,
  formula,
  message,
  error = false,
  hidden = false,
  position = "right",
}) {
  const resultBox = document.getElementById("campaignDiceLastResult");

  showCampaignDiceFloatingResult({
    total,
    label,
    formula,
    message,
    error,
    hidden,
    position,
  });

  if (!resultBox) return;

  resultBox.classList.toggle("campaign-dice-last-result--error", Boolean(error));
  resultBox.classList.toggle("campaign-dice-last-result--hidden", Boolean(hidden));
  resultBox.innerHTML = `
    <span>${escapeHtml(label || "Resultado")}</span>
    <strong>${escapeHtml(total)}</strong>
    <p>${escapeHtml(formula || "")} ${message ? `• ${escapeHtml(message)}` : ""}</p>
  `;
}

function showCampaignDiceFloatingResult({
  total,
  label,
  formula,
  message,
  error = false,
  characterName = "",
  hidden = false,
  position = "right",
}) {
  const layer = getCampaignDiceToastLayer(position);
  if (!layer) return;

  const toast = document.createElement("article");
  toast.className = `campaign-dice-toast${error ? " campaign-dice-toast--error" : ""}${hidden ? " campaign-dice-toast--hidden" : ""}`;

  toast.innerHTML = `
    <div class="campaign-dice-toast-content">
      <div class="campaign-dice-toast-info">
        <span>${escapeHtml(characterName || label || "Resultado")}</span>
        <strong>${hidden ? "🔒 " : ""}${escapeHtml(label || "Rolagem")}</strong>
        <code>${escapeHtml(formula || "")}</code>
        ${message ? `<p>${escapeHtml(message)}</p>` : ""}
      </div>

      <div class="campaign-dice-toast-total">
        ${escapeHtml(total)}
      </div>
    </div>
  `;

  layer.prepend(toast);

  requestAnimationFrame(() => {
    toast.classList.add("campaign-dice-toast--visible");
  });

  const removeToast = () => {
    toast.classList.remove("campaign-dice-toast--visible");
    window.setTimeout(() => toast.remove(), 260);
  };

  window.setTimeout(removeToast, 5000);
}

function getCampaignDiceToastLayer(position = "right") {
  const safePosition = position === "left" ? "left" : "right";
  const layerId = safePosition === "left" ? "campaignDiceToastLayerLeft" : "campaignDiceToastLayerRight";

  let layer = document.getElementById(layerId);

  if (layer) return layer;

  layer = document.createElement("div");
  layer.id = layerId;
  layer.className = `campaign-dice-toast-layer campaign-dice-toast-layer--${safePosition}`;
  document.body.appendChild(layer);

  return layer;
}

async function renderCampaignDiceHistory() {
  const history = document.getElementById("campaignDiceHistory");
  const campaignId = getCurrentCampaignId();
  const user = getLoggedUserFromSession();
  const currentUserId = user && user.id ? String(user.id) : "";

  if (!history || !campaignId || !DB) return;

  const isMaster = await isCurrentUserCampaignMaster();

  const { data, error } = await DB
    .from("dice_rolls")
    .select("id, campaign_id, user_id, system, character_name, roll_label, roll_formula, total, details, created_at")
    .eq("campaign_id", String(campaignId))
    .order("created_at", { ascending: false })
    .limit(35);

  if (error) {
    console.error("Erro ao carregar rolagens:", error);
    history.innerHTML = `
      <div class="campaign-dice-empty campaign-dice-empty--error">
        Crie a tabela dice_rolls no Supabase para ativar o histórico.
      </div>
    `;
    return;
  }

  const visibleRows = (data || []).filter((row) => {
    return canCurrentUserSeeCampaignDiceRow(row, isMaster, currentUserId);
  }).slice(0, 20);

  if (!visibleRows.length) {
    history.innerHTML = `
      <div class="campaign-dice-empty">
        Nenhuma rolagem visível ainda.
      </div>
    `;
    return;
  }

  history.innerHTML = visibleRows
    .map((row) => renderCampaignDiceHistoryItem(row, isMaster, currentUserId))
    .join("");
}

function renderCampaignDiceHistoryItem(row, isMaster = false, currentUserId = "") {
  const details = getCampaignDiceRowDetails(row);
  const isHidden = isCampaignDiceRowHidden(row);
  const isOwnRoll = isCampaignDiceRowOwner(row, currentUserId);
  const date = row.created_at ? new Date(row.created_at) : null;
  const time = date
    ? date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const hiddenBadge = isHidden
    ? `${isOwnRoll && !isMaster ? "🔒 Sua rolagem escondida" : "🔒 Escondida"} • `
    : "";

  return `
    <article class="campaign-dice-history-item${isHidden ? " campaign-dice-history-item--hidden" : ""}">
      <div class="campaign-dice-history-top">
        <strong>${escapeHtml(row.character_name || "Jogador")}</strong>
        <span>${hiddenBadge}${escapeHtml(time)}</span>
      </div>

      <div class="campaign-dice-history-middle">
        <div>
          <p>${isHidden ? "🔒 " : ""}${escapeHtml(row.roll_label || "Rolagem")}</p>
          <code>${escapeHtml(row.roll_formula || "")}</code>
        </div>

        <b>${escapeHtml(row.total)}</b>
      </div>

      <small>${escapeHtml(details.summary || "")}</small>
    </article>
  `;
}
function subscribeDiceRollsRealtime() {
  const campaignId = getCurrentCampaignId();

  if (!campaignId || !DB) return;

  if (diceRealtimeChannel) DB.removeChannel(diceRealtimeChannel);

  diceRealtimeChannel = DB
    .channel(`dice-rolls-${campaignId}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "dice_rolls", filter: `campaign_id=eq.${campaignId}` },
      async (payload) => {
        await renderCampaignDiceHistory();

        if (payload.eventType === "INSERT" && payload.new) {
          await showCampaignDiceRealtimeResult(payload.new);
        }
      }
    )
    .subscribe();
}

async function showCampaignDiceRealtimeResult(row) {
  const user = getLoggedUserFromSession();
  const isMaster = await isCurrentUserCampaignMaster();
  const isHidden = isCampaignDiceRowHidden(row);
  const rowUserId = getCampaignDiceRowOwnerId(row);
  const currentUserId = user && user.id ? String(user.id) : "";
  const isOwnRoll = currentUserId && rowUserId === currentUserId;

  if (isHidden && !isMaster && !isOwnRoll) return;
  if (isOwnRoll) return;

  const details = getCampaignDiceRowDetails(row);
  const position = isMaster || document.body.classList.contains("altherium-page") || document.body.classList.contains("dnd-master-page")
    ? "left"
    : "left";

  showCampaignDiceFloatingResult({
    total: row.total,
    label: row.roll_label || "Rolagem",
    formula: row.roll_formula || "",
    message: isHidden ? "Rolagem escondida. Só o jogador e o mestre podem ver." : details.summary || "",
    characterName: row.character_name || "Jogador",
    hidden: isHidden,
    position,
  });
}
function getCampaignDiceRowDetails(row) {
  if (!row || !row.details) return {};

  if (typeof row.details === "string") {
    try {
      return JSON.parse(row.details) || {};
    } catch (error) {
      return {};
    }
  }

  return row.details || {};
}

function getCampaignDiceRowOwnerId(row) {
  const details = getCampaignDiceRowDetails(row);

  return String(
    (row && row.user_id) ||
      details.rollOwnerId ||
      details.ownerId ||
      details.playerId ||
      ""
  );
}

function isCampaignDiceRowOwner(row, userId) {
  if (!row || !userId) return false;

  return getCampaignDiceRowOwnerId(row) === String(userId);
}

function canCurrentUserSeeCampaignDiceRow(row, isMaster = false, currentUserId = "") {
  if (!isCampaignDiceRowHidden(row)) return true;
  if (isMaster) return true;

  return isCampaignDiceRowOwner(row, currentUserId);
}

function isCampaignDiceRowHidden(row) {
  const details = getCampaignDiceRowDetails(row);
  const visibility = String(details.visibility || "").toLowerCase();

  return Boolean(
    details.hidden === true ||
      details.isHidden === true ||
      visibility === "master" ||
      visibility === "hidden" ||
      visibility === "gm" ||
      visibility === "owner-master" ||
      visibility === "owner_master" ||
      visibility === "private"
  );
}
async function isCurrentUserCampaignMaster() {
  const user = getLoggedUserFromSession();

  if (
    document.body.classList.contains("altherium-page") ||
    document.body.classList.contains("dnd-master-page")
  ) {
    return true;
  }

  const profile = String(sessionStorage.getItem("profile") || sessionStorage.getItem("perfil") || "").toLowerCase();
  if (profile === "mestre") return true;

  if (!user) return false;

  const campaign = await getCurrentCampaign(false);
  if (!campaign) return false;

  return String(campaign.mestreId || campaign.master_id || "") === String(user.id || "");
}


/* =========================================================
   PATCH - FALLBACK DO ROLADOR DE DADOS
   Garante que abrir/fechar, dados rápidos e formulário funcionem
   mesmo se o listener interno do widget falhar.
========================================================= */

function setupCampaignDiceGlobalFallback() {
  if (window.campaignDiceGlobalFallbackReady) return;

  window.campaignDiceGlobalFallbackReady = true;

  document.addEventListener(
    "click",
    async (event) => {
      const widget = event.target.closest("#campaignDiceWidget");
      if (!widget) return;

      const toggleButton = event.target.closest("[data-dice-toggle]");
      const hiddenToggle = event.target.closest("[data-dice-hidden-toggle]");
      const refreshButton = event.target.closest("[data-dice-refresh]");
      const rollButton = event.target.closest("[data-dice-formula]");

      if (!toggleButton && !hiddenToggle && !refreshButton && !rollButton) return;

      stopCampaignDiceDuplicateEvent(event);

      const system = getCampaignDiceFallbackSystem(widget);

      if (toggleButton) {
        const isOpen = !widget.classList.contains("campaign-dice-widget--open");

        if (typeof setCampaignDiceWidgetOpen === "function") {
          setCampaignDiceWidgetOpen(widget, isOpen);
        } else {
          widget.classList.toggle("campaign-dice-widget--open", isOpen);
          widget.classList.toggle("campaign-dice-widget--modal", isOpen);
          document.body.classList.toggle("campaign-dice-modal-open", isOpen);
          toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }

        return;
      }

      if (hiddenToggle) {
        if (typeof setCampaignDiceHiddenMode === "function") {
          setCampaignDiceHiddenMode(!isCampaignDiceHiddenModeEnabled());
        }

        if (typeof updateCampaignDicePrivacyToggle === "function") {
          updateCampaignDicePrivacyToggle(widget);
        }

        return;
      }

      if (refreshButton) {
        if (typeof renderCampaignDiceHistory === "function") {
          await renderCampaignDiceHistory();
        }

        return;
      }

      if (rollButton) {
        if (isCampaignDiceGenitalRollButton(rollButton)) {
          playCampaignGenitalDiceSound();
        }

        await handleCampaignDiceRoll({
          system,
          formula: rollButton.dataset.diceFormula,
          label: rollButton.dataset.diceLabel,
        });
      }
    },
    true
  );

  document.addEventListener(
    "submit",
    async (event) => {
      const form = event.target.closest("#campaignDiceWidget [data-dice-custom-form]");
      if (!form) return;

      stopCampaignDiceDuplicateEvent(event);

      const widget = form.closest("#campaignDiceWidget");
      const system = getCampaignDiceFallbackSystem(widget);

      await handleCampaignDiceRoll({
        system,
        formula: form.elements.diceFormula ? form.elements.diceFormula.value : "",
        label:
          form.elements.diceLabel && form.elements.diceLabel.value
            ? form.elements.diceLabel.value
            : "Rolagem personalizada",
      });
    },
    true
  );
}

function stopCampaignDiceDuplicateEvent(event) {
  event.preventDefault();
  event.stopPropagation();

  if (typeof event.stopImmediatePropagation === "function") {
    event.stopImmediatePropagation();
  }
}

function getCampaignDiceFallbackSystem(widget) {
  return (
    (widget && widget.dataset && widget.dataset.diceSystem) ||
    sessionStorage.getItem("system") ||
    document.body.dataset.system ||
    "Altherium"
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupCampaignDiceGlobalFallback);
} else {
  setupCampaignDiceGlobalFallback();
}
