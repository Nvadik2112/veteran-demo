<template>
  <div class="mess-room__forum">
    <h1 class="page-title page-title_forum">Форум</h1>
    <div class="mess-room__container mess-room__container_forum">
        <div class="list-item__forum" v-for="(item, index) in list"
                     :key="index" @click="route('/mess-room/forum_item/' + item.id)">
          <div class="forum__img">
            <v-img style="width: 240px; height: 120px; border: 1px solid #d7d7d7" v-if="item.src" :src="item.src" alt=""></v-img>
          </div>
          <h3>{{item.title}}</h3>
          <div class="forum__content">
            <p v-html="item.content.split('').splice(0, 300).join('')"></p>
          </div>
          <span v-if="item.data">{{new Date(item.data).toLocaleDateString('ru-RU',{day: 'numeric', month: 'long', year: 'numeric'})}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "articles",
  data(){
    return {
      keys: 0,
      padding: '0 0 32px 0',
    }
  },
  methods: {
    route(x){
      window.scrollTo(pageXOffset, 0);
      this.$router.push(x)
    },
  },
  computed: {
    list() {
      let arr = []
      arr = [...this.$store.state.articles.articles]
      return arr.reverse()
    }
  },
  mounted() {
    this.$store.dispatch('data/setShowList', false)
    this.$store.dispatch('data/setPageId', 'forum')
  }
}
</script>

<style lang="sass" scoped>
.mess-room__container_forum
  display: flex
  flex-wrap: wrap
  flex-direction: row
  margin-top: 3px
  margin-left: -15px
  margin-right: -15px
.list-item__forum
  height: 360px
  width: 240px
  cursor: pointer
  margin: 30px 15px 0 15px
  -webkit-transition: background-color 0.2s ease-out
  -moz-transition: all 0.2s ease-out
  -o-transition: background-color 0.2s ease-out
  transition: background-color 0.2s ease-out
  &:hover
    background-color: #f9f9f9
  & v-img
    width: 240px
    height: 120px
  & h3
    font:
      weight: 400
      size: 16px
    color: black
    line-height: 18.75px
    height: 73px
    display: flex
    align-items: center
  & span
    color: #6A6A6A
    font:
      size: 12px
      weight: 300
    line-height: 14px
.forum
  &__content
    width: 240px
    height: 128px
    margin-bottom: 8px
    display: -webkit-box
    -webkit-line-clamp: 8
    -webkit-box-orient: vertical
    overflow: hidden
  &__img
    width: 240px
    height: 120px
</style>
