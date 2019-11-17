import { ModuleThis } from '@nuxt/types/config/module'

export interface Options {
  accessToken?: string
  cacheProvider?: 'memory'
}

export const defaults: Options = {
  accessToken: '',
  cacheProvider: 'memory'
}

export default function initOptions (this: ModuleThis, moduleOptions?: Options): Required<Options> {
  const options = {
    ...defaults,
    ...this.options.storyblok,
    ...moduleOptions
  } as Required<Options>

  return options
}
