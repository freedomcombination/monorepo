import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { TbActivity } from 'react-icons/tb'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Profile, Sort, StrapiLocale, Team } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { DataTable } from '@fc/ui/components/DataTable'
import { ModelCreateModal } from '@fc/ui/components/ModelCreateModal'
import { ModelEditForm } from '@fc/ui/components/ModelEditForm'
import { ModelEditModal } from '@fc/ui/components/ModelEditModal'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { useColumns } from '@fc/ui/hooks/useColumns'
import { useFields } from '@fc/ui/hooks/useFields'
import { useSchema } from '@fc/ui/hooks/useSchema'

const TeamPage = () => {
  const schemas = useSchema()
  const fields: { [key: string]: any } = useFields()
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { locale, query } = useRouter()

  const columns = useColumns<Profile>()

  const [selectedMemberId, setSelectedMemberId] = useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [sort, setSort] = useState<Sort>()

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
  }

  const id = Number(query.id as string)

  const teamMembersQuery = useStrapiRequest<Profile>({
    endpoint: 'profiles',
    filters: {
      ...(searchTerm && {
        $or: [
          { name: { $containsi: searchTerm } },
          { email: { $containsi: searchTerm } },
        ],
      }),
      team: { id },
    },
    sort,
    page: currentPage || 1,
    pageSize: 100,
    locale,
  })

  const teamMembers: Profile[] = teamMembersQuery?.data?.data || []

  const pageCount = teamMembersQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = teamMembersQuery?.data?.meta?.pagination?.total || 0

  const { data, isLoading, refetch } = useStrapiRequest<Team>({
    endpoint: 'teams',
    id,
  })
  const team = data?.data
  console.log('team', team)
  const handleRowClick = (index: number, id: number) => {
    setSelectedMemberId(id)
  }

  useEffect(() => {
    if (selectedMemberId) {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMemberId])

  const handleClose = () => {
    onClose()
    setSelectedMemberId(undefined)
  }

  return (
    <AdminLayout
      seo={{ title: t('teams') }}
      isLoading={isLoading}
      hasBackButton
    >
      {selectedMemberId && (
        <ModelEditModal<Profile>
          title={'Member'}
          endpoint="profiles"
          id={selectedMemberId}
          isOpen={isOpen}
          onClose={handleClose}
          onSuccess={teamMembersQuery.refetch}
          size={'5xl'}
        />
      )}
      <Stack spacing={8} p={6}>
        <Accordion
          size={'lg'}
          allowToggle
          allowMultiple={false}
          defaultIndex={0}
          borderColor="transparent"
          defaultValue={1}
        >
          <AccordionItem _notLast={{ mb: 2 }}>
            <AccordionButton
              justifyContent="space-between"
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>{team?.name}</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel mt={4} bg={'white'} rounded={'md'}>
              {team && (
                <ModelEditForm<Team>
                  endpoint="teams"
                  model={team}
                  onSuccess={refetch}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              justifyContent="space-between"
              _activeStep={{ bg: 'gray.200' }}
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>Team Members</Text>

              <AccordionIcon ml={'auto'} />
            </AccordionButton>

            <AccordionPanel mt={4} bg={'white'} rounded={'md'}>
              <PageHeader onSearch={handleSearch} />
              <ModelCreateModal<Team>
                title="Add member"
                endpoint="teams"
                schema={schemas['members']!}
                fields={fields['members']!}
                buttonProps={{
                  variant: 'outline',
                  leftIcon: <TbActivity />,
                }}
                onSuccess={teamMembersQuery.refetch}
              >
                Add Member
              </ModelCreateModal>

              <DataTable<Profile>
                columns={columns['profiles']!}
                currentPage={currentPage}
                data={teamMembers}
                onClickRow={handleRowClick}
                onSort={setSort}
                pageCount={pageCount}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                totalCount={totalCount}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default TeamPage
