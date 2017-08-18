(function ( $ ) {
  $.fn.slider = function ( obj ) {
      var options = $.extend({
        animate : "true",
        transitionTime : "3s",
        vertical : "false",
        displayPrevNext : "true",
        infinitTransition : "true",
        slideEl : "li"
    }, obj );
    /*
    if ( options['animate'] == "true" ) {
        $(this).css({"background-color" : "#000", "transitionDuration" : options["transitionTime"]});
        if ( options["infinitTransition"] == "true" )
          $(this).css({"background-color" : "#000", "transitionDuration" : options["transitionTime"], "animation-iteration-count" : "infinite"});
  }*/

  var slides, length;

  function changeSlides (id) {
    var nextId, previousId;
    nextId = id === length - 1 ? 0 : id + 1;
    previousId = id === 0 ? length - 1 : id - 1;
    for (var i = 0; i < length; i++) {
      if (i === id) {
        images[nextId].changeClass(images[nextId]['alt'], 'right');
        images[previousId].changeClass(images[previousId]['alt'], 'left');
        images[i].changeClass(images[i]['alt'], 'active');
      }
      if (i != nextId && i != previousId && i != id)
        images[i].changeClass(images[i]['alt'], "inactive");
      }
    }

  (function generateButtons (sliderObj) {
    var span= $("<span></span>");
    slides = sliderObj.find(options.slideEl);
    slides.prototype = Object.create(Image.prototype);
    length = slides.length;
    var ndiv = $('<div></div>');
    var pager = $('<div class="pager"></div>');

    for(var i = 0; i < length; i++){
      var divSpan = $("<div></div>"), span = $("<span></span>");
      span.attr("id", i);
      $(divSpan).append(span);
      if (i == 0)
        span.css("background-color", "#000");
      else
        span.css("background-color", "#fff");
      pager.append(divSpan);

      var id;
      span.each( function () {
        $(this).click( function () {
          $(this).css("background-color", "#000");
          $(".pager span").not($(this)).css("background-color", "#fff");
          id = parseInt($(this).attr('id'));
          changeSlides(id);
        });
      });
    }
    ndiv.append(pager);
    ndiv.insertAfter(sliderObj);

  })($(this));

    return this;
  }
}( jQuery ));
