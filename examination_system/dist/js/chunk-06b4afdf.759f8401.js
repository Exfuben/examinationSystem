(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06b4afdf"],{3535:function(e,t,a){},bbb9:function(e,t,a){"use strict";a("3535")},d968:function(e,t,a){"use strict";a.r(t);var c=a("7a23"),o=a("bc3a"),n=a.n(o),s=a("3ef4"),l=a("6605");const r=e=>(Object(c["pushScopeId"])("data-v-3d242a64"),e=e(),Object(c["popScopeId"])(),e),d={class:"card-header"},b=r(()=>Object(c["createElementVNode"])("span",{class:"paperTitle"},"答卷评分",-1)),p=Object(c["createTextVNode"])("返回"),i={class:"head"},j=Object(c["createTextVNode"])("  "),O={class:"content"},u={class:"answer"},m={key:0,class:"showSelect"},h={key:1,class:"Danswer"},w={class:"putScore"},V=r(()=>Object(c["createElementVNode"])("span",null,"评分：",-1)),N={class:"subPaper"},E=Object(c["createTextVNode"])("提交");var S={name:"paper",setup(e){const t=Object(l["d"])(),a=Object(l["c"])(),o=a.params.id,r=Object(c["reactive"])({studentId:localStorage.getItem("teacherid"),detail:[],answers:[],eachScore:[]});Object(c["onMounted"])(()=>{S(o),console.log(r)});const S=e=>{n.a.get("http://localhost/answerPaper/one?id="+e).then(e=>{console.log(e.data),r.detail=e.data.data,k(e.data.data.content),v(e.data.data.eachScore)})},k=e=>{r.answers=e.split("@#"),console.log(r.answers)},v=e=>{const t=e.split("@");r.eachScore=t},g=e=>{const t=r.answers[e].slice(1);return t},C=(e,t,a)=>r.answers[e]===t?r.answers[e]===a?"color-green":"color-red":t===a?"color-green":"color-nomal",y=e=>{let a=0;r.eachScore.forEach(e=>{a+=parseInt(e)});const c=r.eachScore.join("@");n.a.post("http://localhost/answerPaper/score",{id:r.detail.id,eachScore:c,totalScore:a}).then(a=>{console.log(a),s["a"].success("提交成功"),t.push({name:"StuPaperManage",params:{id:e}})})},B=e=>{t.push({name:"StuPaperManage",params:{id:e}})};return(e,t)=>{const a=Object(c["resolveComponent"])("el-button"),o=Object(c["resolveComponent"])("el-input"),n=Object(c["resolveComponent"])("el-input-number"),s=Object(c["resolveComponent"])("el-card");return Object(c["openBlock"])(),Object(c["createBlock"])(s,{class:"box-card"},{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",d,[b,Object(c["createVNode"])(a,{class:"button",type:"primary",onClick:t[0]||(t[0]=e=>B(r.detail.testPaperId))},{default:Object(c["withCtx"])(()=>[p]),_:1})]),(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(r.detail.paperQuestionDtoList,(e,t)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"question",key:t},[Object(c["createElementVNode"])("div",i,[Object(c["createElementVNode"])("span",null,Object(c["toDisplayString"])(e.question.name),1),j,Object(c["createElementVNode"])("span",null,Object(c["toDisplayString"])(`(分数:${e.score})`),1)]),Object(c["createElementVNode"])("div",O,Object(c["toDisplayString"])(e.question.content),1),Object(c["createElementVNode"])("div",u,[0===e.question.type?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",m,[Object(c["createElementVNode"])("span",{class:Object(c["normalizeClass"])(C(t,"A",e.question.answer))},"A",2),Object(c["createElementVNode"])("span",{class:Object(c["normalizeClass"])(C(t,"B",e.question.answer))},"B",2),Object(c["createElementVNode"])("span",{class:Object(c["normalizeClass"])(C(t,"C",e.question.answer))},"C",2),Object(c["createElementVNode"])("span",{class:Object(c["normalizeClass"])(C(t,"D",e.question.answer))},"D",2)])):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",h,[Object(c["createVNode"])(o,{rows:3,type:"textarea",disabled:"",placeholder:g(t)},null,8,["placeholder"]),Object(c["createElementVNode"])("div",w,[V,Object(c["createVNode"])(n,{step:10,modelValue:r.eachScore[t],"onUpdate:modelValue":e=>r.eachScore[t]=e,min:0,max:e.score},null,8,["modelValue","onUpdate:modelValue","max"])])]))])]))),128)),Object(c["createElementVNode"])("div",N,[Object(c["createVNode"])(a,{class:"button",type:"primary",onClick:t[1]||(t[1]=e=>y(r.detail.testPaperId))},{default:Object(c["withCtx"])(()=>[E]),_:1})])]),_:1})}}},k=(a("bbb9"),a("6b0d")),v=a.n(k);const g=v()(S,[["__scopeId","data-v-3d242a64"]]);t["default"]=g}}]);
//# sourceMappingURL=chunk-06b4afdf.759f8401.js.map