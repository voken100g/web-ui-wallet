<template>
  <div class="py-6">
    <div class="bg-gray-800 max-w-screen-xl mx-auto pt-12 px-4 pb-8 sm:px-6 lg:pt-16 lg:px-8 lg:pb-12">
      <div class="lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
            Validator
          </h2>
          <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
            Validate whether an address is available for Voken
          </p>
        </div>
      </div>

      <div class="flex mt-4 lg:mt-6">
        <div class="flex-shrink-0 text-gray-200 text-3xl">
          <fa :icon="['fas', 'shield-alt']"/>
        </div>
        <div class="mt-5 ml-3">
          <h3 class="text-sm leading-5 font-bold text-gray-200">
            Native secure Voken wallet address
          </h3>
          <div class="mt-2 text-sm leading-5 text-gray-300">
            <ul class="security-tips-ul">
              <li>
                A Voken wallet address is natively no mistakes allowed.
              </li>
              <li>
                vnCHAIN does not allow transfers with a misspelling address.
              </li>
              <li>
                There will be no loss of assets due to it than other crypto-currencies.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="validator-wrap">
      <div class="wallet-icon-wrap" :class="{ 'success': isAddress, 'failed': address && !isAddress }">
        <fa :icon="['fas', 'wallet']"/>
      </div>

      <div class="mt-6">
        <input aria-label="Voken wallet address"
               ref="address"
               class="form-input address-input"
               :class="{ 'success': isAddress, 'failed': address && !isAddress }"
               v-model="address"
               placeholder="Input a Voken wallet address to validate"/>
      </div>

      <div v-show="address">
        <p v-show="isAddress" class="address-p success">
          Voken wallet address verification passed.
        </p>
        <p v-show="!isAddress" class="address-p failed">
          Not a valid Voken wallet address.
        </p>
      </div>
      <div v-show="!address">
        <p v-show="!isAddress" class="address-p">
          Please input an address to validate...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import vokenAddress from '../utils/voken-address'

export default {
  name: 'validator',
  layout: 'completed',
  data() {
    return {
      address: ''
    }
  },
  mounted: async function() {
    this.$refs.address.focus()
  },
  computed: {
    isAddress() {
      return vokenAddress.isAddress(this.address)
    }
  }
}
</script>

<style scoped>
.validator-wrap {
  @apply mt-6 p-12 bg-gray-50;
}

.wallet-icon-wrap {
  @apply text-center text-4xl text-gray-800;
}

.wallet-icon-wrap.success {
  @apply text-green-800;
}

.wallet-icon-wrap.failed {
  @apply text-red-800;
}

.address-input {
  @apply block w-full px-4 py-3;
}

.address-input.success {
  @apply bg-green-50 border-green-600 text-green-600;
}

.address-input.failed {
  @apply bg-red-50 border-red-600 text-red-600;
}

.address-p {
  @apply mt-4 text-base leading-5 text-gray-500 text-center;
}
.address-p.success {
  @apply text-green-700;
}
.address-p.failed {
  @apply text-red-700;
}

.security-tips-ul {
  @apply list-disc pl-5;
}

.security-tips-ul li {
  @apply leading-7;
}
</style>
