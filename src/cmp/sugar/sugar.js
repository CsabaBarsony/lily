const React = require('react');
const PubSub = require('pubsub-js');
const Statechart = require('scion-core').Statechart;

let sc;

const Sugar = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            selectedIndex: -1,
            suggestions: []
        };
    },
    componentDidMount: function() {
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
                exit: e => {

                }
            },
            loading: {
                entry: e => {

                },
                exit: e => {

                }
            },
            suggesting: {
                entry: e => {

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
        };

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
        ];

        sc = new Statechart({ states: states }, { logStatesEnteredAndExited: true });
        sc.start();
    },
    render: function () {
        return (
            <div>
                <input type="text" onFocus={this.onFocus} onChange={this.onChange} />
            </div>);
    },
    onFocus: function() {
        sc.gen('select');
    },
    onChange: function(e) {
        console.log('change', e.target.value);
    }
});

module.exports = Sugar;
