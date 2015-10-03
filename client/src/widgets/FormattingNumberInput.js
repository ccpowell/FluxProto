'use strict';

let TextInput = require('newforms/TextInput');
let numeral = require('numeral');
let is = require('isomorph/is')

/**
 * An HTML <input type="number"> widget.
 * @constructor
 * @extends {TextInput}
 * @param {Object=} kwargs
 */
var FormattingNumberInput = TextInput.extend({
    constructor: function FormattingNumberInput(kwargs) {
        if (!(this instanceof FormattingNumberInput)) {
            return new FormattingNumberInput(kwargs)
        }
        TextInput.call(this, kwargs);
    },

    inputType: 'number',

    // we only format the initial time, when this is a number
    _formatValue(value) {
        if (is.Number(value)) {
            return numeral(value).format('0,0.00');
        }
        return value;
    }
});

module.exports = FormattingNumberInput;