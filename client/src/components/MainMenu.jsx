import React from 'react';
import classNames from 'classnames';
import UiActions from '../actions/UiActions';
import {Pages} from '../constants/Constants';

export default class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.selectedItem || Pages.Home
        };
        this.bound = {
            goHome: UiActions.setPage.bind(null, Pages.Home),
            goTransactions:  UiActions.setPage.bind(null, Pages.Transactions),
            goForecasting: UiActions.setPage.bind(null, Pages.Forecasting),
            goBudget: UiActions.setPage.bind(null, Pages.Budget)
        };
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
                    <li className={menuItemClass(Pages.Home)}>
                        <a href="#" className="pure-menu-link"
                            onClick={this.bound.goHome}>Home</a>
                    </li>

                    <li className={menuItemClass(Pages.Transactions)}>
                        <a href="#" className="pure-menu-link"
                           onClick={this.bound.goTransactions}>Transactions</a>
                    </li>

                    <li className={menuItemClass(Pages.Forecasting)}>
                        <a href="#" className="pure-menu-link"
                           onClick={this.bound.goForecasting}>Forecasting</a>
                    </li>

                    <li className={menuItemClass(Pages.Budget)}>
                        <a href="#" className="pure-menu-link"
                           onClick={this.bound.goBudget}>Budget</a>
                    </li>

                </ul>
            </div>
        );
    }
}
