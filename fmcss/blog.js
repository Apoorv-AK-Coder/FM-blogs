const products = [
    { image: "https://eazair.com/images/behold-the-wilderness-on-an-alaska-helicopter-tour.jpg", name: "Behold the Wilderness on an Alaska Helicopter Tour", para: "Alaska has a wild landscape that is sure to give unique panoramas, and an Alaska helicopter tour gives you a front-row seat...", link: "https://www.eazair.com/blog/behold-the-wilderness-on-an-alaska-helicopter-tour" },
    { image: "https://eazair.com/images/best-deals-on-budget-car-rental-lax-to-travel-on-a-budget.jpg", name: "Deals on Budget Car Rental LAX to Travel on a Budget", para: "The Los Angeles International Airport happens to be among the busiest entry points into Southern California, and therefore efficient...", link: "https://www.eazair.com/blog/best-deals-on-budget-car-rental-lax-to-travel-on-a-budgetBest" },
    { image: "https://eazair.com/images/best-services-of-car-rental-newark-airport-to-relax-your-journey.jpg", name: "Services of Car Rental Newark Airport to Relax Your Journey", para: "The Newark Liberty International Airport is a very busy travel hub in the U.S. and serves millions of passengers who fly in & out of...", link: "https://www.eazair.com/blog/best-services-of-car-rental-newark-airport-to-relax-your-journeyBest" },
    { image: "https://eazair.com/images/discover-amazing-aerial-views-of-the-windy-city-on-a-chicago-helicopter-tour.jpg", name: "Discover Amazing Views of the Windy City on a Chicago Helicopter Tour", para: "Just like in the Chicago helicopter tour, the breathtaking lakefront and Chicago's iconic skyline are activated in full view. Visitors...", link: "https://www.eazair.com/blog/discover-amazing-aerial-views-of-the-windy-city-on-a-chicago-helicopter-tour" },
    { image: "https://eazair.com/images/experience-with-volcanic-magic-on-a-big-island-helicopter-tour.jpg", name: "Experience with Volcanic Magic on a Big Island Helicopter Tour", para: "The experience of seeing Hawaii's volcanic landscapes by air will leave memories that will not be forgotten any time soon, and a...", link: "https://www.eazair.com/blog/experience-with-volcanic-magic-on-a-big-island-helicopter-tour" },
    { image: "https://eazair.com/images/explore-the-world-with-5-star-helicopter-tours.jpg", name: "Explore the World with 5 Star Helicopter Tours", para: "Want to fly above the world with a 5-star helicopter tour? These tours provide magnificent panoramic views through the...", link: "https://www.eazair.com/blog/explore-the-world-with-5-star-helicopter-tours" },
    { image: "https://eazair.com/images/luxury-car-rental-companies-in-the-united-states-to-travel-in-style.jpg", name: "Luxury Car Rental Companies in the United States to Travel in Style", para: "The right luxury car will make travelling around the United States a first-class event. Whether it is a legendary road trip along...", link: "https://www.eazair.com/blog/luxury-car-rental-companies-in-the-united-states-to-travel-in-style" },
    { image: "https://eazair.com/images/view-those-iconic-spots-with-the-fly-nyon-helicopter-tour.jpg", name: "View Those Iconic Spots with the FlyNYON Helicopter Tour", para: "A FlyNYON helicopter tour is a way to experience the New York City skyline from the air that is full of excitement. This tour is...", link: "https://www.eazair.com/blog/view-those-iconic-spots-with-the-fly-nyon-helicopter-tour" },
    { image: "https://eazair.com/images/paradise-awaits-with-an-air-maui-helicopter-tour.jpg", name: "Paradise Awaits with an Air Maui Helicopter Tour", para: "Maui has some of the most fabulous scenery that cannot be viewed as magical as when it is witnessed through the air. The Air Maui...", link: "https://www.eazair.com/blog/paradise-awaits-with-an-air-maui-helicopter-tour" },
    { image: "https://eazair.com/images/soar-over-the-ozarks-with-a-branson-helicopter-tour.jpg", name: "Soar Over the Ozarks with a Branson Helicopter Tour", para: "The Ozark Mountains are full of gorgeous sights, and one can enjoy them with the help of a Branson helicopter tour. Aerial views of...", link: "https://www.eazair.com/blog/soar-over-the-ozarks-with-a-branson-helicopter-tour" },
    { image: "https://eazair.com/images/top-choices-car-rental-myrtle-beach-of-coastal-explorations-now.jpg", name: "Choices Car Rental Myrtle Beach of Coastal Explorations Now", para: "The best way to see the spectacular south coast beauty of South Carolina is by driving. Whether it is an oceanfront boardwalk or...", link: "https://www.eazair.com/blog/top-choices-car-rental-myrtle-beach-of-coastal-explorations-nowTop" },
    { image: "https://eazair.com/images/top-companies-for-car-rental-at-nashville-airport-to-ease-the-drive.jpg", name: "Companies for Car Rental at Nashville Airport to Ease the Drive", para: "When arriving in Music City, one will surely enjoy the trip more when followed up with a trustworthy car rental. Nashville Airport...", link: "https://www.eazair.com/blog/top-companies-for-car-rental-at-nashville-airport-to-ease-the-driveTop" },
];

const productContainer = document.querySelector(".product-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNumberSpan = document.getElementById("page-number");
const searchInput = document.querySelector(".search-column input[type='search']");
const pagination = document.querySelector(".pagination1");

const productsPerPage = 9;
let currentPage = 1;
let showAllPages = false;
let currentProducts = [...products];

function renderProducts() {
    productContainer.innerHTML = "";
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageItems = currentProducts.slice(start, end);

    pageItems.forEach(product => {
        productContainer.innerHTML += `
        <div class="column">
          <img src="${product.image}" alt="${product.name}">
          <div class="innerblog">
            <h4>${product.name}</h4>
            <p>${product.para}</p>
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