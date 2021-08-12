<template>
  <v-app>
    <div style="max-width: 1052px; margin-right: auto; margin-left: auto">
      <v-system-bar style="height: 204px; align-items: stretch; flex-direction: column; padding: 0">
        <v-row class="header">
          <v-col cols="7" class="header__left" @click="route('/')">
            <img class="emblem" src="/emblem.svg" alt="emblem">
            <div class="header__title">
              <h3 class="text text_yellow">Международная общественная организация</h3>
              <div class="title-main">
                <h1 class="text text_big">Общество ветеранов 11 дивизии подводных лодок Краснознаменного Северного Флота</h1>
              </div>
            </div>
          </v-col>
          <v-col cols="2" style="padding: 0"></v-col>
          <v-col cols="3" class="header__right">
            <div class="header__data">
              <h3 class="text text_yellow">Нашему обществу</h3>
              <ul class="list data-list">
                <li
                  v-for="(item, index) in data"
                  class="list__item data-list__item"
                  :key="index">
                    <h1 class="text text_big text_big_fat">{{item.count}}&nbsp</h1>
                    <h3 class="text">{{item.name}}</h3>
                </li>
              </ul>
            </div>
            <div class="header__button">
            <v-dialog
              v-model="dialogAuth" width="500">
              <template v-slot:activator="{ on, attrs }">
                  <v-btn v-show="hide" outlined small color="#FFCC00" v-bind="attrs"
                         v-on="on" @click="errorMessage=''">Авторизация</v-btn>
              </template>
              <v-card>
                <div style="background-color: black; width: 500px; height: 500px; padding: 20px; display: flex; flex-direction: column; align-items: center">
                  <h1 style="font-weight: 400">Авторизация</h1>
                  <v-form class="auth-form" style="margin-top: 50px">
                    <v-row justify="center" no-gutters>
                      <v-col cols="12" style="margin-bottom: 30px; padding: 0">
                        <v-text-field
                          ref="login"
                          v-model="username"
                          dense
                          outlined
                          dark
                          style="width: 100%"
                          :disabled="input"
                          placeholder="Логин"
                          autocomplete
                          validate-on-blur
                          color="#FFCC00"
                        />
                      </v-col>
                      <v-col cols="12" style="margin-bottom: 20px; padding: 0">
                        <v-text-field
                          ref="password"
                          v-model="password"
                          dense
                          dark
                          outlined
                          hide-details
                          style="width: 100%"
                          :disabled="input"
                          placeholder="Пароль"
                          type="password"
                          autocomplete
                          color="#FFCC00"
                          validate-on-blur
                        />
                      </v-col>
                      <v-col cols="6" style="margin: 0; padding: 0; height: 45px">
                        <v-alert
                          v-if="errorMessage"
                          style="margin: 0"
                          dense
                          text
                          type="error"
                        >
                          {{ errorMessage }}</v-alert
                        >
                      </v-col>
                      <v-col cols="12" style="margin: 0; padding: 0; display: flex; justify-content: center">
                        <v-btn
                          outlined
                          normal
                          text
                          color="#FFCC00"
                          :loading="wait"
                          :disabled="send_button"
                          @click="login"
                        >
                          Войти
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                  <div style="margin-top: 70px">Для регистрации и создания учетной записи необходимо написать администратору сайта с помощью формы обратной связи по
                  <a style="color: #FFCC00" @click="clickLinkInAuth('/contacts')">ссылке</a></div>
                </div>
              </v-card>
            </v-dialog>
            </div>
          </v-col>
        </v-row>
        <v-row class="bar header-list">
          <v-col style="padding: 0" cols="12">
            <ul class="list link-list">
              <li
                v-for="(item, index) in links"
                class="list__item link-list__item"
                :key="index">
                <a class="text text_link" @click="route(item.url)">{{item.name}}</a>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-system-bar>
      <section class="main">
        <v-slide-x-transition>
          <Nuxt style="margin: 0; padding: 0" />
        </v-slide-x-transition>
      </section>
      <v-footer color="black" style="display: flex; flex-direction: column; padding: 0">
        <v-row class="bar footer__list">
          <v-col cols="12" style="padding: 0">
            <ul class="list link-list">
              <li
                v-for="(item, index) in links"
                class="list__item link-list__item_footer"
                :key="index">
                  <a class="text text_link" @click="route(item.url)">{{item.name}}</a>
                  <ul class="list sub-list">
                    <li
                      v-for="(elem, i) in item.subLinks"
                      :key="i"
                      class="list__item sub-list__item"
                    >
                      <a class="text text_link text_link_sub" @click="routeSub(i, elem.url)">{{elem.name}}</a>
                    </li>
                  </ul>
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row class="footer__logo" @click="route('/')">
          <v-col style="display: flex; align-items: flex-end; padding: 0" cols="6">
            <img class="emblem-footer" src="/emblem.svg" alt="">
            <div class="footer__support">
              <h1 class="text-support">ПРИ ПОДДЕРЖКЕ:</h1>
            </div>
            <img class="logo" src="/logo.svg" alt="">
          </v-col>
        </v-row>
      </v-footer>
    </div>
  </v-app>
</template>
<script>
import moment from 'moment'
export default {
  name:'default',
  // components: login
  data() {
    return {
      headerHeight: 204,
      footerHeight: 258,
      keys: 0,
      dialogAuth: false,
      username: '',
      password: '',
      error: '',
      wait: false,
      input: false,
      send_button: true,
      errorMessage: '',
      data: [
        {name: 'лет', count: 6},
        {name: 'месяцев', count: 4},
        {name: 'дней', count: 2}
      ],
      links: [
        {name: 'Общество ветеранов',url: '/veterans/society'},
        {name: 'История соединения',url: '/history'},
        {name: 'История в лицах',url: '/persons'},
        {name: 'Фото и видеоматериалы',url: '/gallery/photo',
          subLinks: [
            {name: 'Фотографии сообщества',url: '/gallery/photo'},
            {name: 'Видео',url: '/gallery/video'}
         ],},
        {name: 'Сувениры',url: '/souvenir'},
        {name: 'Кают-компания',url: '/mess-room/forum',
          subLinks: [
            {name: 'Форум', url: '/mess-room/forum'},
            {name: 'Дни рождения', url: '/mess-room/birthday'},
            {name: 'Книга памяти', url: '/mess-room/memory_book'},
          ],},
        {name: 'Контакты', url: '/contacts'},
      ],
    }
  },
  methods: {
    scrollBlock() {
      window.scrollTo(pageXOffset, 400);
    },
    route(x){
      window.scrollTo(pageXOffset, 0);
      this.$store.dispatch('data/setSubListKey', 0)
      this.$router.push(x)
    },
    routeSub(index, x){
      window.scrollTo(pageXOffset, 0);
      this.$store.dispatch('data/setSubListKey', index)
      this.$store.dispatch('data/setListKey', index)
      this.$router.push(x)
      this.keys = index
    },
    clickLinkInAuth(item) {
      this.dialogAuth = false
      this.$router.push(item)
      setTimeout(()=>{
        window.scrollTo(0, 1000);
      }, 100)


      // this.$router.push(item)

    },
    async login() {
      this.input = true
      this.wait = true
      this.errorMessage = ''
      // try {
      //   await this.$router.push('/')
      // } catch (error) {
      //   this.error = error.response.data.detail
      this.errorMessage = 'Не удается войти'
      // }
      this.wait = false
      this.input = false
      this.password = ''
    },
    monthName() {
      if (this.data[1].count >= 2 && this.data[1].count <= 4) {
        this.data[1].name = 'месяца'
      }
      else if (this.data[1].count === 1) {
        this.data[1].name = 'месяц'
      }
      else this.data[1].name = 'месяцев'
    },
    dayName() {
      if (this.data[2].count >= 2 && this.data[2].count <= 4 || this.data[2].count >= 22 && this.data[2].count <= 24) {
        this.data[2].name = 'дня'
      }
      else if (this.data[2].count === 1 || this.data[2].count === 21 || this.data[2].count === 31) {
        this.data[2].name = 'день'
      }
      else this.data[2].name = 'дней'
    },
    yearName() {
      if (this.data[0].count % 10 === 1 && this.data[0].count % 100 !== 11){
        this.data[0].name = 'год'
      }
      else if (this.data[0].count % 10 >= 2 && this.data[0].count % 10 <= 4 && this.data[0].count % 100 !== 12 && this.data[0].count % 100 !== 13 && this.data[0].count % 100 !== 14){
        this.data[0].name = 'года'
      }
      else this.data[0].name = 'лет'
    },
    getData() {
      let a = moment();
      let b = moment([2013, 5, 18]);
      this.data[0].count = a.diff(b, 'year');
      b.add(this.data[0].count, 'years');
      this.data[1].count = a.diff(b, 'months');
      b.add(this.data[1].count, 'months');
      this.data[2].count = a.diff(b, 'days');
    }
  },
  computed: {
    inputValue() {
      return this.password + this.username
    },
    hide() {
      return this.$store.state.data.hide
    }
  },
  watch: {
    data(){
      this.getData()
      this.monthName()
      this.dayName()
      this.yearName()
    },
    inputValue() {
      if (this.username && this.password) {
        this.send_button = false
      } else this.send_button = true
    },
  },
  beforeUpdate() {
    const header = document.querySelector('.v-system-bar')
    const footer = document.querySelector('.v-footer')
    this.$store.dispatch('data/setHeaderHeight', header.clientHeight)
    this.$store.dispatch('data/setFooterHeight', footer.clientHeight)
  },
  created() {
    this.$store.dispatch('data/setPageId', 'default')
  },
  mounted() {
    this.getData()
    this.monthName()
    this.dayName()
    this.yearName()
    const header = document.querySelector('.v-system-bar')
    const footer = document.querySelector('.v-footer')
    this.$store.dispatch('data/setHeaderHeight', header.clientHeight)
    this.$store.dispatch('data/setFooterHeight', footer.clientHeight)
  }
}
</script>

<style lang="sass" scoped>
*
  margin: 0
  padding: 0
.header
  display: flex
  height: 168px
  margin: 0
  &__left
    display: flex
    margin-top: 24px
    position: relative
    cursor: pointer
    padding: 0
  &__title
    margin-top: 31px
    margin-left: 42px
    display: flex
    justify-content: start
    flex-direction: column
  &__right
    position: relative
    margin-top: 55px
    display: flex
    flex-direction: column
    align-items: flex-end
    padding: 0
  &__data
    width: 219px
    height: 41px
  &-list
    height: 36px
    margin: 0
    padding: 0
  &__button
    padding-top: 15px
    width: 219px
    display: flex
    justify-content: flex-start
.emblem
  height: 108px
  width: 75px
  &-footer
    height: 70px
    width: 49px
    margin-bottom: 42px
.title-main
  width: 601px
  display: flex
.list
  display: flex
  justify-content: space-between
  padding: 0
  &__item
    display: flex
    flex: none
    min-height: 0
.text
  font-weight: 400
  font-size: 14px
  color: #FFFFFF
  &_yellow
    color: #FFCC00
  &_big
    font-size: 20px
    line-height: 23px
    &_fat
      font-weight: 500
  &_link
    font-size: 16px
    line-height: 19px
    text-decoration: none
    -webkit-transition: color 0.2s ease-out
    -moz-transition: color 0.2s ease-out
    -o-transition: color 0.2s ease-out
    transition: color 0.2s ease-out
    &:hover
      color: #FFCC00
    &_sub
      font-size: 14px
      color: #C4C4C4
.bar
  width: 100%
  margin-top: 0
.list
  display: flex
  justify-content: space-between
  padding: 0
  &__item
    display: flex
    flex: none
    min-height: 0
.link-list__item_footer
  display: flex
  flex-direction: column
.data-list
  padding-left: 4px
  &__item
    align-items: baseline
.main
  background: #ffffff
  width: 1052px
.footer__list
  margin-top: 18px
.items
  min-height: 0
.sub-list
  display: flex
  flex-direction: column
  list-style-type: none
  &__item
    margin-top: 13px
.footer__logo
  display: flex
  width: 100%
  cursor: pointer
  -ms-user-select: none
  -moz-user-select: none
  -webkit-user-select: none
  user-select: none
.footer__support
  width: 92px
  height: 32px
  margin-bottom: 53px
  margin-left: 43px
.text-support
  font-size: 14px
  font-weight: 500
  color: #6A6A6A
  line-height: 16px
  text-transform: uppercase
.logo
  margin-bottom: 51px
  margin-left: 25px
  width: 243px
  height: 39px
.v-application
  background: black
</style>

