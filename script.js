// DIY AI Assistant

console.log("DIY AI Assistant Loaded");

// Welcome Button
const startButton = document.querySelector("button");

if (startButton) {
    startButton.addEventListener("click", function () {
        alert("🚀 Welcome to DIY AI Assistant!\n\nChoose a project and start building.");
    });
}

// Project Buttons
const projectButtons = document.querySelectorAll(".project button");

projectButtons.forEach(button => {
    button.addEventListener("click", function () {
        alert("📚 Project details page is coming soon.");
    });
});

// Navigation Animation
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("mouseover", function () {
        this.style.color = "#38bdf8";
    });

    link.addEventListener("mouseout", function () {
        this.style.color = "white";
    });
});

// Smooth Scroll (for future sections)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
