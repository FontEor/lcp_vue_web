<template>
  <div>
    <div class="mini-banner-view">
      <div class="com-wrapper">
        <h2 class="tit">{{jsonObj.title}}</h2>
        <p class="tip">{{jsonObj.content}}</p>
      </div>
    </div>
    <div class="com-subnav">
      <div class="com-subnav-tabs" :class="{'is_fixed' : isFixed}" ref="menuWrapper">
        <a
        v-for="(item,index) in subnavTabList"
        :key="index"
        class="tab"
        :class="{active: currentIndex == index}"
        @click.stop.prevent="selectMenu(index)">
          {{item}}
        </a>
      </div>
    </div>
    <div ref="viewsWrapper" class="viewsWrapper">
      <div class="line-view view-item">
        <div class="tab-box com-wrapper">
          <h2 class="tab-tit">{{jsonObj.productArchitecture.title}}</h2>
          <div>
               <img :src="require(`@/assets/img/solveDetail/`+jsonObj.productArchitecture.src)" class="cont">
          </div>
        </div>
      </div>
      <div class="plan-view view-item">
        <div class="com-wrapper">
          <h2 class="com-view-tit">{{jsonObj.programAdvantages.title}}</h2>
          <el-row :gutter="60">
              <el-col :span="6"  v-for="programAdvantages in jsonObj.programAdvantages.content" :key="programAdvantages.id">
                  <div  class="con">
                  <img :src="require(`@/assets/img/solveDetail/`+programAdvantages.src)" class="ico">
                  <h3 class="tit">{{programAdvantages.title}}</h3>
                  <p class="tip">{{programAdvantages.content}}</p>
                  </div>
              </el-col>
            </el-row>
        </div>
      </div>
      <div class="goodness-view view-item">
        <div class="com-wrapper">
          <h2 class="com-view-tit">{{jsonObj.operationalResearchOptimization.title}}</h2>
          <div class="com-view-tabs">
            <a v-for="(item,i) in tabList" :key="i" @click="handleTab(i)" class="tab" :class="{active: tabIdx == i}">
              {{item}}
            </a>
          </div>
           <div class="tab-box">
              <div v-for="operationalResearchOptimization in jsonObj.operationalResearchOptimization.content" :key="operationalResearchOptimization.id"  class="tab-con cf">
                <div v-if="tabIdx == operationalResearchOptimization.id">
                    <img :src="require(`@/assets/img/solveDetail/`+operationalResearchOptimization.src)" class="bg">
                    <div class="cont">
                      <p class="para14">{{operationalResearchOptimization.content}}</p>
                      <!-- <a href="javascript:;" class="btn">
                        <el-button type="text"><a :href="operationalResearchOptimization.url" target="_blank">查看详情</a><i class="el-icon-right el-icon&#45;&#45;right"></i></el-button>
                      </a> -->
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
      <div v-if="jsonObj.relatedProducts.content.length>0" class="rel-product-view view-item">
        <div class="com-wrapper">
           <h2 class="com-view-tit">{{jsonObj.relatedProducts.title}}</h2>
            <div class="box-wrap">
              <div class="box">
                <el-row :gutter="60">
                  <el-col
                  :span="jsonObj.relatedProducts.content.length==4 ? 6: jsonObj.relatedProducts.content.length == 3 ? 8: 12"
                  v-for="relatedProducts in jsonObj.relatedProducts.content"
                  :key="relatedProducts.id">
                    <div class="con">
                      <h3 class="tit">{{relatedProducts.title}}</h3>
                      <p class="para14">{{relatedProducts.content}}</p>
                      <!-- <el-button plain class="btn"><a :href="relatedProducts.url" target="_blank">查看详情</a></el-button> -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
        </div>
      </div>
    </div>
  <blue-footer/>
  </div>
</template>

<script>
import { SappModule } from '@/store/common/modules/app'
import BlueFooter from '@/components/views/BlueFooter'

export default {
  components: { BlueFooter },
  data() {
    return {
      isFixed: false,
      scrollY: 0,
      offsetTop: 0,
      listHeight: [],
      tabIdx: 0,
      subnavTabList: [
        '方案架构',
        '方案优势',
        '应用场景',
        '相关产品'
      ],
      tabList: [],
      jsonObj: ''
    }
  },
  created() {
    const { productCode } = this.$route.params
    this.jsonObj = require(`../../data/solution/${productCode}.json`)
    if (!this.jsonObj.relatedProducts.content.length) {
      this.subnavTabList.pop()
    }
    this.tabList = new Array()
    const { content } = this.jsonObj.operationalResearchOptimization
    if (content) {
      const _this = this
      content.forEach((item) => {
        _this.tabList.push(item.title)
      })
    }
  },
  computed: {
    currentIndex() {
      if (!this.isFixed) {
        return 0
      }
      for (let i = 0, len = this.listHeight.length; i < len; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    handleTab(idx) {
      this.tabIdx = idx
    },
    calculateHeight() {
      const viewList = this.$refs.viewsWrapper.getElementsByClassName('view-item')
      let height = 300
      this.listHeight.push(height)
      for (let i = 0, len = viewList.length; i < len; i++) {
        const item = viewList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index) {
      console.log(index)
      const viewList = this.$refs.viewsWrapper.getElementsByClassName('view-item')
      const el = viewList[index]
      if (window.scrollTo) {
        window.scrollTo({ behavior: 'smooth', top: el.offsetTop - 60 })
      }
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollY = Math.abs(Math.round(scrollTop))
      this.isFixed = scrollTop >= this.offsetTop
      if (scrollTop >= this.offsetTop) {
        SappModule.SET_NAVBAR_FIXED(false)
      } else {
        SappModule.SET_NAVBAR_FIXED(true)
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(() => {
      this.offsetTop = this.$refs.menuWrapper.offsetTop
      this.calculateHeight()
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    SappModule.SET_NAVBAR_FIXED(true)
  }
}
</script>

<style lang="scss" scoped>
.mini-banner-view{
  background:#2738AC url("~@/assets/img/solveDetail/banner.jpg") top center no-repeat;
  background-size:auto 100%;
}
.line-view{
  min-height:562px;
  max-height:813px;
  background:#fff url('~@/assets/img/solveDetail/bg-1.jpg') bottom center no-repeat;
  background-size: 100% 320px;
  .tab-box{
    padding:60px 0;
    .tab-tit{
      text-align:center;
      font-size:24px;
      margin-bottom:30px;
    }
    .cont{
      height:auto;
      margin:0 auto;
      width:100%;
      // background:url('~@/assets/img/solveDetail/data.png') top center no-repeat;
      background-size: auto 100%;
    }
  }
}
.plan-view{
  padding:60px 0;
  background:#fff;
  .con{
    text-align: center;
    .ico{
      width:48px;
      height:48px;
      display:block;
      margin:0 auto;
    }
    .tit{
      font-size:18px;
      margin-top:20px;
    }
    .tip{
      display:inline-block;
      font-size:15px;
      color:#999;
      margin-top:10px;
      text-align: left;
    }
    .btn{
      font-size:15px;
      display: block;
      margin: 15px auto 0;
    }
  }
}
.goodness-view{
  background:#F4F5FA url('~@/assets/img/solveDetail/bg-2.jpg') bottom center no-repeat;
  background-size: 100% 650px;
  padding:60px 0;
  .com-view-tit{
    margin-bottom:20px;
  }
  .tab-box{
    margin-top:20px;
    height:400px;
    background:#fff url('~@/assets/img/common/decorate.jpg') left 20px bottom 20px no-repeat;
    background-size: 171px 132px;
    padding:40px;
    .tit{
      font-size:16px;
    }
    .para14{
      margin:10px 0;
    }
    .bg{
      float:right;
      width:517px;
      height:320px;
      margin-left:40px;
    }
    .btn{
      display:block;
      margin-top:20px;
    }
  }
}
.rel-product-view{
  padding:60px 0 40px;
  background:#fff url('~@/assets/img/solveDetail/bg-3.png') top center no-repeat;
  background-size: 100% 420px;
  .box-wrap{
    text-align: center;
    .box{
      display:inline-block;
      text-align: left;
    }
  }
  .tit{
    font-size:18px;
    text-align: center;
    padding-bottom:15px;
    border-bottom:1px solid #eaeaea;
    margin-bottom:10px;
  }
  .btn{
    display:block;
    margin:16px auto 0;
    border-radius: 0px;
  }
}
</style>
