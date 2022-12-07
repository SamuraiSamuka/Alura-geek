import { comportamentos } from "./Comportamentos.js"
import { imprimeProdutos } from "./insereProdutos.js"

let cabecalho = document.querySelectorAll("#cabecalho")
let banner = document.querySelectorAll('#banner')
let login = document.querySelectorAll('#login')
let novoProduto = document.querySelectorAll('#novo-produto')
let produtoDetalhes = document.querySelectorAll("#produto-detalhes")
let todosProdutos = document.querySelectorAll("#todos-produtos")
let secaoProdutos = document.querySelectorAll("#secao-produtos")
let rodape = document.querySelectorAll("#rodape")

async function preencheComponente(componentes, classes, comportamento) {
    if (componentes.length > 0) {
        const html = await fetch(`../components/${componentes[0].id}.html`)
        const dados = await html.text()

        componentes.forEach((componenteAtual, indice) => {
            componenteAtual.innerHTML = dados;
            componenteAtual.classList = "";
            classes.forEach(classe => {
                componenteAtual.classList.add(classe)
            })

            const categoriaContainer = componenteAtual.getAttribute('data-categoria')
            if (!!categoriaContainer) {
                const corpo = componenteAtual.querySelector('[data-container]')
                corpo.setAttribute("data-categoria", categoriaContainer)
                componenteAtual.querySelector('#titulo').innerHTML = componenteAtual.getAttribute("data-titulo")
            }

            insereCSSLink(componenteAtual.id)

            if (!!comportamento) {
                comportamento(indice)
            }
        })
    }
}

function insereCSSLink(nomeArquivo) {
    const css = document.createElement('link')
    css.setAttribute("rel", "stylesheet")
    css.setAttribute("href", `../components/${nomeArquivo}.css`)
    document.head.appendChild(css)
}

preencheComponente(cabecalho, ["cabecalho", "container"], () => { 
    comportamentos.pesquisaProdutos();
    comportamentos.botaoPesquisaMobile(); })
preencheComponente(banner, ["banner", "container"])
preencheComponente(login, ["formulario", "login"])
preencheComponente(novoProduto, ["novo-produto"], () => { 
    comportamentos.cadastroProduto() })
preencheComponente(produtoDetalhes, ["produto-detalhes"], () => { 
    comportamentos.produtoDetalhes() })
preencheComponente(todosProdutos, ["todos-produtos"], () => { 
    imprimeProdutos.buscaProdutos();
    comportamentos.dropdown(); })
preencheComponente(secaoProdutos, ["secao-produtos"], (indice) => { 
    imprimeProdutos.buscaProdutos(indice) })
preencheComponente(rodape, ["rodape"])

export default preencheComponente