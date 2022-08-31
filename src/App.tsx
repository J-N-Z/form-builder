import React, { useState } from 'react';
import styled from 'styled-components';
import { InputField, TextField, DateField, CheckboxField } from '@admiral-ds/react-ui';
import { TestForm } from './TestForm';
import { ConstructorPage } from './ConstructorPage';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import { availableFieldsDefault } from './ConstructorPage/mock';


interface SchemaObject {
  type: 'InputField' | 'TextField' | 'DateField' | 'CheckboxField';
  value: any;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  width?: number; // количество занимаемых колонок а-ля bootstrap, всего 12 пока жестко
}



const schema: SchemaObject[] = [
  {
    type: 'InputField',
    label: 'Label 1',
    required: true,
    value: 'value 1',
    width: 12
  },
  {
    type: 'TextField',
    label: 'Label 2',
    value: 'value 2',
    width: 9
  },
  {
    type: 'TextField',
    label: 'Label 3',
    value: 'field disabled',
    disabled: true,
    width: 6
  },
  {
    type: 'TextField',
    label: 'Label 4',
    value: 'field read only',
    readOnly: true,
    width: 3
  },
  {
    type: 'DateField',
    label: 'Label 5',
    value: '',
    width: 3
  },
  {
    type: 'CheckboxField',
    label: 'Label 6',
    value: true,
  }
];

const COMMON_FIELD_TYPES = ['InputField', 'TextField', 'DateField'];


const StyledApp = styled.div`
  height: 100%;
  padding: 15px;
  background: #f2f4f8;
`;


const getWidth = (colSize: number) => {
  return `${colSize / 12 * 100}%`
}

const schemaToForm = (schema: SchemaObject[]) => {

  return schema.map((item) => {

    const style = {
      width: item.width ? getWidth(item.width) : '100%'
    }

    let commonProps = {};

    const isCommonField = COMMON_FIELD_TYPES.includes(item.type);

    if (isCommonField) {
      commonProps = {
        label: item.label,
        required: item.required,
        disabled: item.disabled,
        readOnly: item.readOnly
      }
    }

    switch (item.type) {
      case 'InputField': return (
        <div style={style}>
          <InputField
            {...commonProps}
            value={item.value}
            onChange={() => { }}
          />
        </div>
      )

      case 'TextField': return (
        <div style={style}>
          <TextField
            {...commonProps}
            value={item.value}
            onChange={() => { }}
          />
        </div>

      )

      case 'DateField': return (
        <div style={style}>
          <DateField
            {...commonProps}
            value={item.value}
            onChange={() => { }}
          />
        </div>
      )

      case 'CheckboxField': return (
        <div style={style}>
          <CheckboxField
            disabled={item.disabled}
            checked={item.value}
            onChange={() => {}}
          >
            {item.label}
          </CheckboxField>
        </div>
      )

      default: {
        return <div>default</div>
      }
    }
  }
  );
};




function App() {
  const form = schemaToForm(schema);

  console.log('form', form);

  const [availableFields, setAvailableFields] = useState(availableFieldsDefault);

  return (
    <StyledApp>
      {/* <TestForm /> */}
      {/* {form} */}
      <DndProvider backend={HTML5Backend}>
        <ConstructorPage />
      </DndProvider>
      
    </StyledApp>
  );
}

export default App;
