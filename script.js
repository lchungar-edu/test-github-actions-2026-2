const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const slides = Array.from(document.querySelectorAll(".slide"));
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const carouselDots = document.getElementById("carouselDots");

let currentSlide = 0;
let carouselTimer;

function renderDots() {
  carouselDots.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ver trabajo ${index + 1}`);

    if (index === currentSlide) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      showSlide(index);
      restartCarousel();
    });

    carouselDots.appendChild(dot);
  });
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  renderDots();
}

function nextCarouselSlide() {
  showSlide(currentSlide + 1);
}

function restartCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextCarouselSlide, 4500);
}

prevSlide.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  restartCarousel();
});

nextSlide.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  restartCarousel();
});

renderDots();
restartCarousel();

const testimonials = [
  {
    text: "Me encantó el resultado. Entendieron exactamente el estilo que quería y el color quedó precioso.",
    name: "María Fernanda",
    service: "Balayage y corte"
  },
  {
    text: "Solicité servicio a domicilio para un evento y fue impecable. Puntuales, profesionales y muy atentos.",
    name: "Camila Torres",
    service: "Peinado social"
  },
  {
    text: "El tratamiento capilar le devolvió vida a mi cabello. La atención fue muy cálida desde el inicio.",
    name: "Laura Méndez",
    service: "Hidratación profunda"
  }
];

const testimonialText = document.getElementById("testimonialText");
const testimonialName = document.getElementById("testimonialName");
const testimonialService = document.getElementById("testimonialService");
const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");

let currentTestimonial = 0;

function showTestimonial(index) {
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  const testimonial = testimonials[currentTestimonial];

  testimonialText.textContent = `“${testimonial.text}”`;
  testimonialName.textContent = testimonial.name;
  testimonialService.textContent = testimonial.service;
}

prevTestimonial.addEventListener("click", () => {
  showTestimonial(currentTestimonial - 1);
});

nextTestimonial.addEventListener("click", () => {
  showTestimonial(currentTestimonial + 1);
});

showTestimonial(0);

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");
const bookingDate = document.getElementById("bookingDate");

bookingDate.min = new Date().toISOString().split("T")[0];

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("bookingName").value.trim();
  const service = document.getElementById("bookingService").value;
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;

  bookingMessage.textContent = `${name}, tu cita para ${service} quedó preagendada para el ${date} a las ${time}.`;
  bookingForm.reset();
  bookingDate.min = new Date().toISOString().split("T")[0];
});
