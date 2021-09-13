window.addEventListener('DOMContentLoaded', () => {

const menuOpen = document.querySelector('.burger'),
      menuItem = document.querySelector('.nav__link'),
      menuBody = document.querySelector('.nav'),
      menuLinks = document.querySelectorAll(".nav__link[data-goto]"),
      modalTrigger = document.querySelector('[data-modal]'),
      modal = document.querySelector('.modal');
    
function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

  modalTrigger.addEventListener('click',openModal);

modal.addEventListener('click',(e) => {   
  if(e.target === modal || e.target.getAttribute('data-close') === '') {
    closeModal();
  }
});

menuOpen.addEventListener('click',() => {
    menuOpen.classList.toggle('burger-active');
    document.body.classList.toggle('_lock');
    menuBody.classList.toggle('nav__active');
    });


menuLinks.forEach(menuLink => {
menuLink.addEventListener('click', onNavLinkClick);
    
});

  function onNavLinkClick(e) {
      const menuLink = e.target;
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;
      
      if(menuOpen.classList.contains('burger-active')) {
          menuOpen.classList.remove('burger-active');
        document.body.classList.remove('_lock');
        menuBody.classList.remove('nav__active');
      }
      
      window.scrollTo({
          top:gotoBlockValue,
          behavior:"smooth"
      });
       e.preventDefault(); 
  }       
   
  ////Form

  const forms = document.querySelectorAll('form');
  const message = {
      loading: 'img/spinner.svg',   
      success:'Спасибо!! Мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
      postData(item);
  });

  function postData(form) {
      form.addEventListener('submit',(e) => {
          e.preventDefault();
   
  const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display:block;
          margin:0 auto;
      `;

      form.append(statusMessage);
      
  
  const formData = new FormData(form);

  const object = {};
      formData.forEach(function(value,key) {
          object[key] = value;
      });

  fetch('server.php', {
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body:JSON.stringify(object)
  }).then(data => {
      console.log(data);
      showThanksModal(message.success);
      statusMessage.remove();
  }).catch(() => {
      showThanksModal(message.failure);
  }).finally(() => {
      form.reset();
  });

      });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <button data-close class="modal__close" type="button">
            <svg data-close  class="modal__close-icon">
                    <use xlink:href="#close"></use>
            </svg>
        </button>
        <h2 class="modal__title">${message}</h2>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout( () => {  
      thanksModal.remove(); 
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
  },4000);
  }

});


