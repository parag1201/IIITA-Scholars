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

    $('.form-check-input').on('click', (event) => {
        var sortBy = '.' + $(event.currentTarget).attr('value')
        var order = parseInt($(event.currentTarget).data('sort'))

        var divs = $('div.article-list')
            .children('.article')
            .toArray()
            .sort(function (a, b) {
                var val1 = parseInt(
                    $(sortBy, a)
                        .text()
                        .replace(/^\W+|\W+$/g, '')
                )
                var val2 = parseInt(
                    $(sortBy, b)
                        .text()
                        .replace(/^\W+|\W+$/g, '')
                )
                return val1 > val2 ? order : val1 < val2 ? -1 * order : 0
            })

        $('div.article-list').append(divs)
    })
})
