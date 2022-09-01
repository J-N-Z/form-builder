import { SchematicFieldItem } from './types';

export const availableFieldsDefault: SchematicFieldItem[] = [
    {
        id: 1,
        title: 'HDD, всего Гб',
        type: 'целое число',
        sqlName: 'iTotalHDDSize'
    },
    {
        id: 2,
        title: 'Host name',
        type: 'строка',
        sqlName: 'sHostName'
    },
    {
        id: 3,
        title: 'IP-адрес',
        type: 'строка',
        sqlName: 'sIPAddr'
    },
    {
        id: 4,
        title: 'MAC-адрес',
        type: 'строка',
        sqlName: 'sMACAddr'
    },
    {
        id: 5,
        title: 'RAM, Мб',
        type: 'целое число',
        sqlName: 'iRAMSize'
    },
    {
        id: 6,
        title: 'В домене',
        type: 'да/нет',
        sqlName: 'bInDomain'
    },
    {
        id: 7,
        title: 'В сети',
        type: 'да/нет',
        sqlName: 'bOnline'
    },
    {
        id: 8,
        title: 'Варианты выбытия',
        type: 'выпадающий список',
        sqlName: 'seDisposalOption'
    },
    {
        id: 9,
        title: 'Включая налог (%)',
        type: 'десятичное число',
        sqlName: 'fTaxValue'
    },
    {
        id: 10,
        title: 'Внешний ID',
        type: 'строка',
        sqlName: 'sExternalId'
    },
];