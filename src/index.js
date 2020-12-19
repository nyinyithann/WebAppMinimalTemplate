import './style.css';
import profile from './cowboy_profile.png';

function render() {
    const appRoot = document.createElement('div');    
    appRoot.innerHTML = "<p>🤠&nbspHowdy, World!&nbsp🤠</p>";
    appRoot.classList.add('center');
    const img = new Image();
    img.src = profile;    
    appRoot.appendChild(img);    
    document.body.appendChild(appRoot);
}

render();