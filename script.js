
var imgSave = new Image();
var imgName = "";

window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');
          img.src = URL.createObjectURL(this.files[0]);
          imgName = this.files[0].name.split(".")[0];
          imgSave.src = img.src;
          document.getElementById('myImg').style.display = 'block';
      }
  });
});


window.onload = function() {
    document.getElementById('myImg').style.display = 'none';
    
};

function saveToZip() {
    //33 66 100
    let canvases = ["canvas1", "canvas2", "canvas3"];
    var zip = new JSZip();
    
    for (name in canvases){
        
        var canvas = document.getElementById(canvases[name]);
        var ctx = canvas.getContext("2d");

        canvas.height = canvas.width * (imgSave.height / imgSave.width);

        var oc = document.createElement('canvas'),

        octx = oc.getContext('2d');

        oc.width = 100;
        oc.height = 100;
        octx.drawImage(imgSave, 0, 0, oc.width, oc.height);


        octx.drawImage(oc, 0, 0, oc.width, oc.height);


        ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, canvas.width, canvas.height);

        
        
        var gh = canvas.toDataURL('png');
        
        var img = zip.folder(imgName + " images");
        
        var nameNr = name == 0 ? "" : "@" + (parseInt(name) + 1) + "x";
        
        img.file(imgName + nameNr + ".png", gh.replace(/^data:image\/(png|jpg);base64,/, ""), {base64: true});
        
        
        
        
        
    }
    
    
    
    zip.generateAsync({type:"blob"}).then(function(content) {
        
        saveAs(content, imgName + ".zip");
    });
    

    
}



