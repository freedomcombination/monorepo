import type { Site } from '@fc/types'
import utils from '@strapi/utils'
import crypto from 'crypto'
import { emailTemplates } from '../../../emails'
import { sendReactMail } from '../../utils/sendReactMail'

const { /*ApplicationError,*/ ValidationError, NotFoundError, ForbiddenError } =
  utils.errors

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = plugin => {
  plugin.controllers.auth.forgotPassword = async ctx => {
    let { email } = ctx.request.body

    const { site = 'foundation' as Site, locale = 'en' } = ctx.request.body

    const isEmail = emailRegExp.test(email)

    if (isEmail) {
      email = email.toLowerCase()
    } else {
      // TODO check those ValidationError errors etc, if it takes second argument; we know that ApplicationError takes second argument
      throw new ValidationError('Please provide a valid email address', {
        i18nKey: 'strapi.error.forgot-password.invalid-email',
      })
    }

    const profile = await strapi
      .query('api::profile.profile')
      .findOne({ where: { user: { email } }, populate: ['user'] })

    const user = profile?.user

    if (!user) {
      throw new NotFoundError('This email does not exist', {
        i18nKey: 'strapi.error.forgot-password.email-not-found',
      })
    }

    if (user.blocked) {
      throw new ForbiddenError('This user is disabled', {
        i18nKey: 'strapi.error.forgot-password.user-blocked',
      })
    }

    const resetPasswordToken = crypto.randomBytes(64).toString('hex')

    await strapi
      .query('plugin::users-permissions.user')
      .update({ where: { id: user.id }, data: { resetPasswordToken } })

    await sendReactMail(
      [{ email: user.email, locale: profile.locale ?? locale }],
      async t =>
        await emailTemplates.renderForgotPassword(
          email,
          site,
          resetPasswordToken,
          t,
        ),
    )

    ctx.send({ ok: true })
  }

  return plugin
}
