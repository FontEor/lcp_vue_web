(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d208059a"],{"0160":function(e,t,n){},2165:function(e,t,n){},"28f6":function(e,t,n){"use strict";n("2165")},"3fff":function(e,t,n){"use strict";n("7a14")},"453c":function(e,t,n){"use strict";n.r(t);var i=(n("b0c0"),function(){var e=this,t=e._self._c;return"AccessGuide"===e.docType||"AccessGuideDetail"===e.docType||"AccessGuidePreview"===e.docType||"AccessGuideDetailPreview"===e.docType?t("AccessGuideMenu"):"ApiDoc"===e.docType||"ApiDocDetail"===e.docType||"ApiDocPreview"===e.docType||"ApiDocDetailPreview"===e.docType?t("ApiMenu"):"MessageDoc"===e.docType||"MessageDocDetail"===e.docType||"MessageDocPreview"===e.docType||"MessageDocDetailPreview"===e.docType?t("MessageMenu"):"CommonDevelopmentTools"===e.docType||"CommonDevelopmentToolsDetail"===e.docType?t("CommonDevelopmentToolsMenu",{attrs:{isShrink:e.isShrink}}):e._e()}),s=(n("d3b7"),n("25f0"),function(){var e=this,t=e._self._c;return t("div",{staticClass:"access-guide-menu",class:{"access-guide-menu-preview":e.isRoutePath}},e._l(e.menuList,(function(n,i){return t("el-menu",{key:i,staticClass:"access-guide-menu__menu",attrs:{"default-active":e.defaultActive},on:{select:e.selectMenu}},[n.children?t("el-submenu",{key:n.id.toString(),staticClass:"menu__outer-submenu",attrs:{index:n.id.toString()}},[t("template",{slot:"title"},[t("span",{staticClass:"outer-submenu__title",attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.title))])]),t("SubMenu",{attrs:{menuList:n.children}})],2):t("el-menu-item",{key:n.id.toString(),staticClass:"menu__outer-menu-item",attrs:{index:n.id.toString()}},[t("span",{staticClass:"outer-menu-item__title",attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.title))])])],1)})),1)}),a=n("c7eb"),u=n("1da1"),o=(n("ac1f"),n("5319"),n("d9e2"),function(){var e=this,t=e._self._c;return t("div",{staticClass:"submenu"},[e._l(this.menuList,(function(n){return[n.children?t("el-submenu",{key:n.id.toString(),staticClass:"submenu__inner-submenu",attrs:{index:n.id.toString()}},[t("template",{slot:"title"},[t("span",{staticClass:"inner-submenu__title",attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.title))])]),t("SubMenu",{attrs:{menuList:n.children}})],2):t("el-menu-item",{key:n.id.toString(),staticClass:"submenu__inner-menu-item",attrs:{index:n.id.toString()}},[t("span",{staticClass:"inner-menu-item__title",attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.title))])])]}))],2)}),r={name:"SubMenu",props:{menuList:{type:Array,require:!0}},created:function(){}},c=(n("28f6"),n("2877")),l=Object(c.a)(r,o,[],!1,null,"01e81116",null).exports,m=n("b32d"),d=n("722b"),p={name:"AccessGuideMenu",components:{SubMenu:l},data:function(){return{menuList:[],docId:""}},computed:{defaultActive:function(){if(this.$route.params.docId)return this.$route.params.docId.toString()},isRoutePath:function(){return"preview-docking-plan"===this.$route.path.split("/")[1]},unitId:function(){return this.$route.params.unitId},approvalNumber:function(){return d.a.approvalNumber}},methods:{selectMenu:function(e){var t="AccessGuideDetail",n={};this.isRoutePath&&(t="AccessGuideDetailPreview",n={approvalNumber:d.a.approvalNumber}),this.$router.replace({name:t,params:{docId:e},query:n}).catch((function(e){if(-1===e.message.indexOf("Avoided redundant navigation to current location"))throw new Error(e)}))},initDefaultActiveMenuItem:function(e){var t=this;return e.some((function(e){var n=e.id,i=e.children;return i&&i.length>0?t.initDefaultActiveMenuItem(i):(t.docId=n.toString(),!0)}))},getMenuList:function(e){var t=this;return Object(u.a)(Object(a.a)().mark((function n(){var i;return Object(a.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i={objId:t.unitId},t.isRoutePath&&(i={id:t.unitId,approvalNumber:t.approvalNumber}),n.next=4,Object(m.a)({url:e,method:"get",params:i}).catch((function(e){}));case 4:return n.abrupt("return",n.sent);case 5:case"end":return n.stop()}}),n)})))()},handleMenuData:function(){var e=this,t="/doc/getDocByGroupByTree";this.isRoutePath&&(t="/bizview/getDocPreByGroupByTree"),this.getMenuList(t).then((function(t){var n=t.data;e.menuList=n||[],e.initDefaultActiveMenuItem(e.menuList);var i=e.docId;"AccessGuide"===e.$route.name&&e.$router.replace({name:"AccessGuideDetail",params:{docId:i}}),"AccessGuidePreview"===e.$route.name&&e.$router.replace({name:"AccessGuideDetailPreview",params:{docId:i},query:{approvalNumber:d.a.approvalNumber}})})).catch((function(e){}))}},created:function(){this.handleMenuData()}},h=p,f=(n("9e86"),Object(c.a)(h,s,[],!1,null,"6a23d2ee",null)).exports,v=(n("caad"),n("2532"),{name:"ApiMenu",data:function(){return{isEmpty:!1,menuList:[],cnName:"",unitId:0,disableTooltip:!0}},computed:{defaultActive:function(){if(this.$route.params.docId)return this.$route.params.docId.toString()},isRoutePath:function(){return"preview-docking-plan"===this.$route.path.split("/")[1]}},methods:{handleMouseEnter:function(e){var t=e.target.querySelector(".menu-item__code"),n=e.target.querySelector(".menu-item__name");t.scrollWidth>t.offsetWidth||n.scrollWidth>n.offsetWidth?this.disableTooltip=!1:this.disableTooltip=!0},selectMenu:function(e){var t=this.isRoutePath?{approvalNumber:d.a.approvalNumber}:null;this.$router.replace({name:this.isRoutePath?"ApiDocDetailPreview":"ApiDocDetail",params:{docId:e},query:t}).catch((function(e){var t=e.name,n=e.message;if("NavigationDuplicated"!==t&&!n.includes("Avoided redundant navigation to current location"))throw new Error(e)}))},getMenuListData:function(){var e=this;return Object(u.a)(Object(a.a)().mark((function t(){var n,i,s;return Object(a.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.unitId,i={unitId:n},s="/bizapinterface/getApiDocListByCategory",e.isRoutePath&&(s="/bizview/getApiListByCategory",i={id:n,approvalNumber:d.a.approvalNumber}),t.next=6,Object(m.a)({url:s,method:"get",params:i}).catch((function(e){}));case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t)})))()},handleMenuListData:function(){var e=this;return Object(u.a)(Object(a.a)().mark((function t(){var n,i;return Object(a.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getMenuListData();case 2:if(t.t0=t.sent,t.t0){t.next=5;break}t.t0={};case 5:n=t.t0,i=n.data,e.menuList=i||[],d.a.SET_Api_Doc_List_Len(e.menuList.length),e.menuList.length>0?("ApiDoc"===e.$route.name&&e.$router.replace({name:"ApiDocDetail",params:{docId:e.menuList[0].apiList&&e.menuList[0].apiList.length>0?e.menuList[0].apiList[0].id:null}}),"ApiDocPreview"===e.$route.name&&e.$router.replace({name:"ApiDocDetailPreview",params:{docId:e.menuList[0].apiList&&e.menuList[0].apiList.length>0?e.menuList[0].apiList[0].id:null},query:{approvalNumber:d.a.approvalNumber}})):(document.querySelector(".aside-container").style.width="100vw",e.isEmpty=!0);case 10:case"end":return t.stop()}}),t)})))()}},created:function(){this.unitId=this.$route.params.unitId,this.handleMenuListData()},destroyed:function(){document.querySelector(".aside-container").style.width="290px"}}),_=v,g=(n("3fff"),Object(c.a)(_,(function(){var e=this,t=e._self._c;return t("div",{class:{"api-menu":!0,"is-empty":e.isEmpty,"api-menu-preview":e.isRoutePath},attrs:{"date-content":e.$t("asideMenu.apiMenu.5iwca6y3x940")}},[t("el-menu",{staticClass:"api-menu__menu",attrs:{"default-active":e.defaultActive},on:{select:e.selectMenu}},e._l(e.menuList,(function(n){return t("el-submenu",{key:n.code,staticClass:"menu__submenu",attrs:{index:n.code}},[t("template",{slot:"title"},[t("span",{staticClass:"submenu__title",attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.name))])]),e._l(n.apiList,(function(n){return t("el-menu-item",{key:n.id,staticClass:"submenu__menu-item",attrs:{index:n.id.toString()}},[t("div",{on:{mouseenter:function(t){return e.handleMouseEnter(t)}}},[t("el-tooltip",{attrs:{placement:"top",disabled:e.disableTooltip,"popper-class":"option-item-popper"},scopedSlots:e._u([{key:"content",fn:function(){return[t("p",{staticClass:"menu-item__code"},[e._v(" "+e._s(n.apiUrl)+" ")]),t("p",{staticClass:"menu-item__name"},[e._v(" "+e._s(n.apiName)+" ")])]},proxy:!0}],null,!0)},[t("div",{staticClass:"item__text-wrapper"},[t("p",{staticClass:"menu-item__code"},[e._v(" "+e._s(n.apiUrl)+" ")]),t("p",{staticClass:"menu-item__name"},[e._v(" "+e._s(n.apiName)+" ")])])])],1)])}))],2)})),1)],1)}),[],!1,null,"063574f4",null)),b=g.exports,y=(n("a9e3"),n("d984")),w={name:"MessageMenu",data:function(){return{isEmpty:!1,menuList:[],cnName:"",unitId:0,disableTooltip:!0}},computed:{defaultActive:function(){if(this.$route.params.docId)return this.$route.params.docId.toString()},isRoutePath:function(){return"preview-docking-plan"===this.$route.path.split("/")[1]}},methods:{handleMouseEnter:function(e){var t=e.target.querySelector(".menu-item__code"),n=e.target.querySelector(".menu-item__name");t.scrollWidth>t.offsetWidth||n.scrollWidth>n.offsetWidth?this.disableTooltip=!1:this.disableTooltip=!0},selectMenu:function(e){var t=this.isRoutePath?{approvalNumber:d.a.approvalNumber}:null;this.$router.replace({name:this.isRoutePath?"MessageDocDetailPreview":"MessageDocDetail",params:{docId:e},query:t}).catch((function(e){var t=e.name,n=e.message;if("NavigationDuplicated"!==t&&!n.includes("Avoided redundant navigation to current location"))throw new Error(e)}))},getMenuList:function(){var e=this;return Object(u.a)(Object(a.a)().mark((function t(){var n;return Object(a.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getBizUnitMessageByCategory();case 2:if(n=t.sent,!e.isRoutePath){t.next=7;break}return t.next=6,e.getBizUnitMessagePreByCategory();case 6:n=t.sent;case 7:n&&n.data&&(e.menuList=n.data),d.a.SET_Message_Doc_List_Len(e.menuList.length),e.menuList.length>0?("MessageDoc"===e.$route.name&&e.$router.replace({name:"MessageDocDetail",params:{docId:e.menuList[0].messageList&&e.menuList[0].messageList.length>0?e.menuList[0].messageList[0].id:null}}),"MessageDocPreview"===e.$route.name&&e.$router.replace({name:"MessageDocDetailPreview",params:{docId:e.menuList[0].messageList&&e.menuList[0].messageList.length>0?e.menuList[0].messageList[0].id:null},query:{approvalNumber:d.a.approvalNumber}})):(document.querySelector(".aside-container").style.width="100vw",e.isEmpty=!0);case 10:case"end":return t.stop()}}),t)})))()},getBizUnitMessageByCategory:function(){var e=this;return Object(u.a)(Object(a.a)().mark((function t(){var n;return Object(a.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={unitId:Number(e.unitId)},t.next=3,y.a.bizmsg.getBizUnitMessageByCategory(n).catch((function(e){throw new Error("getBizUnitMessageByCategory"+e)}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()},getBizUnitMessagePreByCategory:function(){var e=this;return Object(u.a)(Object(a.a)().mark((function t(){var n;return Object(a.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={id:Number(e.unitId),approvalNumber:d.a.approvalNumber},t.next=3,y.a.bizview.getBizUnitMessagePreByCategory(n).catch((function(e){}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()}},created:function(){this.unitId=this.$route.params.unitId,this.getMenuList()},destroyed:function(){document.querySelector(".aside-container").style.width="290px"}},M=w,L=(n("a5c4"),Object(c.a)(M,(function(){var e=this,t=e._self._c;return t("div",{class:{"message-menu":!0,"is-empty":e.isEmpty,"message-menu-preview":e.isRoutePath},attrs:{"data-content":e.$t("asideMenu.messageMenu.5iwbtrsqcgg0")}},[t("el-menu",{staticClass:"message-menu__menu",attrs:{"default-active":e.defaultActive},on:{select:e.selectMenu}},e._l(e.menuList,(function(n){return t("el-submenu",{key:n.code,staticClass:"menu__submenu",attrs:{index:n.code}},[t("template",{slot:"title"},[t("span",{staticClass:"submenu__title",attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.name))])]),e._l(n.messageList,(function(n){return t("el-menu-item",{key:n.id,staticClass:"submenu__menu-item",attrs:{index:n.id.toString()}},[t("div",{on:{mouseenter:function(t){return e.handleMouseEnter(t)}}},[t("el-tooltip",{attrs:{placement:"top",disabled:e.disableTooltip,"popper-class":"option-item-popper"},scopedSlots:e._u([{key:"content",fn:function(){return[t("p",{staticClass:"menu-item__code"},[e._v(" "+e._s(n.name)+" ")]),t("p",{staticClass:"menu-item__name"},[e._v(" "+e._s(n.chineseName)+" ")])]},proxy:!0}],null,!0)},[t("div",{staticClass:"item__text-wrapper"},[t("p",{staticClass:"menu-item__code"},[e._v(" "+e._s(n.name)+" ")]),t("p",{staticClass:"menu-item__name"},[e._v(" "+e._s(n.chineseName)+" ")])])])],1)])}))],2)})),1)],1)}),[],!1,null,"263c3f50",null)),D=L.exports,C={name:"CommonDevelopmentToolsMenu",props:{isShrink:{type:Boolean}},data:function(){return{}},computed:{defaultActive:function(){return this.$route.params.toolName||"api-test"},computeMenuItemTextVisible:function(){return!this.isShrink}},methods:{pushNewRoute:function(e){this.$router.replace({name:"CommonDevelopmentToolsDetail",params:{toolName:e}}).catch((function(e){var t=e.name,n=e.message;if("NavigationDuplicated"!==t&&!n.includes("Avoided redundant navigation to current location"))throw new Error(e)}))},selectMenu:function(e){this.pushNewRoute(e)}},created:function(){this.pushNewRoute(this.defaultActive)},mounted:function(){document.querySelector(".aside-container").style.width="150px"},destroyed:function(){document.querySelector(".aside-container").style.width="290px"}},A=C,x=(n("dee3"),Object(c.a)(A,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"common-development-tools-menu"},[t("el-menu",{staticClass:"common-development-tools-menu__menu",attrs:{"default-active":e.defaultActive},on:{select:e.selectMenu}},[t("el-menu-item",{staticClass:"menu__menu-item",attrs:{index:"api-test"}},[t("div",{staticClass:"menu-item__icon api-test-icon"}),t("h4",{directives:[{name:"show",rawName:"v-show",value:e.computeMenuItemTextVisible,expression:"computeMenuItemTextVisible"}],staticClass:"menu-item__title"},[e._v(" API测试工具 ")])]),t("el-menu-item",{staticClass:"menu__menu-item",attrs:{index:"sign"}},[t("div",{staticClass:"menu-item__icon sign-icon"}),t("h4",{directives:[{name:"show",rawName:"v-show",value:e.computeMenuItemTextVisible,expression:"computeMenuItemTextVisible"}],staticClass:"menu-item__title"},[e._v(" 签名生成工具 ")])])],1)],1)}),[],!1,null,"3015c30e",null)),I={name:"AsideMenu",components:{AccessGuideMenu:f,ApiMenu:b,MessageMenu:D,CommonDevelopmentToolsMenu:x.exports},props:{isShrink:{type:Boolean}},data:function(){return{docType:this.$route.name}},watch:{"$route.name":{handler:function(e){this.docType=e}}}},S=I,k={name:"DocMain",components:{AsideMenu:Object(c.a)(S,i,[],!1,null,null,null).exports},data:function(){return{isShrink:!1,scrollLeft:0}},computed:{key:function(){return this.$route.fullPath},computeResizeButtonVisible:function(){return"CommonDevelopmentToolsDetail"===this.$route.name},computeResizeButtonIconClassName:function(){return this.isShrink?"el-icon-arrow-right":"el-icon-arrow-left"},computeAsideWidth:function(){return this.computeResizeButtonVisible||(this.isShrink=!1),this.computeResizeButtonVisible?this.isShrink?60:150:290},computeResizeButtonLeft:function(){var e=this.scrollLeft;return this.isShrink?60-e:150-e}},methods:{onClickResizeButton:function(){this.isShrink=!this.isShrink},scrollToLightNavItem:function(){this.scrollLeft=document.documentElement.scrollLeft}},mounted:function(){window.addEventListener("scroll",this.scrollToLightNavItem),this.scrollToLightNavItem()},destroyed:function(){document.querySelector(".aside-container").style.width="100vw",window.removeEventListener("scroll",this.scrollToLightNavItem)}},N=k,T=(n("a500"),Object(c.a)(N,(function(){var e=this,t=e._self._c;return t("el-container",{staticClass:"doc-main"},[t("el-aside",{staticClass:"doc-main__aside aside-container",class:{"doc-main__aside":!0,"aside-container":!0,"common-development-tools":e.computeResizeButtonVisible},style:{width:e.computeAsideWidth+"px"}},[t("AsideMenu",{attrs:{isShrink:e.isShrink}}),e.computeResizeButtonVisible?t("div",{staticClass:"aside__resize-button",style:{left:e.computeResizeButtonLeft+"px"},on:{click:e.onClickResizeButton}},[t("i",{class:e.computeResizeButtonIconClassName})]):e._e()],1),t("el-main",[t("router-view",{key:e.key})],1)],1)}),[],!1,null,"07dc9290",null));t.default=T.exports},"7a14":function(e,t,n){},8228:function(e,t,n){},"9e86":function(e,t,n){"use strict";n("b6649")},a500:function(e,t,n){"use strict";n("0160")},a5c4:function(e,t,n){"use strict";n("fc65")},b6649:function(e,t,n){},dee3:function(e,t,n){"use strict";n("8228")},fc65:function(e,t,n){}}]);