const body = document.querySelector("body");

const counters = document.querySelectorAll(".counter");
const counter1 = document.querySelector(".counter-1");
const counter2 = document.querySelector(".counter-2");
const counter3 = document.querySelector(".counter-3");

const loader1 = document.getElementById("loader-1");
const loader2 = document.getElementById("loader-2");

gsap.registerPlugin(CustomEase);

function loadingAnimation() {
  gsap.set(["header", "main", "footer"], {
    opacity: 0,
    duration: 0,
  });

  for (let i = 0; i < 11; i++) {
    const digit = document.createElement("div");
    digit.textContent = i < 10 ? i : 0;
    digit.classList.add("num");
    counter2.appendChild(digit);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 10; j++) {
      const digit = document.createElement("div");
      digit.textContent = j;
      digit.classList.add("num");
      counter3.appendChild(digit);
    }
  }

  function animateLoader() {
    const dim1 = loader1.getBoundingClientRect();
    const dim2 = loader2.getBoundingClientRect();

    gsap.to("#loader-1 #progress-1", {
      width: "100%",
      duration: 3.1,
      ease: "power2.in",
    });

    gsap.to("#loader-2 #progress-2", {
      width: "100%",
      duration: 1.9,
      delay: 3.1,
      ease: "power2.out",
    });

    gsap.to("#loader-1", {
      rotate: "90deg",
      transformOrigin: "center",
      delay: 6,
    });

    gsap.to("#loader-2", {
      x: (-1 * (dim1.width + dim1.height)) / 2 + dim1.height,
      y: (dim1.width + dim1.height) / 2,
      delay: 6,
    });

    gsap.to("#loader-1", {
      x: dim2.width / 2,
      duration: 1.5,
      delay: 6.5,
      ease: "none",
    });

    gsap.to("#loader-2", {
      x: (-1 * (dim1.width + dim1.height)) / 2 + dim1.height + dim2.width / 2,
      duration: 1.5,
      delay: 6.5,
      ease: "none",
    });

    gsap.to("#loader-1", {
      rotate: "45deg",
      duration: 1.5,
      delay: 6.5,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.46,0 0.655,0.014 0.775,0.088 0.893,0.161 0.884,0.4 1,1 "
      ),
    });

    gsap.to("#loader", {
      scale: 40,
      transformOrigin: "center",
      duration: 1.5,
      delay: 6.5,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.46,0 0.655,0.014 0.775,0.088 0.893,0.161 0.884,0.4 1,1 "
      ),
    });
  }

  function animateCounter(counter, number, duration, delay = 0) {
    const lastDigit = document.createElement("div");
    lastDigit.textContent = 0;
    lastDigit.classList.add("num");
    counter3.appendChild(lastDigit);

    const randomNumHeight = document.querySelector(".num").offsetHeight;
    counters.forEach((counter) => {
      counter.style.setProperty("--height", randomNumHeight);
    });
    const digits = counter.querySelectorAll(".num");
    const totalHeight = counter.offsetHeight * (digits.length - 1);

    gsap.to(`.counter-${number} .num`, {
      y: -totalHeight,
      duration: duration,
      delay: delay,
      ease: "power4.inOut",
    });

    gsap.to(`.counter-${number} .num`, {
      y: -totalHeight - counter.offsetHeight,
      delay: 6.5 + (number - 1) / 8,
      duration: 0.3,
    });
  }

  animateCounter(counter1, 1, 3, 3);
  animateCounter(counter2, 2, 5.5, 0.4);
  animateCounter(counter3, 3, 5);

  animateLoader();

  gsap.to("#loading-container", {
    display: "none",
    duration: 0,
    delay: 8,
  });

  gsap.to(["header", "main", "footer"], {
    opacity: 1,
    duration: 1,
    delay: 8.2,
    onStart: () => {
      body.classList.remove("overflow-y-hidden");
    },
  });
}

document.addEventListener("DOMContentLoaded", loadingAnimation);
