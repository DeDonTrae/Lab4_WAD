// Our "JSON dataset"
let students = [
    {
        first: "Raimo",
        last: "Dengeinge",
        email: "220121273@nust.na",
        prog: "Software Engineering",
        year: "3",
        interests: "C#, Backend, FullStack, Cisco, Networking",
        photo: "https://media.licdn.com/dms/image/v2/D4D03AQGdRIVGD-uoZw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718210450591?e=1759968000&v=beta&t=QFUWWvn5gePaoWtcIRR8mUHZuVS6fq2v6iHqY6mWdgU"
    }
];

// Validate email format
function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Render everything
function renderAll() {
    const cards = document.getElementById("cards");
    const tbody = document.getElementById("summaryBody");
    cards.innerHTML = "";
    tbody.innerHTML = "";

    students.forEach(data => {
        // --- Cards ---
        const card = document.createElement("div");
        const yearDescription = data.year === "4" ? "Post Graduate" : Number(data.year) <= 3 ? "Under Graduate"
            : "";;
        card.className = "card-content";
        card.innerHTML = `
          <img src="${data.photo || "https://placehold.co/128"}" loading="lazy" alt="Profile of ${data.first}">
          <h3>${data.first} ${data.last}</h3>
          <p>${data.prog}</p>
          <p>${yearDescription}</p>
          <button class="remove" hidden>Remove</button>
        `;
        cards.prepend(card);

        // --- Summary Table ---
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${data.first} ${data.last}</td>
          <td>${data.year}</td>
          <td>${data.prog}</td>
          <td>${data.email}</td>          
          <td>${data.interests || "NONE"}</td>
        `;
        tbody.appendChild(tr);

        // Remove handler
        card.querySelector(".remove").addEventListener("click", () => {
            students = students.filter(s => s.email !== data.email);
            renderAll();
        });
    });

    // Update JSON dump
    // document.getElementById("jsonDump").textContent = JSON.stringify(students, null, 2);
}

//Registration Form Exception Handler
document.getElementById("regForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const first = document.getElementById("first").value.trim();
    const last = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();
    const prog = document.getElementById("prog").value.trim();
    const year = document.querySelector("input[name=year]:checked");
    const interests = document.getElementById("interests").value.trim();
    const photo = document.getElementById("photo").value.trim();

    let valid = true;

    if (!first) { document.getElementById("err-first").textContent = "Required"; valid = false; }
    else { document.getElementById("err-first").textContent = ""; }

    if (!last) { document.getElementById("err-last").textContent = "Required"; valid = false; }
    else { document.getElementById("err-last").textContent = ""; }

    if (!validateEmail(email)) { document.getElementById("err-email").textContent = "Invalid email"; valid = false; }
    else { document.getElementById("err-email").textContent = ""; }

    if (!prog) { document.getElementById("err-prog").textContent = "Required"; valid = false; }
    else { document.getElementById("err-prog").textContent = ""; }

    if (!year) { document.getElementById("err-year").textContent = "Select a year"; valid = false; }
    else { document.getElementById("err-year").textContent = ""; }

    if (!photo) { document.getElementById("err-photo").textContent = "Enter a URL of you image"; valid = false; }
    else { document.getElementById("err-photo").textContent = ""; }

    if (!valid) {
        document.getElementById("live").textContent = "Please fix errors before submitting.";
        return;
    }


    // Add to dataset students
    students.push({ first, last, email, prog, year: year.value, interests, photo });

    // Reset form 
    e.target.reset();
    //Close modal on submission
    closeModal();

    renderAll();
});

// Registration Modal logic
const modal = document.getElementById("modal");
document.getElementById("openModal").addEventListener("click", () => modal.style.display = "flex");
document.getElementById("closeModal").addEventListener("click", closeModal);
window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

// Summary Modal logic
const summaryModal = document.getElementById("summaryModal");
document.getElementById("openModalSummary").addEventListener("click", () => {
    summaryModal.style.display = "flex";
});

document.getElementById("closeSummaryModal").addEventListener("click", () => {
    summaryModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === summaryModal) summaryModal.style.display = "none";
});

function closeModal() { modal.style.display = "none"; }

// Render all on page load
renderAll();
