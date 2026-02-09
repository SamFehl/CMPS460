const shopButton = document.getElementById("shopBtn");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");

// Open modal
shopButton.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close modal (X button)
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
