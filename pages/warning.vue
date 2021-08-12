<template>
  <div style="height: 500px; padding: 30px; display: flex; align-items: center; justify-content: center">
  <v-alert
    type="warning"
    color="#FFCC00"
    style="color: black">
    Данный раздел находится в разработке. Приносим извинения за неудобства.
  </v-alert>
  </div>
</template>

<script>
export default {
name: "warning"
}
</script>

<style lang="sass">
.v-alert__icon.v-icon
  color: black!important
</style>
