/* Tsiribihina Descent — formulaire → WhatsApp */
(function () {
  var WA = "261331847692";
  var form = document.getElementById("quote");
  if (!form) return;

  /* ?trip=… avy amin'ny pejy dia → efa voafidy */
  var want = new URLSearchParams(location.search).get("trip");
  if (want) {
    form.querySelectorAll('input[name="trip"]').forEach(function (r) {
      if (r.value.indexOf(want) === 0) r.checked = true;
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var name = (f.get("name") || "").trim();
    var err = form.querySelector(".form-err");
    if (!name) { err.hidden = false; form.querySelector('[name="name"]').focus(); return; }
    err.hidden = true;
    var line = function (label, v) { v = (v || "").toString().trim(); return v ? label + ": " + v + "\n" : ""; };
    var msg =
      "Hello Tsiribihina Descent! I would like a quote.\n\n" +
      line("Name", name) +
      line("Country", f.get("country")) +
      line("Arrival date", f.get("date")) +
      line("Days available", f.get("days")) +
      line("Adults", f.get("adults")) +
      line("Children", f.get("children")) +
      line("Trip", f.get("trip")) +
      line("Boat", f.get("boat")) +
      line("Hotels", f.get("hotel")) +
      line("Starting from", f.get("start")) +
      line("Message", f.get("msg"));
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });
})();