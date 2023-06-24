// Nav
jQuery(document).ready(function () {
  // NAVIGATION JS : START
  jQuery.each(jQuery(".nav .navbox > ul > li:has(ul)"), function () {
    jQuery(this).addClass("has-dropdown");
    // jQuery(this).find('>a').after('<span class="dropdown-icon"><i class="fas fa-chevron-down"></i></span>');
  });
  jQuery.each(jQuery(".nav .navbox > ul > li > ul > li:has(ul)"), function () {
    jQuery(this).addClass("has-dropdown");
    // jQuery(this).find('>a').after('<span class="dropdown-icon"><i class="fas fa-chevron-right"></i></span>');
  });
  jQuery(".nav .action.toggle").click(function (e) {
    e.preventDefault();
    jQuery(".nav .navbox").toggleClass("active");
  });
  jQuery(".nav .action.close").click(function (e) {
    e.preventDefault();
    jQuery(".nav .navbox").removeClass("active");
  });
  jQuery(".nav .navbox > ul > li:has(ul)").click(function (e) {
    var container = jQuery(this).find("ul");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      // jQuery(this).find('>span.dropdown-icon .fas').toggleClass('fa-chevron-down');
      // jQuery(this).find('>span.dropdown-icon .fas').toggleClass('fa-chevron-up');
    }
  });
  jQuery(".nav .navbox > ul > li > ul > li:has(ul)").click(function (e) {
    var container = jQuery(this).find("ul");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      // jQuery(this).find('>span.dropdown-icon .fas').toggleClass('fa-chevron-right');
      // jQuery(this).find('>span.dropdown-icon .fas').toggleClass('fa-chevron-up');
    }
  });
  // NAVIGATION JS : END
});

function toggleNav() {}

// tab
$("#tabs-nav li:first-child").addClass("active");
$(".tab-content").hide();
$(".tab-content:first").show();
$("#tabs-nav li").click(function () {
  $("#tabs-nav li").removeClass("active");
  $(this).addClass("active");
  $(".tab-content").hide();

  var activeTab = $(this).find("a").attr("href");
  $(activeTab).fadeIn();
  return false;
});

// slider
$(document).ready(function () {
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4;
  var syncedSecondary = true;

  sync1
    .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: false,
      autoplay: true,
      dots: true,
      loop: true,
      touchDrag  : false,
      mouseDrag  : false,
    })
    .on("changed.owl.carousel", syncPosition);

  sync2
    .on("initialized.owl.carousel", function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: true,
      nav: true,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: slidesPerPage,
      responsiveRefreshRate: 100,
      touchDrag  : false,
      mouseDrag  : false,
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find(".owl-item.active").length - 1;
    var start = sync2.find(".owl-item.active").first().index();
    var end = sync2.find(".owl-item.active").last().index();

    if (current > end) {
      sync2.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      sync2.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data("owl.carousel").to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data("owl.carousel").to(number, 300, true);
  });
});
