// Active Navbar Highlighting

const sections = document.querySelectorAll(
  "#home, #work, #experience, #contact"
);

const navLinks = document.querySelectorAll(".navbar nav a");

const isWorkPage = window.location.pathname.endsWith("work.html");
const isResumePage = window.location.pathname.endsWith("resume.html");

if (!isWorkPage && !isResumePage) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          const target = link.getAttribute("href").split("#")[1];

          if (target === entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach((section) => observer.observe(section));
}

// WORK PAGE – SCROLL REVEAL
if (window.location.pathname.endsWith("work.html")) {
  const cards = document.querySelectorAll(".masonry-card");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 100}ms`;
      card.classList.add("reveal-ready");
      revealObserver.observe(card);
    });
  }
}

// WORK PAGE – PROJECT FILTERS
if (window.location.pathname.endsWith("work.html")) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".masonry-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        card.style.display =
          selectedFilter === "all" || category === selectedFilter
            ? "inline-block"
            : "none";
      });
    });
  });
}

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

const projectDetails = {
  procurement: {
    title: "Procurement Platform",
    category: "Enterprise SaaS · Web Application",
    images: [
      "projects/Nx f1.png"
    ]
  },

  campeon: {
    title: "Campeon",
    category: "E-commerce · Website Redesign",
    images: [
      "projects/Campeon new 1.png"
    ]
    
  },

  cafe: {
    title: "Cafe Wild Beans",
    category: "Food & Beverage · Mobile Application",
    images: [
      "projects/cfb case study.png"
    ]
  },

  studio: {
    title: "Studio Booking Website",
    category: "Booking Platform · Web Application",
    images: [
      "projects/Screenshot 2026-11-02 150044.png"
    ]
  }
};

// Open project popup
document.querySelectorAll(".project-visual[data-project], .masonry-card[data-project]").forEach(card => {
  function openProject() {
    const project = projectDetails[card.dataset.project];

    if (!project) return;

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;

    modalBody.innerHTML = "";

    project.images.forEach(imagePath => {
      const image = document.createElement("img");
      image.src = imagePath;
      image.alt = project.title;
      modalBody.appendChild(image);
    });

    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  card.addEventListener("click", openProject);

  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  });
});

// Close popup
function closeProjectModal() {
  projectModal.classList.remove("active");
  document.body.style.overflow = "";
}

if (modalClose && projectModal) {

  modalClose.addEventListener("click", closeProjectModal);

  projectModal.addEventListener("click", event => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && projectModal.classList.contains("active")) {
      closeProjectModal();
    }
  });

}
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && projectModal.classList.contains("active")) {
    closeProjectModal();
  }
});
// CONTACT PAGE COPY BUTTONS
console.log("Copy button script loaded");
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied!";

      setTimeout(() => {
        button.textContent = "Copy";
      }, 1500);
    } catch (error) {
      button.textContent = "Copy failed";
    }
  });
});