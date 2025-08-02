/**
 * menu toggle
 */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu");
  const menuList = document.querySelector("#nav ul");

  menuBtn.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !menuList.contains(e.target)) {
      menuList.classList.remove("active");
    }
  });
});

/**
 * request button
 */
const allRequestButtons = document.querySelectorAll(".plan-request");

allRequestButtons.forEach((requestBtn) => {
  const planId = requestBtn.dataset.plan;
  const planForm = document.getElementById(`plan${planId}-form`);
  const message = document.getElementById(`plan${planId}-message`);

  requestBtn.addEventListener("click", () => {
    requestBtn.style.display = "none";
    planForm.style.display = "block";
    message.style.visibility = "hidden";
  });

  //close form
  document.addEventListener("click", (e) => {
    if (
      planForm.style.display === "block" &&
      !planForm.contains(e.target) &&
      e.target !== requestBtn
    ) {
      planForm.style.display = "none";
      requestBtn.style.display = "inline-block";
    }
  });

  //send request
  planForm.addEventListener("submit", (e) => {
    e.preventDefault();
    planForm.reset();
    planForm.style.display = "none";
    requestBtn.style.display = "inline-block";

    message.style.visibility = "visible";
    setTimeout(() => {
      message.style.visibility = "hidden";
    }, 5000);
  });
});

/**
 * send msg button
 */
const form = document.getElementById("contact-form");
const message = document.getElementById("success-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  message.style.visibility = "visible";
  form.reset();

  setTimeout(() => {
    message.style.visibility = "hidden";
  }, 5000);
});

/**
 * message max length
 */
const textarea = document.getElementById("message");
const counter = document.getElementById("counter");

textarea.addEventListener("input", () => {
  counter.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
});
