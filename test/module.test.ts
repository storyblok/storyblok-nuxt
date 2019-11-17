
import { Nuxt } from '@nuxt/core-edge'
import _storyblokNuxtModule from '../src'
import _initOptions, { defaults as defaultOptions, Options } from '../src/options'
import _setupBuild from '../src/build'

let nuxt

const storyblokNuxtModule = async (options?: Options) => {
  _storyblokNuxtModule.call(nuxt.moduleContainer, options)
  await nuxt.callHook('build:before')
}

const initOptions = (options?: Options): Required<Options> => _initOptions.call(nuxt.moduleContainer, options)
const setupBuild = (options?: Options) => {
  _setupBuild.call(nuxt.moduleContainer, options)
  nuxt.options.build.extend && nuxt.options.build.extend({ plugins: [] })
}

beforeEach(async () => {
  nuxt = new Nuxt()
  await nuxt.ready()
})

describe('initOptions', () => {
  test('default', () => {
    const options = initOptions()

    expect(options).toEqual(defaultOptions)
  })
})

describe('setupBuild', () => {
  test('default', () => {
    nuxt.options.dir.app = ''

    setupBuild(defaultOptions)

    expect(nuxt.options.build.templates.map(t => t.dst)).toEqual(['storyblok/plugin.js'])
  })
})

describe('module', () => {
  test('default', async () => {
    await storyblokNuxtModule(defaultOptions)
  })
})
