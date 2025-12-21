// small interactive helpers

document.querySelectorAll('.view-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.leader-card');

    document.getElementById('modalName').innerText = card.dataset.name;
    document.getElementById('modalRole').innerText = card.dataset.role;
    document.getElementById('modalExp').innerText = card.dataset.exp;
    document.getElementById('modalBio').innerText = card.dataset.bio;
    document.getElementById('modalPhoto').src = card.dataset.photo;

    document.getElementById('leaderModal').classList.add('active');
  });
});

document.querySelector('.close-modal').onclick = () => {
  document.getElementById('leaderModal').classList.remove('active');
};

window.onclick = e => {
  if (e.target.id === 'leaderModal') {
    document.getElementById('leaderModal').classList.remove('active');
  }
};

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // your logic
    const btn = document.querySelector(".submit-btn");
    const loader = btn.querySelector(".loader");
    const status = document.getElementById("formStatus");

    btn.disabled = true;
    loader.style.display = "inline-block";
    status.textContent = "Sending...";

  setTimeout(() => {
    loader.style.display = "none";
    status.textContent = "Message sent! We will get back soon.";
    btn.disabled = false;
  }, 1500);
});

}

  
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

// function toggleMenu() {
//   document.querySelector('.nav').classList.toggle('active');
// }

document.getElementById('year')?.textContent == new Date().getFullYear();
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusDiv.textContent = "Sending...";
    statusDiv.style.color = "#555";

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("Phone")?.value || "",
      company: document.getElementById("company")?.value || "",
      message: document.getElementById("message").value.trim()
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    statusDiv.textContent = data.message;

    if (data.status === "success") {
      statusDiv.style.color = "green";
      form.reset();
    } else if (data.status === "info") {
      statusDiv.style.color = "orange";
    } else {
      statusDiv.style.color = "red";
    }
  });
});

