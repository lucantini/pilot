import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots'
import path from 'path'


function createNodeMock(element) {
  if (element.type) {
    return {
      __consolidated_events_handlers__: null,
      addEventListener: () => ':poop:',
      querySelectorAll: () => [],
      style: {
        height: 0,
      }
    }
  }

  return null
}

initStoryshots({
  test: snapshotWithOptions({
    createNodeMock,
  }),
})

jest.mock('react-dom', () => ({
  findDOMNode: () => ({
    querySelector: () => null,
  })
}))

global.getComputedStyle = () => ({
  styleSheets: {},
})
