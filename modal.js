// Selecting elements
const popup = document.getElementsByClassName('js-popup')[0];
const popupContent = document.getElementsByClassName('js-popupContent')[0];
const btnsOpen = document.getElementsByClassName('js-btnRules');
const btnsClose = document.getElementsByClassName('js-closeBtn');

// Open popup
const openPopup = () => {
    popup.classList.add('is-active');
    setTimeout(() => {
        popupContent.classList.add('is-visible');
    }, 300);
};

// Close popup
const closePopup = () => {
    popup.classList.remove('is-active');
    popupContent.classList.remove('is-visible');
};

// Loop trough the buttons open popup and add event on click
if(btnsOpen.length > 0) {
    for(let i = 0; i < btnsOpen.length; i++) {
        const btnOpen = btnsOpen[i];
        btnOpen.addEventListener('click', openPopup);
    }
}

if(btnsClose.length > 0) {
    // Add event on close button, overlay and esc key
    for (let i = 0; i < btnsClose.length; i++) {
        const btnClose = btnsClose[i];
        btnClose.addEventListener('click', closePopup);
    }
}

document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape' && popup.classList.contains('is-active')) {
        closePopup();
    }
});