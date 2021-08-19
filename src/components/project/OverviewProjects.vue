<template>
  <div>
    <div v-for="(project, index) in projects" :key="index">
      <a href="javascript:;">{{ project }}</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '@/store/projects'
import { computed } from 'vue'

const store = useProjectsStore()
store.fetch()
const projects = computed(() => store.$state.projects)
</script>

<style>
.n-card {
  width: 100%;
}
.n-input {
  text-align: left;
}
</style>
