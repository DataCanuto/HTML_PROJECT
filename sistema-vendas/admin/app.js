const produtos = carregarProdutos();

const carrinho = [];

const vendas = carregarVendas();

const addProdutoForm = document.getElementById('produtos-form');

const addItemCarrinho = document.getElementById('item-carrinho-form');

const finalizarVendaBtn = document.getElementById('finalizar-compra');

const tabelaProdutos = document.getElementById('tabela-produtos');

const tabelaCarrinho = document.getElementById('tabela-carrinho');

const tabelaDetalhesVenda = document.getElementById('tabela-detalhes-venda');

const detalhesVendaModal = new bootstrap.Modal(document.getElementById('detalhesVendaModal'));

const tabelaVendas = document.getElementById('tabela-vendas');

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

function salvarProdutos(){
    localStorage.setItem('produtos',JSON.stringify(produtos));
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

window.addEventListener('storage', function (event) {
    if (event.key === 'vendas') {
        vendas.length = 0;
        vendas.push(...carregarVendas());
        renderizarVendas();
    }
});

addProdutoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome-produto').value;

    const preco = Number(document.getElementById('preco-produto').value);

    const estoque = Number(document.getElementById('estoque-produto').value);

    const id = produtos.length + 1;

    const produto = new Produto(id, nome, preco, estoque);

    produtos.push(produto);

    addProdutoForm.reset();

    renderizarProdutos();
});


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

    carrinho.length = 0;

    renderizarCarrinho();

    renderizarVendas();
})




function renderizarProdutos() {
    tabelaProdutos.innerHTML = ``;
    for (const produto of produtos) {
        const linha = document.createElement('tr');

        linha.innerHTML = `
    <td>${produto.id}</td>
    <td>${produto.nome}</td>
    <td>${produto.preco}</td>
    <td>${produto.estoque}</td>`;

        tabelaProdutos.appendChild(linha);
    }
    renderizarSelectProdutos();
}

function renderizarSelectProdutos() {
    selectProdutos.innerHTML = '';

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

function renderizarVendas() {

    tabelaVendas.innerHTML = ``;

    for (const venda of vendas) {
        const linha = document.createElement('tr');

        linha.innerHTML = `
        <td>${venda.id}</td>
        <td>${venda.data.toLocaleString()}</td>
        <td>${venda.total}</td>
        <td>${venda.quantidade}</td>
        <td><button type="button" class="btn btn-primary btn-sm">Detalhes</button></td>
        `;

        const detalhesBtn = linha.querySelector('button');

        detalhesBtn.addEventListener('click', function () {
            mostrarDetalhesVenda(venda);
        });
        tabelaVendas.appendChild(linha);
    }
}

function mostrarDetalhesVenda(venda) {
    tabelaDetalhesVenda.innerHTML = ``;

    for (const item of venda.itens) {
        const linha = document.createElement('tr');

        linha.innerHTML = `
    <td>${item.produto.id}</td>
    <td>${item.produto.nome}</td>
    <td>${item.quantidade}</td>
    <td>${item.calcularSubtotal()}</td>`;
        tabelaDetalhesVenda.appendChild(linha);
    }

    detalhesVendaModal.show();
}

renderizarProdutos();


