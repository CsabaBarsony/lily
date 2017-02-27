const Sugar = require('./sugar.js');
const React = require('react');
const renderer = require('react-addons-test-utils').createRenderer();

describe('Sugar', function() {
    renderer.render(<Sugar message="Csati majom" />);
    const result = renderer.getRenderOutput();

    it('should...', function() {
        expect(result.type).toBe('input');
    });
});
