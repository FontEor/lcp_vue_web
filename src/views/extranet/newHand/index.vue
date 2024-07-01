<template>
  <div class="new-hand newHand-page">
    <el-container class="new-hand__container">
      <el-aside class="container__aside aside-view" width="290px">
        <router-link
          v-for="item in this.items"
          :key="item.id"
          :to="{ name: 'NewHand', params: { docId: item.id } }"
          class="link"
          style="background: transparent; border-left: none"
          >{{ item.title }}</router-link
        >
      </el-aside>

      <el-main v-if="this.$route.params.docId && findItem" class="main-view">
        <div class="markdown-preview-wrapper">
          <MarkdownPreview
            v-if="docContent"
            v-model="docContent"
            class="markdown-preview"
          />
        </div>
        <BlackFooter />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import BlackFooter from "@/components/extranet/Footer/blackFooter.vue";
import request from "@/utils/request";

export default {
  name: "NewHand",
  components: { MarkdownPreview, BlackFooter },
  data() {
    return {
      idx: 0,
      items: [],
      docContent: "",
      newHandType: 1,
    };
  },
  computed: {
    findItem() {
      const list = this.items;
      const id = this.$route.params.docId;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.id == id) {
          this.fetchDoc(item);
          return item;
        }
      }
      return null;
    },
  },
  methods: {
    fetchDocList() {
      const url = "doc/getReleaseDocList";
      request({
        url,
        method: "get",
        params: { type: this.newHandType },
      })
        .then((resp) => {
          this.items = resp.data.list;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    fetchDoc(val) {
      const url = "doc/getReleaseDoc";
      request({
        url,
        method: "get",
        params: { type: this.newHandType, title: val.title },
      })
        .then((resp) => {
          this.docContent = resp.data.content;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.fetchDocList();
  },
  mounted() {
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: visible");
  },
  destroyed() {
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: hidden");
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/doc.scss";

.new-hand {
  .new-hand__container {
    background-color: #fff;

    .container__aside {
      position: sticky;
      top: 60px;
      height: calc(100vh - 60px);
      overflow: auto;
      background-color: #f6f7fc;
    }

    .main-view {
      padding: 0;

      .markdown-preview-wrapper {
        min-height: calc(100vh - 188px);
        .markdown-preview {
          padding: 0 20px;
        }
      }

      .black-footer {
        position: relative;

        ::v-deep .black-footer-license-content {
          width: 890px;
        }
      }
    }
  }
}

.newHand-page {
  width: 98vw;
}
</style>
