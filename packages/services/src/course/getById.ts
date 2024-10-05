import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@fc/lib'
import { Course } from '@fc/types'

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
