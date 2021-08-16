<template>
  <div>
    <h2>Identify yourself ...</h2>
    <div><a @click="login">login</a></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { login } from '@/functions/useState'

export default defineComponent({
  name: 'LoginForm',
  setup: () => {
    return { login }
  }
})
</script>
