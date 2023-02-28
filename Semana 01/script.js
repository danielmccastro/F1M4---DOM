// Selecionar todos elementos da classe 'produto_preco'
var precos = document.getElementsByClassName("produto_preco");
// Implementar um comando de repetição para analisar o valor 'innerText' de cada um dos elementos e somá-los (lembre-se de converter o valor para float)
var soma = 0;
for (let p of precos) {
  soma += parseFloat(p.innerText);
}
// Escrever no conteúdo da página o valor da soma
document.write("Total: R$ " + soma);