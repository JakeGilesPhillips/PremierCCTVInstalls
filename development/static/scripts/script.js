$(document).ready(() =>
{
    $(window).on('scroll', scrollSections);
    $("#burger").on('click', toggleMenu);
    $("#covid-banner .close").on('click', (ev) =>
    {
        ev.stopPropagation();
        $("#covid-banner").removeClass("show");
    });
    $("div[data-link]").on('click', scrollToSection);
    setTimeout(() => $("#covid-banner").addClass("show"), 1000);
});

function scrollSections()
{
    if ($(window).width() >= 768)
    {
        var perc = ($(window).scrollTop() / ($(document).height() - $(window).height())) * 200;
        $(".parallax").css("background-position-y", `${-perc}px`);
    }
    
    if ($(window).scrollTop() >= 50)
    {
        $("#header").addClass("small");
        $("#burger").removeClass("open");
        $("#links").removeClass("open");
        $("#fade").removeClass("show");
    }
    else { $("#header").removeClass("small"); }
}

function scrollToSection(ev)
{
    var target = $(ev.currentTarget).data('link');
    $('html, body').animate({
        scrollTop: $(`.section[data-section='${target}']`).offset().top - 60
    }, 1000);
}

function toggleMenu()
{
    $("#burger").toggleClass("open");
    $("#links").toggleClass("open");
    $("#fade").toggleClass("show");
}