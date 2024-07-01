<template>
  <div class="like" ref="fixed">
    <div class="like-image button-image" @click="handleLikeButton">
      <img :src="computeLikeImage" style="width: 100%" />
    </div>
    <div class="dislike-image button-image" @click="handleDislikeButton">
      <img :src="computeDislikeImage" style="width: 100%" />
    </div>
  </div>
</template>

<script>
import likeImage from "@/assets/ToTop/like.png";
import likeChoseImage from "@/assets/ToTop/like_chose.png";
import dislikeImage from "@/assets/ToTop/dislike.png";
import dislikeChoseImage from "@/assets/ToTop/dislike_chose.png";
import api from "@/api/index";
import isIntranet from "@/utils/isIntranet";

export default {
  name: "Like",
  data() {
    return {
      likeImageTable: { false: likeImage, true: likeChoseImage },
      dislikeImageTable: { false: dislikeImage, true: dislikeChoseImage },
      likeIsChose: false,
      dislikeIsChose: false,
      likeIsDisabled: false,
      dislikeIsDisabled: false,
      timer: null,
    };
  },
  computed: {
    computeLikeImage() {
      return this.likeImageTable[this.likeIsChose];
    },
    computeDislikeImage() {
      return this.dislikeImageTable[this.dislikeIsChose];
    },
  },
  watch: {
    $route: {
      handler() {
        this.likeIsChose = false;
        this.dislikeIsChose = false;
        this.likeIsDisabled = false;
        this.dislikeIsDisabled = false;
        this.timer = null;
      },
      deep: true,
    },
    likeIsChose(isChose) {
      this.dislikeIsDisabled = isChose;
      if (isChose) {
        document.querySelector(".like-image").classList.add("isChose");
        document.querySelector(".dislike-image").classList.add("isDisabled");
      } else {
        document.querySelector(".like-image").classList.remove("isChose");
        document.querySelector(".dislike-image").classList.remove("isDisabled");
      }
      this.requestLikeOrDislikeData(true, !isChose);
    },
    dislikeIsChose(isChose) {
      this.likeIsDisabled = isChose;
      if (isChose) {
        document.querySelector(".dislike-image").classList.add("isChose");
        document.querySelector(".like-image").classList.add("isDisabled");
      } else {
        document.querySelector(".dislike-image").classList.remove("isChose");
        document.querySelector(".like-image").classList.remove("isDisabled");
      }
      this.requestLikeOrDislikeData(false, !isChose);
    },
  },
  methods: {
    handleLikeButton() {
      if (this.dislikeIsChose) return;
      this.likeIsChose = !this.likeIsChose;
    },
    handleDislikeButton() {
      if (this.likeIsChose) return;
      this.dislikeIsChose = !this.dislikeIsChose;
    },
    async requestLikeOrDislikeData(like, reverse) {
      const url = `${window.location.href.split("//")[1]}`;
      const data = { url, like, reverse };
      const response = await api.likeOrDisLike
        .postDocEvaluationData(data)
        .catch((error) => {
          throw error;
        });
    },
    resizeFixed() {
      const app = document.querySelector("#app");
      const fixed = this.$refs["fixed"];
      fixed.style.right =
        app.clientWidth > 1480
          ? `${parseInt((app.clientWidth - 1200) / 2) - 40}px`
          : "20px";
      if (!this.timmer) {
        this.timer = setTimeout(() => {
          this.timer = null;
          fixed.style.right =
            app.clientWidth > 1480
              ? `${parseInt((app.clientWidth - 1200) / 2) - 40}px`
              : "20px";
        }, 300);
      }
    },
  },
  mounted() {
    if (isIntranet()) {
      const app = document.querySelector("#app");
      const fixed = this.$refs["fixed"];
      fixed.style.right =
        app.clientWidth > 1480
          ? `${parseInt((app.clientWidth - 1200) / 2) - 40}px`
          : "20px";
      window.addEventListener("resize", this.resizeFixed);
    }
  },
  destroyed() {
    if (isIntranet()) {
      window.removeEventListener("resize", this.resizeFixed);
    }
  },
};
</script>

<style lang="scss" scoped>
.like {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 350px;
  right: 0;
  z-index: 3;
  .button-image {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 2, 0.12);
    border-radius: 4px;
    background: #ecf1fe;
    margin-top: 8px;
    padding: 8px;
    width: 36px;
    height: 36px;
    opacity: 0.9;
    transition: opacity 0.1s;
    transition: background-color 0.1s;
    user-select: none;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .isChose {
    background-color: #3c6ef0;
  }
  .isDisabled {
    cursor: not-allowed;
  }
}
</style>