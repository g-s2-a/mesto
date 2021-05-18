
// открывает любой попап
export function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener("keydown", haftEscapeKey);
}

export function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener("keydown", haftEscapeKey);
}

function haftEscapeKey(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector('.popup_open'));
  }
}
