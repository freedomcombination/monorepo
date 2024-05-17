export default {
  afterCreate({ result }) {
    const id = result.id

    const year = new Date().getFullYear()
    const paddedId = id.toString().padStart(3, '0')

    const sku = `FC${year}-${paddedId}`

    strapi.entityService.update('api::asset.asset', id, { data: { sku } })
  },
}
