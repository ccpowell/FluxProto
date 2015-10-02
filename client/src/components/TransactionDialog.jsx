import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import uiActions from '../actions/UiActions';
import transactionActions from '../actions/TransactionActions';
import FormattingNumberInput from '../widgets/FormattingNumberInput';
let forms = require('newforms');


export default class TransactionDialog extends React.Component {

    constructor(props) {
        super(props);
        this.bound = {
            trySaveTransaction: this.trySaveTransaction.bind(this),
            onFormChange: this.onFormChange.bind(this)
        };

        let accountToClass = 'hidden';
        let accountToRequired = false;
        let transaction = null;
        let initialTransaction = {
            date: new Date()
        };
        let title = (
            <h3>Add A Transaction</h3>
        );

        if (this.props.editTransaction) {
            title = (
                <h3>Edit Transaction</h3>
            );
            transaction = this.props.editTransaction;
            initialTransaction = null;

            if (transaction.category === 'Transfer') {
                accountToClass = 'pure-control-group';
                accountToRequired = true;
            }
        }

        let accountChoices = this.props.userProfile.accounts.map(a => [a, a]);
        accountChoices.unshift([null, '']);
        let categoryChoices = this.props.userProfile.categories.map(c => [c, c]);
        categoryChoices.unshift([null, '']);
        let tagChoices = this.props.userProfile.tags.map(t => [t, t]);
        let TransactionForm = forms.Form.extend({
            date: forms.DateField({
                widget: forms.DateInput({format: '%m/%d/%Y'}),
                cssClass: 'pure-control-group short'
            }),
            description: forms.CharField({
                cssClass: 'pure-control-group'
            }),
            amount: forms.DecimalField({
                cssClass: 'pure-control-group short',
                decimalPlaces: 2,
                widget: FormattingNumberInput()
            }),
            category: forms.ChoiceField({
                choices: categoryChoices,
                cssClass: 'pure-control-group',
                required: false
            }),
            accountFrom: forms.ChoiceField({
                label: 'From',
                choices: accountChoices,
                cssClass: 'pure-control-group'
            }),
            accountTo: forms.ChoiceField({
                label: 'To',
                choices: accountChoices,
                cssClass: accountToClass,
                required: accountToRequired
            }),
            tags: forms.MultipleChoiceField({
                choices: tagChoices,
                required: false,
                cssClass: 'pure-control-group'
            })
        });


        this.state = {
            form: TransactionForm,
            transaction,
            initialTransaction,
            title
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
        if (info.category === 'Transfer') {
            info.accountTo = null;
        }

        if (this.props.editTransaction) {
            let transaction = Object.assign({}, this.props.editTransaction, info);
            transactionActions.update(token, transaction);
        } else {
            transactionActions.create(token, info);
        }
    }

    onFormChange() {
        console.log('form changed');
        let form = this.refs.transactionForm.getForm();
        if (form.cleanedData.category === 'Transfer') {
            form.fields.accountTo.cssClass = 'pure-control-group';
            form.fields.accountTo.required = true;
        } else {
            form.fields.accountTo.cssClass = 'hidden';
            form.fields.accountTo.required = false;
        }
        this.forceUpdate();
    }

    /**
     * @return {object}
     */
    render() {
        console.log('render TransactionDialog');

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
                        {this.state.title}
                        <form
                            className="pure-form pure-form-aligned">

                            <forms.RenderForm
                                controlled={true}
                                onChange={this.bound.onFormChange}
                                labelSuffix=""
                                form={this.state.form}
                                data={this.state.transaction}
                                initial={this.state.initialTransaction}
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
