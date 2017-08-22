"use strict";
$(document).ready ( function () {
  $(".listaMea").each(function () {
    $(this).slider({
      animate : "true",
      transitionTime : "2s",
      displayPrevNext : "true",
      infinitTransition : "false",
      slideEl: "div",
      vertical : "false"
    });
  });
});
