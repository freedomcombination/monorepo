import fs from 'fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'

function sortObjectKeys(obj: { [key: string]: any }): { [key: string]: any } {
  return Object.fromEntries(
    Object.entries(obj).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (process.env.NODE_ENV === 'development' && req.method === 'POST') {
    try {
      const { newTR, newNL, newEN } = req.body

      const jsonData = {
        nl: JSON.stringify(sortObjectKeys(newNL), null, 2),
        tr: JSON.stringify(sortObjectKeys(newTR), null, 2),
        en: JSON.stringify(sortObjectKeys(newEN), null, 2),
      }

      const targetPaths = [
        './public/locales/{0}/common.json', // dashboard itself
        '../../packages/ui/public/locales/{0}/common.json',
        '../foundation/public/locales/{0}/common.json',
        '../kunsthalte/public/locales/{0}/common.json',
        '../lotus/public/locales/{0}/common.json',
        '../trend-rights/public/locales/{0}/common.json',
      ]

      const writePromises = targetPaths.flatMap(targetPath => {
        return Object.entries(jsonData).map(([key, value]) => {
          return fs.writeFile(targetPath.replace('{0}', key), value)
        })
      })

      await Promise.all(writePromises)

      res.status(200).end()
    } catch (error) {
      console.error('An error happened while saving translations', error)
      res.status(500).end()
    }
  } else {
    res.status(405).end()
  }
}
