<template>
    <div :class="['sidebarContainer', {'showSidebar': isShowSidebar}]">
        <div class="menuItem" v-if="isShowSidebar">
          <div v-show="showLink" key="1">
            <SidebarItem :itemData="items.itemAbout" />
          </div>
          <div v-show="showLink" key="2">
            <SidebarItem :itemData="items.itemHome" />
          </div>
        </div>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem';
import {mapGetters} from 'vuex';
export default {
  name: "Sidebar",
  components: {
    SidebarItem
  },
  data: function() {
    return {
      showLink: true,
      sidebarItemSelected: "",
      items : {
        itemAbout: {
          id:"search",
          linkTo: "/search",
          title: '<md-icon>search</md-icon>',
          isSelected:  false,
        },
        itemHome: {
          id:"home",
          linkTo: "/",
          title: "home",
          isSelected: true,
        }
      }
    }
  },
  computed: {
    ...mapGetters({isShowSidebar: "getIsShowSidebar"})
    
  },
  mounted: async function() {
      console.log('in initiailize')
      console.log(this.$route.name)
      this.sidebarItemSelected = this.$route.name
      for (var element in this.items) {
        this.items[element].isSelected = this.sidebarItemSelected == this.items[element].id;
        console.log(this.items[element]);
      } 
  },
  // For reference on using watch
  // watch: {
  //   sidebarItemSelected: function(val) {
  //     for (var element in this.items) {
  //       this.items[element].isSelected = this.sidebarItemSelected == this.items[element].id;
  //       console.log(this.items[element]);
  //     } 
  //   }
  // },
}
</script>

<style lang="scss" scoped>

.sidebarContainer{
  position: fixed;
  top: 60px;
  min-height: 100vh;
  z-index: 50;
  transition: all .5 ease-in-out;
  transition-property: width;
  min-height: 100vh;
  background-color: brown;
  box-shadow: 5px 0 5px grey;
  width: 0px;

  .sidebarTitle {
    position: relative;
    text-align: center;
    font-size: 30px;
    margin-top:40px;
    color: white;
  }

  &.showSidebar{
    width: 150px;
  }

}

.menuItem {
  display: flex;
  flex-direction: column;
}



</style>
