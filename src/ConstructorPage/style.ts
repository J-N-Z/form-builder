import styled, { css } from 'styled-components';

const sectionStyle = css`
    padding: 15px;
    background: #fff;
`;

export const StyledConstructorPage = styled.div`
    display: flex;
    gap: 15px;
`;

export const AvailableFieldsSection = styled.div`
    flex-basis: 25%;
    ${sectionStyle}
`;

export const DesignerSection = styled.div`
    flex-grow: 1;
    ${sectionStyle}
`;

export const SectionTitle = styled.div`
    margin-bottom: 24px;
    font-size: 16px;
`;

export const StyledSchematicFieldDummyWrap = styled.div`
    flex-basis: 25%;
    height: 49px;
`;

export const SchematicFieldDummyRow = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
`;