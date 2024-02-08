import "./js/loading.js"

const root = document.documentElement,
  crossedLinesContainer = document.querySelector(".crossed-line-container"),
  beAbleContainer = document.querySelector(".be-able-container"),
  beAbleParagraph = document.querySelector(".be-able-paragraph"),
  form = document.querySelector("form"),
  formChildren = Array.from(form.children);

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("resize", setHeight);
crossedLinesContainer.addEventListener("mousemove", (e) => lineTranslate(e));

// Setting the height for the 'be able' vector container 

function setHeight() {
  const height = beAbleContainer.offsetHeight;
  root.style.setProperty("--be-able-h", `${height}px`);
}

// Rendering animation

function firstRenderAnimation() {
  gsap.to("body", {
    opacity: 1,
    duration:1
  });
}

// Header sticky animation

function stickyAnimation() {
  let scrollHeight =
    beAbleContainer.offsetHeight + beAbleParagraph.offsetHeight;
  gsap.to([".be-able-container", ".be-able-void", ".be-able-paragraph"], {
    y: -scrollHeight,
    ease: "none",
    scrollTrigger: {
      trigger: "#first-trigger",
      scrub: 1,
      pin: true,
      start: "top 0",
    },
  });
}

// Insights animation 

function insightsScrollAnimation() {
  for (let i = 1; i < 4; i++) {
    gsap.to(`.insights-text-${i}`, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: `.insights-image-${i}`,
        start: `top 0`,
        scrub: 1,
      },
    });

    gsap.to(`.transparent-bg-${i}`, {
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: `.insights-image-${i}`,
        start: "top 0",
        end: "+=100",
        scrub: 1,
      },
    });
  }
}

// Crossed lines mouseover animation

function lineTranslate(e) {
  gsap.to(".vertical-line", {
    left: e.x,
    ease: "ease-in",
  });
  gsap.to(".horizontal-line", {
    left: e.x,
    top: e.y,
    ease: "ease-in",
  });
}

// Fade-in paragraph animation

function paragraphAnimation() {
  const paragraph = gsap.utils.selector(".fading-paragraph");
  const spans = Array.from(paragraph("span"));
  ScrollTrigger.create({
    trigger: ".fading-paragraph",
    scrub: true,
    onUpdate: (self) => {
      if (self.progress > 0.8 || self.progress < 0.2) return;
      if (self.direction === 1) {
        gsap.to(
          getElementsBeforeIndex(
            spans,
            Math.floor(
              Math.floor(linearTransformation(self.progress) * spans.length)
            )
          ),
          {
            opacity: 1,
          }
        );
        return;
      }
      gsap.to(
        getElementsAfterIndex(
          spans,
          Math.floor(
            Math.floor(linearTransformation(self.progress) * spans.length)
          )
        ),
        {
          opacity: .2,
        }
      );
    },
  });
}

function getElementsBeforeIndex(arr, index) {
  return arr.filter((element, j) => j <= index);
}

function getElementsAfterIndex(arr, index) {
  return arr.filter((element, j) => j > index);
}
function linearTransformation(value) {
  return (value - 0.25) / (0.75 - 0.25);
}

// team profiles controls



// Form controls

function formControls() {
  const button = form.querySelector("button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });

  formChildren.forEach((formElement) => {
    formElement.addEventListener("click", () => {
      const id = formElement.getAttribute("id");
      const input =
        id === "message"
          ? formElement.querySelector("textarea")
          : formElement.querySelector("input");
      id === "message"
        ? input.classList.remove("border-opacity-50")
        : formElement.classList.remove("border-opacity-50");
      input.focus();
      input.addEventListener("blur", () => {
        id === "message"
          ? input.classList.add("border-opacity-50")
          : formElement.classList.add("border-opacity-50");
      });
    });
  });
}

firstRenderAnimation();
setHeight();
stickyAnimation();
insightsScrollAnimation();
paragraphAnimation();
formControls();

// onScroll fade-in animations

function sectionAnimation(section) {
  const containingSection = gsap.utils.selector(section);
  const heading = containingSection("h2");
  const list = containingSection("li");

  gsap.set([...list, ...heading], {
    opacity: 0,
    y: "10vh",
  });

  gsap.to(heading, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: `${section} h2`,
      start: "top 90%",
    },
  });

  list.forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: `${section} li:nth-of-type(${i + 1})`,
        start: "top 90%",
      },
    });
  });
}

function sectionBulkAnimation(section) {
  gsap.set(section, {
    opacity: 0,
    y: "10vh",
  });

  gsap.to(section, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: section,
      start: "top 60%",
    },
  });
}

sectionAnimation("#awards");
sectionAnimation("#team");
sectionBulkAnimation("#work");
sectionBulkAnimation("#contact");

// Scroll to sections controls

const sections = ["body","insights", "awards", "work", "team", "contact"]

sections.forEach((id) => {
  const link = document.getElementById(`link-${id}`);
  const section = document.getElementById(id);
  link.addEventListener("click", () => {
    section.scrollIntoView({ behavior: "smooth" });
  });
});
