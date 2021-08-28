<template>
  <h1 class="project-title">{{ title }}</h1>
  <div id="app">
    <TextEditor
      :editable="true"
      :data="content"
      @update="updateText"
    ></TextEditor>
  </div>
  <div class="navigation">
    <NavigationPageItem></NavigationPageItem>
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
import NavigationPageItem from '@/components/project/NavigationPageItem.vue'
import { useProjectStore } from '@/store/project'

export interface IDPageProps {
  id: string
}

withDefaults(defineProps<IDPageProps>(), {
  id: 'hello'
})

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

<style>
h1.project-title {
  padding: 0 var(--ck-spacing-standard);
}
.navigation {
  padding: 15px 0;
}
</style>
