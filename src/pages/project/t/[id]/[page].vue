<template>
  <h1>{{ title }}</h1>
  <EditProjectPage :id="id" :file-name="page"></EditProjectPage>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EditProjectPage from '@/components/project/EditProjectPage.vue'
import { unslugify } from '@/utilities/slugify'

const route = useRoute()
const id = computed(() => route.params.id as string)
const page = computed(() => route.params.page as string)
const title = computed(() => unslugify(route.params.page as string))
</script>

<style>
h1.project-title {
  padding: 0 var(--ck-spacing-standard);
}
.navigation {
  padding: 15px 0;
}
</style>
