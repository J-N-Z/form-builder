import { useState } from 'react';
import styled, { css } from 'styled-components';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SchematicField } from './SchematicField';
import { ItemTypes } from './constants';
import { availableFieldsDefault } from './mock';

import { SchematicFieldItem } from './types';
import { cloneDeep } from 'lodash';

const sectionStyle = css`
    padding: 15px;
    background: #fff;
`;

const StyledConstructorPage = styled.div`
    display: flex;
    gap: 15px;
`;

const AvailableFieldsSection = styled.div`
    flex-basis: 25%;
    ${sectionStyle}
`;

const DesignerSection = styled.div`
    flex-grow: 1;
    ${sectionStyle}
`;

const SectionTitle = styled.div`
    margin-bottom: 24px;
    font-size: 16px;
`;

const StyledSchematicFieldDummy = styled.div`
    height: 49px;
    background-color: #fafafa;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    transition: background-color .2s ease-out;
`;

const StyledSchematicFieldDummyWrap = styled.div`
    flex-basis: 25%;
    height: 49px;
`;

const SchematicFieldDummyRow = styled.div`
    display: flex;
    gap: 20px;
`;




export const ConstructorPage = (props: any) => {

    const [availableFields, setAvailableFields] = useState<any[]>(availableFieldsDefault);
    const [board, setBoard] = useState<any[]>([]);

    const handleMoveSchematicField = (itemId: any/*: SchematicFieldItem*//*, index: number*/) => {
        // change state
        const newAvailableFields = availableFields.filter((field) => field.id !== itemId);
        const targetItem = availableFields.filter((field) => field.id === itemId);

        setAvailableFields((avFields) => [...avFields].filter((field) => field.id !== itemId));

        setBoard((board) => [...board, ...targetItem]);
    }


    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.SCHEMATIC_FIELD,
            drop: (item: any) => handleMoveSchematicField(item.id),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        })/*,
        [x, y]*/
    );



    return (
        
            <StyledConstructorPage>
                <AvailableFieldsSection>
                    <SectionTitle>Доступные поля</SectionTitle>

                    <button onClick={() => console.log('availableFields', availableFields)}>get availableFields</button>

                    <div>
                        {availableFields.map((item: any) => <SchematicField /*key={item.id}*/ item={item} style={{ marginBottom: 10 }} />)}
                    </div>
                </AvailableFieldsSection>

                <DesignerSection>
                    <SectionTitle>Дизайнер страницы</SectionTitle>

                    <div ref={drop} style={{ width: 500, height: 500, border: '1px solid #ccc' }}>
                        {board.map((item: any) => <SchematicField key={item.id} item={item} style={{ marginBottom: 10 }} />)}
                    </div>

                </DesignerSection>
            </StyledConstructorPage>
    )
}