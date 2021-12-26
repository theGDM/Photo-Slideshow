let current = 1;
let playPauseBool = true;
let interval;

const changeSlides = () => {
    const slideList = document.querySelectorAll(".slide");
    //Actually when you select element using queryselectorall method it returns
    //an array like object, called nodelist.
    //Now in order to transform nodelist into an array, we have to use Array.from method
    //and we have to pass here slideList
    const slides = Array.from(slideList);

    if (current > slides.length) {
        current = 1;
    } else if (current === 0) {
        current = slides.length;
    }

    slides.forEach(slide => {
        //the classList will actually give us an array of the class name, in this case 
        //those class name will be slide and slide-1 or slide-2...
        //After that we need to split this class name on the -, it will return another 
        //array in ehich we will have two items slide and 1, we have to grab the second 
        //icon which is 1
        //we need to multiply by 1 to make it integer
        if (slide.classList[1].split('-')[1] * 1 === current) {
            slide.style.cssText = "visibility:visible; opacity:1";
        } else {
            slide.style.cssText = "visibility:hidden; opacity:0";
        }
    })
};
 

const playPause = () => {
    if (playPauseBool) {
        interval = setInterval(() => {
            ++current;
            changeSlides();
        }, 3000);
        playPauseBool = false;
    } else {
        clearInterval(interval);
        playPauseBool = true;
    }

    changePlayPause();
    arrowsVisibility();
};

//manipulationg icon for play-pause
const changePlayPause = () => {
    const icon = document.querySelector(".play-pause i");
    const cls = icon.classList[1];
    if (cls === "fa-play") {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    } else {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }

};

const arrowsVisibility = () => {
    const arrows = document.querySelectorAll(".control");
    //First of all in order to loop through arrows we need to transform nodeList into an array.
    Array.from(arrows).forEach(arrow => {
        if (!playPauseBool) {
            arrow.classList.add("arrows-visibility");
        } else {
            arrow.classList.remove("arrows-visibility");
        }
    })
};

document.querySelector(".play-pause").addEventListener("click", () => {
    playPause();
});

changeSlides();
playPause();

//Now lets take care of the control
document.querySelector(".left-arrow").addEventListener("click", () => {
    //As we know if slideshow is running, that means playpausebool is set to
    //false, and if we call again play-pause function it should stop
    if (!playPauseBool) {
        playPause();
    }

    --current;
    changeSlides();
});

document.querySelector(".right-arrow").addEventListener("click", () => {
    //As we know if slideshow is running, that means playpausebool is set to
    //false, and if we call again play-pause function it should stop
    if (!playPauseBool) {
        playPause();
    }

    ++current;
    changeSlides();
});
