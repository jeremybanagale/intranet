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

router.get('/assessment-form', function(req, res){
  res.render('intern/assessment-form', {
    title: 'Assessment Score Data Entry Form'
  });
});

router.get('/assessment-scores', function(req, res){
  res.render('intern/assessment-scores', {
    title: 'Assessment Scores'
  });
});

router.get('/consequence-picker', function(req, res){
  res.render('intern/consequence-picker', {
    title: 'Intern Tools'
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
