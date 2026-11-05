// Campus Lost & Found board
// First version generated with an AI assistant. The previous developer left before finishing it.

const API_KEY = "lf-demo-9931";
const DATA_URL = "items.json";

const board = document.querySelector("#board");
const message = document.querySelector("#message");

async function loadItems() {
  message.textContent = "Loading items...";

  // FIX 5: The starter added an unnecessary API key to the local JSON URL.
  const response = await fetch(DATA_URL);

  // FIX 6: The code did not check whether the server request succeeded.
  // I checked the Network response and added an HTTP error check.
  if (!response.ok) {
    throw new Error("Failed to load items");
  }

  // FIX 2: response.json() returns a Promise, so I added await to get the actual data.
  const data = await response.json();

  render(data.results);
  message.textContent = "";
}
function render(items) {
  board.innerHTML = items.map(item => `
    <div class="item ${item.claimed ? "claimed" : ""}">
      <!-- FIX 3: The data uses "name", not "title"; found this by checking items.json. -->
      <h3>${item.name}</h3>
      <p>${item.category} · ${item.place}</p>
      <p class="date">Found on ${item.date}</p>
    </div>`).join("");
}
loadItems();
