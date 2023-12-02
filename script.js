const carousal = document.getElementsByClassName("inside-wrapper");
const firstCardWidth = document.querySelector(".cards").offsetWidth;
const arw = document.querySelectorAll(".arrow");
const wrapper = document.querySelector(".wrapper");
const childrenArray = [...carousal[0].children];
let cardPreview = Math.round(carousal[0].offsetWidth / firstCardWidth);
let isDragging = false,
  startX,
  startScrollLeft,
  timeOutId;

arw.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousal[0].scrollLeft +=
      btn.id === "right" ? +firstCardWidth : -firstCardWidth;
  });
});

// childrenArray
//   .slice(-cardPreview)
//   .reverse()
//   .forEach((card) => {
//     carousal[0].insertAdjacentHTML("afterbegin", card.outerHTML);
//   });

// childrenArray.slice(0, cardPreview).forEach((card) => {
//   carousal[0].insertAdjacentHTML("beforeend", card.outerHTML);
// });

const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeOutId = setTimeout(
    () => (carousal[0].scrollLeft += firstCardWidth),
    2500
  );
};
autoPlay();

const dragStart = (e) => {
  isDragging = true;
  carousal[0].classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousal[0].scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  carousal[0].scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragstop = () => {
  isDragging = false;
  carousal[0].classList.remove("dragging");
};

const scrolling = () => {
  clearInterval(timeOutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

carousal[0].addEventListener("mousemove", dragging);
carousal[0].addEventListener("mousedown", dragStart);
carousal[0].addEventListener("scroll", scrolling);
document.addEventListener("mouseup", dragstop);
wrapper.addEventListener("mouseenter", () => {
  clearTimeout(timeOutId);
});
wrapper.addEventListener("mouseleave", autoPlay);
