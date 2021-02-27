let showPB = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePB = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__content");
let nameInput = document.querySelector("#popup__name");
let jobInput = document.querySelector("#popup__profession");
let profileTitle = document.querySelector(".profile__title");
let profileKind = document.querySelector(".profile__kind-of-activity");

showPB.addEventListener("click",togglePopup);
closePB.addEventListener("click",togglePopup);
popup.addEventListener("click",togglePopup);

formElement.addEventListener("click",function (event){ 
    event.stopPropagation(); // останавливает распространиение события клика на родителей элемента  
});

formElement.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(event){
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileKind.textContent = jobInput.value; 
    togglePopup();  
};

function togglePopup(event){
    //event.preventDefault();
    if(!popup.classList.contains('popup_open')){
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileKind.textContent;
    }

    popup.classList.toggle('popup_open'); 
};