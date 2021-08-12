<template>
  <v-row class="gallery">
    <v-col cols="2" class="gallery__links links">
      <list :list="list" :keys="keys" :padding="padding" style="padding-bottom:14px"></list>
      <list-scroll v-if="this.showList" :list="listScroll" :addMarginTop="'-110px'" :addCoordinate=50 :blockClass="blockClass"></list-scroll>
    </v-col>
    <v-col v-bind:style="{paddingTop: paddingTop + 'px'}" cols="10" class="gallery__page">
      <NuxtChild />
    </v-col>
  </v-row>
</template>

<script>
export default {
name: "gallery",
  data() {
    return {
      keys: 0,
      list: [
        {linkName: 'Фотографии', url: '/gallery/photo'},
        {linkName: 'Видео', url: '/gallery/video'},
      ],

      padding: '0 0 32px 0',
      paddingTop: 25,
      blockClass: ".photo-container"
    }
  },
  methods: {
    route(x){
      this.$router.push(x)
    },
    choose() {

    }
  },
  computed: {
    listScroll() {
        return this.$store.state.gallery.photo
    },
    listKey() {
      return this.$store.state.data.listKey
    },
    showList() {
      return this.$store.state.data.showList
    },
  },
  mounted() {
    this.$store.dispatch('data/setPaddingTop', this.paddingTop)
  }
}
</script>

<style lang="sass" scoped>
.gallery
  min-height: calc(100vh - 458px)
  &__links
    padding: 50px 0 0 21px
    position: relative
  &__page
    padding: 42px 92px 48px 0
  </style>
