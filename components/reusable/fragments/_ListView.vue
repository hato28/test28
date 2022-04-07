<template>
  <b-row>
    <b-col
      cols="12"
      md="12"
      sm="12">
      <h4>{{ title }}</h4>
    </b-col>
    <b-col
      cols="12"
      md="12"
      sm="12">
      <List
        class="mt-3"
        :items="items" />
    </b-col>
    <b-col
      cols="12"
      md="12"
      sm="12"
      class="text-center">
      <b-btn
        size="sm"
        class="btn-text">
        {{ showMore }}
      </b-btn>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'Row-List',
  props: {
    items: {
      type: Array,
      default: []
    },

    title: {
      type: String,
      default: 'SUGGESTED'
    },

    showMore: {
      type: String,
      default: 'Show More'
    }
  }
}
</script>
<style scoped>
h4 {
  font-size: 1rem;
  color: #2E3A59;
  font-weight: bold;
}
.btn-text {
  color: #34383c;
  background-color: white;
  border: none;
}
</style>