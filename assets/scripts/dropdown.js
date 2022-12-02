import { imprimeProdutos } from "./insereProdutos.js"

setTimeout(()=>{
    const dropdownBtn = document.querySelector('.dropdown__toggle')
    dropdownBtn.addEventListener('click', ()=>{
        document.querySelector('.dropdown__menu').classList.toggle("dropdown__menu--ativo")
        const opcoes = document.querySelectorAll('.dropdown__item')
        
        opcoes.forEach(opcao => {
            opcao.addEventListener('click', (evento) => {
                evento.preventDefault();
                const categoria = opcao.getAttribute('data-categoria')
                const container = document.querySelector('[data-container]')
                container.setAttribute('data-categoria', categoria)
                // console.log(opcao.getAttribute('data-categoria'))
                abc()
            })
        })
    })
}, 300)


async function abc(categoria) {

    const result = await fetch(`http://localhost:3000/produtos?q=${categoria}`)
    const dados = await result.json()
    dados.forEach(e => {
        console.log(e.nome)
    })
}


