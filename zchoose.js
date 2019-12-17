// Constructeur des personnages
class Character {
    constructor(nom, bg) {
        this.nom = nom;
        this.bg = "./IMAGES/" + bg + ".png";
    }
}

//Création des objets personnage
var nala = new Character("Nala", "nala");
var simba = new Character("Simba", "simba");
var scar = new Character("Scar", "scar");
var mufassa = new Character("Mufassa", "mufassa");
var timon = new Character("Timon", "timon");
var pumba = new Character("Pumba", "pumba");
// Tableau contenant les objets
var stockChara = [nala, simba, scar];

// Défilement des personnages
// On définit d'abord ce qu'affiche l'image du personnage
charObj = 0;
var elImg = document.getElementById("imgAvatar");
elImg.src = stockChara[charObj].bg;
var fleG = document.getElementById("fleG");
var fleD = document.getElementById("fleD");

// // Défiler vers la gauche
// function characterMinus(){
//     if(charObj == 0){
//     } else{
//     charObj--;
//     elImg.src = stockChara[charObj].bg;
//     document.getElementById("nameCharac").innerHTML = stockChara[charObj].nom;
//     }
// }
// fleG.addEventListener("click", characterMinus,false);
// // Défiler vers la droite
// function characterPlus(){
//     if(charObj == stockChara.length){
//     } else {
//     charObj++;
//     elImg.src = stockChara[charObj].bg;
//     document.getElementById("nameCharac").innerHTML = stockChara[charObj].nom;
//     }
// }
// // On associe le click de la souris avec les fonctions de défilement
// fleD.addEventListener("click", characterPlus);



var imgLeftKeyframe = new KeyframeEffect(
    elImg,
    [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(0%)' }
    ],
    { duration: 300 }
);
var imgGoesLeftAnimation = new Animation(imgLeftKeyframe, document.timeline);
fleG.addEventListener("click", leftHeGoes, false);

function leftHeGoes(event) {
    if (charObj == 0) { console.log("T NUL") }
    else {
        charObj--;
        elImg.src = stockChara[charObj].bg;
        document.getElementById("nameCharac").innerHTML = stockChara[charObj].nom;
        imgGoesLeftAnimation.play();
    }
}

var imgRightKeyframe = new KeyframeEffect(
    elImg,
    [
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(0%)' }
    ],
    { duration: 300 }
);
var imgGoesRightAnimation = new Animation(imgRightKeyframe, document.timeline);
fleD.addEventListener("click", rightHeGoes, false);

function rightHeGoes(event) {
    if (charObj == 2) { }
    else {
        charObj++;
        elImg.src = stockChara[charObj].bg;
        document.getElementById("nameCharac").innerHTML = stockChara[charObj].nom;
        imgGoesRightAnimation.play();
    }
}


// Création du bloc de droite affichant les joueurs 
// Déclaration de fausse variable TEMPORAIRE
nbP = 3;
nbJ = 2;

// Ajout dynamique de contenu en fonctionn du nombre de place et du nombre de joueurs
function createPlayer() {
    var el = document.getElementById("targetPlace");
    // Il faut prendre une variable différente du nombre de place pour i, sans ça la variable nbP décroitra en même temps que i croitras
    var trois = nbP;
    for (i = 0; i <= trois; i++) {
        var creaPlace = document.createElement('div');
        // Joueurs
        if (nbJ <= nbP && nbJ > 0 && nbP > 0) {
            creaPlace.style = "width:100px; height:50px; background-color: blue; border:solid black 1px";
            var playerText = document.createTextNode('Joueur '+i);
            creaPlace.appendChild(playerText);
            nbP--;
            nbJ--;
        }
        // IA  
        else if (nbJ == 0 && nbP > 0) {
            nbB = trois - i;
            creaPlace.style = "width:100px; height:50px; background-color: grey; border:solid black 1px";
            var playerText = document.createTextNode('Intelligence artificielle '+nbB);
            creaPlace.appendChild(playerText);
            nbP--;
        } 
        // Eventuelles erreurs
        else {}
        el.appendChild(creaPlace);
    }
}




// for (var i = 0; i < 3; i++) {

//     var avatar = document.getElementById("avatar");

//     var charai = document.createElement("div");
//     console.log(stockChara[i].nom);
//     charai.id = stockChara[i].nom;
//     charai.style = "background : url(" + stockChara[i].bg + ") center no-repeat; background-size:cover; width:100px; height:100px;";

//     var charaName = document.createTextNode(stockChara[i].nom);
//     charai.appendChild(charaName);
//     avatar.appendChild(charai);

//     // document.getElementById("avatar").innerHTML =+ stockChara[0].nom;
//     // document.getElementById("avatar").innerHTML =+ '<div style="width:100px; heigh:100px;" id="perso'+i+'"></div>';
//     // document.getElementById("perso"+i).background = stockChara[i].bg;
//     // document.getElementById("perso"+i).innerHTML = stockChara[i].nom;
// }
