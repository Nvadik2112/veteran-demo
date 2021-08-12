<template>
  <div class="veterans__leaders">
    <h1 class="page-title">{{list.title}}</h1>
    <div class="veterans-container">
      <v-list light class="veterans-container__list">
        <v-list-item class="veterans-container__list-item"
                     v-for="(item, index) in list.content"
                     :key=index>
          <v-img position="top center" class="veterans-container__avatar" :src="item.src"></v-img>
          <div class="veterans-container__detail">
            <div class="veterans-container__name">
              <h3 class="text-contact_name" v-html="item.name"></h3>
            </div>
            <div class="text-contact text-contact_prof">{{item.prof}}</div>
          </div>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "leaders",
  computed: {
    list() {
      return this.$store.state.veterans.members.council
    }
  },
  mounted() {
    this.$store.dispatch('data/setPageId', 'council')
  }
}
</script>

<style lang="sass" scoped>
</style>
