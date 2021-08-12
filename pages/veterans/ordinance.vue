<template>
  <div class="veterans__purpose">
    <h1 class="page-title">{{list.title}}</h1>
    <div class="veterans-container">
      <p v-html="list.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ordinance",
  computed: {
    list() {
      return this.$store.state.veterans.ordinance
    }
  },
  mounted() {
    this.$store.dispatch('data/setPageId', 'ordinance')
  }
}
</script>

<style scoped>

</style>
