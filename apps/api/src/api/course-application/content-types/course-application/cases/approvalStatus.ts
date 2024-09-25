import { sendReactMail } from '../../../../../utils/sendReactMail'

export const approvalStatusHasChanged = async params => {
  const application = await strapi.entityService.findOne(
    'api::course-application.course-application',
    params.where.id,
    {
      populate: '*',
    },
  )

  const receiver = [
    {
      email: application?.profile?.email,
      locale: undefined /* TODO application?.profile?.locale */,
    },
  ]
  const approved = application?.approvalStatus === 'approved'

  if (approved) {
    // update lastUpdateDate to check payment ll be made in time (like in 7 days)
    await strapi.entityService.update(
      'api::course-application.course-application',
      params.where.id,
      {
        data: {
          lastUpdateDate: new Date(),
        },
      },
    )
  }

  await sendReactMail(receiver, async () => {
    return {
      // TODO change to email template
      subject: approved ? 'Kurs onaylandı' : 'Kurs reddedildi',
      html: approved
        ? 'Kurs onaylandı if(course.price) parasını öde!!'
        : 'Kurs reddedildi',
    }
  })
}
