var scrapedData = [];

$(function() {
    var source = $("#search-results").html();
    var dataTemplate = Handlebars.compile(source);
    $results = $('#results')

    $('#search').on('keyup', function(e) {
        if (e.keyCode === 13) {
            var parameters = {
                search: $(this).val(),
                location: $('#location').val()
            };

            newAlert("Please Wait!", "We're still scraping...");

            $.get('/searching', parameters, function(data) {

                if (data instanceof Object) {
                    $results.append(dataTemplate({
                        page: data
                    }));
                } else {
                    $results.append(data);
                };

                scrapedData.push(data);
                $('#scraperModal').modal('show');
                $(".alert").delay(5000).fadeOut("slow", function() {
                    $(this).remove();
                });
            });
        };

        function newAlert(header, message) {
            $("#alert-area").append($("<div class='alert alert-warning alert-dismissible show' role='alert'>" +
              "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
              "<span aria-hidden='true'>&times;</span></button>" +
              "<strong>" + header + "</strong> " + message + "</div>"));
        }
    });

    $("#download").click(function() {
        var csv = '';

        for (var i = 0; i < scrapedData.length; i++) {

            csv += Papa.unparse(scrapedData[i].business, {
                quotes: false,
                quoteChar: '"',
                delimiter: ",",
                header: true,
                newline: "\r\n"
            });
        }

        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);

        downloadLink.href = url;
        downloadLink.download = "data.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });


});
