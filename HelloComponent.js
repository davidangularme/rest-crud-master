var React = require("react")
var ReactDOM  = require("react-dom")


class HelloComponent extends React.Component {
    render() {
        return React.createElement('h1', null, 'Add Data');
    }
}
module.exports = HelloComponent;