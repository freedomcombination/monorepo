import React from 'react'

import { render } from '@react-email/render'

import type {
  Art,
  CourseApplication,
  Profile,
  Site,
  StrapiLocale,
} from '@fc/types'
import ArtCreated from './ArtCreated'
import ForgotPassword from './ForgotPassword'
import CourseApplicantApprove from './templates/CourseApplication/CourseApplicantApprove'
import CourseApplicantSubmittedAssignmentFiles from './templates/CourseApplication/CourseApplicantSubmittedAssignmentFiles'
import CourseApplicantWithoutPayment from './templates/CourseApplication/CourseApplicantWithoutPayment'
import { TranslateFunc } from './utils/getTranslate'
import VolunteerApplied from './VolunteerApplied'

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
    application: CourseApplication,
    t: TranslateFunc,
  ) =>
    render(<CourseApplicantWithoutPayment application={application} t={t} />),

  renderCourseApplicantSubmittedAssignmentFiles: (
    application: CourseApplication,
    t: TranslateFunc,
  ) =>
    render(
      <CourseApplicantSubmittedAssignmentFiles
        application={application}
        t={t}
      />,
    ),

  renderCourseApplicantApprove: (
    application: CourseApplication,
    t: TranslateFunc,
  ) => render(<CourseApplicantApprove application={application} t={t} />),
}
