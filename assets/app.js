function toggleClass() {
  var element = document.getElementById("nav-menu");
  element.classList.toggle("mobile-menu-vis");
  document.getElementById("checkmenu").classList.toggle("clicked");
}

// sticky header
document.addEventListener('scroll', function(e) {
  if(document.documentElement.scrollTop >= 100) {
    document.getElementById("header").classList.add("fixed-header");
  } else {
    document.getElementById("header").classList.remove("fixed-header");
  }
});

/* scroll to section - use below class on any link that scrolls to another section */
document.querySelectorAll('.scroll-link a[href^="#"]').forEach(trigger => {
  trigger.onclick = function(e) {
    e.preventDefault();
    let hash = this.getAttribute('href');
    let target = document.querySelector(hash);
    let headerOffset = 100;
    let elementPosition = target.offsetTop;
    let offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };
});

document.getElementById("banner-title1").addEventListener("webkitAnimationEnd", (ev) => {
  document.getElementById("banner-title1").classList.add("no-cursor");
});

document.getElementById("banner-title2").addEventListener("webkitAnimationEnd", (ev) => {
  document.getElementById("banner-title2").classList.add("no-cursor");
});

/* Lazy load */
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});