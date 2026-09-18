class Produto {
    constructor(id,nome,preco,estoque){
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    reduzirEstoque(quantidade){
        this.estoque -= quantidade;
    }
}