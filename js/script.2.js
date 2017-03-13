var urls = [];
var banners =[];
var counter= 0;


//PRIVATE METHODS


function convertImgToBlob(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
      var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataBlob;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      canvas.toBlob(function(data){return callback(data, url)});
      canvas = null;
    };
    img.src = url;
}


function numberOfItems(array){
     if (!array.length){
     $('.download').text('DOWNLOAD');
    }
     else if(array.length == '1'){
     $('.download').text('DOWNLOAD ' + array.length + ' item');
    }else {
    $('.download').text('DOWNLOAD ' + array.length + ' items');
  }
   };

function createArchive(images){
  // Use jszip
  var zip = new JSZip();
  var img = zip.folder("images");
  for (var i=0; i<images.length; i++) {
    img.file(images[i].url, images[i].data, {binary: true});  
  }
  zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, "banners.zip");
    });
}
 
 
 
   
//HANDLERS
   
$('.item').click(function(){
  urls.length = 0;

  $('.item').each(function(){
  var input =$(this),
      value = input.is(":checked");
    
  if (value) {
    var url = $(this).attr('data-url');  
    
    //get text
    // var target = $(this)[0].nextSibling.nodeValue;
   urls.push(url);
  }
   });
  numberOfItems(urls); 
  console.log(urls);
  console.log(urls.length);
});

$('.download').click(function(){
    
    for (var i = 0; i<urls.length; i++) {
  convertImgToBlob(urls[i], function (data, url) {
      
    console.log(url, data);
    
    banners.push({
      url: url,
      data: data
    });
    counter++;
    if (counter == urls.length) {
        console.log(banners);
      createArchive(banners);
      banners.length = 0;
      counter = 0;
    }
  });
}
    
});

