export const translations = {
  // Common

  name: {
    en: 'Name',
    nl: 'Naam',
    tr: 'İsim',
  },
  email: {
    en: 'Email',
    nl: 'E-mail',
    tr: 'E-posta',
  },
  date: {
    en: 'Date',
    nl: 'Datum',
    tr: 'Tarih',
  },
  details: {
    en: 'Details',
    nl: 'Details',
    tr: 'Detaylar',
  },
  course: {
    en: 'Course',
    nl: 'Cursus',
    tr: 'Kurs',
  },
  go: {
    en: 'Go',
    nl: 'Ga',
    tr: 'Git',
  },
  art: {
    tr: 'Eser',
    en: 'Art',
    nl: 'Art',
  },
  artist: {
    tr: 'Sanatçı',
    en: 'Artist',
    nl: 'Artiest',
  },

  // ForgotPassword.tsx

  'forgot.preview': {
    en: 'Forgot Password',
    nl: 'Wachtwoord Vergeten',
    tr: 'Sifrenizi Sıfırlamak',
  },
  'forgot.heading': {
    en: 'We have a request to reset your password',
    nl: 'We hebben een verzoek om je wachtwoord te resetten',
    tr: 'Sifrenizi sıfırlama isteğiniz bize ulaştı.',
  },
  'forgot.message': {
    en: 'Please click the button below to reset your password. If you did not request a password reset, please ignore this email.',
    nl: 'Klik op de knop hieronder om je wachtwoord te resetten. Als je geen wachtwoord reset verzoek hebt, ignoreer deze email.',
    tr: "Sifrenizi sıfırlama işlemine devam etmek için aşağıdaki butona tıklayın. Eger sifrenizi sıfırlamak istemediyseniz bu email'i görmezden gelin.",
  },
  'forgot.reset': {
    en: 'Reset Password',
    nl: 'Wachtwoord Resetten',
    tr: 'Sifrenizi Sıfırlayın',
  },

  // CourseApplicantWithoutPayment.tsx

  'course-applicant-unpaid-preview': {
    en: 'New unpaid course application has been submitted by {{name}}',
    nl: 'Nieuwe onbetaalde cursusaanvraag is gestuurd door {{name}}',
    tr: '{{name}} tarafından, odenmemiş kurs başvurus alındı.',
  },
  'course-applicant-unpaid-header': {
    tr: 'Yeni bir kullanıcı aşağıdaki kurs başvurusu yaptı.',
    en: 'A new user has applied for the course below.',
    nl: 'Een nieuwe gebruiker heeft zich aangemeld voor onderstaande cursus.',
  },
  'course-applicant-unpaid-footer': {
    tr: "Kaydolan kişinin açıklamasını yetersiz bulduysanız aşağıdaki link'ten appreveStatus parametresine 'rejected' degerini verebilirsiniz. Aksi takdirde kontejyan bu kullanıcıya otomatik olarak ayrıldı.",
    en: "If you find the description of the registered person insufficient, you can give the value 'rejected' to the appreveStatus parameter from the link below. Otherwise, the quota is automatically allocated to this user.",
    nl: "Indien u de omschrijving van de geregistreerde onvoldoende vindt, kunt u via onderstaande link de waarde 'rejected' meegeven aan de parameter appreveStatus. Anders wordt het quotum automatisch aan deze gebruiker toegewezen.",
  },

  // CourseApplicantSubmittedAssignmentFiles.tsx

  'course-applicant-submitted-assignment-files-preview': {
    tr: '{{name}}, ödev için istenen dosyaları sisteme yükledi.',
    en: '{{name}} has uploaded the requested files.',
    nl: '{{name}} heeft de aanvraagde bestanden ge-upload.',
  },
  'course-applicant-submitted-assignment-files-header': {
    tr: 'Yeni bir kullanıcı, ödev için istenen dosyaları yükledi.',
    en: 'A new user has uploaded the requested files.',
    nl: 'Een nieuwe gebruiker heeft de aanvraagde bestanden ge-upload.',
  },
  'course-applicant-submitted-assignment-files-footer': {
    tr: "Yukarıda bilgileri verilmiş başvuru sahibinin, sisteme eklediği dosyalara buradan ulaşabilirsiniz. Ayrıca 'Dashboard'a gidip değerlendirmenizide yapmalısınız.",
    en: 'You can download the files that were requested by the user who submitted the application. Also, you can go to the Dashboard and complete the assessment.',
    nl: 'U kunt de bestanden die aan de gebruiker gestuurd werd downloaden. U kunt ook naar de Dashboard gaan en de assessentie voltooien.',
  },
  'course-applicant-submitted-assignment-files-kv-file-list': {
    tr: 'Dosyalar',
    en: 'Files',
    nl: 'Bestanden',
  },
  'course-applicant-submitted-assignment-files-kv-evaluation-date': {
    tr: 'Son değerlendirme tarihi',
    en: 'Evaluation date',
    nl: 'Evaluatiedatum',
  },

  // CourseApplicantApprove.tsx
  'course-applicant-approved-preview': {
    tr: 'Kurs başvurunuz onaylandı.',
    en: 'Your application has been approved.',
    nl: 'Uw applicatie is geaccepteerd.',
  },
  'course-applicant-approved-header-price': {
    tr: 'Kurs başvurunuz onaylandı, ödemenizi yapabilirsiniz.',
    en: 'Your course application has been approved, you can make your payment.',
    nl: 'Uw cursusaanvraag is goedgekeurd, u kunt uw betaling uitvoeren.',
  },
  'course-applicant-approved-header-no-price': {
    tr: 'Kurs başvurunuz onaylandı, tebrikler.',
    en: 'Your course application has been approved, thank you.',
    nl: 'Uw cursusaanvraag is goedgekeurd, bedankt.',
  },
  'course-applicant-approved-footer': {
    tr: "Kurs başvurunuz ile ilgili detaylerı 'Profil' sayfasında bulabilirsiniz.",
    en: 'You can find the details of your course application in your profile page.',
    nl: 'U kunt de details van uw cursusaanvraag in uw profielpagina vinden.',
  },

  'course-applicant-rejected-preview': {
    tr: 'Kurs başvurunuz reddedildi.',
    en: 'Your application has been rejected.',
    nl: 'Uw applicatie is afgewezen.',
  },
  'course-applicant-rejected-header': {
    tr: 'Kurs başvurunuz reddedildi.',
    en: 'Your course application has been rejected.',
    nl: 'Uw cursusaanvraag is afgewezen.',
  },
  'course-applicant-rejected-footer': {
    tr: "Kurs başvurunuz ile ilgili detayları 'Profil' sayfasında bulabilirsiniz.",
    en: 'You can find the details of your course application in your profile page.',
    nl: 'U kunt de details van uw cursusaanvraag in uw profielpagina zien.',
  },

  // VolunterrApplied.tsx
  'volunteer-applied.preview': {
    tr: '{{name}}, yeni gönüllü başvurusu yaptı.',
    en: '{{name}} has applied for a new volunteer.',
    nl: '{{name}} heeft een nieuwe gidsaanvraag gestuurd.',
  },

  'volunteer-applied.header': {
    tr: '{{name}}, aşağıdaki platformlara gönüllü olmak için başvuru yaptı.',
    en: '{{name}} has applied to volunteer on the following platforms.',
    nl: '{{name}} heeft zich aangemeld als vrijwilliger op de volgende platforms.',
  },

  // ArtCreated.tsx
  'art-name': {
    tr: 'Eser adı',
    en: 'Art name',
    nl: 'Art naam',
  },
  'art-created.preview': {
    tr: '{{name}} yeni bir eser yayınladı.',
    en: '{{name}} has created a new art.',
    nl: '{{name}} heeft een nieuw artikel gemaakt.',
  },
  'art-created.header': {
    tr: '{{art}} isimli eser, {{name}} tarafından yayınlandı.',
    en: '{{art}} has been created by {{name}}.',
    nl: '{{art}} is gemaakt door {{name}}.',
  },
} as const
