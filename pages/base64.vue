<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex space-x-3">
    <div class="flex-1">
      <label for="decoded">
        Base64.decoded
      </label>
      <textarea name="decoded"
                id="decoded"
                class="mt-2 w-full form-textarea ipt text-sm"
                rows="20"
                v-model="decoded"
                placeholder="Sample"></textarea>
    </div>
    <div class="flex-1">
      <label for="encoded" :class="{ 'error': exception }">
        Base64.encoded
      </label>
      <textarea name="encoded"
                id="encoded"
                class="mt-2 w-full form-textarea ipt text-sm"
                :class="{ 'error': exception }"
                rows="20"
                v-model="encoded"
                placeholder="U2FtcGxl"></textarea>
      <p class="text-sm ipt-p" :class="{ 'error': exception }">
        {{ exception }}
      </p>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'base64',
  data() {
    return {
      decoded: '',
      encoded: '',
      exception: null,
    }
  },
  watch: {
    decoded() {
      this.encoded = Base64.encode(this.decoded)
      this.exception = null
    },
    encoded() {
      if (this.encoded) {
        try {
          this.decoded = Base64.decode(this.encoded)
        } catch(e) {
          this.exception = e
        }
      } else {
        this.txt = ''
        this.exception = null
      }
    }
  }
}
</script>

<style scoped>

</style>
