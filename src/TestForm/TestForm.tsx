import { useState } from 'react';
import Form from "@rjsf/core";
import { JSONSchema7 } from 'json-schema';
import { Button } from '@admiral-ds/react-ui';
import { FormBuilder } from './FormBuilder';
import { FormBuilderCustom } from '../components/FormBuilderCustom';
import { CustomSchemaField } from '../types';
 


const gridSchemaCustom = [
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
    {
        id: 'done',
        type: 'checkbox',
        label: 'Выполнено',
        value: '',
    },
];

export const TestForm = () => {


    // const Form = JSONSchemaForm.default;
    // const schema: any = {
    //     title: "Todo",
    //     type: "object",
    //     required: ["title"],
    //     properties: {
    //         title: { type: "string", title: "Title", default: "A new task" },
    //         done: { type: "boolean", title: "Done?", default: false }
    //     }
    // };

    // single string field
    // const schema: any = {
    //     title: "Test form",
    //     type: "string"
    //   };


    const [formData, setFormData] = useState(null);

    const [formFields, setFormFields] = useState(customSchema);

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
        console.log('dataToServer',dataToServer);
    }


    // Форма основанная на JSONSchema form

    const schema: JSONSchema7 = {
        title: "Test form",
        type: "object",
        properties: {
            name: {
                type: "string",
                title: "Имя"
            },
            description: {
                type: "string",
                title: "Описание"
            },
            age: {
                type: "number",
                title: "Возраст"
            },
            birthdate: {
                type: "string",
                title: "Дата рождения"
            },
            done: {
                type: "boolean",
                title: "Выполнено"
            }
        }
    };

    const uiSchema = {
        name: {
            "ui:options": { placeholder: 'Введите имя' }
        },
        description: {
            "ui:widget": "textarea"
        },
        age: {
            "ui:options": {
                precision: 0,
                placeholder: '0'
            }
        },
        birthdate: {
            "ui:widget": "date",
            "ui:options": {
                placeholder: "00.00.0000"
            }
        },
    };


    // const uiSchema = {
    //     done: {
    //         "ui:widget": "radio" // could also be "select"
    //     }
    // };

    // предзаполнение формы
    // const formData = {
    //     name: "Peter",
    //     age: 18
    //   };

    const log = (type: any) => console.log.bind(console, type);

    const handleFormSubmit = (state: any) => console.log('state', state);

    return (
        <>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onChange={(e: any) => {
                    log("changed");
                    console.log('e.formData', e.formData);
                    setFormData(e.formData);
                }}
            // onSubmit={log("submitted")}
            // onError={log("errors")}
            />
            <button onClick={() => console.log('formData', formData)}>get formData</button>


            {/* <div style={{ marginTop: 48 }}>
                <FormBuilder
                    schema={schema}
                    uiSchema={uiSchema}
                    onSubmit={handleFormSubmit}
                />
            </div> */}
            <div style={{ marginTop: 48 }}>
                <div style={{ fontSize: 20, marginBottom: 16 }}>FormBuilderCustom</div>
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
            </div>

        </>
    );
}