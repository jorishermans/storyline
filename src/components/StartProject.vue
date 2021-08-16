<template>
  <h1>{{ msg }}</h1>

  <p><CreateProject></CreateProject></p>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import CreateProject from '@/components/project/CreateProject.vue'

const count = ref(0)
const props = defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
a {
  color: #0773ff;
  font-weight: bold;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

button {
  padding: 5px 10px;
}

code,
pre {
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
    monospace;
  background-color: #eee;
  padding: 5px;
  border-radius: 2px;
  color: #304455;
}
</style>
