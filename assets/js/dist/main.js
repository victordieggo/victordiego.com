function headerBackground(){"use strict";window.innerWidth<=992?$(window).scrollTop()<=10&&(nav.hasClass("main-nav-is-active")?header.addClass("bg-darker"):header.removeClass("bg-darker")):$(window).scrollTop()<=10&&header.removeClass("bg-darker")}function openNavigation(){"use strict";nav.addClass("main-nav-is-active"),headerBackground()}function closeNavigation(){"use strict";nav.removeClass("main-nav-is-active"),headerBackground()}function resizeFallback(){"use strict";window.innerWidth>992&&$("ul",nav).css({display:""})}function scrollNavigation(){"use strict";var a=$(window).scrollTop();a>=10?header.addClass("bg-darker"):header.removeClass("bg-darker"),headerBackground(),a>=100?$("section").each(function(e){$(this).position().top<=a+84&&($("nav a.active").removeClass("active"),$("nav a").eq(e).addClass("active"))}):($("nav a.active").removeClass("active"),$("nav a:first").addClass("active"))}var nav=$(".main-nav"),navBtn=$(".nav-btn"),header=$(".main-header"),page=$("html, body"),parentItem=$(".menu-item-has-children"),activateScroll=$('a[href*="#"]');$(parentItem).each(function(){"use strict";$("a:first",this).click(function(a){a.preventDefault()}),$(this).click(function(){window.innerWidth<=992&&($(this).toggleClass("menu-item-is-active"),$("ul",this).children().click(function(a){a.stopPropagation()}))})}),$(navBtn).on("click",function(){"use strict";nav.hasClass("main-nav-is-active")?closeNavigation():openNavigation()}),$(activateScroll).on("click",function(){"use strict";closeNavigation();var a=$(this.hash);if(a=a.length?a:$("[name="+this.hash.slice(1)+"]"),a.length)return $(page).animate({scrollTop:a.offset().top},1e3),!1}),$(window).on("resize",resizeFallback,headerBackground),$(window).on("scroll",scrollNavigation),$(document).on("ready",scrollNavigation);