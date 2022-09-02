import { useState } from 'react';
import { Table, Button, Modal, ModalTitle } from '@admiral-ds/react-ui';
import { CreateFieldForm } from './CreateFieldForm';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableRows, setTableRows] = useState(rowList);

    const handleCreateField = (field: any) => {
        console.log(field);
        setTableRows([...tableRows, {...field, fieldType: 'строка'}]); // TODO Значение брать из компонента Select формы
        setIsModalOpen(false);
    }

    return (
        <div>
            <Table
                rowList={tableRows}
                columnList={columnList}
                greyHeader={true}
            />

            <Button
                style={{ marginTop: 20 }}
                dimension="s"
                onClick={() => setIsModalOpen(true)}
            >
                Создать поле
            </Button>
            {isModalOpen && (
                <Modal
                    dimension="l"
                    onClose={() => setIsModalOpen(false)}
                >
                    <ModalTitle id="modal-title">Поле таблицы</ModalTitle>
                    <CreateFieldForm onCreate={handleCreateField} />
                </Modal>
            )}
        </div>
    )
}