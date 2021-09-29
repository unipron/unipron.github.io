function closeDrawer() {
  var element = document.getElementById("cart");
  element.setAttribute('aria-hidden', true);
  document.querySelector('.PageOverlay').classList.remove("is-visible");
}

function addToCart() {
  var qty = 0;
  var variant = "";
  
  document.querySelectorAll('.variant-titles').forEach(function(e) {
    if (e.classList.contains('is-active')) {
      variant = e.textContent;
    }
  });

  if (variant == "Einzeln") {
    qty = parseInt(document.getElementById("quantity_text_1").value) + 1;
    document.getElementById("quantity_text_1").value = qty;
    document.getElementById("variant1").classList.add("show");
    document.querySelector('.Cart__ItemList').prepend(document.getElementById("variant1"));  
  } else if (variant == "10% Rabatt") {
    qty = parseInt(document.getElementById("quantity_text_2").value) + 1;
    document.getElementById("quantity_text_2").value = qty;
    document.getElementById("variant2").classList.add("show");
    document.querySelector('.Cart__ItemList').prepend(document.getElementById("variant2"));
  } else if (variant == "15% Rabatt") {
    qty = parseInt(document.getElementById("quantity_text_3").value) + 1;
    document.getElementById("quantity_text_3").value = qty;
    document.getElementById("variant3").classList.add("show");
    document.querySelector('.Cart__ItemList').prepend(document.getElementById("variant3"));
  } else if (variant == "20% Rabatt") {
    qty = parseInt(document.getElementById("quantity_text_4").value) + 1;
    document.getElementById("quantity_text_4").value = qty;
    document.getElementById("variant4").classList.add("show");
    document.querySelector('.Cart__ItemList').prepend(document.getElementById("variant4"));
  }

  // open cart
  var element = document.getElementById("cart");
  element.setAttribute('aria-hidden', false);
  document.querySelector('.PageOverlay').classList.add("is-visible");
}

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

document.querySelectorAll('.CartItem__Remove').forEach(trigger => {
  trigger.onclick = function(e) {
    e.preventDefault();
    var elem = trigger.getAttribute('data-elem');
    var elem2 = trigger.getAttribute('data-qty');

    document.getElementById(elem).classList.remove("show");
    document.getElementById(elem2).value = 0;
  };
});

document.querySelectorAll('.minus-btn').forEach(trigger => {
  trigger.onclick = function(e) {
    e.preventDefault();
    var qty_elem = trigger.nextElementSibling;
    var qty = parseInt(qty_elem.value) - 1;

    if (qty > 0) {
      qty_elem.value = qty;
    } else {
      var elem = trigger.getAttribute('data-elem');
      var elem2 = trigger.getAttribute('data-qty');
  
      document.getElementById(elem).classList.remove("show");
      document.getElementById(elem2).value = 0;
    }
  };
});

document.querySelectorAll('.plus-btn').forEach(trigger => {
  trigger.onclick = function(e) {
    e.preventDefault();
    var qty_elem = trigger.previousSibling.previousSibling;
    var qty = parseInt(qty_elem.value) + 1;
    qty_elem.value = qty;
  };
});
