/* a better way to add/remove class */
$('#hammenu input').on('click', function(e) {
  $('#nav-menu').toggleClass('mobile-menu-vis');
});

/* scroll to section - use below class on any link that scrolls to another section */
$('.scroll-link').on('click', function(e) {
  e.preventDefault();
  var section = $(this).attr('href');
  $('html, body').animate({ scrollTop: $(section).offset().top }, 600);
});

// sticky header
$(window).scroll(function(){
  if ($(window).scrollTop() >= 100) {
    $('header').addClass('fixed-header');
  }
  else {
    $('header').removeClass('fixed-header');
  }
});

$('.banner-title h1:first-child').on('animationend webkitAnimationEnd', function() { 
  $(this).addClass('no-cursor');
});

$('.banner-title h1:last-child').on('animationend webkitAnimationEnd', function() { 
  $(this).addClass('no-cursor');
});