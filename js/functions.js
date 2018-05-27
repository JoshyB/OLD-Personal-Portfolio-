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
      let target = document.querySelector(nav[i].getAttribute("href"))
        .offsetTop;
      autoScroll(document.body, target, 600);
    });
  }

  //contact form handling
  let form = document.getElementById("contact"),
    userFeedback = document.getElementById("feedback");

  form.addEventListener("submit", function(e) {
    //stops page from reloading
    e.preventDefault();

    let http = new XMLHttpRequest();

    form.submit();

    http.onload = function() {
      if (this.responseText == 42) {
        form.reset();
        userFeedback.setAttribute(
          "style",
          "background-color: #A8D58E; padding: 5px; border-radius: 5px;"
        );
        userFeedback.innerHTML = "Thank you! your message has been received";
      } else {
        feedback.setAttribute(
          "style",
          "background-color: #f45942; padding: 5px; border-radius: 5px;"
        );
        userFeedback.innerHTML =
          "An error has occurred. Please try again later";
      }
    };
    http.open("POST", "php/mailer.php", true);
  });
};
