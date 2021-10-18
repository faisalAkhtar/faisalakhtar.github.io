const modeCheckBoxEl = document.querySelector('.modeCheckBox');
let isDarkMode = sessionStorage.getItem('darkMode') == 'true';
modeCheckBoxEl.checked = isDarkMode;

function openMenu(arg) {
    arg.classList.toggle('open')
    document.querySelector("header ul").classList.toggle('open')
}

new Swiper('.swiperHolder', {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.9
    },
    keyboard: {
        enabled: true
    },
    pagination: {
        el: '.paginationDiv',
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.nextSlide',
        prevEl: '.prevSlide',
    }
})

let x = 15, wavePos = 0
function waveHandFunc() {
    wavePos++
    if (wavePos == 1 || wavePos == 2) {
        document.getElementById('wavingHand').style.transform = "rotate(" + (x = -x) + "deg) translate(2.5px,-2.5px)"
    } else if (wavePos == 3 || wavePos == 4) {
        x /= 2
        document.getElementById('wavingHand').style.transform = "rotate(" + (x = -x) + "deg) translate(2.5px,-2.5px)"
    } else if (wavePos == 8) {
        x = 15
        wavePos = 0
    }
}

var i = 0, myName = 'Faisal Akhtar'
function startWritingName() {
    if (i < myName.length) {
        document.querySelector(".loadingScreen div span").innerHTML += myName.charAt(i)
        i++
        setTimeout(startWritingName, 200)
    } else if (i == myName.length) {
        endWritingName()
    }
}

function endWritingName() {
    document.querySelector(".loadingScreen div").style.transform = "none"
    document.querySelector(".loadingScreen div").style.top = document.querySelector("a.title").offsetTop + "px"
    document.querySelector(".loadingScreen div").style.left = "5%"
    document.querySelector(".loadingScreen div").style.fontSize = "1.5em"
    setTimeout(function () { document.getElementsByClassName('loadingScreen')[0].style.opacity = "0" }, 500)
    setTimeout(function () {
        document.getElementsByClassName('loadingScreen')[0].remove()
        setInterval(waveHandFunc, 200)
    }, 1000)
}

function showPopupMsg(msg) {
    for (var i = document.getElementsByClassName("popupMsg").length - 1; i >= 0; i--) {
        document.getElementsByClassName("popupMsg")[i].remove()
    }
    var x = document.createElement("div");
    x.innerHTML = msg;
    x.className = "popupMsg poppedUp";
    document.querySelector("body").append(x)
    setTimeout(function () { x.className = x.className.replace("poppedUp", ""); }, 3000);
    setTimeout(function () { x.remove(); }, 3100);
}

function switchMode(isDarkMode) {
    sessionStorage.setItem('darkMode', isDarkMode);
    if (isDarkMode) {
        document.querySelector('body').classList.add('dark')
        showPopupMsg("Switched to dark mode &#x2764;&#xfe0f;")
    } else {
        document.querySelector('body').classList.remove('dark')
        showPopupMsg("Switched to light mode &#x2764;&#xfe0f;")
    }
}

function getMaxSlidesHeight() {
    let x = 0
    document.querySelectorAll(".swiperSlide").forEach(e => {
        if (x < e.clientHeight) x = e.clientHeight
    })
    return (x + 10)
}

function resizeSlider(slideHeight) {
    document.querySelectorAll(".swiperSlide").forEach(e => {
        e.style.height = slideHeight
    })
}

document.onkeyup = function (e) {
    if (e.altKey && e.which == 77) {
        isDarkMode = !isDarkMode;
        modeCheckBoxEl.checked = isDarkMode;
        switchMode(modeCheckBoxEl.checked)
    }
}

document.onload = function () {
    console.log('Document loaded')
}

window.onload = function () {
    console.log('Window loaded')
    modeCheckBoxEl.addEventListener('change', function () {
        switchMode(modeCheckBoxEl.checked)
    })

    if (modeCheckBoxEl.checked) {
        if ('ontouchstart' in document.documentElement) {
            showPopupMsg("Opened in dark mode<br>Switch to light mode from the menu")
        } else {
            showPopupMsg("Opened in dark mode<br>Switch to light mode by pressing 'Alt+M'")
        }
        document.querySelector('body').classList.add('dark')
    } else {
        if ('ontouchstart' in document.documentElement) {
            showPopupMsg("Opened in light mode<br>Switch to dark mode from the menu")
        } else {
            showPopupMsg("Opened in light mode<br>Switch to dark mode by pressing 'Alt+M'")
        }
        document.querySelector('body').classList.remove('dark')
    }

    if (sessionStorage.getItem('faisalsSign') == null) {
        sessionStorage.setItem('faisalsSign', new Date())
        startWritingName()
    } else {
        let faisalsSign = sessionStorage.getItem('faisalsSign')
        faisalsSign = new Date(faisalsSign)
        faisalsSign = (Date.now() - faisalsSign.getTime()) / 3600000
        if (faisalsSign > 1) sessionStorage.removeItem('faisalsSign')
        endWritingName()
    }

    resizeSlider(getMaxSlidesHeight() + "px")
}

window.onresize = function () {
    resizeSlider("unset")
    resizeSlider(getMaxSlidesHeight() + "px")
}
AOS.init({ duration: 600 });
