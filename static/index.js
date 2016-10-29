
// pull in desired CSS/SASS files
require('./css/index.scss');

// inject bundled Elm app into div#main

var Elm = require('../src/Main');
var app = Elm.Main.embed(document.getElementById('main'));

var getUploadedImageData = function() {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var img = document.getElementsByClassName('images-original_image_container-image')[0];
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
  return context.getImageData(0, 0, img.width, img.height).data;
}

var getGeneratedImageData = function() {
  var canvas = document.getElementsByClassName('images-image_container-generated_image_canvas')[0].childNodes[0].childNodes[0];
  return canvas.getContext('2d').getImageData(0, 0, 100, 100).data;
};

app.ports.requestUploadedImage.subscribe(function(_) {
  var uploadedImageData = Array.from(getUploadedImageData());
  app.ports.uploadedImage.send(uploadedImageData)
});

app.ports.requestCandidateImage.subscribe(function(_) {
  var generatedImageData = Array.from(getGeneratedImageData());
  app.ports.candidateImage.send(generatedImageData);
});
