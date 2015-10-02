'use strict';

var TextInput = require('newforms/TextInput');
let numeral = require('numeral');

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

    // it may not be a valid number, so we try to convert it
    // if nfg, just return the value
    _formatValue(value) {
        let parsed = parseFloat(value);
        if (parsed !== NaN) {
            return numeral(parsed).format('0,0.00');
        }
        return value;
    }
});

module.exports = FormattingNumberInput;