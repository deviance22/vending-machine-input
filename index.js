require('dotenv').config();
const axios = require('axios');
const prompt = require('prompt-sync')({sigint: true});

let doneWithInput = false;
let oneInput = 0;
let twoInput = 0;
let tenInput = 0;
let twentyInput = 0;
let fiftyInput = 0;

while (!doneWithInput) {
    let choices = "";
    let input = 0;
    let isValidChoice = false;
    while (!isValidChoice) {
        choices = prompt('Enter the corresponding letter to the denomination you will insert: a. $1 | b. $2 | c. 10c | d. 20c | e. 50c: ');
        switch (choices.toLowerCase()) {
            case 'a':
                input = parseInt(prompt('Enter the number of $1 coins you will enter: '));
                if (Number.isInteger(input)) {
                    oneInput += input;
                } else {
                    console.error('Invalid number: ' + input);
                }
                isValidChoice = true;
                break;
    
            case 'b':
                input = parseInt(prompt('Enter the number of $2 coins you will enter: '));
                if (Number.isInteger(input)) {
                    twoInput += input;
                } else {
                    console.error('Invalid number: ' + input);
                }
                isValidChoice = true;
                break;
    
            case 'c':
                input = parseInt(prompt('Enter the number of 10c coins you will enter: '));
                if (Number.isInteger(input)) {
                    tenInput += input;
                } else {
                    console.error('Invalid number: ' + input);
                }
                isValidChoice = true;
                break;
    
            case 'd':
                input = parseInt(prompt('Enter the number of 20c coins you will enter: '));
                if (Number.isInteger(input)) {
                    twentyInput += input;
                } else {
                    console.error('Invalid number: ' + input);
                }
                isValidChoice = true;
                break;
    
            case 'e':
                input = parseInt(prompt('Enter the number of 50c coins you will enter: '));
                if (Number.isInteger(input)) {
                    fiftyInput += input;
                } else {
                    console.error('Invalid number: ' + input);
                }
                isValidChoice = true;
                break;
    
            default:
                console.error('Invalid choice: ' + choices);
                break;
        }
    }
    let willReEnter = "";
    let validInput = false;
    while (!validInput) {
        willReEnter = prompt('Insert more coins? (Y/N) ');
        switch (willReEnter.toLowerCase()) {
            case 'y':
                doneWithInput = false;
                validInput = true;
                break;
    
            case 'n':
                doneWithInput = true;
                validInput = true;
                break;
    
            default:
                console.error('Invalid input');
                doneWithInput = false;
                validInput = false;
                break;
        }
    }
}

axios.post(process.env.SERVER_URL + ':' + process.env.PORT + '/currency/payment', {
    currency: "$",
    dollar: {
        one: oneInput,
        two: twoInput
    },
    cents: {
        ten: tenInput,
        twenty: twentyInput,
        fifty: fiftyInput
    }
}).then((response) => {
    if(response.status === 200) {
        console.log('Available items are: ');
        for (const key in response.data.items) {
            console.log(key + ': $' + response.data.items[key] + '\n');
        }
    } else {
        console.error(response.data.error);
    }
    
}).catch((error) => {
    console.error(error);
});