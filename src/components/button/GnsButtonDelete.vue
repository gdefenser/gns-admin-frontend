<template>
  <el-tooltip v-if="currentRole.delete" class="item" effect="dark" :content="title" :placement="titlePlace">
    <el-button type="danger" size="small" @click="onDelete(objId)">
      <i class="icon iconfont icon-shanchu1 data-table-button"></i>{{btnTitle}}
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GnsButtonDelete",
  computed: {
    ...mapGetters({
      currentRole: "currentRole"
    })
  },
  props: {
    titlePlace: {
      type: String,
      default: "right"
    },
    objId: {
      type: Object,
      default: ""
    },
    title: {
      type: String,
      default: "删除"
    },
    btnTitle: {
      type: String,
      default: ""
    },
    onDelete: {
      type: Function,
      default(id) {}
    }
  }
};
</script>
