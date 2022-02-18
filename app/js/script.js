//#### Links API

const OBTER_QUIZZES = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";        //GET
const CRIAR_QUIZZES = OBTER_QUIZZES;                                                    //POST
const OBTER_UNICO_QUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/";   //GET
const APAGAR_QUIZZ = OBTER_UNICO_QUIZZ;                                                 //DELETE
const EDITAR_QUIZZ = OBTER_UNICO_QUIZZ;                                                 //PUT


//#### FUNÇÕES

function trocaTela(telaFechar,telaAbrir){
    const elementoFechar = document.querySelector(telaFechar);
    const elementoAbrir = document.querySelector(telaAbrir);
    const elementoFoco = document.querySelector('.scroll-view');

    if(!elementoFechar.classList.contains('escondido')){
        elementoFechar.classList.add('escondido');
    }
    if(elementoAbrir.classList.contains('escondido')){
        elementoAbrir.classList.remove('escondido');
    }

    elementoFoco.scrollIntoView();
}

function botaoCriarQuizz(){
    trocaTela('.tela1','.tela3');
}

function validaInputsTela3(etapa){

}

function botaoProsseguirTela3(etapa){
    let telaAbrir = null;
    let telaFechar = null;

    if(etapa === 1){
        telaAbrir = '.tela3_2';
        telaFechar = '.tela3_1';
    }else if(etapa === 2){
        telaAbrir = '.tela3_3';
        telaFechar = '.tela3_2';
    }else if(etapa === 3){
        telaAbrir = '.tela3_4';
        telaFechar = '.tela3_3';
    }else{
        telaAbrir = '.tela3';
        telaFechar = '.tela2';
    }

    trocaTela(telaFechar,telaAbrir);
}