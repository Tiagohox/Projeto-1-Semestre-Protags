// Não permite que o usuário entre no sistema sem estar logado
if (localStorage.getItem('token') === null) {

  alert('Você precisa estar logado para acessar essa página')
  window.location.href = 'login.html'

} else {
  const rsConta = document.querySelector('#rsConta')
  const rsValor = document.querySelector('#rsValor')
  const rsParcelas = document.querySelector('#rsParcelas')
  const rsDatadeEmissao = document.querySelector('#rsDatadeEmissao')
  const rsDatadeRecebimento = document.querySelector('#rsDatadeRecebi')
  const rsreceberDe = document.querySelector('#rsreceberDe')
  const rsCondicaoRec = document.querySelector('#rsCondicaoRec')
  const rsDescricao = document.querySelector('#rsDescricao')
  const rsSituacao = document.querySelector('#rsSituacao')
  const btnCadastro = document.querySelector('#rregCadastrar')
  const rsDatadeVencimento = document.querySelector('#rsDatadeVencimento')
  const rsDatadeRecebimentolabel = document.getElementById('rdataderecebimento')

  let categorias = document.querySelector('#rsCategoria')
  let contasAReceber = JSON.parse(localStorage.getItem('contasAReceber')) || [];
  let contasRecebidas = JSON.parse(localStorage.getItem('contasRecebidas')) || [];

  rsSituacao.addEventListener('change', () => {
    if (rsSituacao.value == 'cRecebido') {
      rsDatadeRecebimentolabel.style.display = "block"
      rsDatadeRecebimento.style.display = "block";
    } else {
      rsDatadeRecebimentolabel.style.display = "none"
      rsDatadeRecebimento.style.display = "none";
    }
  });

  btnCadastro.addEventListener('click', (e) => {
    e.preventDefault();
    if (rsValor.value == "" || rsParcelas.value == "" || rsDatadeEmissao.value == "" || rsDatadeVencimento.value == "" || rsreceberDe.value == "" || rsSituacao == "" || categorias == '') {
      rsValor.style.borderColor = 'red';
      rsDatadeEmissao.style.borderColor = 'red';
      rsDatadeVencimento.style.borderColor = 'red';
      rsreceberDe.style.borderColor = 'red';
      categorias.style.borderColor = 'red';
      rsDatadeRecebimento.style.borderColor = 'red';
      alert("Por favor, preencha todos os campos.");
    }
    else
      if (rsSituacao.value == "caReceber") {
        const contas = {
          'conta': rsConta.value,
          'valor': rsValor.value,
          'parcelas': rsParcelas.value,
          'datadeemissao': rsDatadeEmissao.value,
          'datadevencimento': rsDatadeVencimento.value,
          'receberde': rsreceberDe.value,
          'condicaorec': rsCondicaoRec.value,
          'descricao': rsDescricao.value,
          'categoria': categorias.value,
          'situacao': rsSituacao.value,
        }

        contasAReceber.push(contas)
        localStorage.setItem('contasAReceber', JSON.stringify(contasAReceber))

        console.log(contasAReceber)
        rsValor.style.borderColor = 'gray';
        rsDatadeEmissao.style.borderColor = 'gray';
        rsDatadeRecebimento.style.borderColor = 'gray';
        rsreceberDe.style.borderColor = 'gray';
        rsDatadeVencimento.style.borderColor = 'gray';
        alert("Conta cadastrada com sucesso!");

        window.location.href = './ContasAReceber.html'
      }
      else {
        const contas = {
          'conta': rsConta.value,
          'valor': rsValor.value,
          'parcelas': rsParcelas.value,
          'datadeemissao': rsDatadeEmissao.value,
          'datadevencimento': rsDatadeVencimento.value,
          'dataderecebimento': rsDatadeRecebimento.value,
          'receberde': rsreceberDe.value,
          'condicaorec': rsCondicaoRec.value,
          'descricao': rsDescricao.value,
          'categoria': categorias.value,
          'situacao': rsSituacao.value,
        }

        contasRecebidas.push(contas)
        localStorage.setItem('contasRecebidas', JSON.stringify(contasRecebidas))

        console.log(contasRecebidas)
        rsValor.style.borderColor = 'gray';
        rsDatadeEmissao.style.borderColor = 'gray';
        rsDatadeRecebimento.style.borderColor = 'gray';
        rsreceberDe.style.borderColor = 'gray';
        rsDatadeVencimento.style.borderColor = 'gray';
        alert("Conta cadastrada com sucesso!");

        window.location.href = './ContasRecebidas.html'
      }
  })

  console.log(contasRecebidas)
  console.log(contasAReceber)

 // Recupere os valores da URL
 const urlParams = new URLSearchParams(window.location.search);
 const contaId = urlParams.get('conta');
 const vencimento = urlParams.get('vencimento');
 const parcelas = urlParams.get('parcelas');
 const receberde = urlParams.get('receberde');
 const descricao = urlParams.get('descricao');
 const valor = urlParams.get('valor');
 const categoria = urlParams.get('categoria');
 const condicaoRec = urlParams.get('rsCondicaoRec');
 const datadeemissao = urlParams.get('datadeemissao');


 const valorSemSimbolo = valor.replace(/R\$\s*/g, '');

 // Preencha os campos com os valores recuperados
 document.querySelector('#psConta').value = contaId;
 document.querySelector('#psDatadeVenci').value = vencimento;
 document.querySelector('#psParcelas').value = parcelas;
 document.querySelector('#rsreceberDe').value = receberde;
 document.querySelector('#psDescricao').value = descricao;
 document.querySelector('#psValor').value = valorSemSimbolo;
 document.querySelector('#psrsCondicaoRec').value = condicaoRec;
 document.querySelector('#psCategoria').value = categoria;
 document.querySelector('#psDatadeEmissao').value = datadeemissao;
 console.log(valorSemSimbolo)

















  const rcontasTotalApagar = contasAReceber.length;
  const rcontasTotalPagas = contasRecebidas.length;
  let rcontasTotal = rcontasTotalApagar + rcontasTotalPagas;

  rsConta.value = rcontasTotal;
  let rvalorIncrementado = rsConta.value;
  rvalorIncrementado++;
  rsConta.value = rvalorIncrementado;

}

//Função de logout
function logout() {
  localStorage.removeItem('token')
  window.location.href = 'login.html'
}