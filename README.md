# Lost & Found Board: Hand-over notes

**Name:*Mustabshirah Aqeel*            **Roll No.:*2622-4cs-060*            **Variant:** A

## Part 1 — Fault Log (Part 1)

| Fix | What I noticed / how I found the problem | What was wrong | What I changed |
|---|---|---|---|
| FIX 1 | The page showed a JavaScript error and the items did not load correctly. I checked the Console and saw that the JavaScript was running before the HTML elements were available. | The app.js script was loaded in the <head> without defer, so it ran before the body was fully parsed. | Added defer to the app.js script tag so the JavaScript runs after the HTML has been parsed. |
| FIX 2 | After the first fix, the data request worked, but the cards still could not be rendered correctly. I checked the JavaScript code and the JSON handling. | response.json() returns a Promise, but the code did not use await to wait for the JSON data. | Changed const data = response.json(); to const data = await response.json();. |
| FIX 3 | The cards appeared, but their headings showed undefined. I checked the structure of items.json and compared the property names with the JavaScript. | The JavaScript used item.title, but the JSON data uses the property name. | Changed ${item.title} to ${item.name} in the card heading. |
| FIX 4 | Claimed cards were not showing the intended grey styling. I checked the CSS rules and found that another rule was overriding the claimed-card styling. | The #board .item rule was setting the text color and background again, overriding .item.claimed. | Changed the general rule to #board .item:not(.claimed) so claimed cards can keep their grey styling. |
| FIX 5 | I checked the fetch request and noticed that the local items.json request was adding an unnecessary API key. | The starter code included API_KEY and added it to the items.json URL even though the local JSON file does not require an API key. | Removed the unnecessary API_KEY and changed the fetch request to use fetch(DATA_URL). |
| FIX 6 | I checked how the program handled a failed server response. The code did not explicitly check whether the fetch request was successful. | The code did not check the response.ok property before trying to process the response. | Added an if (!response.ok) check that throws an error when the server response is not successful. |

## 2. What I built (Parts 2 to 4)
Write 3 to 5 lines in your own words.
## Part 2 — Features Built and Tested
- Added case-insensitive search by item name.
- Added a category dropdown generated from the data, with each category shown once.
- Added a live count showing the number of matching items.
- Added a loading message while items are being fetched.
- Added an empty-state message when no items match the search or category.
- Added error handling for a missing data file (404) and a failed connection.
- Used safe DOM text insertion with `textContent` for item data.
- Added "Place not recorded" when an item has no place.
- Tested search, category filtering, empty results, 404 errors, and connection errors.

## Part 3 — Mobile Layout and Status Badges

- Made the layout responsive at 375px width.
- Changed the item cards to a single-column layout on small screens.
- Made the search input and category dropdown at least 44px tall.
- Added a "Claimed" badge for claimed items.
- Added a "Still waiting" badge for unclaimed items.
- Tested the page at exactly 375px and checked for horizontal scrolling.

## Part 4 — Hide Claimed Items

- Added a "Hide claimed items" checkbox.
- Added filtering so claimed items can be hidden.
- Kept unclaimed items before claimed items when both are shown.
- Made the checkbox work together with search, category filtering, and the item count.
- Tested the combined filters using different search and category combinations.

## 3. AI log (at least 2 entries)
For each entry: what I asked, what the AI gave me, **what was wrong or missing**, and **how I checked it**.

**Entry 1**
- I asked: I asked the AI to help me find the errors in the starter files and explain how to fix them. 
- The AI gave: It helped me identify the six problems and suggested fixes in the HTML, CSS, and JavaScript.
- What was wrong or missing: Some suggestions were related to features that were actually part of later sections, so I had to make sure I only used the fixes needed for Part 1.
- How I checked: I ran the website using Live Server and checked the Console and Network tab to make sure the errors were fixed.

**Entry 2**
- I asked: I asked the AI how to add the search, category filter, error messages, mobile layout, badges, and hide claimed feature.
- The AI gave: It gave me the code changes and explained where to put them.
- What was wrong or missing: I had to make some changes so the new features did not remove or affect the fixes I had already made.
- How I checked: I tested the features myself by searching for items, changing categories, testing empty results and errors, checking the page at 375px, and using the hide claimed checkbox.

## 4. One thing I would improve next
I would improve the overall design of the website and make the cards and controls look more polished.