const Component = React.Component;
const PropTypes = React.PropTypes;
const app = document.getElementById('app');
class Tabs extends Component {
    
    constructor(props) {
        super(props);

        const currentProps = this.props;
        let activeIndex = 0;

        if('activeIndex' in currentProps) {
            activeIndex = currentProps.activeIndex;
        } else if('defaultActiveIndex' in currentProps) {
            activeIndex = currentProps.defaultActiveIndex;
        }

        this.state = {
            activeIndex,
            preIndex: activeIndex
        }
        this.handler = this._handler.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex
            })
        }
    }

    _handler(activeIndex) {
        const preIndex = this.state.activeIndex;
        if(this.state.activeIndex!==activeIndex &&
            'defaulteActiveIndex' in this.props
        ) {
            this.setState(
                activeIndex,
                preIndex
            )
        }

        this.props.onChange({activeIndex, preIndex});
    }

    getTabNav() {
        const {classPrefix, children} = this.props;
        return (
            <TabNav
                key='tab-bar'
                onTabClick={this.handler}
                classPrefix={classPrefix}
                panels={children}
                activeIndex={this.state.activeIndex}
            />
        )
    }

    getTabContent() {
        const {classPrefix, children} = this.props;
        return (
            <TabContent
                key = 'tab-content'
                classPrefix = {classPrefix}
                panels = {children}
                activeIndex = {this.state.activeIndex}
            />
        )
    }

    render() {
       const {className} = this.props;
       let classnames = classsNames(className, 'ui-tab')
       return (
           <div className={classnames}>
                {this.getTabNav()}
                {this.getTabContent()}
           </div>    
       )
    }
}

Tabs.defaultProps = {
    classPrefix: 'tabs',
    onChange: () => {}
}

class TabNav extends Component {
    constructor(props) {
        super(props);
    }
    getTabs() {
        const {classPrefix, panels, activeIndex} = this.props;
        
        React.Children.map(panels, (child) => {
            if(!child) return;

            const order = parseInt(child.props.order, 10);

            let classnames = classNames({
                [`${classPrefix}-tab`]: true, 
                [`${classPrefix}-active`]: activeIndex === order, 
                [`${classPrefix}-disabled`]: child.props.disabled,
            });

            let events = {};
            if(!child.props.disabled) {
                events = {
                    onClick: this.props.onTabClick.bind(this, order)
                }
            }
            let ref = {};
            if(activeIndex===order) {
                ref.ref = 'activeTab';
            }
            return (
                <li 
                    role = 'tab'
                    aria-disabled={child.props.disabled ? 'true' : 'false'} 
                    aria-selected={activeIndex === order? 'true' : 'false'}
                    {...events}
                    className={classnames}
                    key={order}
                    {...ref}
                >
                    {child.props.tab}
                </li>
            )
        })
    }

    render() {
        const {classPrefix} = this.props;
        
        const classRoot = classNames({
            [`${classPrefix}-bar`]: true
        });

        const classnames = classNames({
            [`${classPrefix}-nav`]: true
        });

        return (
            <div className={classRoot}>
                <ul className={classnames}>
                    {this.getTabs()}
                </ul>
            </div>
        )
    }
}

class TabContent extends Component {
    getPanels() {
        const {classPrefix, panels, activeIndex} = this.props;

        React.Children.map(panels, (child) => {
            
            return React.cloneElement(child, {

            })
        })
    }
    render() {

    }
}

const tabs = (
<Tabs classPrefix={'tabs'} defaultActiveIndex={0}>
    <TabPane key={0} tab={'Tab 1'}>第一个 Tab 里的内容</TabPane>
    <TabPane key={1} tab={'Tab 2'}>第二个 Tab 里的内容</TabPane>
    <TabPane key={2} tab={'Tab 3'}>第三个 Tab 里的内容</TabPane>
</Tabs>
)

