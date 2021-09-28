document.querySelectorAll('.thumbnail_click').forEach(trigger => {
  trigger.onclick = function(e) {
    e.preventDefault();
    document.getElementById("featured-img").src = trigger.querySelector('img').src;
  };
});

document.querySelectorAll('.SizeSwatch__Radio').forEach(trigger => {
  trigger.onclick = function(e) {
    e.preventDefault();
    document.querySelectorAll('.variant-titles').forEach(function(e) {
      e.classList.remove("is-active");
    });
    e.target.nextSibling.nextElementSibling.children[1].classList.add("is-active");

    var price = trigger.getAttribute('data-price');
    var orig_price = trigger.getAttribute('data-orig-price');
    var info = trigger.getAttribute('data-info');
    
    document.getElementById("price_info").innerHTML = info;
    document.getElementById("price").innerHTML = price;
    if (orig_price != '0') {
      document.getElementById("price_orig").innerHTML = orig_price;
      document.getElementById("price_orig").classList.remove("hidden");
      document.getElementById("price").classList.add("Price--highlight");
    } else {
      document.getElementById("price_orig").classList.add("hidden");
      document.getElementById("price").classList.remove("Price--highlight");
    }
  };
});

function closeDrawer() {
  var element = document.getElementById("cart");
  element.setAttribute('aria-hidden', true);
}