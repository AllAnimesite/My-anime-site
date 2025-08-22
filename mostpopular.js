const animeList = [
  {
    title: "Lookism",
    image: "/images/lookism.jpg",
    link: "/lookism.html"
  },
  {
    title: "Blue Lock",
    image: "/images/blue lock.jpg",
    link: "/blue-lock.html"
  },
  {
    title: "Parasyte",
    image: "/images/parasyte.jpg",
    link: "/parasyte.html"
  }
  // Add more anime...
];

function renderAnimeCards() {
  const container = document.getElementById("animeContainer");
  if (!container) return;

  animeList.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";

    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}" />
      <h3 class="anime-title">${anime.title}</h3>
      <button onclick="window.location.href='${anime.link}'">Watch Now</button>
      <button onclick="addToList('${anime.title}', '${anime.image}', '${anime.link}')" class="icon-button">
        <img src="/images/my list.png" alt="Add to My List" class="mylist-icon" style="width: 20px; height: 20px; object-fit: contain; position: relative;" />
        <span>My List</span>
      </button>
    `;
    container.appendChild(card);
  });
}

function addToList(title, image, link) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];

  if (!myList.some(item => item.title === title)) {
    myList.push({ title, image, link });
    localStorage.setItem("myList", JSON.stringify(myList));
    alert(`${title} added to My List!`);
  } else {
    alert(`${title} is already in My List.`);
  }
}

// Automatically render cards on load
document.addEventListener("DOMContentLoaded", renderAnimeCards);

