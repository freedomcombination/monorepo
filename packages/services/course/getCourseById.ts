import { useQuery } from '@tanstack/react-query'

import type { Course } from '@fc/types'

import { strapiRequest } from '../common/strapiRequest'

export const getCourseById = async (
  id: string,
): Promise<{ course: Course } | null> => {
  const coursesResponse = await strapiRequest<Course>({
    endpoint: 'courses',
    id: Number(id),
  })

  const course = coursesResponse.data

  if (!course) return null

  return {
    course,
  }
}

export const useCourseById = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseById(id),
  })
}
