localStorage.setItem("valorEntrada", "1050.50")
localStorage.setItem("valorAReceber", "250,10")
localStorage.setItem("valorSaida", "450,20")
localStorage.setItem("valorAPagar", "250,00")

var entradaLocalBase = localStorage.getItem("valorEntrada")
var saidaLocalBase = localStorage.getItem("valorSaida")
var aReceberLocalBase = localStorage.getItem("valorAReceber")
var aPagarLocalBase = localStorage.getItem("valorAPagar")
const entradaSaidaArray = []
var entradaBase = parseFloat(entradaLocalBase.replace(",", ".")) ;
var aReceberBase = parseFloat(aReceberLocalBase.replace(",", ".")) ;
var saidaBase = parseFloat(saidaLocalBase.replace(".", ",")) ;
var aPagarBase = parseFloat(aPagarLocalBase.replace(".", ",")) ; 
entradaSaidaArray.push(entradaBase)
entradaSaidaArray.push(aReceberBase)
entradaSaidaArray.push(saidaBase)
entradaSaidaArray.push(aPagarBase)
console.log = entradaSaidaArray
// Variáveis do formulário

var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
var FirstDay = "01" + '/' + mes + '/' + ano;
var LastDay = "31" + '/' + mes + '/' + ano;

// Ao clicar em 'Sair', apaga o token de acesso, exigindo um novo login
function logout() {
    localStorage.removeItem('token')
    window.location.href = './login.html'
}
// Não permite que o usuário entre no sistema sem estar logado
if (localStorage.getItem('token') === null) {

    alert('Você precisa estar logado para acessar essa página')
    window.location.href = './login.html'

} else {

    window.onload = function(){

        entrada.innerHTML = "R$ " + parseFloat(entradaBase) ;
        aReceber.innerHTML = "R$ " + parseFloat(aReceberBase) ;
        saida.innerHTML = "R$ " + parseFloat(saidaBase) ;
        aPagar.innerHTML = "R$ " + parseFloat(aPagarBase) ;   
        
        let resultInfo = parseInt(entradaBase) - parseInt(saidaBase)
        if (resultInfo > 0){
            resultInfo1.innerHTML = `Receitas maiores que despesas`,
            resultInfo2.innerHTML = `Saldo disponivel: R$ ${resultInfo}`,
            resultInfo1.setAttribute('style', 'color: green'),
            resultInfo2.setAttribute('style', 'color: green')
        }else {
            resultInfo1.innerHTML = `Despesas maiores que receitas`,
            resultInfo2.innerHTML = `Saldo disponivel: <b>(-)</b> R$ ${resultInfo}`,
            resultInfo1.setAttribute('style', 'color: red')
        }
    
        period_info_1.innerHTML = `Periodo: ${FirstDay} até ${LastDay}`
        period_info_2.innerHTML = `Periodo: ${FirstDay} até ${LastDay}`
    
        resultFiltro.innerHTML = `Movimentação entre: ${FirstDay} a ${LastDay}`
    }
}

function Filtrar() {
    if(dataInicio.value.length < 3){
        window.alert('Informe uma data para filtrar')
    } else {
        let dataInicio = document.querySelector('input#dataInicio').value;
        let dataFim = document.querySelector('input#dataFim').value;
        let dataInicFim  =  dataInicio.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1') 
                       + " a " + dataFim.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
        resultFiltro.innerHTML = `Movimentação entre  ${dataInicFim}.`;
    }
}

