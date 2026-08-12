// Get elements

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");


// Store currently visible images

let visibleImages = [];
let currentIndex = 0;


// Filter Images

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        galleryItems.forEach(item => {

            const category = item.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

        updateVisibleImages();

    });

});


// Update visible images

function updateVisibleImages() {

    visibleImages = Array.from(galleryItems)
        .filter(item => item.style.display !== "none");

}


// Open Lightbox

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleImages();

        currentIndex = visibleImages.indexOf(item);

        showImage();

        lightbox.style.display = "flex";

    });

});


// Show Image

function showImage() {

    const image = visibleImages[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

}


// Next Image

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showImage();

});


// Previous Image

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage();

});


// Close Lightbox

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});


// Close when clicking outside image

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});


// Keyboard Navigation

document.addEventListener("keydown", (event) => {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (event.key === "Escape") {
            closeBtn.click();
        }

    }

});


// Initial images

updateVisibleImages();