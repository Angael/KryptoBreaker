(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{101:function(e,t,n){},102:function(e,t,n){},119:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(11),a=n.n(c),j=(n(101),n(7)),i=(n(102),n(169)),s=n(171),l=n(123),b=n(126),u=n(130),o=n(128),x=n(175),O=n(122),h=n(76),d=n.n(h),v=n(52),p=n(165);function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:26;return(e%t+t)%t}var f=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:26,n=1;n<t;n++)if(e%t*(n%t)%t==1)return n},g=function(e){return e.toLowerCase().charCodeAt(0)-97},y=function(e){return String.fromCharCode(m(e,26)+97)};function S(e){return(e>>>0).toString(2)}var w=n(19),C=n(161),k=n(162),M=n(159),T=n(160),N=n(156),A=n(1);var E=function(e){var t=e.startStr,n=void 0===t?"":t,r=e.endStr,c=void 0===r?"":r,a=e.middleNumbersArr,j=e.isEncryption,i=void 0===j||j,s=Object(A.jsxs)(N.a,{children:[Object(A.jsx)(M.a,{component:"th",scope:"row",children:i?"PT":"CT"}),n.split("").map((function(e,t){return Object(A.jsx)(M.a,{align:"center",children:e},e+t)}))]}),l=Object(A.jsxs)(N.a,{children:[Object(A.jsx)(M.a,{component:"th",scope:"row",children:i?"x":"y"}),n.split("").map((function(e,t){return Object(A.jsx)(M.a,{align:"center",children:g(e)},e+t)}))]}),b=Object(A.jsxs)(N.a,{children:[Object(A.jsx)(M.a,{component:"th",scope:"row",children:i?"y":"x"}),c.split("").map((function(e,t){return Object(A.jsx)(M.a,{align:"center",children:g(e)},e+t)}))]}),u=Object(A.jsxs)(N.a,{children:[Object(A.jsx)(M.a,{component:"th",scope:"row",children:i?"CT":"PT"}),c.split("").map((function(e,t){return Object(A.jsx)(M.a,{align:"center",children:e},e+t)}))]}),o=a&&Object(A.jsxs)(N.a,{children:[Object(A.jsx)(M.a,{component:"th",scope:"row",children:"k"}),a.map((function(e,t){return Object(A.jsx)(M.a,{align:"center",children:e},e+"-"+t)}))]});return Object(A.jsx)(T.a,{component:function(e){return Object(A.jsx)(O.a,Object(w.a)({variant:"outlined"},e))},children:Object(A.jsx)(C.a,{children:Object(A.jsxs)(k.a,{children:[s,l,o,b,u]})})})},F=n(164),P=n(163),z=n(27),L=n.n(z);var V=function(e){var t=e.startStr,n=void 0===t?"":t,r=e.endStr,c=void 0===r?"":r,a={display:"flex",justifyContent:"space-around",alignItems:"center"};return Object(A.jsx)(P.a,{variant:"outlined",children:Object(A.jsxs)(s.a,Object(w.a)(Object(w.a)({p:2},a),{},{children:[Object(A.jsx)(s.a,Object(w.a)(Object(w.a)({flex:9},a),{},{children:Object(A.jsx)(l.a,{variant:"h5",children:n})})),Object(A.jsx)(s.a,Object(w.a)(Object(w.a)({flex:1},a),{},{children:Object(A.jsx)(L.a,{})})),Object(A.jsx)(s.a,Object(w.a)(Object(w.a)({flex:9},a),{},{children:Object(A.jsx)(l.a,{variant:"h5",children:c})}))]}))})};var I=function(e){var t=e.letter,n=e.resultLetter,r=e.children;return Object(A.jsxs)(s.a,{display:"flex",alignItems:"center",children:[Object(A.jsx)(s.a,{m:2,children:t}),Object(A.jsx)(L.a,{fontSize:"small"}),Object(A.jsx)(s.a,{m:2,children:r}),Object(A.jsx)(L.a,{fontSize:"small"}),Object(A.jsx)(s.a,{m:2,children:n})]})};var D=function(e){var t=e.letter,n=e.keyValue,r=e.isEncryption,c=g(t),a=r?c+n:c-n,j=m(a,26);return Object(A.jsxs)(I,{letter:t,resultLetter:y(j),children:[r?"y":"x"," = ",r?"e":"d",Object(A.jsx)("sub",{children:n}),"(",c,") = (",c," ",r?"+":"-"," ",n,") mod 26 ="," ",a," mod 26 = ",j]})};var W=function(){var e=Object(r.useState)("kryptografia"),t=Object(j.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(0),i=Object(j.a)(a,2),h=i[0],d=i[1],m=Object(r.useState)(!0),f=Object(j.a)(m,2),S=f[0],w=f[1],C=function(){var e,t="",r=parseInt(h*(S?1:-1))||0,c=Object(v.a)(n);try{for(c.s();!(e=c.n()).done;){var a=e.value;t+=y(g(a)+r)}}catch(j){c.e(j)}finally{c.f()}return t}();return Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(s.a,{my:4,children:Object(A.jsxs)(O.a,{elevation:3,children:[Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"word",onChange:function(e){return c(e.target.value)},value:n})})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsxs)(b.a,{children:[Object(A.jsx)(u.a,{children:"Which way"}),Object(A.jsxs)(o.a,{value:S,onChange:function(e){return w(e.target.value)},children:[Object(A.jsx)(x.a,{value:!0,children:"Encrypt"}),Object(A.jsx)(x.a,{value:!1,children:"Decrypt"})]})]})})})]}),Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"key",type:"number",onChange:function(e){return d(Number(e.target.value))},value:h})}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Solution:"}),Object(A.jsx)(V,{startStr:n,endStr:C||""})]}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Table:"}),Object(A.jsx)(E,{startStr:n,endStr:C,isEncryption:S})]}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Letter by letter:"}),n.split("").map((function(e,t){return Object(A.jsx)(D,{letter:e,keyValue:h,isEncryption:S},e+t)}))]})]})})})};var J=function(e){var t=e.letter,n=e.keyValue,r=e.isEncryption,c=g(t),a=g(n),j=r?c+a:c-a,i=m(j,26);return Object(A.jsxs)(I,{letter:t,resultLetter:y(i),children:[r?"y":"x"," = ",r?"e":"d",Object(A.jsxs)("sub",{children:["(",n,")"]}),"(",c,") = (",c," ",r?"+":"-"," ",a,") mod 26 ="," ",j," mod 26 = ",i]})};var K=function(){var e=Object(r.useState)("kryptografia"),t=Object(j.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),i=Object(j.a)(a,2),h=i[0],d=i[1],v=Object(r.useState)(!0),f=Object(j.a)(v,2),S=f[0],w=f[1],C=function(){var e=(null===h||void 0===h?void 0:h.length)||0;if(e){var t="";for(var r in n){var c=n[r],a=h[r%e];t+=y(m(g(c)+g(a)*(S?1:-1)))}return t}return n}(),k=Object(r.useMemo)((function(){if(n&&h){var e=[];return n.split("").forEach((function(t,n){return e.push(h[n%h.length])})),e.map((function(e){return g(e)}))}return null}),[n,h]);return Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(s.a,{my:4,children:Object(A.jsxs)(O.a,{elevation:3,children:[Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"word",onChange:function(e){return c(e.target.value)},value:n})})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsxs)(b.a,{children:[Object(A.jsx)(u.a,{children:"Which way"}),Object(A.jsxs)(o.a,{value:S,onChange:function(e){return w(e.target.value)},children:[Object(A.jsx)(x.a,{value:!0,children:"Encrypt"}),Object(A.jsx)(x.a,{value:!1,children:"Decrypt"})]})]})})})]}),Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"key",type:"text",onChange:function(e){return d(e.target.value)},value:h})}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Solution:"}),Object(A.jsx)(V,{startStr:n,endStr:C||""})]}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Table:"}),Object(A.jsx)(E,{startStr:n,endStr:C,middleNumbersArr:k,isEncryption:S})]}),h&&Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Letter by letter:"}),n.split("").map((function(e,t){return Object(A.jsx)(J,{letter:e,keyValue:h[t%h.length],isEncryption:S},e+t)}))]})]})})})};var B=function(e){var t,n,r=e.letter,c=e.a,a=e.b,j=e.isEncryption,i=g(r),s=NaN;j?(t=i*c+a,n=Object(A.jsxs)(A.Fragment,{children:[c," * (",i," + ",a,")"]})):(t=(s=f(c,26))*(i-a),n=Object(A.jsxs)(A.Fragment,{children:[s," * (",i," - ",a,")"]}));var l=m(t,26);return Object(A.jsxs)(I,{letter:r,resultLetter:y(l),children:[j?"y":"x"," = ",j?"e":"d",Object(A.jsxs)("sub",{children:["(",c,",",a,")"]}),"(",i,") = (",n,") mod 26 = ",t," mod 26 = ",l]})};var X=function(e){return function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:26,n=[],r=0;r<t;r++)if(n.push("".concat(e," * ").concat(r," mod ").concat(t," = ").concat(m(e*r,t))),e*r%t===1)return n.push("Found inverted key = "+r),n;return n}(e.a,e.n).map((function(e){return Object(A.jsx)(s.a,{children:Object(A.jsx)(l.a,{children:e})},e)}))};var H=function(){var e=Object(r.useState)("kryptografia"),t=Object(j.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),i=Object(j.a)(a,2),h=i[0],d=i[1],S=Object(r.useState)(!0),w=Object(j.a)(S,2),C=w[0],k=w[1],M=h.replace(/\s/,"").split(",").map(Number),T=Object(j.a)(M,2),N=T[0],P=void 0===N?0:N,z=T[1],L=void 0===z?0:z,I=n&&void 0!==P&&void 0!==L?function(e,t){var n,r=Object(j.a)(t,2),c=r[0],a=r[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s="",l=null,b=Object(v.a)(e);try{for(b.s();!(n=b.n()).done;){var u=n.value;if(i)l=g(u)*c+a;else l=f(c,26)*(g(u)-a);s+=y(m(l,26))}}catch(o){b.e(o)}finally{b.f()}return s}(n,[P,L],C):"";return Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(s.a,{my:4,children:Object(A.jsxs)(O.a,{elevation:3,children:[Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"word",onChange:function(e){return c(e.target.value)},value:n})})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsxs)(b.a,{children:[Object(A.jsx)(u.a,{children:"Which way"}),Object(A.jsxs)(o.a,{value:C,onChange:function(e,t){return k(e.target.value)},children:[Object(A.jsx)(x.a,{value:!0,children:"Encrypt"}),Object(A.jsx)(x.a,{value:!1,children:"Decrypt"})]})]})})})]}),Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"keys",placeholder:"3,7",type:"text",onChange:function(e){return d(e.target.value)},value:h})}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Solution:"}),Object(A.jsx)(V,{startStr:n,endStr:I})]}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Table:"}),Object(A.jsx)(E,{startStr:n,endStr:I,isEncryption:C})]}),!C&&Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Klucz odwr\xf3cony:"}),Object(A.jsx)(X,{a:P})]}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Letter by letter:"}),n.split("").map((function(e,t){return Object(A.jsx)(B,{letter:e,a:P,b:L,isEncryption:C},e+t)}))]})]})})})},R=n(167),q=n(174);var G,Q,U=n(45),Y=n(127),Z=n(46),$=Object(Z.a)(G||(G=Object(U.a)(["\n\theight: 42px;\n\twidth: 4rem;\n"]))),_=Object(Z.a)(Q||(Q=Object(U.a)(["\n\t* {\n\t\ttext-align: center; !important\n\t}\n"])));var ee=function(e){var t=e.rows,n=e.changeValue,r=e.error,c=e.helperText,a=function(e,t){return function(r){if(n){var c=Number(r.target.value.replace(/\D/g,""));n(c,e,t)}}},j=!!n;return Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)(s.a,{my:2,flexDirection:"column",display:"flex",alignContent:"center",justifyItems:"center",justifyContent:"center",children:[Object(A.jsx)("table",{children:Object(A.jsx)("tbody",{children:t.map((function(e,t){return Object(A.jsx)("tr",{children:e.map((function(e,n){return Object(A.jsx)("td",{className:$,children:j?Object(A.jsx)(p.a,{value:e,variant:"outlined",size:"small",className:_,onChange:a(t,n),error:r}):Object(A.jsx)(l.a,{align:"center",children:e})},n)}))},t)}))})}),Object(A.jsx)(Y.a,{error:!!c,children:c})]})})},te=n(62),ne=n.n(te),re=function(e){return Array(e).fill(Array(e).fill(0))},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,t=Object(r.useState)(re(e)),n=Object(j.a)(t,2),c=n[0],a=n[1],i=c.length,s=function(e,t,n){return a(c.map((function(r,c){return r.map((function(r,a){return c===t&&n===a?e:r}))})))},l=function(e){var t=ne()(Number(e),2,14);a(re(t))};return{rows:c,setValue:s,size:i,resize:l}},ae=n(68),je=function(e){for(var t=new ae(e.data),n=0;n<e.data.length;n++)for(var r=0;r<e.data[n].length;r++)e.data[n][r]=m(e.data[n][r],26);return t},ie=function(e){for(var t=m(e.determinant(),26),n=f(t),r=e.adjugate(),c=0;c<r.data.length;c++)for(var a=0;a<r.data[c].length;a++)r.data[c][a]<0&&(r.data[c][a]+=26);return je(r.scale(n))},se=n(68),le=function(e,t){var n=Math.ceil(e.length/t),r=function(e,t){for(var n=[],r=0;r<t;r++){for(var c=[],a=0;a<e;a++)c.push(0);n.push(c)}return new ae(n)}(t,n),c=e.split("");return c?(c.forEach((function(e,n){var c=Math.floor(n/t),a=n%t;r=r.replace(c,a,g(e))})),r):null},be=function(e){return e.data.map((function(e){return Array.from(e)}))};var ue=function(){var e=Object(r.useState)("telewizor"),t=Object(j.a)(e,2),n=t[0],c=t[1],a=ce(3),i=a.rows,h=a.setValue,d=a.size,v=a.resize,g=Object(r.useState)(!0),S=Object(j.a)(g,2),w=S[0],C=S[1],k=Object(r.useMemo)((function(){return le(n,d)}),[n,d]),M=Object(r.useMemo)((function(){return new se(i)}),[i]),T=function(e){var t=m(e.determinant(),26);return!!f(t)}(M),N=Object(r.useMemo)((function(){return function(e,t,n){if(!e.numRows()||!e.numColumns()||!t.numRows()||!t.numColumns())return e;var r;if(n)r=e.multiply(t);else{var c=ie(t);r=e.multiply(c)}return{resultMatrixBeforeMod:JSON.parse(JSON.stringify(r)),resultMatrix:je(r)}}(k,M,w)}),[k,M,w]),P=N.resultMatrix,z=N.resultMatrixBeforeMod,L=function(e){return e.map((function(e){return e.map((function(e){return y(e)})).join("")})).join("")}(be(P)),I=Object(r.useState)(!0),D=Object(j.a)(I,2),W=D[0],J=D[1];return Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(s.a,{my:4,children:Object(A.jsxs)(O.a,{elevation:3,children:[Object(A.jsx)(s.a,{p:2,children:Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(p.a,{label:"word",onChange:function(e){return c(e.target.value)},value:n})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsxs)(b.a,{children:[Object(A.jsx)(u.a,{children:"Which way"}),Object(A.jsxs)(o.a,{value:w,onChange:function(e){return C(e.target.value)},children:[Object(A.jsx)(x.a,{value:!0,children:"Encrypt"}),Object(A.jsx)(x.a,{value:!1,children:"Decrypt"})]})]})})]})}),Object(A.jsx)(s.a,{p:2,children:Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:6}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(p.a,{label:"Size of key matrix",type:"number",value:d,onChange:function(e){return v(e.target.value)}})})]})}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsxs)(F.a,{item:!0,xs:6,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Word:"}),Object(A.jsx)(ee,{rows:be(k)})]}),Object(A.jsxs)(F.a,{item:!0,xs:6,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Key:"}),Object(A.jsx)(ee,{rows:i,changeValue:h,error:!T,helperText:T?"":"This key matrix can not be inverted"})]}),!w&&Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(F.a,{item:!0,xs:6}),Object(A.jsxs)(F.a,{item:!0,xs:6,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Inverted Key:"}),Object(A.jsx)(ee,{rows:be(ie(M))})]})]})]}),Object(A.jsx)(F.a,{container:!0,children:Object(A.jsxs)(F.a,{item:!0,xs:6,children:[Object(A.jsx)(F.a,{item:!0,xs:6}),Object(A.jsx)(l.a,{variant:"h4",children:"Multiplication result:"}),Object(A.jsx)(R.a,{control:Object(A.jsx)(q.a,{checked:W,onClick:function(){return J((function(e){return!e}))},color:"primary"}),label:"After modulo"}),Object(A.jsx)(ee,{rows:be(W?P:z)})]})})]}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Solution:"}),Object(A.jsx)(V,{startStr:n,endStr:L||""})]}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Table:"}),Object(A.jsx)(E,{startStr:n,endStr:L,isEncryption:w})]})]})})})};var oe,xe,Oe=function(e){var t=e.p,n=e.g,r=e.power,c=e.variant,a=void 0===c?"body1":c;return Object(A.jsx)(s.a,{textAlign:"center",children:Object(A.jsxs)(l.a,{variant:a,children:[n," ",Object(A.jsx)("sup",{children:r})," mod ",t]})})},he=function(e){var t=Object(r.useState)(e||0),n=Object(j.a)(t,2),c=n[0],a=n[1];return[c,function(e){var t=Number(e.target.value);isNaN(t)||a(t)}]},de=function(e,t,n){var r=S(n).split("").reverse();if(!r.length)return"rip, nie chce mi sie pisac error handlingu";var c=[];c.push({i:0,x:1,a:t,t:Number(r[0]),helperTextA:"initial value is g = "+t,helperTextX:"initial value is always 1 "});for(var a=1;a<r.length+1;a++){var j=Number(r[a]),i=c[a-1].t,s=c[a-1].a,l=c[a-1].x,b="",u=m(s*s,e);a===r.length&&(u="");var o="".concat(s," * ").concat(s," mod ").concat(e," =  ").concat(u),x=void 0;i?(x=m(l*s,e),b="".concat(l," * ").concat(s," mod ").concat(e," =  ").concat(x)):b="unchanged because previous t is 0 = ".concat(x=l),c.push({i:a,x:x,a:u,t:j,helperTextA:o,helperTextX:b})}return{result:c[c.length-1].x,steps:c}},ve=n(168),pe=n(176),me=n(5),fe=Object(Z.a)(oe||(oe=Object(U.a)(["\n\tbackground: #97ffa7;\n\ttext-decoration: underline;\n\tborder-radius: 5px;\n\ttransition: 0.3s;\n"]))),ge=Object(Z.a)(xe||(xe=Object(U.a)(["\n\tbackground: #ffd0ce;\n\tborder-radius: 5px;\n\ttransition: 0.3s;\n"]))),ye=Object(me.a)({root:{"&:hover":{backgroundColor:"rgb(0 ,0, 0, 0.1)"}}})(M.a);var Se=function(e){var t=e.stepsObj,n=Object(r.useState)(null),c=Object(j.a)(n,2),a=c[0],i=c[1],s=function(e){return function(){i(e)}};return Object(A.jsx)(T.a,{component:function(e){return Object(A.jsx)(O.a,Object(w.a)({variant:"outlined"},e))},children:Object(A.jsxs)(C.a,{children:[Object(A.jsx)(ve.a,{children:Object(A.jsxs)(N.a,{children:[Object(A.jsx)(M.a,{align:"center",children:"i"}),Object(A.jsxs)(M.a,{align:"center",children:["x",Object(A.jsx)("sub",{children:"i"})]}),Object(A.jsxs)(M.a,{align:"center",children:["a",Object(A.jsx)("sub",{children:"i"})]}),Object(A.jsxs)(M.a,{align:"center",children:["t",Object(A.jsx)("sub",{children:"i"})]})]})}),Object(A.jsx)(k.a,{children:t.steps.map((function(e){var n=e.i,r=e.x,c=e.a,j=e.t,l=e.helperTextA,b=e.helperTextX,u=n===t.steps.length-1,o=a===n+1,x=u?fe:o?ge:"",O=o&&j?ge:"";return Object(A.jsxs)(N.a,{children:[Object(A.jsx)(M.a,{align:"center",children:n}),Object(A.jsx)(pe.a,{title:b,children:Object(A.jsx)(ye,{align:"center",className:x,onMouseEnter:s(n),onMouseLeave:function(){i(null)},children:Object(A.jsx)("div",{children:r})})}),!u&&Object(A.jsx)(pe.a,{title:l,children:Object(A.jsx)(ye,{align:"center",className:O,children:Object(A.jsx)("div",{children:c})})}),!u&&Object(A.jsx)(M.a,{align:"center",children:j})]},n)}))})]})})};var we=function(e){var t=e.num,n=S(t);return Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:12,children:Object(A.jsxs)(s.a,{textAlign:"center",children:[t," to binary is ",n]})}),Object(A.jsx)(F.a,{item:!0,xs:12,children:Object(A.jsxs)(s.a,{textAlign:"center",children:["in reverse it's [",n.split("").reverse().join(","),"] = t"]})})]})};var Ce=function(){var e=he(1019),t=Object(j.a)(e,2),n=t[0],c=t[1],a=he(2),i=Object(j.a)(a,2),b=i[0],u=i[1],o=he(638),x=Object(j.a)(o,2),h=x[0],d=x[1],v=he(719),m=Object(j.a)(v,2),f=m[0],g=m[1],y=Object(r.useMemo)((function(){return function(e){for(var t=2;t<e;t++)if(e%t===0)return!1;return e>1}(n)}),[n]),S=Object(r.useMemo)((function(){return de(n,b,h)}),[n,b,h]),w=Object(r.useMemo)((function(){return de(n,b,f)}),[n,b,f]),C=Object(r.useMemo)((function(){return de(n,S.result,f)}),[n,S.result,f]),k=Object(r.useMemo)((function(){return de(n,w.result,h)}),[n,w.result,f]);return Object(A.jsx)(s.a,{my:4,children:Object(A.jsxs)(O.a,{elevation:3,children:[Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"g",onChange:u,value:b,type:"number",helperText:"public"})})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"p",onChange:c,value:n,type:"number",helperText:y?"public":"p has to be prime",error:!y})})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"a",onChange:d,value:h,type:"number",helperText:"private for person 1"})})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"b",onChange:g,value:f,type:"number",helperText:"private for person 2"})})})]}),Object(A.jsxs)(s.a,{p:2,pb:0,textAlign:"center",children:[Object(A.jsx)(l.a,{variant:"h3",children:"Calculating Public keys:"}),Object(A.jsx)(l.a,{variant:"body1",children:"Person 1 generates random private key a, Person 2 generates random private key b."}),Object(A.jsx)(l.a,{variant:"body1",children:"Then they calculate public keys they can give eachother in a NOT secure way."})]}),Object(A.jsxs)(s.a,{p:2,pb:0,textAlign:"center",children:[Object(A.jsx)(l.a,{variant:"h4",children:"Formulae to calculate:"}),Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsxs)(F.a,{item:!0,xs:6,children:[Object(A.jsx)(l.a,{variant:"h5",children:"Person 1 calculates:"}),Object(A.jsx)(Oe,{p:n,g:b,power:h})]}),Object(A.jsxs)(F.a,{item:!0,xs:6,children:[Object(A.jsx)(l.a,{variant:"h5",children:"Person 2 calculates:"}),Object(A.jsx)(Oe,{p:n,g:b,power:f})]})]})]}),Object(A.jsx)(s.a,{p:2,pb:0,textAlign:"center",children:Object(A.jsx)(l.a,{variant:"h4",children:"Fast modulo power method (!):"})}),Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(we,{num:h}),Object(A.jsx)(Se,{stepsObj:S})]})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(we,{num:f}),Object(A.jsx)(Se,{stepsObj:w})]})})]}),Object(A.jsxs)(s.a,{p:2,pb:0,textAlign:"center",children:[Object(A.jsx)(l.a,{variant:"h3",children:"Calculating Master (private) key:"}),Object(A.jsx)(l.a,{variant:"body1",children:"After Person 1 received Person 2 Public key, and vice versa, they can both calculate the same private key."}),Object(A.jsx)(l.a,{variant:"body1",children:"Then they can use this key to encrypt their communication, without ever sending this private key."})]}),Object(A.jsxs)(s.a,{p:2,pb:0,textAlign:"center",children:[Object(A.jsx)(l.a,{variant:"h4",children:"Formulae to calculate:"}),Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsxs)(F.a,{item:!0,xs:6,children:[Object(A.jsx)(l.a,{variant:"h5",children:"Person 1 calculates:"}),Object(A.jsx)(Oe,{p:n,g:w.result,power:h})]}),Object(A.jsxs)(F.a,{item:!0,xs:6,children:[Object(A.jsx)(l.a,{variant:"h5",children:"Person 2 calculates:"}),Object(A.jsx)(Oe,{p:n,g:S.result,power:f})]})]})]}),Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(we,{num:h}),Object(A.jsx)(Se,{stepsObj:k})]})}),Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(we,{num:f}),Object(A.jsx)(Se,{stepsObj:C})]})})]})]})})};var ke=function(){var e=Object(r.useState)(12),t=Object(j.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(26),i=Object(j.a)(a,2),b=i[0],u=i[1];return f(n,b),Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(s.a,{my:4,children:Object(A.jsxs)(O.a,{elevation:3,children:[Object(A.jsx)(F.a,{container:!0,children:Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"Liczba",type:"number",onChange:function(e){return c(Number(e.target.value))},value:n})})})}),Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"modulo",placeholder:26,type:"number",onChange:function(e){return u(Number(e.target.value))},value:b})}),Object(A.jsxs)(s.a,{p:2,children:[Object(A.jsx)(l.a,{variant:"h4",children:"Odwrotno\u015b\u0107 modularna:"}),Object(A.jsx)(X,{a:n,n:b})]})]})})})};var Me=function(){var e=he(2),t=Object(j.a)(e,2),n=t[0],c=t[1],a=he(638),i=Object(j.a)(a,2),l=i[0],b=i[1],u=he(1019),o=Object(j.a)(u,2),x=o[0],h=o[1],d=Object(r.useMemo)((function(){return de(x,n,l)}),[x,n,l]);return Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(s.a,{my:4,children:Object(A.jsxs)(O.a,{elevation:3,children:[Object(A.jsxs)(F.a,{container:!0,children:[Object(A.jsx)(F.a,{item:!0,xs:4,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"g",onChange:c,value:n,type:"number"})})}),Object(A.jsx)(F.a,{item:!0,xs:4,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"Pot\u0119ga",onChange:b,value:l,type:"number"})})}),Object(A.jsx)(F.a,{item:!0,xs:4,children:Object(A.jsx)(s.a,{p:2,children:Object(A.jsx)(p.a,{label:"Modulo",onChange:h,value:x,type:"number"})})})]}),Object(A.jsx)(s.a,{p:2,pb:2,textAlign:"center",children:Object(A.jsx)(Oe,{p:x,g:n,power:l,variant:"h4"})}),Object(A.jsx)(F.a,{container:!0,justify:"center",children:Object(A.jsx)(F.a,{item:!0,xs:6,children:Object(A.jsx)(Se,{stepsObj:d})})})]})})})},Te="c",Ne="a",Ae="v",Ee="h",Fe="dh",Pe="odw",ze="potMod";var Le=function(){var e=Object(r.useState)(Fe),t=Object(j.a)(e,2),n=t[0],c=t[1];return Object(A.jsxs)(i.a,{maxWidth:"md",children:[Object(A.jsx)(s.a,{my:4,children:Object(A.jsx)(l.a,{variant:"h2",children:"Kryptobreaker:"})}),Object(A.jsx)(O.a,{elevation:3,children:Object(A.jsx)(s.a,{p:2,display:"flex",alignContent:"center",justifyItems:"center",justifyContent:"center",children:Object(A.jsxs)(b.a,{children:[Object(A.jsx)(u.a,{children:"Metoda"}),Object(A.jsxs)(o.a,{value:n,onChange:function(e){c(e.target.value)},children:[Object(A.jsx)(x.a,{value:Te,children:"Cezara"}),Object(A.jsx)(x.a,{value:Ne,children:"Afiniczny"}),Object(A.jsx)(x.a,{value:Ae,children:"Vigenera"}),Object(A.jsx)(x.a,{value:Ee,children:"Hila"}),Object(A.jsx)(x.a,{value:Fe,children:"Diffie Hellman"}),Object(A.jsx)(x.a,{value:Pe,children:"Odwrotno\u015b\u0107 modularna"}),Object(A.jsx)(x.a,{value:ze,children:"Pot\u0119ga modu\u0142owa"})]})]})})}),Object(A.jsx)(s.a,{m:4,display:"flex",alignContent:"center",justifyItems:"center",justifyContent:"center",children:Object(A.jsx)(d.a,{})}),Object(A.jsx)(s.a,{my:4,children:n===Te&&Object(A.jsx)(W,{})}),Object(A.jsx)(s.a,{my:4,children:n===Ne&&Object(A.jsx)(H,{})}),Object(A.jsx)(s.a,{my:4,children:n===Ae&&Object(A.jsx)(K,{})}),Object(A.jsx)(s.a,{my:4,children:n===Ee&&Object(A.jsx)(ue,{})}),Object(A.jsx)(s.a,{my:4,children:n===Fe&&Object(A.jsx)(Ce,{})}),Object(A.jsx)(s.a,{my:4,children:n===Pe&&Object(A.jsx)(ke,{})}),Object(A.jsx)(s.a,{my:4,children:n===ze&&Object(A.jsx)(Me,{})})]})};a.a.render(Object(A.jsx)(Le,{}),document.getElementById("root"))}},[[119,1,2]]]);
//# sourceMappingURL=main.b8a59546.chunk.js.map