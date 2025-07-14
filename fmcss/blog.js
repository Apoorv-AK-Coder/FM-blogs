let products = [];
let currentProducts = [];
const productsPerPage = 12;
let currentPage = 1;
let showAllPages = false;

const productContainer = document.querySelector(".product-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNumberSpan = document.getElementById("page-number");
const searchInput = document.querySelector(".search-column input[type='search']");
const pagination = document.querySelector(".pagination1");

fetch('https://apoorv-ak-coder.github.io/FM-blogs/fmcss/blogs.json') // ✅ Adjust path as needed
  .then(response => response.json())
  .then(data => {
    products = data;
    currentProducts = [...products];
    renderProducts();
  })
  .catch(error => console.error("Error loading products:", error));

function renderProducts() {
  productContainer.innerHTML = "";
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageItems = currentProducts.slice(start, end);

  pageItems.forEach(product => {
    productContainer.innerHTML += `
      <div class="column">
        <img src="${product.images}" alt="${product.name}">
        <div class="innerblog">
          <h4>${product.name}</h4>
          <p>${product.para}</p>
          <p><span id="datepara"><i class="fa-solid fa-calendar-days"></i> &nbsp;${product.date}</span></p>
          <p style="margin-top: 5px !important;">
            <a href="${product.link}">Read More <i class="fa-solid fa-angles-right"></i></a>
          </p>
        </div>
      </div>
    `;
  });

  updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    pagination.style.display = totalPages > 1 && currentProducts.length !== products.length ? "none" : "flex";

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    pageNumberSpan.innerHTML = "";

    if (showAllPages || totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) createPageBtn(i);
    } else {
        createPageBtn(1);
        createPageBtn(2);
        createPageBtn(3);

        if (currentPage > 4) addEllipsis();
        if (currentPage > 3 && currentPage < totalPages - 2) createPageBtn(currentPage);
        if (currentPage < totalPages - 3) addEllipsis();

        createPageBtn(totalPages - 2);
        createPageBtn(totalPages - 1);
        createPageBtn(totalPages);
    }
}

function createPageBtn(num) {
    const btn = document.createElement("button");
    btn.textContent = num;
    if (num === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
        currentPage = num;
        renderProducts();
    });
    pageNumberSpan.appendChild(btn);
}

function addEllipsis() {
    const span = document.createElement("span");
    span.textContent = "...";
    span.classList.add("ellipsis");
    span.addEventListener("click", () => {
        showAllPages = true;
        updatePagination();
    });
    pageNumberSpan.appendChild(span);
}

const suggestionContainer = document.querySelector(".suggested-blogs");

if (productContainer) {
  renderProducts();

  prevBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (currentPage < Math.ceil(currentProducts.length / productsPerPage)) {
      currentPage++;
      renderProducts();
    }
  });

  searchInput?.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    currentProducts = term
      ? products.filter(p => p.name.toLowerCase().includes(term))
      : [...products];

    currentPage = 1;
    showAllPages = false;
    pagination.style.display = term ? "none" : "flex";
    renderProducts();
  });

} else if (suggestionContainer) {
  const itemsToShow = products.slice(0, 8);
  suggestionContainer.innerHTML = "";
  itemsToShow.forEach(product => {
    suggestionContainer.innerHTML += `
      <div class="column grid grid1">
        <div class="image-container" style="background-image: url(${product.image});"></div>
        <div class="innerblog">
        <p><b>${product.name}</b></p>
        <p>
        <a href="${product.link}">Read More <i class="fa-solid fa-angles-right"></i></a>
        </p>
        </div>
        </div>
        `;
  });
}


// ✅ Text-to-Speech setup
const synth = window.speechSynthesis;
let utterance = null;
let isPaused = false;

const volumeIcon = document.getElementById("volume-icon");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const blogContent = document.querySelector(".blog-content");

function clearActiveClasses() {
  volumeIcon.classList.remove("active");
  playIcon.classList.remove("active");
  pauseIcon.classList.remove("active");
}

if (blogContent && volumeIcon && playIcon && pauseIcon) {
  volumeIcon.addEventListener("click", () => {
    if (synth.speaking) {
      synth.cancel();
      console.log("Speech stopped (mute).");
    }
    clearActiveClasses();
    volumeIcon.classList.add("active");
  });

  playIcon.addEventListener("click", () => {
    const text = blogContent.innerText;
    if (!synth.speaking || isPaused) {
      if (isPaused) {
        synth.resume();
        isPaused = false;
        console.log("Speech resumed.");
      } else {
        utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
        console.log("Speech started.");
      }
    }
    clearActiveClasses();
    playIcon.classList.add("active");
  });

  pauseIcon.addEventListener("click", () => {
    if (synth.speaking) {
      synth.pause();
      isPaused = true;
      console.log("Speech paused.");
    }
    clearActiveClasses();
    pauseIcon.classList.add("active");
  });
}

window.addEventListener("beforeunload", () => {
  window.speechSynthesis.cancel();
});