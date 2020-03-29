var horz = document.querySelector(".horizontal");
isHover = false;

function preventDefault(event) {
    event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    }
    event.returnValue = false;
}

horz.onmouseover = function () {
    isHover = true;
};
horz.onmouseout = function () {
    isHover = false;
};

function displaywheel(e) {
    var evt = window.event || e
    var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;
    if (delta < 0 && isHover) {
        horz.scrollLeft += 100;
        preventDefault(evt);
    } else if (isHover) {
        horz.scrollLeft -= 100;
        preventDefault(evt);
    }
}

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"

if (document.attachEvent) {
    document.attachEvent("on" + mousewheelevt, displaywheel)
} else if (document.addEventListener) {
    document.addEventListener(mousewheelevt, displaywheel, false)
}