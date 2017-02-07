var scrapedData = [];

$(function() {
    var source = $("#search-results").html();
    var dataTemplate = Handlebars.compile(source);
    $results = $('#results')

    $('#search').on('keyup', function(e) {
        $('#status').css('display', 'none');
        if (e.keyCode === 13) {
            var parameters = {
                search: $(this).val(),
                location: $('#location').val()
            };
            $.get('/searching', parameters, function(data) {

                if (data instanceof Object) {
                    $results.append(dataTemplate({
                        page: data
                    }));
                } else {
                    $results.append(data);
                };

                scrapedData.push(data);
                $('#status').css('display', 'block');
            });
        };
    });

    $("#download").click(function() {
        var csv;
        for (var i = 0; i < scrapedData.length; i++) {
            csv = Papa.unparse(scrapedData[i].business);
            console.log(csv);
        }
    });

});
