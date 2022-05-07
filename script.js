let BotaoNext = document.getElementById('QueroSerNext');
let SecaoLogin = document.querySelector('.Entrar');
let Pegatoken = localStorage.token;
let background = document.querySelector('.background');

let Email = document.getElementById('Email');
let Senha = document.getElementById('Senha');
let BotaoEntrar = document.getElementById('BotaoEntrar');

BotaoNext.addEventListener('click', function () {
    SecaoLogin.className = "Entrar show"
    if (Pegatoken === "QpwL5tke4Pnpja7X4") {
        console.log('Receba')
    } else {
        //background.style.display = 'block';
    }
});



BotaoEntrar.addEventListener('click', function () {
    console.log(Email.value);
    if (Email.value.length <= 3) {
        Mensagem_de_Erro()
    }
    else {
        FazLogin()
    }
});

async function FazLogin() {

    await axios.post('https://reqres.in/api/login', {
        email: Email.value, //eve.holt@reqres.in
        password: Senha.value //cityslicka
    })
        .then(function (response) {
            console.log(response);
            token = response.data.token;
            console.log(token);
            localStorage.token = token;
            if (Pegatoken === 'QpwL5tke4Pnpja7X4') {
                console.log("opa")
                SecaoLogin.className = "Entrar"
            }

        })
        .catch(function (error) {
            console.error(error);
            console.log('erradoooo');
            Mensagem_de_Erro2();
        });

}

function Mensagem_de_Erro() {
    listar_erro = document.querySelector('#LoginErro');
    const test = `
                <p style="color:red;">**Digite mais de três caracteres</p>
                <p></p>
                `
    listar_erro.innerHTML = test
    console.log("testando")
    Email.value = "";
    Senha.value = "";
}

function Mensagem_de_Erro2() {
    listar_erro = document.querySelector('#LoginErro');
    const test = `
                <p style="color:red;">E-mail ou Senha Incorretos</p>
                <p>Tente Novamente </p>
                `
    listar_erro.innerHTML = test
    Email.value = "";
    Senha.value = "";
    console.log("testando")
}