function ProdutosGrid({produtos}) {

    const formatarPreco = (valor) => 
        valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    


    return (
        <section className="produtos-grid" id="produtos">
            <h2>Nossos Produtos</h2>

            {produtos.length === 0 ? (
                <p className="produto-vazio">Nenhum produto cadastrado ainda.</p>
            ) : (
                <div id="produtos-container">
                    {produtos.map((produto) => (
                        <article className="produto-card" key={produto.id}>
                            <div className="produto-moldura">
                                <img
                                    src={produto.imagem}
                                    alt={produto.nome}
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400?text=Sem+imagem' }}
                                />
                            </div>
                            <h3 className="produto-nome">{produto.nome}</h3>
                            <p className="produto-preco">{formatarPreco(produto.preco)}</p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ProdutosGrid