import { css } from '../utils/getCss'

describe('Testing CSS style', () => {
    test('Style CSS SVG', () => {
        expect(css({backgroundColor: '#ecf0f1', pattern: 'plus', opacity:1, colorPattern: '#eaeaea', fontColor: '#e64a19'})).toBeTruthy()
    })
})