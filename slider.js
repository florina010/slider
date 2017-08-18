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

  var slides , length, id;

  function changeSlides (id) {
    var nextId, previousId;
    nextId = id === length - 1 ? 0 : id + 1;
    previousId = id === 0 ? length - 1 : id - 1;
    for (var i = 0; i < length; i++) {
      if (i === id) {
        $(slides[nextId]).children().removeClass($(slides[nextId]).children().attr("class")).addClass('right');
        $(slides[previousId]).children().removeClass($(slides[previousId]).children().attr("class")).addClass('left');
        $(slides[i]).children().removeClass($(slides[i]).children().attr("class")).addClass('active');
/*
        $(slides[nextId]).switchClass($(slides[nextId]).attr("class"), 'right');
        $(slides[previousId]).switchClass($(slides[previousId]).attr("class"), 'right');
        $(slides[i]).switchClass($(slides[i]).attr("class"), 'active');
*/
      }
      if (i != nextId && i != previousId && i != id)
          $(slides[i]).children().removeClass($(slides[i]).children().attr("class")).addClass('inactive');
      }
    }


      //  setInterval( function () {
      //    id++;
      //    if (id >= length)
      //      id = 0 ;
      //    changeSlides(id);
      //    var divs = $("div:first div span");
      //    for(var i = 0; i < length; i++)
      //      if(divs[i].id != id)
      //        divs[i].style.backgroundColor = "#fff";
      //      else
      //        divs[i].style.backgroundColor = "#000";
       //
      //  },2000);

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
