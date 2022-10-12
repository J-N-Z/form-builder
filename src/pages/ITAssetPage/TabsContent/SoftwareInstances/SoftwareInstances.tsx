import { Table } from '@admiral-ds/react-ui';


const columnList = [
    {
        name: "fullName",
        title: "Полное имя",
        width: 400
    },
    {
        name: "amount",
        title: "Кол-во пунктов"
    },
    {
        name: "settingDate",
        title: "Дата установки"
    },
    {
        name: "lastUsingDate",
        title: "Дата последнего использования"
    },
    {
        name: "installationDirectory",
        title: "Папка установки"
    },
];

const rowList = [
    {
        id : "1",
        fullName: 'Microsoft Windows Server 2016 Datacenter v.10',
        amount: '1',
        settingDate: '01.01.2000',
        lastUsingDate: '01.01.2000',
        installationDirectory: 'C:\Windows'
    }
];


export const SoftwareInstances = () => {

    return (
        <div>
            <Table
                columnList={columnList}
                rowList={rowList}
            />
        </div>
    )
}