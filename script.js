let BotaoNext = document.getElementById('QueroSerNext');
let SecaoLogin = document.querySelector('.Entrar');
let Pegatoken = localStorage.token;
let Email = document.getElementById('Email');
let Senha = document.getElementById('Senha');
let BotaoEntrar = document.getElementById('BotaoEntrar');
let animacao_login_logado = document.querySelector('.animacao_login')
let botao_pesquisar_acao = document.querySelector('#abrir_busca')
let botao_deslogar = document.querySelector('#sair')
let css_botao_deslogar = document.querySelector('.css_sair')
var background = document.querySelector('.background')
var botao_abrir_busca = document.querySelector("#abrir_busca")
var botao_fechar_busca = document.querySelector("#fechar")
var listar_erro = document.querySelector('#inf_acao');
var dica = document.querySelector('small')
var animacao = document.querySelector('.animacao_procurar')
var consult = document.querySelector("#symbol");
let botao_buscar = document.querySelector("#botao_buscar");
var login_feito = document.querySelector('#BotaoEntrar');
var login_feito_animacao = document.querySelector('.animacao_login')

mostrarbotaoacao() //já entra conferindo se o token está correto.

botao_deslogar.addEventListener("click", function () {
    localStorage.token = null;
    Pegatoken = null
    mostrarbotaoacao();
})

//Adiciona evento ao botao quero ser next
BotaoNext.addEventListener('click', function () {
    mostrarbotaoacao()
    if (Pegatoken === "QpwL5tke4Pnpja7X4") {
        animacao_login_logado.className = "animacao_login show"
        setTimeout(function () { animacao_login_logado.className = "animacao_login close" }, 3000)
        //setTimeout(function(){animacao_login_logado.className="animacao_login"},2000) 
    } else {
        SecaoLogin.className = "Entrar show";
    }
});

//Adiciona evento ao botao entrar
BotaoEntrar.addEventListener('click', function () {
        console.log(Email.value);
        if (Email.value.length <= 3) {
             Mensagem_de_Erro()
        }
        else {
        FazLogin()
        }
    });

async function FazLogin() { //funcao p/login

    await axios.post('https://reqres.in/api/login', {
        email: Email.value, //eve.holt@reqres.in
        password: Senha.value //cityslicka
    })
        .then(function (response) {
            console.log(response);
            token = response.data.token;
            console.log(token);
            Pegatoken = token;
            localStorage.token = token;
            if (Pegatoken === 'QpwL5tke4Pnpja7X4') {
                SecaoLogin.className = "Entrar"
                mostrarbotaoacao();
            }
        })
        .catch(function (error) {
            console.error(error);
            Mensagem_de_Erro2();
        });
}

function mostrarbotaoacao() {
    if (Pegatoken === 'QpwL5tke4Pnpja7X4') {
        botao_pesquisar_acao.className = "abrir_busca show"
        css_botao_deslogar.className = "css_sair show "
    }
    else {
        botao_pesquisar_acao.className = "abrir_busca "
        css_botao_deslogar.className = " css_sair"
    }
}

// mensagem de erro para verificação dos campos
function Mensagem_de_Erro() {
    listar_erro = document.querySelector('#LoginErro');
    const test = `
                <p style="color:red;">**Digite mais de 3 caracteres</p>
                `
    listar_erro.innerHTML = test
    Email.value = "";
    Senha.value = "";
}

// mensagem de erro para verificação dos campos
function Mensagem_de_Erro2() {
    listar_erro = document.querySelector('#LoginErro');
    const test = `
                <p style="color:red;">E-mail ou Senha Incorretos</p>
                <p>Tente Novamente </p>
                `
    listar_erro.innerHTML = test
    Email.value = "";
    Senha.value = "";
}

botao_abrir_busca.addEventListener("click", function () {
    background.className = 'background show';
    botao_abrir_busca.className = 'abrir_busca'
    css_botao_deslogar.className = 'css_sair'
})

botao_fechar_busca.addEventListener("click", function () {
    background.className = 'background';
    mostrarbotaoacao();
    test = ``; //apaga todo conteudo pesquisado anteriormente ( se houver)
    listar_erro.innerHTML = test; //escreve a variavel test
    dica.className = 'small'; //volta a dica de simbolo se houver.
})
//INICIO JAVASCRPT PESQUISA

botao_buscar.addEventListener("click", async function () {
    let search = consult.value.toUpperCase();
    animacao.className = 'animacao_procurar show'
    setTimeout(function () {
        animacao.className = 'animacao_procurar'
    }, 1000)

    console.log(search) //transfoorma a string em caixa alta.
    console.log(search.length)
    const options = {
        method: 'GET',
        mode: 'cors',
        // cache: 'default'
    }
    const response = await fetch(`https://api.hgbrasil.com/finance/stock_price?format=json-cors&key=cf47a356&symbol=${search}`, options) // mmethod GET is defalt
    const response_json = await response.json()
    console.log(response_json)
    //procurar toUpperCase
    if (search.length < 5) {
        mensagem_de_erro();
    }
    else if (response_json.results[search].error) {
        mensagem_de_erro(response_json);
    }  //se a api retornar um erro vai mostrar um erro
    else {
        mensagem_informacoes_da_empresa(search, response_json);
    }
})

function mensagem_de_erro() {
    listar_erro = document.querySelector('#inf_acao');
    const test = `
                <p style="color:red;">Símbolo incorreto </p>
                <p>OBS: Digite um símbolo correto ou verifique se o simbolo que escrever está correto</p>
                `
    listar_erro.innerHTML = test
    dica.className = ('small') //retorna dica de simbolo
}

function mensagem_informacoes_da_empresa(search, response_json) {
    console.log(response_json.results[search].name)
    lista = document.querySelector('#inf_acao');
    dica.className = ('small block') //remove dica de simbolo
    const test = `
            <h1> Informações gerais da empresa </h1>
            <li> Simbolo = ${response_json.results[search].symbol}</li>
            <li> Empresa = ${response_json.results[search].name}</li>
            <li> Companhia = ${response_json.results[search].company_name}</li>
            <li> Preço = R$${response_json.results[search].price}</li>
            <p> Clique <a href="${response_json.results[search].website}">aqui</a> para acessar o site oficial da empresa</p>
                `
    lista.innerHTML = test;
}
//construindo parte a animação do botão

login_feito.addEventListener("click", function () {
    if (localStorage.value === "colocar token") {
        setTimeout(function () {
            animacao_login.className = 'animacao_login'
        }, 1000)
        animacao_login.className = "animacao_login reverse"
    }
})