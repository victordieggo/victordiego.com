/* =====================================================================
 * SPACEMAN MOBILE NAVIGATION
 * ===================================================================*/
/*global $, window*/

//-------------------------------------------------------------------
// SET VARIABLES
//-------------------------------------------------------------------

var nav            = $('.main-nav'),
    navBtn         = $('.nav-btn'),
    header         = $('.main-header'),
    page           = $('html, body'),
    parentItem     = $('.menu-item-has-children'),
    activateScroll = $('a[href*="#"]'),
    breakPoint     = window.innerWidth,
    scrollPosition = $(window).scrollTop();

//-------------------------------------------------------------------
// UPDATE WINDOW WIDTH/SCROLL POSITION
//-------------------------------------------------------------------

$(window).on('resize', function getBreakpoint() {
    'use strict';
    breakPoint = window.innerWidth;
});

$(window).on('scroll', function getScrollposition() {
    'use strict';
    scrollPosition = $(window).scrollTop();
});

//-------------------------------------------------------------------
// FUNCTION: ADD/REMOVE HEADER BACKGROUND
//-------------------------------------------------------------------

function headerBackground() {
    'use strict';
    if (breakPoint >= 992) {
        if (scrollPosition >= 10) {
            header.addClass('bg-darker fixed-header');
        } else {
            header.removeClass('bg-darker fixed-header');
        }
    } else {
        if (!nav.hasClass('main-nav-is-active')) {
            if (scrollPosition > 0) {
                header.addClass('bg-darker');
            } else {
                header.removeClass('bg-darker');
            }
        } else {
            header.addClass('bg-darker');
        }
    }
}

//-------------------------------------------------------------------
// FUNCTION: OPEN MOBILE NAVIGATION
//-------------------------------------------------------------------

function openNavigation() {
    'use strict';
    nav.addClass('main-nav-is-active');
    headerBackground();
}

//-------------------------------------------------------------------
// FUNCTION: CLOSE MOBILE NAVIGATION
//-------------------------------------------------------------------

function closeNavigation() {
    'use strict';
    nav.removeClass('main-nav-is-active');
    headerBackground();
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
        if (breakPoint <= 992) {
            $(this).toggleClass('menu-item-is-active');
            $('ul', this).children().click(function (event) {
                event.stopPropagation();
            });
        }
    });
});

//-------------------------------------------------------------------
// FUNCTION: SCROLL NAVIGATION
//-------------------------------------------------------------------

function scrollNavigation() {
    'use strict';
    if (scrollPosition >= 100) {
        $('section').each(function (i) {
            if ($(this).position().top <= scrollPosition + 80) {
                $('a.menu-item-is-active', nav).removeClass('menu-item-is-active');
                $('a', nav).eq(i).addClass('menu-item-is-active');
            }
        });
    } else {
        $('a.menu-item-is-active', nav).removeClass('menu-item-is-active');
        $('a:first', nav).addClass('menu-item-is-active');
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
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (breakPoint <= 992) {
        nav.removeClass('main-nav-is-active');
        if ((target.offset().top === 0) && (header.offset().top === 0)) {
            header.removeClass('bg-darker');
        }
    }
    if (target.length) {
        $(page).animate({
            scrollTop: target.offset().top
        }, 1000);
        return false;
    }
});

$(window).on('resize scroll', headerBackground);
$(window).on('load scroll', scrollNavigation);
