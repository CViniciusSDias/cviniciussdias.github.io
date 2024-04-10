require('../css/app.scss');

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'));

hljs.highlightAll();

window.onload = () => {
    const theme = window?.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'github-dark' : 'github-light';
    document.getElementById('comment-script')
        .setAttribute('theme', theme);
};
