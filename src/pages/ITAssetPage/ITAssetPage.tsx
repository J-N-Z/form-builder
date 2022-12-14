import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import { Button, TabMenu, Spinner, Modal, ModalTitle, T, useToast } from '@admiral-ds/react-ui';
import { CustomSchemaField } from '../../types';
import { FormBuilderCustom } from '../../components/FormBuilderCustom';
import { SoftwareInstances } from './TabsContent/SoftwareInstances';
import { TechInfo } from './TabsContent/TechInfo';
// import { getITAsset } from '../../services/ITAssetService';
import { SpinnerWrap } from '../../components/styled/SpinnerWrap';
import { AppContext } from '../../App';
import { getToastObj } from '../../helper';


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Section = styled.div`
    padding: 20px;
    background: #fff;
`;

const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

const ModalButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
`;

const gridSchemaCustom = [
    [
        {
            id: 'itemID',
            width: 1
        },
    ],
    [
        {
            id: 'fullName',
            width: 2
        },
        {
            id: 'amount',
            width: 1
        },
    ],
    [
        {
            id: 'date',
            width: 1
        },
        {
            id: 'status',
            width: 1
        },
    ],
    [
        {
            id: 'description',
            width: 4
        },
    ]
];

enum TabContent {
    Main = '1',
    SoftwareInstances = '2',
    TechInfo = '3'
}

export const ITAssetPage = () => {
    const [formFields, setFormFields] = useState<CustomSchemaField[]>([]);
    const [activeTabId, setActiveTabId] = useState<string>(TabContent.Main);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    let { id } = useParams();
    const { data, handleDeleteItem, handleSaveItem } = useContext(AppContext);
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        // ?????????????????? ???????????? ???? ????????
        // getITAsset(id)
        //     .then((res: any) => { // TODO ?????????????????? ???????????????????? ??????
        //         console.log('res', res);
        //         setFormFields(res.mainForm);
        //         setIsLoading(false);
        //     })
        //     .catch((error: string) => {
        //         console.log(error);
        //         setIsLoading(false);
        //     });

        // ?????????????????? ???????????? ???? ??????????????????
        setTimeout(() => {
            if (id !== undefined) {
                const res = data.find((item: any) => item.id === Number(id));
                if (res) {
                    setFormFields(res.mainForm);
                    setIsLoading(false);
                } else {
                    addToast(getToastObj('????????????', `????-???????????? ?? id=${id} ???? ????????????????????`, 'error')); // TODO ?????????????????? ?????????????????? ????????????, ?????????????
                    setIsLoading(false);
                }
            } else {
                addToast(getToastObj('????????????', '', 'error'));
                setIsLoading(false);
            }
        }, 500);
    }, []);

    const handleChange = (id: string, value: any) => {
        const newFormFields = [...formFields];

        newFormFields.forEach((field) => {
            if (field.id === id) {
                field.value = value;
            }
        });

        setFormFields(newFormFields);
    }

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (id !== undefined) {
                handleSaveItem(Number(id), formFields);
                addToast(getToastObj('??????????????????', '????-?????????? ????????????????', 'success'));
            }
            setIsLoading(false);
        }, 500);
    }

    const handleDelete = (id: string) => {
        setIsLoading(true);
        setTimeout(() => {
            handleDeleteItem(Number(id));
            setIsDeleteModalOpen(false);
            setIsLoading(false);
            addToast(getToastObj('??????????????', '????-?????????? ????????????', 'success'));
            navigate(`/it-assets`);
        }, 500);
    }

    const handleSubmit = () => {
        const dataToServer = formFields.map((field) => ({ id: field.id, value: field.value }));
        console.log('dataToServer', dataToServer);
    }

    const tabs = [
        {
            content: '??????????',
            id: TabContent.Main
        },
        {
            content: '???????????????????? ????',
            id: TabContent.SoftwareInstances
        },
        {
            content: '??????.????????',
            id: TabContent.TechInfo
        },
    ];

    const getTabContent = () => {
        switch (activeTabId) {
            case TabContent.Main: {
                return <div>??????????</div>
            }

            case TabContent.SoftwareInstances: {
                return <SoftwareInstances />
            }

            case TabContent.TechInfo: {
                return <TechInfo />
            }

            default: {
                return null;
            }
        }
    }

    const title = formFields.find((field: any) => field.id === 'fullName')?.value;

    return (
        <div>

            {
                isLoading
                    ? (
                        <SpinnerWrap>
                            <Spinner dimension="l" />
                        </SpinnerWrap>
                    )
                    : !!formFields.length && (
                        <>
                            <Section style={{ marginBottom: 20 }}>
                                
                                <Header>
                                    <T font="Header/H5" as="h1">{title}</T>

                                    <ButtonWrap>
                                        <Button
                                            style={{ marginTop: 20 }}
                                            dimension="s"
                                            appearance="danger"
                                            onClick={() => setIsDeleteModalOpen(true)}
                                        >
                                            ?????????????? ????????????
                                        </Button>
                                        <Button
                                            style={{ marginTop: 20 }}
                                            dimension="s"
                                            appearance="secondary"
                                            onClick={() => handleSave()}
                                        >
                                            ?????????????????? ??????????????????
                                        </Button>
                                    </ButtonWrap>
                                </Header>

                                <FormBuilderCustom
                                    schema={formFields}
                                    gridSchema={gridSchemaCustom}
                                    onChange={handleChange}
                                />
                                {/* <Button
                                                style={{ marginTop: 20 }}
                                                dimension="s"
                                                onClick={handleSubmit}
                                            >
                                                ??????????????????
                                            </Button> */}
                            </Section>

                            <Section>
                                <TabMenu
                                    activeTab={activeTabId}
                                    tabs={tabs}
                                    onChange={setActiveTabId}
                                />

                                <div style={{ marginTop: 20 }}>
                                    {getTabContent()}
                                </div>
                            </Section>

                            {isDeleteModalOpen && (
                                <Modal
                                    dimension="l"
                                    style={{ textAlign: 'center' }}
                                    onClose={() => setIsDeleteModalOpen(false)}
                                >
                                    <ModalTitle>???? ???????????????</ModalTitle>
                                    <p>???? ?????????????????????????? ???????????? ?????????????? ???????????? ????????????? <br />???????????? ???????????????? ????????????????????.</p>
                                    <ModalButtonWrap>
                                        <Button
                                            dimension="m"
                                            appearance="secondary"
                                            onClick={() => setIsDeleteModalOpen(false)}
                                        >
                                            ????????????
                                        </Button>
                                        <Button
                                            dimension="m"
                                            appearance="danger"
                                            onClick={() => handleDelete(id || '')}
                                        >
                                            ??????????????
                                        </Button>
                                    </ModalButtonWrap>
                                </Modal>
                            )}
                        </>
                    )
            }

        </div>
    )
}