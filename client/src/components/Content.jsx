import React from 'react';
import TransactionsView from './TransactionsView';

export default class Content extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * @return {object}
     */
    render() {
        console.log('render Content');
        if (this.props.selectedPage === 'Images') {
            return (
                <div className="content">
                    <h2>Images</h2>

                    <div className="pure-g">
                        <div className="pure-u-1-4">
                            <img className="pure-img-responsive"
                                 src="http://farm3.staticflickr.com/2875/9069037713_1752f5daeb.jpg"
                                 alt="Peyto Lake"/>
                        </div>
                        <div className="pure-u-1-4">
                            <img className="pure-img-responsive"
                                 src="http://farm3.staticflickr.com/2813/9069585985_80da8db54f.jpg"
                                 alt="Train"/>
                        </div>
                        <div className="pure-u-1-4">
                            <img className="pure-img-responsive"
                                 src="http://farm6.staticflickr.com/5456/9121446012_c1640e42d0.jpg"
                                 alt="T-Shirt Store"/>
                        </div>
                        <div className="pure-u-1-4">
                            <img className="pure-img-responsive"
                                 src="http://farm8.staticflickr.com/7357/9086701425_fda3024927.jpg"
                                 alt="Mountain"/>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.props.selectedPage === 'Buttons') {
            return (
                <div className="content">

                    <h2>Buttons</h2>

                    <div>
                        <button className="pure-button pure-button-primary">
                            <i className="fa fa-television"></i>
                            Push It!
                        </button>
                    </div>
                </div>
            );
        }

        if (this.props.selectedPage === 'Transactions') {
            return (
                <div className="content">
                    <h2>Current Transactions</h2>
                    <TransactionsView
                        userProfile={this.props.userProfile}
                        width={this.props.sizes.bottomWidth - 20}
                        height={this.props.sizes.bottomHeight - 125}
                        transactions={this.props.transactions}
                        transactionsId={this.props.transactionsId}
                    />
                </div>
            );
        }
        return null;
    }
}
