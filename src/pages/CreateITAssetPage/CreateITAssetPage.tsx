import { useState, useContext } from 'react';
import styled from 'styled-components';
import { T, Button, Spinner, useToast } from '@admiral-ds/react-ui';
// import { getITAssets } from '../../services/ITAssetService';
import { FormBuilderCustom } from '../../components/FormBuilderCustom';
import { CustomSchemaField } from '../../types';
import { statusOptions } from '../../data/ITAssets';
import { AppContext } from '../../App';
import { SpinnerWrap } from '../../components/styled/SpinnerWrap';
import { getToastObj } from '../../helper';


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// grid дублируется со страницы ИТ-актив, надо вынести гриды в общий файл, хотя по факту они должны приходить с бэка
const gridSchemaCustom = [
    [
        {
            id: 'itemID',
            width: 1
        },
    ],
    [
        {
            id: 'fullName',
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

const schemaDefault = [
    {
        id: 'itemID',
        type: 'text',
        label: 'ID записи',
        placeholder: '',
        disabled: true,
        value: '',
    },
    {
        id: 'fullName',
        type: 'text',
        label: 'Полное имя',
        placeholder: 'Введите имя',
        value: '',
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
        options: statusOptions,
        value: null,
    },
    {
        id: 'description',
        type: 'textarea',
        label: 'Комментарий',
        placeholder: '',
        value: '',
    },
];

// Возможно понадобиться для работы с реальным бэкендом, пока удобнее отправлять полные данные
// const prepareDataToServer = (fields: any[]) => fields.map((field: any) => ({ id: field.id, value: field.value }));



export const CreateITAssetPage = () => {
    const [formFields, setFormFields] = useState<any[]>(schemaDefault); // TODO тип CustomSchemaField выдает ошибку, значение в type видит как string и считает несовместимым с FieldType
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();

    const appContextValue = useContext(AppContext);

    const { handleAddItem } = appContextValue;

    const fakeSendToServer = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            // генерируем новый id
            const id = new Date().getTime();
            const newFormFields = [...formFields];
            newFormFields.forEach((field) => {
                if (field.id === 'itemID') {
                    field.value = id;
                }
            });
            const newItem = {
                id,
                mainForm: newFormFields
            }
            handleAddItem(newItem);
            resolve(true) // вернуть успешный или не успешный результат
        }, 500)
    });

    const handleChange = (id: string, value: any) => {
        const newFormFields = [...formFields];

        newFormFields.forEach((field) => {
            if (field.id === id) {
                field.value = value;
            }
        });

        setFormFields(newFormFields);
    }

    const handleCreate = () => {
        setIsLoading(true);
        fakeSendToServer()
            .then((res) => {
                // переход на форму редактирования или нет?
                addToast(getToastObj('Создано', 'Новый ИТ-актив создан', 'success'));
                setIsLoading(false);
            })
            .catch((error) => {
                addToast(getToastObj('Ошибка', error, 'error'));
                setIsLoading(false);
            });
    }

    return (
        <div>
            <Header>
                <T font="Header/H5" as="h1">
                    ИТ-активы - Новая запись
                </T>

                <Button
                    dimension="s"
                    disabled={isLoading}
                    onClick={handleCreate}
                >
                    Создать запись
                </Button>
            </Header>

            {
                isLoading
                    ? (
                        <SpinnerWrap>
                            <Spinner dimension="l" />
                        </SpinnerWrap>
                    )
                    : (
                        <FormBuilderCustom
                            schema={formFields}
                            gridSchema={gridSchemaCustom}
                            onChange={handleChange}
                        />
                    )
            }
        </div>
    )
}