// small interactive helpers
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

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
document.getElementById('year')?.textContent == new Date().getFullYear();
console.log("JS loaded!!!");
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

    console.log("API RESPONSE:", data); // ✅ DEBUG

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

