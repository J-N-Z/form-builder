import { useState } from 'react';
import { Table, Button, Modal, ModalTitle } from '@admiral-ds/react-ui';
import { CreateFieldForm } from './CreateFieldForm';
import { availableFieldsDefault } from '../ConstructorPage/mock';


//////////////////////

// const ResizeableContainer = styled.div`
//     position: relative;
//     background-color: lightpink;
//     border: solid red 1px;
// `;

// const DraghandleButton = styled.button`
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     transform: translate(50%, 50%);
// `;


// const Resizeable: FC<any> = ({ children }) => {
//     const [size, setSize] = useState({ x: 400, y: 300 });

//     const handler = (mouseDownEvent: any) => {
//         const startSize = size;
//         const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

//         function onMouseMove(mouseMoveEvent: any) {
//             setSize(currentSize => ({
//                 x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
//                 y: startSize.y - startPosition.y + mouseMoveEvent.pageY
//             }));
//         }
//         function onMouseUp() {
//             document.body.removeEventListener("mousemove", onMouseMove);
//             // uncomment the following line if not using `{ once: true }`
//             // document.body.removeEventListener("mouseup", onMouseUp);
//         }

//         document.body.addEventListener("mousemove", onMouseMove);
//         document.body.addEventListener("mouseup", onMouseUp, { once: true });
//     };

//     return (
//         <ResizeableContainer id="container" style={{ width: size.x, height: size.y }}>
//             <DraghandleButton id="draghandle" type="button" onMouseDown={handler} >Resize</DraghandleButton>
//         </ResizeableContainer>
//     );
// }

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

             {/* <div
                style={{
                    width: 200,
                    height: 50,
                    background: '#bbb',
                    border: '1px solid #ccc',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        height: 9,
                        width: 9,
                        borderRadius: '50%',
                        background: '#444',
                        position: 'absolute',
                        right: -4,
                        top: 23
                    }}
                >
                    
                </div>

            </div>

            <div>
                <Resizeable />
            </div> */}


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