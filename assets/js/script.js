(function ($) {
    $(window).scroll(function () {
        updateProgressCircle();
        staticsScroll();
    });

    $(document).ready(function() {
        ///////// **mobile size** /////////
        $('.menu-bar').click(function () {
        $(this).toggleClass("nav_btn");
        $('.main-nav').toggleClass('open-nav');
        $('body').toggleClass('active-sidenav');
        });

        Fancybox.bind("[data-fancybox]" , {});
        
        // Smooth scroll to top on arrow click
        $('.arrow-up').hide();
        $('.arrow-up').click(function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 800, 'swing'); // Smooth scroll to top
        });
        ///////// **main Slider** /////////
        var mainSlider = new Swiper('.main-slider .swiper-container', {
            // loop: true,
            // autoplay: true,
            slidesPerView: 1,
            preloadImages: false,
            updateOnWindowResize: true,
            speed: 1000,
            
            // If we need pagination
            pagination: {
                el: '.main-slider .swiper-pagination',
                clickable: true,
            },
            // Navigation arrows   
            navigation: {
                nextEl: '.main-slider .swiper-button-next',
                prevEl: '.main-slider .swiper-button-prev',
            },
            on: {
                init: function (swiper) {
                    lazyLoad();
                },
                },
        });

        ///////// ** Services Slider** /////////
        var services = new Swiper('.services-row .swiper-container', {
            loop: true,
            autoplay: {
                    delay: 2000,
                },
            slidesPerView: 1,
            speed: 1000,
            updateOnWindowResize: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.services-row .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.services-row .swiper-button-next',
                prevEl: '.services-row .swiper-button-prev',
            },
            on: {
                init: function (swiper) {
                lazyLoad();
                },
            },
        });

             ///////// ** gallery Slider** /////////
      var gallery = new Swiper('.gallery-row .swiper-container', {
        // loop: true,
        // autoplay: {
        //         delay: 3000,
        //     },
        speed: 1000,
        pagination: {
            el: '.gallery-row .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.gallery-row .swiper-button-next',
            prevEl: '.gallery-row .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
        on: {
          init: function (swiper) {
            lazyLoad();
          },
        },
      });
        
    ///////// ** blogs Slider** /////////
      var blogs = new Swiper('.blogs-row .swiper-container', {
        // loop: true,
        // autoplay: {
        //         delay: 3000,
        //     },
        speed: 1000,
        pagination: {
            el: '.blogs-row .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.blogs-row .swiper-button-next',
            prevEl: '.blogs-row .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
        on: {
          init: function (swiper) {
            lazyLoad();
          },
        },
      });



        // lazy load
        lazyLoad();
    });


    // Function to update the progress circle
    function updateProgressCircle() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var scrollPercent = (scrollTop / docHeight) * 100;
        $(".progress-circle").css("background", 
            `conic-gradient(var(--primary-color) ${scrollPercent}%, transparent ${scrollPercent}% 100%)`
        );

        if (scrollTop >= 500) {
            $(".arrow-up").fadeIn(300);
        } else {
            $(".arrow-up").fadeOut(300);
        }
    }

    /*************************statistics *******************/

    var viewed = false;
    
    function isScrolledIntoView(elem) {
        if (!elem.length) return false; // Check if the element exists
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
    
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
    
        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }
    
    function staticsScroll() {
        var $statNum = $(".stat-num");
        if ($statNum.length && isScrolledIntoView($statNum) && !viewed) {
            viewed = true;
            $statNum.each(function() {
                var $this = $(this),
                    countTo = $this.attr("data-count");
                $({ countNum: $this.text() }).animate(
                    {
                        countNum: countTo
                    },
                    {
                        duration: 3000,
                        easing: "swing",
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    }
                );
            });
        }
    }

    
    /**********lazy load ***********/
    function lazyLoad() {
        const images = document.querySelectorAll(".lazy-img");
    
        const optionsLazyLoad = {
            //  rootMargin: '-50px',
            // threshold: 1
        };
    
        const imageObserver = new IntersectionObserver(function (enteries) {
            enteries.forEach(function (entery) {
            if (!entery.isIntersecting) {
                return;
            } else {
                preloadImage(entery.target);
                imageObserver.unobserve(entery.target);
            }
            });
        }, optionsLazyLoad);
        
        images.forEach(function (image) {
            imageObserver.observe(image);
        });
        }
        
        function preloadImage(img) {
        img.src = img.getAttribute("data-src");
        img.onload = function () {
            img.parentElement.classList.remove("loading-img");
            img.parentElement.classList.add("loaded-img");
            // img.parentElement.parentElement.classList.add("lazy-head-img");
        };
        }
})(jQuery)