const Sugar = require('./sugar.js');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const renderer = TestUtils.createRenderer();

describe('Calculator', function() {
    renderer.render(<Sugar message="Csati majom" />);
    const result = renderer.getRenderOutput();

    it('should...', function() {
        expect(result.type).toBe('div');
    });
});
