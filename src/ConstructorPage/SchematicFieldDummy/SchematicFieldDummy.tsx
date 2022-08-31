import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';
import { SchematicField } from '../SchematicField';
import { StyledSchematicFieldDummy } from './style';


export const SchematicFieldDummy = (props: any) => {
    const { index, rowIndex, field, handleMoveSchematicField } = props;

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.SCHEMATIC_FIELD,
            drop: (item) => {
                handleMoveSchematicField(item, index, rowIndex);
                console.log('drop item', item);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        })
    );

    if (field) {
        return <SchematicField key={field.id} item={field} />
    }

    return (
        <StyledSchematicFieldDummy
            ref={drop}
            style={{ backgroundColor: isOver ? '#ede9fb' : '#fafafa' }}
        >
            {field && (
                <div>{field.title}</div>
            )}

        </StyledSchematicFieldDummy>
    )
}