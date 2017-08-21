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

  var slides , length, id = 0, sliderId, spans, infinite, divH, sliderObj;

  function changeSlides (id) {
    var nextId, previousId;
    nextId = id === length - 1 ? 0 : id + 1;
    previousId = id === 0 ? length - 1 : id - 1;

    if ( options['displayPrevNext'] == 'false'){
        $(slides[previousId]).children().css("display", "none");
        $(slides[nextId]).children().css("display", "none");
      }
    if (options['infinitTransition'] == 'false'){
      if ( id == length - 1 )
        clearInterval(infinite);
    }

    for (var i = 0; i < length; i++) {
       if ( options['animate'] == "true" )
         $(slides[i]).children().css({"animation" : "animate  " + options["transitionTime"]});
      if (i === id) {
        $(slides[nextId]).children().removeClass($(slides[nextId]).children().attr("class")).addClass('right');
        $(slides[previousId]).children().removeClass($(slides[previousId]).children().attr("class")).addClass('left');
        $(slides[i]).children().removeClass($(slides[i]).children().attr("class")).addClass('active');
      }
      if (i != nextId && i != previousId && i != id){
        $(slides[i]).children().removeClass($(slides[i]).children().attr("class")).addClass('inactive');
      }
    }
  };

    function vertical () {
        $("." + sliderId).css({"display" : "table-caption ", "margin-left" : "0px"}  );
        $("#" + sliderId).css({"position" : "relative", "bottom" : "20px", "right" : "0px", "left" : "0px", "height" : "10px", "margin-bottom" : "250px"});
        $("#" + sliderId + " .active").css({"left" : "87px", "top" : "230px", "clip" : "auto"});
        $("#" + sliderId + " .left").css({"left" : "87px", "top" : "0px", "clip" : "rect(50px, 866px, 200px, 0px)", "width" : "41%" });
        $("#" + sliderId + " .right").css({"left" : "87px", "top" : "410px", "clip" : "rect(50px, 866px, 200px, 0px)", "width" : "41%", "margin-bottom" : "200px" });

/*
      if ( options["slideEl"] == "li" ){
        $("." + sliderId).css("display" , "table-caption ");
        $("." + sliderId).children().css("margin-top" , "50px");
        $("#" + sliderId).css({"margin-top" : "20px", "margin-bottom" : "75px"});
        $("#" + sliderId + " .active").css({"left" : "87px", "top" : "230px", "clip" : "auto",  "position" : "absolute"});
        $("#" + sliderId +  " .left").css({"left" : "87px", "top" : "0px", "clip" : "rect(50px, 866px, 200px, 0px)", "width" : "41%",  "position" : "absolute" });
        $("#" + sliderId + " .right").css({"left" : "87px", "top" : "410px", "clip" : "rect(50px, 866px, 200px, 0px)", "width" : "41%",  'position' : "absolute" });
        $("div:first").css("margin-bottom", "200px");
      }*/
    };

    function start () {
      infinite = setInterval( function () {
         if (id == length)
           id = 0;
        $(".".concat(sliderId).concat(" span")).each( function () {
          if ( $(this).attr("id") != parseInt(id) )
            $(this).css("background-color", "#fff");
          else
            $(this).css("background-color", "#000");
          changeSlides(id);
        });
        if (options['vertical'] == "true")
          vertical();
        id++;
      }, 1000);
  };

  (function generateButtons (sliderObj) {
    sliderId = sliderObj.attr("id");
    var span= $("<span></span>");
    slides = sliderObj.find(options.slideEl);
    length = slides.length;
    var ndiv = $('<div></div>');
    var pager = $('<div class="pager"></div>');
    pager.addClass(sliderId);

    for (var i = 0; i < length; i++){
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
          $(".".concat(sliderId).concat(" span")).not($(this)).css("background-color", "#fff");
          id = parseInt($(this).attr('id'));
          changeSlides(id);
          if (options['vertical'] == "true")
            vertical();
          start();
        });
      });
    }

    ndiv.append(pager);
    ndiv.insertAfter(sliderObj);
    start();

  })($(this));

    return this;
  }
}( jQuery ));
