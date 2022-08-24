/* eslint-disable testing-library/no-render-in-setup */
import ReactDOM from 'react-dom';
import {Chart} from '../src/component/chart/Chart'

describe("test", () => {
  let container: HTMLDivElement;

  beforeEach(()=>{
    container = document.createElement('div')
    document.body.appendChild(container)
    ReactDOM.render(<Chart/>, container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container.remove()

  })

  it('render correctly initial document', () => {
    const ranges = document.querySelectorAll('.chart__line')
    expect(ranges).toHaveLength(4)
  })
})