//############ Links API
const OBTER_QUIZZES = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`;        //GET
const CRIAR_QUIZZES = OBTER_QUIZZES;                                                    //POST
const OBTER_UNICO_QUIZZ = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/`;   //GET
const APAGAR_QUIZZ = OBTER_UNICO_QUIZZ;                                                 //DELETE
const EDITAR_QUIZZ = OBTER_UNICO_QUIZZ;                                                 //PUT

//############ REGEX
let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
let expresionHex = /^#[0-9a-fA-F]{6}/gi;
let regex = new RegExp(expression);
let regexHex = new RegExp(expresionHex);

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

//Variáveis de controle tela 2
let quizzTela3 = {};
let errosTela3 = [];

//Executando
chamarUmQuizz("4369");
quizzTela3 = { url_image: "https://www.getsview.com/wp-content/uploads/2020/08/Learn-Programing-For-Free-With-An-Android-Device.jpg", titulo: "Qual liguagem de programação foi feita para você?" };
renderizarTela3(3);

//############ FUNÇÕES
function renderizarTela3(etapa) {
    if (etapa === 1) {
        const elementoLista = document.querySelector('.tela3_2').querySelector('.lista');

        for (let indice = 1; indice <= quizzTela3.qtd_perguntas; indice++) {
            elementoLista.innerHTML += `
                <article class='pergunta${indice}'>
                    <div class='topo'>
                        <h4>Pergunta ${indice}</h4>
                        <ion-icon class='' onclick='expandirPerguntaTela3(${indice})' name='create - outline'></ion-icon>
                    </div>
                    <div class='perguntas escondido'>
                        <input class='entrada texto - pergunta' type='text' placeholder='Texto da pergunta'>
                        <input class='entrada cor - pergunta' type='text' placeholder='Cor de fundo da pergunta'>
                        <h4 class='topo'>Resposta correta</h4>
                        <input class='entrada resposta - certa' type='text' placeholder='Resposta correta'>
                        <input class='entrada imagem - certa' type='text' placeholder='URL da imagem'>
                        <h4 class='topo'>Respostas incorretas</h4>
                        <input class='entrada resposta - errada1' type='text' placeholder='Resposta incorreta 1'>
                        <input class='entrada imagem - errada1' type='text' placeholder='URL da imagem'>
                        <input class='entrada resposta - errada2' type='text' placeholder='Resposta incorreta2'>
                        <input class='entrada imagem - errada2' type='text' placeholder='URL da imagem'>
                        <input class='entrada resposta - errada3'  type='text' placeholder='Resposta incorreta3'>
                        <input class='entrada imagem - errada3' type='text' placeholder='URL da imagem'>
                    </div>
                </article>`
        }
    } else if (etapa === 2) {
        const elementoLista = document.querySelector('.tela3_3').querySelector('.lista');

        for (let indice = 1; indice <= quizzTela3.qtd_niveis; indice++) {
            elementoLista.innerHTML += `
                <article class='nivel${indice} '>
                    <div class='topo'>
                        <h4>Nível ${indice}</h4>
                        <ion-icon onclick='expandirNivelTela3(${indice})' class='' name='create-outline'></ion-icon>
                    </div>
                    <div class='infos escondido'>
                        <input class='entrada titulo' type='text' placeholder='Título do nível'>
                        <input class='entrada porcentagem' type='text' placeholder=' % de acerto mínima'>
                        <input class='entrada url-imagem' type='text' placeholder='URL da imagem do nível'>
                        <input class='descricao' type='text' placeholder='Descrição do nível'>
                    </div>
                </article>`
        }
    } else if (etapa === 3) {
        const elemento = document.querySelector('.tela3_4');

        elemento.innerHTML = `  <div class="scroll-view"></div>
                                <h3>Seu quizz está pronto!</h3>
                                <div class="quizz size-fill">
                                    <img src=${quizzTela3.url_image}>
                                    <div class="gradiente-escurecer"></div>
                                    <span>${quizzTela3.titulo}</span>
                                </div>
                                <button onclick="botaoProsseguirTela3(4)">Acessar Quizz</button>
                                <h5 onclick="botaoProsseguirTela3(5)">Voltar pra home</h5>`
    }
}

function expandirPerguntaTela3(indice) {
    const elementoLista = document.querySelector('.tela3_2').querySelector('.lista');
    const artigos = elementoLista.querySelectorAll('article');

    for (let i = 0; i < quizzTela3.qtd_perguntas; i++) {
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

    for (let i = 0; i < quizzTela3.qtd_niveis; i++) {
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
            if (!quizzTela3.titulo) {
                alertMessage = `Insira o título do quizz!`;
                break;
            } else if (quizzTela3.titulo.length < 20 || quizzTela3.titulo.length > 65) {
                alertMessage = `O título deve ter no mínimo 20 e no máximo 65 caracteres!`;
                break;
            } else if (!quizzTela3.url_imagem) {
                alertMessage = `Insira o URL da imagem do quizz!`;
                break;
            } else if (!quizzTela3.url_imagem.match(regex)) {
                alertMessage = `O endereço URL da imagem inserido não é válido!`;
                break;
            } else if (!quizzTela3.qtd_perguntas) {
                alertMessage = `Insira a quantidade de perguntas!`;
                break;
            } else if (isNaN(quizzTela3.qtd_perguntas)) {
                alertMessage = `A quantidade de perguntas deve ser um valor numérico!`;
                break;
            } else if (quizzTela3.qtd_perguntas < 3) {
                alertMessage = `A quantidade mínima de perguntas é 3!`;
                break;
            } else if (!quizzTela3.qtd_niveis) {
                alertMessage = `Insira a quantidade de níveis!`;
                break;
            } else if (isNaN(quizzTela3.qtd_niveis)) {
                alertMessage = `A quantidade de níveis deve ser um valor numérico!`;
                break;
            } else if (quizzTela3.qtd_niveis < 2) {
                alertMessage = `A quantidade mínima de níveis é 2!`;
                break;
            }
            break;

        case 2:
            upperloop: for (let indicePergunta = 0; indicePergunta < quizzTela3.perguntas.length; indicePergunta++) {
                if (!quizzTela3.perguntas[indicePergunta].titulo) {
                    alertMessage = `Insira o título da pergunta ${indicePergunta + 1}!`;
                    break;
                } else if (quizzTela3.perguntas[indicePergunta].titulo.length < 20) {
                    alertMessage = `O título da pergunta ${indicePergunta + 1} deve ter no mínimo 20 caracteres!`;
                    break;
                } else if (!quizzTela3.perguntas[indicePergunta].cor) {
                    alertMessage = `Insira a cor pergunta ${indicePergunta + 1}!`;
                    break;
                } else if (!quizzTela3.perguntas[indicePergunta].cor.match(regexHex)) {
                    alertMessage = `A cor pergunta ${indicePergunta + 1} deve ser em formato HEX!`;
                    break;
                } else if (!quizzTela3.perguntas[indicePergunta].respostas[0].texto) {
                    alertMessage = `Insira o resposta correta da pergunta ${indicePergunta + 1}!`;
                    break;
                } else if (!quizzTela3.perguntas[indicePergunta].respostas[0].imagem) {
                    alertMessage = `Insira o URL da imagem da resposta correta da pergunta ${indicePergunta + 1}!`;
                    break;
                } else if (!quizzTela3.perguntas[indicePergunta].respostas[0].imagem.match(regex)) {
                    alertMessage = `O URL da imagem da resposta correta da pergunta ${indicePergunta + 1} não é válido!`;
                    break;
                } else if (quizzTela3.perguntas[indicePergunta].respostas.length < 2) {
                    alertMessage = `A pergunta ${indicePergunta + 1} deve ter pelo menos 1 resposta incorreta!`;
                    break;
                } else {
                    for (let indiceResposta = 1; indiceResposta < quizzTela3.perguntas[indicePergunta].respostas.length; indiceResposta++) {
                        if (!quizzTela3.perguntas[indicePergunta].respostas[indiceResposta].texto) {
                            alertMessage = `Insira o resposta incorreta ${indiceResposta} da pergunta ${indicePergunta + 1}!`;
                            break upperloop;
                        } else if (!quizzTela3.perguntas[indicePergunta].respostas[indiceResposta].imagem) {
                            alertMessage = `Insira o URL da imagem da resposta incorreta ${indicePergunta} da pergunta ${indicePergunta + 1}!`;
                            break upperloop;
                        } else if (!quizzTela3.perguntas[indicePergunta].respostas[indiceResposta].imagem.match(regex)) {
                            alertMessage = `O URL da imagem da resposta incorreta ${indicePergunta} da pergunta ${indicePergunta + 1} não é válido!`;
                            break upperloop;
                        }
                    }
                }
            }
            break;

        case 3:
            for (let indiceNivel = 0; indiceNivel < quizzTela3.niveis.length; indiceNivel++) {
                if (!quizzTela3.niveis[indiceNivel].titulo) {
                    alertMessage = `Insira o título do nível ${indiceNivel + 1}!`;
                    break;
                } else if (quizzTela3.niveis[indiceNivel].titulo.length < 10) {
                    alertMessage = `O título do nível ${indiceNivel + 1} deve ter no mínimo 10 caracteres!`;
                    break;
                } else if (!quizzTela3.niveis[indiceNivel].porcentagem) {
                    alertMessage = `Insira a porcentagem do nível ${indiceNivel + 1}!`;
                    break;
                } else if (isNaN(quizzTela3.niveis[indiceNivel].porcentagem)) {
                    alertMessage = `A porcentagem do nível ${indiceNivel + 1} deve ser um valor numérico!`;
                    break;
                } else if (quizzTela3.niveis[indiceNivel].porcentagem < 0 || quizzTela3.niveis[indiceNivel].porcentagem > 100) {
                    alertMessage = `A porcentagem do nível ${indiceNivel + 1} não é válido!`;
                    break;
                } else if (!quizzTela3.niveis[indiceNivel].imagem) {
                    alertMessage = `Insira o URL da imagem do nível ${indiceNivel + 1}!`;
                    break;
                } else if (!quizzTela3.niveis[indiceNivel].imagem.match(regex)) {
                    alertMessage = `O URL da imagem do nível ${indiceNivel + 1} não é válido!`;
                    break;
                } else if (!quizzTela3.niveis[indiceNivel].descricao) {
                    alertMessage = `Insira a descrição do nível ${indiceNivel + 1}`;
                    break;
                } else if (quizzTela3.niveis[indiceNivel].descricao.length < 30) {
                    alertMessage = `A descrição do nível ${indiceNivel + 1} deve ter no mínimo 20 caracteres!`;
                    break;
                }
            }
            if (alertMessage === null) {
                for (let indiceNivel = 0; indiceNivel < quizzTela3.niveis.length; indiceNivel++) {
                    alertMessage = `Deve existir pelo menos 1 nível com porcentagem 0!`;
                    if (Number(quizzTela3.niveis[indiceNivel].porcentagem) === 0) {
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
        return false;
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

            quizzTela3.titulo = (titulo.value !== '' ? titulo.value : null);
            quizzTela3.url_imagem = (url_image.value !== '' ? url_image.value : null);
            quizzTela3.qtd_perguntas = (qtd_perguntas.value !== '' ? qtd_perguntas.value : null);
            quizzTela3.qtd_niveis = (qtd_niveis.value !== '' ? qtd_niveis.value : null);
            break;

        case 2:
            const elementosPerguntas = [];
            for (let indicePergunta = 1; indicePergunta <= quizzTela3.qtd_perguntas; indicePergunta++) {
                const elementoPergunta = elementoTela3.querySelector(`.pergunta${indicePergunta}`);


                elementosPerguntas.push({
                    titulo: elementoPergunta.querySelector(`.texto-pergunta`),
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
            quizzTela3.perguntas = [];
            for (let indicePergunta = 1; indicePergunta <= quizzTela3.qtd_perguntas; indicePergunta++) {

                quizzTela3.perguntas.push({
                    titulo: (elementosPerguntas[indicePergunta - 1].titulo.value !== '' ? elementosPerguntas[indicePergunta - 1].titulo.value : null),
                    cor: (elementosPerguntas[indicePergunta - 1].cor.value !== '' ? elementosPerguntas[indicePergunta - 1].cor.value : null)
                })

                quizzTela3.perguntas[indicePergunta - 1].respostas = [];
                quizzTela3.perguntas[indicePergunta - 1].respostas.push({
                    texto: elementosPerguntas[indicePergunta - 1].respostas[0].texto.value !== '' ? elementosPerguntas[indicePergunta - 1].respostas[0].texto.value : null,
                    imagem: elementosPerguntas[indicePergunta - 1].respostas[0].imagem.value !== '' ? elementosPerguntas[indicePergunta - 1].respostas[0].imagem.value : null,
                    correta: true
                });

                for (let indiceResposta = 1; indiceResposta <= 3; indiceResposta++) {
                    if (elementosPerguntas[indicePergunta - 1].respostas[indiceResposta].texto.value !== '') {
                        quizzTela3.perguntas[indicePergunta - 1].respostas.push({
                            texto: elementosPerguntas[indicePergunta - 1].respostas[indiceResposta].texto.value,
                            imagem: elementosPerguntas[indicePergunta - 1].respostas[indiceResposta].imagem.value !== '' ? elementosPerguntas[indicePergunta - 1].respostas[indiceResposta].imagem.value : null,
                            correta: false
                        });
                    }
                }
            }
            break;

        case 3:
            const elementosNiveis = [];
            for (let indiceNivel = 1; indiceNivel <= quizzTela3.qtd_niveis; indiceNivel++) {
                const elementoNivel = elementoTela3.querySelector(`.nivel${indiceNivel}`);

                elementosNiveis.push({
                    titulo: elementoNivel.querySelector(`.titulo`),
                    porcentagem: elementoNivel.querySelector(`.porcentagem`),
                    imagem: elementoNivel.querySelector(`.url-imagem`),
                    descricao: elementoNivel.querySelector(`.descricao`)
                })

            }
            quizzTela3.niveis = [];
            for (let indiceNivel = 0; indiceNivel < quizzTela3.qtd_niveis; indiceNivel++) {

                quizzTela3.niveis.push({
                    titulo: (elementosNiveis[indiceNivel].titulo.value !== '' ? elementosNiveis[indiceNivel].titulo.value : null),
                    porcentagem: (elementosNiveis[indiceNivel].porcentagem.value !== '' ? elementosNiveis[indiceNivel].porcentagem.value : null),
                    imagem: (elementosNiveis[indiceNivel].imagem.value !== '' ? elementosNiveis[indiceNivel].imagem.value : null),
                    descricao: (elementosNiveis[indiceNivel].descricao.value !== '' ? elementosNiveis[indiceNivel].descricao.value : null)
                })

            }
            console.log(quizzTela3);
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
    const qtd_perguntas = elementoTela3.querySelector(`.quizz-qtd-perguntas`);
    const qtd_niveis = elementoTela3.querySelector(`.quizz-qtd-niveis`);
    const lista_perguntas = elementoTela3.querySelector(`.tela3_2`).querySelector(`.lista`);
    const lista_niveis = elementoTela3.querySelector(`.tela3_3`).querySelector(`.lista`);

    titulo.value = ``;
    url_image.value = ``;
    qtd_perguntas.value = ``;
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
                // CRIA QUIZZ
                renderizarTela3(3);
                trocaTela('.tela3_3', '.tela3_4');
                break;

            case 4:
                // JOGAR QUIZZ DA TELA 3 NA TELA 2
                trocaTela('.tela3', '.tela2');
                trocaTela('.tela3_4', '.tela3_1');
                limparTela3();
                apagarQuizzTela3();
                break;

            case 5:
                // ATUALIZAR TELA 1
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
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/` + id);
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
        if (ehRespostaCorreta) {
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
            if (perguntasRespondidas >= quantidadePerguntas) {
                validarQuizz();
                document.querySelector(".tela2 .perguntas ul li:last-child").scrollIntoView(true);
            }
        }, 200); // Trocar para 2s
    }
}

function validarQuizz() {
    const pontuacao = quantidadeAcerto / quantidadePerguntas * 100;

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