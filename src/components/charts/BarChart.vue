<template>
    <!-- 柱形图 -->
    <div :id="id" :class="className" :config="config" :data="data" :style="{ height:height, width:width }" />
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
        default: '268px'
      },
      height: {
        type: String,
        default: '300px'
      },
      config: {
        type: Object,
        default: null
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
        this.chart = echarts.init(document.getElementById(this.id))
        this.initChart(this.chart,this.config,this.data)
        this.chart.resize()
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
      initChart(myChart,config,data){
        const option = {
          color: config.color,
          title: data.title,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {show: config.saveAsImage?config.saveAsImage:false}//下载
            }
          },
          grid: {
            top: config.gridTop?config.gridTop:'10',
            left: config.gridLeft? config.gridLeft: '0',
            right: config.gridRight? config.gridRight: '0',
            bottom: config.gridBottom? config.gridBottom: '55',
            containLabel: true
          },
          legend: {
            left: config.legendLeft? config.legendLeft:'10px',
            bottom: config.legendBottom? config.legendBottom:'20px',
            data: data.legendData
          },
          xAxis: [
            {
              type: 'category',
              data: data.xData,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: config.yType?config.yType:'value',
              // min: config.yMin?config.yMin:0,
              // max: config.yMax?config.yMax:1000,
              // interval: config.yInterval?config.yInterval:200,
              data:data.yData,
              splitLine: {
                lineStyle: {
                  color: ['#f3f3f3']
                }
              }
            }
          ],
          series: data.series
        }
        myChart.setOption(option);
      }
    },   
  }
</script>
