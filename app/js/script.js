//############ Links API
const OBTER_QUIZZES = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`;        //GET
const CRIAR_QUIZZES = OBTER_QUIZZES;                                                    //POST
const OBTER_UNICO_QUIZZ = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/`;   //GET
const APAGAR_QUIZZ = OBTER_UNICO_QUIZZ + '/';                                           //DELETE
const EDITAR_QUIZZ = OBTER_UNICO_QUIZZ + '/';                                           //PUT

//############ REGEX
let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
let expresionHex = /^#[0-9a-fA-F]{6}/gi;
let regex = new RegExp(expression);
let regexHex = new RegExp(expresionHex);

//####Variáveis de controle tela 1
let idsGuardados = [];
let meusQuizzes = [];
let todosQuizzes = [];

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
let tipo = null;

//#### Variáveis de controle tela 3
let quizzTela3 = {};
let errosTela3 = [];
let tamanhoPerguntas = null;
let tamanhoNiveis = null;

buscarTodosQuizzes();

function buscarTodosQuizzes() {
    const promisse = axios.get(OBTER_QUIZZES);
    promisse.then(guardarQuizzes);
    promisse.catch((error) => alert("Não foi possível buscar todos os Quizzes!"));
}

function buscarIdsGuardados() {
    const listaSerializada = localStorage.getItem("listaIdQuizzes");
    const lista = JSON.parse(listaSerializada);
    return lista;
}

function guardarQuizzes(response) {
    idsGuardados = null;
    idsGuardados = buscarIdsGuardados();
    meusQuizzes = [];
    todosQuizzes = [];
    if (idsGuardados === null) {
        todosQuizzes = response.data;
        renderizarTela1("SeusQuizzes");
    } else {
        chamarUmQuizz(idsGuardados[0], 0);
        todosQuizzes = response.data.filter((quizz) => {
            if (idsGuardados.indexOf(quizz.id) === -1) {
                return true;
            } else {
                return false;
            }
        });
    }
    renderizarTela1("TodosQuizzes");
}

function renderizarTela1(section) {
    if (section === "SeusQuizzes") {
        if (idsGuardados === null) {
            const elementoFechar = document.querySelector(".tela1 .seus-quizzes-vazio");
            if (elementoFechar.classList.contains("escondido")) {
                elementoFechar.classList.remove("escondido");
            }
            const elementoAbrir = document.querySelector(".tela1 .seus-quizzes-preenchido");
            if (!elementoFechar.classList.contains("escondido")) {
                elementoAbrir.classList.add("escondido");
            }
        } else {
            const elementoFechar = document.querySelector(".tela1 .seus-quizzes-vazio");
            if (!elementoFechar.classList.contains("escondido")) {
                elementoFechar.classList.add("escondido");
            }
            const elementoAbrir = document.querySelector(".tela1 .seus-quizzes-preenchido");
            if (elementoFechar.classList.contains("escondido")) {
                elementoAbrir.classList.remove("escondido");
            }
            const elemento = document.querySelector(".tela1 .seus-quizzes-preenchido .lista-quizzes");
            elemento.innerHTML = '';
            meusQuizzes.forEach((quizz) => {
                elemento.innerHTML += `
                    <article class="quizz size-fixed" data-identifier="quizz-card" onclick="abrirQuizz('SeusQuizzes',${quizz.id})">
                        <img src="${quizz.image}" onerror="imagemNaoCarregou(this)">
                        <div class="gradiente-escurecer"></div>
                        <span>${quizz.title}</span>
                    </article>
                    `
            });
        }
    } else if (section === "TodosQuizzes") {
        const elemento = document.querySelector(".tela1 .todos-quizzes .lista-quizzes");
        elemento.innerHTML = '';
        todosQuizzes.forEach((quizz) => {
            elemento.innerHTML += `
                <article class="quizz size-fixed" data-identifier="quizz-card" onclick="abrirQuizz('TodosQuizzes',${quizz.id})">
                    <img src="${quizz.image}" onerror="imagemNaoCarregou(this)">
                    <div class="gradiente-escurecer"></div>
                    <span>${quizz.title}</span>
                </article>
                `
        });
    }
}

function abrirQuizz(tipoQuizz, id) {
    let quizz = null;
    tipo = tipoQuizz;
    if (tipoQuizz === "SeusQuizzes") {
        quizz = (meusQuizzes.filter((obj) => obj.id === id))[0];
    } else {
        quizz = (todosQuizzes.filter((obj) => obj.id === id))[0];
    }
    renderizarUmQuizz(quizz)
    trocaTela(".tela1", ".tela2");
}

function renderizarTela3(etapa) {
    if (etapa === 1) {
        const elementoLista = document.querySelector('.tela3_2').querySelector('.lista');
        for (let indice = 1; indice <= tamanhoPerguntas; indice++) {
            elementoLista.innerHTML += `
                <article class='pergunta${indice}'>
                    <div class='topo'>
                        <h4>Pergunta ${indice}</h4>
                        <ion-icon class='' onclick='expandirPerguntaTela3(${indice})' data-identifier="expand" name='create-outline'></ion-icon>
                    </div>
                    <div class='perguntas escondido'>
                        <input class='entrada texto-pergunta' data-identifier="question" type='text' placeholder='Texto da pergunta'>
                        <input class='entrada cor-pergunta' data-identifier="question" type='text' placeholder='Cor de fundo da pergunta'>
                        <h4 class='topo'>Resposta correta</h4>
                        <input class='entrada resposta-certa' data-identifier="question" type='text' placeholder='Resposta correta'>
                        <input class='entrada imagem-certa' data-identifier="question" type='text' placeholder='URL da imagem'>
                        <h4 class='topo'>Respostas incorretas</h4>
                        <input class='entrada resposta-errada1' data-identifier="question" type='text' placeholder='Resposta incorreta 1'>
                        <input class='entrada imagem-errada1' data-identifier="question" type='text' placeholder='URL da imagem 1'>
                        <input class='entrada resposta-errada2' data-identifier="question" type='text' placeholder='Resposta incorreta 2'>
                        <input class='entrada imagem-errada2' data-identifier="question" type='text' placeholder='URL da imagem 2'>
                        <input class='entrada resposta-errada3' data-identifier="question" type='text' placeholder='Resposta incorreta 3'>
                        <input class='entrada imagem-errada3' data-identifier="question" type='text' placeholder='URL da imagem 3'>
                    </div>
                </article>`
        }
    } else if (etapa === 2) {
        const elementoLista = document.querySelector('.tela3_3').querySelector('.lista');
        for (let indice = 1; indice <= tamanhoNiveis; indice++) {
            elementoLista.innerHTML += `
                <article class='nivel${indice} '>
                    <div class='topo'>
                        <h4>Nível ${indice}</h4>
                        <ion-icon onclick='expandirNivelTela3(${indice})' data-identifier="expand" class='' name='create-outline'></ion-icon>
                    </div>
                    <div class='infos escondido'>
                        <input class='entrada titulo' data-identifier="level" type='text' placeholder='Título do nível'>
                        <input class='entrada porcentagem' data-identifier="level" type='text' placeholder='% de acerto mínima'>
                        <input class='entrada url-imagem' data-identifier="level" type='text' placeholder='URL da imagem do nível'>
                        <input class='descricao' type='text' data-identifier="level" placeholder='Descrição do nível'>
                    </div>
                </article>`
        }
    } else if (etapa === 3) {
        const elemento = document.querySelector('.tela3_4');
        elemento.innerHTML = `  <div class="scroll-view"></div>
                                <h3>Seu quizz está pronto!</h3>
                                <div class="quizz size-fill">
                                    <img src=${quizzTela3.image}>
                                    <div class="gradiente-escurecer"></div>
                                    <span>${quizzTela3.title}</span>
                                </div>
                                <button onclick="botaoProsseguirTela3(4)">Acessar Quizz</button>
                                <h5 onclick="botaoProsseguirTela3(5)">Voltar pra home</h5>`
    }
}

function expandirPerguntaTela3(indice) {
    const elementoLista = document.querySelector('.tela3_2').querySelector('.lista');
    const artigos = elementoLista.querySelectorAll('article');

    for (let i = 0; i < tamanhoPerguntas; i++) {
        const divClose = artigos[i].querySelector('.perguntas');
        const icone = artigos[i].querySelector('ion-icon');
        if (i + 1 === indice) {
            if (divClose.classList.contains('escondido')) {
                divClose.classList.remove('escondido');
                icone.classList.add('escondido');
            }
        } else {
            if (!divClose.classList.contains('escondido')) {
                divClose.classList.add('escondido');
                icone.classList.remove('escondido');
            }
        }
    }

    const node = artigos[indice - 1].querySelector('h4');
    node.scrollIntoView(true);

    const scrolledY = window.scrollY;
    if (scrolledY) {
        window.scroll(0, scrolledY - 115);
    }
}

function expandirNivelTela3(indice) {
    const elementoLista = document.querySelector('.tela3_3').querySelector('.lista');
    const artigos = elementoLista.querySelectorAll('article');

    for (let i = 0; i < tamanhoNiveis; i++) {
        const divClose = artigos[i].querySelector('.infos');
        const icone = artigos[i].querySelector('ion-icon');
        if (i + 1 === indice) {
            if (divClose.classList.contains('escondido')) {
                divClose.classList.remove('escondido');
                icone.classList.add('escondido');
            }
        } else {
            if (!divClose.classList.contains('escondido')) {
                divClose.classList.add('escondido');
                icone.classList.remove('escondido');
            }
        }
    }

    const node = artigos[indice - 1].querySelector('h4');
    node.scrollIntoView(true);

    const scrolledY = window.scrollY;
    if (scrolledY) {
        window.scroll(0, scrolledY - 115);
    }
}

function trocaTela(telaFechar, telaAbrir) {
    const elementoFechar = document.querySelector(telaFechar);
    const elementoAbrir = document.querySelector(telaAbrir);
    const elementoFoco = document.querySelector(telaAbrir + ' .scroll-view');
    if (!elementoFechar.classList.contains('escondido')) {
        elementoFechar.classList.add('escondido');
    }
    if (elementoAbrir.classList.contains('escondido')) {
        elementoAbrir.classList.remove('escondido');
        elementoFoco.scrollIntoView();
    }
}

function botaoCriarQuizz() {
    limparTela3();
    trocaTela('.tela1', '.tela3');
}

function verificaRegras(etapa) {
    let alertMessage = null;

    switch (etapa) {
        case 1:
            if (!quizzTela3.title) {
                alertMessage = `Insira o título do quizz!`;
                break;
            } else if (quizzTela3.title.length < 20 || quizzTela3.title.length > 65) {
                alertMessage = `O título deve ter no mínimo 20 e no máximo 65 caracteres!`;
                break;
            } else if (!quizzTela3.image) {
                alertMessage = `Insira o URL da imagem do quizz!`;
                break;
            } else if (!quizzTela3.image.match(regex)) {
                alertMessage = `O endereço URL da imagem inserido não é válido!`;
                break;
            } else if (!tamanhoPerguntas) {
                alertMessage = `Insira a quantidade de perguntas!`;
                break;
            } else if (isNaN(tamanhoPerguntas)) {
                alertMessage = `A quantidade de perguntas deve ser um valor numérico!`;
                break;
            } else if (tamanhoPerguntas < 3) {
                alertMessage = `A quantidade mínima de perguntas é 3!`;
                break;
            } else if (!tamanhoNiveis) {
                alertMessage = `Insira a quantidade de níveis!`;
                break;
            } else if (isNaN(tamanhoNiveis)) {
                alertMessage = `A quantidade de níveis deve ser um valor numérico!`;
                break;
            } else if (tamanhoNiveis < 2) {
                alertMessage = `A quantidade mínima de níveis é 2!`;
                break;
            }
            break;
        case 2:
            upperloop: for (let indicePergunta = 0; indicePergunta < quizzTela3.questions.length; indicePergunta++) {
                if (!quizzTela3.questions[indicePergunta].title) {
                    alertMessage = `Insira o título da pergunta ${indicePergunta + 1}!`;
                    break;
                } else if (quizzTela3.questions[indicePergunta].title.length < 20) {
                    alertMessage = `O título da pergunta ${indicePergunta + 1} deve ter no mínimo 20 caracteres!`;
                    break;
                } else if (!quizzTela3.questions[indicePergunta].color) {
                    alertMessage = `Insira a cor pergunta ${indicePergunta + 1}!`;
                    break;
                } else if (!quizzTela3.questions[indicePergunta].color.match(regexHex)) {
                    alertMessage = `A cor pergunta ${indicePergunta + 1} deve ser em formato HEX!`;
                    break;
                } else if (!quizzTela3.questions[indicePergunta].answers[0].text) {
                    alertMessage = `Insira o resposta correta da pergunta ${indicePergunta + 1}!`;
                    break;
                } else if (!quizzTela3.questions[indicePergunta].answers[0].image) {
                    alertMessage = `Insira o URL da imagem da resposta correta da pergunta ${indicePergunta + 1}!`;
                    break;
                } else if (!quizzTela3.questions[indicePergunta].answers[0].image.match(regex)) {
                    alertMessage = `O URL da imagem da resposta correta da pergunta ${indicePergunta + 1} não é válido!`;
                    break;
                } else if (quizzTela3.questions[indicePergunta].answers.length < 2) {
                    alertMessage = `A pergunta ${indicePergunta + 1} deve ter pelo menos 1 resposta incorreta!`;
                    break;
                } else {
                    for (let indiceResposta = 1; indiceResposta < quizzTela3.questions[indicePergunta].answers.length; indiceResposta++) {
                        if (!quizzTela3.questions[indicePergunta].answers[indiceResposta].text) {
                            alertMessage = `Insira o resposta incorreta ${indiceResposta} da pergunta ${indicePergunta + 1}!`;
                            break upperloop;
                        } else if (!quizzTela3.questions[indicePergunta].answers[indiceResposta].image) {
                            alertMessage = `Insira o URL da imagem da resposta incorreta ${indicePergunta} da pergunta ${indicePergunta + 1}!`;
                            break upperloop;
                        } else if (!quizzTela3.questions[indicePergunta].answers[indiceResposta].image.match(regex)) {
                            alertMessage = `O URL da imagem da resposta incorreta ${indicePergunta} da pergunta ${indicePergunta + 1} não é válido!`;
                            break upperloop;
                        }
                    }
                }
            }
            break;
        case 3:
            for (let indiceNivel = 0; indiceNivel < quizzTela3.levels.length; indiceNivel++) {
                if (!quizzTela3.levels[indiceNivel].title) {
                    alertMessage = `Insira o título do nível ${indiceNivel + 1}!`;
                    break;
                } else if (quizzTela3.levels[indiceNivel].title.length < 10) {
                    alertMessage = `O título do nível ${indiceNivel + 1} deve ter no mínimo 10 caracteres!`;
                    break;
                } else if (!quizzTela3.levels[indiceNivel].minValue) {
                    alertMessage = `Insira a porcentagem do nível ${indiceNivel + 1}!`;
                    break;
                } else if (isNaN(quizzTela3.levels[indiceNivel].minValue)) {
                    alertMessage = `A porcentagem do nível ${indiceNivel + 1} deve ser um valor numérico!`;
                    break;
                } else if (quizzTela3.levels[indiceNivel].minValue < 0 || quizzTela3.levels[indiceNivel].minValue > 100) {
                    alertMessage = `A porcentagem do nível ${indiceNivel + 1} não é válido!`;
                    break;
                } else if (!quizzTela3.levels[indiceNivel].image) {
                    alertMessage = `Insira o URL da imagem do nível ${indiceNivel + 1}!`;
                    break;
                } else if (!quizzTela3.levels[indiceNivel].image.match(regex)) {
                    alertMessage = `O URL da imagem do nível ${indiceNivel + 1} não é válido!`;
                    break;
                } else if (!quizzTela3.levels[indiceNivel].text) {
                    alertMessage = `Insira a descrição do nível ${indiceNivel + 1}`;
                    break;
                } else if (quizzTela3.levels[indiceNivel].text.length < 30) {
                    alertMessage = `A descrição do nível ${indiceNivel + 1} deve ter no mínimo 20 caracteres!`;
                    break;
                }
            }
            if (alertMessage === null) {
                for (let indiceNivel = 0; indiceNivel < quizzTela3.levels.length; indiceNivel++) {
                    alertMessage = `Deve existir pelo menos 1 nível com porcentagem 0!`;
                    if (Number(quizzTela3.levels[indiceNivel].minValue) === 0) {
                        alertMessage = null;
                        break;
                    }
                }
            }
            break;
        default:
            return false;
            break;
    }

    if (alertMessage != null) {
        alert(alertMessage);
        if (etapa !== 2) {
            return false;
        }
    }
    else {
        return true
    }
}

function botaoCriarQuizz() {
    trocaTela('.tela1', '.tela3');
}

function validaInputsTela3(etapa) {
    const elementoTela3 = document.querySelector('.tela3');
    switch (etapa) {
        case 1:
            const titulo = elementoTela3.querySelector(`.quizz-titulo`);
            const url_image = elementoTela3.querySelector(`.quizz-imagem`);
            const qtd_perguntas = elementoTela3.querySelector(`.quizz-qtd-perguntas`);
            const qtd_niveis = elementoTela3.querySelector(`.quizz-qtd-niveis`);

            quizzTela3.title = (titulo.value !== '' ? titulo.value : null);
            quizzTela3.image = (url_image.value !== '' ? url_image.value : null);
            tamanhoPerguntas = (qtd_perguntas.value !== '' ? qtd_perguntas.value : null);
            tamanhoNiveis = (qtd_niveis.value !== '' ? qtd_niveis.value : null);
            break;
        case 2:
            const elementosPerguntas = [];
            for (let indicePergunta = 1; indicePergunta <= tamanhoPerguntas; indicePergunta++) {
                const elementoPergunta = elementoTela3.querySelector(`.pergunta${indicePergunta}`);
                elementosPerguntas.push({
                    title: elementoPergunta.querySelector(`.texto-pergunta`),
                    cor: elementoPergunta.querySelector(`.cor-pergunta`)
                })
                elementosPerguntas[indicePergunta - 1].respostas = [];
                elementosPerguntas[indicePergunta - 1].respostas.push({
                    texto: elementoPergunta.querySelector(`.resposta-certa`),
                    imagem: elementoPergunta.querySelector(`.imagem-certa`),
                    correta: true
                });
                for (let indiceResposta = 1; indiceResposta <= 3; indiceResposta++) {
                    elementosPerguntas[indicePergunta - 1].respostas.push({
                        texto: elementoPergunta.querySelector(`.resposta-errada${indiceResposta}`),
                        imagem: elementoPergunta.querySelector(`.imagem-errada${indiceResposta}`),
                        correta: false
                    });
                }
            }
            quizzTela3.questions = [];
            for (let indicePergunta = 1; indicePergunta <= tamanhoPerguntas; indicePergunta++) {
                quizzTela3.questions.push({
                    title: (elementosPerguntas[indicePergunta - 1].title.value !== '' ? elementosPerguntas[indicePergunta - 1].title.value : null),
                    color: (elementosPerguntas[indicePergunta - 1].cor.value !== '' ? elementosPerguntas[indicePergunta - 1].cor.value : null)
                })
                quizzTela3.questions[indicePergunta - 1].answers = [];
                quizzTela3.questions[indicePergunta - 1].answers.push({
                    text: elementosPerguntas[indicePergunta - 1].respostas[0].texto.value !== '' ? elementosPerguntas[indicePergunta - 1].respostas[0].texto.value : null,
                    image: elementosPerguntas[indicePergunta - 1].respostas[0].imagem.value !== '' ? elementosPerguntas[indicePergunta - 1].respostas[0].imagem.value : null,
                    isCorrectAnswer: true
                });
                for (let indiceResposta = 1; indiceResposta <= 3; indiceResposta++) {
                    if (elementosPerguntas[indicePergunta - 1].respostas[indiceResposta].texto.value !== '') {
                        quizzTela3.questions[indicePergunta - 1].answers.push({
                            text: elementosPerguntas[indicePergunta - 1].respostas[indiceResposta].texto.value,
                            image: elementosPerguntas[indicePergunta - 1].respostas[indiceResposta].imagem.value !== '' ? elementosPerguntas[indicePergunta - 1].respostas[indiceResposta].imagem.value : null,
                            isCorrectAnswer: false
                        });
                    }
                }
            }
            break;

        case 3:
            const elementosNiveis = [];
            for (let indiceNivel = 1; indiceNivel <= tamanhoNiveis; indiceNivel++) {
                const elementoNivel = elementoTela3.querySelector(`.nivel${indiceNivel}`);
                elementosNiveis.push({
                    titulo: elementoNivel.querySelector(`.titulo`),
                    porcentagem: elementoNivel.querySelector(`.porcentagem`),
                    imagem: elementoNivel.querySelector(`.url-imagem`),
                    descricao: elementoNivel.querySelector(`.descricao`)
                })
            }
            quizzTela3.levels = [];
            for (let indiceNivel = 0; indiceNivel < tamanhoNiveis; indiceNivel++) {
                quizzTela3.levels.push({
                    title: (elementosNiveis[indiceNivel].titulo.value !== '' ? elementosNiveis[indiceNivel].titulo.value : null),
                    minValue: (elementosNiveis[indiceNivel].porcentagem.value !== '' ? elementosNiveis[indiceNivel].porcentagem.value : null),
                    image: (elementosNiveis[indiceNivel].imagem.value !== '' ? elementosNiveis[indiceNivel].imagem.value : null),
                    text: (elementosNiveis[indiceNivel].descricao.value !== '' ? elementosNiveis[indiceNivel].descricao.value : null)
                })
            }
            break;
        case 4:
            return true;
            break;
        case 5:
            return true;
            break;
        default:
            return false;
            break;
    }
    if (verificaRegras(etapa)) {
        return true;
    } else {
        return false;
    }
}

function limparTela3() {
    const elementoTela3 = document.querySelector('.tela3');
    const titulo = elementoTela3.querySelector(`.quizz-titulo`);
    const url_image = elementoTela3.querySelector(`.quizz-imagem`);
    const questions = elementoTela3.querySelector(`.quizz-qtd-perguntas`);
    const qtd_niveis = elementoTela3.querySelector(`.quizz-qtd-niveis`);
    const lista_perguntas = elementoTela3.querySelector(`.tela3_2`).querySelector(`.lista`);
    const lista_niveis = elementoTela3.querySelector(`.tela3_3`).querySelector(`.lista`);

    titulo.value = ``;
    url_image.value = ``;
    questions.value = ``;
    qtd_niveis.value = ``;
    lista_perguntas.innerHTML = ``;
    lista_niveis.innerHTML = ``;
}

function botaoProsseguirTela3(etapa) {
    if (validaInputsTela3(etapa)) {
        switch (etapa) {
            case 1:
                renderizarTela3(1);
                trocaTela('.tela3_1', '.tela3_2');
                break;

            case 2:
                renderizarTela3(2);
                trocaTela('.tela3_2', '.tela3_3');
                break;

            case 3:
                criarQuizz(quizzTela3);
                break;

            case 4:
                tipo = "SeusQuizzes";
                renderizarUmQuizz(quizzTela3);
                trocaTela('.tela3', '.tela2');
                trocaTela('.tela3_4', '.tela3_1');
                limparTela3();
                apagarQuizzTela3();
                break;

            case 5:
                buscarTodosQuizzes();
                trocaTela('.tela3', '.tela1');
                trocaTela('.tela3_4', '.tela3_1');
                limparTela3();
                apagarQuizzTela3();
                break;

            default:
                return;
                break;
        }
    }
}

function apagarQuizzTela3() {
    quizzTela3 = {};
    errosTela3 = [];
    tamanhoPerguntas = null;
    tamanhoNiveis = null;
}

function comparador() {
    return Math.random() - 0.5;
}

function chamarUmQuizz(id, indice) {
    const promisse = axios.get(OBTER_UNICO_QUIZZ + id);
    promisse.then((response) => {
        meusQuizzes.push(response.data);
        if (indice === idsGuardados.length - 1) {
            renderizarTela1("SeusQuizzes");
        } else {
            indice++;
            chamarUmQuizz(idsGuardados[indice], indice);
        }
    });
    promisse.catch((error) => {
        console.log("Erro ao renderizar um quizz!" + error);
    });
}

function renderizarUmQuizz(response) {
    id = response.id;
    titulo = response.title;
    banner = response.image;
    perguntas = response.questions;
    niveis = response.levels;
    quantidadePerguntas = perguntas.length;
    document.querySelector(".tela2 .banner h2").innerHTML = titulo;
    document.querySelector(".tela2 .banner img").setAttribute('src', banner);
    perguntas.forEach((pergunta) => {
        const cor = pergunta.color;
        const respostasOrdenadas = pergunta.answers;
        const respostas = respostasOrdenadas.sort(comparador);
        document.querySelector(".tela2 .perguntas ul").innerHTML += `
            <li class="" data-identifier="question">
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
                <div class="opcao" onclick="selecionarOpcao(this, ${resposta.isCorrectAnswer})" data-identifier="answer">
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
        if (ehRespostaCorreta) {
            quantidadeAcerto++;
        }
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
            if (perguntasRespondidas >= quantidadePerguntas) {
                validarQuizz();
                document.querySelector(".tela2 .reiniciar-voltar").classList.remove("escondido");
                document.querySelector(".tela2 .perguntas ul li:last-child").scrollIntoView({ block: "center", behavior: "smooth" });
            } else {
                document.querySelector(`.tela2 .perguntas ul li:nth-child(${perguntasRespondidas + 1}) `).scrollIntoView({ block: "center", behavior: "smooth" });
            }
        }, 2000);
    }
}

function validarQuizz() {
    const pontuacao = Math.round(quantidadeAcerto / quantidadePerguntas * 100);
    let nivelFinal = 0;
    for (let i = 0; i < niveis.length; i++) {
        if (pontuacao >= niveis[i].minValue) {
            nivelFinal = niveis[i];
        }
    }
    document.querySelector(".tela2 .perguntas ul").innerHTML += `
        <li class="resultado-quizz" data-identifier="quizz-result">
            <div class="texto" style="background-color: red">
                <h4>${pontuacao}% de acerto: ${nivelFinal.title}</h4>
            </div>
            <div>
                <img src="${nivelFinal.image}" alt="Imagem do nível">
                <h6>${nivelFinal.text}</h6>
            </div>   
        </li>
    `;
}

function reiniciarVarGlobais(home) {
    quantidadePerguntas = 0;
    perguntasRespondidas = 0;
    quantidadeAcerto = 0;
    nivel = null;
    if (home === true) {
        id = null;
        tipo = null;
    }
    titulo = null;
    banner = null;
    perguntas = null;
    niveis = null;
}

function reiniciarInnerHtml() {
    document.querySelector(".tela2 .banner h2").innerHTML = "";
    document.querySelector(".tela2 .banner img").setAttribute('src', "");
    document.querySelector(".tela2 .perguntas ul").innerHTML = "";
}

function reiniciarQuizz() {
    document.querySelector(".tela2 .reiniciar-voltar").classList.add("escondido");
    reiniciarVarGlobais(false);
    reiniciarInnerHtml();

    let quizz = null;
    if (tipo === "SeusQuizzes") {
        quizz = (meusQuizzes.filter((obj) => obj.id === id))[0];
    } else {
        quizz = (todosQuizzes.filter((obj) => obj.id === id))[0];
    }
    renderizarUmQuizz(quizz);
}

function voltarParaHome() {
    buscarTodosQuizzes();
    document.querySelector(".tela2 .reiniciar-voltar").classList.add("escondido");
    reiniciarVarGlobais(true);
    reiniciarInnerHtml();
    trocaTela('.tela2', '.tela1');
}

function imagemNaoCarregou(img) {
    img.src = "https://rockcontent.com/wp-content/uploads/2021/02/stage-en-error-1020-1024x682.png.webp";
}

function salvarIdQuizzStorage(id) {
    const listaAntigaSerializada = localStorage.getItem("listaIdQuizzes");
    let listaDeserializada = [];
    if (listaAntigaSerializada) {
        listaDeserializada = JSON.parse(listaAntigaSerializada);
        localStorage.removeItem("listaIdQuizzes");
    }

    listaDeserializada.push(id);
    const listaSerializada = JSON.stringify(listaDeserializada);
    localStorage.setItem("listaIdQuizzes", listaSerializada);
}

function criarQuizz() {
    const promisse = axios.post(CRIAR_QUIZZES, quizzTela3);
    promisse.then((response) => {
        quizzTela3.id = response.data.id;
        salvarIdQuizzStorage(response.data.id);
        renderizarTela3(3);
        console.log(quizzTela3);
        trocaTela('.tela3_3', '.tela3_4');
    });
    promisse.catch((erro) => {
        alert("Não foi possível criar o quizz!" + erro);
    });
}