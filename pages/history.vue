<template>
  <v-row class="history">
    <v-col cols="2" class="history__links links">
      <list-scroll :list="list" :padding="padding" :blockClass="blockClass"></list-scroll>
    </v-col>
    <v-col cols="10" v-bind:style="{paddingTop: paddingTop + 'px'}" class="history__page">
      <div v-for="(item, index) in list" :key="index" class="history__container">
        <h1 class="page-title">{{item.title}}</h1>
        <div class="history-block">
          <div class="history-block__content" v-html="item.content"></div>

          <div class="slider" v-for="(slider, key) in item.gallery" :key="key">
            <h2 class="slider__title">{{slider.title}}</h2>
          <v-carousel
            :height=526
            :show-arrows="slider.pic.length !== 1"
            show-arrows-on-hover
            hide-delimiters

          >
            <v-carousel-item
              contain
              v-for="(slide, i) in slider.pic"
              :key="i"
              :src="slide.src"
            >
              <div style="position: absolute; height: 50px; background-color: rgba(0,0,0, 0.5); width: 100%; bottom: 0">
                <h3 class="slider__pic-name">{{slide.title}}</h3>
              </div>
            </v-carousel-item>
          </v-carousel>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import ListScroll from "@/components/listScroll";
export default {
  name: "history",
  components: {ListScroll},
  data(){
    return {
      showArrows: true,
      padding: '0 0 20px 0',
      paddingTop: 42,
      blockClass: ".history__container",
      heroes: [
        {name: 'Вице-адмирал <br> Моцак Михаил Васильевич',
          profession: 'Герой Российской Федерации (1994),<br>' + 'вице-адмирал (1996), подводник.',
          src: '/persons/Motsac_M.V.png'}
      ],
    }

  },
  computed: {
    list() {
      return this.$store.state.history.list
    },
  },
  methods: {
    getSliderLength(slider) {
        slider.pic.length === 1 ? this.showArrows = false : this.showArrows = true
    },
    // hideArrows() {
    //   this.showArrows = true
    // }
  },
  mounted() {
    this.$store.dispatch('data/setPaddingTop', this.paddingTop)
  }
}
</script>

<style lang="sass">
img
  object-fit: cover
  object-position: 0 0

.history
  &__links
    padding: 50px 5px 0 37px
  &__page
    padding: 42px 63px 48px 5px
  &__container
    padding-bottom: 20px
  &-block
    margin-top: 23px
    white-space: pre-wrap
    &__content
      margin: 0
      font-family: 'TT Norms Light'
      font-weight: 300
      font-size: 14px
      line-height: 21px
      color: black
</style>
