<template>
    <div class="questionContainer">
    <div class="questionHeader">
        <div class="questionTitle">
        <router-link :to="'/info/'+qCardData.questionid">
        {{qCardData.question}}
        </router-link>
        </div>
        <div class="expandButton" @click="expand">
            <md-button v-if="!isExpand" class="md-icon-button">
                <i class="fas fa-sort-down"></i>
            </md-button>
            <md-button v-else class="md-icon-button">
                <i class="fas fa-sort-up"></i>
            </md-button>
        </div>
        <div class="cancelButton" @click="closeCard">
            <md-button class="md-icon-button">
                <i class="far fa-window-close"></i>
            </md-button>
        </div>
    </div>
    <div v-if="isExpand" class="questionSection">
        <div class="table">
            <md-table md-card>
                <md-table-row>
                    <md-table-head>
                        <div class="tableFont">
                            Relationship
                        </div>
                    </md-table-head>
                    <md-table-head>
                        <div class="tableFont">
                            Organ
                        </div>
                        </md-table-head>
                    <md-table-head></md-table-head>
                </md-table-row>

                <md-table-row v-for="data in qCardData.relationships" :key="data.id">
                    <md-table-cell>
                        <div class="tableFont">
                            {{ data['direction'] }}
                        </div>
                    </md-table-cell>

                    <md-table-cell v-if="getIsUpdateTarget(data.id)">
                        <!-- <md-field :class="getTargetValidationClass(data.id)">
                            <label>Required Field</label>
                            <md-input v-model="text[data.id]" required></md-input>
                            <span class="md-error">{{ getUpdateTargetErrors(data.id)}}</span>
                        </md-field> -->

                        <md-autocomplete :class="getTargetValidationClass(data.id)"
                                         v-model="text[data.id]"
                                         :md-options="autocompleteData"
                                         @md-changed="getAutocompleteData"
                                         @md-opened="getAutocompleteData">
                                     
                            <label>Required Field</label>
                            <span class="md-error">{{ getUpdateTargetErrors(data.id)}}</span>
                        </md-autocomplete>

                    </md-table-cell>
                    <md-table-cell v-else>
                        <div class="tableFont">
                            {{ data['target'] }}
                        </div>
                    </md-table-cell>
                    <md-table-cell v-if="getIsUpdateTarget(data.id)">
                        <md-button @click="confirmUpdateTarget(data.id)">
                            <i class="fas fa-check"></i>
                        </md-button>
                    </md-table-cell>
                    <md-table-cell v-else>
                        <md-button @click="showUpdateTarget(data.id)">
                            <i class="fas fa-edit"></i>
                        </md-button>
                    </md-table-cell>

                    <md-table-cell md-numeric>
                        <md-button @click="removeTarget(data.id)" class="md-icon-button md-raised">
                            <i class="fas fa-minus"></i>
                        </md-button>
                    </md-table-cell>
                </md-table-row>

            </md-table>
        </div>

        <div v-if="isAddEntry" class="addNew">
            <!-- <md-field :class="getTargetValidationClass('newTarget')">
                <label>Organ</label>
                <md-input v-model="newTarget"></md-input>
                <span class="md-error">{{getUpdateTargetErrors('newTarget')}}</span>
            </md-field> -->

            <md-autocomplete :class="getTargetValidationClass('newTarget')"
                v-model="newTarget"
                :md-options="autocompleteData"
                @md-changed="getAutocompleteData"
                @md-opened="getAutocompleteData">
                <label>Organ</label>
                <span class="md-error">{{getUpdateTargetErrors('newTarget')}}</span>
            </md-autocomplete>


            <md-field :class="getTargetValidationClass('newDirection')">
                <label for="newDirection">Direction</label>
                <md-select v-model="newDirection">
                    <md-option value="Anterior">Anterior</md-option>
                    <md-option value="Posterior">Posterior</md-option>
                    <md-option value="Inferior">Inferior</md-option>
                    <md-option value="Superior">Superior</md-option>
                    <md-option value="Laterial">Lateral</md-option>
                    <md-option value="Medial">Medial</md-option>
                </md-select>
                <span class="md-error">{{getUpdateTargetErrors('newDirection')}}</span>
            </md-field>
        </div>
        <div v-if="!isAddEntry" class="updateButton">
            <md-button 
                @click="showAddEntry"
                class="md-icon-button md-raised">
                <i class="fas fa-plus"></i>
            </md-button>
        </div>
        <div v-else class="updateButton">
            <md-button
                @click="hideAddEntry"
                class="md-icon-button md-raised">
                <i class="fas fa-times"></i>
            </md-button>
            <md-button
                @click="confirmAdd"
                class="md-icon-button md-raised">
                <i class="fas fa-check"></i>
            </md-button>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props: ["qCardData", "qCardsErrors"],
    data: function() {
        return {
            isExpand: false,
            isAddEntry: false,
            targetToUpdate: {},
            text: {},
            newDirection: "",
            newTarget: "",
            newTargetError: "",
            autocompleteData: []
        }
    },

    methods: {
        expand: function() {
            this.isExpand = !this.isExpand;
        },
        showUpdateTarget: function(id) {
            this.targetToUpdate[id] = true
            this.$forceUpdate();
        },
        confirmUpdateTarget: async function(id) {
            this.targetToUpdate[id] = false
            // deep copy to avoid mutate data 
            await this.$store.dispatch(
                'updateQCardTarget', [this.qCardData.id, id, this.text[id]])
            this.$forceUpdate();
        },
        getIsUpdateTarget: function(id) {
            let err = this.getUpdateTargetErrors(id)
            if (this.isInvalidTarget(err)) {
                this.targetToUpdate[id] = true;
            }
            let res =  ((id in this.targetToUpdate) && (this.targetToUpdate[id]))
            return res
        }, 
        closeCard: function() {
            this.$store.dispatch('removeQCard', this.qCardData.id)
        },
        removeTarget: function(id) {
            this.$store.dispatch('removeQCardTarget', id);
            this.targetToUpdate[id] = false;
        },
        showAddEntry: function() {
            this.isAddEntry = true;
        },
        hideAddEntry: function() {
            this.isAddEntry = false;
        },
        confirmAdd: async function() {
            let qCardData = JSON.parse(JSON.stringify(this.qCardData))
            // reset text field
            await this.$store.dispatch(
                'addQCardTarget', [qCardData, this.newDirection, this.newTarget]);

            let errTarget = this.getUpdateTargetErrors('newTarget');
            let errRel = this.getUpdateTargetErrors('newDirection');
            if (this.isInvalidTarget(errTarget) || this.isInvalidTarget(errRel)) {
                this.showAddEntry();
            } else {
                this.newTarget = "";
                this.hideAddEntry();
            }
            this.$forceUpdate();
        },
        getTargetValidationClass: function(field) {
            let err = this.getUpdateTargetErrors(field)
            return this.isInvalidTarget(err) ? "md-invalid" : ""
        },
        getUpdateTargetErrors: function(field) {
            let cardError = this.qCardsErrors[this.qCardData.id] || {};
            return cardError && cardError[field]
        },
        isInvalidTarget: function(err) {
            return err != "" && err != undefined
        },
        getAutocompleteData: async function(searchTerm) {
            let res = await this.$store.dispatch("fetchQuestions", searchTerm)
            console.log('in getAutocompleteData')
            console.log(searchTerm)
            this.autocompleteData = new Promise(resolve => {
                window.setTimeout(() => {
                    if(searchTerm) {
                        resolve(res.map(e => e['question']))
                    } else {
                        resolve([])
                    }
                }, 500)
            })
        }


        
    },
    
}
</script>

<style lang="scss" scoped>
.questionContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-top:25px;
    padding: 5px;
    text-align: left;
    // border-radius: 30px;
    width: 1000px;
    min-height: 60px;
    background-color: white;
    box-shadow: 1px 1px 3px gray;

    .questionHeader {
        position: relative;
        width: 1000px;
        height: 60px;

        .questionTitle {
            margin-top:10px;
            margin-left: 20px;
            position: absolute;
            font-size: 20px;
            color:grey;
        }
        
        .expandButton {
            position: absolute;
            right: 50px;
            top:   0px;
            margin-right:20px;
            margin-top:8px;
        }

        .cancelButton {
            position: absolute;
            right: 0px;
            top:   0px;
            margin-right:20px;
            margin-top:8px;
        }
        
    };

    .questionSection {
        position: relative;
        flex-direction: column;
         width:1000px;
         margin-bottom:10px;
         margin-left:  30px;
         margin-right: 30px;
         
         .table {
             width: 800px;
             margin-bottom:50px;
         }
         .addNew {
            width: 800px;
        }

         .updateButton {
             position: absolute;
             right: 50px;
             bottom: 0px;
         }
            
    }
         
.tableFont {
    font-size: 17px;
}
}
</style>