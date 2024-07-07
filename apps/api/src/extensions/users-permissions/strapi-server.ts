import { emailTemplates } from '@fc/email'
import { Site, StrapiLocale } from '@fc/types'
import utils from '@strapi/utils'
import crypto from 'crypto'

const { sanitize } = utils
const { ApplicationError, ValidationError, NotFoundError, ForbiddenError } =
  utils.errors

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state
  const userSchema = strapi.getModel('plugin::users-permissions.user')

  return sanitize.contentAPI.output(user, userSchema, { auth })
}

const getService = name => {
  return strapi.plugin('users-permissions').service(name)
}

module.exports = plugin => {
  plugin.controllers.auth.forgotPassword = async ctx => {
    let { email } = ctx.request.body

    const { site = 'foundation' as Site, locale = 'en' as StrapiLocale } =
      ctx.request.body

    const isEmail = emailRegExp.test(email)

    if (isEmail) {
      email = email.toLowerCase()
    } else {
      // TODO check those ValidationError errors etc. if takes second argument, ApplicationError takes second argument
      throw new ValidationError('Please provide a valid email address', {
        i18nKey: 'strapi.error.forgot-password.invalid-email',
      })
    }

    const pluginStore = await strapi.store({
      type: 'plugin',
      name: 'users-permissions',
    })

    const user = await strapi
      .query('plugin::users-permissions.user')
      .findOne({ where: { email } })

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

    const settings = await pluginStore
      .get({ key: 'email' })
      .then(storeEmail => {
        try {
          return storeEmail['reset_password'].options
        } catch (error) {
          return {}
        }
      })

    const userInfo = await sanitizeUser(user, ctx)

    settings.message = emailTemplates.renderForgotPassword(
      email,
      site,
      resetPasswordToken,
      locale,
    )

    settings.object = await getService('users-permissions').template(
      settings.object,
      {
        USER: userInfo,
      },
    )

    await strapi
      .query('plugin::users-permissions.user')
      .update({ where: { id: user.id }, data: { resetPasswordToken } })

    try {
      await strapi
        .plugin('email')
        .service('email')
        .send({
          to: email,
          from:
            settings.from.email || settings.from.name
              ? `${settings.from.name} <${settings.from.email}>`
              : undefined,
          replyTo: settings.response_email,
          subject: settings.object,
          text: settings.message,
          html: settings.message,
        })
    } catch (err) {
      throw new ApplicationError(err.message, {
        i18nKey: 'strapi.error.forgot-password.email-not-sent',
      })
    }

    ctx.send({ ok: true })
  }

  return plugin
}
