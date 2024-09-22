import {
  Box,
  Checkbox,
  FormLabel,
  Stack,
  Switch,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { heardFrom } from './data'
import { useJoinFormContext } from './useJoinFormContext'

export const GeneralInfo = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const {
    register,
    formState: { errors },
  } = useJoinFormContext()

  return (
    <>
      {/* in mailing list and is public */}
      <Stack justify="space-between" direction={{ base: 'column', md: 'row' }}>
        <Switch
          id="in-mailing-list"
          alignItems={'center'}
          display={'flex'}
          {...register('inMailingList')}
        >
          {t('apply-form.in-mailing-list')}
        </Switch>
        <Switch id="is-public" {...register('isPublic')}>
          {t('apply-form.show-in-website')}
        </Switch>
      </Stack>
      {/* heard FROM */}
      <Box>
        <FormLabel fontSize="sm" fontWeight={600}>
          {t('apply-form.heard-from')}
        </FormLabel>
        <Wrap
          p={4}
          spacing={4}
          rounded="lg"
          borderWidth={2}
          borderColor={errors['heardFrom'] ? 'red.400' : 'gray.100'}
        >
          {heardFrom?.map(item => (
            <Checkbox
              key={item.value}
              id={item.value}
              {...register(`heardFrom`)}
              value={item.value}
              textTransform="capitalize"
            >
              {item?.label[locale]}
            </Checkbox>
          ))}
        </Wrap>
        {errors['heardFrom'] && (
          <Text fontSize="sm" color="red.500">
            {errors.heardFrom.message}
          </Text>
        )}
      </Box>
    </>
  )
}
