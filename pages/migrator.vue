<template>
  <layout-container class="py-6">
    <div class="bg-gray-800 max-w-screen-xl mx-auto pt-12 px-4 pb-8 sm:px-6 lg:pt-16 lg:px-8 lg:pb-12">
      <div class="lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
            Migrator
          </h2>
          <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
            Migrate your Voken to vnCHAIN from ERC20
          </p>
        </div>
      </div>

      <div class="flex mt-4 lg:mt-6">
        <div class="flex-shrink-0 text-gray-200 text-3xl">
          <fa :icon="['fas', 'wallet']"/>
        </div>
        <div class="mt-5 ml-3">
          <h3 class="text-sm leading-5 font-bold text-gray-200">
            Notice
          </h3>
          <div class="mt-2 text-sm leading-5 text-gray-300">
            <ul class="security-tips-ul">
              <li>
                Please make sure you have saved the mnemonic or private key for the address that you are about to
                migrate.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 text-4xl lg:text-5xl text-gray-300 text-center">
      <fa :icon="['fas', 'hourglass-half']"/>
    </div>

    <layout-article :short="true">
      <template #tag>
        To be released
      </template>

      <template #title>
        Migrate to vnCHAIN
      </template>

      <p>
        Once the vnCHAIN Susitna (beta) has been proven to work stably and efficiently,
        we can prepare the launch work for vnCHAIN Copper (phase #1 of the main net).
      </p>

      <p>
        It takes time, but not far.
      </p>

      <h2>
        How to migrate?
      </h2>

      <p>
        There will be a web3 dApp runs on Ethereum, by which you can prove your holding.
        Submit your VOKEN wallet address to it; then, you can get the balance in vnCHAIN.
      </p>
      <p>
        The migration dApp would be released before the vnCHAIN Copper is launched.
      </p>

      <h2 id="from-voken-1">
        From Voken 1.0 ?
      </h2>
      <p>
        <strong>Voken1.0</strong> ERC20 token on Ethereum <strong>was deprecated</strong> since Sep 2019.
        No one can transfer even one nano Voken (100 kB traffic).
      </p>
      <p>
        For many reasons, some people hadn't finished the upgrading.
        That's sad. But don't worry,
        we can find a way to make another specific dApp to finish it.
        As the same: submit, then get your VOKEN in vnCHAIN.
      </p>
    </layout-article>


    <div class="hidden validator-wrap">
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
          Please input an valid address to migrate...
        </p>
      </div>
    </div>
  </layout-container>
</template>

<script>
import vokenAddress from '../utils/voken-address'
import LayoutArticle from '~/components/LayoutArticle'
import LayoutContainer from '~/components/LayoutContainer'

export default {
  name: 'migrator',
  components: { LayoutContainer, LayoutArticle },
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
