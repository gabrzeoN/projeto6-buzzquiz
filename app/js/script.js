//#### Links API
const OBTER_QUIZZES = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";        //GET
const CRIAR_QUIZZES = OBTER_QUIZZES;                                                    //POST
const OBTER_UNICO_QUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/";   //GET
const APAGAR_QUIZZ = OBTER_UNICO_QUIZZ;                                                 //DELETE
const EDITAR_QUIZZ = OBTER_UNICO_QUIZZ;                                                 //PUT

//#### Variáveis de controle tela 2
let quantidadePerguntas = null;
let nivel = null;


chamarUmQuizz("4368");

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
    const id = response.data.id;
    const titulo = response.data.title;
    const banner = response.data.image;
    const perguntas = response.data.questions;
    const niveis = response.data.levels;

    quantidadePerguntas = perguntas.length;
    // console.log(quantidadePerguntas);

    document.querySelector(".tela2 .banner h2").innerHTML = titulo;
    document.querySelector(".tela2 .banner img").setAttribute('src', banner);
    perguntas.forEach((pergunta) => {
        const cor = pergunta.color;
        const respostasOrdenadas = pergunta.answers;
        const respostas = respostasOrdenadas.sort(comparador);
        console.log(respostas);
        document.querySelector(".tela2 .perguntas ul").innerHTML += `
            <li>
                <div class="texto" style="background-color: ${cor}">
                    <h4>${pergunta.title}</h4>
                </div>
                <div class="opcoes"> 
                </div>
            </li>
        `;
        respostas.forEach((resposta) => {
            let corTextoResposta = null;
            if(resposta.isCorrectAnswer){
                corTextoResposta = "resposta-correta";
            }else{
                corTextoResposta = "resposta-incorreta";
            }
            document.querySelector(".tela2 .perguntas ul li:last-child .opcoes").innerHTML += `
                <div class="opcao" onclick="selecionarOpcao(this)">
                    <img src="${resposta.image}" alt="Opção de resposta">
                    <p class="${corTextoResposta}">${resposta.text}</p>
                </div>
            `;
        });
    });
    // console.log(titulo + banner + id + perguntas + niveis);
}

function selecionarOpcao(opcaoSelecionada) {
    const caixaDaPergunta = opcaoSelecionada.parentNode.parentNode;
    if (!caixaDaPergunta.classList.contains("respondido")) {
        caixaDaPergunta.classList.add("respondido")
        const opcoes = caixaDaPergunta.querySelectorAll(".opcao");
        opcoes.forEach((opcao) => {
            opcao.classList.add("opcao-nao-selecionada");
            const textoOpcao = opcao.querySelector("p");
            if(textoOpcao.classList.contains("resposta-correta")){
                textoOpcao.setAttribute('style', `color: var(--correct-answer);`);
            }else if(textoOpcao.classList.contains("resposta-incorreta")){
                textoOpcao.setAttribute('style', `color: var(--wrong-answer);`);
            }
        });
        opcaoSelecionada.classList.remove("opcao-nao-selecionada");
        setTimeout(rolarParaBaixo, 1000);
    }
}

function rolarParaBaixo(quantidadePerguntas) {
    document.querySelector();
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




*/