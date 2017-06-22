// @flow
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import ChevronRightIcon from 'react-icons/lib/md/chevron-right';
import Text from '../Text';
import FlexGrid from '../FlexGrid';
import Button from '../Button';
import Overlay from '../Overlay';
import DropdownButton from '../Button/Dropdown';

type ChoiceList = Array<{ id: string, title: string, subList?: ChoiceList }>;

/**
 * get id form list
 */
function getTitleById(list: ChoiceList, id: string): string {
    const result = list
        .reduce((memo, item) => {
            memo.push({
                id: item.id,
                title: item.title,
            });
            if (item.subList) {
                memo.push(...item.subList);
            }
            return memo;
        }, [])
        .find(item => item.id === id);
    return result ? result.title : '';
}

/**
 * <ListItem/>
 * The basic item component
 * @param {boolean} isActive
 */
const ListItem = styled.a.attrs({
    className: props =>
        classnames({
            'is-active': props.isActive,
            'is-locked': props.isLocked,
        }),
})`
    display: block;
    padding: 5px;
    line-height: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
    border-left: 1px solid rgba(255, 255, 255, 0.6);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    /* default */
    cursor: pointer;
    background-color: #F6F6F6;
    &:hover,
    &:focus {
        color: #333;
        background-color: #EFEFEF;
    }
    &.is-active {
        color: #FFF;
        background-color: #1F3149;
        border: 1px solid #1F3149;
        &:hover,
        &:focus {
            color: #FFF;
            background: #1F3149;
        }
    }
    &.is-locked {
        &:hover,
        &:focus {
            color: #BBB;
            background-color: #EFEFEF;
            cursor: default;
        }
    }
`;
ListItem.displayName = 'ListItem';

/**
 * <SubList/>
 * @param {Array}       items
 * @param {Object}      current             active item
 * @param {String}      activeSubListId     check expand/collapse subList
 * @param {Function}    onSelect            click item and callback
 * @param {Function}    onClickSubPanel     toggle subList icon and callback
 */
const SubList = ({
    items,
    current,
    activeSubListId,
    onSelect,
    onClickSubPanel,
}: {
    items: ChoiceList,
    current: string,
    activeSubListId?: string,
    onSelect: string => void,
    onClickSubPanel?: (string, ChoiceList) => void,
}) => {
    const list = items.map(item => {
        let icon;
        if (item.subList) {
            const isCollapsable = item.id !== activeSubListId;
            icon = (
                <Button.Blank
                    className="AASubList-btn"
                    onClick={() => onClickSubPanel(item.id, item.subList)}
                >
                    <SubList.Icon
                        className="AASubList-icon"
                        isCollapsable={isCollapsable}
                    >
                        <ChevronRightIcon size={16} />
                    </SubList.Icon>
                </Button.Blank>
            );
        }
        return (
            <FlexGrid key={item.id}>
                <FlexGrid.Item flex={1}>
                    <ListItem
                        isActive={item.id === current}
                        onClick={() => onSelect(item.id)}
                        className="AASubList-item"
                    >
                        <Text ellipsis>{item.title}</Text>
                    </ListItem>
                </FlexGrid.Item>
                <FlexGrid.Item flex={0}>
                    {icon}
                </FlexGrid.Item>
            </FlexGrid>
        );
    });
    return <div> {list} </div>;
};

SubList.Icon = styled.div`
    width: 40px;
    padding: 5px;
    text-align: left;
    background: ${props => (props.isCollapsable ? 'rgb(246, 246, 246)' : '#AAA')};
    color: ${props => (props.isCollapsable ? '#1F3149' : '#FFF')};
`;

const AAList = styled(FlexGrid)`
    padding: 10px;
    background: url(/static/list-bg.png) repeat-x;
    align-items: flex-start;
`;

/**
 * <ListOverlay />
 * @param {Object}      current     current active list item
 * @param {Array}       list
 * @param {Function}    onSelect    toggle item and callback
 * @param {Number}      itemWidth   item width
 */
class ListOverlay extends React.Component {
    props: {
        current: string,
        list: ChoiceList,
        onSelect: string => void,
        itemWidth: number,
    };

    state: {
        activeSubListId: string,
        subList: ChoiceList,
    };

    onClickSubPanel: Function;
    onSelectItem: Function;
    overlay: { closeOverlay: () => void };

    constructor() {
        super();
        this.state = {
            activeSubListId: '',
            subList: [],
        };
        this.onClickSubPanel = this.onClickSubPanel.bind(this);
        this.onSelectItem = this.onSelectItem.bind(this);
    }

    componentDidMount() {
        this.props.list.map(item => {
            if (item.subList && item.subList.find(sub => sub.id === this.props.current)) {
                this.setState({
                    activeSubListId: item.id,
                    subList: item.subList,
                });
            }
        });
    }

    onSelectItem(id: string) {
        this.props.onSelect(id);
        this.setState({
            activeSubListId: '',
            subList: [],
        });
    }

    onClickSubPanel(id: string, list: ChoiceList) {
        this.setState({
            activeSubListId: id,
            subList: list,
        });
    }

    render() {
        const { current, list, itemWidth } = this.props;

        let subPanel;
        if (this.state.subList.length) {
            subPanel = (
                <div style={{ width: itemWidth }}>
                    <SubList
                        items={this.state.subList}
                        current={current}
                        onSelect={this.onSelectItem}
                    />
                </div>
            );
        }

        return (
            <Overlay>
                <AAList gutter="5px">
                    <div style={{ width: itemWidth }}>
                        <SubList
                            items={list}
                            current={current}
                            onSelect={this.onSelectItem}
                            onClickSubPanel={this.onClickSubPanel}
                            activeSubListId={this.state.activeSubListId}
                        />
                    </div>
                    {subPanel}
                </AAList>
            </Overlay>
        );
    }
}

class List extends React.Component {
    props: {
        current: string,
        label?: string,
        labelIcon?: any,
        list: ChoiceList,
        onSelect: string => void,
        itemWidth: number,
    };

    onSelectItem: Function;
    overlay: { closeOverlay: () => void };

    constructor() {
        super();

        this.onSelectItem = this.onSelectItem.bind(this);
    }

    onSelectItem(id: string) {
        this.overlay.closeOverlay();
        this.props.onSelect(id);
    }

    render() {
        const { current, label, labelIcon, list, itemWidth } = this.props;
        const title = getTitleById(list, current);

        return (
            <Overlay.Trigger
                trigger="click"
                ref={ref => (this.overlay = ref)}
                getOverlay={() =>
                    <ListOverlay
                        current={current}
                        list={list}
                        onSelect={this.onSelectItem}
                        itemWidth={itemWidth}
                    />}
            >
                <DropdownButton label={label} labelIcon={labelIcon} value={title} />
            </Overlay.Trigger>
        );
    }
}

export default List;
export { SubList, ListItem, ListOverlay };
