(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e5ad53a2"],{1799:function(e,t,a){"use strict";var n=(a("a9e3"),{name:"Pagination",props:{currentPage:{type:Number,required:!0},pageSize:{type:Number,required:!0},total:{type:Number,default:0},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},reloadTableData:{type:Function,default:function(){}}},methods:{onCurrentChange:function(e){this.$emit("update:currentPage",e),this.reloadTableData()},onSizeChange:function(e){this.$emit("update:pageSize",e),this.reloadTableData()}}}),i=n,s=(a("3fca"),a("2877")),r=Object(s.a)(i,(function(){var e=this;return(0,e._self._c)("el-pagination",{staticClass:"pagination",attrs:{background:!0,"current-page":e.currentPage,"page-size":e.pageSize,"page-sizes":e.pageSizes,total:e.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":e.onCurrentChange,"size-change":e.onSizeChange}})}),[],!1,null,"52f386a2",null);t.a=r.exports},"28dc":function(e,t,a){},"3fca":function(e,t,a){"use strict";a("848d")},"4f8f":function(e,t,a){"use strict";a.r(t),a("b0c0");var n=a("3835"),i=a("c7eb"),s=a("1da1"),r=a("5530"),o=(a("14d9"),a("a15b"),a("e9c4"),a("d9e2"),a("a9e3"),a("99af"),a("b32d")),c=a("2f62"),p=a("7a3a"),l=a("6aca"),u=a("1799"),d=a("b85c"),f=(a("7db0"),a("d3b7"),a("caad"),a("2532"),a("ac1f"),a("5319"),{bind:function(e,t,a){var n=e.querySelector(".el-dialog__header"),i=e.querySelector(".el-dialog");n.style.cssText+=";cursor:move;",i.style.cssText+=";top:0px;";var s=window.document.currentStyle?function(e,t){return e.currentStyle[t]}:function(e,t){return getComputedStyle(e,!1)[t]};n.onmousedown=function(e){var t=e.clientX-n.offsetLeft,r=e.clientY-n.offsetTop,o=i.offsetWidth,c=i.offsetHeight,p=document.body.clientWidth,l=document.body.clientHeight,u=i.offsetLeft,d=p-i.offsetLeft-o,f=i.offsetTop,m=l-i.offsetTop-c>30?l-i.offsetTop-c:30,A=s(i,"left"),h=s(i,"top");A.includes("%")?(A=+document.body.clientWidth*(+A.replace(/\%/g,"")/100),h=+document.body.clientHeight*(+h.replace(/\%/g,"")/100)):(A=+A.replace(/\px/g,""),h=+h.replace(/\px/g,"")),document.onmousemove=function(e){var n=e.clientX-t,s=e.clientY-r;-n>u?n=-u:n>d&&(n=d),-s>f?s=-f:s>m&&(s=m),i.style.cssText+=";left:".concat(n+A,"px;top:").concat(s+h,"px;"),a.child.$emit("dragDialog")},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null}}}}),m=function(e){e.directive("el-drag-dialog",f)};window.Vue&&(window["el-drag-dialog"]=f,Vue.use(m)),f.install=m;var A=f,h=a("7562"),b={directives:{elDragDialog:A},props:{initialQualifiedName:{type:String,required:!0},initialMethodId:{type:[String,Number],required:!0},initialMethodName:{type:String,required:!1}},data:function(){return{thisEnv:window.env.baseEnv,tabPosition:"left",editableTabsValue:"2",methodTabs:[],activeMethodName:this.initialMethodName,activeMethodId:this.initialMethodId,inParamsTableData:[],outParamsTableData:[],errorCodeTableData:[],qualifiedName:this.initialQualifiedName,methodName:this.initialMethodName,cnName:this.$route.query.cnName,remark:this.$route.query.remark,dialogTableVisible:!1,modal:!1,apiInfo:{qualifiedName:"",cnName:"",remark:""}}},methods:{findApiBaseInfoRelease:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"/ApiDepotService/findApiBaseInfoRelease",a=e.$route.query.qualifiedName,n=[{qualifiedName:a}],t.next=5,h.a.post("/ApiDepotService/findApiBaseInfoRelease",JSON.stringify(n));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))()},queryApiMethodRelease:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"/ApiDepotService/queryApiMethodRelease",a=e.qualifiedName,n=[{qualifiedName:a}],t.next=5,h.a.post("/ApiDepotService/queryApiMethodRelease",JSON.stringify(n));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))()},findApiMethodRelease:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n,s;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"/ApiDepotService/findApiMethodRelease",a=e.activeMethodName,n=e.activeMethodId||e.methodTabs.find((function(e){return e.name===a})).id,s=[{methodId:n}],t.next=6,h.a.post("/ApiDepotService/findApiMethodRelease",JSON.stringify(s));case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t)})))()},gotoApiTest:function(){var e,t="",a=Object(d.a)(this.methodTabs);try{for(a.s();!(e=a.n()).done;){var n=e.value;Number(n.id)===Number(this.activeMethodId)&&(t=n.name)}}catch(e){a.e(e)}finally{a.f()}t?window.open(window.location.origin+"#/apiTestMainPage?qualifiedName="+this.qualifiedName+"&methodName="+t+"&methodId="+this.activeMethodId+"&from=web","_blank"):Message.error("没有找到当前的方法")},fetchApiMethods:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.queryApiMethodRelease().catch((function(){throw new Error("fetchApiMethods queryApiMethodRelease")}));case 2:a=t.sent,n=a.data,e.methodTabs=n,e.activeMethodName=e.methodName,e.fetchApiMethodElements();case 7:case"end":return t.stop()}}),t)})))()},getApiInfo:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.findApiBaseInfoRelease().catch((function(){throw new Error("getApiInfo findApiBaseInfoRelease")}));case 2:a=t.sent,n=a.data,e.apiInfo=n;case 5:case"end":return t.stop()}}),t)})))()},fetchApiMethodElements:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.findApiMethodRelease().catch((function(){throw new Error("fetchApiMethodElements findApiMethodRelease")}));case 2:a=t.sent,(n=a.data)&&(e.inParamsTableData=null===n.inParamList?[]:n.inParamList,e.outParamsTableData=null===n.outParamList?[]:n.outParamList,e.errorCodeTableData=null===n.errorCodeList?[]:n.errorCodeList);case 5:case"end":return t.stop()}}),t)})))()},onMethodChangeClick:function(e,t){this.activeMethodId=e.$vnode.key,this.fetchApiMethodElements()},handleDrag:function(){this.$refs.select.blur()}},mounted:function(){this.getApiInfo(),this.fetchApiMethods()}},g=b,I=(a("69af"),a("2877")),v=Object(I.a)(g,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"my-wrap my-pd"},[t("div",{staticClass:"my-column"},[t("el-tabs",{staticClass:"my-tabs2",attrs:{"tab-position":e.tabPosition},on:{"tab-click":this.onMethodChangeClick},model:{value:e.activeMethodName,callback:function(t){e.activeMethodName=t},expression:"activeMethodName"}},e._l(this.methodTabs,(function(a){return t("el-tab-pane",{key:a.id,attrs:{label:a.name,name:a.name}},[t("div",{attrs:{slot:"label"},slot:"label"},[t("p",{staticClass:"doc-title"},[e._v(e._s(a.cnName))]),t("el-tooltip",{attrs:{disabled:!0,effect:"dark",placement:"top"}},[t("p",{staticClass:"doc-title"},[t("span",[e._v(e._s(a.name))])])])],1),t("div",[t("h3",{staticClass:"document-title"},[e._v(e._s(a.name)+"（"+e._s(a.cnName)+"）")]),t("p",{staticClass:"line-feed",staticStyle:{"margin-left":"0px","margin-bottom":"20px"}},[e._v(" "+e._s(a.remark)+" ")]),t("h4",{staticClass:"document-sub-title"},[e._v("请求参数")]),t("el-table",{staticClass:"my-table mb2",staticStyle:{"margin-bottom":"25px"},attrs:{data:e.inParamsTableData,"tree-props":{children:"children",hasChildren:"hasChildren"},"row-key":"id"}},[t("el-table-column",{attrs:{"show-tooltip-when-overflow":!0,label:"名称","min-width":"22%",prop:"name"}}),t("el-table-column",{attrs:{"show-tooltip-when-overflow":!0,label:"类型","min-width":"20%",prop:"type"}}),t("el-table-column",{attrs:{label:"是否必选","min-width":"15%",prop:"required"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",[e._v(e._s("1"===a.row.required?"是":""))]),t("span",[e._v(e._s("0"===a.row.required?"否":""))]),t("span",[e._v(e._s((a.row.required,"")))])]}}],null,!0)}),t("el-table-column",{attrs:{"show-tooltip-when-overflow":!0,label:"示例值","min-width":"15%",prop:"exampleValue"}}),t("el-table-column",{attrs:{"show-tooltip-when-overflow":!0,label:"描述","min-width":"28%",prop:"remark"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("p",{staticClass:"line-feed"},[e._v(" "+e._s(a.row.remark)+" ")])]}}],null,!0)})],1),t("h4",{staticClass:"document-sub-title"},[e._v("响应参数")]),t("el-table",{staticClass:"my-table mb2",staticStyle:{"margin-bottom":"25px"},attrs:{data:e.outParamsTableData,"tree-props":{children:"children",hasChildren:"hasChildren"},"row-key":"id"}},[t("el-table-column",{attrs:{"show-tooltip-when-overflow":!0,label:"名称","min-width":"22%",prop:"name"}}),t("el-table-column",{attrs:{"show-tooltip-when-overflow":!0,label:"类型","min-width":"20%",prop:"type"}}),t("el-table-column",{attrs:{"show-tooltip-when-overflow":!0,label:"示例值","min-width":"15%",prop:"exampleValue"}}),t("el-table-column",{attrs:{"show-tooltip-when-overflow":!0,label:"描述","min-width":"28%",prop:"remark"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("p",{staticClass:"line-feed"},[e._v(e._s(a.row.remark))])]}}],null,!0)})],1),t("h4",{staticClass:"document-sub-title"},[e._v("错误码")]),t("el-table",{staticClass:"my-table mb2",staticStyle:{"margin-bottom":"25px"},attrs:{data:e.errorCodeTableData,"tree-props":{children:"children",hasChildren:"hasChildren"},hideEmptyImg:"","row-key":"id"}},[t("el-table-column",{attrs:{label:"错误码","min-width":"20%",prop:"errorCode"}}),t("el-table-column",{attrs:{label:"错误信息",prop:"errorMsg"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("p",{staticClass:"line-feed"},[e._v(e._s(a.row.errorMsg))])]}}],null,!0)})],1),t("h4",{staticClass:"document-sub-title"},[e._v("API工具")]),t("el-row",["uat"===e.thisEnv||"prod"===e.thisEnv?t("el-button",{attrs:{disabled:"",type:"primary"}},[e._v("API测试 ")]):t("el-button",{attrs:{type:"primary"},on:{click:e.gotoApiTest}},[e._v("API测试 ")]),"uat"===e.thisEnv||"prod"===e.thisEnv?t("el-alert",{staticStyle:{"margin-bottom":"20px","margin-top":"20px"},attrs:{closable:!1,title:"生产环境API测试不可用，请移步测试环境（测试环境地址：http://test-lcp.jdl.com）",type:"error"}}):e._e()],1)],1)])})),1)],1)])}),[],!1,null,"682030a5",null),y=v.exports,w=a("cb07"),C=a("a78e"),N=a.n(C),x={name:"ApiMethodList",components:{ApiMethodDocument:y,Pagination:u.a},filters:{transControl:function(e){var t=[];e.netEnvDisplay&&t.push("网络环境:"+e.netEnvDisplay),e.accountSystemDisplay&&t.push("账号体系:"+e.accountSystemDisplay),e.userTerminalDisplay&&t.push("使用环境:"+e.userTerminalDisplay);var a=e.loginCheck;a&&(1===a&&t.push("登录态校验:否"),2===a&&t.push("登录态校验:是"));var n=e.mtpConfig;if(n){var i=n.transferEncrypt;i&&(1===i.is_open&&t.push("安全加密:是"),0===i.is_open&&t.push("安全加密:否"));var s=n.contextWrite;s&&(1===s.is_open&&t.push("上下文写入:是"),0===s.is_open&&t.push("上下文写入:否"));var r=n.actAccount;r&&(1===r.is_open&&t.push("从物流开放平台接收用户账号:是"),0===r.is_open&&t.push("从物流开放平台接收用户账号:否"))}return t.length>0?t.join(" | "):""}},data:function(){return{activeName:"first",apiName:"",hasLogIn:l.a.loginState,apiInstanceInfo:{businessType:"",serviceType:"",mainProd:"",mainDev:"",mainProdPin:"",mainDevPin:"",status:"",mvn:""},disabled:!1,apiInfo:{qualifiedName:"",cnName:"",remark:""},tableData:[],applyInstanceDialogShow:!1,apiInstances:[],applierApps:[],applyInstanceInfos:{instanceId:"",qualifiedName:"",cnName:"",appId:"",tps:"",businessCase:""},applyInstanceRules:{qualifiedName:[{required:!0,message:"请选择实现"}],cnName:[{required:!0,message:"请填入实现中文名"}],appId:[{required:!0,message:"请选择App"}],tps:[{required:!0,message:"请输入调用量"},{type:"number",message:"请输入调用量。10-1000000",min:10,max:1e6}],businessCase:[{required:!0,message:"请输入至少十个字的使用场景描述",min:10,max:200}]},applyLoading:"",listQuery:{searchKeyWord:"",total:1,pageNumb:1,pageSize:10,pageSizes:[10,20,40,60]},methodTableData:[],howToCallDialogVisible:!1,howToCallManual:"",showApplySuccessDialog:!1,appId:1}},computed:Object(r.a)(Object(r.a)({},Object(c.b)(["headImg","name","develop"])),{},{language:function(){return"zh_CN"},methodInfo:function(){var e=this.$route.query,t=e.qualifiedName,a=e.methodName,n=e.id,i={qualifiedName:t,methodName:a,id:void 0===n?0:n},s=this.tableData[0].id,r=this.tableData[0].name;return a?i:{qualifiedName:t,methodName:r,id:s}}}),methods:{findApiBaseInfoRelease:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"/ApiDepotService/findApiBaseInfoRelease",a=e.apiName,n=[{qualifiedName:a}],t.next=5,h.a.post("/ApiDepotService/findApiBaseInfoRelease",JSON.stringify(n));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))()},queryApiMethodRelease:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"/ApiDepotService/queryApiMethodRelease",a=e.apiName,n=[{qualifiedName:a}],t.next=5,h.a.post("/ApiDepotService/queryApiMethodRelease",JSON.stringify(n));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))()},findApiForWeb:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"/ApiDepotService/findApiForWeb",a=e.apiName,n=[{qualifiedName:a}],t.next=5,h.a.post("/ApiDepotService/findApiForWeb",JSON.stringify(n));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))()},submitApiApply:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n,s,o;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getApp().catch((function(){throw new Error("submitApiApply getApp")}));case 2:return a=t.sent,n=a.data.data.code,"/ApiDepotService/submitApiApply",delete(s=JSON.parse(JSON.stringify(e.applyInstanceInfos))).instanceId,s.appKey=n,o=[Object(r.a)({},s)],t.next=11,h.a.post("/ApiDepotService/submitApiApply",JSON.stringify(o));case 11:return t.abrupt("return",t.sent);case 12:case"end":return t.stop()}}),t)})))()},getApp:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.applyInstanceInfos.appId,n={id:a},t.next=5,w.a.get("/app/getApp",{params:n}).catch((function(t){var a=t.data.message;throw a&&e.$message.error(a),new Error("getApp")}));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))()},rowClassName:function(e){var t=e.row,a=e.rowIndex;t.number=a+1},openProdDongDong:function(){window.location.href="timline://chat/?topin=".concat(this.apiInstanceInfo.mainProdPin)},openDevDongDong:function(){window.location.href="timline://chat/?topin=".concat(this.apiInstanceInfo.mainDevPin)},showApplyDialog:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.$refs.applyInstanceModel,e.hasLogIn){t.next=6;break}return t.next=4,l.a.intranetCheckLogin();case 4:t.next=13;break;case 6:if(-1!==Number(N.a.get("supplierId"))){t.next=11;break}return t.next=9,l.a.handleGetTeamListInfo();case 9:t.next=13;break;case 11:Object(o.a)("/app/findAppInfoListNoPage").then((function(t){e.applierApps=t.data,e.applyInstanceDialogShow=!0,e.applyInstanceInfos.appId="",e.applyInstanceInfos.tps="",e.applyInstanceInfos.businessCase="",a&&a.resetFields()}));case 13:case"end":return t.stop()}}),t)})))()},applyUseInstance:function(){var e=this;this.$refs.applyInstanceModel.validate(function(){var t=Object(s.a)(Object(i.a)().mark((function t(a){return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=11;break}return e.applyLoading=p.Loading.service({lock:!0,text:"正在提交任务，请稍等",spinner:"el-icon-loading"}),e.disabled=!0,t.next=5,e.submitApiApply().catch((function(){throw e.disabled=!1,e.applyLoading.close(),new Error("applyUseInstance submitApiApply")}));case 5:e.applyInstanceDialogShow=!1,e.disabled=!1,e.applyLoading.close(),e.showApplySuccessDialog=!0,t.next=12;break;case 11:return t.abrupt("return",!1);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},getApiInfo:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n,s;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.findApiBaseInfoRelease().catch((function(){throw new Error("getApiInfo findApiBaseInfoRelease")}));case 2:a=t.sent,n=a.data,s=n.cnName,e.apiInfo=n,e.applyInstanceInfos.cnName=s;case 7:case"end":return t.stop()}}),t)})))()},getApiMethodList:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,n;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.queryApiMethodRelease().catch((function(){throw new Error("getApiMethodList queryApiMethodRelease")}));case 2:a=t.sent,n=a.data,e.tableData=n;case 5:case"end":return t.stop()}}),t)})))()},getApiInstanceInfo:function(){var e=this;return Object(s.a)(Object(i.a)().mark((function t(){var a,s,r,o,c;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.findApiForWeb().catch((function(){throw new Error("getApiInstanceInfo findApiForWeb")}));case 2:a=t.sent,s=a.data,e.apiInstances=s,s.length>0&&(r=Object(n.a)(s,1),o=r[0],e.applyInstanceInfos.instanceId=o.id,e.apiInstanceInfo.serviceType=1===o.serviceType?"jsf":"http",c=o.mainDev.split(":"),e.apiInstanceInfo.mainDev=c[1],e.apiInstanceInfo.mainDevPin=c[0],c=o.mainProd.split(":"),e.apiInstanceInfo.mainProd=c[1],e.apiInstanceInfo.mainProdPin=c[0],e.apiInstanceInfo.status=1===o.status?"初始化":"运行中",e.apiInstanceInfo.businessType=o.businessCategoryName,e.apiInstanceInfo.mvn=o.mvn,e.appId=o.appId);case 6:case"end":return t.stop()}}),t)})))()},gotoApiList:function(){window.location.href="".concat(window.location.origin,"/admin/#/appManager/appTabs/").concat(this.applyInstanceInfos.appId,"?tabName=304")}},created:function(){this.apiName=this.$route.query.qualifiedName,this.applyInstanceInfos.qualifiedName=this.$route.query.qualifiedName,this.getApiInfo(),this.getApiMethodList(),this.getApiInstanceInfo()}},S=x,k=(a("5772"),Object(I.a)(S,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"my-wrap my-pd"},[t("el-breadcrumb",{staticClass:"my-breadcrumb mb2",attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/apiStore"}}},[e._v("API仓库")]),t("el-breadcrumb-item",[e._v("API详情")])],1),t("div",{staticClass:"my-column2 mb2"},["jsf"!==e.apiInstanceInfo.serviceType?t("span",{staticClass:"fr",staticStyle:{"margin-top":"12px"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.showApplyDialog}},[e._v("申请使用")])],1):e._e(),t("h3",[e._v(e._s(this.apiInfo.qualifiedName)+"（"+e._s(this.apiInfo.cnName)+"）")]),t("p",{staticClass:"remark-content"},[e._v(e._s(this.apiInfo.remark))])]),t("div",{staticClass:"my-column",staticStyle:{"margin-top":"20px"}},[t("el-row",{staticClass:"fl-list mb1"},[t("el-col",{attrs:{span:5}},[e._v("所属分类："),t("span",[e._v(e._s(e.apiInstanceInfo.businessType))])]),t("el-col",{attrs:{span:5}},[e._v("服务类型："),t("span",[e._v(e._s(e.apiInstanceInfo.serviceType))])]),t("el-col",{attrs:{span:5}},[e._v("产品负责人："),t("span",[e._v(e._s(e.apiInstanceInfo.mainProd))]),e._v(" "),t("span",{staticStyle:{cursor:"pointer"},attrs:{title:"联系咚咚"},on:{click:e.openProdDongDong}},[t("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABoUlEQVR42mL02/qCAQr0gPgXELMDcTAQewOxClTuEhC3AfEtIJYD4ttA/AQkARBALFAFIMWeQGwOxMpALMiAAA+hBkQDsQVUHmRYNUgSIIBgBvhCsTgQMyNp3gfEJ6ByukjidkDMBcTfAAKICWoIyNlSSJr/A/FKIL4IxNlomkHABoibQXoBAghkgBEQByJJ/gHiaUD8FaqZnwE7SANiY4AAAtkegaToNxDPh3olhAE/4AHiSIAAArnAEcnZG6GGEdIMA44AAQQyQAbKOQDEr4A4iIF4oAAQQExQp9wF4iNAHAfErCQYwAgQQKAwuA7Eh6ABycNAGjgPEEAgFzQBsTAQ6yBJgFLkayIM6AEIIJABV4HYCUnwPzSKQEl7Jx7NNUC8GSCAQAbIQxMRMgClPlAm2Q/EP9EMByWueGhyZgAIIBZoBmmHJk9rUMAA8RpohvkCxIVQdZ+A+CUQv0H2HkAAMSLlRl4gbgDidCDmRrIVpGEvVPM/IL4MxFugUc4AEEAsSAo/A3ExEK+GxogtEKtBo1UX6pXlQLwHmtzBACDAACc7Ss/mC7yUAAAAAElFTkSuQmCC"}})])]),t("el-col",{attrs:{span:5}},[e._v("研发负责人："),t("span",[e._v(e._s(e.apiInstanceInfo.mainDev))]),e._v(" "),t("span",{staticStyle:{cursor:"pointer"},attrs:{title:"联系咚咚"},on:{click:e.openDevDongDong}},[t("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABoUlEQVR42mL02/qCAQr0gPgXELMDcTAQewOxClTuEhC3AfEtIJYD4ttA/AQkARBALFAFIMWeQGwOxMpALMiAAA+hBkQDsQVUHmRYNUgSIIBgBvhCsTgQMyNp3gfEJ6ByukjidkDMBcTfAAKICWoIyNlSSJr/A/FKIL4IxNlomkHABoibQXoBAghkgBEQByJJ/gHiaUD8FaqZnwE7SANiY4AAAtkegaToNxDPh3olhAE/4AHiSIAAArnAEcnZG6GGEdIMA44AAQQyQAbKOQDEr4A4iIF4oAAQQExQp9wF4iNAHAfErCQYwAgQQKAwuA7Eh6ABycNAGjgPEEAgFzQBsTAQ6yBJgFLkayIM6AEIIJABV4HYCUnwPzSKQEl7Jx7NNUC8GSCAQAbIQxMRMgClPlAm2Q/EP9EMByWueGhyZgAIIBZoBmmHJk9rUMAA8RpohvkCxIVQdZ+A+CUQv0H2HkAAMSLlRl4gbgDidCDmRrIVpGEvVPM/IL4MxFugUc4AEEAsSAo/A3ExEK+GxogtEKtBo1UX6pXlQLwHmtzBACDAACc7Ss/mC7yUAAAAAElFTkSuQmCC"}})])]),"jsf"!==e.apiInstanceInfo.serviceType?t("el-col",{attrs:{span:4}},[e._v("状态："),t("span",[e._v(e._s(e.apiInstanceInfo.status))])]):e._e()],1),e.tableData&&e.tableData.length>0?t("ApiMethodDocument",{attrs:{"initial-method-id":e.methodInfo.id,"initial-method-name":e.methodInfo.methodName,"initial-qualified-name":e.methodInfo.qualifiedName}}):e._e()],1),t("el-dialog",{attrs:{visible:e.applyInstanceDialogShow,title:"API申请",width:"500px"},on:{close:function(t){e.applyInstanceDialogShow=!1}}},[t("el-form",{ref:"applyInstanceModel",attrs:{model:e.applyInstanceInfos,rules:e.applyInstanceRules,"label-width":"120px"}},[t("el-form-item",{attrs:{label:"API名称",prop:"qualifiedName"}},[t("el-select",{attrs:{disabled:"",placeholder:"请选择实现"},model:{value:e.applyInstanceInfos.instanceId,callback:function(t){e.$set(e.applyInstanceInfos,"instanceId",t)},expression:"applyInstanceInfos.instanceId"}},e._l(e.apiInstances,(function(e){return t("el-option",{key:e.id,attrs:{label:e.qualifiedName,value:e.id}})})),1)],1),t("el-form-item",{attrs:{label:"中文名称",prop:"cnName"}},[t("el-input",{attrs:{disabled:"",placeholder:"中文名称"},model:{value:e.applyInstanceInfos.cnName,callback:function(t){e.$set(e.applyInstanceInfos,"cnName",t)},expression:"applyInstanceInfos.cnName"}})],1),t("el-form-item",{attrs:{label:"应用",prop:"appId"}},[t("el-select",{attrs:{placeholder:"请选择应用"},model:{value:e.applyInstanceInfos.appId,callback:function(t){e.$set(e.applyInstanceInfos,"appId",t)},expression:"applyInstanceInfos.appId"}},e._l(e.applierApps,(function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),t("el-form-item",{attrs:{label:"申请调用量",prop:"tps"}},[t("el-input",{attrs:{placeholder:"申请调用量"},model:{value:e.applyInstanceInfos.tps,callback:function(t){e.$set(e.applyInstanceInfos,"tps",e._n(t))},expression:"applyInstanceInfos.tps"}},[t("template",{slot:"append"},[e._v("TPS")])],2)],1),t("el-form-item",{attrs:{label:"使用场景",prop:"businessCase"}},[t("el-input",{attrs:{rows:3,maxlength:"200",placeholder:"请输入使用场景",resize:"none","show-word-limit":"",type:"textarea"},model:{value:e.applyInstanceInfos.businessCase,callback:function(t){e.$set(e.applyInstanceInfos,"businessCase",t)},expression:"applyInstanceInfos.businessCase"}})],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.applyInstanceDialogShow=!1}}},[e._v("取 消")]),t("el-button",{attrs:{disabled:e.disabled,type:"primary"},on:{click:e.applyUseInstance}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{visible:e.showApplySuccessDialog,title:"提示",width:"500px"},on:{close:function(t){e.showApplySuccessDialog=!1}}},[t("div",{staticClass:"text"},[e._v("申请成功，请等候审批结果通知")]),t("p",[e._v(" 审批通过后，请到 "),t("a",{staticClass:"link",on:{click:function(t){return e.gotoApiList()}}},[e._v("控制台-应用管理-调用的API列表")]),e._v(" 中查看申请的API ")]),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showApplySuccessDialog=!1}}},[e._v("关闭")])],1)])],1)}),[],!1,null,"0307cc0a",null));t.default=k.exports},5772:function(e,t,a){"use strict";a("a349")},"69af":function(e,t,a){"use strict";a("28dc")},7562:function(e,t,a){"use strict";var n=a("c7eb"),i=a("1da1"),s=(a("d3b7"),a("e9c4"),a("bc3a")),r=a.n(s),o=a("2c7f"),c=a("6aca"),p=a("7a3a"),l=a("48ea"),u=a("a78e"),d=a.n(u),f=!1,m=r.a.create({baseURL:window.env.gatewayApiDecoupling,withCredentials:!0,timeout:1e4,headers:{"LOP-DN":window.env.gatewayApiDecouplingLop,"Account-Type":Object(l.a)()?"erp":"passport"}});function A(){return h.apply(this,arguments)}function h(){return h=Object(i.a)(Object(n.a)().mark((function e(){return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.SET_LOGIN_STATE(!1);case 2:sessionStorage.setItem("store",JSON.stringify(o.a.state)),p.MessageBox.confirm("您的登录状态已失效，是否重新登录？","提示",{confirmButtonText:"登录",cancelButtonText:"不登录",type:"warning"}).then((function(){f=!1,c.a.handleLogout(),Object(l.a)()?c.a.intranetCheckLogin():c.a.extranetCheckLogin()})).catch((function(){f=!1}));case 4:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}m.interceptors.request.use((function(e){return e.headers.groupCode=d.a.get("groupCode")||"",e}),(function(e){return Promise.reject(e)})),m.interceptors.response.use((function(e){var t=e.status;if(e.data.error_response)return p.Message.error("服务异常"),Promise.reject(e);if(401===t||520===t)return f||(f=!0,A()),Promise.reject(e);if(e.data.response){var a=e.data.response,n=a.code,i=a.message;return 2e4===n?e.data.response:(i&&p.Message.error(i),Promise.reject(e.data.response))}return Promise.reject(e)}),(function(e){var t=e.response.status;return e.response.data.error_response&&p.Message.error("服务异常"),401!==t&&520!==t||f||(f=!0,A()),Promise.reject(e.response)})),t.a=m},"7db0":function(e,t,a){"use strict";var n=a("23e7"),i=a("b727").find,s=a("44d2"),r="find",o=!0;r in[]&&Array(1)[r]((function(){o=!1})),n({target:"Array",proto:!0,forced:o},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),s(r)},"848d":function(e,t,a){},a349:function(e,t,a){}}]);