"use strict";

const React = require('react');
const SearchBar = require('./SearchBar');
const ProductTable = require('./ProductTable');

class SecondHelloComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { products: this.props.products };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(productName) {
        const url = '/products?productName=' + productName;
        $.get(url, data => {
            this.setState({
                products: data
            });
        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(SearchBar, { onSearch: this.handleSearch }),
            React.createElement(ProductTable, { products: this.state.products })
        );
    }
}

module.exports = SecondHelloComponent;