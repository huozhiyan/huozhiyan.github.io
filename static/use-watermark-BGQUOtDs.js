import{u as f}from"./useWatermark-4XHvaz8a.js";import{f as C,r as v,a8 as i,h as y,i as b,j as m,M as t,G as a,au as W,av as g,u as r,K as l}from"./vue-CnshxKsO.js";import{_ as w}from"./index-B4YbGxTu.js";import"./element-Cu9Ufmt3.js";import"./vxe-Dy3nNYZ7.js";const x=n=>(W("data-v-dbeea05d"),n=n(),g(),n),$={class:"app-container"},I=x(()=>m("h4",null," 该示例是演示：通过调用 hook，开启或关闭水印， 支持局部、全局、自定义样式（颜色、透明度、字体大小、字体、倾斜角度等），并自带防御（防删、防隐藏）和自适应功能 ",-1)),B=C({__name:"use-watermark",setup(n){const c=v(null),{setWatermark:p,clearWatermark:_}=f(c),{setWatermark:d,clearWatermark:k}=f();return(G,e)=>{const o=i("el-button"),u=i("el-button-group");return y(),b("div",$,[I,m("div",{ref_key:"localRef",ref:c,class:"local"},null,512),t(u,null,{default:a(()=>[t(o,{type:"primary",onClick:e[0]||(e[0]=s=>r(p)("局部水印",{color:"#409eff"}))},{default:a(()=>[l("创建局部水印")]),_:1}),t(o,{type:"warning",onClick:e[1]||(e[1]=s=>r(p)("没有防御功能的局部水印",{color:"#e6a23c",defense:!1}))},{default:a(()=>[l(" 关闭防御功能 ")]),_:1}),t(o,{type:"danger",onClick:r(_)},{default:a(()=>[l("清除局部水印")]),_:1},8,["onClick"])]),_:1}),t(u,null,{default:a(()=>[t(o,{type:"primary",onClick:e[2]||(e[2]=s=>r(d)("全局水印",{color:"#409eff"}))},{default:a(()=>[l("创建全局水印")]),_:1}),t(o,{type:"warning",onClick:e[3]||(e[3]=s=>r(d)("没有防御功能的全局水印",{color:"#e6a23c",defense:!1}))},{default:a(()=>[l(" 关闭防御功能 ")]),_:1}),t(o,{type:"danger",onClick:r(k)},{default:a(()=>[l("清除全局水印")]),_:1},8,["onClick"])]),_:1})])}}}),j=w(B,[["__scopeId","data-v-dbeea05d"]]);export{j as default};
