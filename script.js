// ====== Configurações Iniciais ====== //
const CUPS_KEY = "chefCups";
const VIP_KEY = "chefVip";
const receitasCompradasKey = "chefReceitas";

// Moeda inicial
if (!localStorage.getItem(CUPS_KEY)) {
  localStorage.setItem(CUPS_KEY, "10"); // Começa com 10 CUPS
}

function pegarCups() {
  return parseInt(localStorage.getItem(CUPS_KEY) || "0");
}

function atualizarCups(valor) {
  localStorage.setItem(CUPS_KEY, valor);
  document.getElementById("cupDisplay").innerText = `Ꞓ ${valor}`;
}

function adicionarCups(qtd) {
  let atual = pegarCups();
  atualizarCups(atual + qtd);
}

function removerCups(qtd) {
  let atual = pegarCups();
  if (atual >= qtd) {
    atualizarCups(atual - qtd);
    return true;
  } else {
    alert("CUPS insuficientes! 🥲");
    return false;
  }
}

// ====== VIP ====== //
function ehVip() {
  return localStorage.getItem(VIP_KEY) === "true";
}

function ativarVip() {
  localStorage.setItem(VIP_KEY, "true");
  alert("Agora você é VIP! ✨ Acesso ao Parce Açucarado liberado!");
}

// ====== Lógica de Receitas ====== //
function comprarReceita(nome, preco) {
  if (receitaComprada(nome)) {
    alert("Você já comprou essa receita! 👨‍🍳");
    return;
  }

  if (preco === 0 || removerCups(preco)) {
    marcarComoComprada(nome);
    alert(`Receita "${nome}" comprada com sucesso! 🧁`);
  }
}

function marcarComoComprada(nome) {
  let receitas = JSON.parse(localStorage.getItem(receitasCompradasKey) || "[]");
  receitas.push(nome);
  localStorage.setItem(receitasCompradasKey, JSON.stringify(receitas));
}

function receitaComprada(nome) {
  let receitas = JSON.parse(localStorage.getItem(receitasCompradasKey) || "[]");
  return receitas.includes(nome);
}

// ====== Início ====== //
window.onload = () => {
  atualizarCups(pegarCups());

  // Exemplo: mostrar ou esconder o Parce Açucarado
  const parce = document.getElementById("parceAçucarado");
  if (parce) {
    parce.style.display = ehVip() ? "block" : "none";
  }
}
function comprarReceita(nome, preco) {
  let cups = parseInt(localStorage.getItem("cups") || "0");

  if (preco > cups) {
    alert("Você não tem CUPS suficientes! 🥲");
    return;
  }

  alert(`Você comprou: ${nome}! 🎉`);
  localStorage.setItem("cups", cups - preco);
  document.getElementById("cupDisplay").innerText = `Ꞓ ${cups - preco}`;

  // Exibir passo a passo se tiver
  const id = nome.toLowerCase().replaceAll(" ", "").replaceAll("é", "e");
  const passo = document.getElementById(`${id}Passos`) || document.getElementById(`${id}Passo`) || document.getElementById(`${id}passos`);
  if (passo) passo.style.display = "block";
}
function comprarReceita(nome, preco) {
  let cups = parseInt(localStorage.getItem("cups") || "0");
  let vip = localStorage.getItem("vip") === "true";  // Verifica se é VIP

  // Se for VIP, aplica desconto de 10%
  if (vip) {
    preco = preco * 0.9; // Aplica desconto de 10%
  }

  if (preco > cups) {
    alert("Você não tem CUPS suficientes! 🥲");
    return;
  }

  alert(`Você comprou: ${nome}! 🎉`);
  localStorage.setItem("cups", cups - preco);
  document.getElementById("cupDisplay").innerText = `Ꞓ ${cups - preco}`;

  // Exibir passo a passo se tiver
  const id = nome.toLowerCase().replaceAll(" ", "").replaceAll("é", "e");
  const passo = document.getElementById(`${id}Passos`);
  if (passo) passo.style.display = "block";
}

function comprarParceAçucarado() {
  let cups = parseInt(localStorage.getItem("cups") || "0");

  if (cups >= 50000000) {
    alert("Você comprou o Parce Açucarado! 🎉 Agora você tem desconto em todas as receitas!");
    localStorage.setItem("vip", "true");
    localStorage.setItem("cups", cups - 50000000);  // Retira 50000000 CUPS do usuário
    document.getElementById("cupDisplay").innerText = `Ꞓ ${cups - 50000000}`;
  } else {
    alert("Você não tem CUPS suficientes para comprar o Parce Açucarado.");
  }
}
function comprarSuper() {
  let cups = parseInt(localStorage.getItem("cups") || "0");
  const preco = 1000000000000;

  if (cups >= preco) {
    alert("Você vai ficar Cupsado! 😎🤯🎁🫡🚀🎉🥳🤩😏🤑🧁");

    // Atualiza saldo
    const novoSaldo = cups - preco;
    localStorage.setItem("cups", novoSaldo);

    // Marca como comprado
    localStorage.setItem("super", "true");

    // Atualiza o display
    const display = document.getElementById("cupDisplay");
    if (display) display.innerText = `Ꞓ ${novoSaldo}`;

    // Redireciona
    location.href = 'super.html';
  } else {
    const faltam = preco - cups;
    alert(`Você não tem CUPS suficientes! Faltam Ꞓ ${faltam}. 😔`);
  }
}

// Para verificar depois:
if (localStorage.getItem("super") === "true") {
  console.log("Usuário já comprou o SUPERTURBO CUPS!");
}

function completarMissao() {
  let cups = parseInt(localStorage.getItem("cups") || "0");
  cups += 20;  // Ganha 20 CUPS
  localStorage.setItem("cups", cups);
  document.getElementById("cupDisplay").innerText = `Ꞓ ${cups}`;
  alert("Missão cumprida! Você ganhou 20 CUPS!");
}
// Inicia CUPS se não existir
if (!localStorage.getItem("cups")) {
  localStorage.setItem("cups", "100");
}


// Atualiza o valor dos CUPS na tela
function atualizarCUPS() {
  document.getElementById("cupValor").innerText = localStorage.getItem("cups");
}

// Atualiza o status VIP na tela
function atualizarVIP() {
  const vip = localStorage.getItem("vip") === "true";
  const vipDiv = document.getElementById("vipStatus");

  if (vip) {
    vipDiv.innerHTML = "🟡 Você é <strong>VIP</strong>! Descontos ativados.";
    vipDiv.style.display = "block";
  } else {
    vipDiv.innerHTML = "🔒 Não VIP (sem descontos)";
    vipDiv.style.display = "block";
  }

  // Atualizar preços com desconto
  atualizarPrecos();
}

// Atualiza os preços com desconto se for VIP
function atualizarPrecos() {
  const vip = localStorage.getItem("vip") === "true";

  document.getElementById("preco-html").innerText = vip ? 1500 : 3000;
  document.getElementById("preco-css").innerText = vip ? 1200 : 2500;
  document.getElementById("preco-js").innerText = vip ? 2000 : 4000;
  document.getElementById("preco-jsi").innerText = vip ? 1000 : 2000;
}

atualizarCUPS();
atualizarVIP();

function cursoComprado(curso) {
  return localStorage.getItem(`curso_${curso}`) === "comprado";
}

function acessarCurso(curso, preco, link) {
  const vip = localStorage.getItem("vip") === "true";
  if (vip) preco = Math.floor(preco / 2); // Desconto de 50%

  if (cursoComprado(curso)) {
    location.href = link;
  } else {
    let cups = parseInt(localStorage.getItem("cups"));

    if (cups >= preco) {
      if (confirm(`Deseja comprar o curso de ${curso.toUpperCase()} por ${preco} CUPS?`)) {
        cups -= preco;
        localStorage.setItem("cups", cups);
        localStorage.setItem(`curso_${curso}`, "comprado");
        atualizarCUPS();
        alert(`Curso de ${curso.toUpperCase()} comprado com sucesso!`);
        location.href = link;
      }
    } else {
      alert("CUPS insuficientes! Vai ter que juntar mais...");
    }
  }
}

function ativarVIP() {
  localStorage.setItem("vip", "true");
  alert("Parabéns! Agora você é VIP e tem 50% de desconto!");
  atualizarVIP();
}

// Limite de 3 vezes por dia
function ganharCUPS() {
  const hoje = new Date().toDateString();
  let dados = JSON.parse(localStorage.getItem("ganhosCups")) || {
    data: hoje,
    vezes: 0
  };

  if (dados.data !== hoje) {
    // Reset se for outro dia
    dados.data = hoje;
    dados.vezes = 0;
  }

  if (dados.vezes >= 3) {
    alert("Limite diário de ganhar CUPS atingido. Volte amanhã!");
    return;
  }

  let cups = parseInt(localStorage.getItem("cups"));
  cups += 500;
  localStorage.setItem("cups", cups);
  dados.vezes += 1;
  localStorage.setItem("ganhosCups", JSON.stringify(dados));

  atualizarCUPS();
  alert(`Você ganhou 500 CUPS! (${dados.vezes}/3 hoje)`);
}
