import React from 'react'

import { render } from '@react-email/render'

import VolunteerApplied from './VolunteerApplied'
import { Site, Art, Profile, StrapiLocale } from '@fc/types'
import ArtCreated from './ArtCreated'
import ForgotPassword from './ForgotPassword'

export const emailTemplates = {
  renderVolunteerApplied: (volunteer: Profile) =>
    render(<VolunteerApplied volunteer={volunteer} />),
  renderArtCreated: (art: Art) => render(<ArtCreated art={art} />),
  renderForgotPassword: (
    email: string,
    site: Site,
    code: string,
    locale?: StrapiLocale,
  ) =>
    render(
      <ForgotPassword email={email} site={site} code={code} locale={locale} />,
    ),
}
