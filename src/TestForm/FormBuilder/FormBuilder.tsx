import React, { FC, useState } from 'react';
import { JSONSchema7 } from 'json-schema';
import { Button, InputField, NumberInputField, CheckboxField, TextField, DateField } from '@admiral-ds/react-ui';


/**
 * TODO
 * 
 * Добавить в switch Select без поиска с заранее определенным набором опций
 * Добавить заполнение полей дефолтными значениями, записанными в JSON
 * Добавить возможность настройки внешнего вида сетки формы
 * Проработать валидацию хотя бы базово
 * 
 */

interface FormBuilderProps {
    schema: JSONSchema7;
    uiSchema: any;
    onSubmit: (state: any) => any;
}

export const FormBuilder: FC<FormBuilderProps> = ({ schema, uiSchema, onSubmit }) => {

    const [formState, setFormState] = useState<any>({}); // TODO Прописать правильный тип


    const getFieldsByProperties = (properties: any) => { // TODO Прописать правильный тип
        const keys = Object.keys(properties);

        const fields: JSX.Element[] = [];


        keys.forEach((key) => {
            const fieldObj = {
                name: key,
                ...properties[key]
            };
            const fieldEl = getFieldByProperty(fieldObj);
            fields.push(<div key={key}>{fieldEl}</div>);
        });

        return fields;
    }

    const handleTextFieldChange = (e: React.ChangeEvent<any>, name: string) => {
        const newFormState = { ...formState };
        newFormState[name] = e.target.value;
        setFormState(newFormState);
    }



    const getFieldByProperty = (fieldObj: any): JSX.Element | null => {
        const { name, type, title } = fieldObj;
        const options = uiSchema[name] && uiSchema[name]["ui:options"] || {};

        switch (type) {
            case 'string': {
                // Проверить uiSchema, 
                // если "ui:widget": "textarea" отрендерить TextField
                // если "ui:widget": "date" отрендерить DateField
                // по-умолчанию отрендерить InputField
                if (uiSchema[name] && uiSchema[name]["ui:widget"]) {
                    if (uiSchema[name]["ui:widget"] === 'textarea') {
                        return (
                            <TextField
                                label={title}
                                value={formState[name]}
                                {...options}
                                onChange={(e) => handleTextFieldChange(e, name)}
                            />
                        )
                    }

                    if (uiSchema[name]["ui:widget"] === 'date') {
                        return (
                            <DateField
                                label={title}
                                value={formState[name]}
                                {...options}
                                onChange={(e) => handleTextFieldChange(e, name)}
                            />
                        )
                    }
                }

                return (
                    <InputField
                        label={title}
                        value={formState[name]}
                        {...options}
                        onChange={(e) => handleTextFieldChange(e, name)}
                    />
                )
            }

            case 'number': {
                return (
                    <NumberInputField
                        label={title}
                        value={formState[name]}
                        suffix=""
                        {...options}
                        onChange={(e) => handleTextFieldChange(e, name)}
                    />
                )
            }

            case 'boolean': {
                return (
                    <CheckboxField
                        dimension="s"
                        {...options}
                        onChange={() => { }}
                    >
                        {title}
                    </CheckboxField>
                )
            }

            default: {
                return null
            }
        }
    }


    const fields = getFieldsByProperties(schema.properties);


    return (
        <div>
            <div style={{ fontSize: 20, marginBottom: 16 }}>FormBuilder</div>
            <div>{fields}</div>
            <Button
                style={{ marginTop: 20 }}
                dimension="s"
                onClick={() => onSubmit(formState)}
            >
                Сохранить
            </Button>
        </div>
    )
}