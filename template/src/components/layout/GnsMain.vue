<template>
  <div class="wrapper fixed">
    <div class="full-screen" v-if="loading" v-loading="true" element-loading-text="页面加载中" element-loading-background="rgba(255, 255, 255, 1)"></div>
    <div v-else>
      <gns-header :header-title="headerTitle" />
      <gns-side-menu/>

      <div class="content-wrapper" :class="{ slideCollapse: navbar.collapsed}">
        <el-scrollbar tag="div" class="content-scrollbar" :load="loadCurrentMenu">
          <section class="content">
            <el-breadcrumb class="breadcrumb" separator=">" v-if="null!=currentMenu">
              <el-breadcrumb-item>
                <i :class="'breadcrumb-iconfont icon iconfont '+currentMenu.icon_name"></i>{{currentMenu.nav_name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
              <router-view class="router-view"></router-view>
            </transition>
          </section>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import GnsHeader from "./GnsHeader.vue";
import GnsSideMenu from "./GnsSideMenu.vue";

import { mapGetters, mapActions, mapMutations } from "vuex";

import { doLogin, validateUrlParams } from "../../services";
import { getRoleRoute } from "../../services/base";
import { getCurrentMenu } from "../../common/utils";
import lizTypes from "../../store/types";

export default {
  name: "GnsMain",
  components: {
    GnsHeader,
    GnsSideMenu
  },
  computed: {
    ...mapGetters({
      navbar: "navbar",
      navbarList: "navbarList",
      currentMenu: "currentMenu"
    }),
    loadCurrentMenu() {
      const nav = getCurrentMenu(this.$route.path, this.navbarList);
      if (null != nav) {
        this.setCurrentMenu(nav);
      } else {
        /* this.setCurrentMenu(this.navbarList[0]); */
      }
    }
  },
  data: function() {
    return {
      loading: true
    };
  },
  props: {
    headerTitle: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapMutations({
      setCollapseNavbar: lizTypes.mutations.SET_COLLAPSE_NAVBAR,
      setCurrentMenu: lizTypes.mutations.SET_CURRENT_MENU,
      setCurrentRole: lizTypes.mutations.SET_CURRENT_ROLE
    }),
    onAutoCollapse() {
      if (this.isCollapse()) {
        this.setCollapseNavbar(true);
      } else {
        this.setCollapseNavbar(false);
      }
    },
    isCollapse() {
      const { body } = document;
      const WIDTH = 784;
      let rect = body.getBoundingClientRect();
      let isCollapse = rect.width < WIDTH;
      return isCollapse;
    }
  },
  created() {
    this.loading = true;
  },

  beforeMount() {
    this.onAutoCollapse();
    const handler = () => {
      if (!document.hidden) {
        this.onAutoCollapse();
      }
    };
    document.addEventListener("visibilitychange", handler);
    window.addEventListener("DOMContentLoaded", handler);
    window.addEventListener("resize", handler);

    validateUrlParams();

    let vm = this;

    getRoleRoute().then(r => {
      if (r.code == 0) {
        vm.setCurrentRole(r.result);
        vm.loading = false;
      } else {
        doLogin();
      }
    });
  }
};
</script>

<style>
.full-screen {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.animated {
  animation-duration: 0.2s;
}

html {
  background-color: #f5f5f5;
  /*   font-size: 14px; */
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  /*   min-width: 300px; */
  overflow-x: hidden;
  /*overflow-y: hidden;*/
  text-rendering: optimizeLegibility;
  box-sizing: border-box;
}

blockquote,
body,
dd,
dl,
dt,
fieldset,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
html,
iframe,
legend,
li,
ol,
p,
pre,
textarea,
ul {
  margin: 0;
  padding: 0;
}

*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.content-wrapper {
  -webkit-transition: -webkit-transform 0.3s ease-in-out,
    margin 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  margin-left: 230px;
  padding-top: 50px;
}

.content-scrollbar {
  height: calc(100vh - 50px);
}

.content-wrapper .el-scrollbar__bar.is-vertical {
  display: none;
}

.content-wrapper .content {
  padding: 1.25rem;
}

.content-wrapper.slideCollapse {
  margin-left: 44px;
}

.content-wrapper.mobileSide {
  margin-left: 0px;
}

.breadcrumb {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #367fa9;
}

.breadcrumb-iconfont {
  margin: 10px;
  font-size: 35px !important;
  color: #367fa9;
}

.router-view {
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  background: #fff;
  padding: 2px;
}
</style>
