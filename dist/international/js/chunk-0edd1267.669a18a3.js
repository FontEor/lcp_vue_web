(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0edd1267"],{"083a":function(t,e,n){"use strict";var i=n("0d51"),c=TypeError;t.exports=function(t,e){if(!delete t[e])throw c("Cannot delete property "+i(e)+" of "+i(t))}},"13d5":function(t,e,n){"use strict";var i=n("23e7"),c=n("d58f").left,a=n("a640"),s=n("2d00");i({target:"Array",proto:!0,forced:!n("605d")&&s>79&&s<83||!a("reduce")},{reduce:function(t){var e=arguments.length;return c(this,t,e,e>1?arguments[1]:void 0)}})},a434:function(t,e,n){"use strict";var i=n("23e7"),c=n("7b0b"),a=n("23cb"),s=n("5926"),r=n("07fa"),o=n("3a34"),u=n("3511"),l=n("65f0"),d=n("8418"),h=n("083a"),p=n("1dde")("splice"),f=Math.max,m=Math.min;i({target:"Array",proto:!0,forced:!p},{splice:function(t,e){var n,i,p,v,g,j,b=c(this),x=r(b),D=a(t,x),w=arguments.length;for(0===w?n=i=0:1===w?(n=0,i=x-D):(n=w-2,i=m(f(s(e),0),x-D)),u(x+n-i),p=l(b,i),v=0;v<i;v++)(g=D+v)in b&&d(p,v,b[g]);if(p.length=i,n<i){for(v=D;v<x-i;v++)j=v+n,(g=v+i)in b?b[j]=b[g]:h(b,j);for(v=x;v>x-i+n;v--)h(b,v-1)}else if(n>i)for(v=x-i;v>D;v--)j=v+n-1,(g=v+i-1)in b?b[j]=b[g]:h(b,j);for(v=0;v<n;v++)b[v+D]=arguments[v+2];return o(b,x-i+n),p}})},ab7c:function(t,e,n){"use strict";n("cdd8")},cdd8:function(t,e,n){},d4df:function(t,e,n){"use strict";n.r(e),n("b0c0"),n("a4d3"),n("e01a");var i=n("c7eb"),c=n("5530"),a=n("ade3"),s=n("1da1"),r=(n("13d5"),n("d3b7"),n("99af"),n("a434"),n("d81d"),n("14d9"),n("722b")),o=n("b32d"),u=n("48ea"),l=n("1cbd"),d={name:"HelpDocument",data:function(){return{curIdx:0,isFixed:!1,scrollY:0,offsetTop:0,listHeight:[],tabIdx:0,list:[],scope:"",selectDefault:[],selectRoot:[],initListIntranet:{classify:"lcpmanual",classifyName:this.$t("helpDocument.index.5ivk7jgumc00"),rows:[{id:null,name:this.$t("helpDocument.index.5ivk7jgumfw0"),description:this.$t("helpDocument.index.5ivk7jgumjc0"),clstag:"helpDocument_1618992600988|3"},{id:null,name:this.$t("helpDocument.index.5ivk7jgumjc1"),description:this.$t("helpDocument.index.5ivk7jgummk0"),clstag:"helpDocument_1618992600988|4"},{id:null,name:this.$t("helpDocument.index.5ivk7jgumps0"),description:this.$t("helpDocument.index.5ivk7jgumt00"),clstag:"helpDocument_1618992600988|5"}]},initListExtranet:{classify:"lcpmanual",classifyName:this.$t("helpDocument.index.5ivk7jgumc00"),rows:[{id:null,name:this.$t("helpDocument.index.5ivk7jgumfw0"),description:this.$t("helpDocument.index.5ivk7jgumjc0")},{id:null,name:this.$t("helpDocument.index.5ivk7jgumwg0"),description:this.$t("helpDocument.index.5ivk7jgun0s0")},{id:null,name:this.$t("helpDocument.index.5ivk7jgumps0"),description:this.$t("helpDocument.index.5ivk7jgumt00")},{id:147,name:this.$t("helpDocument.index.5ivk7jgun3w0"),description:this.$t("helpDocument.index.5ivk7jgun780")},{id:170,name:this.$t("helpDocument.index.5ivk7jgunag0"),description:this.$t("helpDocument.index.5ivk7jgundg0")}]}}},computed:{currentIndex:function(){if(!this.isFixed)return 0;for(var t=0,e=this.listHeight.length;t<e;t++){var n=this.listHeight[t],i=this.listHeight[t+1];if(!i||this.scrollY>=n&&this.scrollY<i)return t}return 0}},methods:{clstag:function(t,e){return Object(l.a)(t,e)},fetchSoftWareSystem:function(){var t=this;return Object(s.a)(Object(i.a)().mark((function e(){var n,s;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(u.a)()?"product/release/classifiedProducts":"outer/product/classifiedProducts","get",e.next=4,Object(o.a)({url:n,method:"get"}).catch((function(t){throw t}));case 4:s=e.sent,t.list=s.data,t.list=t.list.reduce((function(e,n){var i=n.classify,c=n.classifyName;return e.concat("lcpmanual"===i&&c===t.$t("helpDocument.index.5ivk7jgunh40")?[]:[n])}),[]),t.list.splice(0,0,Object(u.a)()?t.initListIntranet:t.initListExtranet),t.list=t.list.map((function(e){var n,i,s=(n={},Object(a.a)(n,t.$t("helpDocument.index.5ivk7jgunn41"),"helpDocument_1618992600988|1"),Object(a.a)(n,t.$t("helpDocument.index.5ivk7jgunn42"),"helpDocument_1618992600988|2"),n),r=(i={},Object(a.a)(i,t.$t("helpDocument.index.5ivk7jgunn41"),"helpDocument_1618993202645|1"),Object(a.a)(i,t.$t("helpDocument.index.5ivk7jgunn43"),"helpDocument_1618993202645|2"),Object(a.a)(i,t.$t("helpDocument.index.5ivk7jgunn42"),"helpDocument_1618993202645|3"),i),o=[s[e.classifyName]||"",r[e.classifyName]||""];return Object(c.a)(Object(c.a)({},e),{},{clstag:o})}));case 9:case"end":return e.stop()}}),e)})))()},fetchDocList:function(t){return Object(s.a)(Object(i.a)().mark((function e(){var n,c,a;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"doc/getReleaseDocList","get",n={NewHand:function(){return Object(u.a)()?"5":"1"},ApiNewHand:function(){return Object(u.a)()?"7":null},DevSupport:function(){return Object(u.a)()?null:"2"}}[t](),c={type:n},e.next=7,Object(o.a)({url:"doc/getReleaseDocList",method:"get",params:c}).catch((function(t){throw t}));case 7:return a=e.sent,e.abrupt("return",a.data.list&&a.data.list.length>0?a.data.list[0].id:null);case 9:case"end":return e.stop()}}),e)})))()},fetchQuestion:function(){return Object(s.a)(Object(i.a)().mark((function t(){var e,n,c;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"question/getQuestionType","get",e=Object(u.a)()?"2":"1",n={netType:e},t.next=6,Object(o.a)({url:"question/getQuestionType",method:"get",params:n}).catch((function(t){throw t}));case 6:return c=t.sent,t.abrupt("return",c.data&&c.data.length>0?c.data[0].value:null);case 8:case"end":return t.stop()}}),t)})))()},queryDocSoftwareSystem:function(t,e,n,c){var r=this;return Object(s.a)(Object(i.a)().mark((function e(){var c,s,o,u,l;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.classifyName!==r.$t("helpDocument.index.5ivk7jgumc00")){e.next=20;break}if(c={},Object(a.a)(c,r.$t("helpDocument.index.5ivk7jgumfw0"),"NewHand"),Object(a.a)(c,r.$t("helpDocument.index.5ivk7jgumjc1"),"ApiNewHand"),Object(a.a)(c,r.$t("helpDocument.index.5ivk7jgumwg0"),"DevSupport"),s=c,t.name!==r.$t("helpDocument.index.5ivk7jgumps0")){e.next=9;break}return e.next=5,r.fetchQuestion().catch((function(t){throw t}));case 5:(o=e.sent)?r.$router.push("/question/".concat(o)):r.$confirm(r.$t("helpDocument.index.5ivk7jgunkc0"),{type:"warning",center:!0}),e.next=18;break;case 9:if(!(t.name.indexOf(r.$t("helpDocument.index.5ivk7jgunn40"))>-1)){e.next=14;break}u=t.id,"uat"===window.env.baseEnv||"prod"===window.env.baseEnv?r.$router.push({path:"/quick",query:{id:u}}):r.$confirm(r.$t("helpDocument.index.5ivk7jgunkc0"),{type:"warning",center:!0}),e.next=18;break;case 14:return e.next=16,r.fetchDocList(s[t.name]).catch((function(t){throw t}));case 16:(l=e.sent)?r.$router.push({name:s[t.name],params:{docId:l}}):r.$confirm(r.$t("helpDocument.index.5ivk7jgunkc0"),{type:"warning",center:!0});case 18:e.next=21;break;case 20:r.fetchDocTree(t.id);case 21:case"end":return e.stop()}}),e)})))()},fetchDocTree:function(t){var e=this;return Object(s.a)(Object(i.a)().mark((function n(){var c,a,s;return Object(i.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c=Object(u.a)()?"/doc/getReleasedProductDocTree":"/outer/doc/getReleasedProductDocTree","get",a={productId:t},n.next=6,Object(o.a)({url:c,method:"get",params:a}).catch((function(t){throw t}));case 6:s=n.sent,e.data=s.data[0].children,null!==e.data&&(e.fetchDefaultDocId(e.data[0]),0===e.selectDefault.length&&e.selectRoot.push(s.data[0].id)),0==e.selectDefault.length?e.$router.push({name:"DocSoftwareSystem",params:{id:t}}):e.$router.push({name:"DocSoftwareSystem",params:{id:t,docId:e.selectDefault[0]}});case 10:case"end":return n.stop()}}),n)})))()},fetchDefaultDocId:function(t){if(0===this.selectDefault.length)if(2===t.docType)this.selectDefault.push(t.id);else{var e=t.children;if(e)for(var n=0;n<e.length;n++)this.fetchDefaultDocId(e[n])}},calculateHeight:function(){var t=this.$refs.viewsWrapper.getElementsByClassName("view-item"),e=300;this.listHeight.push(e);for(var n=0,i=t.length;n<i;n++){e+=t[n].clientHeight,this.listHeight.push(e)}},selectMenu:function(t){this.curIdx=t;var e=this.$refs.viewsWrapper.getElementsByClassName("view-item")[t];window.scrollTo&&window.scrollTo({behavior:"smooth",top:e.offsetTop-60})},handleScroll:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scrollY=Math.abs(Math.round(t)),this.isFixed=t>=this.offsetTop,t>=this.offsetTop?r.a.SET_NAVBAR_FIXED(!1):r.a.SET_NAVBAR_FIXED(!0)}},mounted:function(){var t=this;return Object(s.a)(Object(i.a)().mark((function e(){return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.fetchSoftWareSystem();case 2:window.addEventListener("scroll",t.handleScroll),t.$nextTick((function(){t.offsetTop=t.$refs.menuWrapper.offsetTop,t.calculateHeight()}));case 4:case"end":return e.stop()}}),e)})))()},destroyed:function(){window.removeEventListener("scroll",this.handleScroll),r.a.SET_NAVBAR_FIXED(!0)}},h=d,p=(n("ab7c"),n("2877")),f=Object(p.a)(h,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"help-document"},[e("div",{staticClass:"banner-view"},[e("div",{staticClass:"com-wrapper"},[e("h2",{staticClass:"tit"},[t._v(t._s(t.$t("helpDocument.index.5ivk7jgul740")))]),e("p",{staticClass:"tip"},[t._v(t._s(t.$t("helpDocument.index.5ivk7jgulzo0")))])])]),e("div",{staticClass:"com-subnav"},[e("div",{ref:"menuWrapper",staticClass:"com-subnav-tabs",class:{is_fixed:t.isFixed}},t._l(t.list,(function(n,i){return e("a",{key:i,staticClass:"tab",class:{active:t.curIdx==i},attrs:{clstag:t.clstag(n.clstag[0]||"",n.clstag[1]||"")},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.selectMenu(i)}}},[t._v(" "+t._s(n.classifyName)+" ")])})),0)]),e("div",{ref:"viewsWrapper",staticClass:"viewsWrapper"},[e("div",{staticClass:"com-wrapper"},t._l(t.list,(function(n,i){return e("div",{key:i,staticClass:"view-item"},[e("h2",{staticClass:"tit"},[t._v(t._s(n.classifyName))]),[n.rows&&n.rows.length>0?e("el-row",{attrs:{gutter:16}},t._l(n.rows,(function(c,a){return e("el-col",{key:a,attrs:{span:8}},[e("router-link",{staticClass:"doc-link",attrs:{to:""},nativeOn:{click:function(e){return t.queryDocSoftwareSystem(c,a,n,i)}}},[e("div",{staticClass:"con",attrs:{clstag:t.clstag(c.clstag||"","")}},[e("h3",{staticClass:"tit3"},[t._v(t._s(c.name))]),e("p",{staticClass:"txt te2"},[t._v(t._s(c.description))]),e("div",{staticClass:"detail-button-wrapper"},[e("el-button",{attrs:{type:"text"}},[t._v(t._s(t.$t("helpDocument.index.5ivk7jgum4s0"))+" "),e("i",{staticClass:"el-icon-right"})])],1)])])],1)})),1):e("div",{staticClass:"no-data"},[t._v(" "+t._s(t.$t("helpDocument.index.5ivk7jgum8k0"))+" ")])]],2)})),0)])])}),[],!1,null,"a36f0736",null);e.default=f.exports},d58f:function(t,e,n){var i=n("59ed"),c=n("7b0b"),a=n("44ad"),s=n("07fa"),r=TypeError,o=function(t){return function(e,n,o,u){i(n);var l=c(e),d=a(l),h=s(l),p=t?h-1:0,f=t?-1:1;if(o<2)for(;;){if(p in d){u=d[p],p+=f;break}if(p+=f,t?p<0:h<=p)throw r("Reduce of empty array with no initial value")}for(;t?p>=0:h>p;p+=f)p in d&&(u=n(u,d[p],p,l));return u}};t.exports={left:o(!1),right:o(!0)}}}]);