<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

    <div class="mt-6 py-12 px-4 md:px-6 bg-gray-50">
      <div class="wallet-icon-wrap" :class="{ 'success': addressSuccess, 'error': addressError }">
        <fa :icon="['fas', 'wallet']"/>
      </div>

      <div class="mt-6">
        <label for="address"></label>
        <div class="mt-4 relative">
          <input id="address"
                 ref="address"
                 class="form-input ipt"
                 :class="{ 'success': addressSuccess, 'error': addressError }"
                 v-model="address"
                 placeholder="Input a Voken wallet address to validate"/>

          <div v-show="addressSuccess" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <ident-icon :value="address" class="w-10 h-10 rounded-full border-2 border-green-50 shadow-md"/>
          </div>
        </div>
      </div>

      <div v-show="address">
        <p class="ipt-p" :class="{ 'success': addressSuccess, 'error': addressError }">
          <span v-show="addressSuccess">
            VOKEN wallet address verification passed.
          </span>
          <span v-show="!addressSuccess">
            Not a valid VOKEN wallet address.
          </span>
        </p>
      </div>
      <div v-show="!address">
        <p class="ipt-p">
          Please input an address to validate...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import vokenAddress from '../utils/voken-address'
import IdentIcon from '~/components/IdentIcon'

export default {
  name: 'validator',
  components: { IdentIcon },
  data() {
    return {
      address: ''
    }
  },
  mounted: async function() {
    this.$refs.address.focus()
  },
  computed: {
    addressSuccess() {
      return vokenAddress.isAddress(this.address)
    },
    addressError() {
      return this.address && !this.addressSuccess
    },
    isAddress() {
      return vokenAddress.isAddress(this.address)
    }
  }
}
</script>

<style scoped>
.wallet-icon-wrap {
  @apply text-center text-4xl text-gray-800;
}

.wallet-icon-wrap.success {
  @apply text-green-800;
}

.wallet-icon-wrap.error {
  @apply text-red-800;
}

.ipt {
  @apply block w-full px-4 py-4;
}

.ipt-p {
  @apply mt-4 text-center;
}

.address-p {
  @apply mt-4 text-base leading-5 text-gray-500 text-center;
}

.address-p.success {
  @apply text-green-700;
}

.address-p.error {
  @apply text-red-700;
}

.security-tips-ul {
  @apply list-disc pl-5;
}

.security-tips-ul li {
  @apply leading-7;
}
</style>
