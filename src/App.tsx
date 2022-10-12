import { useState, createContext } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { TestForm } from './TestForm';
import { ToastProvider, Toast } from '@admiral-ds/react-ui';

import { ConstructorPage } from './pages/ConstructorPage';
import { DBTablePage } from './pages/DBTablePage';
import { ITAssetsPage } from './pages/ITAssetsPage';
import { ITAssetPage } from './pages/ITAssetPage';
import { CreateITAssetPage } from './pages/CreateITAssetPage';
import { NotfoundPage } from './pages/NotfoundPage';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { statusOptions, ITAssetsFull } from './data/ITAssets';



const StyledApp = styled.div`
  height: 100%;
  padding: 0 15px;
  background: #f2f4f8;
`;

const Menu = styled.nav`
  display: flex;
  justify-content: center;
  width: calc(100% + 30px);
  margin-left: -15px;
  padding: 15px;
  margin-bottom: 16px;
  background: #fff;
  border-bottom: 1px solid #e4e9f0;

  a {
    display: inline-flex;
    padding: 5px 10px;
    text-decoration: none;
    color: #b1abd3;
    font-size: 16px;
    font-weight: 700;

    &.active {
      color: #5b5770;
    }
  }
`;

const defaultState = ITAssetsFull;

const TOAST_AUTO_CLOSE_DELAY = 5000;
const TOAST_Z_INDEX = 99;

interface AppContext {
  data: any;
  handleAddItem: (newItem: any) => void;
  handleDeleteItem: (id: number) => void;
  handleSaveItem: (id: number, formFields: any) => void;
}

export const AppContext = createContext<AppContext>({
  data: [],
  handleAddItem: () => { },
  handleDeleteItem: () => { },
  handleSaveItem: () => { },
});


function App() {
  const [data, setData] = useState(defaultState);

  const handleAddItem = (newItem: any) => {
    const newData = [...data, newItem];
    setData(newData);
  }

  const handleDeleteItem = (id: number) => {
    const newData = [...data].filter((item: any) => item.id !== id);
    setData(newData);
  }

  const handleSaveItem = (id: number, formFields: any) => {
    const newData = [...data];
    const targetItem = newData.find((item: any) => item.id === id);
    if (targetItem) {
      targetItem.mainForm = formFields;
    }
    setData(newData);
  }

  return (
    <AppContext.Provider value={{ data, handleAddItem, handleDeleteItem, handleSaveItem }}>
      <ToastProvider autoDeleteTime={TOAST_AUTO_CLOSE_DELAY}>
        <StyledApp>

          <Menu>
            <NavLink to="/">Constructor</NavLink>
            <NavLink to="/DBTable">DBTable</NavLink>
            <NavLink to="/form-builder">Form Builder</NavLink>
            <NavLink to="/it-assets">ИТ-активы</NavLink>
          </Menu>

          <Routes>
            <Route path="/" element={
              <DndProvider backend={HTML5Backend}>
                <ConstructorPage />
              </DndProvider>
            }
            />
            <Route path="/DBTable" element={<DBTablePage />} />
            <Route path="/form-builder" element={<TestForm />} />
            <Route path="/it-assets" element={<ITAssetsPage />} />
            <Route path="/it-assets/:id" element={<ITAssetPage />} />
            <Route path="/it-assets/new" element={<CreateITAssetPage />} />
            <Route path="*" element={<NotfoundPage />} />
          </Routes>

          <Toast position="bottom-right" style={{ zIndex: TOAST_Z_INDEX }} />

        </StyledApp>
      </ToastProvider>
    </AppContext.Provider>
  );
}

export default App;
