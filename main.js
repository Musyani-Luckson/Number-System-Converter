import { hp } from "./helper/lib.js";

const forms = hp.getDom(`.forms`);
const number = hp.getDom(`#number`);
const answerDisplay = hp.getDom(`#answer`);

class NumberSystem {
	constructor() {
	}
}

NumberSystem.prototype.decimalToBinary = function(decimal) {
	let integerPart = Math.floor(decimal);
	let fractionalPart = decimal - integerPart;

	let binaryInteger = "";
	while (integerPart > 0) {
		binaryInteger = (integerPart % 2) + binaryInteger;
		integerPart = Math.floor(integerPart / 2);
	}

	let binaryFractional = "";
	let precision = 16; // Number of binary digits after the decimal point
	while (fractionalPart > 0 && precision > 0) {
		fractionalPart *= 2;
		if (fractionalPart >= 1) {
			binaryFractional += "1";
			fractionalPart -= 1;
		} else {
			binaryFractional += "0";
		}
		precision--;
	}
	return binaryInteger + (binaryFractional !== "" ? "." + binaryFractional : "");
};

NumberSystem.prototype.binaryToDecimal = function(binary) {
	let decimal = 0;
	for (let i = binary.length - 1, j = 0; i >= 0; i--, j++) {
		decimal += parseInt(binary[i]) * Math.pow(2, j);
	}
	return decimal;
}

NumberSystem.prototype.decimalToOctal = function(decimal) {
	let integerPart = Math.floor(decimal);
	let fractionalPart = decimal - integerPart;

	let octalInteger = "";
	while (integerPart > 0) {
		octalInteger = (integerPart % 8) + octalInteger;
		integerPart = Math.floor(integerPart / 8);
	}

	let octalFractional = "";
	let precision = 16; // Number of octal digits after the decimal point
	while (fractionalPart > 0 && precision > 0) {
		fractionalPart *= 8;
		let digit = Math.floor(fractionalPart);
		octalFractional += digit;
		fractionalPart -= digit;
		precision--;
	}

	return octalInteger + (octalFractional !== "" ? "." + octalFractional : "");
};


NumberSystem.prototype.octalToDecimal = function(octal) {
	let decimal = 0;
	for (let i = octal.length - 1, j = 0; i >= 0; i--, j++) {
		decimal += parseInt(octal[i]) * Math.pow(8, j);
	}
	return decimal;
}

NumberSystem.prototype.decimalToHexadecimal = function(decimal) {
	let integerPart = Math.floor(decimal);
	let fractionalPart = decimal - integerPart;

	let hexadecimalInteger = "";
	while (integerPart > 0) {
		const remainder = integerPart % 16;
		hexadecimalInteger = getHexDigit(remainder) + hexadecimalInteger;
		integerPart = Math.floor(integerPart / 16);
	}

	let hexadecimalFractional = "";
	let precision = 16; // Number of hexadecimal digits after the decimal point
	while (fractionalPart > 0 && precision > 0) {
		fractionalPart *= 16;
		const digit = Math.floor(fractionalPart);
		hexadecimalFractional += getHexDigit(digit);
		fractionalPart -= digit;
		precision--;
	}

	return hexadecimalInteger + (hexadecimalFractional !== "" ? "." + hexadecimalFractional : "");
};


function getHexDigit(digit) {
	if (digit < 10) {
		return digit.toString();
	} else {
		return String.fromCharCode(65 + digit - 10);
	}
}

NumberSystem.prototype.hexadecimalToDecimal = function(hexadecimal) {
	let decimal = 0;
	for (let i = hexadecimal.length - 1, j = 0; i >= 0; i--, j++) {
		const digit = parseInt(hexadecimal[i], 16);
		decimal += digit * Math.pow(16, j);
	}
	return decimal;
}

NumberSystem.prototype.binaryToOctal = function(binary) {
	while (binary.length % 3 !== 0) {
		binary = "0" + binary;
	}
	let octal = "";
	for (let i = 0; i < binary.length; i += 3) {
		const group = binary.substr(i, 3);
		const decimal = this.binaryToDecimal(group);
		octal += decimal.toString(8);
	}
	return octal;
}

NumberSystem.prototype.octalToBinary = function(octal) {
	let binary = "";
	for (let i = 0; i < octal.length; i++) {
		const digit = parseInt(octal[i]);
		const binaryDigit = this.decimalToBinary(digit).padStart(3, "0");
		binary += binaryDigit;
	}
	return binary;
}


NumberSystem.prototype.binaryToHexadecimal = function(binary) {
	while (binary.length % 4 !== 0) {
		binary = "0" + binary;
	}
	let hexadecimal = "";
	for (let i = 0; i < binary.length; i += 4) {
		const group = binary.substr(i, 4);
		const decimal = this.binaryToDecimal(group);
		hexadecimal += getHexDigit(decimal);
	}
	return hexadecimal;
}


NumberSystem.prototype.hexadecimalToBinary = function(hexadecimal) {
	let binary = "";
	for (let i = 0; i < hexadecimal.length; i++) {
		const digit = parseInt(hexadecimal[i], 16);
		const binaryDigit = this.decimalToBinary(digit).padStart(4, "0");
		binary += binaryDigit;
	}
	return binary;
}


for (let i = 0; i < forms.length; i++) {
	hp.eventListener(forms[i], `input`, () => {
		const value = forms[i].value;
		const numberSystem = new NumberSystem();
		const operation = getConverstion(forms[0].value, forms[1].value);
		if (numberSystem[operation] != undefined) {
			const answer = numberSystem[operation](number.value.trim())
			answerDisplay.value = answer;
		} else {
			answerDisplay.value = '';
		}
	})
}


function getConverstion(from, to) {
	let conversion = null
	return `${from}To${capitalizeFirstLetter(to)}`
}

function capitalizeFirstLetter(word) {
	if (typeof word !== 'string' || word.length === 0) {
		return word; // return the word as is if it's not a string or an empty string
	}
	return word.charAt(0).toUpperCase() + word.slice(1);
}