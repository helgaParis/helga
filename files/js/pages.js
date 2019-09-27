window.addEventListener('DOMContentLoaded', function (){
     
 
    
    
    
    
    
//preload photos (- check if useful)
    var imageList = [
         //precharge les premières photos des galeries
        "photos/moab/1.jpg",
        "photos/rouen/2.jpg",
        "photos/implosion/1.jpg",
        "photos/voyages/0.jpg",
        "photos/moab/2.jpg",
        "photos/rouen/3.jpg",
        "photos/implosion/2.jpg",
        "photos/voyages/1.jpg"
    ];
    for(var i = 0; i < imageList.length; i++ ) 
    {
        var startPhoto = new Image();
        startPhoto.src = imageList[i];
    }
});

