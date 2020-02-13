function reverseArr(a, start, end) {
    const range = end - start;
    const r = a.slice(start + 1, end);
    r.reverse();
    for (let i = 0; i < range - 1; i++) {
        a[i + start + 1] = r[i];
    }
    a.splice(end, 1);
    a.splice(start, 1);
}

function reverseParenthesis(str) {
    const arr = str.split('');
    let start = -1;
    let end = -1;
    const count = arr.length;
    for (let i = 0; i < count; i++) {
        if (arr[i] === '(') start = i;
        if (arr[i] === ')') {
            end = i;
            reverseArr(arr, start, end);
            i = 0;
        }
    }
    return arr.join('');
}
console.log(reverseParenthesis('foo(bar)'));
console.log(reverseParenthesis('(bar)'));
console.log(reverseParenthesis('foo(bar)blim'));
console.log(reverseParenthesis('foo(foo(bar))blim'));

function sameLength(arr) {
    const newOne = [];
    while (arr.length > 0) {
        let length = arr[0].length;
        let same = arr.filter(s => s.length === length);
        let diff = arr.filter(s => s.length !== length);
        newOne.push(same);
        arr = diff;
    }
    return newOne;
}

function sameLetter(s1, s2) {
    let s2a = s2.split('');
    return s1.split('').every(i => {
        let index = s2a.indexOf(i);
        if (index > -1) {
            s2a.splice(index, 1);
            return true;
        } else return false;
    });
}

function group(arr) {
    const newOne = [];
    while (arr.length > 0) {
        let [a, ...b] = arr;
        let same = b.filter(i => sameLetter(a, i));
        same = [a, ...same];
        let diff = b.filter(i => !sameLetter(a, i));
        newOne.push(same);
        arr = diff;
    }
    return newOne;
}

function groupSameLetter(arr) {
    const sameLetterArr = sameLength(arr);
    return sameLetterArr.map(i => group(i));
}

const input = [
    'AMOR',
    'XISELA',
    'JAMON',
    'ROMA',
    'OMAR',
    'MORA',
    'ESPONJA',
    'RAMO',
    'JAPONES',
    'ARMO',
    'MOJAN',
    'MARO',
    'ORAM',
    'MONJA',
    'ALEXIS'
];
console.log(groupSameLetter(input));

const out = input.reduce((acc, curr) => {
    const sorted = curr
        .split('')
        .sort()
        .join('');
    const same = acc.has(sorted) ? acc.get(sorted).concat(curr) : [curr];
    return acc.set(sorted, same);
}, new Map());
out.forEach(i => console.log(i.join('-')));
