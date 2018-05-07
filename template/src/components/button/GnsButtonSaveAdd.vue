<template>
  <el-button v-if="currentRole.insert" type="primary" size="small" @click="onSaveAdd">
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
    titlePlace: {
      type: String,
      default: "bottom"
    },
    btnTitle: {
      type: String,
      default: "保存"
    },
    onSaveAdd: {
      type: Function,
      default() {}
    }
  }
};
</script>
