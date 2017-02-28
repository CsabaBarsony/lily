const React = require('react')
const PubSub = require('pubsub-js')
const Statechart = require('scion-core').Statechart
const bella = require('../../bella.js')

let sc

const Sugar = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            selectedIndex: -1,
            suggestions: []
        }
    },
    componentDidMount: function() {
        const self = this

        const actions = {
            focus: {
                entry: e => {

                }
            },
            blur: {
                entry: e => {

                }
            },
            visible: {
                entry: e => {

                },
                exit: () => {
                    self.setState({
                        loading: false,
                        suggestions: []
                    })
                }
            },
            loading: {
                entry: e => {
                    self.setState({ loading: true })
                    bella.ajax.get(e.data, function(suggestions) {
                        sc.gen('load', suggestions)
                    })
                },
                exit: () => {
                    self.setState({ loading: false })
                }
            },
            suggesting: {
                entry: e => {
                    self.setState({ suggestions: e.data })
                }
            },
            excited: {
                entry: e => {

                }
            },
            chosen: {
                entry: e => {

                }
            }
        }

        const states = [
            {
                id: 'blur',
                onEntry: actions.blur.entry,
                transitions: [
                    {
                        event: 'select',
                        target: 'focus'
                    }
                ]
            },
            {
                id: 'focus',
                transitions: [
                    {
                        event: 'unselect',
                        target: 'blur'
                    }
                ],
                states: [
                    {
                        id: 'hidden',
                        transitions: [
                            {
                                event: 'type',
                                target: 'loading'
                            }
                        ]
                    },
                    {
                        id: 'visible',
                        onEntry: actions.visible.entry,
                        onExit: actions.visible.exit,
                        states: [
                            {
                                id: 'loading',
                                onEntry: actions.loading.entry,
                                onExit: actions.loading.exit,
                                transitions: [
                                    {
                                        event: 'load',
                                        target: 'typing'
                                    },
                                    {
                                        event: 'clear',
                                        target: 'hidden'
                                    },
                                    {
                                        event: 'type',
                                        target: 'loading'
                                    }
                                ]
                            },
                            {
                                id: 'suggesting',
                                onEntry: actions.suggesting.entry,
                                transitions: [
                                    {
                                        event: 'type',
                                        target: 'loading'
                                    },
                                    {
                                        event: 'clear',
                                        target: 'hidden'
                                    },
                                    {
                                        event: 'choose',
                                        target: 'chosen'
                                    }
                                ],
                                states: [
                                    {
                                        id: 'typing',
                                        transitions: [
                                            {
                                                event: 'excite',
                                                target: 'excited'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'excited',
                                        onEntry: actions.excited.entry,
                                        transitions: [
                                            {
                                                event: 'excite',
                                                target: 'excited'
                                            },
                                            {
                                                event: 'bore',
                                                target: 'typing'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'chosen',
                        onEntry: actions.chosen.entry,
                        transitions: [
                            {
                                event: 'type',
                                target: 'loading'
                            }
                        ]
                    }
                ]
            }
        ]

        sc = new Statechart({ states: states }, { logStatesEnteredAndExited: false })
        sc.start()
    },
    render: function () {
        let content;

        if(this.state.loading) {
            content = <div>loading...</div>
        }
        else {
            const suggestionItems = this.state.loading ? <li>loading...</li> : this.state.suggestions.map((suggestion, i) => {
                return <li key={i}>{suggestion.name}</li>
            })

            content = <ul>{suggestionItems}</ul>
        }

        return (
            <div>
                <input
                    type="text"
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    onKeyPress={this.onKeyPress} />
                {content}
            </div>)
    },
    onFocus: function() {
        sc.gen('select')
    },
    onChange: function(e) {
        if(e.target.value === '') sc.gen('clear')
        else sc.gen('type', e.target.value)
    },
    onKeyDown: function(e) {
        if(e.key === 'ArrowUp') {

        }
        else if(e.key === 'ArrowDown') {

        }
        else if(e.key === 'Enter') {

        }
    }
})

module.exports = Sugar
