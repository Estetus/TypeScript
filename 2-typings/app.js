'use strict';
let makeOrdinal = require('./makeOrdinal');
let myIsFinite = require('./isFinite');
let isSafeNumber = require('./isSafeNumber');
var CountNumber;
(function (CountNumber) {
    CountNumber[CountNumber["TEN"] = 10] = "TEN";
    CountNumber[CountNumber["ONE_HUNDRED"] = 100] = "ONE_HUNDRED";
    CountNumber[CountNumber["ONE_THOUSAND"] = 1000] = "ONE_THOUSAND";
    CountNumber[CountNumber["ONE_MILLION"] = 1000000] = "ONE_MILLION";
    CountNumber[CountNumber["ONE_BILLION"] = 1000000000] = "ONE_BILLION";
    CountNumber[CountNumber["ONE_TRILLION"] = 1000000000000] = "ONE_TRILLION";
    CountNumber[CountNumber["ONE_QUADRILLION"] = 1000000000000000] = "ONE_QUADRILLION";
    CountNumber[CountNumber["MAX"] = 9007199254740992] = "MAX";
})(CountNumber || (CountNumber = {}));
let LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
let TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number, asOrdinal) {
    let words;
    let num = parseInt(number, 10);
    if (!myIsFinite(num)) {
        throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}
function generateWords(number, words = []) {
    let remainder = 0;
    let word = '';
    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < CountNumber.ONE_HUNDRED) {
        remainder = number % CountNumber.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / CountNumber.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < CountNumber.ONE_THOUSAND) {
        remainder = number % CountNumber.ONE_HUNDRED;
        word = generateWords(Math.floor(number / CountNumber.ONE_HUNDRED)) + ' hundred';
    }
    else if (number < CountNumber.ONE_MILLION) {
        remainder = number % CountNumber.ONE_THOUSAND;
        word = generateWords(Math.floor(number / CountNumber.ONE_THOUSAND)) + ' thousand,';
    }
    else if (number < CountNumber.ONE_BILLION) {
        remainder = number % CountNumber.ONE_MILLION;
        word = generateWords(Math.floor(number / CountNumber.ONE_MILLION)) + ' million,';
    }
    else if (number < CountNumber.ONE_TRILLION) {
        remainder = number % CountNumber.ONE_BILLION;
        word = generateWords(Math.floor(number / CountNumber.ONE_BILLION)) + ' billion,';
    }
    else if (number < CountNumber.ONE_QUADRILLION) {
        remainder = number % CountNumber.ONE_TRILLION;
        word = generateWords(Math.floor(number / CountNumber.ONE_TRILLION)) + ' trillion,';
    }
    else if (number <= CountNumber.MAX) {
        remainder = number % CountNumber.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / CountNumber.ONE_QUADRILLION)) +
            ' quadrillion,';
    }
    words.push(word);
    return generateWords(remainder, words);
}
module.exports = toWords;
