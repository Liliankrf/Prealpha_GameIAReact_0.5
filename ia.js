// On donne une valeur a x par défaut pour le navigateur
x = 0;
// 
p1 = 0;
p2 = 0;
p3 = 1;
p4 = 1;
players = [0, 0, 1, 1]
tabComp = [];

var drCa = document.getElementById("drawCard");
var creaCard = document.createElement("div");
creaCard.style = "height:150px; width:100px;";
var tab = [];
var goal = document.getElementById("goal");

// Le croupier tire une carte
function dealer() {
    document.getElementById("clickCard").removeEventListener("click", valider);
    document.getElementById("clickCard").removeEventListener("click", dealer);
    console.log("ceci est l'objet + ")
    // Si le tableau contient 15 valeur, plus de carte à tirer
    if (tab.length == 15) {
    } else {
        // On remet le contenu a zéro pour que la valeur précédente n'apparaisse pas
        creaCard.innerHTML = '';
        // On génère un nombre de -5 à +10 (sans zéro) que le croupier va tirer
        x = Math.floor(Math.random() * (10 - (-5) + 1) - 5);
        // Si le nombre est déjà dans le tableau, on recommence l'opération
        if (x == 0) {
            dealer();
        } else {
            // si la carte tiré a déjà été tiré, on en tire une autre
            if (tab.includes(x)) {
                dealer();
            } else {
                // ajout de la carte
                if (x < 0) {
                    creaCard.innerHTML += "<p>" + x + "</p>";
                } else {
                    creaCard.innerHTML += "<p>+" + x + "</p>";
                }
                goal.appendChild(creaCard);
                // On ajoute la valeur obtenu au tableau
                tab.push(x);
                console.log(tab);
            }
        }

        // botPick(x, tabIa1);
        // botPick(x, tabIa2);
    }
console.log("Ceci est tabBots" +tabBots);
console.log("Ceci est tabComp" + tabComp);
}

// On associe la fonction dealer() avec l'evenement Click sur drCa (div id="drawCard")
document.getElementById("clickCard").addEventListener("click", dealer);
document.getElementById("clickCard").addEventListener("click", valider);



var flexPlace = document.getElementsByClassName("flexPlace");
flexValue = 0;

// Fonction permettant le défilement des joueurs 
function valider() {
    // Nombre d'élément du tableau classe = 4 (0 1 2 et 3), on doit donc recommencer l'opération
    if (flexValue > 3) {
        flexValue = 0;
        flexPlace[3].style = "display:none";
        valider();
    } else {
        flexPlace[flexValue].style = "display: flex;flex-direction: column; position: absolute;top: 750px;";
        if (flexValue > 0) {
            flexPlace[flexValue - 1].style = "display:none";
        }
        flexValue++;
    }
}
function playBot() {
    console.log("x = "+x+" tabia1 = "+tabIa1+" tabia2 = "+tabIa2);
    botPick(x, tabIa1);
    botPick(x, tabIa2);
}

// Comparaison des cartes tirés par les joueurs
function findMax(a, b, c, d) {
    if (a > b && a > c && a > d) {
        console.log("a wins");
        max = "Player one wins";
    } else if (b > a && b > c && b > d) {
        console.log("b wins");
        max = "Player two wins";
    } else if (c > a && c > b && c > d) {
        console.log("c wins");
        max = "Player three wins";
    } else if (d > a && d > b && d > c) {
        console.log("d wins");
        max = "Player four wins";
    } else {
        console.log("Draw");
        max = "Draw";
    }
}

// on vide le plateau
function delay() {
    picks[0].innerHTML = "";
    picks[1].innerHTML = "";
    picks[2].innerHTML = "";
    picks[3].innerHTML = "";
}
// nb player
nbP = 2;
// nb bot
nbB = 2;
var elClass = document.getElementsByClassName("place");


var picks = document.getElementsByClassName("test");


tabIa1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
tabIa2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
tabBots = [tabIa1, tabIa2];
z = 0;
// Création du paquet de carte
function generateCardPack() {
    for (y = 0; y <= 4; y++) {
        for (i = 0; i < 15; i++) {
            if (y < nbP) {
                console.log(y);
                var cardBackIa = document.createElement("div");
                cardBackIa.style = "width:100px; height:150px; border:solid red 2px; background-color: yellow";
                elClass[y].appendChild(cardBackIa);
                // picks[y].appendChild(creaCard);

            } else {
                var v = i + 1;
                // Génère l'élément CARTE
                var card = document.createElement("div");
                card.setAttribute("id", i + 1);
                // Genere le contenu de l'élément CARTE
                var str = document.createTextNode("+" + v);
                card.style = "width:100px; height:150px; border:solid red 2px; background : url('./IMAGES/cardface.png') no-repeat center; background-size:cover;";
                // Ajoute à l'élément CARTE un effet d'agrandissement
                card.onmouseover = function () {
                    this.style = "line-height:300px; width:200px; height:300px; border:solid red 2px; position:relative; top:-100px; background : url('./IMAGES/cardface.png') no-repeat center; background-size:cover;";
                    // Quand on clique sur la CARTE, on passe la main au suivant et on retire notre carte 
                    this.onclick = function () {
                        var trouze = this.id;
                        console.log(trouze);
                        valider();
                        console.log("z=" + z);
                        console.log("y=" + y);
                        // elClass[z].removeChild(this);
                        this.style = "display:none;";
                        console.log(this);
                        // elClass[z].removeChild(document.getElementById(9));
                        picks[z].appendChild(this);
                        tabComp.push(trouze);

                        if (tabComp.length == 4) {
                            // tabComp est un objet contenant des STRING il faut donc les passer en INT avec parseInt, en base 10
                            var a = parseInt(tabComp[0], 10);
                            var b = parseInt(tabComp[1], 10);
                            var c = parseInt(tabComp[2], 10);
                            var d = parseInt(tabComp[3], 10);

                            console.log(a, b, c, d);
                            // On compare les résultats pour savoir qui emporte la carte
                            findMax(a, b, c, d);
                            tabComp = [];

                            var resEl = document.getElementById("results");
                            resultat = document.createElement('div');
                            resultat.style = "border : solid white 2px; color:white;"
                            txt = document.createTextNode(max);

                            resultat.appendChild(txt);
                            resEl.appendChild(resultat);
                            // On vide le tapis après 1 seconde
                            setTimeout(function () {
                                delay();
                            }, 1000);
                            setTimeout(function () {
                                dealer();
                            }, 1000);
                        }
                        if (z < 3) {
                            z++;
                        }
                        // Si le dernier joueur passe la main, on rafraichit z pour qu'il repasse la main au premier,
                        // puis le croupier tire une autre carte
                        else {
                            z = 0;
                            setTimeout(function () {
                                dealer();
                            }, 1000);
                        }
                    }


                    // Si on quitte le HOVER, on remet a l'état précédent
                    this.onmouseleave = function () {
                        this.style = "width:100px; height:150px; border:solid red 2px; background : url('./IMAGES/cardface.png') no-repeat center; background-size:cover;";
                    }
                }
                console.log("Y vaut" + y);
                // on ajoute la valeur de la carte et la carte dans l'emplacement prévu à cet effet
                card.appendChild(str);
                elClass[y].appendChild(card);
            }
        }
    }
}


function botPick(valeurCroupier, tabIa) {
    var valC = valeurCroupier + 5;
    // // CAS -1 => -5 -
    // if(tabIa[valC] === 0 ){
    //     if( tabIa[valC + 1] == valC +2){
    //         var randSplice = Math.floor(Math.random() * (100 + 1));
    //         if (randSplice < 65) {
    //             tabIa.splice(valC, 1, "");
    //             tabComp.push(valC);
    //         } else if (randSplice >= 65) {
    //             tabIa.splice(valC - 1, 1, "");
    //             tabComp.push(valC -1);
    //         }
    //     }
    //     else if(tabIa[valC+1] == ""){
    //         tabIa.splice(valC, 1, "");
    //         tabComp.push(valC);
    //     }
    // }

    // // CAS ZER0 => +10 -

    // else if(tabIa[valC] === 14 ){
    //     if( tabIa[valC - 1] == valC ){
    //         var randSplice = Math.floor(Math.random() * (100 + 1));
    //         if (randSplice < 65) {
    //             tabIa.splice(valC, 1, "");
    //             tabComp.push(valC);
    //         } else if (randSplice >= 65) {
    //             tabIa.splice(valC - 1, 1, "");
    //             tabComp.push(valC -1);
    //         }
    //     }
    //     else if(tabIa[valC+1] == ""){
    //         tabIa.splice(valC, 1, "");
    //         tabComp.push(valC);
    //     }
    // }

    // CAS 1 => Les trois valeurs sont présente------------------------------------------------------------------------------------
    if (tabIa[valC] === (valC + 1) && tabIa[valC - 1] === (valC) && tabIa[valC + 1] === (valC + 2)) {
        var tabRand = [0, 0, 0, 0, -1, -1, 1, 1];
        // 50% optimal, 25% les autres
        var randSplice = Math.floor(Math.random() * (7 + 1));
        console.log("La valeur optimale est présente");
        tabIa.splice(valC + tabRand[randSplice], 1, "");
        tabComp.push(valC + tabRand[randSplice]);
    }

    // CAS 2 => Optimal est là, les deux autres sont pas là ---------------------------------------------------------------------
    else if (tabIa[valC] === (valC + 1) && tabIa[valC - 1] === "" && tabIa[valC + 1] === "") {
        // 100% optimal
        tabIa.splice(valC, 1, "");
        tabComp.push(valC);
        console.log("Optimal est là, les deux autres sont pas là");
    }


    // CAS 3 => Optimal est là, + ou - est pas là --> IF + pas là ou IF - pas là -------------------------------------------------
    else if (tabIa[valC] === (valC + 1) && (tabIa[valC - 1] === "" || tabIa[valC + 1] === "")) {
        // 65% 35 math.random 0 à 100 si <65 choix 1 sinno choix 2; 
        if (tabIa[valC - 1] === "") {
            var tabRand = [-1, -1, -1, -1, 0];
            var randSplice = Math.floor(Math.random() * (100 + 1));
            // 100 ou 0 zéro 
            if (randSplice < 65) {
                tabIa.splice(valC, 1, "");
                tabComp.push(valC);
            } else if (randSplice >= 65) {
                tabIa.splice(valC - 1, 1, "");
                tabComp.push(valC -1);
            }
        }
        else if (tabIa[valC + 1] === "") {
            var tabRand = [-1, -1, -1, -1, 0];
            var randSplice = Math.floor(Math.random() * (100 + 1));
            // 100 ou 0 zéro 
            if (randSplice < 65) {
                tabIa.splice(valC, 1, "");
                tabComp.push(valC);
            } else if (randSplice >= 65) {
                tabIa.splice(valC + 1, 1, "");
                tabComp.push(valC +1);
            }
            console.log("Optimal est là, + ou - est pas là --> IF + pas là ou IF - pas là")
        }
    }
    // CAS 4 => Optimal est pas là, les deux autres sont là ------------------------------------------------------------------------------------
    else if (tabIa[valC] === "" && tabIa[valC - 1] === (valC) && tabIa[valC + 1] === (valC + 2)) {
        //50 / 50
        var tabRand = [-1, 1];
        var randSplice = Math.floor(Math.random() * (1 + 1));
        console.log("Optimal est pas là, les deux autres sont là");
        tabIa.splice(valC + tabRand[randSplice], 1, "");
        tabComp.push(valC + tabRand[randSplice]);
    }
    // CAS 5 => Optimal pas là, les deux autres pas là------------------------------------------------------------------------------------
    else if (tabIa[valC] === "" && tabIa[valC - 1] === "" && tabIa[valC + 1] === "") {
        // aléatoire sur ce qu'il reste 
        var aleatoire = function () {
            aleatoire = Math.floor(Math.random() * (14 + 1));
            if (tabIa[aleatoire] == "") {
                aleatoire();
            } else {
                tabIa.splice(aleatoire, 1, "");
                tabComp.push(aleatoire);
            }
        }
        console.log("Optimal pas là, les deux autres pas là")
    }
    // CAS 6 => Optimal pas là, une des deux autres pas là --> IF + pas là ou IF - pas là------------------------------------------------------------------------------------
    else if (tabIa[valC] === "" && (tabIa[valC - 1] === "" || tabIa[valC + 1] === "")) {
        // soit 100% , soit 80% et 20% aléatoire
        if (tabIa[valC - 1] === "") {
            var tabRand = [-1, -1, -1, -1, 0];
            var randSplice = Math.floor(Math.random() * (4 + 1));
            // -1 ou 0 zéro correspond à un aléatoire
            if (randSplice == -1) {
                tabIa.splice(valC + randSplice, 1, "");
                tabComp.push(valC + randSplice);
            } else if (randSplice == 0) {
                var randomInArray = function () {
                    randomInArray = Math.floor(Math.random() * (14 + 1));
                    if (tabIa[randomInArray] == "") {
                        randomInArray();
                    } else {
                        tabIa.splice(randomInArray, 1, "")
                        tabComp.push(randomInArray);
                    }
                }
            }
        } else if (tabIa[valC + 1] === "") {
            var tabRand = [1, 1, 1, 1, 0];
            var randSplice = Math.floor(Math.random() * (4 + 1));
            if (randSplice == 1) {
                tabIa.splice(valC + randSplice, 1, "");
                tabComp.push(valC + randSplice);
            } else if (randSplice == 0) {
                var randomInArray = function () {
                    randomInArray = Math.floor(Math.random() * (14 + 1));
                    if (tabIa[randomInArray] == "") {
                        randomInArray();
                    } else {
                        tabIa.splice(randomInArray, 1, "")
                        tabComp.push(randomInArray);
                    }
                }
            }
        }
        console.log("Optimal pas là, une des deux autres pas là ")
    } else {
        console.log("Tout n'est pas perdu, voici valC "+valC+" et "+tabIa[val]);
        
    }
    console.log(tabIa);
    // tabComp.push("ESSAYEMENT");
    
}



function pushIa(param){
    tabComp.push(param);
}