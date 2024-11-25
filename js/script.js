console.log("its working!")
const tooltip = document.getElementById('tooltip');
const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'; 

document.addEventListener('mouseup', async (event) => {
    const selection = window.getSelection();
    const word = selection.toString().trim();

    if (!word) return;

    const range = selection.getRangeAt(0).getBoundingClientRect();
    const { x, y, height } = range;

    let definition = '';
    let example = '';

    try {
        const response = await fetch(`${apiUrl}${word}`);
        const data = await response.json();

        if (data[0]?.meanings?.length) {
            definition = data[0].meanings[0].definitions[0].definition || "No definition available.";
            example = data[0].meanings[0].definitions[0].example || "No example available.";

            tooltip.innerHTML = `
                <p><strong>${word}</strong></p>
                <p>${definition}</p>
                <p><em>${example}</em></p>
                <p><button id="save-button" class="save-button">Save</button></p>
            `;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y + height + window.scrollY}px`;
            tooltip.style.display = 'block';
        } else {
            tooltip.innerHTML = `<strong>${word}:</strong> No definition found.`;
            tooltip.style.display = 'block';
        }
    } catch (error) {
        tooltip.innerHTML = `<strong>Error:</strong> Could not fetch the definition.`;
        tooltip.style.display = 'block';
    }

    const saveButton = document.getElementById("save-button");

    if (saveButton) {
        saveButton.addEventListener("click", function () {
            const flashcard = document.createElement("div");
            flashcard.classList.add("flashcard");
            flashcard.innerHTML = `
                <p><strong>${word}</strong></p>
                <p>${definition}</p>
                <p><em>${example}</em></p>
                <div class="highlight-picker">
                    <span class="color-circle" data-color="red" style="background-color: red;"></span>
                    <span class="color-circle" data-color="green" style="background-color: green;"></span>
                    <span class="color-circle" data-color="blue" style="background-color: blue;"></span>
                </div>
            `;

            function highlightWord(word, color) {
                const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const wordRegex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
                traverseAndHighlight(document.body, wordRegex, color);
            }
            
            function traverseAndHighlight(node, wordRegex, color) {
                if (node.nodeType === 3) {
                    const matches = node.nodeValue.match(wordRegex);
                    if (matches) {
                        const parent = node.parentNode;
                        const html = node.nodeValue.replace(wordRegex, match => {
                            return `<span class="highlighted-word" style="background-color: ${color}; color: white;">${match}</span>`;
                        });
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;
                        while (tempDiv.firstChild) {
                            parent.insertBefore(tempDiv.firstChild, node);
                        }
                        parent.removeChild(node);
                    }
                }

                else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                    Array.from(node.childNodes).forEach(childNode => {
                        traverseAndHighlight(childNode, wordRegex, color);
                    });
                }
            }
            
            const colorCircles = flashcard.querySelectorAll(".color-circle");
            colorCircles.forEach(circle => {
                circle.addEventListener("click", function () {
                    const selectedColor = this.getAttribute("data-color");
                    highlightWord(word, selectedColor);
                });
            });
            
            const centreExample = document.querySelector('.centre-example');
            if (centreExample) {
                centreExample.appendChild(flashcard);
            } else {
                console.error("Could not find the .centre-example section.");
            }
        });
    }
});


document.addEventListener('click', (event) => {
    if (tooltip && !tooltip.contains(event.target)) {
        tooltip.style.display = 'none';
    }
  });

document.addEventListener('DOMContentLoaded', () => {
    const spinImage = document.getElementById('spinImage');
    if (spinImage) {
        spinImage.addEventListener('click', function () {
            this.classList.add('spin');
            setTimeout(() => {
                this.classList.remove('spin');
            }, 600);
        });
    } 
});



const image = document.querySelector('.clickable-image');
const textOverlay = document.querySelector('.text-overlay');
  
image.addEventListener('click', function(){
    console.log("image clicked");
    textOverlay.classList.toggle('show');
});

  

