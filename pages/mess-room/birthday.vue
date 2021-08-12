<template>
  <div class="mess-room__birthday">
    <h1 class="page-title page-title_birthday">Дни рождения</h1>
      <div class="mess-room__container mess-room__container_birthday">
        <div class="room-container birthday-container" v-for="(elem, key) in listMonth"
             :key="key">
          <div class="birthday-container__title">
            <span>{{elem.linkName}}</span>
          </div>
          <v-list light class="birthday-container__list">
            <v-list-item class="birthday-container__list-item"
                         v-for="(item, index) in elem.arr"
                         :key=index>
              <v-img position="top center" class="birthday-container__avatar" :src="item.src"></v-img>
              <div class="birthday-container__detail">
                <div class="birthday-container__name">
                  <h3 class="text-contact_name" v-html="item.name"></h3>
                </div>
                <div class="text-contact text-contact_prof">{{item.profession}}</div>
                <div class="text-contact text-contact_data" v-if="item.date">{{new Date(item.date).getFullYear() !== 1900 ? new Date(item.date).toLocaleDateString('ru-RU',{day: 'numeric', month: 'long', year: 'numeric'}) : new Date(item.date).toLocaleDateString('ru-RU',{day: 'numeric', month: 'long'})}}</div>
              </div>
            </v-list-item>
          </v-list>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "birthday",
  data(){
    return {
      keys: 0,
      bottom: '470px',
      listMonth: [
        {linkName: 'Январь', arr: []},
        {linkName: 'Февраль', arr: []},
        {linkName: 'Март', arr: []},
        {linkName: 'Апрель', arr: []},
        {linkName: 'Май',arr: []},
        {linkName: 'Июнь',arr: []},
        {linkName: 'Июль',arr: []},
        {linkName: 'Август',arr: []},
        {linkName: 'Сентябрь',arr: []},
        {linkName: 'Октябрь',arr: []},
        {linkName: 'Ноябрь',arr: []},
        {linkName: 'Декабрь',arr: []},
        {linkName: 'N/A',arr: []},
      ],
      padding: '0 0 32px 0',
    }
  },
  methods: {
    heroes() {
      for (let i = 0; i< this.list.length; i++) {
        for (let j = 0; j< this.listMonth.length; j++) {
          let k
          if (new Date(this.list[i].date).getMonth() === j) {
            this.listMonth[j].arr.push(this.list[i])
            this.listMonth[j].arr.sort((a, b)=> {
              if ( new Date(a.date).getDate() !== new Date(b.date).getDate()) {
                return new Date(a.date).getDate() - new Date(b.date).getDate()
              }
              else return new Date(a.date) - new Date(b.date)
            })
          }
          else if (!this.list[i].date) {
            this.listMonth[12].arr.push(this.list[i])
            break
          }
        }
      }
    },
  },
  computed: {
    list() {
      return this.$store.state.birthday.list
    }
  },
  mounted() {
    this.heroes()
    const listScroll = document.querySelector('.page-list_scroll')
    setTimeout(()=> {
        const listScroll = document.querySelector('.page-list_scroll')
        this.bottom = listScroll.clientHeight + 'px'
        this.$store.dispatch('data/setBottom', this.bottom)
      },
      300)
    this.$store.dispatch('data/setSubListKey', 1)
    this.$store.dispatch('data/setShowList', true)
    this.$store.dispatch('data/setPageId', 'birthday')
    this.$store.dispatch('data/setBottom', this.bottom)
  }
}
</script>

<style lang="sass" scoped>
.mess-room__container_birthday
  display: flex
  flex-wrap: wrap
  flex-direction: column
.birthday-container
  padding-top: 33px
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
  &__avatar
    height: 150px
    width: 150px
    border-radius: 75px
    background-color: #C4C4C4
  &__detail
    margin-left: 30.21px
  &__name
    height: 60px
.text-contact
  font-weight: 400
  font-size: 14px
  line-height: 21px
  color: black
  &_name
    font-weight: 500
    font-size: 24px
    line-height: 30px
  &_prof
    font-weight: 300
    font-size: 12px
    line-height: 14px
    margin: 6px 0
  &_data
    height: 21px
</style>
