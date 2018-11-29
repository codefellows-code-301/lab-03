'use strict'
//Global
let allHornyImages = [];
let keywordList = [];

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
  // var source   = document.getElementById('#horny-image-template').innerHTML;
  // var template = Handlebars.compile(source);
  let hornyTemplate = Handlebars.compile($('#horny-image-template').html());
  // console.log(this);
  $clone.html(hornyTemplate(this));

  // $clone.find('h2').text(this.title);
  // $clone.find('p').text(this.description);
  // $clone.find('img').attr('src', this.image_url);

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
  $.get(filepath, 'json').then(data => {
    allHornyImages= []; //clears out the array
    data.forEach(hornyImageObj => {
      new HornyImage(hornyImageObj)
      console.log('horny images!')
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
  // console.log(allHornyImages, keywordList, 'arrays inside options');
  let val = $(this).val();
  if(val) {
    $('section').hide();
    $(`section[keyword="${val}"]`).show();
  }
});

//Button Click Handler - Dry
$('nav').on('click', 'button', function(event){
  $('main').empty();
  $('#filter-options').empty();
  $('select').append('<option value="default">Filter by Keyword</option>');
  $(() => readJson(`./data/${event.target.id}.json`));
});

$(() => readJson('./data/page-1.json'));

