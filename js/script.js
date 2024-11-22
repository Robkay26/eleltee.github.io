// Example of additional functionality: Modal for Contact page (optional)
console.log("its working!")

document.addEventListener("DOMContentLoaded", function () {
    const words = document.querySelectorAll(".clickable-word");
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const closeButton = document.querySelector(".close");
    const saveButton = document.getElementById("save-button");
    const centreExample = document.querySelector(".centre-example");

    // Event listener for clickable words
    words.forEach(word => {
        word.addEventListener("click", function (e) {
            // Get the position of the clicked word
            const rect = word.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

            // Update the popup content
            // Populate the popup with word details
            const dictionaryEntry = modalContent.querySelector('.dictionary-entry');
            dictionaryEntry.querySelector('.word').textContent = word.getAttribute("data-word");
            dictionaryEntry.querySelector('.definition').textContent = word.getAttribute("data-definition");
            dictionaryEntry.querySelector('.ex').textContent = `e.g., ${word.getAttribute("data-example")}`;
            
            saveButton.dataset.word = word.getAttribute("data-word");
            saveButton.dataset.definition = word.getAttribute("data-definition");
            saveButton.dataset.example = word.getAttribute("data-example");

            // Position the modal near the clicked word
            modalContent.style.position = "absolute";
            modalContent.style.top = `${rect.top + scrollTop + 20}px`; // Slightly below the word
            modalContent.style.left = `${rect.left + scrollLeft}px`; // Aligned with the word

            // Show the modal
            modal.style.display = "flex";
            console.log("click")
        });
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    saveButton.addEventListener("click", function () {
        // Get the data attributes from the Save button
        const word = this.dataset.word;
        const definition = this.dataset.definition;
        const example = this.dataset.example;

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
                <span class="color-circle" data-color="yellow" style="background-color: yellow;"></span>
            </div>
        `;
            // Add event listeners to color circles
        const colorCircles = flashcard.querySelectorAll(".color-circle");
        colorCircles.forEach(circle => {
            circle.addEventListener("click", function () {
                const selectedColor = this.getAttribute("data-color");
                const targetWords = document.querySelectorAll(`.right-example .highlighted-word[data-word="${word}"]`);

                targetWords.forEach(targetWord => {
                    targetWord.style.color = selectedColor;
                })
            });
        });

        // Append the flashcard to the centre-example section
        centreExample.appendChild(flashcard);

        // Close the modal
        modal.style.display = "none";
    });

    // Optional: Close the modal when clicking outside the modal content
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

const spinImage = document.getElementById('spinImage');

spinImage.addEventListener('click', function(){
    this.classList.add('spin');

    setTimeout(()=> {
        this.classList.remove('spin');
    }, 600);
})

