// islands#blueIcon
// islands#greenIcon
// islands#orangeIcon
// islands#pinkIcon
// islands#yellowIcon
// islands#blackIcon
// islands#darkOrangeIcon
// islands#brownIcon
// islands#nightIcon
// islands#redIcon

import { PlaceType } from '#interfaces/MapTypes';

export const getPlacemarkPreset = (type: PlaceType, isEmpty = false) => {
    switch (type) {
        case 'house':
            return `islands#orange${isEmpty ? '' : 'Dot'}Icon`;
        case 'street':
            return `islands#pink${isEmpty ? '' : 'Dot'}Icon`;
        case 'transport':
            return `islands#yellow${isEmpty ? '' : 'Dot'}Icon`;
        case 'vegetation':
            return `islands#green${isEmpty ? '' : 'Dot'}Icon`;
        case 'hydro':
            return `islands#blue${isEmpty ? '' : 'Dot'}Icon`;
        default:
            return `islands#brown${isEmpty ? '' : 'Dot'}Icon`;
    }
};

// house — здание
// street — улица
// metro — станция метро
// district — район
// locality — населённый пункт
// country — страна
// province — область, штат, край
// area — область, административный район
// railway — железнодорожная станция
// route — маршруты (автобусные, трамвайные и т.д.)
// vegetation — зелёные насаждения (парки, леса и т.д.)
// hydro — водоёмы (реки, озёра и т.д.)
// airport — аэропорты
// other — другие объекты

// house : house
// street : street | district
// transport : metro | railway | route | airport
// vegetation : vegetation
// hydro : hydro
// other : locality | country | province | area | other

export const transformObjectType = (type: string): PlaceType => {
    switch (type) {
        case 'house':
        case 'vegetation':
        case 'hydro':
            return type;
        case 'street':
        case 'district':
            return 'street';
        case 'metro':
        case 'railway':
        case 'route':
        case 'airport':
            return 'transport';
        default:
            return 'other';
    }
};
