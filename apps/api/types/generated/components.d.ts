import type { Schema, Attribute } from '@strapi/strapi'

export interface FlowFlow extends Schema.Component {
  collectionName: 'components_flow_flows'
  info: {
    displayName: 'flow'
    icon: 'manyToMany'
  }
  attributes: {
    title: Attribute.String
    duration: Attribute.String
    presenter: Attribute.String
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
    street: Attribute.String
    postcode: Attribute.String
    country: Attribute.String
  }
}

export interface CourseCurriculum extends Schema.Component {
  collectionName: 'components_course_curricula'
  info: {
    displayName: 'CurriculumItem'
    description: ''
  }
  attributes: {
    title_en: Attribute.String
    title_tr: Attribute.String
    title_nl: Attribute.String
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    instructor: Attribute.String
    date: Attribute.DateTime
  }
}

export interface ContactContact extends Schema.Component {
  collectionName: 'components_contact_contacts'
  info: {
    displayName: 'Contact'
    icon: 'phone'
    description: ''
  }
  attributes: {
    email: Attribute.Email
    website: Attribute.String
    address: Attribute.String
    city: Attribute.String
    country: Attribute.String
    phone: Attribute.String
    facebook: Attribute.String
    instagram: Attribute.String
    twitter: Attribute.String
    linkedin: Attribute.String
  }
}

export interface FaqFaq extends Schema.Component {
  collectionName: 'components_faq_faqs'
  info: {
    displayName: 'FaqLocale'
    description: ''
  }
  attributes: {
    question_en: Attribute.String
    question_tr: Attribute.String
    question_nl: Attribute.String
    answer_en: Attribute.Text
    answer_tr: Attribute.Text
    answer_nl: Attribute.Text
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'flow.flow': FlowFlow
      'flow.address': FlowAddress
      'course.curriculum': CourseCurriculum
      'contact.contact': ContactContact
      'faq.faq': FaqFaq
    }
  }
}
