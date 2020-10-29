<template>
    <div :class="computeSidebarItemClass">
        <md-menu 
            md-direction="bottom-start"
            :md-offset-x="400" 
            :md-offset-y="-36"
        >
            <router-link 
                :style="computeSidebarFontColor"
                :to="itemData.linkTo"> 
                <md-icon v-html="itemData.title" class='md-raised'></md-icon>
            </router-link> 

        </md-menu>
    </div>
</template>

<script>
export default {
    name: "SidebarItem",
    props : ['itemData'],
    
    computed: {
        computeSidebarItemClass: function() {
            console.log('in computeSidebarItemClass')
            console.log(this.itemData)
            return  "menu-item " + (this.itemData.isSelected ? "selectedClass": "notSelectedClass");
        },
        computeSidebarFontColor: function() {
            return  "color: " + (this.itemData.isSelected ? "black": "white");
        }
    },
  
}
</script>

<style scoped>
.menu-item {
    text-align: center;
    margin-top: 30px;
}

.menu-item > * {
    padding:20px;
}

.notSelectedClass {
    background-color: brown;
}

.selectedClass {
    background-color: white;
}

</style>