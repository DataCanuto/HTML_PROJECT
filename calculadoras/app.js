function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

function classificarImc(imc) {

    if (imc < 18.5) {
        return 'Abaixo do peso normal'
    } else if (imc < 24.9) {
        return 'Peso normal'
    } else if (imc < 29.9) {
        return 'Excesso de peso'
    } else if (imc < 34.9) {
        return 'Obesidade classe I'
    } else if (imc < 39.9) {
        return 'Obesidade classe II'
    } else {
        return 'Obesidade classe III'
    }

}

const formImc = document.getElementById('form-imc');
const pesoInput = document.getElementById('peso-imc');
const alturaInput = document.getElementById('altura-imc');

const resultadoInput = document.getElementById('resultado-imc');

const classificacaoInput = document.getElementById('classificacao-imc');

formImc.addEventListener('submit', (event) => {
    event.preventDefault();

    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    const imc = calcularImc(peso, altura);

    event.submitter.id === 'btn-calcular' ? resultadoInput.value = imc.toFixed(2) : event.submitter.id === 'btn-classificacao' ? classificacaoInput.value = classificarImc(imc) : null;



});




function calcular(n1, n2, op) {
    switch (op) {
        case 1:
            return n1 + n2;
        case 2:
            return n1 - n2;
        case 3:
            return n1 * n2;
        case 4:
            return n1 / n2;

    }
}


const formCalculadora = document.getElementById('form-basica');
const number1 = document.getElementById('n1');
const number2 = document.getElementById('n2');
const operacao = document.getElementById('operacao');

const resultadoCalculo = document.getElementById('resultado-calculo');

formCalculadora.addEventListener('submit', (event) => {
    event.preventDefault();

    const n1 = parseFloat(number1.value);
    const n2 = parseFloat(number2.value);
    const op = parseInt(operacao.value);

    const result = calcular(n1, n2, op);
    resultadoCalculo.value = result.toFixed(2);
});