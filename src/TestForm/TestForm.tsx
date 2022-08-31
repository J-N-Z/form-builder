import { useState } from 'react';
import Form from "@rjsf/core";

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

    // multiple fields
    // const schema: any = {
    //     title: "Test form",
    //     type: "object",
    //     properties: {
    //         name: {
    //             type: "string"
    //         },
    //         age: {
    //             type: "number"
    //         }
    //     }
    // };

    const schema: any = {
        type: "object",
        properties: {
            done: {
                type: "boolean",
            },
            
        }
    };

    const uiSchema = {
        done: {
            "ui:widget": "radio" // could also be "select"
          }
    };

    // const uiSchema = {
    //     "ui:enumDisabled": [1],
    // };

    // const uiSchema = {
    //     name: {
    //         classNames: "custom-class-name"
    //     },
    //     age: {
    //         classNames: "custom-class-age"
    //     }
    // }

    // предзаполнение формы
    // const formData = {
    //     name: "Peter",
    //     age: 18
    //   };

    const log = (type: any) => console.log.bind(console, type);

    return (
        <>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onChange={(e) => {
                    log("changed");
                    setFormData(e.formData);
                }}
                onSubmit={log("submitted")}
                onError={log("errors")}
            />
            <button onClick={() => console.log('formData', formData)}>get formData</button>


        </>
    );
}