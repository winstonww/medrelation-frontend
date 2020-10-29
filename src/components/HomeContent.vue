<template>
    <div class="contentContainer">
        <div>
            <h2> Your cards </h2>
        </div>
        <div v-for="qa in qCardsData"
             :key="qa.id">

            <QCard :qCardData="qa" :qCardsErrors="qCardsErrors"/>
        </div>
        <div class='contentWindow'>
        </div>
      
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QCard from './QCard'
export default {
    components: {
        QCard
    },
    mounted: function() {
        console.log('hi')
        this.$store.dispatch('fetchQCardsData')
    },
    computed: {
        ...mapGetters({
            qCardsData: "getQCardsData",
            qCardsErrors: "getQCardsErrors"}),

    },
}
</script>


<style lang='scss' scoped>

  .contentContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 150px;
    justify-content: center;
    text-align: center;

    h2 {
        margin:50px;
        font-size: 30px;
    }

    .contentWindow {
        background-color: red;
        height: var(--content-total-height);
        width: 1000px;

        img {
            justify-content: center;
        }
    }
  }
</style>
