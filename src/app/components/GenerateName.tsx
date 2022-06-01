function fetchNames(nameType) {
    let names = [];

    switch (nameType) {
        case 'female':
            names = ['Berthefried', 'Tatiana', 'Hildeburg', 'Ayse', 'Elif'];
            break;
        case 'male':
            names = ['Bilbo', 'Frodo', 'Theodulph', 'Ali', 'Burak'];
            break;
        case 'surnames':
            names = ['Baggins', 'Lightfoot', 'Boulderhill', 'Aslan', 'Yılmaz'];
            break;
    }

    return {data: names};
}

export default function generateName(gender) {
    // Fetch the names
    const firstNames = fetchNames(gender || pickRandom(['male', 'female']));
    const lastNames = fetchNames('surnames');

    // Pick a random name from each list
    const firstName = pickRandom(firstNames.data);
    const lastName = pickRandom(lastNames.data);

    // Use a template literal to format the full name
    return `${firstName} ${lastName}`;
}
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

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
