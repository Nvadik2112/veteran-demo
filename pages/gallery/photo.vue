<template>
    <div class="gallery__container">
      <h1 style="font-weight: 400; color: black; font-size: 36px; line-height: 42px">Фотографии сообщества</h1>
      <div class="photo-container" v-for="(item, index) in list" :key="index">
        <h1 class="photo-container__title">{{item.title}}</h1>
        <div class="photo-album" v-for="(album, key) in item.albums" :key="key">
          <h3 class="photo-album__title">{{album.title}}</h3>
          <div class="photo-album__list">
            <div class="photo-album__list-item" v-for="(pic, k) in album.src" :key="k">
              <v-dialog
                max-width="1280"

              >
                <template v-slot:activator="{ on, attrs }">
                  <img v-bind="attrs"
                       v-on="on"
                       class="photo-album__img"  :src="pic.src"
                         @click="setSlideIndex(k)">
                </template>
                <v-card light>
                  <v-carousel
                    hide-delimiter-background
                    v-model="album.slideIndex"
                    :height=768
                    show-arrows-on-hover
                    hide-delimiters
                  >
                    <v-carousel-item
                      contain
                      v-for="(slide, i) in album.src"
                      :key="i"
                      :src="slide.src"
                    >
                      <div v-if="slide.title" style="position: absolute; height: 50px; background-color: rgba(0,0,0, 0.5); width: 100%; bottom: 0">
                        <h3 class="slider__pic-name">{{slide.title}}</h3>
                      </div>
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-dialog>
              <div class="photo-album__img-name">{{pic.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {

  name: "photo",
  data(){
    return {
      dialog: false,
      slideIndex: 0
    }
  },
  methods: {
   setSlideIndex(key) {
     this.slideIndex = key
   }
  },
  computed: {
    list() {
      let arr = []
      arr = [...this.$store.state.gallery.photo]
      arr.forEach((elem, index)=> {
        elem.albums.forEach((album, key) => {
          album.slideIndex = this.slideIndex
          album.src.forEach((pic, k) => {
            // pic.__ob__.dialog = false
          })
        })
      })
      return arr
    },
  },
  created() {
    this.$store.dispatch('data/setPageId', 'photo')
  },
  mounted() {


    this.$store.dispatch('data/setShowList', true)
    setTimeout(()=> {
        const listScroll = document.querySelector('.page-list_scroll')
        this.bottom = listScroll.clientHeight + 'px'
        this.$store.dispatch('data/setBottom', this.bottom)
       },
      300)
  }
}
</script>
<style lang="sass" scoped>
img
  object-fit: cover
  object-position: center center

.photo-container
  padding-top: 25px
  &__title
    width: 100%
    color: black
    font-weight: 400
  & span
    color: #6A6A6A
    font:
      size: 12px
      weight: 300
    line-height: 14px
.photo-album
  padding-top: 15px
  &__title
    padding-top: 10px
    font-size: 18px
    color: black
    font-weight: 400
  &__img
    width: 172px
    height: 100px
    cursor: pointer
    border: #d7d7d7 solid 1px
  &__img-name
    color: black
    font:
      weight: 300
      size: 14px
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden
  &__list
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin-top: 3px
    margin-left: -15px
    margin-right: -15px
    &-item
      width: 172px
      margin: 15px 15px 0 15px
</style>

