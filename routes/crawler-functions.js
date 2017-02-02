// function requests(url, callback) {
//     // request module is used to process the yql url and return the results in JSON format
//     request(url, function(err, resp, body) {
//         var resultsArray = [];
//
//         body = JSON.parse(body);
//         // logic used to compare search results with the input from user
//         if (!body.query.results.RDF.item) {
//             results = "No results found. Try again.";
//             callback(results);
//         } else {
//             results = body.query.results.RDF.item;
//             for (var i = 0; i < results.length; i++) {
//                 resultsArray.push({
//                     title: results[i].title[0],
//                     about: results[i]["about"],
//                     desc: results[i]["description"],
//                     date: results[i]["date"]
//                 });
//             };
//         };
//         // pass back the results to client side
//         callback(resultsArray);
//         console.log(resultsArray);
//     });
// };
