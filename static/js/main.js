const cards = document.querySelectorAll('.capability-card');

const observer1 = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }

    });

},{threshold:.2});

cards.forEach(card=>{
    observer1.observe(card);
});

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }

    });

});

document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

const slides = document.querySelectorAll('.slide');

let current = 0;

function nextSlide() {

    slides[current].classList.remove('active');

    current++;

    if(current >= slides.length){
        current = 0;
    }

    slides[current].classList.add('active');
}

setInterval(nextSlide, 6000);


/* Counter Animation */

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.dataset.target;
        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText =
            Math.ceil(count + increment);

            setTimeout(updateCounter,20);

        } else {

            counter.innerText = target;
        }
    };

    updateCounter();
});

document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     LEADER MODAL
  ============================== */
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

  document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('leaderModal').classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target.id === 'leaderModal') {
      document.getElementById('leaderModal').classList.remove('active');
    }
  });

  /* ==============================
     CONTACT FORM (REAL API)
  ============================== */
  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = form.querySelector(".submit-btn");
      const loader = btn.querySelector(".loader");

      btn.disabled = true;
      loader.style.display = "inline-block";
      statusDiv.textContent = "Sending...";
      statusDiv.style.color = "#555";

      const payload = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        company: document.getElementById("company").value.trim(),
        message: document.getElementById("message").value.trim()
      };

      try {
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

      } catch (err) {
        statusDiv.textContent = "Something went wrong. Please try again.";
        statusDiv.style.color = "red";
      } finally {
        btn.disabled = false;
        loader.style.display = "none";
      }
    });
  }

  /* ==============================
     MOBILE MENU
  ============================== */
  window.toggleMenu = function () {
    document.getElementById("navMenu")?.classList.toggle("show");
  };

  /* ==============================
     FOOTER YEAR
  ============================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
