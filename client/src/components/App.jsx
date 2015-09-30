import React from 'react';
import {Container} from 'flux/utils';
import * as _ from 'lodash';

import transactionStore from '../stores/TransactionStore';
import uiStore from '../stores/UiStore';
import loggingStore from '../stores/LoggingStore';
import transactionActions from '../actions/TransactionActions';
import uiActions from '../actions/UiActions';

import Content from './Content';
import Header from './Header';
import MainMenu from './MainMenu';
import Login from './Login';

class App extends React.Component {
    static getStores() {
        return [transactionStore, uiStore];
    }

    static calculateState(prevState) {
        let uiState = uiStore.getState();
        return {
            isLoggedIn: uiState.userId != null,
            userId: uiState.userId,
            transactions: transactionStore.getAll(),
            currentPage: uiState.currentPage,
            currentModal: uiState.currentModal,
            editTransaction: uiState.editTransaction,
            sizes: uiState.sizes
        };
    }

    constructor() {
        super();
        this.bound = {
            handleResize: App.handleResize.bind(this)
        }
    }

    static handleResize() {
        console.log('handleResize');
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let menuWidth = 150;
        let topHeight = 350;
        let sizes = {
            windowWidth,
            windowHeight,
            menuWidth,
            menuHeight: windowHeight,
            topWidth: windowWidth - menuWidth,
            topHeight,
            bottomWidth: windowWidth - menuWidth,
            bottomHeight: windowHeight - topHeight
        };
        uiActions.setWindowSizes(sizes);
    }

    componentDidMount() {
        App.handleResize();
        window.addEventListener('resize', this.bound.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.bound.handleResize);
    }

    /**
     * @return {object}
     */
    render() {
        if (this.state.isLoggedIn) {
            return (
                <div>
                    <MainMenu
                        selectedItem={this.state.currentPage}>
                    </MainMenu>

                    <Header>
                    </Header>

                    <Content
                        sizes={this.state.sizes}
                        transactions={this.state.transactions}
                        currentModal={this.state.currentModal}
                        editTransaction={this.state.editTransaction}
                        selectedPage={this.state.currentPage}>
                    </Content>
                </div>
            );
        } else {
            return (
                <Login/>
            );
        }
    }
}

export default Container.create(App);

