import { Box, Flex, Textarea } from '@chakra-ui/react'

import {
  Field,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
} from '@fc/chakra'
import { Post, StrapiModel } from '@fc/types'
import { StrapiCollectionEndpoint } from '@fc/types'

import { I18nNamespaces } from '../../../@types/i18next'
import { FormItem } from '../FormItem'
import { MdFormItem } from '../MdFormItem'
import { ModelCreateFormBodyProps } from '../ModelForm/types'
import { ModelMedia } from '../ModelMedia'
import { ModelSelect } from '../ModelSelect'
import { VideoPlayer } from '../VideoPlayer'

export const renderCreateFormBody = <T extends StrapiModel>({
  fields,
  activeOption,
  formProps,
  model,
  isChangingMedia,
  toggleChangingMedia,
  t,
}: ModelCreateFormBodyProps<T>) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    control,
  } = formProps

  const disabledStyle = {
    borderColor: 'transparent',
    _hover: { borderColor: 'transparent' },
    color: 'gray.500',
    pl: 0,
  }
  const postModel = model as unknown as Post

  return fields.map((field, index) => {
    const label = t(field.name as keyof I18nNamespaces['common'], {
      defaultValue: field.label,
    })
    const isActive =
      !activeOption || !field.group || field?.group?.value === activeOption
    const videoUrl = watch(field.name as string)

    if (field.type === 'mediaUrl') {
      return (
        <Box key={index} {...(!isActive && { display: 'none' })}>
          <FormItem
            key={index}
            name={field.name as string}
            label={label}
            errors={errors}
            register={register}
            _disabled={disabledStyle}
          />

          <Box mt={5}>{videoUrl && <VideoPlayer url={videoUrl} />}</Box>
        </Box>
      )
    }

    if (field.type === 'file') {
      return (
        <Field
          invalid={Boolean(errors?.[field.name as string])}
          key={index}
          required={field.required}
          zIndex={0}
          label={label}
          errorText={errors?.[field.name]?.message as string}
          {...(!isActive && { display: 'none' })}
        >
          <ModelMedia
            isEditing={!!postModel?.video?.url}
            model={model as T}
            setValue={setValue}
            name={field.name as string}
            isChangingMedia={isChangingMedia}
            toggleChangingMedia={toggleChangingMedia}
          />
        </Field>
      )
    }

    if (field.type === 'select') {
      return (
        <ModelSelect
          key={index}
          endpoint={field.endpoint as StrapiCollectionEndpoint}
          populate={field.populate}
          options={field.options}
          multiple={field.multiple}
          required={field.required}
          name={field.name as string}
          label={label}
          errors={errors}
          control={control}
          zIndex={1}
          {...(!isActive && { display: 'none' })}
        />
      )
    }

    if (field.type === 'markdown') {
      return (
        <MdFormItem
          key={index}
          name={field.name as string}
          label={label}
          required={field.required}
          errors={errors}
          control={control}
          _disabled={disabledStyle}
          {...(!isActive && { display: 'none' })}
        />
      )
    }

    if (field.type === 'number-input') {
      return (
        <Flex
          key={index}
          align={'center'}
          mb={1}
          {...(!isActive && { display: 'none' })}
        >
          <Field
            label={label}
            errorText={errors[field?.name as string]?.message as string}
          >
            <NumberInput
              maxW={120}
              onChange={value => setValue(field.name as string, value)}
              size="lg"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Field>
        </Flex>
      )
    }

    if (field.type === 'boolean') {
      return (
        <Field
          key={index}
          required={field.required}
          label={label}
          errorText={errors[field.name as string]?.message as string}
          {...(!isActive && { display: 'none' })}
        >
          <Switch
            colorPalette={'primary'}
            size={'lg'}
            onCheckedChange={e => {
              setValue(field.name as string, e.checked)
            }}
          />
        </Field>
      )
    }

    const inputType =
      field.type === 'date'
        ? 'date'
        : field.type === 'datetime-local'
          ? 'datetime-local'
          : 'text'

    return (
      <FormItem
        {...(field.type === 'textarea' && { as: Textarea })}
        key={index}
        name={field.name as string}
        type={inputType}
        label={label}
        required={field.required}
        errors={errors}
        register={register}
        _disabled={disabledStyle}
        {...(!isActive && { display: 'none' })}
      />
    )
  })
}
