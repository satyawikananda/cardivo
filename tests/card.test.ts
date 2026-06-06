import { describe, expect, it } from 'bun:test'
import { cardRender } from '../src/lib/card'

describe('cardRender()', () => {
  it('produces a valid SVG envelope', () => {
    const svg = cardRender({
      name: 'Satya Wikananda',
      description: 'Hi, I am a developer',
      image: 'data:image/png;base64,iVBORw0KGgo=',
    })
    expect(svg).toContain('<svg')
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(svg).toContain('Satya Wikananda')
  })

  it('escapes XML-special characters in user input', () => {
    const svg = cardRender({
      name: '<script>alert(1)</script>',
      description: 'A & B',
      image: 'data:image/png;base64,iVBORw0KGgo=',
    })
    expect(svg).not.toContain('<script>alert(1)</script>')
    expect(svg).toContain('&lt;script&gt;')
    expect(svg).toContain('A &amp; B')
  })

  it('hides icon rows when the value is empty', () => {
    const svg = cardRender({
      name: 'A',
      description: 'B',
      image: 'data:image/png;base64,iVBORw0KGgo=',
    })
    // No socials provided → no <svg> icon blocks should be rendered
    expect(svg.match(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g)?.length ?? 0).toBe(0)
  })

  it('disables the slide-in animation when requested', () => {
    const on = cardRender({
      name: 'A',
      description: 'B',
      image: 'x',
      disableAnimation: false,
    })
    const off = cardRender({
      name: 'A',
      description: 'B',
      image: 'x',
      disableAnimation: true,
    })
    // When animation is ON, the <h1> gets the animate-transition class.
    expect(on).toContain('class="font-monserrat700 animate-transition"')
    // When OFF, the class attribute must be empty (no animate-transition class on h1/p).
    expect(off).toContain('class="font-monserrat700 "')
    expect(off).toContain('class="font-monserratRegular "')
    // And the image style should switch to `transition: none`.
    expect(off).toContain('transition: none')
  })
})
