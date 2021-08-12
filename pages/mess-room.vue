<template>
  <v-row class="mess-room">
    <v-col cols="2" class="mess-room__links links">
      <list :list="list" :keys="keys" :padding="padding" style="padding-bottom:14px"></list>
      <list-scroll v-if="this.showList" :list="listScroll" :addMarginTop="'-80px'" :addCoordinate=70 :blockClass="blockClass"></list-scroll>
    </v-col>
    <v-col v-bind:style="{paddingTop: paddingTop + 'px'}" cols="10" class="mess-room__page">
      <NuxtChild />
    </v-col>
  </v-row>
</template>

<script>
import ListScroll from "@/components/listScroll";
export default {
  components: {ListScroll},
  data(){
    return {
      keys: 0,
      list: [
        {linkName: 'Форум', url: '/mess-room/forum'},
        {linkName: 'Дни рождения', url: '/mess-room/birthday'},
        {linkName: 'Книга памяти', url: '/mess-room/memory_book'},
      ],
      listScroll: [
        {linkName: 'Январь'},
        {linkName: 'Февраль'},
        {linkName: 'Март'},
        {linkName: 'Апрель'},
        {linkName: 'Май'},
        {linkName: 'Июнь'},
        {linkName: 'Июль'},
        {linkName: 'Август'},
        {linkName: 'Сентябрь'},
        {linkName: 'Октябрь'},
        {linkName: 'Ноябрь'},
        {linkName: 'Декабрь'},
        {linkName: 'N/A'}
      ],
      padding: '0 0 32px 0',
      paddingTop: 51,
      blockClass: ".room-container",
    }
  },
  methods: {
    route(x){
      this.$router.push(x)
    },
  },
  computed: {
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

<style lang="sass">
.mess-room
  min-height: 400px
  &__links
    padding: 50px 0 0 21px
    position: relative
  &__page
    padding: 42px 92px 48px 0
  &__container
    & p
      margin: 0
      font-weight: 300
      font-size: 14px
      line-height: 16.41px
      color: black
</style>
