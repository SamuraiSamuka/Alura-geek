import { conectaAPI } from "./ConectaAPI.js"

function constroiProduto(dadosProdutos) {
    const produtoVazio = document.querySelector("#produto-detalhes")
    
    const imagem = produtoVazio.querySelectorAll('#produto__imagem')
    const nome = produtoVazio.querySelector('#produto__titulo')
    const preco = produtoVazio.querySelector('#produto__preco')
    const descricao = produtoVazio.querySelector('#produto__descricao')
    
    nome.innerHTML = dadosProdutos.nome
    imagem.forEach(imagem => {
        imagem.attributes['src'].value = dadosProdutos.imagem_hd_src || dadosProdutos.imagem_icone_src
    })
    preco.innerHTML = dadosProdutos.preco
    descricao.innerHTML = dadosProdutos.descricao? dadosProdutos.descricao : "[A descrição do produto vai aqui]";
}

async function buscaProduto(produtoId) {
    const produtos = await conectaAPI.getProdutos()
    const dadosProdutos = produtos.find(produto => produto.id == produtoId)
    constroiProduto(dadosProdutos)
}

const idProduto = location.search.split("%27")[1]
buscaProduto(idProduto)