// Campus Lost & Found board
// First version generated with an AI assistant. The previous developer left before finishing it.

const DATA_URL = "items.json";

const board = document.querySelector("#board");
const message = document.querySelector("#message");
const count = document.querySelector("#count");
const search = document.querySelector("#search");
const category = document.querySelector("#category");

let allItems = [];

async function loadItems() {
  message.textContent = "Loading items...";

  // FIX 5: The starter added an unnecessary API key to the local JSON URL.
  const response = await fetch(DATA_URL);

  // FIX 6: The code did not check whether the server request succeeded.
  // I checked the Network response and added an HTTP error check.
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  try {
    // FIX 2: response.json() returns a Promise, so I added await to get the actual data.
    const data = await response.json();

    allItems = data.results;

    createCategories();
    showItems();

    message.textContent = "";
  } catch (error) {
    showError(error);
  }
}

function createCategories() {
  category.innerHTML = '<option value="all">All categories</option>';

  const categories = [...new Set(allItems.map(item => item.category))];

  categories.forEach(itemCategory => {
    const option = document.createElement("option");
    option.value = itemCategory;
    option.textContent = itemCategory;
    category.appendChild(option);
  });
}

function showItems() {
  const searchText = search.value.toLowerCase().trim();
  const selectedCategory = category.value;

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  count.textContent = `Showing ${filteredItems.length} item(s)`;

  if (filteredItems.length === 0) {
    board.innerHTML = "<p>No items found.</p>";
    return;
  }

  render(filteredItems);
}

function render(items) {
  board.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "item";

    if (item.claimed) {
      card.classList.add("claimed");
    }

    // FIX 3: The data uses "name", not "title"; found this by checking items.json.
    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const details = document.createElement("p");
    details.textContent =
      `${item.category} · ${item.place || "Place not recorded"}`;

    const date = document.createElement("p");
    date.className = "date";
    date.textContent = `Found on ${item.date}`;

    card.appendChild(heading);
    card.appendChild(details);
    card.appendChild(date);

    board.appendChild(card);
  });
}

function showError(error) {
  board.innerHTML = "";
  count.textContent = "";

  if (error.message.includes("404")) {
    message.textContent =
      "Items could not be found. Please check the data file.";
  } else {
    message.textContent =
      "Could not load items. Please check your connection and try again.";
  }
}

search.addEventListener("input", showItems);
category.addEventListener("change", showItems);

loadItems().catch(showError);