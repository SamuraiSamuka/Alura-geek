let header = document.querySelector("#cabecalho")
let banner = document.querySelector('#banner')
let secao_produtos = document.querySelector("#secao_produtos")
let produto = document.querySelector('.produto')
let footer = document.querySelector("#rodape")

fetch('../components/header.html')
    .then(response => {
        return response.text()
    })
    .then(data => {
        header.innerHTML = data;
    });

fetch('../components/banner.html')
    .then(response => {
        return response.text()
    })
    .then(data => {
        banner.innerHTML = data;
    });

fetch('../components/secao_produtos.html')
    .then(response => {
        return response.text()
    })
    .then(data => {
        secao_produtos.innerHTML = data;
    });

fetch('../components/produto.html')
    .then(response => {
        return response.text()
    })
    .then(data => {
        produto.innerHTML = data;
    });

fetch('../components/footer.html')
    .then(response => {
        return response.text()
    })
    .then(data => {
        footer.innerHTML = data;
    });