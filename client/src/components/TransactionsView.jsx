import React from 'react';
import FixedDataTable from 'fixed-data-table';
import TransactionDialog from './TransactionDialog';
import uiActions from '../actions/UiActions';
let time = require('isomorph/time');
let is = require('isomorph/is');
let numeral = require('numeral');

export default class TransactionsView extends React.Component {

    constructor(props) {
        super(props);
    }

    static renderEditCell(cellData,
                          cellDataKey,
                          rowData,
                          rowIndex,
                          columnData,
                          width) {
        let callback = uiActions.editTransaction.bind(null, rowData);
        return (
            <i
                className="fa fa-edit table-button"
                onClick={callback}
            />
        );
    }

    static renderDateCell(cellData,
                   cellDataKey,
                   rowData,
                   rowIndex,
                   columnData,
                   width) {
        if (is.Date(cellData)) {
            let value = time.strftime(cellData, '%m/%d/%Y');
            return (
                <span>{value}</span>
            );
        }
    }

    static renderMoneyCell(cellData) {
        if (is.Number(cellData)) {
            let value = numeral(cellData).format('0,0.00');
            let className = cellData >= 0 ? 'positive-money' : 'negative-money';
            return (
                <span className={className}>{value}</span>
            );
        }
        return null;
    }

    render() {
        var Table = FixedDataTable.Table;
        var Column = FixedDataTable.Column;
        let modal = null;
        if (this.props.currentModal === 'Transaction') {
            modal = (
                <TransactionDialog
                    editTransaction={this.props.editTransaction}
                />
            );
        }

        let rows = this.props.transactions.slice();
        let now = new Date();
        rows.sort((a, b) => {
            return ((a.date ? a.date : now).getTime() - (b.date ? b.date : now).getTime());
        });
        let rowGetter = i => rows[i];

        return (
            <div className="fullsize">
                <div>
                    <button
                        className="pure-button pure-button-primary"
                        onClick={uiActions.addTransaction}>
                        Add Transaction
                    </button>
                </div>
                <Table
                    rowHeight={30}
                    rowGetter={rowGetter}
                    rowsCount={rows.length}
                    width={this.props.width}
                    maxHeight={1000}
                    headerHeight={50}>
                    <Column
                        label="Date"
                        width={100}
                        dataKey="date"
                        cellRenderer={TransactionsView.renderDateCell}
                    />
                    <Column
                        label="Description"
                        width={100}
                        flexGrow={1}
                        dataKey="description"
                    />
                    <Column
                        label="Amount"
                        width={100}
                        dataKey="amount"
                        align="right"
                        cellRenderer={TransactionsView.renderMoneyCell}
                    />
                    <Column
                        label="Edit"
                        width={75}
                        cellRenderer={TransactionsView.renderEditCell}
                        dataKey="id"
                    />
                </Table>
                {modal}
            </div>
        )
    }
}
