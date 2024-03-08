console.log("Square");

/*
    This function displays error on screen.
*/
const DisplayError = (Input, message) => {
    
    // Getting Label element just above the input element.
    const Label = Input.previousElementSibling;

    // Getting the span element which contains the error-text.
    const ErrorText = Label.querySelector('.error-text');

    // Updating the error-text with the required error message.
    ErrorText.innerHTML = `${message}`;

    // Adding the class of 'error-input' to the input element.
    Input.classList.add('error-input');
}

/*
    This function checks whether a string is in a valid format or not.
*/
const ValidFormat = (string, type) => {

    // If type is name then execute this `if` block.
    if (type === `name`) {

        // Array of allowed characters in name string.
        const AllowedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

        for (character of string) {
            // If any character inside email string is not present in AllowedCharacters array then return false.
            if (!AllowedCharacters.includes(character)) {
                return false;
            }
        }
    } else if (type === `email`) {      // If type is email then this code block will be executed.

        // Array of allowed characters in email string.
        const AllowedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '@', '.'];

        // Initializing the number of at the rate and number of dots with 0.
        let numberOfAtTheRate = 0;
        let numberOfDots = 0;

        for (character of string) {
            // If the character inside email string is not allowed then return false.
            if (!AllowedCharacters.includes(character)) {
                return false;
            }
            // If attherate is present in then increase its number by one.
            if (character === '@') {
                numberOfAtTheRate += 1;
            }
    
            // If period is present in email then increase its number by one.
            if (character === '.') {
                numberOfDots += 1;
            }
        }

        // If counter is nor zero and the number of attherate and dots is not one then return false.
        if (numberOfAtTheRate !== 1 || numberOfDots !== 1) {
            return false;
        }
    
        // Position of attherate and dot
        const AtPosition = string.indexOf("@");
        const DotPosition = string.lastIndexOf(".");
    
        // If Dot position is less then attherate position+2 or Dot position + 2 is greater then email length then return false.
        if (DotPosition < AtPosition + 2 || DotPosition + 2 >= string.length) {
            return false;
        }

    } else if (type = `phone`) {        // If type is phone then execute this code block.

        // Array of allowed characters in phone number string.
        const AllowedCharacters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+'];

        // Initializing the number of plus symbols with 0.
        let numberOfPlusSymbols = 0;

        for (character of string) {
            // If the character inside the phone number string is not allowed then return false.
            if (!AllowedCharacters.includes(character)) {
                return false;
            }

            // If character is plus symbol then increase the numberOfPlusSymbols variable by 1.
            if (character === `+`) {
                numberOfPlusSymbols += 1;
            }
        }

        // If number of plus symbols is not one then return false.
        if (numberOfPlusSymbols !== 1) {
            return false;
        }

        // If plus symbol is not at first position then return false.
        if (string.indexOf('+') !== 0) {
            console.log('+ is not at beginning');
            return false;
        }
    }

    // If everything is fine then return true.
    return true;
}

/*
    This function validates the form.
*/
const Validate = () => {

    // Getting all input fields from the document.
    const InputFields = document.querySelectorAll('input');

    // Removing the previous error messages from screen.
    InputFields.forEach((field) => {

        DisplayError(field, '');

        // Removing the error-input class from the input element.
        field.classList.remove('error-input');
    })

    // Initializing the number of errors in the form with 0;
    let numberOfErrors = 0;

    InputFields.forEach((field) => {

        // If there is no value in the input field then display the error message for required field.
        if (field.value === '') {
            DisplayError(field, 'This field is required');
            numberOfErrors += 1;
        }
        // If the length of name is less than and equal to 2 then display error message.
        else if (field.id === 'name' && field.value.length <= 2) {
            DisplayError(field, 'Name is too short');
            numberOfErrors += 1;
        }
        // If the format of input field is invalid then display error message.
        else if (!ValidFormat(field.value, field.id)) {
            DisplayError(field, 'Invalid Format');
            numberOfErrors += 1;
        }
        // If length of phone is invalid then display error message.
        else if (field.id === 'phone' && (field.value.length >= 14 || field.value.length <= 12)) {
            DisplayError(field, 'Invalid phone number');
            numberOfErrors += 1;
        }
    })

    if (numberOfErrors === 0) {
        return true;
    } else {
        return false;
    }
}

let currentStep = 1;

const Form = document.querySelector('form');

Form.addEventListener('submit', (e) => {

    e.preventDefault();

    if(Validate()){
        currentStep += 1;
    }
})