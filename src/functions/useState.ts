import { ss } from '@storagestack/core'
import { WebNativeProvider } from '@storagestack/webnative-provider'
import { JsonMiddleware } from '@storagestack/json-middleware'
import { LoggingMiddleware } from '@storagestack/logging-middleware'
import * as sdk from 'webnative'
import { AuthSucceeded, Continuation } from 'webnative'

export type AppPath = (path?: string | Array<string>) => string

export function isAuthSucceeded(
  state: sdk.State | undefined
): state is AuthSucceeded | Continuation {
  return (
    state !== undefined &&
    (state.scenario === sdk.Scenario.AuthSucceeded ||
      state.scenario === sdk.Scenario.Continuation)
  )
}

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

let state: sdk.State | undefined
export async function useState(): Promise<sdk.State | undefined> {
  if (!state) {
    state = await fetchState()
    setupStorageStack(state)
  }
  return state
}

export async function login(): Promise<void> {
  const state = await useState()
  if (state) {
    sdk.redirectToLobby(state.permissions)
  }
}

// storage stack
function setupStorageStack(state: sdk.State | undefined) {
  if (state) ss.registerProvider(new WebNativeProvider(state, true))
  ss.useOnce('**', new JsonMiddleware())
  ss.useOnce('**', new LoggingMiddleware())
}
