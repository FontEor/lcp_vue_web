<template>
  <div ref="myDiv" :id="dynamicId"></div>
</template>

<script>
export default {
  name: "MarkdownPreview",
  props: {
    value: {
      type: String,
      default: "",
    },
    // 预览后的回调
    after: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      contentPreview: "",
      dynamicId: "",
      idExist: [],
    };
  },
  computed: {
    generateRandomId() {
      return Date.now();
    },
  },
  mounted() {
    this.dynamicId = this.generateRandomId;
    const dom = this.$refs.myDiv;
    // const dom = document.querySelector(this.dynamicId);
    Vditor.preview(dom, this.value, {
      IPreviewOptions: {
        cdn: "/vditor", // 本地地址
      },
      cdn: "/vditor",
      after: () => {
        this.after();
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.markdown-preview ::v-deep {
  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }
  li {
    list-style: inherit;
  }
  a,
  a:focus,
  a:hover {
    color: #4285f4;
    text-decoration: underline;
  }
}
// 表格内容换行展示
.vditor-reset ::v-deep table td,
th {
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
