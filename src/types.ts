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
    precision?: number; // кол-во знаков после точки (для NumberInputField)
}

export interface ITAssetsFullItem {
    id: number;
    mainForm: CustomSchemaField[];
}


// Продублирован тип из @admiral-ds/react-ui, т.к. он оттуда не экспортируется
export type ToastStatus = 'info' | 'error' | 'success' | 'warning';

export type ToastType = 'error' | 'create' | 'save';