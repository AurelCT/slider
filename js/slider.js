'use strict';

//Variables globales
let index;
let slides;
let startInterval; 
/**
 * SLIDER - GRETAWEB Groupe 8
 *  
 *  1 - Récupérer une collection des éléments à faire défiler (dans une variable slides) dans un tableau 
 *  2 - Stocker l'index correspondant à la première slide (index = 0)
 *  3 - Installer un gestionnaire d'événements sur les liens de navigation (prev, next) permettant au click d'éxécuter les fonctions :
 *      onClickNext() : index++
 *      onClickPrev() : index--
 *      
 *      Le slider est circulaire : si l'index ne correspond pas à un indice existant, il sera redéfini afin de repartir du début (si on avance) ou de la fin (si on recule)  
 * 
 *  4 - Les fonctions respectives doivent exécuter une fonction changeSlide() permettant de modifier la classe is-active appliquée au slide visible : 
 *      -> masquer le slide affiché (supprimer la classe is-active)
 *      -> rendre visible le slide correpondant à l'index en cours (ajouter le classe is-active) 
 *     
 */
/**
 * changeSlide()
 * Permet de faire bonne figure
*/
//enlever la classse is hiden à l'index et cibler celle qui ne l'a pas. selecteur : 'not'
function changeSlide() {

    document.querySelector('.slider .is-active').classList.remove('is-active');
    slides[index].classList.add('is-active');
    let paginationList = document.querySelectorAll('.sliderButton');  
    document.querySelector('.sliderButton.focusList').classList.remove('focusList');
    paginationList[index].classList.add('focusList');
    
}

/**
 * onClickNext()
 * Ecouteur d'évenement 
 * Permet d'avancer d'1 slide
*/
function onClickNext() {
    index++;
    if (index === slides.length) {
        index = 0;
    } 
    changeSlide(); 
}


/**
 * onClickPrev()
 * Ecouteur d'évenement
 * Permet de reculer d'1 slide
*/
function onClickPrev() {
    if (index === 0) {
        index = slides.length - 1;
    } else {
        index--;
    }
    changeSlide();
}


/**
 * création du bouton qu'on insère après nos slider-nav, mis en place du gestionaire d'évènement.
 */
function makeSlideShowButton(){
    let button = document.createElement('button');
    let findButtonPlace = document.querySelector('.slider-nav');
    findButtonPlace.appendChild(button);
    button.innerHTML="play";
    button.dataset.animation = '';
    button.addEventListener('click',onClickSlideShowVero);
}

/**
 * 1 . Créer une fonction makeSlideShowButton() qui insere une balise button à la suite des éléments du slider et qui installe un gestionnaire d'événement sur le bouton 
2.  Créer la fonction OnClickSlideShow()
 */
/**
 * mis en place d'un set interval qui appel la fonction onclickNext
 */
//  function onClickSlideShow(){
//      document.querySelector('button').innerHTML = "stop";
//     if(!startInterval){
//     startInterval = setInterval(onClickNext, 2000);
//     }
//     else {
//      clearInterval(startInterval);
//      startInterval = null;
//      document.querySelector('button').innerHTML = "start";
//     }

// }

//la même fonction mais VeroStyle avec son dataset;
function onClickSlideShowVero(){
    if(this.dataset.animation.length > 0){
        clearInterval(this.dataset.animation);
        this.dataset.animation = "";
        this.textContent = 'play';
        return false;
    }
    this.dataset.animation = setInterval(onClickNext,2000);
    this.textContent = 'stop';
}


/**
 * Permet de créer les boutons (à travers des li) de pagination
 */
function pagination(){
    let ol = document.querySelector('ol');
    
    for (let i = 0; i < slides.length; i++) {     
        let paginationItem = document.createElement('li');
        paginationItem.className = "sliderButton"
        paginationItem.dataset.id= i +1  ; 
        ol.append(paginationItem);
        paginationItem.addEventListener('click',onClickPagination);
        paginationItem.addEventListener('mouseover', paginationHover);
        paginationItem.addEventListener('mouseout', paginationHoverOut);
    }
    //initialise une classe focusList au premier Li
    ol.firstElementChild.classList.add('focusList');
}

function paginationHover(){
    this.innerHTML = this.dataset.id;
}
function paginationHoverOut(){
    this.innerHTML = '';
}

function onkeyEvent(e){
    switch (e.key) {
        case 'ArrowLeft':
            onClickPrev();
            break;
        case 'ArrowRight':
            onClickNext();
        default:
            break;
    }
}
document.addEventListener('keydown', onkeyEvent);
// document.addEventListener('keyup', onkeyEvent);
/**
 * changement de slide par rapport à un bouton, l'id du data set devenant l'index du slide
 */
 function onClickPagination(){  
    let dataslide = this.dataset.id;
    index = --dataslide ;
    changeSlide();
}

//UNE FOIS LE DOM CHARGE EXECUTION DU CODE
document.addEventListener('DOMContentLoaded',function(){
        //Stocker l'index de la figure visible (au départ, c'est 0)
    index = 0;
    //Récupérer un tableau des figures;
    slides = document.getElementsByClassName('slider-figure')
    //On récupère le total des slides
    //Installer un gestionaire d'évènements sur chaque lien 
    let next = document.querySelector('.slider-nav [rel="next"]');
    let previous  = document.querySelector('.slider-nav [rel="prev"]');

    // previous.addEventListener('click', onClickPrev);
    previous.addEventListener('click',function(e){
        e.preventDefault();
        onClickPrev();
    } )
    // next.addEventListener('click',onClickPrev);
    // façon fonction anonyme pour empêcher le navigateur de suivre le lien
    next.addEventListener('click',function(e){
        e.preventDefault();
        onClickNext();
    } )
    pagination();
    makeSlideShowButton();
});

