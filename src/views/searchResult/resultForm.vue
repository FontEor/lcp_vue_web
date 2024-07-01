<template>
  <el-form
    :inline="true"
    ref="form"
    size="big"
    @submit.native.prevent
    class="result-form"
  >
    <el-form-item>
      <el-input
        :value="keyword"
        @input="handleInput"
        class="result-input"
        @keyup.enter.native="fetchData"
        placeholder="请输入关键词"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="fetchData"
      ></el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "ResultForm",
  props: {
    fetchData: {
      type: Function,
      default: () => [],
    },
    keyword: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("update:keyword", e);
    },
  },
};
</script>