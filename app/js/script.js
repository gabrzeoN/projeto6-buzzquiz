//#### Links API
const OBTER_QUIZZES = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";        //GET
const CRIAR_QUIZZES = OBTER_QUIZZES;                                                    //POST
const OBTER_UNICO_QUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/";   //GET
const APAGAR_QUIZZ = OBTER_UNICO_QUIZZ;                                                 //DELETE
const EDITAR_QUIZZ = OBTER_UNICO_QUIZZ;                                                 //PUT

//#### Variáveis de controle tela 2
let quantidadePerguntas = 0;
let perguntasRespondidas = 0;
let quantidadeAcerto = 0;
let nivel = null;

let id = null;
let titulo = null;
let banner = null;
let perguntas = null;
let niveis = null;


chamarUmQuizz("4369");

//#### FUNÇÕES

function trocaTela(telaFechar, telaAbrir) {
    const elementoFechar = document.querySelector(telaFechar);
    const elementoAbrir = document.querySelector(telaAbrir);
    const elementoFoco = document.querySelector('.scroll-view');

    if (!elementoFechar.classList.contains('escondido')) {
        elementoFechar.classList.add('escondido');
    }
    if (elementoAbrir.classList.contains('escondido')) {
        elementoAbrir.classList.remove('escondido');
    }

    elementoFoco.scrollIntoView();
}

function botaoCriarQuizz() {
    trocaTela('.tela1', '.tela3');
}

function validaInputsTela3(etapa) {

}

function botaoProsseguirTela3(etapa) {
    let telaAbrir = null;
    let telaFechar = null;

    if (etapa === 1) {
        telaAbrir = '.tela3_2';
        telaFechar = '.tela3_1';
    } else if (etapa === 2) {
        telaAbrir = '.tela3_3';
        telaFechar = '.tela3_2';
    } else if (etapa === 3) {
        telaAbrir = '.tela3_4';
        telaFechar = '.tela3_3';
    } else {
        telaAbrir = '.tela3';
        telaFechar = '.tela2';
    }

    trocaTela(telaFechar, telaAbrir);
}

function comparador() {
    return Math.random() - 0.5;
}

function chamarUmQuizz(id) {
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + id);
    promisse.then(renderizarUmQuizz);
    promisse.catch((error) => console.log("Erro ao renderizar um quizz!" + error));
}

function renderizarUmQuizz(response) {
    id = response.data.id;
    titulo = response.data.title;
    banner = response.data.image;
    perguntas = response.data.questions;
    niveis = response.data.levels;

    quantidadePerguntas = perguntas.length;

    document.querySelector(".tela2 .banner h2").innerHTML = titulo;
    document.querySelector(".tela2 .banner img").setAttribute('src', banner);
    perguntas.forEach((pergunta) => {
        const cor = pergunta.color;
        const respostasOrdenadas = pergunta.answers;
        const respostas = respostasOrdenadas.sort(comparador);
        document.querySelector(".tela2 .perguntas ul").innerHTML += `
            <li class="">
                <div class="texto" style="background-color: ${cor}">
                    <h4>${pergunta.title}</h4>
                </div>
                <div class="opcoes"> 
                </div>
            </li>
        `;
        respostas.forEach((resposta) => {
            let corTextoResposta = null;
            if (resposta.isCorrectAnswer) {
                corTextoResposta = "resposta-correta";
            } else {
                corTextoResposta = "resposta-incorreta";
            }
            document.querySelector(".tela2 .perguntas ul li:last-child .opcoes").innerHTML += `
                <div class="opcao" onclick="selecionarOpcao(this, ${resposta.isCorrectAnswer})">
                    <img src="${resposta.image}" alt="Opção de resposta">
                    <p class="${corTextoResposta}">${resposta.text}</p>
                </div>
            `;
        });
    });
}

function selecionarOpcao(opcaoSelecionada, ehRespostaCorreta) {
    
    const caixaDaPergunta = opcaoSelecionada.parentNode.parentNode;
    if (!caixaDaPergunta.classList.contains("respondido")) {
        perguntasRespondidas++;
        if(ehRespostaCorreta){
            quantidadeAcerto++; 
        }
        // console.log("pergun respondidas:" + perguntasRespondidas + "acertos:" + quantidadeAcerto + "qtd pergun:" + quantidadePerguntas);
        caixaDaPergunta.classList.add("respondido")
        const opcoes = caixaDaPergunta.querySelectorAll(".opcao");
        opcoes.forEach((opcao) => {
            opcao.classList.add("opcao-nao-selecionada");
            const textoOpcao = opcao.querySelector("p");
            if (textoOpcao.classList.contains("resposta-correta")) {
                textoOpcao.setAttribute('style', `color: var(--correct-answer);`);
            } else if (textoOpcao.classList.contains("resposta-incorreta")) {
                textoOpcao.setAttribute('style', `color: var(--wrong-answer);`);
            }
        });
        opcaoSelecionada.classList.remove("opcao-nao-selecionada");
        setTimeout(() => {
            const listaLi = [...document.querySelectorAll(".tela2 ul li")];
            const proximoLi = listaLi.indexOf(caixaDaPergunta) + 1;
            if (listaLi.length !== proximoLi) {
                listaLi[proximoLi].scrollIntoView(true); // {block: "start", behavior: "smooth"}
                const scrolledY = window.scrollY;
                window.scroll(0, scrolledY - 110);
            } 
            if(perguntasRespondidas >= quantidadePerguntas) {
                validarQuizz();
                document.querySelector(".tela2 .perguntas ul li:last-child").scrollIntoView(true);
            }
        }, 200); // Trocar para 2s
    }
}

function validarQuizz() {
    const pontuacao = quantidadeAcerto/quantidadePerguntas*100;

    document.querySelector(".tela2 .perguntas ul").innerHTML += `
        <li class="resultado-quizz">
            <div class="texto" style="background-color: red">
                <h4>${pontuacao} de acerto: ${niveis[0].title}</h4>
            </div>
            <img src="${niveis[0].image}" alt="Imagem do nível">
            <h6>${niveis[0].text}</h6>
        </li>
    `;
    console.log("acertos finais:" + quantidadeAcerto);
}

/* CONFIGURAÇÃO DO HTML PARA RENDERIZAR AS PERGUNTAS.


                    <li>
                        <div class="texto"> <!--  -->
                            <h4>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</h4>
                        </div>
                        <div class="opcoes">
                            
                                <div class="opcao" onclick="selecionarOpcao(this)">
                                    <!-- opcao-nao-selecionada -->
                                    <img src="/app/images/selecionar_gato.png" alt="">
                                    <p class="resposta-errada">Gatíneo 1</p>
                                </div>

                                <div class="opcao" onclick="selecionarOpcao(this)">
                                    <img src="/app/images/selecionar_gato.png" alt="">
                                    <p class="resposta-correta">Gatíneo 2</p>
                                </div>
                            
                                <div class="opcao" onclick="selecionarOpcao(this)">
                                    <img src="/app/images/selecionar_gato.png" alt="">
                                    <p>Gatíneo 3</p>
                                </div>

                                <div class="opcao" onclick="selecionarOpcao(this)">
                                    <img src="/app/images/selecionar_gato.png" alt="">
                                    <p>Gatíneo 4</p>
                                </div>
                            
                        </div>
                    </li>








                        <div class="opcao" onclick="selecionarOpcao(this)">
                            <img src="${resposta[0].image}" alt="Resposta 1">
                            <p class="resposta-errada">${resposta[0].text}</p>
                        </div>

                        <div class="opcao" onclick="selecionarOpcao(this)">
                            <img src="${resposta[1].image}" alt="Resposta 2">
                            <p class="${resposta[1].isCorrectAnswe}">${resposta[1].text}</p>
                        </div>
                    
                        <div class="opcao" onclick="selecionarOpcao(this)">
                            <img src="${resposta[0].image}" alt="Resposta 3">
                            <p>${resposta[0].text}</p>
                        </div>

                        <div class="opcao" onclick="selecionarOpcao(this)">
                            <img src="${resposta[1].image}" alt="Resposta 4">
                            <p>${resposta[1].text}</p>
                        </div>







                    <li class="resultado-quizz escondido">
                        <div class="texto" ><!-- style="background-color: ${cor}" -->
                            <h4></h4>
                        </div>
                        <img src="" alt="Imagem do nível">
                        <h6></h6>
                    </li>




*/