<template>
  <div>
    <hr />
    <span v-for="(item, index) in links" :key="index" class="nav-item">
      <router-link :to="routeToPage(item, projectName)">{{
        item.name
      }}</router-link>
    </span>
    <n-button round @click="showModal = true">
      <template #icon>
        <n-icon size="18">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
            />
          </svg>
        </n-icon>
      </template>
      Add choice
    </n-button>
    <n-modal v-model:show="showModal">
      <n-card style="width: 600px" title="Modal" :bordered="false" size="huge">
        <template #header> Add choice </template>
        <n-space vertical>
          <n-input-group>
            <n-input
              v-model:value="value"
              :passively-activated="true"
              placeholder="The name of the page we are going to place a link to"
              type="text"
            />
            <n-button type="primary" @click="create">Create</n-button>
          </n-input-group>
        </n-space>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from '@/store/project'
import {
  NIcon,
  NButton,
  NModal,
  NCard,
  NInput,
  NInputGroup,
  NSpace
} from 'naive-ui'
import { computed, ref } from 'vue'

const store = useProjectStore()
const links = computed(() => {
  console.log(store.pageItem)
  return store.pageItem?.children
})
const projectName = computed(() => store.projectName)

const routeToPage = (
  project: { filename: string; name: string },
  projectName: string
) => `/project/t/${projectName}/${project.filename}`

const showModal = ref(false)
const value = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'create', value: string): void
}>()

const create = () => {
  // add project with name
  showModal.value = false
  if (value.value) {
    emit('create', value.value)
  }
}
</script>

<style>
.n-card {
  width: 100%;
}
.n-input {
  text-align: left;
}
.nav-item {
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
}
.nav-item:hover {
  color: #36ad6a;
}
</style>
