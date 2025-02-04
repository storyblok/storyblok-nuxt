<script setup lang="ts">
import { NuxtLink } from '#build/components';
import { MarkTypes, type StoryblokRichTextNode } from '@storyblok/vue';

const story = await useAsyncStoryblok(
  "vue/test-richtext",
  {
    version: "draft"
  }
  // { resolveRelations: "Article.categories" }
);

const resolvers = {
  [MarkTypes.LINK]: (node: StoryblokRichTextNode<VNode>) => {
    return node.attrs?.linktype === "STORY"
      ? h(
          NuxtLink,
          {
            to: node.attrs?.href,
            target: node.attrs?.target
          },
          node.text
        )
      : h(
          "a",
          {
            href: node.attrs?.href,
            target: node.attrs?.target
          },
          node.text
        );
  }
};
</script>

<template>
  <StoryblokRichText
    v-if="story.content.richText"
    :doc="story.content.richText"
    :resolvers="resolvers"
  />
</template>
