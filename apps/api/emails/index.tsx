import React from 'react'

import { render } from '@react-email/render'

import VolunteerApplied from './VolunteerApplied'
import { Site, Art, Profile, StrapiLocale, Course } from '@fc/types'
import ArtCreated from './ArtCreated'
import ForgotPassword from './ForgotPassword'
import CourseApplicantWithoutPayment from './CourseApplicantWithoutPayment'

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
  renderCourseApplicantWithoutPayment: (
    applicant: Profile,
    course: Course,
    date: string,
    explanation: string,
    locale?: StrapiLocale,
  ) =>
    render(
      <CourseApplicantWithoutPayment
        applicant={applicant}
        course={course}
        date={date}
        explanation={explanation}
        locale={locale}
      />,
    ),
}
