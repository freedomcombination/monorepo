import { POST_MOCKS } from '@wsvvrijheid/mocks'

import { mapModelLocalization } from './mapModelLocalization'

describe('Index', () => {
  it('should generate localiations', () => {
    const result = mapModelLocalization(POST_MOCKS.en.data[0])
    expect(result.nl.id).toEqual(438)
  })
})
