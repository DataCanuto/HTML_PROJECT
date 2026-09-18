class Negociacao {

    /*
    # Constutor Vazio, valores inicializados junto com obj.
    constructor(){
        this.data = new Date();
        this.quantidade = 1;
        this.valor = 0.00;
    } */
    constructor (data, quantidade, valor){
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
    }

    

    obterVolume(){
        return this._quantidade * this._valor;
    }

    getData(){
        return new Date(this.data.getTime());
    }

    getQuantidade(){
        return this._quantidade;
    }

    getValor(){
        return this._valor;
    }
}


/* toda propriedade de uma classe prefixada com um underline ( _ ) não deve ser acessada fora dos métodos da própria classe */