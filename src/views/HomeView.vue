<template>
  <div class="home">
    <div v-if=0>
      <Btn text="Connect Wallet"/>
    </div>
    <div v-else class='home__inner'>
      <Btn text="Stake"/>
      <Btn text="Claim"/>
      <Btn text="Unstake"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Btn from '@/components/Btn.vue'

export default {
  name: 'HomeView',
  components: {
    Btn
  }
}
</script>
