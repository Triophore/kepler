(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{817:function(t,e,l){"use strict";l.r(e);l(91);var r=l(17),o={components:{Plotly:l(790).Plotly},mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/api/team/all");case 2:l=e.sent,t.task_teams=l.data;case 4:case"end":return e.stop()}}),e)})))()},data:function(){return{task_teams:[],gdata:[{x:[1,2,3,4],y:[10,15,13,17],type:"scattergl"}],gdata1:[{x:[1,2,3,4],y:[10,15,13,17],type:"bar"}],gdata2:[{values:[19,26,55],labels:["Residential","Non-Residential","Utility"],type:"pie"}],gdata3:[{x:[1,2,3,4],y:[10,15,13,17],type:"table"}],layout:{title:"Task in Numbers"}}}},n=l(13),c=l(40),d=l.n(c),y=l(271),v=l(736),m=l(743),h=l(740),_=l(722),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("v-container",[l("v-row",[l("v-col",{attrs:{cols:"4"}},[l("v-select",{staticStyle:{"margin-top":"1.2%","margin-left":"1%"},attrs:{items:t.task_teams,"item-text":"team_name",dense:"",solo:"","return-object":"",label:"Select Teams"},model:{value:t.master_team_selected,callback:function(e){t.master_team_selected=e},expression:"master_team_selected"}})],1)],1),t._v(" "),l("v-row",[l("v-col",[l("v-card",{staticStyle:{height:"50vh"}},[l("Plotly",{attrs:{data:t.gdata,layout:t.layout,"display-mode-bar":!0}})],1)],1),t._v(" "),l("v-col",[l("v-card",{staticStyle:{height:"50vh"}},[l("Plotly",{attrs:{data:t.gdata1,layout:t.layout,"display-mode-bar":!0}})],1)],1)],1),t._v(" "),l("v-row",[l("v-col",[l("v-card",{staticStyle:{height:"50vh"}},[l("Plotly",{attrs:{data:t.gdata2,layout:t.layout,"display-mode-bar":!0}})],1)],1),t._v(" "),l("v-col",[l("v-card",{staticStyle:{height:"50vh"}},[l("Plotly",{attrs:{data:t.gdata3,layout:t.layout,"display-mode-bar":!0}})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VCard:y.a,VCol:v.a,VContainer:m.a,VRow:h.a,VSelect:_.a})}}]);