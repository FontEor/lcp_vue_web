(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1e3dc33a"],{"07b2":function(t,s,a){},"07ea":function(t,s,a){t.exports=a.p+"img/banner-2@2x.49a9ead5.jpg"},"0e6f":function(t,s,a){"use strict";a("07b2")},"215b":function(t,s,a){t.exports=a.p+"img/icon2.fe144157.png"},"389f":function(t,s,a){t.exports=a.p+"img/icon-2-3.1fdd4806.png"},"446a":function(t,s,a){t.exports=a.p+"img/banner-3@2x.50f27bc3.jpg"},"45db":function(t,s,a){t.exports=a.p+"img/icon3.fe8852e4.png"},"51e2":function(t,s,a){t.exports=a.p+"img/icon-3-5@2x.73c97260.png"},"588b":function(t,s,a){t.exports=a.p+"img/icon-3-3@2x.0ad464b4.png"},"5acc":function(t,s,a){t.exports=a.p+"img/icon-3-4@2x.c0e6e792.png"},"608a":function(t,s,a){t.exports=a.p+"img/icon-3-2@2x.124393c2.png"},"78a9":function(t,s,a){t.exports=a.p+"img/banner-4@2x.94a89b68.jpg"},"875d":function(t,s,a){t.exports=a.p+"img/icon-2-5.fac3122f.png"},"8bbf":function(t,s,a){t.exports=a.p+"img/icon-2-2.621d3b3b.png"},"9dbb":function(t,s,a){t.exports=a.p+"img/icon-3-1@2x.79f2703a.png"},b008:function(t,s,a){"use strict";a.r(s);var i=(a("b0c0"),a("ac1f"),a("5319"),a("6aca")),c=a("e110"),e=a("b32d"),n=a("1cbd"),l=a("fea9"),o=a.n(l),r={name:"Home",components:{BlueFooter:c.a},data:function(){return{tabIdx:0,tabList:["安利","奔驰","青岛啤酒"],tabClstagTable:{"安利":["index_1618992416097|43","index_1618992416097|42"],"奔驰":["index_1618992416097|44","index_1618992416097|43"],"青岛啤酒":["index_1618992416097|45","index_1618992416097|44"]},dialogVisible:!1}},computed:{computeAdvertisementClass:function(){return"con clickable"},computeAdvertisementImageSource:function(){return o.a},computeAdvertisementTitle:function(){return"移动端扫一扫组件"},computeAdvertisementContent:function(){return"为移动端APP提供高效、稳定的条形码识别功能"},headImg:function(){return i.a.headImg},name:function(){return i.a.name},user_develop:function(){return i.a.user_develop}},methods:{clstag:function(t,s){return Object(n.a)(t,s)},goToRoute:function(){window.open("//lcp.jdl.com/#/docSoftwareSystem/47/52892","_blank")},handleTab:function(t){this.tabIdx=t},toBeDevelop:function(){if("yes"===i.a.user_develop)i.a.gotoAdmin();else if(!1===i.a.loginState){var t="http://".concat(window.location.host,"/admin/#/apiManager/registerApi"),s=t.indexOf("sso_service_ticket=");s>-1&&(t=t.substring(0,s-1)),sessionStorage.setItem("redirectNextLink",t),i.a.intranetCheckLogin()}},toPublishApi:function(){Object(e.a)({url:"/user/getSelectedSupplierId",method:"get"}).then((function(t){-2===t.data?window.location.href="".concat(window.location.origin,"/#/chooseSupplier"):location.href="".concat(location.origin,"/admin/#/apiManager/registerApi")}))},jumpToIdassChangePassword:function(){window.location.href="".concat(window.env.idaasChangePassword)+window.location.href}},mounted:function(){var t=window.location.href;if(-1!==t.indexOf("host=open.jdl.com")){var s=t.replace("?host=open.jdl.com","");window.history.pushState({},0,s),this.dialogVisible=!0}}},d=r,p=(a("0e6f"),a("2877")),_=Object(p.a)(d,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"home"},[s("div",{staticClass:"top-banner-view"},[s("div",{staticClass:"com-wrapper"},[s("h2",[t._v("京东物流开放平台")]),s("p",[t._v("助力物流新基建，打造智慧供应链")]),["no"===t.user_develop?s("el-button",{staticClass:"btn",attrs:{type:"primary",clstag:t.clstag("index_1618992416097|13","index_1618993059625|12")},on:{click:t.toBeDevelop}},[t._v(" 成为开发者 ")]):t._e(),s("el-button",{staticClass:"btn",attrs:{type:"primary",clstag:t.clstag("index_1618992416097|14","")},on:{click:t.toPublishApi}},[t._v(" 发布API ")])]],2)]),s("div",{staticClass:"platform-view"},[s("div",{staticClass:"com-wrapper"},[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:6}},[s("div",{class:t.computeAdvertisementClass,attrs:{clstag:t.clstag("index_1618992416097|15","index_1618993059625|14")},on:{click:t.goToRoute}},[s("img",{staticClass:"ico",attrs:{src:t.computeAdvertisementImageSource}}),s("dl",{staticClass:"cont"},[s("dt",{staticClass:"tit"},[t._v(t._s(t.computeAdvertisementTitle))]),s("dd",{staticClass:"tip"},[t._v(t._s(t.computeAdvertisementContent))])])])]),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"con",attrs:{clstag:t.clstag("index_1618992416097|16","index_1618993059625|15")}},[s("img",{staticClass:"ico",attrs:{src:a("215b")}}),s("dl",{staticClass:"cont"},[s("dt",{staticClass:"tit"},[t._v("价值供应链")]),s("dd",{staticClass:"tip"},[t._v("为企业提供端到端的数字化供应链咨询和产品")])])])]),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"con",attrs:{clstag:t.clstag("index_1618992416097|17","index_1618993059625|16")}},[s("img",{staticClass:"ico",attrs:{src:a("45db")}}),s("dl",{staticClass:"cont"},[s("dt",{staticClass:"tit"},[t._v("物流视觉")]),s("dd",{staticClass:"tip"},[t._v("从连接到智能，为您提供智慧供应链解决方案")])])])]),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"con",attrs:{clstag:t.clstag("index_1618992416097|18","index_1618993059625|17")}},[s("img",{staticClass:"ico",attrs:{src:a("c76b")}}),s("dl",{staticClass:"cont"},[s("dt",{staticClass:"tit"},[t._v("物流新基建")]),s("dd",{staticClass:"tip"},[t._v("打造物流领域PaaS组件，助力供应链管理升级")])])])])],1)],1)]),s("div",{staticClass:"open-view"},[s("div",{staticClass:"com-wrapper"},[s("h2",{staticClass:"com-view-tit"},[t._v("物流能力 现全面开放")]),s("el-row",{attrs:{gutter:0}},[s("el-col",{staticClass:"aside-wrap",attrs:{span:6}},[s("div",{staticClass:"box"},[s("h3",{staticClass:"tit"},[t._v("热销产品")]),s("ul",{staticClass:"list"},[s("li",{staticClass:"item"},[s("p",{staticClass:"link",attrs:{clstag:t.clstag("index_1618992416097|19","index_1618993059625|18")}},[t._v(" 区块链 ")]),s("div",{staticClass:"cont"},[s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Signatureonthechain"}},target:"_blank",clstag:t.clstag("index_1618992416097|20","index_1618993059625|19")}},[t._v("链上签 ")]),s("span",{staticClass:"dep"},[t._v("|")]),s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Jingyuanchain"}},target:"_blank",clstag:t.clstag("index_1618992416097|21","index_1618993059625|20")}},[t._v("京源链 ")])],1)]),s("li",{staticClass:"item"},[s("p",{staticClass:"link",attrs:{clstag:t.clstag("index_1618992416097|22","index_1618993059625|21")}},[t._v(" 物流视觉 ")]),s("div",{staticClass:"cont"},[s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Monitoringvideonetworking"}},target:"_blank",clstag:t.clstag("index_1618992416097|23","index_1618993059625|22")}},[t._v("视频联网 ")]),s("span",{staticClass:"dep"},[t._v("|")]),s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Intelligentvideoanalysis"}},target:"_blank",clstag:t.clstag("index_1618992416097|24","index_1618993059625|23")}},[t._v("视频分析 ")])],1)]),s("li",{staticClass:"item"},[s("p",{staticClass:"link",attrs:{clstag:t.clstag("index_1618992416097|25","index_1618993059625|24")}},[t._v(" 价值供应链 ")]),s("div",{staticClass:"cont"},[s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Commoditylayout"}},target:"_blank",clstag:t.clstag("index_1618992416097|26","index_1618993059625|25")}},[t._v("商品布局 ")]),s("span",{staticClass:"dep"},[t._v("|")]),s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Intelligentsupplementaryadjustment"}},target:"_blank",clstag:t.clstag("index_1618992416097|27","index_1618993059625|26")}},[t._v("智能补调 ")])],1)]),s("li",{staticClass:"item"},[s("p",{staticClass:"link",attrs:{clstag:t.clstag("index_1618992416097|28","index_1618993059625|27")}},[t._v(" 运筹优化 ")]),s("div",{staticClass:"cont"},[s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Intelligentlocation"}},target:"_blank",clstag:t.clstag("index_1618992416097|29","index_1618993059625|28")}},[t._v("智能选址 ")]),s("span",{staticClass:"dep"},[t._v("|")]),s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Sitesimulation"}},target:"_blank",clstag:t.clstag("index_1618992416097|30","index_1618993059625|29")}},[t._v("场地仿真 ")])],1)])])])]),s("el-col",{staticClass:"main-wrap",attrs:{span:18}},[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:8}},[s("router-link",{staticClass:"con",attrs:{to:{name:"SolveDetail",params:{productCode:"digitalfleet"}},target:"_blank"}},[s("img",{staticClass:"ico",attrs:{src:a("d6b7")}}),s("div",{staticClass:"cont",attrs:{clstag:t.clstag("index_1618992416097|31","index_1618993059625|30")}},[s("h3",{staticClass:"tit"},[t._v("商用数字车队")]),s("p",{staticClass:"para14 te4"},[t._v(" 结合AIOT、智能硬件和边缘计算能力，提供软件硬件一体化的商用车车联网综合SaaS应用和行业细分制定化解决方案。 ")])]),s("el-button",{staticClass:"btn",attrs:{type:"primary",clstag:t.clstag("index_1618992416097|32","index_1618993059625|31")}},[t._v("了解更多")])],1)],1),s("el-col",{attrs:{span:8}},[s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Intelligentlocation"}},target:"_blank"}},[s("img",{staticClass:"ico",attrs:{src:a("8bbf")}}),s("div",{staticClass:"cont",attrs:{clstag:t.clstag("index_1618992416097|33","index_1618993059625|32")}},[s("h3",{staticClass:"tit"},[t._v("智能选址")]),s("p",{staticClass:"para14 te4"},[t._v(" 基于个性化的供给和需求分布、结合算法对建筑设施的地理位置、功能定位做出最优化的方案推荐。 ")])]),s("el-button",{staticClass:"btn",attrs:{type:"primary",clstag:t.clstag("index_1618992416097|34","index_1618993059625|33")}},[t._v("了解更多")])],1)],1),s("el-col",{attrs:{span:8}},[s("router-link",{staticClass:"con",attrs:{to:{name:"SolveDetail",params:{productCode:"Smartfarm"}},target:"_blank"}},[s("img",{staticClass:"ico",attrs:{src:a("389f")}}),s("div",{staticClass:"cont",attrs:{clstag:t.clstag("index_1618992416097|35","index_1618993059625|34")}},[s("h3",{staticClass:"tit"},[t._v("数字农场")]),s("p",{staticClass:"para14 te4"},[t._v(" 种植、加工、存储、运输、销售全流程追溯，结合京东大数据，低成本助力农事分析、决策、农产品/农资销售。 ")])]),s("el-button",{staticClass:"btn",attrs:{type:"primary",clstag:t.clstag("index_1618992416097|36","index_1618993059625|35")}},[t._v("了解更多")])],1)],1)],1),s("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:20}},[s("el-col",{attrs:{span:8}},[s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Salesforecast"}},target:"_blank"}},[s("img",{staticClass:"ico",attrs:{src:a("fcfd")}}),s("div",{staticClass:"cont",attrs:{clstag:t.clstag("index_1618992416097|37","index_1618993059625|36")}},[s("h3",{staticClass:"tit"},[t._v("销量预测")]),s("p",{staticClass:"para14 te4"},[t._v(" 以业务系统数据为基础，利用多维分析和大数据挖掘技术，帮助与京东合作商家，厂商，行业合作伙伴等群体监控物流周转情况、对物流的全环节进行识别和管理、对物流活动进行预测及预警，从而达到降本增效，精准物流管理。 ")])]),s("el-button",{staticClass:"btn",attrs:{type:"primary",clstag:t.clstag("index_1618992416097|38","index_1618993059625|37")}},[t._v("了解更多")])],1)],1),s("el-col",{attrs:{span:8}},[s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"GIS"}},target:"_blank"}},[s("img",{staticClass:"ico",attrs:{src:a("875d")}}),s("div",{staticClass:"cont",attrs:{clstag:t.clstag("index_1618992416097|39","index_1618993059625|38")}},[s("h3",{staticClass:"tit"},[t._v("物流GIS")]),s("p",{staticClass:"para14 te4"},[t._v(" 基于京东多年沉淀的海量地址库、实时轨迹数据，集合GIS大数据机器学习技术，打造权威、精准、智能的物流GIS服务平台。 ")])]),s("el-button",{staticClass:"btn",attrs:{type:"primary",clstag:t.clstag("index_1618992416097|40","index_1618993059625|39")}},[t._v("了解更多")])],1)],1),s("el-col",{attrs:{span:8}},[s("router-link",{staticClass:"con",attrs:{to:{name:"ProductDetail",params:{productCode:"Intelligentscheduling"}},target:"_blank"}},[s("img",{staticClass:"ico",attrs:{src:a("d46e")}}),s("div",{staticClass:"cont",attrs:{clstag:t.clstag("index_1618992416097|41","index_1618993059625|40")}},[s("h3",{staticClass:"tit"},[t._v("智能调度")]),s("p",{staticClass:"para14 te4"},[t._v(" 支持多种优化目标要求下，对揽配的车辆资源安排、线路组织、拜访顺序进行快速调度组织。 ")])]),s("el-button",{staticClass:"btn",attrs:{type:"primary",clstag:t.clstag("index_1618992416097|42","index_1618993059625|41")}},[t._v("了解更多")])],1)],1)],1)],1)],1)],1)]),s("div",{staticClass:"aboutUs-view"},[s("div",{staticClass:"com-wrapper"},[s("h2",{staticClass:"com-view-tit white"},[t._v("关于我们")]),s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:5}},[s("div",{staticClass:"con"},[s("img",{staticClass:"ico",attrs:{src:a("9dbb")}}),s("h3",{staticClass:"tit"},[t._v("物流新基建")]),s("p",{staticClass:"para14"},[t._v(" 为供应链上下游提供基础技术服务，包括基础组件、管理系统、智能优化等组件 ")])])]),s("el-col",{attrs:{span:5}},[s("div",{staticClass:"con"},[s("img",{staticClass:"ico",attrs:{src:a("608a")}}),s("h3",{staticClass:"tit"},[t._v("业务云化")]),s("p",{staticClass:"para14"},[t._v("传统业务云化改造，一体化交付")])])]),s("el-col",{attrs:{span:5}},[s("div",{staticClass:"con"},[s("img",{staticClass:"ico",attrs:{src:a("588b")}}),s("h3",{staticClass:"tit"},[t._v("大数据&AI应用")]),s("p",{staticClass:"para14"},[t._v("智能硬、软件，智慧供应链")])])]),s("el-col",{attrs:{span:5}},[s("div",{staticClass:"con"},[s("img",{staticClass:"ico",attrs:{src:a("5acc")}}),s("h3",{staticClass:"tit"},[t._v("行业云场景")]),s("p",{staticClass:"para14"},[t._v("政府物资物流监控调度，安全合规")])])]),s("el-col",{attrs:{span:5}},[s("div",{staticClass:"con"},[s("img",{staticClass:"ico",attrs:{src:a("51e2")}}),s("h3",{staticClass:"tit"},[t._v("最佳实践")]),s("p",{staticClass:"para14"},[t._v("电商、服务、汽后等多行业经验沉淀")])])])],1)],1)]),s("div",{staticClass:"goodness-view"},[s("div",{staticClass:"com-wrapper"},[s("h2",{staticClass:"com-view-tit"},[t._v("应用场景")]),s("div",{staticClass:"com-view-tabs"},t._l(t.tabList,(function(a,i){return s("a",{key:i,staticClass:"tab",class:{active:t.tabIdx==i},attrs:{clstag:t.clstag(t.tabClstagTable[a][0]||"",t.tabClstagTable[a][1]||"")},on:{click:function(s){return t.handleTab(i)}}},[t._v(" "+t._s(a)+" ")])})),0),s("div",{staticClass:"tab-box"},[0===t.tabIdx?s("div",{staticClass:"tab-con cf"},[s("img",{staticClass:"bg",attrs:{src:a("07ea")}}),t._m(0)]):t._e(),1===t.tabIdx?s("div",{staticClass:"tab-con cf"},[s("img",{staticClass:"bg",attrs:{src:a("446a")}}),t._m(1)]):t._e(),2===t.tabIdx?s("div",{staticClass:"tab-con cf"},[s("img",{staticClass:"bg",attrs:{src:a("78a9")}}),t._m(2)]):t._e()])])]),s("BlueFooter"),s("el-dialog",{staticClass:"dialog",attrs:{title:"升级公告",visible:t.dialogVisible,"close-on-click-modal":!1,"show-close":!1,width:"800px"},on:{"update:visible":function(s){t.dialogVisible=s}}},[s("div",{staticClass:"title"},[s("span",[t._v("尊敬的京东物流客户您好：")])]),s("div",{staticClass:"content"},[s("span",[t._v("为更好的服务于广大客户，即日起，物流技术开放平台正式升级为物流开放平台，平台主要优化了以下内容：")])]),s("div",{staticClass:"content"},[s("span",[t._v("1、网站界面升级")])]),s("div",{staticClass:"content"},[s("span",[t._v("2、更流畅的操作体验")])]),s("div",{staticClass:"content"},[s("span",[t._v("3、更丰富可用的API")])]),s("div",{staticClass:"content"},[s("span",[t._v("4、更安全稳定的运行模式")])]),s("div",{staticClass:"content"},[s("span",{staticClass:"focus-content"},[t._v("如果您之前注册过物流技术开放平台，为了不影响使用，请务必进行如下操作：")])]),s("div",{staticClass:"content"},[s("span",[t._v("1、点击"),s("el-button",{attrs:{type:"text"},on:{click:t.jumpToIdassChangePassword}},[t._v("忘记密码")]),t._v("，进行密码重置；")],1)]),s("div",{staticClass:"content"},[s("span",[t._v("2、登录成功后进入【控制台-个人中心-用户管理】，点击添加用户，邀请您团队的成员重新加入物流开放平台。")])]),s("div",{staticClass:"content"},[s("span",[t._v("若无法找回密码，请联系官方客服：133-6632-0890。")])]),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"button",attrs:{type:"primary"},on:{click:t.jumpToIdassChangePassword}},[t._v("忘记密码")]),s("el-button",{staticClass:"button",on:{click:function(s){t.dialogVisible=!1}}},[t._v("知道了")])],1)])],1)}),[function(){var t=this,s=t._self._c;return s("div",{staticClass:"cont"},[s("h3",{staticClass:"tit"},[t._v("安利")]),s("p",{staticClass:"para14"},[t._v(" 京东物流与安利（中国）日用品有限公司战略合作。京东物流成为安利（中国）最大的物流供应链服务商，提供端到端供应链一体化解决方案和仓配服务，为安利在中国的业务发展提供强有力的支撑。 ")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"cont"},[s("h3",{staticClass:"tit"},[t._v("奔驰")]),s("p",{staticClass:"para14"},[t._v(" 京东物流与奔驰(中国)汽车销售有限公司达成合作，京东物流为奔驰提供定制化供应链解决方案。双方合作首先在上海18家4S店展开，配送商品为轮胎，B2B订单配送，分极速配送和普通单两大类。 ")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"cont"},[s("h3",{staticClass:"tit"},[t._v("青岛啤酒")]),s("p",{staticClass:"para14"},[t._v(" 京东物流与青岛啤酒继仓配业务之后进一步深化合作，通过综合考虑青岛啤酒的生产运输成本仓储等成本参数，同时加入工厂产能限制、要货限制等业务限制条件，为青岛啤酒提供啤酒从工厂生产到运输的流向流量等一系列的综合供应链优化的解决方案，为指导青岛啤酒的供应链网络发展提供战略方向。是京东物流价值供应链与LLamasoft双方通过资源共享、技术创新、协同合作，发挥各自优势，共同推动中国供应链转型升级的最佳实践。 ")])])}],!1,null,"3dce8005",null);s.default=_.exports},c76b:function(t,s,a){t.exports=a.p+"img/icon4.4e56569c.png"},d46e:function(t,s,a){t.exports=a.p+"img/icon-2-6.632c4968.png"},d6b7:function(t,s,a){t.exports=a.p+"img/icon-2-1.47749181.png"},db0c:function(t,s,a){},e110:function(t,s,a){"use strict";var i=a("48ea"),c={data:function(){return{isIntranet:Object(i.a)()}}},e=(a("edb5"),a("2877")),n=Object(e.a)(c,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"com-blue-footer"},[s("div",{staticClass:"com-wrapper"},[s("el-row",{attrs:{gutter:70}},[s("el-col",{attrs:{span:12}},[s("p",{staticClass:"big-tip"},[t._v(t._s(t.$t("views.BlueFooter.5iwcptg52fg0")))])]),t.isIntranet?[s("el-col",{attrs:{span:6}},[s("p",{staticClass:"tip"},[t._v(t._s(t.$t("views.BlueFooter.5iwcptg53bk0")))]),s("p",{staticClass:"mini-tip"},[t._v(" "+t._s(t.$t("views.BlueFooter.5iwcptg53eg0"))+" 9:00 - 18:00 ")])]),s("el-col",{attrs:{span:6}},[s("p",{staticClass:"tip"},[t._v(t._s(t.$t("views.BlueFooter.5iwcptg53ho0")))]),s("p",{staticClass:"mini-tip"},[t._v(" "+t._s(t.$t("views.BlueFooter.5iwcptg53eg0"))+" 9:00 - 18:00 ")])])]:t._e()],2)],1)])}),[],!1,null,"2f8d9a7d",null);s.a=n.exports},edb5:function(t,s,a){"use strict";a("db0c")},fcfd:function(t,s,a){t.exports=a.p+"img/icon-2-4.89b3ed0d.png"},fea9:function(t,s,a){t.exports=a.p+"img/icon1.bd9fc6a5.png"}}]);