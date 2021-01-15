import { resolve } from 'path'
import myModule from './'

export default {
  rootDir: resolve(__dirname, '.'),
  buildDir: resolve(__dirname, './example/.nuxt'),
  srcDir: resolve(__dirname, './example'),
  buildModules: [{ handler: myModule }],
  // storyblok: {
  //   accessToken: process.env.STORYBLOK_TOKEN
  // },
  publicRuntimeConfig: {
    storyblok: {
      accessToken: process.env.STORYBLOK_TOKEN
    }
  },
  modules: ['@nuxtjs/axios']
}
