import { useState } from "react"

function FormsAddProduto( {onAdicionar}) {
    const [nome, setNome] = useState('')
    const [imagem, setImagem] = useState('')
    const [preco, setPreco] = useState('')

    function handleSubmit(event) {
        event.preventDefault();

        onAdicionar({
            nome,
            imagem,
            preco: Number(preco)
        }) 

        alert(`Produto "${nome}" salvo!`)

        setNome('')
        setImagem('')
        setPreco('')

    }
    return (
        <section className="form">

            <form id="cadastrar-produto-form" onSubmit={handleSubmit}>
                <h2>Cadastro de Produtos</h2>

                <label htmlFor="nome">Nome do produto</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Banana da terra" required></input>

                <label htmlFor="imagem">URL da Imagem</label>
                <input type="url" id="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} placeholder="https://..." required></input>

                <label htmlFor="preco">Preço (R$)</label>
                <input type="number" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="0,00" step="0.01" required></input>

                <button type="submit">Salvar</button>
            </form>
        </section>
    )
}

export default FormsAddProduto