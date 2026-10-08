// ==========================================
// LENIS SMOOTH SCROLL
// ==========================================

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 4),
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.9,
  touchMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
// ==========================================
// LOADER
// ==========================================

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {

  setTimeout(() => {

    loader.classList.add("hide");

  }, 900);

});


// ==========================================
// SMOOTH NAVIGATION
// ==========================================
// Updated:
// - Accounts for fixed navbar height
// - Keeps section heading visible
// - Smooth scrolling
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#" ||
      targetId === "#top"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);

    if (!target) {
      return;
    }


    event.preventDefault();


    const header =
      document.querySelector(".top");


    const headerHeight =
      header
        ? header.offsetHeight
        : 0;


    /*
      Calculate the exact position.

      Header height
      + extra spacing
      = prevents the section from sitting
      directly underneath the navbar.
    */

    const offset = 25;


    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      offset;


    window.scrollTo({

      top: targetPosition,

      behavior: "smooth"

    });

  });

});


// ==========================================
// GALLERY FILTERS
// ==========================================

const filters =
  document.querySelectorAll(
    ".filters button"
  );


const items = [
  ...document.querySelectorAll(
    ".gallery figure"
  )
];


filters.forEach((button) => {

  button.addEventListener("click", () => {

    filters.forEach((btn) => {

      btn.classList.remove(
        "active"
      );

    });


    button.classList.add(
      "active"
    );


    const filter =
      button.dataset.filter;


    items.forEach((item) => {

      const shouldHide =
        filter !== "all" &&
        item.dataset.cat !== filter;


      item.classList.toggle(
        "hidden",
        shouldHide
      );

    });

  });

});


// ==========================================
// WORKS CAROUSEL
// ==========================================

const projects = [
  ...document.querySelectorAll(
    ".project"
  )
];


const workPrev =
  document.querySelector(
    ".work-prev"
  );


const workNext =
  document.querySelector(
    ".work-next"
  );


const workCounter =
  document.querySelector(
    ".work-counter"
  );


let workIndex = 0;


// ==========================================
// UPDATE WORK
// ==========================================

function updateWork(
  index,
  animate = true
) {

  if (!projects.length) {
    return;
  }


  workIndex =
    (index + projects.length) %
    projects.length;


  projects.forEach(
    (project, number) => {

      project.classList.toggle(
        "is-current",
        number === workIndex
      );

    }
  );


  workCounter.textContent =
    `${String(workIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;


  const target =
    projects[workIndex];


  if (animate && target) {

    /*
      Use the same navigation
      alignment as the main navbar.
    */

    const header =
      document.querySelector(".top");


    const headerHeight =
      header
        ? header.offsetHeight
        : 0;


    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      25;


    window.scrollTo({

      top: targetPosition,

      behavior: "smooth"

    });

  }

}


// ==========================================
// WORK CLICK
// ==========================================

projects.forEach(
  (project, index) => {

    project.addEventListener(
      "click",
      (event) => {

        event.preventDefault();


        updateWork(
          index,
          false
        );


        const category =
          project.dataset.cat;


        const categoryItems =
          items.filter(
            (item) =>
              item.dataset.cat ===
              category
          );


        openLightboxWith(
          categoryItems,
          0
        );

      }
    );

  }
);


// ==========================================
// WORK ARROWS
// ==========================================

if (workPrev) {

  workPrev.addEventListener(
    "click",
    () => {

      updateWork(
        workIndex - 1
      );

    }
  );

}


if (workNext) {

  workNext.addEventListener(
    "click",
    () => {

      updateWork(
        workIndex + 1
      );

    }
  );

}


updateWork(
  0,
  false
);


// ==========================================
// LIGHTBOX
// ==========================================

const lightbox =
  document.querySelector(
    ".lightbox"
  );


const lightboxImage =
  lightbox.querySelector(
    "img"
  );


const caption =
  lightbox.querySelector(
    ".lb-caption"
  );


let currentImages = [];

let currentIndex = 0;


// ==========================================
// SHOW LIGHTBOX IMAGE
// ==========================================

function showImage(index) {

  if (!currentImages.length) {
    return;
  }


  currentIndex =
    (index + currentImages.length) %
    currentImages.length;


  const image =
    currentImages[
      currentIndex
    ].querySelector("img");


  if (!image) {
    return;
  }


  lightboxImage.src =
    image.src;


  lightboxImage.alt =
    image.alt || "";


  const figcaption =
    currentImages[
      currentIndex
    ].querySelector(
      "figcaption"
    );


  caption.textContent =
    figcaption
      ? figcaption.textContent
      : "";

}


// ==========================================
// OPEN LIGHTBOX
// ==========================================

function openLightboxWith(
  list,
  start = 0
) {

  currentImages = list;


  if (!currentImages.length) {
    return;
  }


  showImage(start);


  lightbox.classList.add(
    "open"
  );


  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "no-scroll"
  );

}


// ==========================================
// CLOSE LIGHTBOX
// ==========================================

function closeLightbox() {

  lightbox.classList.remove(
    "open"
  );


  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "no-scroll"
  );

}


// ==========================================
// GALLERY IMAGE CLICK
// ==========================================

items.forEach((item) => {

  item.addEventListener(
    "click",
    () => {

      const category =
        item.dataset.cat;


      const categoryItems =
        items.filter(
          (galleryItem) =>
            galleryItem.dataset.cat ===
            category
        );


      const clickedIndex =
        categoryItems.indexOf(
          item
        );


      openLightboxWith(
        categoryItems,
        clickedIndex
      );

    }
  );

});


// ==========================================
// LIGHTBOX BUTTONS
// ==========================================

const closeButton =
  document.querySelector(
    ".close"
  );


const prevButton =
  document.querySelector(
    ".prev"
  );


const nextButton =
  document.querySelector(
    ".next"
  );


if (closeButton) {

  closeButton.addEventListener(
    "click",
    closeLightbox
  );

}


if (prevButton) {

  prevButton.addEventListener(
    "click",
    () => {

      showImage(
        currentIndex - 1
      );

    }
  );

}


if (nextButton) {

  nextButton.addEventListener(
    "click",
    () => {

      showImage(
        currentIndex + 1
      );

    }
  );

}


// ==========================================
// CLOSE LIGHTBOX OUTSIDE IMAGE
// ==========================================

lightbox.addEventListener(
  "click",
  (event) => {

    if (
      event.target === lightbox
    ) {

      closeLightbox();

    }

  }
);


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      !lightbox.classList.contains(
        "open"
      )
    ) {
      return;
    }


    if (
      event.key === "Escape"
    ) {

      closeLightbox();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      showImage(
        currentIndex - 1
      );

    }


    if (
      event.key === "ArrowRight"
    ) {

      showImage(
        currentIndex + 1
      );

    }

  }
);


// ==========================================
// SOUND BUTTON
// ==========================================

const sound =
  document.querySelector(
    ".sound"
  );


if (sound) {

  sound.addEventListener(
    "click",
    () => {

      const label =
        sound.querySelector("b");


      if (!label) {
        return;
      }


      label.textContent =
        label.textContent === "off"
          ? "on"
          : "off";

    }
  );

}


// ==========================================
// SCROLL REVEAL
// ==========================================

const revealElements =
  document.querySelectorAll(
    ".intro, .project, .gallery figure, .motion-card, .services, .contact"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(
      element
    );

  }
);
