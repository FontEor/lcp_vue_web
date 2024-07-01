<template>
    <!-- 饼状图 -->
    <div :id="id" :class="className" :style="{ height:height, width:width }" :data="data" />
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
     props: {
      id: {
        type: String,
        default: 'chart'
      },
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      data:{
        type: Object,
        default: null
      }
    },
    data() {
      return {
        chart:null
      }
    },
    mounted() {
      this.$nextTick(() => {
       this.initChart(this.id,this.data)
      })
    },
     beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart(ele,data){
      let chart = echarts.init(document.getElementById(ele))
        chart.setOption({
          color: ['#F56F23', '#F8E71C'],
          title: {
            text: data.title,
            left: 'center',
            textStyle: {
              color: '#2b2b2b',
              fontSize: 14,
              fontWeight: 'bold'
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: data.seriesData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    }
  }
</script>
