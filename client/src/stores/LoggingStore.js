/**
 * UI state
 */

import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';

class LoggingStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
    }
    __onDispatch(action) {
        console.log(action);
    }
}

export default new LoggingStore(AppDispatcher);