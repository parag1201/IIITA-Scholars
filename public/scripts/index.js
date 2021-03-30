AOS.init()

var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: true,
    },
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    loop: true,
})

$('.count').each(function () {
    $(this)
        .prop('Counter', 0)
        .animate(
            {
                Counter: $(this).text(),
            },
            {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now))
                },
            }
        )
})

var canvas = document.getElementById('myChart').getContext('2d')
var myChart = new Chart(canvas, {
    type: 'bar',
    data: {
        labels: [
            'Department of Applied Science',
            'Department of Electronics',
            'Department of IT',
            'Department of Management',
        ],
        datasets: [
            {
                label: 'Publications',
                data: [454, 356, 636, 73],
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Citations',
                data: [3246, 1650, 4568, 204],
                backgroundColor: 'rgba(153, 102, 255, 1)',
            },
            {
                label: 'CROSSREF citations',
                data: [2699, 1580, 3457, 157],
                backgroundColor: 'rgba(255, 159, 64, 1)',
            },
        ],
    },
    options: {
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                    gridLines: {
                        display: false,
                    },
                },
            ],
        },
    },
})
