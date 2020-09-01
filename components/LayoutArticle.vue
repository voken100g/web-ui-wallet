<template>
  <div class="relative py-16 bg-white overflow-hidden">
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
      <div class="relative h-full text-lg max-w-prose mx-auto">
        <svg class="absolute top-12 left-full transform translate-x-32" width="404" height="384" fill="none"
             viewBox="0 0 404 384">
          <defs>
            <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20"
                     patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"/>
        </svg>
        <template v-if="short">
          <svg class="absolute bottom-12 right-full transform -translate-x-32" width="404" height="384"
               fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20"
                       patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"/>
          </svg>
        </template>
        <template v-else>
          <svg class="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width="404" height="384"
               fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20"
                       patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"/>
          </svg>
          <svg class="absolute bottom-12 left-full transform translate-x-32" width="404" height="384" fill="none"
               viewBox="0 0 404 384">
            <defs>
              <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20"
                       patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"/>
          </svg>
        </template>
      </div>
    </div>

    <div class="relative px-4 sm:px-6 lg:px-8">
      <div v-if="$slots.tag && $slots.title"
           class="text-lg max-w-prose mx-auto mb-6"
      >
        <p v-if="$slots.tag"
           class="text-base text-center leading-6 text-indigo-600 font-semibold tracking-wide uppercase"
        >
          <slot name="tag"></slot>
        </p>
        <h1 v-if="$slots.title"
            class="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
        >
          <slot name="title"></slot>
        </h1>
      </div>

      <div class="prose prose-md lg:prose-lg text-gray-500 mx-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutArticle',
  props: {
    short: {
      type: Boolean,
      default: false
    }
  }
}
</script>
