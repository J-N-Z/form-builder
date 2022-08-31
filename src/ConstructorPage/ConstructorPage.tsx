import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useDrop } from 'react-dnd';
import { SchematicField } from './SchematicField';
import { SchematicFieldDummy } from './SchematicFieldDummy';
import { schematicFieldRowDefault } from './constants';
import { availableFieldsDefault } from './mock';

import { ItemTypes } from './constants';

import { SchematicFieldItem } from './types';
import { cloneDeep } from 'lodash';
import { StyledConstructorPage, AvailableFieldsSection, DesignerSection, SectionTitle, StyledSchematicFieldDummyWrap, SchematicFieldDummyRow } from './style';

/**
 * Возможности drag'n'drop конструктора
 * - перетаскивание полей из колонки "Доступные поля" на схему
 * - перетаскивание полей на схеме с одной позиции на другую
 * - сохранение (пока фейковое) при сохранении стираются строки с пустыми полями
 * 
 * Не реализовано:
 * - снизу может быть только одна пустая строка
 */



 const deleteItemFromSchematicFields = (schematicFields: any, itemId: number) => {
    schematicFields.forEach((fieldRow: any, rowIndex: number) => {
        fieldRow.forEach((field: any, index: number) => {
            if (field && field.id === itemId) {
                schematicFields[rowIndex][index] = null;
            }
        });
    });
}

export const ConstructorPage = () => {

    const [availableFields, setAvailableFields] = useState(availableFieldsDefault);
    const [schematicFields, setSchematicFields] = useState<any[]>([schematicFieldRowDefault]);

    const handleMoveSchematicField = (item: SchematicFieldItem, index: number, rowIndex: number) => {

        // change state
        setAvailableFields((prev) => {
            const newAvailableFields = prev.filter((field) => field.id !== item.id);
            return newAvailableFields
        });

        setSchematicFields((prev) => {
            const newSchematicFields = cloneDeep(prev);

            // если это поле уже где-то есть, значит происходит перемещение, а не добавление, т.к. поля уникальны нужно стереть поле на старом месте
            deleteItemFromSchematicFields(newSchematicFields, item.id);

            // обновление текущего поля
            newSchematicFields[rowIndex][index] = item;

            // вставить новую строку с пустыми полями, если хотя бы одно поле в поледней строке заполнено (логика A-tracker)
            const lastRow = newSchematicFields[newSchematicFields.length - 1];
            const isSomeFilledLastRow = lastRow.some((item: SchematicFieldItem) => !!item);
            if (isSomeFilledLastRow) {
                newSchematicFields.push(schematicFieldRowDefault);
            }

            return newSchematicFields;
        });
    }

    const handleSave = () => {
        let totalSchematicFields = cloneDeep(schematicFields);

        // стереть строки, в которых только пустые элементы
        totalSchematicFields = totalSchematicFields.filter((fieldRow) => fieldRow.some((field:any) => !!field));

        console.log('totalSchematicFields',totalSchematicFields);
    }

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.SCHEMATIC_FIELD,
            drop: (item: SchematicFieldItem) => {
                handleMoveSchematicFieldBack(item);
                console.log('drop item', item);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        })
    );

    const handleMoveSchematicFieldBack = (item: SchematicFieldItem) => {
        // удалить поле из схемы
        setSchematicFields((prev) => {
            const newSchematicFields = cloneDeep(prev);
            deleteItemFromSchematicFields(newSchematicFields, item.id);
            return newSchematicFields;
        });

        // добавить пол в "Доступные поля"
        setAvailableFields((prev) => [item, ...prev]);
    }

    return (
        <>
            <StyledConstructorPage>
                <AvailableFieldsSection>
                    <SectionTitle>Доступные поля</SectionTitle>
                    <div ref={drop} style={{ maxHeight: 500, overflow: 'auto' }}>
                        {availableFields.map((item: any) => <SchematicField key={item.id} item={item} style={{ marginBottom: 10 }} />)}
                    </div>
                </AvailableFieldsSection>

                <DesignerSection>
                    <SectionTitle>Дизайнер страницы</SectionTitle>

                    <div>
                        {/** интерактивная схема формы */}

                        {schematicFields.map((fieldRow, rowIndex) => (
                            <SchematicFieldDummyRow key={rowIndex}>
                                {fieldRow.map((field: any, index: number) => (
                                    <StyledSchematicFieldDummyWrap key={index}>
                                        <SchematicFieldDummy index={index} rowIndex={rowIndex} field={field} handleMoveSchematicField={handleMoveSchematicField} />
                                    </StyledSchematicFieldDummyWrap>
                                ))}
                            </SchematicFieldDummyRow>
                        ))}

                    </div>

                </DesignerSection>
            </StyledConstructorPage>
            <div style={{ textAlign: 'right', marginTop: 15 }}>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </>
    )
}