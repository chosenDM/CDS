/* ============================================
   Chosen Digital Solutions — JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

    // ===== MOBILE NAV TOGGLE =====
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });

        // Close mobile nav when a link is clicked
        var links = navLinks.querySelectorAll("a");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
            });
        });
    }

    // ===== CONTACT FORM HANDLER =====
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var formData = {
                name: document.getElementById("fullName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                company: document.getElementById("companyName").value,
                service: document.getElementById("serviceInterest").value,
                message: document.getElementById("message").value
            };

            // Build mailto link
            var subject = encodeURIComponent("New Inquiry from CDS Website — " + formData.service);
            var body = encodeURIComponent(
                "Full Name: " + formData.name + "\n" +
                "Email: " + formData.email + "\n" +
                "Phone: " + formData.phone + "\n" +
                "Company: " + (formData.company || "N/A") + "\n" +
                "Service/Product of Interest: " + formData.service + "\n\n" +
                "Message:\n" + formData.message
            );

            window.location.href = "mailto:chosendigitalsolutions@gmail.com?subject=" + subject + "&body=" + body;
        });
    }

    // ===== NEWSLETTER FORM HANDLER =====
    var newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
        });

        var subscribeBtn = newsletterForm.querySelector("button");
        if (subscribeBtn) {
            subscribeBtn.addEventListener("click", function (e) {
                e.preventDefault();
                var emailInput = newsletterForm.querySelector("input[type='email']");
                if (emailInput && emailInput.value.trim() !== "") {
                    // Open mailto for subscription
                    var subject = encodeURIComponent("Newsletter Subscription");
                    var body = encodeURIComponent("I would like to subscribe to the Chosen Digital Solutions newsletter.\n\nEmail: " + emailInput.value);
                    window.location.href = "mailto:chosendigitalsolutions@gmail.com?subject=" + subject + "&body=" + body;
                } else {
                    alert("Please enter your email address.");
                }
            });
        }
    }

    // ===== IMAGE SLIDER =====
    var sliderTrack = document.getElementById("sliderTrack");
    var sliderPrev = document.getElementById("sliderPrev");
    var sliderNext = document.getElementById("sliderNext");
    var sliderDots = document.getElementById("sliderDots");

    if (sliderTrack && sliderPrev && sliderNext && sliderDots) {
        var slides = sliderTrack.querySelectorAll(".slider-slide");
        var currentIndex = 0;
        var totalSlides = slides.length;
        var autoSlideInterval;

        // Create dots
        for (var i = 0; i < totalSlides; i++) {
            var dot = document.createElement("button");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.setAttribute("aria-label", "Go to slide " + (i + 1));
            (function(index) {
                dot.addEventListener("click", function () {
                    goToSlide(index);
                    resetAutoSlide();
                });
            })(i);
            sliderDots.appendChild(dot);
        }

        var dots = sliderDots.querySelectorAll(".dot");

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentIndex = index;
            sliderTrack.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
            for (var j = 0; j < dots.length; j++) {
                dots[j].classList.remove("active");
            }
            if (dots[currentIndex]) dots[currentIndex].classList.add("active");
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        sliderNext.addEventListener("click", function () {
            nextSlide();
            resetAutoSlide();
        });

        sliderPrev.addEventListener("click", function () {
            prevSlide();
            resetAutoSlide();
        });

        // Touch/swipe support
        var touchStartX = 0;
        var touchEndX = 0;
        sliderTrack.addEventListener("touchstart", function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        sliderTrack.addEventListener("touchend", function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
                resetAutoSlide();
            }
        }, { passive: true });

        // Pause on hover
        var sliderContainer = document.getElementById("imageSlider");
        sliderContainer.addEventListener("mouseenter", function () {
            clearInterval(autoSlideInterval);
        });
        sliderContainer.addEventListener("mouseleave", function () {
            startAutoSlide();
        });

        // Start auto-scrolling
        startAutoSlide();
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");
            if (targetId.length > 1) {
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

});

// Lightweight animated growth slider (works without external libraries or image assets).
document.addEventListener("DOMContentLoaded", function () {
    var slider = document.getElementById("growthSlider");
    if (!slider) return;
    var slides = slider.querySelectorAll(".growth-slide");
    var dots = slider.querySelectorAll(".growth-dot");
    var index = 0;
    var timer;
    function showSlide(next) {
        index = (next + slides.length) % slides.length;
        slides.forEach(function (slide, i) { slide.classList.toggle("is-active", i === index); });
        dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === index); });
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { showSlide(index + 1); }, 6000); }
    slider.querySelector(".growth-next").addEventListener("click", function () { showSlide(index + 1); restart(); });
    slider.querySelector(".growth-prev").addEventListener("click", function () { showSlide(index - 1); restart(); });
    dots.forEach(function (dot, i) { dot.addEventListener("click", function () { showSlide(i); restart(); }); });
    slider.addEventListener("mouseenter", function () { clearInterval(timer); });
    slider.addEventListener("mouseleave", restart);
    restart();
});
