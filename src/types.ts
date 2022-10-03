type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'datetime' | 'checkbox' | 'select';

interface Option {
    id: string;
    title: string;
}

export interface CustomSchemaField {
    id: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    value: any; // для обычных текстовых полей - string, в случае с Select, значение будет объектом { id, title }, но как это описать на TypeScript?
    options?: Option[]; // только для Select
    disabled?: boolean;
}