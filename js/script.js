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

const DND_ALTHERIUM_BACKGROUND_OPTIONS = [
  {
    key: "",
    value: "",
    label: "Selecione o antecedente",
    description: "Escolha um passado de Altherium para aplicar perícias e traços automáticos na ficha de D&D.",
    skills: [],
    feature: "",
  },
  {
    key: "cacador",
    value: "Caçador",
    label: "Caçador",
    skills: ["skillStealth", "skillPerception"],
    feature: "Adiciona +1d4 no acerto em armas à distância.",
  },
  {
    key: "curandeiro",
    value: "Curandeiro",
    label: "Curandeiro",
    skills: ["skillMedicine", "skillNature"],
    feature: "Adiciona +1d10 na cura.",
  },
  {
    key: "determinado",
    value: "Determinado",
    label: "Determinado",
    skills: ["skillAthletics", "skillInsight"],
    feature: "Adiciona +1d10 em testes ligados a equilíbrio, firmeza mental ou resistência narrativa.",
  },
  {
    key: "devoto",
    value: "Devoto",
    label: "Devoto",
    skills: ["skillReligion", "skillPersuasion"],
    feature: "Pode usar Religião no lugar de qualquer teste social quando a cena envolver fé, culto, juramento ou autoridade espiritual.",
  },
  {
    key: "filho_de_mercante",
    value: "Filho de mercante",
    label: "Filho de mercante",
    skills: ["skillPersuasion", "skillInsight"],
    equipment: "¤800 Hacksilvers adicionais na criação do personagem.",
    feature: "Começa com ¤800 Hacksilvers adicionais e tem facilidade em negociações, barganhas e leitura de acordos.",
  },
  {
    key: "guerreiro",
    value: "Guerreiro",
    label: "Guerreiro",
    skills: ["skillAthletics", "skillIntimidation"],
    feature: "Adiciona +1d4 no acerto em armas corpo a corpo.",
  },
  {
    key: "guia_espiritual",
    value: "Guia espiritual",
    label: "Guia espiritual",
    skills: ["skillInsight", "skillReligion"],
    feature: "Adiciona +1d10 na cura do equilíbrio e em cenas de orientação espiritual definidas pelo mestre.",
  },
  {
    key: "corredor",
    value: "Corredor",
    label: "Corredor",
    skills: ["skillAcrobatics", "skillAthletics"],
    speed: "+5m [Antecedente: Corredor]",
    feature: "Tem +5m de movimento no deslocamento.",
  },
  {
    key: "peregrino",
    value: "Peregrino",
    label: "Peregrino",
    skills: ["skillSurvival", "skillNature"],
    feature: "Pode recuperar +1d10 em todos os pontos básicos em cenas de descanso, conforme aprovação do mestre.",
  },
  {
    key: "rastreador",
    value: "Rastreador",
    label: "Rastreador",
    skills: ["skillInvestigation", "skillPerception"],
    feature: "Recebe +1d10 em testes de investigação.",
  },
  {
    key: "robusto",
    value: "Robusto",
    label: "Robusto",
    skills: ["skillAthletics", "skillSurvival"],
    feature: "Consegue +1 de DB em todas as partes do corpo quando a mesa usar a regra de DB de Altherium.",
  },
  {
    key: "sem_passado",
    value: "Sem passado",
    label: "Sem passado",
    skills: [],
    feature: "O mestre define a habilidade do antecedente.",
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

const DND_SAVE_CONFIG = [
  { ab: "Str", key: "str", label: "Força", score: "strScore", field: "saveStr" },
  { ab: "Dex", key: "dex", label: "Destreza", score: "dexScore", field: "saveDex" },
  { ab: "Con", key: "con", label: "Constituição", score: "conScore", field: "saveCon" },
  { ab: "Int", key: "int", label: "Inteligência", score: "intScore", field: "saveInt" },
  { ab: "Wis", key: "wis", label: "Sabedoria", score: "wisScore", field: "saveWis" },
  { ab: "Cha", key: "cha", label: "Carisma", score: "chaScore", field: "saveCha" },
];

const DND_SKILL_META = {
  skillAcrobatics: { ability: "dex", abilityLabel: "DES" },
  skillAnimalHandling: { ability: "wis", abilityLabel: "SAB" },
  skillArcana: { ability: "int", abilityLabel: "INT" },
  skillAthletics: { ability: "str", abilityLabel: "FOR" },
  skillDeception: { ability: "cha", abilityLabel: "CAR" },
  skillHistory: { ability: "int", abilityLabel: "INT" },
  skillInsight: { ability: "wis", abilityLabel: "SAB" },
  skillIntimidation: { ability: "cha", abilityLabel: "CAR" },
  skillInvestigation: { ability: "int", abilityLabel: "INT" },
  skillMedicine: { ability: "wis", abilityLabel: "SAB" },
  skillNature: { ability: "int", abilityLabel: "INT" },
  skillPerception: { ability: "wis", abilityLabel: "SAB" },
  skillPerformance: { ability: "cha", abilityLabel: "CAR" },
  skillPersuasion: { ability: "cha", abilityLabel: "CAR" },
  skillReligion: { ability: "int", abilityLabel: "INT" },
  skillSleightOfHand: { ability: "dex", abilityLabel: "DES" },
  skillStealth: { ability: "dex", abilityLabel: "DES" },
  skillSurvival: { ability: "wis", abilityLabel: "SAB" },
};

const DND_OFFICIAL_CLASS_OPTIONS = [
  "Artífice",
  "Bárbaro",
  "Bardo",
  "Bruxo",
  "Clérigo",
  "Druida",
  "Feiticeiro",
  "Guerreiro",
  "Ladino",
  "Mago",
  "Monge",
  "Paladino",
  "Patrulheiro",
];

function normalizeCampaignLabDndText(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getCampaignLabDndClassOptions() {
  const systemClasses =
    typeof DND5E !== "undefined" && DND5E && DND5E.classes
      ? Object.keys(DND5E.classes)
      : [];

  return Array.from(new Set([...DND_OFFICIAL_CLASS_OPTIONS, ...systemClasses]));
}

function resolveCampaignLabDndClassName(value = "") {
  const normalized = normalizeCampaignLabDndText(value);
  if (!normalized) return "";

  return (getCampaignLabDndClassOptions() || []).find((className) => {
    const current = normalizeCampaignLabDndText(className);
    return current === normalized || normalized.startsWith(`${current} `);
  }) || "";
}

function extractCampaignLabDndLevel(value = "") {
  const match = String(value || "").match(/(?:^|\s)([1-9]|1[0-9]|20)(?:\s|$)/);
  return match ? String(match[1]) : "1";
}

function getCampaignLabDndSheetClassName(sheet = {}) {
  return sheet.className || resolveCampaignLabDndClassName(sheet.classLevel || "") || "";
}

function getCampaignLabDndSheetLevel(sheet = {}) {
  const rawLevel = Number(sheet.charLevel || 0);
  if (Number.isFinite(rawLevel) && rawLevel >= 1) {
    return String(Math.max(1, Math.min(20, Math.floor(rawLevel))));
  }

  return extractCampaignLabDndLevel(sheet.classLevel || "");
}

function getCampaignLabDndProficiencyBonus(levelValue = 1) {
  const level = Math.max(1, Math.min(20, Math.floor(Number(levelValue) || 1)));

  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

function formatCampaignLabDndBonus(value = 0) {
  const number = Number(value) || 0;
  return number >= 0 ? `+${number}` : String(number);
}


function campaignLabDndFormatMeterValue(value = 0) {
  const number = Number(value) || 0;
  const rounded = Math.round(number * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');
  return `${text} m`;
}

function campaignLabDndMetersFromFeet(feet = 0) {
  return campaignLabDndFormatMeterValue((Number(feet) || 0) * 0.3);
}

function campaignLabDndConvertFeetTextToMeters(value = "") {
  return String(value || "")
    .replace(/5\s*[×x]\s*30\s*ft\.?/gi, "1,5 × 9 m")
    .replace(/10\s*ft\.?\s*\(30\s*ft\.?\s*ao nível 18\)/gi, "3 m (9 m ao nível 18)")
    .replace(/120\s*ft\.?/gi, "36 m")
    .replace(/60\s*ft\.?/gi, "18 m")
    .replace(/40\s*ft\.?/gi, "12 m")
    .replace(/30\s*ft\.?/gi, "9 m")
    .replace(/15\s*ft\.?/gi, "4,5 m")
    .replace(/10\s*ft\.?/gi, "3 m")
    .replace(/5\s*ft\.?/gi, "1,5 m");
}

function getCampaignLabDndClassLevelLabel(sheet = {}) {
  const className = getCampaignLabDndSheetClassName(sheet);
  const level = getCampaignLabDndSheetLevel(sheet);

  if (className) return `${className} ${level}`;
  return sheet.classLevel || "Sem classe";
}

function normalizeCampaignLabDndClassData(data = {}) {
  const className = data.className || resolveCampaignLabDndClassName(data.classLevel || "");
  const charLevel = data.charLevel || extractCampaignLabDndLevel(data.classLevel || "");
  const safeLevel = String(Math.max(1, Math.min(20, Math.floor(Number(charLevel) || 1))));
  const classLevel = className ? `${className} ${safeLevel}` : data.classLevel || "";
  const proficiencyBonus = formatCampaignLabDndBonus(getCampaignLabDndProficiencyBonus(safeLevel));

  const normalized = {
    ...data,
    className,
    charLevel: safeLevel,
    classLevel,
    proficiencyBonus,
  };

  // MIGRAÇÃO DO PADRÃO ANTIGO:
  // Antes a ficha nascia com atributos 8, gerando vários -1 logo ao abrir.
  // Agora toda ficha nova nasce neutra: atributos 10, testes/perícias 0.
  // Para não ficar preso em fichas antigas salvas no Supabase, esta limpeza roda uma vez.
  const neutralDefaultAlreadyApplied = dnd_bool(normalized.dndNeutralDefaultApplied);
  const abilityFields = ["strScore", "dexScore", "conScore", "intScore", "wisScore", "chaScore"];
  const saveFields = ["saveStr", "saveDex", "saveCon", "saveInt", "saveWis", "saveCha"];
  const skillFields = DND_SKILLS.map(([key]) => key);
  const finalBonusFields = [...saveFields, ...skillFields];
  const manualFields = [
    "saveStrManual", "saveDexManual", "saveConManual", "saveIntManual", "saveWisManual", "saveChaManual",
    ...skillFields.map((key) => `${key}Manual`),
  ];

  const hasManualFinalBonus = manualFields.some((field) => dnd_bool(normalized[field]));
  const hasOldNegativeDefaults = finalBonusFields.some((field) => String(normalized[field] ?? "") === "-1");
  const hasEmptyIdentity = !String(normalized.characterName || "").trim();
  const looksLikeOldStarterSheet = !neutralDefaultAlreadyApplied && !hasManualFinalBonus && (hasOldNegativeDefaults || hasEmptyIdentity);

  if (looksLikeOldStarterSheet) {
    abilityFields.forEach((field) => {
      normalized[field] = "10";
    });

    finalBonusFields.forEach((field) => {
      normalized[field] = "0";
      normalized[`${field}Manual`] = "false";
    });

    if (String(normalized.initiative ?? "") === "-1" || String(normalized.initiative ?? "") === "") {
      normalized.initiative = "0";
    }

    normalized.dndNeutralDefaultApplied = "true";
  } else if (!neutralDefaultAlreadyApplied) {
    normalized.dndNeutralDefaultApplied = "true";
  }

  return normalized;
}

function syncCampaignLabDndClassFieldsInForm(form) {
  if (!form) return;

  const classSelect = form.elements.className;
  const levelInput = form.elements.charLevel;
  const legacyInput = form.elements.classLevel;

  if (classSelect && legacyInput && !classSelect.value && legacyInput.value) {
    const resolvedClass = resolveCampaignLabDndClassName(legacyInput.value);
    if (resolvedClass) classSelect.value = resolvedClass;
  }

  if (levelInput && (!levelInput.value || Number(levelInput.value) <= 0)) {
    levelInput.value = extractCampaignLabDndLevel(legacyInput?.value || "");
  }

  const safeLevel = Math.max(1, Math.min(20, Math.floor(Number(levelInput?.value) || 1)));

  if (levelInput) {
    levelInput.value = String(safeLevel);
  }

  if (legacyInput && classSelect && classSelect.value) {
    legacyInput.value = `${classSelect.value} ${safeLevel}`;
  }

  if (form.elements.proficiencyBonus) {
    form.elements.proficiencyBonus.value = formatCampaignLabDndBonus(getCampaignLabDndProficiencyBonus(safeLevel));
  }
}


let profilesCache = [];
let campaignsCache = [];
let realtimeChannel = null;
let diceRealtimeChannel = null;
let campaignPresenceChannel = null;
let campaignChatRealtimeChannel = null;
let campaignAddedNotificationChannel = null;
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
  setupRunaskinsExtinctionMode();
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

  if (user) {
    await setupCampaignAddedNotifications();
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
    // D&D jogador: rolador de dados lateral removido por pedido.
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
   NOTIFICAÇÕES DE CAMPANHA ADICIONADA / REMOVIDA
========================================================= */

async function createCampaignMemberNotifications(
  campaign,
  playerIds = [],
  masterUser = null,
  notificationType = "campaign_added"
) {
  if (!DB || !campaign || !Array.isArray(playerIds) || !playerIds.length) return;

  const uniquePlayerIds = [...new Set(playerIds.map((id) => String(id || "").trim()).filter(Boolean))];
  const master = masterUser || getLoggedUserFromSession() || {};

  if (!uniquePlayerIds.length) return;

  const profiles = await getProfiles(true).catch(() => []);

  const rows = uniquePlayerIds.map((playerId) => {
    const profile = profiles.find((item) => String(item.id) === String(playerId));

    return {
      recipient_user_id: playerId,
      recipient_user_name: profile?.name || playerId,
      campaign_id: String(campaign.id || ""),
      campaign_name: campaign.nome || campaign.name || "Campanha",
      campaign_system: campaign.sistema || campaign.system || "Sistema",
      master_id: master.id || campaign.mestreId || campaign.master_id || "",
      master_name: master.nome || master.name || "Mestre",
      notification_type: notificationType,
    };
  });

  const { error } = await DB.from("campaign_added_notifications").insert(rows);

  if (error) {
    console.warn("Não foi possível criar notificação de campanha:", error);
  }
}

async function createCampaignAddedNotifications(campaign, playerIds = [], masterUser = null) {
  await createCampaignMemberNotifications(campaign, playerIds, masterUser, "campaign_added");
}

async function createCampaignRemovedNotifications(campaign, playerIds = [], masterUser = null) {
  await createCampaignMemberNotifications(campaign, playerIds, masterUser, "campaign_removed");
}

async function setupCampaignAddedNotifications() {
  if (!DB || window.campaignAddedNotificationsReady) return;

  const user = getLoggedUserFromSession();
  if (!user) return;

  window.campaignAddedNotificationsReady = true;

  await loadCampaignAddedNotifications(user.id);
  subscribeCampaignAddedNotifications(user.id);
}

async function loadCampaignAddedNotifications(userId) {
  const { data, error } = await DB
    .from("campaign_added_notifications")
    .select("id, campaign_id, campaign_name, campaign_system, master_name, notification_type, read_at, created_at")
    .eq("recipient_user_id", userId)
    .is("read_at", null)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.warn("Não foi possível carregar notificações de campanha:", error);
    return;
  }

  (data || []).reverse().forEach((notification) => {
    showCampaignAddedNotification(notification, { playSound: false });
  });
}

function subscribeCampaignAddedNotifications(userId) {
  if (!DB || campaignAddedNotificationChannel) return;

  campaignAddedNotificationChannel = DB.channel(`campaign-added-notifications-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "campaign_added_notifications",
        filter: `recipient_user_id=eq.${userId}`,
      },
      (payload) => {
        const notification = payload.new;
        if (!notification || notification.read_at) return;
        showCampaignAddedNotification(notification, { playSound: true });
      }
    )
    .subscribe();
}

function isCampaignLabNotificationMobileViewport() {
  const visualWidth = window.visualViewport && window.visualViewport.width
    ? window.visualViewport.width
    : 0;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || screen.width || 0;
  const width = visualWidth || windowWidth;
  const isTouch = Number(navigator.maxTouchPoints || 0) > 0;

  return width <= 1024 || (isTouch && width <= 1180);
}

function getCampaignAddedNotificationStack() {
  let stack = document.getElementById("campaignAddedNotificationStack");

  if (stack) {
    applyCampaignAddedNotificationResponsivePosition(stack);
    return stack;
  }

  stack = document.createElement("div");
  stack.id = "campaignAddedNotificationStack";
  stack.className = "campaign-added-notification-stack";
  document.body.appendChild(stack);

  applyCampaignAddedNotificationResponsivePosition(stack);
  setupCampaignAddedNotificationPositionWatcher();

  return stack;
}

function setupCampaignAddedNotificationPositionWatcher() {
  if (window.campaignAddedNotificationPositionWatcherReady) return;

  window.campaignAddedNotificationPositionWatcherReady = true;

  const refreshPosition = () => {
    const stack = document.getElementById("campaignAddedNotificationStack");
    if (stack) applyCampaignAddedNotificationResponsivePosition(stack);
  };

  window.addEventListener("resize", refreshPosition);
  window.addEventListener("orientationchange", refreshPosition);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", refreshPosition);
  }
}

function applyCampaignAddedNotificationResponsivePosition(stack) {
  if (!stack) return;

  const isMobileOrTablet = isCampaignLabNotificationMobileViewport();

  stack.style.setProperty("position", "fixed", "important");
  stack.style.setProperty("z-index", "99999", "important");
  stack.style.setProperty("display", "flex", "important");
  stack.style.setProperty("flex-direction", "column", "important");
  stack.style.setProperty("gap", "12px", "important");
  stack.style.setProperty("pointer-events", "none", "important");

  if (isMobileOrTablet) {
    stack.classList.add("campaign-added-notification-stack--mobile-top");
    stack.style.setProperty("top", "max(12px, env(safe-area-inset-top))", "important");
    stack.style.setProperty("right", "12px", "important");
    stack.style.setProperty("bottom", "auto", "important");
    stack.style.setProperty("left", "12px", "important");
    stack.style.setProperty("width", "auto", "important");
    stack.style.setProperty("max-width", "none", "important");
    stack.style.setProperty("transform", "none", "important");
    stack.style.setProperty("align-items", "stretch", "important");
    return;
  }

  stack.classList.remove("campaign-added-notification-stack--mobile-top");
  stack.style.setProperty("top", "50%", "important");
  stack.style.setProperty("right", "22px", "important");
  stack.style.setProperty("bottom", "auto", "important");
  stack.style.setProperty("left", "auto", "important");
  stack.style.setProperty("width", "min(380px, calc(100vw - 32px))", "important");
  stack.style.setProperty("max-width", "none", "important");
  stack.style.setProperty("transform", "translateY(-50%)", "important");
  stack.style.setProperty("align-items", "stretch", "important");
}

function showCampaignAddedNotification(notification, options = {}) {
  if (!notification) return;

  const stack = getCampaignAddedNotificationStack();
  applyCampaignAddedNotificationResponsivePosition(stack);
  const notificationId = String(notification.id || "");

  if (notificationId && stack.querySelector(`[data-campaign-added-notification-id="${CSS.escape(notificationId)}"]`)) {
    return;
  }

  const isRemoved = notification.notification_type === "campaign_removed";
  const card = document.createElement("article");
  card.className = `campaign-added-notification${isRemoved ? " campaign-added-notification--removed" : ""}`;
  card.dataset.campaignAddedNotificationId = notificationId;

  const campaignName = notification.campaign_name || "Campanha";
  const campaignSystem = notification.campaign_system || "Sistema";
  const masterName = notification.master_name || "Mestre";
  const title = isRemoved
    ? "Você foi removido de uma campanha"
    : "Você foi adicionado a uma campanha";
  const icon = isRemoved ? "−" : "✦";
  const buttonText = isRemoved ? "Entendi" : "Ver minhas campanhas";

  card.innerHTML = `
    <button type="button" class="campaign-added-notification__close" aria-label="Fechar notificação">×</button>

    <div class="campaign-added-notification__icon">${icon}</div>

    <div class="campaign-added-notification__content">
      <span>${escapeHtml(title)}</span>
      <strong>${escapeHtml(campaignName)}</strong>
      <p>
        Sistema: <b>${escapeHtml(campaignSystem)}</b><br />
        Mestre: <b>${escapeHtml(masterName)}</b>
      </p>

      <button type="button" class="campaign-added-notification__action">
        ${buttonText}
      </button>
    </div>
  `;

  const closeButton = card.querySelector(".campaign-added-notification__close");
  const actionButton = card.querySelector(".campaign-added-notification__action");

  const autoCloseTimer = window.setTimeout(async () => {
    if (!card.isConnected) return;

    await markCampaignAddedNotificationAsRead(notificationId);
    removeCampaignAddedNotificationCard(card);
  }, 5000);

  closeButton?.addEventListener("click", async (event) => {
    event.stopPropagation();
    window.clearTimeout(autoCloseTimer);
    await markCampaignAddedNotificationAsRead(notificationId);
    removeCampaignAddedNotificationCard(card);
  });

  actionButton?.addEventListener("click", async (event) => {
    event.stopPropagation();
    window.clearTimeout(autoCloseTimer);
    await markCampaignAddedNotificationAsRead(notificationId);
    removeCampaignAddedNotificationCard(card);
    if (!isRemoved) {
      window.location.href = "minhas-campanhas.html";
    }
  });

  card.addEventListener("click", async () => {
    window.clearTimeout(autoCloseTimer);
    await markCampaignAddedNotificationAsRead(notificationId);
    removeCampaignAddedNotificationCard(card);
    if (!isRemoved) {
      window.location.href = "minhas-campanhas.html";
    }
  });

  stack.appendChild(card);

  requestAnimationFrame(() => {
    card.classList.add("show");
  });

  if (options.playSound) {
    playCampaignAddedNotificationSound();
  }
}

async function markCampaignAddedNotificationAsRead(notificationId) {
  if (!DB || !notificationId) return;

  const { error } = await DB
    .from("campaign_added_notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId);

  if (error) {
    console.warn("Não foi possível marcar notificação como lida:", error);
  }
}

function removeCampaignAddedNotificationCard(card) {
  if (!card) return;

  card.classList.remove("show");
  card.classList.add("hide");

  setTimeout(() => {
    card.remove();
  }, 240);
}

function playCampaignAddedNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const gain = audioContext.createGain();
    gain.gain.value = 0.055;
    gain.connect(audioContext.destination);

    const notes = [660, 880, 990];

    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);

      const start = audioContext.currentTime + index * 0.09;
      oscillator.start(start);
      oscillator.stop(start + 0.08);
    });

    setTimeout(() => audioContext.close(), 650);
  } catch (error) {
    console.warn("Som de notificação indisponível:", error);
  }
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

    await createCampaignAddedNotifications(
      { ...campaign, sistema: campaignSystem, system: campaignSystem },
      selectedPlayers,
      user
    );

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
          <div class="player-chat-recipient-hint" id="playerCampaignChatRecipientHint">
            Toda a mesa verá essa conversa.
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

  const recipientHint = document.getElementById("playerCampaignChatRecipientHint");

  const updateRecipientUi = () => {
    const recipient = getPlayerCampaignChatSelectedRecipient();
    const isPrivateTarget = Boolean(recipient);

    input.placeholder = isPrivateTarget
      ? `Mensagem privada para ${recipient.name}...`
      : "Digite sua mensagem para a mesa...";

    form.classList.toggle("player-chat-form--private-target", isPrivateTarget);

    if (recipientHint) {
      recipientHint.textContent = isPrivateTarget
        ? `Somente você e ${recipient.name} verão essa conversa.`
        : "Toda a mesa verá essa conversa.";
    }
  };

  if (recipientSelect) {
    recipientSelect.addEventListener("change", updateRecipientUi);
  }

  updateRecipientUi();
  setupPlayerCampaignChatMessageDeleteHandler(system);
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

  const selectedRecipient = getPlayerCampaignChatSelectedRecipient();
  const isSecretRunaskinsCommand = isRunaskinsExtinctionCommandText(message);
  const currentUserName = await getPlayerCampaignChatCurrentUserName();
  const recipient = isSecretRunaskinsCommand
    ? { id: String(user.id), name: currentUserName }
    : selectedRecipient;

  const row = {
    campaign_id: String(campaignId),
    system: system || sessionStorage.getItem("system") || "",
    user_id: String(user.id),
    user_name: currentUserName,
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

  handleRunaskinsExtinctionCommand(message);

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

  const allMessages = data || [];
  const visibleMessages = allMessages.filter(isPlayerCampaignChatMessageVisible);

  if (!options.skipRunaskinsCommandCheck) {
    checkRunaskinsExtinctionMessages(allMessages);
  }

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
    scrollPlayerCampaignChatToBottom({ smooth: false });
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
  const isSecretCommand = isRunaskinsExtinctionCommandText(row.message || "");
  const privateLabel = isPrivate ? getPlayerCampaignChatPrivateLabel(row, isMine) : "";
  const scopeBadge = isSecretCommand
    ? '<span class="player-chat-private-label">Comando secreto</span>'
    : isPrivate
      ? privateLabel
      : '<span class="player-chat-channel-label">Mesa inteira</span>';
  const deleteButton = canDeletePlayerCampaignChatMessage(row)
    ? `
      <button
        type="button"
        class="player-chat-message-delete"
        data-player-chat-delete-message="${escapeHtml(row.id || "")}" 
        title="Excluir mensagem"
        aria-label="Excluir mensagem"
      >×</button>
    `
    : "";

  return `
    <article class="player-chat-message ${isMine ? "mine" : ""} ${isPrivate ? "private" : ""} ${isSecretCommand ? "secret-command" : ""}" data-player-chat-message-id="${escapeHtml(row.id || "")}">
      ${renderPlayerCampaignChatAvatar(row)}
      <div class="player-chat-message-bubble">
        <div class="player-chat-message-meta">
          <strong>${escapeHtml(row.user_name || "Jogador")}</strong>
          <div class="player-chat-message-meta-actions">
            <span>${escapeHtml(time)}</span>
            ${deleteButton}
          </div>
        </div>
        <div class="player-chat-message-badges">
          ${scopeBadge}
        </div>
        <p>${formatPlayerCampaignChatText(row.message || "")}</p>
      </div>
    </article>
  `;
}

function canDeletePlayerCampaignChatMessage(row = {}) {
  const user = getLoggedUserFromSession();

  if (!user || !row || !row.id) return false;
  if (String(row.user_id) === String(user.id)) return true;

  return sessionStorage.getItem("profile") === "Mestre" || isMasterCampaignChatPage();
}

function setupPlayerCampaignChatMessageDeleteHandler(system = "") {
  if (window.playerCampaignChatDeleteHandlerReady) return;

  window.playerCampaignChatDeleteHandlerReady = true;

  document.addEventListener("click", async (event) => {
    const deleteButton = event.target.closest("[data-player-chat-delete-message]");

    if (!deleteButton) return;

    event.preventDefault();
    event.stopPropagation();

    const messageId = deleteButton.dataset.playerChatDeleteMessage;

    if (!messageId) return;

    await deletePlayerCampaignChatMessage(messageId, system, deleteButton);
  });
}

async function deletePlayerCampaignChatMessage(messageId, system = "", deleteButton = null) {
  const user = getLoggedUserFromSession();
  const campaignId = getCurrentCampaignId();

  if (!DB || !user || !campaignId || !messageId) return;

  if (!confirm("Excluir esta mensagem?")) return;

  const oldText = deleteButton ? deleteButton.textContent : "";

  if (deleteButton) {
    deleteButton.disabled = true;
    deleteButton.textContent = "…";
  }

  const isMaster = sessionStorage.getItem("profile") === "Mestre" || isMasterCampaignChatPage();
  let query = DB
    .from("campaign_messages")
    .delete()
    .eq("id", messageId)
    .eq("campaign_id", String(campaignId));

  if (!isMaster) {
    query = query.eq("user_id", String(user.id));
  }

  const { error } = await query;

  if (error) {
    console.error("Erro ao excluir mensagem:", error);
    alert("Não consegui excluir a mensagem. Verifique as permissões da tabela campaign_messages no Supabase.");

    if (deleteButton) {
      deleteButton.disabled = false;
      deleteButton.textContent = oldText || "×";
    }

    return;
  }

  await renderPlayerCampaignChat(system, {
    forceScroll: false,
    skipRunaskinsCommandCheck: true,
  });
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

  if (container) {
    applyPlayerCampaignChatNotificationResponsivePosition(container);
    return container;
  }

  container = document.createElement("div");
  container.id = "playerCampaignChatNotificationStack";
  container.className = "player-chat-notification-stack";
  container.setAttribute("aria-live", "polite");
  container.setAttribute("aria-atomic", "false");

  document.body.appendChild(container);

  applyPlayerCampaignChatNotificationResponsivePosition(container);
  setupPlayerCampaignChatNotificationPositionWatcher();

  return container;
}

function setupPlayerCampaignChatNotificationPositionWatcher() {
  if (window.playerCampaignChatNotificationPositionWatcherReady) return;

  window.playerCampaignChatNotificationPositionWatcherReady = true;

  const refreshPosition = () => {
    const container = document.getElementById("playerCampaignChatNotificationStack");
    if (container) applyPlayerCampaignChatNotificationResponsivePosition(container);
  };

  window.addEventListener("resize", refreshPosition);
  window.addEventListener("orientationchange", refreshPosition);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", refreshPosition);
  }
}

function applyPlayerCampaignChatNotificationResponsivePosition(container) {
  if (!container) return;

  const isMobileOrTablet = isCampaignLabNotificationMobileViewport();

  container.style.setProperty("position", "fixed", "important");
  container.style.setProperty("z-index", "99999", "important");
  container.style.setProperty("display", "grid", "important");
  container.style.setProperty("gap", "10px", "important");
  container.style.setProperty("pointer-events", "none", "important");

  if (isMobileOrTablet) {
    container.classList.add("player-chat-notification-stack--mobile-top");
    container.style.setProperty("top", "max(10px, env(safe-area-inset-top))", "important");
    container.style.setProperty("right", "10px", "important");
    container.style.setProperty("bottom", "auto", "important");
    container.style.setProperty("left", "10px", "important");
    container.style.setProperty("width", "auto", "important");
    container.style.setProperty("max-width", "none", "important");
    container.style.setProperty("transform", "none", "important");
    container.style.setProperty("align-items", "stretch", "important");
    return;
  }

  container.classList.remove("player-chat-notification-stack--mobile-top");
  container.style.setProperty("top", "50%", "important");
  container.style.setProperty("right", "auto", "important");
  container.style.setProperty("bottom", "auto", "important");
  container.style.setProperty("left", "24px", "important");
  container.style.setProperty("width", "min(360px, calc(100vw - 32px))", "important");
  container.style.setProperty("max-width", "none", "important");
  container.style.setProperty("transform", "translateY(-50%)", "important");
  container.style.setProperty("align-items", "start", "important");
}

function showPlayerCampaignChatNotification(row = {}) {
  const container = ensurePlayerCampaignChatNotificationContainer();
  applyPlayerCampaignChatNotificationResponsivePosition(container);
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

function scrollPlayerCampaignChatToBottom(options = {}) {
  const messagesBox = document.getElementById("playerCampaignChatMessages");

  if (!messagesBox) return;

  const behavior = options.smooth ? "smooth" : "auto";
  const scroll = () => {
    if (!messagesBox.isConnected) return;

    if (typeof messagesBox.scrollTo === "function") {
      messagesBox.scrollTo({ top: messagesBox.scrollHeight, behavior });
      return;
    }

    messagesBox.scrollTop = messagesBox.scrollHeight;
  };

  scroll();
  requestAnimationFrame(scroll);
  window.setTimeout(scroll, 80);
  window.setTimeout(scroll, 220);
}

function isPlayerCampaignChatTabId(targetId = "") {
  return targetId === "playerMessagesSection" || targetId === "masterMessagesSection";
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

  scrollPlayerCampaignChatToBottom({ smooth: false });
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
        const eventType = payload?.eventType || payload?.type || "";
        const isDeleteEvent = eventType === "DELETE";
        const incomingMessage = isDeleteEvent ? null : payload?.new || null;
        const shouldNotify = shouldNotifyPlayerCampaignChatMessage(incomingMessage);

        if (incomingMessage && eventType === "INSERT") {
          handleRunaskinsExtinctionCommand(incomingMessage.message || "");
        }

        await renderPlayerCampaignChat(system, {
          forceScroll: true,
          skipRunaskinsCommandCheck: isDeleteEvent,
        });

        if (shouldNotify) {
          playPlayerCampaignChatNotificationSound();
          showPlayerCampaignChatNotification(incomingMessage);
        }
      }
    )
    .subscribe();
}


/* =========================================================
   EASTER EGG - RUNASKINS EXTINÇÃO
========================================================= */
const RUNASKINS_EXTINCTION_TRIGGER = "runaskins_extincao";
const RUNASKINS_EXTINCTION_RESET_TRIGGER = "final bom";
const RUNASKINS_EXTINCTION_IMAGE_URL = "img/runaskins-extincao.png";
const RUNASKINS_EXTINCTION_STORAGE_KEY = "campaignLabRunaskinsExtinctionMode";
let runaskinsExtinctionObserver = null;

function setupRunaskinsExtinctionMode() {
  try {
    if (localStorage.getItem(RUNASKINS_EXTINCTION_STORAGE_KEY) === "true") {
      activateRunaskinsExtinctionMode({ persist: false });
    }
  } catch (error) {
    // Se o navegador bloquear o localStorage, o modo ainda funciona na sessão atual.
  }
}

function normalizeRunaskinsExtinctionText(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isRunaskinsExtinctionTrigger(value = "") {
  return normalizeRunaskinsExtinctionText(value).includes(RUNASKINS_EXTINCTION_TRIGGER);
}

function isRunaskinsExtinctionResetTrigger(value = "") {
  return normalizeRunaskinsExtinctionText(value).includes(RUNASKINS_EXTINCTION_RESET_TRIGGER);
}

function getRunaskinsExtinctionCommand(value = "") {
  if (isRunaskinsExtinctionResetTrigger(value)) return "reset";
  if (isRunaskinsExtinctionTrigger(value)) return "activate";
  return "";
}

function isRunaskinsExtinctionCommandText(value = "") {
  return Boolean(getRunaskinsExtinctionCommand(value));
}

function handleRunaskinsExtinctionCommand(value = "") {
  const command = getRunaskinsExtinctionCommand(value);

  if (command === "reset") {
    deactivateRunaskinsExtinctionMode();
    return true;
  }

  if (command === "activate") {
    activateRunaskinsExtinctionMode();
    return true;
  }

  return false;
}

function checkRunaskinsExtinctionMessages(messages = []) {
  if (!Array.isArray(messages) || !messages.length) return;

  let lastCommand = "";

  messages.forEach((message) => {
    const command = getRunaskinsExtinctionCommand(message?.message || message);
    if (command) lastCommand = command;
  });

  if (lastCommand === "reset") {
    deactivateRunaskinsExtinctionMode();
  }

  if (lastCommand === "activate") {
    activateRunaskinsExtinctionMode();
  }
}

function activateRunaskinsExtinctionMode(options = {}) {
  const persist = options.persist !== false;

  document.body.classList.add("runaskins-extinction-mode");
  document.documentElement.classList.add("runaskins-extinction-mode");

  if (persist) {
    try {
      localStorage.setItem(RUNASKINS_EXTINCTION_STORAGE_KEY, "true");
    } catch (error) {
      // LocalStorage pode estar indisponível em alguns navegadores.
    }
  }

  replaceRunaskinsExtinctionPhotos(document);
  watchRunaskinsExtinctionPhotos();
}

function deactivateRunaskinsExtinctionMode(options = {}) {
  const persist = options.persist !== false;

  document.body.classList.remove("runaskins-extinction-mode");
  document.documentElement.classList.remove("runaskins-extinction-mode");

  if (persist) {
    try {
      localStorage.removeItem(RUNASKINS_EXTINCTION_STORAGE_KEY);
    } catch (error) {
      // LocalStorage pode estar indisponível em alguns navegadores.
    }
  }

  if (runaskinsExtinctionObserver) {
    runaskinsExtinctionObserver.disconnect();
    runaskinsExtinctionObserver = null;
  }

  restoreRunaskinsExtinctionPhotos(document);
}

function watchRunaskinsExtinctionPhotos() {
  if (runaskinsExtinctionObserver) return;

  runaskinsExtinctionObserver = new MutationObserver((mutations) => {
    if (!document.body.classList.contains("runaskins-extinction-mode")) return;

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        if (node.matches("img")) {
          replaceSingleRunaskinsExtinctionPhoto(node);
        }

        replaceRunaskinsExtinctionPhotos(node);
      });
    });
  });

  runaskinsExtinctionObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function replaceRunaskinsExtinctionPhotos(root = document) {
  if (!root || !root.querySelectorAll) return;

  root.querySelectorAll("img").forEach(replaceSingleRunaskinsExtinctionPhoto);
}

function replaceSingleRunaskinsExtinctionPhoto(image) {
  if (!shouldReplaceRunaskinsExtinctionPhoto(image)) return;

  if (!image.dataset.runaskinsExtinctionOriginalSrc) {
    image.dataset.runaskinsExtinctionOriginalSrc = image.getAttribute("src") || "";
  }

  if (!image.dataset.runaskinsExtinctionOriginalSrcset) {
    image.dataset.runaskinsExtinctionOriginalSrcset = image.getAttribute("srcset") || "";
  }

  image.src = RUNASKINS_EXTINCTION_IMAGE_URL;
  image.srcset = "";
  image.dataset.runaskinsExtinctionReplaced = "true";
}

function restoreRunaskinsExtinctionPhotos(root = document) {
  if (!root || !root.querySelectorAll) return;

  root
    .querySelectorAll('img[data-runaskins-extinction-replaced="true"]')
    .forEach((image) => {
      const originalSrc = image.dataset.runaskinsExtinctionOriginalSrc || "";
      const originalSrcset = image.dataset.runaskinsExtinctionOriginalSrcset || "";

      if (originalSrc) {
        image.setAttribute("src", originalSrc);
      } else {
        image.removeAttribute("src");
      }

      if (originalSrcset) {
        image.setAttribute("srcset", originalSrcset);
      } else {
        image.removeAttribute("srcset");
      }

      delete image.dataset.runaskinsExtinctionOriginalSrc;
      delete image.dataset.runaskinsExtinctionOriginalSrcset;
      delete image.dataset.runaskinsExtinctionReplaced;
    });
}

function shouldReplaceRunaskinsExtinctionPhoto(image) {
  if (!image || !(image instanceof HTMLImageElement)) return false;

  const currentSrc = image.getAttribute("src") || "";
  const alt = String(image.getAttribute("alt") || "").toLowerCase();

  if (currentSrc.includes("runaskins-extincao.png")) return false;
  if (image.closest(".logo") || alt.includes("campaign lab")) return false;
  if (currentSrc.includes("favicon")) return false;

  return true;
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

      if (isPlayerCampaignChatTabId(targetId)) {
        scrollPlayerCampaignChatToBottom({ smooth: false });
      }

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

    if (isPlayerCampaignChatTabId(targetId)) {
      scrollPlayerCampaignChatToBottom({ smooth: false });
    }
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
    return getCampaignLabDndClassLevelLabel(sheet || {}) || sheet.race || "Ficha D&D";
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

  await createCampaignAddedNotifications(campaign, selectedPlayers, user);

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

  await createCampaignRemovedNotifications(campaign, [playerId], user);

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
    if (form.elements[key]) dndHydrateFormElement(form.elements[key], sheet[key]);
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
    className: "",
    charLevel: "1",
    classLevel: "",
    dndNeutralDefaultApplied: "true",
    classAutoDefaultsAppliedFor: "",
    race: "",
    background: "",
    dndAltheriumBackgroundAppliedState: "",
    alignment: "",
    experience: "0",
    strScore: "10",
    dexScore: "10",
    conScore: "10",
    intScore: "10",
    wisScore: "10",
    chaScore: "10",
    saveStr: "0",
    saveDex: "0",
    saveCon: "0",
    saveInt: "0",
    saveWis: "0",
    saveCha: "0",
    saveStrProf: "false",
    saveDexProf: "false",
    saveConProf: "false",
    saveIntProf: "false",
    saveWisProf: "false",
    saveChaProf: "false",
    saveStrManual: "false",
    saveDexManual: "false",
    saveConManual: "false",
    saveIntManual: "false",
    saveWisManual: "false",
    saveChaManual: "false",
    armorClass: "10",
    armorClassManual: "false",
    armorType: "Sem Armadura",
    hasShield: "false",
    initiative: "0",
    combatInitiative: "",
    speed: "12 m",
    proficiencyBonus: "+2",
    hpCurrent: "0",
    hpMax: "0",
    hpMaxManual: "false",
    hpTemp: "0",
    hitDiceTotal: "1d8",
    hitDiceRemaining: "1d8",
    classSaveProficienciesText: "",
    classArmorProficienciesText: "",
    classWeaponProficienciesText: "",
    classToolProficienciesText: "",
    classInitialFeaturesText: "",
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
    sheet[key] = "0";
    sheet[`${key}Prof`] = "false";
    sheet[`${key}Expert`] = "false";
    sheet[`${key}Manual`] = "false";
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
    return normalizeCampaignLabDndClassData({
      ...getDefaultDndSheet(campaignId, playerId, system),
      ...(data.data || {}),
      campaignId,
      playerId,
      ownerName: profile ? profile.name : playerId,
      system,
    });
  }

  const newSheet = normalizeCampaignLabDndClassData({
    ...getDefaultDndSheet(campaignId, playerId, system),
    ownerName: profile ? profile.name : playerId,
  });

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
  const normalizedData = normalizeCampaignLabDndClassData(data || {});

  const updatedSheet = {
    ...oldSheet,
    ...normalizedData,
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
      syncCampaignLabDndClassFieldsInForm(form);
      dndEnsureFinalBonusAutomationFields(form);
      dndApplyAltheriumBackgroundSelection(form, { silent: true });
      dndRecalculateAll(form);
      saveDebounced(() => saveDndSheetFromModal(false));
    });

    form.addEventListener("change", () => {
      if (form.dataset.mode !== "edit-dnd-sheet") return;
      syncCampaignLabDndClassFieldsInForm(form);
      dndEnsureFinalBonusAutomationFields(form);
      dndApplyAltheriumBackgroundSelection(form, { silent: true });
      dndRecalculateAll(form);
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
          <strong>${escapeHtml(getCampaignLabDndClassLevelLabel(sheet))}</strong>
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
  setupCampaignLabDndClassAutomationPanel(form, sheet);
  setupDndAltheriumBackgroundAutomation(form);
  syncCampaignLabDndClassFieldsInForm(form);
  dndEnsureFinalBonusAutomationFields(form);
  dndBindFinalBonusAutomationEvents();
  dndRecalculateAll(form);

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
            ${dndClassSelect(getCampaignLabDndSheetClassName(sheet))}
            ${dndLevelInput(getCampaignLabDndSheetLevel(sheet))}
            ${dndHiddenInput("classLevel", getCampaignLabDndClassLevelLabel(sheet))}
            ${dndRaceSelect(sheet.race, sheet)}
            ${dndAltheriumBackgroundSelect(sheet.background)}
            ${dndHiddenInput("dndAltheriumBackgroundAppliedState", sheet.dndAltheriumBackgroundAppliedState || "")}
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
                  ${DND_SAVE_CONFIG.map((save) => dndSaveRow(save, sheet)).join("")}
                </div>
              </div>

              <div class="dnd-box">
                <h3>Perícias</h3>
                <div class="dnd-list two-cols">
                  ${DND_SKILLS.map(([key, label]) => dndSkillRow(key, label, sheet)).join("")}
                </div>
              </div>

              <div class="dnd-skill-extra-grid dnd-skill-extra-grid--actions dnd-skill-extra-grid--attacks-full">
                <div class="dnd-box dnd-box--compact dnd-attacks-full-box">
                  <h3>Ataques & Magia Favoritos</h3>
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

              ${dndArmorDefenseControls(sheet)}

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
                ${dndHpRuleNote()}
                ${dndInput("PV temporários", "hpTemp", sheet.hpTemp, "number")}
              </div>

              <div class="dnd-box">
                <h3>Dados de vida</h3>
                <div class="dnd-list">
                  ${dndMiniInput("Dado total", "hitDiceTotal", sheet.hitDiceTotal)}
                  ${dndMiniInput("Restantes", "hitDiceRemaining", sheet.hitDiceRemaining)}
                </div>
                ${dndClassIntegratedFields(sheet)}
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

  syncCampaignLabDndClassFieldsInForm(form);
  dndEnsureFinalBonusAutomationFields(form);
  dndApplyAltheriumBackgroundSelection(form, { silent: true });
  dndRecalculateAll(form);

  await updateDndSheet(campaignId, playerId, dndGetCompleteFormData(form));
  await refreshCurrentMasterPanel();

  if (showAlert) alert("Ficha de D&D salva com sucesso.");
}


function removeDndPlayerCharacterPortraitPanel(form = document.getElementById("dndPlayerSheetForm")) {
  if (!form) return;

  form.querySelectorAll("[data-character-portrait-field], .character-portrait-field").forEach((field) => {
    field.remove();
  });
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
  dndEnsureFinalBonusAutomationFields(form);
  dndBindFinalBonusAutomationEvents();
  setupDndAltheriumBackgroundAutomation(form);
  dndRecalculateAll(form);

  form.addEventListener("input", () => {
    syncCampaignLabDndClassFieldsInForm(form);
    dndEnsureFinalBonusAutomationFields(form);
    dndApplyAltheriumBackgroundSelection(form, { silent: true });
    dndRecalculateAll(form);
    updateDndRestPreview();
    saveDndPlayerSheet(false);
  });

  form.addEventListener("change", () => {
    syncCampaignLabDndClassFieldsInForm(form);
    dndEnsureFinalBonusAutomationFields(form);
    dndApplyAltheriumBackgroundSelection(form, { silent: true });
    dndRecalculateAll(form);
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
    setupCampaignLabDndClassAutomationPanel(form);
    setupDndAltheriumBackgroundAutomation(form);
    syncCampaignLabDndClassFieldsInForm(form);
    removeDndPlayerCharacterPortraitPanel(form);
    updateDndPlayerPreview();
    updateDndAutoNumbers();
    syncAllDndSpellSlotTrackers(form);
    updateDndRestPreview();
    return;
  }

  const sheet = await getOrCreateDndSheet(campaign.id, user.id, campaign.sistema);

  // D&D jogador: painel lateral de imagem removido por pedido.
  removeDndPlayerCharacterPortraitPanel(form);
  setupCampaignLabDndClassAutomationPanel(form, sheet);

  Object.keys(sheet).forEach((key) => {
    if (form.elements[key]) dndHydrateFormElement(form.elements[key], sheet[key] || "");
  });

  setupDndAltheriumBackgroundAutomation(form);
  syncCampaignLabDndClassFieldsInForm(form);

  removeDndPlayerCharacterPortraitPanel(form);
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
  syncCampaignLabDndClassFieldsInForm(form);
  dndEnsureFinalBonusAutomationFields(form);
  dndApplyAltheriumBackgroundSelection(form, { silent: true });
  dndRecalculateAll(form);

  await updateDndSheet(campaign.id, user.id, dndGetCompleteFormData(form));
  removeDndPlayerCharacterPortraitPanel(form);
  updateDndPlayerPreview();
  updateDndAutoNumbers();

  if (showAlert) alert("Ficha de D&D salva com sucesso.");
}

function updateDndPlayerPreview() {
  const form = document.getElementById("dndPlayerSheetForm");
  if (!form) return;

  syncCampaignLabDndClassFieldsInForm(form);

  setText("dndCharacterMini", form.elements.characterName?.value || "---");
  setText("dndClassMini", getCampaignLabDndClassLevelLabel(Object.fromEntries(new FormData(form))) || "---");
  setText("dndInitiativeMini", form.elements.combatInitiative?.value || "--");
  updateDndV2AvatarPreview(form, form.elements.characterName?.value || "Personagem");
}

function updateDndAutoNumbers() {
  const form = document.getElementById("dndPlayerSheetForm");
  if (!form) return;

  syncCampaignLabDndClassFieldsInForm(form);
  dndBindEditableArmorHpEvents();
  dndEnsureArmorAndHpAutomationFields(form);
  dndEnsureArmorSelectOptions(form);

  const level = Math.max(1, Math.min(20, Math.floor(Number(form.elements.charLevel?.value) || 1)));
  const proficiencyBonus = getCampaignLabDndProficiencyBonus(level);

  if (form.elements.proficiencyBonus) {
    form.elements.proficiencyBonus.value = formatCampaignLabDndBonus(proficiencyBonus);
  }

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

  if (typeof window.campaignLabRestoreAllManualSpellSlots === "function") {
    window.campaignLabRestoreAllManualSpellSlots(form);
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
    document.body.classList.contains("dnd-player-page") ? null : document.getElementById("saveDndSheet"),
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

  if (form.id === "dndPlayerSheetForm" && typeof updateDndV2AvatarPreview === "function") {
    updateDndV2AvatarPreview(form, form.elements.characterName?.value || "Personagem");
  }

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

function dndClassSelect(value = "") {
  const selectedClass = value || "";
  const options = getCampaignLabDndClassOptions()
    .map((className) => `<option value="${escapeHtml(className)}"></option>`)
    .join("");

  return `
    <label>
      Classe
      <input
        name="className"
        id="dndClassSelect"
        type="text"
        list="dndClassOptionsList"
        value="${escapeHtml(selectedClass)}"
        placeholder="Escolha ou escreva uma classe"
        autocomplete="off"
      />
      <datalist id="dndClassOptionsList">
        ${options}
      </datalist>
    </label>
  `;
}

function dndLevelInput(value = "1") {
  const level = Math.max(1, Math.min(20, Number(value) || 1));

  return `
    <label>
      Nível
      <input name="charLevel" id="dndCharLevelInput" type="number" min="1" max="20" value="${escapeHtml(level)}" />
    </label>
  `;
}

function dndHiddenInput(name, value = "") {
  return `<input name="${name}" type="hidden" value="${escapeHtml(value)}" />`;
}

function dndAltheriumBackgroundOptionsHtml(selectedValue = "") {
  const selectedBackground = getDndAltheriumBackgroundByValue(selectedValue);
  const selected = selectedBackground ? selectedBackground.value : "";

  return DND_ALTHERIUM_BACKGROUND_OPTIONS
    .map((option) => {
      const selectedAttr = option.value === selected ? " selected" : "";
      return `<option value="${escapeHtml(option.value)}"${selectedAttr}>${escapeHtml(option.label)}</option>`;
    })
    .join("");
}

function dndAltheriumBackgroundSelect(value = "") {
  return `
    <label class="dnd-altherium-background-field">
      Antecedente
      <select name="background" data-dnd-altherium-background-select="true">
        ${dndAltheriumBackgroundOptionsHtml(value)}
      </select>
      <small class="dnd-altherium-background-help">
        Aplica perícias e traços automáticos inspirados nos Genesis de Altherium.
      </small>
    </label>
  `;
}

function dndArmorDefenseControls(sheet = {}) {
  const selectedArmor = sheet.armorType || 'Sem Armadura';
  const shieldChecked = dnd_bool(sheet.hasShield);
  const options = Object.keys(DND5E?.ARMOR_TYPES || {
    'Sem Armadura': {},
  })
    .filter((name) => name !== 'Armadura Completa')
    .map((name) => `<option value="${escapeHtml(name)}"${name === selectedArmor ? ' selected' : ''}>${escapeHtml(name)}</option>`)
    .join('');

  return `
    <div class="dnd-defense-config-box">
      <label>
        <span>Armadura</span>
        <select name="armorType" id="dndArmorTypeSelect">
          ${options}
        </select>
      </label>

      <label class="dnd-shield-toggle${shieldChecked ? ' is-active' : ''}" id="dndShieldToggle">
        <input type="checkbox" name="hasShield" id="dndHasShield"${shieldChecked ? ' checked' : ''} />
        <span>Escudo +2 CA</span>
      </label>

      <p class="dnd-auto-rule-note" id="dndArmorRuleNote">
        CA: 10 + DES sem armadura. Armaduras leves somam DES; médias limitam DES a +2; pesadas não somam DES. Escudo soma +2.
      </p>
    </div>
  `;
}

function dndHpRuleNote() {
  return `
    <p class="dnd-auto-rule-note" id="dndHpRuleNote">
      PV: no nível 1 usa o máximo do dado de vida. Nos níveis seguintes usa a média do dado + CON por nível.
    </p>
  `;
}

function dndInput(label, name, value, type = "text") {
  return `
    <label>
      ${label}
      <input name="${name}" type="${type}" value="${escapeHtml(value)}" />
    </label>
  `;
}

function dndCheckedAttr(value) {
  return dnd_bool(value) ? ' checked' : '';
}

function dndManualHiddenInput(name, value = 'false') {
  return `<input type="hidden" name="${name}" value="${dnd_bool(value) ? 'true' : 'false'}" />`;
}

function dndSaveRow(save, sheet = {}) {
  const field = save.field;
  return `
    <div class="dnd-bonus-row dnd-save-row">
      <span class="dnd-bonus-name">${escapeHtml(save.label)}</span>

      <label class="dnd-check-mini" title="Proficiência">
        <input
          type="checkbox"
          name="${field}Prof"
          data-dnd-prof-checkbox="true"
          data-dnd-target-bonus="${field}"
          ${dndCheckedAttr(sheet[`${field}Prof`])}
        />
        <span>P</span>
      </label>

      <input
        class="dnd-bonus-input"
        name="${field}"
        type="number"
        value="${escapeHtml(sheet[field] ?? '')}"
        data-dnd-final-bonus="${field}"
      />

      ${dndManualHiddenInput(`${field}Manual`, sheet[`${field}Manual`])}
    </div>
  `;
}

function dndSkillRow(key, label, sheet = {}) {
  const meta = DND_SKILL_META[key] || {};
  return `
    <div class="dnd-bonus-row dnd-skill-row">
      <span class="dnd-bonus-name">
        ${escapeHtml(label)}
        <small>${escapeHtml(meta.abilityLabel || '')}</small>
      </span>

      <label class="dnd-check-mini" title="Proficiência">
        <input
          type="checkbox"
          name="${key}Prof"
          data-dnd-prof-checkbox="true"
          data-dnd-target-bonus="${key}"
          ${dndCheckedAttr(sheet[`${key}Prof`])}
        />
        <span>P</span>
      </label>

      <label class="dnd-check-mini" title="Expertise">
        <input
          type="checkbox"
          name="${key}Expert"
          data-dnd-expert-checkbox="true"
          data-dnd-target-bonus="${key}"
          ${dndCheckedAttr(sheet[`${key}Expert`])}
        />
        <span>E</span>
      </label>

      <input
        class="dnd-bonus-input"
        name="${key}"
        type="number"
        value="${escapeHtml(sheet[key] ?? '')}"
        data-dnd-final-bonus="${key}"
      />

      ${dndManualHiddenInput(`${key}Manual`, sheet[`${key}Manual`])}
    </div>
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
  if (name === 'armorClass') {
    return `
      <label class="dnd-armor-class-field" id="dndArmorClassFieldModal">
        <span>${label}</span>
        <input name="${name}" type="number" value="${escapeHtml(value)}" data-dnd-editable-result="armorClass" />
        ${dndManualHiddenInput('armorClassManual', false)}
      </label>
    `;
  }

  return `
    <label>
      <span>${label}</span>
      <input name="${name}" type="text" value="${escapeHtml(value)}" />
    </label>
  `;
}

function dndHpInput(label, name, value) {
  if (name === 'hpMax') {
    return `
      <label>
        ${label}
        <input name="${name}" type="number" min="0" value="${escapeHtml(value)}" data-dnd-editable-result="hpMax" />
        ${dndManualHiddenInput('hpMaxManual', false)}
      </label>
    `;
  }

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


function dndClassIntegratedFields(sheet = {}) {
  return '';
}

/* =========================================================
   D&D - ANTECEDENTES DE ALTHERIUM
========================================================= */

const DND_ALTHERIUM_BACKGROUND_FEATURE_START = "===== ANTECEDENTE DE ALTHERIUM =====";
const DND_ALTHERIUM_BACKGROUND_FEATURE_END = "===== FIM DO ANTECEDENTE DE ALTHERIUM =====";
const DND_ALTHERIUM_BACKGROUND_EQUIPMENT_START = "===== EQUIPAMENTO DO ANTECEDENTE =====";
const DND_ALTHERIUM_BACKGROUND_EQUIPMENT_END = "===== FIM DO EQUIPAMENTO DO ANTECEDENTE =====";

function getDndAltheriumBackgroundByValue(value = "") {
  const normalized = normalizeAltheriumGenesis(value);

  return (
    DND_ALTHERIUM_BACKGROUND_OPTIONS.find((option) => option.key && option.key === normalized) ||
    DND_ALTHERIUM_BACKGROUND_OPTIONS.find((option) => option.value === value) ||
    null
  );
}

function dndEnsureAltheriumBackgroundStateInput(form) {
  if (!form) return null;

  let input = form.elements.dndAltheriumBackgroundAppliedState;

  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = "dndAltheriumBackgroundAppliedState";
    input.value = "";
    form.appendChild(input);
  }

  return input;
}

function dndGetAltheriumBackgroundState(form) {
  const input = dndEnsureAltheriumBackgroundStateInput(form);
  if (!input || !input.value) return { key: "", skills: [], speed: "" };

  try {
    const parsed = JSON.parse(input.value);
    return {
      key: parsed.key || "",
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      speed: parsed.speed || "",
    };
  } catch (error) {
    return { key: "", skills: [], speed: "" };
  }
}

function dndSetAltheriumBackgroundState(form, state) {
  const input = dndEnsureAltheriumBackgroundStateInput(form);
  if (!input) return;

  input.value = JSON.stringify(state || { key: "", skills: [], speed: "" });
}

function dndEnsureAltheriumBackgroundSelector(form) {
  if (!form || !form.elements.background) return;

  const currentField = form.elements.background;

  if (currentField.tagName === "SELECT") {
    currentField.dataset.dndAltheriumBackgroundSelect = "true";
    currentField.classList.add("dnd-altherium-background-select");

    if (!currentField.dataset.dndAltheriumOptionsReady) {
      const previousValue = currentField.value;
      currentField.innerHTML = dndAltheriumBackgroundOptionsHtml(previousValue);
      currentField.dataset.dndAltheriumOptionsReady = "true";
    }

    return;
  }

  const select = document.createElement("select");
  select.name = currentField.name;
  select.id = currentField.id || "dndAltheriumBackgroundSelect";
  select.className = `${currentField.className || ""} dnd-altherium-background-select`.trim();
  select.dataset.dndAltheriumBackgroundSelect = "true";
  select.innerHTML = dndAltheriumBackgroundOptionsHtml(currentField.value);
  select.dataset.dndAltheriumOptionsReady = "true";

  currentField.replaceWith(select);
}

function setupDndAltheriumBackgroundAutomation(form) {
  if (!form) return;

  if (!window.dndAltheriumBackgroundAutomationEventsReady) {
    window.dndAltheriumBackgroundAutomationEventsReady = true;

    document.addEventListener("change", (event) => {
      const select = event.target.closest?.("[data-dnd-altherium-background-select]");
      if (!select) return;

      const currentForm = select.closest("form");
      dndApplyAltheriumBackgroundSelection(currentForm, { force: true });
    }, true);
  }

  dndEnsureAltheriumBackgroundSelector(form);
  dndEnsureAltheriumBackgroundStateInput(form);
  dndApplyAltheriumBackgroundSelection(form, { silent: true });
}

function dndApplyAltheriumBackgroundSelection(form, options = {}) {
  if (!form || !form.elements.background) return;

  const background = getDndAltheriumBackgroundByValue(form.elements.background.value);
  const currentKey = background ? background.key : "";
  const previousState = dndGetAltheriumBackgroundState(form);
  const shouldApply = options.force || previousState.key !== currentKey;

  if (!shouldApply) return;

  dndRemoveAltheriumBackgroundEffects(form, previousState);

  const nextState = {
    key: currentKey,
    skills: [],
    speed: "",
  };

  if (background && background.key) {
    (background.skills || []).forEach((skill) => {
      const checkbox = form.elements[`${skill}Prof`];
      if (!checkbox) return;

      checkbox.checked = true;
      dndSetFinalBonusManual(form, skill, false);
      nextState.skills.push(skill);
    });

    if (background.speed && form.elements.speed) {
      form.elements.speed.value = dndAppendTaggedText(form.elements.speed.value, background.speed);
      nextState.speed = background.speed;
    }

    dndWriteAltheriumBackgroundFeatureBlock(form, background);
    dndWriteAltheriumBackgroundEquipmentBlock(form, background);
  } else {
    dndWriteAltheriumBackgroundFeatureBlock(form, null);
    dndWriteAltheriumBackgroundEquipmentBlock(form, null);
  }

  dndSetAltheriumBackgroundState(form, nextState);

  if (!options.silent) {
    dndRecalculateAll(form);
    dndDispatchSheetInput(form);
  }
}

function dndRemoveAltheriumBackgroundEffects(form, state = {}) {
  if (!form || !state) return;

  (state.skills || []).forEach((skill) => {
    const checkbox = form.elements[`${skill}Prof`];
    if (!checkbox) return;

    checkbox.checked = false;
    dndSetFinalBonusManual(form, skill, false);
  });

  if (state.speed && form.elements.speed) {
    form.elements.speed.value = dndRemoveTaggedText(form.elements.speed.value, state.speed);
  }
}

function dndAppendTaggedText(value = "", marker = "") {
  const clean = dndRemoveTaggedText(value, marker);
  return clean ? `${clean} ${marker}`.trim() : marker;
}

function dndRemoveTaggedText(value = "", marker = "") {
  if (!marker) return String(value || "").trim();

  return String(value || "")
    .replace(marker, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function dndWriteAltheriumBackgroundFeatureBlock(form, background) {
  const field = form.elements.features || form.elements.additionalFeatures;
  if (!field) return;

  const clean = dndRemoveBlock(field.value, DND_ALTHERIUM_BACKGROUND_FEATURE_START, DND_ALTHERIUM_BACKGROUND_FEATURE_END);

  if (!background || !background.key) {
    field.value = clean;
    return;
  }

  const skillLabels = (background.skills || [])
    .map((skill) => DND5E.SKILL_NAMES?.[skill] || skill)
    .join(", ");

  const lines = [
    DND_ALTHERIUM_BACKGROUND_FEATURE_START,
    `${background.label}: ${background.feature || background.description || "Sem efeito automático."}`,
  ];

  if (skillLabels) lines.push(`Perícias automáticas: ${skillLabels}.`);
  if (background.speed) lines.push(`Deslocamento: ${background.speed}.`);
  if (background.equipment) lines.push(`Equipamento: ${background.equipment}`);

  lines.push(DND_ALTHERIUM_BACKGROUND_FEATURE_END);

  field.value = [clean, lines.join("\n")]
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function dndWriteAltheriumBackgroundEquipmentBlock(form, background) {
  const field = form.elements.equipment;
  if (!field) return;

  const clean = dndRemoveBlock(field.value, DND_ALTHERIUM_BACKGROUND_EQUIPMENT_START, DND_ALTHERIUM_BACKGROUND_EQUIPMENT_END);

  if (!background || !background.equipment) {
    field.value = clean;
    return;
  }

  const block = [
    DND_ALTHERIUM_BACKGROUND_EQUIPMENT_START,
    background.equipment,
    DND_ALTHERIUM_BACKGROUND_EQUIPMENT_END,
  ].join("\n");

  field.value = [clean, block]
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function dndRemoveBlock(value = "", startMarker = "", endMarker = "") {
  if (!startMarker || !endMarker) return String(value || "").trim();

  const escapedStart = startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`\\n?${escapedStart}[\\s\\S]*?${escapedEnd}\\n?`, "gi");

  return String(value || "")
    .replace(pattern, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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

  const header = document.querySelector(".header") || document.querySelector("header") || document.body;
  header.classList.add("header-with-fixed-actions");

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

  header.appendChild(backArea);
  header.appendChild(logoutArea);

  forceHeaderButtonLayout(backArea, logoutArea, backButton, logoutButton);

  if (!window.campaignLabHeaderButtonsResizeReady) {
    window.campaignLabHeaderButtonsResizeReady = true;
    window.addEventListener(
      "resize",
      () => {
        const currentBackArea = document.querySelector(".header-with-fixed-actions > .header-back-area");
        const currentLogoutArea = document.querySelector(".header-with-fixed-actions > .header-logout-area");
        const currentBackButton = currentBackArea?.querySelector(".header-back-button");
        const currentLogoutButton = currentLogoutArea?.querySelector(".header-logout-button");

        if (currentBackArea && currentLogoutArea && currentBackButton && currentLogoutButton) {
          forceHeaderButtonLayout(currentBackArea, currentLogoutArea, currentBackButton, currentLogoutButton);
        }
      },
      { passive: true }
    );
  }
}

function injectHeaderButtonFixedStyles() {
  const oldStyle = document.getElementById("campaign-lab-header-buttons-fixed-style");
  if (oldStyle) oldStyle.remove();

  const style = document.createElement("style");
  style.id = "campaign-lab-header-buttons-fixed-style";

  style.textContent = `
    .header.header-with-fixed-actions,
    header.header-with-fixed-actions {
      overflow: visible !important;
      isolation: isolate !important;
    }

    .header.header-with-fixed-actions > .header-back-area,
    .header.header-with-fixed-actions > .header-logout-area,
    header.header-with-fixed-actions > .header-back-area,
    header.header-with-fixed-actions > .header-logout-area {
      position: absolute !important;
      top: 50% !important;
      z-index: 1005 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transform: translateY(-50%) !important;
      pointer-events: auto !important;
    }

    .header.header-with-fixed-actions > .header-back-area,
    header.header-with-fixed-actions > .header-back-area {
      left: 28px !important;
      right: auto !important;
    }

    .header.header-with-fixed-actions > .header-logout-area,
    header.header-with-fixed-actions > .header-logout-area {
      right: 28px !important;
      left: auto !important;
    }

    .header.header-with-fixed-actions .header-container,
    .header.header-with-fixed-actions .header-container-center,
    header.header-with-fixed-actions .header-container,
    header.header-with-fixed-actions .header-container-center {
      padding-left: max(5%, 172px) !important;
      padding-right: max(5%, 92px) !important;
    }

    body > .header-back-area,
    body > .header-logout-area,
    .header-nav-actions {
      display: none !important;
    }

    .header.header-with-fixed-actions .header-back-button,
    .header.header-with-fixed-actions .header-logout-button,
    header.header-with-fixed-actions .header-back-button,
    header.header-with-fixed-actions .header-logout-button {
      margin: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 999px !important;
      font-family: "Quantico", sans-serif !important;
      line-height: 1 !important;
      cursor: pointer !important;
      transform: none !important;
      translate: none !important;
      transition:
        border-color 0.22s ease,
        background 0.22s ease,
        color 0.22s ease,
        box-shadow 0.22s ease !important;
    }

    .header.header-with-fixed-actions .header-back-button,
    header.header-with-fixed-actions .header-back-button {
      width: auto !important;
      min-width: 128px !important;
      height: 46px !important;
      min-height: 46px !important;
      max-height: 46px !important;
      padding: 0 18px 0 10px !important;
      gap: 9px !important;
      border: 1px solid rgba(34, 211, 238, 0.68) !important;
      background: #020617 !important;
      color: #f8fafc !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      letter-spacing: 0.4px !important;
      text-transform: uppercase !important;
      box-shadow:
        0 0 0 1px rgba(34, 211, 238, 0.1),
        0 0 22px rgba(34, 211, 238, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    .header.header-with-fixed-actions .header-logout-button,
    header.header-with-fixed-actions .header-logout-button {
      width: 46px !important;
      min-width: 46px !important;
      max-width: 46px !important;
      height: 46px !important;
      min-height: 46px !important;
      max-height: 46px !important;
      padding: 0 !important;
      gap: 0 !important;
      border: 1px solid rgba(248, 113, 113, 0.68) !important;
      background: #120812 !important;
      color: #f8fafc !important;
      box-shadow:
        0 0 0 1px rgba(248, 113, 113, 0.08),
        0 0 20px rgba(248, 113, 113, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    .header.header-with-fixed-actions .header-back-button__icon,
    .header.header-with-fixed-actions .header-logout-button__icon,
    header.header-with-fixed-actions .header-back-button__icon,
    header.header-with-fixed-actions .header-logout-button__icon {
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

    .header.header-with-fixed-actions .header-back-button__icon,
    header.header-with-fixed-actions .header-back-button__icon {
      background: rgba(34, 211, 238, 0.16) !important;
      color: #67e8f9 !important;
      font-size: 24px !important;
    }

    .header.header-with-fixed-actions .header-logout-button__icon,
    header.header-with-fixed-actions .header-logout-button__icon {
      background: rgba(248, 113, 113, 0.14) !important;
      color: #fca5a5 !important;
      font-size: 13px !important;
    }

    .header.header-with-fixed-actions .header-back-button__text,
    header.header-with-fixed-actions .header-back-button__text {
      display: inline-block !important;
      color: #f8fafc !important;
    }

    .header.header-with-fixed-actions .header-logout-button__text,
    header.header-with-fixed-actions .header-logout-button__text {
      display: none !important;
    }

    .header.header-with-fixed-actions .header-back-button:hover,
    header.header-with-fixed-actions .header-back-button:hover {
      border-color: rgba(34, 211, 238, 0.95) !important;
      background: #062133 !important;
      color: #ffffff !important;
    }

    .header.header-with-fixed-actions .header-logout-button:hover,
    header.header-with-fixed-actions .header-logout-button:hover {
      border-color: rgba(248, 113, 113, 0.95) !important;
      background: #2a0d13 !important;
      color: #ffffff !important;
    }

    @media (max-width: 760px) {
      .header.header-with-fixed-actions > .header-back-area,
      header.header-with-fixed-actions > .header-back-area {
        left: 10px !important;
      }

      .header.header-with-fixed-actions > .header-logout-area,
      header.header-with-fixed-actions > .header-logout-area {
        right: 10px !important;
      }

      .header.header-with-fixed-actions .header-container,
      .header.header-with-fixed-actions .header-container-center,
      header.header-with-fixed-actions .header-container,
      header.header-with-fixed-actions .header-container-center {
        padding-left: 64px !important;
        padding-right: 64px !important;
      }

      .header.header-with-fixed-actions .logo img,
      header.header-with-fixed-actions .logo img {
        max-width: calc(100vw - 140px) !important;
      }

      .header.header-with-fixed-actions .header-back-button,
      .header.header-with-fixed-actions .header-logout-button,
      header.header-with-fixed-actions .header-back-button,
      header.header-with-fixed-actions .header-logout-button {
        width: 42px !important;
        min-width: 42px !important;
        max-width: 42px !important;
        height: 42px !important;
        min-height: 42px !important;
        max-height: 42px !important;
        padding: 0 !important;
        gap: 0 !important;
      }

      .header.header-with-fixed-actions .header-back-button__text,
      .header.header-with-fixed-actions .header-logout-button__text,
      header.header-with-fixed-actions .header-back-button__text,
      header.header-with-fixed-actions .header-logout-button__text {
        display: none !important;
      }

      .header.header-with-fixed-actions .header-back-button__icon,
      .header.header-with-fixed-actions .header-logout-button__icon,
      header.header-with-fixed-actions .header-back-button__icon,
      header.header-with-fixed-actions .header-logout-button__icon {
        width: 28px !important;
        height: 28px !important;
        min-width: 28px !important;
      }
    }

    @media (max-width: 420px) {
      .header.header-with-fixed-actions > .header-back-area,
      header.header-with-fixed-actions > .header-back-area {
        left: 8px !important;
      }

      .header.header-with-fixed-actions > .header-logout-area,
      header.header-with-fixed-actions > .header-logout-area {
        right: 8px !important;
      }

      .header.header-with-fixed-actions .header-container,
      .header.header-with-fixed-actions .header-container-center,
      header.header-with-fixed-actions .header-container,
      header.header-with-fixed-actions .header-container-center {
        padding-left: 56px !important;
        padding-right: 56px !important;
      }

      .header.header-with-fixed-actions .logo img,
      header.header-with-fixed-actions .logo img {
        max-width: calc(100vw - 118px) !important;
      }

      .header.header-with-fixed-actions .header-back-button,
      .header.header-with-fixed-actions .header-logout-button,
      header.header-with-fixed-actions .header-back-button,
      header.header-with-fixed-actions .header-logout-button {
        width: 38px !important;
        min-width: 38px !important;
        max-width: 38px !important;
        height: 38px !important;
        min-height: 38px !important;
        max-height: 38px !important;
      }

      .header.header-with-fixed-actions .header-back-button__icon,
      .header.header-with-fixed-actions .header-logout-button__icon,
      header.header-with-fixed-actions .header-back-button__icon,
      header.header-with-fixed-actions .header-logout-button__icon {
        width: 24px !important;
        height: 24px !important;
        min-width: 24px !important;
      }
    }
  `;

  document.head.appendChild(style);
}

function forceHeaderButtonLayout(backArea, logoutArea, backButton, logoutButton) {
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const isSmall = window.matchMedia("(max-width: 420px)").matches;
  const side = isSmall ? "8px" : isMobile ? "10px" : "28px";

  backArea.style.setProperty("position", "absolute", "important");
  backArea.style.setProperty("top", "50%", "important");
  backArea.style.setProperty("left", side, "important");
  backArea.style.setProperty("right", "auto", "important");
  backArea.style.setProperty("z-index", "1005", "important");
  backArea.style.setProperty("transform", "translateY(-50%)", "important");

  logoutArea.style.setProperty("position", "absolute", "important");
  logoutArea.style.setProperty("top", "50%", "important");
  logoutArea.style.setProperty("right", side, "important");
  logoutArea.style.setProperty("left", "auto", "important");
  logoutArea.style.setProperty("z-index", "1005", "important");
  logoutArea.style.setProperty("transform", "translateY(-50%)", "important");

  backButton.style.setProperty("transform", "none", "important");
  logoutButton.style.setProperty("transform", "none", "important");

  ["mouseenter", "mouseover", "mousemove", "mouseleave", "mousedown", "mouseup", "focus", "blur"].forEach((eventName) => {
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

    // Os campos manuais de espaços de magia têm layout próprio.
    // Não podem ser embrulhados pelo controle premium de número,
    // senão a caixa fica estreita e troca de posição com o título do círculo.
    if (input.classList?.contains("dnd-spell-slot-max-input") || input.matches?.("[data-spell-slot-max-input]")) return;

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

/**
 * dnd-automations.js
 * Motor de automação D&D 5e (Player's Handbook 2014) — Campaign Lab
 * Inclui: dados completos de classes/raças/antecedentes, cálculos automáticos,
 * espaços de magia, habilidades com cargas, proficiência + expertise.
 */

// =============================================================
// DADOS DO SISTEMA
// =============================================================

const DND5E = {

  profBonus: [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6], // índice 0 = nível 1

  ABILITIES: ['str','dex','con','int','wis','cha'],

  ABILITY_NAMES: {
    str: 'Força', dex: 'Destreza', con: 'Constituição',
    int: 'Inteligência', wis: 'Sabedoria', cha: 'Carisma'
  },

  SKILL_ABILITY: {
    skillAcrobatics:     'dex',
    skillAnimalHandling: 'wis',
    skillArcana:         'int',
    skillAthletics:      'str',
    skillDeception:      'cha',
    skillHistory:        'int',
    skillInsight:        'wis',
    skillIntimidation:   'cha',
    skillInvestigation:  'int',
    skillMedicine:       'wis',
    skillNature:         'int',
    skillPerception:     'wis',
    skillPerformance:    'cha',
    skillPersuasion:     'cha',
    skillReligion:       'int',
    skillSleightOfHand:  'dex',
    skillStealth:        'dex',
    skillSurvival:       'wis',
  },

  SKILL_NAMES: {
    skillAcrobatics:'Acrobacia', skillAnimalHandling:'Lidar Animais', skillArcana:'Arcanismo',
    skillAthletics:'Atletismo', skillDeception:'Enganação', skillHistory:'História',
    skillInsight:'Intuição', skillIntimidation:'Intimidação', skillInvestigation:'Investigação',
    skillMedicine:'Medicina', skillNature:'Natureza', skillPerception:'Percepção',
    skillPerformance:'Performance', skillPersuasion:'Persuasão', skillReligion:'Religião',
    skillSleightOfHand:'Prestidigitação', skillStealth:'Furtividade', skillSurvival:'Sobrevivência',
  },

  // ----------------------------------------------------------
  // ESPAÇOS DE MAGIA
  // ----------------------------------------------------------
  SPELL_SLOTS: {
    full: [
      [2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],
      [4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],
      [4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],
      [4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,0],
      [4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1],
    ],
    half: [
      [0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],
      [4,2,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],
      [4,3,2,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],
      [4,3,3,1,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],
      [4,3,3,3,1,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,0,0,0,0],
    ],
    warlock: [
      [1,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],
      [0,0,2,0,0,0,0,0,0],[0,0,2,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0],[0,0,0,2,0,0,0,0,0],
      [0,0,0,0,2,0,0,0,0],[0,0,0,0,2,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],
      [0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],
      [0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0],
    ],
    artificer: [
      [2,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],
      [4,2,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],
      [4,3,2,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],
      [4,3,3,1,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],
      [4,3,3,3,1,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,0,0,0,0],
    ],
    none: Array(20).fill([0,0,0,0,0,0,0,0,0]),
  },

  // ----------------------------------------------------------
  // CLASSES
  // ----------------------------------------------------------
  classes: {
    Artífice: {
      hitDie: 8, saves: ['con','int'], spellAbility: 'int', spellType: 'artificer',
      armorProf: ['Leves','Médias','Escudos'], weaponProf: ['Simples'],
      toolProf: ['Ferramentas de Ladrão','Ferramentas de Funileiro','Um tipo de ferramenta de artesão à escolha'],
      skillChoices: 2,
      skillOptions: ['skillArcana','skillHistory','skillInvestigation','skillMedicine','skillNature','skillPerception','skillSleightOfHand'],
      features: [
        {level:1, name:'Engenhocas Mágicas', source:'Classe',
         desc:'Você cria pequenos efeitos mágicos em objetos usando ferramentas de artesão.'},
        {level:1, name:'Conjurar Magia', source:'Classe',
         desc:'Você usa INT como habilidade de conjuração.'},
        {level:2, name:'Infundir Item', source:'Classe',
         desc:'Você imbui objetos mundanos com infusões mágicas.'},
        {level:3, name:'Especialista Artífice', source:'Subclasse',
         desc:'Escolha sua especialização: Alquimista, Armeiro, Artilheiro ou Ferreiro de Batalha.'},
        {level:3, name:'A Ferramenta Certa para o Trabalho', source:'Classe',
         desc:'Você cria magicamente um conjunto de ferramentas de artesão adequado ao trabalho.'},
        {level:5, name:'Habilidade de Especialista', source:'Subclasse',
         desc:'Você recebe uma habilidade extra de acordo com sua especialização.'},
        {level:6, name:'Especialização em Ferramentas', source:'Classe',
         desc:'Seu bônus de proficiência é dobrado em testes com ferramentas nas quais você é proficiente.'},
        {level:7, name:'Lampejo de Genialidade', source:'Classe', recharge:'longo',
         chargesFormula:'intMod',
         desc:'Use sua reação para adicionar seu modificador de INT a um teste ou salvaguarda de uma criatura próxima.'},
        {level:10, name:'Adepto de Itens Mágicos', source:'Classe',
         desc:'Você sintoniza mais itens mágicos e cria itens comuns/incomuns com mais facilidade.'},
        {level:11, name:'Item Armazenador de Magia', source:'Classe',
         desc:'Você armazena uma magia em um item para ser usada por você ou por outra criatura.'},
        {level:14, name:'Sábio dos Itens Mágicos', source:'Classe',
         desc:'Você ignora requisitos de classe, raça, magia e nível ao sintonizar itens mágicos.'},
        {level:18, name:'Mestre dos Itens Mágicos', source:'Classe',
         desc:'Você consegue se sintonizar com até seis itens mágicos.'},
        {level:20, name:'Alma do Artifício', source:'Classe',
         desc:'Você recebe bônus em salvaguardas por item mágico sintonizado e pode sacrificar infusões para evitar cair a 0 PV.'},
      ],
    },
    Bárbaro: {
      hitDie: 12, saves: ['str','con'], spellAbility: null, spellType: 'none',
      armorProf: ['Leves','Médias','Escudos'], weaponProf: ['Simples','Marciais'],
      skillChoices: 2,
      skillOptions: ['skillAnimalHandling','skillAthletics','skillIntimidation','skillNature','skillPerception','skillSurvival'],
      features: [
        {level:1, name:'Fúria', source:'Classe', recharge:'longo',
         chargesFormula:'2+floor((level-1)/4)', // 2→3→4
         desc:'Bônus de +2 no dano corpo a corpo, resistência a dano cortante/contundente/perfurante. Dura 1 min.'},
        {level:1, name:'Defesa sem Armadura', source:'Classe',
         desc:'CA = 10 + Mod. DES + Mod. CON quando sem armadura e sem escudo.'},
        {level:2, name:'Ataque Descuidado', source:'Classe',
         desc:'Vantagem em ataques corpo a corpo com FOR, mas inimigos têm vantagem contra você.'},
        {level:2, name:'Sentido de Perigo', source:'Classe',
         desc:'Vantagem em salvaguardas de DES contra efeitos visíveis (armadilhas, magias de área).'},
        {level:3, name:'Caminho Primitivo', source:'Subclasse',
         desc:'Escolha uma especialização: Caminho do Berserker ou Caminho do Totem.'},
        {level:5, name:'Ataque Extra', source:'Classe',
         desc:'Você pode atacar duas vezes em vez de uma quando usa a ação de Ataque.'},
        {level:7, name:'Instinto Selvagem', source:'Classe',
         desc:'Vantagem em rolagens de iniciativa. Você não é surpreendido enquanto não estiver incapacitado.'},
        {level:9, name:'Crítico Brutal', source:'Classe',
         desc:'Role um dado de dano adicional ao causar acerto crítico corpo a corpo.'},
        {level:11, name:'Fúria Implacável', source:'Classe',
         desc:'Durante a fúria, se chegar a 0 PV, faz salvaguarda de CON CD 10 para ficar com 1 PV.'},
        {level:15, name:'Poder Persistente', source:'Classe',
         desc:'A fúria só termina se você estiver incapacitado ou decidir encerrá-la.'},
        {level:20, name:'Força Primordial', source:'Classe',
         desc:'FOR e CON aumentam em 4 (sem limite máximo).'},
      ],
    },
    Bardo: {
      hitDie: 8, saves: ['dex','cha'], spellAbility: 'cha', spellType: 'full',
      armorProf: ['Leves'],
      weaponProf: ['Simples','Bestas de Mão','Espada Longa','Rapieira','Estoque'],
      toolProf: ['Três instrumentos musicais à escolha'],
      skillChoices: 3, skillOptions: 'any',
      features: [
        {level:1, name:'Conjurar Magia', source:'Classe', desc:'Você usa CAR como habilidade de conjuração.'},
        {level:1, name:'Inspiração de Bardo', source:'Classe', recharge:'curto',
         chargesFormula:'chaMod', // = modificador de CAR
         desc:'Dado de inspiração (d6→d8→d10→d12) que um aliado pode usar em teste, ataque ou salvaguarda.'},
        {level:2, name:'Fazer Tudo Um Pouco', source:'Classe',
         desc:'Adiciona metade do bônus de proficiência a testes de habilidade sem proficiência.'},
        {level:3, name:'Colégio de Bardo', source:'Subclasse',
         desc:'Escolha seu colégio: Eloquência, Espadas, Glamour, Lamento, Sussurros, Valentia.'},
        {level:5, name:'Fonte de Inspiração', source:'Classe',
         desc:'Você recupera toda a Inspiração de Bardo gasta em descanso curto OU longo.'},
        {level:6, name:'Contra-magia', source:'Classe', recharge:'curto',
         chargesFormula:'1',
         desc:'Use sua reação para impor desvantagem em uma rolagem de salvaguarda de concentração.'},
        {level:10, name:'Segredos Mágicos', source:'Classe',
         desc:'Aprenda 2 magias de qualquer classe. Repita aos níveis 14 e 18.'},
        {level:20, name:'Inspiração Superior', source:'Classe',
         desc:'Ao rolar iniciativa com 0 usos de Inspiração de Bardo, recupere 1 uso.'},
      ],
    },
    Clérigo: {
      hitDie: 8, saves: ['wis','cha'], spellAbility: 'wis', spellType: 'full',
      armorProf: ['Leves','Médias','Escudos'], weaponProf: ['Simples'],
      skillChoices: 2,
      skillOptions: ['skillHistory','skillInsight','skillMedicine','skillPersuasion','skillReligion'],
      features: [
        {level:1, name:'Conjurar Magia', source:'Classe', desc:'Você usa SAB como habilidade de conjuração.'},
        {level:1, name:'Magias de Domínio', source:'Subclasse',
         desc:'Magias extras do domínio divino escolhido (Conhecimento, Guerra, Luz, Natureza, Tempestade, etc.).'},
        {level:1, name:'Habilidade de Domínio', source:'Subclasse',
         desc:'Habilidade inicial concedida pelo domínio escolhido.'},
        {level:2, name:'Canalizar Divindade', source:'Classe', recharge:'curto',
         chargesFormula:'1',
         desc:'Acesse seu poder divino. Usos aumentam: 2 a partir do nível 6, 3 a partir do 18.'},
        {level:2, name:'Canalizar Divindade: Afastar Mortos-Vivos', source:'Classe',
         desc:'Mortros-vivos com CR < X são afugentados por 1 min (salvaguarda de SAB).'},
        {level:5, name:'Destruir Mortos-Vivos', source:'Classe',
         desc:'Ao usar Afastar, criaturas com CR ≤ X são destruídas automaticamente.'},
        {level:8, name:'Golpe Divino', source:'Subclasse', recharge:'turno',
         chargesFormula:'1',
         desc:'Uma vez por turno, cause 1d8 (depois 2d8) de dano extra com ataques armados.'},
        {level:10, name:'Intervenção Divina', source:'Classe', recharge:'longo',
         chargesFormula:'1',
         desc:'Implore a ajuda da sua divindade (chance = nível%). Nível 20: sempre funciona.'},
      ],
    },
    Druida: {
      hitDie: 8, saves: ['int','wis'], spellAbility: 'wis', spellType: 'full',
      armorProf: ['Leves','Médias (não-metálicas)','Escudos (não-metálicos)'],
      weaponProf: ['Clava','Adaga','Dardo','Azagaia','Maça','Bordão','Cimitarra','Foice','Funda'],
      toolProf: ['Kit de herbalismo'],
      skillChoices: 2,
      skillOptions: ['skillAnimalHandling','skillArcana','skillInsight','skillMedicine','skillNature','skillPerception','skillReligion','skillSurvival'],
      features: [
        {level:1, name:'Druídico', source:'Classe',
         desc:'Você sabe o idioma secreto druídico. Truque menor Orientação.'},
        {level:1, name:'Conjurar Magia', source:'Classe', desc:'SAB é sua habilidade de conjuração.'},
        {level:2, name:'Forma Selvagem', source:'Classe', recharge:'curto',
         chargesFormula:'2',
         desc:'Transforme-se em uma besta (CR máximo: nível 2=¼, 4=½, 8=1). Você mantém INT, SAB e CAR.'},
        {level:2, name:'Círculo Druídico', source:'Subclasse',
         desc:'Escolha: Círculo da Terra, da Lua, do Pastor, das Esporas, dos Sonhos, etc.'},
        {level:4, name:'Melhoria de Atributo', source:'Classe',
         desc:'+2 a um atributo ou +1 a dois, ou um Talento.'},
        {level:18, name:'Forma Ilimitada', source:'Classe',
         desc:'Pode usar Forma Selvagem indefinidamente.'},
        {level:20, name:'Arquidruida', source:'Classe',
         desc:'Pode usar Forma Selvagem um número ilimitado de vezes.'},
      ],
    },
    Guerreiro: {
      hitDie: 10, saves: ['str','con'], spellAbility: null, spellType: 'none',
      armorProf: ['Todas','Escudos'], weaponProf: ['Simples','Marciais'],
      skillChoices: 2,
      skillOptions: ['skillAcrobatics','skillAnimalHandling','skillAthletics','skillHistory','skillInsight','skillIntimidation','skillPerception','skillSurvival'],
      features: [
        {level:1, name:'Estilo de Combate', source:'Classe',
         desc:'Escolha um estilo especializado: Arqueria, Defesa, Duelo, Luta com Duas Armas, etc.'},
        {level:1, name:'Retomar o Fôlego', source:'Classe', recharge:'curto',
         chargesFormula:'1',
         desc:'Recupera 1d10 + nível de Guerreiro de PV usando uma Ação Bônus.'},
        {level:2, name:'Surto de Ação', source:'Classe', recharge:'curto',
         chargesFormula:'1',
         desc:'Ganha uma ação adicional em seu turno. 2 usos a partir do nível 17.'},
        {level:3, name:'Arquétipo Marcial', source:'Subclasse',
         desc:'Campeão, Mestre de Batalha, Cavaleiro Élfico, Samurai, etc.'},
        {level:5, name:'Ataque Extra', source:'Classe',
         desc:'Ataque duas vezes por Ação de Ataque. Três ataques ao nível 11, quatro ao nível 20.'},
        {level:9, name:'Indomável', source:'Classe', recharge:'longo',
         chargesFormula:'1',
         desc:'Repete uma salvaguarda que falhou. 2 usos ao nível 13, 3 ao nível 17.'},
        {level:11, name:'Estudante de Guerra', source:'Subclasse',
         desc:'Aprenda duas Manobras extras (Mestre de Batalha) ou benefício equivalente.'},
      ],
    },
    Ladino: {
      hitDie: 8, saves: ['dex','int'], spellAbility: null, spellType: 'none',
      armorProf: ['Leves'],
      weaponProf: ['Simples','Bestas de Mão','Espada Longa','Rapieira','Estoque'],
      toolProf: ['Ferramentas de Ladrão'],
      skillChoices: 4, skillOptions: 'any',
      features: [
        {level:1, name:'Ataque Furtivo', source:'Classe',
         desc:'1d6 de dano extra (aumenta por nível) com armas filigranadas/à distância ao ter vantagem ou aliado adjacente.'},
        {level:1, name:'Gíria dos Ladrões', source:'Classe',
         desc:'Idioma secreto dos ladrões. Pode deixar mensagens codificadas.'},
        {level:2, name:'Ação Ardilosa', source:'Classe',
         desc:'Correr, Desengajar ou Esconder como Ação Bônus.'},
        {level:3, name:'Arquétipo de Ladino', source:'Subclasse',
         desc:'Assassino, Trapaceiro Arcano, Salteador, Sombra, Alma Inescrutável, etc.'},
        {level:3, name:'Expertise', source:'Classe',
         desc:'Dobra o bônus de proficiência em duas perícias escolhidas. Duas mais ao nível 6.'},
        {level:5, name:'Esquiva Sobrenatural', source:'Classe',
         desc:'Use sua reação para reduzir à metade o dano de um ataque que te acertou.'},
        {level:7, name:'Evasão', source:'Classe',
         desc:'Sem dano em salvaguardas de DES bem-sucedidas, e metade em falhas.'},
        {level:10, name:'Talento de Ladino', source:'Classe',
         desc:'Aprenda Ler Pensamentos, Mime, Toque Chocante ou Prestidigitação.'},
        {level:11, name:'Uso Confiável de Talento', source:'Classe',
         desc:'Quando rolar Iniciativa, você sempre recebe o mínimo 10 em perícias com proficiência.'},
        {level:18, name:'Esquiva Elegante', source:'Classe',
         desc:'Você não pode ser flanqueado e nunca fica com desvantagem por inimigos adjacentes.'},
      ],
    },
    Mago: {
      hitDie: 6, saves: ['int','wis'], spellAbility: 'int', spellType: 'full',
      armorProf: [],
      weaponProf: ['Adaga','Dardo','Funda','Bordão','Besta Leve'],
      skillChoices: 2,
      skillOptions: ['skillArcana','skillHistory','skillInsight','skillInvestigation','skillMedicine','skillReligion'],
      features: [
        {level:1, name:'Conjurar Magia', source:'Classe', desc:'INT é sua habilidade de conjuração.'},
        {level:1, name:'Livro de Magias', source:'Classe',
         desc:'Começa com 6 magias de 1º nível. Aprende 2 por nível. Pode copiar magias encontradas.'},
        {level:1, name:'Recuperação Arcana', source:'Classe', recharge:'longo',
         chargesFormula:'1',
         desc:'Após descanso curto, recupera espaços de magia totalizando até metade do nível (mínimo 1).'},
        {level:2, name:'Tradição Arcana', source:'Subclasse',
         desc:'Abjuração, Conjuração, Adivinhação, Encantamento, Evocação, Ilusão, Necromancia, Transmutação.'},
        {level:18, name:'Maestria em Magias', source:'Classe',
         desc:'Escolha uma magia de 1º e uma de 2º nível: pode lançá-las de graça uma vez por descanso.'},
        {level:20, name:'Formas de Assinatura', source:'Classe',
         desc:'Duas magias de 3º nível que sempre têm espaço disponível para lançamento.'},
      ],
    },
    Monge: {
      hitDie: 8, saves: ['str','dex'], spellAbility: null, spellType: 'none',
      armorProf: [], weaponProf: ['Simples','Espadas Curtas'],
      skillChoices: 2,
      skillOptions: ['skillAcrobatics','skillAthletics','skillHistory','skillInsight','skillReligion','skillStealth'],
      features: [
        {level:1, name:'Defesa sem Armadura', source:'Classe',
         desc:'CA = 10 + Mod. DES + Mod. SAB quando sem armadura e sem escudo.'},
        {level:1, name:'Artes Marciais', source:'Classe',
         desc:'Dano desarmado/arma monge = 1d4 (→d6→d8→d10). FOR ou DES em ataques monge.'},
        {level:2, name:'Ki', source:'Classe', recharge:'curto',
         chargesFormula:'level',
         desc:'Pontos de ki = nível. Chuva de Golpes (2 ataques bônus), Passo do Vento, Defesa de Padrão.'},
        {level:2, name:'Movimento sem Armadura', source:'Classe',
         desc:'Velocidade +3 m sem armadura. Aumenta conforme o nível.'},
        {level:3, name:'Tradição Monástica', source:'Subclasse',
         desc:'Quatro Elementos, Mão Aberta, Sombra, Misericórdia, Sol e Lua, etc.'},
        {level:3, name:'Desviar Projéteis', source:'Classe',
         desc:'Use reação para reduzir dano de projéteis; se zerado, pode devolver.'},
        {level:5, name:'Ataque Extra', source:'Classe',
         desc:'Ataque duas vezes por Ação de Ataque.'},
        {level:5, name:'Surto de Golpe Atordoante', source:'Classe',
         desc:'Gaste 1 ki ao acertar: teste de CON ou alvo fica atordoado até o fim do próximo turno.'},
        {level:7, name:'Evasão', source:'Classe',
         desc:'Sem dano em saves de DES bem-sucedidos, metade em falhas.'},
        {level:10, name:'Pureza do Corpo', source:'Classe',
         desc:'Imune a doenças e venenos.'},
        {level:13, name:'Língua do Sol e da Lua', source:'Classe',
         desc:'Pode se comunicar com qualquer criatura que conheça um idioma.'},
        {level:14, name:'Alma de Diamante', source:'Classe',
         desc:'Proficiência em todas as salvaguardas; pode repetir falhas gastando 1 ki.'},
        {level:18, name:'Corpo Vazio', source:'Classe', recharge:'longo',
         chargesFormula:'1',
         desc:'Gaste 4 ki para ficar invisível por 1 minuto (+ outros benefícios).'},
        {level:20, name:'Ser Perfeito', source:'Classe',
         desc:'FOR e DES aumentam em 2 (máximo 26). Idade não afeta mais.'},
      ],
    },
    Paladino: {
      hitDie: 10, saves: ['wis','cha'], spellAbility: 'cha', spellType: 'half',
      armorProf: ['Todas','Escudos'], weaponProf: ['Simples','Marciais'],
      skillChoices: 2,
      skillOptions: ['skillAthletics','skillInsight','skillIntimidation','skillMedicine','skillPersuasion','skillReligion'],
      features: [
        {level:1, name:'Sentido Divino', source:'Classe', recharge:'longo',
         chargesFormula:'chaMod+1',
         desc:'Detecta celestiais, infernais e mortos-vivos a 18 m (sem contagem de bloqueadores).'},
        {level:1, name:'Imposição de Mãos', source:'Classe', recharge:'longo',
         chargesFormula:'level*5',
         desc:'Cura total = nível × 5 PV. Pode curar doenças/venenos gastando 5 PV da piscina.'},
        {level:2, name:'Estilo de Combate', source:'Classe',
         desc:'Defesa, Duelo, Proteção ou Luta com Armas Grandes.'},
        {level:2, name:'Conjurar Magia', source:'Classe', desc:'CAR é sua habilidade de conjuração.'},
        {level:2, name:'Esmagar Divino', source:'Classe',
         desc:'Ao acertar com arma, gaste um espaço de magia: 2d8 de dano radiante extra por nível do espaço.'},
        {level:3, name:'Saúde Divina', source:'Classe',
         desc:'Imune a doenças.'},
        {level:3, name:'Juramento Sagrado', source:'Subclasse',
         desc:'Devoção, Vingança, Ancestrais, Glória, Conquista, Redenção, etc.'},
        {level:5, name:'Ataque Extra', source:'Classe',
         desc:'Ataque duas vezes por Ação de Ataque.'},
        {level:6, name:'Aura de Proteção', source:'Classe',
         desc:'Você e aliados no raio de 3 m (9 m ao nível 18) somam Mod. CAR a salvaguardas.'},
        {level:7, name:'Aura do Juramento', source:'Subclasse',
         desc:'Aura bônus concedida pelo seu Juramento Sagrado.'},
        {level:10, name:'Aura de Coragem', source:'Classe',
         desc:'Você e aliados a 3 m (9 m ao nível 18) não podem ser assustados enquanto estiver consciente.'},
        {level:11, name:'Esmagar Divino Aprimorado', source:'Classe',
         desc:'Todo ataque corpo a corpo bem-sucedido causa 1d8 de dano radiante extra.'},
        {level:14, name:'Toque Purificador', source:'Classe', recharge:'longo',
         chargesFormula:'chaMod',
         desc:'Use uma ação para encerrar uma magia afetando você ou um aliado (toque).'},
        {level:20, name:'Forma Sagrada', source:'Subclasse',
         desc:'Poder transformador máximo dependente do Juramento.'},
      ],
    },
    Patrulheiro: {
      hitDie: 10, saves: ['str','dex'], spellAbility: 'wis', spellType: 'half',
      armorProf: ['Leves','Médias','Escudos'], weaponProf: ['Simples','Marciais'],
      skillChoices: 3,
      skillOptions: ['skillAnimalHandling','skillAthletics','skillInsight','skillInvestigation','skillNature','skillPerception','skillStealth','skillSurvival'],
      features: [
        {level:1, name:'Inimigo Favorito', source:'Classe',
         desc:'Escolha um tipo de inimigo: vantagem em testes de rastreio e memória. +1 tipo ao nível 6 e 14.'},
        {level:1, name:'Explorador Natural', source:'Classe',
         desc:'Benefícios em tipo de terreno escolhido: viagem mais rápida, alimento dobrado, etc.'},
        {level:2, name:'Estilo de Combate', source:'Classe',
         desc:'Arqueria, Defesa, Duelo, Luta com Duas Armas.'},
        {level:2, name:'Conjurar Magia', source:'Classe', desc:'SAB é sua habilidade de conjuração.'},
        {level:3, name:'Consciência Primitiva', source:'Classe', recharge:'longo',
         chargesFormula:'1',
         desc:'Gaste uma magia para detectar inimigos favoritos a 1 milha (6 milhas em terreno favorito).'},
        {level:3, name:'Arquétipo de Patrulheiro', source:'Subclasse',
         desc:'Caçador, Mestre da Besta, Deslizador de Horizontes, Perseguidor de Monstros, etc.'},
        {level:5, name:'Ataque Extra', source:'Classe',
         desc:'Ataque duas vezes por Ação de Ataque.'},
        {level:8, name:'Passo do Mundo', source:'Classe',
         desc:'Se mover através de terreno difícil natural não gasta movimento extra.'},
        {level:10, name:'Mente Escondida', source:'Classe',
         desc:'Imune ao efeito enfeitiçado e não pode ser adormecido magicamente.'},
        {level:14, name:'Desaparecer na Natureza', source:'Classe',
         desc:'Pode se esconder quando obstruído apenas por vegetação, mesmo que não forneça cobertura.'},
        {level:20, name:'Caçador Primevo', source:'Classe',
         desc:'+1 bônus de proficiência, visão no escuro 18 m, bônus em ataques contra inimigos favoritos.'},
      ],
    },
    Feiticeiro: {
      hitDie: 6, saves: ['con','cha'], spellAbility: 'cha', spellType: 'full',
      armorProf: [],
      weaponProf: ['Adaga','Dardo','Funda','Bordão','Besta Leve'],
      skillChoices: 2,
      skillOptions: ['skillArcana','skillDeception','skillInsight','skillIntimidation','skillPersuasion','skillReligion'],
      features: [
        {level:1, name:'Conjurar Magia', source:'Classe', desc:'CAR é sua habilidade de conjuração.'},
        {level:1, name:'Origem de Feiticeiro', source:'Subclasse',
         desc:'Linhagem Dracônica, Alma Selvagem, Sombra, Tempestade de Magia, etc.'},
        {level:2, name:'Pontos de Feitiçaria', source:'Classe', recharge:'longo',
         chargesFormula:'level',
         desc:'Crie espaços de magia ou use como recurso para Metamagia.'},
        {level:2, name:'Metamagia', source:'Classe',
         desc:'Escolha 2 de 8 opções: Cuidadoso, Distante, Potencializado, Estendido, Elevado, Gêmeo, Rápido, Sutil.'},
        {level:3, name:'Melhoria de Atributo', source:'Classe', desc:'+2 a um atributo ou +1 a dois, ou Talento.'},
        {level:20, name:'Restauração de Feitiçaria', source:'Classe',
         desc:'Recupera 4 Pontos de Feitiçaria ao rolar iniciativa sem pontos restantes.'},
      ],
    },
    Bruxo: {
      hitDie: 8, saves: ['wis','cha'], spellAbility: 'cha', spellType: 'warlock',
      armorProf: ['Leves'], weaponProf: ['Simples'],
      skillChoices: 2,
      skillOptions: ['skillArcana','skillDeception','skillHistory','skillIntimidation','skillInvestigation','skillNature','skillReligion'],
      features: [
        {level:1, name:'Patrono de Além', source:'Subclasse',
         desc:'Arquidevil, Grande Antigo, Corte Feérica, Cósmos Implacável, Genio, Celestial, Kraken, etc.'},
        {level:1, name:'Magia do Pacto', source:'Classe',
         desc:'Espaços de magia recuperados a cada descanso curto. Todos espaços têm o mesmo nível.'},
        {level:1, name:'Conjurar Magia', source:'Classe', desc:'CAR é sua habilidade de conjuração.'},
        {level:2, name:'Invocações Eldritch', source:'Classe',
         desc:'Escolha 2 invocações. Aprenda mais conforme sobe de nível.'},
        {level:3, name:'Dádiva do Pacto', source:'Classe',
         desc:'Lâmina do Pacto (arma), Corrente do Pacto (familiar), Tomo do Pacto (grimório).'},
        {level:11, name:'Arcanum Místico', source:'Classe', recharge:'longo',
         chargesFormula:'1',
         desc:'Lança uma magia de 6º nível uma vez sem gastar espaço (7º, 8º e 9º aos níveis 13, 15, 17).'},
        {level:20, name:'Mestre Eldritch', source:'Classe', recharge:'longo',
         chargesFormula:'1',
         desc:'Passe 1 minuto em oração ao patrono para recuperar todos os espaços de Magia do Pacto.'},
      ],
    },
  },

  // ----------------------------------------------------------
  // RAÇAS
  // ----------------------------------------------------------
  races: {
    'Humano (Padrão)': {
      abilityBonus: {str:1,dex:1,con:1,int:1,wis:1,cha:1}, speed: 30, size:'Médio',
      languages: ['Comum','Um idioma à escolha'],
      traits: ['Versátil: +1 em todos os atributos.','Língua adicional à escolha.'],
    },
    'Humano (Variante)': {
      abilityBonus: {}, speed: 30, size:'Médio',
      languages: ['Comum','Um idioma à escolha'],
      traits: ['+1 em dois atributos à escolha.','Proficiência em uma perícia à escolha.','Um Talento à escolha.'],
    },
    'Anão (Montanha)': {
      abilityBonus: {str:2,con:2}, speed: 25, size:'Médio', darkvision: 60,
      languages: ['Comum','Anão'],
      traits: ['Resistência Anã: vantagem em saves contra veneno.','Treinamento com Armas Anãs: machados e martelos de guerra.','Proficiência com armaduras leves e médias.'],
    },
    'Anão (Colina)': {
      abilityBonus: {con:2,wis:1}, speed: 25, size:'Médio', darkvision: 60,
      languages: ['Comum','Anão'],
      traits: ['Resistência Anã: vantagem em saves contra veneno.','Tenacidade Anã: +1 PV por nível.','Treinamento com Armas Anãs.'],
    },
    'Elfo (Alto)': {
      abilityBonus: {dex:2,int:1}, speed: 30, size:'Médio', darkvision: 60,
      languages: ['Comum','Élfico','Um idioma à escolha'],
      skills: ['skillPerception'],
      traits: ['Ancestral dos Feéricos: vantagem em saves contra enfeitiçado e resistência ao sono mágico.','Transe: 4h de meditação no lugar de 8h de sono.','Sentidos Aguçados: proficiência em Percepção.','Truque menor (cantrip) de Mago extra à escolha.'],
    },
    'Elfo (Silvestre)': {
      abilityBonus: {dex:2,wis:1}, speed: 35, size:'Médio', darkvision: 60,
      languages: ['Comum','Élfico'],
      skills: ['skillPerception'],
      traits: ['Ancestral dos Feéricos.','Transe.','Sentidos Aguçados: proficiência em Percepção.','Passo da Floresta: ignorar terreno difícil natural.','Esconder-se: pode tentar se esconder com obstrução mínima.'],
    },
    'Meio-Elfo': {
      abilityBonus: {cha:2}, speed: 30, size:'Médio', darkvision: 60,
      languages: ['Comum','Élfico','Um idioma à escolha'],
      traits: ['+1 em dois atributos à escolha (exceto CAR).','Herança Feérica: vantagem em saves contra enfeitiçado e resistência ao sono.','Versatilidade: proficiência em duas perícias à escolha.'],
    },
    'Halfling (Pés-Leves)': {
      abilityBonus: {dex:2,cha:1}, speed: 25, size:'Pequeno',
      languages: ['Comum','Halfling'],
      traits: ['Sortudo: repita 1s naturais em ataques, habilidades e saves.','Corajoso: vantagem em saves contra medo.','Agilidade Halfling: mover-se através de espaço de criatura maior.','Naturalmente Furtivo: pode se esconder atrás de criaturas maiores.'],
    },
    'Halfling (Robusto)': {
      abilityBonus: {dex:2,con:1}, speed: 25, size:'Pequeno',
      languages: ['Comum','Halfling'],
      traits: ['Sortudo.','Corajoso.','Agilidade Halfling.','Resistência Robusta: vantagem em saves contra veneno e resistência ao dano de veneno.'],
    },
    'Draconato': {
      abilityBonus: {str:2,cha:1}, speed: 30, size:'Médio',
      languages: ['Comum','Dracônico'],
      traits: ['Ancestral Dracônico: escolha um tipo de dragão (determina sopro e resistência).','Sopro: 1 uso por descanso curto (1× por turno de combate). Aumenta com o nível.','Resistência Dracônica: resistência ao tipo de dano do seu ancestral.'],
    },
    'Gnomo (Floresta)': {
      abilityBonus: {int:2,dex:1}, speed: 25, size:'Pequeno', darkvision: 60,
      languages: ['Comum','Gnômico'],
      traits: ['Astúcia Gnômica: vantagem em saves de INT/SAB/CAR contra magia.','Ilusão Natural: truque menor Ilusão Menor (INT como habilidade).','Falar com Bichanos: comunicação básica com mamíferos pequenos.'],
    },
    'Gnomo (Da Rocha)': {
      abilityBonus: {int:2,con:1}, speed: 25, size:'Pequeno', darkvision: 60,
      languages: ['Comum','Gnômico'],
      traits: ['Astúcia Gnômica: vantagem em saves de INT/SAB/CAR contra magia.','Conhecimento de Ferramentas de Artesão: proficiência em Ferramentas de Relojoeiro ou Ferramentas de Ferreiro.','Sentir Vibrações: não pode ser surpreendido (percebe vibrações a 3 m).'],
    },
    'Meio-Orc': {
      abilityBonus: {str:2,con:1}, speed: 30, size:'Médio', darkvision: 60,
      languages: ['Comum','Orc'],
      skills: ['skillIntimidation'],
      traits: ['Ameaçador: proficiência em Intimidação.','Resistência Implacável: fica com 1 PV ao invés de cair a 0 (1× por descanso longo).','Ataques Selvagens: em acertos críticos com arma corpo a corpo, role um dado de dano extra.'],
    },
    'Tiefling': {
      abilityBonus: {cha:2,int:1}, speed: 30, size:'Médio', darkvision: 60,
      languages: ['Comum','Infernal'],
      traits: ['Herança Infernal: truque menor Taumaturgia; Chamas Hellish (nivel 3, 1×/longo), Escuridão (nível 5, 1×/longo). INT é a habilidade.','Resistência Infernal: resistência a dano de fogo.'],
    },
  },

  // ----------------------------------------------------------
  // ANTECEDENTES
  // ----------------------------------------------------------
  backgrounds: {
    'Acólito': {
      skills: ['skillInsight','skillReligion'], languages: 2,
      feature: 'Abrigo dos Fiéis: recebe abrigo e apoio de templos afiliados.',
    },
    'Artista': {
      skills: ['skillAcrobatics','skillPerformance'],
      toolProf: ['Um instrumento musical'], languages: 1,
      feature: 'Por Demanda Popular: sempre encontra lugar para se apresentar.',
    },
    'Charlatão': {
      skills: ['skillDeception','skillSleightOfHand'],
      toolProf: ['Kit de disfarce','Ferramentas de falsificação'],
      feature: 'Identidade Falsa: possui uma identidade preparada com documentos.',
    },
    'Criminoso': {
      skills: ['skillDeception','skillStealth'],
      toolProf: ['Um tipo de jogo','Ferramentas de Ladrão'],
      feature: 'Contato Criminal: tem um aliado no mundo do crime.',
    },
    'Ermitão': {
      skills: ['skillMedicine','skillReligion'],
      toolProf: ['Kit de herbalismo'], languages: 1,
      feature: 'Descoberta: revelação ou conhecimento único obtido no isolamento.',
    },
    'Erudito': {
      skills: ['skillArcana','skillHistory'], languages: 2,
      feature: 'Pesquisador: sabe onde encontrar qualquer informação.',
    },
    'Forasteiro': {
      skills: ['skillAthletics','skillSurvival'],
      toolProf: ['Um instrumento musical'], languages: 1,
      feature: 'Viajante do Mundo: pode passar por assentamentos sem problemas.',
    },
    'Herói do Povo': {
      skills: ['skillAnimalHandling','skillSurvival'],
      toolProf: ['Ferramentas de artesão','Veículos (terrestres)'],
      feature: 'Apelo Rústico: recebe simpatia e ajuda de pessoas comuns.',
    },
    'Marinheiro': {
      skills: ['skillAthletics','skillPerception'],
      toolProf: ['Ferramentas de navegador','Veículos (aquáticos)'],
      feature: 'Passagem Segura: pode garantir transporte marítimo gratuito.',
    },
    'Nobre': {
      skills: ['skillHistory','skillPersuasion'],
      toolProf: ['Um tipo de jogo'], languages: 1,
      feature: 'Privilégio de Posição: o título abre portas e concede respeito.',
    },
    'Órfão': {
      skills: ['skillSleightOfHand','skillStealth'],
      toolProf: ['Kit de disfarce','Ferramentas de Ladrão'],
      feature: 'Criança das Ruas: conhece rotas secretas e abrigos na cidade.',
    },
    'Sábio': {
      skills: ['skillArcana','skillHistory'], languages: 2,
      feature: 'Pesquisador: sabe onde buscar conhecimento raro.',
    },
    'Soldado': {
      skills: ['skillAthletics','skillIntimidation'],
      toolProf: ['Um tipo de jogo','Veículos (terrestres)'],
      feature: 'Hierarquia Militar: mantém conexões com unidades militares.',
    },
  },

  // ----------------------------------------------------------
  // ARMADURAS
  // ----------------------------------------------------------
  ARMOR_TYPES: {
    // CA oficial D&D 5e: sem armadura = 10 + DES.
    // Leves somam DES total; médias limitam DES a +2; pesadas não somam DES.
    'Sem Armadura':       { base: 10, type: 'none',   maxDex: 99 },
    'Acolchoada':         { base: 11, type: 'light',  maxDex: 99, stealthDisadv: true },
    'Couro':              { base: 11, type: 'light',  maxDex: 99 },
    'Couro Batido':       { base: 12, type: 'light',  maxDex: 99 },
    'Gibão de Peles':     { base: 12, type: 'medium', maxDex: 2 },
    'Camisão de Malha':   { base: 13, type: 'medium', maxDex: 2 },
    'Cota de Escamas':    { base: 14, type: 'medium', maxDex: 2, stealthDisadv: true },
    'Peitoral':           { base: 14, type: 'medium', maxDex: 2 },
    'Meia Armadura':      { base: 15, type: 'medium', maxDex: 2, stealthDisadv: true },
    'Corselete de Anéis': { base: 14, type: 'heavy',  maxDex: 0, stealthDisadv: true },
    'Cota de Malha':      { base: 16, type: 'heavy',  maxDex: 0, stealthDisadv: true },
    'Cota de Talas':      { base: 17, type: 'heavy',  maxDex: 0, stealthDisadv: true },
    'Armadura de Placas': { base: 18, type: 'heavy',  maxDex: 0, stealthDisadv: true },
    'Armadura Completa':  { base: 18, type: 'heavy',  maxDex: 0, stealthDisadv: true },
  },
};

// =============================================================
// FUNÇÕES AUXILIARES
// =============================================================

function dnd_mod(score) {
  return Math.floor((Number(score || 10) - 10) / 2);
}

function dnd_profBonus(level) {
  return DND5E.profBonus[Math.max(1, Math.min(20, Number(level) || 1)) - 1];
}

function dnd_fmt(mod) {
  return mod >= 0 ? `+${mod}` : String(mod);
}

function dnd_val(form, name) {
  const el = form.elements[name];
  if (!el) return '';
  if (el.type === 'checkbox') return el.checked;
  return el.value;
}

function dnd_bool(value) {
  return value === true || value === 1 || value === '1' || value === 'true' || value === 'on' || value === 'yes';
}

function dnd_set(form, name, value) {
  const el = form.elements[name];
  if (!el) return;
  if (el.type === 'checkbox') el.checked = dnd_bool(value);
  else el.value = String(value ?? '');
}

function dnd_esc(v) {
  return String(v||'').replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}


function dndEnsureHiddenInput(form, name, value = "false") {
  if (!form || form.elements[name]) return form?.elements?.[name] || null;

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = String(value ?? 'false');
  form.appendChild(input);
  return input;
}

function dndEnsureCheckboxInput(form, name, options = {}) {
  if (!form) return null;
  const existing = form.elements[name];
  if (existing) return existing;

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = name;
  input.hidden = options.hidden !== false;
  if (options.target) input.dataset.dndTargetBonus = options.target;
  if (options.kind === 'prof') input.dataset.dndProfCheckbox = 'true';
  if (options.kind === 'expert') input.dataset.dndExpertCheckbox = 'true';
  form.appendChild(input);
  return input;
}

function dndFinalManualFieldName(fieldName) {
  return `${fieldName}Manual`;
}

function dndIsFinalBonusManual(form, fieldName) {
  const field = form?.elements?.[fieldName];
  const manualField = form?.elements?.[dndFinalManualFieldName(fieldName)];
  return dnd_bool(manualField?.value) || field?.dataset?.dndManual === 'true';
}

function dndSetFinalBonusManual(form, fieldName, manual = true) {
  if (!form || !fieldName) return;

  const field = form.elements[fieldName];
  const manualField = dndEnsureHiddenInput(form, dndFinalManualFieldName(fieldName), 'false');

  if (manualField) manualField.value = manual ? 'true' : 'false';
  if (field) field.dataset.dndManual = manual ? 'true' : 'false';
}

function dndSetCalculatedFinalBonus(form, fieldName, value, options = {}) {
  const field = form?.elements?.[fieldName];
  if (!field) return;

  if (options.force) {
    dndSetFinalBonusManual(form, fieldName, false);
  }

  if (dndIsFinalBonusManual(form, fieldName)) return;

  const finalValue = String(Number.isFinite(Number(value)) ? Number(value) : 0);
  field.value = finalValue;
  field.dataset.dndAutoValue = finalValue;
  field.dataset.dndManual = 'false';

  const manualField = dndEnsureHiddenInput(form, dndFinalManualFieldName(fieldName), 'false');
  if (manualField) manualField.value = 'false';
}

function dndEditableResultManualFieldName(fieldName) {
  return `${fieldName}Manual`;
}

function dndIsEditableResultManual(form, fieldName) {
  const field = form?.elements?.[fieldName];
  const manualField = form?.elements?.[dndEditableResultManualFieldName(fieldName)];
  return dnd_bool(manualField?.value) || field?.dataset?.dndManual === 'true';
}

function dndSetEditableResultManual(form, fieldName, manual = true) {
  if (!form || !fieldName) return;

  const field = form.elements[fieldName];
  const manualField = dndEnsureHiddenInput(form, dndEditableResultManualFieldName(fieldName), 'false');

  if (manualField) manualField.value = manual ? 'true' : 'false';
  if (field) field.dataset.dndManual = manual ? 'true' : 'false';
}

function dndSetCalculatedEditableNumber(form, fieldName, value, options = {}) {
  const field = form?.elements?.[fieldName];
  if (!field) return;

  field.type = 'number';
  field.dataset.dndEditableResult = fieldName;

  if (options.force) {
    dndSetEditableResultManual(form, fieldName, false);
  }

  if (dndIsEditableResultManual(form, fieldName)) return;

  const finalValue = String(Math.max(0, Math.floor(Number(value) || 0)));
  field.value = finalValue;
  field.dataset.dndAutoValue = finalValue;
  field.dataset.dndManual = 'false';

  const manualField = dndEnsureHiddenInput(form, dndEditableResultManualFieldName(fieldName), 'false');
  if (manualField) manualField.value = 'false';
}

function dndEnsureArmorAndHpAutomationFields(form) {
  if (!form) return;

  dndEnsureHiddenInput(form, 'armorClassManual', 'false');
  dndEnsureHiddenInput(form, 'hpMaxManual', 'false');

  if (!form.elements.armorType) {
    const select = document.createElement('select');
    select.name = 'armorType';
    select.id = 'dndArmorTypeSelect';
    select.innerHTML = dndArmorTypeOptionsHtml('Sem Armadura');
    form.appendChild(select);
  }

  if (!form.elements.hasShield) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'hasShield';
    checkbox.hidden = true;
    form.appendChild(checkbox);
  }

  if (form.elements.armorClass) {
    form.elements.armorClass.type = 'number';
    form.elements.armorClass.dataset.dndEditableResult = 'armorClass';
    form.elements.armorClass.dataset.dndManual = dnd_bool(form.elements.armorClassManual?.value) ? 'true' : 'false';
  }

  if (form.elements.hpMax) {
    form.elements.hpMax.type = 'number';
    form.elements.hpMax.dataset.dndEditableResult = 'hpMax';
    form.elements.hpMax.dataset.dndManual = dnd_bool(form.elements.hpMaxManual?.value) ? 'true' : 'false';
  }
}

function dndArmorTypeOptionsHtml(selectedValue = 'Sem Armadura') {
  return Object.keys(DND5E.ARMOR_TYPES || {})
    .filter((name) => name !== 'Armadura Completa')
    .map((name) => `<option value="${dnd_esc(name)}"${name === selectedValue ? ' selected' : ''}>${dnd_esc(name)}</option>`)
    .join('');
}

function dndEnsureArmorSelectOptions(form) {
  const select = form?.elements?.armorType;
  if (!select || select.tagName !== 'SELECT') return;

  const current = select.value || 'Sem Armadura';
  const options = Object.keys(DND5E.ARMOR_TYPES || {}).filter((name) => name !== 'Armadura Completa');

  if (select.dataset.dndArmorOptionsReady === 'true' && options.includes(current)) return;

  select.innerHTML = dndArmorTypeOptionsHtml(options.includes(current) ? current : 'Sem Armadura');
  select.value = options.includes(current) ? current : 'Sem Armadura';
  select.dataset.dndArmorOptionsReady = 'true';
}

function dndGetHitDieFromForm(form) {
  const className = dndResolveClassName(form?.elements?.className?.value || '') || form?.elements?.className?.value;
  const cd = DND5E.classes[className];

  if (cd?.hitDie) return Number(cd.hitDie);

  const hitDiceText = String(form?.elements?.hitDiceTotal?.value || '').toLowerCase();
  const match = hitDiceText.match(/d(4|6|8|10|12)/);
  return match ? Number(match[1]) : 8;
}

function dndAverageHitDieGain(hitDie) {
  return Math.floor(Number(hitDie || 8) / 2) + 1;
}

function dndCalculateMaxHp(form, level, conMod) {
  const safeLevel = Math.max(1, Math.min(20, Math.floor(Number(level) || 1)));
  const hitDie = dndGetHitDieFromForm(form);
  const averagePerLevel = dndAverageHitDieGain(hitDie);
  const total = Math.max(
    safeLevel,
    hitDie + Math.max(0, safeLevel - 1) * averagePerLevel + conMod * safeLevel
  );

  return {
    total,
    hitDie,
    averagePerLevel,
    explanation: `PV = ${hitDie} no nível 1 + ${Math.max(0, safeLevel - 1)} × ${averagePerLevel} + CON ${conMod >= 0 ? '+' : ''}${conMod} × ${safeLevel} = ${total}`,
  };
}

function dndCalculateArmorClass(form, mods = {}) {
  const armorType = dnd_val(form, 'armorType') || 'Sem Armadura';
  const armor = DND5E.ARMOR_TYPES[armorType] || DND5E.ARMOR_TYPES['Sem Armadura'];
  const dexMod = Number(mods.dex || 0);
  const shieldActive = Boolean(form?.elements?.hasShield?.checked);

  let dexApplied = dexMod;
  let base = 10;
  let total = 10 + dexMod;
  let formula = '10 + Mod. DES';

  if (armor) {
    base = armor.base;

    if (armor.type === 'none') {
      dexApplied = dexMod;
      total = 10 + dexMod;
      formula = '10 + Mod. DES';
    } else if (armor.type === 'light') {
      dexApplied = dexMod;
      total = armor.base + dexMod;
      formula = `${armor.base} + Mod. DES`;
    } else if (armor.type === 'medium') {
      dexApplied = Math.min(dexMod, 2);
      total = armor.base + dexApplied;
      formula = `${armor.base} + DES limitado a +2`;
    } else if (armor.type === 'heavy') {
      dexApplied = 0;
      total = armor.base;
      formula = `${armor.base} sem DES`;
    }
  }

  if (shieldActive) {
    total += 2;
    formula += ' + Escudo 2';
  }

  return {
    total,
    armorType,
    armor,
    base,
    dexApplied,
    shieldActive,
    formula,
    explanation: `CA = ${formula} = ${total}`,
  };
}

function dndSyncDefenseVisualState(form, armorCalc = null) {
  const field = form?.elements?.armorClass;
  const box = document.getElementById('dndArmorClassField') || field?.closest('label');
  const shieldToggle = document.getElementById('dndShieldToggle');
  const note = document.getElementById('dndArmorRuleNote');

  const shieldActive = Boolean(form?.elements?.hasShield?.checked);

  if (field) field.classList.toggle('dnd-armor-class-input--shielded', shieldActive);
  if (box) box.classList.toggle('dnd-armor-class-field--shielded', shieldActive);
  if (shieldToggle) shieldToggle.classList.toggle('is-active', shieldActive);

  if (note && armorCalc) {
    note.textContent = `${armorCalc.explanation}. Médias limitam DES a +2; pesadas usam DES 0. Resultados finais ficam editáveis para homebrew.`;
  }
}

function dndSyncHpAutomationNote(form, hpCalc = null) {
  const note = document.getElementById('dndHpRuleNote');
  if (!note || !hpCalc) return;

  note.textContent = `${hpCalc.explanation}. O campo Máximo continua editável para regras da casa, itens mágicos ou ajustes do mestre.`;
}

function dndBindEditableArmorHpEvents() {
  if (window.dndEditableArmorHpEventsReady) return;
  window.dndEditableArmorHpEventsReady = true;

  document.addEventListener('input', (event) => {
    const input = event.target.closest?.('[data-dnd-editable-result]');
    if (!input) return;

    const form = input.closest('form');
    if (!form || !input.name) return;

    dndSetEditableResultManual(form, input.name, true);
  }, true);
}

function dndFinalBonusFieldNames() {
  return [
    ...DND_SAVE_CONFIG.map((item) => item.field),
    ...DND_SKILLS.map(([key]) => key),
  ];
}

function dndEnsureFinalBonusAutomationFields(form) {
  if (!form) return;

  DND_SAVE_CONFIG.forEach((save) => {
    dndEnsureCheckboxInput(form, `${save.field}Prof`, {
      hidden: true,
      target: save.field,
      kind: 'prof',
    });
    const saveManual = dndEnsureHiddenInput(form, dndFinalManualFieldName(save.field), 'false');

    const finalInput = form.elements[save.field];
    if (finalInput) {
      finalInput.type = 'number';
      finalInput.dataset.dndFinalBonus = save.field;
      finalInput.dataset.dndManual = dnd_bool(saveManual?.value) ? 'true' : 'false';
    }
  });

  DND_SKILLS.forEach(([key]) => {
    dndEnsureCheckboxInput(form, `${key}Prof`, {
      hidden: true,
      target: key,
      kind: 'prof',
    });
    dndEnsureCheckboxInput(form, `${key}Expert`, {
      hidden: true,
      target: key,
      kind: 'expert',
    });
    const skillManual = dndEnsureHiddenInput(form, dndFinalManualFieldName(key), 'false');

    const finalInput = form.elements[key];
    if (finalInput) {
      finalInput.type = 'number';
      finalInput.dataset.dndFinalBonus = key;
      finalInput.dataset.dndManual = dnd_bool(skillManual?.value) ? 'true' : 'false';
    }
  });
}

function dndGetCompleteFormData(form) {
  const data = Object.fromEntries(new FormData(form));

  form.querySelectorAll('input[type="checkbox"][name]').forEach((checkbox) => {
    data[checkbox.name] = checkbox.checked ? 'true' : 'false';
  });

  dndFinalBonusFieldNames().forEach((fieldName) => {
    const manualName = dndFinalManualFieldName(fieldName);
    if (form.elements[manualName]) {
      data[manualName] = dnd_bool(form.elements[manualName].value) ? 'true' : 'false';
    }
  });

  return data;
}

function dndHydrateFormElement(element, value) {
  if (!element) return;

  if (element instanceof RadioNodeList) {
    Array.from(element).forEach((item) => dndHydrateFormElement(item, value));
    return;
  }

  if (element.type === 'checkbox') {
    element.checked = dnd_bool(value);
    return;
  }

  element.value = value ?? '';
}

function dndBindFinalBonusAutomationEvents() {
  if (window.dndFinalBonusAutomationEventsReady) return;
  window.dndFinalBonusAutomationEventsReady = true;

  document.addEventListener('input', (event) => {
    const input = event.target.closest?.('[data-dnd-final-bonus]');
    if (!input) return;

    const form = input.closest('form');
    if (!form || !input.name) return;

    dndSetFinalBonusManual(form, input.name, true);
  }, true);

  document.addEventListener('change', (event) => {
    const checkbox = event.target.closest?.('[data-dnd-prof-checkbox], [data-dnd-expert-checkbox]');
    if (!checkbox) return;

    const form = checkbox.closest('form');
    if (!form) return;

    const target = checkbox.dataset.dndTargetBonus;
    if (target) dndSetFinalBonusManual(form, target, false);

    if (checkbox.dataset.dndExpertCheckbox === 'true' && checkbox.checked) {
      const profName = checkbox.name.replace(/Expert$/, 'Prof');
      const prof = form.elements[profName];
      if (prof) prof.checked = true;
    }

    if (checkbox.dataset.dndProfCheckbox === 'true' && !checkbox.checked) {
      const expertName = checkbox.name.replace(/Prof$/, 'Expert');
      const expert = form.elements[expertName];
      if (expert) expert.checked = false;
    }

    dndRecalculateAll(form);
    dndDispatchSheetInput(form);
  }, true);
}

function dndNormalizeBlankStarterValues(form) {
  if (!form) return;

  const abilityFields = ["strScore", "dexScore", "conScore", "intScore", "wisScore", "chaScore"];
  const saveFields = ["saveStr", "saveDex", "saveCon", "saveInt", "saveWis", "saveCha"];
  const skillFields = DND_SKILLS.map(([key]) => key);
  const finalFields = [...saveFields, ...skillFields];

  abilityFields.forEach((field) => {
    const input = form.elements[field];
    if (input && String(input.value || "").trim() === "") {
      input.value = "10";
    }
  });

  finalFields.forEach((field) => {
    const input = form.elements[field];
    const manual = form.elements[`${field}Manual`];
    if (input && !dnd_bool(manual?.value) && String(input.value || "").trim() === "") {
      input.value = "0";
    }
  });

  if (form.elements.initiative && String(form.elements.initiative.value || "").trim() === "") {
    form.elements.initiative.value = "0";
  }
}

// =============================================================
// RECALCULAR TUDO
// =============================================================

function dndRecalculateAll(form) {
  if (!form) return;

  dndNormalizeBlankStarterValues(form);

  const level = Number(form.elements.charLevel?.value) || 1;
  const prof  = dnd_profBonus(level);

  // -- Bônus de proficiência
  if (form.elements.proficiencyBonus) form.elements.proficiencyBonus.value = dnd_fmt(prof);
  const pbd = document.getElementById('dndProfBonusDisplay');
  if (pbd) pbd.textContent = dnd_fmt(prof);

  // -- Atributos
  const mods = {};
  DND5E.ABILITIES.forEach(ab => {
    const score = Number(form.elements[`${ab}Score`]?.value) || 10;
    mods[ab] = dnd_mod(score);
    const viewId = `${ab}ModView`;
    const v = document.getElementById(viewId);
    if (v) v.textContent = dnd_fmt(mods[ab]);
  });

  dndEnsureFinalBonusAutomationFields(form);
  dndEnsureArmorAndHpAutomationFields(form);
  dndEnsureArmorSelectOptions(form);

  // -- Salvaguardas
  DND_SAVE_CONFIG.forEach((save) => {
    const base = mods[save.key];
    const hasP = form.elements[`${save.field}Prof`]?.checked;
    const bonus = base + (hasP ? prof : 0);
    dndSetCalculatedFinalBonus(form, save.field, bonus);

    const pd = form.querySelector(`[data-save-pdot="${save.key}"]`);
    if (pd) pd.classList.toggle('filled', Boolean(hasP));
  });

  // -- Perícias
  Object.entries(DND5E.SKILL_ABILITY).forEach(([sk, ab]) => {
    const base = mods[ab];
    const hasP = form.elements[`${sk}Prof`]?.checked;
    const hasE = form.elements[`${sk}Expert`]?.checked;
    const bonus = base + (hasE ? prof * 2 : hasP ? prof : 0);
    dndSetCalculatedFinalBonus(form, sk, bonus);

    const pd = form.querySelector(`[data-skill-pdot="${sk}"]`);
    const ed = form.querySelector(`[data-skill-edot="${sk}"]`);
    if (pd) pd.classList.toggle('filled', Boolean(hasP));
    if (ed) ed.classList.toggle('filled', Boolean(hasE));
  });

  // -- Percepção Passiva
  const percBonus = Number(String(dnd_val(form,'skillPerception')||'0').replace('+',''));
  const passPerc = 10 + percBonus;
  dnd_set(form, 'passivePerception', passPerc);
  const ppd = document.getElementById('dndPassivePercDisplay');
  if (ppd) ppd.textContent = passPerc;

  // -- Iniciativa = Mod DES
  const initVal = dnd_fmt(mods.dex);
  dnd_set(form, 'initiative', initVal);
  const ind = document.getElementById('dndInitDisplay');
  if (ind) ind.textContent = initVal;

  // -- Classe de Armadura
  const className = dnd_val(form, 'className');
  const armorCalc = dndCalculateArmorClass(form, mods);
  dndSetCalculatedEditableNumber(form, 'armorClass', armorCalc.total);
  dndSyncDefenseVisualState(form, armorCalc);
  const cad = document.getElementById('dndCADisplay');
  if (cad) cad.textContent = form.elements.armorClass?.value || armorCalc.total;

  // -- Pontos de Vida máximos
  const hpCalc = dndCalculateMaxHp(form, level, mods.con);
  dndSetCalculatedEditableNumber(form, 'hpMax', hpCalc.total);
  dndSyncHpAutomationNote(form, hpCalc);

  const hpCurrentField = form.elements.hpCurrent;
  const hpMaxValue = Number(form.elements.hpMax?.value || 0);
  if (hpCurrentField && hpMaxValue > 0 && String(hpCurrentField.value || '').trim() === '') {
    hpCurrentField.value = String(hpMaxValue);
  }

  // -- Spellcasting automático pela classe
  const cd = DND5E.classes[className];
  if (cd?.spellAbility) {
    const sm = mods[cd.spellAbility];
    dnd_set(form, 'spellAbility', DND5E.ABILITY_NAMES[cd.spellAbility] || '—');
    dnd_set(form, 'spellSaveDc',  8 + prof + sm);
    dnd_set(form, 'spellAttackBonus', dnd_fmt(prof + sm));
  }

  // -- HP bar
  if (typeof setDndHpBarFillWithTemp === 'function') {
    setDndHpBarFillWithTemp(
      dnd_val(form,'hpCurrent'), dnd_val(form,'hpMax'), dnd_val(form,'hpTemp')
    );
  }

  // -- Mini-display
  const nm = form.elements.characterName?.value || '---';
  const cl = form.elements.className?.value || '---';
  const ci = form.elements.combatInitiative?.value || '--';
  const mn1 = document.getElementById('dndCharacterMini');
  const mn2 = document.getElementById('dndClassMini');
  const mn3 = document.getElementById('dndInitiativeMini');
  if (mn1) mn1.textContent = nm;
  if (mn2) mn2.textContent = cl;
  if (mn3) mn3.textContent = ci;

  // -- classLevel (backward compat)
  if (form.elements.classLevel) {
    form.elements.classLevel.value = `${className} ${level}`;
  }
}

// =============================================================
// APLICAR CLASSE
// =============================================================

function dndApplyClass(form, className, options = {}) {
  const resolvedClassName = dndResolveClassName(className) || className;
  const cd = DND5E.classes[resolvedClassName];

  if (form?.elements?.className && resolvedClassName && DND5E.classes[resolvedClassName]) {
    form.elements.className.value = resolvedClassName;
  }

  dndSyncClassFieldsFromLegacy(form);

  if (!cd) {
    dndRecalculateAll(form);
    return;
  }

  className = resolvedClassName;
  const level = Math.max(1, Math.min(20, Number(form.elements.charLevel?.value) || 1));
  const force = options.force === true;

  if (force) {
    dndSetEditableResultManual(form, 'hpMax', false);
    dndSetEditableResultManual(form, 'armorClass', false);
  }

  dndApplyClassAutomationFields(form, className, { force });
  dndApplyClassSavingThrowChecks(form, className, { force });

  // Espaços de magia só são reaplicados ao escolher/reaplicar classe.
  // Assim o jogador pode gastar espaços sem o sistema restaurar tudo sozinho.
  if (force && cd.spellType !== 'none') {
    const table = DND5E.SPELL_SLOTS[cd.spellType];
    if (table && table[level - 1]) {
      const row = table[level - 1];
      for (let i = 1; i <= 9; i += 1) {
        const n = row[i - 1] || 0;
        const hidden = form.querySelector(`input[name="spellSlots${i}"][data-spell-slot-hidden]`);
        if (hidden) {
          hidden.value = '0'.repeat(Math.max(n, parseInt(hidden.value?.length || 0, 10) || n));
          const lb = hidden.closest?.('.dnd-spell-slot-level');
          if (lb && typeof syncDndSpellSlotLevel === 'function') syncDndSpellSlotLevel(lb);
        }
      }
    }
  }

  dndRenderClassFeatures(form, className, level);
  dndRecalculateAll(form);
}

// =============================================================
// APLICAR RAÇA
// =============================================================

function dndApplyRace(form, raceName) {
  const rd = DND5E.races[raceName];
  if (!rd) { dndRecalculateAll(form); return; }

  dnd_set(form, 'race', raceName);
  dnd_set(form, 'speed', campaignLabDndMetersFromFeet(rd.speed));
  dnd_set(form, 'darkvision', rd.darkvision ? campaignLabDndMetersFromFeet(rd.darkvision) : '—');

  // Skill proficiencies from race
  (rd.skills || []).forEach(sk => {
    const el = form.elements[`${sk}Prof`];
    if (el) el.checked = true;
  });

  // Show racial traits
  dndRenderRaceTraits(rd);

  // Notify about ability bonuses
  const bonusText = Object.entries(rd.abilityBonus || {})
    .map(([ab, v]) => `${ab.toUpperCase()} +${v}`).join(', ');

  const hint = document.getElementById('dndRacialBonusHint');
  if (hint) {
    hint.textContent = bonusText
      ? `⚠ Aplique manualmente os bônus raciais: ${bonusText}`
      : '';
    hint.style.display = bonusText ? 'block' : 'none';
  }

  dndRecalculateAll(form);
}

// =============================================================
// APLICAR ANTECEDENTE
// =============================================================

function dndApplyBackground(form, bgName) {
  const bg = DND5E.backgrounds[bgName];
  if (!bg) return;

  dnd_set(form, 'background', bgName);

  (bg.skills || []).forEach(sk => {
    const el = form.elements[`${sk}Prof`];
    if (el) el.checked = true;
  });

  dndRecalculateAll(form);
}

// =============================================================
// RENDERIZAR HABILIDADES DE CLASSE
// =============================================================

function dndRenderClassFeatures(form, className, level) {
  const container = document.getElementById('dndClassFeaturesContainer');
  if (!container) return;

  const cd = DND5E.classes[className];
  if (!cd) { container.innerHTML = '<p class="dnd-feature-empty">Selecione uma classe.</p>'; return; }

  const features = (cd.features || []).filter(f => f.level <= level);
  if (!features.length) { container.innerHTML = '<p class="dnd-feature-empty">Sem habilidades para este nível.</p>'; return; }

  container.innerHTML = features.map((f, i) => {
    let chargesVal = '';
    if (f.chargesFormula) {
      try {
        const chaMod = dnd_mod(form.elements.chaScore?.value || 10);
        const wisMod = dnd_mod(form.elements.wisScore?.value || 10);
        const intMod = dnd_mod(form.elements.intScore?.value || 10);
        chargesVal = String(eval(f.chargesFormula.replaceAll('level', level).replaceAll('chaMod', chaMod).replaceAll('wisMod', wisMod).replaceAll('intMod', intMod)));
      } catch { chargesVal = f.chargesFormula; }
    }
    return `
      <div class="dnd-feature-card">
        <div class="dnd-feature-card-header">
          <div>
            <strong class="dnd-feature-name">${dnd_esc(f.name)}</strong>
            <span class="dnd-feature-badge dnd-feature-badge--${(f.source||'Classe').toLowerCase().replace(/\s+/g,'-')}">${dnd_esc(f.source||'Classe')} · Nv.${f.level}</span>
          </div>
          ${f.chargesFormula !== undefined ? `
            <div class="dnd-feature-charge-row">
              <label>Cargas
                <input type="number" name="featureCharge_${i}" min="0" max="99"
                  value="${chargesVal}" class="dnd-feature-charge-input">
              </label>
              ${f.recharge ? `<span class="dnd-feature-recharge">${f.recharge === 'longo' ? '↻ Longo' : f.recharge === 'curto' ? '↻ Curto' : '↻ Turno'}</span>` : ''}
            </div>` : ''}
        </div>
        ${f.desc ? `<p class="dnd-feature-desc">${dnd_esc(f.desc)}</p>` : ''}
      </div>`;
  }).join('');
}

// =============================================================
// RENDERIZAR TRAÇOS RACIAIS
// =============================================================

function dndRenderRaceTraits(raceData) {
  const container = document.getElementById('dndRaceTraitsContainer');
  if (!container || !raceData) return;

  if (!raceData.traits?.length) {
    container.innerHTML = '<p class="dnd-feature-empty">Selecione uma raça.</p>';
    return;
  }

  const langText = raceData.languages?.length
    ? `<p class="dnd-feature-desc"><em>Idiomas:</em> ${dnd_esc(raceData.languages.join(', '))}</p>` : '';

  container.innerHTML = raceData.traits.map(t => `
    <div class="dnd-feature-card">
      <div class="dnd-feature-card-header">
        <span class="dnd-feature-badge dnd-feature-badge--racial">Racial</span>
      </div>
      <p class="dnd-feature-desc">${dnd_esc(t)}</p>
    </div>`).join('') + langText;
}



// =============================================================
// CLASSES OFICIAIS - SELECT + COMPATIBILIDADE
// =============================================================

function dnd_normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function dndClassNames() {
  return Object.keys(DND5E.classes || {});
}

function dndResolveClassName(value) {
  const normalized = dnd_normalizeText(value);
  if (!normalized) return '';

  return dndClassNames().find((className) => {
    const current = dnd_normalizeText(className);
    return current === normalized || normalized.startsWith(`${current} `);
  }) || '';
}

function dndExtractLevelFromText(value) {
  const match = String(value || '').match(/(?:^|\s)([1-9]|1[0-9]|20)(?:\s|$)/);
  return match ? Number(match[1]) : 1;
}

function dndEnhanceLegacyClassField(form) {
  if (!form || form.elements.className) return;

  const legacyInput = form.elements.classLevel;
  if (!legacyInput || legacyInput.type === 'hidden') return;

  const legacyText = legacyInput.value || '';
  const resolvedClass = dndResolveClassName(legacyText);
  const level = dndExtractLevelFromText(legacyText);
  const holder = legacyInput.closest('label') || legacyInput.parentElement;
  const wrapper = document.createElement('div');
  wrapper.className = 'dnd-class-level-select-row';
  wrapper.innerHTML = `
    <label>
      Classe
      <input
        name="className"
        id="dndClassSelect"
        type="text"
        list="dndClassOptionsList"
        value="${dnd_esc(resolvedClass || '')}"
        placeholder="Escolha ou escreva uma classe"
        autocomplete="off"
      />
      <datalist id="dndClassOptionsList">
        ${dndClassNames().map((className) => `<option value="${dnd_esc(className)}"></option>`).join('')}
      </datalist>
    </label>

    <label>
      Nível
      <input name="charLevel" id="dndCharLevelInput" type="number" min="1" max="20" value="${level}" />
    </label>

    <input name="classLevel" type="hidden" value="${dnd_esc(legacyText)}" />
  `;

  if (holder && holder.parentNode) {
    holder.parentNode.replaceChild(wrapper, holder);
  } else {
    legacyInput.insertAdjacentElement('beforebegin', wrapper);
    legacyInput.remove();
  }

  if (resolvedClass && form.elements.className) {
    form.elements.className.value = resolvedClass;
  }

  if (form.elements.charLevel) {
    form.elements.charLevel.value = level;
  }

  dndSyncClassFieldsFromLegacy(form);
}

function dndEnsureClassSelectOptions(form) {
  if (!form) return;

  dndConvertClassSelectToTextInput(form);
  dndEnsureClassDatalist(form);
}

function dndEnsureClassDatalist(form) {
  if (!form) return;

  let datalist = form.querySelector('#dndClassOptionsList') || document.getElementById('dndClassOptionsList');

  if (!datalist) {
    datalist = document.createElement('datalist');
    datalist.id = 'dndClassOptionsList';
    form.appendChild(datalist);
  }

  datalist.innerHTML = dndClassNames()
    .map((className) => `<option value="${dnd_esc(className)}"></option>`)
    .join('');
}

function dndConvertClassSelectToTextInput(form) {
  const field = form?.elements?.className;
  if (!field || field.tagName !== 'SELECT') return;

  const value = field.value || '';
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'className';
  input.id = field.id || 'dndClassSelect';
  input.value = value;
  input.placeholder = 'Escolha ou escreva uma classe';
  input.setAttribute('list', 'dndClassOptionsList');
  input.setAttribute('autocomplete', 'off');
  input.className = field.className || '';

  Array.from(field.attributes || []).forEach((attr) => {
    if (['type', 'name', 'id', 'value', 'list', 'autocomplete', 'class'].includes(attr.name)) return;
    input.setAttribute(attr.name, attr.value);
  });

  field.replaceWith(input);
}

function dndSyncClassFieldsFromLegacy(form) {
  if (!form) return;

  const select = form.elements.className;
  const levelInput = form.elements.charLevel;
  const legacyInput = form.elements.classLevel;
  const legacyText = legacyInput?.value || '';

  if (select && !select.value && legacyText) {
    const resolvedClass = dndResolveClassName(legacyText);
    if (resolvedClass) select.value = resolvedClass;
  }

  if (levelInput && (!levelInput.value || Number(levelInput.value) <= 0)) {
    levelInput.value = dndExtractLevelFromText(legacyText);
  }

  const safeLevel = Math.max(1, Math.min(20, Math.floor(Number(levelInput?.value) || 1)));

  if (levelInput) {
    levelInput.value = String(safeLevel);
  }

  if (legacyInput && select && select.value) {
    legacyInput.value = `${select.value} ${safeLevel}`;
  }

  if (form.elements.proficiencyBonus) {
    const prof = typeof dnd_profBonus === 'function'
      ? dnd_profBonus(safeLevel)
      : getCampaignLabDndProficiencyBonus(safeLevel);
    form.elements.proficiencyBonus.value = typeof dnd_fmt === 'function'
      ? dnd_fmt(prof)
      : formatCampaignLabDndBonus(prof);
  }
}

function dndDispatchSheetInput(form) {
  if (!form) return;

  window.setTimeout(() => {
    try {
      form.dispatchEvent(new Event('input', { bubbles: true }));
    } catch {}
  }, 0);
}


// =============================================================
// D&D - AUTOMAÇÃO EDITÁVEL POR CLASSE
// =============================================================

function getCampaignLabDndClassAutomationDefaults(className = '', levelValue = 1) {
  const resolvedClassName = dndResolveClassName(className) || className;
  const cd = DND5E.classes[resolvedClassName];
  if (!cd) return null;

  const level = Math.max(1, Math.min(20, Math.floor(Number(levelValue) || 1)));

  const saveNames = (cd.saves || [])
    .map((ability) => DND5E.ABILITY_NAMES[ability] || ability.toUpperCase())
    .join(', ');

  const classFeatures = (cd.features || [])
    .filter((feature) => Number(feature.level || 1) <= level)
    .map((feature) => {
      const levelText = feature.level ? `Nv. ${feature.level}` : 'Nv. 1';
      const source = feature.source ? ` • ${feature.source}` : '';
      const desc = feature.desc ? `\n${feature.desc}` : '';
      return `${levelText}${source}\n${feature.name}${desc}`;
    })
    .join('\n\n');

  return {
    hitDiceTotal: `${level}d${cd.hitDie}`,
    hitDiceRemaining: `${level}d${cd.hitDie}`,
    classSaveProficienciesText: saveNames || 'Nenhuma proficiência definida.',
    classArmorProficienciesText: (cd.armorProf || []).join(', ') || 'Nenhuma',
    classWeaponProficienciesText: (cd.weaponProf || []).join(', ') || 'Nenhuma',
    classToolProficienciesText: (cd.toolProf || []).join(', ') || 'Nenhuma',
    classInitialFeaturesText: classFeatures || 'Nenhuma habilidade de classe cadastrada para este nível.',
    spellcastingClass: cd.spellAbility ? resolvedClassName : '',
    hitDie: cd.hitDie,
  };
}

function setupCampaignLabDndClassAutomationPanel(form, sheet = {}) {
  if (!form) return;
  form.querySelectorAll('[data-dnd-class-automation-panel], [data-dnd-class-integrated-fields]').forEach((panel) => panel.remove());
}

function ensureCampaignLabDndClassIntegratedFields(form, sheet = {}) {
  if (!form) return;
  form.querySelectorAll('[data-dnd-class-automation-panel], [data-dnd-class-integrated-fields]').forEach((panel) => panel.remove());
}

function getDndClassIntegratedFieldsInnerHtml(sheet = {}) {
  return '';
}

function bindCampaignLabDndClassResetButton(form) {
  return;
}

function injectCampaignLabDndClassAutomationStyles() {
  const oldStyle = document.getElementById('campaign-lab-dnd-class-automation-style');
  if (oldStyle) oldStyle.remove();
}

function dndSetEditableAutoField(form, fieldName, value, options = {}) {
  const field = form?.elements?.[fieldName];
  if (!field) return;

  const nextValue = String(value ?? '');
  const previousAuto = field.dataset.dndAutoValue || '';
  const currentValue = String(field.value ?? '');
  const isEmpty = currentValue.trim() === '';
  const isStillAutomatic = previousAuto !== '' && currentValue === previousAuto;
  const matchesAutoPattern = options.autoPattern instanceof RegExp && options.autoPattern.test(currentValue.trim());
  const shouldSet = options.force || isEmpty || isStillAutomatic || matchesAutoPattern;

  if (!shouldSet) return;

  field.value = nextValue;
  field.dataset.dndAutoValue = nextValue;
}

function dndClearPrimaryAttributeHighlights(form) {
  if (!form) return;

  form.querySelectorAll('.dnd-primary-ability').forEach((card) => {
    card.classList.remove('dnd-primary-ability');
  });
}

function dndApplyClassAutomationFields(form, className = '', options = {}) {
  const level = Math.max(1, Math.min(20, Math.floor(Number(form?.elements?.charLevel?.value) || 1)));
  const defaults = getCampaignLabDndClassAutomationDefaults(className, level);
  if (!defaults) return;

  const force = options.force === true;
  const hitDicePattern = new RegExp(`^\\d+d${defaults.hitDie}$`, 'i');

  dndSetEditableAutoField(form, 'hitDiceTotal', defaults.hitDiceTotal, { force, autoPattern: hitDicePattern });
  dndSetEditableAutoField(form, 'hitDiceRemaining', defaults.hitDiceRemaining, { force, autoPattern: hitDicePattern });
  dndSetEditableAutoField(form, 'additionalFeatures', defaults.classInitialFeaturesText, { force });
  dndSetEditableAutoField(form, 'spellcastingClass', defaults.spellcastingClass, { force });

  const legacyFeatureField = form?.elements?.classInitialFeaturesText;
  if (legacyFeatureField) {
    dndSetEditableAutoField(form, 'classInitialFeaturesText', defaults.classInitialFeaturesText, { force });
  }

}

function dndEnsureSavingThrowProficiencyFields(form) {
  if (!form) return;

  ['Str','Dex','Con','Int','Wis','Cha'].forEach((ab) => {
    const name = `save${ab}Prof`;
    if (form.elements[name]) return;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = name;
    input.hidden = true;
    input.dataset.dndAutoSaveProf = 'true';
    form.appendChild(input);
  });
}

function dndApplyClassSavingThrowChecks(form, className = '', options = {}) {
  const resolvedClassName = dndResolveClassName(className) || className;
  const cd = DND5E.classes[resolvedClassName];
  if (!form || !cd) return;

  dndEnsureFinalBonusAutomationFields(form);

  const appliedField = dndEnsureHiddenInput(form, 'classAutoDefaultsAppliedFor', '');
  const alreadyAppliedForClass = appliedField && appliedField.value === resolvedClassName;
  const shouldApply = options.force === true || !alreadyAppliedForClass;

  if (!shouldApply) return;

  DND_SAVE_CONFIG.forEach((save) => {
    const el = form.elements[`${save.field}Prof`];
    if (el) el.checked = cd.saves.includes(save.key);
    dndSetFinalBonusManual(form, save.field, false);
  });

  if (appliedField) appliedField.value = resolvedClassName;
}

// =============================================================
// INICIALIZAR
// =============================================================

function initDndAutomations() {
  const form = document.getElementById('dndPlayerSheetForm');
  if (!form || form.dataset.dndAutoReady) return;
  form.dataset.dndAutoReady = 'true';

  dndEnhanceLegacyClassField(form);
  dndEnsureClassSelectOptions(form);
  setupCampaignLabDndClassAutomationPanel(form);
  bindCampaignLabDndClassResetButton(form);
  dndEnsureSavingThrowProficiencyFields(form);
  dndEnsureFinalBonusAutomationFields(form);
  dndBindFinalBonusAutomationEvents();
  dndBindEditableArmorHpEvents();
  dndEnsureArmorAndHpAutomationFields(form);
  dndEnsureArmorSelectOptions(form);
  dndSyncClassFieldsFromLegacy(form);

  const initialClass = form.elements.className?.value || dndResolveClassName(form.elements.classLevel?.value);
  if (initialClass) {
    dndApplyClassAutomationFields(form, initialClass, { force: false });
    dndApplyClassSavingThrowChecks(form, initialClass, { force: false });
    dndRenderClassFeatures(form, initialClass, Number(form.elements.charLevel?.value) || 1);
  }

  // Class
  const cls = form.elements.className;
  if (cls) {
    const handleClassChange = () => {
      const resolved = dndResolveClassName(cls.value);
      dndApplyClass(form, resolved || cls.value, { force: Boolean(resolved) });
      dndDispatchSheetInput(form);
    };

    cls.addEventListener('change', handleClassChange);
    cls.addEventListener('input', () => {
      const resolved = dndResolveClassName(cls.value);
      if (!resolved) {
        dndSyncClassFieldsFromLegacy(form);
        dndClearPrimaryAttributeHighlights(form);
        dndRecalculateAll(form);
        dndDispatchSheetInput(form);
        return;
      }

      handleClassChange();
    });
  }

  // Level
  const lvl = form.elements.charLevel;
  if (lvl) {
    const handleLevelChange = () => {
      dndSyncClassFieldsFromLegacy(form);
      dndSetEditableResultManual(form, 'hpMax', false);
      const cl = form.elements.className?.value;
      if (cl) {
        dndApplyClassAutomationFields(form, cl, { force: false });
        dndApplyClassSavingThrowChecks(form, cl, { force: false });
        dndRenderClassFeatures(form, cl, Number(form.elements.charLevel?.value) || 1);
      }
      dndRecalculateAll(form);
      dndDispatchSheetInput(form);
    };

    lvl.addEventListener('input', handleLevelChange);
    lvl.addEventListener('change', handleLevelChange);
  }

  // Race
  const race = form.elements.raceName;
  if (race) race.addEventListener('change', () => dndApplyRace(form, race.value));

  // Background
  const bg = form.elements.backgroundSelect;
  if (bg) bg.addEventListener('change', () => dndApplyBackground(form, bg.value));

  // Armor + Shield
  const armor = form.elements.armorType;
  const sh    = form.elements.hasShield;
  const handleDefenseChange = () => {
    dndSetEditableResultManual(form, 'armorClass', false);
    dndRecalculateAll(form);
    dndDispatchSheetInput(form);
  };
  if (armor) armor.addEventListener('change', handleDefenseChange);
  if (sh)    sh.addEventListener('change', handleDefenseChange);

  // Proficiency/Expertise checkboxes
  form.querySelectorAll('[data-prof-check],[data-expert-check]').forEach(cb => {
    cb.addEventListener('change', () => dndRecalculateAll(form));
  });

  // Extend the existing updateDndAutoNumbers
  const _orig = window.updateDndAutoNumbers;
  window.updateDndAutoNumbers = function() {
    if (typeof _orig === 'function') _orig();
    dndRecalculateAll(form);
  };

  dndRecalculateAll(form);
  console.log('[DND5E] Automações carregadas.');
}

// Hook after sheet loads from Supabase
(function() {
  const _origLoad = window.loadDndSheetIntoPlayerForm;
  window.loadDndSheetIntoPlayerForm = async function() {
    if (typeof _origLoad === 'function') await _origLoad.apply(this, arguments);
    const form = document.getElementById('dndPlayerSheetForm');
    if (form) {
      dndEnhanceLegacyClassField(form);
      dndEnsureClassSelectOptions(form);
      setupCampaignLabDndClassAutomationPanel(form);
      bindCampaignLabDndClassResetButton(form);
      dndEnsureSavingThrowProficiencyFields(form);
      dndEnsureFinalBonusAutomationFields(form);
      setupDndAltheriumBackgroundAutomation(form);
      dndBindFinalBonusAutomationEvents();
      dndBindEditableArmorHpEvents();
      dndEnsureArmorAndHpAutomationFields(form);
      dndEnsureArmorSelectOptions(form);
      dndSyncClassFieldsFromLegacy(form);
      const cn = form.elements.className?.value || dndResolveClassName(form.elements.classLevel?.value);
      const rn = form.elements.raceName?.value  || form.elements.race?.value;
      const level = form.elements.charLevel?.value;
      if (cn && form.elements.className) form.elements.className.value = cn;
      if (cn) {
        dndApplyClassAutomationFields(form, cn, { force: false });
        dndApplyClassSavingThrowChecks(form, cn, { force: false });
        dndRenderClassFeatures(form, cn, Number(level)||1);
      }
      if (rn) dndRenderRaceTraits(DND5E.races[rn]);
      dndRecalculateAll(form);
    }
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initDndAutomations, 600));
} else {
  setTimeout(initDndAutomations, 600);
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

/* =========================================================
   TRANSFERÊNCIA DE FICHAS ENTRE CAMPANHAS
   Copiar e colar fichas somente dentro do mesmo sistema.
   Usa localStorage como área de transferência interna do Campaign Lab.
========================================================= */
const CAMPAIGN_LAB_SHEET_TRANSFER_KEY = "campaignLabCopiedSheetV1";
const CAMPAIGN_LAB_SHEET_TRANSFER_TYPE = "campaign-lab-sheet-copy";
const CAMPAIGN_LAB_SHEET_TRANSFER_BLOCKED_FIELDS = new Set([
  "id",
  "campaignId",
  "campaign_id",
  "playerId",
  "player_id",
  "userId",
  "user_id",
  "ownerName",
  "system",
  "createdAt",
  "created_at",
  "updatedAt",
  "updated_at",
]);

function campaignLabGetFormDataComplete(form) {
  if (!form) return {};

  if (
    form.id &&
    String(form.id).toLowerCase().includes("dnd") &&
    typeof dndGetCompleteFormData === "function"
  ) {
    return dndGetCompleteFormData(form);
  }

  const data = Object.fromEntries(new FormData(form));

  form.querySelectorAll("input[type='checkbox'][name]").forEach((checkbox) => {
    data[checkbox.name] = checkbox.checked ? "true" : "false";
  });

  return data;
}

function campaignLabSanitizeCopiedSheetData(data = {}) {
  const clean = {};

  Object.entries(data || {}).forEach(([key, value]) => {
    if (!key || CAMPAIGN_LAB_SHEET_TRANSFER_BLOCKED_FIELDS.has(key)) return;

    if (value === undefined || value === null) {
      clean[key] = "";
      return;
    }

    if (typeof value === "object") {
      try {
        clean[key] = JSON.stringify(value);
      } catch (error) {
        clean[key] = "";
      }
      return;
    }

    clean[key] = String(value);
  });

  return clean;
}

function campaignLabGetSheetNameFromData(data = {}) {
  return (
    data.characterName ||
    data.personagem ||
    data.name ||
    data.ownerName ||
    "Ficha sem nome"
  );
}

async function campaignLabCopySheetFromForm(form, system = "") {
  if (!form) return;

  const safeSystem = system || sessionStorage.getItem("system") || "Sistema";
  const data = campaignLabSanitizeCopiedSheetData(campaignLabGetFormDataComplete(form));

  const payload = {
    type: CAMPAIGN_LAB_SHEET_TRANSFER_TYPE,
    system: safeSystem,
    copiedAt: new Date().toISOString(),
    characterName: campaignLabGetSheetNameFromData(data),
    data,
  };

  try {
    localStorage.setItem(CAMPAIGN_LAB_SHEET_TRANSFER_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Não foi possível salvar a ficha copiada no localStorage:", error);
    alert("Não consegui copiar a ficha neste navegador.");
    return;
  }

  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    }
  } catch (error) {
    // O navegador pode bloquear clipboard sem prejudicar a cópia interna.
  }

  campaignLabShowSheetTransferToast(`Ficha copiada: ${payload.characterName}`, "success");
}

async function campaignLabReadCopiedSheetPayload() {
  let raw = "";

  try {
    raw = localStorage.getItem(CAMPAIGN_LAB_SHEET_TRANSFER_KEY) || "";
  } catch (error) {
    raw = "";
  }

  if (!raw && navigator.clipboard && typeof navigator.clipboard.readText === "function") {
    try {
      raw = await navigator.clipboard.readText();
    } catch (error) {
      raw = "";
    }
  }

  if (!raw) return null;

  try {
    const payload = JSON.parse(raw);
    if (!payload || payload.type !== CAMPAIGN_LAB_SHEET_TRANSFER_TYPE) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

function campaignLabEnsureHiddenSheetField(form, name, value = "") {
  if (!form || !name || form.elements[name]) return;

  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value ?? "";
  input.dataset.sheetTransferHidden = "true";
  form.appendChild(input);
}

function campaignLabSetFormElementValue(element, value = "") {
  if (!element) return;

  if (element instanceof RadioNodeList) {
    Array.from(element).forEach((item) => campaignLabSetFormElementValue(item, value));
    return;
  }

  if (element.type === "checkbox") {
    element.checked = typeof dnd_bool === "function" ? dnd_bool(value) : ["true", "on", "1", "yes", "sim"].includes(String(value).toLowerCase());
    return;
  }

  element.value = value ?? "";
}

function campaignLabHydrateSheetForm(form, data = {}) {
  if (!form) return;

  Object.entries(data || {}).forEach(([key, value]) => {
    if (!key || CAMPAIGN_LAB_SHEET_TRANSFER_BLOCKED_FIELDS.has(key)) return;

    if (!form.elements[key]) {
      campaignLabEnsureHiddenSheetField(form, key, value);
    }

    campaignLabSetFormElementValue(form.elements[key], value);
  });
}

async function campaignLabPasteSheetIntoForm(form, system = "") {
  if (!form) return;

  const safeSystem = system || sessionStorage.getItem("system") || "Sistema";
  const payload = await campaignLabReadCopiedSheetPayload();

  if (!payload || !payload.data) {
    alert("Nenhuma ficha copiada foi encontrada.");
    return;
  }

  if (String(payload.system || "") !== String(safeSystem || "")) {
    alert(`Você copiou uma ficha de ${payload.system || "outro sistema"}, mas está tentando colar em ${safeSystem}.`);
    return;
  }

  const name = payload.characterName || campaignLabGetSheetNameFromData(payload.data);
  const ok = confirm(`Colar a ficha "${name}" nesta ficha atual?\n\nIsso vai substituir os campos editáveis desta ficha.`);

  if (!ok) return;

  campaignLabHydrateSheetForm(form, payload.data);

  if (safeSystem === "D&D") {
    if (typeof syncCampaignLabDndClassFieldsInForm === "function") syncCampaignLabDndClassFieldsInForm(form);
    if (typeof dndEnsureSavingThrowProficiencyFields === "function") dndEnsureSavingThrowProficiencyFields(form);
    if (typeof dndEnsureFinalBonusAutomationFields === "function") dndEnsureFinalBonusAutomationFields(form);
    if (typeof dndEnsureArmorAndHpAutomationFields === "function") dndEnsureArmorAndHpAutomationFields(form);
    if (typeof setupDndSpellSlotTrackers === "function") setupDndSpellSlotTrackers(form);
    if (typeof syncAllDndSpellSlotTrackers === "function") syncAllDndSpellSlotTrackers(form);
    if (typeof dndRecalculateAll === "function") dndRecalculateAll(form);
    if (typeof updateDndPlayerPreview === "function") updateDndPlayerPreview();
    if (typeof updateDndRestPreview === "function") updateDndRestPreview();
  }

  if (safeSystem === "Altherium") {
    if (typeof setupAltheriumRootFeatureSections === "function") setupAltheriumRootFeatureSections(form);
    if (typeof setupAltheriumGenesisFeatureSections === "function") setupAltheriumGenesisFeatureSections(form);
    if (typeof updateAltheriumRootSections === "function") updateAltheriumRootSections(form);
    if (typeof updateAltheriumGenesisSections === "function") updateAltheriumGenesisSections(form);
    if (typeof hydrateRunaskinVisualNotePreviews === "function") hydrateRunaskinVisualNotePreviews(form);
    if (typeof updatePlayerSheetPreview === "function") updatePlayerSheetPreview();
    if (typeof updateResourceBars === "function") updateResourceBars();
  }

  form.dispatchEvent(new Event("input", { bubbles: true }));
  form.dispatchEvent(new Event("change", { bubbles: true }));

  await campaignLabSaveSheetAfterPaste(form, safeSystem);

  campaignLabShowSheetTransferToast(`Ficha colada: ${name}`, "success");
}

async function campaignLabSaveSheetAfterPaste(form, system = "") {
  try {
    if (form.id === "playerSheetForm" && typeof savePlayerSheet === "function") {
      await savePlayerSheet(false);
      return;
    }

    if (form.id === "dndPlayerSheetForm" && typeof saveDndPlayerSheet === "function") {
      await saveDndPlayerSheet(false);
      return;
    }

    if (form.id === "altheriumForm" && form.dataset.mode === "edit-sheet" && typeof saveSheetFromModal === "function") {
      await saveSheetFromModal(false);
      return;
    }

    if (form.id === "dndForm" && form.dataset.mode === "edit-dnd-sheet" && typeof saveDndSheetFromModal === "function") {
      await saveDndSheetFromModal(false);
      return;
    }
  } catch (error) {
    console.error("Erro ao salvar ficha colada:", error);
    alert("A ficha foi colada, mas não consegui salvar automaticamente.");
  }
}

function campaignLabBuildSheetTransferButtons(form, system = "", variant = "default") {
  const wrapper = document.createElement("div");
  wrapper.className = `campaign-sheet-transfer-actions campaign-sheet-transfer-actions--${variant}`;
  wrapper.dataset.sheetTransferActions = system;

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "campaign-sheet-transfer-btn campaign-sheet-transfer-btn--copy";
  copyButton.innerHTML = "<span>⧉</span> Copiar ficha";

  const pasteButton = document.createElement("button");
  pasteButton.type = "button";
  pasteButton.className = "campaign-sheet-transfer-btn campaign-sheet-transfer-btn--paste";
  pasteButton.innerHTML = "<span>↧</span> Colar ficha";

  copyButton.addEventListener("click", () => campaignLabCopySheetFromForm(form, system));
  pasteButton.addEventListener("click", () => campaignLabPasteSheetIntoForm(form, system));

  wrapper.appendChild(copyButton);
  wrapper.appendChild(pasteButton);

  return wrapper;
}

function campaignLabSetupSheetTransferForForm(form, system = "", options = {}) {
  if (!form) return;

  const safeSystem = system || sessionStorage.getItem("system") || "Sistema";

  // D&D não usa mais os botões Copiar/Colar ficha.
  // Mantém a transferência em Altherium, mas remove qualquer botão antigo que já tenha sido criado em D&D.
  if (String(safeSystem).trim().toLowerCase() === "d&d" || form.id === "dndPlayerSheetForm" || form.id === "dndForm") {
    document
      .querySelectorAll(
        '[data-sheet-transfer-actions="D&D"], [data-sheet-transfer-owner="dndPlayerSheetForm"], [data-sheet-transfer-owner="dndForm"]'
      )
      .forEach((item) => item.remove());
    return;
  }

  const ownerKey = form.id || safeSystem;
  const existing = Array.from(document.querySelectorAll("[data-sheet-transfer-owner]")).find(
    (item) => item.dataset.sheetTransferOwner === ownerKey
  );

  if (existing) return;

  const variant = options.variant || "default";
  const buttons = campaignLabBuildSheetTransferButtons(form, safeSystem, variant);
  buttons.dataset.sheetTransferOwner = ownerKey;

  const saveButton = options.saveButton || campaignLabFindSheetTransferSaveButton(form);
  const submitButton = form.querySelector("button[type='submit']");

  if (saveButton && saveButton.parentElement) {
    saveButton.insertAdjacentElement("afterend", buttons);
    return;
  }

  if (submitButton && submitButton.parentElement) {
    submitButton.insertAdjacentElement("beforebegin", buttons);
    return;
  }

  form.insertAdjacentElement("beforebegin", buttons);
}

function campaignLabFindSheetTransferSaveButton(form) {
  if (!form) return null;

  if (form.id === "playerSheetForm") return document.getElementById("savePlayerSheet");
  if (form.id === "dndPlayerSheetForm") return document.getElementById("saveDndSheet");
  if (form.id === "altheriumForm") return form.querySelector("button[type='submit']");
  if (form.id === "dndForm") return form.querySelector("button[type='submit']");

  return form.querySelector("button[type='submit']");
}

function campaignLabShowSheetTransferToast(message = "", type = "success") {
  let stack = document.getElementById("campaignSheetTransferToastStack");

  if (!stack) {
    stack = document.createElement("div");
    stack.id = "campaignSheetTransferToastStack";
    stack.className = "campaign-sheet-transfer-toast-stack";
    document.body.appendChild(stack);
  }

  const toast = document.createElement("div");
  toast.className = `campaign-sheet-transfer-toast campaign-sheet-transfer-toast--${type}`;
  toast.textContent = message;
  stack.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  window.setTimeout(() => {
    toast.classList.remove("show");
    window.setTimeout(() => toast.remove(), 260);
  }, 2600);
}

function campaignLabSetupExistingSheetTransferButtons() {
  const altheriumPlayerForm = document.getElementById("playerSheetForm");
  const dndPlayerForm = document.getElementById("dndPlayerSheetForm");
  const altheriumMasterForm = document.getElementById("altheriumForm");
  const dndMasterForm = document.getElementById("dndForm");

  if (altheriumPlayerForm) {
    campaignLabSetupSheetTransferForForm(altheriumPlayerForm, "Altherium", {
      variant: "player",
      saveButton: document.getElementById("savePlayerSheet"),
    });
  }

  if (dndPlayerForm) {
    campaignLabSetupSheetTransferForForm(dndPlayerForm, "D&D", {
      variant: "player",
      saveButton: document.getElementById("saveDndSheet"),
    });
  }

  if (altheriumMasterForm) {
    campaignLabSetupSheetTransferForForm(altheriumMasterForm, "Altherium", {
      variant: "modal",
    });
  }

  if (dndMasterForm) {
    campaignLabSetupSheetTransferForForm(dndMasterForm, "D&D", {
      variant: "modal",
    });
  }
}

(function campaignLabWrapSheetTransferHooks() {
  try {
    if (typeof setupAltheriumPlayerSheet === "function" && !setupAltheriumPlayerSheet.__sheetTransferWrapped) {
      const original = setupAltheriumPlayerSheet;
      setupAltheriumPlayerSheet = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("playerSheetForm");
        campaignLabSetupSheetTransferForForm(form, "Altherium", {
          variant: "player",
          saveButton: document.getElementById("savePlayerSheet"),
        });
        return result;
      };
      setupAltheriumPlayerSheet.__sheetTransferWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof setupDndPlayerSheet === "function" && !setupDndPlayerSheet.__sheetTransferWrapped) {
      const original = setupDndPlayerSheet;
      setupDndPlayerSheet = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("dndPlayerSheetForm");
        campaignLabSetupSheetTransferForForm(form, "D&D", {
          variant: "player",
          saveButton: document.getElementById("saveDndSheet"),
        });
        return result;
      };
      setupDndPlayerSheet.__sheetTransferWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof loadSheetIntoPlayerForm === "function" && !loadSheetIntoPlayerForm.__sheetTransferWrapped) {
      const original = loadSheetIntoPlayerForm;
      loadSheetIntoPlayerForm = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("playerSheetForm");
        campaignLabSetupSheetTransferForForm(form, "Altherium", {
          variant: "player",
          saveButton: document.getElementById("savePlayerSheet"),
        });
        return result;
      };
      loadSheetIntoPlayerForm.__sheetTransferWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof loadDndSheetIntoPlayerForm === "function" && !loadDndSheetIntoPlayerForm.__sheetTransferWrapped) {
      const original = loadDndSheetIntoPlayerForm;
      loadDndSheetIntoPlayerForm = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("dndPlayerSheetForm");
        campaignLabSetupSheetTransferForForm(form, "D&D", {
          variant: "player",
          saveButton: document.getElementById("saveDndSheet"),
        });
        return result;
      };
      loadDndSheetIntoPlayerForm.__sheetTransferWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof openMasterSheetModal === "function" && !openMasterSheetModal.__sheetTransferWrapped) {
      const original = openMasterSheetModal;
      openMasterSheetModal = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("altheriumForm");
        campaignLabSetupSheetTransferForForm(form, "Altherium", {
          variant: "modal",
        });
        return result;
      };
      openMasterSheetModal.__sheetTransferWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof openDndMasterSheetModal === "function" && !openDndMasterSheetModal.__sheetTransferWrapped) {
      const original = openDndMasterSheetModal;
      openDndMasterSheetModal = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("dndForm");
        campaignLabSetupSheetTransferForForm(form, "D&D", {
          variant: "modal",
        });
        return result;
      };
      openDndMasterSheetModal.__sheetTransferWrapped = true;
    }
  } catch (error) {}
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(campaignLabSetupExistingSheetTransferButtons, 900);
  });
} else {
  window.setTimeout(campaignLabSetupExistingSheetTransferButtons, 900);
}




/* =========================================================
   D&D - RAÇAS 2014 AUTOMATIZADAS
========================================================= */

const DND_RACE_FEATURE_START = "===== RAÇA DE D&D =====";
const DND_RACE_FEATURE_END = "===== FIM DA RAÇA DE D&D =====";
const DND_RACE_STATE_EMPTY = { key: "", bonuses: {}, skills: [], speed: "", darkvision: "", size: "" };

function campaignLabDndPatchOfficialRaceData() {
  if (!window.DND5E && typeof DND5E === "undefined") return;
  const data = typeof DND5E !== "undefined" ? DND5E : window.DND5E;
  if (!data || !data.races) return;

  data.races["Elfo (Drow)"] = data.races["Elfo (Drow)"] || {
    abilityBonus: { dex: 2, cha: 1 },
    speed: 30,
    size: "Médio",
    darkvision: 120,
    languages: ["Comum", "Élfico"],
    skills: ["skillPerception"],
    traits: [
      "Visão no Escuro Superior: 36 m",
      "Ancestral Feérico: vantagem contra enfeitiçado e imunidade a sono mágico.",
      "Transe: 4h de meditação substituem o sono comum.",
      "Sensibilidade à Luz Solar: desvantagem em ataques e testes de Percepção baseados em visão sob sol direto.",
      "Magia Drow: luzes dançantes no nível 1; fogo das fadas no nível 3; escuridão no nível 5.",
      "Treinamento com Armas Drow: rapieira, espada curta e besta de mão.",
    ],
  };

  if (data.races["Humano (Variante)"]) {
    data.races["Humano (Variante)"].abilityChoices = { count: 2, amount: 1, different: true };
    data.races["Humano (Variante)"].skillChoiceCount = 1;
  }

  if (data.races["Meio-Elfo"]) {
    data.races["Meio-Elfo"].abilityChoices = { count: 2, amount: 1, different: true, exclude: ["cha"] };
    data.races["Meio-Elfo"].skillChoiceCount = 2;
  }

  if (data.races["Anão (Colina)"]) {
    data.races["Anão (Colina)"].hpPerLevelBonus = 1;
  }

  if (data.races["Draconato"]) {
    data.races["Draconato"].draconicAncestry = true;
  }
}

function dndRaceNames() {
  campaignLabDndPatchOfficialRaceData();
  return Object.keys(DND5E.races || {}).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function dndResolveRaceName(value = "") {
  const normalized = dnd_normalizeText(value);
  if (!normalized) return "";

  return dndRaceNames().find((raceName) => {
    const current = dnd_normalizeText(raceName);
    return current === normalized || normalized.startsWith(`${current} `);
  }) || "";
}

function dndRaceOptionsHtml(selectedValue = "") {
  const selectedRace = dndResolveRaceName(selectedValue) || selectedValue;
  return [`<option value="">Selecione a raça</option>`]
    .concat(
      dndRaceNames().map((raceName) => {
        const selected = raceName === selectedRace ? " selected" : "";
        return `<option value="${escapeHtml(raceName)}"${selected}>${escapeHtml(raceName)}</option>`;
      })
    )
    .join("");
}

function dndRaceSelect(value = "", sheet = {}) {
  const selected = dndResolveRaceName(value) || value || "";

  return `
    <label class="dnd-race-field">
      Raça
      <select name="race" data-dnd-race-select="true">
        ${dndRaceOptionsHtml(selected)}
      </select>
      <small class="dnd-race-help">
        Aplica atributos, deslocamento, perícias raciais e traços automáticos.
      </small>
    </label>
    <div class="dnd-race-automation-panel" data-dnd-race-panel="true">
      ${dndRaceChoicePanelHtml(selected, sheet)}
    </div>
  `;
}

function dndAbilitySelectOptions(selectedValue = "", exclude = [], usedValues = []) {
  const selected = selectedValue || "";
  const blocked = new Set((exclude || []).filter(Boolean));

  return DND5E.ABILITIES
    .filter((ability) => !blocked.has(ability) || ability === selected)
    .map((ability) => {
      const selectedAttr = ability === selected ? " selected" : "";
      const used = usedValues.includes(ability) && ability !== selected ? " disabled" : "";
      return `<option value="${ability}"${selectedAttr}${used}>${escapeHtml(DND5E.ABILITY_NAMES[ability] || ability.toUpperCase())}</option>`;
    })
    .join("");
}

function dndSkillSelectOptions(selectedValue = "", usedValues = []) {
  const selected = selectedValue || "";
  return Object.keys(DND5E.SKILL_NAMES || {})
    .sort((a, b) => DND5E.SKILL_NAMES[a].localeCompare(DND5E.SKILL_NAMES[b], "pt-BR"))
    .map((skill) => {
      const selectedAttr = skill === selected ? " selected" : "";
      const used = usedValues.includes(skill) && skill !== selected ? " disabled" : "";
      return `<option value="${skill}"${selectedAttr}${used}>${escapeHtml(DND5E.SKILL_NAMES[skill] || skill)}</option>`;
    })
    .join("");
}

function dndGetDraconicAncestryOptions(selectedValue = "") {
  const options = [
    ["Preto", "Ácido", "Linha 1,5 × 9 m DES"],
    ["Azul", "Elétrico", "Linha 1,5 × 9 m DES"],
    ["Latão", "Fogo", "Linha 1,5 × 9 m DES"],
    ["Bronze", "Elétrico", "Linha 1,5 × 9 m DES"],
    ["Cobre", "Ácido", "Linha 1,5 × 9 m DES"],
    ["Ouro", "Fogo", "Cone 4,5 m DES"],
    ["Verde", "Veneno", "Cone 4,5 m CON"],
    ["Vermelho", "Fogo", "Cone 4,5 m DES"],
    ["Prata", "Frio", "Cone 4,5 m CON"],
    ["Branco", "Frio", "Cone 4,5 m CON"],
  ];

  const selected = selectedValue || "Vermelho";
  return options
    .map(([name, damage, breath]) => {
      const value = `${name}|${damage}|${breath}`;
      return `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(name)} · ${escapeHtml(damage)}</option>`;
    })
    .join("");
}

function dndRaceChoicePanelHtml(raceName = "", sheet = {}) {
  campaignLabDndPatchOfficialRaceData();
  const resolvedRace = dndResolveRaceName(raceName) || raceName;
  const race = DND5E.races?.[resolvedRace];

  if (!race) {
    return `<p class="dnd-race-panel-empty">Selecione uma raça para aplicar bônus automáticos.</p>`;
  }

  const fixedBonuses = Object.entries(race.abilityBonus || {})
    .map(([ability, value]) => `${DND5E.ABILITY_NAMES[ability] || ability.toUpperCase()} +${value}`)
    .join(", ");

  const abilityChoices = race.abilityChoices;
  const abilityChoiceHtml = abilityChoices
    ? Array.from({ length: abilityChoices.count }, (_, index) => {
        const fieldName = `raceAbilityChoice${index + 1}`;
        const current = sheet[fieldName] || "";
        return `
          <label>
            <span>Bônus racial ${index + 1}</span>
            <select name="${fieldName}" data-dnd-race-choice="ability">
              <option value="">Escolha atributo</option>
              ${dndAbilitySelectOptions(current, abilityChoices.exclude || [], [])}
            </select>
          </label>
        `;
      }).join("")
    : "";

  const skillChoiceHtml = race.skillChoiceCount
    ? Array.from({ length: race.skillChoiceCount }, (_, index) => {
        const fieldName = `raceSkillChoice${index + 1}`;
        const current = sheet[fieldName] || "";
        return `
          <label>
            <span>Perícia racial ${index + 1}</span>
            <select name="${fieldName}" data-dnd-race-choice="skill">
              <option value="">Escolha perícia</option>
              ${dndSkillSelectOptions(current, [])}
            </select>
          </label>
        `;
      }).join("")
    : "";

  const dragonHtml = race.draconicAncestry
    ? `
      <label>
        <span>Ancestral dracônico</span>
        <select name="dndDraconicAncestry" data-dnd-race-choice="dragon">
          ${dndGetDraconicAncestryOptions(sheet.dndDraconicAncestry || "")}
        </select>
      </label>
    `
    : "";

  const extraHtml = [abilityChoiceHtml, skillChoiceHtml, dragonHtml].filter(Boolean).join("");

  return `
    <div class="dnd-race-panel-head">
      <strong>${escapeHtml(resolvedRace)}</strong>
      <span>${escapeHtml(race.size || "Médio")} · ${escapeHtml(campaignLabDndMetersFromFeet(race.speed || 30))}${race.darkvision ? ` · Visão ${campaignLabDndMetersFromFeet(race.darkvision)}` : ""}</span>
    </div>
    ${fixedBonuses ? `<p class="dnd-race-panel-bonuses">Bônus fixos: ${escapeHtml(fixedBonuses)}</p>` : ""}
    ${extraHtml ? `<div class="dnd-race-panel-grid">${extraHtml}</div>` : ""}
  `;
}

function dndEnsureRaceStateInput(form) {
  return dndEnsureHiddenInput(form, "dndRaceAppliedState", JSON.stringify(DND_RACE_STATE_EMPTY));
}

function dndGetRaceState(form) {
  const input = dndEnsureRaceStateInput(form);
  if (!input || !input.value) return { ...DND_RACE_STATE_EMPTY };

  try {
    const parsed = JSON.parse(input.value);
    return {
      key: parsed.key || "",
      bonuses: parsed.bonuses && typeof parsed.bonuses === "object" ? parsed.bonuses : {},
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      speed: parsed.speed || "",
      darkvision: parsed.darkvision || "",
      size: parsed.size || "",
    };
  } catch (error) {
    return { ...DND_RACE_STATE_EMPTY };
  }
}

function dndSetRaceState(form, state) {
  const input = dndEnsureRaceStateInput(form);
  if (!input) return;

  input.value = JSON.stringify(state || DND_RACE_STATE_EMPTY);
}

function dndEnsureRaceSelector(form) {
  if (!form) return;

  let currentField = form.elements.race;

  if (!currentField) {
    const select = document.createElement("select");
    select.name = "race";
    select.dataset.dndRaceSelect = "true";
    select.innerHTML = dndRaceOptionsHtml("");
    form.appendChild(select);
    currentField = select;
  }

  if (currentField instanceof RadioNodeList) return;

  if (currentField.tagName === "SELECT") {
    const previous = currentField.value || "";
    currentField.dataset.dndRaceSelect = "true";
    currentField.classList.add("dnd-race-select");
    currentField.innerHTML = dndRaceOptionsHtml(previous);
    currentField.value = dndResolveRaceName(previous) || previous;
    return;
  }

  const select = document.createElement("select");
  select.name = currentField.name;
  select.id = currentField.id || "dndRaceSelect";
  select.className = `${currentField.className || ""} dnd-race-select`.trim();
  select.dataset.dndRaceSelect = "true";
  select.innerHTML = dndRaceOptionsHtml(currentField.value);
  select.value = dndResolveRaceName(currentField.value) || currentField.value;
  currentField.replaceWith(select);
}

function dndEnsureRaceAutomationPanel(form, sheet = null) {
  if (!form) return null;

  let panel = form.querySelector("[data-dnd-race-panel]");
  const raceField = form.elements.race;

  if (!panel) {
    panel = document.createElement("div");
    panel.className = "dnd-race-automation-panel";
    panel.dataset.dndRacePanel = "true";

    const label = raceField?.closest?.("label");
    if (label && label.parentNode) {
      label.insertAdjacentElement("afterend", panel);
    } else {
      form.appendChild(panel);
    }
  }

  const data = sheet || Object.fromEntries(new FormData(form));
  panel.innerHTML = dndRaceChoicePanelHtml(raceField?.value || "", data);
  return panel;
}

function dndGetRaceChoiceSignature(form, race = null) {
  const raceName = dndResolveRaceName(form?.elements?.race?.value || "") || "";
  const raceData = race || DND5E.races?.[raceName] || null;
  const parts = [raceName];

  if (raceData?.abilityChoices) {
    for (let index = 1; index <= raceData.abilityChoices.count; index += 1) {
      parts.push(form.elements[`raceAbilityChoice${index}`]?.value || "");
    }
  }

  if (raceData?.skillChoiceCount) {
    for (let index = 1; index <= raceData.skillChoiceCount; index += 1) {
      parts.push(form.elements[`raceSkillChoice${index}`]?.value || "");
    }
  }

  if (raceData?.draconicAncestry) {
    parts.push(form.elements.dndDraconicAncestry?.value || "");
  }

  return parts.join("|");
}

function dndApplyDefaultRaceChoices(form, raceData) {
  if (!form || !raceData) return;

  if (raceData.abilityChoices) {
    const exclude = new Set(raceData.abilityChoices.exclude || []);
    const used = new Set();

    for (let index = 1; index <= raceData.abilityChoices.count; index += 1) {
      const field = form.elements[`raceAbilityChoice${index}`];
      if (!field) continue;

      if (field.value && !exclude.has(field.value) && !used.has(field.value)) {
        used.add(field.value);
        continue;
      }

      const fallback = DND5E.ABILITIES.find((ability) => !exclude.has(ability) && !used.has(ability));
      field.value = fallback || "";
      if (fallback) used.add(fallback);
    }
  }

  if (raceData.skillChoiceCount) {
    const used = new Set();

    for (let index = 1; index <= raceData.skillChoiceCount; index += 1) {
      const field = form.elements[`raceSkillChoice${index}`];
      if (!field) continue;

      if (field.value && !used.has(field.value)) {
        used.add(field.value);
        continue;
      }

      const fallback = Object.keys(DND5E.SKILL_NAMES || {}).find((skill) => !used.has(skill));
      field.value = fallback || "";
      if (fallback) used.add(fallback);
    }
  }

  if (raceData.draconicAncestry && form.elements.dndDraconicAncestry && !form.elements.dndDraconicAncestry.value) {
    form.elements.dndDraconicAncestry.value = "Vermelho|Fogo|Cone 4,5 m DES";
  }
}

function dndGetRaceAbilityBonuses(form, raceData) {
  const bonuses = { ...(raceData?.abilityBonus || {}) };

  if (raceData?.abilityChoices) {
    for (let index = 1; index <= raceData.abilityChoices.count; index += 1) {
      const ability = form.elements[`raceAbilityChoice${index}`]?.value || "";
      if (!ability || !DND5E.ABILITIES.includes(ability)) continue;
      if ((raceData.abilityChoices.exclude || []).includes(ability)) continue;
      bonuses[ability] = (Number(bonuses[ability]) || 0) + Number(raceData.abilityChoices.amount || 1);
    }
  }

  return bonuses;
}

function dndGetRaceSkillBonuses(form, raceData) {
  const skills = [...(raceData?.skills || [])];

  if (raceData?.skillChoiceCount) {
    for (let index = 1; index <= raceData.skillChoiceCount; index += 1) {
      const skill = form.elements[`raceSkillChoice${index}`]?.value || "";
      if (skill && DND5E.SKILL_NAMES?.[skill] && !skills.includes(skill)) {
        skills.push(skill);
      }
    }
  }

  return skills;
}

function dndRemoveRaceEffects(form, state = {}) {
  if (!form || !state) return;

  Object.entries(state.bonuses || {}).forEach(([ability, value]) => {
    const field = form.elements[`${ability}Score`];
    if (!field) return;

    const current = Number(field.value || 10);
    const next = Math.max(1, current - (Number(value) || 0));
    field.value = String(next);
  });

  (state.skills || []).forEach((skill) => {
    const checkbox = form.elements[`${skill}Prof`];
    if (!checkbox) return;

    checkbox.checked = false;
    dndSetFinalBonusManual(form, skill, false);
  });

  dndWriteRaceFeatureBlock(form, null, state);
}

function dndApplyRaceSelection(form, options = {}) {
  if (!form || !form.elements.race) return;

  campaignLabDndPatchOfficialRaceData();
  dndEnsureFinalBonusAutomationFields(form);
  dndEnsureRaceStateInput(form);

  const raceName = dndResolveRaceName(form.elements.race.value) || "";
  const raceData = raceName ? DND5E.races?.[raceName] : null;
  const previousState = dndGetRaceState(form);
  const currentSignature = dndGetRaceChoiceSignature(form, raceData);
  const shouldApply = options.force || previousState.key !== currentSignature;

  if (!shouldApply) {
    dndWriteRaceFeatureBlock(form, raceData, previousState);
    return;
  }

  dndRemoveRaceEffects(form, previousState);

  if (!raceData) {
    dndSetRaceState(form, { ...DND_RACE_STATE_EMPTY });
    dndWriteRaceFeatureBlock(form, null, null);
    if (!options.silent) {
      dndRecalculateAll(form);
      dndDispatchSheetInput(form);
    }
    return;
  }

  if (form.elements.race) form.elements.race.value = raceName;
  dndApplyDefaultRaceChoices(form, raceData);

  const bonuses = dndGetRaceAbilityBonuses(form, raceData);
  const skills = dndGetRaceSkillBonuses(form, raceData);

  Object.entries(bonuses).forEach(([ability, value]) => {
    const field = form.elements[`${ability}Score`];
    if (!field) return;

    const current = Number(field.value || 10);
    field.value = String(Math.max(1, current + (Number(value) || 0)));
  });

  skills.forEach((skill) => {
    const checkbox = form.elements[`${skill}Prof`];
    if (!checkbox) return;

    checkbox.checked = true;
    dndSetFinalBonusManual(form, skill, false);
  });

  if (form.elements.speed) form.elements.speed.value = campaignLabDndMetersFromFeet(raceData.speed || 30);
  dndEnsureHiddenInput(form, "darkvision", raceData.darkvision ? campaignLabDndMetersFromFeet(raceData.darkvision) : "—");
  dndEnsureHiddenInput(form, "size", raceData.size || "Médio");
  if (form.elements.darkvision) form.elements.darkvision.value = raceData.darkvision ? campaignLabDndMetersFromFeet(raceData.darkvision) : "—";
  if (form.elements.size) form.elements.size.value = raceData.size || "Médio";

  const nextState = {
    key: dndGetRaceChoiceSignature(form, raceData),
    bonuses,
    skills,
    speed: campaignLabDndMetersFromFeet(raceData.speed || 30),
    darkvision: raceData.darkvision ? campaignLabDndMetersFromFeet(raceData.darkvision) : "—",
    size: raceData.size || "Médio",
  };

  dndSetRaceState(form, nextState);
  dndWriteRaceFeatureBlock(form, raceData, nextState);

  if (!options.silent) {
    dndRecalculateAll(form);
    dndDispatchSheetInput(form);
  }
}

function dndWriteRaceFeatureBlock(form, raceData, state = null) {
  const field = form?.elements?.features || form?.elements?.additionalFeatures;
  if (!field) return;

  const clean = dndRemoveBlock(field.value, DND_RACE_FEATURE_START, DND_RACE_FEATURE_END);

  if (!raceData) {
    field.value = clean;
    return;
  }

  const abilityText = Object.entries((state && state.bonuses) || {})
    .map(([ability, value]) => `${DND5E.ABILITY_NAMES[ability] || ability.toUpperCase()} +${value}`)
    .join(", ");

  const skillText = ((state && state.skills) || [])
    .map((skill) => DND5E.SKILL_NAMES?.[skill] || skill)
    .join(", ");

  const dragonValue = form.elements.dndDraconicAncestry?.value || "";
  const dragonText = dragonValue ? dragonValue.split("|") : [];

  const lines = [
    DND_RACE_FEATURE_START,
    `${form.elements.race?.value || "Raça"}`,
    `Tamanho: ${raceData.size || "Médio"}.`,
    `Deslocamento: ${campaignLabDndMetersFromFeet(raceData.speed || 30)}`,
  ];

  if (raceData.darkvision) lines.push(`Visão no escuro: ${campaignLabDndMetersFromFeet(raceData.darkvision)}`);
  if (abilityText) lines.push(`Bônus raciais aplicados: ${abilityText}.`);
  if (skillText) lines.push(`Perícias raciais automáticas: ${skillText}.`);
  if (raceData.hpPerLevelBonus) lines.push(`PV racial: +${raceData.hpPerLevelBonus} PV por nível.`);
  if (raceData.languages?.length) lines.push(`Idiomas: ${raceData.languages.join(", ")}.`);
  if (dragonText.length === 3) {
    lines.push(`Ancestral dracônico: ${dragonText[0]} · dano ${dragonText[1]} · sopro ${dragonText[2]}.`);
  }

  (raceData.traits || []).forEach((trait) => lines.push(`- ${trait}`));
  lines.push(DND_RACE_FEATURE_END);

  field.value = [clean, lines.join("\n")]
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function dndRenderRaceChoicesAndApply(form, options = {}) {
  if (!form) return;

  dndEnsureRaceSelector(form);
  dndEnsureRaceAutomationPanel(form);
  dndApplyDefaultRaceChoices(form, DND5E.races?.[dndResolveRaceName(form.elements.race?.value || "")]);
  dndEnsureRaceAutomationPanel(form);
  dndApplyRaceSelection(form, options);
}

function setupCampaignLabDndRaceAutomation(form, sheet = null) {
  if (!form) return;

  campaignLabDndPatchOfficialRaceData();
  dndEnsureRaceSelector(form);
  dndEnsureRaceStateInput(form);
  dndEnsureRaceAutomationPanel(form, sheet || Object.fromEntries(new FormData(form)));

  if (!window.dndOfficialRaceAutomationEventsReady) {
    window.dndOfficialRaceAutomationEventsReady = true;

    document.addEventListener("change", (event) => {
      const target = event.target.closest?.("[data-dnd-race-select], [data-dnd-race-choice]");
      if (!target) return;

      const currentForm = target.closest("form");
      if (!currentForm) return;

      if (target.matches("[data-dnd-race-select]")) {
        dndEnsureRaceAutomationPanel(currentForm);
      }

      dndRenderRaceChoicesAndApply(currentForm, { force: true });
    }, true);
  }

  dndApplyRaceSelection(form, { silent: true });
  dndRecalculateAll(form);
}

// Sobrescreve a versão antiga, que só exibia aviso para aplicar bônus raciais manualmente.
function dndApplyRace(form, raceName) {
  if (!form) return;
  if (form.elements.race && raceName !== undefined) form.elements.race.value = dndResolveRaceName(raceName) || raceName || "";
  dndRenderRaceChoicesAndApply(form, { force: true });
}

// PV racial: Anão da Colina soma +1 PV por nível.
function dndCalculateMaxHp(form, level, conMod) {
  const safeLevel = Math.max(1, Math.min(20, Math.floor(Number(level) || 1)));
  const hitDie = dndGetHitDieFromForm(form);
  const averagePerLevel = dndAverageHitDieGain(hitDie);
  const raceName = dndResolveRaceName(form?.elements?.race?.value || "");
  const raceData = raceName ? DND5E.races?.[raceName] : null;
  const raceHpBonus = Number(raceData?.hpPerLevelBonus || 0) * safeLevel;
  const total = Math.max(
    safeLevel,
    hitDie + Math.max(0, safeLevel - 1) * averagePerLevel + conMod * safeLevel + raceHpBonus
  );

  const raceText = raceHpBonus ? ` + bônus racial ${raceHpBonus}` : "";

  return {
    total,
    hitDie,
    averagePerLevel,
    raceHpBonus,
    explanation: `PV = ${hitDie} no nível 1 + ${Math.max(0, safeLevel - 1)} × ${averagePerLevel} + CON ${conMod >= 0 ? "+" : ""}${conMod} × ${safeLevel}${raceText} = ${total}`,
  };
}

(function campaignLabWrapDndRaceAutomationHooks() {
  try {
    if (typeof setupDndPlayerSheet === "function" && !setupDndPlayerSheet.__raceAutomationWrapped) {
      const original = setupDndPlayerSheet;
      setupDndPlayerSheet = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("dndPlayerSheetForm");
        setupCampaignLabDndRaceAutomation(form);
        return result;
      };
      setupDndPlayerSheet.__raceAutomationWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof loadDndSheetIntoPlayerForm === "function" && !loadDndSheetIntoPlayerForm.__raceAutomationWrapped) {
      const original = loadDndSheetIntoPlayerForm;
      loadDndSheetIntoPlayerForm = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("dndPlayerSheetForm");
        setupCampaignLabDndRaceAutomation(form);
        return result;
      };
      loadDndSheetIntoPlayerForm.__raceAutomationWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof saveDndPlayerSheet === "function" && !saveDndPlayerSheet.__raceAutomationWrapped) {
      const original = saveDndPlayerSheet;
      saveDndPlayerSheet = async function () {
        const form = document.getElementById("dndPlayerSheetForm");
        if (form) dndApplyRaceSelection(form, { silent: true });
        return original.apply(this, arguments);
      };
      saveDndPlayerSheet.__raceAutomationWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof openDndMasterSheetModal === "function" && !openDndMasterSheetModal.__raceAutomationWrapped) {
      const original = openDndMasterSheetModal;
      openDndMasterSheetModal = async function () {
        const result = await original.apply(this, arguments);
        const form = document.getElementById("dndForm");
        setupCampaignLabDndRaceAutomation(form);
        return result;
      };
      openDndMasterSheetModal.__raceAutomationWrapped = true;
    }
  } catch (error) {}

  try {
    if (typeof saveDndSheetFromModal === "function" && !saveDndSheetFromModal.__raceAutomationWrapped) {
      const original = saveDndSheetFromModal;
      saveDndSheetFromModal = async function () {
        const form = document.getElementById("dndForm");
        if (form) dndApplyRaceSelection(form, { silent: true });
        return original.apply(this, arguments);
      };
      saveDndSheetFromModal.__raceAutomationWrapped = true;
    }
  } catch (error) {}
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(() => setupCampaignLabDndRaceAutomation(document.getElementById("dndPlayerSheetForm")), 950);
  });
} else {
  window.setTimeout(() => setupCampaignLabDndRaceAutomation(document.getElementById("dndPlayerSheetForm")), 950);
}


/* =========================================================
   D&D 5e - PATCH DO REWORK VISUAL CAMPAIGN LAB
   Mantém Supabase e automações antigas, adiciona abas internas,
   resumo vivo, exportação/importação e rolagens rápidas.
========================================================= */
(function campaignLabDndV2ReworkPatch() {
  const SYSTEM_KEY = "dnd5e-2014";
  const ABILITY_FIELDS = {
    str: "strScore",
    dex: "dexScore",
    con: "conScore",
    int: "intScore",
    wis: "wisScore",
    cha: "chaScore",
  };

  const BONUS_SOURCES = {
    strMod: "strScore",
    dexMod: "dexScore",
    conMod: "conScore",
    intMod: "intScore",
    wisMod: "wisScore",
    chaMod: "chaScore",
  };

  function q(sel, root = document) {
    return root.querySelector(sel);
  }

  function qa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function asNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function mod(score) {
    return Math.floor((asNumber(score, 10) - 10) / 2);
  }

  function plus(n) {
    n = asNumber(n, 0);
    return n >= 0 ? `+${n}` : `${n}`;
  }

  function levelFrom(form) {
    return Math.max(1, Math.min(20, Math.floor(asNumber(form?.elements?.charLevel?.value, 1))));
  }

  function proficiency(level) {
    return Math.ceil(level / 4) + 1;
  }

  function currentSheetData(form) {
    const data = {};
    new FormData(form).forEach((value, key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    qa('input[type="checkbox"]', form).forEach((input) => {
      data[input.name] = input.checked;
    });

    return data;
  }

  function fillSheetData(form, data = {}) {
    Object.entries(data).forEach(([key, value]) => {
      const el = form.elements[key];
      if (!el) return;

      const nodes = el instanceof RadioNodeList ? Array.from(el) : [el];
      nodes.forEach((node) => {
        if (!node) return;
        if (node.type === "checkbox") node.checked = value === true || value === "true" || value === "on";
        else node.value = value ?? "";
      });
    });

    form.dispatchEvent(new Event("input", { bubbles: true }));
    form.dispatchEvent(new Event("change", { bubbles: true }));
    refresh();
  }

  function safeJsonExport(form) {
    return JSON.stringify({
      system: SYSTEM_KEY,
      app: "Campaign Lab",
      version: 2,
      exportedAt: new Date().toISOString(),
      sheet: currentSheetData(form),
    }, null, 2);
  }

  function normalizeDefaults(form) {
    if (!form) return;

    Object.values(ABILITY_FIELDS).forEach((field) => {
      const input = form.elements[field];
      if (input && (input.value === "" || input.value === "-1")) input.value = "10";
    });

    ["initiative", "combatInitiative", "hpCurrent", "hpMax", "hpTemp", "armorClass"].forEach((field) => {
      const input = form.elements[field];
      if (input && input.value === "") input.value = field === "armorClass" ? "10" : "0";
    });

    qa('[data-dnd-final-bonus]', form).forEach((input) => {
      if (input.value === "") input.value = "0";
    });
  }

  function valueForToken(form, token) {
    token = String(token || "").trim();
    if (!token) return 0;
    if (/^[+-]?\d+$/.test(token)) return Number(token);
    if (BONUS_SOURCES[token]) return mod(form.elements[BONUS_SOURCES[token]]?.value);

    const direct = form.elements[token];
    if (direct) return asNumber(direct.value, 0);

    return 0;
  }

  function rollDiceFormula(form, formula) {
    const clean = String(formula || "1d20").replace(/\s+/g, "");
    const parts = clean.match(/[+-]?[^+-]+/g) || ["1d20"];
    const detail = [];
    let total = 0;

    parts.forEach((part) => {
      const sign = part.startsWith("-") ? -1 : 1;
      const raw = part.replace(/^[+-]/, "");
      const dice = raw.match(/^(\d*)d(\d+)$/i);

      if (dice) {
        const qty = Math.max(1, Number(dice[1] || 1));
        const faces = Math.max(2, Number(dice[2]));
        const rolls = Array.from({ length: qty }, () => Math.floor(Math.random() * faces) + 1);
        const subtotal = rolls.reduce((a, b) => a + b, 0) * sign;
        total += subtotal;
        detail.push(`${sign < 0 ? "-" : ""}${qty}d${faces} [${rolls.join(", ")}]`);
        return;
      }

      const value = valueForToken(form, raw) * sign;
      total += value;
      detail.push(`${sign < 0 ? "-" : "+"}${raw}(${Math.abs(value)})`);
    });

    return { total, detail: detail.join(" ") };
  }



function updateDndV2AvatarPreview(form, fallbackName = "Personagem") {
  const avatar = document.getElementById("dndV2AvatarPreview");
  if (!avatar) return;

  const sheet = form
    ? Object.fromEntries(new FormData(form))
    : {};

  const characterName =
    sheet.characterName ||
    fallbackName ||
    "Personagem";

  const imageUrl =
    sheet.characterAvatarUrl ||
    sheet.characterPortraitUrl ||
    "";

  if (typeof getCharacterPortraitHtml === "function") {
    avatar.innerHTML = getCharacterPortraitHtml(
      {
        ...sheet,
        characterName,
        characterAvatarUrl: imageUrl,
        characterPortraitUrl: imageUrl,
      },
      "large"
    );
    return;
  }

  avatar.textContent = String(characterName).trim().charAt(0).toUpperCase() || "✦";
}

  function updateSummary(form) {
    if (!form) return;

    const level = levelFrom(form);
    const prof = proficiency(level);
    const ac = form.elements.armorClass?.value || "10";
    const hpCurrent = form.elements.hpCurrent?.value || "0";
    const hpMax = form.elements.hpMax?.value || "0";
    const hpTemp = form.elements.hpTemp?.value || "0";
    const initiative = form.elements.initiative?.value || form.elements.combatInitiative?.value || "0";
    const characterName = form.elements.characterName?.value || "Personagem";
    const className = form.elements.className?.value || "Classe";
    const raceName = form.elements.race?.value || "Raça não escolhida";
    const background = form.elements.background?.value || "Antecedente não escolhido";
    const perception = asNumber(form.elements.skillPerception?.value, 0);
    const spellDc = form.elements.spellSaveDc?.value || "--";

    const values = {
      dndV2ArmorClassView: ac,
      dndV2ArmorClassBig: ac,
      dndV2HpView: `${hpCurrent} / ${hpMax}`,
      dndV2HpBig: hpTemp && hpTemp !== "0" ? `${hpCurrent} / ${hpMax} +${hpTemp}` : `${hpCurrent} / ${hpMax}`,
      dndV2InitiativeView: plus(asNumber(initiative, 0)),
      dndV2ProficiencyView: plus(prof),
      dndV2PassivePerception: String(10 + perception),
      dndV2SpellDcBig: spellDc,
      dndV2CharacterNameSide: characterName,
      dndV2ClassSide: `${className} ${level}`,
      dndV2RaceSummary: `${raceName} • ${background}`,
    };

    Object.entries(values).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });

    updateDndV2AvatarPreview(form, characterName);
  }

  function refresh() {
    const form = document.getElementById("dndPlayerSheetForm");
    if (!form) return;
    normalizeDefaults(form);

    try {
      if (typeof dndRecalculateAll === "function") dndRecalculateAll(form);
      if (typeof updateDndAutoNumbers === "function") updateDndAutoNumbers();
      if (typeof updateDndPlayerPreview === "function") updateDndPlayerPreview();
    } catch (error) {
      console.warn("D&D rework refresh:", error);
    }

    updateSummary(form);
  }

  function setupTabs(form) {
    const tabButtons = qa("[data-dnd-v2-tab]", form);
    const panels = qa("[data-dnd-v2-panel]", form);

    tabButtons.forEach((button) => {
      if (button.dataset.dndV2Ready === "true") return;
      button.dataset.dndV2Ready = "true";

      button.addEventListener("click", () => {
        const target = button.dataset.dndV2Tab;
        tabButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
        panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.dndV2Panel === target));
      });
    });
  }

  function setupExportImport(form) {
    const copyBtn = document.getElementById("dndV2CopySheetBtn");
    const downloadBtn = document.getElementById("dndV2DownloadSheetBtn");
    const exportBtn = document.getElementById("dndV2ExportIntoBoxBtn");
    const importBtn = document.getElementById("dndV2ImportSheetBtn");
    const exportBox = document.getElementById("dndV2ExportBox");
    const importBox = document.getElementById("dndV2ImportBox");

    function putExport() {
      const json = safeJsonExport(form);
      if (exportBox) exportBox.value = json;
      return json;
    }

    if (copyBtn && copyBtn.dataset.dndV2Ready !== "true") {
      copyBtn.dataset.dndV2Ready = "true";
      copyBtn.addEventListener("click", async () => {
        const json = putExport();
        try {
          await navigator.clipboard.writeText(json);
          copyBtn.textContent = "Ficha copiada";
          setTimeout(() => (copyBtn.textContent = "Copiar ficha"), 1600);
        } catch {
          alert("Não consegui copiar automaticamente. Use o botão Baixar JSON para exportar a ficha.");
        }
      });
    }

    if (downloadBtn && downloadBtn.dataset.dndV2Ready !== "true") {
      downloadBtn.dataset.dndV2Ready = "true";
      downloadBtn.addEventListener("click", () => {
        const json = putExport();
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const name = form.elements.characterName?.value?.trim() || "ficha-dnd";
        a.href = url;
        a.download = `${name.replace(/[^a-z0-9_-]+/gi, "-").toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    if (exportBtn && exportBtn.dataset.dndV2Ready !== "true") {
      exportBtn.dataset.dndV2Ready = "true";
      exportBtn.addEventListener("click", putExport);
    }

    if (importBtn && importBtn.dataset.dndV2Ready !== "true") {
      importBtn.dataset.dndV2Ready = "true";
      importBtn.addEventListener("click", () => {
        try {
          const parsed = JSON.parse(importBox?.value || "{}");
          if (parsed.system !== SYSTEM_KEY || !parsed.sheet || typeof parsed.sheet !== "object") {
            alert("Essa ficha não pertence ao sistema D&D 5e 2014 do Campaign Lab.");
            return;
          }
          fillSheetData(form, parsed.sheet);
          alert("Ficha importada. Clique em Salvar ficha para gravar no Supabase.");
        } catch {
          alert("JSON inválido. Confira se você colou o código completo da ficha.");
        }
      });
    }
  }

  function setupRolls(form) {
    if (form.dataset.dndV2RollsReady === "true") return;
    form.dataset.dndV2RollsReady = "true";

    form.addEventListener("click", (event) => {
      const rollBtn = event.target.closest("[data-dnd-v2-roll]");
      const attackBtn = event.target.closest("[data-dnd-v2-attack-row]");
      if (!rollBtn && !attackBtn) return;

      event.preventDefault();
      refresh();

      let label = rollBtn?.dataset.dndV2RollLabel || "Rolagem";
      let formula = rollBtn?.dataset.dndV2Roll || "1d20";

      if (attackBtn) {
        const row = attackBtn.dataset.dndV2AttackRow;
        label = form.elements[`attack${row}Name`]?.value || `Ataque ${row}`;
        const bonus = form.elements[`attack${row}Bonus`]?.value || "+0";
        formula = `1d20${String(bonus).trim().startsWith("-") ? "" : "+"}${bonus}`;
      }

      const result = rollDiceFormula(form, formula);
      const box = document.getElementById("dndV2QuickRollResult");
      if (box) {
        const s = box.querySelector("span");
        const strong = box.querySelector("strong");
        const p = box.querySelector("p");
        if (s) s.textContent = label;
        if (strong) strong.textContent = result.total;
        if (p) p.textContent = `${formula} → ${result.detail}`;
      }
    });
  }

  function setupLiveRefresh(form) {
    if (form.dataset.dndV2RefreshReady === "true") return;
    form.dataset.dndV2RefreshReady = "true";
    let timer = null;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(refresh, 80);
    };
    form.addEventListener("input", schedule);
    form.addEventListener("change", schedule);
  }

  function init() {
    const form = document.getElementById("dndPlayerSheetForm");
    if (!form) return;
    setupTabs(form);
    setupExportImport(form);
    setupRolls(form);
    setupLiveRefresh(form);
    normalizeDefaults(form);
    setTimeout(refresh, 120);
    setTimeout(refresh, 800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* =========================================================
   D&D 5e - AJUSTE VISUAL IMPECÁVEL
   Cole este bloco no final do script.js.
   Não altera Supabase nem tabelas. Só melhora UI, resumo e feedback.
========================================================= */
(function setupCampaignLabDndImpecavelVisualPatch() {
  function getForm() {
    return document.getElementById("dndPlayerSheetForm");
  }

  function toNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function formatBonus(value) {
    const number = toNumber(value, 0);
    return number >= 0 ? `+${number}` : String(number);
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function getInitials(name) {
    const clean = String(name || "").trim();
    if (!clean) return "✦";
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  function updateHpBar(form) {
    const current = Math.max(0, toNumber(form?.elements?.hpCurrent?.value, 0));
    const max = Math.max(0, toNumber(form?.elements?.hpMax?.value, 0));
    const percent = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
    const bar = document.getElementById("dndHpBarFill");
    if (bar) bar.style.setProperty("--dnd-hp-percent", `${percent}%`);
  }

  function updatePremiumSummary() {
    const form = getForm();
    if (!form) return;

    const name = form.elements.characterName?.value?.trim() || "Personagem";
    const className = form.elements.className?.value?.trim() || "Classe";
    const level = Math.max(1, Math.min(20, Math.floor(toNumber(form.elements.charLevel?.value, 1))));
    const initiative = form.elements.initiative?.value || form.elements.combatInitiative?.value || "0";
    const armorClass = form.elements.armorClass?.value || "10";
    const hpCurrent = form.elements.hpCurrent?.value || "0";
    const hpMax = form.elements.hpMax?.value || "0";
    const proficiency = typeof getCampaignLabDndProficiencyBonus === "function"
      ? getCampaignLabDndProficiencyBonus(level)
      : Math.ceil(level / 4) + 1;

    setText("dndCharacterMini", name);
    setText("dndClassMini", `${className} ${level}`);
    setText("dndInitiativeMini", formatBonus(initiative));
    setText("dndV2CharacterNameSide", name);
    setText("dndV2ClassSide", `${className} ${level}`);
    setText("dndV2ArmorClassView", armorClass);
    setText("dndV2ArmorClassBig", armorClass);
    setText("dndV2HpView", `${hpCurrent} / ${hpMax}`);
    setText("dndV2HpBig", `${hpCurrent} / ${hpMax}`);
    setText("dndV2InitiativeView", formatBonus(initiative));
    setText("dndV2ProficiencyView", formatBonus(proficiency));

    updateDndV2AvatarPreview(form, name);

    updateHpBar(form);
  }

  function enhanceTabs(form) {
    const labels = {
      overview: "Visão Geral",
      attributes: "Atributos",
      combat: "Combate",
      skills: "Perícias",
      spells: "Magias",
      inventory: "Inventário",
      story: "História",
      rest: "Descansar",
    };

    form.querySelectorAll("[data-dnd-v2-tab]").forEach((button) => {
      const key = button.dataset.dndV2Tab;
      button.setAttribute("aria-label", labels[key] || button.textContent.trim());
      button.setAttribute("type", "button");
    });
  }

  function enhanceCards(form) {
    form.querySelectorAll(".dnd-v2-hero-stats article").forEach((card, index) => {
      card.dataset.statIndex = String(index + 1);
    });

    form.querySelectorAll(".dnd-v2-panel").forEach((panel) => {
      panel.setAttribute("tabindex", "-1");
    });
  }

  function setupRollFeedback(form) {
    if (form.dataset.dndImpecavelRollFeedback === "true") return;
    form.dataset.dndImpecavelRollFeedback = "true";

    form.addEventListener("click", (event) => {
      const button = event.target.closest("[data-dnd-v2-roll], [data-dnd-v2-attack-row]");
      if (!button) return;

      window.setTimeout(() => {
        const box = document.getElementById("dndV2QuickRollResult");
        if (!box) return;
        box.classList.add("is-hot");
        window.setTimeout(() => box.classList.remove("is-hot"), 620);
      }, 40);
    });
  }

  function setupSaveFeedback() {
    const button = document.getElementById("saveDndSheet");
    if (!button || button.dataset.dndImpecavelSaveReady === "true") return;
    button.dataset.dndImpecavelSaveReady = "true";

    button.addEventListener("click", () => {
      const original = button.textContent;
      button.textContent = "Salvando...";
      window.setTimeout(() => {
        button.textContent = "Ficha salva";
        window.setTimeout(() => {
          button.textContent = original || "Salvar ficha";
        }, 900);
      }, 260);
    });
  }

  function boot() {
    const form = getForm();
    if (!form) return;

    document.body.classList.add("dnd-design-impecavel");
    form.classList.add("dnd-impecavel-sheet");
    enhanceTabs(form);
    enhanceCards(form);
    setupRollFeedback(form);
    setupSaveFeedback();
    updatePremiumSummary();

    if (form.dataset.dndImpecavelRefreshReady !== "true") {
      form.dataset.dndImpecavelRefreshReady = "true";
      form.addEventListener("input", updatePremiumSummary);
      form.addEventListener("change", updatePremiumSummary);
    }

    window.setTimeout(updatePremiumSummary, 450);
    window.setTimeout(updatePremiumSummary, 1100);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();


/* =========================================================
   D&D - CORREÇÃO: CA AUTOMÁTICO COM DESTREZA
   Cole este bloco no FINAL do script.js.
   Faz a CA recalcular quando mudar DES, armadura ou escudo.
========================================================= */
(function setupCampaignLabDndArmorClassDexFix() {
  const FALLBACK_ARMOR_TYPES = {
    "Sem Armadura": { base: 10, type: "none" },
    "Acolchoada": { base: 11, type: "light" },
    "Couro": { base: 11, type: "light" },
    "Couro Batido": { base: 12, type: "light" },
    "Gibão de Peles": { base: 12, type: "medium" },
    "Camisão de Malha": { base: 13, type: "medium" },
    "Cota de Escamas": { base: 14, type: "medium" },
    "Peitoral": { base: 14, type: "medium" },
    "Meia Armadura": { base: 15, type: "medium" },
    "Corselete de Anéis": { base: 14, type: "heavy" },
    "Cota de Malha": { base: 16, type: "heavy" },
    "Cota de Talas": { base: 17, type: "heavy" },
    "Armadura de Placas": { base: 18, type: "heavy" },
  };

  const DEFENSE_TRIGGER_FIELDS = new Set(["dexScore", "armorType", "hasShield"]);

  function getDndForms() {
    return [
      document.getElementById("dndPlayerSheetForm"),
      document.getElementById("dndForm"),
    ].filter(Boolean);
  }

  function isDndForm(form) {
    return Boolean(
      form &&
        form.elements &&
        form.elements.dexScore &&
        form.elements.armorClass
    );
  }

  function toNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function abilityMod(score) {
    return Math.floor((toNumber(score, 10) - 10) / 2);
  }

  function toBool(value) {
    return value === true || value === "true" || value === "on" || value === "1" || value === 1;
  }

  function getArmorTypes() {
    try {
      if (typeof DND5E !== "undefined" && DND5E && DND5E.ARMOR_TYPES) {
        return DND5E.ARMOR_TYPES;
      }
    } catch (error) {}

    if (window.DND5E && window.DND5E.ARMOR_TYPES) {
      return window.DND5E.ARMOR_TYPES;
    }

    return FALLBACK_ARMOR_TYPES;
  }

  function readShield(form) {
    const shield = form?.elements?.hasShield;
    if (!shield) return false;

    if (shield instanceof RadioNodeList) {
      return Array.from(shield).some((item) => item.checked || toBool(item.value));
    }

    return Boolean(shield.checked) || toBool(shield.value);
  }

  function unlockArmorClassAutomation(form) {
    if (!isDndForm(form)) return;

    const manualFieldName = "armorClassManual";
    let manualField = form.elements[manualFieldName];

    if (!manualField) {
      manualField = document.createElement("input");
      manualField.type = "hidden";
      manualField.name = manualFieldName;
      form.appendChild(manualField);
    }

    manualField.value = "false";

    const armorClass = form.elements.armorClass;
    if (armorClass) {
      armorClass.dataset.dndManual = "false";
      armorClass.dataset.dndEditableResult = "armorClass";
    }
  }

  function calculateArmorClass(form) {
    const armorTypes = getArmorTypes();
    const armorName = form.elements.armorType?.value || "Sem Armadura";
    const armor = armorTypes[armorName] || armorTypes["Sem Armadura"] || FALLBACK_ARMOR_TYPES["Sem Armadura"];
    const dexMod = abilityMod(form.elements.dexScore?.value);
    const hasShield = readShield(form);

    let dexApplied = dexMod;
    let total = 10 + dexMod;
    let formula = "10 + DES";

    if (armor.type === "light") {
      total = armor.base + dexMod;
      dexApplied = dexMod;
      formula = `${armor.base} + DES`;
    } else if (armor.type === "medium") {
      dexApplied = Math.min(dexMod, 2);
      total = armor.base + dexApplied;
      formula = `${armor.base} + DES limitado a +2`;
    } else if (armor.type === "heavy") {
      dexApplied = 0;
      total = armor.base;
      formula = `${armor.base} sem DES`;
    } else {
      total = 10 + dexMod;
      dexApplied = dexMod;
      formula = "10 + DES";
    }

    if (hasShield) {
      total += 2;
      formula += " + Escudo 2";
    }

    return {
      total,
      armorType: armorName,
      armor,
      dexMod,
      dexApplied,
      shieldActive: hasShield,
      formula,
      explanation: `CA = ${formula} = ${total}`,
    };
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function syncArmorClassViews(form, armorCalc) {
    const value = String(armorCalc.total);

    setText("dndV2ArmorClassView", value);
    setText("dndV2ArmorClassBig", value);
    setText("dndCADisplay", value);

    const note = document.getElementById("dndArmorRuleNote");
    if (note) {
      note.textContent = `${armorCalc.explanation}. Leve soma DES. Média limita DES em +2. Pesada não soma DES. Escudo soma +2.`;
    }

    const field = form.elements.armorClass;
    const box = document.getElementById("dndArmorClassField") || field?.closest?.("label");
    const shieldToggle = document.getElementById("dndShieldToggle");

    if (field) field.classList.toggle("dnd-armor-class-input--shielded", armorCalc.shieldActive);
    if (box) box.classList.toggle("dnd-armor-class-field--shielded", armorCalc.shieldActive);
    if (shieldToggle) shieldToggle.classList.toggle("is-active", armorCalc.shieldActive);
  }

  function applyAutomaticArmorClass(form) {
    if (!isDndForm(form)) return;

    unlockArmorClassAutomation(form);

    try {
      if (typeof dndRecalculateAll === "function") {
        dndRecalculateAll(form);
      }
    } catch (error) {
      console.warn("Falha ao recalcular a ficha antes da CA automática:", error);
    }

    const armorCalc = calculateArmorClass(form);
    const armorClass = form.elements.armorClass;

    if (armorClass) {
      armorClass.value = String(armorCalc.total);
      armorClass.dataset.dndAutoValue = String(armorCalc.total);
      armorClass.dataset.dndManual = "false";
    }

    syncArmorClassViews(form, armorCalc);
  }

  function scheduleArmorClassRefresh(form) {
    window.clearTimeout(form.__dndArmorClassDexFixTimer);
    form.__dndArmorClassDexFixTimer = window.setTimeout(() => {
      applyAutomaticArmorClass(form);
    }, 0);
  }

  function handleDefenseInput(event) {
    const target = event.target;
    const form = target?.closest?.("form");

    if (!isDndForm(form)) return;
    if (!DEFENSE_TRIGGER_FIELDS.has(target.name)) return;

    unlockArmorClassAutomation(form);
    scheduleArmorClassRefresh(form);
  }

  function setupForm(form) {
    if (!isDndForm(form) || form.dataset.dndArmorClassDexFixReady === "true") return;

    form.dataset.dndArmorClassDexFixReady = "true";
    unlockArmorClassAutomation(form);
    scheduleArmorClassRefresh(form);
  }

  function scanForms() {
    getDndForms().forEach(setupForm);
  }

  document.addEventListener("input", handleDefenseInput, true);
  document.addEventListener("change", handleDefenseInput, true);

  const originalLoadPlayer = window.loadDndSheetIntoPlayerForm;
  if (typeof originalLoadPlayer === "function" && !originalLoadPlayer.__dndArmorClassDexFixWrapped) {
    window.loadDndSheetIntoPlayerForm = async function () {
      const result = await originalLoadPlayer.apply(this, arguments);
      scanForms();
      return result;
    };
    window.loadDndSheetIntoPlayerForm.__dndArmorClassDexFixWrapped = true;
  }

  const originalOpenMaster = window.openDndMasterSheetModal;
  if (typeof originalOpenMaster === "function" && !originalOpenMaster.__dndArmorClassDexFixWrapped) {
    window.openDndMasterSheetModal = async function () {
      const result = await originalOpenMaster.apply(this, arguments);
      scanForms();
      return result;
    };
    window.openDndMasterSheetModal.__dndArmorClassDexFixWrapped = true;
  }

  const originalUpdateDndAutoNumbers = window.updateDndAutoNumbers;
  if (typeof originalUpdateDndAutoNumbers === "function" && !originalUpdateDndAutoNumbers.__dndArmorClassDexFixWrapped) {
    window.updateDndAutoNumbers = function () {
      const result = originalUpdateDndAutoNumbers.apply(this, arguments);
      getDndForms().forEach((form) => {
        if (isDndForm(form)) {
          unlockArmorClassAutomation(form);
          const armorCalc = calculateArmorClass(form);
          const armorClass = form.elements.armorClass;
          if (armorClass) armorClass.value = String(armorCalc.total);
          syncArmorClassViews(form, armorCalc);
        }
      });
      return result;
    };
    window.updateDndAutoNumbers.__dndArmorClassDexFixWrapped = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scanForms);
  } else {
    scanForms();
  }

  window.setTimeout(scanForms, 300);
  window.setTimeout(scanForms, 1000);
  window.setTimeout(scanForms, 2000);
})();
/* =========================================================
   D&D 5e - INICIATIVA AUTOMÁTICA SEM LOOP
   Cole este bloco no FINAL do script.js.

   Corrige o travamento/carregamento infinito causado por eventos
   input/change disparados por JavaScript.

   O que faz:
   - Iniciativa base = modificador de Destreza.
   - O campo initiative recebe número puro: 2, 1, 0, -1.
   - O campo combatInitiative acompanha DES apenas enquanto estiver automático.
   - Se o jogador digitar ou rolar, o valor da mesa vira manual e não é sobrescrito.
   - O botão "Rolar iniciativa" rola 1d20 + DES e salva uma vez, sem loop.
========================================================= */
(function setupCampaignLabDndInitiativeNoLoopPatch() {
  const FORM_IDS = ["dndPlayerSheetForm", "dndForm"];
  const WATCHED_NAMES = new Set(["dexScore", "initiative", "combatInitiative"]);

  function getForms() {
    return FORM_IDS.map((id) => document.getElementById(id)).filter(Boolean).filter(isDndForm);
  }

  function isDndForm(form) {
    return Boolean(form && form.elements && form.elements.dexScore && (form.elements.initiative || form.elements.combatInitiative));
  }

  function toNumber(value, fallback = 0) {
    const number = Number(String(value ?? "").replace(",", ".").replace(/[^\d.-]/g, ""));
    return Number.isFinite(number) ? number : fallback;
  }

  function getDexMod(form) {
    const score = toNumber(form?.elements?.dexScore?.value, 10) || 10;
    return Math.floor((score - 10) / 2);
  }

  function formatBonus(value) {
    const number = toNumber(value, 0);
    return number >= 0 ? `+${number}` : String(number);
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setSilent(field, value) {
    if (!field) return false;

    const finalValue = String(value);
    if (String(field.value ?? "") === finalValue) return false;

    field.value = finalValue;
    return true;
  }

  function markCombatAuto(form) {
    if (!form?.elements?.combatInitiative) return;
    form.elements.combatInitiative.dataset.dndInitiativeSource = "auto";
    form.dataset.dndCombatInitiativeSource = "auto";
  }

  function markCombatManual(form, source = "manual") {
    if (!form?.elements?.combatInitiative) return;
    form.elements.combatInitiative.dataset.dndInitiativeSource = source;
    form.dataset.dndCombatInitiativeSource = source;
  }

  function shouldSyncCombatWithDex(form, dexMod) {
    const field = form?.elements?.combatInitiative;
    if (!field) return false;

    const current = String(field.value ?? "").trim();
    const source = field.dataset.dndInitiativeSource || form.dataset.dndCombatInitiativeSource || "";
    const lastAuto = form.dataset.dndLastAutoInitiative || "";

    if (current === "") return true;
    if (source === "auto" || source === "dex") return true;
    if (lastAuto !== "" && current === lastAuto) return true;

    // Ficha antiga costuma abrir com 0. Se ninguém rolou/digitou ainda, 0 acompanha DES.
    if (!source && current === "0" && String(dexMod) !== "0") return true;

    return false;
  }

  function updateInitiativeViews(form) {
    const dexMod = getDexMod(form);
    const combatValue = String(form?.elements?.combatInitiative?.value ?? "").trim();
    const visibleCombat = combatValue || "--";
    const baseBonus = formatBonus(dexMod);

    setText("dndInitDisplay", baseBonus);
    setText("dndV2InitiativeView", baseBonus);
    setText("dndInitiativeMini", visibleCombat);
  }

  function syncInitiative(form, options = {}) {
    if (!isDndForm(form)) return;

    const dexMod = getDexMod(form);

    // Input type="number" não aceita "+2". Por isso salvamos número puro.
    setSilent(form.elements.initiative, dexMod);

    if (form.elements.combatInitiative && (options.forceCombat || shouldSyncCombatWithDex(form, dexMod))) {
      markCombatAuto(form);
      setSilent(form.elements.combatInitiative, dexMod);
      form.dataset.dndLastAutoInitiative = String(dexMod);
    }

    updateInitiativeViews(form);
  }

  function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
  }

  function updateQuickRollResult(total, dexMod, d20) {
    const box = document.getElementById("dndV2QuickRollResult");
    if (!box) return;

    const span = box.querySelector("span");
    const strong = box.querySelector("strong");
    const p = box.querySelector("p");

    if (span) span.textContent = "Iniciativa";
    if (strong) strong.textContent = String(total);
    if (p) p.textContent = `1d20${formatBonus(dexMod)} → ${d20} ${formatBonus(dexMod)} = ${total}`;
  }

  function isInitiativeRollButton(button) {
    if (!button) return false;

    const label = String(button.dataset.dndV2RollLabel || "").toLowerCase();
    const formula = String(button.dataset.dndV2Roll || "").toLowerCase().replace(/\s+/g, "");

    return label.includes("iniciativa") || formula === "1d20+initiative";
  }

  function injectActionButtons(form) {
    const combatField = form?.elements?.combatInitiative;
    if (!combatField) return;

    const box = combatField.closest(".dnd-initiative-box") || combatField.closest("label") || combatField.parentElement;
    if (!box || box.querySelector("[data-dnd-initiative-actions]")) return;

    const actions = document.createElement("div");
    actions.className = "dnd-initiative-auto-actions";
    actions.dataset.dndInitiativeActions = "true";
    actions.innerHTML = `
      <button type="button" data-dnd-roll-combat-initiative="true">Rolar 1d20 + DES</button>
      <button type="button" data-dnd-use-dex-initiative="true">Usar bônus DES</button>
      <button type="button" data-dnd-clear-combat-initiative="true">Limpar</button>
    `;

    const paragraph = box.querySelector("p");
    if (paragraph) paragraph.insertAdjacentElement("beforebegin", actions);
    else box.appendChild(actions);
  }

  function injectStyles() {
    if (document.getElementById("dnd-initiative-no-loop-style")) return;

    const style = document.createElement("style");
    style.id = "dnd-initiative-no-loop-style";
    style.textContent = `
      .dnd-initiative-auto-actions {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 8px;
        margin: 12px 0 6px;
      }

      .dnd-initiative-auto-actions button {
        min-height: 38px;
        padding: 8px 12px;
        border: 1px solid rgba(248, 113, 113, 0.34);
        border-radius: 999px;
        background: rgba(239, 68, 68, 0.1);
        color: #fecaca;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .dnd-initiative-auto-actions button:hover {
        transform: translateY(-1px);
        border-color: rgba(248, 113, 113, 0.7);
        background: rgba(239, 68, 68, 0.18);
      }

      @media (max-width: 700px) {
        .dnd-initiative-auto-actions { justify-content: stretch; }
        .dnd-initiative-auto-actions button { width: 100%; }
      }
    `;

    document.head.appendChild(style);
  }

  function scheduleSave(form) {
    if (!isDndForm(form)) return;

    window.clearTimeout(form.__dndInitiativeNoLoopSaveTimer);
    form.__dndInitiativeNoLoopSaveTimer = window.setTimeout(async () => {
      try {
        if (form.id === "dndPlayerSheetForm" && typeof saveDndPlayerSheet === "function") {
          await saveDndPlayerSheet(false);
        } else if (form.id === "dndForm" && typeof saveDndSheetFromModal === "function") {
          await saveDndSheetFromModal(false);
        }

        refreshBoardsSoon();
      } catch (error) {
        console.warn("Não foi possível salvar a iniciativa:", error);
      }
    }, 250);
  }

  function refreshBoardsSoon() {
    window.clearTimeout(window.__dndInitiativeNoLoopBoardTimer);
    window.__dndInitiativeNoLoopBoardTimer = window.setTimeout(async () => {
      try {
        if (typeof renderInitiativeBoard !== "function") return;

        if (document.getElementById("dndPlayerInitiativeBoard") && typeof getDndPlayerInitiativeConfig === "function") {
          await renderInitiativeBoard(getDndPlayerInitiativeConfig());
        }

        if (document.getElementById("dndInitiativeBoard")) {
          await renderInitiativeBoard({
            system: "D&D",
            boardId: "dndInitiativeBoard",
            clearButtonId: "clearDndInitiativeBtn",
            getSheet: getOrCreateDndSheet,
            updateSheet: updateDndSheet,
          });
        }
      } catch (error) {
        console.warn("Não foi possível atualizar a iniciativa:", error);
      }
    }, 550);
  }

  function rollAndApply(form) {
    if (!isDndForm(form)) return;

    const dexMod = getDexMod(form);
    const d20 = rollD20();
    const total = d20 + dexMod;

    setSilent(form.elements.initiative, dexMod);
    setSilent(form.elements.combatInitiative, total);
    markCombatManual(form, "roll");
    updateInitiativeViews(form);
    updateQuickRollResult(total, dexMod, d20);
    scheduleSave(form);
  }

  function useDexAsCombat(form) {
    if (!isDndForm(form)) return;

    markCombatAuto(form);
    syncInitiative(form, { forceCombat: true });
    scheduleSave(form);
  }

  function clearCombat(form) {
    if (!isDndForm(form) || !form.elements.combatInitiative) return;

    markCombatAuto(form);
    setSilent(form.elements.combatInitiative, "");
    syncInitiative(form, { forceCombat: true });
    scheduleSave(form);
  }

  function setupForm(form) {
    if (!isDndForm(form)) return;

    injectStyles();
    injectActionButtons(form);
    syncInitiative(form);

    if (form.dataset.dndInitiativeNoLoopReady === "true") return;
    form.dataset.dndInitiativeNoLoopReady = "true";

    form.addEventListener("click", (event) => {
      const rollButton = event.target.closest?.("[data-dnd-roll-combat-initiative]");
      const useDexButton = event.target.closest?.("[data-dnd-use-dex-initiative]");
      const clearButton = event.target.closest?.("[data-dnd-clear-combat-initiative]");
      const quickRollButton = event.target.closest?.("[data-dnd-v2-roll]");

      if (rollButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        rollAndApply(form);
        return;
      }

      if (useDexButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        useDexAsCombat(form);
        return;
      }

      if (clearButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        clearCombat(form);
        return;
      }

      if (quickRollButton && isInitiativeRollButton(quickRollButton)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        rollAndApply(form);
      }
    }, true);

    form.addEventListener("input", (event) => {
      const target = event.target;
      if (!target || !WATCHED_NAMES.has(target.name)) return;

      if (target.name === "combatInitiative") {
        const empty = String(target.value || "").trim() === "";
        if (empty) markCombatAuto(form);
        else markCombatManual(form, "manual");
      }

      if (target.name === "dexScore" || target.name === "initiative") {
        syncInitiative(form);
      }

      updateInitiativeViews(form);
    }, true);

    form.addEventListener("change", (event) => {
      const target = event.target;
      if (!target || !WATCHED_NAMES.has(target.name)) return;

      if (target.name === "combatInitiative") {
        const empty = String(target.value || "").trim() === "";
        if (empty) markCombatAuto(form);
        else markCombatManual(form, "manual");
      }

      if (target.name === "dexScore" || target.name === "initiative") {
        syncInitiative(form);
      }

      updateInitiativeViews(form);
    }, true);
  }

  function wrapRecalculateAll() {
    const original = typeof dndRecalculateAll === "function" ? dndRecalculateAll : window.dndRecalculateAll;
    if (typeof original !== "function" || original.__dndInitiativeNoLoopWrapped) return;

    const wrapped = function dndRecalculateAllInitiativeNoLoopWrapper(form) {
      const result = original.apply(this, arguments);

      try {
        if (isDndForm(form)) syncInitiative(form);
      } catch (error) {
        console.warn("Falha ao sincronizar iniciativa:", error);
      }

      return result;
    };

    wrapped.__dndInitiativeNoLoopWrapped = true;
    window.dndRecalculateAll = wrapped;

    try {
      dndRecalculateAll = wrapped;
    } catch (error) {}
  }

  function scan() {
    wrapRecalculateAll();
    getForms().forEach(setupForm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scan);
  } else {
    scan();
  }

  window.setTimeout(scan, 300);
  window.setTimeout(scan, 1000);
  window.setTimeout(scan, 2000);
})();

/* =========================================================
   D&D - ESPAÇOS DE MAGIA MANUAIS
   Como funciona:
   - O jogador coloca um número no campo acima de cada círculo.
   - O sistema cria exatamente esse número de bolinhas opacas.
   - Ao clicar, a bolinha fica azul forte, marcando espaço disponível/ativo.
   - Não depende de classe, nível ou DND5E.
========================================================= */
(function campaignLabManualSpellSlots() {
  const MAX_SLOTS_PER_LEVEL = 12;
  const DEFAULT_MAX_BY_LEVEL = [4, 3, 3, 3, 3, 2, 2, 1, 1];
  const MODE_FIELD = 'dndSpellSlotsAvailableMode';

  function clamp(value, min, max) {
    const number = Math.floor(Number(value));
    if (!Number.isFinite(number)) return min;
    return Math.max(min, Math.min(max, number));
  }

  function normalizeState(value, length, padValue = '1') {
    const safeLength = clamp(length, 0, MAX_SLOTS_PER_LEVEL);
    const raw = String(value || '').replace(/[^01]/g, '');
    return (raw + String(padValue || '1').repeat(safeLength)).slice(0, safeLength);
  }

  function getSlotLevel(levelBox) {
    const byBox = Number(levelBox?.dataset?.spellSlotLevel || 0);
    if (byBox >= 1 && byBox <= 9) return byBox;

    const hidden = levelBox?.querySelector?.('[data-spell-slot-hidden]');
    const byHidden = Number(hidden?.dataset?.spellSlotHidden || 0);
    if (byHidden >= 1 && byHidden <= 9) return byHidden;

    return 1;
  }

  function getForm(scope) {
    if (scope?.tagName === 'FORM') return scope;
    if (scope?.closest) {
      const form = scope.closest('form');
      if (form) return form;
    }
    return document.getElementById('dndPlayerSheetForm') || document.querySelector('form');
  }

  function getLevelBoxes(scope = document) {
    const root = scope?.querySelectorAll ? scope : document;
    return Array.from(root.querySelectorAll('.dnd-spell-slot-level'));
  }

  function ensureModeField(form) {
    if (!form) return null;
    let field = form.elements?.[MODE_FIELD] || form.querySelector(`input[name="${MODE_FIELD}"]`);
    if (!field) {
      field = document.createElement('input');
      field.type = 'hidden';
      field.name = MODE_FIELD;
      field.value = '';
      form.appendChild(field);
    }
    return field;
  }

  function ensureHidden(levelBox, level) {
    let hidden = levelBox.querySelector(`[data-spell-slot-hidden="${level}"]`) || levelBox.querySelector('[data-spell-slot-hidden]');

    if (!hidden) {
      hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = `spellSlots${level}`;
      hidden.value = '';
      hidden.dataset.spellSlotHidden = String(level);
      levelBox.prepend(hidden);
    }

    return hidden;
  }

  function ensureDotsWrapper(levelBox, level) {
    let dotsWrapper = levelBox.querySelector('.dnd-spell-slot-dots');

    if (!dotsWrapper) {
      dotsWrapper = document.createElement('div');
      dotsWrapper.className = 'dnd-spell-slot-dots';
      dotsWrapper.setAttribute('aria-label', `Espaços de magia de ${level}º nível`);
      levelBox.appendChild(dotsWrapper);
    }

    return dotsWrapper;
  }

  function ensureMaxInput(levelBox, level) {
    let input = levelBox.querySelector(`[data-spell-slot-max-input="${level}"]`) || levelBox.querySelector('.dnd-spell-slot-max-input');

    if (!input) {
      const top = document.createElement('div');
      top.className = 'dnd-spell-slot-top';

      input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.max = String(MAX_SLOTS_PER_LEVEL);
      input.step = '1';
      input.name = `spellSlotsMax${level}`;
      input.className = 'dnd-spell-slot-max-input';
      input.dataset.spellSlotMaxInput = String(level);
      input.dataset.noNumberControl = 'true';
      input.dataset.numberControlReady = 'true';
      input.setAttribute('aria-label', `Quantidade máxima de espaços de magia de ${level}º nível`);

      const oldStrong = levelBox.querySelector(':scope > strong');
      const title = oldStrong || document.createElement('strong');
      title.textContent = title.textContent || `${level}º`;

      top.appendChild(title);
      top.appendChild(input);

      const hidden = levelBox.querySelector('[data-spell-slot-hidden]');
      if (hidden && hidden.nextSibling) {
        hidden.parentNode.insertBefore(top, hidden.nextSibling);
      } else {
        levelBox.prepend(top);
      }
    } else if (!input.name) {
      input.name = `spellSlotsMax${level}`;
    }

    if (input.value === '') {
      const hidden = levelBox.querySelector('[data-spell-slot-hidden]');
      const savedLength = String(hidden?.value || '').replace(/[^01]/g, '').length;
      input.value = String(savedLength || DEFAULT_MAX_BY_LEVEL[level - 1] || 0);
    }

    input.type = 'number';
    input.min = '0';
    input.max = String(MAX_SLOTS_PER_LEVEL);
    input.step = '1';
    input.dataset.spellSlotMaxInput = String(level);
    input.dataset.noNumberControl = 'true';
    input.dataset.numberControlReady = 'true';

    return input;
  }

  function getMaxValue(levelBox, level) {
    const input = ensureMaxInput(levelBox, level);
    const max = clamp(input.value, 0, MAX_SLOTS_PER_LEVEL);
    input.value = String(max);
    return max;
  }

  function renderLevel(levelBox) {
    if (!levelBox) return;

    const level = getSlotLevel(levelBox);
    const hidden = ensureHidden(levelBox, level);
    const input = ensureMaxInput(levelBox, level);
    const dotsWrapper = ensureDotsWrapper(levelBox, level);
    const max = getMaxValue(levelBox, level);

    let state = normalizeState(hidden.value, max, '1');
    hidden.value = state;
    input.value = String(max);

    dotsWrapper.innerHTML = '';

    for (let index = 0; index < max; index += 1) {
      const dot = document.createElement('button');
      const available = state[index] === '1';

      dot.type = 'button';
      dot.className = 'dnd-spell-slot-dot dnd-manual-spell-slot-dot';
      dot.dataset.spellSlotDot = String(index);
      dot.dataset.spellSlotAvailable = available ? 'true' : 'false';
      dot.classList.toggle('is-slot-current', available);
      dot.classList.toggle('is-current', available);
      dot.classList.toggle('is-used', available);
      dot.classList.toggle('is-checked', available);
      dot.classList.toggle('is-slot-lit', available);
      dot.classList.toggle('is-slot-empty', !available);
      dot.classList.toggle('is-slot-spent', !available);
      dot.classList.toggle('is-available', available);
      dot.setAttribute('aria-pressed', available ? 'true' : 'false');
      dot.setAttribute('aria-label', `${level}º nível - espaço ${index + 1}`);
      dot.title = available
        ? `${level}º nível - espaço ${index + 1} disponível`
        : `${level}º nível - espaço ${index + 1} gasto`;

      dotsWrapper.appendChild(dot);
    }

    levelBox.dataset.spellSlotMax = String(max);
    levelBox.classList.add('dnd-manual-spell-slot-level');
    levelBox.classList.toggle('has-spell-slots', max > 0);
    levelBox.classList.toggle('has-no-spell-slots', max === 0);
  }

  function migrateOldModeIfNeeded(scope = document) {
    const form = getForm(scope);
    if (!form) return;

    const mode = ensureModeField(form);
    if (!mode || mode.value === 'available-v1') return;

    getLevelBoxes(form).forEach((levelBox) => {
      const level = getSlotLevel(levelBox);
      const hidden = ensureHidden(levelBox, level);
      const max = getMaxValue(levelBox, level);
      hidden.value = '1'.repeat(max);
    });

    mode.value = 'available-v1';
  }

  function renderAll(scope = document) {
    migrateOldModeIfNeeded(scope);
    getLevelBoxes(scope).forEach(renderLevel);
  }

  function toggleDot(dot) {
    const levelBox = dot?.closest?.('.dnd-spell-slot-level');
    if (!levelBox) return;

    const level = getSlotLevel(levelBox);
    const hidden = ensureHidden(levelBox, level);
    const max = getMaxValue(levelBox, level);
    const index = clamp(dot.dataset.spellSlotDot, -1, MAX_SLOTS_PER_LEVEL);

    if (index < 0 || index >= max) return;

    const state = normalizeState(hidden.value, max, '1').split('');
    state[index] = state[index] === '1' ? '0' : '1';
    hidden.value = state.join('');

    renderLevel(levelBox);

    hidden.dispatchEvent(new Event('input', { bubbles: true }));
    hidden.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function handleMaxInput(input) {
    const levelBox = input?.closest?.('.dnd-spell-slot-level');
    if (!levelBox) return;

    const level = getSlotLevel(levelBox);
    const hidden = ensureHidden(levelBox, level);
    const max = clamp(input.value, 0, MAX_SLOTS_PER_LEVEL);
    const form = getForm(input);
    const mode = ensureModeField(form);

    input.value = String(max);
    hidden.value = '1'.repeat(max);
    if (mode) mode.value = 'available-v1';
    renderLevel(levelBox);

    hidden.dispatchEvent(new Event('input', { bubbles: true }));
    hidden.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function getLevelBoxByLevel(form, level) {
    return form?.querySelector?.(`.dnd-spell-slot-level[data-spell-slot-level="${level}"]`)
      || form?.querySelector?.(`[data-spell-slot-hidden="${level}"]`)?.closest?.('.dnd-spell-slot-level')
      || null;
  }

  function getCounts(form, level) {
    const levelBox = getLevelBoxByLevel(form, level);
    if (!levelBox) return { level, max: 0, available: 0, spent: 0 };

    const hidden = ensureHidden(levelBox, level);
    const max = getMaxValue(levelBox, level);
    const state = normalizeState(hidden.value, max, '1');
    const available = state.split('').filter((item) => item === '1').length;

    return { level, max, available, spent: Math.max(0, max - available) };
  }

  function consumeSlot(form, level) {
    const safeLevel = clamp(level, 1, 9);
    const levelBox = getLevelBoxByLevel(form, safeLevel);

    if (!levelBox) {
      alert(`Você não tem espaços configurados para magia de ${safeLevel}º nível.`);
      return false;
    }

    const hidden = ensureHidden(levelBox, safeLevel);
    const max = getMaxValue(levelBox, safeLevel);

    if (max <= 0) {
      alert(`Você não tem espaços configurados para magia de ${safeLevel}º nível.`);
      return false;
    }

    const state = normalizeState(hidden.value, max, '1').split('');

    // Consome a última bolinha disponível no visual.
    // Como as bolinhas estão em duas colunas e o grid preenche da esquerda para a direita,
    // apagar o maior índice primeiro resulta em: de baixo para cima e da direita para esquerda.
    let index = -1;
    for (let currentIndex = state.length - 1; currentIndex >= 0; currentIndex -= 1) {
      if (state[currentIndex] === '1') {
        index = currentIndex;
        break;
      }
    }

    if (index < 0) {
      alert(`Todos os espaços de ${safeLevel}º nível já foram gastos.`);
      return false;
    }

    state[index] = '0';
    hidden.value = state.join('');
    renderLevel(levelBox);
    hidden.dispatchEvent(new Event('input', { bubbles: true }));
    hidden.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function restoreAll(form = getForm(document)) {
    if (!form) return false;

    const mode = ensureModeField(form);
    if (mode) mode.value = 'available-v1';

    getLevelBoxes(form).forEach((levelBox) => {
      const level = getSlotLevel(levelBox);
      const hidden = ensureHidden(levelBox, level);
      const max = getMaxValue(levelBox, level);
      hidden.value = '1'.repeat(max);
      renderLevel(levelBox);
      hidden.dispatchEvent(new Event('input', { bubbles: true }));
      hidden.dispatchEvent(new Event('change', { bubbles: true }));
    });

    return true;
  }

  function installEvents() {
    if (window.__campaignLabManualSpellSlotsEventsReady) return;
    window.__campaignLabManualSpellSlotsEventsReady = true;

    document.addEventListener('click', (event) => {
      const dot = event.target?.closest?.('.dnd-spell-slot-dot');
      if (!dot || !dot.closest('.dnd-spell-slot-level')) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      toggleDot(dot);
    }, true);

    document.addEventListener('keydown', (event) => {
      const dot = event.target?.closest?.('.dnd-spell-slot-dot');
      if (!dot || !dot.closest('.dnd-spell-slot-level')) return;
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      toggleDot(dot);
    }, true);

    document.addEventListener('input', (event) => {
      const input = event.target?.closest?.('.dnd-spell-slot-max-input');
      if (!input) return;

      handleMaxInput(input);
    }, true);

    document.addEventListener('change', (event) => {
      const input = event.target?.closest?.('.dnd-spell-slot-max-input');
      if (!input) return;

      handleMaxInput(input);
    }, true);
  }

  function installFunctionOverrides() {
    window.campaignLabRenderManualSpellSlots = renderAll;
    window.campaignLabRestoreAllManualSpellSlots = restoreAll;
    window.campaignLabUseManualSpellSlot = consumeSlot;
    window.campaignLabGetManualSpellSlotCounts = getCounts;
    window.syncDndSpellSlotLevel = renderLevel;
    window.syncAllDndSpellSlotTrackers = renderAll;
    window.setupDndSpellSlotTrackers = renderAll;
    window.toggleDndSpellSlotDot = function manualToggleDndSpellSlotDot(levelBox, dot) {
      toggleDot(dot || levelBox?.querySelector?.('.dnd-spell-slot-dot'));
    };

    try { syncDndSpellSlotLevel = renderLevel; } catch (error) {}
    try { syncAllDndSpellSlotTrackers = renderAll; } catch (error) {}
    try { setupDndSpellSlotTrackers = renderAll; } catch (error) {}
    try { toggleDndSpellSlotDot = window.toggleDndSpellSlotDot; } catch (error) {}
  }

  function wrapLoadFunction() {
    if (typeof loadDndSheetIntoPlayerForm !== 'function') return;
    if (loadDndSheetIntoPlayerForm.__manualSpellSlotsWrapped) return;

    const originalLoad = loadDndSheetIntoPlayerForm;
    const wrappedLoad = async function wrappedLoadDndSheetIntoPlayerFormManualSlots() {
      const result = await originalLoad.apply(this, arguments);
      renderAll(document);
      return result;
    };

    wrappedLoad.__manualSpellSlotsWrapped = true;

    try { loadDndSheetIntoPlayerForm = wrappedLoad; } catch (error) {}
    window.loadDndSheetIntoPlayerForm = wrappedLoad;
  }

  function boot() {
    installFunctionOverrides();
    installEvents();
    wrapLoadFunction();
    renderAll(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.setTimeout(boot, 100);
  window.setTimeout(boot, 600);
  window.setTimeout(boot, 1200);
})();

/* =========================================================
   CORREÇÃO JS FINAL - ESPAÇOS DE MAGIA
   Remove o wrapper premium .number-control apenas dos inputs de
   quantidade dos espaços de magia, caso algum script antigo tenha
   embrulhado esses campos.
   Cole este bloco no FINAL do script.js.
========================================================= */
(function () {
  function unwrapSpellSlotNumberInputs() {
    document.querySelectorAll(".dnd-spell-slot-max-input").forEach((input) => {
      input.dataset.noNumberControl = "true";
      input.dataset.numberControlReady = "true";

      const wrapper = input.closest(".number-control, .dnd-number-control");
      const top = input.closest(".dnd-spell-slot-top");

      if (!wrapper || !top || wrapper.parentElement !== top) return;

      top.insertBefore(input, wrapper);
      wrapper.remove();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      unwrapSpellSlotNumberInputs();
      setTimeout(unwrapSpellSlotNumberInputs, 300);
      setTimeout(unwrapSpellSlotNumberInputs, 900);
    });
  } else {
    unwrapSpellSlotNumberInputs();
    setTimeout(unwrapSpellSlotNumberInputs, 300);
    setTimeout(unwrapSpellSlotNumberInputs, 900);
  }
})();


/* =========================================================
   D&D - GRIMÓRIO DE MAGIAS EM CARDS
   Salva tudo no campo oculto dndSpellbook como JSON.
========================================================= */
(function () {
  const LEVEL_LABELS = {
    0: "Truque",
    1: "1º",
    2: "2º",
    3: "3º",
    4: "4º",
    5: "5º",
    6: "6º",
    7: "7º",
    8: "8º",
    9: "9º",
  };

  const SPELLBOOK_EMPTY = "[]";

  function html(value = "") {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function uid() {
    return `spell-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function getDndSpellbookForms() {
    return Array.from(document.querySelectorAll("#dndPlayerSheetForm, #dndForm")).filter(Boolean);
  }

  function getSpellbookSectionHtml() {
    return `
      <input type="hidden" name="dndSpellbook" value="[]" />
      <section class="dnd-grimoire" data-dnd-grimoire>
        <div class="dnd-grimoire-hero">
          <div>
            <p class="tag">Grimório</p>
            <h3>Livro de magias</h3>
            <span>Cadastre suas magias em cards completos, filtre por círculo e use durante a sessão.</span>
          </div>
          <div class="dnd-grimoire-counters">
            <article><strong data-dnd-spell-count-total>0</strong><span>Total</span></article>
            <article><strong data-dnd-spell-count-prepared>0</strong><span>Preparadas</span></article>
            <article><strong data-dnd-spell-count-favorite>0</strong><span>Favoritas</span></article>
          </div>
        </div>

        <div class="dnd-grimoire-toolbar">
          <label class="dnd-grimoire-search"><span>Buscar magia</span><input type="search" data-dnd-spell-search placeholder="Ex: Bola de Fogo" autocomplete="off" /></label>
          <label><span>Círculo</span><select data-dnd-spell-level-filter><option value="all">Todos</option><option value="0">Truques</option><option value="1">1º nível</option><option value="2">2º nível</option><option value="3">3º nível</option><option value="4">4º nível</option><option value="5">5º nível</option><option value="6">6º nível</option><option value="7">7º nível</option><option value="8">8º nível</option><option value="9">9º nível</option></select></label>
          <button type="button" class="dnd-grimoire-filter" data-dnd-spell-filter-prepared="false">Preparadas</button>
          <button type="button" class="dnd-grimoire-filter" data-dnd-spell-filter-favorite="false">Favoritas</button>
          <button type="button" class="dnd-grimoire-add" data-dnd-spell-action="add">+ Adicionar magia</button>
        </div>

        <div class="dnd-grimoire-editor" data-dnd-grimoire-editor hidden>
          <div class="dnd-grimoire-editor-head"><div><span data-dnd-spell-editor-kicker>Nova magia</span><strong data-dnd-spell-editor-title>Adicionar ao grimório</strong></div><button type="button" data-dnd-spell-action="cancel-edit">×</button></div>
          <input type="hidden" data-dnd-spell-field="id" />
          <div class="dnd-grimoire-editor-grid">
            <label><span>Nome da magia</span><input type="text" data-dnd-spell-field="name" placeholder="Mísseis Mágicos" /></label>
            <label><span>Círculo</span><select data-dnd-spell-field="level"><option value="0">Truque</option><option value="1">1º nível</option><option value="2">2º nível</option><option value="3">3º nível</option><option value="4">4º nível</option><option value="5">5º nível</option><option value="6">6º nível</option><option value="7">7º nível</option><option value="8">8º nível</option><option value="9">9º nível</option></select></label>
            <label><span>Escola</span><input type="text" data-dnd-spell-field="school" placeholder="Evocação" /></label>
            <label><span>Tipo</span><select data-dnd-spell-field="type"><option value="">Escolha</option><option>Dano</option><option>Cura</option><option>Controle</option><option>Defesa</option><option>Utilidade</option><option>Movimento</option><option>Invocação</option><option>Social</option><option>Exploração</option></select></label>
            <label><span>Tempo de conjuração</span><input type="text" data-dnd-spell-field="castingTime" placeholder="1 ação" /></label>
            <label><span>Alcance</span><input type="text" data-dnd-spell-field="range" placeholder="36 m" /></label>
            <label><span>Componentes</span><input type="text" data-dnd-spell-field="components" placeholder="V, S, M" /></label>
            <label><span>Material</span><input type="text" data-dnd-spell-field="material" placeholder="Opcional" /></label>
            <label><span>Duração</span><input type="text" data-dnd-spell-field="duration" placeholder="Instantânea" /></label>
            <label><span>Teste / ataque</span><input type="text" data-dnd-spell-field="saveAttack" placeholder="Ataque mágico / Resistência DES" /></label>
            <label><span>Dano / cura</span><input type="text" data-dnd-spell-field="damage" placeholder="3d6 fogo" /></label>
            <div class="dnd-grimoire-switches"><label><input type="checkbox" data-dnd-spell-field="prepared" /> Preparada</label><label><input type="checkbox" data-dnd-spell-field="favorite" /> Favorita</label><label><input type="checkbox" data-dnd-spell-field="concentration" /> Concentração</label><label><input type="checkbox" data-dnd-spell-field="ritual" /> Ritual</label></div>
            <label class="dnd-grimoire-wide"><span>Descrição</span><textarea data-dnd-spell-field="description" rows="5" placeholder="Explique o efeito principal da magia."></textarea></label>
            <label class="dnd-grimoire-wide"><span>Em níveis superiores</span><textarea data-dnd-spell-field="higherLevels" rows="3" placeholder="Como a magia melhora quando usa círculo maior."></textarea></label>
            <label class="dnd-grimoire-wide"><span>Observações</span><textarea data-dnd-spell-field="notes" rows="3" placeholder="Combos, decisões do mestre, detalhes da campanha."></textarea></label>
          </div>
          <div class="dnd-grimoire-editor-actions"><button type="button" data-dnd-spell-action="cancel-edit">Cancelar</button><button type="button" class="dnd-grimoire-save" data-dnd-spell-action="save-spell">Salvar magia</button></div>
        </div>

        <div class="dnd-grimoire-empty" data-dnd-spell-empty>
          <strong>Nenhuma magia cadastrada ainda.</strong>
          <span>Clique em “Adicionar magia” para montar o grimório do personagem.</span>
        </div>
        <div class="dnd-grimoire-list" data-dnd-spell-list></div>
      </section>
    `;
  }

  function ensureHidden(form) {
    let hidden = form.querySelector('input[name="dndSpellbook"]');
    if (!hidden) {
      hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "dndSpellbook";
      hidden.value = SPELLBOOK_EMPTY;
      form.prepend(hidden);
    }
    if (!String(hidden.value || "").trim()) hidden.value = SPELLBOOK_EMPTY;
    return hidden;
  }

  function ensureSection(form) {
    ensureHidden(form);
    let section = form.querySelector("[data-dnd-grimoire]");
    if (section) return section;

    const slots = form.querySelector(".dnd-spell-slots");
    if (!slots) return null;

    slots.insertAdjacentHTML("afterend", getSpellbookSectionHtml());
    section = form.querySelector("[data-dnd-grimoire]");

    const duplicatedHidden = section?.previousElementSibling?.matches?.('input[name="dndSpellbook"]')
      ? section.previousElementSibling
      : null;
    if (duplicatedHidden && duplicatedHidden !== form.querySelector('input[name="dndSpellbook"]')) duplicatedHidden.remove();

    return section;
  }

  function readSpells(form) {
    const hidden = ensureHidden(form);
    try {
      const parsed = JSON.parse(hidden.value || SPELLBOOK_EMPTY);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch (error) {
      hidden.value = SPELLBOOK_EMPTY;
      return [];
    }
  }

  function writeSpells(form, spells, triggerSave = true) {
    const hidden = ensureHidden(form);
    hidden.value = JSON.stringify(spells || []);
    renderSpellbook(form);

    if (triggerSave) {
      hidden.dispatchEvent(new Event("input", { bubbles: true }));
      hidden.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function getField(section, field) {
    return section.querySelector(`[data-dnd-spell-field="${field}"]`);
  }

  function setField(section, field, value) {
    const el = getField(section, field);
    if (!el) return;
    if (el.type === "checkbox") el.checked = Boolean(value);
    else el.value = value ?? "";
  }

  function getEditorData(section) {
    const level = Math.max(0, Math.min(9, Number(getField(section, "level")?.value || 0)));
    return {
      id: getField(section, "id")?.value || uid(),
      name: getField(section, "name")?.value?.trim() || "Magia sem nome",
      level,
      school: getField(section, "school")?.value?.trim() || "",
      type: getField(section, "type")?.value?.trim() || "",
      castingTime: getField(section, "castingTime")?.value?.trim() || "",
      range: getField(section, "range")?.value?.trim() || "",
      components: getField(section, "components")?.value?.trim() || "",
      material: getField(section, "material")?.value?.trim() || "",
      duration: getField(section, "duration")?.value?.trim() || "",
      saveAttack: getField(section, "saveAttack")?.value?.trim() || "",
      damage: getField(section, "damage")?.value?.trim() || "",
      description: getField(section, "description")?.value?.trim() || "",
      higherLevels: getField(section, "higherLevels")?.value?.trim() || "",
      notes: getField(section, "notes")?.value?.trim() || "",
      prepared: Boolean(getField(section, "prepared")?.checked),
      favorite: Boolean(getField(section, "favorite")?.checked),
      concentration: Boolean(getField(section, "concentration")?.checked),
      ritual: Boolean(getField(section, "ritual")?.checked),
      updatedAt: new Date().toISOString(),
    };
  }

  function clearEditor(section) {
    section.querySelectorAll("[data-dnd-spell-field]").forEach((field) => {
      if (field.type === "checkbox") field.checked = false;
      else field.value = "";
    });
    setField(section, "level", "0");
  }

  function openEditor(form, spell = null) {
    const section = ensureSection(form);
    if (!section) return;
    const editor = section.querySelector("[data-dnd-grimoire-editor]");
    if (!editor) return;

    clearEditor(section);
    if (spell) {
      Object.entries(spell).forEach(([key, value]) => setField(section, key, value));
      section.querySelector("[data-dnd-spell-editor-kicker]").textContent = "Editar magia";
      section.querySelector("[data-dnd-spell-editor-title]").textContent = spell.name || "Editar magia";
    } else {
      section.querySelector("[data-dnd-spell-editor-kicker]").textContent = "Nova magia";
      section.querySelector("[data-dnd-spell-editor-title]").textContent = "Adicionar ao grimório";
    }

    editor.hidden = false;
    editor.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function closeEditor(form) {
    const section = ensureSection(form);
    const editor = section?.querySelector("[data-dnd-grimoire-editor]");
    if (editor) editor.hidden = true;
  }

  function levelLabel(level) {
    const number = Number(level) || 0;
    return LEVEL_LABELS[number] || `${number}º`;
  }

  function metaLine(label, value) {
    return value ? `<span><b>${html(label)}:</b>&nbsp;${html(value)}</span>` : "";
  }

  function tagsFor(spell) {
    const tags = [];
    if (spell.prepared) tags.push(`<span class="dnd-spell-tag dnd-spell-tag--prepared">Preparada</span>`);
    if (spell.favorite) tags.push(`<span class="dnd-spell-tag dnd-spell-tag--favorite">Favorita</span>`);
    if (spell.concentration) tags.push(`<span class="dnd-spell-tag">Concentração</span>`);
    if (spell.ritual) tags.push(`<span class="dnd-spell-tag">Ritual</span>`);
    if (spell.type) tags.push(`<span class="dnd-spell-tag">${html(spell.type)}</span>`);
    if (!tags.length) tags.push(`<span class="dnd-spell-tag">Sem marcações</span>`);
    return tags.join("");
  }

  function spellCard(spell, index, expandedIds) {
    const expanded = expandedIds.has(spell.id);
    const level = Number(spell.level) || 0;
    const canUseSlot = level > 0;

    return `
      <article class="dnd-spell-card ${spell.favorite ? "is-favorite" : ""} ${expanded ? "is-expanded" : ""}" data-dnd-spell-id="${html(spell.id)}" data-dnd-spell-index="${index}">
        <div class="dnd-spell-card__top">
          <div>
            <h4>${html(spell.name || "Magia sem nome")}</h4>
            <div class="dnd-spell-card__school">${html(spell.school || "Escola não definida")}</div>
          </div>
          <div class="dnd-spell-card__level">${html(levelLabel(level))}</div>
        </div>
        <div class="dnd-spell-card__meta">
          ${metaLine("Conjuração", spell.castingTime)}
          ${metaLine("Alcance", spell.range)}
          ${metaLine("Componentes", spell.components)}
          ${metaLine("Duração", spell.duration)}
          ${metaLine("Teste", spell.saveAttack)}
          ${metaLine("Dano/Cura", spell.damage)}
        </div>
        <div class="dnd-spell-card__tags">${tagsFor(spell)}</div>
        <div class="dnd-spell-card__actions">
          <button type="button" data-dnd-spell-action="toggle-details">Ver detalhes</button>
          <button type="button" data-dnd-spell-action="toggle-prepared">${spell.prepared ? "Despreparar" : "Preparar"}</button>
          <button type="button" data-dnd-spell-action="toggle-favorite">${spell.favorite ? "★ Favorita" : "☆ Favoritar"}</button>
          ${canUseSlot ? `<button type="button" data-dnd-spell-action="use-spell">Usar magia</button>` : ""}
          <button type="button" data-dnd-spell-action="edit-spell">Editar</button>
          <button type="button" class="dnd-spell-danger" data-dnd-spell-action="delete-spell">Remover</button>
        </div>
        <div class="dnd-spell-card__details">
          ${spell.material ? `<div><strong>Material</strong><p>${html(spell.material)}</p></div>` : ""}
          ${spell.description ? `<div><strong>Descrição</strong><p>${html(spell.description).replace(/\n/g, "<br>")}</p></div>` : ""}
          ${spell.higherLevels ? `<div><strong>Em níveis superiores</strong><p>${html(spell.higherLevels).replace(/\n/g, "<br>")}</p></div>` : ""}
          ${spell.notes ? `<div><strong>Observações</strong><p>${html(spell.notes).replace(/\n/g, "<br>")}</p></div>` : ""}
        </div>
      </article>
    `;
  }

  function getExpandedIds(section) {
    const raw = section?.dataset?.expandedSpellIds || "";
    return new Set(raw.split(",").filter(Boolean));
  }

  function setExpandedIds(section, set) {
    section.dataset.expandedSpellIds = Array.from(set).join(",");
  }

  function filteredSpells(section, spells) {
    const search = String(section.querySelector("[data-dnd-spell-search]")?.value || "").trim().toLowerCase();
    const level = section.querySelector("[data-dnd-spell-level-filter]")?.value || "all";
    const onlyPrepared = section.querySelector("[data-dnd-spell-filter-prepared]")?.dataset.dndSpellFilterPrepared === "true";
    const onlyFavorite = section.querySelector("[data-dnd-spell-filter-favorite]")?.dataset.dndSpellFilterFavorite === "true";

    return spells.filter((spell) => {
      const text = [spell.name, spell.school, spell.type, spell.description, spell.notes].join(" ").toLowerCase();
      if (search && !text.includes(search)) return false;
      if (level !== "all" && String(spell.level ?? 0) !== level) return false;
      if (onlyPrepared && !spell.prepared) return false;
      if (onlyFavorite && !spell.favorite) return false;
      return true;
    });
  }

  function updateCounters(section, spells) {
    const total = spells.length;
    const prepared = spells.filter((spell) => spell.prepared).length;
    const favorite = spells.filter((spell) => spell.favorite).length;
    const setTextSafe = (selector, value) => {
      const el = section.querySelector(selector);
      if (el) el.textContent = String(value);
    };
    setTextSafe("[data-dnd-spell-count-total]", total);
    setTextSafe("[data-dnd-spell-count-prepared]", prepared);
    setTextSafe("[data-dnd-spell-count-favorite]", favorite);
  }

  function renderSpellbook(form) {
    const section = ensureSection(form);
    if (!section) return;

    const spells = readSpells(form);
    updateCounters(section, spells);

    const list = section.querySelector("[data-dnd-spell-list]");
    const empty = section.querySelector("[data-dnd-spell-empty]");
    const expandedIds = getExpandedIds(section);
    const filtered = filteredSpells(section, spells);

    section.querySelectorAll("[data-dnd-spell-filter-prepared], [data-dnd-spell-filter-favorite]").forEach((button) => {
      const active = button.dataset.dndSpellFilterPrepared === "true" || button.dataset.dndSpellFilterFavorite === "true";
      button.classList.toggle("is-active", active);
    });

    if (!list || !empty) return;

    empty.hidden = spells.length > 0;
    list.innerHTML = filtered.length
      ? filtered.map((spell) => spellCard(spell, spells.indexOf(spell), expandedIds)).join("")
      : spells.length
        ? `<div class="dnd-grimoire-empty"><strong>Nenhuma magia encontrada.</strong><span>Ajuste os filtros ou a busca.</span></div>`
        : "";
  }

  function saveEditor(form) {
    const section = ensureSection(form);
    if (!section) return;

    const spell = getEditorData(section);
    const spells = readSpells(form);
    const index = spells.findIndex((item) => item.id === spell.id);

    if (index >= 0) spells[index] = { ...spells[index], ...spell };
    else spells.push({ ...spell, createdAt: new Date().toISOString() });

    spells.sort((a, b) => Number(a.level || 0) - Number(b.level || 0) || String(a.name || "").localeCompare(String(b.name || "")));
    closeEditor(form);
    writeSpells(form, spells, true);
  }

  function getSlotUseOptions(form, minimumLevel) {
    const min = Math.max(1, Math.min(9, Number(minimumLevel) || 1));
    const options = [];

    for (let level = min; level <= 9; level += 1) {
      const counts = typeof window.campaignLabGetManualSpellSlotCounts === "function"
        ? window.campaignLabGetManualSpellSlotCounts(form, level)
        : { level, max: 0, available: 0, spent: 0 };

      options.push({
        level,
        max: Number(counts.max || 0),
        available: Number(counts.available || 0),
        spent: Number(counts.spent || 0),
      });
    }

    return options;
  }

  function ensureCastSlotModal(form) {
    let modal = form.querySelector("[data-dnd-cast-slot-modal]");

    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "dnd-cast-slot-modal";
    modal.setAttribute("data-dnd-cast-slot-modal", "true");
    modal.hidden = true;
    modal.innerHTML = `
      <div class="dnd-cast-slot-modal__box">
        <div class="dnd-cast-slot-modal__head">
          <div>
            <span>Usar magia</span>
            <strong data-dnd-cast-spell-name>Magia</strong>
          </div>
          <button type="button" data-dnd-cast-close aria-label="Fechar">×</button>
        </div>

        <p data-dnd-cast-help>Escolha qual círculo será gasto. O sistema apagará uma bolinha disponível desse nível.</p>

        <label class="dnd-cast-slot-modal__field">
          <span>Círculo usado</span>
          <select data-dnd-cast-level></select>
        </label>

        <div class="dnd-cast-slot-modal__status" data-dnd-cast-status></div>

        <div class="dnd-cast-slot-modal__actions">
          <button type="button" data-dnd-cast-close>Cancelar</button>
          <button type="button" class="dnd-cast-slot-modal__confirm" data-dnd-cast-confirm>Gastar espaço</button>
        </div>
      </div>
    `;

    form.appendChild(modal);
    return modal;
  }

  function openCastSlotModal(form, spell) {
    const baseLevel = Number(spell.level || 0);

    if (baseLevel <= 0) {
      alert("Truques não gastam espaço de magia.");
      return;
    }

    const modal = ensureCastSlotModal(form);
    const select = modal.querySelector("[data-dnd-cast-level]");
    const status = modal.querySelector("[data-dnd-cast-status]");
    const name = modal.querySelector("[data-dnd-cast-spell-name]");
    const confirm = modal.querySelector("[data-dnd-cast-confirm]");
    const closeButtons = modal.querySelectorAll("[data-dnd-cast-close]");
    const options = getSlotUseOptions(form, baseLevel);

    if (name) name.textContent = spell.name || "Magia sem nome";

    if (select) {
      select.innerHTML = options.map((item) => `
        <option value="${item.level}" ${item.available <= 0 ? "data-empty='true'" : ""}>
          ${levelLabel(item.level)} círculo · ${item.available}/${item.max} disponíveis
        </option>
      `).join("");
      select.value = String(baseLevel);
    }

    const refreshStatus = () => {
      const selected = Number(select?.value || baseLevel);
      const found = options.find((item) => item.level === selected);
      if (!status || !found) return;

      status.textContent = found.max <= 0
        ? `Nenhum espaço de ${levelLabel(selected)} configurado.`
        : `${found.available} de ${found.max} espaços de ${levelLabel(selected)} disponíveis.`;

      status.classList.toggle("is-empty", !found || found.available <= 0);
    };

    refreshStatus();

    if (select) select.onchange = refreshStatus;

    closeButtons.forEach((button) => {
      button.onclick = () => {
        modal.hidden = true;
      };
    });

    if (confirm) {
      confirm.onclick = () => {
        const selected = Number(select?.value || baseLevel);
        const consumed = typeof window.campaignLabUseManualSpellSlot === "function"
          ? window.campaignLabUseManualSpellSlot(form, selected)
          : false;

        if (!consumed) {
          refreshStatus();
          return;
        }

        modal.hidden = true;
      };
    }

    modal.hidden = false;
    modal.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function detailBlock(label, value) {
    const safeValue = String(value || "").trim();
    if (!safeValue) return "";

    return `
      <article class="dnd-spell-details-modal__block">
        <span>${html(label)}</span>
        <p>${html(safeValue).replace(/\n/g, "<br>")}</p>
      </article>
    `;
  }

  function modalMeta(label, value) {
    const safeValue = String(value || "").trim();
    if (!safeValue) return "";

    return `
      <div class="dnd-spell-details-modal__meta-item">
        <span>${html(label)}</span>
        <strong>${html(safeValue)}</strong>
      </div>
    `;
  }

  function ensureSpellDetailsModal() {
    let modal = document.querySelector("[data-dnd-spell-details-modal]");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "dnd-spell-details-modal";
    modal.setAttribute("data-dnd-spell-details-modal", "true");
    modal.hidden = true;
    modal.innerHTML = `
      <div class="dnd-spell-details-modal__box" role="dialog" aria-modal="true" aria-labelledby="dndSpellDetailsTitle">
        <button type="button" class="dnd-spell-details-modal__close" data-dnd-spell-details-close aria-label="Fechar detalhes da magia">×</button>

        <div class="dnd-spell-details-modal__head">
          <div>
            <span data-dnd-spell-details-kicker>Detalhes da magia</span>
            <h3 id="dndSpellDetailsTitle" data-dnd-spell-details-title>Magia</h3>
            <p data-dnd-spell-details-subtitle>Escola e tipo</p>
          </div>
          <strong data-dnd-spell-details-level>1º</strong>
        </div>

        <div class="dnd-spell-details-modal__tags" data-dnd-spell-details-tags></div>
        <div class="dnd-spell-details-modal__meta" data-dnd-spell-details-meta></div>
        <div class="dnd-spell-details-modal__content" data-dnd-spell-details-content></div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest("[data-dnd-spell-details-close]")) {
        closeSpellDetailsModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) {
        closeSpellDetailsModal();
      }
    });

    return modal;
  }

  function closeSpellDetailsModal() {
    const modal = document.querySelector("[data-dnd-spell-details-modal]");
    if (modal) modal.hidden = true;
  }

  function openSpellDetailsModal(form, spell) {
    if (!spell) return;

    const modal = ensureSpellDetailsModal();
    const title = modal.querySelector("[data-dnd-spell-details-title]");
    const subtitle = modal.querySelector("[data-dnd-spell-details-subtitle]");
    const level = modal.querySelector("[data-dnd-spell-details-level]");
    const tags = modal.querySelector("[data-dnd-spell-details-tags]");
    const meta = modal.querySelector("[data-dnd-spell-details-meta]");
    const content = modal.querySelector("[data-dnd-spell-details-content]");

    const spellLevel = Number(spell.level || 0);
    const spellSchool = spell.school || "Escola não definida";
    const spellType = spell.type || "Tipo não definido";

    if (title) title.textContent = spell.name || "Magia sem nome";
    if (subtitle) subtitle.textContent = `${spellSchool} • ${spellType}`;
    if (level) level.textContent = levelLabel(spellLevel);
    if (tags) tags.innerHTML = tagsFor(spell);

    if (meta) {
      meta.innerHTML = [
        modalMeta("Conjuração", spell.castingTime),
        modalMeta("Alcance", spell.range),
        modalMeta("Componentes", spell.components),
        modalMeta("Duração", spell.duration),
        modalMeta("Teste / ataque", spell.saveAttack),
        modalMeta("Dano / cura", spell.damage),
      ].join("");
    }

    if (content) {
      content.innerHTML = [
        detailBlock("Material", spell.material),
        detailBlock("Descrição", spell.description || "Sem descrição cadastrada."),
        detailBlock("Em níveis superiores", spell.higherLevels),
        detailBlock("Observações", spell.notes),
      ].join("");
    }

    modal.hidden = false;

    const closeButton = modal.querySelector("[data-dnd-spell-details-close]");
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function useSpellSlot(form, spell) {
    openCastSlotModal(form, spell);
  }

  function handleAction(event) {
    const actionButton = event.target.closest("[data-dnd-spell-action]");
    const section = event.target.closest("[data-dnd-grimoire]");
    const form = event.target.closest("form");

    if (!section || !form) return;

    const action = actionButton?.dataset?.dndSpellAction;

    if (!action && (event.target.matches("[data-dnd-spell-search]") || event.target.matches("[data-dnd-spell-level-filter]"))) {
      renderSpellbook(form);
      return;
    }

    if (!actionButton) return;

    event.preventDefault();
    event.stopPropagation();

    const spells = readSpells(form);
    const card = actionButton.closest("[data-dnd-spell-id]");
    const spellId = card?.dataset?.dndSpellId || "";
    const index = spells.findIndex((spell) => spell.id === spellId);
    const spell = index >= 0 ? spells[index] : null;

    if (action === "add") return openEditor(form);
    if (action === "cancel-edit") return closeEditor(form);
    if (action === "save-spell") return saveEditor(form);

    if (!spell) return;

    if (action === "edit-spell") return openEditor(form, spell);

    if (action === "delete-spell") {
      if (!confirm(`Remover a magia "${spell.name}" do grimório?`)) return;
      spells.splice(index, 1);
      return writeSpells(form, spells, true);
    }

    if (action === "toggle-prepared") {
      spell.prepared = !spell.prepared;
      return writeSpells(form, spells, true);
    }

    if (action === "toggle-favorite") {
      spell.favorite = !spell.favorite;
      return writeSpells(form, spells, true);
    }

    if (action === "toggle-details") {
      return openSpellDetailsModal(form, spell);
    }

    if (action === "use-spell") return useSpellSlot(form, spell);
  }

  function setupSpellbook(form) {
    if (!form) return;
    const section = ensureSection(form);
    if (!section) return;

    if (!section.dataset.dndGrimoireReady) {
      section.dataset.dndGrimoireReady = "true";

      section.addEventListener("click", handleAction);
      section.addEventListener("input", (event) => {
        if (event.target.matches("[data-dnd-spell-search], [data-dnd-spell-level-filter]")) {
          renderSpellbook(form);
        }
      });
      section.addEventListener("change", (event) => {
        if (event.target.matches("[data-dnd-spell-level-filter]")) {
          renderSpellbook(form);
        }
      });
    }

    renderSpellbook(form);
  }

  function bootSpellbooks() {
    getDndSpellbookForms().forEach(setupSpellbook);
  }

  const originalLoadDndSheet = window.loadDndSheetIntoPlayerForm;
  if (typeof originalLoadDndSheet === "function" && !originalLoadDndSheet.__dndSpellbookWrapped) {
    const wrappedLoad = async function wrappedLoadDndSheetWithSpellbook() {
      const result = await originalLoadDndSheet.apply(this, arguments);
      bootSpellbooks();
      return result;
    };
    wrappedLoad.__dndSpellbookWrapped = true;
    window.loadDndSheetIntoPlayerForm = wrappedLoad;
    try { loadDndSheetIntoPlayerForm = wrappedLoad; } catch (error) {}
  }

  const originalOpenDndMasterSheetModal = window.openDndMasterSheetModal || (typeof openDndMasterSheetModal === "function" ? openDndMasterSheetModal : null);
  if (typeof originalOpenDndMasterSheetModal === "function" && !originalOpenDndMasterSheetModal.__dndSpellbookWrapped) {
    const wrappedOpenDndMasterSheetModal = async function wrappedOpenDndMasterSheetModalWithSpellbook() {
      const result = await originalOpenDndMasterSheetModal.apply(this, arguments);
      bootSpellbooks();
      return result;
    };
    wrappedOpenDndMasterSheetModal.__dndSpellbookWrapped = true;
    window.openDndMasterSheetModal = wrappedOpenDndMasterSheetModal;
    try { openDndMasterSheetModal = wrappedOpenDndMasterSheetModal; } catch (error) {}
  }

  function start() {
    bootSpellbooks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  window.setTimeout(bootSpellbooks, 400);
  window.setTimeout(bootSpellbooks, 1200);
  window.setTimeout(bootSpellbooks, 2200);
})();
/* =========================================================
   PATCH - CORREÇÃO DO BOTÃO DESCANSO LONGO NA ABA DESCANSAR
   - O botão funciona mesmo estando fora da antiga área de Combate.
   - Restaura espaços de magia mesmo se PV máximo estiver vazio/0.
   - Acende todas as bolinhas de espaços de magia.
   - Evita conflito com listeners antigos do botão.
   Cole este bloco NO FINAL do script.js.
========================================================= */
(function campaignLabFixDndLongRestButton() {
  let running = false;

  function getForm() {
    return document.getElementById('dndPlayerSheetForm');
  }

  function numberValue(value) {
    const parsed = Number(String(value ?? '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function setResult(message, type = 'success') {
    if (typeof setDndRestResult === 'function') {
      setDndRestResult(message, type);
      return;
    }

    const result = document.getElementById('dndRestResult');
    if (!result) return;

    result.textContent = message;
    result.classList.remove('success', 'warning', 'error');
    result.classList.add(type);
  }

  function restoreAllSpellSlotDots(form) {
    if (!form) return false;

    let restoredAny = false;

    form.querySelectorAll('.dnd-spell-slot-level').forEach((levelBox) => {
      const level = Number(levelBox.dataset.spellSlotLevel || levelBox.querySelector('[data-spell-slot-hidden]')?.dataset.spellSlotHidden || 0);
      const hidden = levelBox.querySelector(`[data-spell-slot-hidden="${level}"]`) || levelBox.querySelector('[data-spell-slot-hidden]');
      const input = levelBox.querySelector('.dnd-spell-slot-max-input');

      if (!hidden) return;

      const savedLength = String(hidden.value || '').replace(/[^01]/g, '').length;
      const max = Math.max(0, Math.min(12, Math.floor(numberValue(input?.value || levelBox.dataset.spellSlotMax || savedLength || 0))));

      if (input) input.value = String(max);
      hidden.value = '1'.repeat(max);
      restoredAny = restoredAny || max > 0;
    });

    if (typeof window.campaignLabRenderManualSpellSlots === 'function') {
      window.campaignLabRenderManualSpellSlots(form);
    } else if (typeof syncAllDndSpellSlotTrackers === 'function') {
      syncAllDndSpellSlotTrackers(form);
    }

    return restoredAny;
  }

  function recoverHitDice(form) {
    try {
      if (typeof getDndHitDiceState !== 'function' || typeof formatDndHitDiceValue !== 'function') return '';

      const diceState = getDndHitDiceState(form);
      const recoverAmount = Math.max(1, Math.floor((diceState.totalTotal || 0) / 2));
      const nextRemaining = Math.min(diceState.totalTotal || 0, (diceState.remainingTotal || 0) + recoverAmount);

      if (form.elements.hitDiceRemaining && diceState.totalTotal > 0) {
        form.elements.hitDiceRemaining.value = formatDndHitDiceValue(nextRemaining, diceState.primarySides || 8);
        return form.elements.hitDiceRemaining.value;
      }
    } catch (error) {
      console.warn('Não foi possível recuperar Dados de Vida no descanso longo:', error);
    }

    return form.elements.hitDiceRemaining?.value || '--';
  }

  async function applyLongRestFromTab(button = null) {
    if (running) return;

    const form = getForm();
    if (!form) return;

    running = true;
    if (button) button.disabled = true;

    try {
      const maxHp = numberValue(form.elements.hpMax?.value);
      const restoredSlots = restoreAllSpellSlotDots(form);

      if (maxHp > 0 && form.elements.hpCurrent) {
        form.elements.hpCurrent.value = String(maxHp);
      }

      if (form.elements.hpTemp) form.elements.hpTemp.value = '0';
      if (form.elements.deathSuccesses) form.elements.deathSuccesses.value = '';
      if (form.elements.deathFailures) form.elements.deathFailures.value = '';

      const hitDiceText = recoverHitDice(form);

      if (typeof updateDndAutoNumbers === 'function') updateDndAutoNumbers();
      if (typeof updateDndRestPreview === 'function') updateDndRestPreview();
      if (typeof saveDndPlayerSheet === 'function') await saveDndPlayerSheet(false);

      const hpText = maxHp > 0
        ? `PV voltou para ${maxHp}`
        : 'PV máximo não preenchido, então só PV temporário, Dados de Vida e espaços de magia foram atualizados';

      setResult(
        `Descanso longo aplicado. ${hpText}. PV temporário zerado. Dados de Vida: ${hitDiceText}. ${restoredSlots ? 'Todos os espaços de magia foram restaurados.' : 'Nenhum espaço de magia configurado para restaurar.'}`,
        'success'
      );
    } catch (error) {
      console.error('Erro ao aplicar descanso longo:', error);
      setResult('Erro ao aplicar descanso longo. Veja o console para detalhes.', 'error');
    } finally {
      running = false;
      if (button) button.disabled = false;
    }
  }

  document.addEventListener('click', (event) => {
    const button = event.target?.closest?.('#applyDndLongRest');
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    applyLongRestFromTab(button);
  }, true);

  window.campaignLabApplyDndLongRestFromTab = applyLongRestFromTab;
})();


/* =========================================================
   D&D - BOTÃO APLICAR NO LUGAR DO BAIXAR JSON
   - Remove a função visual do Baixar JSON.
   - O botão Aplicar acende quando a ficha muda.
   - Ao clicar, salva as últimas alterações no Supabase e volta a ficar apagado.
========================================================= */
(function setupCampaignLabDndApplyButton() {
  function getForm() {
    return document.getElementById("dndPlayerSheetForm");
  }

  function getButton() {
    return document.getElementById("dndV2ApplySheetBtn");
  }

  function setButtonState(state) {
    const button = getButton();
    if (!button) return;

    button.classList.remove("is-clean", "is-dirty", "is-saving", "is-error");
    button.dataset.applyState = state;

    if (state === "dirty" || state === "error") {
      button.classList.add("is-dirty");
      button.disabled = false;
      button.textContent = "Aplicar";
      button.setAttribute("aria-label", "Aplicar e salvar alterações da ficha");
      return;
    }

    if (state === "saving") {
      button.classList.add("is-saving");
      button.disabled = true;
      button.textContent = "Aplicar";
      button.setAttribute("aria-label", "Salvando alterações da ficha");
      return;
    }

    button.classList.add("is-clean");
    button.disabled = true;
    button.textContent = "Aplicado";
    button.setAttribute("aria-label", "Ficha sem alterações pendentes");
  }

  function markDirty() {
    const button = getButton();
    if (!button || button.dataset.applyState === "saving") return;
    setButtonState("dirty");
  }

  async function applySheetChanges() {
    const form = getForm();
    const button = getButton();
    if (!form || !button || button.dataset.applyState !== "dirty") return;

    try {
      setButtonState("saving");

      if (typeof syncAllDndSpellSlotTrackers === "function") {
        syncAllDndSpellSlotTrackers(form);
      }

      if (typeof syncCampaignLabDndClassFieldsInForm === "function") {
        syncCampaignLabDndClassFieldsInForm(form);
      }

      if (typeof dndRecalculateAll === "function") {
        dndRecalculateAll(form);
      }

      if (typeof saveDndPlayerSheet === "function") {
        await saveDndPlayerSheet(false);
      } else {
        const user = typeof getLoggedUserFromSession === "function" ? getLoggedUserFromSession() : null;
        const campaign = typeof getCurrentCampaign === "function" ? await getCurrentCampaign() : null;
        if (!user || !campaign || typeof updateDndSheet !== "function" || typeof dndGetCompleteFormData !== "function") {
          throw new Error("Função de salvamento da ficha não encontrada.");
        }
        await updateDndSheet(campaign.id, user.id, dndGetCompleteFormData(form));
      }

      setButtonState("clean");
    } catch (error) {
      console.error("Erro ao aplicar ficha de D&D:", error);
      setButtonState("dirty");
    }
  }

  function setup() {
    const form = getForm();
    const button = getButton();
    if (!form || !button || button.dataset.dndApplyReady === "true") return;

    button.dataset.dndApplyReady = "true";
    setButtonState("clean");

    form.addEventListener("input", markDirty, true);
    form.addEventListener("change", markDirty, true);

    form.addEventListener("click", (event) => {
      if (
        event.target.closest("[data-dnd-spell-action]") ||
        event.target.closest("[data-dnd-use-spell-slot]") ||
        event.target.closest(".dnd-spell-slot-dot") ||
        event.target.closest("#applyDndLongRest") ||
        event.target.closest("#applyDndShortRest")
      ) {
        window.setTimeout(markDirty, 80);
      }
    }, true);

    button.addEventListener("click", applySheetChanges);

    window.setTimeout(() => setButtonState("clean"), 600);
    window.setTimeout(() => setButtonState("clean"), 1400);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
/* =========================================================
   D&D - CORREÇÃO DEFINITIVA DO BOTÃO APLICAR/APLICADO
   Cole este patch NO FINAL do script.js.
   Estados permitidos:
   - Aplicar: existem mudanças pendentes ou salvamento falhou
   - Aplicado: ficha salva, sem mudanças pendentes
========================================================= */
(function fixCampaignLabDndApplyAppliedButton() {
  const BUTTON_ID = "dndV2ApplySheetBtn";
  const FORM_ID = "dndPlayerSheetForm";

  let dirtyVersion = 0;
  let savedVersion = 0;
  let isApplying = false;
  let suppressDirtyUntil = 0;
  let ready = false;

  function getForm() {
    return document.getElementById(FORM_ID);
  }

  function getButton() {
    return document.getElementById(BUTTON_ID);
  }

  function setButtonApplied() {
    const button = getButton();
    if (!button) return;

    button.classList.remove("is-dirty", "is-saving", "is-error");
    button.classList.add("is-clean");
    button.dataset.applyState = "clean";
    button.textContent = "Aplicado";
    button.disabled = true;
    button.setAttribute("aria-label", "Ficha aplicada e salva");
  }

  function setButtonApply() {
    const button = getButton();
    if (!button) return;

    button.classList.remove("is-clean", "is-saving", "is-error");
    button.classList.add("is-dirty");
    button.dataset.applyState = "dirty";
    button.textContent = "Aplicar";
    button.disabled = false;
    button.setAttribute("aria-label", "Aplicar e salvar alterações da ficha");
  }

  function markDirty() {
    if (!ready || isApplying) return;
    if (Date.now() < suppressDirtyUntil) return;

    dirtyVersion += 1;
    setButtonApply();
  }

  async function saveCurrentDndSheet() {
    const form = getForm();
    if (!form) throw new Error("Formulário D&D não encontrado.");

    if (typeof syncAllDndSpellSlotTrackers === "function") {
      syncAllDndSpellSlotTrackers(form);
    }

    if (typeof syncCampaignLabDndClassFieldsInForm === "function") {
      syncCampaignLabDndClassFieldsInForm(form);
    }

    if (typeof dndEnsureFinalBonusAutomationFields === "function") {
      dndEnsureFinalBonusAutomationFields(form);
    }

    if (typeof dndApplyAltheriumBackgroundSelection === "function") {
      dndApplyAltheriumBackgroundSelection(form, { silent: true });
    }

    if (typeof dndRecalculateAll === "function") {
      dndRecalculateAll(form);
    }

    if (typeof saveDndPlayerSheet === "function") {
      await saveDndPlayerSheet(false);
      return;
    }

    const user = typeof getLoggedUserFromSession === "function" ? getLoggedUserFromSession() : null;
    const campaign = typeof getCurrentCampaign === "function" ? await getCurrentCampaign() : null;

    if (!user || !campaign || typeof updateDndSheet !== "function" || typeof dndGetCompleteFormData !== "function") {
      throw new Error("Funções de salvamento da ficha D&D não encontradas.");
    }

    await updateDndSheet(campaign.id, user.id, dndGetCompleteFormData(form));
  }

  async function applyNow(event) {
    const button = getButton();
    if (!button) return;

    event?.preventDefault?.();
    event?.stopPropagation?.();
    event?.stopImmediatePropagation?.();

    if (isApplying) return;

    const versionAtStart = dirtyVersion;
    isApplying = true;
    button.disabled = true;
    button.dataset.applyState = "saving";
    button.classList.remove("is-clean", "is-dirty", "is-error");
    button.classList.add("is-saving");
    button.textContent = "Aplicar";

    try {
      await saveCurrentDndSheet();

      savedVersion = versionAtStart;
      suppressDirtyUntil = Date.now() + 1500;

      if (dirtyVersion === versionAtStart) {
        setButtonApplied();

        // Proteção contra eventos atrasados do próprio recálculo/salvamento.
        window.setTimeout(() => {
          if (dirtyVersion === savedVersion) setButtonApplied();
        }, 120);

        window.setTimeout(() => {
          if (dirtyVersion === savedVersion) setButtonApplied();
        }, 600);

        window.setTimeout(() => {
          if (dirtyVersion === savedVersion) setButtonApplied();
        }, 1400);
      } else {
        setButtonApply();
      }
    } catch (error) {
      console.error("Erro ao aplicar ficha de D&D:", error);
      setButtonApply();
    } finally {
      isApplying = false;
    }
  }

  function setup() {
    const form = getForm();
    const button = getButton();
    if (!form || !button || button.dataset.applyAppliedFixReady === "true") return;

    button.dataset.applyAppliedFixReady = "true";

    // Remove disabled herdado do HTML quando houver mudança depois.
    setButtonApplied();
    ready = true;

    form.addEventListener("input", markDirty, true);
    form.addEventListener("change", markDirty, true);

    form.addEventListener("click", (event) => {
      if (
        event.target.closest("[data-dnd-spell-action]") ||
        event.target.closest("[data-dnd-use-spell-slot]") ||
        event.target.closest(".dnd-spell-slot-dot") ||
        event.target.closest("#applyDndLongRest") ||
        event.target.closest("#applyDndShortRest")
      ) {
        window.setTimeout(markDirty, 120);
      }
    }, true);

    // Captura antes do listener antigo para impedir que ele coloque estado errado.
    button.addEventListener("click", applyNow, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(setup, 300));
  } else {
    setTimeout(setup, 300);
  }
})();
/* =========================================================
   D&D - INVENTÁRIO FUNCIONAL
   Salva tudo no campo hidden dndInventoryItems em JSON.
========================================================= */
(function () {
  const FORM_ID = "dndPlayerSheetForm";
  const STORE_NAME = "dndInventoryItems";

  const CATEGORY_LABELS = {
    weapon: "Arma",
    armor: "Armadura",
    shield: "Escudo",
    magic: "Item mágico",
    consumable: "Consumível",
    tool: "Ferramenta",
    adventuring: "Equipamento",
    treasure: "Tesouro",
    custom: "Criado",
  };

  const VALUE_MULTIPLIER_TO_GP = {
    PC: 0.01,
    PP: 0.1,
    PE: 0.5,
    PO: 1,
    PL: 10,
  };

  const INVENTORY_PRESETS = [
    { name: "Adaga", category: "weapon", weight: "1", value: "2", valueUnit: "PO", type: "Arma simples", notes: "Arma leve, arremesso e acuidade." },
    { name: "Espada curta", category: "weapon", weight: "2", value: "10", valueUnit: "PO", type: "Arma marcial", notes: "Arma leve e de acuidade." },
    { name: "Espada longa", category: "weapon", weight: "3", value: "15", valueUnit: "PO", type: "Arma marcial", notes: "Versátil." },
    { name: "Machado de batalha", category: "weapon", weight: "4", value: "10", valueUnit: "PO", type: "Arma marcial", notes: "Versátil." },
    { name: "Martelo de guerra", category: "weapon", weight: "2", value: "15", valueUnit: "PO", type: "Arma marcial", notes: "Versátil." },
    { name: "Arco curto", category: "weapon", weight: "2", value: "25", valueUnit: "PO", type: "Arma simples", notes: "Arma à distância." },
    { name: "Arco longo", category: "weapon", weight: "2", value: "50", valueUnit: "PO", type: "Arma marcial", notes: "Arma à distância pesada." },
    { name: "Besta leve", category: "weapon", weight: "5", value: "25", valueUnit: "PO", type: "Arma simples", notes: "Arma à distância com recarga." },
    { name: "Escudo", category: "shield", weight: "6", value: "10", valueUnit: "PO", type: "Defesa", notes: "+2 CA enquanto equipado." },
    { name: "Couro", category: "armor", weight: "10", value: "10", valueUnit: "PO", type: "Armadura leve", notes: "CA 11 + DES." },
    { name: "Couro batido", category: "armor", weight: "13", value: "45", valueUnit: "PO", type: "Armadura leve", notes: "CA 12 + DES." },
    { name: "Camisão de malha", category: "armor", weight: "20", value: "50", valueUnit: "PO", type: "Armadura média", notes: "CA 13 + DES máx. +2." },
    { name: "Peitoral", category: "armor", weight: "20", value: "400", valueUnit: "PO", type: "Armadura média", notes: "CA 14 + DES máx. +2." },
    { name: "Cota de malha", category: "armor", weight: "55", value: "75", valueUnit: "PO", type: "Armadura pesada", notes: "CA 16." },
    { name: "Armadura de placas", category: "armor", weight: "65", value: "1500", valueUnit: "PO", type: "Armadura pesada", notes: "CA 18." },
    { name: "Poção de cura", category: "consumable", weight: "0.5", value: "50", valueUnit: "PO", type: "Poção", consumable: true, notes: "Consumível de cura." },
    { name: "Pergaminho de magia", category: "consumable", weight: "0", value: "0", valueUnit: "PO", type: "Pergaminho", magical: true, consumable: true, notes: "Defina a magia e o círculo nas observações." },
    { name: "Foco arcano", category: "adventuring", weight: "1", value: "10", valueUnit: "PO", type: "Foco", notes: "Usado por conjuradores arcanos." },
    { name: "Símbolo sagrado", category: "adventuring", weight: "1", value: "5", valueUnit: "PO", type: "Foco", notes: "Usado por conjuradores divinos." },
    { name: "Ferramentas de ladrão", category: "tool", weight: "1", value: "25", valueUnit: "PO", type: "Ferramenta", notes: "Abrir fechaduras e desarmar armadilhas." },
    { name: "Corda de cânhamo", category: "adventuring", weight: "10", value: "1", valueUnit: "PO", type: "Equipamento", notes: "15 metros." },
    { name: "Rações", category: "adventuring", weight: "2", value: "5", valueUnit: "PP", type: "Suprimento", consumable: true, notes: "1 dia de alimento." },
    { name: "Tocha", category: "adventuring", weight: "1", value: "1", valueUnit: "PC", type: "Equipamento", consumable: true, notes: "Iluminação simples." },
    { name: "Gema preciosa", category: "treasure", weight: "0", value: "50", valueUnit: "PO", type: "Tesouro", notes: "Ajuste o valor conforme o mestre." },
  ];

  function getForm() {
    return document.getElementById(FORM_ID);
  }

  function getStore(form = getForm()) {
    return form?.elements?.[STORE_NAME] || form?.querySelector?.(`[name="${STORE_NAME}"]`) || null;
  }

  function escapeHtml(value = "") {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toNumber(value, fallback = 0) {
    const normalized = String(value ?? "").replace(",", ".").replace(/[^0-9.-]/g, "");
    const number = Number(normalized);
    return Number.isFinite(number) ? number : fallback;
  }

  function toInt(value, fallback = 0) {
    const number = Math.floor(toNumber(value, fallback));
    return Number.isFinite(number) ? number : fallback;
  }

  function readItems(form = getForm()) {
    const store = getStore(form);
    if (!store) return [];

    try {
      const parsed = JSON.parse(store.value || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeItem).filter((item) => item.name || item.notes);
    } catch (error) {
      console.warn("Inventário D&D inválido:", error);
      return [];
    }
  }

  function writeItems(items, options = {}) {
    const form = getForm();
    const store = getStore(form);
    if (!form || !store) return;

    store.value = JSON.stringify(items.map(normalizeItem));
    renderInventory(form);

    if (options.silent) return;

    store.dispatchEvent(new Event("input", { bubbles: true }));
    store.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function normalizeItem(item = {}) {
    const quantity = Math.max(1, toInt(item.quantity, 1));
    const chargesMax = Math.max(0, toInt(item.chargesMax, 0));
    const chargesCurrent = Math.max(0, Math.min(chargesMax || 999, toInt(item.chargesCurrent, chargesMax)));

    return {
      id: String(item.id || `item-${Date.now()}-${Math.random().toString(16).slice(2)}`),
      name: String(item.name || "").trim(),
      category: CATEGORY_LABELS[item.category] ? item.category : "custom",
      type: String(item.type || "").trim(),
      rarity: String(item.rarity || "").trim(),
      quantity: String(quantity),
      weight: String(item.weight ?? "0"),
      value: String(item.value ?? "0"),
      valueUnit: ["PC", "PP", "PE", "PO", "PL"].includes(item.valueUnit) ? item.valueUnit : "PO",
      equipped: Boolean(item.equipped),
      magical: Boolean(item.magical || item.category === "magic"),
      attuned: Boolean(item.attuned),
      consumable: Boolean(item.consumable || item.category === "consumable"),
      favorite: Boolean(item.favorite),
      chargesCurrent: String(chargesCurrent),
      chargesMax: String(chargesMax),
      notes: String(item.notes || "").trim(),
    };
  }

  function formatWeight(value) {
    const number = toNumber(value, 0);
    return `${Number.isInteger(number) ? number : number.toFixed(1)} lb`;
  }

  function formatValue(value) {
    const number = toNumber(value, 0);
    return Number.isInteger(number) ? String(number) : number.toFixed(2).replace(/\.00$/, "");
  }

  function itemValueInGp(item) {
    return toNumber(item.value, 0) * Math.max(1, toInt(item.quantity, 1)) * (VALUE_MULTIPLIER_TO_GP[item.valueUnit] || 1);
  }

  function getWalletTotalGp(form) {
    const cp = toNumber(form?.elements?.coinCopper?.value, 0) * 0.01;
    const sp = toNumber(form?.elements?.coinSilver?.value, 0) * 0.1;
    const ep = toNumber(form?.elements?.coinElectrum?.value, 0) * 0.5;
    const gp = toNumber(form?.elements?.coinGold?.value, 0);
    const pp = toNumber(form?.elements?.coinPlatinum?.value, 0) * 10;
    return cp + sp + ep + gp + pp;
  }

  function getCarryingCapacity(form) {
    const manual = toNumber(form?.elements?.carryingCapacity?.value, NaN);
    if (Number.isFinite(manual) && manual > 0) return manual;

    const strScore = Math.max(1, toNumber(form?.elements?.strScore?.value, 10));
    return strScore * 15;
  }

  function getFilteredItems(form) {
    const items = readItems(form);
    const search = String(form.querySelector("[data-dnd-inventory-search]")?.value || "").trim().toLowerCase();
    const filter = form.querySelector("[data-dnd-inventory-filter]")?.value || "all";

    return items.filter((item) => {
      const matchesCategory = filter === "all" || item.category === filter;
      const haystack = [
        item.name,
        item.type,
        item.rarity,
        item.notes,
        CATEGORY_LABELS[item.category],
      ].join(" ").toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      return matchesCategory && matchesSearch;
    });
  }

  function renderInventory(form = getForm()) {
    if (!form) return;

    const allItems = readItems(form);
    const filteredItems = getFilteredItems(form);
    const list = form.querySelector("[data-dnd-inventory-list]");
    const empty = form.querySelector("[data-dnd-inventory-empty]");
    if (!list || !empty) return;

    const totalItems = allItems.reduce((sum, item) => sum + Math.max(1, toInt(item.quantity, 1)), 0);
    const totalWeight = allItems.reduce((sum, item) => sum + toNumber(item.weight, 0) * Math.max(1, toInt(item.quantity, 1)), 0);
    const totalValue = allItems.reduce((sum, item) => sum + itemValueInGp(item), 0);
    const magicCount = allItems.filter((item) => item.magical || item.category === "magic").length;
    const attunedCount = allItems.filter((item) => item.attuned).length;
    const walletTotal = getWalletTotalGp(form);
    const capacity = getCarryingCapacity(form);
    const carryPercent = capacity > 0 ? Math.min(100, (totalWeight / capacity) * 100) : 0;
    const overloaded = capacity > 0 && totalWeight > capacity;

    setText(form, "[data-dnd-inventory-total-items]", totalItems);
    setText(form, "[data-dnd-inventory-total-weight]", formatWeight(totalWeight));
    setText(form, "[data-dnd-inventory-total-value]", `${formatValue(totalValue)} PO`);
    setText(form, "[data-dnd-inventory-magic-count]", magicCount);
    setText(form, "[data-dnd-inventory-attunement-count]", `${attunedCount}/3 sintonizados`);
    setText(form, "[data-dnd-inventory-wallet-total]", `${formatValue(walletTotal)} PO`);
    setText(form, "[data-dnd-inventory-carry-current]", formatWeight(totalWeight));
    setText(form, "[data-dnd-inventory-carry-max]", formatWeight(capacity));
    setText(form, "[data-dnd-inventory-carry-status]", overloaded ? "Acima do limite" : "Dentro do limite");

    const fill = form.querySelector("[data-dnd-inventory-carry-fill]");
    if (fill) fill.style.width = `${carryPercent}%`;

    const side = form.querySelector(".dnd-inventory-side-card");
    if (side) side.classList.toggle("is-overloaded", overloaded);

    empty.classList.toggle("is-visible", filteredItems.length === 0);

    list.innerHTML = filteredItems.map(renderItemCard).join("");
  }

  function setText(root, selector, value) {
    const element = root.querySelector(selector);
    if (element) element.textContent = value;
  }

  function renderItemCard(item) {
    const tags = [];
    if (item.equipped) tags.push("Equipado");
    if (item.magical) tags.push("Mágico");
    if (item.attuned) tags.push("Sintonizado");
    if (item.consumable) tags.push("Consumível");
    if (item.favorite) tags.push("Favorito de combate");
    if (item.rarity) tags.push(item.rarity);
    if (item.chargesMax && toInt(item.chargesMax, 0) > 0) tags.push(`${item.chargesCurrent}/${item.chargesMax} cargas`);

    const quantity = Math.max(1, toInt(item.quantity, 1));
    const totalWeight = toNumber(item.weight, 0) * quantity;
    const valueLabel = `${formatValue(item.value)} ${item.valueUnit}`;

    return `
      <article class="dnd-inventory-item-card ${item.equipped ? "is-equipped" : ""} ${item.favorite ? "is-favorite" : ""}" data-dnd-inventory-item-id="${escapeHtml(item.id)}">
        <div class="dnd-inventory-item-top">
          <div class="dnd-inventory-item-title">
            <h4>${escapeHtml(item.name || "Item sem nome")}</h4>
            <span>${escapeHtml(CATEGORY_LABELS[item.category] || "Item")}</span>
          </div>
          <strong class="dnd-inventory-item-qty">x${quantity}</strong>
        </div>

        <div class="dnd-inventory-item-meta">
          <div><span>Peso</span><strong>${escapeHtml(formatWeight(totalWeight))}</strong></div>
          <div><span>Valor</span><strong>${escapeHtml(valueLabel)}</strong></div>
          <div><span>Tipo</span><strong>${escapeHtml(item.type || "—")}</strong></div>
        </div>

        <p class="dnd-inventory-item-notes">${escapeHtml(item.notes || "Sem observações.")}</p>

        <div class="dnd-inventory-item-tags">
          ${tags.length ? tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("") : "<span>Comum</span>"}
        </div>

        <div class="dnd-inventory-card-actions">
          <button type="button" class="${item.favorite ? "is-favorite-action" : ""}" data-dnd-inventory-favorite>${item.favorite ? "★ Favorito" : "☆ Favoritar"}</button>
          <button type="button" data-dnd-inventory-edit>Editar</button>
          <button type="button" data-dnd-inventory-quantity>Qtd +</button>
          <button type="button" data-dnd-inventory-delete>Remover</button>
        </div>
      </article>
    `;
  }

  function ensureModal() {
    let modal = document.getElementById("dndInventoryModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "dndInventoryModal";
    modal.className = "dnd-inventory-modal";
    modal.innerHTML = `
      <div class="dnd-inventory-modal__box" role="dialog" aria-modal="true" aria-labelledby="dndInventoryModalTitle">
        <div class="dnd-inventory-modal__head">
          <div>
            <h3 id="dndInventoryModalTitle">Adicionar item</h3>
            <p>Cadastre itens oficiais, homebrew, tesouros e equipamentos criados pela mesa.</p>
          </div>
          <button type="button" class="dnd-inventory-modal__close" data-dnd-inventory-close aria-label="Fechar">×</button>
        </div>

        <div class="dnd-inventory-modal__body">
          <div class="dnd-inventory-modal-grid">
            <label class="dnd-inventory-modal-span-2">
              <span>Modelo rápido</span>
              <select data-dnd-inventory-modal-field="preset">
                <option value="">Item personalizado</option>
              </select>
            </label>

            <label>
              <span>Nome</span>
              <input data-dnd-inventory-modal-field="name" type="text" placeholder="Ex: Espada longa flamejante" />
            </label>

            <label>
              <span>Categoria</span>
              <select data-dnd-inventory-modal-field="category">
                <option value="weapon">Arma</option>
                <option value="armor">Armadura</option>
                <option value="shield">Escudo</option>
                <option value="magic">Item mágico</option>
                <option value="consumable">Consumível</option>
                <option value="tool">Ferramenta</option>
                <option value="adventuring">Equipamento</option>
                <option value="treasure">Tesouro</option>
                <option value="custom">Criado</option>
              </select>
            </label>

            <label>
              <span>Tipo / Subtipo</span>
              <input data-dnd-inventory-modal-field="type" type="text" placeholder="Ex: Arma marcial, poção, foco" />
            </label>

            <label>
              <span>Raridade</span>
              <select data-dnd-inventory-modal-field="rarity">
                <option value="">Sem raridade</option>
                <option value="Comum">Comum</option>
                <option value="Incomum">Incomum</option>
                <option value="Raro">Raro</option>
                <option value="Muito raro">Muito raro</option>
                <option value="Lendário">Lendário</option>
                <option value="Artefato">Artefato</option>
              </select>
            </label>

            <label>
              <span>Quantidade</span>
              <input data-dnd-inventory-modal-field="quantity" type="text" inputmode="numeric" placeholder="1" />
            </label>

            <label>
              <span>Peso por unidade</span>
              <input data-dnd-inventory-modal-field="weight" type="text" inputmode="decimal" placeholder="0" />
            </label>

            <label>
              <span>Valor por unidade</span>
              <input data-dnd-inventory-modal-field="value" type="text" inputmode="decimal" placeholder="0" />
            </label>

            <label>
              <span>Moeda</span>
              <select data-dnd-inventory-modal-field="valueUnit">
                <option value="PC">PC</option>
                <option value="PP">PP</option>
                <option value="PE">PE</option>
                <option value="PO" selected>PO</option>
                <option value="PL">PL</option>
              </select>
            </label>

            <label>
              <span>Cargas atuais</span>
              <input data-dnd-inventory-modal-field="chargesCurrent" type="text" inputmode="numeric" placeholder="0" />
            </label>

            <label>
              <span>Cargas máximas</span>
              <input data-dnd-inventory-modal-field="chargesMax" type="text" inputmode="numeric" placeholder="0" />
            </label>

            <div class="dnd-inventory-modal-checks">
              <label><input data-dnd-inventory-modal-field="equipped" type="checkbox" /> <span>Equipado</span></label>
              <label><input data-dnd-inventory-modal-field="magical" type="checkbox" /> <span>Mágico</span></label>
              <label><input data-dnd-inventory-modal-field="attuned" type="checkbox" /> <span>Sintonizado</span></label>
              <label><input data-dnd-inventory-modal-field="consumable" type="checkbox" /> <span>Consumível</span></label>
              <label><input data-dnd-inventory-modal-field="favorite" type="checkbox" /> <span>Favorito de combate</span></label>
            </div>

            <label class="dnd-inventory-modal-span-2">
              <span>Observações e regras do item</span>
              <textarea data-dnd-inventory-modal-field="notes" placeholder="Dano, bônus, propriedades, requisitos, regra de uso, descrição narrativa ou qualquer detalhe criado pela mesa."></textarea>
            </label>
          </div>
        </div>

        <div class="dnd-inventory-modal__foot">
          <button type="button" class="dnd-inventory-modal-cancel" data-dnd-inventory-close>Cancelar</button>
          <button type="button" class="dnd-inventory-modal-save" data-dnd-inventory-save>Salvar item</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    populatePresetSelect(modal);
    bindModal(modal);
    return modal;
  }

  function populatePresetSelect(modal) {
    const select = modal.querySelector('[data-dnd-inventory-modal-field="preset"]');
    if (!select || select.dataset.ready === "true") return;
    select.dataset.ready = "true";

    INVENTORY_PRESETS.forEach((preset, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `${preset.name} · ${CATEGORY_LABELS[preset.category] || "Item"}`;
      select.appendChild(option);
    });
  }

  function bindModal(modal) {
    if (!modal || modal.dataset.ready === "true") return;
    modal.dataset.ready = "true";

    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest("[data-dnd-inventory-close]")) {
        closeModal();
      }

      if (event.target.closest("[data-dnd-inventory-save]")) {
        saveModalItem();
      }
    });

    modal.querySelector('[data-dnd-inventory-modal-field="preset"]')?.addEventListener("change", (event) => {
      const index = event.target.value;
      if (index === "") return;
      const preset = INVENTORY_PRESETS[Number(index)];
      if (preset) fillModal(preset, { keepId: true });
      event.target.value = "";
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function field(modal, name) {
    return modal.querySelector(`[data-dnd-inventory-modal-field="${name}"]`);
  }

  function fillModal(item = {}, options = {}) {
    const modal = ensureModal();
    const normalized = normalizeItem(item);
    if (options.keepId && modal.dataset.editingId) normalized.id = modal.dataset.editingId;

    modal.dataset.editingId = normalized.id || "";
    const title = modal.querySelector("#dndInventoryModalTitle");
    if (title) title.textContent = options.isEdit ? "Editar item" : "Adicionar item";

    ["name", "category", "type", "rarity", "quantity", "weight", "value", "valueUnit", "chargesCurrent", "chargesMax", "notes"].forEach((key) => {
      const el = field(modal, key);
      if (el) el.value = normalized[key] ?? "";
    });

    ["equipped", "magical", "attuned", "consumable", "favorite"].forEach((key) => {
      const el = field(modal, key);
      if (el) el.checked = Boolean(normalized[key]);
    });
  }

  function openModal(item = null, options = {}) {
    const modal = ensureModal();
    fillModal(item || { category: options.category || "custom", quantity: "1", valueUnit: "PO" }, { isEdit: Boolean(item) });
    modal.classList.add("is-open");
    setTimeout(() => field(modal, "name")?.focus(), 40);
  }

  function closeModal() {
    const modal = document.getElementById("dndInventoryModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.dataset.editingId = "";
  }

  function readModalItem() {
    const modal = ensureModal();
    const item = { id: modal.dataset.editingId || "" };

    ["name", "category", "type", "rarity", "quantity", "weight", "value", "valueUnit", "chargesCurrent", "chargesMax", "notes"].forEach((key) => {
      item[key] = field(modal, key)?.value || "";
    });

    ["equipped", "magical", "attuned", "consumable", "favorite"].forEach((key) => {
      item[key] = Boolean(field(modal, key)?.checked);
    });

    return normalizeItem(item);
  }

  function saveModalItem() {
    const item = readModalItem();
    if (!item.name) {
      alert("Digite o nome do item.");
      field(ensureModal(), "name")?.focus();
      return;
    }

    const items = readItems();
    const index = items.findIndex((current) => current.id === item.id);
    if (index >= 0) items[index] = item;
    else items.unshift(item);

    writeItems(items);
    closeModal();
  }

  function setupInventory(form = getForm()) {
    if (!form || !getStore(form)) return;
    ensureModal();

    if (form.dataset.dndInventoryReady !== "true") {
      form.dataset.dndInventoryReady = "true";

      form.querySelector("[data-dnd-inventory-add]")?.addEventListener("click", () => openModal());

      form.querySelectorAll("[data-dnd-inventory-quick]").forEach((button) => {
        button.addEventListener("click", () => openModal(null, { category: button.dataset.dndInventoryQuick || "custom" }));
      });

      form.querySelector("[data-dnd-inventory-search]")?.addEventListener("input", () => renderInventory(form));
      form.querySelector("[data-dnd-inventory-filter]")?.addEventListener("change", () => renderInventory(form));

      ["coinCopper", "coinSilver", "coinElectrum", "coinGold", "coinPlatinum", "carryingCapacity", "strScore"].forEach((name) => {
        const el = form.elements?.[name];
        if (el) {
          el.addEventListener("input", () => renderInventory(form));
          el.addEventListener("change", () => renderInventory(form));
        }
      });

      form.querySelector("[data-dnd-inventory-list]")?.addEventListener("click", (event) => {
        const card = event.target.closest("[data-dnd-inventory-item-id]");
        if (!card) return;

        const id = card.dataset.dndInventoryItemId;
        const items = readItems(form);
        const item = items.find((current) => current.id === id);
        if (!item) return;

        if (event.target.closest("[data-dnd-inventory-favorite]")) {
          item.favorite = !item.favorite;
          writeItems(items);
          if (typeof window.campaignLabRenderDndCombatAutomation === "function") {
            window.campaignLabRenderDndCombatAutomation();
          }
          return;
        }

        if (event.target.closest("[data-dnd-inventory-edit]")) {
          openModal(item);
          return;
        }

        if (event.target.closest("[data-dnd-inventory-quantity]")) {
          item.quantity = String(Math.max(1, toInt(item.quantity, 1) + 1));
          writeItems(items);
          return;
        }

        if (event.target.closest("[data-dnd-inventory-delete]")) {
          if (!confirm(`Remover ${item.name}?`)) return;
          writeItems(items.filter((current) => current.id !== id));
        }
      });
    }

    renderInventory(form);
  }

  function wrapLoad() {
    if (typeof window.loadDndSheetIntoPlayerForm !== "function" || window.loadDndSheetIntoPlayerForm.__inventoryWrapped) return;
    const original = window.loadDndSheetIntoPlayerForm;
    window.loadDndSheetIntoPlayerForm = async function () {
      const result = await original.apply(this, arguments);
      setupInventory(getForm());
      return result;
    };
    window.loadDndSheetIntoPlayerForm.__inventoryWrapped = true;
  }

  window.setupDndInventoryManager = setupInventory;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      wrapLoad();
      setTimeout(() => setupInventory(getForm()), 700);
    });
  } else {
    wrapLoad();
    setTimeout(() => setupInventory(getForm()), 700);
  }
})();


/* =========================================================
   D&D - REMOVER BOTÕES COPIAR/COLAR FICHA
========================================================= */
function campaignLabRemoveDndSheetTransferButtons() {
  document
    .querySelectorAll(
      '[data-sheet-transfer-actions="D&D"], [data-sheet-transfer-owner="dndPlayerSheetForm"], [data-sheet-transfer-owner="dndForm"], #dndV2CopySheetBtn'
    )
    .forEach((item) => item.remove());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    campaignLabRemoveDndSheetTransferButtons();
    window.setTimeout(campaignLabRemoveDndSheetTransferButtons, 1100);
  });
} else {
  campaignLabRemoveDndSheetTransferButtons();
  window.setTimeout(campaignLabRemoveDndSheetTransferButtons, 1100);
}

/* =========================================================
   D&D - TESTES CONTRA MORTE CLICÁVEIS
   Sucessos e falhas ficam salvos nos campos deathSuccesses/deathFailures.
========================================================= */
(function campaignLabDndDeathSaves() {
  function clampDeathSaveCount(value) {
    const text = String(value ?? "").trim();
    if (!text) return 0;

    if (/^[01]{1,3}$/.test(text)) {
      return Math.min(3, Array.from(text).filter((char) => char === "1").length);
    }

    const number = Number.parseInt(text.replace(/\D/g, ""), 10);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(3, number));
  }

  function getDeathSaveInput(form, type) {
    if (!form) return null;
    const fieldName = type === "failure" ? "deathFailures" : "deathSuccesses";
    return form.elements?.[fieldName] || form.querySelector(`[name="${fieldName}"]`);
  }

  function syncDeathSaveButtons(form) {
    if (!form) return;

    ["success", "failure"].forEach((type) => {
      const input = getDeathSaveInput(form, type);
      const count = clampDeathSaveCount(input?.value);

      if (input) input.value = String(count);

      form.querySelectorAll(`[data-dnd-death-save="${type}"]`).forEach((button) => {
        const index = Number(button.dataset.dndDeathSaveIndex || 0);
        const checked = index > 0 && index <= count;
        button.classList.toggle("is-checked", checked);
        button.setAttribute("aria-pressed", checked ? "true" : "false");
      });
    });
  }

  function setDeathSaveCount(form, type, nextCount) {
    const input = getDeathSaveInput(form, type);
    if (!input) return;

    input.value = String(Math.max(0, Math.min(3, Number(nextCount) || 0)));
    syncDeathSaveButtons(form);

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function setupDeathSaves(scope = document) {
    const root = scope && scope.querySelectorAll ? scope : document;
    const forms = new Set();

    root.querySelectorAll("[data-dnd-death-saves]").forEach((panel) => {
      const form = panel.closest("form");
      if (form) forms.add(form);
    });

    forms.forEach((form) => {
      if (form.dataset.dndDeathSavesReady !== "true") {
        form.dataset.dndDeathSavesReady = "true";

        form.addEventListener("click", (event) => {
          const button = event.target?.closest?.("[data-dnd-death-save]");
          if (!button || !form.contains(button)) return;

          event.preventDefault();

          const type = button.dataset.dndDeathSave;
          const index = Number(button.dataset.dndDeathSaveIndex || 0);
          const input = getDeathSaveInput(form, type);
          const current = clampDeathSaveCount(input?.value);
          const next = index <= current ? index - 1 : index;

          setDeathSaveCount(form, type, next);
        });

        form.addEventListener("input", (event) => {
          if (event.target?.matches?.('[name="deathSuccesses"], [name="deathFailures"]')) {
            syncDeathSaveButtons(form);
          }
        });
      }

      syncDeathSaveButtons(form);
    });
  }

  const previousLoadDndSheetIntoPlayerForm = window.loadDndSheetIntoPlayerForm;
  window.loadDndSheetIntoPlayerForm = async function () {
    const result = typeof previousLoadDndSheetIntoPlayerForm === "function"
      ? await previousLoadDndSheetIntoPlayerForm.apply(this, arguments)
      : undefined;

    setupDeathSaves(document);
    return result;
  };

  document.addEventListener("click", (event) => {
    if (!event.target?.closest?.("#applyDndLongRest")) return;

    window.setTimeout(() => {
      const form = document.getElementById("dndPlayerSheetForm");
      if (!form) return;
      if (form.elements?.deathSuccesses) form.elements.deathSuccesses.value = "0";
      if (form.elements?.deathFailures) form.elements.deathFailures.value = "0";
      syncDeathSaveButtons(form);
    }, 80);
  }, true);

  window.campaignLabSetupDndDeathSaves = setupDeathSaves;
  window.campaignLabSyncDndDeathSaves = syncDeathSaveButtons;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(() => setupDeathSaves(document), 500));
  } else {
    window.setTimeout(() => setupDeathSaves(document), 500);
  }
})();


/* =========================================================
   D&D - ATAQUES, MAGIAS E ITENS AUTOMATIZADOS
   Lê somente armas/itens favoritos do inventário e magias favoritas do grimório.
   Salva ajustes extras no hidden dndCombatOverrides.
========================================================= */
(function campaignLabDndCombatAutomation() {
  const FORM_ID = "dndPlayerSheetForm";
  const OVERRIDES_FIELD = "dndCombatOverrides";

  const CATEGORY_LABELS = {
    weapon: "Arma",
    armor: "Armadura",
    shield: "Escudo",
    magic: "Item mágico",
    consumable: "Consumível",
    tool: "Ferramenta",
    adventuring: "Equipamento",
    treasure: "Tesouro",
    custom: "Criado",
  };

  const WEAPON_DEFAULTS = [
    { keys: ["adaga", "punhal"], damage: "1d4", ability: "finesse", range: "1,5m / 6m", type: "Perfurante" },
    { keys: ["clava"], damage: "1d4", ability: "str", range: "1,5m", type: "Contundente" },
    { keys: ["bordao", "bordão"], damage: "1d6", ability: "str", range: "1,5m", type: "Contundente" },
    { keys: ["maca", "maça"], damage: "1d6", ability: "str", range: "1,5m", type: "Contundente" },
    { keys: ["machadinha"], damage: "1d6", ability: "str", range: "1,5m / 6m", type: "Cortante" },
    { keys: ["azagaia", "javelin"], damage: "1d6", ability: "str", range: "1,5m / 9m", type: "Perfurante" },
    { keys: ["lança", "lanca"], damage: "1d6", ability: "str", range: "1,5m / 6m", type: "Perfurante" },
    { keys: ["martelo leve"], damage: "1d4", ability: "str", range: "1,5m / 6m", type: "Contundente" },
    { keys: ["foice"], damage: "1d4", ability: "str", range: "1,5m", type: "Cortante" },
    { keys: ["funda"], damage: "1d4", ability: "dex", range: "9m / 36m", type: "Contundente" },
    { keys: ["dardo"], damage: "1d4", ability: "dex", range: "6m / 18m", type: "Perfurante" },
    { keys: ["besta leve"], damage: "1d8", ability: "dex", range: "24m / 96m", type: "Perfurante" },
    { keys: ["arco curto"], damage: "1d6", ability: "dex", range: "24m / 96m", type: "Perfurante" },
    { keys: ["porrete grande"], damage: "1d8", ability: "str", range: "1,5m", type: "Contundente" },
    { keys: ["espada curta"], damage: "1d6", ability: "finesse", range: "1,5m", type: "Perfurante" },
    { keys: ["cimitarra"], damage: "1d6", ability: "finesse", range: "1,5m", type: "Cortante" },
    { keys: ["rapieira", "rapiera"], damage: "1d8", ability: "dex", range: "1,5m", type: "Perfurante" },
    { keys: ["espada longa"], damage: "1d8", ability: "str", range: "1,5m", type: "Cortante" },
    { keys: ["machado de batalha"], damage: "1d8", ability: "str", range: "1,5m", type: "Cortante" },
    { keys: ["martelo de guerra"], damage: "1d8", ability: "str", range: "1,5m", type: "Contundente" },
    { keys: ["mangual"], damage: "1d8", ability: "str", range: "1,5m", type: "Contundente" },
    { keys: ["picareta de guerra"], damage: "1d8", ability: "str", range: "1,5m", type: "Perfurante" },
    { keys: ["tridente"], damage: "1d6", ability: "str", range: "1,5m / 6m", type: "Perfurante" },
    { keys: ["glaive", "gládio", "gladio"], damage: "1d10", ability: "str", range: "3m", type: "Cortante" },
    { keys: ["alabarda"], damage: "1d10", ability: "str", range: "3m", type: "Cortante" },
    { keys: ["lança longa", "lanca longa", "pique"], damage: "1d10", ability: "str", range: "3m", type: "Perfurante" },
    { keys: ["lança de montaria", "lanca de montaria"], damage: "1d12", ability: "str", range: "3m", type: "Perfurante" },
    { keys: ["machado grande"], damage: "1d12", ability: "str", range: "1,5m", type: "Cortante" },
    { keys: ["espada grande"], damage: "2d6", ability: "str", range: "1,5m", type: "Cortante" },
    { keys: ["malho", "marreta"], damage: "2d6", ability: "str", range: "1,5m", type: "Contundente" },
    { keys: ["arco longo"], damage: "1d8", ability: "dex", range: "45m / 180m", type: "Perfurante" },
    { keys: ["besta pesada"], damage: "1d10", ability: "dex", range: "30m / 120m", type: "Perfurante" },
    { keys: ["besta de mão", "besta de mao"], damage: "1d6", ability: "dex", range: "9m / 36m", type: "Perfurante" },
    { keys: ["rede"], damage: "0", ability: "dex", range: "1,5m / 4,5m", type: "Especial" },
  ];

  function form() {
    return document.getElementById(FORM_ID);
  }

  function html(value = "") {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value = "") {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function toNumber(value, fallback = 0) {
    const cleaned = String(value ?? "").replace(",", ".").replace(/[^0-9+-.]/g, "");
    const number = Number(cleaned);
    return Number.isFinite(number) ? number : fallback;
  }

  function asSigned(value) {
    const number = Number(value) || 0;
    return number >= 0 ? `+${number}` : String(number);
  }

  function abilityMod(form, ability) {
    const field = `${ability}Score`;
    const score = toNumber(form?.elements?.[field]?.value, 10);
    return Math.floor((score - 10) / 2);
  }

  function proficiencyBonus(form) {
    const raw = form?.elements?.proficiencyBonus?.value;
    const parsed = toNumber(raw, NaN);
    if (Number.isFinite(parsed) && parsed !== 0) return parsed;

    const level = Math.max(1, Math.min(20, Math.floor(toNumber(form?.elements?.charLevel?.value, 1))));
    if (level >= 17) return 6;
    if (level >= 13) return 5;
    if (level >= 9) return 4;
    if (level >= 5) return 3;
    return 2;
  }

  function readJsonField(form, name, fallback) {
    const field = form?.elements?.[name] || form?.querySelector?.(`[name="${name}"]`);
    if (!field) return fallback;

    try {
      const parsed = JSON.parse(field.value || JSON.stringify(fallback));
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function ensureOverridesField(form) {
    if (!form) return null;
    let field = form.elements?.[OVERRIDES_FIELD] || form.querySelector(`[name="${OVERRIDES_FIELD}"]`);
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = OVERRIDES_FIELD;
      field.value = "{}";
      form.appendChild(field);
    }
    if (!String(field.value || "").trim()) field.value = "{}";
    return field;
  }

  function readOverrides(form) {
    const field = ensureOverridesField(form);
    try {
      const parsed = JSON.parse(field?.value || "{}");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      if (field) field.value = "{}";
      return {};
    }
  }

  function writeOverrides(form, overrides) {
    const field = ensureOverridesField(form);
    if (!field) return;
    field.value = JSON.stringify(overrides || {});
    render(form);
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function readInventoryItems(form) {
    const items = readJsonField(form, "dndInventoryItems", []);
    return Array.isArray(items) ? items.filter(Boolean) : [];
  }

  function writeInventoryItems(form, items) {
    const field = form?.elements?.dndInventoryItems || form?.querySelector?.('[name="dndInventoryItems"]');
    if (!field) return;
    field.value = JSON.stringify(items || []);
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));

    if (typeof window.setupDndInventoryManager === "function") {
      window.setupDndInventoryManager(form);
    }

    render(form);
  }

  function readSpells(form) {
    const spells = readJsonField(form, "dndSpellbook", []);
    return Array.isArray(spells) ? spells.filter(Boolean) : [];
  }

  function findWeaponDefault(item) {
    const name = normalize(`${item.name || ""} ${item.type || ""} ${item.notes || ""}`);
    return WEAPON_DEFAULTS.find((weapon) => weapon.keys.some((key) => name.includes(normalize(key)))) || null;
  }

  function parseMagicBonus(item) {
    const text = `${item.name || ""} ${item.type || ""} ${item.notes || ""}`;
    const match = text.match(/(?:^|\s|\()\+([1-3])(?:\s|\)|$)/);
    return match ? Number(match[1]) : 0;
  }

  function extractDice(text = "") {
    const match = String(text || "").match(/\b\d*d\d+(?:\s*[+-]\s*\d+)?\b/i);
    return match ? match[0].replace(/\s+/g, "") : "";
  }

  function resolveAbility(form, item, weaponDefault, override = {}) {
    if (["str", "dex", "con", "int", "wis", "cha", "spell"].includes(override.ability)) return override.ability;

    const ability = weaponDefault?.ability || "str";
    if (ability === "finesse") {
      return abilityMod(form, "dex") >= abilityMod(form, "str") ? "dex" : "str";
    }
    return ability;
  }

  function abilityLabel(ability) {
    return {
      str: "FOR",
      dex: "DES",
      con: "CON",
      int: "INT",
      wis: "SAB",
      cha: "CAR",
      spell: "Magia",
    }[ability] || "Atributo";
  }

  function damageWithBonus(baseDice, bonus) {
    if (!baseDice || baseDice === "0") return baseDice || "0";
    const safeBonus = Number(bonus) || 0;
    if (!safeBonus) return baseDice;
    return `${baseDice}${safeBonus >= 0 ? "+" : ""}${safeBonus}`;
  }

  function makeWeaponEntry(form, item, overrides) {
    const key = `item:${item.id || item.name}`;
    const override = overrides[key] || {};
    const weaponDefault = findWeaponDefault(item);
    const magicBonus = parseMagicBonus(item);
    const ability = resolveAbility(form, item, weaponDefault, override);
    const autoAbilityBonus = ability === "spell"
      ? toNumber(form?.elements?.spellAttackBonus?.value, 0)
      : abilityMod(form, ability);
    const proficient = override.proficient === false || override.proficient === "false" ? false : true;
    const prof = proficient ? proficiencyBonus(form) : 0;
    const manualAttack = String(override.attackBonus ?? "").trim();
    const attackBonus = manualAttack !== "" ? toNumber(manualAttack, 0) : autoAbilityBonus + prof + magicBonus;
    const explicitDamage = String(override.damage || item.damage || "").trim();
    const baseDamage = explicitDamage || weaponDefault?.damage || extractDice(item.notes || item.type || "") || "1d4";
    const damageBonus = explicitDamage ? 0 : (ability === "spell" ? 0 : autoAbilityBonus + magicBonus);

    return {
      key,
      kind: "weapon",
      sourceId: item.id || item.name,
      name: item.name || "Arma sem nome",
      subtitle: item.type || weaponDefault?.type || "Arma do inventário",
      badge: "Arma",
      attackBonus,
      attackLabel: asSigned(attackBonus),
      attackFormula: `1d20${attackBonus >= 0 ? "+" : ""}${attackBonus}`,
      damageFormula: damageWithBonus(baseDamage, damageBonus),
      range: override.range || item.range || weaponDefault?.range || "1,5m",
      notes: override.notes || item.notes || `${abilityLabel(ability)} ${proficient ? "+ proficiência" : "sem proficiência"}${magicBonus ? ` +${magicBonus} mágico` : ""}.`,
      item,
    };
  }

  function spellLevelLabel(level) {
    const number = Number(level) || 0;
    return number <= 0 ? "Truque" : `${number}º círculo`;
  }

  function makeSpellEntry(form, spell) {
    const level = Math.max(0, Math.min(9, Number(spell.level || 0)));
    const saveAttack = String(spell.saveAttack || "").trim();
    const isAttack = /ataque/i.test(saveAttack);
    const spellAttackBonus = toNumber(form?.elements?.spellAttackBonus?.value, 0);
    const spellSaveDc = form?.elements?.spellSaveDc?.value || "--";
    const dice = extractDice(spell.damage || "");

    return {
      key: `spell:${spell.id || spell.name}`,
      kind: "spell",
      sourceId: spell.id || spell.name,
      name: spell.name || "Magia sem nome",
      subtitle: `${spellLevelLabel(level)}${spell.school ? ` · ${spell.school}` : ""}${spell.type ? ` · ${spell.type}` : ""}`,
      badge: level <= 0 ? "Truque" : "Magia",
      attackBonus: isAttack ? spellAttackBonus : null,
      attackLabel: isAttack ? asSigned(spellAttackBonus) : `CD ${spellSaveDc}`,
      attackFormula: isAttack ? `1d20${spellAttackBonus >= 0 ? "+" : ""}${spellAttackBonus}` : "",
      damageFormula: dice || "",
      range: spell.range || "--",
      notes: spell.description || spell.notes || spell.saveAttack || "Magia cadastrada no grimório.",
      spell,
      level,
    };
  }

  function makeItemEntry(form, item, overrides) {
    const key = `item:${item.id || item.name}`;
    const override = overrides[key] || {};
    const dice = String(override.damage || item.damage || extractDice(item.notes || item.type || "")).trim();
    const attackBonusRaw = String(override.attackBonus ?? "").trim();
    const hasAttack = attackBonusRaw !== "";
    const attackBonus = hasAttack ? toNumber(attackBonusRaw, 0) : null;
    const chargesMax = Math.max(0, Math.floor(toNumber(item.chargesMax, 0)));
    const chargesCurrent = Math.max(0, Math.floor(toNumber(item.chargesCurrent, chargesMax)));
    const quantity = Math.max(1, Math.floor(toNumber(item.quantity, 1)));

    return {
      key,
      kind: "item",
      sourceId: item.id || item.name,
      name: item.name || "Item sem nome",
      subtitle: `${CATEGORY_LABELS[item.category] || "Item"}${item.type ? ` · ${item.type}` : ""}${item.rarity ? ` · ${item.rarity}` : ""}`,
      badge: CATEGORY_LABELS[item.category] || "Item",
      attackBonus,
      attackLabel: hasAttack ? asSigned(attackBonus) : "--",
      attackFormula: hasAttack ? `1d20${attackBonus >= 0 ? "+" : ""}${attackBonus}` : "",
      damageFormula: dice,
      range: override.range || item.range || "--",
      notes: override.notes || item.notes || (chargesMax ? `${chargesCurrent}/${chargesMax} cargas.` : `Quantidade: ${quantity}.`),
      item,
    };
  }

  function buildEntries(form) {
    const overrides = readOverrides(form);
    const inventory = readInventoryItems(form);
    const spells = readSpells(form);
    const entries = [];

    inventory.filter((item) => Boolean(item.favorite)).forEach((item) => {
      const category = item.category || "custom";
      const weaponDefault = findWeaponDefault(item);
      const override = overrides[`item:${item.id || item.name}`] || {};
      const hasCombatOverride = Boolean(override.damage || override.attackBonus || override.range || override.notes);

      if (category === "weapon" || weaponDefault) {
        entries.push(makeWeaponEntry(form, item, overrides));
        return;
      }

      if (
        category === "magic" ||
        category === "consumable" ||
        category === "tool" ||
        category === "adventuring" ||
        category === "treasure" ||
        category === "custom" ||
        item.magical ||
        item.consumable ||
        hasCombatOverride
      ) {
        entries.push(makeItemEntry(form, item, overrides));
      }
    });

    spells.filter((spell) => Boolean(spell.favorite)).forEach((spell) => entries.push(makeSpellEntry(form, spell)));

    return entries;
  }

  function rollDice(form, formula) {
    const clean = String(formula || "").replace(/\s+/g, "");
    const parts = clean.match(/[+-]?[^+-]+/g) || [];
    let total = 0;
    const details = [];

    parts.forEach((part) => {
      const sign = part.startsWith("-") ? -1 : 1;
      const raw = part.replace(/^[+-]/, "");
      const dice = raw.match(/^(\d*)d(\d+)$/i);

      if (dice) {
        const amount = Math.max(1, Number(dice[1] || 1));
        const faces = Math.max(2, Number(dice[2] || 20));
        const rolls = Array.from({ length: amount }, () => Math.floor(Math.random() * faces) + 1);
        const subtotal = rolls.reduce((sum, value) => sum + value, 0) * sign;
        total += subtotal;
        details.push(`${sign < 0 ? "-" : ""}${amount}d${faces} [${rolls.join(", ")}]`);
        return;
      }

      const number = toNumber(raw, 0) * sign;
      total += number;
      details.push(`${number >= 0 ? "+" : ""}${number}`);
    });

    return { total, detail: details.join(" ") || "Sem dados" };
  }

  function showRollResult(label, formula, result) {
    const box = document.getElementById("dndV2QuickRollResult");
    if (!box) return;

    const span = box.querySelector("span");
    const strong = box.querySelector("strong");
    const p = box.querySelector("p");

    if (span) span.textContent = label;
    if (strong) strong.textContent = String(result.total ?? "--");
    if (p) p.textContent = `${formula} → ${result.detail}`;
  }

  function entryCard(entry) {
    const typeClass = entry.kind === "spell" ? "dnd-combat-card--spell" : entry.kind === "item" ? "dnd-combat-card--item" : "dnd-combat-card--weapon";
    const notes = String(entry.notes || "").slice(0, 260);
    const hasAttack = Boolean(entry.attackFormula);
    const hasDamage = Boolean(entry.damageFormula && entry.damageFormula !== "0");
    const canCast = entry.kind === "spell" && Number(entry.level || 0) > 0;
    const canUseItem = entry.kind === "item";
    const canConfig = entry.kind !== "spell";

    return `
      <article class="dnd-combat-card ${typeClass}" data-dnd-combat-entry="${html(entry.key)}">
        <div class="dnd-combat-card__top">
          <div>
            <h4>${html(entry.name)}</h4>
            <p>${html(entry.subtitle || "")}</p>
          </div>
          <span class="dnd-combat-card__badge">${html(entry.badge)}</span>
        </div>

        <div class="dnd-combat-card__stats">
          <article><span>Acerto/CD</span><strong>${html(entry.attackLabel || "--")}</strong></article>
          <article><span>Dano/Efeito</span><strong>${html(entry.damageFormula || "--")}</strong></article>
          <article><span>Alcance</span><strong>${html(entry.range || "--")}</strong></article>
        </div>

        <p class="dnd-combat-card__notes">${html(notes || "Sem observações.")}</p>

        <div class="dnd-combat-card__actions">
          ${hasAttack ? `<button type="button" data-dnd-combat-action="roll-attack">Rolar acerto</button>` : ""}
          ${hasDamage ? `<button type="button" data-dnd-combat-action="roll-damage">Rolar dano</button>` : ""}
          ${canCast ? `<button type="button" data-dnd-combat-action="cast-spell">Usar magia</button>` : ""}
          ${canUseItem ? `<button type="button" data-dnd-combat-action="use-item">Usar item</button>` : ""}
          ${canConfig ? `<button type="button" data-dnd-combat-action="configure">Configurar</button>` : ""}
        </div>
      </article>
    `;
  }

  function getFilteredEntries(form, entries) {
    const section = form.querySelector("[data-dnd-combat-automation]");
    const search = normalize(section?.querySelector("[data-dnd-combat-search]")?.value || "");
    const filter = section?.querySelector("[data-dnd-combat-filter]")?.value || "all";

    return entries.filter((entry) => {
      if (filter !== "all" && entry.kind !== filter) return false;
      if (!search) return true;
      return normalize([entry.name, entry.subtitle, entry.badge, entry.damageFormula, entry.notes].join(" ")).includes(search);
    });
  }

  function updateCounters(form, entries) {
    const section = form.querySelector("[data-dnd-combat-automation]");
    if (!section) return;

    const counts = {
      weapons: entries.filter((entry) => entry.kind === "weapon").length,
      spells: entries.filter((entry) => entry.kind === "spell").length,
      items: entries.filter((entry) => entry.kind === "item").length,
    };

    Object.entries(counts).forEach(([key, value]) => {
      const el = section.querySelector(`[data-dnd-combat-count="${key}"]`);
      if (el) el.textContent = String(value);
    });
  }

  function render(targetForm = form()) {
    const currentForm = targetForm || form();
    if (!currentForm) return;

    const section = currentForm.querySelector("[data-dnd-combat-automation]");
    if (!section) return;

    ensureOverridesField(currentForm);

    const entries = buildEntries(currentForm);
    const filtered = getFilteredEntries(currentForm, entries);
    const list = section.querySelector("[data-dnd-combat-list]");
    const empty = section.querySelector("[data-dnd-combat-empty]");

    updateCounters(currentForm, entries);

    if (!list || !empty) return;

    empty.hidden = entries.length > 0;
    list.innerHTML = filtered.length
      ? filtered.map(entryCard).join("")
      : entries.length
        ? `<div class="dnd-combat-automation__empty"><strong>Nada encontrado.</strong><span>Ajuste a busca ou o filtro.</span></div>`
        : "";
  }

  function getEntryByKey(form, key) {
    return buildEntries(form).find((entry) => entry.key === key) || null;
  }

  function useInventoryItem(form, entry) {
    const item = entry.item;
    if (!item) return;

    const items = readInventoryItems(form);
    const index = items.findIndex((current) => String(current.id || current.name) === String(item.id || item.name));
    if (index < 0) return;

    const current = { ...items[index] };
    const chargesMax = Math.max(0, Math.floor(toNumber(current.chargesMax, 0)));
    const chargesCurrent = Math.max(0, Math.floor(toNumber(current.chargesCurrent, chargesMax)));
    const quantity = Math.max(1, Math.floor(toNumber(current.quantity, 1)));

    if (chargesMax > 0) {
      if (chargesCurrent <= 0) {
        alert(`${current.name} está sem cargas.`);
        return;
      }
      current.chargesCurrent = String(chargesCurrent - 1);
      items[index] = current;
      writeInventoryItems(form, items);
      showRollResult(`Usou ${current.name}`, "Carga", { total: chargesCurrent - 1, detail: `${chargesCurrent - 1}/${chargesMax} cargas restantes` });
      return;
    }

    if (current.consumable || current.category === "consumable") {
      if (quantity > 1) {
        current.quantity = String(quantity - 1);
        items[index] = current;
      } else {
        items.splice(index, 1);
      }
      writeInventoryItems(form, items);
      showRollResult(`Usou ${current.name}`, "Consumível", { total: Math.max(0, quantity - 1), detail: `${Math.max(0, quantity - 1)} restantes` });
      return;
    }

    showRollResult(`Usou ${current.name}`, "Item", { total: "--", detail: "Item marcado como usado narrativamente." });
  }

  function ensureCastModal(form) {
    let modal = document.getElementById("dndCombatCastModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "dndCombatCastModal";
    modal.className = "dnd-combat-cast-modal dnd-combat-modal-base";
    modal.innerHTML = `
      <div class="dnd-combat-cast-modal__box">
        <div class="dnd-combat-cast-modal__head">
          <div><span>Usar magia</span><strong data-dnd-combat-cast-name>Magia</strong></div>
          <button type="button" class="dnd-combat-cast-modal__close" data-dnd-combat-cast-close>×</button>
        </div>
        <div class="dnd-combat-cast-modal__grid">
          <label>
            <span>Círculo gasto</span>
            <select data-dnd-combat-cast-level></select>
          </label>
        </div>
        <div class="dnd-combat-cast-modal__status" data-dnd-combat-cast-status></div>
        <div class="dnd-combat-cast-modal__actions">
          <button type="button" data-dnd-combat-cast-close>Cancelar</button>
          <button type="button" data-dnd-combat-cast-confirm>Gastar espaço</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function openCastModal(form, entry) {
    const spell = entry.spell;
    const baseLevel = Math.max(1, Math.min(9, Number(entry.level || spell?.level || 1)));
    const modal = ensureCastModal(form);
    const name = modal.querySelector("[data-dnd-combat-cast-name]");
    const select = modal.querySelector("[data-dnd-combat-cast-level]");
    const status = modal.querySelector("[data-dnd-combat-cast-status]");
    const confirm = modal.querySelector("[data-dnd-combat-cast-confirm]");

    if (name) name.textContent = entry.name;

    const options = [];
    for (let level = baseLevel; level <= 9; level += 1) {
      const counts = typeof window.campaignLabGetManualSpellSlotCounts === "function"
        ? window.campaignLabGetManualSpellSlotCounts(form, level)
        : { level, max: 0, available: 0 };
      options.push(counts);
    }

    if (select) {
      select.innerHTML = options.map((item) => `
        <option value="${item.level}">${item.level}º círculo · ${item.available || 0}/${item.max || 0} disponíveis</option>
      `).join("");
      select.value = String(baseLevel);
    }

    const refreshStatus = () => {
      const level = Number(select?.value || baseLevel);
      const counts = typeof window.campaignLabGetManualSpellSlotCounts === "function"
        ? window.campaignLabGetManualSpellSlotCounts(form, level)
        : { level, max: 0, available: 0 };
      if (!status) return;
      status.textContent = counts.max <= 0
        ? `Nenhum espaço de ${level}º círculo configurado.`
        : `${counts.available || 0} de ${counts.max || 0} espaços de ${level}º círculo disponíveis.`;
      status.classList.toggle("is-empty", !counts.available);
    };

    refreshStatus();
    if (select) select.onchange = refreshStatus;

    modal.querySelectorAll("[data-dnd-combat-cast-close]").forEach((button) => {
      button.onclick = () => modal.classList.remove("is-open");
    });

    if (confirm) {
      confirm.onclick = () => {
        const level = Number(select?.value || baseLevel);
        const used = typeof window.campaignLabUseManualSpellSlot === "function"
          ? window.campaignLabUseManualSpellSlot(form, level)
          : false;
        if (!used) {
          refreshStatus();
          return;
        }
        modal.classList.remove("is-open");
        showRollResult(`Usou ${entry.name}`, `${level}º círculo`, { total: "--", detail: "Espaço de magia gasto automaticamente." });
      };
    }

    modal.classList.add("is-open");
  }

  function ensureConfigModal(form) {
    let modal = document.getElementById("dndCombatConfigModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "dndCombatConfigModal";
    modal.className = "dnd-combat-config-modal dnd-combat-modal-base";
    modal.innerHTML = `
      <div class="dnd-combat-config-modal__box">
        <div class="dnd-combat-config-modal__head">
          <div><span>Configurar combate</span><strong data-dnd-combat-config-name>Item</strong></div>
          <button type="button" class="dnd-combat-config-modal__close" data-dnd-combat-config-close>×</button>
        </div>
        <input type="hidden" data-dnd-combat-config-field="key" />
        <div class="dnd-combat-config-modal__grid">
          <label><span>Bônus de ataque manual</span><input type="text" data-dnd-combat-config-field="attackBonus" placeholder="Ex: +5" /></label>
          <label><span>Dano / efeito</span><input type="text" data-dnd-combat-config-field="damage" placeholder="Ex: 1d8+3" /></label>
          <label><span>Alcance</span><input type="text" data-dnd-combat-config-field="range" placeholder="Ex: 1,5m / 18m" /></label>
          <label><span>Atributo automático</span><select data-dnd-combat-config-field="ability"><option value="">Auto</option><option value="str">Força</option><option value="dex">Destreza</option><option value="int">Inteligência</option><option value="wis">Sabedoria</option><option value="cha">Carisma</option><option value="spell">Ataque mágico</option></select></label>
          <label><span>Proficiência</span><select data-dnd-combat-config-field="proficient"><option value="true">Somar proficiência</option><option value="false">Não somar proficiência</option></select></label>
          <label class="dnd-combat-config-modal__wide"><span>Observações de combate</span><textarea rows="4" data-dnd-combat-config-field="notes" placeholder="Ex: usa munição, causa dano extra contra mortos-vivos, regra da mesa..."></textarea></label>
        </div>
        <div class="dnd-combat-config-modal__actions">
          <button type="button" class="is-danger" data-dnd-combat-config-clear>Limpar ajuste</button>
          <button type="button" data-dnd-combat-config-close>Cancelar</button>
          <button type="button" data-dnd-combat-config-save>Salvar ajuste</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function field(modal, name) {
    return modal.querySelector(`[data-dnd-combat-config-field="${name}"]`);
  }

  function openConfigModal(form, entry) {
    const modal = ensureConfigModal(form);
    const overrides = readOverrides(form);
    const override = overrides[entry.key] || {};

    modal.querySelector("[data-dnd-combat-config-name]").textContent = entry.name;
    field(modal, "key").value = entry.key;
    field(modal, "attackBonus").value = override.attackBonus ?? "";
    field(modal, "damage").value = override.damage ?? "";
    field(modal, "range").value = override.range ?? "";
    field(modal, "ability").value = override.ability ?? "";
    field(modal, "proficient").value = String(override.proficient ?? "true");
    field(modal, "notes").value = override.notes ?? "";

    modal.querySelectorAll("[data-dnd-combat-config-close]").forEach((button) => {
      button.onclick = () => modal.classList.remove("is-open");
    });

    modal.querySelector("[data-dnd-combat-config-save]").onclick = () => {
      const key = field(modal, "key").value;
      const next = {
        attackBonus: field(modal, "attackBonus").value.trim(),
        damage: field(modal, "damage").value.trim(),
        range: field(modal, "range").value.trim(),
        ability: field(modal, "ability").value,
        proficient: field(modal, "proficient").value === "true",
        notes: field(modal, "notes").value.trim(),
      };
      overrides[key] = next;
      writeOverrides(form, overrides);
      modal.classList.remove("is-open");
    };

    modal.querySelector("[data-dnd-combat-config-clear]").onclick = () => {
      const key = field(modal, "key").value;
      delete overrides[key];
      writeOverrides(form, overrides);
      modal.classList.remove("is-open");
    };

    modal.classList.add("is-open");
  }

  function setupEvents(form) {
    if (!form || form.dataset.dndCombatAutomationReady === "true") return;
    form.dataset.dndCombatAutomationReady = "true";

    const section = form.querySelector("[data-dnd-combat-automation]");
    if (!section) return;

    section.querySelector("[data-dnd-combat-search]")?.addEventListener("input", () => render(form));
    section.querySelector("[data-dnd-combat-filter]")?.addEventListener("change", () => render(form));
    section.querySelector("[data-dnd-combat-refresh]")?.addEventListener("click", () => render(form));

    section.addEventListener("click", (event) => {
      const button = event.target.closest("[data-dnd-combat-action]");
      if (!button) return;

      const card = event.target.closest("[data-dnd-combat-entry]");
      const entry = getEntryByKey(form, card?.dataset?.dndCombatEntry || "");
      if (!entry) return;

      event.preventDefault();
      const action = button.dataset.dndCombatAction;

      if (action === "roll-attack" && entry.attackFormula) {
        const result = rollDice(form, entry.attackFormula);
        showRollResult(`${entry.name} · acerto`, entry.attackFormula, result);
        return;
      }

      if (action === "roll-damage" && entry.damageFormula) {
        const result = rollDice(form, entry.damageFormula);
        showRollResult(`${entry.name} · dano`, entry.damageFormula, result);
        return;
      }

      if (action === "cast-spell") {
        openCastModal(form, entry);
        return;
      }

      if (action === "use-item") {
        useInventoryItem(form, entry);
        return;
      }

      if (action === "configure") {
        openConfigModal(form, entry);
      }
    });

    let timer = null;
    form.addEventListener("input", (event) => {
      const name = event.target?.name || "";
      if (["dndInventoryItems", "dndSpellbook", OVERRIDES_FIELD, "strScore", "dexScore", "intScore", "wisScore", "chaScore", "proficiencyBonus", "spellAttackBonus", "spellSaveDc"].includes(name)) {
        clearTimeout(timer);
        timer = setTimeout(() => render(form), 120);
      }
    });

    form.addEventListener("change", (event) => {
      const name = event.target?.name || "";
      if (["dndInventoryItems", "dndSpellbook", OVERRIDES_FIELD, "strScore", "dexScore", "intScore", "wisScore", "chaScore", "proficiencyBonus", "spellAttackBonus", "spellSaveDc"].includes(name)) {
        clearTimeout(timer);
        timer = setTimeout(() => render(form), 120);
      }
    });
  }

  function wrapLoad() {
    if (typeof window.loadDndSheetIntoPlayerForm !== "function" || window.loadDndSheetIntoPlayerForm.__combatAutomationWrapped) return;
    const original = window.loadDndSheetIntoPlayerForm;
    window.loadDndSheetIntoPlayerForm = async function wrappedCombatAutomationLoad() {
      const result = await original.apply(this, arguments);
      const currentForm = form();
      setupEvents(currentForm);
      render(currentForm);
      return result;
    };
    window.loadDndSheetIntoPlayerForm.__combatAutomationWrapped = true;
  }

  function boot() {
    const currentForm = form();
    if (!currentForm) return;
    ensureOverridesField(currentForm);
    setupEvents(currentForm);
    render(currentForm);
    wrapLoad();
  }

  window.campaignLabRenderDndCombatAutomation = function () {
    render(form());
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(boot, 700));
  } else {
    setTimeout(boot, 700);
  }

  setTimeout(boot, 1400);
  setTimeout(boot, 2400);
})();
/* =========================================================
   D&D - RESULTADO DA ROLAGEM FIXO NO CANTO INFERIOR DIREITO
   Cole no final do script.js
========================================================= */
(function () {
  let hideTimer = null;
  let observerReady = false;

  function getRollBox() {
    return document.getElementById("dndV2QuickRollResult");
  }

  function hasRealRollResult(box) {
    const strong = box?.querySelector("strong");
    const value = String(strong?.textContent || "").trim();
    return Boolean(value && value !== "--" && value !== "—");
  }

  function showFloatingRollBox(box) {
    if (!box || !hasRealRollResult(box)) return;

    box.classList.add("dnd-floating-roll-result", "is-visible", "is-hot");

    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      box.classList.remove("is-hot", "is-visible");
    }, 14000);
  }

  function setupFloatingRollResult() {
    const box = getRollBox();
    if (!box || observerReady) return;

    observerReady = true;
    box.classList.add("dnd-floating-roll-result");

    if (!hasRealRollResult(box)) {
      box.classList.remove("is-visible", "is-hot");
    }

    const observer = new MutationObserver(() => {
      showFloatingRollBox(box);
    });

    observer.observe(box, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    box.addEventListener("click", () => {
      box.classList.remove("is-visible", "is-hot");
      window.clearTimeout(hideTimer);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupFloatingRollResult();
      window.setTimeout(setupFloatingRollResult, 800);
    });
  } else {
    setupFloatingRollResult();
    window.setTimeout(setupFloatingRollResult, 800);
  }
})();
/* =========================================================
   D&D - RESULTADO DO DADO EM PRIMEIRO PLANO POR 5 SEGUNDOS
   Cole no final do script.js
========================================================= */
(function () {
  let dndRollFrontTimer = null;
  let dndRollFrontObserver = null;

  function getDndRollFrontBox() {
    return document.getElementById("dndV2QuickRollResult");
  }

  function hasDndRollFrontResult(box) {
    const strong = box?.querySelector("strong");
    const value = String(strong?.textContent || "").trim();
    return Boolean(value && value !== "--" && value !== "—");
  }

  function moveDndRollBoxToBody(box) {
    if (!box || box.parentElement === document.body) return;
    document.body.appendChild(box);
  }

  function hideDndRollFrontBox(box) {
    if (!box) return;
    box.classList.remove("is-hot", "is-visible", "dnd-roll-toast-front");
  }

  function showDndRollFrontBox() {
    const box = getDndRollFrontBox();
    if (!box || !hasDndRollFrontResult(box)) return;

    moveDndRollBoxToBody(box);

    box.classList.add("dnd-floating-roll-result", "is-visible", "is-hot", "dnd-roll-toast-front");

    window.clearTimeout(dndRollFrontTimer);
    dndRollFrontTimer = window.setTimeout(() => {
      hideDndRollFrontBox(box);
    }, 5000);
  }

  function setupDndRollFrontBox() {
    const box = getDndRollFrontBox();
    if (!box) return;

    moveDndRollBoxToBody(box);
    box.classList.add("dnd-floating-roll-result");

    if (dndRollFrontObserver) {
      dndRollFrontObserver.disconnect();
    }

    dndRollFrontObserver = new MutationObserver(() => {
      showDndRollFrontBox();
    });

    dndRollFrontObserver.observe(box, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    box.onclick = () => {
      window.clearTimeout(dndRollFrontTimer);
      hideDndRollFrontBox(box);
    };

    if (!hasDndRollFrontResult(box)) {
      hideDndRollFrontBox(box);
    }
  }

  function bootDndRollFrontBox() {
    setupDndRollFrontBox();
    window.setTimeout(setupDndRollFrontBox, 500);
    window.setTimeout(setupDndRollFrontBox, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootDndRollFrontBox);
  } else {
    bootDndRollFrontBox();
  }
})();
/* =========================================================
   PATCH - SOM DE ROLAGEM DE DADO NA FICHA D&D
   Usa o mesmo som/fallback da rolagem de Altherium.
   Cole este bloco no FINAL do seu script.js.
========================================================= */
(function campaignLabDndDiceRollSoundPatch() {
  const DND_DICE_SOUND_SELECTOR = [
    "#dndPlayerSheetForm [data-dnd-v2-roll]",
    "#dndPlayerSheetForm [data-dnd-v2-attack-row]",
    "#dndPlayerSheetForm [data-dnd-roll-combat-initiative]",
    "#dndPlayerSheetForm [data-dnd-combat-action='roll-attack']",
    "#dndPlayerSheetForm [data-dnd-combat-action='roll-damage']",
    "#dndPlayerSheetForm #applyDndShortRest",
    "#dndPlayerSheetForm [data-dnd-rest-roll]"
  ].join(", ");

  let lastSoundAt = 0;

  function playFallbackDiceSound(volume = 0.45) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(volume * 0.12, audioContext.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.42);
      masterGain.connect(audioContext.destination);

      [0, 0.06, 0.12, 0.19, 0.27].forEach((delay, index) => {
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

      window.setTimeout(() => {
        audioContext.close().catch(() => {});
      }, 700);
    } catch (error) {
      console.warn("Som de rolagem indisponível.", error);
    }
  }

  function playDndDiceSoundOnce() {
    const now = Date.now();

    // Evita som duplicado quando dois handlers escutam o mesmo clique.
    if (now - lastSoundAt < 120) return;
    lastSoundAt = now;

    if (typeof window.playCampaignDiceRollSound === "function") {
      window.playCampaignDiceRollSound();
      return;
    }

    if (typeof playCampaignDiceRollSound === "function") {
      playCampaignDiceRollSound();
      return;
    }

    try {
      const audio = new Audio("sounds/dice-roll.mp3");
      audio.volume = 0.45;
      audio.currentTime = 0;
      audio.play().catch(() => playFallbackDiceSound(0.45));
    } catch (error) {
      playFallbackDiceSound(0.45);
    }
  }

  function shouldPlayDndDiceSound(target) {
    const button = target?.closest?.(DND_DICE_SOUND_SELECTOR);
    if (!button) return false;
    if (button.disabled || button.getAttribute("aria-disabled") === "true") return false;
    if (!document.body.classList.contains("dnd-player-page") && !document.getElementById("dndPlayerSheetForm")) return false;
    return true;
  }

  if (window.campaignLabDndDiceRollSoundReady) return;
  window.campaignLabDndDiceRollSoundReady = true;

  document.addEventListener(
    "click",
    (event) => {
      if (!shouldPlayDndDiceSound(event.target)) return;
      playDndDiceSoundOnce();
    },
    true
  );
})();


/* =========================================================
   D&D - ABA PET / FICHA PEQUENA DO COMPANHEIRO
========================================================= */
(function campaignLabDndPetSheetPatch() {
  const PET_ABILITIES = [
    ["Str", "str"],
    ["Dex", "dex"],
    ["Con", "con"],
    ["Int", "int"],
    ["Wis", "wis"],
    ["Cha", "cha"],
  ];

  function getPetForm() {
    return document.getElementById("dndPlayerSheetForm");
  }

  function toNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function abilityMod(score) {
    return Math.floor((toNumber(score, 10) - 10) / 2);
  }

  function formatBonus(value) {
    const number = toNumber(value, 0);
    return number >= 0 ? `+${number}` : String(number);
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setPetModField(form, shortName, value) {
    const fieldName = `pet${shortName}Mod`;
    let field = form.elements[fieldName];

    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = fieldName;
      form.appendChild(field);
    }

    field.value = String(value);
  }

  function updatePetSheet() {
    const form = getPetForm();
    if (!form) return;

    const petName = String(form.elements.petName?.value || "").trim();
    const petSpecies = String(form.elements.petSpecies?.value || "").trim();
    const petBond = String(form.elements.petBond?.value || "").trim();

    setText("dndPetNamePreview", petName || "Sem nome");
    setText("dndPetTypePreview", petSpecies || petBond || "Companheiro da ficha");

    const avatar = document.getElementById("dndPetAvatar");
    const profileCard = avatar ? avatar.closest(".dnd-pet-profile-card") : null;
    const petAvatarUrl = String(form.elements.petAvatarUrl?.value || "").trim();
    const fallbackLetter = (petName || petSpecies || "Pet").trim().charAt(0).toUpperCase() || "P";

    if (avatar) {
      if (petAvatarUrl) {
        avatar.classList.add("has-image");
        avatar.innerHTML = `<img src="${escapeHtml(petAvatarUrl)}" alt="Imagem do pet ${escapeHtml(petName || petSpecies || "Pet")}" loading="lazy" />`;
      } else {
        avatar.classList.remove("has-image");
        avatar.textContent = fallbackLetter;
      }
    }

    if (profileCard) {
      profileCard.classList.toggle("has-pet-image", Boolean(petAvatarUrl));
    }

    PET_ABILITIES.forEach(([shortName, key]) => {
      const score = form.elements[`pet${shortName}Score`]?.value || "10";
      const mod = abilityMod(score);
      setPetModField(form, shortName, mod);
      setText(`dndPet${shortName}ModView`, formatBonus(mod));
    });

    const hpCurrent = Math.max(0, toNumber(form.elements.petHpCurrent?.value, 0));
    const hpMax = Math.max(0, toNumber(form.elements.petHpMax?.value, 0));
    const fill = document.getElementById("dndPetHpBarFill");

    if (fill) {
      const percent = hpMax > 0 ? Math.max(0, Math.min(100, (hpCurrent / hpMax) * 100)) : 0;
      fill.style.width = `${percent}%`;
    }
  }

  function rollDiceFormula(formula) {
    const clean = String(formula || "1d20").replace(/\s+/g, "");
    const parts = clean.match(/[+-]?[^+-]+/g) || ["1d20"];
    let total = 0;
    const detail = [];

    parts.forEach((part) => {
      const sign = part.startsWith("-") ? -1 : 1;
      const raw = part.replace(/^[+-]/, "");
      const dice = raw.match(/^(\d*)d(\d+)$/i);

      if (dice) {
        const amount = Math.max(1, Number(dice[1] || 1));
        const faces = Math.max(2, Number(dice[2] || 20));
        const rolls = Array.from({ length: amount }, () => Math.floor(Math.random() * faces) + 1);
        const subtotal = rolls.reduce((sum, value) => sum + value, 0) * sign;
        total += subtotal;
        detail.push(`${sign < 0 ? "-" : ""}${amount}d${faces} [${rolls.join(", ")}]`);
        return;
      }

      const value = toNumber(raw, 0) * sign;
      total += value;
      detail.push(`${value >= 0 ? "+" : ""}${value}`);
    });

    return { total, detail: detail.join(" ") || "Sem dados" };
  }

  function showPetRollResult(label, formula, result) {
    const box = document.getElementById("dndV2QuickRollResult");
    if (!box) return;

    const span = box.querySelector("span");
    const strong = box.querySelector("strong");
    const text = box.querySelector("p");

    if (span) span.textContent = label;
    if (strong) strong.textContent = String(result.total ?? "--");
    if (text) text.textContent = `${formula} → ${result.detail}`;

    if (typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("dnd-roll-result-updated"));
    }
  }


  async function uploadPetImage(input, file) {
    const form = getPetForm();
    if (!form || !input || !file) return;

    if (!DB || !DB.storage) {
      alert("Supabase Storage não carregou.");
      return;
    }

    if (!file.type || !file.type.startsWith("image/")) {
      alert("Escolha um arquivo de imagem.");
      return;
    }

    if (typeof CHARACTER_PORTRAIT_MAX_SIZE !== "undefined" && file.size > CHARACTER_PORTRAIT_MAX_SIZE) {
      alert("A imagem precisa ter no máximo 5MB.");
      return;
    }

    const uploadButton = input.closest(".dnd-pet-image-upload-btn");
    const oldText = uploadButton ? uploadButton.childNodes[0].textContent.trim() : "";

    try {
      if (uploadButton) {
        uploadButton.childNodes[0].textContent = "Cortando...";
        uploadButton.classList.add("is-loading");
      }

      const croppedFile = typeof openCampaignLabImageCropper === "function"
        ? await openCampaignLabImageCropper(file, {
            title: "Cortar imagem do pet",
            helperText: "Arraste e ajuste a imagem para aparecer no card do pet.",
            cropWidth: 420,
            cropHeight: 420,
            outputWidth: 600,
            outputHeight: 600,
            mask: "circle",
            buttonText: "Usar imagem",
            fileNameSuffix: "pet",
          })
        : file;

      if (!croppedFile) return;
      file = croppedFile;

      if (uploadButton) uploadButton.childNodes[0].textContent = "Enviando...";

      const user = getLoggedUserFromSession();
      const campaign = await getCurrentCampaign(true);

      if (!user || !campaign) {
        alert("Campanha ou usuário não encontrado.");
        return;
      }

      const bucket = typeof CHARACTER_PORTRAIT_BUCKET !== "undefined"
        ? CHARACTER_PORTRAIT_BUCKET
        : "character-portraits";
      const extension = typeof getFileExtension === "function"
        ? getFileExtension(file.name, file.type)
        : (file.type.includes("png") ? "png" : "jpg");
      const safeCampaignId = String(campaign.id).replace(/[^a-zA-Z0-9_-]/g, "-");
      const safeUserId = String(user.id).replace(/[^a-zA-Z0-9_-]/g, "-");
      const filePath = `${safeCampaignId}/D-D/${safeUserId}/pet-${Date.now()}.${extension}`;

      const { error: uploadError } = await DB.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Erro ao enviar imagem do pet:", uploadError);
        alert("Erro ao enviar imagem do pet. Verifique se o bucket character-portraits foi criado.");
        return;
      }

      const { data: publicData } = DB.storage.from(bucket).getPublicUrl(filePath);
      const imageUrl = `${publicData.publicUrl}?v=${Date.now()}`;

      let field = form.elements.petAvatarUrl;
      if (!field) {
        field = document.createElement("input");
        field.type = "hidden";
        field.name = "petAvatarUrl";
        field.setAttribute("data-dnd-pet-avatar-url", "");
        form.appendChild(field);
      }

      field.value = imageUrl;
      updatePetSheet();

      if (typeof markDndApplyButtonDirty === "function") {
        markDndApplyButtonDirty();
      }

      if (typeof saveDndPlayerSheet === "function") {
        await saveDndPlayerSheet(false);
      } else {
        form.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } finally {
      if (uploadButton) {
        uploadButton.childNodes[0].textContent = oldText || "Escolher imagem";
        uploadButton.classList.remove("is-loading");
      }

      input.value = "";
    }
  }

  async function removePetImage() {
    const form = getPetForm();
    if (!form) return;

    let field = form.elements.petAvatarUrl;
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = "petAvatarUrl";
      field.setAttribute("data-dnd-pet-avatar-url", "");
      form.appendChild(field);
    }

    field.value = "";
    updatePetSheet();

    if (typeof markDndApplyButtonDirty === "function") {
      markDndApplyButtonDirty();
    }

    if (typeof saveDndPlayerSheet === "function") {
      await saveDndPlayerSheet(false);
    } else {
      form.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }

  function setupPetEvents() {
    const form = getPetForm();
    if (!form || form.dataset.dndPetReady === "true") return;

    form.dataset.dndPetReady = "true";

    form.addEventListener("input", (event) => {
      if (event.target && String(event.target.name || "").startsWith("pet")) {
        updatePetSheet();
      }
    });

    form.addEventListener("change", (event) => {
      const imageInput = event.target.closest?.("[data-dnd-pet-image-input]");
      if (imageInput) {
        const file = imageInput.files && imageInput.files[0];
        if (file) uploadPetImage(imageInput, file);
        return;
      }

      if (event.target && String(event.target.name || "").startsWith("pet")) {
        updatePetSheet();
      }
    });

    form.addEventListener("click", (event) => {
      const removeImageButton = event.target.closest("[data-dnd-pet-image-remove]");
      if (removeImageButton) {
        event.preventDefault();
        removePetImage();
        return;
      }

      const damageButton = event.target.closest("[data-dnd-pet-damage-roll]");
      if (!damageButton) return;

      event.preventDefault();
      updatePetSheet();

      const petName = String(form.elements.petName?.value || "Pet").trim() || "Pet";
      const attackName = String(form.elements.petAttackName?.value || "Dano").trim() || "Dano";
      const formula = String(form.elements.petAttackDamage?.value || "1d4").trim() || "1d4";
      const result = rollDiceFormula(formula);

      showPetRollResult(`${petName} · ${attackName}`, formula, result);
    });

    updatePetSheet();
  }

  const originalLoadDndSheetIntoPlayerForm = window.loadDndSheetIntoPlayerForm;
  if (typeof originalLoadDndSheetIntoPlayerForm === "function" && !originalLoadDndSheetIntoPlayerForm.__dndPetPatched) {
    const wrapped = async function () {
      const result = await originalLoadDndSheetIntoPlayerForm.apply(this, arguments);
      window.setTimeout(() => {
        setupPetEvents();
        updatePetSheet();
      }, 80);
      return result;
    };
    wrapped.__dndPetPatched = true;
    window.loadDndSheetIntoPlayerForm = wrapped;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.setTimeout(() => {
        setupPetEvents();
        updatePetSheet();
      }, 900);
    });
  } else {
    window.setTimeout(() => {
      setupPetEvents();
      updatePetSheet();
    }, 900);
  }
})();


/* =========================================================
   D&D - NORMALIZADOR DE MEDIDAS EM METROS
   Converte valores antigos salvos em ft. para metros na interface.
========================================================= */
(function () {
  function normalizeVisibleDistanceFields() {
    const form = document.getElementById("dndPlayerSheetForm");
    if (!form || typeof campaignLabDndConvertFeetTextToMeters !== "function") return;

    const selectors = [
      'input[name="speed"]',
      'input[name="petSpeed"]',
      'input[name="darkvision"]',
      'textarea[name="classInitialFeaturesText"]',
      '[data-dnd-spell-field="range"]',
      '[data-dnd-spell-field="description"]',
      '[data-dnd-spell-field="notes"]'
    ];

    selectors.forEach((selector) => {
      form.querySelectorAll(selector).forEach((field) => {
        if (!field || typeof field.value !== "string" || !/\bft\.?\b/i.test(field.value)) return;
        field.value = campaignLabDndConvertFeetTextToMeters(field.value);
      });
    });
  }

  const originalLoadDndSheetIntoPlayerForm = window.loadDndSheetIntoPlayerForm;
  if (typeof originalLoadDndSheetIntoPlayerForm === "function" && !originalLoadDndSheetIntoPlayerForm.__metersNormalizerWrapped) {
    const wrapped = async function () {
      const result = await originalLoadDndSheetIntoPlayerForm.apply(this, arguments);
      window.setTimeout(normalizeVisibleDistanceFields, 120);
      return result;
    };
    wrapped.__metersNormalizerWrapped = true;
    window.loadDndSheetIntoPlayerForm = wrapped;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(normalizeVisibleDistanceFields, 1200));
  } else {
    window.setTimeout(normalizeVisibleDistanceFields, 1200);
  }
})();


/* =========================================================
   D&D - ESPELHO DO PET NO RESUMO VIVO DA FICHA
   Mostra a foto do pet como bolinha menor ao lado da foto do personagem.
========================================================= */
(function () {
  let lastPetAvatarState = "";

  function getDndPetSideForm() {
    return document.getElementById("dndPlayerSheetForm");
  }

  function getDndPetSideLetter(form) {
    const petName = String(form?.elements?.petName?.value || "").trim();
    const petSpecies = String(form?.elements?.petSpecies?.value || "").trim();
    const raw = petName || petSpecies || "Pet";
    return raw.charAt(0).toUpperCase() || "P";
  }

  function refreshDndPetAvatarMini(force = false) {
    const form = getDndPetSideForm();
    const mini = document.getElementById("dndPetAvatarMini");
    if (!form || !mini) return;

    const petName = String(form.elements.petName?.value || "").trim();
    const petSpecies = String(form.elements.petSpecies?.value || "").trim();
    const petAvatarUrl = String(form.elements.petAvatarUrl?.value || "").trim();
    const letter = getDndPetSideLetter(form);
    const state = `${petAvatarUrl}|${petName}|${petSpecies}|${letter}`;

    if (!force && state === lastPetAvatarState) return;
    lastPetAvatarState = state;

    mini.title = petName || petSpecies ? `Pet: ${petName || petSpecies}` : "Imagem do pet";
    mini.setAttribute("aria-label", mini.title);

    if (petAvatarUrl) {
      mini.classList.add("has-image");
      mini.classList.remove("is-empty");
      mini.innerHTML = `<img src="${escapeHtml(petAvatarUrl)}" alt="Imagem do pet ${escapeHtml(petName || petSpecies || "Pet")}" loading="lazy" />`;
      return;
    }

    mini.classList.remove("has-image");
    mini.classList.add("is-empty");
    mini.textContent = letter;
  }

  function bindDndPetAvatarMiniEvents() {
    if (window.__dndPetAvatarMiniReady) return;
    window.__dndPetAvatarMiniReady = true;

    document.addEventListener("input", (event) => {
      if (String(event.target?.name || "").startsWith("pet")) {
        window.setTimeout(() => refreshDndPetAvatarMini(true), 0);
      }
    });

    document.addEventListener("change", (event) => {
      if (String(event.target?.name || "").startsWith("pet") || event.target?.matches?.("[data-dnd-pet-image-input]")) {
        window.setTimeout(() => refreshDndPetAvatarMini(true), 120);
        window.setTimeout(() => refreshDndPetAvatarMini(true), 900);
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target?.closest?.("[data-dnd-pet-image-remove]")) {
        window.setTimeout(() => refreshDndPetAvatarMini(true), 120);
      }
    });
  }

  const originalLoadDndSheetIntoPlayerForm = window.loadDndSheetIntoPlayerForm;
  if (typeof originalLoadDndSheetIntoPlayerForm === "function" && !originalLoadDndSheetIntoPlayerForm.__dndPetAvatarMiniPatched) {
    const wrappedLoadDndSheetIntoPlayerForm = async function () {
      const result = await originalLoadDndSheetIntoPlayerForm.apply(this, arguments);
      window.setTimeout(() => refreshDndPetAvatarMini(true), 120);
      window.setTimeout(() => refreshDndPetAvatarMini(true), 800);
      return result;
    };

    wrappedLoadDndSheetIntoPlayerForm.__dndPetAvatarMiniPatched = true;
    window.loadDndSheetIntoPlayerForm = wrappedLoadDndSheetIntoPlayerForm;
  }

  function initDndPetAvatarMini() {
    bindDndPetAvatarMiniEvents();
    refreshDndPetAvatarMini(true);

    if (!window.__dndPetAvatarMiniInterval) {
      window.__dndPetAvatarMiniInterval = window.setInterval(() => refreshDndPetAvatarMini(false), 800);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(initDndPetAvatarMini, 500));
  } else {
    window.setTimeout(initDndPetAvatarMini, 500);
  }
})();
/* =========================================================
   D&D - PET MINI SOME QUANDO NÃO HÁ IMAGEM
   Cole no final do script.js.
========================================================= */
(function () {
  function syncDndPetMiniVisibility() {
    const form = document.getElementById("dndPlayerSheetForm");
    const mini = document.getElementById("dndPetAvatarMini");
    if (!form || !mini) return;

    const petAvatarUrl = String(form.elements.petAvatarUrl?.value || "").trim();

    if (!petAvatarUrl) {
      mini.hidden = true;
      mini.classList.add("is-empty");
      mini.classList.remove("has-image");
      return;
    }

    mini.hidden = false;
    mini.classList.remove("is-empty");
    mini.classList.add("has-image");
  }

  document.addEventListener("input", (event) => {
    if (event.target?.name === "petAvatarUrl" || event.target?.closest?.("#dndPlayerSheetForm")) {
      window.setTimeout(syncDndPetMiniVisibility, 0);
    }
  }, true);

  document.addEventListener("change", (event) => {
    if (event.target?.name === "petAvatarUrl" || event.target?.closest?.("#dndPlayerSheetForm")) {
      window.setTimeout(syncDndPetMiniVisibility, 0);
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.setTimeout(syncDndPetMiniVisibility, 600);
      window.setTimeout(syncDndPetMiniVisibility, 1400);
    });
  } else {
    window.setTimeout(syncDndPetMiniVisibility, 600);
    window.setTimeout(syncDndPetMiniVisibility, 1400);
  }

  window.setInterval(syncDndPetMiniVisibility, 1200);
})();
