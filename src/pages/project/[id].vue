<template>
  <h1>{{ title }}</h1>
  <div id="app">
    <TextEditor
      :editable="true"
      :data="content"
      @update="updateText"
    ></TextEditor>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import TextEditor from '@/components/common/TextEditor.vue'
import { useProjectStore } from '@/store/project'

const route = useRoute()

const projectStore = useProjectStore()
projectStore.projectName = route.params.id as string
// handling content for this page ...
const content = ref({ text: 'here comes content' })
projectStore.fetch().then(() => {
  if (projectStore.pageItem) {
    content.value = { text: projectStore.pageItem.content }
  }
})

const updateText = (value: any) => {
  console.log('update state', value)
  projectStore.updatePageItemContent(value.text)
}

const title = computed(() => route.params.id)
</script>
