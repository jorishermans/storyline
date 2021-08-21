<template>
  <main class="layout-home">
    <div class="container">
      <div v-if="!isLoggedIn.value && isLoggedIn.isSuccessful">
        <LoginForm></LoginForm>
      </div>
      <div v-if="isLoggedIn.value && isLoggedIn.isSuccessful">
        <router-view />
      </div>
      <div v-if="isLoggedIn.isRunning">Loading ...</div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import { TaskInstance, useTask } from 'vue-concurrency'
import { useAuthStore } from '@/store/auth'

export default defineComponent({
  components: { LoginForm },
  setup: () => {
    const authStore = useAuthStore()
    const getisAuthSucceededTask = useTask(function* () {
      yield authStore.useState()
      const result = authStore.isAuthSucceeded
      console.log(result)
      return result
    })
    const isLoggedIn: TaskInstance<boolean> = getisAuthSucceededTask.perform() // TaskInstance
    // You can pass the task instance or you can pass the task and use `last` to access the instance.
    return { isLoggedIn }
  }
})
</script>
