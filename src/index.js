import '../node_modules/modern-normalize/modern-normalize.css';
import './style.css';

function render() {
    const appRoot = document.getElementById('root');
    appRoot.innerHTML = "<p>🤠&nbspHowdy, World!&nbsp🤠</p>";
    appRoot.classList.add('center');
    document.body.appendChild(appRoot);
}

render();
