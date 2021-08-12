<template>
  <v-row class="persons">
    <v-col cols="2" class="persons__links links">
      <list-scroll :list="list" :padding="padding" :blockClass="blockClass"></list-scroll>
    </v-col>
    <v-col cols="10" v-bind:style="{paddingTop: paddingTop + 'px'}" class="persons__page wow">
      <div v-for="(item, index) in list" :key="index" class="persons__container">
        <h1 class="page-title" v-html="item.name"></h1>
        <div class="persons-block">
          <div class="persons-block__left">
            <v-img style="height: 359px; width: 270px" :src="item.src" alt=""></v-img>
            <h3 v-html="item.profession"></h3>
            <v-list v-if="item.rewards" light class="persons-rewards__list">
              <h2>Награды и звания</h2>
              <v-list-item class="persons-rewards__list-item"
              v-for="(elem, i) in item.rewards" :key="i">
                <p><span>{{elem.year}}</span> {{elem.name}}</p>
              </v-list-item>
            </v-list>
          </div>
          <div class="persons-block__right">
            <div class="block-container" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import ListScroll from "@/components/listScroll";

export default {
  name: "persons",
  components: {ListScroll},
  data(){
    return {
      padding: '0 0 30px 0',
      paddingTop: 33,
      blockClass: ".persons__container"
    }
  },
  computed: {
    list() {
      return this.$store.state.persons.list
    },
  },
  mounted() {
    this.$store.dispatch('data/setPaddingTop', this.paddingTop)
  }
}
</script>

<style lang="scss">
</style>
<style lang="sass">
.block-container
  margin: 0
  font-family: 'TT Norms Light'
  font-weight: 300
  font-size: 14px
  line-height: 21px
  color: black
.persons
  &__links
    padding: 50px 5px 0 20px
  &__page
    padding: 42px 62px 48px 5px
    animation: slideInLeft
  &__container
    padding-bottom: 40px
    animation-duration: 1s
  &-block
    margin-top: 42px
    display: flex
    justify-content: space-between
    & p
      margin: 0
      font-family: 'TT Norms Light'
      font-weight: 300
      font-size: 14px
      line-height: 21px
      color: black
    & h2
      font-weight: 500
      font-size: 20px
      line-height: 23.44px
      color: #FF0000
      margin-bottom: 24px
    & h3
      margin-top: 26px
      font-weight: 500
      font-size: 14px
      line-height: 16.41px
      color: #000000
    &__left
      width: 270px
    &__right
      width: 510px
      text-align: justify
  &-rewards__list
    padding: 24px 0 14px 0
    margin: 0
    &-item
      padding: 0 0 15px 0
      min-height: 0
      & span
        font-family: 'Roboto', sans-serif
        font-weight: 500
        font-size: 14px
        line-height: 16.41px
        color: #FF0000
      & p
        font-family: 'Roboto', sans-serif
</style>
