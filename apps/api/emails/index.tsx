import React from 'react'

import { render } from '@react-email/render'

import VolunteerApplied from './VolunteerApplied'
import { Art, Profile } from '@fc/types'
import ArtCreated from './ArtCreated'

export const emailTemplates = {
  renderVolunteerApplied: (volunteer: Profile) =>
    render(<VolunteerApplied volunteer={volunteer} />),
  renderArtCreated: (art: Art) => render(<ArtCreated art={art} />),
}
