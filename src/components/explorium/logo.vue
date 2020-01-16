<template>
  <div class="exp-logo" :style="{width: `${width}px`, height: `${height}px`}">
    <img :src="url" :width="width" :height="height" alt v-if="title.length === 0" />
    <h4 v-else :style="{color: color}">{{title}}</h4>
  </div>
</template>

<style scoped>
.exp-logo {
  border-radius: 5px;
  overflow: hidden;
}
</style>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: () => {
        return 80
      },
    },
    height: {
      type: Number,
      default: () => {
        return 80
      },
    },
    url: {
      type: String,
      default: () => {
        return 'http://qnstatic.explorium.cn/logo/logo.png'
      },
    },
    title: {
      type: String,
      default: () => {
        return ''
      },
    },
    color: {
      type: String,
      default: () => {
        return '#ffffff'
      },
    },
  },
}
</script>
