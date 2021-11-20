import StoryblokVue from "@storyblok/vue";
import StoryblokClient from 'storyblok-js-client/source'
import { defineNuxtPlugin } from '#app'

const loadScript = (src, cb) => {
  if (document.getElementById("storyblok-javascript-bridge")) {
    return cb();
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.id = "storyblok-javascript-bridge";

  script.onerror = function () {
    cb(new Error("Failed to load" + src));
  };

  script.onload = function () {
    cb();
  };

  document.getElementsByTagName("head")[0].appendChild(script);
};

let doLoadScript = true;

const initStoryapi = () => {
  return new StoryblokClient({
    accessToken: '<%= options.accessToken %>',
    cache: {
      clear: 'auto',
      type: '<%= options.cacheProvider || 'memory' %>'
    },
    timeout: <%= options.timeout || 0 %><% if (options.region) { %>,
    region: '<%= options.region %>'<% } %><% if (typeof options.https !== 'undefined') { %>,
    https: <%= options.https %><% } %>
  }<% if (typeof options.endpoint !== 'undefined') { %>, '<%= options.endpoint %>'<% } %>)
}

const storybridge = (cb, errorCb) => {
  if (typeof errorCb !== "function") {
    errorCb = function () {};
  }
  if (window.location == window.parent.location) {
    errorCb("You are not in the edit mode.");
    return;
  }
  if (!doLoadScript) {
    if (!window.StoryblokBridge) {
      errorCb("The Storyblok bridge script is already loading.");
      return;
    }
    cb();
    return;
  }
  doLoadScript = false;
  loadScript("https://app.storyblok.com/f/storyblok-v2-latest.js", cb);
};


export default defineNuxtPlugin(({vueApp, provide}) => {
  vueApp.use(StoryblokVue);
  
  provide("storyapi", initStoryapi());
  provide("storybridge", storybridge);
})