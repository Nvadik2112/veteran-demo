<template>
    <div class="veterans__society">
      <h1 class="page-title">{{list.title}}</h1>
      <div class="veterans-container">
        <p v-html="list.content"></p>
      </div>
    </div>
</template>

<script>
export default {
  name: "society",
  computed: {
    list() {
      return this.$store.state.veterans.society
    }
  },
  mounted() {
    this.$store.dispatch('data/setPageId', 'society')
 }
}
</script>

<style lang="sass" scoped>

</style>
