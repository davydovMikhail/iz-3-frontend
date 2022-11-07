<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
        
    <Btn text="claim" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Btn from '@/components/Btn.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Btn
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
