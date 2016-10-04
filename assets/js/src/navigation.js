/* =====================================================================
 * SPACEMAN MOBILE NAVIGATION
 * ===================================================================*/
/*global $, window, document*/

//-------------------------------------------------------------------
// SET VARIABLES
//-------------------------------------------------------------------

var nav = $('.main-nav'),
    navBtn = $('.nav-btn'),
    header = $('.main-header'),
    page = $('html, body'),
    parentItem = $('.menu-item-has-children'),
    activateScroll = $('a[href*="#"]');

//-------------------------------------------------------------------
// FUNCTION: OPEN MOBILE NAVIGATION
//-------------------------------------------------------------------

function openNavigation() {
    'use strict';
    nav.addClass('main-nav-is-active');
    if ($(window).scrollTop() <= 10) {
        header.addClass('bg-darker');
    }
}

//-------------------------------------------------------------------
// FUNCTION: OPEN/CLOSE NAVIGATION SUB ITEMS
//-------------------------------------------------------------------

$(parentItem).each(function () {
    'use strict';
    $('a:first', this).click(function (event) {
        event.preventDefault();
    });
    $(this).click(function () {
        if (window.innerWidth <= 992) {
            $(this).toggleClass('menu-item-is-active');
            $('ul', this).children().click(function (event) {
                event.stopPropagation();
            });
        }
    });
});

//-------------------------------------------------------------------
// FUNCTION: CLOSE MOBILE NAVIGATION
//-------------------------------------------------------------------

function closeNavigation() {
    'use strict';
    nav.removeClass('main-nav-is-active');
    if ($(window).scrollTop() <= 10) {
        header.removeClass('bg-darker');
    }
}

//-------------------------------------------------------------------
// FUNCTION: MOBILE NAVIGATION RESIZE FALLBACK
//-------------------------------------------------------------------

function resizeFallback() {
    'use strict';
    if (window.innerWidth > 992) {
        if ($(window).scrollTop() <= 10) {
            header.removeClass('bg-darker');
        }
        $('ul', nav).css({
            'display': ''
        });
    } else {
        if ((nav.hasClass('main-nav-is-active') && ($(window).scrollTop() <= 10))) {
            header.addClass('bg-darker');
        }
    }
}

//-------------------------------------------------------------------
// FUNCTION: SCROLL NAVIGATION
//-------------------------------------------------------------------

function scrollNavigation() {
    'use strict';
    var windscroll = $(window).scrollTop();
    if (windscroll >= 10) {
        $(header).addClass('bg-darker');
    } else {
        $(header).removeClass('bg-darker');
    }
    if (windscroll >= 100) {
        $('section').each(function (i) {
            if ($(this).position().top <= windscroll + 84) {
                $('nav a.active').removeClass('active');
                $('nav a').eq(i).addClass('active');
            }
        });
    } else {
        $('nav a.active').removeClass('active');
        $('nav a:first').addClass('active');
    }
}

//-------------------------------------------------------------------
// CALL FUNCTIONS
//-------------------------------------------------------------------

$(navBtn).on('click', function () {
    'use strict';
    if (nav.hasClass('main-nav-is-active')) {
        closeNavigation();
    } else {
        openNavigation();
    }
});

$(activateScroll).on('click', function () {
    'use strict';
    closeNavigation();
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
        $(page).animate({
            scrollTop: target.offset().top
        }, 1000);
        return false;
    }
});
$(window).on('resize', resizeFallback);
$(window).on('scroll', scrollNavigation);
$(document).on('ready', scrollNavigation);
