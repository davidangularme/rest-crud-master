"use strict";

const React = require('react');

class ProductTable extends React.Component {

    render() {
        const rows = [];
        this.props.products.forEach(p => rows.push(React.createElement(ProductItem, { key: p.id, product: p })));

        return rows.length > 0 ? this.createProductTable(rows) : this.createProductNotFoundAlert();
    }

    createProductTable(rows) {
        return React.createElement(
            "table",
            { className: "table table-hover" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "No"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "vast_url"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "position"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "hide_ui"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                rows
            )
        );
    }

    createProductNotFoundAlert() {
        return React.createElement(
            "div",
            { className: "alert alert-info" },
            React.createElement(
                "strong",
                null,
                "No product found !"
            )
        );
    }
}


class ProductItem extends React.Component {
    render() {
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                this.props.product.id
            ),
            React.createElement(
                "td",
                null,
                this.props.product.vast_url
            ),
            React.createElement(
                "td",
                null,
                this.props.product.position
            ),
            React.createElement(
                "td",
                null,
                this.props.product.hide_ui
            )
        );
    }
}

module.exports = ProductTable;