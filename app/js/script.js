const OBTER_QUIZZES = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"; //GET
const CRIAR_QUIZZES = OBTER_QUIZZES; //POST
const OBTER_UNICO_QUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/"; //GET
const APAGAR_QUIZZ = OBTER_UNICO_QUIZZ; //DELETE
const EDITAR_QUIZZ = OBTER_UNICO_QUIZZ; //PUT

function chamarUmQuizz(id){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + id); 
    promisse.then(renderizarUmQuizz);
    // promisse.then((response) => {
    //     console.log(response.data);

    // });
    // promisse.catch();
}

function renderizarUmQuizz(response){
    const id = response.data.id;
    const titulo = response.data.title;
    const banner = response.data.image;
    const perguntas = response.data.questions;
    const niveis = response.data.levels

    console.log(titulo + banner + id + perguntas + niveis);
}

function selecionarOpcao(opcaoSelecionada){
    const caixaDaPergunta = opcaoSelecionada.parentNode.parentNode.parentNode;
    if(!caixaDaPergunta.classList.contains("respondido")){
        caixaDaPergunta.classList.add("respondido")
        const opcoes = caixaDaPergunta.querySelectorAll(".opcao");
        opcoes.forEach((opcoes) => {
        opcoes.classList.add("opcao-nao-selecionada");
        });
        opcaoSelecionada.classList.remove("opcao-nao-selecionada");
        verificarResposta(opcaoSelecionada);
    }
}

function verificarResposta(opcaoSelecionada){
    // if(){

    // }
}

chamarUmQuizz("4368");