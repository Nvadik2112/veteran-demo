<template>
  <ul v-show=showList class="page-list page-list_scroll">
    <li v-bind:style="{padding: padding}" class="page-list__item page-list__item_scroll"
        v-for="(item, index) in list"
        :key="index"
    >
      <a class="link-scroll" v-bind:style="{fontWeight: fontWeight, color: color}" @click="scroll(index)" v-html="item.linkName"></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "listScroll",
  props: {
    list: {},
    padding: {},
    blockClass: {},
    addMarginTop: '',
    addCoordinate: {
      default: 0
    }

  },
  data() {
    return {
      fontWeight: '',
      color: '',
      prevKey: 0,
      key: null,
      clientHeight: null,
      page: [],
      pageLinksHeight: [],
      linksHeight: null,
    }
  },
  methods: {
    scroll(index) {
      this.key = index
      window.scrollTo({left: 0, top: this.yCoordinate, behavior: 'smooth'});
      const link = document.querySelectorAll('.link-scroll')
      link[index].classList.add('link-scroll_bold')
      if (this.prevKey >= 0 && this.prevKey !== index) {
        link[this.prevKey].classList.remove('link-scroll_bold')
      }
      this.prevKey = index
    },
    pageOffset() {
      let scrolled = window.pageYOffset;
      const list = document.querySelector('.page-list_scroll');
      const link = document.querySelectorAll('.link-scroll')
      if (scrolled > this.fixedHeight) {
        list.style.position = 'fixed';
        !this.addMarginTop? list.style.marginTop = this.marginTop : list.style.marginTop = this.addMarginTop
        if (scrolled > (this.scrollBlock - this.footerHeight - this.pageList) && this.showList === true) {
          list.style.position = 'absolute'
          list.style.bottom = 0
        } else {
          list.style.bottom = 'initial'
        }
      }
      else {list.style.position = 'static';
        list.style.marginTop = '0px'
        list.style.bottom = 'initial'}

      const key = this.getArr.findIndex((key) => {
        if (key >= scrolled - 40) {
          return key }
      })
      if (this.prevKey >= 0 && this.prevKey !== key) {
        link[this.prevKey].classList.remove('link-scroll_bold')
      }
      link[key].classList.add('link-scroll_bold')
      this.prevKey = key
    },
    resize() {
      const block = document.querySelector('.v-application--wrap')
      const blc = document.querySelectorAll(this.blockClass)
      this.clientHeight = block.clientHeight
      this.page = blc
    },
    action() {
      document.addEventListener('scroll', this.pageOffset)
      window.addEventListener("resize", this.resize)
      const block = document.querySelector('.v-application--wrap')
      const pageLink = document.querySelectorAll('.page-list')
      const blc = document.querySelectorAll(this.blockClass);
      this.page = blc
      setTimeout(()=> {
          this.clientHeight = block.clientHeight
          pageLink.forEach((elem)=> {
            this.pageLinksHeight.push(elem.clientHeight)
          })},
        300)
    }
  },
  watch: {
    showList () {
      this.showList === false ? document.removeEventListener('scroll', this.pageOffset) : document.addEventListener('scroll', this.pageOffset)
    },
  },
  computed: {
    getArr() {
      let arr = []
      let num = []
      let scrolled = window.pageYOffset;
      for (let i = 0; i < this.page.length - 1; i++) {
        num.push(this.page[i].clientHeight)
        arr.push(num.reduce((sum, current) => sum + current, 0))
      }
      arr.push(this.clientHeight)
      return arr
    },
    scrollHeight() {
      const block = document.querySelectorAll(this.blockClass);
      let arr = []
      for (let i = 0; i < this.key; i++ ){
        arr.push(block[i].clientHeight)
      }
      return arr.reduce((sum, current) => sum + current, 0)
    },
    marginTop() {
      let str = ''
      return str = -this.fixedHeight + 'px'
    },
    headerHeight() {
      return this.$store.state.data.headerHeight
    },
    footerHeight() {
      return this.$store.state.data.footerHeight
    },
    fixedHeight() {
      return this.headerHeight + this.paddingTop
    },
    paddingTop() {
      return this.$store.state.data.paddingTop/1.5
    },
    pageList() {
      return this.pageLinksHeight.reduce((sum, current) => sum + current, 0)
    },
    scrollBlock() {
      return this.clientHeight
    },
    yCoordinate() {
      return this.headerHeight + this.paddingTop + this.scrollHeight + this.addCoordinate
    },
    subListKey() {
      return this.$store.state.data.subListKey
    },
    listKey() {
      return this.$store.state.data.listKey
    },
    showList() {
      return this.$store.state.data.showList
    },
  },
  created() {
    this.$store.dispatch('data/setShowList', true)
  },
  mounted() {
    const link = document.querySelectorAll('.link-scroll')
    link[0].classList.add('link-scroll_bold')
    this.action()
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.pageOffset)
    document.removeEventListener("resize", this.resize)
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
.link-scroll
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
