import { conectaAPI } from "./ConectaAPI.js";

let formulario = document.querySelector("#novo-produto");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const produtoNome = evento.target.elements["novo-produto__nome"]
    const produtoPreco = evento.target.elements["novo-produto__preco"]
    const produtoCategoria = evento.target.elements["novo-produto__categoria"]
    const produtoUrlImagem = evento.target.elements["novo-produto__url"]
    const produtoDescricao = evento.target.elements["novo-produto__descricao"]
    
    criaProduto(produtoNome.value, produtoPreco.value, produtoCategoria.value, produtoUrlImagem.value, produtoDescricao.value)
    console.log(produtoNome.value, produtoPreco.value, produtoCategoria.value, produtoUrlImagem.value, produtoDescricao.value)
    
    produtoNome.value = ""
    produtoPreco.value = ""
    produtoCategoria.value = ""
    produtoUrlImagem.value = ""
    produtoDescricao.value = ""
})

// function criaProduto(){
//     
//        

//     if(!verificaSeProdutoExiste(nome)){
//         produtos.push(novoProduto)
//     } else {
//         console.log("produto já existe!")
//     }

//     console.log(produtos)
//     console.log(db)
// }

function verificaSeProdutoExiste(nome, produtos) {
    let existe = false
    produtos.forEach( e => {
        if(e.nome === nome){
            existe = true
        }
    })
    return existe
}

async function criaProduto(nome, preco, categoria, imagemUrl, descricao){
    const produtos = await conectaAPI.getProdutos()
    const id = produtos.length + 1
    
    if(!verificaSeProdutoExiste(nome, produtos)) {
        conectaAPI.postProduto(id, nome, preco, imagemUrl, "", categoria, descricao )
    } else {
        alert(`O produto ${nome} já existe!`)
    }
}