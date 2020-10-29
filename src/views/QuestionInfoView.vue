<template>
  <div class="questionInfoContainer">
    <Sidebar/>
    <div class="questionInfoContent">
      <div class="title">
      <span class="md-headline">{{ title }}</span>
      </div>
      <div v-for="mode in modes" 
          class="questionInfoTable"
          :key="mode.direction">

       <md-table v-model="users" md-sort="name" md-sort-order="asc" md-card>
          <md-table-toolbar>
            <h1 class="md-title">{{mode.direction}}</h1>
          </md-table-toolbar>

            <md-table-row>
              <md-table-head>Organ</md-table-head>
              <md-table-head>Count</md-table-head>
            </md-table-row>

          <md-table-row v-for="target in mode.target_modes"
                        :key='target[0]'>
            <md-table-cell>{{target[0]}}</md-table-cell>
            <md-table-cell>{{target[1]}}</md-table-cell>
          </md-table-row>

        </md-table>
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
  mounted: async function () {

    const post_options = {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        headers: {Accept: "application/json",
                'Content-Type': 'application/json'},
    };
    const url = "http://127.0.0.1:5000/api/stats/questionid/" + 
                this.$route.params.questionid +
                "/target-modes";
    let res = await fetch(url, post_options);
    res = await res.json();
    console.log("in mount questionInfoView")
    console.log(res)
    this.title = res['question']
    this.modes = res['modes'] 
    // let data = await this.$store.dispatch(
    //       "fetchQuestionInfoViewData", this.$route.param.id)
  },
  data: function() {
    return {
      title: "",
      modes: []
    }
  }
}
</script>

<style lang='scss' scoped>
.questionInfoContainer {
    position: absolute;
    background-color: white;
    top: 100px;
  .questionInfoContent{
    position: absolute;
    top: 0px;
    left: 250px;
    width: 800px;
    height: 300px;
    justify-content: center;

    .title {
      text-align: center;
    }
    .questionInfoTable {
      margin:50px;
    }
  }
}

</style>