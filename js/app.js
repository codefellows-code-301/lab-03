'use strict'
//Global
const allHornyImages = [];
const keywordList = [];

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

  let hornyTemplate = $('#photo-template').html();

  $clone.html(hornyTemplate);

  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);

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

//First Json File
function readJson() {
  $.get('data/page-1.json', 'json').then(data => {
    data.forEach(hornyImageObj => {
      new HornyImage(hornyImageObj)
      console.log('horny images!')
    })
  }).then(() => {
    allHornyImages.forEach(horn => {
      horn.render();
      horn.options();
      console.log('work!');
    })
  })
}

//Second Json File
//Need to wrap in a click handler tied to a "page 2" button
function readJsonAgain() {
  $.get('data/page-2.json', 'json').then(data => {
    data.forEach(hornyImageObj => {
      new HornyImage(hornyImageObj)
      console.log('horny images!')
    })
  }).then(() => {
    allHornyImages.forEach(horn => {
      horn.render();
      horn.options();
      console.log('work!');
    })
  })
}


//Code from Skyler/Nicole
//Option view handler
$('#options').on('change', function(){
  console.log('inside option choice')
  if($(this).val()) {
    $('section').hide();
    $(`section[keyword="${$(this).val()}"]`).show();
  }
});

$(() => readJson());
$(() => readJsonAgain());

