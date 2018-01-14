function autoScroll(element, to, duration) {
  let start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20,
    tick;

  window.requestAnimationFrame(function step(timestamp) {
    if (!tick) tick = timestamp;
    // Elapsed miliseconds since start of scrolling.
    var time = timestamp - tick;
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1);

    window.scrollTo(0, start + change * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

window.onload = function() {
  //auto scroll handling
  let nav = document.querySelectorAll("nav a");

  for (let i = 0; i < nav.length; i++) {
    nav[i].addEventListener("click", function(event) {
      event.preventDefault();
      let target = document.querySelector(nav[i].getAttribute("href")).offsetTop;
      autoScroll(document.body, target, 600);
    });
  }

  //contact form handling
  let form = document.getElementById("contact"),
    name = document.getElementById("name"),
    email = document.getElementById("email"),
    trap = document.getElementById("ruse"),
    msg = document.getElementById("message"),
    feedback = document.getElementById("feedback");

  form.addEventListener("submit", function(e) {
    //stops page from reloading
    e.preventDefault();

    let data = new FormData();
    data.append("name", name.value);
    data.append("email", email.value);
    data.append("message", msg.value);
    data.append("ruse", trap.value);

    let http = new XMLHttpRequest();

    http.onload = function() {
      if (this.responseText == 42) {
        name.value = "";
        email.value = "";
        msg.value = "";
        feedback.setAttribute(
          "style",
          "background-color: #A8D58E; padding: 5px; border-radius: 5px;"
        );
        feedback.innerHTML = "Thank you! your message has been received";
      } else {
        feedback.setAttribute(
          "style",
          "background-color: #f45942; padding: 5px; border-radius: 5px;"
        );
        feedback.innerHTML = "An error has occurred. Please try again later";
      }
    };

    http.open("POST", "php/mailer.php", true);
    http.send(data);
  });

  //stopping the browser from reloading when a "coming soon" project image is clicked
  const comingSoonProject = document.querySelectorAll(".project-card a");

  for (let i = 0; i < comingSoonProject.length; i++) {
    comingSoonProject[i].addEventListener("click", function(event) {
      if (comingSoonProject[i].getAttribute("href") == "hold-steady") {
        event.preventDefault();
      }
    });
  }
};
