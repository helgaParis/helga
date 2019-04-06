

    'use strict';

window.addEventListener('DOMContentLoaded', function () {
    
 var canvasBg; 
 var canvasFg;

 
//fonction constructeur, qui definit les propriétés du futur objet - les arguments à donner

function Rectangles ( x, y, width, height, fillStyle, strokeStyle, lineWidth) {
    this.xStartLt = x;
    this.yStartLt = y;
    this.widthStart = width;
    this.heightStart = height;
    this.contourWidth = lineWidth;
    this.couleurFond = fillStyle;
    this.couleurContour = strokeStyle;
    }
//des methodes ajoutés au prototype du constructeur : rectangle
// ils ajoutent egalement leur canvas et contexte de destination
Rectangles.prototype.dessineRectangle = function () {
    canvasFg = document.getElementById("myCanvasFg");    
    var ctx = canvasFg.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.xStartLt,this.yStartLt,this.widthStart,this.heightStart);
    ctx.fillStyle = this.couleurFond;
    ctx.fill();
    ctx.lineWidth = this.contourWidth;
    ctx.strokeStyle = this.couleurContour;
    ctx.stroke();   
    };

// Constructeur de cercles
function Ronds ( x, y, radius,  startPoint, endPoint, fillStyle, strokeStyle, lineWidth) {
    this.xStartLt = x;
    this.yStartLt = y;
    this.diametre = radius;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.couleurFond = fillStyle;
    this.couleurContour = strokeStyle;
    this.contourWidth = lineWidth;
    }

// methode cercle
Ronds.prototype.dessinceCercle = function () {
    canvasFg = document.getElementById("myCanvasFg");
    var ctx = canvasFg.getContext("2d");
    ctx.beginPath(); 
    ctx.arc( this.xStartLt, this.yStartLt, this.diametre, this.startPoint, this.endPoint * Math.PI);
    ctx.fillStyle = this.couleurFond;
    ctx.lineWidth = this.contourWidth;
    ctx.strokeStyle = this.couleurContour;
    ctx.fill();
    ctx.stroke();
};

// Constructeur de lignes
function Lignes ( x1, y1, x2,y2,  lineWidth, strokeStyle ) {
    this.xStartPoint = x1;
    this.yStartPoint = y1;
    this.xEndPoint = x2;
    this.yEndPoint = y2;
    this.ligneWidth = lineWidth;
    this.couleurLigne = strokeStyle;
}
// methode ligne
Lignes.prototype.dessineLigne = function () {
    var canvasBg = document.getElementById("myCanvasBg");
    var ctx = canvasBg.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(this.xStartPoint,this.yStartPoint);
    ctx.lineTo(this.xEndPoint, this.yEndPoint);
    ctx.lineWidth = this.ligneWidth;
    ctx.strokeStyle = this.couleurLigne;
    ctx.stroke();   
};


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// un tableau pour les valeurs x et y des lignes
var xyLign = [ [0,50,900,50],[880,50,880,350],[660,50,660,350],[],[60,80,840,80],   [860,277,880,305],[20,277,860,277]  ];
//espaceEnseigne !, murDroite !, murGauche !, [3]libre,  tiege horizontale !,  2xperspective à faire

// Les paquets sont créés en 3 parties, en fonction des passages du camion livreur

// un tableau pour les valeurs x et y des rectangles
var xyRect = [ [300,305],[380,315],[420,325] ];

// un tableau pour x et y des cercles 
var xyCercles = [[325,330],[627,302],[632,307] ];


 

 

 
 
 
 
    //++++++  Gestion du Temps ++++++++++++

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame|| window.webkitRequestAnimationFrame || window.msRequestAnimationFrame|| function(f){return setTimeout(f, 1000/60);}; // simulate calling code 60 
 
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(requestID){clearTimeout(requestID);}; //fall back
    
    var lePlanning = { //les delais pour le scenario
        autour: [ 50, 150, 3000, 3200, 4500],
            autourFaire : [ true, true, true, true, true],
       //scene,enseigne,mur,mur,fenetre+2perspective,tiege, tiegesCrocs,crochets+crochetsPlus, accueil+ telephone
        fond : [ 3300, 3400, 3500, 3600, 3700, 3800,  3900,4000, 4100, 4200 ],
            fondFaire :   [ true, true, true, true, true, true, true, true, true, true, true, true, true],
   };

   var lePlanningVite = { // scenario rapide
    autour: [ 50, 150, 950, 1000, 1520],
    fond : [ 1000, 1040, 1080, 1120, 1160, 1200,  1240, 1280, 1320, 1360],

};

 
 //un bouton pour les gens pressés (et pour moi, en production ;-)  )
 var speedy;
 (function rapide() {
    speedy = document.getElementById('faster');
    speedy.onclick = function (){
        lePlanning.autour = lePlanningVite.autour;
        lePlanning.fond = lePlanningVite.fond;
        speedy.style.display = 'none';
    };
 })();

    var heureZero = parseInt(Date.now()); //cette valeur servira comme debut du minuteur pour le scenario 
  //  console.log(heureZero);
    // console.log('autour' + (lePlanning.autour[0]+heureZero));
    var timestampDeBase;
 
// ++++    Animation avec requestAnimationFrame +++

    var continuer = true;
    var calculDuDeclenchement = function(timestamp){
    var heureNow = parseInt( Date.now()) ; // cette valeur changera dans le deroulement de requestAnimationFrame
   //     console.log(heureNow);
    // timestamp contiendra à chaque appel le timestamp de l'appel
    var timeGo;
    if ( ! timestampDeBase ) {
        timestampDeBase = timestamp;
    }
    if (timestamp - timestampDeBase >= 40 ) {
        timestampDeBase = timestamp;
        timeGo = (heureNow - heureZero)/10;
        //console.log('time diff' + timeGo);
        
        if ( lePlanning.autourFaire[0] ) { if (timeGo >lePlanning.autour[0] ) { lePlanning.autourFaire[0] = false; auteurShow(); }}
        if ( lePlanning.autourFaire[1] ) { if (timeGo > lePlanning.autour[1] ) { lePlanning.autourFaire[1]= false; reglesShow(); }}
        if ( lePlanning.autourFaire[2] ) { if (timeGo > lePlanning.autour[2] ) { lePlanning.autourFaire[2]= false; auteurHide(); }}
        if ( lePlanning.autourFaire[3] ) { if (timeGo > lePlanning.autour[3] ) { lePlanning.autourFaire[3]= false; reglesHide(); }}
        if ( lePlanning.autourFaire[4] ) { if (timeGo > lePlanning.autour[4] ) { versLeCarreQuiBouge(); console.log('if autour fin');lePlanning.autourFaire[4]= false; }}        
        
        if ( lePlanning.fondFaire[0] ) { if ( timeGo > lePlanning.fond[0] ) { lePlanning.fondFaire[0] = false; laScene(); }}
   if ( lePlanning.fondFaire[1] ) { if ( timeGo > lePlanning.fond[1] ) { lePlanning.fondFaire[1] = false; espaceEnseigne.dessineLigne(); }}
        if ( lePlanning.fondFaire[2] ) { if ( timeGo > lePlanning.fond[2] ) { lePlanning.fondFaire[2] = false; murDroite.dessineLigne(); }}
        if ( lePlanning.fondFaire[3] ) { if ( timeGo > lePlanning.fond[3] ) { lePlanning.fondFaire[3] = false; murGauche.dessineLigne(); }}
        if ( lePlanning.fondFaire[4] ) { if ( timeGo > lePlanning.fond[4] ) { lePlanning.fondFaire[4] = false; fenetre();perspective.dessineLigne(); perspective2.dessineLigne(); }}
        if ( lePlanning.fondFaire[5] ) { if ( timeGo > lePlanning.fond[5] ) { lePlanning.fondFaire[5] = false; tiege.dessineLigne(); }}
        if ( lePlanning.fondFaire[6] ) { if ( timeGo > lePlanning.fond[6] ) { lePlanning.fondFaire[6] = false; tiegesCrocs(); }}
        if ( lePlanning.fondFaire[7] ) { if ( timeGo > lePlanning.fond[7] ) { lePlanning.fondFaire[7] = false; crochets(); crochetsPlus();}}
        if ( lePlanning.fondFaire[8] ) { if ( timeGo > lePlanning.fond[8] ) { lePlanning.fondFaire[8] = false; accueil();telephone(); }}
    }

    if (continuer) {
        window.requestAnimationFrame(calculDuDeclenchement);
    }
}; // fin du calculDuDeclnechement AnimationFrale

calculDuDeclenchement();



// l'auteur apparaît pour une briève introduction
function auteurShow () {
    var imAuteur = document.createElement("img"); 
    imAuteur.setAttribute("src", "../images/helga-3jours.gif");
    imAuteur.setAttribute("height", "100");
    imAuteur.setAttribute("width", "100");
    imAuteur.setAttribute("alt", "l'auteur surmenée");
    imAuteur.setAttribute("title", "Je suis un peu stressée, à l'aide !");
    var cible = document.getElementById("temp");
    cible.appendChild(imAuteur);
    cible.style.display = 'block';
}
function auteurHide (){
    var cible = document.getElementById("temp");
    cible.style.display = 'none';
    cible.style.zIndex="1";
}

// les règles du jeu apparaissent
function reglesShow (){
    document.getElementById('rT').innerHTML = "Preparez l'exposition !";
    document.getElementById('r1').innerHTML = "Accrochez les tableaux (rectangles beiges) avec la souris,";
    document.getElementById('r2').innerHTML = "faites vite, ne les laissez pas dans la rue...";
    var cible = document.getElementById("temp2");
    cible.style.display = 'block';
}
function reglesHide (){
    var cible = document.getElementById("temp2");
    cible.style.display = 'none';
    cible.style.zIndex="1";
}


//la creation de canvas background avec un element de la scène
function laScene(){
    var canvasBg = document.getElementById("myCanvasBg");
    canvasBg.width= 900;
    canvasBg.height=450;
    var ctx = canvasBg.getContext("2d");
    var grd = ctx.createLinearGradient(0, 350, 0, 450);
    grd.addColorStop(0,"Gainsboro");
    grd.addColorStop(1,"DimGrey");
    ctx.fillStyle = grd;
    ctx.fillRect(0,350,900,130);
    speedy.style.display = 'none';
}
// Les autres elements du fond

var espaceEnseigne = new Lignes(xyLign[0][0], xyLign[0][1],xyLign[0][2],xyLign[0][3]);

var murDroite = new Lignes(xyLign[1][0], xyLign[1][1],xyLign[1][2],xyLign[1][3]);

var murGauche = new Lignes(xyLign[2][0], xyLign[2][1],xyLign[2][2],xyLign[2][3]);

var fenetre = function(){
    var canvasBg = document.getElementById("myCanvasBg");
    var ctx = canvasBg.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'DimGrey';
    ctx.strokeRect(20, 55, 620, 280); 
    };

var tiege = new Lignes(xyLign[4][0], xyLign[4][1],xyLign[4][2],xyLign[4][3]);

//elements repétés avec légers variations à endroits fixes

    // pour accrocher les tableaux, 2 tieges verticales courtes, 1 longue, 2 courtes, 
    //pour l'enseigne 3 tieges verticales en haut, 3 horizontales en leger pente, 3 courtes verticales

    var pointsAncres = [
        [96,80,96,88], [251,80,251,88],
        [406,80,406,250],
        [561,80,561,88], [770, 80,770,88],
        [190,10,190,50], [460,10,460,50], [770,10,770,50],
        [190,50,220,47], [460,50,490,47], [770,50,800,47] , 
        [220,40,220,47], [490,40,490,47], [800,40,800,47] ];

    var tiegesCrocs= function () {
        var canvasBg = document.getElementById("myCanvasBg");
        var ctx = canvasBg.getContext("2d");
        for(var i=0; i < pointsAncres.length; i++) {
             ctx.strokeStyle ="#A90101";
            ctx.beginPath();
             ctx.moveTo(pointsAncres[i][0], pointsAncres[i][1]);
             ctx.lineTo(pointsAncres[i][2], pointsAncres[i][3]);
             ctx.stroke();
            }
    };

   //parts de cercle (x-1px à gauche de la tiege,y-sous la tiege+4,radius,start angle, end angle) 
    var crochets = function () {
        var canvasBg = document.getElementById("myCanvasBg");
        var ctx = canvasBg.getContext("2d");
        for(var i=0; i < 5; i++) {
            ctx.beginPath();
            ctx.strokeStyle ="#A90101";
            ctx.arc((pointsAncres[i][0]-1), (pointsAncres[i][3]+4), 4, 0.5, 1.7 * Math.PI);
            ctx.stroke();
            }
    };
    // sur la longue tiege 4 crochets en plus
    var crochetsPlus = function () {
        var canvasBg = document.getElementById("myCanvasBg");
        var ctx = canvasBg.getContext("2d");
        for(var i=0; i < 4; i++) {
            var ancresPlus = [92,131,170,210];
            ctx.beginPath();
            ctx.strokeStyle ="#A90101";
            ctx.arc(406, ancresPlus[i], 4, 0.5, 1.7 * Math.PI);
            ctx.stroke();
            }
    };

    
    //une table d'accueil
    var accueil = function(){
        var canvasBg = document.getElementById("myCanvasBg");
        var ctx = canvasBg.getContext("2d");
        ctx.beginPath();     //table
        ctx.strokeStyle ="DimGrey";
        ctx.moveTo(758,240); //start gauche xy
        ctx.lineTo(858,240); //droite xy
        ctx.lineTo(878,260); //droite bas xy
        ctx.lineTo(778,260); //gauche bas xy
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "BurlyWood";
        ctx.fill();
        
        ctx.lineWidth = 2;
        ctx.beginPath(); //jambe droite devant
        ctx.moveTo(876, 260);
        ctx.lineTo(875, 300);
        ctx.stroke();
        ctx.beginPath(); //jambe droite fond
        ctx.moveTo(858, 260);
        ctx.lineTo(858, 280);
        ctx.stroke();
        ctx.beginPath();//jambe gauche fond
        ctx.moveTo(759, 240); 
        ctx.lineTo(759, 280);
        ctx.stroke(); //jambe gauche devant
        ctx.moveTo(778, 260);
        ctx.lineTo(777, 300);
        ctx.stroke();
    };

    // un telephone sur la table d'accueil 
    var telephone = function () {
        var canvasBg = document.getElementById("myCanvasBg");
        var ctx = canvasBg.getContext("2d");
        ctx.fillStyle = "#A90101";
        ctx.strokeStyle ="bisque";
        var valeursXYwhR =[[795,802],[230,222],[35,10],[20,22],[6,2]];
        ctx.lineJoin = "round";
        ctx.lineWidth= valeursXYwhR[4][0];//body
        ctx.strokeRect(valeursXYwhR[0][0]+( valeursXYwhR[4][0]/2),
        valeursXYwhR[1][0]+( valeursXYwhR[4][0]/2),
        valeursXYwhR[2][0]-valeursXYwhR[4][0],
        valeursXYwhR[3][0]-valeursXYwhR[4][0]);
        ctx.fillRect(valeursXYwhR[0][0]+( valeursXYwhR[4][0]/2),
        valeursXYwhR[1][0]+( valeursXYwhR[4][0]/2),
        valeursXYwhR[2][0]-valeursXYwhR[4][0],
        valeursXYwhR[3][0]-valeursXYwhR[4][0]);
        ctx.strokeRect(valeursXYwhR[0][1]+( valeursXYwhR[4][1]/2),//combine
        valeursXYwhR[1][1]+( valeursXYwhR[4][1]/2),
        valeursXYwhR[2][1]-valeursXYwhR[4][1],
        valeursXYwhR[3][1]-valeursXYwhR[4][1]);
        ctx.fillRect(valeursXYwhR[0][1]+( valeursXYwhR[4][1]/2),
        valeursXYwhR[1][1]+( valeursXYwhR[4][1]/2),
        valeursXYwhR[2][1]-valeursXYwhR[4][1],
        valeursXYwhR[3][1]-valeursXYwhR[4][1]);
    
    };

    var perspective = new Lignes(xyLign[5][0], xyLign[5][1],xyLign[5][2],xyLign[5][3], 1, "grey");
    var perspective2 = new Lignes(xyLign[6][0], xyLign[6][1],xyLign[6][2],xyLign[6][3]);



// choix utilisateur sur canvas premier plan (fg)
 
var versLeCarreQuiBouge = function() {
    document.getElementById("suite").style.display = "block";
};
    


    
}); // fin de l'EL dom content loaded et du script