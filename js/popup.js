let showPopupButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__content");
let nameInput = document.querySelector("#popup__name");
let jobInput = document.querySelector("#popup__profession");
let profileTitle = document.querySelector(".profile__title");
let profileKind = document.querySelector(".profile__kind-of-activity");

function formSubmitHandler(event){
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileKind.textContent = jobInput.value;
    togglePopup();
};

function togglePopup(event){
    if(!popup.classList.contains('popup_open')){
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileKind.textContent;
    }
    popup.classList.toggle('popup_open');
};

showPopupButton.addEventListener("click",togglePopup);
closePopupButton.addEventListener("click",togglePopup);
formElement.addEventListener("submit", formSubmitHandler);

