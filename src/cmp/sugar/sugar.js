const React = require('react');

const Sugar = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            selectedIndex: -1,
            suggestions: []
        };
    },
    render: function () {
        return (
            <div>
                <input type="text" onFocus={this.onFocus} onChange={this.onChange} />
            </div>);
    },
    onFocus: function() {
        console.log('focus');
    },
    onChange: function(e) {
        console.log('change', e.target.value);
    }
});

module.exports = Sugar;
