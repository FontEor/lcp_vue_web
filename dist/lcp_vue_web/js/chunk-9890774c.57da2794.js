(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9890774c"],{2553:function(e,r,t){},"8bc7":function(e,r,t){"use strict";t("2553")},ffc5:function(e,r,t){"use strict";t.r(r),t("b0c0");var o=(t("d9e2"),t("ac1f"),t("00b4"),t("b32d")),a={name:"AboutUs",data:function(){return{form:{name:"",phone:"",company:"",product:"",answer:"",type:-1},rules:{name:[{required:!0,message:"请输入联系人姓名",trigger:"blur"}],phone:[{required:!0,validator:function(e,r,t){if(!r)return t(new Error("手机号不能为空"));if(!/^1[3456789]\d{9}$/.test(r))return t(new Error("手机格式有误"));t()},trigger:"blur"}],company:[{required:!0,message:"请输入公司名称",trigger:"blur"}],product:[{required:!0,message:"请输入要咨询的产品",trigger:"blur"}],answer:[{required:!0,message:"请填写您的问题",trigger:"blur"},{min:1,max:1024,message:"长度在 1 到 1024 个字符",trigger:"blur"}]},feedbackform:{type:"",content:""}}},methods:{onSubmit:function(e){var r=this,t=this.$refs[e];t.validate((function(e){if(!e)return!1;r.feedbackform.content=r.form.name+"|"+r.form.phone+"|"+r.form.company+"|"+r.form.product+"|"+r.form.answer,Object(o.a)({url:"feedback/saveFeedback",method:"post",params:r.feedbackform}).then((function(e){r.$message("问题相关已经提交"),t.resetFields(),r.$router.go(-1)})).catch((function(e){}))}))}},created:function(){this.feedbackform.type="8"}},n=a,s=(t("8bc7"),t("2877")),i=Object(s.a)(n,(function(){var e=this,r=e._self._c;return r("div",{staticClass:"aboutus-page"},[e._m(0),r("div",{staticClass:"form-view"},[r("el-form",{ref:"aboutUsForm",staticClass:"my-form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"联系人姓名",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入联系人姓名"},model:{value:e.form.name,callback:function(r){e.$set(e.form,"name",r)},expression:"form.name"}})],1),r("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[r("el-input",{attrs:{placeholder:"手机号"},model:{value:e.form.phone,callback:function(r){e.$set(e.form,"phone",r)},expression:"form.phone"}})],1),r("el-form-item",{attrs:{label:"公司名称",prop:"company"}},[r("el-input",{attrs:{placeholder:"公司名称"},model:{value:e.form.company,callback:function(r){e.$set(e.form,"company",r)},expression:"form.company"}})],1),r("el-form-item",{attrs:{label:"咨询产品",prop:"product"}},[r("el-input",{attrs:{placeholder:"咨询产品"},model:{value:e.form.product,callback:function(r){e.$set(e.form,"product",r)},expression:"form.product"}})],1),r("el-form-item",{attrs:{label:"具体问题",prop:"answer"}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"具体问题"},model:{value:e.form.answer,callback:function(r){e.$set(e.form,"answer",r)},expression:"form.answer"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.onSubmit("aboutUsForm")}}},[e._v("提 交")])],1)],1)],1),r("div",{staticClass:"bm-bg"})])}),[function(){var e=this._self._c;return e("div",{staticClass:"mini-banner-view"},[e("div",{staticClass:"com-wrapper"},[e("h2",{staticClass:"tit"},[this._v("与我们联系")])])])}],!1,null,"2785660c",null);r.default=i.exports}}]);