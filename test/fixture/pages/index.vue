<template>
  <h1>{{ story.name }}</h1>
</template>

<script>
export default {
  data () {
    return {
      story: { content: {} }
    }
  },
  async asyncData (context) {
    const { app } = context

    try {
      const { data } = await app.$storyapi.get('cdn/stories/page', {
        version: 'draft'
      })

      return {
        story: data.story
      }
    } catch (error) {
      if (!error.response) {
        console.error(error)
        context.error({ statusCode: 404, message: 'Failed to receive content from API' })
      } else {
        console.error(error.response.data)
        context.error({ statusCode: error.response.status, message: error.response.data })
      }
    }
  },
  mounted () {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        window.location.reload()
      }
    })
  }
}
</script>
