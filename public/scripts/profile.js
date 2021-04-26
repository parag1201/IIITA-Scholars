$(function () {
    $('button.abstract').on('click', function () {
        $.ajax({
            url: '/abstract/' + this.dataset.id,
            contentType: 'application/json',
            success: (response) => {
                $('.modal-header').html(
                    '<h5>Abstract</h5> <span class="close"><i class="fas fa-times"></i></span>'
                )
                $('.modal-body-content').html(
                    '<p>' + response.abstract + '</p>'
                )
                $('div.modal').addClass('display')
            },
        })
    })

    $('button.summary').on('click', function () {
        $.ajax({
            url: '/summary/' + this.dataset.id,
            contentType: 'application/json',
            success: (response) => {
                $('.modal-header').html(
                    '<h5>Summary</h5> <span class="close"><i class="fas fa-times"></i></span>'
                )
                $('.modal-body-content').html('<p>' + response.summary + '</p>')
                $('div.modal').addClass('display')
            },
        })
    })

    $(window).on('click', (event) => {
        target = $(event.target)
        if (
            target.hasClass('modal') ||
            target.hasClass('close') ||
            target.hasClass('fas')
        ) {
            $('div.modal').removeClass('display')
        }
    })
})
