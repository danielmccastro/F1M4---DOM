(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_guitarras')) ?? [];
}

function setLocalStorage(bd_guitarras) {
  localStorage.setItem('bd_guitarras', JSON.stringify(bd_guitarras));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_guitarras = getLocalStorage();
  let index = 0;
  for (guitarra of bd_guitarras) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${guitarra.marca}</td>
        <td>${guitarra.modelo}</td>
        <td>${guitarra.cor}</td>
        <td>${guitarra.ano}</td>
        <td>${guitarra.pais}</td>
        <td>${guitarra.condicao}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const guitarra = {
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    cor: document.getElementById('cor').value,
    ano: document.getElementById('ano').value,
    pais: document.getElementById('paisFabricacao').value,
    condicao: document.getElementById('condicao').value,
  }
  const bd_guitarras = getLocalStorage();
  bd_guitarras.push(guitarra);
  setLocalStorage(bd_guitarras);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_guitarras = getLocalStorage();
  bd_guitarras.splice(index, 1);
  setLocalStorage(bd_guitarras);
  atualizarTabela();
}

function validarAno() { // Adaptação da função validar (10 pontos)
  const bd_guitarras = getLocalStorage();
  const anoMin = 1900;
  if (ano.value <= anoMin) {
    ano.setCustomValidity("O ano deve ser maior do que 1900!");
    feedbackAno.innerText = "O ano deve ser maior do que 1900!";
    return false;
  } else {
    ano.setCustomValidity("");
    feedbackAno.innerText = "Informe o ano de fabricação corretamente.";
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const ano = document.getElementById("ano");
const feedbackAno = document.getElementById("feedbackAno");
ano.addEventListener('input', validarAno);