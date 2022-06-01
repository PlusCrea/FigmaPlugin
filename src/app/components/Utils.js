export function pickRandomPhoneNumber() {
    var first = pickRandomNumber(200);
    var second = pickRandomNumber(998);
    var third = pickRandomNumber(9998);
    var result = '+1 ' + first.toString() + '-' + second.toString() + '-' + third.toString();
    return result;
}

function pickRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
