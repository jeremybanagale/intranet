
var mywindow = $(window);
var mypos = mywindow.scrollTop();
var up = false;
var newscroll;
var navHeight = $(".big-logo-row").height() - $(".navbar").height();
mywindow.scroll(function() {
  newscroll = mywindow.scrollTop();
  var navbarColor = "0, 42, 67";
  var navOpacity = 0;
  var navBackColor;
  var smallLogoBarColor = "0, 42, 67"
  var smallLogoBackColor;
  if (newscroll > navHeight && !up) {
    navOpacity = 1;
    navBackColor = 'rgba(' + navbarColor + ',' + navOpacity + ')';
    //smallLogoBackColor = 'rgb(' + smallLogoBarColor + ')';
    $('.navbar').css({
      "background-color": navBackColor
    });
    $(".navbar").animate({
      padding: '0px'
    });
    $(".small-logo-container").fadeTo(500, 1);
    up = !up;

  } else if (newscroll < navHeight && up) {
    navOpacity = 0;
    navBackColor = 'rgba(' + navbarColor + ',' + navOpacity + ')';
    $('.navbar').css({
      "background-color": navBackColor
    });
    $(".navbar").animate({
      padding: '10px'
    });
    $(".small-logo-container").fadeTo(500, 0);
    up = !up;
  }

  mypos = newscroll;
  console.log(mypos);
});
