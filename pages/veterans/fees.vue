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
  name: "fees",
  computed: {
    list() {
      return this.$store.state.veterans.fees
    }
  },
  mounted() {
    this.$store.dispatch('data/setPageId', 'fees')
  }
}
</script>

<style scoped>

</style>
