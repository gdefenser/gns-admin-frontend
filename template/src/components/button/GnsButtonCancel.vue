<template>
  <el-button type="warning" size="small" @click="onCancel()">
    {{btnTitle}}
  </el-button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GnsButtonSaveAdd",
  computed: {
    ...mapGetters({
      currentRole: "currentRole"
    })
  },
  props: {
    btnTitle: {
      type: String,
      default: "取消"
    },
    onCancel: {
      type: Function,
      default() {}
    }
  }
};
</script>
