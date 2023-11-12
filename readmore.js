const parentContainer =  document.querySelector('.AllTopics');

parentContainer.addEventListener('click', event=>{

    const current = event.target;

    const isReadMoreBtn = current.className.includes('ReadMoreBtn');

    if(!isReadMoreBtn) return;

    const currentText = event.target.parentNode.querySelector('.ReadMoreTxt');

    currentText.classList.toggle('ReadMoreTxt--show');

    current.textContent = current.textContent.includes('Read More') ?
    "Read Less..." : "Read More...";

})
