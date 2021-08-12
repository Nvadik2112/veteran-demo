<template>
  <div class="mess-room__forum-item">
    <div class="forum-item-container">
      <h1 class="forum-item-container__title">{{articles[this.getKey].title}}</h1>
      <img class="forum-item-container__img" v-if="articles[this.getKey].src" :src=articles[this.getKey].src alt="">
      <div class="forum-item-container__data" v-if="articles[this.getKey].data">{{new Date(articles[this.getKey].data).toLocaleDateString('ru-RU',{day: 'numeric', month: 'long', year: 'numeric'})}}</div>
      <div class="forum-item-container__introduction" v-html="articles[this.getKey].introduction"></div>
      <div class="forum-item-container__main" v-html="articles[this.getKey].content"></div>
    </div>
    <div v-show="hide" class="article-comments">
      <div class="article-comments__counter">
        <h6><span>{{count}}</span>  комментариев</h6>
      </div>
      <v-form class="article-comments__form">
        <div class="article-comments__avatar"></div>
        <div class="article-comments__send-area">
          <v-textarea
            style="width: 630px; margin-top: 0; padding: 0"
            v-model="comment"
            light
            placeholder="Оставить комментарий"
            auto-grow
            color=black
            rows="1"
            row-height="14"
          ></v-textarea>
          <div class="article-comments__form-buttons">
            <button class="cancel-button" @click.prevent="cleanComment">
              <p>Отмена</p>
            </button>
            <button v-bind:disabled=disable class="send-button">
              <p>Оставить комментарий</p>
            </button>
          </div>
        </div>
      </v-form>
      <div class="article-comments__message" v-for="(item, index) in list" :key="index">
        <div class="article-comments__title">
          <div class="article-comments__avatar"></div>
          <div class="article-comments__name" v-html="item.name"></div>
        </div>
        <div class="article-comments__content" v-html="item.content">
        </div>
        <div class="article-comments__content-buttons">
          <button @click="show(item, index)">
            <p>{{item.text}} ответы<span> 5</span></p>
          </button>
          <button>
            <p>Ответить</p>
          </button>
        </div>
        <v-expand-transition>
          <div class="article-comments__message article-comments__message_answer" v-show="(item.showAnswers)" v-for="(elem, key) in item.answer" :key="key">
            <div class="article-comments__title">
              <div class="article-comments__avatar"></div>
              <div class="article-comments__name" v-html="elem.name"></div>
            </div>
            <div class="article-comments__content" v-html="elem.content"></div>
            <div class="article-comments__content-buttons article-comments__content-buttons_answer">
              <button>
                <p>Ответить</p>
              </button>
            </div>
          </div>
        </v-expand-transition>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "forum_item",
  data(){
    return {
      id: this.$route.params.id,
      keys: 0,
      title: 'Фашистский флот потопил 53 и захватил 348 судов',
      introduction: '75 лет назад, весной 1937 года, из-за нападений на советские и зафрахтованные СССР суда, перевозившие оружие воюющим испанским республиканцам, были значительно сокращены объемы советских поставок в Испанию. Как выяснил обозреватель "Власти" Евгений Жирнов, топливо для ВМС фашистской Италии, без которого эти атаки были бы невозможны, поставлялось из СССР.',
      main: 'То, что политикам следует ставить перед собой реальные цели и использовать для их достижения только имеющиеся в наличии средства, было известно с давних времен. Задолго до того, как создатель Германской империи и ее многолетний канцлер Отто фон Бисмарк изрек, что политика есть искусство возможного. И задолго до того, как к власти в России пришли большевики, считавшие, что можно начать строить отношения с окружающим миром с чистого листа и к тому же руководствуясь идеей о мировой революции.',
      data: '08 Февраля 2021',
      url: '/main_image.svg',
      padding: '0 0 32px 0',
      count: 585,
      comment: '',
      disable: true,
      list: [
        {showAnswers: false, text: 'Показать', name: 'Фарков<br>Сергей Алексеевич', content: 'То, что политикам следует ставить перед собой реальные цели и использовать для их достижения только имеющиеся в наличии средства, было известно с давних времен. Задолго до того, как создатель Германской империи и ее многолетний канцлер Отто фон Бисмарк изрек, что политика есть искусство возможного. И задолго до того, как к власти в России пришли большевики, считавшие, что можно начать строить отношения с окружающим миром с чистого листа и к тому же руководствуясь идеей о мировой революции. \n',
          answer: [
            {name: 'Фарков<br>Сергей Алексеевич', content: 'То, что политикам следует ставить перед собой реальные цели и использовать для их достижения только имеющиеся в наличии средства, было известно с давних времен. Задолго до того, как создатель Германской империи и ее многолетний канцлер Отто фон Бисмарк изрек, что политика есть искусство возможного. И задолго до того, как к власти в России пришли большевики, считавшие, что можно начать строить отношения с окружающим миром с чистого листа и к тому же руководствуясь идеей о мировой революции. \n'}
          ]},
        {showAnswers: true, text: 'Скрыть', name: 'Фарков<br>Сергей Алексеевич', content: 'То, что политикам следует ставить перед собой реальные цели и использовать для их достижения только имеющиеся в наличии средства, было известно с давних времен. Задолго до того, как создатель Германской империи и ее многолетний канцлер Отто фон Бисмарк изрек, что политика есть искусство возможного. И задолго до того, как к власти в России пришли большевики, считавшие, что можно начать строить отношения с окружающим миром с чистого листа и к тому же руководствуясь идеей о мировой революции. \n',
          answer: [
            { name: 'Фарков<br>Сергей Алексеевич', content: 'То, что политикам следует ставить перед собой реальные цели и использовать для их достижения только имеющиеся в наличии средства, было известно с давних времен. Задолго до того, как создатель Германской империи и ее многолетний канцлер Отто фон Бисмарк изрек, что политика есть искусство возможного. И задолго до того, как к власти в России пришли большевики, считавшие, что можно начать строить отношения с окружающим миром с чистого листа и к тому же руководствуясь идеей о мировой революции. \n'}
          ]},
      ],
    }
  },
  watch: {
    comment(){
      this.comment? this.disable = false : this.disable = true
    }
  },
  methods: {
    show(item, index) {
      if (item.showAnswers) {
        item.showAnswers = false
        item.text = 'Показать'
      } else {
        item.showAnswers = true
        item.text = 'Скрыть'
      }
    },
    cleanComment() {
      this.comment = ''
    }
  },
  computed: {
    articles() {
      let arr = []
      return arr = [...this.$store.state.articles.articles]
    },
    getKey() {
      let arr = []
      this.articles.forEach((elem)=> {
        arr.push(elem.id)
      })
      return arr.indexOf(Number(this.id))
    },
    hide() {
      return this.$store.state.data.hide
    }
  },
  mounted() {
    this.$store.dispatch('data/setShowList', false)
    this.$store.dispatch('data/setPageId', 'forum_item')
  }
}

</script>
<style lang="sass">
.v-application--is-ltr .v-messages
  display: none!important
.v-text-field__details
  display: none!important
//.v-textarea textarea
//  min-height: 21px!important
</style>

<style lang="sass" scoped>
.mess-room__forum-item
  margin-right: -22px
  display: flex
  flex-direction: column
  align-items: flex-end
.forum-item-container
  width: 800px
  display: flex
  flex-wrap: wrap
  margin-top: 3px
  &__img
    margin-top: 40px
    width: 690px
    height: 345px
  &__title
    font:
      size: 24px
      weight: 400
    line-height: 28px
    color: #000000
  &__introduction
    font:
      size: 16px
      weight: 400
    color: black
    line-height: 21px
    margin: 21px 0
    white-space: pre-wrap
  &__main
    font:
      size: 14px
      weight: 300
    color: black
    line-height: 21px
    white-space: pre-wrap
    padding-top: 20px
  &__data
    padding-top: 20px
    display: flex
    align-self: flex-end
    font-weight: 300
    font-size: 12px
    width: 100%
    color: #6A6A6A
.article-comments
  padding-top: 50px
  width: 720px
  &__counter
    text-align: left
    & h6
      font:
        size: 12px
        weight: 300
      line-height: 21px
      color: black
      & span
        font:
          size: 14px
          weight: 400
  &__form
    display: flex
    justify-content: space-between
    padding: 12px 0
    align-items: center
  &__avatar
    width: 59px
    height: 59px
    border-radius: 30px
    background-color: #C4C4C4
  &__send-area
    display: flex
    flex-direction: column
    align-items: flex-end
  &__form-buttons
    display: flex
    flex-direction: row
    margin-top: 5px
  &__message
    display: flex
    flex-direction: column
    align-items: flex-start
    font:
      weight: 400
      size: 14px
    line-height: 21px
    color: black
    &_answer
      margin-left: 88px
  &__title
    display: flex
    flex-direction: row
    align-items: center
  &__name
    padding-left: 8px
  &__content
    padding: 8px 0 0 84px
    text-align: justify
  &__content-buttons
    padding-top: 12px
    display: flex
    justify-content: space-between
    width: 100%
    &_answer
      justify-content: flex-end
    & button
      font:
        weight: 400
        size: 12px
      line-height: 21px
      color: #6a6a6a
      & span
        color: #FFCC00
.cancel-button
  display: flex
  justify-content: center
  align-items: center
  background-color: white
  color: #6A6A6A
  cursor: pointer
  margin-right: 51px
  & p
    margin: 0
    font-weight: 300
    font-size: 14px
    line-height: 21px
    -webkit-transition: color 0.2s ease-out
    -moz-transition: color 0.2s ease-out
    -o-transition: color 0.2s ease-out
    transition: color 0.2s ease-out
  &:hover
    color: black
.send-button
  width: 162px
  height: 22px
  display: flex
  justify-content: center
  align-items: center
  background-color: #C4C4C4
  cursor: pointer
  -webkit-transition: color 0.2s ease-out
  -moz-transition: color 0.2s ease-out
  -o-transition: color 0.2s ease-out
  transition: color 0.2s ease-out
  & p
    margin: 0
    font-weight: 300
    font-size: 14px
    line-height: 21px
    -webkit-transition: color 0.2s ease-out
    -moz-transition: color 0.2s ease-out
    -o-transition: color 0.2s ease-out
    transition: color 0.2s ease-out
    color: black
  &:disabled
    p
      color: inherit
</style>
