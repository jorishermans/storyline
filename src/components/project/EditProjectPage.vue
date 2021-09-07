<template>
  <h1 class="project-title">{{ props.id }}</h1>
  <div id="app">
    <TextEditor
      :editable="true"
      :data="content"
      @update="updateText"
    ></TextEditor>
  </div>
  <div class="navigation">
    <NavigationPageItem @create="createPageLink"></NavigationPageItem>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<script lang="ts" setup>
import TextEditor from '@/components/common/TextEditor.vue'
import NavigationPageItem from '@/components/project/NavigationPageItem.vue'
import { useProjectStore } from '@/store/project'
import { ref } from 'vue'

export interface IDPageProps {
  id: string
}

const props = withDefaults(defineProps<IDPageProps>(), {
  id: 'hello',
  fileName: 'index'
})

const projectStore = useProjectStore()
projectStore.projectName = props.id as string
if (props.fileName) {
  projectStore.goTo(props.fileName)
}
// handling content for this page ...
const content = ref({ text: 'here comes content' })
projectStore.fetch().then(() => {
  if (projectStore.pageItem) {
    content.value = { text: projectStore.pageItem.content }
  }
})

const updateText = (value: { text: string }) => {
  console.log('update state', value)
  projectStore.updatePageItemContent(value.text)
}

const createPageLink = (value: string) => {
  console.log(value)
  projectStore.addPageLink(value)
}
</script>

<style>
h1.project-title {
  padding: 0 var(--ck-spacing-standard);
}
.navigation {
  padding: 15px 0;
}
</style>
