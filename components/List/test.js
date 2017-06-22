import React from 'react';
import { shallow, mount } from 'enzyme';

import List, { SubList, ListItem, ListOverlay } from '.';
import data from '../../data/list';

describe('<ListItem>', () => {
    it('render list item', () => {
        const selector = shallow(
            <ListItem isActive={Boolean(true)} isLocked={Boolean(true)} />
        );
        expect(selector).toMatchSnapshot();
    });
});

describe('<SubList>', () => {
    it('render sublist', () => {
        const items = data.list.slice(0, 2);
        const current = items.find(item => item.subList && item.subList.length > 0);
        const onClickSubPanel = jest.fn();
        const onSelectItem = jest.fn();
        const selector = shallow(
            <SubList
                activeSubListId={current.id}
                items={items}
                current={current.id}
                onClickSubPanel={onClickSubPanel}
                onSelect={onSelectItem}
            />
        );
        // current selected item has subList will not be collapsable
        expect(selector).toMatchSnapshot();
        expect(selector.find('.AASubList-icon').prop('isCollapsable')).toEqual(false);

        // trigger button will invoke onClickSubPanel callback
        selector.find('.AASubList-btn').at(0).simulate('click');
        expect(onClickSubPanel.mock.calls[0][0]).toBe(current.id);
        expect(onClickSubPanel.mock.calls[0][1]).toBe(current.subList);

        // trigger ListItem will invoke onSelectItem callback
        selector.find('.AASubList-item').at(0).simulate('click');
        expect(onSelectItem).toHaveBeenCalledWith(items[0].id);
    });

    it('renders collapsable icons', () => {
        expect(shallow(<SubList.Icon isCollapsable />)).toMatchSnapshot();
        expect(shallow(<SubList.Icon />)).toMatchSnapshot();
    });
});

describe('<List>', () => {
    it('render list', () => {
        const current = data.list[0];
        const list = data.list.slice(0, 2);
        const onSelectItem = jest.fn();

        const selector = mount(
            <List list={list} current={current.id} onSelect={onSelectItem} />
        );
        const inst = selector.instance();
        inst.overlay = { closeOverlay: jest.fn() };

        const overlay = shallow(selector.find('OverlayTrigger').prop('getOverlay')());
        expect(overlay).toMatchSnapshot();

        // Close overlay on selection
        overlay.find('SubList').prop('onSelect')(list[0].id);
        expect(onSelectItem).toHaveBeenCalledWith(list[0].id);
        expect(inst.overlay.closeOverlay).toHaveBeenCalled();
    });

    it('render list with label', () => {
        const list = [];
        const selector = shallow(
            <List label="Category" list={list} current={null} onSelect={jest.fn()} />
        );

        expect(selector).toMatchSnapshot();
    });
});

describe('<ListOverlay />', () => {
    it('render list with active subList', () => {
        const current = data.list[1].subList[0];

        const list = data.list.slice(0, 2);
        const onSelectItem = jest.fn();
        const selector = shallow(
            <ListOverlay
                list={list}
                current={current.id}
                onSelect={onSelectItem}
                itemWidth={180}
            />
        );
        selector.instance().componentDidMount();

        expect(selector).toMatchSnapshot();
        expect(selector.find('SubList').length).toEqual(2);
    });

    it('toggle subList', () => {
        const list = data.list.slice(0, 2);
        const current = list.find(item => item.subList && item.subList.length > 0);
        const onSelectItem = jest.fn();
        const selector = shallow(
            <ListOverlay
                list={list}
                current={null}
                onSelect={onSelectItem}
                itemWidth={180}
            />
        );

        selector.find('SubList').prop('onClickSubPanel')(current.id, current.subList);
        expect(selector.find('SubList').at(0).prop('activeSubListId')).toEqual(
            current.id
        );
        expect(selector.find('Overlay').exists()).toBe(true);
    });
});
