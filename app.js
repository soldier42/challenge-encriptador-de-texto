function getTextoInput() {
    // funcao que retorna o texto a ser criptogrado ou descriptografado
    let textoInput = document.querySelector('textarea').value;
    return textoInput;
}

function setResultado(msg) {
    if (msg === '') {
        let botaoCrip = document.querySelector('.container__input__buttons__crip');
        let botaoDescrip = document.querySelector('.container__input__buttons__descrip');
        let inputAlert = document.querySelector('#input-alert');
        
        inputAlert.setAttribute('class', 'input-alert-visible');
        disableButton(botaoCrip);
        disableButton(botaoDescrip);
        
        setTimeout(() => {
            inputAlert.setAttribute('class', 'input-alert-hidden');
            activeButton(botaoCrip);
            activeButton(botaoDescrip);
        }, 2300);

        return;
    }

    let boxResultado = document.querySelector('.container__result');

    let textAreaResultado = criaTextArea(msg, 'container__result__textarea');
    let botao = criaBotao('Copiar', 'container__result__copy-button');
    let alertResult = criaParagraph('Texto Copiado!', 'copy-alert-text');
    let imagem = criaImg('assets/check-icon.svg', 'botao de check', '25px', '25px');
    let div = criaDiv('copy-alert-hidden', imagem, alertResult);
    
    boxResultado.innerHTML = '';
    boxResultado.style.justifyContent = 'space-between';
    
    botao.setAttribute('onclick', 'copiar()');
    
    boxResultado.appendChild(textAreaResultado);
    boxResultado.appendChild(div);
    boxResultado.appendChild(botao);
}

function criaDiv(classe, elem1, elem2){
    let div = document.createElement('div');
    div.setAttribute('class', classe);
    div.appendChild(elem1);
    div.appendChild(elem2);

    return div;
}

function criaImg(path, descricao, altura, largura) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', path);
    imagem.setAttribute('alt', descricao);
    imagem.setAttribute('heigth', altura);
    imagem.setAttribute('width', largura);

    return imagem;
}

function criaParagraph(msg, classe) {
    let paragrafo = document.createElement('p');
    paragrafo.innerHTML = msg;
    paragrafo.classList.add(classe);

    return paragrafo;
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

    let copyButton = document.querySelector('.container__result__copy-button')
    let element = document.querySelector('.copy-alert-hidden');
    
    element.setAttribute('class', 'copy-alert-visible');
    disableButton(copyButton);

    setTimeout(() => {
        element.setAttribute('class', 'copy-alert-hidden');
        activeButton(copyButton);
    }, 2300);

}

function criptografarTexto() {
    let textoNormal = getTextoInput().toLowerCase().trim();
    let textoCriptografado = '';

    if (textoNormal !== '') {
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
    }

    


    setResultado(textoCriptografado);
}

function descriptografarTexto() {
    let textoDescriptografado = getTextoInput().toLowerCase().trim();

    if (textoDescriptografado !== '') {
        // utilizando expressoes regulares, conseguimos substituir todas as ocorrencias que aparecem na frase
        textoDescriptografado = textoDescriptografado.replace(/ai/g, 'a');
        textoDescriptografado = textoDescriptografado.replace(/enter/g, 'e');
        textoDescriptografado = textoDescriptografado.replace(/imes/g, 'i');
        textoDescriptografado = textoDescriptografado.replace(/ober/g, 'o');
        textoDescriptografado = textoDescriptografado.replace(/ufat/g, 'u');
    }

    setResultado(textoDescriptografado);
}

document.querySelector('#check-button').addEventListener('change', function() {
    let html = document.querySelector('html');
    if (this.checked) {
        document.querySelector('#logo-alura').setAttribute('src', 'assets/logo-alura-cinza.svg');
        document.querySelector('#logo-github').setAttribute('src', 'assets/logo-github-cinza.svg');
        document.querySelector('#logo-linkedin').setAttribute('src', 'assets/logo-linkedin-cinza.svg');
        document.querySelector('#imagem-sol').setAttribute('src', 'assets/sol-cinza.svg');
        document.querySelector('#imagem-lua').setAttribute('src', 'assets/lua-cinza.svg');
        
        html.classList.toggle('dark-mode');

        try {
            document.querySelector('#placeholder').setAttribute('src', 'assets/placeholder-image-cinza.svg');
        } catch {
            null;
        }
        
    } else {
        document.querySelector('#logo-alura').setAttribute('src', 'assets/logo-alura.svg');
        document.querySelector('#logo-github').setAttribute('src', 'assets/logo-github.svg');
        document.querySelector('#logo-linkedin').setAttribute('src', 'assets/logo-linkedin.svg');
        document.querySelector('#imagem-sol').setAttribute('src', 'assets/sol.svg');
        document.querySelector('#imagem-lua').setAttribute('src', 'assets/lua.svg');

        html.classList.toggle('dark-mode');

        try {
            document.querySelector('#placeholder').setAttribute('src', 'assets/placeholder-image.svg');
        } catch {
            null;
        }
    }
});

