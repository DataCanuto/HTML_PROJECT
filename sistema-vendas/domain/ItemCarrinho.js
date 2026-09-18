class ItemCarrinho{

    constructor(produto, quantidade){
        this.produto = produto;
        this.quantidade = quantidade;
    }

    calcularSubtotal(){
        return this.produto.preco * this.quantidade;
    }
}