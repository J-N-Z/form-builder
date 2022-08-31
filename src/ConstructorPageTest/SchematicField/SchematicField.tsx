import React, { FC } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { SchematicFieldItem } from '../types';
import { ItemTypes } from '../constants';



const StyledSchematicField = styled.div`
    /* display: inline-flex; */
    height: 49px;
    background-color: #ede9fb;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    position: relative;
    cursor: move;
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Type = styled.div`
    font-size: 11px;
    position: absolute;
    bottom: 5px;
    left: 5px;
`;


interface SchematicFieldProps {
    item: SchematicFieldItem;
    style?: React.CSSProperties;
}

export const SchematicField: FC<SchematicFieldProps> = ({ item, style }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.SCHEMATIC_FIELD,
        item,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const { title, type } = item;

    return (
        <StyledSchematicField
            ref={drag}
            style={{
                ...style,
                opacity: isDragging ? 0.5 : 1
            }}
        >
            <Title>{title}</Title>
            <Type>{type}</Type>
        </StyledSchematicField>
    )
}