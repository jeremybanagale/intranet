var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var Xray = require('x-ray');

var x = Xray({
    filters: {
        trim: function(value) {
            return typeof value === 'string' ? value.trim() : value
        },
        formatString: function(value) {
          value = value.replace(/,\s*$/, '');
          return value.replace(/\w\S*/g, function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});
        },
        formatPhoneUK: function(value) {
          // return typeof value === 'string' ? value.trim().split(' ').join('') : value
          if (typeof value === 'string') {
            value = value.trim().split(' ').join('');
            return value.replace(/^0/, '44');
          } else {
            return value;
          }
        }
    }
});

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

router.get('/crawler.json', function(req, res) {
    var url = "https://www.yell.com/l/popular+locations.html";

    x(url, {
        locations: x('.findLinks--item', ['a | trim'])
    })(function(err, page) {
        res.json(page);
    })
});

router.get('/searching', function(req, res) {
    var searchValue = req.query.search;
    var locationValue = req.query.location;
    var url = "https://www.yell.com/s/" + searchValue + "-" + locationValue.split(' ').join('+') + ".html";

    x(url, {
        business: x('.businessCapsule', [{
                name: '.businessCapsule--title h2',
                phone: '.businessCapsule--telephone strong | formatPhoneUK',
                street_address: '.businessCapsule--address a span span:nth-child(1) | formatString',
                address_locality: '.businessCapsule--address a span span:nth-child(2) | formatString',
                postal_code: '.businessCapsule--address a span span:nth-child(3)',
                category: '.businessCapsule--classificationText | trim',
                website: '.businessCapsule--callToAction a@href',
                page_url: '.col-sm-24 a@href'
            }])
            .paginate('.pagination--next@href')
    })(function(err, page) {
        res.json(page);
    })

});


router.get('/about', function(req, res) {
    res.render('about', {
        title: 'About'
    });
});


module.exports = router;
