<template>
  <div>hello {{title}}</div>
</template>

<script>
export default {
  data: () => ({
    title: ''
  }),
  mounted() {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action == 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        window.location.reload()
      }
    })
  },
  async asyncData (context) {
    try {
      const {data} = await context.app.$storyapi.get('cdn/stories/home', {
        version: 'draft'
      })
      return {
        ...data.story.content
      }
    } catch(e) {
      console.log(e)
    }
  }
}
</script>
