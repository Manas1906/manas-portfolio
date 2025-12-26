document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
const roles = [
  "Java Backend Developer",
  "Spring Boot Specialist",
  "REST API Engineer",
  "MySQL & Hibernate Developer",
];

document.getElementById("menu-toggle").onclick = () => {
  document.querySelector("nav ul").classList.toggle("show");
};

let roleIndex = 0;
let charIndex = 0;
const typedElement = document.getElementById("typed");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    typedElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 90);
  } else {
    setTimeout(eraseEffect, 1200);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typedElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 60);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);
