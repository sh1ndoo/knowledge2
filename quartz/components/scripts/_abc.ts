// @ts-ignore
import {ABCJS} from 'https://cdn.jsdelivr.net/npm/abcjs@6.2.2/dist/abcjs-basic-min.js';


document.addEventListener("nav", () => {
const abcContainers = document.getElementsByClassName("music-abc-container");

[...abcContainers].forEach((container, index) => {
    const abcString = container.getAttribute("data-abc");
    if (abcString) {
    // Clear any existing rendered content
    const existingRenderTarget = container.querySelector('.abc-render-targets');
    if (existingRenderTarget) {
        existingRenderTarget.innerHTML = '';
    } else {
        const newDiv = document.createElement("div");
        newDiv.className = 'abc-render-targets';
        container.appendChild(newDiv);
    }
    
    const uniqueId = `abc-notation-${index}`;
    const renderTarget = container.querySelector('.abc-render-targets');
    if (renderTarget) {
        renderTarget.id = uniqueId;
    }
    
    ABCJS.renderAbc(uniqueId, abcString);
    }
});
});