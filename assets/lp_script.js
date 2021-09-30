function closeDrawer() {
  var element = document.getElementById("cart");
  element.setAttribute('aria-hidden', true);
  document.querySelector('.PageOverlay').classList.remove("is-visible");
}

function addToCart() {
  var qty = 0;
  var variant = "";
  var total = 0;

  document.getElementsByClassName('drawer_footer_custom')[0].style.display = 'block';
  
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

  document.querySelectorAll('.CartItemWrapper.show').forEach(trigger => {
    var price_orig =  trigger.getElementsByClassName('Price')[0];
    price_orig = price_orig.textContent;
    price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));

    total = total + price_orig;
  });
  document.getElementById("PriceAfterDiscount").textContent = "€" + total.toFixed(2).replace('.', ',');

  // open cart
  var element = document.getElementById("cart");
  element.setAttribute('aria-hidden', false);
  document.querySelector('.PageOverlay').classList.add("is-visible");
}

function renderDiscount() {
  var discount_data = [
    {
      "discount_code": "SALE15",
      "value": 15,
      "type": "percentage"
    },
    {
      "discount_code": "TAKE30",
      "value": 30,
      "type": "money"
    },
    {
      "discount_code": "BONUS50",
      "value": 50,
      "type": "percentage"
    }
  ];

  var discount_used = document.getElementById("discount-input").value;
  var code_found = false;
  var value = 0;
  var type = "";
  var new_total = 0;
  var discount_total = 0;
  var total = document.getElementById("PriceAfterDiscount").textContent;
  total = parseFloat(total.substring(1).replace(/,/g, '.'));

  if (discount_data.some(e => e.discount_code === discount_used.toUpperCase())) {
    code_found = true;
  }

  for (var i = 0; i < discount_data.length; i++) {
    if (discount_data[i].discount_code == discount_used.toUpperCase()) {
      value = discount_data[i].value;
      type = discount_data[i].type;
      break;
    }
  }

  if (!code_found) {
    document.querySelectorAll('.CartItemWrapper.show').forEach(trigger => {
      var total = 0;
      var price_orig =  trigger.getElementsByClassName('Price')[0].getAttribute('data-price');
      price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));
      total = total + price_orig;
      document.getElementById("PriceAfterDiscount").textContent = "€" + total.toFixed(2).replace('.', ',');
      if (trigger.getElementsByClassName('Price--compareAt')[0].classList.contains('single')) {
        trigger.getElementsByClassName('Price--compareAt.single')[0].style.display = 'none';
      }
      trigger.getElementsByClassName('Price')[0].textContent = trigger.getElementsByClassName('Price')[0].getAttribute('data-price');
    });
    document.getElementById("Discount-Message").innerHTML = "Rabattcode existiert nicht oder ist schon abgelaufen!";
    document.getElementById("Discount-Message").style.color = "red";
    document.getElementById("DiscountDiv").style.display="none";
  } else {
    document.getElementById("Discount-Message").innerHTML = "Rabattcode wurde hinzugefügt!";
    document.getElementById("DiscountDiv").style.display="flex";
    document.getElementById("Discount-Message").style.color = "green";

    //calculations
    document.querySelectorAll('.CartItemWrapper.show').forEach(trigger => {
      var price_orig =  trigger.getElementsByClassName('Price')[0];
      price_orig = price_orig.textContent;
      price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));

      if (type == "money") {
        new_total = total - value;
      } else if (type == "percentage") {
        var price = price_orig - (price_orig*(value/100));
        new_total = new_total + price;
        discount_total = discount_total + (price_orig*(value/100));
        if (trigger.getElementsByClassName('Price--compareAt')[0].classList.contains('single')) {
          trigger.getElementsByClassName('Price--compareAt')[0].style.display = 'inline-block';
        }
        trigger.getElementsByClassName('Price')[0].textContent = "€" + price.toFixed(2).replace('.', ',');
      } 
    });
    document.getElementById('DiscountPrice').textContent = "€" + discount_total.toFixed(2).replace('.', ',');
    document.getElementById("PriceAfterDiscount").textContent = "€" + new_total.toFixed(2).replace('.', ',');
  }
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

    var items = document.querySelectorAll('.CartItemWrapper.show').length;
    if (items > 0) {
      var total = 0;
      document.querySelectorAll('.CartItemWrapper.show').forEach(trigger => {
        var price_orig =  trigger.getElementsByClassName('Price')[0].textContent;
        price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));
        total = total + price_orig;
        document.getElementById("PriceAfterDiscount").textContent = "€" + total.toFixed(2).replace('.', ',');
      });
    } else {
      document.getElementsByClassName('drawer_footer_custom')[0].style.display = 'none';
    }
  };
});

// document.querySelectorAll('.minus-btn').forEach(trigger => {
//   trigger.onclick = function(e) {
//     e.preventDefault();
//     var qty_elem = trigger.nextElementSibling;
//     var qty = parseInt(qty_elem.value) - 1;

//     if (qty > 0) {
//       qty_elem.value = qty;

//       var price_orig =  trigger.parentNode.parentNode.nextElementSibling.querySelector('.Price').getAttribute('data-price');
//       price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));
//       price_orig = price_orig * qty;
//       trigger.parentNode.parentNode.nextElementSibling.querySelector('.Price').textContent = "€" + price_orig.toFixed(2).replace('.', ',');

//       var price_orig = trigger.parentNode.parentNode.nextElementSibling.querySelector('.Price--compareAt').getAttribute('data-price');
//       price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));
//       price_orig = price_orig * qty;
//       trigger.parentNode.parentNode.nextElementSibling.querySelector('.Price--compareAt').textContent = "€" + price_orig.toFixed(2).replace('.', ',');

//       var items = document.querySelectorAll('.CartItemWrapper.show').length;
//       if (items > 0) {
//         var total = 0;
//         document.querySelectorAll('.CartItemWrapper.show').forEach(trigger => {
//           var price_orig =  trigger.getElementsByClassName('Price')[0].textContent;
//           price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));
//           total = total + price_orig;
//           document.getElementById("PriceAfterDiscount").textContent = "€" + total.toFixed(2).replace('.', ',');
//         });
//       } else {
//         document.getElementsByClassName('drawer_footer_custom')[0].style.display = 'none';
//       }

//       if (document.getElementById("discount-input").value != "") {
//         var discount_total = 0;
//         document.querySelectorAll('.CartItemWrapper.show').forEach(trigger => {
//           var price =  trigger.querySelector('.Price').textContent;
//           price = parseFloat(price.substring(1).replace(/,/g, '.'));
  
//           var price_orig = trigger.querySelector('.Price--compareAt').textContent;
//           price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));
  
//           discount_total = discount_total + (price_orig - price);
//         });
//         document.getElementById("PriceAfterDiscount").textContent = "€" + discount_total.toFixed(2).replace('.', ',');
//       }

//     } else {
//       var elem = trigger.getAttribute('data-elem');
//       var elem2 = trigger.getAttribute('data-qty');
  
//       document.getElementById(elem).classList.remove("show");
//       document.getElementById(elem2).value = 0;
//     }
//   };
// });

// document.querySelectorAll('.plus-btn').forEach(trigger => {
//   trigger.onclick = function(e) {
//     e.preventDefault();
//     var qty_elem = trigger.previousSibling.previousSibling;
//     var qty = parseInt(qty_elem.value) + 1;
//     qty_elem.value = qty;

//     var price =  trigger.parentNode.parentNode.nextElementSibling.querySelector('.Price').getAttribute('data-price');
//     price = parseFloat(price.substring(1).replace(/,/g, '.'));
//     price = price * qty;
//     trigger.parentNode.parentNode.nextElementSibling.querySelector('.Price').textContent = "€" + price.toFixed(2).replace('.', ',');

//     var price_orig = trigger.parentNode.parentNode.nextElementSibling.querySelector('.Price--compareAt').getAttribute('data-price');
//     price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));
//     price_orig = price_orig * qty;
//     trigger.parentNode.parentNode.nextElementSibling.querySelector('.Price--compareAt').textContent = "€" + price_orig.toFixed(2).replace('.', ',');

//     var items = document.querySelectorAll('.CartItemWrapper.show').length;
//     if (items > 0) {
//       var total = 0;
//       document.querySelectorAll('.CartItemWrapper.show').forEach(trigger => {
//         var price_orig =  trigger.getElementsByClassName('Price')[0].textContent;
//         price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));
//         total = total + price_orig;
//         document.getElementById("PriceAfterDiscount").textContent = "€" + total.toFixed(2).replace('.', ',');
//       });
//     } else {
//       document.getElementsByClassName('drawer_footer_custom')[0].style.display = 'none';
//     }

//     if (document.getElementById("discount-input").value != "") {
//       var discount_total = 0;
//       document.querySelectorAll('.CartItemWrapper.show').forEach(trigger => {
//         var price =  trigger.querySelector('.Price').textContent;
//         price = parseFloat(price.substring(1).replace(/,/g, '.'));

//         var price_orig = trigger.querySelector('.Price--compareAt').textContent;
//         price_orig = parseFloat(price_orig.substring(1).replace(/,/g, '.'));

//         discount_total = discount_total + (price_orig - price);
//       });
//       document.getElementById("PriceAfterDiscount").textContent = "€" + discount_total.toFixed(2).replace('.', ',');
//     }
//   };
// });
