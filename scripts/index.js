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
 * request plan button
 */
const allRequestButtons = document.querySelectorAll(".plan-request");

allRequestButtons.forEach((requestBtn) => {
  const planId = requestBtn.dataset.plan;
  const planForm = document.getElementById(`plan${planId}-form`);

  requestBtn.addEventListener("click", () => {
    requestBtn.style.display = "none";
    planForm.style.display = "block";
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
});

/**
 * send msg button
 */
const key = "259f7c43-d981-47b7-af99-d553c5f37819";
const counter = document.getElementById("counter");
const messageInput = document.getElementById("message");

//symbols counter
if (messageInput && counter) {
  messageInput.addEventListener("input", () => {
    counter.textContent = `${messageInput.value.length} / 1000`;
  });
}

document.querySelectorAll(".web3form").forEach((form) => {
  const successMessage = form.nextElementSibling;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);

    //your email data
    const json = JSON.stringify({
      ...object,
      access_key: key,
      from_name: "RP Shield Visitor",
      subject: object.subject || "Information request",
      name: object.name || "No name",
      message:
        object.message || `You have received a plan request: ${object.subject}`,
    });

    //service request
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        if (response.status === 200) {
          successMessage.style.visibility = "visible";

          if (form.id === "plan1-form" || form.id === "plan2-form") {
            successMessage.textContent =
              "You’ve successfully requested the plan.";
          } else if (form.id === "contact-form") {
            successMessage.textContent =
              "You have successfully sent the message. We will contact you soon.";
          }
        }
      })
      .catch((error) => {
        console.log(error);
        successMessage.style.visibility = "visible";
        successMessage.innerHTML = "Something went wrong...";
      })
      .then(function () {
        form.reset();

        //clear counter
        if (counter) counter.textContent = `0 / 1000`;

        //close form
        document.getElementById("plan1-form").style.display = "none";
        document.getElementById("plan2-form").style.display = "none";
        document.getElementById("plan1-btn").style.display = "inline-block";
        document.getElementById("plan2-btn").style.display = "inline-block";

        // message timer
        setTimeout(() => {
          if (successMessage) {
            successMessage.style.visibility = "hidden";
          }
        }, 5000);
      });
  });
});
