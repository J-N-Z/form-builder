import { useState } from 'react';
import styled from 'styled-components';
import { Button, TabMenu } from '@admiral-ds/react-ui';
import { CustomSchemaField } from '../types';
import { FormBuilderCustom } from '../TestForm/FormBuilderCustom';
import { SoftwareInstances } from './TabsContent/SoftwareInstances';



const Section = styled.div`
    padding: 20px;
    background: #fff;
`;

const gridSchemaCustom = [
    [
        {
            id: 'itemID',
            width: 1
        },
    ],
    [
        {
            id: 'firstName',
            width: 2
        },
        {
            id: 'amount',
            width: 1
        },
    ],
    [
        {
            id: 'date',
            width: 1
        },
        {
            id: 'status',
            width: 1
        },
    ],
    [
        {
            id: 'description',
            width: 4
        },
    ]
];

const customSchema: CustomSchemaField[] = [
    {
        id: 'itemID',
        type: 'text',
        label: 'ID записи',
        placeholder: '',
        value: '1',
        disabled: true
    },
    {
        id: 'firstName',
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
        options: [
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
        ]
    },
    {
        id: 'description',
        type: 'textarea',
        label: 'Комментарий',
        placeholder: '',
        value: '',
    },
];




export const ITAssetPage = () => {
    const [formFields, setFormFields] = useState(customSchema);
    const [activeTabId, setActiveTabId] = useState('1');

    const handleChange = (id: string, value: any) => {
        const newFormFields = [...formFields];

        newFormFields.forEach((field) => {
            if (field.id === id) {
                field.value = value;
            }
        });

        setFormFields(newFormFields);
    }

    const handleSubmit = () => {
        const dataToServer = formFields.map((field) => ({ id: field.id, value: field.value }));
        console.log('dataToServer', dataToServer);
    }

    const tabs = [
        {
            content: 'Общее',
            id: '1'
        },
        {
            content: 'Экземпляры ПО',
            id: '2'
        },
    ];

    const getTabContent = () => {
        switch (activeTabId) {
            case '1': {
                return (
                    <div>Форма</div>
                )
            }

            case '2': {
                return (
                    <div><SoftwareInstances /></div>
                )
            }
             
            default: {
                return null;
            }
        }
    }

    return (
        <div>
            <Section style={{ marginBottom: 20 }}>
                <FormBuilderCustom
                    schema={formFields}
                    gridSchema={gridSchemaCustom}
                    onChange={handleChange}
                />
                <Button
                    style={{ marginTop: 20 }}
                    dimension="s"
                    onClick={handleSubmit}
                >
                    Сохранить
                </Button>
            </Section>

            <Section style={{}}>
                <TabMenu
                    activeTab={activeTabId}
                    tabs={tabs}
                    onChange={setActiveTabId}
                />

                <div style={{ marginTop: 20 }}>
                    {getTabContent()}
                </div>
            </Section>
        </div>
    )
}