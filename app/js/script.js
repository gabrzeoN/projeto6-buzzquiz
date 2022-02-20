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

//Variáveis
let quizzTela3 = {};
let errosTela3 = [];

//Executando
chamarUmQuizz('4368');
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

    if (elementoFechar !== null && !elementoFechar.classList.contains('escondido')) {
        elementoFechar.classList.add('escondido');
    }
    if (elementoAbrir !== null && elementoAbrir.classList.contains('escondido')) {
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

function chamarUmQuizz(id) {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/` + id);
    promisse.then(renderizarUmQuizz);
    // promisse.then((response) => {
    //     console.log(response.data);

    // });
    // promisse.catch();
}

function renderizarUmQuizz(response) {
    const id = response.data.id;
    const titulo = response.data.title;
    const banner = response.data.image;
    const perguntas = response.data.questions;
    const niveis = response.data.levels

    console.log(titulo + banner + id + perguntas + niveis);
}

function selecionarOpcao(opcaoSelecionada) {
    const caixaDaPergunta = opcaoSelecionada.parentNode.parentNode.parentNode;
    if (!caixaDaPergunta.classList.contains(`respondido`)) {
        caixaDaPergunta.classList.add(`respondido`)
        const opcoes = caixaDaPergunta.querySelectorAll(`.opcao`);
        opcoes.forEach((opcoes) => {
            opcoes.classList.add(`opcao-nao-selecionada`);
        });
        opcaoSelecionada.classList.remove(`opcao-nao-selecionada`);
        verificarResposta(opcaoSelecionada);
    }
}

function verificarResposta(opcaoSelecionada) {
    // if(){

    // }
}