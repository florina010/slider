"use strict";
$(document).ready( function () {
      $('#listaMea').slider({
        animate : "true",
        transitionTime: "2s",
        displayPrevNext : "true",
        infinitTransition : "false",
        slideEl: "div",
        vertical: "false"
      });
      $('#listaTa').slider({
        animate : "false",
        transitionTime: "2s",
        displayPrevNext : "true",
        infinitTransition : "false",
        slideEl: "li",
        vertical: "true"
      });
});
