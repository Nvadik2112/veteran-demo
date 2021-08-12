<template>
  <v-row class="main-page">
    <v-col cols='9' class="main-page__left">
<!--        <div @click="route('/warning')" class="main-page__pic">-->
          <div class="main-page__pic">
          <v-carousel
            cycle
            height="358"
            width="721"
            hide-delimiters
            show-arrows-on-hover
          >
            <v-carousel-item
              @click="route('/gallery/photo')"
              v-for="(slide, i) in slider"
              :key="i"
              :src="slide.src"
            >
              <div style="position: absolute; height: 100px; background-color: rgba(0,0,0, 0.5); width: 100%; bottom: 0">
                <div class="main-page__title">
                  <h1 class="text-title">{{ slide.title }}</h1>
                </div>
              </div>
            </v-carousel-item>
              <div class="main-page__subtitle">
                <h3 class="text-title__sub">{{ imgSubTitle }}
                </h3>
            </div>
          </v-carousel>
        </div>
      <div class="articles">
        <h1 class="articles__title">Статьи общества</h1>
        <v-list light class="articles__list">
          <v-list-item class="articles__list-item"
                       v-for="(item, index) in articleList"
                       :key="index"
                       @click="route('/mess-room/forum_item/' + item.id)">
            <div class="articles__pic">
              <v-img min-width="178" height="120" v-if="item.src" class="articles__img" :src="item.src"></v-img>
            </div>
            <div class="articles__container">
              <v-list-item-title class="text text_title-articles" v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle class="text text_subtitle-articles" v-text="item.content.split('').splice(0, 300).join('')"></v-list-item-subtitle>
            <div class="articles__date">
              <v-list-item-action-text class="text text_data-articles" v-if="item.data" v-text="new Date(item.data).toLocaleDateString('ru-RU',{day: 'numeric', month: 'long', year: 'numeric'})"></v-list-item-action-text>
            </div>
            </div>
          </v-list-item>
        </v-list>
    <a class="archive-link" @click="route('/mess-room/forum')">Посмотреть все статьи в форуме</a>
      </div>
    </v-col>
    <v-col cols='3' class="main-page__right">
<!--      <button class="auth-button" @click="route('/warning')">-->
<!--        <p>Авторизация</p>-->
<!--      </button>-->
      <div class="news__title">
        <h1 style="font-weight: 400; line-height: 20px; color: black; ">Новости</h1>
      </div>
      <v-list light class="news__list">

        <v-list-item class="news__list-item"
                     target="_blank"
                     v-for="(item, index) in newsList"
                     :key="index"
                     :href=item.url>
          <v-list-item-title class="text text_title-news" v-text="item.title"></v-list-item-title>
          <v-list-item-action-text class="text text_data-news" v-text="new Date(item.data).toLocaleDateString('ru-RU',{day: 'numeric', month: 'long', year: 'numeric'})"></v-list-item-action-text>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      imgTitle: 'название описание фото',
      imgSubTitle: 'фотоархив общества',
      prev: 0,
      key: 0,
      sliderIndex: null,
    }
  },
  methods: {
    route(x, item){
      window.scrollTo(pageXOffset, 0);
      this.$router.push(x)
    },
  },
  computed: {
    newsList() {
      let arr = []
      let news = []
      news = [...this.$store.state.news.news]
      arr = news.sort((a, b)=> {
        return new Date(b.data) - new Date(a.data)
      })
      return arr
    },
    articleList() {
      let arr = []
      arr = [...this.$store.state.articles.articles]
      // arr = news.sort((a, b)=> {
      //   return new Date(b.data) - new Date(a.data)
      // })
      return arr.reverse().splice(0, 5)
    },
    slider() {
      return this.$store.state.main_slider.slider
    }
  },
}
</script>
<style>
.v-list-item__title {
  align-self: start!important;
}
.v-carousel__controls {
  height: 100px!important;
}
.v-carousel__controls > .v-item-group {
  display: none!important
}
.v-image__image--contain {
  background-size: contain!important;
}
</style>
<style lang="sass" scoped>
.main-page
  padding: 0
  margin: 0
  position: relative
  &__left
    padding: 33px 0 0 59px
  &__pic
    position: relative
    cursor: pointer
  &__img
    position: absolute
    z-index: 0
    height: inherit
    width: inherit
  &__title
    z-index: 2
    width: 700px
    position: absolute
    height: 56px
    margin: 16px 0 0 21px
    bottom: 28px
  &__subtitle
    position: absolute
    margin-left: 21px
    bottom: 8px
  &__right
    padding: 33px 0 0 0
    display: flex
    flex-direction: column
    align-items: flex-end
  .text-title
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden
    position: inherit
    font-weight: 300
    font-size: 24px
    line-height: 28.13px
    color: white
    z-index: 3
  .text-title__sub
    font-size: 14px
    font-weight: 400
    line-height: 16.41px
    text-transform: uppercase
    color: rgba(255,255,255,0.5)
  .articles
    padding-bottom: 29px
    &__title
      font-weight: 400
      font-size: 36px
      line-height: 42.19px
      color: black
      margin-top: 45px
    &__list
      background: white
      margin-top: 10px
      padding: 0
      &-item
        padding: 16px 0
        align-items: flex-start
    &__pic
      width: 178px
      height: 120px
    &__img
      height: 120px
      border: solid #d7d7d7 1px
    &__container
      margin-left: 30px
      height: 120px
      width: 522px
      display: flex
      flex-direction: column
      justify-content: space-between
    &__subtitle
      display: flex
      height: 20px
    &__date
      height: 15px
  .text
    &_title-articles
      font-size: 16px
      white-space: pre-wrap
      cursor: pointer
      flex: none
    &_subtitle-articles
      font-weight: 300
      color: black
      white-space: pre-wrap
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
      overflow-y: hidden
      height: 32px
      flex: none
    &_data-articles
      font-weight: 300
      font-size: 12px
      color: #6A6A6A
      white-space: pre-wrap
    &_title-news
      color: #000000
      line-height: 16.41px
      font-size: 14px
      margin: 0 0 7px 0
      cursor: pointer
      white-space: pre-wrap
    &_data-news
      color: #6A6A6A
      font-size: 12px
.news
  &__title
    display: flex
    justify-content: flex-start
    width: 245px
  &__list
    padding-top: 0
    height: 1255px
    overflow-y: scroll
    scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0)
    scrollbar-width: thin
    &::-webkit-scrollbar
      width: 6px
    &::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)
      border-radius: 2px
    &::-webkit-scrollbar-thumb
      border-radius: 10px
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8)
.news__list-item
  display: flex
  flex-direction: column
  align-items: flex-start
  width: 240px
  padding: 23px 0 0 2px
  min-height: 0
.auth-button
  margin-right: 19px
  display: flex
  justify-content: center
  align-items: center
  border: 1px solid #ffcc00
  width: 222px
  height: 70px
  -webkit-transition: background-color 0.2s ease-out
  -moz-transition: all 0.2s ease-out
  -o-transition: background-color 0.2s ease-out
  transition: background-color 0.2s ease-out
  & p
    color: #6A6A6A
    margin: 0
    size: 14px
  &:hover
    background-color: #FFCC00
.archive-link
  font-size: 16px
  line-height: 19px
  text-transform: uppercase
  color: black
  text-decoration: underline
</style>
