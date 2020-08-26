<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Mobile menu button -->
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
              @click="toggleMobileMenu"
            >
              <!-- Icon when menu is closed. -->
              <svg v-show="!mobileMenu" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <!-- Icon when menu is open. -->
              <svg v-show="mobileMenu" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Logo -->
          <nuxt-link to="/" class="flex-shrink-0 flex items-center">
            <div class="text-gray-300 text-3xl">
              <fa :icon="['fas', 'wallet']"/>
            </div>
            <div class="hidden lg:block pl-4 text-gray-300 text-2xl">
              Voken HD Wallet
            </div>
          </nuxt-link>

          <!-- navigations -->
          <div class="hidden md:ml-6 md:flex md:items-center">
            <template v-for="nav in navigations">
              <nuxt-link :to="nav.path" class="nav-h">{{ nav.text }}</nuxt-link>
            </template>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span class="rounded-md shadow-sm">
              <nuxt-link to="/migrator"
                         class="btn">
                <fa :icon="['fas', 'plane-departure']"/>
                <span class="pl-2">
                  Migrate
                </span>
              </nuxt-link>
            </span>
          </div>

          <!-- Profile  -->
          <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center" v-if="profile">
            <div class="relative">
              <!-- Profile button -->
              <div>
                <button
                  class="flex text-2xl text-gray-300 focus:outline-none focus:text-white transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                  @click="toggleProfile"
                >
                  <fa :icon="['fas', 'globe-americas']"/>
                </button>
              </div>

              <!-- Profile panel -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div v-show="profile"
                     class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  <div class="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"
                       aria-labelledby="user-menu">
                    <a href="#" class="profile-h" role="menuitem">Your Profile</a>
                    <a href="#" class="profile-h" role="menuitem">Settings</a>
                    <a href="#" class="profile-h" role="menuitem">Sign out</a>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden"
         :class="{ block: mobileMenu, hidden: !mobileMenu }">

      <!-- navigations -->
      <div class="px-2 pt-2 pb-3 sm:px-3">
        <template v-for="nav in navigations">
          <nuxt-link :to="nav.path" class="nav-v">{{ nav.text }}</nuxt-link>
        </template>
      </div>

      <div class="pt-4 pb-3 border-t border-gray-700" v-if="profile">
        <div class="flex items-center px-5 sm:px-6">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full"
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-6 text-white">Tom Cook</div>
            <div class="text-sm font-medium leading-5 text-gray-400">tom@example.com</div>
          </div>
        </div>

        <div class="mt-3 px-2 sm:px-3">
          <a href="#" class="profile-v">Your Profile</a>
          <a href="#" class="">Settings</a>
          <a href="#" class="profile-v">Sign out</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SiteNav',
  data() {
    return {
      navigations: [
        { text: 'Generator', path: '/generator' },
        { text: 'Validator', path: '/validator' },
        { text: 'Migrator', path: '/migrator' }
      ],

      mobileMenu: false,
      profile: false
    }
  },
  methods: {
    toggleProfile() {
      this.profile = !this.profile
    },
    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu
    }
  }

}
</script>

<style scoped>
.nav-h {
  @apply ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300;
  @apply transition duration-150 ease-in-out;
}

.nav-h:first-child {
  @apply ml-0;
}

.nav-h:hover {
  @apply text-white bg-gray-700;
}

.nav-h:focus {
  @apply outline-none text-white bg-gray-700;
}

.nav-h.nuxt-link-active {
  @apply bg-gray-900;
}

.nav-v {
  @apply mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300;
  @apply transition duration-150 ease-in-out;
}

.nav-v:first-child {
  @apply mt-0;
}

.nav-v:hover {
  @apply text-white bg-gray-700;
}

.nav-v:focus {
  @apply outline-none text-white bg-gray-700;
}

.nav-v.nuxt-link-active {
  @apply bg-gray-900;
}

.profile-h {
  @apply block px-4 py-2 text-sm leading-5 text-gray-700;
  @apply transition duration-150 ease-in-out;
}

.profile-h:hover {
  @apply bg-gray-100;
}

.profile-h:focus {
  @apply outline-none bg-gray-100;
}

.profile-v {
  @apply mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400;
  @apply transition duration-150 ease-in-out;
}

.profile-v:first-child {
  @apply mt-0;
}

.profile-v:hover {
  @apply text-white bg-gray-700;
}

.profile-v:focus {
  @apply outline-none text-white bg-gray-700;
}

</style>
