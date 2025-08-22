// Handle plan selection buttons
document.addEventListener('DOMContentLoaded', () => {
  const selectButtons = document.querySelectorAll('.select-plan');

  selectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedPlan = button.getAttribute('data-plan');
      localStorage.setItem('selectedPlan', selectedPlan);
      alert(`You selected the ${selectedPlan} plan!`);
      // window.location.href = 'payment.html'; // Uncomment if redirect needed
    });
  });

  // If you're on mylist.html, load saved anime list
  if (document.getElementById('myListContainer')) {
    loadMyList();
  }

  // If you're on checkout page, display checkout details
  if (document.getElementById('checkout-plan')) {
    const planName = localStorage.getItem('selectedPlan') || 'Not selected';
    const price = localStorage.getItem('selectedPrice') || 'Not available';
    const method = localStorage.getItem('paymentMethod') || 'Not selected';

    document.getElementById('checkout-plan').textContent = planName;
    document.getElementById('checkout-price').textContent = price;
    document.getElementById('checkout-method').textContent = method;
  }
});

// Function to add anime to My List
function addToList(title, image, link) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];

  // Prevent duplicates
  if (!myList.some(item => item.title === title)) {
    myList.push({ title, image, link });
    localStorage.setItem("myList", JSON.stringify(myList));
    alert(`${title} added to My List!`);
  } else {
    alert(`${title} is already in My List.`);
  }
}

// Load and display saved anime list on mylist.html
function loadMyList() {
  const container = document.getElementById("myListContainer");
  let myList = JSON.parse(localStorage.getItem("myList")) || [];

  if (!container) return; // Safety check
  container.innerHTML = ""; // Clear container first

  if (myList.length === 0) {
    container.innerHTML = "<p>No anime added to My List yet.</p>";
    return;
  }

  myList.forEach((anime, index) => {
    const card = document.createElement("div");
    card.classList.add("anime-card");
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <button onclick="window.location.href='${anime.link}'">Watch Now</button>
      <button onclick="removeFromList(${index})">Remove</button>
    `;
    container.appendChild(card);
  });
}

// Remove anime from list by index
function removeFromList(index) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];
  myList.splice(index, 1);
  localStorage.setItem("myList", JSON.stringify(myList));
  loadMyList(); // Reload list without full page refresh
}

// (Optional) Display anime cards dynamically
function displayAnimeList(animeList, listContainer) {
  if (!listContainer) return;

  animeList.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}" />
      <h3 class="anime-title">${anime.title}</h3>
      <button onclick="addToList('${anime.title}', '${anime.image}', '${anime.link}')">Add to My List</button>
      <button onclick="window.location.href='${anime.link}'">Watch Now</button>
    `;
    listContainer.appendChild(card);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const cardsPerPage = 20;
  const animeCards = document.querySelectorAll(".anime-card");
  const paginationContainer = document.getElementById("pagination");

  const totalPages = Math.ceil(animeCards.length / cardsPerPage);
  let currentPage = 1;

  function showPage(page) {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    animeCards.forEach((card, index) => {
      card.style.display = index >= start && index < end ? "block" : "none";
    });

    renderPagination(page);
  }

  function renderPagination(page) {
    paginationContainer.innerHTML = "";

    // First <<
    const firstBtn = document.createElement("button");
    firstBtn.textContent = "«";
    firstBtn.disabled = page === 1;
    firstBtn.addEventListener("click", () => {
      currentPage = 1;
      showPage(currentPage);
    });
    paginationContainer.appendChild(firstBtn);

    // Previous <
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "‹";
    prevBtn.disabled = page === 1;
    prevBtn.addEventListener("click", () => {
      currentPage--;
      showPage(currentPage);
    });
    paginationContainer.appendChild(prevBtn);

    // Current Page <3>
    const pageDisplay = document.createElement("span");
    pageDisplay.className = "current-page";
    pageDisplay.textContent = `<${page}>`;
    paginationContainer.appendChild(pageDisplay);

    // Next >
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "›";
    nextBtn.disabled = page === totalPages;
    nextBtn.addEventListener("click", () => {
      currentPage++;
      showPage(currentPage);
    });
    paginationContainer.appendChild(nextBtn);

    // Last >>
    const lastBtn = document.createElement("button");
    lastBtn.textContent = "»";
    lastBtn.disabled = page === totalPages;
    lastBtn.addEventListener("click", () => {
      currentPage = totalPages;
      showPage(currentPage);
    });
    paginationContainer.appendChild(lastBtn);
  }

  // Initial call
  showPage(currentPage);
});









