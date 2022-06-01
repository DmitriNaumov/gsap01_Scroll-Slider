$(function () {

    'use strict';



    //scrollTrig
    gsap.registerPlugin(ScrollTrigger);

    function scrollTrig() {

        let gsapBl = $('.gsap__bl').width();
        //На всю ширину контентного блока
        // $('.gsap__item').css('width', gsapBl + 'px');
        let gsapTrack = $('.gsap__track').width();
        let scrollSliderTransform = gsapTrack - gsapBl;

        let winHeight = $(window).height();
        let slHeight = $('.gsap_slider').outerHeight(true);
        let startScrollTrig = (winHeight - slHeight) / 2;

        gsap.to(".gsap__track", {
            scrollTrigger: {
                trigger: ".gsap_slider",
                // start: "top center",
                start: () => "-=" + startScrollTrig,
                end: "+=1000px",
                // end: () => '+=' + gsapTrack,
                scrub: true,
                pin: true,
                markers: true
            },
            x: "-" + scrollSliderTransform + "px"
        });

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
    }
    scrollTrig();
});