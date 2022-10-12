import { ITAssetsFullItem } from '../types';

// export const ITAssets = [
//     {
//         id: 1,
//         fullName: 'HP Proliant DL180 Gen10',
//         category: 'Физический сервер',
//         status: 'В эксплуатации',
//     },
//     {
//         id: 4,
//         fullName: 'HP Proliant DL20 Gen10',
//         category: 'Физический сервер',
//         status: 'В эксплуатации',
//     },
// ];

export const statusOptions = [
    {
        id: '0',
        title: 'Нет данных'
    },
    {
        id: '1',
        title: 'На складе'
    },
    {
        id: '2',
        title: 'В эксплуатации'
    },
];

export const ITAssetsFull: ITAssetsFullItem[] = [
    {
        id: 1,
        mainForm: [
            {
                id: 'itemID',
                type: 'text',
                label: 'ID записи',
                placeholder: '',
                value: '1',
                disabled: true
            },
            {
                id: 'fullName',
                type: 'text',
                label: 'Полное имя',
                placeholder: 'Введите имя',
                value: 'HP Proliant DL180 Gen10',
            },
            {
                id: 'amount',
                type: 'number',
                label: 'Количество',
                placeholder: '0',
                precision: 0,
                value: '',
            },
            {
                id: 'date',
                type: 'date',
                label: 'Дата',
                placeholder: '00.00.0000',
                value: '',
            },
            {
                id: 'status',
                type: 'select',
                label: 'Статус',
                value: {
                    id: '1',
                    title: 'На складе'
                },
                options: statusOptions
            },
            {
                id: 'description',
                type: 'textarea',
                label: 'Комментарий',
                placeholder: '',
                value: '',
            },
        ]
    },
    {
        id: 4,
        mainForm: [
            {
                id: 'itemID',
                type: 'text',
                label: 'ID записи',
                placeholder: '',
                value: '1',
                disabled: true
            },
            {
                id: 'fullName',
                type: 'text',
                label: 'Полное имя',
                placeholder: '',
                value: 'HP Proliant DL20 Gen10',
            },
            {
                id: 'amount',
                type: 'number',
                label: 'Количество',
                placeholder: '0',
                precision: 0,
                value: '',
            },
            {
                id: 'date',
                type: 'date',
                label: 'Дата',
                placeholder: '00.00.0000',
                value: '',
            },
            {
                id: 'status',
                type: 'select',
                label: 'Статус',
                value: {
                    id: '1',
                    title: 'На складе'
                },
                options: statusOptions
            },
            {
                id: 'description',
                type: 'textarea',
                label: 'Комментарий',
                placeholder: '',
                value: '',
            },
        ]
    }
];
