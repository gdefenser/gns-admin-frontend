<template>
  <el-tooltip v-if="currentRole.insert" class="item" effect="dark" :content="title" :placement="titlePlace">
    <el-button type="primary" class="header-button" size="small"  @click="onAdd()">
      <i class="icon iconfont icon-xinzeng"></i>{{btnTitle}}
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GnsButtonAdd",
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
    btnTitle: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "新增"
    },
    onAdd: {
      type: Function,
      default() {}
    }
  }
};
</script>
