//local storage
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main--color", mainColors);
  //remove active
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    //add active
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

//get random num
let backgroundOption = true;

let backgroundInterval;

//check localstorage
let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === " true") {
    document.querySelector(".random-background .Yes").classList.add("active");
  } else {
    document.querySelector(".random-background .No").classList.add("active");
  }
}
//toggle spin
document.querySelector(".toggle-setting .main-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  //toggle class open on main class gear
  document.querySelector(".setting-box").classList.toggle("open");
};

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  //loop on li
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);
    //set color on root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    //set color on localstorage
    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});

//switch background random
const background = document.querySelectorAll(".random-background span");

background.forEach((span) => {
  //loop on li
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "Yes") {
      backgroundImage = true;

      randomBackground();

      localStorage.setItem("background-option", true);
    } else {
      backgroundImage = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background-option", false);
    }
  });
});
//select landing page element
let page = document.querySelector(".landing-page");

//get array images
let imageArray = ["2.jpeg", "3.webp", "4.webp", "5.jpg", "6.jpg"];

function randomBackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imageArray.length);
      //change background
      page.style.backgroundImage =
        'url("assets/image/' + imageArray[random] + '")';
    }, 10000);
  }
}
randomBackground();

//select skills
const skillsSection = document.getElementById("skills-section");

const progressBar = document.querySelectorAll(".progress-bar");

function showProgress() {
  progressBar.forEach((progressBar) => {
    const value = progressBar.dataset.progress;
    progressBar.style.opacity = 1;
    progressBar.style.width = `${value}%`;
  });
}

function hiedProgress() {
  progressBar.forEach((p) => {
    p.style.opacity = 0;
    p.style.width = 0;
  });
}

window.addEventListener("scroll", () => {
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (sectionPos < screenPos) {
    showProgress();
  } else {
    hiedProgress();
  }
});
//End skills

//create popup image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //creat overlay
    let overlay = document.createElement("div");

    //add class overlay
    overlay.className = "popup-overlay";

    //append overlay to the body
    document.body.appendChild(overlay);

    //creat popup
    let popupBox = document.createElement("div");

    // add class to th popupbox
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //create Heading
      let imgHeading = document.createElement("h3");

      //create text
      let imgText = document.createTextNode(img.alt);

      //append text Heading
      imgHeading.appendChild(imgText);

      //Append Heading to the popup
      popupBox.appendChild(imgHeading);
    }

    //create the img
    let popupImage = document.createElement("img");

    //set image scr
    popupImage.src = img.src;

    //add image to popupBox
    popupBox.appendChild(popupImage);

    //appen th popup to body

    document.body.appendChild(popupBox);

    //create the close span
    let closeButton = document.createElement("span");

    //create close button
    let closeButtonText = document.createTextNode("X");

    //append text to close button
    closeButton.appendChild(closeButtonText);

    //add class to close button
    closeButton.className = "close-button";

    //add close button to popup box
    popupBox.appendChild(closeButton);

    //add
  });
});

//close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();

    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//select our bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets");

//select links
const allLinks = document.querySelectorAll(".links a");

function scrollLinksBullets(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollLinksBullets(allBullets);
scrollLinksBullets(allLinks);

//HANDLE ACTIVE STATE
function handleActive(ev) {
  //remove active
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  //add class active
  ev.target.classList.add("active");
}

//reset button
document.querySelector("#reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("colors-list");
  localStorage.removeItem("background-option");
  window.location.reload();
};
