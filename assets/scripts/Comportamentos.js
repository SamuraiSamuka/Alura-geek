import { conectaAPI } from "./ConectaAPI.js";
import { imprimeProdutos } from "./insereProdutos.js"

function pesquisaProdutos(){
    const input = document.querySelector('#inputBusca')
    const resultados = document.querySelector('#resultados')

    input.oninput = async (evento) => {
        const termoPesquisa = input.value
        if(termoPesquisa.length > 1){

            resultados.innerHTML = ""

            const resultadosPesquisa = await conectaAPI.queryProduto(termoPesquisa)
            await resultadosPesquisa.forEach(item => {

                const resultado = document.createElement("a")
                resultado.innerHTML = item.nome
                resultado.setAttribute('href',`../Pages/Produto_detalhes.html?id='${item.id}'`)
                resultados.appendChild(resultado)
            });
        } else {
            resultados.innerHTML = ""
        }
    }
}

function botaoPesquisaMobile(){
    const botao = document.querySelector('#lupaPesquisa')
    botao.onclick = () => {
        console.log("click")
    }
}

async function produtoDetalhes() {
    const produtoId = location.search.split("%27")[1]
    const dadosProduto = await conectaAPI.getProduto(produtoId)
    const produtoVazio = document.querySelector("#produto-detalhes")
    imprimeProdutos.insereInfo(produtoVazio, dadosProduto)
}

function cadastroProduto(){
    let formulario = document.querySelector("#novo-produto");
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault()
        const produtoNome = evento.target.elements["novo-produto__nome"]
        const produtoPreco = evento.target.elements["novo-produto__preco"]
        const produtoCategoria = evento.target.elements["novo-produto__categoria"]
        const produtoUrlImagem = evento.target.elements["novo-produto__url"]
        const produtoDescricao = evento.target.elements["novo-produto__descricao"]
        
        criaProduto(produtoNome.value, produtoPreco.value, produtoCategoria.value, produtoUrlImagem.value, produtoDescricao.value)
        
        produtoNome.value = ""
        produtoPreco.value = ""
        produtoCategoria.value = ""
        produtoUrlImagem.value = ""
        produtoDescricao.value = ""
    })
}

async function criaProduto(nome, preco, categoria, imagemUrl, descricao){
    const produtos = await conectaAPI.getProdutos()
    const id = await produtos.length + 1
    
    if(!verificaSeProdutoExiste(nome, produtos)) {
        await conectaAPI.postProduto(id, nome, preco, imagemUrl, "", categoria, descricao )
    } else {
        alert(`O produto ${nome} já existe!`)
    }
}

function verificaSeProdutoExiste(nome, produtos) {
    let existe = false
    produtos.forEach( e => {
        if(e.nome === nome){
            existe = true
        }
    })
    return existe
}

function dropdown(){
    const dropdown = document.querySelector('.dropdown')
    const menu = dropdown.querySelector('.dropdown__menu')
    const botao = dropdown.querySelector('.dropdown__toggle')
    
    dropdown.onmouseover = () =>{ menu.classList.add("dropdown__menu--ativo") }
    dropdown.onmouseout = () =>{ menu.classList.remove("dropdown__menu--ativo") }

    const opcoes = menu.querySelectorAll('.dropdown__item')
    
    opcoes.forEach(opcao => {
        opcao.addEventListener('click', (evento) => {
            evento.preventDefault()
            const categoria = opcao.getAttribute('data-categoria')
            botao.innerText = categoria
            const container = document.querySelector('[data-container]')
            container.setAttribute('data-categoria', categoria)
            imprimeProdutos.buscaProdutos()
        })
    })
}

export const comportamentos = {
    pesquisaProdutos,
    botaoPesquisaMobile,
    produtoDetalhes,
    cadastroProduto,
    dropdown
}
