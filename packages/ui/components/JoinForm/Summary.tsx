import { Group, Stack, Text, Textarea } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Button } from '@fc/chakra'

import { PreviewVolunteerForm } from './PreviewVolunteerForm'
import { useJoinFormContext } from './useJoinFormContext'
import { FormItem } from '../FormItem'

export const Summary = () => {
  const {
    isLoading,
    register,
    formState: { errors, isValid },
  } = useJoinFormContext()
  const { t } = useTranslation()
  const { locale } = useRouter()

  const summaryContent = {
    en: 'You have successfully completed the volunteer form! If you have anything else to add, please feel free to share it in the comments section. We look forward to seeing you soon!',
    nl: 'U heeft het vrijwilligersformulier succesvol ingevuld! Als u nog iets wilt toevoegen, deel dit dan gerust in het opmerkingenveld. We hopen u snel te zien!',
    tr: 'Gönüllü formunu başarıyla tamamladınız! Eklemek istediğiniz bir şey varsa lütfen yorum kısmında paylaşın. Yakında görüşmek dileğiyle!',
  }

  return (
    <Stack gap={4}>
      <Text>{summaryContent[locale]}</Text>
      {/* comment */}
      <FormItem
        as={Textarea}
        register={register}
        errors={errors}
        id="comment"
        name="comment"
      />
      <Group overflowX={'auto'} justifyContent={'center'}>
        {isValid && <PreviewVolunteerForm />}
        <Button loading={isLoading} type="submit">
          {t('submit')}
        </Button>
      </Group>
    </Stack>
  )
}
