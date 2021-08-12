<template>
  <div class="veterans__history">
    <h1 class="page-title">{{list.title}}</h1>
    <div class="veterans-container">
      <p v-html="list.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "history",
  computed: {
    list() {
      return this.$store.state.veterans.membership
    }
  },
  mounted() {
    this.$store.dispatch('data/setPageId', 'membership')
  }
}
</script>

<style scoped>

</style>
