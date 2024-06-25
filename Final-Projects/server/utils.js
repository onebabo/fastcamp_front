import crypto from 'crypto'

export function createHash(data) {
  return crypto.createHash('sha1').update(data).digest('hex')
}
