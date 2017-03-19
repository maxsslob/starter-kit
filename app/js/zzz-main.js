// ES6

// SCROLL
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, {
        	duration: 700,
        	easing: 'easeInExpo'
        });
        return false;
      }
    }
  });
});

new Vue({
  el: '#app',
  data() {
    return {
      message: ''  
    }
  }
});

/*new Vue({
  el: '#app',
  data: {
    items: [
      '1',
      '2 3',
      '4 6 5',
      '7 8'
    ]
  }
});*/