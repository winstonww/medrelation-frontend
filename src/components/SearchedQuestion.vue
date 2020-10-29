<template>
    <div class="searchedQuestionContainer">
        <div class="searchedQuestionHeader">
            <div class="searchedQuestionTitle">
                
            <router-link :to="'/info/'+searchedQuestion.id">
                {{searchedQuestion.question}}
            </router-link>
                
            </div>
    
            <div class="addButton" @click="addCard">
                <md-button class="md-icon-button md-raised">
                    <i class="fas fa-plus"></i>
                </md-button>
            </div>
            <md-snackbar
                md-position="center"
                :md-duration="4000"
                :md-active.sync="showSnackbar"
                md-persistent>
            <span>{{snackbarMsg}}</span>
            <md-button class="md-primary" @click="showSnackbar = false">Okay</md-button>
            </md-snackbar>
        </div>
    </div>
</template>

<script>
export default {
    props: ["searchedQuestion"],
    data: function() {
        return {
            showSnackbar: false,
            snackbarMsg: ""
        }
    },
    methods: {
        addCard: async function() {
            let res = await this.$store.dispatch('addQCard', this.searchedQuestion)
            if("error" in res) {
                this.snackbarMsg = res["error"][this.searchedQuestion.question];
            } else {
                this.snackbarMsg = "Added to card deck."
            }
            this.showSnackbar = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.searchedQuestionContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-top:25px;
    padding: 5px;
    text-align: left;
    border-radius: 30px;
    width: 1000px;
    min-height: 60px;
    background-color: white;
    box-shadow: 0px 0 2px gray;

    .searchedQuestionHeader {
        position: relative;
        width: 1000px;
        height: 60px;

        .searchedQuestionTitle {
            margin-top:10px;
            margin-left: 20px;
            position: absolute;
            font-size: 20px;
            color:grey;
        }

        .addButton {
            position: absolute;
            right: 0px;
            top:   0px;
            margin-right:20px;
            margin-top:8px;
        }
    }
}
</style>