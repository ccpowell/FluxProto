import React from 'react';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * @return {object}
     */
    render() {
        return (
            <div className="header">
                <h1>App Title</h1>
                <h2>A subtitle for your app goes here</h2>
                <div>This might be considered wasted space.</div>
            </div>
        );
    }
}
