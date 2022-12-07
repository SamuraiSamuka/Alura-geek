import { conectaAPI } from "./ConectaAPI.js"
import preencheComponente from './Módulos.js';

function preencheContainer(container, produtos) {
    const quantidade = container.getAttribute('data-container') // Limite de itens do container
    const categoria = container.getAttribute('data-categoria')
    
    const produtosSelecionados = selecionaProdutos(produtos, categoria)
    
    // Insere uma div #produto pra cada um dos selecionados, até o limite do container
    for (let i = 0; i < quantidade && i < produtosSelecionados.length; i++) {
        container.appendChild(criaProdutoTag())
    }

    // Seleciona todas div #produto e preenche com o html do componente produto
    const produtosVazios = container.querySelectorAll('#produto')
    preencheComponente(produtosVazios, ["produto"]).then( () => {
        // E então, após isso, insere as informações dos produtos selecionados em cada div #produto.
        produtosVazios.forEach((produtoVazio, i) => {
            insereInfo(produtoVazio, produtosSelecionados[i])
        })
    })
    
}

function selecionaProdutos(produtos, categoria) {
    let selecao = []
    produtos.forEach((produto) => {
        if (categoria === "Todos") {
            selecao = produtos
            return selecao
        } else if (produto.categoria === categoria) {
            selecao.push(produto)
        }
    })
    return selecao
}

function criaProdutoTag() {
    const produto = document.createElement('div')
    produto.id = "produto"
    return produto
}

function insereInfo(produtoVazio, dadosProduto) {
    produtoVazio.setAttribute("data-id", dadosProduto.id)
    
    const id = produtoVazio.querySelector('#produto__identificador')
    const titulo = produtoVazio.querySelector('#produto__titulo')
    const preco = produtoVazio.querySelector('#produto__preco')
    const imagem = produtoVazio.querySelector('#produto__imagem')
    const imagem2 = produtoVazio.querySelector('#produto__imagem2')
    const descricao = produtoVazio.querySelector('#produto__descricao')
    const link = produtoVazio.querySelector('#produto__link')
    
    if (id) {
        id.innerHTML = `#${dadosProduto.id}`
    }
    if (titulo) {
        titulo.innerHTML = dadosProduto.nome
    }
    if (preco) {
        preco.innerHTML = dadosProduto.preco
    }
    if (imagem) {
        imagem.attributes['src'].value = dadosProduto.imagem_src
    }
    if (imagem2) {
        imagem2.attributes['src'].value = dadosProduto.imagem_src
    }
    if (link) {
        link.attributes['href'].value = `#`;
        produtoVazio.addEventListener("click", () => {
            window.location.assign(`../Pages/Produto_detalhes.html?id='${dadosProduto.id}'`)
        })
    }
    if (descricao) {
        descricao.innerHTML = dadosProduto.descricao || "Lorem ipsum"
    }
}

async function buscaProdutos(indice=0) {
    const produtos = await conectaAPI.getProdutos()
    const containers = document.querySelectorAll('[data-container]')
    const container = containers[indice]
    container.innerHTML = ""
    preencheContainer(container, produtos)
}

export const imprimeProdutos = {
    preencheContainer,
    insereInfo,
    buscaProdutos
}