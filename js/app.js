'use strict'
//Global
let allHornyImages = [];
let keywordList = [];
let knowCurrentPage;

function HornyImage(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;

  allHornyImages.push(this);
}

//Rendering Objects
HornyImage.prototype.render = function() {
  $('main').append('<section class = "clone"></section>');

  let $clone = $('section[class = "clone"]');
  let hornyTemplate = Handlebars.compile($('#horny-image-template').html());
  $clone.html(hornyTemplate(this));

  $clone.removeClass('clone');
  $clone.attr('class', this.title);

  $clone.attr('keyword', this.keyword);

}

//Adding Keyword Filter
HornyImage.prototype.options = function () {
  if (keywordList.indexOf(this.keyword) === -1) {
    $('select').append('<option class="keyword"></option>');
    let $option = $('option[class="keyword"]');

    $option.find('option').text('value', this.keyword);

    $option.removeClass('keyword');
    $option.attr('value', this.keyword);
    $option.text(this.keyword);

    keywordList.push(this.keyword);
  }
}

//Read Json File
function readJson(filepath) {
  knowCurrentPage = filepath;
  $.get(filepath, 'json').then(data => {
    allHornyImages = []; //clears out the array
    data.forEach(hornyImageObj => {
      new HornyImage(hornyImageObj)
      console.log(knowCurrentPage);
    })
  }).then(() => {
    keywordList = []; //clears out list of keywords
    
    allHornyImages.forEach(horn => {
      horn.render();
      horn.options();
      console.log('work!');
    })
  })
}

//Code modified from Skyler/Nicole
//Option view handler
$('#filter-options').on('change', function(){
  let val = $(this).val();
  if(val) {
    $('section').hide();
    $(`section[keyword="${val}"]`).show();
  }
});

//Pagination Button Click Handler - Dry
$('.pagination-button').on('click', function(event){
  console.log('hi');
  $('main').empty();
  $('#filter-options').empty();
  $('select').append('<option value="default">Filter by Keyword</option>');
  $(() => readJson(`./data/${event.target.id}.json`));
});

//Sort Button Click Handler - Title
$('#alphabetize').on('click', function(event){
  $('main').empty();
  $('#filter-options').empty();
  $('select').append('<option value="default">Filter by Keyword</option>');
  $(() => readJsonSortTitle(knowCurrentPage));
  console.log(`${event.target.id}`);
});

//Read Json File for Title Sort
function readJsonSortTitle(filepath) {
  $.get(filepath, 'json').then(data => {
    allHornyImages= []; //clears out the array
    data.forEach(hornyImageObj => {
      new HornyImage(hornyImageObj)
    })
    allHornyImages.sort(function(a,b){
      if(a.title<b.title) return -1;
      if(a.title>b.title) return 1;
      return 0;
    })
  }).then(() => {
    keywordList = []; //clears out list of keywords
    allHornyImages.forEach(horn => {
      horn.render();
      horn.options();
    })
  })
}

//Read Json File for Horns Sort
function readJsonSortHorns(filepath) {
  $.get(filepath, 'json').then(data => {
    allHornyImages= []; //clears out the array
    data.forEach(hornyImageObj => {
      new HornyImage(hornyImageObj)
      console.log('horny images!')
    })
    allHornyImages.sort(function(a,b){
      if(a.horns<b.horns) return -1;
      if(a.horns>b.horns) return 1;
      return 0;
    })
  }).then(() => {
    keywordList = []; //clears out list of keywords

    allHornyImages.forEach(horn => {
      horn.render();
      horn.options();
    })
  })
}

//Sort Button Click Handler - Horns
$('#horn-sort').on('click', function(event){
  $('main').empty();
  $('#filter-options').empty();
  $('select').append('<option value="default">Filter by Keyword</option>');
  $(() => readJsonSortHorns(knowCurrentPage));
  console.log(`${event.target.id}`);
});
$(() => readJson('./data/page-1.json'));

