<template>
  <el-button v-if="currentRole.update" type="primary" size="small" @click="onSaveEdit()">
    {{btnTitle}}
  </el-button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GnsButtonSaveEdit",
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
    onSaveEdit: {
      type: Function,
      default() {}
    }
  }
};
</script>
