// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Select the button by its ID
  const homeButton = document.getElementById("homeButton");

  // Add a click event listener to the button
  homeButton.addEventListener("click", () => {
    // Display an alert
    alert("Button was clicked!");

    // Change the content of the Home section
    const homeSection = document.getElementById("home");
    homeSection.querySelector("p").textContent = "You clicked the button!";
  });
});
