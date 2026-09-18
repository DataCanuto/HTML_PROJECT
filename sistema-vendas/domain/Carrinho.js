class Carrinho {

    construcor(){
        this.items = [];
    }

    addItem(item){
        this.item.push(item);
    }

    calcularTotal(){
        let total = 0;

        for(const item of this.itens){
            total += item.calcularSubtotal();
        }

        return total;
    }
}