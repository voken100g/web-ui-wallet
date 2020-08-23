<template>
  <div class="lo-error">
    <h1>
      Error
      {{ error.statusCode }}
    </h1>

    <h2>
      {{ error.message }}
    </h2>

    <div class="links">
      <nuxt-link to="/">Home Page</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "error",
    props: ['error']
  }
</script>

<style scoped>
  .lo-error {
    @apply font-sans text-center;
    padding-top: 10vh;
  }

  .lo-error h1 {
    @apply font-light tracking-wide text-gray-700 text-5xl;
  }

  .lo-error h2 {
    @apply font-light tracking-wider text-gray-600 text-2xl;
  }

  .links {
    @apply mt-12;
  }

  .links a {
    @apply py-3 px-8;
    @apply border-red-700 border rounded text-red-700;
    @apply font-mono text-lg;
  }

  .links a:hover {
    @apply bg-red-700 text-white;
  }
</style>
