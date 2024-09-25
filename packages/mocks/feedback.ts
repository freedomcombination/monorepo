import type { Feedback, StrapiCollectionResponse } from '@fc/types'

export const FEEDBACK_MOCK: StrapiCollectionResponse<Feedback[]> = {
  data: [
    {
      id: 1,
      message: 'eser gercek',
      point: 1,
      status: 'rejected',
      createdAt: '2023-01-26T08:42:33.652Z',
      updatedAt: '2023-01-26T08:42:33.652Z',
      publishedAt: '2023-01-26T08:42:33.646Z',
      art: null,
      application: null,
    },
    {
      id: 2,
      message: 'eser guzel',
      point: 1,
      status: 'approved',
      createdAt: '2023-01-26T08:44:53.699Z',
      updatedAt: '2023-01-26T08:44:53.699Z',
      publishedAt: '2023-01-26T08:44:53.694Z',
      art: null,
      application: null,
    },
    {
      id: 3,
      message: 'güzel',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-16T08:48:57.185Z',
      updatedAt: '2023-02-16T08:48:57.463Z',
      publishedAt: '2023-02-16T08:48:57.179Z',
      art: null,
      application: null,
    },
    {
      id: 4,
      message: 'Logo guzelmis ',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-16T10:58:40.038Z',
      updatedAt: '2023-02-16T10:58:40.126Z',
      publishedAt: '2023-02-16T10:58:40.033Z',
      art: null,
      application: null,
    },
    {
      id: 5,
      message: 'ayni icerik burada mevcut',
      point: 1,
      status: 'rejected',
      createdAt: '2023-02-22T11:34:07.055Z',
      updatedAt: '2023-02-22T11:34:07.353Z',
      publishedAt: '2023-02-22T11:34:06.977Z',
      art: null,
      application: null,
    },
    {
      id: 6,
      message: 'eser yanlis olmus ',
      point: 1,
      status: 'rejected',
      createdAt: '2023-02-22T11:45:00.389Z',
      updatedAt: '2023-02-22T11:45:00.416Z',
      publishedAt: '2023-02-22T11:45:00.381Z',
      art: null,
      application: null,
    },
    {
      id: 7,
      message: 'yanlislikla reddedildi. ',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-22T11:45:30.962Z',
      updatedAt: '2023-02-22T11:45:30.992Z',
      publishedAt: '2023-02-22T11:45:30.958Z',
      art: null,
      application: null,
    },
    {
      id: 8,
      message: 'guzel',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-22T11:48:37.179Z',
      updatedAt: '2023-02-22T11:48:37.367Z',
      publishedAt: '2023-02-22T11:48:37.170Z',
      art: null,
      application: null,
    },
    {
      id: 9,
      message: 'yanlis',
      point: 1,
      status: 'rejected',
      createdAt: '2023-02-22T11:48:50.726Z',
      updatedAt: '2023-02-22T11:48:50.749Z',
      publishedAt: '2023-02-22T11:48:50.722Z',
      art: null,
      application: null,
    },
    {
      id: 10,
      message: 'yayinda degil',
      point: 1,
      status: 'rejected',
      createdAt: '2023-02-22T11:49:09.566Z',
      updatedAt: '2023-02-22T11:49:09.605Z',
      publishedAt: '2023-02-22T11:49:09.562Z',
      art: null,
      application: null,
    },
    {
      id: 11,
      message: 'eser guzel olmus ',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-22T11:59:49.433Z',
      updatedAt: '2023-02-22T11:59:49.478Z',
      publishedAt: '2023-02-22T11:59:49.429Z',
      art: null,
      application: null,
    },
    {
      id: 12,
      message: 'yanlis onaylanmis',
      point: 1,
      status: 'rejected',
      createdAt: '2023-02-22T12:01:35.435Z',
      updatedAt: '2023-02-22T12:01:35.503Z',
      publishedAt: '2023-02-22T12:01:35.426Z',
      art: null,
      application: null,
    },
    {
      id: 13,
      message: 'Sanat Duragi logosu ve aciklamasi. guzel olmus. ',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-22T13:39:39.843Z',
      updatedAt: '2023-02-22T13:39:39.870Z',
      publishedAt: '2023-02-22T13:39:39.840Z',
      art: null,
      application: null,
    },
    {
      id: 14,
      message: 'Güzel bir çalışma olmuş teşekkür ederiz.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T15:43:03.909Z',
      updatedAt: '2023-02-23T15:43:03.987Z',
      publishedAt: '2023-02-23T15:43:03.903Z',
      art: {
        id: 82,
        slug: 'natuur',
        approvalStatus: 'approved',
        likes: 0,
        views: 1,
        createdAt: '2023-03-26T05:56:46.050Z',
        updatedAt: '2023-09-27T09:00:51.034Z',
        publishedAt: '2023-03-26T05:56:48.475Z',
        title_tr: 'Doğa',
        title_en: 'Nature',
        title_nl: 'Natuur',
        description_tr:
          'Hüzünlü bir günde Hollanda’nın bir yerlerinde dolaştım ve tuvalime bu manzara yansıdı',
        description_en:
          'I wandered somewhere in the Netherlands on a sad day, and this landscape was reflected in my canvas.',
        description_nl:
          'Ik dwaalde op een verdrietige dag ergens in Nederland rond, en dit landschap werd weerspiegeld op mijn doek.',
      },
      application: null,
    },
    {
      id: 15,
      message:
        'Het schilderij is mooi. Definities zijn gewijzigd. De description moet het schilderij in enkele zinnen omschrijven. De content kan ook het verhaal van het schilderij zijn en kan worden verteld met een lange beschrijving.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T15:50:43.696Z',
      updatedAt: '2023-02-23T15:50:43.777Z',
      publishedAt: '2023-02-23T15:50:43.692Z',
      art: {
        id: 112,
        slug: 'vliegende-boom',
        approvalStatus: 'approved',
        likes: 3,
        views: 2,
        createdAt: '2023-03-26T07:56:29.235Z',
        updatedAt: '2023-12-20T00:46:50.205Z',
        publishedAt: '2023-03-26T07:56:33.026Z',
        title_tr: 'Uçan ağaç',
        title_en: 'Flying tree',
        title_nl: 'Vliegende boom',
        description_tr:
          'Bir yerde kök salmak. Yaşam.\n\nUçan ağaç bir gün dikilecek, kök salacak ve hayatı tutacaktır.',
        description_en:
          'Rooting somewhere. Life.\n\nThe flying tree will one day be planted, take root, and hold onto life.',
        description_nl:
          'Ergens wortel schieten. Leven.\n\nDe vliegende boom zal op een dag geplant worden, wortel schieten en het leven vasthouden.',
      },
      application: null,
    },
    {
      id: 16,
      message: 'Çok anlamlı bir çalışma.  TEŞEKKÜR EDERİZ.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T15:50:51.543Z',
      updatedAt: '2023-02-23T15:50:51.567Z',
      publishedAt: '2023-02-23T15:50:51.538Z',
      art: {
        id: 92,
        slug: 'van-gogh-ay-cicekleri-cizerken',
        approvalStatus: 'approved',
        likes: 0,
        views: 3,
        createdAt: '2023-03-26T07:30:14.770Z',
        updatedAt: '2023-09-27T09:04:25.289Z',
        publishedAt: '2023-03-26T07:30:19.239Z',
        title_tr: 'Van Gogh Ay Çiçekleri Çizerken',
        title_en: 'Van Gogh Drawing Sunflowers',
        title_nl: 'Van Gogh terwijl hij Zonnebloemen tekent',
        description_tr:
          'Van Gogh Hayatı boyunca anlaşılmamıştı Bir mülteci olarak kendimi yalnız ve anlaşılmaz hissettiğim bir dönemde değerli sanatçının bir eserinin röprodüksiyonunu çalışarak kendisini saygıyla anmak istedim',
        description_en:
          'Van Gogh was an artist who was never fully understood during his lifetime. During a period when I felt alone and misunderstood as a refugee, I wanted to pay tribute to this esteemed artist by reproducing one of his important works through drawing.',
        description_nl:
          'Van Gogh was zijn hele leven lang onbegrepen. In een periode waarin ik me als vluchteling alleen en onbegrepen voelde, wilde ik hem respectvol eren door te werken aan een reproductie van een van zijn werken.',
      },
      application: null,
    },
    {
      id: 17,
      message:
        'Het schilderij is mooi.  Definities zijn gewijzigd.  De description moet het schilderij in een paar zinnen omschrijven.  De content kan ook het verhaal van het schilderij zijn en kan verteld worden met een lange beschrijving.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T16:00:24.197Z',
      updatedAt: '2023-02-23T16:00:24.268Z',
      publishedAt: '2023-02-23T16:00:24.193Z',
      art: {
        id: 113,
        slug: 'zandloper-en-vogels',
        approvalStatus: 'approved',
        likes: 12,
        views: 10,
        createdAt: '2023-03-26T07:57:26.351Z',
        updatedAt: '2023-09-27T08:40:59.833Z',
        publishedAt: '2023-03-26T13:10:42.641Z',
        title_tr: 'Kum saati ve kuşlar',
        title_en: 'Hourglass and birds',
        title_nl: 'Zandloper en vogels',
        description_tr:
          'Kuşlar ölüm, tükenmişlik ve zamanla mücadele ediyorlar. Bazıları için artık çok geç, ancak hayatta kalanlar özgürlüğe kavuşuyorlar.',
        description_en:
          "Birds struggle with death, burnout, and time. For some it's too late, but the survivors become freedom.",
        description_nl:
          'Vogels worstelen met dood, burn-out en tijd. Voor sommigen is het te laat, maar de overlevenden worden vrijheid.',
      },
      application: null,
    },
    {
      id: 18,
      message: 'Güzel bir çalışma. Teşekkür ederiz.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T16:16:24.969Z',
      updatedAt: '2023-02-23T16:16:25.027Z',
      publishedAt: '2023-02-23T16:16:24.958Z',
      art: {
        id: 87,
        slug: 'galaxies',
        approvalStatus: 'approved',
        likes: 0,
        views: 0,
        createdAt: '2023-03-26T07:20:04.234Z',
        updatedAt: '2023-09-27T08:58:40.954Z',
        publishedAt: '2023-03-26T07:20:11.624Z',
        title_tr: 'Galaksiler',
        title_en: 'Galaxies',
        title_nl: 'Galaxies',
        description_tr: 'Galaksilerin muhteşem dansı',
        description_en: 'The magnificent dance of the galaxies.',
        description_nl: 'De prachtige dans van de sterrenstelsels.',
      },
      application: null,
    },
    {
      id: 19,
      message: 'Teşekkür ederiz.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T16:19:46.776Z',
      updatedAt: '2023-02-23T16:19:47.054Z',
      publishedAt: '2023-02-23T16:19:46.770Z',
      art: {
        id: 91,
        slug: 'uzay',
        approvalStatus: 'approved',
        likes: 0,
        views: 1,
        createdAt: '2023-03-26T07:28:46.608Z',
        updatedAt: '2023-09-27T09:03:26.670Z',
        publishedAt: '2023-03-26T07:28:49.775Z',
        title_tr: 'Uzay',
        title_en: 'Uzay',
        title_nl: 'Uzay',
        description_tr: 'Uzay serisi - Nebula',
        description_en: 'Uzay serisi - Nebula',
        description_nl: 'Uzay serisi - Nebula',
      },
      application: null,
    },
    {
      id: 20,
      message: 'TEŞEKKÜR EDERİZ.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T16:22:57.783Z',
      updatedAt: '2023-02-23T16:22:58.066Z',
      publishedAt: '2023-02-23T16:22:57.777Z',
      art: {
        id: 90,
        slug: 'oceaan',
        approvalStatus: 'approved',
        likes: 1,
        views: 2,
        createdAt: '2023-03-26T07:27:18.452Z',
        updatedAt: '2023-12-21T12:23:39.826Z',
        publishedAt: '2023-03-26T07:27:22.525Z',
        title_tr: 'Okyanus',
        title_en: 'Ocean',
        title_nl: 'Oceaan',
        description_tr:
          'Okyanusları hep  özgürlüğe benzetmişimdir.\nözgürlük ise sorumluluğu üstlenmektir',
        description_en:
          "I've always likened oceans to freedom. Freedom is taking responsibility.",
        description_nl:
          'Ik heb oceanen altijd geassocieerd met vrijheid. Vrijheid betekent verantwoordelijkheid nemen.',
      },
      application: null,
    },
    {
      id: 21,
      message: 'Teşekkür ederiz.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T16:23:59.263Z',
      updatedAt: '2023-02-23T16:23:59.309Z',
      publishedAt: '2023-02-23T16:23:59.254Z',
      art: {
        id: 86,
        slug: 'galaxy',
        approvalStatus: 'approved',
        likes: 0,
        views: 0,
        createdAt: '2023-03-26T07:18:17.136Z',
        updatedAt: '2023-09-27T08:59:42.061Z',
        publishedAt: '2023-03-26T07:18:29.567Z',
        title_tr: 'Galaksi',
        title_en: 'Galaxy',
        title_nl: 'Galaxy',
        description_tr:
          'Uzay/galaksi makro alem.\nBununla birlikte muhteşem\nahenk ve düzene sahip olmaları herkes gibi beni de etkilemiştir.',
        description_en:
          'Galaxy. The macro universe. Their magnificent harmony and order have influenced me, like everyone else.',
        description_nl:
          'Galaxy. Het macro-universum. Hun prachtige harmonie en orde hebben me, net als iedereen, beïnvloed.',
      },
      application: null,
    },
    {
      id: 22,
      message:
        'Het schilderij is mooi. In het content deel is een korte beschrijving gemaakt van de kunst van het Ebru.  De description moet het schilderij in een paar zinnen omschrijven.  De content kan ook het verhaal van het schilderij zijn en kan verteld worden met een lange beschrijving.',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-23T16:31:23.498Z',
      updatedAt: '2023-02-23T16:31:23.580Z',
      publishedAt: '2023-02-23T16:31:23.475Z',
      art: {
        id: 108,
        slug: 'marmering-kunst',
        approvalStatus: 'approved',
        likes: 0,
        views: 0,
        createdAt: '2023-03-26T07:52:09.837Z',
        updatedAt: '2023-09-27T08:53:09.293Z',
        publishedAt: '2023-03-26T07:52:13.854Z',
        title_tr: 'Ebru Sanatı',
        title_en: 'Marbling Art',
        title_nl: 'Marmering Kunst',
        description_tr:
          'Ebru, kağıt üzerine mermerleme sanatıdır. Mermerleme, suya uygulanan su boya ile renkli kağıtların oluşturulabileceği bir resim tekniğidir.',
        description_en:
          'Ebru is the art of marbling on paper. Marbling is a painting technique that can create colorful paper by applying watercolor to it.',
        description_nl:
          'Ebru is de kunst van het marmeren op papier. Marmeren is een schildertechniek waarmee kleurig papier gemaakt kan worden, door er van waterverf op aan te brengen.',
      },
      application: null,
    },
    {
      id: 23,
      message: 'Mooi aquarelwerk',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-24T10:20:21.326Z',
      updatedAt: '2023-02-24T10:20:21.396Z',
      publishedAt: '2023-02-24T10:20:21.317Z',
      art: {
        id: 97,
        slug: 'dageraadtijd',
        approvalStatus: 'approved',
        likes: 0,
        views: 1,
        createdAt: '2023-03-26T07:37:59.833Z',
        updatedAt: '2023-09-27T08:57:15.810Z',
        publishedAt: '2023-03-26T07:38:03.780Z',
        title_tr: 'Şafak Vakti',
        title_en: 'Dawn Time',
        title_nl: 'Dageraad Tijd',
        description_tr: 'Huzur dolu bir şafak vakti..',
        description_en: 'A dawn time filled with peace..',
        description_nl: 'A dageraad tijd gevuld met vrede..',
      },
      application: null,
    },
    {
      id: 24,
      message: 'çekim iyi değil ',
      point: 1,
      status: 'rejected',
      createdAt: '2023-02-24T10:21:01.391Z',
      updatedAt: '2023-02-24T10:21:01.470Z',
      publishedAt: '2023-02-24T10:21:01.383Z',
      art: null,
      application: null,
    },
    {
      id: 25,
      message: ' Het was zeer zinvol werk.\nHeel erg bedankt. ',
      point: 1,
      status: 'approved',
      createdAt: '2023-02-24T10:25:16.199Z',
      updatedAt: '2023-02-24T10:25:16.271Z',
      publishedAt: '2023-02-24T10:25:16.194Z',
      art: {
        id: 110,
        slug: 'onze-yusuf-en-koude-ijzerstaven',
        approvalStatus: 'approved',
        likes: 4,
        views: 3,
        createdAt: '2023-03-26T07:54:17.839Z',
        updatedAt: '2023-09-28T07:39:38.763Z',
        publishedAt: '2023-03-26T07:54:22.808Z',
        title_tr: 'Bizim Yusuf ve Soğuk Demir Çubukları',
        title_en: 'Our Yusuf and cold iron bars',
        title_nl: 'Onze Yusuf en koude ijzerstaven',
        description_tr:
          "Şu anda hayata tutunmaya çalışan Yusuf Kerim Saygın'ın acısına ortak olduğumu söyleyemem ve haksız yere tutuklanan bir anne (Gülten Saygın) ile birlikte olduğumu söyleyemem. Onu cezalandıranların cesaretine hayret etmemek zor. Son günlerinde Yusuf hala kansere karşı mücadele ediyor ve annesinin yokluğu onun için daha da zorlaşıyor.",
        description_en:
          'I dare not say that I share in the suffering of Yusuf Kerim Saygın, who is currently trying to hold onto life, and of a mother (Gülten Saygın) who has been unjustly arrested. It is hard not to be astonished by the audacity of those who have punished him. In his last days, Yusuf is still fighting against cancer, and the absence of his mother only makes it harder for him.',
        description_nl:
          'Ik durf niet te zeggen dat ik deel uitmaak van het lijden van Yusuf Kerim Saygın, die op dit moment probeert vast te houden aan het leven, en een moeder (Gülten Saygın) die onterecht is gearresteerd. Het is moeilijk om niet versteld te staan door het lef van degenen die hem hebben gestraft.. In zijn laatste dagen is Yusuf nog steeds aan het strijden tegen kanker, het gemis van zijn moeder maakt het voor hem alleen maar zwaarder.',
      },
      application: null,
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 3,
      total: 66,
    },
  },
}