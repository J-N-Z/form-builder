import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import { SchematicFieldItem } from '../types';
import { ItemTypes } from '../constants';
import { StyledSchematicField, Title, Type } from './style';


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