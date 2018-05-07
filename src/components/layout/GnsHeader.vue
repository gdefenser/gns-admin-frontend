<template>
  <header class="main-header animated" :class="{closeLogo:navbar.collapsed}">
    <router-link to="/" class="logo animated" tag="a">
      <span class="logo-lg">
        <b>{{headerTitle}}</b>
      </span>
    </router-link>
    <nav class="navbar">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button" @click="onCollapse">
        <i class="icon iconfont " :class="!navbar.collapsed?'icon-liebiaoshouqi':'icon-liebiaozhankai'"></i>
        <!-- <i v-if="device.isMobile" class="icon iconfont " :class="(sidebar.show)?'icon-liebiaoshouqi':'icon-liebiaozhankai'"></i> -->
      </a>
      <div class="navbar-custom-menu">
        <el-dropdown trigger="click">
          <div class="el-dropdown-link">
            <img src='../../assets/img/avatar.png' style="margin-top:10px; margin-left:15px; width: 25px;height: 25px;border-radius: 50%; vertical-align: middle;">
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <img src='../../assets/img/avatar.png' class="img-circle" style="width: 100px;height: 100px;vertical-align: middle;">
              <p></p>
            </el-dropdown-item>
            <!--      <el-dropdown-item divided command="goEdit">
              修改用户信息
            </el-dropdown-item> -->
            <el-dropdown-item divided>
              <el-button type="danger" round @click="onLogout" style="width:100%">退出</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </nav>

  </header>
</template>
<script>
import { doLogout } from "../../services";
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../store/types";
export default {
  name: "GnsHeader",
  computed: mapGetters({
    navbar: "navbar"
  }),

  props: {
    headerTitle: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapMutations({
      setCollapseNavbar: types.mutations.SET_COLLAPSE_NAVBAR
    }),
    onLogout() {
      let vm = this;
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          doLogout();
        })
        .catch(e => {});
    },
    onCollapse() {
      this.setCollapseNavbar(!this.navbar.collapsed);
    }
  }
};
</script>
<style scoped>
.animated {
  animation-duration: 0.2s;
}

.main-header a {
  text-decoration: none;
  color: #48576a;
}

.main-header {
  position: fixed;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  z-index: 1999;
  animation-name: slideInDown;
  animation-fill-mode: both;
  color: #48576a;
  height: 51px;
}

.main-header .navbar .sidebar-toggle {
  float: left;
  background-color: transparent;
  background-image: none;
  padding: 15px 15px;
  line-height: 20px;
}

/* .main-header .navbar .sidebar-toggle:before {
  content: "\f03b";
} */

.main-header {
  background-color: #ffffff;
}

.main-header .logo {
  -webkit-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  display: block;
  float: left;
  height: 51px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  width: 230px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 0px;
  font-weight: 300;
  overflow: hidden;
  text-decoration: none;
  background-color: #367fa9;
  color: #eeeeee;
}

.main-header .logo .logo-lg {
  display: block;
  height: 38px;
  line-height: 38px;
  margin-top: 6px;
}

.main-header .navbar {
  -webkit-transition: margin-left 0.3s ease-in-out;
  -o-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
  margin-bottom: 0;
  margin-left: 230px;
  border: none;
  min-height: 50px;
  border-radius: 0;
  background-color: #ffffff;
}

.layout-top-nav .main-header .navbar {
  margin-left: 0;
}

body.hold-transition .main-header .navbar,
body.hold-transition .main-header .logo {
  -webkit-transition: none;
  -o-transition: none;
  transition: none;
}

.main-header .navbar .sidebar-toggle {
  display: block;
}

.main-header .navbar .sidebar-toggle:hover {
  background: #f9f9f9;
}

.main-header .logo {
  border-bottom: 0 solid transparent;
}

@media (max-width: 800px) {
  .main-header .logo {
    display: none;
  }

  .main-header .navbar {
    margin: 0;
  }

  .main-header .logo,
  .main-header .navbar {
    width: 100%;
    float: none;
  }
}
.main-header.closeLogo .navbar {
  margin-left: 44px;
}

.main-header.closeLogo .logo {
  width: 50px;
  padding: 0px;
}
.main-header.closeLogo .logo .logo-lg b {
  display: none;
}
.main-header.closeLogo .sidebar-toggle {
  background: #f9f9f9;
}

/* .main-header.closeLogo .navbar .sidebar-toggle:before {
  content: "\f03c";
}

.main-header.mobileLogo .navbar .sidebar-toggle:before {
  content: "\f03a";
} */

.navbar-custom-menu {
  float: right;
  height: 50px;
}

.navbar-custom-menu .el-dropdown-link {
  cursor: pointer;
  height: 50px;
  width: 50px;
}

.navbar-custom-menu .el-dropdown-link:hover {
  background: #f9f9f9;
}
.message-list {
  list-style: none;
  padding: 0 10px;
}
.message-list li {
  list-style: none;
  height: 25px;
  line-height: 25px;
}
.message-list li a {
  text-decoration: none;
  color: #666666;
}
.message-list li:hover {
  background-color: #f9f9f9;
}

.el-dropdown-menu .header-pic {
  text-align: center;
  background-color: #108ee9;
  padding: 20px;
}
.el-dropdown-menu .header-pic img {
  vertical-align: middle;
  height: 90px;
  width: 90px;
  border: 3px solid;
  border-color: transparent;
  border-color: hsla(0, 0%, 100%, 0.2);
  background-color: #108ee9;
}
.el-dropdown-menu .header-pic p {
  font-size: 1.5rem;
  color: #ffffff;
}
.el-dropdown-menu .pull-left {
  background-color: #f9f9f9;
  padding: 10px;
  display: inline-block;
  float: left;
}
.el-dropdown-menu .pull-right {
  background-color: #f9f9f9;
  padding: 10px;
  float: right;
  display: inline-block;
}
</style>
