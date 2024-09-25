import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const Cover = () => {
  const { locale } = useRouter()
  const welcome = {
    en: 'Thank you for your interest in becoming a volunteer for our Human Rights Foundation! By joining our community, you can contribute to our efforts in defending justice, equality, and human rights. Please complete the form to join us. We are grateful for your support and generosity.',
    nl: 'Bedankt voor uw interesse om vrijwilliger te worden voor onze Mensenrechtenstichting! Door lid te worden van onze gemeenschap, kunt u bijdragen aan onze inspanningen om rechtvaardigheid, gelijkheid en mensenrechten te verdedigen. Voltooi het formulier om mee te doen. We zijn dankbaar voor uw steun en vrijgevigheid.',
    tr: 'İnsan Hakları Vakfımıza gönüllü olmak için gösterdiğiniz ilgiye teşekkür ederiz! Topluluğumuza katılarak adaleti, eşitliği ve insan haklarını savunma çabalarımıza katkıda bulunabilirsiniz. Lütfen formu tamamlayarak bize katılın. Yardımseverliğiniz ve desteğiniz için şimdiden minnettarız.',
  }

  return <Text>{welcome[locale]}</Text>
}
