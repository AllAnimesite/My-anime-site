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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9gjpoSDnpWUnPKOGVyK-UH26pvbWh1vE",
  authDomain: "animecomments-bc4ba.firebaseapp.com",
  projectId: "animecomments-bc4ba",
  storageBucket: "animecomments-bc4ba.firebasestorage.app",
  messagingSenderId: "172998302932",
  appId: "1:172998302932:web:fa5766a027f68146322f41",
  measurementId: "G-VZDG31F9JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get anime ID from data attribute
const animeId = document.getElementById("commentsSection").dataset.anime;

// Check if user is logged in (from your signup/login system)
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

const commentForm = document.getElementById("commentForm");
const loginMessage = document.getElementById("loginMessage");
const commentList = document.getElementById("commentList");

if (loggedInUser) {
  commentForm.style.display = "block";
  loginMessage.style.display = "none";
}

// Render comments in real-time
db.collection("comments")
  .where("animeId", "==", animeId)
  .orderBy("timestamp", "asc")
  .onSnapshot(snapshot => {
    commentList.innerHTML = "";
    snapshot.forEach(doc => {
      const comment = doc.data();
      const div = document.createElement("div");
      div.className = "comment";
      div.innerHTML = `
        <strong>${comment.user}</strong>: ${comment.text}
        ${comment.user === (loggedInUser?.name || loggedInUser?.fullName) 
          ? `<button onclick="deleteComment('${doc.id}')">Delete</button>` 
          : ""}
      `;
      commentList.appendChild(div);
    });
  });

// Post comment
async function postComment() {
  const commentText = document.getElementById("userComment").value.trim();
  if (!commentText) return;
}











