import { SchematicFieldItem } from './types';

export const availableFieldsDefault: SchematicFieldItem[] = [
    {
        id: 1,
        title: 'HDD, всего Гб',
        type: 'целое число'
    },
    {
        id: 2,
        title: 'Host name',
        type: 'строка'
    },
    {
        id: 3,
        title: 'IP-адрес',
        type: 'строка'
    },
    {
        id: 4,
        title: 'MAC-адрес',
        type: 'строка'
    },
    {
        id: 5,
        title: 'RAM, Мб',
        type: 'целое число'
    },
    {
        id: 6,
        title: 'В домене',
        type: 'да/нет'
    },
    {
        id: 7,
        title: 'В сети',
        type: 'да/нет'
    },
];