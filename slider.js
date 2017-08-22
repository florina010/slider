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
  var sliderOb =this, slides , length, id = 0, infinite;

    function vertical () {
      $(sliderOb.children().last()).css({"display" : "table-caption ", "margin-left" : "0px"} );
      $(slides).children().each( function () {
        if ($(this).attr("class") == 'left')
          $(this).css({"left" : "87px", "top" : "0px", "clip" : "rect(50px, 866px, 200px, 0px)", "width" : "41%" });
        if ($(this).attr("class") == 'right')
          $(this).css({"left" : "87px", "top" : "410px", "clip" : "rect(50px, 866px, 200px, 0px)", "width" : "41%", "margin-bottom" : "200px" });
        if ($(this).attr("class") == 'active')
          $(this).css({"left" : "87px", "top" : "230px", "clip" : "auto"});
      });
        $(sliderOb).css({"position" : "relative", "bottom" : "20px", "right" : "0px", "left" : "0px", "height" : "10px", "margin-bottom" : "600px"});

    };

    function start () {
      infinite = setInterval( function () {
         if (id == length)
           id = 0;
        spans.each( function () {
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
    var span= $("<span></span>");
    sliderObj.each( function () {
      slides = $(this).find(options.slideEl);
      length = slides.length;
      var pager = $('<div class="pager"></div>');

      for (var i = 0; i < length; i++){
        var divSpan = $("<div></div>"), span = $("<span></span>");
        span.attr("id", i);
        $(divSpan).append(span);
        if (i == 0)
          span.css("background-color", "#000");
        else
          span.css("background-color", "#fff");
        pager.append(divSpan);
    }
    if ( options["vertical"] == "true"){
      vertical();
      sliderObj.append(pager);
    }
    else
      sliderObj.append(pager);
    start();
    });

  })($(this));

  var spans = $(sliderOb.children().last().children().children());

  spans.each( function () {
    $(this).click( function () {
      $(this).css("background-color", "#000");
      spans.not($(this)).css("background-color", "#fff");
      id = parseInt($(this).attr('id'));
      changeSlides(id);
      if (options['vertical'] == "true")
        vertical();
      start();
    });
  });

  function changeSlides (id) {
    var nextId, previousId, image;
    nextId = id === length - 1 ? 0 : id + 1;
    previousId = id === 0 ? length - 1 : id - 1;
    image = sliderOb.children().children();

    if ( options['displayPrevNext'] == 'false'){
        $(image[previousId]).css("display", "none");
        $(image[nextId]).css("display", "none");
      }
    if (options['infinitTransition'] == 'false'){
      if ( id == length - 1 )
        clearInterval(infinite);
    }
    for (var i = 0; i < length; i++) {
       if ( options['animate'] == "true" )
         $(image[i]).css({"animation" : "animate  " + options["transitionTime"]});
      if (i === id) {
        $(image[nextId]).removeClass($(image[nextId]).attr("class")).addClass('right');
        $(image[previousId]).removeClass($(image[previousId]).attr("class")).addClass('left');
        $(image[i]).removeClass($(image[i]).attr("class")).addClass('active');
      }
      if (i != nextId && i != previousId && i != id){
        $(image[i]).removeClass($(image[i]).attr("class")).addClass('inactive');
      }
    }
  };

      return this;
  }
}( jQuery ));
