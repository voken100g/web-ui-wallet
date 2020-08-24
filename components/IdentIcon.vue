<template>
  <img :src="buffer" alt="identicon">
</template>

<script>
import * as identicon from 'identicon'
import * as crypto from 'crypto'

export default {
  name: 'IdentIcon',
  props: {
    value: String,
    size: {
      type: Number,
      default: 320
    }
  },
  computed: {
    buffer() {
      let hash = crypto.createHash('sha256').update(this.value).digest().toString('hex')
      return identicon.generateSync({ id: hash, size: this.size })
    }
  }
}
</script>
