/*
NAVBAR Functionality
--------------------------------------------*/
import throttle from './vendor/throttle';

// Function that handles all NavBar task
var NavBar = (function() {
  // Variables
  var $window      = $(window);
  var $body        = $(document.body);

  var MobileNavMenu = (function() {
    // Cache Elements
    var $menuEl       = $('.NavBar');
    var $menuToggleEl = $('.js-menu-toggle');

    $menuToggleEl.on('click', function(e) {
      e.preventDefault();
      $body.toggleClass('no--scroll');
      $menuEl.toggleClass('menu--open');
    });
  })(); // END: MobileNavMenu

  var StickyNav = (function() {
    // Variables
    var $nav         = $('.NavBar');
    var $navHeight   = $nav.outerHeight();
    var $pageContent = $('.PageContent--home');
    // Object to hold various distances
    var distances = {
      contentOffset: (function() {
        return $pageContent.offset();
      })(),
      navOffset: (function() {
        return $nav.offset();
      })(),
    };
    // Init the sticky nav
    var init = function() {
      // If window is scrolled past hero area, stick nav
      if ($window.scrollTop() >= distances.contentOffset.top - $navHeight) {
        stickNav();
      } else {
        destory();
      }
    }
    // Function to remove sticky nav
    var destory = function() {
      $body.addClass('featureArea--visible');
    }
    // Function to Stick Nav
    var stickNav = function() {
      $body.removeClass('featureArea--visible');
      // Check to see if the browser has been resized since the last init
      // If so update with new distance
      if ($pageContent.offset().top !== distances.contentOffset.top) {
        distances.contentOffset.top = $pageContent.offset().top;
      }
    }
    // Function adds class if user has scrolled from the top of the page
    var headerTop = function () {
      var scrollPoint = $window.scrollTop();
      if (scrollPoint > 60) {
        $body.removeClass('top--0');
      } else {
        $body.addClass('top--0');
      }
    }

    // Public Methods
    return {
      init: init,
      headerTop: headerTop
    };
  })(); // END: StickyNav
  // Function to handle all homepage header task
  var homepageNav = (function() {
    var init = function() {
      if ($body.hasClass('Homepage')) {
        $window.scroll(function() {
          throttle(StickyNav.init(), 300);
          throttle(StickyNav.headerTop(), 300);
        });
      }
    }
    // Public Methods
    return {
      init: init
    }
  })();

  homepageNav.init();
})(); // NavBar
