var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('home', {
        title: 'Home'
    });
});

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

router.get('/assessment-form', function(req, res) {
    res.render('intern/assessment-form', {
        title: 'Assessment Score Data Entry Form'
    });
});



router.get('/crawler', function(req, res) {
    res.render('crawler/crawler', {
        title: 'Intern Tools'
    });
});

router.get('/searching', function(req, res) {
    // input value from search
    var val = req.query.search;
    // url used to search yql
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
        "%20where%20location%3D%22sfbay%22%20and%20type%3D%22jjj%22%20and%20query%3D%22" + val + "%22&format=" +
        "json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    requests(url, function(data) {
        res.send(data);
    });
});

function requests(url, callback) {
    // request module is used to process the yql url and return the results in JSON format
    request(url, function(err, resp, body) {
        var resultsArray = [];
        body = JSON.parse(body);
        // console.log(body);
        // console.log(body.query.results.RDF.item)
        // logic used to compare search results with the input from user
        if (!body.query.results.RDF.item) {
            results = "No results found. Try again.";
            callback(results);
        } else {
            results = body.query.results.RDF.item;
            for (var i = 0; i < results.length; i++) {
                resultsArray.push({
                    title: results[i].title[0],
                    about: results[i]["about"],
                    desc: results[i]["description"],
                    date: results[i]["date"]
                });
            };
        };
        // pass back the results to client side
        callback(resultsArray);
    });
};

router.get('/consequence-picker', function(req, res) {
    res.render('intern/consequence-picker', {
        title: 'Intern Tools'
    });
});

router.get('/about', function(req, res) {
    res.render('about', {
        title: 'About'
    });
});


module.exports = router;
