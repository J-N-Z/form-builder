import { FC } from 'react';
import styled from 'styled-components';
import { InputField, NumberInputField, CheckboxField, TextField, DateField, SelectField, Option } from '@admiral-ds/react-ui';
import { CustomSchemaField } from '../../types';


/**
 * TODO
 * 
 * + Добавить заполнение полей дефолтными значениями, записанными в JSON
 * + Добавить табы
 * 
 * 
 * +/- Заполнить табы
 * - Добавить поле DateTime (в Admiral есть только отдельно date и отдельно time поля)
 * - Проработать валидацию хотя бы базово
 * 
 */

const GridRow = styled.div`
    display: flex;
    margin-bottom: 16px;
`;

const GridItem = styled.div`
    padding: 0 10px;
`;

const getWidth = (colSize: number) => {
    return `${colSize / 4 * 100}%`
}

enum FieldTypes {
    text = 'text',
    textarea = 'textarea',
    number = 'number',
    date = 'date',
    datetime = 'datetime',
    checkbox = 'checkbox',
    select = 'select'
}

interface GridSchemaItem {
    id: string;
    width: number;
}

type GridSchemaRow = GridSchemaItem[];

type GridSchema = GridSchemaRow[];

interface FormBuilderProps {
    schema: CustomSchemaField[];
    gridSchema: GridSchema;
    onChange: (id: string, value: any) => any;
}

export const FormBuilderCustom: FC<FormBuilderProps> = ({ schema, gridSchema, onChange }) => {

    const handleChange = (field: CustomSchemaField, e: any) => {
        let value = e.target.value;

        if (field.type === FieldTypes.select) {
            const targetObj = field.options?.find((option) => option.id === e.target.value);
            value = targetObj;
        }

        if (field.type === FieldTypes.checkbox) {
            value = e.target.checked;
        }

        onChange(field.id, value);
    }

    const getFieldsByProperties = (): JSX.Element[] => {
        return gridSchema.map((row, index) => {
            const rowItems = row.map((item) => {
                const width = getWidth(item.width);
                const field = schema.find((schemaItem) => item.id === schemaItem.id);
                const fieldEl = field && getFieldByProperty(field) || null;
                return <GridItem key={item.id} style={{ width }}>{fieldEl}</GridItem>
            });

            return <GridRow key={index}>{rowItems}</GridRow>
        });
    }

    const getFieldByProperty = (fieldObj: CustomSchemaField): JSX.Element | null => {
        const { id, type, label, value, placeholder, options, disabled, precision = 0 } = fieldObj;

        const commonProps = {
            id,
            label,
            placeholder,
            disabled,
            readOnly: false // TODO Прокинуть
            // required // Под вопросом
        }

        switch (type) {
            case FieldTypes.text:
            case FieldTypes.datetime: { // для поля datetime скорее всего будет использоваться обычный текстовый инпут, возможно с маской
                return (
                    <InputField
                        {...commonProps}
                        value={value}
                        onChange={(e) => handleChange(fieldObj, e)}
                    />
                )
            }

            case FieldTypes.textarea: {
                return (
                    <TextField
                        {...commonProps}
                        value={value}
                        onChange={(e) => handleChange(fieldObj, e)}
                    />
                )
            }

            case FieldTypes.number: {
                return (
                    <NumberInputField
                        {...commonProps}
                        value={value}
                        suffix=""
                        precision={precision}
                        onChange={(e) => handleChange(fieldObj, e)}
                    />
                )
            }

            case FieldTypes.date: {
                return (
                    <DateField
                        {...commonProps}
                        value={value}
                        onChange={(e) => handleChange(fieldObj, e)}
                    />
                )
            }

            case FieldTypes.checkbox: {
                return (
                    <CheckboxField
                        disabled={disabled}
                        onChange={(e) => handleChange(fieldObj, e)}
                    >
                        {label}
                    </CheckboxField>
                )
            }

            case FieldTypes.select: {
                return (
                    <SelectField
                        {...commonProps}
                        mode="select"
                        onChange={(e) => handleChange(fieldObj, e)}
                        value={value?.title}
                    >
                        {
                            options?.map((option) => (
                                <Option
                                    key={option.id}
                                    value={option.id}
                                >
                                    {option.title}
                                </Option>
                            ))
                        }
                    </SelectField>
                )
            }

            default: {
                return null;
            }
        }
    }

    const fields = getFieldsByProperties();

    return (
        <div>{fields}</div>
    )
}