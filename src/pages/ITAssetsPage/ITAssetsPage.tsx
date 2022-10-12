import { useState, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { Table, T, Button, Spinner } from '@admiral-ds/react-ui';
// import { ITAssets } from '../../data/ITAssets';
// import { getITAssets } from '../../services/ITAssetService';
import { AppContext } from '../../App';
import { SpinnerWrap } from '../../components/styled/SpinnerWrap';


const Wrap = styled.div`
    .tbody .tr-simple {
        cursor: pointer;
    }

    .tbody .tr-simple:hover > div {
        transition: background .4s ease-out;
    }

    .tbody .tr-simple:hover > div {
        background: #efeded !important;
    }
`;

const ButtonWrap = styled.div`
    display: flex;
`;

const columnList = [
    {
        name: "fullName",
        title: "Полное имя",
        width: 260
    },
    // {
    //     name: "category",
    //     title: "Категория",
    // },
    {
        name: "status",
        title: "Статус",
        width: 150
    },
    {
        name: "id",
        title: "ID записи",
    },
];


export const ITAssetsPage = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [ITAssets, setITAssets] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const appContextValue = useContext(AppContext);

    const assets = appContextValue.data.map((item: any) => {
        const fullName = item.mainForm.find((field: any) => field.id === 'fullName')?.value;
        const status = item.mainForm.find((field: any) => field.id === 'status')?.value.title;

        return {
            id: item.id,
            fullName,
            status,
        }
    });

    // useEffect(() => {
    //     getITAssets()
    //         .then((res: any) => {
    //             const assets = res.map((item: any) => {
    //                 const fullName = item.mainForm.find((field: any) => field.id === 'fullName')?.value;
    //                 const status = item.mainForm.find((field: any) => field.id === 'status')?.value.title;

    //                 return {
    //                     id: item.id,
    //                     fullName,
    //                     status,
    //                 }
    //             });

    //             setITAssets(assets);
    //             setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             setIsLoading(false);
    //         });
    // }, []);

    const handleRowClick = (rowId: string | number) => navigate(`${pathname}/${rowId}`);

    const handleCreateITAsset = () => navigate(`${pathname}/new`);

    return (
        <Wrap>
            <T font="Header/H5" as="h1">ИТ-активы</T>

            {
                isLoading
                    ? (
                        <SpinnerWrap>
                            <Spinner dimension="l" />
                        </SpinnerWrap>
                    )
                    : (
                        <>
                            <ButtonWrap>
                                <Button
                                    style={{ marginBottom: 16, marginLeft: 'auto' }}
                                    dimension="s"
                                    onClick={handleCreateITAsset}
                                >
                                    Новая запись
                                </Button>
                            </ButtonWrap>

                            <Table
                                className="it-assets-table"
                                rowList={assets}
                                columnList={columnList}
                                greyHeader={true}
                                onRowClick={handleRowClick}
                            />
                        </>
                    )
            }
        </Wrap>
    )
}