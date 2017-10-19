import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots'
import path from 'path'


function createNodeMock(element) {
  if (element.type) {
    return {
      __consolidated_events_handlers__: null,
      addEventListener: () => ':poop:',
      querySelectorAll: () => [],
    }
  }

  return null
}

initStoryshots({
  test: snapshotWithOptions({
    createNodeMock,
  }),
})

