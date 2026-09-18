const produtos = carregarProdutos();

const vendas = carregarVendas();

const carrinho = [];

const addItemCarrinho = document.getElementById('item-carrinho-form');

const finalizarVendaBtn = document.getElementById('finalizar-compra');

const tabelaCarrinho = document.getElementById('tabela-carrinho');

const selectProdutos = document.getElementById('item-carrinho');

function carregarProdutos() {
    const dados = localStorage.getItem('produtos');

    const padrao = [
        new Produto(1, 'Banana', 2.50, 100),
        new Produto(2, 'Maçã', 4.20, 100),
        new Produto(3, 'Pêra', 4.50, 100),
    ];

    if (!dados) {
        return padrao;
    }

    try {
        const produtosSalvos = JSON.parse(dados);
        return produtosSalvos.map(p => new Produto(p.id, p.nome, p.preco, p.estoque));
    } catch {
        return padrao;
    }
}

function carregarVendas(){
    const dados = localStorage.getItem('vendas');

    if(!dados){
        return [];
    }

    try {
        const vendasSalvas = JSON.parse(dados);

        return vendasSalvas.map(v => {
            const itens = v.itens.map(i => new ItemCarrinho(
                new Produto(i.produto.id, i.produto.nome, i.produto.preco, i.produto.estoque),
                i.quantidade
            ));

            const venda = new Venda(v.id, itens, v.total, v.quantidade);
            venda.data = new Date(v.data);

            return venda;
        });
    } catch {
        return [];
    }
}

function salvarVendas(){
    localStorage.setItem('vendas',JSON.stringify(vendas));
}


addItemCarrinho.addEventListener('submit', function (event) {
    event.preventDefault();

    const produtoId = Number(document.getElementById('item-carrinho').value);

    const produto = produtos.find(p => p.id === produtoId);

    const quantidade = Number(document.getElementById('quantidade-item-carrinho').value);

    const item = new ItemCarrinho(produto, quantidade);

    carrinho.push(item);

    addItemCarrinho.reset();

    renderizarCarrinho();
});

finalizarVendaBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const vendaId = vendas.length + 1;

    const total = carrinho.reduce((soma, item) => soma + item.calcularSubtotal(), 0);

    const quantidade = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

    const venda = new Venda(vendaId, [...carrinho], total, quantidade);

    vendas.push(venda);

    salvarVendas();

    carrinho.length = 0;

    renderizarCarrinho();
})

function renderizarSelectProdutos() {
    selectProdutos.innerHTML = '';

    const optionPadrao = document.createElement('option');
    optionPadrao.value = '';
    optionPadrao.textContent = 'Selecione';
    optionPadrao.disabled = true;
    optionPadrao.selected = true;
    optionPadrao.hidden = true;

    selectProdutos.appendChild(optionPadrao);

    for (const produto of produtos) {
        const option = document.createElement('option');
        option.value = produto.id;
        option.textContent = produto.nome;

        selectProdutos.appendChild(option);

    }
}

function renderizarCarrinho() {
    tabelaCarrinho.innerHTML = ``;
    for (const item of carrinho) {
        const linha = document.createElement('tr');

        linha.innerHTML = `
    <td>${item.produto.id}</td>
    <td>${item.produto.nome}</td>
    <td>${item.quantidade}</td>
    <td>${item.calcularSubtotal()}</td>`;

        tabelaCarrinho.appendChild(linha);
    }

    const total = carrinho.reduce((soma, item) => soma + item.calcularSubtotal(), 0);

    const totalElemento = document.getElementById('total');

    totalElemento.textContent = total;

}

renderizarSelectProdutos();


