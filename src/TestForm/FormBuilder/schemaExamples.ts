import { JSONSchema7, JSONSchema7Definition, JSONSchema7Type, JSONSchema7TypeName } from 'json-schema';


/**
 * Форма с двумя полями: name - текстовое, age - числовое
 */
const schema: JSONSchema7 = {
    title: "Test form",
    type: "object",
    properties: {
        name: {
            type: "string",
            title: "Имя"
        },
        age: {
            type: "number",
            title: "Возраст"
        },
        done: {
            type: "boolean",
            title: "Выполнено"
        }
    }
};

/**
 *  Field types
   
    string
    number
    integer
    boolean
    null
 */


/*
Пример схемы для поля Select

const schema = {
  type: "string",
  enum: ["one", "two", "three"]
};


uiSchema - можно прописать, как поле будет отображено
type - string можно отобразить как <input type="text"> и <textarea>

const uiSchema = {
  items: {
    "ui:widget": "textarea"
  }
};

const uiSchema =  {
  done: {
    "ui:widget": "radio" // could also be "select"
  }
};

Также в uiSchema можно прописать атрибуты, которые мы будем передавать в поля:
placeholder и т.д.

const uiSchema = {
    name: {
        "ui:options": { placeholder: 'Виктор' }
    }
};

Есть ли смысл в отдельной схеме для этого или сразу в scema прописывать все это?

=====

ui:widget - передавать туда спец слово, обозначающее Admiral-компонент?

Dependencies - зависимые поля

*/