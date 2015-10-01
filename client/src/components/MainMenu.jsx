import React from 'react';
import classNames from 'classnames';
import UiActions from '../actions/UiActions';

export default class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.selectedItem || 'Home'
        };
        this.homeClicked = UiActions.setPage.bind(null, 'Home');
        this.imagesClicked = UiActions.setPage.bind(this, 'Images');
        this.buttonsClicked = UiActions.setPage.bind(this, 'Buttons');
        this.transactionsClicked = UiActions.setPage.bind(this, 'Transactions');
    }

    /**
     * @return {object}
     */
    render() {
        console.log('render Menu');
        let selectedItem = this.props.selectedItem;

        function menuItemClass(name, divider=false) {
            let cname = classNames('pure-menu-item',
                {'pure-menu-selected': selectedItem === name},
                {'menu-item-divided': divider}
            );
            return cname;
        }

        return (
            <div className="pure-menu mainmenu">
                <a className="pure-menu-heading" href="#">My Finances</a>

                <ul className="pure-menu-list">
                    <li className={menuItemClass('Home')}>
                        <a href="#" className="pure-menu-link"
                            onClick={this.homeClicked}>Home</a>
                    </li>

                    <li className={menuItemClass('Transactions')}>
                        <a href="#" className="pure-menu-link"
                           onClick={this.transactionsClicked}>Transactions</a>
                    </li>

                    <li className={menuItemClass('Images', true)}>
                        <a href="#" className="pure-menu-link"
                           onClick={this.imagesClicked}>Images</a>
                    </li>

                    <li className={menuItemClass('Buttons')}>
                        <a href="#" className="pure-menu-link"
                           onClick={this.buttonsClicked}>Buttons</a>
                    </li>

                </ul>
            </div>
        );
    }
}
