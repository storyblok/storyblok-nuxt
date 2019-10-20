import path from 'path'
import { ModuleThis } from '@nuxt/types/config/module'
import { Options } from './options'

export default function setupBuild (this: ModuleThis, options: Options) {
  this.addPlugin({
    fileName: 'storyblok/plugin.js',
    src: path.resolve(__dirname, '../templates', 'plugin.js'),
    options
  })
}
