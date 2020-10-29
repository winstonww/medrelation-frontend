<template>
  <div class="searchContainer">
    <Sidebar/>
    <div class="searchContent">
    <h1> Search </h1>
    <div class="searchBar">
        <md-field>
            <label class="searchLabel">Search for any questions</label>
            <md-input v-model="searchInput" @keyup.enter="submitSearch"></md-input>
            <md-icon class="searchIcon">search</md-icon>
        </md-field>
    </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/layout/Sidebar';

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    Sidebar,
  },
  data: function() {
    return {
      searchInput: ""
    }
  },
  methods: {
    submitSearch: function() {
      console.log('yes')
      if (this.searchInput != undefined && this.searchInput != "") {
        this.$router.push("/search/"+this.searchInput)
      }

    }
  }
}
</script>

<style lang='scss' scoped>
  .searchContent{
    position: absolute;
    top: 200px;
    left: 280px;
    width: 800px;
    height: 300px;
    justify-content: center;
    text-align: center;

    .searchBar {
        position: relative;
        padding: 10px;
        width:600px;
        left: 100px;
        border-radius: 40px;
        border:1px solid rgb(216, 212, 212);


        .searchLabel {
          margin-left: 20px;
          font-size: 20px;
        }

        .searchIcon {
          margin-right: 20px;
          size: 50px;
        }
    }

  }
</style>
