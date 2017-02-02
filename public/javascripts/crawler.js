$(function() {
    var source = $("#search-results").html();
    var dataTemplate = Handlebars.compile(source);
    $results = $('#results')

    $('#search').on('keyup', function(e) {
        if (e.keyCode === 13) {
            var parameters = {
                search: $(this).val()
            };
            $.get('/searching', parameters, function(data) {
                if (data instanceof Object) {
                    $results.html(dataTemplate({
                        page: data
                    }));
                } else {
                    $results.html(data);
                };
                $results.listview().listview('refresh');
            });
        };
    });
});
