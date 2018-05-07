<template>
  <aside class="main-sidebar animated">
    <el-menu :default-active="getDefaultActive" :default-openeds="getOpeneds" class="el-menu-style animated" background-color="#464242" text-color="#95989d" active-text-color="#367fa9" :collapse="navbar.collapsed" style="border-right-width: 0px;">
      <template v-for="nav in navbarList">
        <gns-sub-menu :key="nav.url" :param="nav" />
      </template>
    </el-menu>
  </aside>
</template>
<script>
import GnsSubMenu from "./GnsSubMenu.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "GnsSideMenu",
  props: {
    show: Boolean
  },
  data() {
    return {};
  },
  components: {
    GnsSubMenu
  },
  computed: {
    ...mapGetters({
      navbar: "navbar",
      navbarList: "navbarList",
      currentMenu: "currentMenu"
    }),
    getDefaultActive() {
      if (this.currentMenu) {
        return this.currentMenu.nav_id + "";
      } else {
        return "";
      }
    },
    getOpeneds() {
      const getParentArray = (path, navbarList) => {
        let urls = [];
        if (!!navbarList) {
          for (let i = 0; i < navbarList.length; i++) {
            const menu = navbarList[i];
            const child_navs = menu.child_navs;
            if (!!child_navs && child_navs.length > 0) {
              let subUrls = getParentArray(path, child_navs);
              if (!!subUrls && subUrls.length > 0) {
                urls.push(menu.nav_id + "");
              }
            } else {
              if (menu.nav_url == path) {
                urls.push(menu.nav_id + "");
                break;
              }
            }
          }
        }
        return urls.reverse();
      };
      const urls = getParentArray(this.$route.path, this.navbarList);

      return urls;
    }
  },
  created() {
    this.loadNavbarList();
  },
  methods: {
    ...mapActions({
      loadNavbarList: "loadNavbarList"
    }),
    handleSelect(index, path) {
      console.log(path);
    }
  }
};
</script>
<style>
.showSlide {
  animation-duration: 0.2s;
  animation-name: slideInLeft;
}

.hideSlide {
  animation-duration: 0.2s;
  animation-name: slideOutLeft;
}

.main-sidebar {
  background-color: #464242;
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  height: calc(100vh - 50px);
  z-index: 810;
  -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
}

.el-menu-style:not(.el-menu--collapse) {
  width: 230px;
}

/* .expandSide {
  width: 230px;
}
 */
.el-menu-item,
.el-submenu__title {
  padding-left: 10px !important;
}

.el-menu-style .el-menu-item,
.el-menu-style .el-submenu__title {
  height: 45px;
  line-height: 45px;
}

.main-sidebar .el-menu--collapse {
  width: 50px;
}

.el-tooltip,
.main-sidebar .el-menu--collapse > .el-menu-item,
.main-sidebar .el-menu--collapse > .el-submenu > .el-submenu__title {
  padding-left: 13px !important;
}

.el-tooltip__popper {
  display: none;
}

.vue-scrollbar {
  background-color: #464242 !important;
  height: calc(100vh - 50px);
}

.main-sidebar .el-scrollbar__bar.is-vertical {
  display: none;
}

.sidebar {
  min-height: 450px;
}
</style>
