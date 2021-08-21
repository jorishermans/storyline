import { ss } from '@storagestack/core'
import { JsonMiddleware } from '@storagestack/json-middleware'
import { LoggingMiddleware } from '@storagestack/logging-middleware'
import { WebNativeProvider } from '@storagestack/webnative-provider'
import { defineStore } from 'pinia'
import * as sdk from 'webnative'

interface AuthState {
  state: sdk.State | undefined
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    state: undefined
  }),
  getters: {
    getState(state) {
      return state.state
    },
    isAuthSucceeded(state) {
      return (
        state.state !== undefined &&
        (state.state.scenario === sdk.Scenario.AuthSucceeded ||
          state.state.scenario === sdk.Scenario.Continuation)
      )
    }
  },
  actions: {
    async useState() {
      if (!this.state) {
        this.state = await fetchState()
        setupStorageStack(this.state as sdk.State | undefined)
      }
      return this.state as sdk.State
    },
    async login(): Promise<void> {
      const state = await this.useState()
      if (state) {
        sdk.redirectToLobby(state.permissions)
      }
    }
  }
})

async function fetchState(): Promise<sdk.State | undefined> {
  try {
    return await sdk.initialise({
      permissions: {
        app: {
          name: 'StoryLine',
          creator: 'closeby.one'
        },

        fs: {
          private: [sdk.path.directory('stories')]
        }
      }
    })
  } catch (err) {
    console.error('fetchScenarioError', err)
  }
}

// storage stack
function setupStorageStack(state: sdk.State | undefined) {
  if (state) ss.registerProvider(new WebNativeProvider(state, true))
  ss.useOnce('**', new JsonMiddleware())
  ss.useOnce('**', new LoggingMiddleware())
}
