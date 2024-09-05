export type translation = {
  en: string
  nl: string
  tr: string
}

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
}
