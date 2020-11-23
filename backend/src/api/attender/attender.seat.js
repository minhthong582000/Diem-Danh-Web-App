/* eslint-disable no-plusplus */
/* eslint-disable default-case */
module.exports.getSeat = function (no) {
    const col = no % 15 !== 0 ? no % 15 : 15;
    let row;

    switch (true) {
        case no >= 1 && no < 16:
            row = 'A';
            break;
        case no >= 16 && no < 31:
            row = 'B';
            break;
        case no >= 31 && no < 46:
            row = 'C';
            break;
        case no >= 46 && no < 61:
            row = 'D';
            break;
        case no >= 61 && no < 76:
            row = 'E';
            break;
        case no >= 76 && no < 91:
            row = 'F';
            break;
        case no >= 91 && no < 106:
            row = 'G';
            break;
        case no >= 106 && no < 121:
            row = 'H';
            break;
        case no >= 121 && no < 136:
            row = 'I';
            break;
        case no >= 136 && no < 151:
            row = 'J';
            break;
        case no >= 151 && no < 166:
            row = 'K';
            break;
        case no >= 166 && no < 181:
            row = 'L';
            break;
        case no >= 181 && no < 196:
            row = 'M';
            break;
    }

    return row + col;
};
