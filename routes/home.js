var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var Xray = require('x-ray');

var x = Xray();

var router = express.Router();

router.get('/', function(req, res) {
    res.render('home', {
        title: 'Home'
    });
});

//Applicant views
router.get('/applicant/exam', function(req, res) {
    res.render('applicant/exam', {
        title: 'Applicant Assessment'
    });
});

router.get('/applicant/scores', function(req, res) {
    res.render('applicant/scores', {
        title: 'Assessment Scores'
    });
});

//Intern views
router.get('/intern/assessment-form', function(req, res) {
    res.render('intern/assessment-form', {
        title: 'Assessment Score Data Entry Form'
    });
});

router.get('/intern/consequence-picker', function(req, res) {
    res.render('intern/consequence-picker', {
        title: 'Intern Tools'
    });
});


//Crawler view
router.get('/crawler', function(req, res) {
    res.render('crawler/crawler', {
        title: 'Intern Tools'
    });
});


router.get('/searching', function(req, res) {
    var searchValue = req.query.search;
    x('https://www.yell.com/s/' + searchValue + '-newcastle+upon+tyne.html', {
        business: x('.col-sm-24', [{
            name: '.businessCapsule--title h2',
            phone: '.businessCapsule--telephone strong'
        }])
    })(function(err, page) {
        res.json(page);
        console.log(page);
    })

});

// router.get('/searching', function(req, res) {
//   var START_URL = "http://www.arstechnica.com";
//   var SEARCH_WORD = "stemming";
//   var MAX_PAGES_TO_VISIT = 10;
//
//   var pagesVisited = {};
//   var numPagesVisited = 0;
//   var pagesToVisit = [];
//   var url = new URL(START_URL);
//   var baseUrl = url.protocol + "//" + url.hostname;
//
//   pagesToVisit.push(START_URL);
//   crawl();
//
//   function crawl() {
//   if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
//     console.log("Reached max limit of number of pages to visit.");
//     return;
//   }
//   var nextPage = pagesToVisit.pop();
//   if (nextPage in pagesVisited) {
//     // We've already visited this page, so repeat the crawl
//     crawl();
//   } else {
//     // New page we haven't visited
//     visitPage(nextPage, crawl);
//   }
// }
//
// function visitPage(url, callback) {
//   // Add page to our set
//   pagesVisited[url] = true;
//   numPagesVisited++;
//
//   // Make the request
//   console.log("Visiting page " + url);
//   request(url, function(error, response, body) {
//      // Check status code (200 is HTTP OK)
//      console.log("Status code: " + response.statusCode);
//      if(response.statusCode !== 200) {
//        callback();
//        return;
//      }
//      // Parse the document body
//      var $ = cheerio.load(body);
//      var isWordFound = searchForWord($, SEARCH_WORD);
//      if(isWordFound) {
//        console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
//      } else {
//        collectInternalLinks($);
//        // In this short program, our callback is just calling crawl()
//        callback();
//      }
//   });
// }
//
// function searchForWord($, word) {
//   var bodyText = $('html > body').text().toLowerCase();
//   return(bodyText.indexOf(word.toLowerCase()) !== -1);
// }
//
// function collectInternalLinks($) {
//     var relativeLinks = $("a[href^='/']");
//     console.log("Found " + relativeLinks.length + " relative links on page");
//     relativeLinks.each(function() {
//         pagesToVisit.push(baseUrl + $(this).attr('href'));
//     });
// }
// });



// router.get('/searching', function(req, res) {
//     // input value from search
//     var val = req.query.search;
//     // url used to search yql
//     var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
//         "%20where%20location%3D%22sfbay%22%20and%20type%3D%22jjj%22%20and%20query%3D%22" + val + "%22&format=" +
//         "json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
//
//     requests(url, function(data) {
//         res.send(data);
//     });
// });
//
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



router.get('/about', function(req, res) {
    res.render('about', {
        title: 'About'
    });
});


module.exports = router;
