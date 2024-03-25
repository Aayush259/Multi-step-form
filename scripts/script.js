let userName = '';
let userEmail = '';
let userPhone = '';
let monthly = true;
let imageOption = '';
let imageOptionPrice = 0;
let addOns = [];
let totalPrice = 0;


/*
    This function displays the next step button and go back buttons based on device width.
 */
function DisplayNextBtn(stepNumber) {

    if (stepNumber >= 5) {
        return;
    }

    const DeviceWidth = window.innerWidth;

    if (DeviceWidth >= 785) {
        document.querySelector('.next-step-btn-desktop').classList.remove('hidden');
    } else {
        document.querySelector('.next-step-btn-mobile').classList.remove('hidden');
    }
}

DisplayNextBtn();

/*
    This function displays error on screen.
*/
const DisplayError = (Input, message) => {
    
    // Getting Label element just above the input element.
    const Label = Input.previousElementSibling;

    // Getting the span element which contains the error-text.
    const ErrorText = Label.querySelector('.error-text');

    // Updating the error-text with the required error message.
    ErrorText.innerHTML = `${message}*`;

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
const Validate = (stepNumber) => {

    // Getting all input fields from the document.
    const InputFields = document.querySelectorAll('input');

    // Initializing the number of errors in the form with 0;
    let numberOfErrors = 0;

    // For step 1, validate the form according to the following if block.
    if (stepNumber === 1) {

        // Removing the previous error messages from screen.
        InputFields.forEach((field) => {

            DisplayError(field, '');

            // Removing the error-input class from the input element.
            field.classList.remove('error-input');
        })

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
    } else if (stepNumber === 2) {      // For step 2, validate the form according to the following else if block

        document.querySelector('p.error-text').innerHTML = ``;
        document.querySelector('p.error-text').classList.add('hidden');

        // Initializing the condition that the image selected (input element with type image) with false.
        let imageSelected = false;

        // If the image element (input type with image) is selected then number of errors is zero, otherwise it will show an error.
        InputFields.forEach(field => {
            if (field.parentNode.classList.contains('active-focus')) {
                imageSelected = true;
            }
        })

        if (imageSelected) {
            numberOfErrors = 0;
        } else {
            document.querySelector('p.error-text').innerHTML = `Select a plan*`;
            document.querySelector('p.error-text').classList.remove('hidden');
            numberOfErrors += 1;
        }
    }

    if (numberOfErrors === 0) {
        return true;
    } else {
        return false;
    }
}

/*
    This function handles the behavior and styling of the label element of the focused element (input element with type image) is focused.
*/
const InputImageFocus = (focusedElement) => {

    // Getting parent element of the focused element.
    const ParentFocusedElement = focusedElement.parentNode;

    // Adding class of active-focus to the parent element (label) of the focused element.
    ParentFocusedElement.classList.add('active-focus');
}

/*
    This function handles the behavior and styling of the label element of the focused element (input element with type image) is removed from focused state.
*/
const InputImageRemoveFocus = (removedFocusedElement) => {

    // Getting parent element of the removed focused element.
    const ParentRemovedFocusedElement = removedFocusedElement.parentNode;

    // Removing class of active-focus to the parent element (label) of the focused element.
    ParentRemovedFocusedElement.classList.remove('active-focus');
}

/*
    This function manipulates the DOM based on the current step number.
*/
const GoToStep = (stepNumber, form) => {

    // Getting go back button.
    const GoBackButton = document.getElementById('go-back-btn');

    // If current step number is not 1 then dispay go back button otherwise hide this go back button.
    if (stepNumber === 1) {
        GoBackButton.classList.add('hidden');
    } else {
        GoBackButton.classList.remove('hidden');
    }

    // Getting header and below header text elements.
    const Header = document.getElementById('header');
    const BelowHeader = document.getElementById('below-header');
    
    if (stepNumber === 1) {     // When stepNumber is 1.
        Header.innerHTML = `Personal Info`;
        BelowHeader.innerHTML = `Please provide your name, email address, and phone number.`;
        form.innerHTML = `
        <label for="name">Name<span class="error-text"></span></label>
        <input type="text" id="name" name="name" placeholder="e.g. Stephen King" autocomplete="off">

        <label for="email">Email Address<span class="error-text"></span></label>
        <input type="text" id="email" name="email" placeholder="e.g. stephenking@lorem.com" autocomplete="off">

        <label for="phone">Phone Number<span class="error-text"></span></label>
        <input type="text" id="phone" name="phone" placeholder="e.g. +1 234 567 890" autocomplete="off">

        <button type="submit" class="next-step-btn next-step-btn-desktop">Next Step</button>
        `;
    } else if (stepNumber === 2) {      // When stepNumber is 2.
        Header.innerHTML = `Select your plan`;
        BelowHeader.innerHTML = `You have the option of monthly or yearly billing.`;

        form.innerHTML = `
        <p class="error-text hidden"></p>

        <div class="image-option-container">
                    
            <label for="arcade" class="image-option" onclick="imageOption = 'Arcade'; imageOptionPrice = 9">
                <input type="image" src="./assets/images/icon-arcade.svg" alt="Arcade" id="arcade" value="arcade" onfocus="InputImageFocus(this)" onblur="InputImageRemoveFocus(this)">

                <div class="input-image-text">
                    <p class="image-input-title">Arcade</p>
                    <p class="image-input-sub-title">&dollar;9/mo</p>
                    <p class="hidden">2 months free</p>
                </div>
            </label>

            <label for="advanced" class="image-option" onclick="imageOption = 'Advanced'; imageOptionPrice = 12">
                <input type="image" src="./assets/images/icon-advanced.svg" alt="Advanced" id="advanced" value="advanced" onfocus="InputImageFocus(this)" onblur="InputImageRemoveFocus(this)">

                <div class="input-image-text">
                    <p class="image-input-title">Advanced</p>
                    <p class="image-input-sub-title">&dollar;12/mo</p>
                    <p class="hidden">2 months free</p>
                </div>
            </label>

            <label for="pro" class="image-option" onclick="imageOption = 'Pro'; imageOptionPrice = 15">
                <input type="image" src="./assets/images/icon-pro.svg" alt="Pro" id="pro" value="pro" onfocus="InputImageFocus(this)" onblur="InputImageRemoveFocus(this)">

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

        <div class="desktop-next-step-button next-step-btn-desktop">
            <button class="previous-step-btn" onclick="GoBack()" id="go-back-btn">Go Back</button>
            <button type="submit" class="next-step-btn">Next Step</button>
        </div>
        `;

    } else if (stepNumber === 3) {
        Header.innerHTML = `Pick add-ons`;
        BelowHeader.innerHTML = `Add-ons help enhance your gaming experience.`;
        
        let OnlineServicePrice = ``;
        let LargerStoragePrice = ``;
        let CustomizableProfilePrice = ``;

        if (monthly) {
            OnlineServicePrice = `&plus;&dollar;1/mo`;
            LargerStoragePrice = `&plus;&dollar;2/mo`;
            CustomizableProfilePrice = `&plus;&dollar;2/mo`;
        } else {
            OnlineServicePrice = `&plus;&dollar;10/yr`;
            LargerStoragePrice = `&plus;&dollar;20/yr`;
            CustomizableProfilePrice = `&plus;&dollar;20/yr`;
        }
        form.innerHTML = `
        <label for="online-service" class="add-ons">

            <div class="input-add-ons">
                <input type="checkbox" name="online-service" id="online-service" autocomplete="off" price="1">
                <div class="description">
                    <p class="checkbox-input-title">Online service</p>
                    <p class="checkbox-input-sub-title">Access to multiplayer games</p>
                </div>
            </div>

            <p class="additional-price-add-ons">${OnlineServicePrice}</p>

        </label>

        <label for="larger-storage" class="add-ons">

            <div class="input-add-ons">
                <input type="checkbox" name="larger-storage" id="larger-storage" autocomplete="off" price="2">
                <div class="description">
                    <p class="checkbox-input-title">Larger storage</p>
                    <p class="checkbox-input-sub-title">Extra 1TB of cloud save</p>
                </div>
            </div>

            <p class="additional-price-add-ons">${LargerStoragePrice}</p>

        </label>

        <label for="customizable-profile" class="add-ons">

            <div class="input-add-ons">
                <input type="checkbox" name="customizable-profile" id="customizable-profile"  autocomplete="off" price="2">
                <div class="description">
                    <p class="checkbox-input-title">Customizable profile</p>
                    <p class="checkbox-input-sub-title">Custom theme on your profile</p>
                </div>
            </div>

            <p class="additional-price-add-ons">${CustomizableProfilePrice}</p>
            
        </label>

        <script>
            console.log('hi');
            const Labels = document.querySelectorAll('.add-ons');

            Labels.forEach(label => {
                label.addEventListener('click', () => {
                    label.classList.toggle('purple-border');
                })
            })
        </script>
        
        <div class="desktop-next-step-button next-step-btn-desktop">
            <button class="previous-step-btn" onclick="GoBack()" id="go-back-btn">Go Back</button>
            <button type="submit" class="next-step-btn" style="right: -30%;">Next Step</button>
        </div>
        `;
    } else if (stepNumber === 4) {
        Header.innerHTML = `Finishing up`;
        BelowHeader.innerHTML = `Double-check everything looks OK before confirming.`;

        const SelectedPlanName = imageOption;
        let selectedPlanPrice = imageOptionPrice.toString() + `/mo`;
        let PlanType = 'Monthly';
        let durationType = 'month';
        let SelectedAddOnsElements = [];
        let price = {
            'Online service': undefined,
            'Larger storage': undefined,
            'Customizable profile': undefined
        }

        if (monthly) {
            price["Online service"] = `&plus;&dollar;1/mo`;
            price["Larger storage"] = `&plus;&dollar;2/mo`;
            price["Customizable profile"] = `&plus;&dollar;2/mo`;
            totalPrice += imageOptionPrice;
            totalPrice = totalPrice.toString() + `/mo`;
        } else {
            price["Online service"] = `&plus;&dollar;10/yr`;
            price["Larger storage"] = `&plus;&dollar;20/yr`;
            price["Customizable profile"] = `&plus;&dollar;20/yr`;
            PlanType = 'Yearly';
            selectedPlanPrice = imageOptionPrice.toString() + `0` + `/yr`;
            durationType = 'year';
            totalPrice += parseInt(imageOptionPrice.toString() + `0`);
            totalPrice = totalPrice.toString() + `/yr`;
        }

        for (i=0; i<addOns.length; i++) {
            SelectedAddOnsElements.push(`<div class="selected-add-ons-name">
                <p>${addOns[i]}</p>
                <p>${price[addOns[i]]}</p>
            </div>`);
        }

        const SelectedAddOnsElementsString = SelectedAddOnsElements.join('');

        form.innerHTML = `
        <div class="finishing-container">

            <div class="selected-plan">
                <div class="selected-plan-name">
                    <p class="bold">${SelectedPlanName} &lpar;${PlanType}&rpar;</p>
                    <a href="#" id="correction-link">Change</a>
                </div>
                <p class="price-txt bold">&dollar;${selectedPlanPrice}</p>
            </div>
            <hr>

            <div class="selected-add-ons">
                ${SelectedAddOnsElementsString}
            </div>
        </div>

        <div class="total">
            <p>Total &lpar;per ${durationType}&rpar;</p>
            <p class="final-price bold">&plus;&dollar;${totalPrice}</p>
        </div>

        <div class="desktop-next-step-button next-step-btn-desktop">
            <button class="previous-step-btn" onclick="GoBack()" id="go-back-btn">Go Back</button>
            <button type="submit" class="next-step-btn" style="right: -15%;">Next Step</button>
        </div>
        `
    } else if (stepNumber === 5) {

        // Getting form container.
        const FormContainer = document.querySelector('#form');
        FormContainer.classList.add('thanks-screen');

        FormContainer.innerHTML = `
            <img src="./assets/images/icon-thank-you.svg" alt="Thank You" id="thank-you-image">
            <h1 id="header">Thank you!</h1>
            <p class="sub-title" id="below-header">Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
        `

        // Removing all buttons.
        const Buttons = document.querySelectorAll('button');
        Buttons.forEach(button => {
            button.classList.add('hidden');
        })
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
    try {
        const CurrentStepNumber = document.querySelector(`#Sidebar .step:nth-child(${stepNumber}) .number`);
        CurrentStepNumber.classList.add('active-step');
    } catch {
        // DO NOTHING.
    }
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
    if (Validate(currentStep)){

        // Storing all values of input elements of step one.
        if (currentStep === 1) {
            userName = document.getElementById('name').value;
            userEmail = document.getElementById('email').value;
            userPhone = document.getElementById('phone').value;
        } else if (currentStep === 2) {     // Storing all values of input elements of step two.
            if (document.getElementById('plan-type').checked) {
                monthly = false;
            }
        } else if (currentStep === 3) {     // Storing all values of input elements of step two.

            const AllCheckedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

            for (i = 0; i < AllCheckedBoxes.length; i++) {
                addOns.push(`${AllCheckedBoxes[i].nextElementSibling.querySelector('p').textContent}`);

                if (monthly) {
                    totalPrice += parseInt(AllCheckedBoxes[i].getAttribute('price'));
                } else {
                    totalPrice += parseInt(AllCheckedBoxes[i].getAttribute('price') + `0`);
                }
            }
        }

        RemoveActiveStep(currentStep);
        // Increase the current step by one.
        currentStep += 1;
        GoToStep(currentStep, Form);
        AddActiveStep(currentStep);
        DisplayNextBtn(currentStep);
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