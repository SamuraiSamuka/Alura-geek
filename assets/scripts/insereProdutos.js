// import produtos from './ConectaAPI.js'
import { conectaAPI } from "./ConectaAPI.js"
import preencheComponente from './preencheComponentes.js';


function preencheContainer2(container, produtos){
        // Limite de itens do container
        const quantidade = container.getAttribute('data-container')
        // Categoria de produtos do container
        const categoria = container.getAttribute('data-categoria')

        // Faz uma seleção de produtos que possuam a categoria do container
        const produtosSelecionados = selecionaProdutos(produtos, categoria)
        // Insere uma div #produto pra cada um dos selecionados, até o limite do container
        for(let i = 0; i < quantidade && i < produtosSelecionados.length; i++) {
            container.appendChild(criaProdutoTag())
        }

        // Seleciona todas div #produto e preenche com o html do componente produto
        const produtosVazios = container.querySelectorAll('#produto')
        preencheComponente(produtosVazios, ["produto"])
        // Após .3s, insere as informações dos produtos selecionados em cada div #produto.
        setTimeout(()=>{
            insereInfo(produtosVazios, produtosSelecionados)
        }, 300)
}
function preencheContainer(produtos) {
    const containers = document.querySelectorAll('[data-container]')

    containers.forEach((container)=>{
        // Limite de itens do container
        const quantidade = container.getAttribute('data-container')
        // Categoria de produtos do container
        const categoria = container.getAttribute('data-categoria')

        // Faz uma seleção de produtos que possuam a categoria do container
        const produtosSelecionados = selecionaProdutos(produtos, categoria)
        // Insere uma div #produto pra cada um dos selecionados, até o limite do container
        for(let i = 0; i < quantidade && i < produtosSelecionados.length; i++) {
            container.appendChild(criaProdutoTag())
        }

        // Seleciona todas div #produto e preenche com o html do componente produto
        const produtosVazios = container.querySelectorAll('#produto')
        preencheComponente(produtosVazios, ["produto"])
        // Após .3s, insere as informações dos produtos selecionados em cada div #produto.
        setTimeout(()=>{
            insereInfo(produtosVazios, produtosSelecionados)
        }, 300)
    })
}

function selecionaProdutos(produtos, categoria){
    let selecao = []
    produtos.forEach((produto)=>{
        if(categoria === "todos"){
            selecao = produtos
            return selecao
        } else if(produto.categoria === categoria) {
            selecao.push(produto)
        }
    })
    return selecao
}

function criaProdutoTag(){
    const produto = document.createElement('div')
    produto.id = "produto"
    return produto
}

function insereInfo(produtosVazios, produtosSelecionados){
    produtosVazios.forEach((produtoVazio, i)=>{
        produtoVazio.setAttribute("data-id", produtosSelecionados[i].id)

        const id = produtoVazio.querySelector('#produto__identificador')
        const imagem = produtoVazio.querySelector('#produto__imagem')
        const nome = produtoVazio.querySelector('#produto__titulo')
        const preco = produtoVazio.querySelector('#produto__preco')
        const link = produtoVazio.querySelector('#produto__link')
        
        nome.innerHTML = produtosSelecionados[i].nome
        link.attributes['href'].value = `#`;
        imagem.attributes['src'].value = produtosSelecionados[i].imagem_icone_src
        preco.innerHTML = produtosSelecionados[i].preco
        id.innerHTML = `#${produtosSelecionados[i].id}`
        
        produtoVazio.addEventListener("click", ()=>{
            window.location.assign(`../Pages/Produto_detalhes.html?id='${produtosSelecionados[i].id}'`)
            return 
        })
    })
}

async function buscaProdutos() {
    const todosProdutos = await conectaAPI.getProdutos()
    preencheContainer(todosProdutos)
}

buscaProdutos();

export const imprimeProdutos = {
    preencheContainer
}