(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{761:function(t,e,n){var content=n(762);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(6).default)("beda1088",content,!0,{sourceMap:!1})},762:function(t,e,n){(e=n(5)(!1)).push([t.i,".theme--light.v-input--switch .v-input--switch__thumb{color:#fff}.theme--light.v-input--switch .v-input--switch__track{color:rgba(0,0,0,.38)}.theme--light.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__thumb{color:#fafafa!important}.theme--light.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__track{color:rgba(0,0,0,.12)!important}.theme--dark.v-input--switch .v-input--switch__thumb{color:#bdbdbd}.theme--dark.v-input--switch .v-input--switch__track{color:hsla(0,0%,100%,.3)}.theme--dark.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__thumb{color:#424242!important}.theme--dark.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__track{color:hsla(0,0%,100%,.1)!important}.v-input--switch__thumb,.v-input--switch__track{background-color:currentColor;pointer-events:none;transition:inherit}.v-input--switch__track{border-radius:8px;width:36px;height:14px;left:2px;position:absolute;opacity:.6;right:2px;top:calc(50% - 7px)}.v-input--switch__thumb{border-radius:50%;top:calc(50% - 10px);height:20px;position:relative;width:20px;display:flex;justify-content:center;align-items:center;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-input--switch .v-input--selection-controls__input{width:38px}.v-input--switch .v-input--selection-controls__ripple{top:calc(50% - 24px)}.v-input--switch.v-input--dense .v-input--switch__thumb{width:18px;height:18px}.v-input--switch.v-input--dense .v-input--switch__track{height:12px;width:32px}.v-input--switch.v-input--dense.v-input--switch--inset .v-input--switch__track{height:22px;width:44px;top:calc(50% - 12px);left:-3px}.v-input--switch.v-input--dense .v-input--selection-controls__ripple{top:calc(50% - 22px)}.v-input--switch.v-input--is-dirty.v-input--is-disabled{opacity:.6}.v-application--is-ltr .v-input--switch .v-input--selection-controls__ripple{left:-14px}.v-application--is-ltr .v-input--switch.v-input--dense .v-input--selection-controls__ripple{left:-12px}.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--switch__thumb{transform:translate(20px)}.v-application--is-rtl .v-input--switch .v-input--selection-controls__ripple{right:-14px}.v-application--is-rtl .v-input--switch.v-input--dense .v-input--selection-controls__ripple{right:-12px}.v-application--is-rtl .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,.v-application--is-rtl .v-input--switch.v-input--is-dirty .v-input--switch__thumb{transform:translate(-20px)}.v-input--switch:not(.v-input--switch--flat):not(.v-input--switch--inset) .v-input--switch__thumb{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.v-input--switch--inset .v-input--selection-controls__input,.v-input--switch--inset .v-input--switch__track{width:48px}.v-input--switch--inset .v-input--switch__track{border-radius:14px;height:28px;left:-4px;opacity:.32;top:calc(50% - 14px)}.v-application--is-ltr .v-input--switch--inset .v-input--selection-controls__ripple,.v-application--is-ltr .v-input--switch--inset .v-input--switch__thumb{transform:translate(0)!important}.v-application--is-rtl .v-input--switch--inset .v-input--selection-controls__ripple,.v-application--is-rtl .v-input--switch--inset .v-input--switch__thumb{transform:translate(-6px)!important}.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb{transform:translate(20px)!important}.v-application--is-rtl .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,.v-application--is-rtl .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb{transform:translate(-26px)!important}",""]),t.exports=e},764:function(t,e,n){"use strict";n(41),n(75),n(46),n(23),n(219),n(42),n(59),n(36);var r=n(1),l=n(3),o=n(83),c=n(72);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(l.a)(o.a,Object(c.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:v({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},770:function(t,e,n){"use strict";n(111),n(112);var r=n(1),l=(n(415),n(761),n(148)),o=n(29),c=n(86),h=n(61),v=n(221),d=n(0);function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=l.a.extend({name:"v-switch",directives:{Touch:c.a},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return f(f({},o.a.options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",f(f({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",f({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",f({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(h.c,{},[!1===this.loading?null:this.$slots.progress||this.$createElement(v.a,{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===d.x.left&&this.isActive||t.keyCode===d.x.right&&!this.isActive)&&this.onChange()}}})},832:function(t,e,n){"use strict";n.r(e);n(99);var r={data:function(){return{template_items:[],template_name:"",template_temp_field_name:"",template_temp_field_type:"",template_temp_field_default:"",template_temp_field_required:!1,template_temp_field_edit_start_before:!1,template_types:["TextField","Barcode","Date","Image"]}},methods:{addRow:function(){var t={};t.name=this.template_temp_field_name,t.type=this.template_temp_field_type,t.default=this.template_temp_field_default,t.required=this.template_temp_field_required,t.edit_before_start=this.template_temp_field_edit_start_before,this.template_items.push(t)},remove_key:function(t){this.template_items.splice(t,1)}}},l=n(13),o=n(40),c=n.n(o),h=n(172),v=n(271),d=n(26),_=n(736),f=n(743),m=n(764),w=n(138),x=n(740),y=n(722),O=n(725),k=n(770),C=n(73),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-container",[n("v-row",[n("v-col",[n("v-card",[n("v-card-title",[n("h2",{staticClass:"grey--text"},[t._v("Templates - Create New")])]),t._v(" "),n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{label:"Temaplate Name",required:""},model:{value:t.template_name,callback:function(e){t.template_name=e},expression:"template_name"}})],1)],1),t._v(" "),n("v-row",[n("v-col",[n("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",md:"2"}},[n("v-text-field",{attrs:{label:"Field name",required:""},model:{value:t.template_temp_field_name,callback:function(e){t.template_temp_field_name=e},expression:"template_temp_field_name"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",md:"2"}},[n("v-select",{attrs:{items:t.template_types,label:"Field Type"},model:{value:t.template_temp_field_type,callback:function(e){t.template_temp_field_type=e},expression:"template_temp_field_type"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",md:"2"}},[n("v-text-field",{attrs:{label:"Default"},model:{value:t.template_temp_field_default,callback:function(e){t.template_temp_field_default=e},expression:"template_temp_field_default"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",md:"2"}},[n("v-switch",{attrs:{label:"Required"},model:{value:t.template_temp_field_required,callback:function(e){t.template_temp_field_required=e},expression:"template_temp_field_required"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",md:"2"}},[n("v-switch",{attrs:{label:"Edit Before Start"},model:{value:t.template_temp_field_edit_start_before,callback:function(e){t.template_temp_field_edit_start_before=e},expression:"template_temp_field_edit_start_before"}})],1)],1)],1)],1)],1)],1),t._v(" "),n("v-row",[n("v-col",[n("v-btn",{staticClass:"white--text",attrs:{color:"green"},on:{click:t.addRow}},[t._v("ADD")])],1)],1),t._v(" "),n("v-row",[n("v-col",[n("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",[n("th",{staticClass:"text-left"},[t._v("\n                                    Field Name\n                                    ")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("\n                                    Field Type\n                                    ")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("\n                                    Field Default\n                                    ")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("\n                                    Field required\n                                    ")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("\n                                    Field Start Before\n                                    ")]),t._v(" "),n("th",{staticClass:"text-right"},[t._v("\n                                    Delete\n                                    ")])])]),t._v(" "),n("tbody",t._l(t.template_items,(function(e,r){return n("tr",{key:r},[n("td",{staticClass:"text-left"},[t._v(t._s(e.name))]),t._v(" "),n("td",{staticClass:"text-left"},[t._v(t._s(e.type))]),t._v(" "),n("td",{staticClass:"text-left"},[t._v(t._s(e.default))]),t._v(" "),n("td",{staticClass:"text-left"},[t._v(t._s(e.required))]),t._v(" "),n("td",{staticClass:"text-left"},[t._v(t._s(e.edit_before_start))]),t._v(" "),n("td",{staticClass:"text-right"},[n("v-btn",{attrs:{icon:"","x-small":""},on:{click:function(e){return t.remove_key(r)}}},[n("v-icon",[t._v("mdi-trash-can")])],1)],1)])})),0)]},proxy:!0}])})],1)],1)],1),t._v(" "),n("v-card-actions",[t.template_items.length>0?n("v-btn",{staticClass:"white--text",attrs:{color:"green"}},[t._v("Save Template")]):t._e()],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:h.a,VCard:v.a,VCardActions:d.a,VCardTitle:d.c,VCol:_.a,VContainer:f.a,VForm:m.a,VIcon:w.a,VRow:x.a,VSelect:y.a,VSimpleTable:O.a,VSwitch:k.a,VTextField:C.a})}}]);