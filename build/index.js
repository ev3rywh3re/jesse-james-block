(()=>{"use strict";const e=window.React;(0,window.wp.element.render)((0,e.createElement)((function(){const[n,t]=(0,e.useState)(null);return(0,e.useEffect)((()=>{const e=setInterval((async()=>{const e=`${window.location.origin}/wp-json/jess-block-scaffold-experiments/v1/open/29453`,n=await fetch(e),a=(await n.json()).image;t(a)}),4e3);return()=>clearInterval(e)}),[]),(0,e.createElement)("div",{className:"App"},n?(0,e.createElement)("div",{dangerouslySetInnerHTML:{__html:n}}):(0,e.createElement)("p",null,"Loading image..."))}),null),document.getElementById("random-f-image"))})();