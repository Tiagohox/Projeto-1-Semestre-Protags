// Modelo Padrão - Alterar depois com o certo


//var entradasPull = JSON.parse(localStorage.getItem('contasEntrada') || '[]');
//var saidasPull = JSON.parse(localStorage.getItem('contasSaida') || '[]');
var aReceberPull = JSON.parse(localStorage.getItem('contasAReceber') || '[]');
var aPagarPull = JSON.parse(localStorage.getItem('contasAPagar') || '[]');

/*var somaEntrada = 0;
for (let i = 0; i < entradaPull.length; i++) {   
    var entradaValor = entradasPull[i].valor;   
    var entradaBRL = parseFloat(entradasValor.replace('R$', '').replace(',', '.'));   
    somaEntrada += entradaBRL; 
}*/
/*var somaSaida = 0;
for (let i = 0; i < saidaPull.length; i++) {   
    var saidaValor = saidaPull[i].valor;   
    var saidaBRL = parseFloat(saidaValor.replace('R$', '').replace(',', '.'));   
    somaSaida += saidaBRL; 
}*/
var somaAReceber = 0;
for (let i = 0; i < aReceberPull.length; i++) {   
    var aReceberValor = aReceberPull[i].valor;   
    var aReceberBRL = parseFloat(aReceberValor.replace('R$', '').replace(',', '.'));   
    somaAReceber += aReceberBRL; 
}
var somaAPagar = 0;
for (let i = 0; i < aPagarPull.length; i++) {   
    var aPagarValor = aPagarPull[i].valor;   
    var aPagarBRL = parseFloat(aPagarValor.replace('R$', '').replace(',', '.'));   
    somaAPagar += aPagarBRL; 
}


localStorage.setItem("valorEntrada", "1050.50")
localStorage.setItem("valorSaida", "450,20")
var entradaLocalBase = localStorage.getItem("valorEntrada")
var saidaLocalBase = localStorage.getItem("valorSaida")
var entradaBase = parseFloat(entradaLocalBase.replace(",", ".")) ;
var saidaBase = parseFloat(saidaLocalBase.replace(".", ",")) ;

//var entradaBase = somaEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
//var saidaBase = somaSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
var aReceberBase = somaAReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
var aPagarBase = somaAPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 


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

    window.onload = function () {

        entrada.innerHTML = "R$ " + entradaBase;
        aReceber.innerHTML = "R$ " + aReceberBase;
        saida.innerHTML = "R$ " + saidaBase;
        aPagar.innerHTML = "R$ " + aPagarBase;   
        
        let resultInfo = parseInt(entradaBase) - parseInt(saidaBase)
        if (resultInfo > 0) {
            resultInfo1.innerHTML = `Receitas maiores que despesas`,
                resultInfo2.innerHTML = `Saldo disponivel: R$ ${resultInfo}`,
                resultInfo1.setAttribute('style', 'color: green'),
                resultInfo2.setAttribute('style', 'color: green')
        } else {
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
    if (dataInicio.value.length < 3) {
        window.alert('Informe uma data para filtrar')
    } else {
        let dataInicio = document.querySelector('input#dataInicio').value;
        let dataFim = document.querySelector('input#dataFim').value;
        let dataInicFim = dataInicio.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')
            + " a " + dataFim.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
        resultFiltro.innerHTML = `Movimentação entre  ${dataInicFim}.`;
    }
}


// Grafico Tiago


    const ctx3 = document.getElementById('myChart3');
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: [
                'Receitas',
                'Despesas'
                
            ],
            datasets: [{
                label: 'Movimentações financeiras',
                data: [1050.50,550//parseInt(aPagarBase)
                
                ],
                backgroundColor: [
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)'
                    
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });



// Função para agrupar categorias e somar os valores correspondentes
function agruparCategorias(contas) {
    const categoriasAgrupadas = {};
    contas.forEach(conta => {
        const categoria = conta.categoria.toLowerCase();
        const valor = Number(conta.valor.replace(/[^0-9.-]+/g, ""));
        if (categoria in categoriasAgrupadas) {
            categoriasAgrupadas[categoria] += valor;
        } else {
            categoriasAgrupadas[categoria] = valor;
        }
    });
    return categoriasAgrupadas;
}

// GRÁFICO DE ENTRADAS
let contasAReceber = JSON.parse(localStorage.getItem('contasAReceber') || '[]');
let categoriasValoresEntradas = agruparCategorias(contasAReceber);
let labelsEntradas = Object.keys(categoriasValoresEntradas);
let valoresEntradas = Object.values(categoriasValoresEntradas);

const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelsEntradas,
        datasets: [{
            label: 'Entradas',
            data: valoresEntradas,
            backgroundColor: 'rgb(75, 192, 192)',
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// GRÁFICO DE SAÍDAS
let contasAPagar = JSON.parse(localStorage.getItem('contasAPagar') || '[]');
let categoriasValoresSaidas = agruparCategorias(contasAPagar);
let labelsSaidas = Object.keys(categoriasValoresSaidas);
let valoresSaidas = Object.values(categoriasValoresSaidas);

const ctx2 = document.getElementById('myChart2');
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labelsSaidas,
        datasets: [{
            label: 'Saídas',
            data: valoresSaidas,
            backgroundColor: 'rgb(255, 99, 132)',
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});



