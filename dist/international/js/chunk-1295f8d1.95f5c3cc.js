(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1295f8d1"],{"2e98":function(t,e,i){"use strict";i("b93c")},5116:function(t,e,i){},"606c":function(t,e,i){"use strict";i.r(e);var n=i("b85c"),o=i("5530"),r=(i("d3b7"),i("159b"),i("d81d"),i("14d9"),i("a9e3"),i("b32d")),a=i("87fb"),s=i("1cbd"),c={name:"DevSupport",components:{MarkdownPreview:a.a},data:function(){return{idx:0,items:[],docContent:"",devSupportType:-1,docClassification:"平台使用说明",unitId:"",showMessage:!0,unMatchDocId:0,how2OrderPath:"",bizApis:[],bizMessages:[],navContent:[],isClickNav:!1,timerId:null,opends:["1","2"],bizUnit:"",title:"",type:""}},computed:{queryId:function(){var t=this.$route.query.id;return t?{id:t}:{}},findItem:function(){for(var t=this.items,e=this.$route.params.docId,i=0;i<t.length;i++){var n=t[i];if(n.id==e)return this.title=n.title,this.type=n.type,this.fetchDoc(),n}}},methods:{scrollToLightNavItem:function(){var t=this;this.isClickNav||(clearTimeout(this.timerId),this.timerId=setTimeout((function(){var e=document.querySelectorAll(".aside-view-right__navItem"),i=document.querySelectorAll(".action-tit");i&&i.length>0&&(i.forEach((function(t,i){t.offsetTop-120<=document.documentElement.scrollTop&&(e.forEach((function(t){t.classList.remove("active")})),e[i].classList.add("active"))})),document.documentElement.scrollTop<i[0].offsetTop-120&&(e.forEach((function(t){t.classList.remove("active")})),e[0].classList.add("active"))),t.timerId=null}),300))},clstag:function(t,e){return Object(s.a)(t,e)},fetchDocList:function(){var t=this;Object(r.a)({url:"doc/getReleaseDocList",method:"get",params:{type:this.devSupportType}}).then((function(e){t.items=e.data.list,t.items=t.items.map((function(t){var e={"开放业务订购说明":"devSupport_1618993363242|5","用户授权介绍":"devSupport_1618993363242|6","物流开放平台授权&JOS平台授权":"devSupport_1618993363242|7","API调用方法详解":"devSupport_1618993363242|8","API测试工具":"devSupport_1618993363242|9","SDK使用说明":"devSupport_1618993363242|10","京东物流开放平台网站软件服务条款":"devSupport_1618993363242|11","京东物流开放平台开发者协议":"devSupport_1618993363242|12"}[t.title]||"";return Object(o.a)(Object(o.a)({},t),{},{clstag:e})}))})).catch((function(t){}))},fetchDoc:function(){var t=this;Object(r.a)({url:"doc/getReleaseDoc",method:"get",params:{type:this.type,title:this.title}}).then((function(e){t.docContent=e.data.content,t.$nextTick((function(){for(var e=1;e<10;e++){var i=document.querySelector(".markdown-preview").querySelectorAll("h"+e);if(i.length>0){for(var n=0;n<i.length;n++)if(""==i[n].classList.value){i[n].classList.add("action-tit");var o={};o.text=i[n].innerText,o.level=e,t.navContent.push(o)}t.$nextTick((function(){var t=document.querySelectorAll(".aside-view-right__navItem");t&&t.length>0&&(t.forEach((function(t){t.classList.remove("active")})),t[0].classList.add("active"))}));break}}}))})).catch((function(t){}))},selectNavItem:function(t){var e=this;this.isClickNav=!0;var i=document.querySelectorAll(".aside-view-right__navItem"),n=document.querySelectorAll(".action-tit");i.forEach((function(t){t.classList.remove("active")})),i[t].classList.add("active");var o=n[t].offsetTop-120;window.scrollTo({top:o,behavior:"smooth"}),setTimeout((function(){e.isClickNav=!1}),800)},foundDoc:function(t,e,i){var o,r=Object(n.a)(t);try{for(r.s();!(o=r.n()).done;){var a=o.value;if(this.unMatchDocId=a.docList[0].id,Number(a.objId)===Number(e)){var s,c=Object(n.a)(a.docList);try{for(c.s();!(s=c.n()).done;){var l=s.value;if(l.title===i)return l}}catch(t){c.e(t)}finally{c.f()}}}}catch(t){r.e(t)}finally{r.f()}return null},handleGatewayError:function(t){this.$message.error(t.response.data.error_response.zh_desc)}},created:function(){this.devSupportType="6",this.how2OrderPath="".concat(window.env.docHow2OrderInner),this.fetchDocList()},mounted:function(){window.addEventListener("scroll",this.scrollToLightNavItem),document.querySelector(".wly-main-container").setAttribute("style","overflow-x: visible"),document.querySelector(".footer").setAttribute("style","min-width: 1200px"),this.unitId=this.$route.query.id},destroyed:function(){document.querySelector(".wly-main-container").setAttribute("style","overflow-x: hidden"),document.querySelector(".footer").setAttribute("style","min-width: auto"),window.removeEventListener("scroll",this.scrollToLightNavItem)}},l=c,d=(i("ae6f"),i("2877")),u=Object(d.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"devSupport-page"},[e("el-breadcrumb",{staticClass:"com-breadcrumb-unit",attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{name:"HelpDocument"}}},[t._v("文档")]),e("el-breadcrumb-item",[t._v("开发支持")])],1),e("el-container",{style:t.navContent.length>0?"min-height:600px;border-right:1px solid #d9d9d9;":"min-height:600px;background-color:white;"},[e("el-aside",{staticClass:"aside-view",staticStyle:{"background-color":"white"}},[e("div",{staticClass:"router-list"},[e("el-menu",{attrs:{"default-openeds":t.opends}},[e("el-submenu",{attrs:{index:"1"}},[e("template",{slot:"title"},[e("span",[t._v("新手指南")])]),t._l(t.items,(function(i){return[1==i.type?e("router-link",{key:i.id,staticClass:"link",attrs:{to:{name:"DevSupport",params:{docId:i.id},query:t.queryId},clstag:t.clstag("",i.clstag)}},[e("el-menu-item",{attrs:{index:"menu-"+i.id}},[t._v(t._s(i.title))])],1):t._e()]}))],2),e("el-submenu",{attrs:{index:"2"}},[e("template",{slot:"title"},[e("span",[t._v("开发支持")])]),t._l(t.items,(function(i){return[2==i.type?e("router-link",{key:i.id,staticClass:"link",attrs:{to:{name:"DevSupport",params:{docId:i.id},query:t.queryId},clstag:t.clstag("",i.clstag)}},[e("el-menu-item",{attrs:{index:"menu-"+i.id}},[t._v(t._s(i.title))])],1):t._e()]}))],2)],1)],1)]),e("el-main",{staticClass:"main-view",staticStyle:{"background-color":"white",width:"760px"}},[this.$route.params.docId&&t.findItem?e("div",[t.docContent?e("MarkdownPreview",{staticClass:"markdown-preview",attrs:{after:t.fetchDoc},model:{value:t.docContent,callback:function(e){t.docContent=e},expression:"docContent"}}):t._e()],1):t._e()]),e("aside",{staticClass:"aside-view-right"},[t.navContent.length>0?e("ul",{staticClass:"aside-view-right__navList"},t._l(t.navContent,(function(i,n){return e("li",{key:n,staticClass:"aside-view-right__navItem",on:{click:function(e){return t.selectNavItem(n)}}},[e("div",{staticStyle:{"text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap"},domProps:{innerHTML:t._s(i.text)}})])})),0):t._e()])],1)],1)}),[],!1,null,"a1ca0aaa",null);e.default=u.exports},"87fb":function(t,e,i){"use strict";var n={name:"MarkdownPreview",props:{value:{type:String,default:""},after:{type:Function,default:function(){}}},data:function(){return{contentPreview:""}},mounted:function(){var t=this,e=document.querySelector("#VditorPreview");Vditor.preview(e,this.value,{IPreviewOptions:{cdn:"/vditor"},cdn:"/vditor",after:function(){t.after()}})}},o=n,r=(i("2e98"),i("2877")),a=Object(r.a)(o,(function(){return(0,this._self._c)("div",{attrs:{id:"VditorPreview"}})}),[],!1,null,"c9333ad8",null);e.a=a.exports},ae6f:function(t,e,i){"use strict";i("5116")},b93c:function(t,e,i){}}]);