import * as crypto from 'crypto'
import base32 from './base32'

const pubToAddr20 = function(pubKey) {
  return crypto.createHash('sha256').update(pubKey).digest().slice(-20)
}

const addr20ToAddr32 = function(addr20) {
  return base32.encode(addr20)
}

const addr32ToAddress = function(addr32) {
  let address = 'v'
  let hash = crypto.createHash('sha256').update(addr32).digest()
  let addr32Array = addr32.split('')
  addr32Array.forEach(function(c, i) {
    if (hash[i] > 127) {
      address = address + c.toUpperCase()
    } else {
      address = address + c
    }
  })

  return address
}

const pubToAddress = function(pubKey) {
  let addr20 = pubToAddr20(pubKey)
  let addr32 = addr20ToAddr32(addr20)

  return addr32ToAddress(addr32)
}

const isAddress = function(address) {
  let addr32 = address.slice(1).toLowerCase()
  let _address = addr32ToAddress(addr32)

  return (address === _address)
}


const vokenAddress = {
  pubToAddress: pubToAddress,
  isAddress: isAddress
}

export default vokenAddress
