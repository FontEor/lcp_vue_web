<template>
  <div class="my-wrap my-pd api-store">
    <div class="my-column">
      <h3 class="my-column-title">API仓库</h3>
      <JsfList
        v-if="interfaceType === 0"
        @updateInterfaceType="updateInterfaceType"
      ></JsfList>
      <HttpList
        v-if="interfaceType === 1"
        @updateInterfaceType="updateInterfaceType"
      ></HttpList>
    </div>
  </div>
</template>

<script>
import JsfList from "./jsfList.vue";
import HttpList from "./httpList.vue";
export default {
  components: {
    JsfList,
    HttpList,
  },
  data() {
    return {
      interfaceType: -1,
    };
  },
  methods: {
    updateInterfaceType(type) {
      this.interfaceType = type;
      if (type === 0) {
        this.$router.push({
          query: { ...this.$route.query, interfaceType: "jsf" },
        });
        return;
      }
      if (type === 1) {
        this.$router.push({
          query: { ...this.$route.query, interfaceType: "http" },
        });
        return;
      }
    },
  },
  mounted() {
    const interfaceType = this.$route.query.interfaceType;
    console.log("interfaceType",interfaceType)
    if (
      interfaceType !== null &&
      interfaceType !== undefined &&
      interfaceType.trim() !== ""
    ) {
      if (interfaceType === "http") {
        this.interfaceType = 1;
        return
      }
      if(interfaceType === "jsf"){
        this.interfaceType = 0;
        return
      } else {
        this.interfaceType = 0;
        this.$router.push({
          query: { ...this.$route.query, interfaceType: "jsf" },
        });
      }
    } else {
      this.interfaceType = 0;
      this.$router.push({
        query: { ...this.$route.query, interfaceType: "jsf" },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
