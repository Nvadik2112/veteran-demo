<template>
  <v-row class="veterans">
    <v-col cols="2" class="veterans__links links">
      <list :list="list" :keys="keys" :padding="padding"></list>
    </v-col>
    <v-col cols="10" class="veterans__page">
      <NuxtChild />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data(){
    return {
      keys: 0,
      list: [
        {linkName: 'Общество', url: '/veterans/society'},
        {linkName: 'Цель общества', url: '/veterans/purpose'},
        {linkName: 'Устав общества', url: '/veterans/ordinance'},
        {linkName: 'Руководство общества', url: '/veterans/leaders'},
        {linkName: 'Совет общества', url: '/veterans/council'},
        {linkName: 'Члены общества', url: '/veterans/members'},
        {linkName: 'Членские взносы', url: '/veterans/fees'},
        {linkName: 'Членство в организации', url: '/veterans/membership'},
        {linkName: 'История общества', url: '/veterans/history'}
      ],
      padding: '0 0 20px 0',
      paddingTop: 42,
    }
  },
  methods: {
    route(x){
      this.$router.push(x)
    },
  },
  mounted() {
    this.$store.dispatch('data/setPaddingTop', this.paddingTop)
  }
}
</script>

<style lang="sass">
.veterans
  &__links
    padding: 50px 5px 0 21px
  &__page
    padding: 42px 63px 48px 5px
    min-height: calc(100vh - 458px)
  &-container
    margin-top: 23px
    white-space: pre-wrap
    &__sub
      padding-bottom: 30px
    & p
      margin: 0
      font-family: 'TT Norms Light'
      font-weight: 300
      font-size: 18px
      line-height: 25px
      color: black
    & img
      width: 240px
      height: 120px
    &__title
      width: 150px
      display: flex
      justify-content: center
      align-items: center
    &__subtitle
      display: flex
      justify-content: center
      align-items: center
      color: black
      font:
        size: 24px
        weight: 400
      line-height: 26px
    & span
      color: #6A6A6A
      font:
        size: 12px
        weight: 300
      line-height: 14px
    &__list
      padding: 0
      &-item
        padding: 11px 0!important
    &__avatar
      height: 100px
      width: 100px
      border-radius: 50px
      background-color: #C4C4C4
    &__detail
      margin-left: 30.21px
      display: flex
      flex-direction: column
</style>
