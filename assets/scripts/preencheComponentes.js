let cabecalho = document.querySelectorAll("#cabecalho")
let banner = document.querySelectorAll('#banner')
let login = document.querySelectorAll('#login')
let novoProduto = document.querySelectorAll('#novo-produto')
let produtoDetalhes = document.querySelectorAll("#produto-detalhes")
let todosProdutos = document.querySelectorAll("#todos-produtos")
let secaoProdutos = document.querySelectorAll("#secao-produtos")
let footer = document.querySelectorAll("#rodape")

function criaCSSLink (nomeArquivo) {
    const css = document.createElement('link')
    css.setAttribute("rel", "stylesheet")
    css.setAttribute("href", `../components/${nomeArquivo}.css`)
    document.head.appendChild(css)
}

function preencheComponente(componente, classes){
    if(componente.length>0){
        fetch(`../components/${componente[0].id}.html`)
        .then(response => {
            return response.text()
        })
        .then(dados => {
            componente.forEach((e, i) =>{
                e.innerHTML = dados;
                e.classList = "";
                classes.forEach(classe => {
                    e.classList.add(classe)
                })
                
                const categoriaContainer = e.getAttribute('data-categoria')
                if(!!categoriaContainer){
                    const corpo = e.querySelector('[data-container]')
                    corpo.setAttribute("data-categoria", categoriaContainer)
                    e.querySelector('#titulo').innerHTML = e.getAttribute("data-titulo")
                }
                
                criaCSSLink(e.id)
            })  
        })
    }
}

preencheComponente(cabecalho, ["cabecalho", "container"])
preencheComponente(banner, ["banner", "container"])
preencheComponente(login, ["formulario", "login"])
preencheComponente(novoProduto, ["novo-produto"])
preencheComponente(produtoDetalhes, ["produto-detalhes"])
preencheComponente(todosProdutos, ["todos-produtos"])
preencheComponente(secaoProdutos, ["secao-produtos"])
preencheComponente(footer, ["rodape"])

export default preencheComponente