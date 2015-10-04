import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import uiActions from '../actions/UiActions';
import * as _ from 'lodash';

export default class EditDialog extends React.Component {

    constructor(props) {
        super(props);
        this.bound = {
            onTagTextChanged: this.onTagTextChanged.bind(this),
            addTag: this.addTag.bind(this),
            saveTags: this.saveTags.bind(this)
        };
        this.state = {
            newTag: '',
            newTagValid: false,
            tags: this.props.tags
        };
    }

    removeTag(tag, event) {
        event.preventDefault();
        this.setState({
            tags: _.reject(this.state.tags, t => (t === tag))
        });
    }

    onTagTextChanged(event) {
        event.preventDefault();
        let newTag = (event.target.value || '').match(/[a-z0-9]/gi).join('');
        let newTagValid = newTag && newTag.length > 1 && !_.any(this.state.tags, t => (t === newTag));
        this.setState({newTag, newTagValid});
    }

    addTag(event) {
        event.preventDefault();
        let newTag = this.state.newTag;
        let newTagValid = newTag && newTag.length > 1 && !_.any(this.state.tags, t => (t === newTag));
        if (newTagValid) {
            this.setState({
                newTag: '',
                newTagValid: false,
                tags: this.state.tags.concat([newTag])
            });
        }
    }

    saveTags(event) {
        event.preventDefault();
        let token = uiActions.startWaiting();
        uiActions.updateTags(token, this.state.tags);
    }

    /**
     * @return {object}
     */
    render() {
        console.log('render EditDialog');
        let currentTags = this.state.tags.map(t => {
            let removeTag = this.removeTag.bind(this, t);
            return (
                <div key={t} className="pure-u-1">
                    <div className="current-tag pure-u-20-24">
                        {t}
                    </div>
                    <div className="pure-u-4-24"
                         onClick={removeTag}>
                        <i className="fa fa-remove table-button"/>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <ModalContainer>
                    <ModalDialog
                        width={300}>
                        <button
                            className="close-btn"
                            onClick={uiActions.closeModal}>
                            <i className="fa fa-close"></i>
                        </button>
                        <h3>Edit Tags</h3>
                        <form
                            className="pure-form pure-g">
                            <div
                                className="current-tag-list pure-u-1">
                                {currentTags}
                            </div>
                            <div
                                className="pure-u-20-24">
                                <input
                                    type="text"
                                    className="new-tag pure-input-1"
                                    value={this.state.newTag}
                                    onChange={this.bound.onTagTextChanged}/>
                            </div>
                            <div
                                className="pure-u-4-24">
                                <button
                                    onClick={this.bound.addTag}
                                    disabled={!this.state.newTagValid}
                                    className="pure-button pure-button-primary"
                                    type="button">
                                    Add
                                </button>
                            </div>
                            <div
                                className="pure-u-1 dialog-button-group">
                                <div className="pure-u-2-5"/>
                                <button
                                    onClick={this.bound.saveTags}
                                    className="pure-button pure-button-primary"
                                    type="button">
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
