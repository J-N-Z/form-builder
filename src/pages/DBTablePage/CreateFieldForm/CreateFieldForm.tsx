import { FC, useState } from 'react';
import { TextField, Button, SelectField, Option } from '@admiral-ds/react-ui';


interface FormState {
    id: number;
    fieldName: string;
    SQLName: string;
    fieldType: string;
    fieldExtra: string;
}

const defaultFormState: FormState = {
    id: 0,
    fieldName: '',
    SQLName: '',
    fieldType: '',
    fieldExtra: ''
}

export const CreateFieldForm: FC<any> = ({ onCreate }) => {
    const [form, setForm] = useState(defaultFormState);

    const handleChange = (value: string, key: 'fieldName' | 'SQLName' | 'fieldExtra' | 'fieldType') => {
        const newForm = { ...form };
        newForm[key] = value;
        setForm(newForm);
    }

    const handleCreate = () => {
        const formToServer = { ...form };
        formToServer.id = new Date().getTime();
        onCreate(formToServer);
    }

    return (
        <div>
            <TextField
                label="Название поля"
                onChange={(e) => handleChange(e.target.value, 'fieldName')}
                value={form.fieldName}
            />
            <TextField
                label="SQL Name"
                onChange={(e) => handleChange(e.target.value, 'SQLName')}
                value={form.SQLName}
            />
            <SelectField
                label="Тип поля"
                onChange={(e) => handleChange(e.target.value, 'fieldType')}
                value={form.fieldType}
            >
                <Option
                    value="строка"
                >
                    строка
                </Option>
                <Option
                    value="целое число"
                >
                    целое число
                </Option>
                <Option
                    value="да/нет"
                >
                    да/нет
                </Option>
                
            </SelectField>
            <TextField
                label="Дополнительная информация"
                onChange={(e) => handleChange(e.target.value, 'fieldExtra')}
                value={form.fieldExtra}
            />

            <Button
                style={{ marginTop: 20 }}
                dimension="s"
                onClick={handleCreate}
            >
                Создать
            </Button>
        </div>
    )
}