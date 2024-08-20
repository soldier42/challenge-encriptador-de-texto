function getTextoInput() {
    // funcao que retorna o texto a ser criptogrado ou descriptografado
    let textoInput = document.querySelector('textarea').value;
    return textoInput;
}

function setResultado(msg) {
    let boxResultado = document.querySelector('.container__result');
    let textAreaResultado = criaTextArea(msg, 'container__result__textarea');
    let botao = criaBotao('Copiar', 'container__result__copy-button');
    
    boxResultado.innerHTML = '';
    boxResultado.style.justifyContent = 'space-between';
    
    botao.setAttribute('onclick', 'copiar()');
    
    boxResultado.appendChild(textAreaResultado);
    boxResultado.appendChild(botao);
}

function criaTextArea(msg, classe) {
    let textArea = document.createElement('textarea');
    textArea.setAttribute('class', classe);
    textArea.setAttribute('readonly', 'true');
    textArea.innerHTML = msg.trim();
    
    return textArea;
}

function criaBotao(msg, classe) {
    let botao = document.createElement('button');
    botao.setAttribute('class', classe);
    botao.innerHTML = msg.trim();
    return botao;
}

function setButtonMessage(botao, msg) {
     botao.innerHTML = msg; 
}

function disableButton(botao) {
    botao.setAttribute('disabled', true);
}

function activeButton(botao) {
    botao.removeAttribute('disabled');
}

function copiar() {
    let texto = document.querySelector('.container__result__textarea').innerHTML;
    navigator.clipboard.writeText(texto);

    let botao = document.querySelector('.container__result__copy-button');

    botao.style.backgroundColor = 'var(--color-button-white-hover)'; 
    setButtonMessage(botao, 'Copiado');
    disableButton(botao);

    setTimeout(() => {
        setButtonMessage(botao, 'Copiar');
        activeButton(botao)
        botao.style.background = '';
        botao.style.transition = 'background-color 0.2s';
    }, 2000);
}

function criptografarTexto() {
    let textoNormal = getTextoInput();
    let textoCriptografado = '';

    for(let palavra of textoNormal.split(' ')) { // loop usado para percorrer todas as palavras da frase separadamente
        for(let char of palavra) {  // loop usado para percorrer e criptografar todos as vogais contidas na palavra
            switch (char) {
                case 'a':
                    textoCriptografado += 'ai';
                    break;
                case 'e':
                    textoCriptografado += 'enter';
                    break;
                case 'i':
                    textoCriptografado += 'imes';
                    break;
                case 'o':
                    textoCriptografado += 'ober';
                    break;
                case 'u':
                    textoCriptografado += 'ufat';
                    break;
                default:
                    textoCriptografado += char;
            }
        }
        textoCriptografado += ' '; // ao final do loop das vogais é adicionado um espaço para separar a proxima palavra
    }

    if (getTextoInput() === '') {
        alert('A caixa de texto não pode estar vazia.')
        return;
    }

    setResultado(textoCriptografado);
}

function descriptografarTexto() {
    let textoDescriptografado = getTextoInput();

    // utilizando expressoes regulares, conseguimos substituir todas as ocorrencias que aparecem na frase
    textoDescriptografado = textoDescriptografado.replace(/ai/g, 'a');
    textoDescriptografado = textoDescriptografado.replace(/enter/g, 'e');
    textoDescriptografado = textoDescriptografado.replace(/imes/g, 'i');
    textoDescriptografado = textoDescriptografado.replace(/ober/g, 'o');
    textoDescriptografado = textoDescriptografado.replace(/ufat/g, 'u');

    if (getTextoInput() === '') {
        alert('A caixa de texto não pode estar vazia.')
        return;
    }

    setResultado(textoDescriptografado);
}


