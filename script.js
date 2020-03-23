//on commence par créer nos variables;
let nbrUn = "";
let nbrDeux = "";
let operator = "";

//la fonction suivante est une fonction auto appelée une fois que le document est pret, c'est là qu'on met le code à executer
(function () {
    generateTouchClick()
})();

/**
 * cette fonction va ajouter des écouteurs d'evenements à nos elements html
 */
function generateTouchClick() {

    // on commence par les touches 0-9
    const nombres = document.getElementsByClassName('touch_nbr'); // on les récupere dans un objet de type tableau

    for(let nbr of nombres) { // on parcours l'objet à l'aide d'un for...of
        nbr.addEventListener('click', () => { // et pour chaque elements, on ajoute un eventListener (ecouteur d'évenement), ici c'est a l'évenement click : https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener
            if(operator.length === 0) { // si operator est vide (il n'y a pas de typage en Js mais on décide que ce sera une string, on peut donc vérifier sa longueur si elle est à 0, la string est vide)
                nbrUn += nbr.textContent; // on ajoute la valeur du text de l'element dans notre variable nbrUn (+= veut dire nbrUn = nbrUn + nbr.textContent)
                nbrUn = formatNbr(nbrUn); // on formate nbrUn, voir plus bas
                document.getElementById('result').innerHTML = nbrUn // et on affiche nbrUn dans <p id="result"></p>
            } else { // sinon idem pour nbrDeux, sauf qu'on affiche nbrUn + operator + nbrDeux
                nbrDeux += nbr.textContent;
                nbrDeux = formatNbr(nbrDeux);
                document.getElementById('result').innerHTML = nbrUn + operator + nbrDeux
            }
        })
    }

    //on passe ensuite a nos opérateurs
    const operators = document.getElementsByClassName('touch_operator'); // on les récupère de la même manière mais dans une autre variable

    for(let op of operators) { // on les parcours
        op.addEventListener('click', () => { // on leur ajoute un écouteur d'evenement
            if(nbrDeux.length === 0 && nbrUn.length > 0) { // si nbrDeux est vie et nbrUn n'est pas vide
                operator = op.textContent // operator prends la valeur du text de l'element
                document.getElementById('result').innerHTML = nbrUn + operator // et on affiche nbrUn + operator
            } else if(nbrDeux.length > 0) { // sinon si nbrDeux n'est pas vide
                const result = calcul(); // on procede au calcul (voir plus bas)
                document.getElementById('result').innerHTML = result // on l'affiche
                nbrUn = "" + result; // nbrUn prend la valeur du resultat
                nbrDeux = ""; // on vide nbrDeux pour pouvoir recommencer
                operator = op.textContent; // operator prends la valeur du text de l'element
                document.getElementById('result').innerHTML = nbrUn + operator // et on affiche nbrUn + operator
            }
        })
    }

    // on passe a notre touche +/-
    document.getElementById('plus_moins').addEventListener('click', () => { // on ajoute un écouteur d'evenement
        if(operator.length === 0) { // si operator est vide
            nbrUn = plusMoins(nbrUn) //on format nbrUn en y ajoutant un moins ou en l'enlevant
            document.getElementById('result').innerHTML = nbrUn // on affiche nbrUn
        } else { // sinon idem pour nbrDeux, sauf qu'on affiche nbrUn + operator + nbrDeux
            nbrDeux = plusMoins(nbrDeux)
            document.getElementById('result').innerHTML = nbrUn + operator + nbrDeux
        }
    })

    // ensuite notre touche virgule
    document.getElementById('virgule').addEventListener('click', () => { // on ajoute un écouteur d'evenement
        if(operator.length === 0) { // si operator est vide
            nbrUn = virgule(nbrUn) //on format nbrUn en y ajoutant un point
            document.getElementById('result').innerHTML = nbrUn // on affiche nbrUn
        } else { // sinon idem pour nbrDeux, sauf qu'on affiche nbrUn + operator + nbrDeux
            nbrDeux = virgule(nbrDeux)
            document.getElementById('result').innerHTML = nbrUn + operator + nbrDeux
        }
    })

    // notre touche reset "C"
    document.getElementById('reset').addEventListener('click', () => { // on ajoute un écouteur d'evenement
        nbrUn = nbrDeux = operator = ""; // on vide toutes nos string
        document.getElementById('result').innerHTML = '0' // on affiche 0
    })

    // et enfin notre touche =
    document.getElementById('egal').addEventListener('click', () => { // on ajoute un écouteur d'evenement
        if(nbrUn.length > 0 && operator.length > 0 && nbrDeux.length > 0) { // si nbrUn et operator et nbrDeux ne sont pas vides
            const result = calcul() // on procede au calcul
            document.getElementById('result').innerHTML = result //on l'affiche
            nbrUn = "" + result; // nbrUn prend la valeur du resultat
            nbrDeux = operator = ""; // on vide nbr2 et operator on peut donc continuer à calculer a partir du résultat
        }
    })
}
// pour les 3 prochaines fonctions, j'ai choisis de les faires avec différentes syntaxes, je vais vous expliquer:

/**
 * fonction qui va formater le nombre en enlevant le 0 si il est en premiere position et qu'il n'y a pas de virgule après.
 * @param nbr
 * @returns {any}
 */
function formatNbr(nbr) {
    // ici, j'utilise l'opérateur ternaire, voici sa syntaxe: condition ? valeurSiTrue : valeurSiFalse;
    return (nbr.length > 1 && nbr[0] === '0' && nbr[1] !== '.') ? nbr.substr(1) : nbr;
    //                 condition                                  valeurSiTrue          valeurSiFalse
}

/**
 * fonction qui va supprimer le - si il existe, l'ajouter si il n'existe pas, ou retourner 0 si la string est vide
 * @param nbr
 * @returns {string}
 */
function plusMoins(nbr) {
    // ici j'utilise un if normal, sauf que, comme je n'ai qu'une ligne dans mon if, je peux la mettre sur la même ligne sans les brakets ({})
    if(nbr[0] === '-') return nbr.substr(1);

    // là c'est pareil, sauf que je suis aller à la ligne mais comme je n'ai qu'une ligne, je peux me passer des brakets
    if(nbr.length > 0 && nbr[0] !== '0')
        return '-' + nbr;

    // a noter le manque de else... on peux croire a une erreur et se dire que notre fonction retournera toujours 0
    // mais non, quand on utilise return dans un if, pas besoin de else, car return va sortir de la fonction avec la valeur qu'on lui a donné.
    return '0';
}

/**
 * fonction qui va ajouter un point si il n'y en a pas deja 1
 * si le premier caractere est un 0 et le second un point, elle va retourner 0.
 * si la string est vide (on a directement cliqué sur .) elle renvoi 0.
 * @param nbr
 * @returns {string|*}
 */
function virgule(nbr) {
    //ici j'ai utilisé des if basiques
    if(nbr[0] === '0' && nbr[1] === '.') {
        return nbr;
    }
    if(nbr.length === 0) {
        return '0.';
    }
    if(nbr.indexOf('.') !== -1) {
        return nbr;
    }
    return nbr + '.';
}

/**
 * fonction qui va effectuer le calcul suivant l'opérateur choisi
 * @returns {number|string}
 */
function calcul() {
    let result;

    // je passe par un switch, en fait c'est comme un if...else if, mais sa syntaxe est plus simple a écrire, surtout qu'on on a beaucoup de cas différents
    // attention, le switch marche que si les conditions sont sur la même variable : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/switch
    switch (operator) { // ouverture du switch auquel on passe l variable sur laquelle on fera les vérifications, ici operator
        case '+': // la valeur attendue
            result = +nbrUn + +nbrDeux; // le code à exécuter, vous remarquerez les + collés a mes variables... c'est un petit truc en js pour passer d'une string a un number
            break; // surtout ne pas oublier le break, sinon le switch continue et passe dans les autres case
        case '-':
            result = +nbrUn - +nbrDeux;
            break;
        case 'x':
            result = +nbrUn * +nbrDeux;
            break;
        case '/':
            if (+nbrDeux === 0) { // pour la division, je vérifie que nbrDeux n'est pas égale à 0 (sa valeur, pas sa taille, attention) et, si c'est le cas j'affiche error (sinon ca affiche infinity et c'est moche ^^)
                result = "erreur";
            } else { // sinon je procede à ma division
                result = +nbrUn / +nbrDeux;
            }
            break;
        default: // on termine par default pour dire au programme quoi faire si la valeur d'operator ne correspond à aucun des cas
            result = "erreur";
            // pas besoin de break ici, on est à la fin du switch
    }

    return result;
}