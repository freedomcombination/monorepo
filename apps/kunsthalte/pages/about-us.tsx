import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { Container } from '@fc/ui/components/Container'
import { Hero } from '@fc/ui/components/Hero'
import { Markdown } from '@fc/ui/components/Markdown'

import { Layout } from '../components'

type AboutUsProps = InferGetStaticPropsType<typeof getStaticProps>

const AboutUsPage: FC<AboutUsProps> = ({ seo, source }) => {
  return (
    <Layout seo={seo} isDark>
      <Hero title={seo.title} />
      <Container maxW="container.lg">
        <Box textAlign="center" my={16}>
          {source && <Markdown source={source} />}
        </Box>
      </Container>
    </Layout>
  )
}

export default AboutUsPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const markdown = {
    tr: `## Sanat Durağı Kimdir?

    Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem de fiziki olarak buluştuğu, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.
    
    ## Sanat Durağının amacı nedir?
    
    Günümüzde sanatın evrensel dili büyük bir güce ve öneme sahiptir. Bizler sanata ilgi duyan kişiler olarak, bu alandaki yeteneklerini geliştirmek isteyenleri bir araya getirerek, onlara çeşitli fırsatlar sunulmasının çok önemli olduğuna ve sanata değer verilmesi gerektiğine inanıyoruz. Dünyaya dair meselelere sanat merceği altında bakıp, sanat dili ile farkındalık oluşturmak en birincil amacımız.`,
    nl: `## Wie is Kunsthalte?

    Het is een groep waar immigranten met een interesse in kunst samenkomen, zowel persoonlijk als online, kennis uitwisselen over moderne en traditionele kunst en tegelijkertijd artistieke evenementen plannen.
    
    ## Wat is het doel van de Kunsthalte?

    Tegenwoordig heeft de universele taal van de kunst grote kracht en belang. Als mensen die in kunst geïnteresseerd zijn, vinden wij het heel belangrijk om degenen die hun talenten op dit gebied willen ontwikkelen samen te brengen, hen verschillende mogelijkheden te bieden en dat kunst gewaardeerd moet worden. Ons hoofddoel is om de problemen in de wereld door de lens van de kunst te bekijken en om via de taal van de kunst het bewustzijn te vergroten.`,
    en: `## Who is Kunsthalte?
    
    It is a group where immigrants with an interest in the arts come together both in person and online, exchange knowledge about modern and traditional arts, and plan artistic events at the same time.
    
    ## What is the purpose of the Kunsthalte?
    
    Today, the universal language of art has great power and importance.  As people who are interested in art, we believe that it is very important to bring together those who want to develop their skills in this field and to offer them various opportunities and that art should be valued.  Our primary goal is to look at the issues of the world through the lens of art and to raise awareness with the language of art.`,
  }

  const source = await serialize(markdown[locale])

  const seo = {
    en: {
      title: 'About Us',
    },
    nl: {
      title: 'Over ons',
    },
    tr: {
      title: 'Hakkımızda',
    },
  }

  return {
    props: {
      source,
      ...(await ssrTranslations(locale)),
      seo: seo[locale],
    },
    revalidate: 1,
  }
}
