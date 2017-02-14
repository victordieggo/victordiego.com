/* =====================================================================
 * SPACEMAN MOBILE NAVIGATION
 * ===================================================================*/
/*global $, window, document*/

$(document).ready(function () {

    'use strict';

    // set variables
    var nav            = $('.main-nav'),
        navBtn         = $('.nav-btn'),
        parentItem     = $('.menu-item-has-children'),
        header         = $('.main-header'),
        page           = $('html, body'),
        activateScroll = $('a[href*="#"]'),
        browser        = $(window);

    // add/remove header background
    function headerBackground() {
        if (window.innerWidth >= 993) {
            if (browser.scrollTop() >= 15) {
                header.addClass('bg-darker fixed-header');
            } else {
                header.removeClass('bg-darker fixed-header');
            }
        } else {
            if (!nav.hasClass('main-nav-is-active')) {
                if (browser.scrollTop() > 15) {
                    header.addClass('bg-darker');
                } else {
                    header.removeClass('bg-darker');
                }
            } else {
                header.addClass('bg-darker');
            }
        }
    }

    // show/hide mobile navigation
    navBtn.on('click', function () {
        nav.toggleClass('main-nav-is-active');
        headerBackground();
    });

    // navigation sub-items
    parentItem.each(function () {
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

    // show current section on navigation
    browser.on('load scroll resize', function () {
        $('section').each(function (i) {
            if ($(this).position().top <= browser.scrollTop() + 80) {
                $('a.menu-item-is-active', nav).removeClass('menu-item-is-active');
                $('a', nav).eq(i).addClass('menu-item-is-active');
            }
        });
        headerBackground();
    });

    // scroll to target
    activateScroll.on('click', function () {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        nav.removeClass('main-nav-is-active');
        if ((target.offset().top === 0) && (header.offset().top === 0)) {
            header.removeClass('bg-darker');
        }
        if (target.length) {
            page.animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    });

});
