import { Table } from '@admiral-ds/react-ui';
import { availableFieldsDefault } from '../ConstructorPage/mock';


const columnList = [
    {
        name: "fieldName",
        title: "Название",
        width: 350 
    },
    {
        name: "SQLName",
        title: "SQL name",
        width: 250
    },
    {
        name: "fieldType",
        title: "Тип",
        width: 140
    },
    {
        name: "fieldExtra",
        title: "Дополнительно",
        width: 340
    },
];

const rowList = availableFieldsDefault.map((item) => ({
    id: item.id,
    fieldName: item.title,
    SQLName: item.sqlName,
    fieldType: item.type,
    fieldExtra: ''
}));


export const DBTablePage = () => {
    return (
        <div>
            <Table
                rowList={rowList}
                columnList={columnList}
                greyHeader={true}
            />
        </div>
    )
}