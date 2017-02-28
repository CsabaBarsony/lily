const ReactDOM = require('react-dom')
const React = require('react')
const Sugar = require('../cmp/sugar/sugar.js')
const PubSub = require('pubsub-js')
const Statechart = require('scion-core').Statechart

PubSub.subscribe('focus', function(x, y) {
    debugger
})

const model = {
    ingredients: []
}

function sugarOnType(text) {
    debugger
}

function sugarOnSelect(data) {

}

ReactDOM.render(
    <Sugar onType={sugarOnType} onSelect={sugarOnSelect} />,
    document.getElementById('cmp-sugar')
)
