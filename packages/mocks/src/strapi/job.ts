import { Job, StrapiCollectionResponse } from '@fc/types'

export const JOB_MOCKS: StrapiCollectionResponse<Job[]> = {
  data: [
    {
      id: 1,
      slug: 'job',
      name_en: 'Photograph',
      name_nl: 'Fotograaf',
      name_tr: 'Fotoğraf',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-01-23T13:42:02.643Z',
      updatedAt: '2023-01-23T13:42:07.333Z',
      platform: {
        id: 1,
        slug: 'kunsthalte',
        name_en: 'Art Station',
        name_nl: 'Kunsthalte',
        name_tr: 'Sanat Durağı',
        description_en:
          'Art stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.',
        description_nl:
          'Het is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.',
        description_tr:
          'Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.',
        content_en:
          "### What is Art Stop?\n\nArt Stop is a community where individuals who have immigrated to the Netherlands and have an interest in art come together both online and in physical spaces. This group serves as a platform where people passionate about both modern and traditional arts share their experiences, exchange knowledge about art, and organize various artistic activities.\n\nArt Stop aims to promote the use of art as a universal tool while increasing awareness of human rights. In pursuit of this goal, it endeavors to harness the power of art to build a more just world.\n\n### What Are the Objectives of Art Stop?\n\nConsidering the foundation's mission, the significance of art as a universal language is undeniable. Therefore, it is essential to recognize the value of art and bring together individuals interested in art. Furthermore, opportunities should be provided to those who wish to enhance their skills in the field of art. Ultimately, Art Stop aims to contribute to the reduction or elimination of human rights violations through art.\n\n### What Can You Do?\n\nYou can contribute to the reduction or cessation of human rights violations by participating in one of the projects featured on our website. Additionally, you can engage in experience sharing or gain new skills by joining these projects. Moreover, you can support us financially by becoming a sponsor.\n\n You can visit our **[club](https://freedomcombination.com/club)** page for our posts, and you can share your works with us by applying to the art stop platform on the **[volunteers](https://freedomcombination.com/volunteers)** page.\n \n You can follow [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) and [website](https://kunsthalte.com) for events.\n \n Art Stop is a platform of the Freedom Combination Foundation.",
        content_nl:
          '### Wat is Kunsthalte?\n\nKunsthalte is een gemeenschap waar individuen die naar Nederland zijn geïmmigreerd en interesse hebben in kunst zowel online als op fysieke locaties samenkomen. Deze groep fungeert als een platform waar mensen met passie voor zowel moderne als traditionele kunst hun ervaringen delen, kennis over kunst uitwisselen en verschillende artistieke activiteiten organiseren.\n\nKunsthalte streeft ernaar het gebruik van kunst als een universeel hulpmiddel te bevorderen en het bewustzijn van mensenrechten te vergroten. In het streven naar dit doel probeert het de kracht van kunst te benutten om een rechtvaardigere wereld op te bouwen.\n\n### Wat zijn de doelstellingen van Kunsthalte?\n\nGezien de missie van de stichting is de betekenis van kunst als universele taal onmiskenbaar. Het is daarom essentieel om de waarde van kunst te erkennen en mensen die geïnteresseerd zijn in kunst samen te brengen. Bovendien moeten er kansen worden geboden aan degenen die hun vaardigheden op het gebied van kunst willen verbeteren. uiteindelijk streeft Kunsthalte ernaar bij te dragen aan de vermindering of eliminatie van schendingen van de mensenrechten door middel van kunst.\n\n### Wat kunt u doen?\n\nU kunt bijdragen aan de vermindering of stopzetting van schendingen van de mensenrechten door deel te nemen aan een van de projecten die op onze website worden gepresenteerd. Daarnaast kunt u deelnemen aan het delen van ervaringen of nieuwe vaardigheden opdoen door deel te nemen aan deze projecten. Bovendien kunt u ons financieel steunen door sponsor te worden.\n\nJe kunt onze **[club](https://freedomcombination.com/nl/club)**-pagina bezoeken voor onze berichten, en je kunt je werken met ons delen door je aan te melden voor het kunststopplatform op de **[vrijwilligers](https://freedomcombination.com/nl/volunteers)**-pagina.\n \n U kunt [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) en [website](https://kunsthalte.com) volgen voor evenementen.\n \nKunsthalte is een platform van Stichting Freedom Combination.',
        content_tr:
          "### Sanat Durağı Nedir?\n\nSanat Durağı, Hollanda'ya göç etmiş ve sanata ilgi duyan bireylerin hem online hem fiziksel ortamlarda buluştuğu bir topluluktur. Bu grup, modern ve geleneksel sanatlarla ilgilenen kişilerin bir araya gelip deneyimlerini paylaştığı, sanatla ilgili bilgi aktarımı yaptığı, aynı zamanda sanatsal etkinlikler düzenlediği bir platformdur.\n\nSanat Durağı, sanatın evrensel bir araç olarak kullanılmasını teşvik ederken, insan haklarına duyarlılığı artırmayı amaçlayan bir platform olarak faaliyet göstermektedir. Bu amaç doğrultusunda, sanatın gücünü kullanarak daha adil bir dünya inşa etmeye çalışır.\n\n### Sanat Durağının Amaçları Nelerdir?\n\nVakfın kuruluş amacı göz önüne alındığında, sanatın evrensel dilinin büyük bir öneme sahip olduğu açıktır. Bu nedenle, sanata değer verilmesi ve sanatla ilgilenen kişilerin bir araya getirilmesi gereklidir. Ayrıca, sanat alanındaki yeteneklerini geliştirmek isteyenlere çeşitli fırsatlar sunulmalıdır. Sonuç olarak, Sanat Durağı, sanatın insan hakları ihlallerinin azalmasına veya sona ermesine katkıda bulunmasını hedefler.\n\n### Neler Yapabilirsiniz?\n\nSitemizde yer alan projelerden birine katılarak insan hakları ihlallerinin azalmasına veya sona ermesine katkıda bulunabilirsiniz. Ayrıca, bu projelerde yer alarak ilgili alanlarda deneyim paylaşımı yapabilir veya yeni deneyimler kazanabilirsiniz. Ayrıca, bize maddi destek sağlayarak sponsor olarak katkıda bulunabilirsiniz.\n\nSanat Durağı, sanatın evrensel bir araç olarak kullanılmasını teşvik ederken, insan haklarına duyarlılığı artırmayı amaçlayan bir platform olarak faaliyet göstermektedir. Bu amaç doğrultusunda, sanatın gücünü kullanarak daha adil bir dünya inşa etmeye çalışır.\n\nPaylaşımlarımız için **[club](https://freedomcombination.com/tr/club)** sayfamızı ziyaret edebilir **[gönüllüler](https://freedomcombination.com/tr/volunteers)** sayfasından sanat durağı platformuna başvuru yaparak siz de eserlerinizi bizimle paylaşabilirsiniz.\n \n Etkinlikler için [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) hesabını ve [web sitesini ](https://kunsthalte.com) takip edebilirsiniz.\n \n Sanat Durağı Freedom Combination Vakfının bir platformudur. \n",
        link: 'https://kunsthalte.com',
        createdAt: '2022-12-03T15:40:03.219Z',
        updatedAt: '2023-09-30T04:17:30.125Z',
        publishedAt: '2022-12-03T15:40:05.163Z',
      },
    },
    {
      id: 2,
      slug: 'job-1',
      name_en: 'Copywriter',
      name_nl: 'Tekstschrijver',
      name_tr: 'Metin yazarı',
      description_en:
        'It does the job of producing tweet content for corporate accounts or generating news from events.',
      description_nl:
        'Het produceert tweet-inhoud voor bedrijfsaccounts of genereert nieuws over evenementen.',
      description_tr:
        'Kurumsal hesaplara tweet içeriği üretme veya yapılan etkinliklerden haber üretme işini yapar. ',
      createdAt: '2023-05-23T11:36:36.757Z',
      updatedAt: '2023-05-23T11:36:40.411Z',
      platform: {
        id: 3,
        slug: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-12-04T05:29:08.945Z',
        updatedAt: '2022-12-04T05:29:10.825Z',
        publishedAt: '2022-12-04T05:29:10.725Z',
      },
    },
    {
      id: 3,
      slug: 'job-2',
      name_en: 'Account user',
      name_nl: 'Account gebruiker',
      name_tr: 'Hesap kullanıcısı',
      description_en:
        'It makes the content given to it suitable for social media platforms and shares it in accordance with the principles determined in the relevant social media accounts.',
      description_nl:
        'Zij maakt de aan haar verstrekte content geschikt voor social media platformen en deelt deze volgens de uitgangspunten bepaald in de betreffende social media accounts.',
      description_tr:
        'Kendisine verilen içerikleri sosyal medya platformlarına uygun hale getirerek ilgili sosyal medya hesaplarında belirlenen ilkeler doğrultusunda paylaşır. ',
      createdAt: '2023-05-23T11:39:57.393Z',
      updatedAt: '2023-05-23T11:39:59.405Z',
      platform: {
        id: 3,
        slug: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-12-04T05:29:08.945Z',
        updatedAt: '2022-12-04T05:29:10.825Z',
        publishedAt: '2022-12-04T05:29:10.725Z',
      },
    },
    {
      id: 6,
      slug: 'job-5',
      name_en: 'Technical crew',
      name_nl: 'Technische bemanning',
      name_tr: 'Teknik ekip',
      description_en:
        'Assisting with tasks such as preparing and moving scenery, cameraman, lighting and sound technician, video editing, and editing and sharing social media content',
      description_nl:
        'Assisteren bij taken zoals het voorbereiden en verplaatsen van decors, cameraman, licht- en geluidstechnicus, videobewerking en het bewerken en delen van sociale media-inhoud',
      description_tr:
        'Sahne hazırlama ve taşıma, kameraman, ışık ve ses teknisyeni, video düzenleme, sosyal medya içeriklerini düzenleme ve paylaşma gibi işlere yardımcı olmak',
      createdAt: '2023-05-23T11:49:35.619Z',
      updatedAt: '2023-05-23T11:50:44.039Z',
      platform: {
        id: 2,
        slug: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n',
        description_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.',
        description_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.',
        content_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n\nOur goal is to raise awareness about human rights and social justice through impactful projects like short films and theater productions, ultimately sparking societal change. We aim to develop projects that resonate with people emotionally, leading to increased awareness and consciousness about these important issues.\n\nYou can follow [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de Media is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.\n\nOns doel is bewustwording te creëren over mensenrechten en sociale rechtvaardigheid door middel van impactvolle projecten zoals korte films en theaterproducties, met als uiteindelijke doel maatschappelijke verandering teweeg te brengen. We streven ernaar projecten te ontwikkelen die mensen emotioneel raken en zo bijdragen aan een groter bewustzijn over deze belangrijke kwesties.\n\nJe kunt [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de Media is een platform van de Stichting Freedom Combination.',
        content_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.\n\nAmacımız, kısa film ve tiyatro gibi etkileyici projeler aracılığıyla insan haklarına ve sosyal adalet konularına dikkat çekmek, bu konularda toplumsal farkındalık oluşturmak ve değişim yaratmaktır. İnsanların duygusal bağ kurabileceği, bilinçlenmelerini sağlayabileceği projeler geliştirerek, bu önemli mesajları etkili bir şekilde iletmeyi amaçlıyoruz.\n\nEtkinlikler için [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de Media Freedom Combination Vakfının bir platformudur. ',
        link: null,
        createdAt: '2022-12-04T05:27:03.339Z',
        updatedAt: '2023-12-27T10:56:18.544Z',
        publishedAt: '2022-12-04T05:27:05.050Z',
      },
    },
    {
      id: 5,
      slug: 'job-4',
      name_en: 'Scriptwriter',
      name_nl: 'scenarioschrijver',
      name_tr: 'Senarist',
      description_en:
        'Short films, plays, sketches, etc. Writing scripts and articles to produce content for YouTube as well as other social media platforms and managing them according to the project',
      description_nl:
        'Korte films, toneelstukken, sketches, enz. Scripts en artikelen schrijven om inhoud voor YouTube en andere sociale mediaplatforms te produceren en deze volgens het project te beheren',
      description_tr:
        "Kısa film, tiyatro oyunu, skeçler vb. YouTube'a ayrıca diğer sosyal medya platformlarina içerikler üretmek için senaryolar ve yazilar yazmak ayrıca bunları projeye göre yönetmek ",
      createdAt: '2023-05-23T11:44:40.249Z',
      updatedAt: '2023-05-23T11:53:50.066Z',
      platform: {
        id: 2,
        slug: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n',
        description_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.',
        description_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.',
        content_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n\nOur goal is to raise awareness about human rights and social justice through impactful projects like short films and theater productions, ultimately sparking societal change. We aim to develop projects that resonate with people emotionally, leading to increased awareness and consciousness about these important issues.\n\nYou can follow [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de Media is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.\n\nOns doel is bewustwording te creëren over mensenrechten en sociale rechtvaardigheid door middel van impactvolle projecten zoals korte films en theaterproducties, met als uiteindelijke doel maatschappelijke verandering teweeg te brengen. We streven ernaar projecten te ontwikkelen die mensen emotioneel raken en zo bijdragen aan een groter bewustzijn over deze belangrijke kwesties.\n\nJe kunt [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de Media is een platform van de Stichting Freedom Combination.',
        content_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.\n\nAmacımız, kısa film ve tiyatro gibi etkileyici projeler aracılığıyla insan haklarına ve sosyal adalet konularına dikkat çekmek, bu konularda toplumsal farkındalık oluşturmak ve değişim yaratmaktır. İnsanların duygusal bağ kurabileceği, bilinçlenmelerini sağlayabileceği projeler geliştirerek, bu önemli mesajları etkili bir şekilde iletmeyi amaçlıyoruz.\n\nEtkinlikler için [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de Media Freedom Combination Vakfının bir platformudur. ',
        link: null,
        createdAt: '2022-12-04T05:27:03.339Z',
        updatedAt: '2023-12-27T10:56:18.544Z',
        publishedAt: '2022-12-04T05:27:05.050Z',
      },
    },
    {
      id: 4,
      slug: 'job-3',
      name_en: 'Actor',
      name_nl: 'Acteur',
      name_tr: 'Oyuncu',
      description_en: 'Acting in short films, theater and YouTube videos',
      description_nl: "Acteren in korte films, theater en YouTube-video's",
      description_tr:
        'Kısa film, tiyatro ve YouTube videolarında oyunculuk yapmak',
      createdAt: '2023-05-23T11:42:37.553Z',
      updatedAt: '2023-05-23T11:54:53.351Z',
      platform: {
        id: 2,
        slug: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n',
        description_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.',
        description_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.',
        content_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n\nOur goal is to raise awareness about human rights and social justice through impactful projects like short films and theater productions, ultimately sparking societal change. We aim to develop projects that resonate with people emotionally, leading to increased awareness and consciousness about these important issues.\n\nYou can follow [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de Media is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.\n\nOns doel is bewustwording te creëren over mensenrechten en sociale rechtvaardigheid door middel van impactvolle projecten zoals korte films en theaterproducties, met als uiteindelijke doel maatschappelijke verandering teweeg te brengen. We streven ernaar projecten te ontwikkelen die mensen emotioneel raken en zo bijdragen aan een groter bewustzijn over deze belangrijke kwesties.\n\nJe kunt [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de Media is een platform van de Stichting Freedom Combination.',
        content_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.\n\nAmacımız, kısa film ve tiyatro gibi etkileyici projeler aracılığıyla insan haklarına ve sosyal adalet konularına dikkat çekmek, bu konularda toplumsal farkındalık oluşturmak ve değişim yaratmaktır. İnsanların duygusal bağ kurabileceği, bilinçlenmelerini sağlayabileceği projeler geliştirerek, bu önemli mesajları etkili bir şekilde iletmeyi amaçlıyoruz.\n\nEtkinlikler için [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de Media Freedom Combination Vakfının bir platformudur. ',
        link: null,
        createdAt: '2022-12-04T05:27:03.339Z',
        updatedAt: '2023-12-27T10:56:18.544Z',
        publishedAt: '2022-12-04T05:27:05.050Z',
      },
    },
    {
      id: 8,
      slug: 'job-7',
      name_en: 'Guitarist',
      name_nl: 'Gitarist',
      name_tr: 'Gitarist',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-06-04T10:32:01.821Z',
      updatedAt: '2023-06-11T20:18:34.227Z',
      platform: {
        id: 5,
        slug: 'rhythmic-dreams',
        name_en: 'Rhythmic Dreams',
        name_nl: 'Wees  Muziek',
        name_tr: 'Wees Muzik',
        description_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.',
        description_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.',
        description_tr:
          'Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.',
        content_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.\n\nThere are music groups within our platform.\nOur music groups\n\n**Sound of Change Music**\n\nA bunch of people who aims to be a voice for silence.\n\nYou can follow [Instagram](https://www.instagram.com/soundofchangemusic/) and [Youtube](https://www.youtube.com/@soundofchangemusic) for events.\n\nSound of Change Music is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.\n\nEr zijn muziekgroepen binnen ons platform.\nOnze muziekgroepen\n\n**Sound of Change Music**\n\nEen handjevol mensen die de stem van de stilte willen zijn.\n\nJe kunt [Instagram](https://www.instagram.com/soundofchangemusic/) en [Youtube](https://www.youtube.com/@soundofchangemusic) volgen voor evenementen.\n\nSound of Change Music is een platform van stichting Wees.',
        content_tr:
          "Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.\n\nPlatformumuz bünyesinde müzik grupları bulunmaktadır. \nMuzik gruplarımız\n\n**Sound of Change Music**\n\nSessizliğin sesi olmayı hedefleyen bir avuç insan.\n\nEtkinlikler için [Instagram](https://www.instagram.com/soundofchangemusic/) ve  [Youtube](https://www.youtube.com/@soundofchangemusic) hesaplarını takip edebilirsiniz. \n\nSound of Change Music Wee Vakfı'nın bir platformudur. ",
        link: null,
        createdAt: '2023-03-14T11:42:29.955Z',
        updatedAt: '2023-12-15T22:22:50.394Z',
        publishedAt: '2023-06-05T14:49:55.056Z',
      },
    },
    {
      id: 9,
      slug: 'job-8',
      name_en: 'Soloist',
      name_nl: 'Solist',
      name_tr: 'Solist',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-06-04T10:48:52.151Z',
      updatedAt: '2023-06-11T20:18:41.723Z',
      platform: {
        id: 5,
        slug: 'rhythmic-dreams',
        name_en: 'Rhythmic Dreams',
        name_nl: 'Wees  Muziek',
        name_tr: 'Wees Muzik',
        description_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.',
        description_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.',
        description_tr:
          'Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.',
        content_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.\n\nThere are music groups within our platform.\nOur music groups\n\n**Sound of Change Music**\n\nA bunch of people who aims to be a voice for silence.\n\nYou can follow [Instagram](https://www.instagram.com/soundofchangemusic/) and [Youtube](https://www.youtube.com/@soundofchangemusic) for events.\n\nSound of Change Music is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.\n\nEr zijn muziekgroepen binnen ons platform.\nOnze muziekgroepen\n\n**Sound of Change Music**\n\nEen handjevol mensen die de stem van de stilte willen zijn.\n\nJe kunt [Instagram](https://www.instagram.com/soundofchangemusic/) en [Youtube](https://www.youtube.com/@soundofchangemusic) volgen voor evenementen.\n\nSound of Change Music is een platform van stichting Wees.',
        content_tr:
          "Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.\n\nPlatformumuz bünyesinde müzik grupları bulunmaktadır. \nMuzik gruplarımız\n\n**Sound of Change Music**\n\nSessizliğin sesi olmayı hedefleyen bir avuç insan.\n\nEtkinlikler için [Instagram](https://www.instagram.com/soundofchangemusic/) ve  [Youtube](https://www.youtube.com/@soundofchangemusic) hesaplarını takip edebilirsiniz. \n\nSound of Change Music Wee Vakfı'nın bir platformudur. ",
        link: null,
        createdAt: '2023-03-14T11:42:29.955Z',
        updatedAt: '2023-12-15T22:22:50.394Z',
        publishedAt: '2023-06-05T14:49:55.056Z',
      },
    },
    {
      id: 10,
      slug: 'job-9',
      name_en: 'Author',
      name_nl: 'Auteur',
      name_tr: 'Yazar',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-05T15:10:56.415Z',
      updatedAt: '2023-08-05T15:10:57.793Z',
      platform: {
        id: 4,
        slug: 'academy',
        name_en: 'FC Academy',
        name_nl: 'FC Academie',
        name_tr: 'FC Akademi',
        description_en:
          'We have volunteers who support the activities of our foundation in many areas. These are areas such as management, social media expertise, acting, directing, illustration, digital drawing, music, painting and calligraphy. Announcing human rights violations to the public is possible with the support we receive from our volunteers. Supporting them is our too top priority. ',
        description_nl:
          'We hebben vrijwilligers die de activiteiten van onze stichting op veel gebieden ondersteunen. Dit zijn gebieden als management, social media-expertise, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen en kalligrafie. Het bekendmaken van mensenrechtenschendingen aan het publiek is mogelijk met de steun die we krijgen van onze vrijwilligers. Hen steunen is ook onze topprioriteit.',
        description_tr:
          'Vakfımızın faaliyetlerine bir çok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illustrasyon, dijital çizim, müzik, resim, kaligrafi gibi alanlardır. İnsan hakları ihlallerinin kamuoyunda duyurulması gönüllülerimizden aldığımız bu destekle mümkün olmaktadır.  Bizim de onları desteklememiz birincil önceliğimizdir. ',
        content_en:
          "Our foundation is supported by volunteers in various fields, including management, social media expertise, acting, directing, illustration, digital drawing, music, painting, calligraphy, and more. The dissemination of human rights violations to the public is made possible through the support we receive from our volunteers. We believe that as our volunteers further develop their skills in their respective areas of interest, our success in raising awareness of human rights violations and creating awareness in society will increase.\n\nIt is hoped that as violations are brought to the public's attention, they will decrease or come to an end. Therefore, supporting our volunteers in their self-improvement is our top priority. You can find information about the areas in which we work by visiting our courses, discussions, and software pages.",
        content_nl:
          "Onze stichting wordt ondersteund door vrijwilligers in verschillende vakgebieden, waaronder management, expertise op het gebied van sociale media, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen, kalligrafie en meer. De verspreiding van schendingen van de mensenrechten naar het publiek wordt mogelijk gemaakt door de steun die we ontvangen van onze vrijwilligers. We geloven dat naarmate onze vrijwilligers hun vaardigheden verder ontwikkelen in hun respectieve interessegebieden, ons succes in het vergroten van het bewustzijn van schendingen van de mensenrechten en het creëren van bewustzijn in de samenleving zal toenemen.\n\nHet is de hoop dat naarmate schendingen onder de aandacht van het publiek worden gebracht, ze zullen afnemen of tot een einde zullen komen. Daarom is het ondersteunen van onze vrijwilligers in hun zelfverbetering onze hoogste prioriteit. U kunt informatie vinden over de gebieden waarop we werken door onze cursussen, discussies en softwarepagina's te bezoeken.",
        content_tr:
          'Vakfımızın faaliyetlerine birçok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar arasında yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illüstrasyon, dijital çizim, müzik, resim, kaligrafi gibi çeşitli alanlar yer almaktadır. İnsan hakları ihlallerinin kamuoyuna duyurulması, gönüllülerimizden aldığımız bu destekle mümkün olmaktadır. Gönüllülerimiz, ilgilendikleri alanlarda sahip oldukları yetenekleri daha da geliştirdikçe, insan hakları ihlallerini duyurma ve toplumda farkındalık yaratma konusundaki başarılarımızın artacağına inanıyoruz.\n\nİhlallerin kamuoyunda duyurulmasıyla birlikte ihlallerin azalması veya son bulması umulmaktadır. Bu nedenle gönüllülerimizin kendilerini geliştirmelerine destek vermek en büyük önceliğimizdir. Hangi alanlarda çalışmalar yaptığımızı görmek için kurslar, söyleşiler ve yazılım sayfalarını ziyaret edebilirsiniz.',
        link: null,
        createdAt: '2022-12-04T05:30:49.648Z',
        updatedAt: '2023-09-30T04:29:21.710Z',
        publishedAt: '2022-12-04T05:30:51.145Z',
      },
    },
    {
      id: 11,
      slug: 'job-10',
      name_en: 'Musician',
      name_nl: 'Musicus',
      name_tr: 'Müzisyen',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T01:56:36.664Z',
      updatedAt: '2023-08-11T01:57:12.412Z',
      platform: {
        id: 5,
        slug: 'rhythmic-dreams',
        name_en: 'Rhythmic Dreams',
        name_nl: 'Wees  Muziek',
        name_tr: 'Wees Muzik',
        description_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.',
        description_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.',
        description_tr:
          'Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.',
        content_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.\n\nThere are music groups within our platform.\nOur music groups\n\n**Sound of Change Music**\n\nA bunch of people who aims to be a voice for silence.\n\nYou can follow [Instagram](https://www.instagram.com/soundofchangemusic/) and [Youtube](https://www.youtube.com/@soundofchangemusic) for events.\n\nSound of Change Music is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.\n\nEr zijn muziekgroepen binnen ons platform.\nOnze muziekgroepen\n\n**Sound of Change Music**\n\nEen handjevol mensen die de stem van de stilte willen zijn.\n\nJe kunt [Instagram](https://www.instagram.com/soundofchangemusic/) en [Youtube](https://www.youtube.com/@soundofchangemusic) volgen voor evenementen.\n\nSound of Change Music is een platform van stichting Wees.',
        content_tr:
          "Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.\n\nPlatformumuz bünyesinde müzik grupları bulunmaktadır. \nMuzik gruplarımız\n\n**Sound of Change Music**\n\nSessizliğin sesi olmayı hedefleyen bir avuç insan.\n\nEtkinlikler için [Instagram](https://www.instagram.com/soundofchangemusic/) ve  [Youtube](https://www.youtube.com/@soundofchangemusic) hesaplarını takip edebilirsiniz. \n\nSound of Change Music Wee Vakfı'nın bir platformudur. ",
        link: null,
        createdAt: '2023-03-14T11:42:29.955Z',
        updatedAt: '2023-12-15T22:22:50.394Z',
        publishedAt: '2023-06-05T14:49:55.056Z',
      },
    },
    {
      id: 12,
      slug: 'job-11',
      name_en: 'Designer',
      name_nl: 'Ontwerper',
      name_tr: 'Tasarımcı',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T01:59:18.705Z',
      updatedAt: '2023-08-11T01:59:20.030Z',
      platform: {
        id: 5,
        slug: 'rhythmic-dreams',
        name_en: 'Rhythmic Dreams',
        name_nl: 'Wees  Muziek',
        name_tr: 'Wees Muzik',
        description_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.',
        description_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.',
        description_tr:
          'Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.',
        content_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.\n\nThere are music groups within our platform.\nOur music groups\n\n**Sound of Change Music**\n\nA bunch of people who aims to be a voice for silence.\n\nYou can follow [Instagram](https://www.instagram.com/soundofchangemusic/) and [Youtube](https://www.youtube.com/@soundofchangemusic) for events.\n\nSound of Change Music is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.\n\nEr zijn muziekgroepen binnen ons platform.\nOnze muziekgroepen\n\n**Sound of Change Music**\n\nEen handjevol mensen die de stem van de stilte willen zijn.\n\nJe kunt [Instagram](https://www.instagram.com/soundofchangemusic/) en [Youtube](https://www.youtube.com/@soundofchangemusic) volgen voor evenementen.\n\nSound of Change Music is een platform van stichting Wees.',
        content_tr:
          "Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.\n\nPlatformumuz bünyesinde müzik grupları bulunmaktadır. \nMuzik gruplarımız\n\n**Sound of Change Music**\n\nSessizliğin sesi olmayı hedefleyen bir avuç insan.\n\nEtkinlikler için [Instagram](https://www.instagram.com/soundofchangemusic/) ve  [Youtube](https://www.youtube.com/@soundofchangemusic) hesaplarını takip edebilirsiniz. \n\nSound of Change Music Wee Vakfı'nın bir platformudur. ",
        link: null,
        createdAt: '2023-03-14T11:42:29.955Z',
        updatedAt: '2023-12-15T22:22:50.394Z',
        publishedAt: '2023-06-05T14:49:55.056Z',
      },
    },
    {
      id: 13,
      slug: 'job-12',
      name_en: 'Social media expert',
      name_nl: 'Expert op het gebied van sociale media',
      name_tr: 'Sosyal medya uzmanı',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:01:33.049Z',
      updatedAt: '2023-08-11T02:01:34.311Z',
      platform: {
        id: 2,
        slug: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n',
        description_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.',
        description_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.',
        content_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n\nOur goal is to raise awareness about human rights and social justice through impactful projects like short films and theater productions, ultimately sparking societal change. We aim to develop projects that resonate with people emotionally, leading to increased awareness and consciousness about these important issues.\n\nYou can follow [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de Media is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.\n\nOns doel is bewustwording te creëren over mensenrechten en sociale rechtvaardigheid door middel van impactvolle projecten zoals korte films en theaterproducties, met als uiteindelijke doel maatschappelijke verandering teweeg te brengen. We streven ernaar projecten te ontwikkelen die mensen emotioneel raken en zo bijdragen aan een groter bewustzijn over deze belangrijke kwesties.\n\nJe kunt [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de Media is een platform van de Stichting Freedom Combination.',
        content_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.\n\nAmacımız, kısa film ve tiyatro gibi etkileyici projeler aracılığıyla insan haklarına ve sosyal adalet konularına dikkat çekmek, bu konularda toplumsal farkındalık oluşturmak ve değişim yaratmaktır. İnsanların duygusal bağ kurabileceği, bilinçlenmelerini sağlayabileceği projeler geliştirerek, bu önemli mesajları etkili bir şekilde iletmeyi amaçlıyoruz.\n\nEtkinlikler için [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de Media Freedom Combination Vakfının bir platformudur. ',
        link: null,
        createdAt: '2022-12-04T05:27:03.339Z',
        updatedAt: '2023-12-27T10:56:18.544Z',
        publishedAt: '2022-12-04T05:27:05.050Z',
      },
    },
    {
      id: 14,
      slug: 'job-13',
      name_en: 'Dubbing',
      name_nl: 'Nasynchronisatie',
      name_tr: 'Seslendirme',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:04:02.657Z',
      updatedAt: '2023-08-11T02:04:05.809Z',
      platform: {
        id: 3,
        slug: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-12-04T05:29:08.945Z',
        updatedAt: '2022-12-04T05:29:10.825Z',
        publishedAt: '2022-12-04T05:29:10.725Z',
      },
    },
    {
      id: 15,
      slug: 'job-14',
      name_en: 'Video editor',
      name_nl: 'Video bewerker',
      name_tr: 'Video editör',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:05:05.154Z',
      updatedAt: '2023-08-11T02:05:47.288Z',
      platform: {
        id: 3,
        slug: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-12-04T05:29:08.945Z',
        updatedAt: '2022-12-04T05:29:10.825Z',
        publishedAt: '2022-12-04T05:29:10.725Z',
      },
    },
    {
      id: 16,
      slug: 'job-15',
      name_en: 'Project coordinator',
      name_nl: 'Project coördinator',
      name_tr: 'Proje koordinatörü',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:06:44.661Z',
      updatedAt: '2023-08-11T02:06:46.001Z',
      platform: {
        id: 4,
        slug: 'academy',
        name_en: 'FC Academy',
        name_nl: 'FC Academie',
        name_tr: 'FC Akademi',
        description_en:
          'We have volunteers who support the activities of our foundation in many areas. These are areas such as management, social media expertise, acting, directing, illustration, digital drawing, music, painting and calligraphy. Announcing human rights violations to the public is possible with the support we receive from our volunteers. Supporting them is our too top priority. ',
        description_nl:
          'We hebben vrijwilligers die de activiteiten van onze stichting op veel gebieden ondersteunen. Dit zijn gebieden als management, social media-expertise, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen en kalligrafie. Het bekendmaken van mensenrechtenschendingen aan het publiek is mogelijk met de steun die we krijgen van onze vrijwilligers. Hen steunen is ook onze topprioriteit.',
        description_tr:
          'Vakfımızın faaliyetlerine bir çok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illustrasyon, dijital çizim, müzik, resim, kaligrafi gibi alanlardır. İnsan hakları ihlallerinin kamuoyunda duyurulması gönüllülerimizden aldığımız bu destekle mümkün olmaktadır.  Bizim de onları desteklememiz birincil önceliğimizdir. ',
        content_en:
          "Our foundation is supported by volunteers in various fields, including management, social media expertise, acting, directing, illustration, digital drawing, music, painting, calligraphy, and more. The dissemination of human rights violations to the public is made possible through the support we receive from our volunteers. We believe that as our volunteers further develop their skills in their respective areas of interest, our success in raising awareness of human rights violations and creating awareness in society will increase.\n\nIt is hoped that as violations are brought to the public's attention, they will decrease or come to an end. Therefore, supporting our volunteers in their self-improvement is our top priority. You can find information about the areas in which we work by visiting our courses, discussions, and software pages.",
        content_nl:
          "Onze stichting wordt ondersteund door vrijwilligers in verschillende vakgebieden, waaronder management, expertise op het gebied van sociale media, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen, kalligrafie en meer. De verspreiding van schendingen van de mensenrechten naar het publiek wordt mogelijk gemaakt door de steun die we ontvangen van onze vrijwilligers. We geloven dat naarmate onze vrijwilligers hun vaardigheden verder ontwikkelen in hun respectieve interessegebieden, ons succes in het vergroten van het bewustzijn van schendingen van de mensenrechten en het creëren van bewustzijn in de samenleving zal toenemen.\n\nHet is de hoop dat naarmate schendingen onder de aandacht van het publiek worden gebracht, ze zullen afnemen of tot een einde zullen komen. Daarom is het ondersteunen van onze vrijwilligers in hun zelfverbetering onze hoogste prioriteit. U kunt informatie vinden over de gebieden waarop we werken door onze cursussen, discussies en softwarepagina's te bezoeken.",
        content_tr:
          'Vakfımızın faaliyetlerine birçok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar arasında yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illüstrasyon, dijital çizim, müzik, resim, kaligrafi gibi çeşitli alanlar yer almaktadır. İnsan hakları ihlallerinin kamuoyuna duyurulması, gönüllülerimizden aldığımız bu destekle mümkün olmaktadır. Gönüllülerimiz, ilgilendikleri alanlarda sahip oldukları yetenekleri daha da geliştirdikçe, insan hakları ihlallerini duyurma ve toplumda farkındalık yaratma konusundaki başarılarımızın artacağına inanıyoruz.\n\nİhlallerin kamuoyunda duyurulmasıyla birlikte ihlallerin azalması veya son bulması umulmaktadır. Bu nedenle gönüllülerimizin kendilerini geliştirmelerine destek vermek en büyük önceliğimizdir. Hangi alanlarda çalışmalar yaptığımızı görmek için kurslar, söyleşiler ve yazılım sayfalarını ziyaret edebilirsiniz.',
        link: null,
        createdAt: '2022-12-04T05:30:49.648Z',
        updatedAt: '2023-09-30T04:29:21.710Z',
        publishedAt: '2022-12-04T05:30:51.145Z',
      },
    },
    {
      id: 17,
      slug: 'job-16',
      name_en: 'Digital marketing specialist',
      name_nl: 'Specialist in digitale marketing',
      name_tr: 'Dijital pazarlama uzmanı',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:07:55.210Z',
      updatedAt: '2023-08-11T02:07:56.645Z',
      platform: {
        id: 4,
        slug: 'academy',
        name_en: 'FC Academy',
        name_nl: 'FC Academie',
        name_tr: 'FC Akademi',
        description_en:
          'We have volunteers who support the activities of our foundation in many areas. These are areas such as management, social media expertise, acting, directing, illustration, digital drawing, music, painting and calligraphy. Announcing human rights violations to the public is possible with the support we receive from our volunteers. Supporting them is our too top priority. ',
        description_nl:
          'We hebben vrijwilligers die de activiteiten van onze stichting op veel gebieden ondersteunen. Dit zijn gebieden als management, social media-expertise, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen en kalligrafie. Het bekendmaken van mensenrechtenschendingen aan het publiek is mogelijk met de steun die we krijgen van onze vrijwilligers. Hen steunen is ook onze topprioriteit.',
        description_tr:
          'Vakfımızın faaliyetlerine bir çok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illustrasyon, dijital çizim, müzik, resim, kaligrafi gibi alanlardır. İnsan hakları ihlallerinin kamuoyunda duyurulması gönüllülerimizden aldığımız bu destekle mümkün olmaktadır.  Bizim de onları desteklememiz birincil önceliğimizdir. ',
        content_en:
          "Our foundation is supported by volunteers in various fields, including management, social media expertise, acting, directing, illustration, digital drawing, music, painting, calligraphy, and more. The dissemination of human rights violations to the public is made possible through the support we receive from our volunteers. We believe that as our volunteers further develop their skills in their respective areas of interest, our success in raising awareness of human rights violations and creating awareness in society will increase.\n\nIt is hoped that as violations are brought to the public's attention, they will decrease or come to an end. Therefore, supporting our volunteers in their self-improvement is our top priority. You can find information about the areas in which we work by visiting our courses, discussions, and software pages.",
        content_nl:
          "Onze stichting wordt ondersteund door vrijwilligers in verschillende vakgebieden, waaronder management, expertise op het gebied van sociale media, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen, kalligrafie en meer. De verspreiding van schendingen van de mensenrechten naar het publiek wordt mogelijk gemaakt door de steun die we ontvangen van onze vrijwilligers. We geloven dat naarmate onze vrijwilligers hun vaardigheden verder ontwikkelen in hun respectieve interessegebieden, ons succes in het vergroten van het bewustzijn van schendingen van de mensenrechten en het creëren van bewustzijn in de samenleving zal toenemen.\n\nHet is de hoop dat naarmate schendingen onder de aandacht van het publiek worden gebracht, ze zullen afnemen of tot een einde zullen komen. Daarom is het ondersteunen van onze vrijwilligers in hun zelfverbetering onze hoogste prioriteit. U kunt informatie vinden over de gebieden waarop we werken door onze cursussen, discussies en softwarepagina's te bezoeken.",
        content_tr:
          'Vakfımızın faaliyetlerine birçok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar arasında yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illüstrasyon, dijital çizim, müzik, resim, kaligrafi gibi çeşitli alanlar yer almaktadır. İnsan hakları ihlallerinin kamuoyuna duyurulması, gönüllülerimizden aldığımız bu destekle mümkün olmaktadır. Gönüllülerimiz, ilgilendikleri alanlarda sahip oldukları yetenekleri daha da geliştirdikçe, insan hakları ihlallerini duyurma ve toplumda farkındalık yaratma konusundaki başarılarımızın artacağına inanıyoruz.\n\nİhlallerin kamuoyunda duyurulmasıyla birlikte ihlallerin azalması veya son bulması umulmaktadır. Bu nedenle gönüllülerimizin kendilerini geliştirmelerine destek vermek en büyük önceliğimizdir. Hangi alanlarda çalışmalar yaptığımızı görmek için kurslar, söyleşiler ve yazılım sayfalarını ziyaret edebilirsiniz.',
        link: null,
        createdAt: '2022-12-04T05:30:49.648Z',
        updatedAt: '2023-09-30T04:29:21.710Z',
        publishedAt: '2022-12-04T05:30:51.145Z',
      },
    },
    {
      id: 18,
      slug: 'job-17',
      name_en: 'Cameraman',
      name_nl: 'Cameraman',
      name_tr: 'Kameraman',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:09:07.213Z',
      updatedAt: '2023-08-11T02:09:08.139Z',
      platform: {
        id: 3,
        slug: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-12-04T05:29:08.945Z',
        updatedAt: '2022-12-04T05:29:10.825Z',
        publishedAt: '2022-12-04T05:29:10.725Z',
      },
    },
    {
      id: 19,
      slug: 'job-18',
      name_en: 'Illustrator',
      name_nl: 'Illustrator',
      name_tr: 'illüstratör',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:10:18.155Z',
      updatedAt: '2023-08-11T02:10:19.214Z',
      platform: {
        id: 1,
        slug: 'kunsthalte',
        name_en: 'Art Station',
        name_nl: 'Kunsthalte',
        name_tr: 'Sanat Durağı',
        description_en:
          'Art stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.',
        description_nl:
          'Het is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.',
        description_tr:
          'Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.',
        content_en:
          "### What is Art Stop?\n\nArt Stop is a community where individuals who have immigrated to the Netherlands and have an interest in art come together both online and in physical spaces. This group serves as a platform where people passionate about both modern and traditional arts share their experiences, exchange knowledge about art, and organize various artistic activities.\n\nArt Stop aims to promote the use of art as a universal tool while increasing awareness of human rights. In pursuit of this goal, it endeavors to harness the power of art to build a more just world.\n\n### What Are the Objectives of Art Stop?\n\nConsidering the foundation's mission, the significance of art as a universal language is undeniable. Therefore, it is essential to recognize the value of art and bring together individuals interested in art. Furthermore, opportunities should be provided to those who wish to enhance their skills in the field of art. Ultimately, Art Stop aims to contribute to the reduction or elimination of human rights violations through art.\n\n### What Can You Do?\n\nYou can contribute to the reduction or cessation of human rights violations by participating in one of the projects featured on our website. Additionally, you can engage in experience sharing or gain new skills by joining these projects. Moreover, you can support us financially by becoming a sponsor.\n\n You can visit our **[club](https://freedomcombination.com/club)** page for our posts, and you can share your works with us by applying to the art stop platform on the **[volunteers](https://freedomcombination.com/volunteers)** page.\n \n You can follow [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) and [website](https://kunsthalte.com) for events.\n \n Art Stop is a platform of the Freedom Combination Foundation.",
        content_nl:
          '### Wat is Kunsthalte?\n\nKunsthalte is een gemeenschap waar individuen die naar Nederland zijn geïmmigreerd en interesse hebben in kunst zowel online als op fysieke locaties samenkomen. Deze groep fungeert als een platform waar mensen met passie voor zowel moderne als traditionele kunst hun ervaringen delen, kennis over kunst uitwisselen en verschillende artistieke activiteiten organiseren.\n\nKunsthalte streeft ernaar het gebruik van kunst als een universeel hulpmiddel te bevorderen en het bewustzijn van mensenrechten te vergroten. In het streven naar dit doel probeert het de kracht van kunst te benutten om een rechtvaardigere wereld op te bouwen.\n\n### Wat zijn de doelstellingen van Kunsthalte?\n\nGezien de missie van de stichting is de betekenis van kunst als universele taal onmiskenbaar. Het is daarom essentieel om de waarde van kunst te erkennen en mensen die geïnteresseerd zijn in kunst samen te brengen. Bovendien moeten er kansen worden geboden aan degenen die hun vaardigheden op het gebied van kunst willen verbeteren. uiteindelijk streeft Kunsthalte ernaar bij te dragen aan de vermindering of eliminatie van schendingen van de mensenrechten door middel van kunst.\n\n### Wat kunt u doen?\n\nU kunt bijdragen aan de vermindering of stopzetting van schendingen van de mensenrechten door deel te nemen aan een van de projecten die op onze website worden gepresenteerd. Daarnaast kunt u deelnemen aan het delen van ervaringen of nieuwe vaardigheden opdoen door deel te nemen aan deze projecten. Bovendien kunt u ons financieel steunen door sponsor te worden.\n\nJe kunt onze **[club](https://freedomcombination.com/nl/club)**-pagina bezoeken voor onze berichten, en je kunt je werken met ons delen door je aan te melden voor het kunststopplatform op de **[vrijwilligers](https://freedomcombination.com/nl/volunteers)**-pagina.\n \n U kunt [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) en [website](https://kunsthalte.com) volgen voor evenementen.\n \nKunsthalte is een platform van Stichting Freedom Combination.',
        content_tr:
          "### Sanat Durağı Nedir?\n\nSanat Durağı, Hollanda'ya göç etmiş ve sanata ilgi duyan bireylerin hem online hem fiziksel ortamlarda buluştuğu bir topluluktur. Bu grup, modern ve geleneksel sanatlarla ilgilenen kişilerin bir araya gelip deneyimlerini paylaştığı, sanatla ilgili bilgi aktarımı yaptığı, aynı zamanda sanatsal etkinlikler düzenlediği bir platformdur.\n\nSanat Durağı, sanatın evrensel bir araç olarak kullanılmasını teşvik ederken, insan haklarına duyarlılığı artırmayı amaçlayan bir platform olarak faaliyet göstermektedir. Bu amaç doğrultusunda, sanatın gücünü kullanarak daha adil bir dünya inşa etmeye çalışır.\n\n### Sanat Durağının Amaçları Nelerdir?\n\nVakfın kuruluş amacı göz önüne alındığında, sanatın evrensel dilinin büyük bir öneme sahip olduğu açıktır. Bu nedenle, sanata değer verilmesi ve sanatla ilgilenen kişilerin bir araya getirilmesi gereklidir. Ayrıca, sanat alanındaki yeteneklerini geliştirmek isteyenlere çeşitli fırsatlar sunulmalıdır. Sonuç olarak, Sanat Durağı, sanatın insan hakları ihlallerinin azalmasına veya sona ermesine katkıda bulunmasını hedefler.\n\n### Neler Yapabilirsiniz?\n\nSitemizde yer alan projelerden birine katılarak insan hakları ihlallerinin azalmasına veya sona ermesine katkıda bulunabilirsiniz. Ayrıca, bu projelerde yer alarak ilgili alanlarda deneyim paylaşımı yapabilir veya yeni deneyimler kazanabilirsiniz. Ayrıca, bize maddi destek sağlayarak sponsor olarak katkıda bulunabilirsiniz.\n\nSanat Durağı, sanatın evrensel bir araç olarak kullanılmasını teşvik ederken, insan haklarına duyarlılığı artırmayı amaçlayan bir platform olarak faaliyet göstermektedir. Bu amaç doğrultusunda, sanatın gücünü kullanarak daha adil bir dünya inşa etmeye çalışır.\n\nPaylaşımlarımız için **[club](https://freedomcombination.com/tr/club)** sayfamızı ziyaret edebilir **[gönüllüler](https://freedomcombination.com/tr/volunteers)** sayfasından sanat durağı platformuna başvuru yaparak siz de eserlerinizi bizimle paylaşabilirsiniz.\n \n Etkinlikler için [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) hesabını ve [web sitesini ](https://kunsthalte.com) takip edebilirsiniz.\n \n Sanat Durağı Freedom Combination Vakfının bir platformudur. \n",
        link: 'https://kunsthalte.com',
        createdAt: '2022-12-03T15:40:03.219Z',
        updatedAt: '2023-09-30T04:17:30.125Z',
        publishedAt: '2022-12-03T15:40:05.163Z',
      },
    },
    {
      id: 24,
      slug: 'job-23',
      name_en: 'Director of photography',
      name_nl: 'Directeur fotografie',
      name_tr: 'Görüntü yönetmeni',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:18:25.647Z',
      updatedAt: '2023-08-11T02:18:26.713Z',
      platform: {
        id: 2,
        slug: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n',
        description_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.',
        description_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.',
        content_en:
          'Through this platform, our aim is to convey universal human rights through media and communication to a wider audience. Simultaneously, we aspire to gain experience in fields such as acting, directing, and scriptwriting, continuously improving our skills in these areas and building strong references through internships.\n\nOur goal is to raise awareness about human rights and social justice through impactful projects like short films and theater productions, ultimately sparking societal change. We aim to develop projects that resonate with people emotionally, leading to increased awareness and consciousness about these important issues.\n\nYou can follow [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de Media is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Dit platform stelt ons in staat universele mensenrechten te communiceren via media en communicatie, met als doel een breder publiek te bereiken. Tegelijkertijd streven we ernaar om ervaring op te doen in vakgebieden zoals acteren, regisseren en scenarioschrijven, waarbij we voortdurend onze vaardigheden verbeteren en sterke referenties opbouwen via stages.\n\nOns doel is bewustwording te creëren over mensenrechten en sociale rechtvaardigheid door middel van impactvolle projecten zoals korte films en theaterproducties, met als uiteindelijke doel maatschappelijke verandering teweeg te brengen. We streven ernaar projecten te ontwikkelen die mensen emotioneel raken en zo bijdragen aan een groter bewustzijn over deze belangrijke kwesties.\n\nJe kunt [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de Media is een platform van de Stichting Freedom Combination.',
        content_tr:
          'Bu platform aracılığıyla evrensel insan haklarını medya ve iletişim araçlarıyla daha geniş kitlelere anlatmayı amaçlıyoruz. Aynı zamanda, oyunculuk, yönetmenlik, senaristlik gibi önemli sanatsal alanlarda deneyim kazanmayı, bu deneyimleri sürekli olarak geliştirmeyi ve bu alanlarda staj yaparak gelecekteki projelerimize güçlü referanslar eklemeyi hedefliyoruz.\n\nAmacımız, kısa film ve tiyatro gibi etkileyici projeler aracılığıyla insan haklarına ve sosyal adalet konularına dikkat çekmek, bu konularda toplumsal farkındalık oluşturmak ve değişim yaratmaktır. İnsanların duygusal bağ kurabileceği, bilinçlenmelerini sağlayabileceği projeler geliştirerek, bu önemli mesajları etkili bir şekilde iletmeyi amaçlıyoruz.\n\nEtkinlikler için [Instagram](https://www.instagram.com/lotusvdmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de Media Freedom Combination Vakfının bir platformudur. ',
        link: null,
        createdAt: '2022-12-04T05:27:03.339Z',
        updatedAt: '2023-12-27T10:56:18.544Z',
        publishedAt: '2022-12-04T05:27:05.050Z',
      },
    },
    {
      id: 21,
      slug: 'job-20',
      name_en: 'Piano',
      name_nl: 'Piano',
      name_tr: 'Piyano',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:15:33.730Z',
      updatedAt: '2023-08-11T02:15:34.949Z',
      platform: {
        id: 5,
        slug: 'rhythmic-dreams',
        name_en: 'Rhythmic Dreams',
        name_nl: 'Wees  Muziek',
        name_tr: 'Wees Muzik',
        description_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.',
        description_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.',
        description_tr:
          'Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.',
        content_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.\n\nThere are music groups within our platform.\nOur music groups\n\n**Sound of Change Music**\n\nA bunch of people who aims to be a voice for silence.\n\nYou can follow [Instagram](https://www.instagram.com/soundofchangemusic/) and [Youtube](https://www.youtube.com/@soundofchangemusic) for events.\n\nSound of Change Music is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.\n\nEr zijn muziekgroepen binnen ons platform.\nOnze muziekgroepen\n\n**Sound of Change Music**\n\nEen handjevol mensen die de stem van de stilte willen zijn.\n\nJe kunt [Instagram](https://www.instagram.com/soundofchangemusic/) en [Youtube](https://www.youtube.com/@soundofchangemusic) volgen voor evenementen.\n\nSound of Change Music is een platform van stichting Wees.',
        content_tr:
          "Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.\n\nPlatformumuz bünyesinde müzik grupları bulunmaktadır. \nMuzik gruplarımız\n\n**Sound of Change Music**\n\nSessizliğin sesi olmayı hedefleyen bir avuç insan.\n\nEtkinlikler için [Instagram](https://www.instagram.com/soundofchangemusic/) ve  [Youtube](https://www.youtube.com/@soundofchangemusic) hesaplarını takip edebilirsiniz. \n\nSound of Change Music Wee Vakfı'nın bir platformudur. ",
        link: null,
        createdAt: '2023-03-14T11:42:29.955Z',
        updatedAt: '2023-12-15T22:22:50.394Z',
        publishedAt: '2023-06-05T14:49:55.056Z',
      },
    },
    {
      id: 22,
      slug: 'job-21',
      name_en: 'Accordion',
      name_nl: 'Accordeon',
      name_tr: 'Akordiyon',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:16:08.857Z',
      updatedAt: '2023-08-11T02:16:09.951Z',
      platform: {
        id: 5,
        slug: 'rhythmic-dreams',
        name_en: 'Rhythmic Dreams',
        name_nl: 'Wees  Muziek',
        name_tr: 'Wees Muzik',
        description_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.',
        description_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.',
        description_tr:
          'Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.',
        content_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.\n\nThere are music groups within our platform.\nOur music groups\n\n**Sound of Change Music**\n\nA bunch of people who aims to be a voice for silence.\n\nYou can follow [Instagram](https://www.instagram.com/soundofchangemusic/) and [Youtube](https://www.youtube.com/@soundofchangemusic) for events.\n\nSound of Change Music is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.\n\nEr zijn muziekgroepen binnen ons platform.\nOnze muziekgroepen\n\n**Sound of Change Music**\n\nEen handjevol mensen die de stem van de stilte willen zijn.\n\nJe kunt [Instagram](https://www.instagram.com/soundofchangemusic/) en [Youtube](https://www.youtube.com/@soundofchangemusic) volgen voor evenementen.\n\nSound of Change Music is een platform van stichting Wees.',
        content_tr:
          "Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.\n\nPlatformumuz bünyesinde müzik grupları bulunmaktadır. \nMuzik gruplarımız\n\n**Sound of Change Music**\n\nSessizliğin sesi olmayı hedefleyen bir avuç insan.\n\nEtkinlikler için [Instagram](https://www.instagram.com/soundofchangemusic/) ve  [Youtube](https://www.youtube.com/@soundofchangemusic) hesaplarını takip edebilirsiniz. \n\nSound of Change Music Wee Vakfı'nın bir platformudur. ",
        link: null,
        createdAt: '2023-03-14T11:42:29.955Z',
        updatedAt: '2023-12-15T22:22:50.394Z',
        publishedAt: '2023-06-05T14:49:55.056Z',
      },
    },
    {
      id: 23,
      slug: 'job-22',
      name_en: 'Guitar bass',
      name_nl: 'Gitaar bas',
      name_tr: 'Bas gitar',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-08-11T02:17:15.974Z',
      updatedAt: '2023-08-11T02:17:17.059Z',
      platform: {
        id: 5,
        slug: 'rhythmic-dreams',
        name_en: 'Rhythmic Dreams',
        name_nl: 'Wees  Muziek',
        name_tr: 'Wees Muzik',
        description_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.',
        description_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.',
        description_tr:
          'Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.',
        content_en:
          'Rhythmic Dreams is a dynamic and multi-coloured platform that aims to be the voice of the voiceless through notes and melodies.\n\nIn concerts accompanied by classical and modern instruments, our artists have used the universal language of music to expose oppression and injustice to the eyes of the masses. \n\nAt the same time, they have conquered the hearts of many listeners from different cultures.\n\nThere are music groups within our platform.\nOur music groups\n\n**Sound of Change Music**\n\nA bunch of people who aims to be a voice for silence.\n\nYou can follow [Instagram](https://www.instagram.com/soundofchangemusic/) and [Youtube](https://www.youtube.com/@soundofchangemusic) for events.\n\nSound of Change Music is a platform of the Freedom Combination Foundation.',
        content_nl:
          'Rhythmic Dreams is een dynamisch en veelkleurig platform dat de stem van de stemlozen wil zijn door middel van noten en melodieën.\n\nIn concerten begeleid door klassieke en moderne instrumenten hebben onze artiesten de universele taal van muziek gebruikt om onderdrukking en onrecht aan de ogen van de massa bloot te leggen. \n\nTegelijkertijd hebben ze de harten van vele luisteraars uit verschillende culturen veroverd.\n\nEr zijn muziekgroepen binnen ons platform.\nOnze muziekgroepen\n\n**Sound of Change Music**\n\nEen handjevol mensen die de stem van de stilte willen zijn.\n\nJe kunt [Instagram](https://www.instagram.com/soundofchangemusic/) en [Youtube](https://www.youtube.com/@soundofchangemusic) volgen voor evenementen.\n\nSound of Change Music is een platform van stichting Wees.',
        content_tr:
          "Rhythmic Dreams, notalar ve melodiler aracılığıyla sessizlerin sesi olmayı amaç edinen dinamik ve çok renkli bir platformdur.\n\nKlasik ve modern enstrümanlar eşliğinde sergilenen konserlerde sanatçılarımız, müziğin evrensel dilini kullanarak zulüm ve haksızlıkları kitlelerin gözleri önüne sermiştir. \n\nAynı zamanda farklı kültürlerden çok sayıda dinleyicinin gönlünü de fethetmiştir.\n\nPlatformumuz bünyesinde müzik grupları bulunmaktadır. \nMuzik gruplarımız\n\n**Sound of Change Music**\n\nSessizliğin sesi olmayı hedefleyen bir avuç insan.\n\nEtkinlikler için [Instagram](https://www.instagram.com/soundofchangemusic/) ve  [Youtube](https://www.youtube.com/@soundofchangemusic) hesaplarını takip edebilirsiniz. \n\nSound of Change Music Wee Vakfı'nın bir platformudur. ",
        link: null,
        createdAt: '2023-03-14T11:42:29.955Z',
        updatedAt: '2023-12-15T22:22:50.394Z',
        publishedAt: '2023-06-05T14:49:55.056Z',
      },
    },
    {
      id: 25,
      slug: 'job-24',
      name_en: 'Frontend Developer',
      name_nl: 'Frontend Ontwikelaar',
      name_tr: 'Frontend Geliştirici',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-09-27T04:58:30.775Z',
      updatedAt: '2023-09-27T04:58:32.800Z',
      platform: {
        id: 4,
        slug: 'academy',
        name_en: 'FC Academy',
        name_nl: 'FC Academie',
        name_tr: 'FC Akademi',
        description_en:
          'We have volunteers who support the activities of our foundation in many areas. These are areas such as management, social media expertise, acting, directing, illustration, digital drawing, music, painting and calligraphy. Announcing human rights violations to the public is possible with the support we receive from our volunteers. Supporting them is our too top priority. ',
        description_nl:
          'We hebben vrijwilligers die de activiteiten van onze stichting op veel gebieden ondersteunen. Dit zijn gebieden als management, social media-expertise, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen en kalligrafie. Het bekendmaken van mensenrechtenschendingen aan het publiek is mogelijk met de steun die we krijgen van onze vrijwilligers. Hen steunen is ook onze topprioriteit.',
        description_tr:
          'Vakfımızın faaliyetlerine bir çok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illustrasyon, dijital çizim, müzik, resim, kaligrafi gibi alanlardır. İnsan hakları ihlallerinin kamuoyunda duyurulması gönüllülerimizden aldığımız bu destekle mümkün olmaktadır.  Bizim de onları desteklememiz birincil önceliğimizdir. ',
        content_en:
          "Our foundation is supported by volunteers in various fields, including management, social media expertise, acting, directing, illustration, digital drawing, music, painting, calligraphy, and more. The dissemination of human rights violations to the public is made possible through the support we receive from our volunteers. We believe that as our volunteers further develop their skills in their respective areas of interest, our success in raising awareness of human rights violations and creating awareness in society will increase.\n\nIt is hoped that as violations are brought to the public's attention, they will decrease or come to an end. Therefore, supporting our volunteers in their self-improvement is our top priority. You can find information about the areas in which we work by visiting our courses, discussions, and software pages.",
        content_nl:
          "Onze stichting wordt ondersteund door vrijwilligers in verschillende vakgebieden, waaronder management, expertise op het gebied van sociale media, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen, kalligrafie en meer. De verspreiding van schendingen van de mensenrechten naar het publiek wordt mogelijk gemaakt door de steun die we ontvangen van onze vrijwilligers. We geloven dat naarmate onze vrijwilligers hun vaardigheden verder ontwikkelen in hun respectieve interessegebieden, ons succes in het vergroten van het bewustzijn van schendingen van de mensenrechten en het creëren van bewustzijn in de samenleving zal toenemen.\n\nHet is de hoop dat naarmate schendingen onder de aandacht van het publiek worden gebracht, ze zullen afnemen of tot een einde zullen komen. Daarom is het ondersteunen van onze vrijwilligers in hun zelfverbetering onze hoogste prioriteit. U kunt informatie vinden over de gebieden waarop we werken door onze cursussen, discussies en softwarepagina's te bezoeken.",
        content_tr:
          'Vakfımızın faaliyetlerine birçok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar arasında yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illüstrasyon, dijital çizim, müzik, resim, kaligrafi gibi çeşitli alanlar yer almaktadır. İnsan hakları ihlallerinin kamuoyuna duyurulması, gönüllülerimizden aldığımız bu destekle mümkün olmaktadır. Gönüllülerimiz, ilgilendikleri alanlarda sahip oldukları yetenekleri daha da geliştirdikçe, insan hakları ihlallerini duyurma ve toplumda farkındalık yaratma konusundaki başarılarımızın artacağına inanıyoruz.\n\nİhlallerin kamuoyunda duyurulmasıyla birlikte ihlallerin azalması veya son bulması umulmaktadır. Bu nedenle gönüllülerimizin kendilerini geliştirmelerine destek vermek en büyük önceliğimizdir. Hangi alanlarda çalışmalar yaptığımızı görmek için kurslar, söyleşiler ve yazılım sayfalarını ziyaret edebilirsiniz.',
        link: null,
        createdAt: '2022-12-04T05:30:49.648Z',
        updatedAt: '2023-09-30T04:29:21.710Z',
        publishedAt: '2022-12-04T05:30:51.145Z',
      },
    },
    {
      id: 26,
      slug: 'job-25',
      name_en: 'UI/UX Designer',
      name_nl: 'UI/UX Designer',
      name_tr: 'UI/UX Designer',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-09-27T04:58:50.511Z',
      updatedAt: '2023-09-27T04:58:51.470Z',
      platform: {
        id: 4,
        slug: 'academy',
        name_en: 'FC Academy',
        name_nl: 'FC Academie',
        name_tr: 'FC Akademi',
        description_en:
          'We have volunteers who support the activities of our foundation in many areas. These are areas such as management, social media expertise, acting, directing, illustration, digital drawing, music, painting and calligraphy. Announcing human rights violations to the public is possible with the support we receive from our volunteers. Supporting them is our too top priority. ',
        description_nl:
          'We hebben vrijwilligers die de activiteiten van onze stichting op veel gebieden ondersteunen. Dit zijn gebieden als management, social media-expertise, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen en kalligrafie. Het bekendmaken van mensenrechtenschendingen aan het publiek is mogelijk met de steun die we krijgen van onze vrijwilligers. Hen steunen is ook onze topprioriteit.',
        description_tr:
          'Vakfımızın faaliyetlerine bir çok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illustrasyon, dijital çizim, müzik, resim, kaligrafi gibi alanlardır. İnsan hakları ihlallerinin kamuoyunda duyurulması gönüllülerimizden aldığımız bu destekle mümkün olmaktadır.  Bizim de onları desteklememiz birincil önceliğimizdir. ',
        content_en:
          "Our foundation is supported by volunteers in various fields, including management, social media expertise, acting, directing, illustration, digital drawing, music, painting, calligraphy, and more. The dissemination of human rights violations to the public is made possible through the support we receive from our volunteers. We believe that as our volunteers further develop their skills in their respective areas of interest, our success in raising awareness of human rights violations and creating awareness in society will increase.\n\nIt is hoped that as violations are brought to the public's attention, they will decrease or come to an end. Therefore, supporting our volunteers in their self-improvement is our top priority. You can find information about the areas in which we work by visiting our courses, discussions, and software pages.",
        content_nl:
          "Onze stichting wordt ondersteund door vrijwilligers in verschillende vakgebieden, waaronder management, expertise op het gebied van sociale media, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen, kalligrafie en meer. De verspreiding van schendingen van de mensenrechten naar het publiek wordt mogelijk gemaakt door de steun die we ontvangen van onze vrijwilligers. We geloven dat naarmate onze vrijwilligers hun vaardigheden verder ontwikkelen in hun respectieve interessegebieden, ons succes in het vergroten van het bewustzijn van schendingen van de mensenrechten en het creëren van bewustzijn in de samenleving zal toenemen.\n\nHet is de hoop dat naarmate schendingen onder de aandacht van het publiek worden gebracht, ze zullen afnemen of tot een einde zullen komen. Daarom is het ondersteunen van onze vrijwilligers in hun zelfverbetering onze hoogste prioriteit. U kunt informatie vinden over de gebieden waarop we werken door onze cursussen, discussies en softwarepagina's te bezoeken.",
        content_tr:
          'Vakfımızın faaliyetlerine birçok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar arasında yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illüstrasyon, dijital çizim, müzik, resim, kaligrafi gibi çeşitli alanlar yer almaktadır. İnsan hakları ihlallerinin kamuoyuna duyurulması, gönüllülerimizden aldığımız bu destekle mümkün olmaktadır. Gönüllülerimiz, ilgilendikleri alanlarda sahip oldukları yetenekleri daha da geliştirdikçe, insan hakları ihlallerini duyurma ve toplumda farkındalık yaratma konusundaki başarılarımızın artacağına inanıyoruz.\n\nİhlallerin kamuoyunda duyurulmasıyla birlikte ihlallerin azalması veya son bulması umulmaktadır. Bu nedenle gönüllülerimizin kendilerini geliştirmelerine destek vermek en büyük önceliğimizdir. Hangi alanlarda çalışmalar yaptığımızı görmek için kurslar, söyleşiler ve yazılım sayfalarını ziyaret edebilirsiniz.',
        link: null,
        createdAt: '2022-12-04T05:30:49.648Z',
        updatedAt: '2023-09-30T04:29:21.710Z',
        publishedAt: '2022-12-04T05:30:51.145Z',
      },
    },
    {
      id: 27,
      slug: 'job-26',
      name_en: 'Software Tester',
      name_nl: 'Software Tester',
      name_tr: 'Software Tester',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2023-09-27T04:59:37.530Z',
      updatedAt: '2023-09-27T04:59:38.809Z',
      platform: {
        id: 4,
        slug: 'academy',
        name_en: 'FC Academy',
        name_nl: 'FC Academie',
        name_tr: 'FC Akademi',
        description_en:
          'We have volunteers who support the activities of our foundation in many areas. These are areas such as management, social media expertise, acting, directing, illustration, digital drawing, music, painting and calligraphy. Announcing human rights violations to the public is possible with the support we receive from our volunteers. Supporting them is our too top priority. ',
        description_nl:
          'We hebben vrijwilligers die de activiteiten van onze stichting op veel gebieden ondersteunen. Dit zijn gebieden als management, social media-expertise, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen en kalligrafie. Het bekendmaken van mensenrechtenschendingen aan het publiek is mogelijk met de steun die we krijgen van onze vrijwilligers. Hen steunen is ook onze topprioriteit.',
        description_tr:
          'Vakfımızın faaliyetlerine bir çok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illustrasyon, dijital çizim, müzik, resim, kaligrafi gibi alanlardır. İnsan hakları ihlallerinin kamuoyunda duyurulması gönüllülerimizden aldığımız bu destekle mümkün olmaktadır.  Bizim de onları desteklememiz birincil önceliğimizdir. ',
        content_en:
          "Our foundation is supported by volunteers in various fields, including management, social media expertise, acting, directing, illustration, digital drawing, music, painting, calligraphy, and more. The dissemination of human rights violations to the public is made possible through the support we receive from our volunteers. We believe that as our volunteers further develop their skills in their respective areas of interest, our success in raising awareness of human rights violations and creating awareness in society will increase.\n\nIt is hoped that as violations are brought to the public's attention, they will decrease or come to an end. Therefore, supporting our volunteers in their self-improvement is our top priority. You can find information about the areas in which we work by visiting our courses, discussions, and software pages.",
        content_nl:
          "Onze stichting wordt ondersteund door vrijwilligers in verschillende vakgebieden, waaronder management, expertise op het gebied van sociale media, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen, kalligrafie en meer. De verspreiding van schendingen van de mensenrechten naar het publiek wordt mogelijk gemaakt door de steun die we ontvangen van onze vrijwilligers. We geloven dat naarmate onze vrijwilligers hun vaardigheden verder ontwikkelen in hun respectieve interessegebieden, ons succes in het vergroten van het bewustzijn van schendingen van de mensenrechten en het creëren van bewustzijn in de samenleving zal toenemen.\n\nHet is de hoop dat naarmate schendingen onder de aandacht van het publiek worden gebracht, ze zullen afnemen of tot een einde zullen komen. Daarom is het ondersteunen van onze vrijwilligers in hun zelfverbetering onze hoogste prioriteit. U kunt informatie vinden over de gebieden waarop we werken door onze cursussen, discussies en softwarepagina's te bezoeken.",
        content_tr:
          'Vakfımızın faaliyetlerine birçok alanda destek veren gönüllülerimiz bulunmaktadır. Bu alanlar arasında yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illüstrasyon, dijital çizim, müzik, resim, kaligrafi gibi çeşitli alanlar yer almaktadır. İnsan hakları ihlallerinin kamuoyuna duyurulması, gönüllülerimizden aldığımız bu destekle mümkün olmaktadır. Gönüllülerimiz, ilgilendikleri alanlarda sahip oldukları yetenekleri daha da geliştirdikçe, insan hakları ihlallerini duyurma ve toplumda farkındalık yaratma konusundaki başarılarımızın artacağına inanıyoruz.\n\nİhlallerin kamuoyunda duyurulmasıyla birlikte ihlallerin azalması veya son bulması umulmaktadır. Bu nedenle gönüllülerimizin kendilerini geliştirmelerine destek vermek en büyük önceliğimizdir. Hangi alanlarda çalışmalar yaptığımızı görmek için kurslar, söyleşiler ve yazılım sayfalarını ziyaret edebilirsiniz.',
        link: null,
        createdAt: '2022-12-04T05:30:49.648Z',
        updatedAt: '2023-09-30T04:29:21.710Z',
        publishedAt: '2022-12-04T05:30:51.145Z',
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 2,
      total: 29,
    },
  },
}
