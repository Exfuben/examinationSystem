(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc6468fc"],{"3ce0":function(e,t,c){"use strict";c.r(t);var a=c("7a23"),o=c("6605"),n=c("bc3a"),r=c.n(n);const s=e=>(Object(a["pushScopeId"])("data-v-3780efaa"),e=e(),Object(a["popScopeId"])(),e),l={class:"goback"},p=Object(a["createTextVNode"])("返回"),d={class:"paper-form"},b={class:"studentName"},i={class:"Score"},j=s(()=>Object(a["createElementVNode"])("span",null,"分数",-1)),O={key:0,class:"totalScore red"},u={key:1,class:"score red"},m=Object(a["createTextVNode"])("查看答卷");var k={name:"stuPaperManage",setup(e){const t=Object(o["d"])(),c=Object(o["c"])(),n=c.params.id,s=Object(a["reactive"])({papers:[]});Object(a["onMounted"])(()=>{v(n),console.log(s)});const k=()=>{t.push({path:"/teather/paperManage"})},v=e=>{r.a.get("http://localhost/answerPaper/answers?page=1&pageSize=20&testPaperId="+e).then(e=>{s.papers=e.data.data.records,console.log(e)})},g=e=>{t.push({name:"Paper",params:{id:e}})};return(e,t)=>{const c=Object(a["resolveComponent"])("el-button");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createElementVNode"])("div",l,[Object(a["createVNode"])(c,{class:"button",type:"primary",onClick:t[0]||(t[0]=e=>k())},{default:Object(a["withCtx"])(()=>[p]),_:1})]),Object(a["createElementVNode"])("div",d,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(s.papers,(e,t)=>(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",{class:"paper",key:t},[Object(a["createElementVNode"])("div",b,Object(a["toDisplayString"])(e.studentName),1),Object(a["createElementVNode"])("div",i,[j,1===e.isScore?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",O,Object(a["toDisplayString"])(e.totalScore),1)):(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",u,"未批改"))]),Object(a["createVNode"])(c,{type:"primary",plain:"",class:"paperBtn",onClick:t=>g(e.id)},{default:Object(a["withCtx"])(()=>[m]),_:2},1032,["onClick"])]))),128))])],64)}}},v=(c("6bd1"),c("6b0d")),g=c.n(v);const h=g()(k,[["__scopeId","data-v-3780efaa"]]);t["default"]=h},"6bd1":function(e,t,c){"use strict";c("a9a6")},a9a6:function(e,t,c){}}]);
//# sourceMappingURL=chunk-fc6468fc.d5b46d25.js.map