async function getProdutos() {
    let response = await fetch('http://localhost:3000/produtos')
    return await response.json()
}

async function postProduto(id, nome, preco, imagem_icone_src, imagem_hd_src, categoria, descricao) {
    const conexao = await fetch('http://localhost:3000/produtos', {
        method:"POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            preco: `R$ ${preco}`,
            imagem_icone_src: imagem_icone_src,
            imagem_hd_src: imagem_hd_src,
            categoria: categoria,
            descricao: descricao
        })
    });

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

export const conectaAPI = {
    getProdutos,
    postProduto
}