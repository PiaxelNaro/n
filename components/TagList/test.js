import React from 'react';
import { shallow } from 'enzyme';
import TagList, { TagItem, StyledTag } from '.';
import data from '../../data/taglist';

const current = 'ad_revenue';

describe('<TagList>', () => {
    it('render nav (current)', () => {
        const spy = jest.fn();
        const selector = shallow(
            <TagList items={data} current={current} onChange={spy} />
        );
        expect(selector).toMatchSnapshot();
        const TagItems = selector.find('TagItem');
        expect(TagItems.at(0).prop('onClick')).toBeUndefined();
        TagItems.at(1).prop('onClick')(data[1].id);
        expect(spy).toHaveBeenCalledWith(data[1].id);
    });
});

describe('<TagItem>', () => {
    it('render unselected <TagItem>', () => {
        const spy = jest.fn();
        const selector = shallow(
            <TagItem onClick={spy}>
                {data[0].name}
            </TagItem>
        );
        expect(selector).toMatchSnapshot();
        selector.prop('onClick')(data[0].id);
        expect(spy).toHaveBeenCalledWith(data[0].id);
    });

    it('render selected <TagItem>', () => {
        const selector = shallow(
            <TagItem isActive>
                {data[0].name}
            </TagItem>
        );
        expect(selector).toMatchSnapshot();
    });
});

describe('<StyledTag>', () => {
    expect(shallow(<StyledTag />)).toMatchSnapshot();
    expect(shallow(<StyledTag isActive />)).toMatchSnapshot();
});
