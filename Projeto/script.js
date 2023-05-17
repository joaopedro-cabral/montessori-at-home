// Trazer a navbar quuando der scroll pra baixo
document.onscroll = function() {scrollFunction()};
        
function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("navbar").style.top = "0";
        
    } else {
        document.getElementById("navbar").style.top = "-100px";
        if (navOptions.classList.contains('ativo')){
            menu.classList.toggle('ativo');
            navOptions.classList.toggle('ativo');
        }
    }
}

// Ativar o menu para navegação mobile
const menu = document.querySelector('.menu');
const navOptions = document.querySelector('.navbar-mobile-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    navOptions.classList.toggle('ativo');
})

// Esconder o menu mobile ao selecionar uma seção
const mobileMenu = document.querySelector('.mobile-menu-section1')
mobileMenu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    navOptions.classList.toggle('ativo');
})

// Esconder o menu mobile ao clicar no logo da home
const navbarLogo = document.querySelector('.navbar-logo')
navbarLogo.addEventListener('click', () => {
    if (navOptions.classList.contains('ativo')){
        menu.classList.toggle('ativo');
        navOptions.classList.toggle('ativo');
    }
})

// Validações - campos do formulário

const scriptURL = 'https://script.google.com/macros/s/AKfycbyGYFmfo89H06Mn0W6y6o-3UR5XItVXA2tkbyq5bfv0irJnGVVNHUUt22Ll2XWooRWr6g/exec'
const form = document.getElementById('form');
const fullName = document.getElementById('fname');
const obs = document.getElementById('obs');
const email = document.getElementById('email');
const tel = document.getElementById('number');

tel.addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  });

form.addEventListener('submit', e => {
    e.preventDefault();
    successCallCount = 0;

    // Validar se os inputs foram preenchidos
    validateInputs();

        if (successCallCount >= 3){
            // Enviar E-mail com informações do usuário que preencheu o formulário
            sendEmail();

            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))
        }
})

const setError = (element, message) => {
    const inputType = element.parentElement;
    const errorDisplay = inputType.querySelector('.error');

    errorDisplay.innerText = message;
    inputType.classList.add('error');
    inputType.classList.remove('success');
}

const setSuccess = element => {
    const inputType = element.parentElement;
    const errorDisplay = inputType.querySelector('.error');

    errorDisplay.innerText = '';
    inputType.classList.add('success');
    inputType.classList.remove('error');

    successCallCount += 1;
};

let successCallCount = 0;

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const telValue = tel.value.trim();

    if(fullNameValue === ''){
        setError(fullName, 'Preencha esse campo com seu primeiro nome!');
    } else {
        setSuccess(fullName);
    }

    if(emailValue === ''){
        setError(email, 'Preencha esse campo com seu e-mail!');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'E-mail inválido!');
    } else {
        setSuccess(email);
    }

    if(telValue === ''){
        setError(tel, 'Preencha esse campo com seu número de telefone!')
    } else {
        setSuccess(tel);
    }
}

function sendEmail(){
    const ebody = `<!DOCTYPE html>
        <html>
        <body style="text-align: center; justify-content: center;">
            <div style="width: 100%; padding:5em 0; background: linear-gradient(0deg, rgba(7,23,89,1) 0%, rgba(13,43,164,1) 25%, rgba(18,54,199,1) 50%, rgba(13,43,164,1) 75%, rgba(7,23,89,1) 100%);">
                <div style="max-width: 70%; box-shadow: 5px 5px 5px rgba(0, 0, 0, .212); border-radius: 10px; margin: 20px auto; background: white;">
                    <div style="padding: 50px 100px; background: url(http://drive.google.com/uc?export=view&id=1-By250_ods9KQt8xB3BDXkj3ERsUuy1x) no-repeat center / 180px 180px;">
                        <h1>Novo Preenchimento do Formulário!</h1>
                        <p>Um registro com os dados preenchidos pelo usuário no formulário foi feito em sua planilha de dados. Confira abaixo o que foi preenchido:</p>
                    </div>
                    
                    <div style="padding: 0 50px;">
                        <h3>Nome Completo: </h3>${fullName.value.trim()}
                        <br>
                        <h3>E-mail: </h3>${email.value.trim()}
                        <br>
                        <h3>Telefone para Contato: </h3>${tel.value.trim()}
                        <br>
                        <h3>Motivo para Contato: </h3>${obs.value.trim()}
                    </div>

                    <div style="padding: 50px 100px"; align-items: center;>
                        <img src="http://drive.google.com/uc?export=view&id=1kn9vcne40FTPpWdWJ_xfq9uwZWZMeVD0" width=120px; height=120px;>
                    </div>
                </div>
            </div>
        </body>
        </html>`;

    Email.send({
        SecureToken : "32875c39-b3b4-4b20-b48f-0d4b52a18dfa",
        To : 'herobrinesmart@gmail.com',
        From : 'joaopedro8769@gmail.com',
        Subject : email.value.trim() + " preencheu seu formulário!",
        Body : ebody
    }).then(
    message => alert(message)
    )
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.5,
    slidesPerGroup: 1,
    cssMode: true,
    loop: false,
    centeredSlides: true,
    fade: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1.1,
            slidesPerGroup: 1,
        },
        785: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
        },
    },
    keyboard: true
  });