import{j as a}from"./jsx-runtime-CDt2p4po.js";import{r as u,R as _e}from"./index-GiUgBvb1.js";/* empty css                  */var Lt=Symbol.for("immer-nothing"),Dt=Symbol.for("immer-draftable"),I=Symbol.for("immer-state");function M(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var L=Object,se=L.getPrototypeOf,je="constructor",Ie="prototype",Ge="configurable",Re="enumerable",Te="writable",be="value",Y=e=>!!e&&!!e[I];function X(e){return e?$t(e)||ze(e)||!!e[Dt]||!!e[je]?.[Dt]||Le(e)||$e(e):!1}var mn=L[Ie][je].toString(),Tt=new WeakMap;function $t(e){if(!e||!nt(e))return!1;const t=se(e);if(t===null||t===L[Ie])return!0;const n=L.hasOwnProperty.call(t,je)&&t[je];if(n===Object)return!0;if(!re(n))return!1;let r=Tt.get(n);return r===void 0&&(r=Function.toString.call(n),Tt.set(n,r)),r===mn}function Ce(e,t,n=!0){Ne(e)===0?(n?Reflect.ownKeys(e):L.keys(e)).forEach(o=>{t(o,e[o],e)}):e.forEach((r,o)=>t(o,r,e))}function Ne(e){const t=e[I];return t?t.type_:ze(e)?1:Le(e)?2:$e(e)?3:0}var At=(e,t,n=Ne(e))=>n===2?e.has(t):L[Ie].hasOwnProperty.call(e,t),Xe=(e,t,n=Ne(e))=>n===2?e.get(t):e[t],Pe=(e,t,n,r=Ne(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function yn(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var ze=Array.isArray,Le=e=>e instanceof Map,$e=e=>e instanceof Set,nt=e=>typeof e=="object",re=e=>typeof e=="function",Ve=e=>typeof e=="boolean",G=e=>e.copy_||e.base_,rt=e=>e.modified_?e.copy_:e.base_;function Ye(e,t){if(Le(e))return new Map(e);if($e(e))return new Set(e);if(ze(e))return Array[Ie].slice.call(e);const n=$t(e);if(t===!0||t==="class_only"&&!n){const r=L.getOwnPropertyDescriptors(e);delete r[I];let o=Reflect.ownKeys(r);for(let s=0;s<o.length;s++){const d=o[s],l=r[d];l[Te]===!1&&(l[Te]=!0,l[Ge]=!0),(l.get||l.set)&&(r[d]={[Ge]:!0,[Te]:!0,[Re]:l[Re],[be]:e[d]})}return L.create(se(e),r)}else{const r=se(e);if(r!==null&&n)return{...e};const o=L.create(r);return L.assign(o,e)}}function at(e,t=!1){return Fe(e)||Y(e)||!X(e)||(Ne(e)>1&&L.defineProperties(e,{set:De,add:De,clear:De,delete:De}),L.freeze(e),t&&Ce(e,(n,r)=>{at(r,!0)},!1)),e}function xn(){M(2)}var De={[be]:xn};function Fe(e){return e===null||!nt(e)?!0:L.isFrozen(e)}var Ee="MapSet",Je="Patches",Ft={};function ie(e){const t=Ft[e];return t||M(0,e),t}var bn=e=>!!Ft[e],we,qt=()=>we,wn=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:bn(Ee)?ie(Ee):void 0});function jt(e,t){t&&(e.patchPlugin_=ie(Je),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Qe(e){Ze(e),e.drafts_.forEach(vn),e.drafts_=null}function Ze(e){e===we&&(we=e.parent_)}var Rt=e=>we=wn(we,e);function vn(e){const t=e[I];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function Pt(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];if(e!==void 0&&e!==n){n[I].modified_&&(Qe(t),M(4)),X(e)&&(e=Et(t,e));const{patchPlugin_:o}=t;o&&o.generateReplacementPatches_(n[I].base_,e,t)}else e=Et(t,n);return _n(t,e,!0),Qe(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Lt?e:void 0}function Et(e,t){if(Fe(t))return t;const n=t[I];if(!n)return ot(t,e.handledSet_,e);if(!qe(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){const{callbacks_:r}=n;if(r)for(;r.length>0;)r.pop()(e);Mt(n,e)}return n.copy_}function _n(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&at(t,n)}function Wt(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var qe=(e,t)=>e.scope_===t,Cn=[];function Ot(e,t,n,r){const o=G(e),s=e.type_;if(r!==void 0&&Xe(o,r,s)===t){Pe(o,r,n,s);return}if(!e.draftLocations_){const l=e.draftLocations_=new Map;Ce(o,(f,p)=>{if(Y(p)){const x=l.get(p)||[];x.push(f),l.set(p,x)}})}const d=e.draftLocations_.get(t)??Cn;for(const l of d)Pe(o,l,n,s)}function Nn(e,t,n){e.callbacks_.push(function(o){const s=t;if(!s||!qe(s,o))return;o.mapSetPlugin_?.fixSetContents(s);const d=rt(s);Ot(e,s.draft_??s,d,n),Mt(s,o)})}function Mt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||(e.assigned_?.size??0)>0)){const{patchPlugin_:r}=t;if(r){const o=r.getPath(e);o&&r.generatePatches_(e,o,t)}Wt(e)}}function kn(e,t,n){const{scope_:r}=e;if(Y(n)){const o=n[I];qe(o,r)&&o.callbacks_.push(function(){Ae(e);const d=rt(o);Ot(e,n,d,t)})}else X(n)&&e.callbacks_.push(function(){const s=G(e);Xe(s,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&ot(Xe(e.copy_,t,e.type_),r.handledSet_,r)})}function ot(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||Y(e)||t.has(e)||!X(e)||Fe(e)||(t.add(e),Ce(e,(r,o)=>{if(Y(o)){const s=o[I];if(qe(s,n)){const d=rt(s);Pe(e,r,d,e.type_),Wt(s)}}else X(o)&&ot(o,t,n)})),e}function Sn(e,t){const n=ze(e),r={type_:n?1:0,scope_:t?t.scope_:qt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let o=r,s=st;n&&(o=[r],s=ve);const{revoke:d,proxy:l}=Proxy.revocable(o,s);return r.draft_=l,r.revoke_=d,[l,r]}var st={get(e,t){if(t===I)return e;const n=G(e);if(!At(n,t,e.type_))return Dn(e,n,t);const r=n[t];if(e.finalized_||!X(r))return r;if(r===Ue(e.base_,t)){Ae(e);const o=e.type_===1?+t:t,s=tt(e.scope_,r,e,o);return e.copy_[o]=s}return r},has(e,t){return t in G(e)},ownKeys(e){return Reflect.ownKeys(G(e))},set(e,t,n){const r=Bt(G(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const o=Ue(G(e),t),s=o?.[I];if(s&&s.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(yn(n,o)&&(n!==void 0||At(e.base_,t,e.type_)))return!0;Ae(e),et(e)}return e.copy_[t]===n&&(n!==void 0||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_.set(t,!0),kn(e,t,n)),!0},deleteProperty(e,t){return Ae(e),Ue(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),et(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const n=G(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Te]:!0,[Ge]:e.type_!==1||t!=="length",[Re]:r[Re],[be]:n[t]}},defineProperty(){M(11)},getPrototypeOf(e){return se(e.base_)},setPrototypeOf(){M(12)}},ve={};Ce(st,(e,t)=>{ve[e]=function(){const n=arguments;return n[0]=n[0][0],t.apply(this,n)}});ve.deleteProperty=function(e,t){return ve.set.call(this,e,t,void 0)};ve.set=function(e,t,n){return st.set.call(this,e[0],t,n,e[0])};function Ue(e,t){const n=e[I];return(n?G(n):e)[t]}function Dn(e,t,n){const r=Bt(t,n);return r?be in r?r[be]:r.get?.call(e.draft_):void 0}function Bt(e,t){if(!(t in e))return;let n=se(e);for(;n;){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r;n=se(n)}}function et(e){e.modified_||(e.modified_=!0,e.parent_&&et(e.parent_))}function Ae(e){e.copy_||(e.assigned_=new Map,e.copy_=Ye(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var Tn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(t,n,r)=>{if(re(t)&&!re(n)){const s=n;n=t;const d=this;return function(f=s,...p){return d.produce(f,x=>n.call(this,x,...p))}}re(n)||M(6),r!==void 0&&!re(r)&&M(7);let o;if(X(t)){const s=Rt(this),d=tt(s,t,void 0);let l=!0;try{o=n(d),l=!1}finally{l?Qe(s):Ze(s)}return jt(s,r),Pt(o,s)}else if(!t||!nt(t)){if(o=n(t),o===void 0&&(o=t),o===Lt&&(o=void 0),this.autoFreeze_&&at(o,!0),r){const s=[],d=[];ie(Je).generateReplacementPatches_(t,o,{patches_:s,inversePatches_:d}),r(s,d)}return o}else M(1,t)},this.produceWithPatches=(t,n)=>{if(re(t))return(d,...l)=>this.produceWithPatches(d,f=>t(f,...l));let r,o;return[this.produce(t,n,(d,l)=>{r=d,o=l}),r,o]},Ve(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Ve(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Ve(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){X(e)||M(8),Y(e)&&(e=An(e));const t=Rt(this),n=tt(t,e,void 0);return n[I].isManual_=!0,Ze(t),n}finishDraft(e,t){const n=e&&e[I];(!n||!n.isManual_)&&M(9);const{scope_:r}=n;return jt(r,t),Pt(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const o=t[n];if(o.path.length===0&&o.op==="replace"){e=o.value;break}}n>-1&&(t=t.slice(n+1));const r=ie(Je).applyPatches_;return Y(e)?r(e,t):this.produce(e,o=>r(o,t))}};function tt(e,t,n,r){const[o,s]=Le(t)?ie(Ee).proxyMap_(t,n):$e(t)?ie(Ee).proxySet_(t,n):Sn(t,n);return(n?.scope_??qt()).drafts_.push(o),s.callbacks_=n?.callbacks_??[],s.key_=r,n&&r!==void 0?Nn(n,s,r):s.callbacks_.push(function(f){f.mapSetPlugin_?.fixSetContents(s);const{patchPlugin_:p}=f;s.modified_&&p&&p.generatePatches_(s,[],f)}),o}function An(e){return Y(e)||M(10,e),Ht(e)}function Ht(e){if(!X(e)||Fe(e))return e;const t=e[I];let n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Ye(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Ye(e,!0);return Ce(n,(o,s)=>{Pe(n,o,Ht(s))},r),t&&(t.finalized_=!1),n}var jn=new Tn,ae=jn.produce;const Vt=e=>Array.isArray(e.children)&&e.children.length>0,Rn=e=>Vt(e)?e.children:[],oe=(e,t,n=null)=>{for(let r=0;r<e.length;r++){if(e[r].id===t)return{node:e[r],parent:n,index:r,siblings:e};if(Vt(e[r])){const o=oe(Rn(e[r]),t,e[r]);if(o.node)return o}}return{node:null,parent:null,index:-1,siblings:[]}};function Pn(e,t){switch(t.type){case"SET_DRAG_ID":return{...e,dragId:t.payload};case"SET_DROP_TARGET":return{...e,dropId:t.payload.dropId,dropPosition:t.payload.dropPosition};case"CLEAR_DRAG_STATE":return{dragId:null,dropId:null,dropPosition:null};default:return e}}function En(e){const{dragConfig:t,data:n,onDataUpdate:r,onDrop:o,onExpandNode:s}=e,[d,l]=u.useReducer(Pn,{dragId:null,dropId:null,dropPosition:null}),f=u.useRef(null),p=u.useRef(null),x=u.useRef({id:null,position:null}),i=u.useCallback((D,N)=>{if(!t.enabled)return;D.dataTransfer.effectAllowed="move",l({type:"SET_DRAG_ID",payload:N}),f.current=N;const T=oe(n,N);T.node&&t.onDragStart?.(T.node)},[t,n]),g=u.useCallback(()=>{p.current!==null&&(cancelAnimationFrame(p.current),p.current=null);const{dropId:D,dropPosition:N}=d;if(f.current&&D&&N){const T=oe(n,f.current),A=oe(n,D);if(T.node&&A.node){if(t.allowDrop&&!t.allowDrop(T.node,A.node,N)){l({type:"CLEAR_DRAG_STATE"}),f.current=null,x.current={id:null,position:null};return}const R=T.node,m=A.node,P=ae(n,$=>{const v=oe($,f.current);if(!v.node)return;const{parent:W,index:F,siblings:O}=v,q=O[F];W&&W.children?(W.children.splice(F,1),W.children.length===0&&delete W.children):O.splice(F,1);const E=oe($,D);if(!E.node)return;const{node:Q,parent:ee,index:H,siblings:te}=E;if(N==="inside")Q.children||(Q.children=[]),Q.children.push(q);else{const le=ee?.children||te,ke=N==="before"?H:H+1;le.splice(ke,0,q)}});N==="inside"&&s?.(D),r(P),o?.({dragNode:R,dropNode:m,dropPosition:N}),t.onDragEnd?.(R)}}l({type:"CLEAR_DRAG_STATE"}),f.current=null,x.current={id:null,position:null}},[d,n,t,r,o,s]),b=u.useCallback((D,N)=>{if(D.preventDefault(),!t.enabled||f.current===N)return;const T=D.currentTarget.getBoundingClientRect(),A=D.clientY-T.top,R=T.height;let m;A<R*.25?m="before":A>R*.75?m="after":m="inside";const P=x.current;P.id===N&&P.position===m||(p.current!==null&&cancelAnimationFrame(p.current),p.current=requestAnimationFrame(()=>{x.current={id:N,position:m},l({type:"SET_DROP_TARGET",payload:{dropId:N,dropPosition:m}}),p.current=null}))},[t.enabled]),w=u.useCallback(()=>{p.current!==null&&(cancelAnimationFrame(p.current),p.current=null),x.current={id:null,position:null},l({type:"SET_DROP_TARGET",payload:{dropId:null,dropPosition:null}})},[]);return{dragState:d,handleDragStart:i,handleDragEnd:g,handleDragOver:b,handleDragLeave:w}}function In(e){const{flattenedData:t,scroll:n}=e,[r,o]=u.useState(0),s=n?.virtual&&n?.rowHeight,d=n?.rowHeight??40,l=n?.overscan??5,{visibleData:f,totalHeight:p,offsetY:x}=u.useMemo(()=>{if(!s)return{visibleData:t,totalHeight:0,offsetY:0};const i=n?.maxHeight??400,g=t.length*d,b=Math.max(0,Math.floor(r/d)-l),w=Math.min(t.length,Math.ceil((r+i)/d)+l);return{visibleData:t.slice(b,w),totalHeight:g,offsetY:b*d}},[s,t,r,d,l,n?.maxHeight]);return{virtualEnabled:!!s,rowHeight:d,overscan:l,scrollTop:r,setScrollTop:o,visibleData:f,totalHeight:p,offsetY:x}}function zn(e){const{columns:t,resizable:n,onColumnResize:r}=e,[o,s]=u.useState(()=>{const i={};return t.forEach(g=>{typeof g.width=="number"&&(i[g.key]=g.width)}),i}),d=u.useRef(null),l=u.useRef({handleMouseMove:null,handleMouseUp:null});u.useEffect(()=>()=>{const{handleMouseMove:i,handleMouseUp:g}=l.current;i&&document.removeEventListener("mousemove",i),g&&document.removeEventListener("mouseup",g),d.current&&(document.body.style.cursor="",document.body.style.userSelect="")},[]);const f=u.useCallback((i,g)=>{i.preventDefault(),i.stopPropagation();const{handleMouseMove:b,handleMouseUp:w}=l.current;b&&document.removeEventListener("mousemove",b),w&&document.removeEventListener("mouseup",w);const T=i.currentTarget.parentElement?.offsetWidth??100;d.current={key:g,startX:i.clientX,startWidth:T},s(m=>({...m,[g]:T}));const A=m=>{if(!d.current)return;const P=t.find(O=>O.key===d.current.key),$=P?.minWidth??50,v=P?.maxWidth??1/0,W=m.clientX-d.current.startX,F=Math.min(Math.max(d.current.startWidth+W,$),v);s(O=>({...O,[d.current.key]:F}))},R=()=>{if(d.current){const m=d.current.key,P=o[m]??d.current.startWidth;r?.(m,P)}d.current=null,document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",R),l.current={handleMouseMove:null,handleMouseUp:null},document.body.style.cursor="",document.body.style.userSelect=""};l.current={handleMouseMove:A,handleMouseUp:R},document.addEventListener("mousemove",A),document.addEventListener("mouseup",R),document.body.style.cursor="col-resize",document.body.style.userSelect="none"},[t,o,r]),p=u.useCallback(i=>{if(o[i.key]!==void 0)return o[i.key];if(typeof i.width=="number")return i.width},[o]),x=u.useCallback(i=>i.resizable!==void 0?i.resizable:n,[n]);return{columnWidths:o,handleResizeStart:f,getColumnWidth:p,isColumnResizable:x}}function Ln(e){const{scroll:t,virtualEnabled:n,setScrollTop:r}=e,o=u.useRef(null),s=u.useRef(null),d=u.useCallback(f=>{const p=f.currentTarget;if(n&&r&&r(p.scrollTop),s.current&&(s.current.scrollLeft=p.scrollLeft),t?.onScrollBottom){const x=t.scrollBottomThreshold??10;p.scrollHeight-p.scrollTop-p.clientHeight<=x&&t.onScrollBottom()}if(t?.onScrollRight){const x=t.scrollRightThreshold??10;p.scrollWidth-p.scrollLeft-p.clientWidth<=x&&t.onScrollRight()}},[t,n,r]),l=u.useCallback(f=>{const p=f.currentTarget;o.current&&(o.current.scrollLeft=p.scrollLeft)},[]);return{bodyRef:o,headerRef:s,handleBodyScroll:d,handleHeaderScroll:l}}const Ke=()=>{if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=Date.now().toString(36),t=Math.random().toString(36).substring(2,15),n=Math.random().toString(36).substring(2,15),r=(typeof performance<"u"&&performance.now?performance.now():0).toString(36).replace(".","");return`${e}-${t}-${n}-${r}`},We=e=>Array.isArray(e.children)&&e.children.length>0,it=e=>We(e)?e.children:[],Ut=(e,t,n=0,r=null,o=[],s=[],d=0)=>{const l=[];let f=d;return e.forEach((p,x)=>{const i=We(p),g=t.has(p.id),b=[...o,x+1],w=[...s];if(l.push({...p,depth:n,index:x,parentId:r,indexPath:b,isExpanded:g,hasChildren:i,_original:p,_lineInfo:w,_globalIndex:f}),f++,i&&g){const D=it(p),N=x<e.length-1,T=[...w,N],A=Ut(D,t,n+1,p.id,b,T,f);l.push(...A),f+=A.length}}),l},It=e=>{const t=[],n=r=>{r.forEach(o=>{t.push(o.id),We(o)&&n(it(o))})};return n(e),t},U=(e,t,n=null)=>{for(let r=0;r<e.length;r++){if(e[r].id===t)return{node:e[r],parent:n,index:r,siblings:e};if(We(e[r])){const o=U(it(e[r]),t,e[r]);if(o.node)return o}}return{node:null,parent:null,index:-1,siblings:[]}};function $n(e,t){switch(t.type){case"SET_DATA":return{...e,data:t.payload};case"TOGGLE_EXPAND":{const n=new Set(e.expandedIds);return n.has(t.payload)?n.delete(t.payload):n.add(t.payload),{...e,expandedIds:n}}case"EXPAND_NODE":{if(e.expandedIds.has(t.payload))return e;const n=new Set(e.expandedIds);return n.add(t.payload),{...e,expandedIds:n}}case"COLLAPSE_NODE":{if(!e.expandedIds.has(t.payload))return e;const n=new Set(e.expandedIds);return n.delete(t.payload),{...e,expandedIds:n}}case"EXPAND_ALL":return{...e,expandedIds:new Set(t.payload)};case"COLLAPSE_ALL":return{...e,expandedIds:new Set};default:return e}}const Fn=_e.memo(function({column:t,node:n,value:r,onChange:o}){if(t.render)return a.jsx(a.Fragment,{children:t.render(r,n._original,o)});const s=r!=null&&typeof r=="object"&&"toString"in r||r!=null?String(r):"";return a.jsx("span",{className:"cell-text",children:s})}),qn=_e.memo(function({node:t,style:n,showExpandButton:r,showDragHandle:o,showAddButton:s,showDeleteButton:d,dragEnabled:l,expandIcon:f,collapseIcon:p,addIcon:x,deleteIcon:i,customActions:g,onToggleExpand:b,onAddChild:w,onDelete:D,stickyClass:N=""}){const T=u.useCallback(()=>{b(t.id)},[t.id,b]),A=u.useCallback(()=>{w(t.id)},[t.id,w]),R=u.useCallback(()=>{D(t.id)},[t.id,D]);return a.jsxs("div",{className:`cell cell-actions ${N}`,style:n,children:[r&&(t.hasChildren?a.jsx("button",{className:"expand-btn",onClick:T,children:t.isExpanded?p??"▼":f??"▶"}):a.jsx("span",{className:"expand-placeholder"})),o&&l&&a.jsx("span",{className:"drag-handle",title:"拖拽排序",children:"⋮⋮"}),s&&a.jsx("button",{className:"action-btn add",onClick:A,title:"添加子参数",children:x??"+"}),d&&a.jsx("button",{className:"action-btn delete",onClick:R,title:"删除节点",children:i??"🗑"}),g.map(m=>{const P=m.visible?m.visible(t._original):!0,$=m.disabled?m.disabled(t._original):!1;return P?a.jsx("button",{className:"action-btn custom",onClick:()=>m.onClick(t._original),disabled:$,title:m.title,children:m.icon},m.key):null})]})}),Wn=_e.memo(function({node:t,indentSize:n}){return t.depth===0?null:a.jsx(a.Fragment,{children:Array.from({length:t.depth}).map((r,o)=>a.jsx("span",{className:`tree-line tree-line-depth-${o}`,style:{left:o*n,width:n},children:o===t.depth-1?a.jsx("span",{className:"tree-line-corner"}):t._lineInfo[o]?a.jsx("span",{className:"tree-line-vertical"}):null},o))})}),On=_e.memo(function({column:t,node:n,value:r,isFirstColumn:o,indentSize:s,showTreeLine:d,onFieldChange:l}){const f=u.useCallback(x=>{l(n.id,t.key,x)},[n.id,t.key,l]),p=u.useMemo(()=>({width:n.depth*s}),[n.depth,s]);return a.jsxs(a.Fragment,{children:[o&&a.jsx("span",{className:"indent-space",style:p,children:d&&a.jsx(Wn,{node:n,indentSize:s})}),a.jsx(Fn,{column:t,node:n,value:r,onChange:f})]})}),zt=_e.memo(function({node:t,index:n,columns:r,actionsPosition:o,showActions:s,dragEnabled:d,indentSize:l,showTreeLine:f,rowHeight:p,getRowClassName:x,getRowStyle:i,getColumnWidth:g,onDragStart:b,onDragEnd:w,onDragOver:D,onDragLeave:N,onFieldChange:T,renderActionsCell:A,stickyOffsets:R}){const m=u.useCallback(v=>{b(v,t.id)},[t.id,b]),P=u.useCallback(v=>{D(v,t.id)},[t.id,D]),$=u.useMemo(()=>{const v=i(t,n);return p!==void 0?{...v,height:p}:v},[t,n,p,i]);return a.jsxs("div",{className:x(t,n),style:$,draggable:d,onDragStart:m,onDragEnd:w,onDragOver:P,onDragLeave:N,children:[o==="start"&&s&&A(t),r.map((v,W)=>{const F=W===0,O=g(v),q={};let E="";v.sticky==="left"?(E="cell-sticky-left",q.position="sticky",q.left=R.leftOffsets.get(v.key)??0,q.zIndex=2):v.sticky==="right"&&(E="cell-sticky-right",q.position="sticky",q.right=R.rightOffsets.get(v.key)??0,q.zIndex=2);const Q={width:O,minWidth:v.minWidth,flex:O!==void 0?void 0:v.flex,justifyContent:v.align==="center"?"center":v.align==="right"?"flex-end":"flex-start",...q},ee=t,H=v.key in ee?ee[v.key]:void 0;return a.jsx("div",{className:`cell cell-${v.key} ${E}`,style:Q,children:a.jsx(On,{column:v,node:t,value:H,isFirstColumn:F,indentSize:l,showTreeLine:f,onFieldChange:T})},v.key)}),o==="end"&&s&&A(t)]})});function Mn(e,t){const{data:n,defaultExpandedKeys:r=[],defaultExpandAll:o=!1,columns:s,showActions:d=!0,actionsWidth:l=100,actionsPosition:f="start",showDragHandle:p=!0,showExpandButton:x=!0,showAddButton:i=!0,showDeleteButton:g=!0,customActions:b=[],expandIcon:w,collapseIcon:D,addIcon:N,deleteIcon:T,footer:A,onChange:R,onAdd:m,onDelete:P,onNodeChange:$,onExpand:v,onDrop:W,draggable:F=!1,resizable:O=!1,onColumnResize:q,scroll:E,className:Q="",style:ee,rowClassName:H,rowStyle:te,headerClassName:le="",indentSize:ke=20,emptyText:Kt="暂无数据",showTreeLine:dt=!0}=e,[_,K]=u.useReducer($n,{data:n,expandedIds:o?new Set(It(n)):new Set(r)}),z=u.useCallback(c=>{K({type:"SET_DATA",payload:c}),R?.(c)},[R]),de=u.useMemo(()=>typeof F=="boolean"?{enabled:F}:{enabled:!0,...F},[F]),{dragState:ct,handleDragStart:ut,handleDragEnd:pt,handleDragOver:ft,handleDragLeave:ht}=En({dragConfig:de,data:_.data,onDataUpdate:z,onDrop:W,onExpandNode:c=>K({type:"EXPAND_NODE",payload:c})}),{handleResizeStart:Gt,getColumnWidth:ne,isColumnResizable:Xt}=zn({columns:s,resizable:O??!1,onColumnResize:q}),Se=u.useMemo(()=>{const c=new Map,h=new Map;let y=0,C=0;f==="start"&&d&&(y+=l),s.forEach(k=>{if(k.sticky==="left"){c.set(k.key,y);const S=ne(k)??k.minWidth??100;y+=S}});const j=[];f==="end"&&d&&(C=l);for(let k=s.length-1;k>=0;k--){const S=s[k];if(S.sticky==="right"){const V=ne(S)??S.minWidth??100;j.push({col:S,width:V})}}return j.forEach(({col:k,width:S})=>{h.set(k.key,C),C+=S}),{leftOffsets:c,rightOffsets:h}},[s,ne,l,f,d]);u.useEffect(()=>{K({type:"SET_DATA",payload:n})},[n]);const Oe=u.useMemo(()=>Ut(_.data,_.expandedIds),[_.data,_.expandedIds]),{virtualEnabled:gt,rowHeight:Yt,setScrollTop:Jt,visibleData:Qt,totalHeight:Zt,offsetY:en}=In({flattenedData:Oe,scroll:E}),{bodyRef:tn,headerRef:nn,handleBodyScroll:rn,handleHeaderScroll:an}=Ln({scroll:E,virtualEnabled:gt,setScrollTop:Jt}),on=u.useCallback(c=>{const h=m?.(null),y=h||{id:Ke(),name:"newField",...c};if(h!==void 0||!m){const C=[..._.data,y];z(C)}},[_.data,m,z]),sn=u.useCallback((c,h)=>{const y=m?.(null),C=y||{id:Ke(),name:"newField",...c};if(y!==void 0||!m){const j=ae(_.data,k=>{if(h){const{index:S,siblings:V}=U(k,h);V&&V.splice(S+1,0,C)}else k.push(C)});z(j)}},[_.data,m,z]),Me=u.useCallback((c,h)=>{const y=m?.(c),C=y||{id:Ke(),name:"newField",...h};if(y!==void 0||!m){const j=ae(_.data,k=>{const S=U(k,c);S.node&&(S.node.children||(S.node.children=[]),S.node.children.push(C))});K({type:"EXPAND_NODE",payload:c}),z(j)}},[_.data,m,z]),Be=u.useCallback(c=>{const h=U(_.data,c);if(!h.node||P?.(h.node)===!1)return;const C=ae(_.data,j=>{const k=U(j,c);if(!k.node)return;const{parent:S,index:V,siblings:gn}=k;S&&S.children?(S.children.splice(V,1),S.children.length===0&&delete S.children):gn.splice(V,1)});z(C)},[_.data,P,z]),ln=u.useCallback((c,h)=>{const y=ae(_.data,C=>{const{node:j}=U(C,c);j&&Object.assign(j,h)});z(y)},[_.data,z]),dn=u.useCallback(c=>U(_.data,c).node??void 0,[_.data]),mt=u.useCallback(c=>{const h=!_.expandedIds.has(c);K({type:"TOGGLE_EXPAND",payload:c});const y=U(_.data,c);y.node&&v?.(y.node,h)},[_.expandedIds,_.data,v]),cn=u.useCallback(()=>{K({type:"EXPAND_ALL",payload:It(_.data)})},[_.data]),un=u.useCallback(()=>{K({type:"COLLAPSE_ALL"})},[]),pn=u.useCallback(c=>{K({type:"EXPAND_NODE",payload:c})},[]),fn=u.useCallback(c=>{K({type:"COLLAPSE_NODE",payload:c})},[]),yt=u.useCallback((c,h,y)=>{const C=ae(_.data,k=>{const S=U(k,c);if(S.node){const V=S.node;V[h]=y}}),j=U(C,c);j.node&&(z(C),$?.(j.node,h,y))},[_.data,z,$]);u.useImperativeHandle(t,()=>({getData:()=>_.data,setData:z,addRootNode:on,addSiblingNode:sn,addChildNode:Me,deleteNode:Be,updateNode:ln,getNode:dn,expandAll:cn,collapseAll:un,expandNode:pn,collapseNode:fn}));const xt=u.useCallback((c,h)=>{const y=["tree-table-row"],{dragId:C,dropId:j,dropPosition:k}=ct;return C===c.id&&y.push("dragging"),j===c.id&&(y.push("drop-target"),k&&y.push(`drop-${k}`)),typeof H=="string"?y.push(H):typeof H=="function"&&y.push(H(c._original,h)),y.join(" ")},[ct,H]),bt=u.useCallback((c,h)=>typeof te=="function"?te(c._original,h):te||{},[te]),He=u.useMemo(()=>({width:l,minWidth:l}),[l]),wt=u.useMemo(()=>b,[b]),vt=()=>{const c={};let h="";return f==="start"?(h="cell-sticky-left",c.position="sticky",c.left=0,c.zIndex=2):f==="end"&&(h="cell-sticky-right",c.position="sticky",c.right=0,c.zIndex=2),a.jsx("div",{className:`cell cell-actions ${h}`,style:{...He,...c}})},_t=()=>a.jsxs(a.Fragment,{children:[f==="start"&&d&&vt(),s.map(c=>{const h=ne(c),y=Xt(c),C={};let j="";return c.sticky==="left"?(j="cell-sticky-left",C.position="sticky",C.left=Se.leftOffsets.get(c.key)??0,C.zIndex=2):c.sticky==="right"&&(j="cell-sticky-right",C.position="sticky",C.right=Se.rightOffsets.get(c.key)??0,C.zIndex=2),a.jsxs("div",{className:`cell cell-${c.key}${y?" resizable":""} ${j}`,style:{width:h,minWidth:c.minWidth,flex:h!==void 0?void 0:c.flex,justifyContent:c.align==="center"?"center":c.align==="right"?"flex-end":"flex-start",...C},children:[c.title,y&&a.jsx("div",{className:"column-resizer",onMouseDown:k=>Gt(k,c.key)})]},c.key)}),f==="end"&&d&&vt()]}),Ct=u.useCallback(c=>{const h={};let y="";return f==="start"?(y="cell-sticky-left",h.position="sticky",h.left=0,h.zIndex=2):f==="end"&&(y="cell-sticky-right",h.position="sticky",h.right=0,h.zIndex=2),a.jsx(qn,{node:c,style:{...He,...h},showExpandButton:x,showDragHandle:p,showAddButton:i,showDeleteButton:g,dragEnabled:de.enabled,expandIcon:w,collapseIcon:D,addIcon:N,deleteIcon:T,customActions:wt,onToggleExpand:mt,onAddChild:Me,onDelete:Be,stickyClass:y})},[He,f,x,p,i,g,de.enabled,w,D,N,T,wt,mt,Me,Be]),Nt=()=>a.jsx(a.Fragment,{children:Oe.length===0?a.jsx("div",{className:"tree-table-empty",children:Kt}):gt?a.jsx(a.Fragment,{children:a.jsx("div",{style:{height:Zt,position:"relative"},children:a.jsx("div",{style:{transform:`translateY(${en}px)`},children:Qt.map(c=>{const h=c._globalIndex??0;return a.jsx(zt,{node:c,index:h,columns:s,actionsPosition:f,showActions:d,dragEnabled:de.enabled,indentSize:ke,showTreeLine:dt,rowHeight:Yt,getRowClassName:xt,getRowStyle:bt,getColumnWidth:ne,onDragStart:ut,onDragEnd:pt,onDragOver:ft,onDragLeave:ht,onFieldChange:yt,renderActionsCell:Ct,stickyOffsets:Se},c.id)})})})}):Oe.map((c,h)=>a.jsx(zt,{node:c,index:h,columns:s,actionsPosition:f,showActions:d,dragEnabled:de.enabled,indentSize:ke,showTreeLine:dt,getRowClassName:xt,getRowStyle:bt,getColumnWidth:ne,onDragStart:ut,onDragEnd:pt,onDragOver:ft,onDragLeave:ht,onFieldChange:yt,renderActionsCell:Ct,stickyOffsets:Se},c.id))}),kt=!!E,St=E?{minWidth:E.minWidth,maxWidth:E.maxWidth}:{},hn=E?{minHeight:E.minHeight,maxHeight:E.maxHeight}:{};return a.jsx("div",{className:`tree-table-container ${Q}`,style:ee,children:a.jsxs("div",{className:`tree-table${kt?" tree-table-scrollable":""}`,children:[kt?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tree-table-header-wrapper",ref:nn,onScroll:an,children:a.jsx("div",{className:`tree-table-head ${le}`,style:St,children:_t()})}),a.jsx("div",{className:"tree-table-body-wrapper",ref:tn,style:hn,onScroll:rn,children:a.jsx("div",{className:"tree-table-body",style:St,children:Nt()})})]}):a.jsx("div",{className:"tree-table-scroll-wrapper",children:a.jsxs("div",{className:"tree-table-content",children:[a.jsx("div",{className:`tree-table-head ${le}`,children:_t()}),a.jsx("div",{className:"tree-table-body",children:Nt()})]})}),A&&a.jsx("div",{className:"tree-table-footer",children:A})]})})}const B=u.forwardRef(Mn);B.__docgenInfo={description:"",methods:[{name:"getData",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TreeTable",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"树形数据"},defaultExpandedKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"默认展开的节点ID列表"},defaultExpandAll:{required:!1,tsType:{name:"boolean"},description:"默认全部展开"},columns:{required:!0,tsType:{name:"Array",elements:[{name:"ColumnDef",elements:[{name:"T"}],raw:"ColumnDef<T>"}],raw:"ColumnDef<T>[]"},description:"列定义"},showActions:{required:!1,tsType:{name:"boolean"},description:"是否显示操作列"},actionsWidth:{required:!1,tsType:{name:"number"},description:"操作列宽度"},actionsPosition:{required:!1,tsType:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}]},description:"操作列位置"},showDragHandle:{required:!1,tsType:{name:"boolean"},description:"显示拖拽手柄"},showExpandButton:{required:!1,tsType:{name:"boolean"},description:"显示展开按钮"},showAddButton:{required:!1,tsType:{name:"boolean"},description:"显示添加子节点按钮"},showDeleteButton:{required:!1,tsType:{name:"boolean"},description:"显示删除按钮"},customActions:{required:!1,tsType:{name:"Array",elements:[{name:"ActionButton",elements:[{name:"T"}],raw:"ActionButton<T>"}],raw:"ActionButton<T>[]"},description:"自定义操作按钮"},expandIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义展开图标"},collapseIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义收起图标"},addIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义添加子节点图标"},deleteIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义删除图标"},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义底部内容"},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: T[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"T"}],raw:"T[]"},name:"data"}],return:{name:"void"}}},description:"数据变化回调"},onAdd:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentId: string | null) => T | void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"parentId"}],return:{name:"union",raw:"T | void",elements:[{name:"T"},{name:"void"}]}}},description:"添加节点回调 - 返回新节点或自行处理"},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T) => boolean | void",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"union",raw:"boolean | void",elements:[{name:"boolean"},{name:"void"}]}}},description:"删除节点回调 - 返回 false 阻止删除"},onNodeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T, field: string, value: unknown) => void",signature:{arguments:[{type:{name:"T"},name:"node"},{type:{name:"string"},name:"field"},{type:{name:"unknown"},name:"value"}],return:{name:"void"}}},description:"节点字段变化回调"},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T, expanded: boolean) => void",signature:{arguments:[{type:{name:"T"},name:"node"},{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"展开/收起回调"},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:"(info: DropInfo<T>) => void",signature:{arguments:[{type:{name:"DropInfo",elements:[{name:"T"}],raw:"DropInfo<T>"},name:"info"}],return:{name:"void"}}},description:"拖拽完成回调"},draggable:{required:!1,tsType:{name:"union",raw:"boolean | DragConfig<T>",elements:[{name:"boolean"},{name:"DragConfig",elements:[{name:"T"}],raw:"DragConfig<T>"}]},description:"拖拽配置"},resizable:{required:!1,tsType:{name:"boolean"},description:"是否启用列宽调整（全局开关，默认 false）"},onColumnResize:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: string, width: number) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"number"},name:"width"}],return:{name:"void"}}},description:"列宽变化回调"},scroll:{required:!1,tsType:{name:"ScrollConfig"},description:"滚动配置，启用后表头固定，表体可滚动"},className:{required:!1,tsType:{name:"string"},description:"容器类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"容器样式"},rowClassName:{required:!1,tsType:{name:"union",raw:"string | ((node: T, index: number) => string)",elements:[{name:"string"},{name:"unknown"}]},description:"行类名"},rowStyle:{required:!1,tsType:{name:"union",raw:"React.CSSProperties | ((node: T, index: number) => React.CSSProperties)",elements:[{name:"ReactCSSProperties",raw:"React.CSSProperties"},{name:"unknown"}]},description:"行样式"},headerClassName:{required:!1,tsType:{name:"string"},description:"表头类名"},indentSize:{required:!1,tsType:{name:"number"},description:"缩进大小"},rowHeight:{required:!1,tsType:{name:"number"},description:"行高"},showTreeLine:{required:!1,tsType:{name:"boolean"},description:"是否显示树形层级竖线"},emptyText:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"空状态文案"}}};const lt=[{label:"boolean",value:"boolean"},{label:"string",value:"string"},{label:"object",value:"object"},{label:"array[object]",value:"array[object]"},{label:"int64",value:"int64"},{label:"int32",value:"int32"},{label:"float",value:"float"},{label:"double",value:"double"}],J=[{id:"1",name:"success",type:"boolean",required:!0,defaultValue:"true",description:"是否成功"},{id:"2",name:"message",type:"string",required:!0,defaultValue:"ok",description:"错误/成功提示"},{id:"3",name:"data",type:"object",required:!0,defaultValue:"",description:"数据对象",children:[{id:"3-1",name:"items",type:"array[object]",required:!0,defaultValue:"",description:"数据列表",children:[{id:"3-1-1",name:"id",type:"int64",required:!0,defaultValue:"",description:"ID"},{id:"3-1-2",name:"name",type:"string",required:!0,defaultValue:"",description:"名称"}]}]}],Z=[{key:"name",title:"名称",flex:2,minWidth:180,render:(e,t,n)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof e=="string"?e:"",placeholder:"请输入名称",onChange:r=>n(r.target.value)})},{key:"type",title:"类型",width:140,render:(e,t,n)=>a.jsx("select",{className:"tree-table-select",value:typeof e=="string"?e:"",onChange:r=>n(r.target.value),children:lt.map(r=>a.jsx("option",{value:r.value,children:r.label},r.value))})},{key:"required",title:"必填",width:80,align:"center",render:(e,t,n)=>a.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!e,onChange:r=>n(r.target.checked)})},{key:"defaultValue",title:"默认值",width:120,render:(e,t,n)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof e=="string"?e:"",placeholder:"默认值",onChange:r=>n(r.target.value)})},{key:"description",title:"描述",flex:1.5,minWidth:180,render:(e,t,n)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof e=="string"?e:"",placeholder:"请输入描述",onChange:r=>n(r.target.value)})}],Un={title:"Components/TreeTable",component:B,parameters:{layout:"padded",docs:{description:{component:`
## 安装

\`\`\`bash
pnpm add @kfb/tree-table
\`\`\`

## 使用

\`\`\`tsx
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

interface MyNode extends TreeNode {
  // 自定义字段
}

const columns: ColumnDef<MyNode>[] = [
  // 列配置
];

<TreeTable data={data} columns={columns} />
\`\`\`
        `}}},tags:["autodocs"],argTypes:{data:{description:"树形数据",control:"object"},columns:{description:"列配置",control:"object"},draggable:{description:"是否启用拖拽",control:"boolean"},resizable:{description:"是否启用列宽调整",control:"boolean"},showActions:{description:"是否显示操作列",control:"boolean"},defaultExpandAll:{description:"默认展开全部",control:"boolean"},indentSize:{description:"缩进大小（像素）",control:{type:"number",min:0,max:50}}}},ce={render:()=>{const[e,t]=u.useState(J),n=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!1,defaultValue:"",description:""});return a.jsx(B,{data:e,columns:Z,onChange:t,onAdd:()=>n(),showActions:!0,defaultExpandedKeys:["3","3-1"]})}},ue={render:()=>{const[e,t]=u.useState(J),n=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!1,defaultValue:"",description:""});return a.jsx(B,{data:e,columns:Z,onChange:t,onAdd:()=>n(),draggable:!0,showActions:!0,defaultExpandedKeys:["3","3-1"]})}},pe={render:()=>{const[e,t]=u.useState(J),n=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!1,defaultValue:"",description:""});return a.jsx(B,{data:e,columns:Z,onChange:t,onAdd:()=>n(),resizable:!0,showActions:!0,defaultExpandedKeys:["3","3-1"]})}},fe={render:()=>{const[e,t]=u.useState(J),n=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!1,defaultValue:"",description:""});return a.jsx(B,{data:e,columns:Z,onChange:t,onAdd:()=>n(),showActions:!0,defaultExpandedKeys:["3","3-1"],scroll:{maxHeight:300,minWidth:900}})}},he={render:()=>{const[e,t]=u.useState(J),n=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!1,defaultValue:"",description:""});return a.jsx(B,{data:e,columns:Z,onChange:t,onAdd:()=>n(),showActions:!0,defaultExpandedKeys:["3","3-1"],expandIcon:"➕",collapseIcon:"➖",addIcon:"✨",deleteIcon:"❌"})}},ge={render:()=>{const e=()=>{const o=[];for(let s=0;s<100;s++){const d={id:`node-${s}`,name:`field_${s}`,type:s%2===0?"string":"object",required:s%3===0,defaultValue:`value_${s}`,description:`这是第 ${s} 个字段的描述`};if(s%5===0&&s<50){d.children=[];for(let l=0;l<10;l++)d.children.push({id:`node-${s}-${l}`,name:`child_${s}_${l}`,type:"string",required:!1,defaultValue:"",description:`子字段 ${l}`})}o.push(d)}return o},[t,n]=u.useState(e),r=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!1,defaultValue:"",description:""});return a.jsxs("div",{children:[a.jsxs("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px"},children:[a.jsx("strong",{children:"提示："}),"虚拟滚动模式下，只渲染可见区域的行，大幅提升大数据量场景的性能。 当前数据量：",t.length," 条根节点"]}),a.jsx(B,{data:t,columns:Z,onChange:n,onAdd:()=>r(),showActions:!0,defaultExpandAll:!0,scroll:{maxHeight:500,minWidth:900,virtual:!0,rowHeight:40,overscan:5}})]})}},me={render:()=>{const[e,t]=u.useState(J),[n,r]=u.useState(!0),o=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!1,defaultValue:"",description:""});return a.jsxs("div",{children:[a.jsx("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px",display:"flex",alignItems:"center",gap:"8px"},children:a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:n,onChange:s=>r(s.target.checked)}),a.jsx("span",{style:{marginLeft:"4px"},children:"显示层级竖线"})]})}),a.jsx(B,{data:e,columns:Z,onChange:t,onAdd:()=>o(),showActions:!0,showTreeLine:n,defaultExpandedKeys:["3","3-1"]})]})}},ye={render:()=>{const[e,t]=u.useState(J),n=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!1,defaultValue:"",description:""}),r=[{key:"name",title:"名称",width:180,sticky:"left",render:(o,s,d)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof o=="string"?o:"",placeholder:"请输入名称",onChange:l=>d(l.target.value)})},{key:"type",title:"类型",width:140,render:(o,s,d)=>a.jsx("select",{className:"tree-table-select",value:typeof o=="string"?o:"",onChange:l=>d(l.target.value),children:lt.map(l=>a.jsx("option",{value:l.value,children:l.label},l.value))})},{key:"required",title:"必填",width:80,align:"center",render:(o,s,d)=>a.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!o,onChange:l=>d(l.target.checked)})},{key:"defaultValue",title:"默认值",width:120,render:(o,s,d)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof o=="string"?o:"",placeholder:"默认值",onChange:l=>d(l.target.value)})},{key:"description",title:"描述",width:200,sticky:"right",render:(o,s,d)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof o=="string"?o:"",placeholder:"请输入描述",onChange:l=>d(l.target.value)})}];return a.jsxs("div",{children:[a.jsxs("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px"},children:[a.jsx("strong",{children:"提示："}),"名称列左侧固定，描述列右侧固定。横向滚动时这些列会保持可见。 操作列在左侧也会固定。",a.jsx("strong",{children:"请横向滚动表格查看效果！"})]}),a.jsx("div",{style:{width:"600px",border:"2px solid #1890ff",overflow:"auto"},children:a.jsx(B,{data:e,columns:r,onChange:t,onAdd:()=>n(),showActions:!0,actionsPosition:"start",defaultExpandedKeys:["3","3-1"],scroll:{maxHeight:400,minWidth:900}})})]})}},xe={render:()=>{const[e,t]=u.useState(J),n=u.useRef(null),[r,o]=u.useState(!0),[s,d]=u.useState("start"),[l,f]=u.useState(20),p=()=>({id:`node-${Date.now()}`,name:"newField",type:"string",required:!0,defaultValue:"",description:"新增字段"}),x=[{key:"name",title:"名称",width:180,minWidth:120,maxWidth:300,sticky:"left",resizable:!0,render:(i,g,b)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof i=="string"?i:"",placeholder:"请输入名称",onChange:w=>b(w.target.value)})},{key:"type",title:"类型",width:140,minWidth:100,resizable:!0,render:(i,g,b)=>a.jsx("select",{className:"tree-table-select",value:typeof i=="string"?i:"",onChange:w=>b(w.target.value),children:lt.map(w=>a.jsx("option",{value:w.value,children:w.label},w.value))})},{key:"required",title:"必填",width:80,align:"center",render:(i,g,b)=>a.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!i,onChange:w=>b(w.target.checked)})},{key:"defaultValue",title:"默认值",width:150,minWidth:100,resizable:!0,render:(i,g,b)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof i=="string"?i:"",placeholder:"默认值",onChange:w=>b(w.target.value)})},{key:"description",title:"描述",width:200,minWidth:150,sticky:"right",resizable:!0,render:(i,g,b)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof i=="string"?i:"",placeholder:"请输入描述",onChange:w=>b(w.target.value)})}];return a.jsxs("div",{style:{padding:"20px"},children:[a.jsxs("div",{style:{marginBottom:"16px",padding:"16px",background:"#f5f5f5",borderRadius:"8px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"12px"},children:[a.jsx("div",{children:a.jsx("strong",{style:{display:"block",marginBottom:"8px"},children:"🎛️ 控制面板"})}),a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:a.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[a.jsx("input",{type:"checkbox",checked:r,onChange:i=>o(i.target.checked)}),"显示层级线"]})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[a.jsx("label",{children:"操作列位置："}),a.jsxs("select",{value:s,onChange:i=>d(i.target.value),style:{padding:"4px 8px"},children:[a.jsx("option",{value:"start",children:"左侧"}),a.jsx("option",{value:"end",children:"右侧"})]})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[a.jsx("label",{children:"缩进大小："}),a.jsx("input",{type:"range",min:"10",max:"40",value:l,onChange:i=>f(Number(i.target.value)),style:{width:"100px"}}),a.jsxs("span",{children:[l,"px"]})]})]}),a.jsxs("div",{style:{marginBottom:"16px",padding:"16px",background:"#e6f7ff",borderRadius:"8px",border:"1px solid #91d5ff"},children:[a.jsx("strong",{style:{display:"block",marginBottom:"8px"},children:"✨ 本示例包含的所有功能："}),a.jsxs("ul",{style:{margin:0,paddingLeft:"20px",lineHeight:"1.8"},children:[a.jsxs("li",{children:[a.jsx("strong",{children:"数据管理："}),"支持添加、删除、编辑节点"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"拖拽排序："}),"拖动行可调整顺序和层级关系"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"列宽调整："}),"拖动列边框可调整列宽"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"列固定："}),"名称列左侧固定，描述列右侧固定"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"虚拟滚动："}),"表头固定，表体可滚动（横向和纵向）"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"树形层级："}),"支持多层嵌套，显示层级线条"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"自定义渲染："}),"每列都可自定义渲染组件"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"自定义操作："}),"支持自定义操作按钮"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"自定义图标："}),"展开/收起、添加、删除图标可自定义"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"样式定制："}),"支持自定义类名、样式、行样式等"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"事件回调："}),"完整的生命周期回调"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Ref 方法："}),"通过 ref 调用组件方法"]})]})]}),a.jsx("div",{style:{border:"2px solid #1890ff",borderRadius:"8px",overflow:"hidden"},children:a.jsx(B,{ref:n,data:e,defaultExpandedKeys:["3","3-1"],columns:x,showActions:!0,actionsWidth:120,actionsPosition:s,showDragHandle:!0,showExpandButton:!0,showAddButton:!0,showDeleteButton:!0,customActions:[{key:"copy",icon:"📋",title:"复制节点",onClick:i=>{const g={...i,id:`node-${Date.now()}`,name:`${i.name}_copy`};n.current?.addSiblingNode(g,i.id)},visible:i=>!0},{key:"info",icon:"ℹ️",title:"查看详情",onClick:i=>{alert(`节点信息：
ID: ${i.id}
名称: ${i.name}
类型: ${i.type}`)}}],expandIcon:"➕",collapseIcon:"➖",addIcon:"✨",deleteIcon:"🗑️",footer:a.jsxs("div",{style:{display:"flex",gap:"8px",padding:"12px",background:"#fafafa",borderTop:"1px solid #d9d9d9"},children:[a.jsx("button",{onClick:()=>n.current?.addRootNode(p()),style:{padding:"6px 12px",cursor:"pointer"},children:"➕ 添加根节点"}),a.jsx("button",{onClick:()=>n.current?.expandAll(),style:{padding:"6px 12px",cursor:"pointer"},children:"📂 展开全部"}),a.jsx("button",{onClick:()=>n.current?.collapseAll(),style:{padding:"6px 12px",cursor:"pointer"},children:"📁 收起全部"}),a.jsx("button",{onClick:()=>{const i=n.current?.getData();console.log("当前数据：",i),alert(`数据已输出到控制台，共 ${i?.length} 个根节点`)},style:{padding:"6px 12px",cursor:"pointer"},children:"📊 导出数据"})]}),onChange:i=>{console.log("数据变化：",i),t(i)},onAdd:i=>(console.log("添加节点，父节点ID：",i),p()),onDelete:i=>(console.log("删除节点：",i),window.confirm(`确定要删除节点 "${i.name}" 吗？`)),onNodeChange:(i,g,b)=>{console.log("节点字段变化：",{node:i,field:g,value:b})},onExpand:(i,g)=>{console.log(`节点 ${g?"展开":"收起"}：`,i)},onDrop:i=>{console.log("拖拽完成：",i)},draggable:{enabled:!0,allowDrop:(i,g,b)=>(console.log("拖拽检查：",{dragNode:i,dropNode:g,position:b}),!0),onDragStart:i=>{console.log("开始拖拽：",i)},onDragEnd:i=>{console.log("拖拽结束：",i)}},resizable:!0,onColumnResize:(i,g)=>{console.log("列宽变化：",{key:i,width:g})},scroll:{maxHeight:500,minHeight:300,minWidth:1e3,virtual:!1,onScrollBottom:()=>{console.log("滚动到底部")},scrollBottomThreshold:50,onScrollRight:()=>{console.log("滚动到右侧")},scrollRightThreshold:50},className:"full-feature-table",style:{fontSize:"14px"},rowClassName:(i,g)=>g%2===0?"even-row":"odd-row",rowStyle:(i,g)=>({fontWeight:i.depth===0?"bold":"normal"}),headerClassName:"custom-header",indentSize:l,showTreeLine:r,emptyText:a.jsxs("div",{style:{padding:"40px",textAlign:"center",color:"#999"},children:[a.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"📭"}),a.jsx("div",{children:"暂无数据，点击下方按钮添加数据"})]})})}),a.jsxs("div",{style:{marginTop:"16px",padding:"16px",background:"#f5f5f5",borderRadius:"8px",maxHeight:"200px",overflow:"auto"},children:[a.jsx("strong",{style:{display:"block",marginBottom:"8px"},children:"📝 当前数据（JSON）："}),a.jsx("pre",{style:{margin:0,fontSize:"12px",lineHeight:"1.5",whiteSpace:"pre-wrap",wordBreak:"break-all"},children:JSON.stringify(e,null,2)})]})]})}};ce.parameters={...ce.parameters,docs:{...ce.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: ''
    });
    return <TreeTable<ApiParamNode> data={data} columns={columns} onChange={setData} onAdd={() => createNewNode()} showActions defaultExpandedKeys={['3', '3-1']} />;
  }
}`,...ce.parameters?.docs?.source},description:{story:"基础用法 - 展示树形表格的基本功能",...ce.parameters?.docs?.description}}};ue.parameters={...ue.parameters,docs:{...ue.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: ''
    });
    return <TreeTable<ApiParamNode> data={data} columns={columns} onChange={setData} onAdd={() => createNewNode()} draggable showActions defaultExpandedKeys={['3', '3-1']} />;
  }
}`,...ue.parameters?.docs?.source},description:{story:"启用拖拽排序 - 可以拖动行调整顺序和层级",...ue.parameters?.docs?.description}}};pe.parameters={...pe.parameters,docs:{...pe.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: ''
    });
    return <TreeTable<ApiParamNode> data={data} columns={columns} onChange={setData} onAdd={() => createNewNode()} resizable showActions defaultExpandedKeys={['3', '3-1']} />;
  }
}`,...pe.parameters?.docs?.source},description:{story:"启用列宽调整 - 可以通过拖动列边框调整列宽",...pe.parameters?.docs?.description}}};fe.parameters={...fe.parameters,docs:{...fe.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: ''
    });
    return <TreeTable<ApiParamNode> data={data} columns={columns} onChange={setData} onAdd={() => createNewNode()} showActions defaultExpandedKeys={['3', '3-1']} scroll={{
      maxHeight: 300,
      minWidth: 900
    }} />;
  }
}`,...fe.parameters?.docs?.source},description:{story:"滚动配置 - 表头固定，表体可滚动",...fe.parameters?.docs?.description}}};he.parameters={...he.parameters,docs:{...he.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: ''
    });
    return <TreeTable<ApiParamNode> data={data} columns={columns} onChange={setData} onAdd={() => createNewNode()} showActions defaultExpandedKeys={['3', '3-1']} expandIcon="➕" collapseIcon="➖" addIcon="✨" deleteIcon="❌" />;
  }
}`,...he.parameters?.docs?.source},description:{story:"自定义图标 - 自定义折叠/展开、添加、删除图标",...he.parameters?.docs?.description}}};ge.parameters={...ge.parameters,docs:{...ge.parameters?.docs,source:{originalSource:`{
  render: () => {
    // 生成大量数据
    const generateLargeData = (): ApiParamNode[] => {
      const data: ApiParamNode[] = [];
      for (let i = 0; i < 100; i++) {
        const node: ApiParamNode = {
          id: \`node-\${i}\`,
          name: \`field_\${i}\`,
          type: i % 2 === 0 ? 'string' : 'object',
          required: i % 3 === 0,
          defaultValue: \`value_\${i}\`,
          description: \`这是第 \${i} 个字段的描述\`
        };

        // 部分节点添加子节点
        if (i % 5 === 0 && i < 50) {
          node.children = [];
          for (let j = 0; j < 10; j++) {
            node.children.push({
              id: \`node-\${i}-\${j}\`,
              name: \`child_\${i}_\${j}\`,
              type: 'string',
              required: false,
              defaultValue: '',
              description: \`子字段 \${j}\`
            });
          }
        }
        data.push(node);
      }
      return data;
    };
    const [data, setData] = useState<ApiParamNode[]>(generateLargeData);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: ''
    });
    return <div>
        <div style={{
        marginBottom: '12px',
        padding: '8px',
        background: '#f0f0f0',
        borderRadius: '4px'
      }}>
          <strong>提示：</strong>虚拟滚动模式下，只渲染可见区域的行，大幅提升大数据量场景的性能。
          当前数据量：{data.length} 条根节点
        </div>
        <TreeTable<ApiParamNode> data={data} columns={columns} onChange={setData} onAdd={() => createNewNode()} showActions defaultExpandAll scroll={{
        maxHeight: 500,
        minWidth: 900,
        virtual: true,
        rowHeight: 40,
        overscan: 5
      }} />
      </div>;
  }
}`,...ge.parameters?.docs?.source},description:{story:"虚拟滚动 - 大数据量场景下的性能优化",...ge.parameters?.docs?.description}}};me.parameters={...me.parameters,docs:{...me.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const [showTreeLine, setShowTreeLine] = useState(true);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: ''
    });
    return <div>
        <div style={{
        marginBottom: '12px',
        padding: '8px',
        background: '#f0f0f0',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
          <label>
            <input type="checkbox" checked={showTreeLine} onChange={e => setShowTreeLine(e.target.checked)} />
            <span style={{
            marginLeft: '4px'
          }}>显示层级竖线</span>
          </label>
        </div>
        <TreeTable<ApiParamNode> data={data} columns={columns} onChange={setData} onAdd={() => createNewNode()} showActions showTreeLine={showTreeLine} defaultExpandedKeys={['3', '3-1']} />
      </div>;
  }
}`,...me.parameters?.docs?.source},description:{story:"显示层级竖线 - 展示树形结构的层级关系",...me.parameters?.docs?.description}}};ye.parameters={...ye.parameters,docs:{...ye.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: ''
    });

    // 配置固定列
    const stickyColumns: ColumnDef<ApiParamNode>[] = [{
      key: 'name',
      title: '名称',
      width: 180,
      sticky: 'left',
      // 左侧固定
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder="请输入名称" onChange={e => onChange(e.target.value)} />
    }, {
      key: 'type',
      title: '类型',
      width: 140,
      render: (value, _node, onChange) => <select className="tree-table-select" value={typeof value === 'string' ? value : ''} onChange={e => onChange(e.target.value)}>
            {TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>)}
          </select>
    }, {
      key: 'required',
      title: '必填',
      width: 80,
      align: 'center',
      render: (value, _node, onChange) => <input type="checkbox" className="tree-table-checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} />
    }, {
      key: 'defaultValue',
      title: '默认值',
      width: 120,
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder="默认值" onChange={e => onChange(e.target.value)} />
    }, {
      key: 'description',
      title: '描述',
      width: 200,
      sticky: 'right',
      // 右侧固定
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder="请输入描述" onChange={e => onChange(e.target.value)} />
    }];
    return <div>
        <div style={{
        marginBottom: '12px',
        padding: '8px',
        background: '#f0f0f0',
        borderRadius: '4px'
      }}>
          <strong>提示：</strong>名称列左侧固定，描述列右侧固定。横向滚动时这些列会保持可见。
          操作列在左侧也会固定。<strong>请横向滚动表格查看效果！</strong>
        </div>
        <div style={{
        width: '600px',
        border: '2px solid #1890ff',
        overflow: 'auto'
      }}>
          <TreeTable<ApiParamNode> data={data} columns={stickyColumns} onChange={setData} onAdd={() => createNewNode()} showActions actionsPosition="start" defaultExpandedKeys={['3', '3-1']} scroll={{
          maxHeight: 400,
          minWidth: 900
        }} />
        </div>
      </div>;
  }
}`,...ye.parameters?.docs?.source},description:{story:"列固定 - 左右固定列，多列时操作列始终可见",...ye.parameters?.docs?.description}}};xe.parameters={...xe.parameters,docs:{...xe.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const tableRef = useRef<TreeTableRef<ApiParamNode>>(null);
    const [showTreeLine, setShowTreeLine] = useState(true);
    const [actionsPosition, setActionsPosition] = useState<'start' | 'end'>('start');
    const [indentSize, setIndentSize] = useState(20);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: 'newField',
      type: 'string',
      required: true,
      defaultValue: '',
      description: '新增字段'
    });

    // 配置固定列
    const fullFeatureColumns: ColumnDef<ApiParamNode>[] = [{
      key: 'name',
      title: '名称',
      width: 180,
      minWidth: 120,
      maxWidth: 300,
      sticky: 'left',
      // 左侧固定
      resizable: true,
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder="请输入名称" onChange={e => onChange(e.target.value)} />
    }, {
      key: 'type',
      title: '类型',
      width: 140,
      minWidth: 100,
      resizable: true,
      render: (value, _node, onChange) => <select className="tree-table-select" value={typeof value === 'string' ? value : ''} onChange={e => onChange(e.target.value)}>
            {TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>)}
          </select>
    }, {
      key: 'required',
      title: '必填',
      width: 80,
      align: 'center',
      render: (value, _node, onChange) => <input type="checkbox" className="tree-table-checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} />
    }, {
      key: 'defaultValue',
      title: '默认值',
      width: 150,
      minWidth: 100,
      resizable: true,
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder="默认值" onChange={e => onChange(e.target.value)} />
    }, {
      key: 'description',
      title: '描述',
      width: 200,
      minWidth: 150,
      sticky: 'right',
      // 右侧固定
      resizable: true,
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder="请输入描述" onChange={e => onChange(e.target.value)} />
    }];
    return <div style={{
      padding: '20px'
    }}>
        {/* 控制面板 */}
        <div style={{
        marginBottom: '16px',
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
          <div>
            <strong style={{
            display: 'block',
            marginBottom: '8px'
          }}>🎛️ 控制面板</strong>
          </div>
          
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
            <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
              <input type="checkbox" checked={showTreeLine} onChange={e => setShowTreeLine(e.target.checked)} />
              显示层级线
            </label>
          </div>

          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
            <label>操作列位置：</label>
            <select value={actionsPosition} onChange={e => setActionsPosition(e.target.value as 'start' | 'end')} style={{
            padding: '4px 8px'
          }}>
              <option value="start">左侧</option>
              <option value="end">右侧</option>
            </select>
          </div>

          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
            <label>缩进大小：</label>
            <input type="range" min="10" max="40" value={indentSize} onChange={e => setIndentSize(Number(e.target.value))} style={{
            width: '100px'
          }} />
            <span>{indentSize}px</span>
          </div>
        </div>

        {/* 功能说明 */}
        <div style={{
        marginBottom: '16px',
        padding: '16px',
        background: '#e6f7ff',
        borderRadius: '8px',
        border: '1px solid #91d5ff'
      }}>
          <strong style={{
          display: 'block',
          marginBottom: '8px'
        }}>✨ 本示例包含的所有功能：</strong>
          <ul style={{
          margin: 0,
          paddingLeft: '20px',
          lineHeight: '1.8'
        }}>
            <li><strong>数据管理：</strong>支持添加、删除、编辑节点</li>
            <li><strong>拖拽排序：</strong>拖动行可调整顺序和层级关系</li>
            <li><strong>列宽调整：</strong>拖动列边框可调整列宽</li>
            <li><strong>列固定：</strong>名称列左侧固定，描述列右侧固定</li>
            <li><strong>虚拟滚动：</strong>表头固定，表体可滚动（横向和纵向）</li>
            <li><strong>树形层级：</strong>支持多层嵌套，显示层级线条</li>
            <li><strong>自定义渲染：</strong>每列都可自定义渲染组件</li>
            <li><strong>自定义操作：</strong>支持自定义操作按钮</li>
            <li><strong>自定义图标：</strong>展开/收起、添加、删除图标可自定义</li>
            <li><strong>样式定制：</strong>支持自定义类名、样式、行样式等</li>
            <li><strong>事件回调：</strong>完整的生命周期回调</li>
            <li><strong>Ref 方法：</strong>通过 ref 调用组件方法</li>
          </ul>
        </div>

        {/* 表格容器 - 限制宽度以展示横向滚动 */}
        <div style={{
        border: '2px solid #1890ff',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
          <TreeTable<ApiParamNode> ref={tableRef}
        // ========== 数据相关 ==========
        data={data} defaultExpandedKeys={['3', '3-1']}

        // ========== 列配置 ==========
        columns={fullFeatureColumns}

        // ========== 操作列配置 ==========
        showActions actionsWidth={120} actionsPosition={actionsPosition} showDragHandle showExpandButton showAddButton showDeleteButton customActions={[{
          key: 'copy',
          icon: '📋',
          title: '复制节点',
          onClick: node => {
            const newNode = {
              ...node,
              id: \`node-\${Date.now()}\`,
              name: \`\${node.name}_copy\`
            };
            tableRef.current?.addSiblingNode(newNode, node.id);
          },
          visible: node => true
        }, {
          key: 'info',
          icon: 'ℹ️',
          title: '查看详情',
          onClick: node => {
            alert(\`节点信息：\\nID: \${node.id}\\n名称: \${node.name}\\n类型: \${node.type}\`);
          }
        }]}

        // ========== 自定义图标 ==========
        expandIcon="➕" collapseIcon="➖" addIcon="✨" deleteIcon="🗑️"

        // ========== 底部区域 ==========
        footer={<div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px',
          background: '#fafafa',
          borderTop: '1px solid #d9d9d9'
        }}>
                <button onClick={() => tableRef.current?.addRootNode(createNewNode())} style={{
            padding: '6px 12px',
            cursor: 'pointer'
          }}>
                  ➕ 添加根节点
                </button>
                <button onClick={() => tableRef.current?.expandAll()} style={{
            padding: '6px 12px',
            cursor: 'pointer'
          }}>
                  📂 展开全部
                </button>
                <button onClick={() => tableRef.current?.collapseAll()} style={{
            padding: '6px 12px',
            cursor: 'pointer'
          }}>
                  📁 收起全部
                </button>
                <button onClick={() => {
            const currentData = tableRef.current?.getData();
            console.log('当前数据：', currentData);
            alert(\`数据已输出到控制台，共 \${currentData?.length} 个根节点\`);
          }} style={{
            padding: '6px 12px',
            cursor: 'pointer'
          }}>
                  📊 导出数据
                </button>
              </div>}

        // ========== 事件回调 ==========
        onChange={newData => {
          console.log('数据变化：', newData);
          setData(newData);
        }} onAdd={parentId => {
          console.log('添加节点，父节点ID：', parentId);
          return createNewNode();
        }} onDelete={node => {
          console.log('删除节点：', node);
          const confirmed = window.confirm(\`确定要删除节点 "\${node.name}" 吗？\`);
          return confirmed;
        }} onNodeChange={(node, field, value) => {
          console.log('节点字段变化：', {
            node,
            field,
            value
          });
        }} onExpand={(node, expanded) => {
          console.log(\`节点 \${expanded ? '展开' : '收起'}：\`, node);
        }} onDrop={info => {
          console.log('拖拽完成：', info);
        }}

        // ========== 拖拽配置 ==========
        draggable={{
          enabled: true,
          allowDrop: (dragNode, dropNode, position) => {
            // 示例：不允许将父节点拖到子节点内部
            console.log('拖拽检查：', {
              dragNode,
              dropNode,
              position
            });
            return true;
          },
          onDragStart: node => {
            console.log('开始拖拽：', node);
          },
          onDragEnd: node => {
            console.log('拖拽结束：', node);
          }
        }}

        // ========== 列宽调整 ==========
        resizable onColumnResize={(key, width) => {
          console.log('列宽变化：', {
            key,
            width
          });
        }}

        // ========== 滚动配置 ==========
        scroll={{
          maxHeight: 500,
          minHeight: 300,
          minWidth: 1000,
          virtual: false,
          // 可以改为 true 启用虚拟滚动
          // rowHeight: 40, // 启用虚拟滚动时需要
          // overscan: 5,
          onScrollBottom: () => {
            console.log('滚动到底部');
          },
          scrollBottomThreshold: 50,
          onScrollRight: () => {
            console.log('滚动到右侧');
          },
          scrollRightThreshold: 50
        }}

        // ========== 样式定制 ==========
        className="full-feature-table" style={{
          fontSize: '14px'
        }} rowClassName={(node, index) => {
          // 偶数行添加背景色
          return index % 2 === 0 ? 'even-row' : 'odd-row';
        }} rowStyle={(node, index) => ({
          // 根节点加粗
          fontWeight: node.depth === 0 ? 'bold' : 'normal'
        })} headerClassName="custom-header" indentSize={indentSize} showTreeLine={showTreeLine}

        // ========== 空状态 ==========
        emptyText={<div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#999'
        }}>
                <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>📭</div>
                <div>暂无数据，点击下方按钮添加数据</div>
              </div>} />
        </div>

        {/* 数据预览 */}
        <div style={{
        marginTop: '16px',
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
        maxHeight: '200px',
        overflow: 'auto'
      }}>
          <strong style={{
          display: 'block',
          marginBottom: '8px'
        }}>📝 当前数据（JSON）：</strong>
          <pre style={{
          margin: 0,
          fontSize: '12px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>;
  }
}`,...xe.parameters?.docs?.source},description:{story:"完整示例 - 包含所有功能的演示",...xe.parameters?.docs?.description}}};const Kn=["Basic","WithDraggable","WithResizable","WithScroll","CustomIcons","VirtualScroll","WithTreeLine","StickyColumns","FullFeature"];export{ce as Basic,he as CustomIcons,xe as FullFeature,ye as StickyColumns,ge as VirtualScroll,ue as WithDraggable,pe as WithResizable,fe as WithScroll,me as WithTreeLine,Kn as __namedExportsOrder,Un as default};
