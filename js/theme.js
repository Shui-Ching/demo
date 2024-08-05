(function ($) {
    "use strict";
    // use strict
    $(window).on('load', function () {
        $('.loading').fadeOut();
    });
})(jQuery);

(function ($) {
    "use strict";
    // use strict
    $('.header-mobile__navbar li').each(function () {
        if ($(this).children().length > 1) {
            $(this).children('a').append("<span></span>");
        }
        $(this).children('a').on('click', function () {
            $(this).siblings('.sub-menu').slideToggle(300).parent().toggleClass('active');
        });
    });

})(jQuery);

// Back to top
(function ($) {
    "use strict";
    // use strict

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.to-top').fadeIn(500);
        } else {
            $('.to-top').fadeOut(500);
        }

        let topSticky = $('.top-sticky');
        if ($(this).scrollTop() > 0) {
            topSticky.addClass('top-sticky_mask');
        } else {
            topSticky.removeClass('top-sticky_mask');
        }

        let scrollBg = $('.pageBanner');
        if ($(this).scrollTop() > 0) {
            scrollBg.addClass('top-sticky_mask');
        } else {
            scrollBg.removeClass('top-sticky_mask');
        }


    });
    $('.to-top').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, {
            // duration: 1000,
            // easing: "easeOutSine"
        });
    });
})(jQuery);


(function ($) {
    "use strict";
    // use strict

    var search = $('.search-button');
    search.siblings().slideUp();
    search.on('click', function () {
        search.siblings().slideToggle();
    });
    search.siblings().children('a').on('click', function () {
        search.siblings().slideToggle();
    })
})(jQuery);

(function ($) {
    "use strict";
    // use strict

    $('.au-tabs').each(function () {
        $(this).find('.tab-title').on('click', function () {
            var tab = $(this);
            tab.siblings().removeClass('tab-active');
            tab.addClass('tab-active');
        });
    });
})(jQuery);
