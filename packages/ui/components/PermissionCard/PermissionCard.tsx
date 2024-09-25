import type { EndpointControllers, Permissions } from '@fc/types'

import { PermissionCardProps } from './types'
import { ViewEndpointControllers } from './ViewEndpointController'
import { MasonryGrid } from '../MasonryGrid'

export const PermissionCard: React.FC<PermissionCardProps> = ({
  permission,
  filters = [],
  editable = false,
  onChange = () => {},
}) => {
  const filteredPermission =
    filters.length > 0
      ? Object.keys(permission).reduce((acc, key) => {
          if (filters.includes(key)) {
            acc[key] = permission[key]
          }

          return acc
        }, {} as Permissions)
      : permission

  const setEndpointValue = (
    endpoint: string,
    controllers: EndpointControllers,
  ) => {
    const newPermission = {
      ...permission,
      [endpoint]: { controllers },
    }
    onChange(newPermission)
  }

  return (
    <MasonryGrid cols={[1, 1, 1, 2, 3, 4]}>
      {Object.entries(filteredPermission).map(([endpoint, { controllers }]) => {
        return (
          <ViewEndpointControllers
            key={endpoint}
            endpoint={endpoint}
            controllers={controllers}
            readonly={editable === false}
            onChange={setEndpointValue}
          />
        )
      })}
    </MasonryGrid>
  )
}
