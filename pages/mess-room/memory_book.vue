<template>
  <div class="mess-room__memory">
    <h1 class="page-title page-title_memory">Книга памяти</h1>
    <div class="room-container memory-container" v-for="(elem, key) in list"
          :key="key">
    <div class="memory-container__image">
      <v-img position="top center" class="memory-container__avatar" :src="elem.src"></v-img>
      <div class="text-contact text-contact_data">{{elem.date}}</div>
    </div>
      <div class="memory-container__detail">
        <div class="memory-container__name">
          <h3 class="text-contact_name" v-html="elem.name"></h3>
          <div class="text-contact text-contact_prof">{{elem.prof}}</div>
        </div>
        <div class="text-contact text-contact_news" v-html="elem.news"></div>
        <div class="memory-container__necrology" v-if="elem.necrologySrc">
          <a class="text-contact text-contact_necrology" href="/">Некролог</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "memory_book",
  data(){
    return {
      keys: 0,
    }
  },
  computed: {
    list() {
      return this.$store.state.memory_book.list
    }
  },
  mounted() {
    this.$store.dispatch('data/setShowList', false)
    this.$store.dispatch('data/setSubListKey', 2)
    this.$store.dispatch('data/setPageId', 'memory_book')
  }
}
</script>

<style lang="sass" scoped>
.page-title_memory
  margin-top: -14px
  font:
    weight: 400
    size: 24px
  line-height: 28px
.mess-room__container_birthday
  display: flex
  flex-wrap: wrap
  flex-direction: column
.memory-container
  padding-top: 39px
  display: flex
  & img
    width: 240px
    height: 120px
  &__title
    width: 150px
    display: flex
    justify-content: center
    align-items: center
  & span
    color: #6A6A6A
    font:
      size: 12px
      weight: 300
    line-height: 14px
  &__list
    padding: 0
    &-item
      padding: 11px 0
  &__image
    width: 150px
    display: flex
    flex-direction: column
    align-items: center
  &__avatar
    height: 150px
    width: 150px
    border-radius: 75px
    background-color: black
  &__detail
    margin-left: 30.21px
  &__name
    width: 100%
    height: 150px
    display: flex
    flex-direction: column
    align-items: start
    justify-content: center
  &__necrology
    display: flex
    justify-content: flex-end
.text-contact
  font-weight: 400
  font-size: 14px
  line-height: 21px
  color: black
  &_name
    font-weight: 500
    font-size: 24px
    line-height: 30px
    color: black
  &_prof
    font-weight: 300
    font-size: 12px
    line-height: 14px
    margin: 6px 0
  &_news
    margin-top: -20px
    font-weight: 300
    font-size: 14px
    line-height: 21px
    width: 600px
    text-align: justify
  &_necrology
    font:
      size: 14px
      weight: 400
    color: #6a6a6a
    text-decoration: none
    text-align: right
  & span
    font-weight: bold
  &_data
    height: 21px
    margin-top: 25px
</style>
