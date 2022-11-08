<template>
  <div class="home">
    <div v-if="!IS_CONNECTED">
      <Btn @click="CONNECT_METAMASK()" text="Connect Wallet"/>
    </div>
    <div v-else class='home__inner'>
      <input type="number" v-model="stake_amount">
      <Btn text="Stake" @click="handleStake()"/>
      <Btn text="Claim" @click="CLAIM()"/>
      <Btn text="Unstake" @click="UNSTAKE()"/>
      <div>
        {{ MESSAGE }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Btn from '@/components/Btn.vue'

export default {
  name: 'Home',
  data() {
    return {
      stake_amount: ''
    }
  },
  components: {
    Btn
  },
  methods: {
    ...mapActions(['CONNECT_METAMASK', 'CLAIM', 'STAKE', 'UNSTAKE']),
    async handleStake() {
      if (this.stake_amount > 0) {
        await this.STAKE(this.stake_amount);
      } else {
        this.$vToastify.error('Amount must be positive', 'Validation error');
      }
    }
  },
  computed: {
    ...mapGetters(['IS_CONNECTED', 'MESSAGE'])
  },
}
</script>

<style scoped>
.home__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
	border-color: #f1c40f;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	-webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
	box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
	border-width: 1px;
	border-style: solid;
	color: #474e57;
	font-size: 16px;
	font-weight: 400;
	padding: 10px;
	width: 100px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input:focus {
	border-color: #adadad;
	box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06), 0 0 5px rgba(160, 160, 160, 0.7);
	outline: none;
}
</style>
