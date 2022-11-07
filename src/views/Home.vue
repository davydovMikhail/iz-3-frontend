<template>
  <div class="home">
    <div v-if="!IS_CONNECTED">
      <Btn @click="CONNECT_METAMASK()" text="Connect Wallet"/>
      <Btn @click="TEST()" text="TEST"/>
    </div>
    <div v-else class='home__inner'>
      <Btn text="Stake"/>
      <Btn text="Claim"/>
      <Btn text="Unstake"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Btn from '@/components/Btn.vue'

export default {
  name: 'HomeView',
  components: {
    Btn
  },
  methods: {
    ...mapActions(['CONNECT_METAMASK', 'TEST']),
    // test() {

    // }
  },
  computed: {
    ...mapGetters(['IS_CONNECTED'])
  },
}
</script>
