var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/exam', function(req, res){
  res.render('exam', {
    title: 'Applicant Assessment'
  });
});

router.get('/intern', function(req, res){
  res.render('intern/intern', {
    title: 'Intern Tools'
  });
});

router.get('/assessment-scores', function(req, res){
  res.render('intern/assessment-scores', {
    title: 'Assessment Scores'
  });
});

router.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

router.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

module.exports = router;
