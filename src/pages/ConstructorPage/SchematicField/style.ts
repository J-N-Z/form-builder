import styled from 'styled-components';

export const StyledSchematicField = styled.div`
    /* display: inline-flex; */
    height: 49px;
    background-color: #ede9fb;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    position: relative;
    cursor: move;
`;

export const Title = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Type = styled.div`
    font-size: 11px;
    position: absolute;
    bottom: 2px;
    left: 9px;
`;