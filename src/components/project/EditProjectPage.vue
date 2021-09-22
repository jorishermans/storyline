<template>
  <h3 class="project-title">{{ props.id }}</h3>
  <div v-if="loaded" id="app">
    <TextEditor
      :editable="true"
      :data="content"
      @update="updateText"
    ></TextEditor>
    <div class="navigation">
      <NavigationPageItem
        :children="children"
        @create="createPageLink"
      ></NavigationPageItem>
    </div>
  </div>
  <div v-if="!loaded">loading ...</div>
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
  fileName: string
}

const props = withDefaults(defineProps<IDPageProps>(), {
  id: 'hello',
  fileName: 'index'
})

const projectStore = useProjectStore()
projectStore.projectName = props.id as string
let goToPromise = Promise.resolve()
if (props.fileName) {
  console.log('goTo ...')
  goToPromise = projectStore.goTo(props.fileName)
}
// handling content for this page ...
const content = ref({ text: 'here comes content' })
const children = ref<{ filename: string; name: string }[]>([])
const loaded = ref<boolean>(false)
goToPromise.then(() => {
  projectStore.fetch().then(() => {
    loaded.value = true
    if (projectStore.pageItem) {
      content.value = { text: projectStore.pageItem.content }
      children.value = projectStore.pageItem.children
    }
  })
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
