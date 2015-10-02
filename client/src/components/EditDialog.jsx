import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import uiActions from '../actions/UiActions';
import * as _ from 'lodash';

export default class EditDialog extends React.Component {

    constructor(props) {
        super(props);
        this.bound = {
            onTagTextChanged: this.onTagTextChanged.bind(this),
            addTag: this.addTag.bind(this)
        };
        this.state = {
            newTag: '',
            tags: this.props.tags
        };
    }

    onTagTextChanged(event) {
        event.preventDefault();
        let newTag = (event.target.value || '').toLowerCase().match(/[a-z]/g).join('');
        this.setState({newTag});
    }

    addTag(event) {
        event.preventDefault();
        let newTag = this.state.newTag;
        this.setState({
            newTag: '',
            tags: this.state.tags.concat([newTag])
        });
    }

    /**
     * @return {object}
     */
    render() {
        console.log('render EditDialog');
        let newTagPresent = _.isString(this.state.newTag) && this.state.newTag.length > 0;
        let currentTags = this.state.tags.map(t => {
            return (
                <div className="current-tag">
                    {t}
                </div>
            );
        });

        return (
            <div>
                <ModalContainer>
                    <ModalDialog
                        width={500}>
                        <button
                            className="close-btn"
                            onClick={uiActions.closeModal}>
                            <i className="fa fa-close"></i>
                        </button>
                        <h3>Edit Tags</h3>
                        <div className="current-tag-list">
                            {currentTags}
                        </div>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    className="new-tag"
                                    value={this.state.newTag}
                                    onChange={this.bound.onTagTextChanged}/>

                                <button
                                    onClick={this.bound.addTag}
                                    enabled={newTagPresent}
                                    className="pure-button pure-button-primary"
                                    type="button">
                                    Add
                                </button>
                            </div>
                        </div>
                    </ModalDialog>
                </ModalContainer>
            </div>
        );
    }
}
