<template>
  <el-tooltip v-if="currentRole.query" class="item" effect="dark" :content="title" :placement="titlePlace">
    <el-button type="primary" class="header-button" size="small" @click="onRefresh()">
      <i class="icon iconfont icon-shuaxin1"></i>{{btnTitle}}
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GnsButtonRefresh",
  computed: {
    ...mapGetters({
      currentRole: "currentRole"
    })
  },
  props: {
    titlePlace: {
      type: String,
      default: "bottom"
    },
    title: {
      type: String,
      default: "刷新"
    },
    btnTitle: {
      type: String,
      default: ""
    },
    onRefresh: {
      type: Function,
      default() {}
    }
  }
};
</script>
