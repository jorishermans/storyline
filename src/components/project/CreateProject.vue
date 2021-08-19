<template>
  <n-card title="Create a new project" :style="{ width: '80%' }">
    <n-space vertical>
      <n-input-group>
        <n-input
          v-model:value="value"
          :passively-activated="true"
          placeholder="The name of the project"
          type="text"
        />
        <n-button type="primary" @click="create">Create</n-button>
      </n-input-group>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '@/store/projects'
import { NCard, NInput, NInputGroup, NButton, NSpace } from 'naive-ui'
import { ref } from 'vue'

const store = useProjectsStore()

const value = ref<string | null>(null)
const create = () => {
  // add project with name
  console.log(value.value)
  store.addProject(value.value)
}
</script>

<style>
.n-card {
  width: 100%;
}
.n-input {
  text-align: left;
}
</style>
