(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0b491732"],{2909:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var a=n("6b75");n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630");var o=n("06c5");function i(t){return function(t){if(Array.isArray(t))return Object(a.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n("d9e2")},"2e98":function(t,e,n){"use strict";n("b93c")},"39e5":function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return r})),n("99af"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861");var a=n("bc3a"),o=n.n(a),i=n("b32d");function c(){return Object(i.a)({url:"/bizapinterface/getUsingBaseSdkList",method:"get"}).then((function(t){return t.data}))}function r(t,e){null!=e&&o.a.create({baseURL:window.env.gatewayFileBaseApi,withCredentials:!0,timeout:1e5,headers:{"LOP-DN":window.env.gatewayUploadLopDn,fileName:t},responseType:"blob"})({url:"/lop/file/download",method:"get"}).then((function(t){var n=new Blob([t.data],{type:"application/octet-stream"});if(void 0!==window.navigator.msSaveBlob)window.navigator.msSaveBlob(n,decodeURI(e));else{var a=window.URL.createObjectURL(n),o=document.createElement("a");o.style.display="none",o.href=a,o.setAttribute("download",decodeURI(e)),void 0===o.download&&o.setAttribute("target","_blank"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(a)}})).catch((function(t){}))}},4481:function(t,e,n){"use strict";n("e509")},"87fb":function(t,e,n){"use strict";var a={name:"MarkdownPreview",props:{value:{type:String,default:""},after:{type:Function,default:function(){}}},data:function(){return{contentPreview:""}},mounted:function(){var t=this,e=document.querySelector("#VditorPreview");Vditor.preview(e,this.value,{IPreviewOptions:{cdn:"/vditor"},cdn:"/vditor",after:function(){t.after()}})}},o=a,i=(n("2e98"),n("2877")),c=Object(i.a)(o,(function(){return(0,this._self._c)("div",{attrs:{id:"VditorPreview"}})}),[],!1,null,"c9333ad8",null);e.a=c.exports},b93c:function(t,e,n){},b96d:function(t,e,n){"use strict";n.r(e);var a=n("2909"),o=n("c7eb"),i=n("1da1"),c=(n("d3b7"),n("159b"),n("ac1f"),n("5319"),n("14d9"),n("87fb")),r=n("4a7d"),s=n("fd6a"),d=n("af55"),u=n("722b"),l=n("39e5"),f=n("b32d"),v={components:{MarkdownPreview:c.a,BlackFooter:r.a,ScreenshotEvaluation:s.a},data:function(){return{docContent:"",docTitle:"",showNoResult:!1,navContent:[],isClickNav:!1,docName:"",jssKey:"",docTypeMain:3,helpful:void 0,buttonLoading:!1,evaluationButtonDisabled:!1,updateTime:""}},computed:{isRoutePath:function(){return"preview-docking-plan"===this.$route.path.split("/")[1]},unitId:function(){return parseInt(this.$route.params.unitId)},docId:function(){return parseInt(this.$route.params.docId)},approvalNumber:function(){return u.a.approvalNumber},formatUpdateTimeText:function(){var t=this.updateTime;return t?"更新时间：".concat(this.$dayjs(t).format("YYYY-MM-DD HH:mm:ss")):""}},methods:{genReleaseDocPdf:function(){var t=this;return Object(i.a)(Object(o.a)().mark((function e(){var n,a,i,c;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/downDoc/genReleaseDocPdf","get",n=t.$route.params,a=n.unitId,i=n.docId,c={id:i,unitId:a},e.next=6,Object(f.a)({url:"/downDoc/genReleaseDocPdf",method:"get",params:c}).then((function(e){t.docName=e.data.fileName,t.jssKey=e.data.jssKey})).catch((function(t){}));case 6:case"end":return e.stop()}}),e)})))()},downBasicSdk:function(){null!==this.jssKey&&void 0!==this.jssKey&&""!==this.jssKey||!this.docName?Object(l.a)(this.jssKey,this.docName):this.$message.error("文件不存在!")},selectNavItem:function(t){var e=this;this.isClickNav=!0;var n=document.querySelectorAll(".aside-view-right__navItem"),a=document.querySelectorAll(".action-tit");n.forEach((function(t){t.classList.remove("active")})),n[t].classList.add("active");var o=a[t].offsetTop-120;window.scrollTo({top:o,behavior:"smooth"}),setTimeout((function(){e.isClickNav=!1}),800)},scrollToLightNavItem:function(){var t=this;this.isClickNav||(clearTimeout(this.timerId),this.timerId=setTimeout((function(){var e=document.querySelectorAll(".aside-view-right__navItem"),n=document.querySelectorAll(".action-tit");n&&n.length>0&&(n.forEach((function(t,n){t.offsetTop-120<=document.documentElement.scrollTop&&(e.forEach((function(t){t.classList.remove("active")})),e[n].classList.add("active"))})),document.documentElement.scrollTop<n[0].offsetTop-120&&(e.forEach((function(t){t.classList.remove("active")})),e[0].classList.add("active"))),t.timerId=null}),300))},getMarkdownHeader:function(){var t=this,e=document.querySelector(".markdown-preview").querySelectorAll("h1,h2,h3,h4,h5,h6"),n=7;e.forEach((function(t){var e=parseInt(t.localName.replace("h",""));n=e<n?e:n})),e=Object(a.a)(e).forEach((function(e){var a=parseInt(e.localName.replace("h",""));if(a<n+2){e.classList.add("action-tit");var o=a,i=a===n?e.textContent:"&nbsp;&nbsp;&nbsp;&nbsp;".concat(e.textContent);t.navContent.push({level:o,text:i}),t.$nextTick((function(){var t=document.querySelectorAll(".aside-view-right__navItem");t&&t.length>0&&(t.forEach((function(t){t.classList.remove("active")})),t[0].classList.add("active"))}))}}))},findReleaseDocById:function(){var t=this;return Object(i.a)(Object(o.a)().mark((function e(){var n,a,i,c;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=null,a=null,i=t.$route.params.docId,n={id:i},!t.isRoutePath){e.next=11;break}return n={id:i,approvalNumber:t.approvalNumber},e.next=8,d.a.findDocGroupById(n);case 8:a=e.sent,e.next=14;break;case 11:return e.next=13,d.a.findReleaseDocGroupById(n);case 13:a=e.sent;case 14:(c=a.data)&&c.content?(t.showNoResult=!1,t.docContent=c.content,t.docTitle=c.title,t.updateTime=c.updateTime):t.showNoResult=!0;case 16:case"end":return e.stop()}}),e)})))()}},created:function(){var t=this;return Object(i.a)(Object(o.a)().mark((function e(){return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.findReleaseDocById();case 1:case"end":return e.stop()}}),e)})))()},mounted:function(){window.addEventListener("scroll",this.scrollToLightNavItem),this.genReleaseDocPdf()},destroyed:function(){window.removeEventListener("scroll",this.scrollToLightNavItem)}},p=v,h=(n("4481"),n("2877")),b=Object(h.a)(p,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"access-guide-doc"},[e("el-container",{staticClass:"access-guide-container"},[t.showNoResult?t._e():e("el-main",{staticClass:"main-view"},[e("h2",{staticClass:"title"},[t._v(" "+t._s(t.docTitle)+" ")]),e("div",{staticClass:"update-time-evaluation"},[e("p",[t._v(t._s(t.formatUpdateTimeText))]),e("ScreenshotEvaluation",{attrs:{objId:t.docId,docTypeMain:t.docTypeMain,bizUnitId:t.unitId,helpful:t.helpful,buttonLoading:t.buttonLoading,evaluationButtonDisabled:t.evaluationButtonDisabled,inline:""},on:{"update:helpful":function(e){t.helpful=e},"update:buttonLoading":function(e){t.buttonLoading=e},"update:button-loading":function(e){t.buttonLoading=e},"update:evaluationButtonDisabled":function(e){t.evaluationButtonDisabled=e},"update:evaluation-button-disabled":function(e){t.evaluationButtonDisabled=e}}})],1),e("el-divider",{staticClass:"help-divider"}),t.docContent?e("MarkdownPreview",{staticClass:"markdown-preview",attrs:{after:t.getMarkdownHeader},model:{value:t.docContent,callback:function(e){t.docContent=e},expression:"docContent"}}):t._e(),e("el-divider"),e("ScreenshotEvaluation",{attrs:{objId:t.docId,docTypeMain:t.docTypeMain,bizUnitId:t.unitId,helpful:t.helpful,buttonLoading:t.buttonLoading,evaluationButtonDisabled:t.evaluationButtonDisabled},on:{"update:helpful":function(e){t.helpful=e},"update:buttonLoading":function(e){t.buttonLoading=e},"update:button-loading":function(e){t.buttonLoading=e},"update:evaluationButtonDisabled":function(e){t.evaluationButtonDisabled=e},"update:evaluation-button-disabled":function(e){t.evaluationButtonDisabled=e}}}),e("el-button",{staticStyle:{position:"absolute",top:"24px",right:"20px"},attrs:{type:"primary",plain:""},on:{click:function(e){return t.downBasicSdk()}}},[t._v(t._s(t.$t("docContent.5ivhevpfxdo1")))])],1),e("aside",{staticClass:"aside-view-right",class:{"aside-view-right-preview":t.isRoutePath}},[t.navContent.length>0?e("ul",{staticClass:"aside-view-right__navList"},t._l(t.navContent,(function(n,a){return e("li",{key:a,staticClass:"aside-view-right__navItem",on:{click:function(e){return t.selectNavItem(a)}}},[e("div",{staticStyle:{"text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap"},domProps:{innerHTML:t._s(n.text)}})])})),0):t._e()])],1),t.isRoutePath?t._e():e("BlackFooter")],1)}),[],!1,null,"fe14d4fe",null);e.default=b.exports},e509:function(t,e,n){}}]);