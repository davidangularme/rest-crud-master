"use strict";

const React = require('react');
const ReactDOM = require('react-dom');

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.searchProduct = this.searchProduct.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    componentDidMount() {
        this.textInput.focus();
    }

    searchProduct() {
        const productName = this.textInput.value;
        this.props.onSearch(productName);
    }

    keyDownHandler(event) {
        if (event.keyCode == 13) {
            this.searchProduct();
        }
    }

    render() {
        return React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
                'div',
                { className: 'input-group col-md-6' },
                React.createElement('input', { type: 'text',
                    className: 'form-control',
                    onKeyDown: this.keyDownHandler,
                    ref: ref => this.textInput = ref,
                    placeholder: 'Search....' }),
                React.createElement(
                    'span',
                    { className: 'input-group-btn' },
                    React.createElement(
                        'button',
                        { onClick: this.searchProduct, className: 'btn btn-primary', type: 'button' },
                        React.createElement('span', { className: 'glyphicon glyphicon-search' })
                    )
                )
            )
        );
    }
}

module.exports = SearchBar;