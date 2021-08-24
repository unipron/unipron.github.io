// var toggle = 0;
// function hamclick()
// {
//     toggle = !toggle;
//     if(toggle)
//     {
//         document.getElementById("mobile-menu").classList.add("mobile-menu-vis"); 
//     }
//     else
//     {
//         document.getElementById("mobile-menu").classList.remove("mobile-menu-vis"); 
//     }
// }
// document.getElementById("hammenu").addEventListener("click",hamclick);


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