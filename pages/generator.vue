<template>
  <div class="py-6">
    <div class="bg-gray-800 max-w-screen-xl mx-auto pt-12 px-4 pb-8 sm:px-6 lg:pt-16 lg:px-8 lg:pb-12">
      <div class="lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
            Generator
          </h2>
          <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
            Voken Hierarchical Deterministic Wallet
          </p>
        </div>
        <div class="mt-8 lg:mt-0 lg:ml-8">
          <div class="sm:flex">
            <select aria-label="Mnemonic Length"
                    v-model="mnemonicLength"
                    class="mnemonic-length-select placeholder-gray-500 focus:placeholder-gray-400">
              <option v-for="option in mnemonicLengthOptions" v-bind:value="option">{{ option }} words</option>
            </select>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button class="btn-generate" @click="generateMnemonic">
                (re)Generate
              </button>
            </div>
          </div>
          <p class="mt-3 text-sm leading-5 text-gray-300">
            You can select the length of mnemonic. {{ mnemonicStrength }} bits now.
          </p>
        </div>
      </div>

      <div class="flex mt-4 lg:mt-6">
        <div class="flex-shrink-0 text-gray-200 text-3xl">
          <fa :icon="['fas', 'shield-alt']"/>
        </div>
        <div class="mt-5 ml-3">
          <h3 class="text-sm leading-5 font-bold text-gray-200">
            Security tips:
          </h3>
          <div class="mt-2 text-sm leading-5 text-gray-300">
            <ul class="security-tips-ul">
              <li>
                An HD wallet can help you manage addresses/key-pairs with only one mnemonic (backup phrase).
              </li>
              <li>
                The mnemonic makes it easy to back up and restore your Voken HD wallet.
              </li>
              <li>
                Please be sure to keep your mnemonic safe.
              </li>
              <li>
                Anyone with the mnemonic can derive all of your key-pairs/addresses, and take your assets forever.
              </li>
              <li class="font-bold">
                Never disclose your mnemonic, neither the private keys.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--  Mnemonic  -->
    <div class="mt-6 sensitive" :class="{ 'error': mnemonicInvalid }">
      <label for="mnemonic" class="label">
        BIP39 Mnemonic (backup phrase)
      </label>
      <textarea id="mnemonic"
                rows="3"
                ref="mnemonic"
                class="form-textarea mt-1 mnemonic-textarea"
                placeholder="Input or generate your mnemonic"
                v-model="mnemonic"
                @focus="mnemonicFocus"
                @blur="mnemonicBlur"
                @keyup.enter="mnemonicBlur"
      ></textarea>
      <p v-show="mnemonicInvalid"
         class="mt-1 text-sm text-red-600 text-center font-bold">
        [Checksum failed] Invalid mnemonic.
      </p>
    </div>

    <!--  Wallet icon  -->
    <div class="mt-6 text-center text-4xl text-gray-800">
      <fa :icon="['fas', 'wallet']"/>
    </div>

    <div class="mt-3 lg:text-center">
      <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        Native secure Voken address
      </h3>
      <p class="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
        A Voken wallet address is natively no mistakes allowed.
        vnCHAIN does not allow transfers with a misspelling address.
        There will be no loss of assets due to it than other crypto-currencies.
      </p>
    </div>

    <!--  Wallets  -->
    <div v-for="wallet in wallets"
         class="mt-6 bg-gray-50 overflow-hidden sm:rounded-lg border border-gray-500">
      <div class="px-4 py-5 sm:p-6">

        <div class="flex flex-col items-center justify-center space-y-3">
          <div>
            <ident-icon class="wallet-ident-icon" :value="wallet.address"/>
          </div>

          <h2 class="text-xl text-gray-600">
            Wallet #{{ wallet.id }}
          </h2>
        </div>


        <div class="mt-4 sensitive">
          <label :for="private_key_id(wallet.id)" class="label">
            Private key
          </label>
          <div class="input-wrap">
            <input :id="private_key_id(wallet.id)"
                   class="form-input input"
                   placeholder="Private key in hex"
                   readonly
                   v-model="wallet.prvKeyHex">
          </div>
          <p class="purpose">
            For signing and verification
          </p>
        </div>

        <div class="mt-4 safe">
          <label :for="public_key_id(wallet.id)" class="label">
            Public key
          </label>
          <div class="input-wrap">
            <input :id="public_key_id(wallet.id)"
                   class="form-input input"
                   placeholder="Public key in hex"
                   readonly
                   v-model="wallet.pubKeyHex">
          </div>
          <p class="purpose">
            For encrypted communications
          </p>
        </div>

        <div class="mt-4 safe">
          <label :for="voken_address_id(wallet.id)" class="label">
            Voken wallet address
          </label>
          <div class="input-wrap">
            <input :id="voken_address_id(wallet.id)"
                   class="form-input input"
                   placeholder="Voken address"
                   readonly
                   v-model="wallet.address">
          </div>
          <p class="purpose">
            For sending or receiving assets
          </p>
        </div>

      </div>
    </div>

    <!--  Generate one more wallet  -->
    <div v-if="this.wallets.length"
         class="mt-6 text-center">
      <span class="inline-flex rounded-md shadow-sm">
        <button type="button"
                @click="newWallet"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150">
          <fa :icon="['fas', 'wallet']"/>
          <span class="ml-4">
            Show wallet #{{ this.wallets.length }}
          </span>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import * as bip39 from 'bip39'
import * as HDKey from 'hdkey'
import vokenAddress from '../utils/voken-address'
import IdentIcon from '@/components/IdentIcon'

export default {
  name: 'generator',
  components: { IdentIcon },
  layout: 'completed',
  data() {
    return {
      mnemonic: '',
      mnemonicInvalid: null,
      mnemonicLength: 18,
      mnemonicLengthOptions: [12, 15, 18, 21, 24],
      masterSeed: null,
      hdKey: null,
      root_path: 'm/44\'/678\'/0\'/0/',
      wallets: []
    }
  },
  computed: {
    mnemonicStrength() {
      let mnemonicStrengthArray = []
      mnemonicStrengthArray[12] = 128
      mnemonicStrengthArray[15] = 160
      mnemonicStrengthArray[18] = 192
      mnemonicStrengthArray[21] = 224
      mnemonicStrengthArray[24] = 256

      return mnemonicStrengthArray[this.mnemonicLength]
    }
  },
  watch: {
    mnemonicLengthSelected: async function() {
      await this.generateMnemonic()
    }
  },
  mounted: async function() {
    this.$refs.mnemonic.focus()
    // await this.generateMnemonic()
  },
  methods: {
    async reset() {
      this.mnemonic = ''
      await this.resetHDKey()
    },
    async resetHDKey() {
      this.masterSeed = null
      this.hdKey = null
      this.wallets = []
    },
    async mnemonicFocus() {
      this.mnemonicInvalid = false
    },
    async mnemonicBlur() {
      this.mnemonic = this.mnemonic.trim().replace(/[\r\n]/g, '').split(' ').filter(String).join(' ')
      await this.generateFromMnemonic()
    },
    async generateMnemonic() {
      await this.reset()
      this.mnemonic = bip39.generateMnemonic(this.mnemonicStrength)
      await this.generateFromMnemonic()
    },
    async generateFromMnemonic() {
      await this.resetHDKey()

      if (this.mnemonic) {
        if (bip39.validateMnemonic(this.mnemonic)) {
          this.mnemonicInvalid = false

          await bip39.mnemonicToSeed(this.mnemonic).then(seed => {
            this.masterSeed = seed
            this.hdKey = HDKey.fromMasterSeed(seed)
          })

          this.newWallet()
        } else {
          this.mnemonicInvalid = true
        }
      }
    },
    newWallet() {
      let _id = this.wallets.length
      let _path = this.root_path + _id
      let _hdKey = this.hdKey.derive(_path)
      let _prvKey = _hdKey.privateKey
      let _pubKey = _hdKey.publicKey
      this.wallets.push({
        id: _id,
        path: _path,
        hdKey: _hdKey,
        prvKeyHex: _prvKey.toString('hex'),
        pubKeyHex: _pubKey.toString('hex'),
        address: vokenAddress.pubToAddress(_pubKey)
      })
    },
    private_key_id(id) {
      return 'private_key_' + id
    },
    public_key_id(id) {
      return 'public_key_' + id
    },
    voken_address_id(id) {
      return 'voken_address_' + id
    }
  }
}
</script>

<style scoped>
.label {
  @apply block text-sm leading-5 font-medium text-gray-700;
}

.mnemonic-textarea {
  @apply block w-full text-lg leading-8 rounded-md shadow-sm font-bold;
  @apply transition duration-150 ease-in-out;
}

.input-wrap {
  @apply mt-1 rounded-md shadow-sm;
}

.input {
  @apply block w-full font-mono text-sm leading-5;
}

.sensitive .label {
  @apply text-yellow-700;
}

.sensitive .input {
  @apply bg-yellow-50 border-yellow-500 text-yellow-600;
}

.sensitive .mnemonic-textarea {
  @apply bg-yellow-50 border-yellow-500 text-yellow-600;
}

.sensitive .mnemonic-textarea:focus {
  @apply bg-transparent border-gray-300 text-gray-600;
}

.error .mnemonic-textarea {
  @apply bg-red-50 text-red-600 border-red-600;
}

.error .label {
  @apply text-red-800;
}

.safe .label {
  @apply text-green-700;
}

.safe .input {
  @apply bg-green-50 border-green-500 text-green-600;
}

.mnemonic-length-select {
  @apply appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white;
  @apply transition duration-150 ease-in-out;
}

.mnemonic-length-select:focus {
  @apply outline-none;
}

.wallet-ident-icon {
  @apply w-14 h-14 bg-gray-300 rounded-full border-2 border-gray-50 shadow;
}

.btn-generate {
  @apply w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500;
  @apply transition duration-150 ease-in-out;
}

.btn-generate:hover {
  @apply bg-indigo-400;
}

.btn-generate:focus {
  @apply outline-none bg-indigo-400;
}

.security-tips-ul {
  @apply list-disc pl-5;
}

.security-tips-ul li {
  @apply leading-7;
}

.purpose {
  @apply mt-1 text-xs text-gray-500 text-right;
}
</style>
