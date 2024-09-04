// Apenas colocando os id's salvos em variaveis para faciliar
const cepCapturado = document.querySelector('#cep')
const cepErroCapturado = document.querySelector('#cepError')
const ruaCapturada = document.querySelector('#street')
const numeroCapturado = document.querySelector('#number')
const bairroCapturado = document.querySelector('#neighborhood')
const cidadeCapturada = document.querySelector('#city')
const estadoCapturado = document.querySelector('#state')
const formulario = document.querySelector('form')

// Mantém o evento de focus para limpar erros
cepCapturado.addEventListener('focus', () => {
  LimparCepError()
})

// Verifica se a tecla pressionada foi o "Enter"
cepCapturado.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evita que o formulário seja submetido ao pressionar "Enter"

    let cep = cepCapturado.value.trim(); // Remove espaços em branco do início e do fim
    cep = cep.replace('-', ''); // Remove o hífen, se existir

    // Verifica se o CEP tem exatamente 8 dígitos e é composto apenas por números
    if (cep.length === 8 && !isNaN(cep)) {
      carregarInfoCep(cep);
    } else {
      MostrarCepError();
    }
  }
});

// Abaixo são funções auxiliares para auxiliar

function carregarInfoCep(cep) {
  let url = `https://viacep.com.br/ws/${cep}/json/` // Monta a URL da API ViaCEP

  // Faz a requisição à API ViaCEP utilizando fetch e processa a resposta 
  fetch(url)
    .then(res => res.json()) // Converte a resposta para JSON
    .then(cepInfo => {
      if (cepInfo.erro) {
        LimparEnderecos() // Limpa os campos de endereço se o CEP não for encontrado
      } else {
        ruaCapturada.value = cepInfo.logradouro // Preenche o campo de rua
        bairroCapturado.value = cepInfo.bairro // Preenche o campo de bairro
        cidadeCapturada.value = cepInfo.localidade // Preenche o campo de cidade
        estadoCapturado.value = cepInfo.uf // Preenche o campo de estado

        numeroCapturado.focus() // Move o foco para o campo de número
        LimparCepError() // Remove qualquer mensagem de erro do campo de CEP
      }
    })
    .catch(error => {
      MostrarCepError() // Exibe uma mensagem de erro se a requisição falhar
    })
}

//Remove a classe de erro do campo de CEP e esconde a mensagem de erro.
function LimparCepError() {
  cepCapturado.classList.remove('input-cep-error') // Remove a classe que destaca o erro no campo de CEP
  cepErroCapturado.classList.add('hidden') // Esconde a mensagem de erro
}

//Adiciona a classe de erro ao campo de CEP e exibe a mensagem de erro.
//Também limpa os campos de endereço no formulário.
function MostrarCepError() {
  cepCapturado.classList.add('input-cep-error') // Adiciona a classe que destaca o erro no campo de CEP
  cepErroCapturado.classList.remove('hidden') // Exibe a mensagem de erro
  LimparEnderecos() // Limpa os campos de endereço
}

// Limpa todos os campos de endereço no formulário.
function LimparEnderecos() {
  ruaCapturada.value = '' // Limpa o campo de rua
  numeroCapturado.value = '' // Limpa o campo de número
  bairroCapturado.value = '' // Limpa o campo de bairro
  cidadeCapturada.value = '' // Limpa o campo de cidade
  estadoCapturado.value = '' // Limpa o campo de estado
}
