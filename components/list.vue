<template>
  <ul class="page-list">
    <li v-bind:style="{padding: padding}" class="page-list__item"
        v-for="(item, index) in list"
        :key="index"
    >
      <a class="link-name" v-bind:style="{fontWeight: fontWeight, color: color}" @click="route(index,item.url)" v-html="item.linkName"></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "list",
  props: {
    list: {},
    padding: {},
  },
  data() {
    return {
      fontWeight: '',
      color: '',
      prevKey: -1,
      clientHeight: null,
      pageLinksHeight: [],
    }
  },
  methods: {
    route(index,x) {
      this.$router.push(x)
      window.scrollTo(pageXOffset, 0);
      this.$store.dispatch('data/setListKey', index)
      const link = document.querySelectorAll('.link-name')
      link[index].classList.add('link-name_bold')
      if (this.prevKey >= 0 && this.prevKey !== index) {
        link[this.prevKey].classList.remove('link-name_bold')
      }
      this.prevKey = index
    },
    listPosition() {
      const list = document.querySelector('.page-list');
      document.addEventListener('scroll', () => {
        let scrolled = window.pageYOffset;
        if (scrolled > this.fixedHeight) {
          list.style.position = 'fixed';
          list.style.marginTop = this.marginTop
          list.style.bottom = 'initial'
          if (scrolled > (this.scrollBlock - this.footerHeight - this.pageList) && this.bottom) {
            list.style.position = 'absolute'
            list.style.bottom = this.bottom
          } else if (scrolled > (this.scrollBlock - this.footerHeight - this.pageList) && !this.bottom) {
            list.style.position = 'absolute'
            list.style.bottom = 0
            list.style.marginTop = 0
         }
        }
        else {list.style.position = 'static';
          list.style.marginTop = '0px'
          list.style.bottom = 'initial'}
      });
    },
    resize() {
      const block = document.querySelector('.v-application--wrap')
      this.clientHeight = block.clientHeight
    },
  },
  computed: {
    marginTop() {
      let str = ''
      return str = -this.fixedHeight + 'px'
    },
    headerHeight() {
      return this.$store.state.data.headerHeight
    },
    fixedHeight() {
      return this.headerHeight + this.paddingTop
    },
    footerHeight() {
      return this.$store.state.data.footerHeight
    },
    paddingTop() {
      return this.$store.state.data.paddingTop/1.5
    },
    key() {
      return this.$store.state.data.key
    },
    pageList() {
      return this.pageLinksHeight.reduce((sum, current) => sum + current, 0)
    },
    pageId() {
      return this.$store.state.data.pageId
    },
    bottom(){
      return this.$store.state.data.bottom
    },
    showList() {
      return this.$store.state.data.showList
    },
    subListKey() {
      return this.$store.state.data.subListKey
    },
    scrollHeight() {
      const block = document.querySelectorAll(this.blockClass);
      let arr = []
      for (let i = 0; i < this.key; i++ ){
        arr.push(block[i].clientHeight)
      }
      return arr.reduce((sum, current) => sum + current, 0)
    },
    scrollBlock() {
      return this.clientHeight
    },
    yCoordinate() {
      return this.headerHeight + this.paddingTop + this.scrollHeight
    },
  },
  watch: {
    subListKey() {
      const link = document.querySelectorAll('.link-name')
      if (this.prevKey >= 0 && this.prevKey !== this.subListKey) {
        link[this.prevKey].classList.remove('link-name_bold')
      }
      link[this.subListKey].classList.add('link-name_bold')
      this.prevKey = this.subListKey
    },
    pageId() {
      this.pageLinksHeight = []
      const block = document.querySelector('body')
      const pageLink = document.querySelectorAll('.page-list')
      setTimeout(()=> {
          this.clientHeight = block.clientHeight
          pageLink.forEach((elem)=> {
            this.pageLinksHeight.push(elem.clientHeight)
          })},
        200)
      },
  },
  mounted() {
    this.listPosition()
    window.addEventListener("resize", this.resize)
    const link = document.querySelectorAll('.link-name')
    link[this.subListKey].classList.add('link-name_bold')
    this.prevKey = this.subListKey
    const block = document.querySelector('body')
    const pageLink = document.querySelectorAll('.page-list')
    setTimeout(()=> {
        this.clientHeight = block.clientHeight
      ,200})
  },
  beforeUpdate() {
    this.pageLinksHeight = []
    const block = document.querySelector('.v-application--wrap')
    const pageLink = document.querySelectorAll('.page-list')
    const blc = document.querySelectorAll(this.blockClass);
    this.page = blc
    setTimeout(()=> {
        this.clientHeight = block.clientHeight
        pageLink.forEach((elem)=> {
          this.pageLinksHeight.push(elem.clientHeight)
        })},
      200)
  },
  beforeDestroy() {
    document.removeEventListener("resize", this.resize)
    this.$store.dispatch('data/setBottom', '')
  }
}
</script>

<style lang="sass" scoped>
.page-list
  display: flex
  flex-direction: column
  padding: 0
  width: 150px
  &__item
    padding-bottom: 20px
    display: flex
    align-items: center
.link-name
  font-size: 14px
  line-height: 16.41px
  font-weight: 400
  padding: 0
  color: #6A6A6A
  -webkit-transition: color 0.2s ease-out
  -moz-transition: color 0.2s ease-out
  -o-transition: color 0.2s ease-out
  transition: color 0.2s ease-out
  &:hover
    color: black
  &_bold
    font-weight: 700
    color: black
    -webkit-transition: font-weight 0.2s ease-out
    -moz-transition: font-weight 0.2s ease-out
    -o-transition: font-weight 0.2s ease-out
    transition: font-weight 0.2s ease-out
</style>
