<template>
  <div class="gallery__container">
    <h1 style="font-weight: 400; color: black; font-size: 36px; line-height: 42px">Видео</h1>
    <div class="video-container">
    <div class="video-container__item" v-for="(item, index) in list" :key="index">

        <v-dialog
          width="1024"
          v-model=item.dialog
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="video-container__cover" @click="setItem(item)" v-bind="attrs" v-on="on">
              <v-icon large>mdi-play-circle-outline</v-icon>
            <video width="172" height="100" >
              <source :src=item.src type="video/mp4"></source>
            </video>
            </div>
          </template>
          <v-card style="background-color: black">
            <div style="width: 90%;display: -webkit-box;-webkit-line-clamp: 1; -webkit-box-orient: vertical;
             overflow: hidden; margin-top: 10px; margin-left: 10px; font-weight: 400;
             font-style: italic; font-size: 18px; line-height: 21px; color: white">{{item.title}}</div>
            <video v-if="link" controls disablePictureInPicture
                   width="1024" height="768">
              <source :src='link' type="video/mp4"></source>
            </video>
          </v-card>
        </v-dialog>

<!--  <video-player :options="playerOptions"></video-player>-->
      <div class="video-container__item-name">{{item.title}}</div>
    </div>

<!--    </div>-->
  </div>
  </div>

</template>

<script>
export default {

  name: "video",
  data(){
    return {
      dialog: false,
      slideIndex: 0,
      link: '',
      bottom: ''
    }
  },
  methods: {
    setItem(key) {
      const overRay = document.querySelector('.v-overlay__scrim')
      this.link = key.src
    },
    keyDownClearLink() {
      if (event.keyCode === 27) {
        this.link = ''
      }
    },
    clickClearLink() {
      if (event.target.classList.contains('v-overlay__scrim')) {
        this.link = ''
      }
    }
  },
  computed: {
    list() {
      let arr = []
      arr = [...this.$store.state.gallery.video]
      arr.forEach((elem, index)=> {
        elem.__ob__.dialog = false
      })
      return arr
    },
  },
  created() {
    this.$store.dispatch('data/setPageId', 'video')
  },
  mounted() {

    document.addEventListener("keydown", this.keyDownClearLink)
    document.addEventListener("click", this.clickClearLink)

    this.$store.dispatch('data/setShowList', false)
    this.$store.dispatch('data/setSubListKey', 1)

  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keyDownClearLink)
    document.removeEventListener("click", this.clickClearLink)
  }
}
</script>

<style lang="sass" scoped>
.video-container
  display: flex
  flex-direction: row
  flex-wrap: wrap
  padding-top: 25px
  margin-left: -15px
  margin-right: -15px
  &__item
    width: 172px
    margin: 15px 15px 0 15px
    &-name
      color: black
      height: 40px
      font:
        weight: 300
        size: 14px
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
      overflow: hidden
  &__cover
    position: relative
    width: 172px
    height: 100px
    background-color: black
    cursor: pointer
    & i
      position: absolute
      top: 34%
      left: 40%
  &__img-name
    color: black
    height: 40px
    font:
      weight: 300
      size: 14px
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden
</style>
