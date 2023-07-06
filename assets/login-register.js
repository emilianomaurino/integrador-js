const registerForm = document.getElementById("register-form");
const nameLastNameInput = document.getElementById("nombre-apellido");
const dniInput = document.getElementById("dni");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToLocalStorage = () => {
localStorage.setItem("users", JSON.stringify(users));}


// FUNCIONES AUXILIARES---------------------------

const isEmpty = (input) => {
    return !input.value.trim().length;
};


const showError = (input, message) => {
 	const formField = input.parentElement;
 	formField.classList.remove("success");
 	formField.classList.add("error");
 	const error = formField.querySelector("small");
 	error.style.display = "block";
 	error.textContent = message;
 };

const isBetween = (input, minimo, maximo) => {
    return input.value.length >= minimo && input.value.length <= maximo;
};

const showSucces = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.style.display = "none";
    error.textContent = "";
}

const isDniValid = (input) => {
    const re = /^[0-9]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;
    return re.test(input.value.trim());
};

const isValidEmail = (input) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(input.value.trim());
};

const isExistingEmail = (input) => {
	return users.some((user) => user.email === input.value.trim());
};

const isPassSecure = (input) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(input.value.trim());
};




// FUNCIONES DE VALIDACION DE INPUTS----------------------------

const checkTextInput = (input) => {
    let valid = false; 
    const minCharacters = 3;
    const maxCharacters = 20;
    if (isEmpty(input)){
        showError(input, "Este campo es obligatorio");
        return;
    }
    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe contener entre ${minCharacters} y ${maxCharacters} caracteres`)
        return;
    }
    showSucces(input);
    valid = true;
    return valid;
};

 const checkDniInput = (input) => {
    let valid = false
    if(isEmpty(input)) {
        showError(input, "El DNI es obligatorio");
        return;
    }
    if(!isDniValid(input)) {
        showError(input, "No es un DNI valido");
        return
    }
    showSucces(input);
    valid = true;
    return valid;
};

    const checkEmailInput = (input) => {
        let valid = false 
        if(isEmpty(input)) {
            showError(input, "El mail es obligatorio");
            return
        };
        if(!isValidEmail(input)) {
            showError(input, "No es un mail valido")
            return 
        }
        if (isExistingEmail(input)) {
        	showError(input, "El mail ya se encuentra registrado");
        	return;
        };
        showSucces(input);
        valid = true;
        return valid;
    }

    const checkPassword = (input) => {
        let valid = false 
        if(isEmpty(input)) {
            showError(input, "La contraseñan es obligatoria");
            return 
        }
        if(!isPassSecure(input)) {
            showError(input, 
            "La contra debe contener por lo menos 8 caracter, una mayuscula, minuscula, numero y simbolo");
            return 
        }
        showSucces(input);
        valid = true;
        return valid;
    }



// // ---------validación general y almacenamiento de datos--------

const submitHandler = (e) => {
    e.preventDefault();
    let isNameValid = checkTextInput(nameLastNameInput);
    let isDniValid = checkDniInput(dniInput);
    let isMailValid = checkEmailInput(emailInput);
    let isPassValid = checkPassword(passInput);

    let isValidForm = 
    isNameValid && 
    isDniValid && 
    isMailValid && 
    isPassValid;

    if(isValidForm) {
        users.push({
            name: nameLastNameInput.value,
            dni: dniInput.value,
            email: emailInput.value,
            pass: passInput.value,
        });   
    saveToLocalStorage();
    alert("Te registraste con exito!!!!");
	window.location.href = "login.html";
    }
}
   



const init = () => {
    registerForm.addEventListener("submit", submitHandler);
    nameLastNameInput.addEventListener("input", () => checkTextInput(nameLastNameInput));
    dniInput.addEventListener("input", () => checkDniInput(dniInput));
    emailInput.addEventListener("input", () => checkEmailInput(emailInput));
    passInput.addEventListener("input", () => checkPassword(passInput))
};


init();