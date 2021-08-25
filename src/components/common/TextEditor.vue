<template>
  <div class="inline-edit">
    <ckeditor
      v-if="state.editable"
      ref="editorElement"
      v-model="state.editorData"
      :editor="editor"
      :config="editorConfig"
      @ready="onReady"
      @input="onEditorInput"
    >
    </ckeditor>
    <div
      v-if="!state.editable"
      class="step-content"
      v-html="state.editorData"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import InlineEditor from '@ckeditor/ckeditor5-build-inline'

export interface TextStep {
  text: string
}

export default defineComponent({
  name: 'TextEditor',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data', 'editable'],
  emits: ['update'],
  setup: (props: { editable: boolean; data: TextStep }, { emit }) => {
    const editor = InlineEditor
    const editorConfig = {}
    const editorElement = ref({})

    const state = reactive({
      enabled: false,
      editorData: props.data.text,
      editable: props.editable as boolean
    })

    console.log(props.data)

    let focusMe: () => void
    const onReady = (editor: any) => {
      focusMe = () => {
        editor.editing.view.focus()
      }
      focusMe()
    }

    const inputStream = new Subject<TextStep>()
    inputStream
      .pipe(debounceTime(500))
      .subscribe((x: TextStep) => emit('update', x))
    const onEditorInput = (input: string) => {
      const data = { text: input }
      inputStream.next(data)
    }

    watch<TextStep>(
      () => props.data as TextStep,
      async (data: TextStep) => {
        console.log('on watch', data)
        state.enabled = true
        if (data && data.text) {
          state.editorData = data.text
          focusMe()
        }
      }
    )
    return {
      editor,
      editorConfig,
      state,
      onEditorInput,
      editorElement,
      onReady
    }
  }
})
</script>

<style>
.inline-edit {
  width: 100%;
  align-self: flex-start;
}
.inline-edit.ck-content {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  min-height: 300px;
}
.inline-edit.step-content {
  margin-bottom: 1rem;
  min-height: 300px;
}
</style>
