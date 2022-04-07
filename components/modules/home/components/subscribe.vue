<template>
  <b-col
    class="d-none d-lg-block"
    cols="12"
    sm="12"
    md="3">
  <Cards>
    
  </Cards>
</b-col>
</template>
<script>
export default {
  name: 'Left-Content',
  data () {
    return {
      subscribe: [
        {
          id: 1,
          title: 'Sed ut perspiciatis',
          content: 'Inventore architecto beatae',
          live: true
        },
        {
          id: 2,
          title: 'Sed omnis iste',
          content: 'Accusantium doloremque',
          live: true
        },
        {
          id: 3,
          title: 'Perspiciatis unde omnis iste',
          content: 'Laudantium vitae'
        },
        {
          id: 4,
          title: 'Unde omnis iste',
          content: 'Doloremque architecto'
        },
        {
          id: 5,
          title: 'Omnis iste ut perspiciatis',
          content: 'Accusantium laudantium inventore',
          live: true
        }
      ],
      suggested: [
        {
          id: 1,
          title: 'Sed ut perspiciatis',
          content: 'Inventore architecto beatae',
          live: true
        },
        {
          id: 2,
          title: 'Sed omnis iste',
          content: 'Accusantium doloremque',
          live: true
        },
        {
          id: 3,
          title: 'Perspiciatis unde omnis iste',
          content: 'Laudantium vitae'
        }
      ]
    }
  }
}
</script>
