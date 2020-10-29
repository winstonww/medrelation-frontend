<template>
    <div class="searchResultsContainer">
        <Sidebar/>
        <div class="searchResultsContent">
        <div>
            <h2> Search results </h2>
        </div>
        <div v-for="sc in searchedQuestions"
             :key="sc.id"
        >
            <SearchedQuestion :searchedQuestion="sc"/>
        </div>
        </div>
      
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Sidebar from '../components/layout/Sidebar'
import SearchedQuestion from '../components/SearchedQuestion'
export default {
    components: {
        Sidebar, 
        SearchedQuestion
    },
    mounted: function() {
        console.log('on mount dispatch action to fetch search results to vuex')
        console.log(this.$route.params.searchTerm)
        this.$store.dispatch("fetchQuestions", this.$route.params.searchTerm)
    },
    computed: {
        ...mapGetters({searchedQuestions: 'getSearchedQuestions'}),
        searchTerm: function() {
            return this.$route.params.searchTerm
        }
    }
}
</script>

<style lang='scss' scoped>
.searchResultsContainer {
    position: absolute;
    background-color: white;
    top: 100px;

  .searchResultsContent{
    position: absolute;
    top: 0px;
    left: 150px;
    width: 1000px;
    min-height: 300px;
    justify-content: center;
    text-align: center;
  }
}
</style>