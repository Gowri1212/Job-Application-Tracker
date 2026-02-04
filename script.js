// Select DOM elements
const form = document.getElementById("application-form");
const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const statusSelect = document.getElementById("status");
const applicationsList = document.getElementById("applications-list");

// Load saved applications from LocalStorage
let applications = JSON.parse(localStorage.getItem("applications")) || [];

// Render applications to the page
function renderApplications() {
  applicationsList.innerHTML = "";

  applications.forEach((app, index) => {
    const div = document.createElement("div");
    div.className = "application-card";

    div.innerHTML = `
      <strong>${app.company}</strong>
      <p>${app.role}</p>
      <span>Status: ${app.status}</span>
      <button onclick="deleteApplication(${index})">Delete</button>
    `;

    applicationsList.appendChild(div);
  });
}

// Save applications to LocalStorage
function saveApplications() {
  localStorage.setItem("applications", JSON.stringify(applications));
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newApplication = {
    company: companyInput.value,
    role: roleInput.value,
    status: statusSelect.value,
    date: new Date().toLocaleDateString()
  };

  applications.push(newApplication);
  saveApplications();
  renderApplications();

  form.reset();
});

// Delete application
function deleteApplication(index) {
  applications.splice(index, 1);
  saveApplications();
  renderApplications();
}

// Initial render on page load
renderApplications();
