// ===== Travelita - script.js =====
// This file contains the JavaScript code for the Travelita website.
// Each part first checks that its elements exist on the current page.
// Golnaz   - ITEC 3020 - Web 
// Technologies - York University - Fall 2026


// ---------- PART 1: Search and filter (destinations.html) ----------

var searchBox = document.getElementById("search");
var categoryBox = document.getElementById("category");
var noResults = document.getElementById("no-results");

function filterCards() {
  var searchText = searchBox.value.toLowerCase();   // user input to lowercase 
  var category = categoryBox.value;                 // "All", "Beach", ...
  var cards = document.querySelectorAll(".card");
  var visibleCount = 0;

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];

    // the name and the country/category line of this card, in lower case
    var cardText = card.querySelector("h3").textContent + " " +
                   card.querySelector(".info").textContent;
    cardText = cardText.toLowerCase();

    var matchesSearch = cardText.includes(searchText);
    var matchesCategory = (category === "All") || (card.dataset.category === category);

    if (matchesSearch && matchesCategory) {
      card.classList.remove("hidden");   // show the card
      visibleCount++;
    } else {
      card.classList.add("hidden");      // hide the card
    }
  }

  // show the message only if no card is visible
  if (visibleCount === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }
}

if (searchBox && categoryBox) {
  searchBox.addEventListener("input", filterCards);     // runs on every key press
  categoryBox.addEventListener("change", filterCards);  // runs when the choice changes

  // If the user came from the home page search box, the text is in the address
  // (for example destinations.html?search=japan). Put it in the box and filter.
  var params = new URLSearchParams(window.location.search);
  var textFromHome = params.get("search");
  if (textFromHome) {
    searchBox.value = textFromHome;
    filterCards();
  }
}


// ---------- PART 2: Save button with counter (destinations.html) ----------

var saveButtons = document.querySelectorAll(".save-button");
var savedCount = document.getElementById("saved-count");
var numberSaved = 0;

function toggleSave(event) {
  var button = event.target;               // the button that was clicked

  if (button.classList.contains("saved")) {
    button.classList.remove("saved");      // un-save
    button.textContent = "Save";
    numberSaved--;
  } else {
    button.classList.add("saved");         // save
    button.textContent = "Saved";
    numberSaved++;
  }

  savedCount.textContent = numberSaved;    // update the number on the page
}

for (var i = 0; i < saveButtons.length; i++) {
  saveButtons[i].addEventListener("click", toggleSave);
}


// ---------- PART 3: Form validation (about.html) ----------

var form = document.getElementById("contact-form");
var formMessage = document.getElementById("form-message");

function checkForm(event) {
  event.preventDefault();                  // stop the page from reloading

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  // Check 1: the name is required
  if (name === "") {
    formMessage.textContent = "Please enter your name.";
    formMessage.className = "error";
    return;
  }

  // Check 2: the email must look like name@site.com with no spaces
  var emailPattern = /^[^ ]+@[^ ]+\.[^ ]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.className = "error";
    return;
  }

  // Check 3: the message needs at least 10 characters
  if (message.length < 10) {
    formMessage.textContent = "Your message must be at least 10 characters long.";
    formMessage.className = "error";
    return;
  }

  // Everything is correct
  formMessage.textContent = "Thank you, " + name + "! We received your request.";
  formMessage.className = "success";
  form.reset();                            // clear the form
}

if (form) {
  form.addEventListener("submit", checkForm);
}
