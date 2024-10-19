import React from 'react'

import { render } from '@react-email/render'

import type { Art, CourseApplication, Profile, Site } from '@fc/types'
import { EmailDetails } from '../src/utils/sendReactMail'
import ArtCreated from './templates/Art/ArtCreated'
import CourseApplicantApprove from './templates/CourseApplication/CourseApplicantApprove'
import CourseApplicantSubmittedAssignmentFiles from './templates/CourseApplication/CourseApplicantSubmittedAssignmentFiles'
import CourseApplicantWithoutPayment from './templates/CourseApplication/CourseApplicantWithoutPayment'
import ForgotPassword from './templates/ForgotPassword/ForgotPassword'
import VolunteerApplied from './templates/Volunteer/VolunteerApplied'
import { TranslateFunc } from './utils/getTranslate'

export const emailTemplates = {
  renderVolunteerApplied: async (
    volunteer: Profile,
    t: TranslateFunc,
  ): Promise<EmailDetails> => {
    return {
      subject: t('volunteer-applied.header', { name: volunteer.name }),
      html: await render(<VolunteerApplied volunteer={volunteer} t={t} />),
    }
  },

  renderArtCreated: async (
    art: Art,
    t: TranslateFunc,
  ): Promise<EmailDetails> => {
    return {
      subject: t('art-created.preview', { name: art.artist?.name }),
      html: await render(<ArtCreated art={art} t={t} />),
    }
  },

  renderForgotPassword: async (
    email: string,
    site: Site,
    code: string,
    t: TranslateFunc,
  ): Promise<EmailDetails> => {
    return {
      subject: t('forgot.preview'),
      html: await render(
        <ForgotPassword email={email} site={site} code={code} t={t} />,
      ),
    }
  },

  renderCourseApplicantWithoutPayment: async (
    application: CourseApplication,
    t: TranslateFunc,
  ): Promise<EmailDetails> => {
    return {
      subject: t('course-applicant-unpaid-preview', {
        name: application?.name || 'User name',
      }),
      html: await render(
        <CourseApplicantWithoutPayment application={application} t={t} />,
      ),
    }
  },

  renderCourseApplicantSubmittedAssignmentFiles: async (
    application: CourseApplication,
    t: TranslateFunc,
  ): Promise<EmailDetails> => {
    return {
      subject: t('course-applicant-submitted-assignment-files-preview', {
        name: application?.name || 'User name',
      }),
      html: await render(
        <CourseApplicantSubmittedAssignmentFiles
          application={application}
          t={t}
        />,
      ),
    }
  },

  renderCourseApplicantApprove: async (
    application: CourseApplication,
    t: TranslateFunc,
  ): Promise<EmailDetails> => {
    return {
      subject: t(
        application?.approvalStatus === 'approved'
          ? 'course-applicant-approved-preview'
          : 'course-applicant-rejected-preview',
        {
          name: application?.name || 'User name',
        },
      ),
      html: await render(
        <CourseApplicantApprove application={application} t={t} />,
      ),
    }
  },
}
