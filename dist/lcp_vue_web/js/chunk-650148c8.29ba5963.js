(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-650148c8"],{"396d":function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var a=i("b32d");function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;return Object(a.a)({url:"/bizapinterface/getBizUnitApiScrollPage",method:"get",params:{unitId:t,lastId:e,size:i}}).then((function(t){return t.data}))}},"39e5":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"a",(function(){return r})),i("99af"),i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),i("9861"),i("88a7"),i("271a"),i("5494");var a=i("bc3a"),s=i.n(a),n=i("b32d");function o(){return Object(n.a)({url:"/bizapinterface/getUsingBaseSdkList",method:"get"}).then((function(t){return t.data}))}function r(t,e){null!=e&&s.a.create({baseURL:window.env.gatewayFileBaseApi,withCredentials:!0,timeout:1e5,headers:{"LOP-DN":window.env.gatewayUploadLopDn,fileName:t},responseType:"blob"})({url:"/lop/file/download",method:"get"}).then((function(t){var i=new Blob([t.data],{type:"application/octet-stream"});if(void 0!==window.navigator.msSaveBlob)window.navigator.msSaveBlob(i,decodeURI(e));else{var a=window.URL.createObjectURL(i),s=document.createElement("a");s.style.display="none",s.href=a,s.setAttribute("download",decodeURI(e)),void 0===s.download&&s.setAttribute("target","_blank"),document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(a)}})).catch((function(t){}))}},"45e1":function(t,e,i){"use strict";i("e512")},"6a72":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"a",(function(){return r})),i("99af"),i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),i("9861"),i("88a7"),i("271a"),i("5494");var a=i("b32d"),s=i("bc3a"),n=i.n(s);function o(t){var e={unitId:t,lastId:arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,size:arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3};return Object(a.a)({url:"/sdk/getBizUnitSdkScrollPage",method:"get",params:e}).then((function(t){return t.data}))}function r(t){var e=encodeURI(t);null!=e&&n.a.create({baseURL:window.env.gatewayFileBaseApi,withCredentials:!0,timeout:1e5,headers:{"LOP-DN":window.env.gatewayUploadLopDn,fileName:e},responseType:"blob"})({url:"/lop/file/download",method:"get"}).then((function(t){var i=new Blob([t.data],{type:"application/octet-stream"});if(void 0!==window.navigator.msSaveBlob)window.navigator.msSaveBlob(i,decodeURI(e));else{var a=window.URL.createObjectURL(i),s=document.createElement("a");s.style.display="none",s.href=a,s.setAttribute("download",decodeURI(e)),void 0===s.download&&s.setAttribute("target","_blank"),document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(a)}})).catch((function(t){}))}},"7a3ac":function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var a=i("b32d");function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;return Object(a.a)({url:"/bizmsg/getBizUnitMsgs",method:"get",params:{unitId:t,lastId:e,pageSize:i}}).then((function(t){return t.data}))}},e512:function(t,e,i){},f52a:function(t,e,i){"use strict";i.r(e),i("b0c0"),i("a4d3"),i("e01a");var a=i("b85c"),s=(i("99af"),i("14d9"),i("a9e3"),i("b32d"));var n=i("396d"),o=i("7a3ac"),r=i("6a72"),c=i("39e5"),l=i("79f6"),u=i("1cbd"),d=i("6aca"),p={data:function(){return{id:"",bizUnit:{id:null,name:null,remark:null},tagList:["tag"],bizFlows:[],activeName:"api",bizApis:[],tableBasicSdk:[],bizSdks:[],bizMessages:[],how2OrderPath:"",javaSdkFileName:"",phpSdkFileName:"",loginDialogVisible:!1,updateVersionUrl:window.env.sdkUpdateVersion,docId:null}},methods:{gotoLogin:function(){d.a.extranetCheckLogin()},clstag:function(t,e){return Object(u.a)(t,e)},tabClick:function(t){var e=document.createElement("div");e.setAttribute("clstag",this.clstag("",{api:"quick_1618993292181|4",sdk:"quick_1618993292181|5",message:"quick_1618993292181|6"}[t.name]||"")),document.body.appendChild(e),e.click(),e.remove()},goToExplain:function(){window.open("//".concat(window.location.host,"/#/").concat(window.env.docSdk,"?id=").concat(this.id),"_blank")},routeToApiQuick:function(t){this.$router.push({name:"ApiDocDetail",params:{unitId:this.id,docId:t}})},routeToMessageQuick:function(t){this.$router.push({name:"MessageDocDetail",params:{unitId:this.id,docId:t}})},routeToHow2Order:function(){this.getMenuList()},getMenuList:function(){var t=this;Object(s.a)({url:"/doc/getDocByGroupByTree",method:"get",params:{objId:this.id}}).then((function(e){t.menuList=e.data,t.menuList[1].children[0].children?t.docId=t.menuList[1].children[0].children[0].id:t.docId=t.menuList[1].children[0].id,t.$router.push({name:"AccessGuideDetail",params:{unitId:t.id,docId:t.docId}})})).catch((function(t){}))},routeToDoc:function(t){this.$router.push({name:"AccessGuide",params:{unitId:this.id}})},foundDoc:function(t,e,i){var s,n=Object(a.a)(t);try{for(n.s();!(s=n.n()).done;){var o=s.value;if(Number(o.objId)===Number(e)){var r,c=Object(a.a)(o.docList);try{for(c.s();!(r=c.n()).done;){var l=r.value;if(l.title===i)return l}}catch(t){c.e(t)}finally{c.f()}}}}catch(t){n.e(t)}finally{n.f()}return null},downloadSdk:function(t){null==t||""===t?this.$message.error(this.$t("express.Quick.5ivh9xqcgzg5")):Object(r.a)(t)},downloadBasicSdk:function(t,e){Object(c.a)(t,e)},handleGatewayError:function(t){this.$message.error(t.response.data.error_response.zh_desc)},getBizUnitData:function(){var t=this;Object(n.a)(Number(this.id)).then((function(e){return t.bizApis=e})).catch((function(e){return t.handleGatewayError(e)})),Object(o.a)(Number(this.id)).then((function(e){return t.activeName="message"!==t.activeName||e&&e.length>0?t.activeName:"api",t.bizMessages=e})).catch((function(e){return t.handleGatewayError(e)})),function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;return Object(s.a)({url:"/bizunit/getBizUnitFlowScrollPage",method:"get",params:{unitId:t,lastId:e,size:i}}).then((function(t){return t.data}))}(Number(this.id)).then((function(e){return t.bizFlows=e})),Object(r.b)(Number(this.id),0,2147483647).then((function(e){return t.bizSdks=e}))}},created:function(){this.id=this.$route.query.id,this.how2OrderPath="".concat(window.env.docHow2Order),this.javaSdkFileName="lop-opensdk-support.jar",this.phpSdkFileName="lop-opensdk-php.zip"},mounted:function(){var t=this;this.activeName=this.$route.query.tab||"api",Object(c.b)().then((function(e){return t.tableBasicSdk=e})),function(t){return Object(s.a)({url:"/bizunit/getBizUnitById",method:"get",params:{id:t}}).then((function(t){return t.data}))}(Number(this.id)).then((function(e){e?1===e.publishRange?setTimeout((function(){if(d.a.loginState){var i=t.id;l.a.bizSupplier.checkBizUnitVisibleSupplier(i).then((function(i){i.data?(t.bizUnit=e,t.getBizUnitData()):t.$router.push({name:"OpenBusiness",params:{fromUrl:"noAuthority"}})})).catch((function(t){}))}else t.loginDialogVisible=!0}),200):(t.bizUnit=e,t.getBizUnitData()):t.$router.push("/404")})).catch((function(e){return t.handleGatewayError(e)}))}},h=p,v=(i("45e1"),i("2877")),f=Object(v.a)(h,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"express-quick-page"},[e("div",{staticClass:"banner-view",attrs:{clstag:t.clstag("","quick_1618993292181|1")}},[e("div",{staticClass:"com-wrapper"},[e("h2",{staticClass:"tit"},[t._v(t._s(t.bizUnit.name))]),e("p",{staticClass:"tip"},[t._v(t._s(t.bizUnit.remark))]),e("div",{staticClass:"btn-wrap"},[e("a",{staticClass:"btn-link",attrs:{href:"javascript:;"},on:{click:t.routeToHow2Order}},[e("el-button",{staticClass:"com-br",attrs:{type:"primary",clstag:t.clstag("","quick_1618993292181|2")}},[t._v(" "+t._s(t.$t("express.Quick.5ivh9xqcen80")))])],1),e("a",{staticClass:"btn-link",attrs:{href:"javascript:;"},on:{click:function(e){t.routeToDoc(t.$t("express.Quick.5ivghup4rzo0"))}}},[e("el-button",{staticClass:"com-br",attrs:{plain:"",clstag:t.clstag("","quick_1618993292181|3")}},[t._v(" "+t._s(t.$t("express.Quick.5ivh9xqcfe80")))])],1)])])]),e("div",{staticClass:"table-view"},[e("div",{staticClass:"com-wrapper"},[e("el-tabs",{on:{"tab-click":t.tabClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:t.$t("express.Quick.5ivh9xqcfhs0"),name:"api"}},[e("div",{staticClass:"list"},[e("el-table",{staticClass:"my-table mb2",staticStyle:{width:"960px"},attrs:{data:t.bizApis,height:"528"}},[e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcfl80"),width:"300","show-tooltip-when-overflow":!0},scopedSlots:t._u([{key:"default",fn:function(i){return[1===i.row.type?e("a",{staticClass:"api-link",attrs:{href:"javascript:;"},on:{click:function(e){return t.routeToApiQuick(i.row.id)}}},[t._v(" "+t._s(i.row.interfaceMethod)+" ")]):t._e(),2===i.row.type?e("a",{staticClass:"api-link",attrs:{href:"javascript:;"},on:{click:function(e){return t.routeToApiQuick(i.row.id)}}},[t._v(" "+t._s(i.row.apiName)+" ")]):t._e()]}}])}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcfoo0"),"show-tooltip-when-overflow":!0},scopedSlots:t._u([{key:"default",fn:function(i){return[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.routeToApiQuick(i.row.id)}}},[e("p",{staticClass:"te"},[t._v(t._s(i.row.apiName))])])]}}])}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcfrk0"),"show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(i){return[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.routeToApiQuick(i.row.id)}}},[e("p",{staticClass:"te"},[t._v(t._s(i.row.apiRemark))])])]}}])})],1),e("div",{staticClass:"tc"},[e("a",{staticClass:"com-btn-link",attrs:{href:"javascript:;"},on:{click:function(e){return t.routeToApiQuick(t.bizApis[0].id)}}},[e("el-button",{attrs:{plain:""}},[t._v(t._s(t.$t("express.Quick.5ivh9xqcfuo0")))])],1)])],1)]),e("el-tab-pane",{attrs:{label:t.$t("express.Quick.5ivh9xqcgzg4"),name:"sdk"}},[e("div",{staticClass:"list downloadButtonsWrapper"},[e("div",{staticClass:"tagWrapper"},t._l(t.tagList,(function(i,a){return e("el-tag",{key:a,staticClass:"tagTip",attrs:{"disable-transitions":!0,type:"info"}},[e("p",[e("i",{staticClass:"el-icon-info"}),t._v(" "+t._s(t.$t("express.Quick.5ivh9xqcfxo0"))+" "),e("a",{staticClass:"anchor",attrs:{href:"javascript:;"},on:{click:t.goToExplain}},[t._v(t._s(t.$t("express.Quick.5ivh9xqcgzg2")))])])])})),1),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableBasicSdk}},[e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcg0g0"),width:"200","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.name))]}}])}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcg3c0"),width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.version))]}}])}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcg6c0"),width:"100"},scopedSlots:t._u([{key:"default",fn:function(i){return[1===i.row.language?e("div",[t._v("JAVA")]):2===i.row.language?e("div",[t._v(".NET")]):3===i.row.language?e("div",[t._v("PHP")]):e("div",[t._v("UNKNOWN")])]}}])}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcgzg3"),width:"380","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(i){return[e("p",{staticClass:"te"},[t._v(t._s(i.row.description))])]}}])}),e("el-table-column",{attrs:{align:"right"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.downloadBasicSdk(i.row.jssKey,i.row.fileName)}}},[t._v(t._s(t.$t("express.Quick.5ivh9xqcg980")))])]}}])})],1),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.bizSdks,height:"528"}},[e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcgcg0"),width:"200","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.name))]}}])}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcg3c0"),width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.version))]}}])}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcg6c0"),width:"100"},scopedSlots:t._u([{key:"default",fn:function(i){return[1===i.row.language?e("div",[t._v("JAVA")]):2===i.row.language?e("div",[t._v(".NET")]):3===i.row.language?e("div",[t._v("PHP")]):e("div",[t._v("UNKNOWN")])]}}])}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcgzg3"),width:"380","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(i){return[e("p",{staticClass:"te"},[t._v(t._s(i.row.remark))])]}}])}),e("el-table-column",{attrs:{align:"right"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("el-tooltip",{attrs:{content:t.$t("express.Quick.5ivh9xqcgfo0"),placement:"right"}},[e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.downloadSdk(i.row.jssKey)}}},[t._v(" "+t._s(t.$t("express.Quick.5ivh9xqcg980")))])],1)]}}])})],1)],1)]),t.bizMessages&&t.bizMessages.length>0?e("el-tab-pane",{attrs:{label:t.$t("express.Quick.5ivh9xqcgik0"),name:"message"}},[e("div",{staticClass:"list"},[e("el-table",{staticClass:"my-table mb2",staticStyle:{width:"960px"},attrs:{data:t.bizMessages,height:"528"}},[e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcglo0"),width:"300","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(i){return[e("a",{staticClass:"api-link",attrs:{href:"javascript:;"},on:{click:function(e){return t.routeToMessageQuick(i.row.id)}}},[t._v(" "+t._s(i.row.name)+" ")])]}}],null,!1,1786586812)}),e("el-table-column",{attrs:{label:t.$t("express.Quick.5ivh9xqcfrk0"),"show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(i){return[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.routeToMessageQuick(i.row.id)}}},[e("p",{staticClass:"te"},[t._v(t._s(i.row.descr))])])]}}],null,!1,2517539933)})],1),e("div",{staticClass:"tc"},[e("a",{staticClass:"com-btn-link",attrs:{href:"javascript:;"},on:{click:function(e){return t.routeToMessageQuick(t.bizMessages[0].id)}}},[e("el-button",{attrs:{plain:""}},[t._v(t._s(t.$t("express.Quick.5ivh9xqcgos0")))])],1)])],1)]):t._e()],1)],1)]),e("div",{staticClass:"flow-view"},[e("div",{staticClass:"flow-style"},[t._v(t._s(t.$t("express.Quick.5ivh9xqcgrk0")))]),e("div",{staticClass:"com-wrapper"},[e("el-row",{staticClass:"flow",attrs:{gutter:40}},t._l(t.bizFlows,(function(i,a){return e("el-col",{key:i.id,attrs:{span:5}},[e("div",{staticClass:"con"},[e("i",{staticClass:"order"},[t._v(t._s(i.serialNumber))]),e("p",{staticClass:"tip"},[t._v(t._s(i.title))]),i.image?e("img",{staticClass:"ico",attrs:{src:i.image}}):t._e(),a<t.bizFlows.length-1?e("i",{staticClass:"el-icon-d-arrow-right ico-arrow"}):t._e(),e("br")])])})),1)],1)]),e("el-dialog",{attrs:{visible:t.loginDialogVisible,width:"400px","custom-class":"login-dialog"},on:{"update:visible":function(e){t.loginDialogVisible=e}}},[e("div",[e("i",{staticClass:"el-icon-warning"})]),e("div",{staticClass:"login-text"},[t._v(" "+t._s(t.$t("express.Quick.5ivh9xqcguw0"))),e("a",{staticClass:"loginColor",on:{click:t.gotoLogin}},[t._v(t._s(t.$t("express.Quick.5ivh9xqcgzg0")))]),t._v("！ ")])])],1)}),[],!1,null,"1e7fc005",null);e.default=f.exports}}]);