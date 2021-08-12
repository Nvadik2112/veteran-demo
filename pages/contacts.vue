<template>
  <v-row class="contacts">
    <v-col cols="1"></v-col>
    <v-col class="contacts-container" cols="10">
      <h1 class="text-contact text-contact_title">Контакты</h1>
      <div class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4000.2582793995975!2d30.307886491228547!3d59.91340409222346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.
        1!3m3!1m2!1s0x469630f7ddfdf607%3A0xfa4e8966550b88d9!2zNi3RjyDQmtGA0LDRgdC90L7QsNGA0LzQtdC50YHQutCw0Y8g0YPQuy4sIDI0LCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywgMTkwMDA1!5e0!3m2!1
        sru!2sru!4v1613460650455!5m2!1sru!2sru" width="868" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
      </div>
      <h3 class="text-contact text-contact_address"><span>Адрес:</span> Россия, 190005, Санкт-Петербург, 6-я Красноармейская ул., д.24, 3 этаж</h3>
      <v-list light class="contacts-container__list">
        <v-list-item class="contacts-container__list-item"
                     v-for="(item, index) in list"
                     :key=index>
          <v-img position="top center" :src="item.src" class="contacts-container__avatar"></v-img>
          <div class="contacts-container__detail">
            <div class="contacts-container__name">
              <h3 class="text-contact_name" v-html="item.name"></h3>
            </div>
            <div class="text-contact text-contact_prof">{{item.profession}}</div>
            <div class="contacts-container__contacts">
              <div class="text-contact text-contact_phone" v-if="item.phone"><i>Тел.: </i>{{item.phone}}</div>
              <div class="text-contact text-contact_mail" v-if="item.mail"><i>Почта: </i> {{item.mail}}</div>
              <!--              :href="'mailto:' + item.mail" :href="'tel:' + item.phone"-->
            </div>
          </div>
        </v-list-item>
      </v-list>
      <div class="form" v-show="hide">
        <p class="form-title">Форма быстрого сообщения</p>
        <v-form>
          <v-row style="margin: 0; align-items: center">
            <v-col cols="5" style="padding: 0; height: 120px; display: flex; flex-direction: column; justify-content: space-between">
              <v-text-field
                class="form-input"
                v-model="username"
                light
                dense
                outlined
                placeholder="Ваше имя*"
                height="24"
                color=black
              />
              <v-text-field
                class="form-input"
                v-model="email"
                dense
                outlined
                light
                placeholder="Ваш e-mail*"
                height="24"
                color=black
              />
              <v-text-field
                class="form-input"
                v-model="theme"
                dense
                light
                outlined
                placeholder="Тема*"
                height="24"
                color=black
              />
            </v-col>
            <v-col cols="7" style="padding: 0; display: flex; height: 116px">
              <v-textarea
                class="form-textarea"
                v-model="message"
                light
                placeholder="Текст сообщения"
                no-resize
                outlined
                color=black
                rows="4"
                row-height="25"
              ></v-textarea>
            </v-col>
          </v-row>
          <div class="form-send">
            <button v-bind:disabled=disable class="send-button">
              <p>Отправить</p>
            </button>
          </div>
        </v-form>
      </div>
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      theme: '',
      message: '',
      disable: true
    }
  },
  computed: {
    validateInput() {
      return this.username + this.email + this.theme + this.message
    },
    list() {
      return this.$store.state.contacts.list
    },
    hide() {
      return this.$store.state.data.hide
    }
  },
  watch:{
    validateInput(){
      if( this.username && this.email && this.theme && this.message) {
        this.disable = false
      }
      else this.disable = true
    },
  }
}
</script>

<style lang="sass" scoped>
.contacts
  padding-top: 32px!important
  padding-bottom: 148px!important
  &-container
    display: flex
    flex-direction: column
    padding: 0
    &__list
      padding: 0
      margin-top: 34px
      &-item
        padding: 11px 0
    &__avatar
      height: 150px
      width: 150px
      border-radius: 75px
      background-color: #C4C4C4
    &__detail
      margin-left: 30.21px
    &__name
      height: 60px
    &__contacts
      display: flex
      flex-direction: column
      flex-wrap: wrap
.text-contact
  font-weight: 400
  font-size: 14px
  line-height: 21px
  color: black
  &_title
    font-size: 36px
    line-height: 42.2px
  &_address
    margin-top: 25px
    font-family: 'TT Norms Regular'
    & span
      font-weight: bold
  &_name
    font-weight: 500
    font-size: 24px
    line-height: 30px
  &_prof
    font-weight: 300
    font-size: 12px
    line-height: 14px
    margin: 6px 0
  &_phone
    height: 21px
    text-decoration: none
  &_mail
    text-decoration: none
.map
  margin-top: 28px
.form
  margin-top: 32px
  height: 180px
  &-title
    padding: 0
    font-size: 14px
    font-weight: 400
    line-height: 16.41px
    color: #C4C4C4
  &-input
    width: 320px
    border-radius: 0
    flex: 0
    margin: 0
  &-textarea
    width: 508px
    border-radius: 0
  &-send
    display: flex
    justify-content: flex-end
    padding-top: 4px
.send-button
  width: 90px
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

