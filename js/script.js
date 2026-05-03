/* =========================================================
   USUÁRIOS CONTROLADOS PELO DEV
========================================================= */

const usuariosPermitidos = [
  {
    id: "cisco",
    nome: "Cisco",
    senha: "1234",
    campanhas: [
      {
        nome: "A Queda de Torvalenn",
        sistema: "Altherium",
        perfil: "Mestre",
        pagina: "altherium-mestre.html",
        descricao:
          "Campanha principal de Altherium, marcada por runas, guerra e o destino de Torvalenn.",
      },
      {
        nome: "Reinos Perdidos",
        sistema: "D&D",
        perfil: "Jogador",
        pagina: "dnd-jogador.html",
        descricao:
          "Uma aventura clássica de D&D com exploração, monstros lendários e reinos esquecidos.",
      },
    ],
  },

  {
    id: "bolo",
    nome: "Bolo",
    senha: "1234",
    campanhas: [
      {
        nome: "A Queda de Torvalenn",
        sistema: "Altherium",
        perfil: "Jogador",
        pagina: "altherium-jogador.html",
        descricao:
          "Você participa da campanha de Altherium como jogador e controla sua ficha.",
      },
    ],
  },

  {
    id: "emu",
    nome: "Emu",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "nat",
    nome: "Nat",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "bruna",
    nome: "Bruna",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "sarah",
    nome: "Sarah",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "nico",
    nome: "Nico",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "nub",
    nome: "Nub",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "matheus",
    nome: "Matheus",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "igor",
    nome: "Igor",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "galaxy",
    nome: "Galaxy",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "braba",
    nome: "Braba",
    senha: "1234",
    campanhas: [],
  },

  {
    id: "milla",
    nome: "Milla",
    senha: "1234",
    campanhas: [],
  },
];

/* =========================================================
   LOGIN
========================================================= */

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

/* =========================================================
   MINHAS CAMPANHAS
========================================================= */

if (document.body.classList.contains("my-campaigns-page")) {
  const loggedUserId = localStorage.getItem("loggedUserId");
  const user = usuariosPermitidos.find((item) => item.id === loggedUserId);

  if (!user) {
    window.location.href = "index.html";
  }

  const userNameView = document.getElementById("userNameView");
  const campaignCount = document.getElementById("campaignCount");
  const masterCount = document.getElementById("masterCount");
  const playerCount = document.getElementById("playerCount");

  const masterCampaigns = document.getElementById("masterCampaigns");
  const playerCampaigns = document.getElementById("playerCampaigns");
  const logoutBtn = document.getElementById("logoutBtn");

  const campaignsAsMaster = user.campanhas.filter(
    (campaign) => campaign.perfil === "Mestre"
  );

  const campaignsAsPlayer = user.campanhas.filter(
    (campaign) => campaign.perfil === "Jogador"
  );

  userNameView.textContent = user.nome;
  campaignCount.textContent = user.campanhas.length;
  masterCount.textContent = campaignsAsMaster.length;
  playerCount.textContent = campaignsAsPlayer.length;

  renderCampaigns(masterCampaigns, campaignsAsMaster);
  renderCampaigns(playerCampaigns, campaignsAsPlayer);

  logoutBtn.addEventListener("click", logout);
}

/* =========================================================
   PROTEÇÃO DAS PÁGINAS
========================================================= */

if (document.body.classList.contains("altherium-page")) {
  protectPage("Altherium", "Mestre");
}

if (document.body.classList.contains("altherium-player-page")) {
  protectPage("Altherium", "Jogador");
}

if (document.body.classList.contains("dnd-master-page")) {
  protectPage("D&D", "Mestre");
}

if (document.body.classList.contains("dnd-player-page")) {
  protectPage("D&D", "Jogador");
}

/* =========================================================
   FUNÇÕES
========================================================= */

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
    .map(
      (campaign) => `
        <button
          class="premium-campaign-card"
          onclick="enterCampaign('${campaign.nome}', '${campaign.sistema}', '${campaign.perfil}', '${campaign.pagina}')"
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
      `
    )
    .join("");
}

function enterCampaign(nome, sistema, perfil, pagina) {
  localStorage.setItem("campaignName", nome);
  localStorage.setItem("system", sistema);
  localStorage.setItem("profile", perfil);

  const lastCampaignData = {
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

function protectPage(requiredSystem, requiredProfile) {
  const system = localStorage.getItem("system");
  const profile = localStorage.getItem("profile");
  const loggedUserId = localStorage.getItem("loggedUserId");

  if (!loggedUserId || system !== requiredSystem || profile !== requiredProfile) {
    alert("Acesso negado.");
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}