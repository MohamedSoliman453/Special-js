//settings box
let setBox = document.querySelector(".settings-box");
let togSet = document.querySelector(".toggle-settings");
let setIcon = document.querySelector(".set-icon");
togSet.addEventListener("click", () => {
  setBox.classList.toggle("open-settings");
  setIcon.classList.toggle("fa-spin");
});
document.body.addEventListener("click", (e) => {
  if (e.target !== setBox && e.target !== setIcon && e.target !== togSet) {
    setBox.classList.remove("open-settings");
    setIcon.classList.remove("fa-spin");
  }
});
setBox.addEventListener("click", (e) => {
  e.stopPropagation();
});
// switch colors
const colorList = document.querySelectorAll(".colors-list li");

if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--mainColor",
    window.localStorage.getItem("color")
  );
  colorList.forEach((li) => {
    li.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${window.localStorage.getItem("color")}"]`)
    .classList.add("active");
}
colorList.forEach((li) => {
  li.addEventListener("click", function (e) {
    handelActive(e);
    window.localStorage.setItem("color", e.currentTarget.dataset.color);
    document.documentElement.style.setProperty(
      "--mainColor",
      window.localStorage.getItem("color")
    );
  });
});
// random background
let btnBackground = document.querySelectorAll(".random-background span");
let backgroundLocalItem = localStorage.getItem("background-option");
let lastBackground = localStorage.getItem("lastBackground");
let backgroundOption = true;

btnBackground.forEach((s) => {
  s.addEventListener("click", (e) => {
    handelActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      autoSlide();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(auto);
      localStorage.setItem("background-option", false);
      localStorage.setItem("lastBackground", randomNum);
    }
  });
});
// for saving value of random background
if (backgroundLocalItem) {
  btnBackground.forEach((e) => {
    e.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    btnBackground[0].classList.add("active");
  } else {
    backgroundOption = false;
    btnBackground[1].classList.add("active");
  }
}
// bullets option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsVisiblity = localStorage.getItem("bullets-option");
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handelActive(e);
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "show");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "hide");
    }
  });
});
if (bulletsVisiblity) {
  bulletsSpan.forEach((e) => {
    e.classList.remove("active");
  });
  if (bulletsVisiblity === "show") {
    bulletsContainer.style.display = "block";
    bulletsSpan[0].classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    bulletsSpan[1].classList.add("active");
  }
}
// reset options
let resetOptions = document.querySelector(".reset-options");
resetOptions.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
// header
let header = document.querySelector("header");
let land = document.querySelector(".landing-page");
window.addEventListener("scroll", () => {
  if (localStorage.getItem("display-head") !== "hide") {
    if (
      window.scrollY >
      land.offsetTop + land.offsetHeight - window.innerHeight
    ) {
      header.style.backgroundColor = "#333";
    } else {
      header.style.backgroundColor = "transparent";
    }
  } else {
    header.style.backgroundColor = "transparent";
  }
});

// header toggle
let toggle = document.querySelector(".toggle-menu");
let showMenu = document.querySelector(".show-menu");
toggle.addEventListener("click", () => {
  header.classList.toggle("over-elements");
  showMenu.classList.toggle("show");
  if (showMenu.classList.contains("show")) {
    toggle.style.color = localStorage.getItem("color");
  } else {
    toggle.style.color = "#fff";
  }
  document.addEventListener("click", (e) => {
    if (e.target !== toggle && e.target !== showMenu) {
      showMenu.classList.remove("show");
      header.classList.remove("over-elements");
      toggle.style.color = "#fff";
    }
  });
});
showMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});
// nav bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bulet) => {
  bulet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
//scroll to top
let scrollToTop = document.querySelector(".scroll");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 500) {
    scrollToTop.style.display = "flex";
  } else {
    scrollToTop.style.display = "none";
  }
});
scrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
// landing page
let landing = document.querySelector(".landing-page");
let images = [
  "landing1.jpg",
  "landing2.jpg",
  "landing3.jpg",
  "landing4.jpg",
  "landing5.jpg",
];

if (lastBackground) {
  landing.style.backgroundImage = `url("img/${images[lastBackground]}")`;
}
function autoSlide() {
  if (backgroundOption === true) {
    auto = setInterval(() => {
      randomNum = Math.trunc(Math.random() * images.length);
      landing.style.backgroundImage = `url("img/${images[randomNum]}")`;
      landing.classList.add("opacity");
      setTimeout(() => {
        landing.classList.remove("opacity");
      }, 1000);
    }, 15000);
  }
}
autoSlide();
// our skills
let ourSkills = document.querySelector(".our-skills");
window.onscroll = function () {
  if (
    this.scrollY >
    ourSkills.offsetTop + ourSkills.offsetHeight - this.innerHeight
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// our galary
let ourGalary = document.querySelectorAll(".our-galary .images-box img");
ourGalary.forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.classList = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImg = document.createElement("img");
    popupBox.appendChild(popupImg);
    overlay.appendChild(popupBox);
    popupImg.src = img.src;

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let textHeading = document.createTextNode(img.alt);
      imgHeading.appendChild(textHeading);
      popupBox.prepend(imgHeading);
    }
    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    let closeBtnText = document.createTextNode("X");
    closeBtn.appendChild(closeBtnText);
    popupBox.prepend(closeBtn);

    document.body.style.overflowY = "hidden";
    closeBtn.addEventListener("click", () => {
      overlay.remove();
      document.body.style.overflowY = "scroll";
    });
  });
});
// handel active class
function handelActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}
