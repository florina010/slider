function Tab (name,src) {
  this.name = name;
  this.src = src;
}
Tab.prototype.add = function (ul, text, href) {
  var li = $("<li></li>");
  var a = $("<a>" + text + "</a>");
  a.attr("href", href);
  li.append(a);
  $(ul).append(li);
}

function Image (src, alt, cls) {
  this.src = src;
  this.alt = alt;
  this.cls = cls;
}
Image.prototype.addImg = function () {
  var img = $("<img>");
  img.attr({"src" : this.src,
           "alt": this.alt,
           "class" : this.cls});
  $("div:first").prepend(img);
}
Image.prototype.changeClass = function (alt, cls) {
  $("div:first").find('img').each( function () {
    if ($(this).attr("alt") == alt){
      $(this).removeClass($(this).attr("class"));
      $(this).addClass(cls);
    }
  });
};
var images = [];
$(document).ready( function () {
  var divFH = $("[for=home] div"),
      divFA = $("[for=about] div"),
      last =  $("#text div:last-child"),
      second = $("#text div:nth-child(2)"),
      tab1 = new Tab ("Img 1", "#img1"),
      tab2 = new Tab ("Img 2", "#img2"),
      id = 0,
      spanImg,
      imagesDates = [{
          src: 'https://teenalmyers.files.wordpress.com/2012/05/wheat-header.jpg',
          alt: 'Lorem Ipsum 1',
          cls: 'active'
        },
        {
          src: 'https://s-media-cache-ak0.pinimg.com/originals/1c/64/c2/1c64c25b533d17337878a99c65b04479.jpg',
          alt: 'Lorem Ipsum 2',
          cls: 'right'
        },
        {
          src: 'http://adicts.wapsite.me/1con/header/header_1.png',
          alt: 'Lorem Ipsum 3',
          cls: 'inactive'
        },
        {
          src: 'http://www.designbolts.com/wp-content/uploads/2014/06/Flower-twitter-header-banner.jpg',
          alt: 'Lorem Ipsum 4',
          cls: 'inactive'
        },
        {
          src: 'https://c1.staticflickr.com/8/7082/13903389733_e7b2e236e6_b.jpg',
          alt: 'Lorem Ipsum 5',
          cls: 'left'
        }];
      imagesDates.forEach(function(image){
        images.push(new Image(image.src, image.alt, image.cls));
      });


      $('#listaMea').slider();

  (function setup(){
    $(divFH).css({"background-color" : "#fff", "color":"#e600ac"});
    $("main").toggle();
    var ul = $("<ul></ul>");
    $("#tabs").prepend(ul);
    tab1.add(ul, tab1.name, tab1.src);
    tab2.add(ul, tab2.name, tab2.src);
    for(var i = 0; i < images.length; i++){
      images[i].addImg();
    }
    /*var divS = $("<div></div>");
    divS.addClass("spans");
    $("div:first").append(divS);
    id = 0;

    $(divS).slider({
      animate: "true",
      transitionTime: " 2s",
      slideEl : "div:first div span",
      infinitTransition: "true"
    });*/
  }());


/*  $("div:first div span").click( function () {
    $(this).css("background-color", "#000");
      id = parseInt($(this).attr('id'));
      changeImages(id);
      $("div:first div span").each( function () {
        if ($(this).attr("id") != id)
          $(this).css("background-color", "#fff");
        });
  });


  function changeImages (id) {
    var nextId, previousId;
    nextId = id === images.length - 1 ? 0 : id + 1;
    previousId = id === 0 ? images.length - 1 : id - 1;
    for (var i = 0; i < images.length; i++) {
      if (i === id) {
        images[nextId].changeClass(images[nextId]['alt'], 'right');
        images[previousId].changeClass(images[previousId]['alt'], 'left');
        images[i].changeClass(images[i]['alt'], 'active');
      }
      if (i != nextId && i != previousId && i != id)
        images[i].changeClass(images[i]['alt'], "inactive");
      }
    }
*/
//   setInterval( function () {
//     id++;
//     if (id >= images.length)
//       id = 0 ;
//     changeImages(id);
//     var divs = $("div:first div span");
//     for(var i = 0; i < images.length; i++)
//       if(divs[i].id != id)
//         divs[i].style.backgroundColor = "#fff";
//       else
//         divs[i].style.backgroundColor = "#000";

//   },2000);

  $("img").mouseover( function () {
    if ( $(this).attr("class") == "active"){
      var imageCaption = $(this).attr("alt");
      if (imageCaption != '') {
        var imgWidth = $(this).width(),
            imgHeight = $(this).height(),
            position = $(this).position(),
            positionTop = (position.top + imgHeight - 50),
            spanImg = $("<span class='img-caption'><em>" + imageCaption +
                        "</em></span>").css({"border": "5px solid red",
                                             "background-color": "red",
                                             "position": "absolute",
                                             "top": positionTop + "px",
                                              "left": "1100px"});
        spanImg.insertAfter(this);
        $("img").mouseout( function () {
          spanImg.css("display", "none");
        });
      }
    }
  });

  $("#btn").click( function () {
    $("#contact").dialog({
      width: "100%",
      modal: true,
    });
    $(document).keyup( function (event) {
      if (event.keyCode === 27)
        $("#contact").hide();
    });

    $("#contact").on('click', function (e) {
      if (e.target !== this)
        return;
      $(this).slideUp();
    });

  });

  $("#home").click( function () {
    $("main").toggle("swing");
		$(divFH).css({"background-color" : "#fff", "color":"#e600ac"});
		$(divFA).css({"background-color" : "#b9b9b9", "color" : "#575757"});
    $("[for=about] #appended").each( function () {
      $(this).remove();
    });
	});

	$("#about").click( function () {
    $(divFA).css({"background-color" : "#fff", "color" : "#e600ac"});
		$("main").css("display", "none");
		$(divFH).css({"background-color" : "#b9b9b9", "color" : "#575757"});

    $("[for=about] div #appended").each( function () {
      $(this).css("display", "block");
    });

    var text = $("<div>Appended Text</div>");
    text.attr("id", "appended");
    text.css({"background-color" : "#fff", "color" : "#e600ac"});
    $(divFA).after(text);
	});

	$( function () {
		$("#tabs").tabs({
      activate: function (event, ui) {
        if ($(window).innerWidth() <= 1200 && $(window).innerWidth() >= 801)
          if (ui.newTab.index().toString() == 1) {
            $(last).css("margin-left" , "350px");
            $("#text p").css("margin-left", "10px");
            $(second).css("margin-left" , "10px");
          }
          else {
            $(last).css("margin-left" , "500px");
            $("#text p").css("margin-left", "237px");
            $(second).css("margin-left" , "237px");
          }
        if ($(window).innerWidth() <= 800 && $(window).innerWidth() >= 481)
          if (ui.newTab.index().toString() == 1) {
            $("#text p").css("margin-left" , "10px");
            $(last).css("margin-left" , "7px");
            $(second).css("width", "72%");
          }
          else {
            $("#text p").css("margin-left", "180px");
            $(last).css("margin-left" , "179px");
          }
        }
      });
    });
});
