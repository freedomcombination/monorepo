import type { Attribute, Schema } from '@strapi/strapi'

export interface ContactContact extends Schema.Component {
  collectionName: 'components_contact_contacts'
  info: {
    description: ''
    displayName: 'Contact'
    icon: 'phone'
  }
  attributes: {
    address: Attribute.String
    city: Attribute.String
    country: Attribute.String
    email: Attribute.Email
    facebook: Attribute.String
    instagram: Attribute.String
    linkedin: Attribute.String
    phone: Attribute.String
    twitter: Attribute.String
    website: Attribute.String
  }
}

export interface CourseCurriculum extends Schema.Component {
  collectionName: 'components_course_curricula'
  info: {
    description: ''
    displayName: 'CurriculumItem'
  }
  attributes: {
    date: Attribute.DateTime
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    instructor: Attribute.String
    title_en: Attribute.String
    title_nl: Attribute.String
    title_tr: Attribute.String
  }
}

export interface FaqFaq extends Schema.Component {
  collectionName: 'components_faq_faqs'
  info: {
    description: ''
    displayName: 'FaqLocale'
  }
  attributes: {
    answer_en: Attribute.Text
    answer_nl: Attribute.Text
    answer_tr: Attribute.Text
    question_en: Attribute.String
    question_nl: Attribute.String
    question_tr: Attribute.String
  }
}

export interface FlowAddress extends Schema.Component {
  collectionName: 'components_flow_addresses'
  info: {
    displayName: 'Address'
    icon: 'apps'
  }
  attributes: {
    city: Attribute.String
    country: Attribute.String
    postcode: Attribute.String
    street: Attribute.String
  }
}

export interface FlowFlow extends Schema.Component {
  collectionName: 'components_flow_flows'
  info: {
    displayName: 'flow'
    icon: 'manyToMany'
  }
  attributes: {
    duration: Attribute.String
    presenter: Attribute.String
    title: Attribute.String
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'contact.contact': ContactContact
      'course.curriculum': CourseCurriculum
      'faq.faq': FaqFaq
      'flow.address': FlowAddress
      'flow.flow': FlowFlow
    }
  }
}
