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

/*
    This function manipulates the DOM based on the current step number.
*/
const GoToStep = (stepNumber, form) => {
    
    if (stepNumber === 1) {     // When stepNumber is 1.
        form.innerHTML = `
        <label for="name">Name<span class="error-text"></span></label>
        <input type="text" id="name" name="name" placeholder="e.g. Stephen King" autocomplete="off">

        <label for="email">Email Address<span class="error-text"></span></label>
        <input type="text" id="email" name="email" placeholder="e.g. stephenking@lorem.com" autocomplete="off">

        <label for="phone">Phone Number<span class="error-text"></span></label>
        <input type="text" id="phone" name="phone" placeholder="e.g. +1 234 567 890" autocomplete="off">

        <button type="submit" class="next-step-btn">Next Step</button>
        `;
    } else if (stepNumber === 2) {      // When stepNumber is 2.
        form.innerHTML = `
        <div class="image-option-container">
                    
            <label for="arcade" class="image-option">
                <input type="image" src="./assets/images/icon-arcade.svg" alt="Arcade" id="arcade" value="arcade">

                <div class="input-image-text">
                    <p class="image-input-title">Arcade</p>
                    <p class="image-input-sub-title">&dollar;9/mo</p>
                    <p class="hidden">2 months free</p>
                </div>
            </label>

            <label for="advanced" class="image-option">
                <input type="image" src="./assets/images/icon-advanced.svg" alt="Advanced" id="advanced" value="advanced">

                <div class="input-image-text">
                    <p class="image-input-title">Advanced</p>
                    <p class="image-input-sub-title">&dollar;12/mo</p>
                    <p class="hidden">2 months free</p>
                </div>
            </label>

            <label for="pro" class="image-option">
                <input type="image" src="./assets/images/icon-pro.svg" alt="Pro" id="pro" value="pro">

                <div class="input-image-text">
                    <p class="image-input-title">Pro</p>
                    <p class="image-input-sub-title">&dollar;15/mo</p>
                    <p class="hidden">2 months free</p>
                </div>
            </label>

        </div>

        <div class="plan-type-container">

            <p class="plan-type-text monthly active-display-plan">Monthly</p>
            <input type="checkbox" name="Plan-Type" id="plan-type" onclick="ActivateToggleButtonPlanType()">
            <label for="plan-type"></label>
            <p class="plan-type-text yearly">Yearly</p>
        </div>

        <div class="desktop-next-step-button">
            <button class="previous-step-btn" onclick="GoBack()">Go Back</button>
            <button type="submit" class="next-step-btn">Next Step</button>
        </div>
        `;
    }
}

/*
    This function removes the 'active-step' class from the .number element of stepnumber. Means the number whose background color shows the active state of the step, this function removes that background color.
*/
const RemoveActiveStep = (stepNumber) => {
    const CurrentStepNumber = document.querySelector(`#Sidebar .step:nth-child(${stepNumber}) .number`);
    CurrentStepNumber.classList.remove('active-step');
}

/*
    This function adds the 'active-step' class from the .number element of stepnumber. Means the number whose background color shows the active state of the step, this function adds that background color.
*/
const AddActiveStep = (stepNumber) => {
    const CurrentStepNumber = document.querySelector(`#Sidebar .step:nth-child(${stepNumber}) .number`);
    CurrentStepNumber.classList.add('active-step');
}

// Initializing currentStep by 1.
let currentStep = 1;

// Getting form element.
const Form = document.querySelector('form');

// Getting Next step submit button which is displayed in mobile screens.
const NextStepSubmitBtnMobile = document.querySelector('.mobile-next-step-button > button');

/*
    This function is responsible for the behavior when the form is submitted or switches to next step.
*/
const Submit = () => {
    
    // If the form validation returns true, then go to next step and remove active step from the previous step.
    if (Validate()){
        RemoveActiveStep(currentStep);
        // Increase the current step by one.
        currentStep += 1;
        GoToStep(currentStep, Form);
        AddActiveStep(currentStep);
    }

}

Form.addEventListener('submit', (e) => {

    e.preventDefault();

    Submit();

})

NextStepSubmitBtnMobile.addEventListener('click', (e) => {

    e.preventDefault();

    Submit();

})

/*
    This function navigates the form to previous step by removing the active step class from current step and adding the active step class to previous step.
*/
const GoBack = () => {
    RemoveActiveStep(currentStep);
    currentStep -= 1;
    GoToStep(currentStep, document.querySelector('form'));
    AddActiveStep(currentStep);
}

/*
    This function is responsible for the behavior of toggle button in second step.
*/
const ActivateToggleButtonPlanType = () => {

    // Getting toggle button.
    const ToggleButton = document.querySelector('#plan-type');

    // Getting all paragraph elements which contains discount text.
    const DiscountElements = document.querySelectorAll('input[type="image"] + .input-image-text > p:nth-child(3)');

    // Getting arcade price element.
    const ArcadePrice = document.querySelector('label[for="arcade"] > .input-image-text > p:nth-child(2)');

    // Getting advanced price element.
    const AdvancedPrice = document.querySelector('label[for="advanced"] > .input-image-text > p:nth-child(2)');

    // Getting pro price element.
    const ProPrice = document.querySelector('label[for="pro"] > .input-image-text > p:nth-child(2)');

    // If toggle button is checked, means toggle is towards yearly plan then update the prices according to yearly plan otherwise set the price according to monthly plan.
    if (ToggleButton.checked) {
        
        // Removing bold formatting of Monthly element.
        ToggleButton.previousElementSibling.classList.remove('active-display-plan');

        // Setting the prices for plans according to yearly plan.
        ArcadePrice.innerHTML = `&dollar;90/yr`;
        AdvancedPrice.innerHTML = `&dollar;120/yr`;
        ProPrice.innerHTML = `&dollar;150/yr`;

        // Displaying discount on yearly plan.
        DiscountElements.forEach(element => {
            element.classList.remove('hidden');
        })

        // Adding bold formatting of Yearly element.
        ToggleButton.nextElementSibling.nextElementSibling.classList.add('active-display-plan');

    } else {
        
        // Adding bold formatting on Monthly plan.
        ToggleButton.previousElementSibling.classList.add('active-display-plan');

        // Setting the prices for plans according to monthly plan.
        ArcadePrice.innerHTML = `&dollar;9/mo`;
        AdvancedPrice.innerHTML = `&dollar;12/mo`;
        ProPrice.innerHTML = `&dollar;15/mo`;

        // Hiding discount on yearly plan.
        DiscountElements.forEach(element => {
            element.classList.add('hidden');
        })

        // Removing bold formatting on Yearly plan.
        ToggleButton.nextElementSibling.nextElementSibling.classList.remove('active-display-plan');

    }
}