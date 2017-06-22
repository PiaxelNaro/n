// @flow
import React from 'react';
import styled from 'styled-components';
import { translate, type I18nType } from '../../modules/i18n';

const Wrapper = styled.div`
    color: #666;
    font-size: 12px;
`;

const RawSelect = styled.select`
    outline: none;
    width: 66px;
    margin: 0 5px;
    padding: 0;
    height: 20px;
    line-height: 20px;
    vertical-align: initial;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #555;
`;

const PageSizeSelector = ({
    options,
    current,
    onSelectionChanged,
    i18n,
}: {
    options: Array<number>,
    current: number,
    onSelectionChanged: number => void,
    i18n: I18nType,
}) =>
    <Wrapper>
        {i18n.gettext('Show rows:')}
        <RawSelect
            value={current}
            onChange={e => onSelectionChanged(parseFloat(e.target.value))}
        >
            {options.map(option =>
                <option key={option} value={option}>
                    {option}
                </option>
            )}
        </RawSelect>
    </Wrapper>;

PageSizeSelector.defaultProps = {
    options: [10, 50, 100, 500, 1000],
};

export { PageSizeSelector as _PageSizeSelector };
export default translate(PageSizeSelector);
