import { useState } from 'react';
import { FormBuilderCustom } from '../../../../components/FormBuilderCustom';
import { CustomSchemaField } from '../../../../types';


const gridSchemaCustom = [
    [
        {
            id: 'hostname',
            width: 1
        },
        {
            id: 'os',
            width: 1
        },
    ],
    [
        {
            id: 'CPUType',
            width: 1
        },
        {
            id: 'CPUSpeed',
            width: 1
        },
        {
            id: 'CPUCount',
            width: 1
        },
        {
            id: 'CPUCoresCount',
            width: 1
        },
    ],
    [
        {
            id: 'inDomain',
            width: 1
        },
        {
            id: 'online',
            width: 1
        },
    ]
];

const customSchema: CustomSchemaField[] = [
    {
        id: 'hostname',
        type: 'text',
        label: 'Host name',
        placeholder: '',
        value: 'demo-host-1',
    },
    {
        id: 'os',
        type: 'text',
        label: 'ОС',
        placeholder: '',
        value: 'Windows Server 2016 Standart',
    },
    {
        id: 'CPUType',
        type: 'text',
        label: 'Тип ЦП',
        placeholder: '',
        value: 'Intel Xeon 4110',
    },
    {
        id: 'CPUSpeed',
        type: 'text',
        label: 'Частота ЦП, ГГц',
        placeholder: '',
        value: '2,50',
    },
    {
        id: 'CPUCount',
        type: 'number',
        label: 'Число ЦП',
        placeholder: '',
        value: '2',
    },
    {
        id: 'CPUCoresCount',
        type: 'number',
        label: 'Кол-во ядер ЦП',
        placeholder: '',
        value: '24',
    },
    {
        id: 'inDomain',
        type: 'checkbox',
        label: 'В домене',
        placeholder: '',
        value: false,
    },
    {
        id: 'online',
        type: 'checkbox',
        label: 'В сети',
        placeholder: '',
        value: false,
    },
];

export const TechInfo = () => {
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

    return (
        <FormBuilderCustom
            schema={formFields}
            gridSchema={gridSchemaCustom}
            onChange={handleChange}
        />
    )
}