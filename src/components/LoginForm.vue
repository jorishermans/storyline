<template>
  <div>
    <h2>Identify yourself ...</h2>
    <div><a @click="login">login</a></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/auth'

export default defineComponent({
  name: 'LoginForm',
  setup: () => {
    const { login } = useAuthStore()
    return { login }
  }
})
</script>
