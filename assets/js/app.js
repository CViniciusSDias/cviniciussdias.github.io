require('../css/app.scss');

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));

hljs.highlightAll();

window.onload = _ => {
    console.clear();

    console.log("%cDIAS DE DEV", 'color: #550766; font-size: 2rem; font-weight: 900; font-family: Fugaz One,Roboto,sans-serif; border-bottom: .5rem solid #f00696; border-top: .5rem solid #52c196; margin-bottom: 1.25rem; padding: .75rem;');
    console.log("%cConfere a página \"Sobre Mim\" pra saber como me apoiar para eu continuar criando conteúdo", 'color: #2e353f; font-family: Baloo\ 2, Georgia, Cambria, serif; font-size: 1rem');
    console.log("%cE se quiser aprender a estilizar mensagens aqui no console, comenta em algum post. ;-)", 'color: #2e353f; font-family: Baloo\ 2, Georgia, Cambria, serif; font-size: 1rem');
};
