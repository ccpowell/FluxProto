/**
 * Created by chris_000 on 9/13/2015.
 */
/**
 * @class TodoModel
 * @property {string} id ID
 * @property {string} text what to do
 * @property {boolean} complete if it is
 */
export default class TodoModel {
    constructor(text) {
        this.id = null;
        this.text = text;
        this.complete = false;
    }
}