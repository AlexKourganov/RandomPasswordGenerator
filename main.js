// Check  if checkboxes were clicked
const resultEL = document.getElementById('result');
const lengthEL = document.getElementById('length');
const uppercaseEL = document.getElementById('uppercase');
const lowercaseEL = document.getElementById('lowercase');
const numbersEL = document.getElementById('numbers');
const symbolsEL = document.getElementById('symbols');
const generateEL = document.getElementById('generate');
const clipboardEL = document.getElementById('clipboard');

// Random Function
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

clipboardEL.addEventListener('click', () => {
    console.log('Being called from clipboars');
    console.log(resultEL.innerText);
    const textarea = document.createElement('textarea');
    const password = resultEL.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});
// Generate password
generateEL.addEventListener('click', () => {
    const length = +lengthEL.value;
    const hasLower = lowercaseEL.checked;
    const hasUpper = uppercaseEL.checked;
    const hasNumber = numbersEL.checked;
    const hasSymbol = symbolsEL.checked;
    resultEL.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});



function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{
        lower
    }, {
        upper
    }, {
        number
    }, {
        symbol
    }].filter(item => Object.values(item)[0]);

    // Doesn't have a selected type
    if (typesCount === 0) {
        return '';
    }

    // create a loop
    // for (let i = 0; i < length; i += typesCount) {
    //     typesArr.forEach(type => {
    //         const funcName = Object.keys(type)[0];
    //         generatedPassword += randomFunc[funcName]();
    //     });
    // }

        for (let i = 0; i < length; i ++) {
            // console.log(typesArr.length);
            // console.log(typesArr[0]);
            // console.log(Object.keys(typesArr[Math.floor(Math.random() * 4)])[0]);
            // const funcName = Object.keys(type)[0];
            const funcName = Object.keys(typesArr[Math.floor(Math.random() * typesArr.length)])[0];
            generatedPassword += randomFunc[funcName]();
            // generatedPassword += randomFunc[funcName]();
       
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// Generator functions
function getRandomLower() {
    // 97-122 are a to z, see character set table for reference
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {

    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}