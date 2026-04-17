/**
 * Локально: dist → ../backend/public (то же, что делает deploy-hosting.sh по rsync на сервер).
 * В CI деплой копирует dist в public автоматически — эту команду не нужно вызывать там.
 */
import { cp, mkdir, readdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'dist')
const pub = join(root, '..', 'backend', 'public')
const assetsSrc = join(dist, 'assets')
const assetsDst = join(pub, 'assets')

await cp(join(dist, 'index.html'), join(pub, 'index.html'))
await rm(assetsDst, { recursive: true, force: true })
await mkdir(assetsDst, { recursive: true })
for (const name of await readdir(assetsSrc)) {
  await cp(join(assetsSrc, name), join(assetsDst, name))
}
console.log('OK: dist → backend/public (index.html + assets/)')
