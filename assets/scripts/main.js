const page = {
    insertion:{
        textarea: document.querySelector('textarea'),
        encryptButton: document.getElementById('botao-criptografar'),
        uncryptButton: document.getElementById('botao-descriptografar')
    },

    exhibition:{
        container: document.querySelector('.container__exibicao'),
        containerAfter: document.getElementById('container-exibicao-depois'),
        image: document.getElementById('container-exibicao-imagem'),
        textBefore: document.getElementById('container-exibicao-texto'),
        textAfter: document.getElementById('texto-depois'),
    }
};


function encryptButtonListener(){
    page.insertion.encryptButton.style.cursor = 'pointer';
    page.insertion.encryptButton.addEventListener('click', function(event) {
        if (event.target === page.insertion.encryptButton) {
            afterClick();
            exhibitText(page.insertion.textarea.value);
            page.insertion.textarea.value = '';
        };});
    
};

function uncryptButtonListener(){
    page.insertion.uncryptButton.style.cursor = 'pointer';
    page.insertion.uncryptButton.addEventListener('click', function(event) {
        if (event.target === page.insertion.uncryptButton) {
            afterClick();
            exhibitText(page.insertion.textarea.value); 
            page.insertion.textarea.value = '';
        }})
};

function encryptText(text){
    text = text.replace(new RegExp('e', 'g'), "enter");
    text = text.replace(new RegExp('i', 'g'), "imen");
    text = text.replace(new RegExp('a', 'g'), "ai");
    text = text.replace(new RegExp('o', 'g'), "ober");
    text = text.replace(new RegExp('u', 'g'), "ufat");
    text = text.replace(new RegExp('s', 'g'), "sudo");
    return text;
};

function uncryptText(text){
    text = text.replace(new RegExp('enter', 'g'), "e");
    text = text.replace(new RegExp('imen', 'g'), "i");
    text = text.replace(new RegExp('ai', 'g'), "a");
    text = text.replace(new RegExp('ober', 'g'), "o");
    text = text.replace(new RegExp('ufat', 'g'), "u");
    text = text.replace(new RegExp('sudo', 'g'), "s");
    return text;
};

function exhibitText(text){
    const outOfPatternRegex = new RegExp('[A-ZÀ-ÖØ-öø-ÿ0-9]');

    if (text.length < 1 || outOfPatternRegex.test(text)){
        page.exhibition.textAfter.style.fontSize = '1rem';
        page.exhibition.textAfter.style.textAlign = 'center';
        page.exhibition.textAfter.innerText = 'Por favor, digite somente letras minúsculas e sem acento.';
        document.getElementById('botao-copiar').style.display = 'none';
    } else {
        page.exhibition.textAfter.style.fontSize = '1.8rem';
        page.exhibition.textAfter.style.textAlign = 'justify';
        document.getElementById('botao-copiar').style.display = 'block';
        copyButtonListener();
        if (event.target === page.insertion.encryptButton) { 
            page.exhibition.textAfter.innerText = encryptText(text);
        } else {
            page.exhibition.textAfter.innerText = uncryptText(text);
        };
    }; 
};

function afterClick(){
    page.exhibition.image.style.display = 'none';
    page.exhibition.textBefore.style.display ='none';
    createCopyButton();
    page.exhibition.container.classList.remove('container__exibicao');
    page.exhibition.container.setAttribute('id', 'container-exibicao-depois');
    document.getElementById('botao-copiar').textContent = 'Copiar';
    page.exhibition.textAfter.style.display = 'block';
};

let createCopyButton = (function() {
    let executed = false;
    return function() {
        if (!executed) {
            executed = true;
            const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar';
    copyButton.setAttribute('id','botao-copiar');
    copyButton.style.cursor = 'pointer';
    page.exhibition.container.appendChild(copyButton);
        };
    };
})();

function copyButtonListener(){
    document.getElementById('botao-copiar').addEventListener('click', ()=>{
        copyToClipboard(page.exhibition.textAfter.textContent);
        document.getElementById('botao-copiar').textContent = 'Tá na mão, texto copiado!';
    });
};

function copyToClipboard(textAfter){
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(textAfter);
        };
      });
    
};







function initialize(){
      encryptButtonListener();
      uncryptButtonListener();
};

initialize();
