<template>
  <el-submenu :index="item.nav_id+''" v-if="item.child_navs && item.child_navs.length>0">
    <template slot="title">
      <i :class="'icon iconfont  '+item.icon_name"></i>
      <span>{{item.nav_name}}</span>
    </template>
    <template v-for="child in item.child_navs">
      <gns-sub-menu :key="child.url" v-if="child.child_navs && child.child_navs.length>0" :param="child" />
      <el-menu-item :key="child.url" v-else :index="child.nav_id+''" style="padding-left:40px !important" :class="child.class_name" @click="goRouter(child)">
        <i :class="'icon iconfont  '+child.icon_name"></i>
        <span>{{child.nav_name}}</span>
      </el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item v-else :index="item.nav_id+''" :class="item.class_name" @click="goRouter(item)">
    <i :class="'icon iconfont  '+item.icon_name"></i>
    <span>{{item.nav_name}}</span>
  </el-menu-item>
</template>
<script>
import GnsSubMenu from "./GnsSubMenu.vue";

export default {
  name: "GnsSubMenu",
  props: ["param"],
  data: function() {
    return {
      item: this.param
    };
  },
  components: {
    GnsSubMenu
  },
  methods: {
    goRouter(nav) {
      this.$router.push({
        path: nav.nav_url
      });
    }
  }
};
</script>
<style>
.el-menu .icon {
  margin-right: 10px;
  font-size: 22px;
}
</style>
