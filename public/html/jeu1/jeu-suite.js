
'use strict';

window.addEventListener('DOMContentLoaded', function () {
var success = 0;   
var scoreJeu = [0,0,0,0,0,0,0,0,0,0];


    //Les morceaux du puzzle
var enseigne = document.getElementById("enseigne");
var tableau1 = document.getElementById("tableau1");
var tableau2 = document.getElementById("tableau2");
var tableau3 = document.getElementById("tableau3");
var tableau4 = document.getElementById("tableau4");
var logo1 = document.getElementById("logo1");
var logo2 = document.getElementById("logo2");
var logo3 = document.getElementById("logo3");
var logo4 = document.getElementById("logo4");
var logo5 = document.getElementById("logo5");
var score = document.getElementById("resultat");
score.innerHTML = success;
//Leurs endroits supposés
var xyCib = {
    ens : [108,10],
    t1: [154,87],
    t2: [286,87],
    t3: [566,87],
    t4: [727,87],
    l1: [432,87],
    l2: [432,118],
    l3: [432,150],
    l4: [432,183],
    l5: [432,218]
};

//Rendre les divs avec les tableaux amovibles (mouse drag)
dragElement(enseigne,xyCib.ens);
dragElement(tableau1, xyCib.t1);
dragElement(tableau2,xyCib.t2);
dragElement(tableau3, xyCib.t3);
dragElement(tableau4, xyCib.t4);
dragElement(logo1, xyCib.l1);
dragElement(logo2, xyCib.l2);
dragElement(logo3, xyCib.l3);
dragElement(logo4, xyCib.l4);
dragElement(logo5, xyCib.l5);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
 
//Mouse down est la première condition: des evenements ne peuvent se passer que si la touche de la souris est appuyée
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // position de la souris au debut  :
    pos3 = e.clientX;
    pos4 = e.clientY;
    // souris lachée: fin de l'evenement
    document.onmouseup = closeDragElement;
    // souris bouge: on tire l'element
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // position courante de la souris:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // La position de l'élément change:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
 
    //Si un morceaux du puzzle s'approche du cible, il change et se place au bon endroit

    if (parseFloat(enseigne.style.top) <= (xyCib.ens[1] +4) && parseFloat(enseigne.style.top) >= (xyCib.ens[1] -4) && parseFloat(enseigne.style.left) <= (xyCib.ens[0] +4)&& parseFloat(enseigne.style.left) >= (xyCib.ens[1] -4)){
        enseigne.style.backgroundColor = "#A90101";
        enseigne.innerHTML = "La Grande Galerie - Retrospective du combat !";
        enseigne.style.fontStretch = "2.2rem";
        enseigne.style.color = "white";
        enseigne.style.fontSize = "2.2rem";
        enseigne.style.left = xyCib.ens[0] + "px";
        enseigne.style.top = xyCib.ens[1] + "px";
        scoreJeu[0]=1;
        score.innerHTML = success;
        //console.log(scoreJeu[0]);
    }  
    
    if (parseFloat(tableau1.style.top) <= (xyCib.t1[1] +4) && parseFloat(tableau1.style.top) >= (xyCib.t1[1] -4) && parseFloat(tableau1.style.left) <= (xyCib.t1[0] +4)&& parseFloat(tableau1.style.left) >= (xyCib.t1[1] -4)){
        tableau1.style.backgroundImage = "url('./tab1.jpg')";
        tableau1.style.backgroundSize = "cover";
        tableau1.style.left = xyCib.t1[0] + "px";
        tableau1.style.top = xyCib.t1[1] + "px";
        tableau1.style.backgroundColor = "#A90101";
        scoreJeu[1]=1;
        score.innerHTML = success;
    }
    if (parseFloat(tableau2.style.top) <= (xyCib.t2[1] +4) && parseFloat(tableau2.style.top) >= (xyCib.t2[1] -4) && parseFloat(tableau2.style.left) <= (xyCib.t2[0] +4)&& parseFloat(tableau2.style.left) >= (xyCib.t2[1] -4)){
        tableau2.style.backgroundImage = "url('./tab2.gif')";
        tableau2.style.backgroundSize = "cover";
        tableau2.style.left = xyCib.t2[0] + "px";
        tableau2.style.top = xyCib.t2[1] + "px";
        tableau2.style.backgroundColor = "#A90101";
        scoreJeu[2]=1;
        score.innerHTML = success;
    }
    if (parseFloat(tableau3.style.top) <= (xyCib.t3[1] +4) && parseFloat(tableau3.style.top) >= (xyCib.t3[1] -4) && parseFloat(tableau3.style.left) <= (xyCib.t3[0] +4)&& parseFloat(tableau3.style.left) >= (xyCib.t3[1] -4)){
        tableau3.style.backgroundImage = "url('./tab3.jpg')";
        tableau3.style.backgroundSize = "cover";
        tableau3.style.left = xyCib.t3[0] + "px";
        tableau3.style.top = xyCib.t3[1] + "px";
        tableau3.style.backgroundColor = "#A90101";
        scoreJeu[3]=1;
        score.innerHTML = success;
    }

    if (parseFloat(tableau4.style.top) <= (xyCib.t4[1] +4) && parseFloat(tableau4.style.top) >= (xyCib.t4[1] -4) && parseFloat(tableau4.style.left) <= (xyCib.t4[0] +4)&& parseFloat(tableau4.style.left) >= (xyCib.t4[1] -4)){
        tableau4.style.backgroundImage = "url('./tab4.jpg')";
        tableau4.style.backgroundSize = "cover";
        tableau4.style.left = xyCib.t4[0] + "px";
        tableau4.style.top = xyCib.t4[1] + "px";
        tableau4.style.backgroundColor = "#A90101";
        scoreJeu[4]=1;
        score.innerHTML = success;
    }
    if (parseFloat(logo1.style.top) <= (xyCib.l1[1] +4) && parseFloat(logo1.style.top) >= (xyCib.l1[1] -4) && parseFloat(logo1.style.left) <= (xyCib.l1[0] +4)&& parseFloat(logo1.style.left) >= (xyCib.l1[1] -4)){
        logo1.style.backgroundImage = "url('./logo1.png')";
        logo1.style.backgroundSize = "cover";
        logo1.style.left = xyCib.l1[0] + "px";
        logo1.style.top = xyCib.l1[1] + "px";
        logo1.style.backgroundColor = "#A90101";
        scoreJeu[5]=1;
        score.innerHTML = success;
    }
    if (parseFloat(logo2.style.top) <= (xyCib.l2[1] +4) && parseFloat(logo2.style.top) >= (xyCib.l2[1] -4) && parseFloat(logo2.style.left) <= (xyCib.l2[0] +4)&& parseFloat(logo2.style.left) >= (xyCib.l2[1] -4)){
        logo2.style.backgroundImage = "url('./logo2.png')";
        logo2.style.backgroundSize = "cover";
        logo2.style.left = xyCib.l2[0] + "px";
        logo2.style.top = xyCib.l2[1] + "px";
        logo2.style.backgroundColor = "#A90101";
        scoreJeu[6]=1;
        score.innerHTML = success;
    }
    if (parseFloat(logo3.style.top) <= (xyCib.l3[1] +4) && parseFloat(logo3.style.top) >= (xyCib.l3[1] -4) && parseFloat(logo3.style.left) <= (xyCib.l3[0] +4)&& parseFloat(logo3.style.left) >= (xyCib.l3[1] -4)){
        logo3.style.backgroundImage = "url('./logo3.png')";
        logo3.style.backgroundSize = "cover";
        logo3.style.left = xyCib.l3[0] + "px";
        logo3.style.top = xyCib.l3[1] + "px";
        logo3.style.backgroundColor = "#A90101";
        scoreJeu[7]=1;
        score.innerHTML = success;
    }
    if (parseFloat(logo4.style.top) <= (xyCib.l4[1] +4) && parseFloat(logo4.style.top) >= (xyCib.l4[1] -4) && parseFloat(logo4.style.left) <= (xyCib.l4[0] +4)&& parseFloat(logo4.style.left) >= (xyCib.l4[1] -4)){
        logo4.style.backgroundImage = "url('./logo4.png')";
        logo4.style.backgroundSize = "cover";
        logo4.style.left = xyCib.l4[0] + "px";
        logo4.style.top = xyCib.l4[1] + "px";
        logo4.style.backgroundColor = "#A90101";
        scoreJeu[8]=1;
        score.innerHTML = success;
    }
    if (parseFloat(logo5.style.top) <= (xyCib.l5[1] +4) && parseFloat(logo5.style.top) >= (xyCib.l5[1] -4) && parseFloat(logo5.style.left) <= (xyCib.l5[0] +4)&& parseFloat(logo5.style.left) >= (xyCib.l5[1] -4)){
        logo5.style.backgroundImage = "url('./logo5.png')";
        logo5.style.backgroundSize = "cover";
        logo5.style.left = xyCib.l5[0] + "px";
        logo5.style.top = xyCib.l5[1] + "px";
        logo5.style.backgroundColor = "#A90101";
        scoreJeu[9]=1;
        score.innerHTML = success;
    }
    success = scoreJeu[0] + scoreJeu[1] + scoreJeu[2] +scoreJeu[3] + scoreJeu[4] + scoreJeu[5] + scoreJeu[6] + scoreJeu[7] + scoreJeu[8] + scoreJeu[9];
    score.innerHTML = success;
    if (success === 10){
    document.getElementById("ok").style.display = "block";
    document.getElementById("raccourci").style.display = "none";
    }
  }

  function closeDragElement() {
    //arrêt du movement en relachant le bouton de la souris
    document.onmouseup = null;
    document.onmousemove = null;
  }

  
}





}); // fin de l'EL dom content loaded et du script