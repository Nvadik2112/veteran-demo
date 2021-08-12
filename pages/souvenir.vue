<template>
  <v-row class="souvenir">
    <v-col cols="1"></v-col>
    <v-col class="souvenir-page" cols="10">
      <h1 class="souvenir-page__title">Сувениры</h1>
      <div class="souvenir-container" v-for="(item, index) in list" :key="index">
        <img class="souvenir-container__pic" :src="item.src" alt="">
        <h1 class="souvenir-container__name">{{item.name}}</h1>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "souvenir",
  data() {
    return {

    }
  },
  computed: {
    list() {
      return this.$store.state.souvenir.list
    }
  }
}
</script>

<style lang="sass" scoped>
.souvenir
  min-height: calc(100vh - 458px)
  &-page
    padding: 40px 12px
    &__title
      color: black
      font-weight: 400
      font-size: 36px
      line-height: 42.2px
  &-container
    padding-top: 30px
    &__pic
      max-width: 100%
      max-height: 720px
    &__name
      color: black
      font:
        weight: 400
        size: 18px
        style: italic
      color: black
</style>
