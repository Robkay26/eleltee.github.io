// Example of additional functionality: Modal for Contact page (optional)
console.log("its working!")
const tooltip = document.getElementById('tooltip');
//const apiKey = 'YOUR_DICTIONARY_API_KEY'; // Replace with your API key if required
const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'; // Example API


document.addEventListener('mouseup', async (event) => {
    const selection = window.getSelection();
    const word = selection.toString().trim();

    if (!word) return;

    const range = selection.getRangeAt(0).getBoundingClientRect();
    const { x, y, height } = range;

    // Declare variables in a broader scope
    let definition = '';
    let example = '';

    try {
        const response = await fetch(`${apiUrl}${word}`);
        const data = await response.json();

        // Extract and display definition
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

    // Add the event listener for the Save button after it is added to the DOM
    const saveButton = document.getElementById("save-button");

    if (saveButton) {
        saveButton.addEventListener("click", function () {
            // Create a new flashcard element
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

            // Add event listeners to color circles
            function highlightWord(word, color) {
                // Escape special characters for the RegExp
                const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
                // Define a regular expression to find the word (case-insensitive)
                const wordRegex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
            
                // Traverse all text nodes in the document and wrap matching words
                traverseAndHighlight(document.body, wordRegex, color);
            }
            
            function traverseAndHighlight(node, wordRegex, color) {
                // Text node
                if (node.nodeType === 3) {
                    const matches = node.nodeValue.match(wordRegex);
                    if (matches) {
                        const parent = node.parentNode;
            
                        // Replace text node with highlighted spans
                        const html = node.nodeValue.replace(wordRegex, match => {
                            return `<span class="highlighted-word" style="background-color: ${color}; color: white;">${match}</span>`;
                        });
            
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;
            
                        // Insert the new nodes
                        while (tempDiv.firstChild) {
                            parent.insertBefore(tempDiv.firstChild, node);
                        }
            
                        // Remove the original text node
                        parent.removeChild(node);
                    }
                }
                // Element node: recurse into child nodes
                else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                    Array.from(node.childNodes).forEach(childNode => {
                        traverseAndHighlight(childNode, wordRegex, color);
                    });
                }
            }
            
            // Example: Call highlightWord when a color circle is clicked
            const colorCircles = flashcard.querySelectorAll(".color-circle");
            colorCircles.forEach(circle => {
                circle.addEventListener("click", function () {
                    const selectedColor = this.getAttribute("data-color");
                    highlightWord(word, selectedColor);
                });
            });
            

            // Append the flashcard to the `centre-example` section
            const centreExample = document.querySelector('.centre-example');
            if (centreExample) {
                centreExample.appendChild(flashcard);
            } else {
                console.error("Could not find the .centre-example section.");
            }
        });
    }
});


// Hide tooltip on click elsewhere
document.addEventListener('click', (event) => {
    if (!tooltip.contains(event.target)) {
      tooltip.style.display = 'none';
    }
  });

const spinImage = document.getElementById('spinImage');

spinImage.addEventListener('click', function(){
    this.classList.add('spin');

    setTimeout(()=> {
        this.classList.remove('spin');
    }, 600);
})

