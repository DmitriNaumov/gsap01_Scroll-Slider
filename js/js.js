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

        // Skew
        let proxy = { skew: 0 },
            skewSetter = gsap.quickSetter(".gsap__item", "skewX", "deg"),
            clamp = gsap.utils.clamp(-1000, 1000);

        gsap.to(".gsap__track", {
            scrollTrigger: {
                trigger: ".gsap_slider",
                // start: "top center",
                start: () => "-=" + startScrollTrig,
                end: "+=1500px",
                // end: () => '+=' + gsapTrack,
                scrub: true,
                pin: true,
                // markers: true
                onUpdate: (self) => {
                    let skew = clamp(self.getVelocity() / 800);
                    if (Math.abs(skew) > Math.abs(proxy.skew)) {
                        proxy.skew = skew;
                        gsap.to(proxy, {
                            skew: 0,
                            duration: 0.8,
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => skewSetter(proxy.skew)
                        });
                    }
                }
            },
            x: "-" + scrollSliderTransform + "px",
        });
        gsap.set(".gsap__item", { transformOrigin: "center center", force3D: true });

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
    }
    scrollTrig();
});