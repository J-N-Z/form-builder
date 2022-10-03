import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { TestForm } from './TestForm';

import { ConstructorPage } from './pages/ConstructorPage';
import { DBTablePage } from './pages/DBTablePage';
import { ITAssetPage } from './pages/ITAssetPage';
import { NotfoundPage } from './pages/NotfoundPage';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



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


function App() {
  return (
    <StyledApp>

      <Menu>
        <NavLink to="/">Constructor</NavLink>
        <NavLink to="/DBTable">DBTable</NavLink>
        <NavLink to="/form-builder">Form Builder</NavLink>
        <NavLink to="/it-asset">ИТ-актив</NavLink>
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
        <Route path="/it-asset" element={<ITAssetPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>

    </StyledApp>
  );
}

export default App;
