import { Collection, Localize, StrapiCollectionResponse } from '@fc/types'

export const COLLECTION_MOCKS: Localize<
  StrapiCollectionResponse<Collection[]>
> = {
  tr: {
    data: [
      {
        id: 4,
        title: 'Mavi şemsiye',
        slug: 'mavi-semsiye',
        description: 'Mavi şemsiye sergisi',
        approvalStatus: 'approved',
        createdAt: '2023-02-16T08:46:47.972Z',
        updatedAt: '2023-03-26T10:55:05.096Z',
        publishedAt: '2023-02-16T10:40:34.624Z',
        locale: 'tr',
        content:
          'Mavi şemsiye sergisi\n\nKimbilir nasıl yollardan geçtik, neleri, kimleri bıraktık geride... Yol bizi bir diyara getirdi. \nŞimdi "Mavi Şemsiye"nin altında buluşma zamanı.\nOrtak noktası ümit olan hikayelerle dolu "Mavi şemsiye" isimli "mülteci olmak" konulu karma sergimiz.',
        date: '2023-02-25T15:00:00.000Z',
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 1,
      },
    },
  },
  nl: {
    data: [
      {
        id: 6,
        title: 'Blauwe paraplu',
        slug: 'blauwe-paraplu',
        description: 'Blauwe paraplu tentoonstelling',
        approvalStatus: 'approved',
        createdAt: '2023-02-16T10:40:40.432Z',
        updatedAt: '2023-03-26T10:55:05.043Z',
        publishedAt: '2023-03-03T01:41:01.481Z',
        locale: 'nl',
        content:
          'Blauwe paraplu tentoonstelling\n\nWie weet welke wegen we zijn gepasseerd, welke en wie we hebben achtergelaten... De weg bracht ons naar een land. Dit is het moment om elkaar te ontmoeten onder de "Blauwe Paraplu". Onze groepstentoonstelling over "vluchteling zijn" genaamd "Blue Umbrella", vol verhalen met een gemeenschappelijk punt van hoop.',
        date: '2023-02-25T15:00:00.000Z',
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 1,
      },
    },
  },
  en: {
    data: [
      {
        id: 5,
        title: 'Blue umbrella',
        slug: 'blue-umbrella',
        description:
          'Who knows which roads we passed, what and whom we left behind.',
        approvalStatus: 'approved',
        createdAt: '2023-02-16T10:40:40.231Z',
        updatedAt: '2023-03-26T10:55:05.095Z',
        publishedAt: '2023-03-26T07:25:46.256Z',
        locale: 'en',
        content:
          'Blue Umbrella Exhibition\n\nWho knows which roads we passed, what and whom we left behind... The road brought us to a land. Now it\'s time to meet under the "Blue Umbrella". Our mixed exhibition, titled "Blue Umbrella", is full of stories that share the common theme of hope and the topic of "being a refugee".',
        date: '2023-02-25T15:00:00.000Z',
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 1,
      },
    },
  },
}
