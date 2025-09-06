# WAD621S — Lab 4: Registration Profile Cards
## Author
Raimo Dengeinge — Student #: 220121273

## Overview
This project implements an accessible registration form that validates input and dynamically renders profile cards and a synchronized summary table.

## Features implemented
- HTML form with labels and fieldset/legend via modals
- Inline validation 
- Aria-live region for screen-reader feedback
- Dynamic profile card creation per submission
- Summary table kept in sync with cards
- Remove action deletes both card and matching table row (hidden attribute)

## Files
- `index.html` — main page
- `style.css` — styles
- `script.js` — JavaScript

## How to run
1. Clone or download repository.
2. Open `index.html` in your browser (no server required). Optionally run Live Server in VS Code.


## Notes for marking
- The code includes inline error messages, `aria-live` feedback, keyboard accessible buttons, and readable font sizes.
- To enable localStorage persistence (stretch goal), set `enablePersistence = true` in `script.js`.

## GitHub repository
`https://github.com/DeDonTrae/Lab4_WAD`