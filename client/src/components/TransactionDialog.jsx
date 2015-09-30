import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import uiActions from '../actions/UiActions';
import transactionActions from '../actions/TransactionActions';
let forms = require('newforms');

let TransactionForm = forms.Form.extend({
    date: forms.DateField({
        widget: forms.DateInput({format: '%m/%d/%Y'}),
        cssClass: 'pure-control-group short'
    }),
    description: forms.CharField({cssClass: 'pure-control-group'}),
    amount: forms.DecimalField({
        cssClass: 'pure-control-group short',
        decimalPlaces: 2,
        widget: forms.NumberInput()
    })
});

export default class TransactionDialog extends React.Component {

    constructor(props) {
        super(props);
        this.bound = {
            trySaveTransaction: this.trySaveTransaction.bind(this)
        };
    }

    trySaveTransaction(e) {
        e.preventDefault();

        let form = this.refs.transactionForm.getForm();
        let isValid = form.validate();
        console.log('isValid ' + isValid);

        if (!isValid) {
            return;
        }

        // wait for the operation to finish
        let token = uiActions.startWaiting();
        let info = form.cleanedData;

        if (this.props.editTransaction) {
            let transaction = Object.assign({}, this.props.editTransaction, info);
            transactionActions.update(token, transaction);
        } else {
            transactionActions.create(token, info);
        }
    }

    /**
     * @return {object}
     */
    render() {
        let transaction = this.props.editTransaction || {
                id: null,
                date: new Date(),
                description: null,
                amount: null
            };

        let title = (
            <h3>Add A Transaction</h3>
        );
        if (this.props.editTransaction) {
            title = (
                <h3>Edit Transaction</h3>
            );
        }

        return (
            <div>
                <ModalContainer>
                    <ModalDialog
                        width={700}>
                        <button
                            className="close-btn"
                            onClick={uiActions.closeModal}>
                            <i className="fa fa-close"></i>
                        </button>
                        {title}
                        <form
                            className="pure-form pure-form-aligned">

                            <forms.RenderForm
                                labelSuffix=""
                                form={TransactionForm}
                                data={transaction}
                                ref="transactionForm"/>

                            <div className="pure-controls">
                                <button
                                    className="pure-button pure-button-primary"
                                    onClick={this.bound.trySaveTransaction}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </ModalDialog>
                </ModalContainer>
            </div>
        );
    }
}
