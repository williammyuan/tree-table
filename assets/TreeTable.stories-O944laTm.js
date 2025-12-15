import{j as a}from"./jsx-runtime-CDt2p4po.js";import{r as u,R as _e}from"./index-GiUgBvb1.js";import{p as Nn}from"./package-NFl35TiM.js";var Vt=Symbol.for("immer-nothing"),Zt=Symbol.for("immer-draftable"),P=Symbol.for("immer-state");function F(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var W=Object,de=W.getPrototypeOf,Pe="constructor",We="prototype",et="configurable",Le="enumerable",Ie="writable",Ce="value",te=e=>!!e&&!!e[P];function Y(e){return e?Kt(e)||$e(e)||!!e[Zt]||!!e[Pe]?.[Zt]||Be(e)||Oe(e):!1}var An=W[We][Pe].toString(),Mt=new WeakMap;function Kt(e){if(!e||!lt(e))return!1;const t=de(e);if(t===null||t===W[We])return!0;const n=W.hasOwnProperty.call(t,Pe)&&t[Pe];if(n===Object)return!0;if(!se(n))return!1;let r=Mt.get(n);return r===void 0&&(r=Function.toString.call(n),Mt.set(n,r)),r===An}function Se(e,t,n=!0){Ne(e)===0?(n?Reflect.ownKeys(e):W.keys(e)).forEach(o=>{t(o,e[o],e)}):e.forEach((r,o)=>t(o,r,e))}function Ne(e){const t=e[P];return t?t.type_:$e(e)?1:Be(e)?2:Oe(e)?3:0}var Wt=(e,t,n=Ne(e))=>n===2?e.has(t):W[We].hasOwnProperty.call(e,t),tt=(e,t,n=Ne(e))=>n===2?e.get(t):e[t],Ze=(e,t,n,r=Ne(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function En(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var $e=Array.isArray,Be=e=>e instanceof Map,Oe=e=>e instanceof Set,lt=e=>typeof e=="object",se=e=>typeof e=="function",Ye=e=>typeof e=="boolean",X=e=>e.copy_||e.base_,dt=e=>e.modified_?e.copy_:e.base_;function nt(e,t){if(Be(e))return new Map(e);if(Oe(e))return new Set(e);if($e(e))return Array[We].slice.call(e);const n=Kt(e);if(t===!0||t==="class_only"&&!n){const r=W.getOwnPropertyDescriptors(e);delete r[P];let o=Reflect.ownKeys(r);for(let s=0;s<o.length;s++){const i=o[s],d=r[i];d[Ie]===!1&&(d[Ie]=!0,d[et]=!0),(d.get||d.set)&&(r[i]={[et]:!0,[Ie]:!0,[Le]:d[Le],[Ce]:e[i]})}return W.create(de(e),r)}else{const r=de(e);if(r!==null&&n)return{...e};const o=W.create(r);return W.assign(o,e)}}function ct(e,t=!1){return qe(e)||te(e)||!Y(e)||(Ne(e)>1&&W.defineProperties(e,{set:je,add:je,clear:je,delete:je}),W.freeze(e),t&&Se(e,(n,r)=>{ct(r,!0)},!1)),e}function Rn(){F(2)}var je={[Ce]:Rn};function qe(e){return e===null||!lt(e)?!0:W.isFrozen(e)}var Me="MapSet",rt="Patches",Ut={};function ce(e){const t=Ut[e];return t||F(0,e),t}var jn=e=>!!Ut[e],ke,Gt=()=>ke,In=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:jn(Me)?ce(Me):void 0});function $t(e,t){t&&(e.patchPlugin_=ce(rt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function at(e){ot(e),e.drafts_.forEach(zn),e.drafts_=null}function ot(e){e===ke&&(ke=e.parent_)}var Bt=e=>ke=In(ke,e);function zn(e){const t=e[P];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function Ot(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];if(e!==void 0&&e!==n){n[P].modified_&&(at(t),F(4)),Y(e)&&(e=qt(t,e));const{patchPlugin_:o}=t;o&&o.generateReplacementPatches_(n[P].base_,e,t)}else e=qt(t,n);return Pn(t,e,!0),at(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Vt?e:void 0}function qt(e,t){if(qe(t))return t;const n=t[P];if(!n)return ut(t,e.handledSet_,e);if(!Fe(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){const{callbacks_:r}=n;if(r)for(;r.length>0;)r.pop()(e);Jt(n,e)}return n.copy_}function Pn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&ct(t,n)}function Xt(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Fe=(e,t)=>e.scope_===t,Ln=[];function Yt(e,t,n,r){const o=X(e),s=e.type_;if(r!==void 0&&tt(o,r,s)===t){Ze(o,r,n,s);return}if(!e.draftLocations_){const d=e.draftLocations_=new Map;Se(o,(h,c)=>{if(te(c)){const f=d.get(c)||[];f.push(h),d.set(c,f)}})}const i=e.draftLocations_.get(t)??Ln;for(const d of i)Ze(o,d,n,s)}function Zn(e,t,n){e.callbacks_.push(function(o){const s=t;if(!s||!Fe(s,o))return;o.mapSetPlugin_?.fixSetContents(s);const i=dt(s);Yt(e,s.draft_??s,i,n),Jt(s,o)})}function Jt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||(e.assigned_?.size??0)>0)){const{patchPlugin_:r}=t;if(r){const o=r.getPath(e);o&&r.generatePatches_(e,o,t)}Xt(e)}}function Mn(e,t,n){const{scope_:r}=e;if(te(n)){const o=n[P];Fe(o,r)&&o.callbacks_.push(function(){ze(e);const i=dt(o);Yt(e,n,i,t)})}else Y(n)&&e.callbacks_.push(function(){const s=X(e);tt(s,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&ut(tt(e.copy_,t,e.type_),r.handledSet_,r)})}function ut(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||te(e)||t.has(e)||!Y(e)||qe(e)||(t.add(e),Se(e,(r,o)=>{if(te(o)){const s=o[P];if(Fe(s,n)){const i=dt(s);Ze(e,r,i,e.type_),Xt(s)}}else Y(o)&&ut(o,t,n)})),e}function Wn(e,t){const n=$e(e),r={type_:n?1:0,scope_:t?t.scope_:Gt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let o=r,s=pt;n&&(o=[r],s=De);const{revoke:i,proxy:d}=Proxy.revocable(o,s);return r.draft_=d,r.revoke_=i,[d,r]}var pt={get(e,t){if(t===P)return e;const n=X(e);if(!Wt(n,t,e.type_))return $n(e,n,t);const r=n[t];if(e.finalized_||!Y(r))return r;if(r===Je(e.base_,t)){ze(e);const o=e.type_===1?+t:t,s=it(e.scope_,r,e,o);return e.copy_[o]=s}return r},has(e,t){return t in X(e)},ownKeys(e){return Reflect.ownKeys(X(e))},set(e,t,n){const r=Qt(X(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const o=Je(X(e),t),s=o?.[P];if(s&&s.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(En(n,o)&&(n!==void 0||Wt(e.base_,t,e.type_)))return!0;ze(e),st(e)}return e.copy_[t]===n&&(n!==void 0||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_.set(t,!0),Mn(e,t,n)),!0},deleteProperty(e,t){return ze(e),Je(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),st(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const n=X(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Ie]:!0,[et]:e.type_!==1||t!=="length",[Le]:r[Le],[Ce]:n[t]}},defineProperty(){F(11)},getPrototypeOf(e){return de(e.base_)},setPrototypeOf(){F(12)}},De={};Se(pt,(e,t)=>{De[e]=function(){const n=arguments;return n[0]=n[0][0],t.apply(this,n)}});De.deleteProperty=function(e,t){return De.set.call(this,e,t,void 0)};De.set=function(e,t,n){return pt.set.call(this,e[0],t,n,e[0])};function Je(e,t){const n=e[P];return(n?X(n):e)[t]}function $n(e,t,n){const r=Qt(t,n);return r?Ce in r?r[Ce]:r.get?.call(e.draft_):void 0}function Qt(e,t){if(!(t in e))return;let n=de(e);for(;n;){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r;n=de(n)}}function st(e){e.modified_||(e.modified_=!0,e.parent_&&st(e.parent_))}function ze(e){e.copy_||(e.assigned_=new Map,e.copy_=nt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var Bn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(t,n,r)=>{if(se(t)&&!se(n)){const s=n;n=t;const i=this;return function(h=s,...c){return i.produce(h,f=>n.call(this,f,...c))}}se(n)||F(6),r!==void 0&&!se(r)&&F(7);let o;if(Y(t)){const s=Bt(this),i=it(s,t,void 0);let d=!0;try{o=n(i),d=!1}finally{d?at(s):ot(s)}return $t(s,r),Ot(o,s)}else if(!t||!lt(t)){if(o=n(t),o===void 0&&(o=t),o===Vt&&(o=void 0),this.autoFreeze_&&ct(o,!0),r){const s=[],i=[];ce(rt).generateReplacementPatches_(t,o,{patches_:s,inversePatches_:i}),r(s,i)}return o}else F(1,t)},this.produceWithPatches=(t,n)=>{if(se(t))return(i,...d)=>this.produceWithPatches(i,h=>t(h,...d));let r,o;return[this.produce(t,n,(i,d)=>{r=i,o=d}),r,o]},Ye(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Ye(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Ye(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){Y(e)||F(8),te(e)&&(e=On(e));const t=Bt(this),n=it(t,e,void 0);return n[P].isManual_=!0,ot(t),n}finishDraft(e,t){const n=e&&e[P];(!n||!n.isManual_)&&F(9);const{scope_:r}=n;return $t(r,t),Ot(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const o=t[n];if(o.path.length===0&&o.op==="replace"){e=o.value;break}}n>-1&&(t=t.slice(n+1));const r=ce(rt).applyPatches_;return te(e)?r(e,t):this.produce(e,o=>r(o,t))}};function it(e,t,n,r){const[o,s]=Be(t)?ce(Me).proxyMap_(t,n):Oe(t)?ce(Me).proxySet_(t,n):Wn(t,n);return(n?.scope_??Gt()).drafts_.push(o),s.callbacks_=n?.callbacks_??[],s.key_=r,n&&r!==void 0?Zn(n,s,r):s.callbacks_.push(function(h){h.mapSetPlugin_?.fixSetContents(s);const{patchPlugin_:c}=h;s.modified_&&c&&c.generatePatches_(s,[],h)}),o}function On(e){return te(e)||F(10,e),en(e)}function en(e){if(!Y(e)||qe(e))return e;const t=e[P];let n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=nt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=nt(e,!0);return Se(n,(o,s)=>{Ze(n,o,en(s))},r),t&&(t.finalized_=!1),n}var qn=new Bn,ie=qn.produce;const tn=e=>Array.isArray(e.children)&&e.children.length>0,Fn=e=>tn(e)?e.children:[],le=(e,t,n=null)=>{for(let r=0;r<e.length;r++){if(e[r].id===t)return{node:e[r],parent:n,index:r,siblings:e};if(tn(e[r])){const o=le(Fn(e[r]),t,e[r]);if(o.node)return o}}return{node:null,parent:null,index:-1,siblings:[]}};function Hn(e,t){switch(t.type){case"SET_DRAG_ID":return{...e,dragId:t.payload};case"SET_DROP_TARGET":return{...e,dropId:t.payload.dropId,dropPosition:t.payload.dropPosition};case"CLEAR_DRAG_STATE":return{dragId:null,dropId:null,dropPosition:null};default:return e}}function Vn(e){const{dragConfig:t,data:n,onDataUpdate:r,onDrop:o,onExpandNode:s}=e,[i,d]=u.useReducer(Hn,{dragId:null,dropId:null,dropPosition:null}),h=u.useRef(null),c=u.useRef(null),f=u.useRef({id:null,position:null}),m=u.useCallback((S,l)=>{if(!t.enabled)return;S.dataTransfer.effectAllowed="move",d({type:"SET_DRAG_ID",payload:l}),h.current=l;const y=le(n,l);y.node&&t.onDragStart?.(y.node)},[t,n]),C=u.useCallback(()=>{c.current!==null&&(cancelAnimationFrame(c.current),c.current=null);const{dropId:S,dropPosition:l}=i;if(h.current&&S&&l){const y=le(n,h.current),v=le(n,S);if(y.node&&v.node){if(t.allowDrop&&!t.allowDrop(y.node,v.node,l)){d({type:"CLEAR_DRAG_STATE"}),h.current=null,f.current={id:null,position:null};return}const w=y.node,A=v.node,N=ie(n,B=>{const x=le(B,h.current);if(!x.node)return;const{parent:L,index:q,siblings:Z}=x,O=Z[q];L&&L.children?(L.children.splice(q,1),L.children.length===0&&delete L.children):Z.splice(q,1);const Q=le(B,S);if(!Q.node)return;const{node:z,parent:ae,index:ee,siblings:ne}=Q;if(l==="inside")z.children||(z.children=[]),z.children.push(O);else{const re=ae?.children||ne,Ae=l==="before"?ee:ee+1;re.splice(Ae,0,O)}});l==="inside"&&s?.(S),r(N),o?.({dragNode:w,dropNode:A,dropPosition:l}),t.onDragEnd?.(w)}}d({type:"CLEAR_DRAG_STATE"}),h.current=null,f.current={id:null,position:null}},[i,n,t,r,o,s]),E=u.useCallback((S,l)=>{if(S.preventDefault(),!t.enabled||h.current===l)return;const y=S.currentTarget.getBoundingClientRect(),v=S.clientY-y.top,w=y.height;let A;v<w*.25?A="before":v>w*.75?A="after":A="inside";const N=f.current;N.id===l&&N.position===A||(c.current!==null&&cancelAnimationFrame(c.current),c.current=requestAnimationFrame(()=>{f.current={id:l,position:A},d({type:"SET_DROP_TARGET",payload:{dropId:l,dropPosition:A}}),c.current=null}))},[t.enabled]),I=u.useCallback(()=>{c.current!==null&&(cancelAnimationFrame(c.current),c.current=null),f.current={id:null,position:null},d({type:"SET_DROP_TARGET",payload:{dropId:null,dropPosition:null}})},[]);return{dragState:i,handleDragStart:m,handleDragEnd:C,handleDragOver:E,handleDragLeave:I}}function Kn(e){const{flattenedData:t,scroll:n}=e,[r,o]=u.useState(0),s=n?.virtual&&n?.rowHeight,i=n?.rowHeight??40,d=n?.overscan??5,{visibleData:h,totalHeight:c,offsetY:f}=u.useMemo(()=>{if(!s)return{visibleData:t,totalHeight:0,offsetY:0};const m=n?.maxHeight??400,C=t.length*i,E=Math.max(0,Math.floor(r/i)-d),I=Math.min(t.length,Math.ceil((r+m)/i)+d);return{visibleData:t.slice(E,I),totalHeight:C,offsetY:E*i}},[s,t,r,i,d,n?.maxHeight]);return{virtualEnabled:!!s,rowHeight:i,overscan:d,scrollTop:r,setScrollTop:o,visibleData:h,totalHeight:c,offsetY:f}}function Un(e){const{columns:t,resizable:n,onColumnResize:r}=e,[o,s]=u.useState(()=>{const m={};return t.forEach(C=>{typeof C.width=="number"&&(m[C.key]=C.width)}),m}),i=u.useRef(null),d=u.useRef({handleMouseMove:null,handleMouseUp:null});u.useEffect(()=>()=>{const{handleMouseMove:m,handleMouseUp:C}=d.current;m&&document.removeEventListener("mousemove",m),C&&document.removeEventListener("mouseup",C),i.current&&(document.body.style.cursor="",document.body.style.userSelect="")},[]);const h=u.useCallback((m,C)=>{m.preventDefault(),m.stopPropagation();const{handleMouseMove:E,handleMouseUp:I}=d.current;E&&document.removeEventListener("mousemove",E),I&&document.removeEventListener("mouseup",I);const y=m.currentTarget.parentElement?.offsetWidth??100;i.current={key:C,startX:m.clientX,startWidth:y},s(A=>({...A,[C]:y}));const v=A=>{if(!i.current)return;const N=t.find(Z=>Z.key===i.current.key),B=N?.minWidth??50,x=N?.maxWidth??1/0,L=A.clientX-i.current.startX,q=Math.min(Math.max(i.current.startWidth+L,B),x);s(Z=>({...Z,[i.current.key]:q}))},w=()=>{if(i.current){const A=i.current.key,N=o[A]??i.current.startWidth;r?.(A,N)}i.current=null,document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",w),d.current={handleMouseMove:null,handleMouseUp:null},document.body.style.cursor="",document.body.style.userSelect=""};d.current={handleMouseMove:v,handleMouseUp:w},document.addEventListener("mousemove",v),document.addEventListener("mouseup",w),document.body.style.cursor="col-resize",document.body.style.userSelect="none"},[t,o,r]),c=u.useCallback(m=>{if(o[m.key]!==void 0)return o[m.key];if(typeof m.width=="number")return m.width},[o]),f=u.useCallback(m=>m.resizable!==void 0?m.resizable:n,[n]);return{columnWidths:o,handleResizeStart:h,getColumnWidth:c,isColumnResizable:f}}function Gn(e){const{scroll:t,virtualEnabled:n,setScrollTop:r}=e,o=u.useRef(null),s=u.useRef(null),i=u.useCallback(h=>{const c=h.currentTarget;if(n&&r&&r(c.scrollTop),s.current&&(s.current.scrollLeft=c.scrollLeft),t?.onScrollBottom){const f=t.scrollBottomThreshold??10;c.scrollHeight-c.scrollTop-c.clientHeight<=f&&t.onScrollBottom()}if(t?.onScrollRight){const f=t.scrollRightThreshold??10;c.scrollWidth-c.scrollLeft-c.clientWidth<=f&&t.onScrollRight()}},[t,n,r]),d=u.useCallback(h=>{const c=h.currentTarget;o.current&&(o.current.scrollLeft=c.scrollLeft)},[]);return{bodyRef:o,headerRef:s,handleBodyScroll:i,handleHeaderScroll:d}}const Qe=()=>{if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=Date.now().toString(36),t=Math.random().toString(36).substring(2,15),n=Math.random().toString(36).substring(2,15),r=(typeof performance<"u"&&performance.now?performance.now():0).toString(36).replace(".","");return`${e}-${t}-${n}-${r}`},He=e=>Array.isArray(e.children)&&e.children.length>0,ht=e=>He(e)?e.children:[],nn=(e,t,n=0,r=null,o=[],s=[],i=0)=>{const d=[];let h=i;return e.forEach((c,f)=>{const m=He(c),C=t.has(c.id),E=[...o,f+1],I=[...s];if(d.push({...c,depth:n,index:f,parentId:r,indexPath:E,isExpanded:C,hasChildren:m,_original:c,_lineInfo:I,_globalIndex:h}),h++,m&&C){const S=ht(c),l=f<e.length-1,y=[...I,l],v=nn(S,t,n+1,c.id,E,y,h);d.push(...v),h+=v.length}}),d},Ft=e=>{const t=[],n=r=>{r.forEach(o=>{t.push(o.id),He(o)&&n(ht(o))})};return n(e),t},K=(e,t,n=null)=>{for(let r=0;r<e.length;r++){if(e[r].id===t)return{node:e[r],parent:n,index:r,siblings:e};if(He(e[r])){const o=K(ht(e[r]),t,e[r]);if(o.node)return o}}return{node:null,parent:null,index:-1,siblings:[]}};function Xn(e,t){switch(t.type){case"SET_DATA":return{...e,data:t.payload};case"TOGGLE_EXPAND":{const n=new Set(e.expandedIds);return n.has(t.payload)?n.delete(t.payload):n.add(t.payload),{...e,expandedIds:n}}case"EXPAND_NODE":{if(e.expandedIds.has(t.payload))return e;const n=new Set(e.expandedIds);return n.add(t.payload),{...e,expandedIds:n}}case"COLLAPSE_NODE":{if(!e.expandedIds.has(t.payload))return e;const n=new Set(e.expandedIds);return n.delete(t.payload),{...e,expandedIds:n}}case"EXPAND_ALL":return{...e,expandedIds:new Set(t.payload)};case"COLLAPSE_ALL":return{...e,expandedIds:new Set};default:return e}}const Yn=_e.memo(function({column:t,node:n,value:r,onChange:o}){if(t.render)return a.jsx(a.Fragment,{children:t.render(r,n._original,o)});const s=r!=null&&typeof r=="object"&&"toString"in r||r!=null?String(r):"";return a.jsx("span",{className:"cell-text",children:s})}),Jn=_e.memo(function({node:t,style:n,showExpandButton:r,showDragHandle:o,showAddButton:s,showDeleteButton:i,dragEnabled:d,expandIcon:h,collapseIcon:c,addIcon:f,deleteIcon:m,dragHandleTitle:C,addChildTitle:E,deleteNodeTitle:I,customActions:S,onToggleExpand:l,onAddChild:y,onDelete:v,stickyClass:w=""}){const A=u.useCallback(()=>{l(t.id)},[t.id,l]),N=u.useCallback(()=>{y(t.id)},[t.id,y]),B=u.useCallback(()=>{v(t.id)},[t.id,v]);return a.jsxs("div",{className:`cell cell-actions ${w}`,style:n,children:[r&&(t.hasChildren?a.jsx("button",{className:"expand-btn",onClick:A,children:t.isExpanded?c??"▼":h??"▶"}):a.jsx("span",{className:"expand-placeholder"})),o&&d&&a.jsx("span",{className:"drag-handle",title:C,children:"⋮⋮"}),s&&a.jsx("button",{className:"action-btn add",onClick:N,title:E,children:f??"+"}),i&&a.jsx("button",{className:"action-btn delete",onClick:B,title:I,children:m??"🗑"}),S.map(x=>{const L=x.visible?x.visible(t._original):!0,q=x.disabled?x.disabled(t._original):!1;return L?a.jsx("button",{className:"action-btn custom",onClick:()=>x.onClick(t._original),disabled:q,title:x.title,children:x.icon},x.key):null})]})}),Qn=_e.memo(function({node:t,indentSize:n}){return t.depth===0?null:a.jsx(a.Fragment,{children:Array.from({length:t.depth}).map((r,o)=>a.jsx("span",{className:`tree-line tree-line-depth-${o}`,style:{left:o*n,width:n},children:o===t.depth-1?a.jsx("span",{className:"tree-line-corner"}):t._lineInfo[o]?a.jsx("span",{className:"tree-line-vertical"}):null},o))})}),er=_e.memo(function({column:t,node:n,value:r,isFirstColumn:o,indentSize:s,showTreeLine:i,onFieldChange:d}){const h=u.useCallback(f=>{d(n.id,t.key,f)},[n.id,t.key,d]),c=u.useMemo(()=>({width:n.depth*s}),[n.depth,s]);return a.jsxs(a.Fragment,{children:[o&&a.jsx("span",{className:"indent-space",style:c,children:i&&a.jsx(Qn,{node:n,indentSize:s})}),a.jsx(Yn,{column:t,node:n,value:r,onChange:h})]})}),Ht=_e.memo(function({node:t,index:n,columns:r,actionsPosition:o,showActions:s,dragEnabled:i,indentSize:d,showTreeLine:h,rowHeight:c,getRowClassName:f,getRowStyle:m,getColumnWidth:C,onDragStart:E,onDragEnd:I,onDragOver:S,onDragLeave:l,onFieldChange:y,renderActionsCell:v,stickyOffsets:w}){const A=u.useCallback(x=>{E(x,t.id)},[t.id,E]),N=u.useCallback(x=>{S(x,t.id)},[t.id,S]),B=u.useMemo(()=>{const x=m(t,n);return c!==void 0?{...x,height:c}:x},[t,n,c,m]);return a.jsxs("div",{className:f(t,n),style:B,draggable:i,onDragStart:A,onDragEnd:I,onDragOver:N,onDragLeave:l,children:[o==="start"&&s&&v(t),r.map((x,L)=>{const q=L===0,Z=C(x),O={};let Q="";x.sticky==="left"?(Q="cell-sticky-left",O.position="sticky",O.left=w.leftOffsets.get(x.key)??0,O.zIndex=2):x.sticky==="right"&&(Q="cell-sticky-right",O.position="sticky",O.right=w.rightOffsets.get(x.key)??0,O.zIndex=2);const z={width:Z,minWidth:x.minWidth,flex:Z!==void 0?void 0:x.flex,justifyContent:x.align==="center"?"center":x.align==="right"?"flex-end":"flex-start",...O},ae=t,ee=x.key in ae?ae[x.key]:void 0;return a.jsx("div",{className:`cell cell-${x.key} ${Q}`,style:z,children:a.jsx(er,{column:x,node:t,value:ee,isFirstColumn:q,indentSize:d,showTreeLine:h,onFieldChange:y})},x.key)}),o==="end"&&s&&v(t)]})});function tr(e,t){const{data:n,defaultExpandedKeys:r=[],defaultExpandAll:o=!1,columns:s,showActions:i=!0,actionsWidth:d=100,actionsPosition:h="start",showDragHandle:c=!0,showExpandButton:f=!0,showAddButton:m=!0,showDeleteButton:C=!0,customActions:E=[],expandIcon:I,collapseIcon:S,addIcon:l,deleteIcon:y,localeText:v,footer:w,onChange:A,onAdd:N,onDelete:B,onNodeChange:x,onExpand:L,onDrop:q,draggable:Z=!1,resizable:O=!1,onColumnResize:Q,scroll:z,className:ae="",style:ee,rowClassName:ne,rowStyle:re,headerClassName:Ae="",indentSize:mt=20,emptyText:rn="No data",showTreeLine:gt=!0,theme:Ee}=e,Ve=v??{},yt=Ve.dragHandleTitle??"Drag to sort",xt=Ve.addChildTitle??"Add child",bt=Ve.deleteNodeTitle??"Delete node",an=`tree-table-theme-${Ee?.mode??"light"}`,on=u.useMemo(()=>{if(!Ee?.cssVariables)return ee;const p=Object.entries(Ee.cssVariables).reduce((g,[b,T])=>(g[b.startsWith("--")?b:`--${b}`]=T,g),{});return{...ee,...p}},[Ee?.cssVariables,ee]),[k,G]=u.useReducer(Xn,{data:n,expandedIds:o?new Set(Ft(n)):new Set(r)}),M=u.useCallback(p=>{G({type:"SET_DATA",payload:p}),A?.(p)},[A]),ue=u.useMemo(()=>typeof Z=="boolean"?{enabled:Z}:{enabled:!0,...Z},[Z]),{dragState:vt,handleDragStart:wt,handleDragEnd:Tt,handleDragOver:Ct,handleDragLeave:kt}=Vn({dragConfig:ue,data:k.data,onDataUpdate:M,onDrop:q,onExpandNode:p=>G({type:"EXPAND_NODE",payload:p})}),{handleResizeStart:sn,getColumnWidth:oe,isColumnResizable:ln}=Un({columns:s,resizable:O??!1,onColumnResize:Q}),Re=u.useMemo(()=>{const p=new Map,g=new Map;let b=0,T=0;h==="start"&&i&&(b+=d),s.forEach(D=>{if(D.sticky==="left"){p.set(D.key,b);const _=oe(D)??D.minWidth??100;b+=_}});const R=[];h==="end"&&i&&(T=d);for(let D=s.length-1;D>=0;D--){const _=s[D];if(_.sticky==="right"){const V=oe(_)??_.minWidth??100;R.push({col:_,width:V})}}return R.forEach(({col:D,width:_})=>{g.set(D.key,T),T+=_}),{leftOffsets:p,rightOffsets:g}},[s,oe,d,h,i]);u.useEffect(()=>{G({type:"SET_DATA",payload:n})},[n]);const Ke=u.useMemo(()=>nn(k.data,k.expandedIds),[k.data,k.expandedIds]),{virtualEnabled:Dt,rowHeight:dn,setScrollTop:cn,visibleData:un,totalHeight:pn,offsetY:hn}=Kn({flattenedData:Ke,scroll:z}),{bodyRef:fn,headerRef:mn,handleBodyScroll:gn,handleHeaderScroll:yn}=Gn({scroll:z,virtualEnabled:Dt,setScrollTop:cn}),xn=u.useCallback(p=>{const g=N?.(null),b=g||{id:Qe(),name:"newField",...p};if(g!==void 0||!N){const T=[...k.data,b];M(T)}},[k.data,N,M]),bn=u.useCallback((p,g)=>{const b=N?.(null),T=b||{id:Qe(),name:"newField",...p};if(b!==void 0||!N){const R=ie(k.data,D=>{if(g){const{index:_,siblings:V}=K(D,g);V&&V.splice(_+1,0,T)}else D.push(T)});M(R)}},[k.data,N,M]),Ue=u.useCallback((p,g)=>{const b=N?.(p),T=b||{id:Qe(),name:"newField",...g};if(b!==void 0||!N){const R=ie(k.data,D=>{const _=K(D,p);_.node&&(_.node.children||(_.node.children=[]),_.node.children.push(T))});G({type:"EXPAND_NODE",payload:p}),M(R)}},[k.data,N,M]),Ge=u.useCallback(p=>{const g=K(k.data,p);if(!g.node||B?.(g.node)===!1)return;const T=ie(k.data,R=>{const D=K(R,p);if(!D.node)return;const{parent:_,index:V,siblings:Sn}=D;_&&_.children?(_.children.splice(V,1),_.children.length===0&&delete _.children):Sn.splice(V,1)});M(T)},[k.data,B,M]),vn=u.useCallback((p,g)=>{const b=ie(k.data,T=>{const{node:R}=K(T,p);R&&Object.assign(R,g)});M(b)},[k.data,M]),wn=u.useCallback(p=>K(k.data,p).node??void 0,[k.data]),_t=u.useCallback(p=>{const g=!k.expandedIds.has(p);G({type:"TOGGLE_EXPAND",payload:p});const b=K(k.data,p);b.node&&L?.(b.node,g)},[k.expandedIds,k.data,L]),Tn=u.useCallback(()=>{G({type:"EXPAND_ALL",payload:Ft(k.data)})},[k.data]),Cn=u.useCallback(()=>{G({type:"COLLAPSE_ALL"})},[]),kn=u.useCallback(p=>{G({type:"EXPAND_NODE",payload:p})},[]),Dn=u.useCallback(p=>{G({type:"COLLAPSE_NODE",payload:p})},[]),St=u.useCallback((p,g,b)=>{const T=ie(k.data,D=>{const _=K(D,p);if(_.node){const V=_.node;V[g]=b}}),R=K(T,p);R.node&&(M(T),x?.(R.node,g,b))},[k.data,M,x]);u.useImperativeHandle(t,()=>({getData:()=>k.data,setData:M,addRootNode:xn,addSiblingNode:bn,addChildNode:Ue,deleteNode:Ge,updateNode:vn,getNode:wn,expandAll:Tn,collapseAll:Cn,expandNode:kn,collapseNode:Dn}));const Nt=u.useCallback((p,g)=>{const b=["tree-table-row"],{dragId:T,dropId:R,dropPosition:D}=vt;return T===p.id&&b.push("dragging"),R===p.id&&(b.push("drop-target"),D&&b.push(`drop-${D}`)),typeof ne=="string"?b.push(ne):typeof ne=="function"&&b.push(ne(p._original,g)),b.join(" ")},[vt,ne]),At=u.useCallback((p,g)=>typeof re=="function"?re(p._original,g):re||{},[re]),Xe=u.useMemo(()=>({width:d,minWidth:d}),[d]),Et=u.useMemo(()=>E,[E]),Rt=()=>{const p={};let g="";return h==="start"?(g="cell-sticky-left",p.position="sticky",p.left=0,p.zIndex=2):h==="end"&&(g="cell-sticky-right",p.position="sticky",p.right=0,p.zIndex=2),a.jsx("div",{className:`cell cell-actions ${g}`,style:{...Xe,...p}})},jt=()=>a.jsxs(a.Fragment,{children:[h==="start"&&i&&Rt(),s.map(p=>{const g=oe(p),b=ln(p),T={};let R="";return p.sticky==="left"?(R="cell-sticky-left",T.position="sticky",T.left=Re.leftOffsets.get(p.key)??0,T.zIndex=2):p.sticky==="right"&&(R="cell-sticky-right",T.position="sticky",T.right=Re.rightOffsets.get(p.key)??0,T.zIndex=2),a.jsxs("div",{className:`cell cell-${p.key}${b?" resizable":""} ${R}`,style:{width:g,minWidth:p.minWidth,flex:g!==void 0?void 0:p.flex,justifyContent:p.align==="center"?"center":p.align==="right"?"flex-end":"flex-start",...T},children:[p.title,b&&a.jsx("div",{className:"column-resizer",onMouseDown:D=>sn(D,p.key)})]},p.key)}),h==="end"&&i&&Rt()]}),It=u.useCallback(p=>{const g={};let b="";return h==="start"?(b="cell-sticky-left",g.position="sticky",g.left=0,g.zIndex=2):h==="end"&&(b="cell-sticky-right",g.position="sticky",g.right=0,g.zIndex=2),a.jsx(Jn,{node:p,style:{...Xe,...g},showExpandButton:f,showDragHandle:c,showAddButton:m,showDeleteButton:C,dragEnabled:ue.enabled,expandIcon:I,collapseIcon:S,addIcon:l,deleteIcon:y,dragHandleTitle:yt,addChildTitle:xt,deleteNodeTitle:bt,customActions:Et,onToggleExpand:_t,onAddChild:Ue,onDelete:Ge,stickyClass:b})},[Xe,h,f,c,m,C,ue.enabled,I,S,l,y,Et,_t,Ue,Ge,yt,xt,bt]),zt=()=>a.jsx(a.Fragment,{children:Ke.length===0?a.jsx("div",{className:"tree-table-empty",children:rn}):Dt?a.jsx(a.Fragment,{children:a.jsx("div",{style:{height:pn,position:"relative"},children:a.jsx("div",{style:{transform:`translateY(${hn}px)`},children:un.map(p=>{const g=p._globalIndex??0;return a.jsx(Ht,{node:p,index:g,columns:s,actionsPosition:h,showActions:i,dragEnabled:ue.enabled,indentSize:mt,showTreeLine:gt,rowHeight:dn,getRowClassName:Nt,getRowStyle:At,getColumnWidth:oe,onDragStart:wt,onDragEnd:Tt,onDragOver:Ct,onDragLeave:kt,onFieldChange:St,renderActionsCell:It,stickyOffsets:Re},p.id)})})})}):Ke.map((p,g)=>a.jsx(Ht,{node:p,index:g,columns:s,actionsPosition:h,showActions:i,dragEnabled:ue.enabled,indentSize:mt,showTreeLine:gt,getRowClassName:Nt,getRowStyle:At,getColumnWidth:oe,onDragStart:wt,onDragEnd:Tt,onDragOver:Ct,onDragLeave:kt,onFieldChange:St,renderActionsCell:It,stickyOffsets:Re},p.id))}),Pt=!!z,Lt=z?{minWidth:z.minWidth,maxWidth:z.maxWidth}:{},_n=z?{minHeight:z.minHeight,maxHeight:z.maxHeight}:{};return a.jsx("div",{className:`tree-table-container ${an} ${ae}`,style:on,children:a.jsxs("div",{className:`tree-table${Pt?" tree-table-scrollable":""}`,children:[Pt?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tree-table-header-wrapper",ref:mn,onScroll:yn,children:a.jsx("div",{className:`tree-table-head ${Ae}`,style:Lt,children:jt()})}),a.jsx("div",{className:"tree-table-body-wrapper",ref:fn,style:_n,onScroll:gn,children:a.jsx("div",{className:"tree-table-body",style:Lt,children:zt()})})]}):a.jsx("div",{className:"tree-table-scroll-wrapper",children:a.jsxs("div",{className:"tree-table-content",children:[a.jsx("div",{className:`tree-table-head ${Ae}`,children:jt()}),a.jsx("div",{className:"tree-table-body",children:zt()})]})}),w&&a.jsx("div",{className:"tree-table-footer",children:w})]})})}const $=u.forwardRef(tr);$.__docgenInfo={description:"",methods:[{name:"getData",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TreeTable",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"树形数据"},defaultExpandedKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"默认展开的节点ID列表"},defaultExpandAll:{required:!1,tsType:{name:"boolean"},description:"默认全部展开"},columns:{required:!0,tsType:{name:"Array",elements:[{name:"ColumnDef",elements:[{name:"T"}],raw:"ColumnDef<T>"}],raw:"ColumnDef<T>[]"},description:"列定义"},showActions:{required:!1,tsType:{name:"boolean"},description:"是否显示操作列"},actionsWidth:{required:!1,tsType:{name:"number"},description:"操作列宽度"},actionsPosition:{required:!1,tsType:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}]},description:"操作列位置"},showDragHandle:{required:!1,tsType:{name:"boolean"},description:"显示拖拽手柄"},showExpandButton:{required:!1,tsType:{name:"boolean"},description:"显示展开按钮"},showAddButton:{required:!1,tsType:{name:"boolean"},description:"显示添加子节点按钮"},showDeleteButton:{required:!1,tsType:{name:"boolean"},description:"显示删除按钮"},customActions:{required:!1,tsType:{name:"Array",elements:[{name:"ActionButton",elements:[{name:"T"}],raw:"ActionButton<T>"}],raw:"ActionButton<T>[]"},description:"自定义操作按钮"},expandIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义展开图标"},collapseIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义收起图标"},addIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义添加子节点图标"},deleteIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义删除图标"},localeText:{required:!1,tsType:{name:"LocaleText"},description:"内置文案配置"},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义底部内容"},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: T[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"T"}],raw:"T[]"},name:"data"}],return:{name:"void"}}},description:"数据变化回调"},onAdd:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentId: string | null) => T | void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"parentId"}],return:{name:"union",raw:"T | void",elements:[{name:"T"},{name:"void"}]}}},description:"添加节点回调 - 返回新节点或自行处理"},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T) => boolean | void",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"union",raw:"boolean | void",elements:[{name:"boolean"},{name:"void"}]}}},description:"删除节点回调 - 返回 false 阻止删除"},onNodeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T, field: string, value: unknown) => void",signature:{arguments:[{type:{name:"T"},name:"node"},{type:{name:"string"},name:"field"},{type:{name:"unknown"},name:"value"}],return:{name:"void"}}},description:"节点字段变化回调"},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T, expanded: boolean) => void",signature:{arguments:[{type:{name:"T"},name:"node"},{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"展开/收起回调"},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:"(info: DropInfo<T>) => void",signature:{arguments:[{type:{name:"DropInfo",elements:[{name:"T"}],raw:"DropInfo<T>"},name:"info"}],return:{name:"void"}}},description:"拖拽完成回调"},draggable:{required:!1,tsType:{name:"union",raw:"boolean | DragConfig<T>",elements:[{name:"boolean"},{name:"DragConfig",elements:[{name:"T"}],raw:"DragConfig<T>"}]},description:"拖拽配置"},resizable:{required:!1,tsType:{name:"boolean"},description:"是否启用列宽调整（全局开关，默认 false）"},onColumnResize:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: string, width: number) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"number"},name:"width"}],return:{name:"void"}}},description:"列宽变化回调"},scroll:{required:!1,tsType:{name:"ScrollConfig"},description:"滚动配置，启用后表头固定，表体可滚动"},className:{required:!1,tsType:{name:"string"},description:"容器类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"容器样式"},rowClassName:{required:!1,tsType:{name:"union",raw:"string | ((node: T, index: number) => string)",elements:[{name:"string"},{name:"unknown"}]},description:"行类名"},rowStyle:{required:!1,tsType:{name:"union",raw:"React.CSSProperties | ((node: T, index: number) => React.CSSProperties)",elements:[{name:"ReactCSSProperties",raw:"React.CSSProperties"},{name:"unknown"}]},description:"行样式"},headerClassName:{required:!1,tsType:{name:"string"},description:"表头类名"},indentSize:{required:!1,tsType:{name:"number"},description:"缩进大小"},rowHeight:{required:!1,tsType:{name:"number"},description:"行高"},showTreeLine:{required:!1,tsType:{name:"boolean"},description:"是否显示树形层级竖线"},emptyText:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"空状态文案"},theme:{required:!1,tsType:{name:"ThemeConfig"},description:"主题配置"}}};const ft=[{label:"boolean",value:"boolean"},{label:"string",value:"string"},{label:"object",value:"object"},{label:"array[object]",value:"array[object]"},{label:"int64",value:"int64"},{label:"int32",value:"int32"},{label:"float",value:"float"},{label:"double",value:"double"}],j=e=>[{id:"1",name:"success",type:"boolean",required:!0,defaultValue:"true",description:e?"是否成功":"Whether the request succeeds"},{id:"2",name:"message",type:"string",required:!0,defaultValue:"ok",description:e?"错误或成功提示":"Error or success message"},{id:"3",name:"data",type:"object",required:!0,defaultValue:"",description:e?"数据对象":"Payload object",children:[{id:"3-1",name:"items",type:"array[object]",required:!0,defaultValue:"",description:e?"数据列表":"List of items",children:[{id:"3-1-1",name:"id",type:"int64",required:!0,defaultValue:"",description:e?"ID":"Item ID"},{id:"3-1-2",name:"name",type:"string",required:!0,defaultValue:"",description:e?"名称":"Item name"}]}]}],J=e=>[{key:"name",title:e?"名称":"Name",flex:2,minWidth:180,render:(t,n,r)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof t=="string"?t:"",placeholder:e?"请输入名称":"Enter name",onChange:o=>r(o.target.value)})},{key:"type",title:e?"类型":"Type",width:140,render:(t,n,r)=>a.jsx("select",{className:"tree-table-select",value:typeof t=="string"?t:"",onChange:o=>r(o.target.value),children:ft.map(o=>a.jsx("option",{value:o.value,children:o.label},o.value))})},{key:"required",title:e?"必填":"Required",width:80,align:"center",render:(t,n,r)=>a.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!t,onChange:o=>r(o.target.checked)})},{key:"defaultValue",title:e?"默认值":"Default",width:120,render:(t,n,r)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof t=="string"?t:"",placeholder:e?"默认值":"Default value",onChange:o=>r(o.target.value)})},{key:"description",title:e?"描述":"Description",flex:1.5,minWidth:180,render:(t,n,r)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof t=="string"?t:"",placeholder:e?"请输入描述":"Enter description",onChange:o=>r(o.target.value)})}],H=e=>e?{dragHandleTitle:"拖拽排序",addChildTitle:"添加子节点",deleteNodeTitle:"删除节点"}:{dragHandleTitle:"Drag to sort",addChildTitle:"Add child",deleteNodeTitle:"Delete node"},U=e=>({id:`node-${Date.now()}`,name:e?"新字段":"newField",type:"string",required:!1,defaultValue:"",description:e?"描述":""}),sr={title:"Components/TreeTable",component:$,parameters:{layout:"padded",docs:{description:{component:`
## Install

\`\`\`bash
pnpm add @kfb/tree-table
# or
npm install @kfb/tree-table
# or
yarn add @kfb/tree-table
\`\`\`

**Current Version: ${Nn.version}**

## Usage

\`\`\`tsx
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

interface MyNode extends TreeNode {
  // custom fields
}

const columns: ColumnDef<MyNode>[] = [
  // column config
];

<TreeTable data={data} columns={columns} />
\`\`\`

Looking for Chinese docs? See the repository README.zh.md files.
        `}}},tags:["autodocs"],argTypes:{data:{description:"Tree data source",control:"object"},columns:{description:"Column definitions",control:"object"},draggable:{description:"Enable drag-and-drop",control:"boolean"},resizable:{description:"Enable column resizing",control:"boolean"},showActions:{description:"Show action column",control:"boolean"},defaultExpandAll:{description:"Expand all by default",control:"boolean"},indentSize:{description:"Indent size (px)",control:{type:"number",min:0,max:50}}}},pe={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,o]=u.useState(()=>j(n)),s=J(n),i=H(n);return u.useEffect(()=>{o(j(n))},[n]),a.jsx($,{data:r,columns:s,localeText:i,onChange:o,onAdd:()=>U(n),showActions:!0,defaultExpandedKeys:["3","3-1"]})}},he={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,o]=u.useState(()=>j(n)),s=J(n),i=H(n);return u.useEffect(()=>{o(j(n))},[n]),a.jsx($,{data:r,columns:s,localeText:i,onChange:o,onAdd:()=>U(n),draggable:!0,showActions:!0,defaultExpandedKeys:["3","3-1"]})}},fe={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,o]=u.useState(()=>j(n)),s=J(n),i=H(n);return u.useEffect(()=>{o(j(n))},[n]),a.jsx($,{data:r,columns:s,localeText:i,onChange:o,onAdd:()=>U(n),resizable:!0,showActions:!0,defaultExpandedKeys:["3","3-1"]})}},me={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,o]=u.useState(()=>j(n)),s=J(n),i=H(n);return u.useEffect(()=>{o(j(n))},[n]),a.jsx($,{data:r,columns:s,localeText:i,onChange:o,onAdd:()=>U(n),showActions:!0,defaultExpandedKeys:["3","3-1"],scroll:{maxHeight:300,minWidth:900}})}},ge={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,o]=u.useState(()=>j(n)),s=J(n),i=H(n);return u.useEffect(()=>{o(j(n))},[n]),a.jsx($,{data:r,columns:s,localeText:i,onChange:o,onAdd:()=>U(n),showActions:!0,defaultExpandedKeys:["3","3-1"],expandIcon:"➕",collapseIcon:"➖",addIcon:"✨",deleteIcon:"❌"})}},ye={render:(e,{globals:t})=>{const n=t.locale==="zh",r=J(n),o=H(n),s=()=>{const h=[];for(let c=0;c<100;c++){const f={id:`node-${c}`,name:`field_${c}`,type:c%2===0?"string":"object",required:c%3===0,defaultValue:`value_${c}`,description:n?`第 ${c} 个字段的描述`:`Description for field ${c}`};if(c%5===0&&c<50){f.children=[];for(let m=0;m<10;m++)f.children.push({id:`node-${c}-${m}`,name:`child_${c}_${m}`,type:"string",required:!1,defaultValue:"",description:n?`子字段 ${m}`:`Child field ${m}`})}h.push(f)}return h},[i,d]=u.useState(s);return u.useEffect(()=>{d(s())},[n]),a.jsxs("div",{children:[a.jsxs("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px"},children:[a.jsx("strong",{children:n?"提示：":"Tip:"}),n?"虚拟滚动只渲染可见行以提升性能。":"Virtual scroll only renders visible rows to improve performance.",n?" 当前根节点数：":" Current root nodes: ",i.length]}),a.jsx($,{data:i,columns:r,localeText:o,onChange:d,onAdd:()=>U(n),showActions:!0,defaultExpandAll:!0,scroll:{maxHeight:500,minWidth:900,virtual:!0,rowHeight:40,overscan:5}})]})}},xe={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,o]=u.useState(()=>j(n)),[s,i]=u.useState(!0),d=J(n),h=H(n);return u.useEffect(()=>{o(j(n))},[n]),a.jsxs("div",{children:[a.jsx("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px",display:"flex",alignItems:"center",gap:"8px"},children:a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:s,onChange:c=>i(c.target.checked)}),a.jsx("span",{style:{marginLeft:"4px"},children:n?"显示层级竖线":"Show tree guide lines"})]})}),a.jsx($,{data:r,columns:d,localeText:h,onChange:o,onAdd:()=>U(n),showActions:!0,showTreeLine:s,defaultExpandedKeys:["3","3-1"]})]})}},be={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,o]=u.useState(()=>j(n)),s=H(n);u.useEffect(()=>{o(j(n))},[n]);const i=[{key:"name",title:n?"名称":"Name",width:180,sticky:"left",render:(d,h,c)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof d=="string"?d:"",placeholder:n?"请输入名称":"Enter name",onChange:f=>c(f.target.value)})},{key:"type",title:n?"类型":"Type",width:140,render:(d,h,c)=>a.jsx("select",{className:"tree-table-select",value:typeof d=="string"?d:"",onChange:f=>c(f.target.value),children:ft.map(f=>a.jsx("option",{value:f.value,children:f.label},f.value))})},{key:"required",title:n?"必填":"Required",width:80,align:"center",render:(d,h,c)=>a.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!d,onChange:f=>c(f.target.checked)})},{key:"defaultValue",title:n?"默认值":"Default",width:120,render:(d,h,c)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof d=="string"?d:"",placeholder:n?"默认值":"Default value",onChange:f=>c(f.target.value)})},{key:"description",title:n?"描述":"Description",width:200,sticky:"right",render:(d,h,c)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof d=="string"?d:"",placeholder:n?"请输入描述":"Enter description",onChange:f=>c(f.target.value)})}];return a.jsxs("div",{children:[a.jsxs("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px"},children:[a.jsx("strong",{children:n?"提示：":"Tip:"})," ",n?"名称列左侧固定，描述列右侧固定，操作列保持可见。横向滚动查看效果。":"Name column is pinned left, description pinned right, and the action column stays visible. Scroll horizontally to see the effect."]}),a.jsx("div",{style:{width:"600px",border:"2px solid #1890ff",overflow:"auto"},children:a.jsx($,{data:r,columns:i,localeText:s,onChange:o,onAdd:()=>U(n),showActions:!0,actionsPosition:"start",defaultExpandedKeys:["3","3-1"],scroll:{maxHeight:400,minWidth:900}})})]})}},ve={render:(e,{globals:t})=>{const n=t.locale==="zh",r=(m,C)=>n?m:C,[o,s]=u.useState(()=>j(n)),[i,d]=u.useState("light"),h=J(n),c=H(n);u.useEffect(()=>{s(j(n))},[n]);const f={mode:i};return a.jsxs("div",{children:[a.jsxs("div",{style:{marginBottom:"16px",padding:"16px",background:i==="dark"?"#2a2a2a":"#f0f0f0",color:i==="dark"?"#e8e8e8":"#333",borderRadius:"8px",display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[a.jsx("strong",{children:r("选择主题：","Select Theme:")}),a.jsxs("button",{onClick:()=>d("light"),style:{padding:"8px 16px",borderRadius:"4px",border:i==="light"?"2px solid #1890ff":"1px solid #ccc",background:i==="light"?"#e6f7ff":"#fff",cursor:"pointer",fontWeight:i==="light"?"bold":"normal"},children:["☀️ ",r("明亮模式","Light")]}),a.jsxs("button",{onClick:()=>d("dark"),style:{padding:"8px 16px",borderRadius:"4px",border:i==="dark"?"2px solid #1890ff":"1px solid #ccc",background:i==="dark"?"#003a5f":"#fff",color:i==="dark"?"#fff":"#333",cursor:"pointer",fontWeight:i==="dark"?"bold":"normal"},children:["🌙 ",r("深色模式","Dark")]}),a.jsxs("button",{onClick:()=>d("auto"),style:{padding:"8px 16px",borderRadius:"4px",border:i==="auto"?"2px solid #1890ff":"1px solid #ccc",background:i==="auto"?"#e6f7ff":"#fff",cursor:"pointer",fontWeight:i==="auto"?"bold":"normal"},children:["🔄 ",r("跟随系统","Auto")]})]}),a.jsxs("div",{style:{marginBottom:"16px",padding:"12px",background:i==="dark"?"#2a2a2a":"#e6f7ff",color:i==="dark"?"#e8e8e8":"#333",borderRadius:"8px",border:i==="dark"?"1px solid #3a3a3a":"1px solid #91d5ff"},children:[a.jsx("strong",{children:r("💡 提示：","💡 Tips:")}),a.jsxs("ul",{style:{margin:"8px 0 0",paddingLeft:"20px"},children:[a.jsx("li",{children:r("明亮模式：适合白天或光线充足的环境","Light mode: Best for daytime or bright environments")}),a.jsx("li",{children:r("深色模式：适合夜间或暗光环境，减少眼睛疲劳","Dark mode: Best for nighttime or dim lighting, reduces eye strain")}),a.jsx("li",{children:r("跟随系统：自动根据操作系统主题设置切换","Auto mode: Automatically switches based on your system theme")})]})]}),a.jsx($,{data:o,columns:h,localeText:c,onChange:s,onAdd:()=>U(n),showActions:!0,defaultExpandedKeys:["3","3-1"],theme:f})]})}},we={render:(e,{globals:t})=>{const n=t.locale==="zh",r=(c,f)=>n?c:f,[o,s]=u.useState(()=>j(n)),i=J(n),d=H(n);u.useEffect(()=>{s(j(n))},[n]);const h={mode:"dark",cssVariables:{"--tree-table-primary-color":"#7c3aed","--tree-table-primary-hover":"#8b5cf6","--tree-table-primary-shadow":"rgba(124, 58, 237, 0.2)","--tree-table-accent-color":"#f59e0b","--tree-table-accent-hover":"#fbbf24","--tree-table-bg-container":"#0f0f0f","--tree-table-bg-header":"#1a1a1a","--tree-table-bg-body":"#0f0f0f","--tree-table-bg-hover":"#252525","--tree-table-text-primary":"#ffffff","--tree-table-text-secondary":"#d1d5db"}};return a.jsxs("div",{children:[a.jsxs("div",{style:{marginBottom:"16px",padding:"16px",background:"#1a1a1a",color:"#e8e8e8",borderRadius:"8px",border:"1px solid #7c3aed"},children:[a.jsx("strong",{children:r("🎨 自定义品牌主题示例","🎨 Custom Brand Theme Example")}),a.jsx("p",{style:{margin:"8px 0 0",lineHeight:"1.6"},children:r("本示例展示了如何使用自定义 CSS 变量来定制表格主题，使用紫色作为主色调，橙色作为强调色。","This example shows how to customize the table theme using CSS variables, with purple as the primary color and orange as the accent color.")})]}),a.jsx($,{data:o,columns:i,localeText:d,onChange:s,onAdd:()=>U(n),showActions:!0,defaultExpandedKeys:["3","3-1"],theme:h})]})}},Te={render:(e,{globals:t})=>{const n=t.locale==="zh",r=(l,y)=>n?l:y,[o,s]=u.useState(()=>j(n)),i=u.useRef(null),[d,h]=u.useState(!0),[c,f]=u.useState("start"),[m,C]=u.useState(20),E=H(n);u.useEffect(()=>{s(j(n))},[n]);const I=()=>({id:`node-${Date.now()}`,name:r("新字段","newField"),type:"string",required:!0,defaultValue:"",description:r("新增字段","New field")}),S=[{key:"name",title:r("名称","Name"),width:180,minWidth:120,maxWidth:300,sticky:"left",resizable:!0,render:(l,y,v)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof l=="string"?l:"",placeholder:r("请输入名称","Enter name"),onChange:w=>v(w.target.value)})},{key:"type",title:r("类型","Type"),width:140,minWidth:100,resizable:!0,render:(l,y,v)=>a.jsx("select",{className:"tree-table-select",value:typeof l=="string"?l:"",onChange:w=>v(w.target.value),children:ft.map(w=>a.jsx("option",{value:w.value,children:w.label},w.value))})},{key:"required",title:r("必填","Required"),width:80,align:"center",render:(l,y,v)=>a.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!l,onChange:w=>v(w.target.checked)})},{key:"defaultValue",title:r("默认值","Default"),width:150,minWidth:100,resizable:!0,render:(l,y,v)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof l=="string"?l:"",placeholder:r("默认值","Default value"),onChange:w=>v(w.target.value)})},{key:"description",title:r("描述","Description"),width:200,minWidth:150,sticky:"right",resizable:!0,render:(l,y,v)=>a.jsx("input",{type:"text",className:"tree-table-input",value:typeof l=="string"?l:"",placeholder:r("请输入描述","Enter description"),onChange:w=>v(w.target.value)})}];return a.jsxs("div",{style:{padding:"20px"},children:[a.jsxs("div",{style:{marginBottom:"16px",padding:"16px",background:"#f5f5f5",borderRadius:"8px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"12px"},children:[a.jsx("div",{children:a.jsxs("strong",{style:{display:"block",marginBottom:"8px"},children:["🎛️ ",r("控制面板","Controls")]})}),a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:a.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[a.jsx("input",{type:"checkbox",checked:d,onChange:l=>h(l.target.checked)}),r("显示层级线","Show tree lines")]})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[a.jsx("label",{children:r("操作列位置：","Actions column position:")}),a.jsxs("select",{value:c,onChange:l=>f(l.target.value),style:{padding:"4px 8px"},children:[a.jsx("option",{value:"start",children:r("左侧","Left")}),a.jsx("option",{value:"end",children:r("右侧","Right")})]})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[a.jsx("label",{children:r("缩进大小：","Indent size:")}),a.jsx("input",{type:"range",min:"10",max:"40",value:m,onChange:l=>C(Number(l.target.value)),style:{width:"100px"}}),a.jsxs("span",{children:[m,"px"]})]})]}),a.jsxs("div",{style:{marginBottom:"16px",padding:"16px",background:"#e6f7ff",borderRadius:"8px",border:"1px solid #91d5ff"},children:[a.jsx("strong",{style:{display:"block",marginBottom:"8px"},children:r("✨ 本示例包含的所有功能：","✨ Features included in this demo:")}),a.jsxs("ul",{style:{margin:0,paddingLeft:"20px",lineHeight:"1.8"},children:[a.jsxs("li",{children:[a.jsx("strong",{children:r("数据管理：","Data management:")})," ",r("支持添加、删除、编辑节点","add, delete, and edit nodes")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("拖拽排序：","Drag-and-drop:")})," ",r("拖动行可调整顺序和层级关系","reorder rows and levels")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("列宽调整：","Resizable columns:")})," ",r("拖动列边框可调整列宽","drag borders to resize")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("列固定：","Sticky columns:")})," ",r("名称列左侧固定，描述列右侧固定","name pinned left, description pinned right")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("虚拟滚动：","Virtual scroll:")})," ",r("表头固定，表体可滚动（横向和纵向）","sticky header with horizontal/vertical scrolling")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("树形层级：","Tree lines:")})," ",r("支持多层嵌套，显示层级线条","multi-level nesting with guide lines")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("自定义渲染：","Custom render:")})," ",r("每列都可自定义渲染组件","every column supports custom components")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("自定义操作：","Custom actions:")})," ",r("支持自定义操作按钮","add your own action buttons")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("自定义图标：","Custom icons:")})," ",r("展开/收起、添加、删除图标可自定义","expand/collapse/add/delete icons configurable")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("样式定制：","Styling:")})," ",r("支持自定义类名、样式、行样式等","custom class names, styles, and row styles")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("事件回调：","Callbacks:")})," ",r("完整的生命周期回调","full lifecycle callbacks")]}),a.jsxs("li",{children:[a.jsx("strong",{children:r("Ref 方法：","Ref methods:")})," ",r("通过 ref 调用组件方法","call component methods via ref")]})]})]}),a.jsx("div",{style:{border:"2px solid #1890ff",borderRadius:"8px",overflow:"hidden"},children:a.jsx($,{ref:i,data:o,defaultExpandedKeys:["3","3-1"],columns:S,showActions:!0,actionsWidth:120,actionsPosition:c,showDragHandle:!0,showExpandButton:!0,showAddButton:!0,showDeleteButton:!0,customActions:[{key:"copy",icon:"📋",title:r("复制节点","Copy node"),onClick:l=>{const y={...l,id:`node-${Date.now()}`,name:`${l.name}_copy`};i.current?.addSiblingNode(y,l.id)},visible:()=>!0},{key:"info",icon:"ℹ️",title:r("查看详情","View details"),onClick:l=>{alert(r(`节点信息：
ID: ${l.id}
名称: ${l.name}
类型: ${l.type}`,`Node info:
ID: ${l.id}
Name: ${l.name}
Type: ${l.type}`))}}],expandIcon:"➕",collapseIcon:"➖",addIcon:"✨",deleteIcon:"🗑️",localeText:E,footer:a.jsxs("div",{style:{display:"flex",gap:"8px",padding:"12px",background:"#fafafa",borderTop:"1px solid #d9d9d9"},children:[a.jsx("button",{onClick:()=>i.current?.addRootNode(I()),style:{padding:"6px 12px",cursor:"pointer"},children:r("➕ 添加根节点","➕ Add root")}),a.jsx("button",{onClick:()=>i.current?.expandAll(),style:{padding:"6px 12px",cursor:"pointer"},children:r("📂 展开全部","📂 Expand all")}),a.jsx("button",{onClick:()=>i.current?.collapseAll(),style:{padding:"6px 12px",cursor:"pointer"},children:r("📁 收起全部","📁 Collapse all")}),a.jsx("button",{onClick:()=>{const l=i.current?.getData();console.log("Current data:",l),alert(r(`数据已输出到控制台，共 ${l?.length} 个根节点`,`Data printed to console, ${l?.length} root nodes`))},style:{padding:"6px 12px",cursor:"pointer"},children:r("📊 导出数据","📊 Export data")})]}),onChange:l=>{console.log("Data changed:",l),s(l)},onAdd:l=>(console.log("Add node, parent ID:",l),I()),onDelete:l=>(console.log("Delete node:",l),window.confirm(r(`确定要删除节点 "${l.name}" 吗？`,`Delete node "${l.name}"?`))),onNodeChange:(l,y,v)=>{console.log("Node field changed:",{node:l,field:y,value:v})},onExpand:(l,y)=>{console.log(`Node ${y?"expanded":"collapsed"}:`,l)},onDrop:l=>{console.log("Drag finished:",l)},draggable:{enabled:!0,allowDrop:(l,y,v)=>(console.log("Drag check:",{dragNode:l,dropNode:y,position:v}),!0),onDragStart:l=>{console.log("Drag start:",l)},onDragEnd:l=>{console.log("Drag end:",l)}},resizable:!0,onColumnResize:(l,y)=>{console.log("Column resized:",{key:l,width:y})},scroll:{maxHeight:500,minHeight:300,minWidth:1e3,virtual:!1,onScrollBottom:()=>{console.log("Reached bottom")},scrollBottomThreshold:50,onScrollRight:()=>{console.log("Reached right edge")},scrollRightThreshold:50},className:"full-feature-table",style:{fontSize:"14px"},rowClassName:(l,y)=>y%2===0?"even-row":"odd-row",rowStyle:(l,y)=>({fontWeight:l.depth===0?"bold":"normal"}),headerClassName:"custom-header",indentSize:m,showTreeLine:d,emptyText:a.jsxs("div",{style:{padding:"40px",textAlign:"center",color:"#999"},children:[a.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"📭"}),a.jsx("div",{children:r("暂无数据，使用下方按钮添加行","No data yet, use the buttons below to add rows")})]})})}),a.jsxs("div",{style:{marginTop:"16px",padding:"16px",background:"#f5f5f5",borderRadius:"8px",maxHeight:"200px",overflow:"auto"},children:[a.jsx("strong",{style:{display:"block",marginBottom:"8px"},children:r("📝 当前数据（JSON）：","📝 Current data (JSON):")}),a.jsx("pre",{style:{margin:0,fontSize:"12px",lineHeight:"1.5",whiteSpace:"pre-wrap",wordBreak:"break-all"},children:JSON.stringify(o,null,2)})]})]})}};pe.parameters={...pe.parameters,docs:{...pe.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);
    return <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} showActions defaultExpandedKeys={['3', '3-1']} />;
  }
}`,...pe.parameters?.docs?.source},description:{story:"Basic usage - showcase the core features",...pe.parameters?.docs?.description}}};he.parameters={...he.parameters,docs:{...he.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);
    return <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} draggable showActions defaultExpandedKeys={['3', '3-1']} />;
  }
}`,...he.parameters?.docs?.source},description:{story:"Drag-and-drop sorting - reorder rows and levels",...he.parameters?.docs?.description}}};fe.parameters={...fe.parameters,docs:{...fe.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);
    return <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} resizable showActions defaultExpandedKeys={['3', '3-1']} />;
  }
}`,...fe.parameters?.docs?.source},description:{story:"Column resizing - drag column borders to resize",...fe.parameters?.docs?.description}}};me.parameters={...me.parameters,docs:{...me.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);
    return <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} showActions defaultExpandedKeys={['3', '3-1']} scroll={{
      maxHeight: 300,
      minWidth: 900
    }} />;
  }
}`,...me.parameters?.docs?.source},description:{story:"Scroll configuration - sticky header with scrollable body",...me.parameters?.docs?.description}}};ge.parameters={...ge.parameters,docs:{...ge.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);
    return <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} showActions defaultExpandedKeys={['3', '3-1']} expandIcon="➕" collapseIcon="➖" addIcon="✨" deleteIcon="❌" />;
  }
}`,...ge.parameters?.docs?.source},description:{story:"Custom icons - override expand/collapse/add/delete icons",...ge.parameters?.docs?.description}}};ye.parameters={...ye.parameters,docs:{...ye.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    const generateLargeData = (): ApiParamNode[] => {
      const data: ApiParamNode[] = [];
      for (let i = 0; i < 100; i++) {
        const node: ApiParamNode = {
          id: \`node-\${i}\`,
          name: \`field_\${i}\`,
          type: i % 2 === 0 ? 'string' : 'object',
          required: i % 3 === 0,
          defaultValue: \`value_\${i}\`,
          description: isZh ? \`第 \${i} 个字段的描述\` : \`Description for field \${i}\`
        };

        // Add children for some nodes
        if (i % 5 === 0 && i < 50) {
          node.children = [];
          for (let j = 0; j < 10; j++) {
            node.children.push({
              id: \`node-\${i}-\${j}\`,
              name: \`child_\${i}_\${j}\`,
              type: 'string',
              required: false,
              defaultValue: '',
              description: isZh ? \`子字段 \${j}\` : \`Child field \${j}\`
            });
          }
        }
        data.push(node);
      }
      return data;
    };
    const [data, setData] = useState<ApiParamNode[]>(generateLargeData);
    useEffect(() => {
      setData(generateLargeData());
    }, [isZh]);
    return <div>
        <div style={{
        marginBottom: '12px',
        padding: '8px',
        background: '#f0f0f0',
        borderRadius: '4px'
      }}>
          <strong>{isZh ? '提示：' : 'Tip:'}</strong>
          {isZh ? '虚拟滚动只渲染可见行以提升性能。' : 'Virtual scroll only renders visible rows to improve performance.'}
          {isZh ? ' 当前根节点数：' : ' Current root nodes: '}
          {data.length}
        </div>
        <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} showActions defaultExpandAll scroll={{
        maxHeight: 500,
        minWidth: 900,
        virtual: true,
        rowHeight: 40,
        overscan: 5
      }} />
      </div>;
  }
}`,...ye.parameters?.docs?.source},description:{story:"Virtual scroll - performance for large datasets",...ye.parameters?.docs?.description}}};xe.parameters={...xe.parameters,docs:{...xe.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const [showTreeLine, setShowTreeLine] = useState(true);
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);
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
          }}>{isZh ? '显示层级竖线' : 'Show tree guide lines'}</span>
          </label>
        </div>
        <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} showActions showTreeLine={showTreeLine} defaultExpandedKeys={['3', '3-1']} />
      </div>;
  }
}`,...xe.parameters?.docs?.source},description:{story:"Tree lines - visualize hierarchy connectors",...xe.parameters?.docs?.description}}};be.parameters={...be.parameters,docs:{...be.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    // Configure sticky columns
    const stickyColumns: ColumnDef<ApiParamNode>[] = [{
      key: 'name',
      title: isZh ? '名称' : 'Name',
      width: 180,
      sticky: 'left',
      // pin left
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder={isZh ? '请输入名称' : 'Enter name'} onChange={e => onChange(e.target.value)} />
    }, {
      key: 'type',
      title: isZh ? '类型' : 'Type',
      width: 140,
      render: (value, _node, onChange) => <select className="tree-table-select" value={typeof value === 'string' ? value : ''} onChange={e => onChange(e.target.value)}>
            {TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>)}
          </select>
    }, {
      key: 'required',
      title: isZh ? '必填' : 'Required',
      width: 80,
      align: 'center',
      render: (value, _node, onChange) => <input type="checkbox" className="tree-table-checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} />
    }, {
      key: 'defaultValue',
      title: isZh ? '默认值' : 'Default',
      width: 120,
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder={isZh ? '默认值' : 'Default value'} onChange={e => onChange(e.target.value)} />
    }, {
      key: 'description',
      title: isZh ? '描述' : 'Description',
      width: 200,
      sticky: 'right',
      // pin right
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder={isZh ? '请输入描述' : 'Enter description'} onChange={e => onChange(e.target.value)} />
    }];
    return <div>
        <div style={{
        marginBottom: '12px',
        padding: '8px',
        background: '#f0f0f0',
        borderRadius: '4px'
      }}>
          <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
          {isZh ? '名称列左侧固定，描述列右侧固定，操作列保持可见。横向滚动查看效果。' : 'Name column is pinned left, description pinned right, and the action column stays visible. Scroll horizontally to see the effect.'}
        </div>
        <div style={{
        width: '600px',
        border: '2px solid #1890ff',
        overflow: 'auto'
      }}>
          <TreeTable<ApiParamNode> data={data} columns={stickyColumns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} showActions actionsPosition="start" defaultExpandedKeys={['3', '3-1']} scroll={{
          maxHeight: 400,
          minWidth: 900
        }} />
        </div>
      </div>;
  }
}`,...be.parameters?.docs?.source},description:{story:"Sticky columns - keep columns visible while scrolling",...be.parameters?.docs?.description}}};ve.parameters={...ve.parameters,docs:{...ve.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const tr = <T extends string,>(zh: T, en: T): T => isZh ? zh : en;
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('light');
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);
    const theme: ThemeConfig = {
      mode: themeMode
    };
    return <div>
        {/* Theme switcher */}
        <div style={{
        marginBottom: '16px',
        padding: '16px',
        background: themeMode === 'dark' ? '#2a2a2a' : '#f0f0f0',
        color: themeMode === 'dark' ? '#e8e8e8' : '#333',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
          <strong>{tr('选择主题：', 'Select Theme:')}</strong>
          <button onClick={() => setThemeMode('light')} style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: themeMode === 'light' ? '2px solid #1890ff' : '1px solid #ccc',
          background: themeMode === 'light' ? '#e6f7ff' : '#fff',
          cursor: 'pointer',
          fontWeight: themeMode === 'light' ? 'bold' : 'normal'
        }}>
            ☀️ {tr('明亮模式', 'Light')}
          </button>
          <button onClick={() => setThemeMode('dark')} style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: themeMode === 'dark' ? '2px solid #1890ff' : '1px solid #ccc',
          background: themeMode === 'dark' ? '#003a5f' : '#fff',
          color: themeMode === 'dark' ? '#fff' : '#333',
          cursor: 'pointer',
          fontWeight: themeMode === 'dark' ? 'bold' : 'normal'
        }}>
            🌙 {tr('深色模式', 'Dark')}
          </button>
          <button onClick={() => setThemeMode('auto')} style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: themeMode === 'auto' ? '2px solid #1890ff' : '1px solid #ccc',
          background: themeMode === 'auto' ? '#e6f7ff' : '#fff',
          cursor: 'pointer',
          fontWeight: themeMode === 'auto' ? 'bold' : 'normal'
        }}>
            🔄 {tr('跟随系统', 'Auto')}
          </button>
        </div>

        {/* Info panel */}
        <div style={{
        marginBottom: '16px',
        padding: '12px',
        background: themeMode === 'dark' ? '#2a2a2a' : '#e6f7ff',
        color: themeMode === 'dark' ? '#e8e8e8' : '#333',
        borderRadius: '8px',
        border: themeMode === 'dark' ? '1px solid #3a3a3a' : '1px solid #91d5ff'
      }}>
          <strong>{tr('💡 提示：', '💡 Tips:')}</strong>
          <ul style={{
          margin: '8px 0 0',
          paddingLeft: '20px'
        }}>
            <li>{tr('明亮模式：适合白天或光线充足的环境', 'Light mode: Best for daytime or bright environments')}</li>
            <li>{tr('深色模式：适合夜间或暗光环境，减少眼睛疲劳', 'Dark mode: Best for nighttime or dim lighting, reduces eye strain')}</li>
            <li>{tr('跟随系统：自动根据操作系统主题设置切换', 'Auto mode: Automatically switches based on your system theme')}</li>
          </ul>
        </div>

        <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} showActions defaultExpandedKeys={['3', '3-1']} theme={theme} />
      </div>;
  }
}`,...ve.parameters?.docs?.source},description:{story:"Theme switching - light/dark/auto modes",...ve.parameters?.docs?.description}}};we.parameters={...we.parameters,docs:{...we.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const tr = <T extends string,>(zh: T, en: T): T => isZh ? zh : en;
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    // Custom brand theme
    const brandTheme: ThemeConfig = {
      mode: 'dark',
      cssVariables: {
        // Brand colors
        '--tree-table-primary-color': '#7c3aed',
        '--tree-table-primary-hover': '#8b5cf6',
        '--tree-table-primary-shadow': 'rgba(124, 58, 237, 0.2)',
        '--tree-table-accent-color': '#f59e0b',
        '--tree-table-accent-hover': '#fbbf24',
        // Deeper background
        '--tree-table-bg-container': '#0f0f0f',
        '--tree-table-bg-header': '#1a1a1a',
        '--tree-table-bg-body': '#0f0f0f',
        '--tree-table-bg-hover': '#252525',
        // High contrast text
        '--tree-table-text-primary': '#ffffff',
        '--tree-table-text-secondary': '#d1d5db'
      }
    };
    return <div>
        <div style={{
        marginBottom: '16px',
        padding: '16px',
        background: '#1a1a1a',
        color: '#e8e8e8',
        borderRadius: '8px',
        border: '1px solid #7c3aed'
      }}>
          <strong>{tr('🎨 自定义品牌主题示例', '🎨 Custom Brand Theme Example')}</strong>
          <p style={{
          margin: '8px 0 0',
          lineHeight: '1.6'
        }}>
            {tr('本示例展示了如何使用自定义 CSS 变量来定制表格主题，使用紫色作为主色调，橙色作为强调色。', 'This example shows how to customize the table theme using CSS variables, with purple as the primary color and orange as the accent color.')}
          </p>
        </div>

        <TreeTable<ApiParamNode> data={data} columns={columns} localeText={localeText} onChange={setData} onAdd={() => createNewNode(isZh)} showActions defaultExpandedKeys={['3', '3-1']} theme={brandTheme} />
      </div>;
  }
}`,...we.parameters?.docs?.source},description:{story:"Custom theme colors - brand colors example",...we.parameters?.docs?.description}}};Te.parameters={...Te.parameters,docs:{...Te.parameters?.docs,source:{originalSource:`{
  render: (_args, {
    globals
  }) => {
    const isZh = globals.locale === 'zh';
    const tr = <T extends string,>(zh: T, en: T): T => isZh ? zh : en;
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const tableRef = useRef<TreeTableRef<ApiParamNode>>(null);
    const [showTreeLine, setShowTreeLine] = useState(true);
    const [actionsPosition, setActionsPosition] = useState<'start' | 'end'>('start');
    const [indentSize, setIndentSize] = useState(20);
    const localeText = getLocaleText(isZh);
    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);
    const createNewNode = (): ApiParamNode => ({
      id: \`node-\${Date.now()}\`,
      name: tr('新字段', 'newField'),
      type: 'string',
      required: true,
      defaultValue: '',
      description: tr('新增字段', 'New field')
    });

    // Configure sticky and resizable columns
    const fullFeatureColumns: ColumnDef<ApiParamNode>[] = [{
      key: 'name',
      title: tr('名称', 'Name'),
      width: 180,
      minWidth: 120,
      maxWidth: 300,
      sticky: 'left',
      // pin left
      resizable: true,
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder={tr('请输入名称', 'Enter name')} onChange={e => onChange(e.target.value)} />
    }, {
      key: 'type',
      title: tr('类型', 'Type'),
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
      title: tr('必填', 'Required'),
      width: 80,
      align: 'center',
      render: (value, _node, onChange) => <input type="checkbox" className="tree-table-checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} />
    }, {
      key: 'defaultValue',
      title: tr('默认值', 'Default'),
      width: 150,
      minWidth: 100,
      resizable: true,
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder={tr('默认值', 'Default value')} onChange={e => onChange(e.target.value)} />
    }, {
      key: 'description',
      title: tr('描述', 'Description'),
      width: 200,
      minWidth: 150,
      sticky: 'right',
      // pin right
      resizable: true,
      render: (value, _node, onChange) => <input type="text" className="tree-table-input" value={typeof value === 'string' ? value : ''} placeholder={tr('请输入描述', 'Enter description')} onChange={e => onChange(e.target.value)} />
    }];
    return <div style={{
      padding: '20px'
    }}>
        {/* Control panel */}
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
          }}>🎛️ {tr('控制面板', 'Controls')}</strong>
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
              {tr('显示层级线', 'Show tree lines')}
            </label>
          </div>

          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
            <label>{tr('操作列位置：', 'Actions column position:')}</label>
            <select value={actionsPosition} onChange={e => setActionsPosition(e.target.value as 'start' | 'end')} style={{
            padding: '4px 8px'
          }}>
              <option value="start">{tr('左侧', 'Left')}</option>
              <option value="end">{tr('右侧', 'Right')}</option>
            </select>
          </div>

          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
            <label>{tr('缩进大小：', 'Indent size:')}</label>
            <input type="range" min="10" max="40" value={indentSize} onChange={e => setIndentSize(Number(e.target.value))} style={{
            width: '100px'
          }} />
            <span>{indentSize}px</span>
          </div>
        </div>

        {/* Feature overview */}
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
        }}>
            {tr('✨ 本示例包含的所有功能：', '✨ Features included in this demo:')}
          </strong>
          <ul style={{
          margin: 0,
          paddingLeft: '20px',
          lineHeight: '1.8'
        }}>
            <li><strong>{tr('数据管理：', 'Data management:')}</strong> {tr('支持添加、删除、编辑节点', 'add, delete, and edit nodes')}</li>
            <li><strong>{tr('拖拽排序：', 'Drag-and-drop:')}</strong> {tr('拖动行可调整顺序和层级关系', 'reorder rows and levels')}</li>
            <li><strong>{tr('列宽调整：', 'Resizable columns:')}</strong> {tr('拖动列边框可调整列宽', 'drag borders to resize')}</li>
            <li><strong>{tr('列固定：', 'Sticky columns:')}</strong> {tr('名称列左侧固定，描述列右侧固定', 'name pinned left, description pinned right')}</li>
            <li><strong>{tr('虚拟滚动：', 'Virtual scroll:')}</strong> {tr('表头固定，表体可滚动（横向和纵向）', 'sticky header with horizontal/vertical scrolling')}</li>
            <li><strong>{tr('树形层级：', 'Tree lines:')}</strong> {tr('支持多层嵌套，显示层级线条', 'multi-level nesting with guide lines')}</li>
            <li><strong>{tr('自定义渲染：', 'Custom render:')}</strong> {tr('每列都可自定义渲染组件', 'every column supports custom components')}</li>
            <li><strong>{tr('自定义操作：', 'Custom actions:')}</strong> {tr('支持自定义操作按钮', 'add your own action buttons')}</li>
            <li><strong>{tr('自定义图标：', 'Custom icons:')}</strong> {tr('展开/收起、添加、删除图标可自定义', 'expand/collapse/add/delete icons configurable')}</li>
            <li><strong>{tr('样式定制：', 'Styling:')}</strong> {tr('支持自定义类名、样式、行样式等', 'custom class names, styles, and row styles')}</li>
            <li><strong>{tr('事件回调：', 'Callbacks:')}</strong> {tr('完整的生命周期回调', 'full lifecycle callbacks')}</li>
            <li><strong>{tr('Ref 方法：', 'Ref methods:')}</strong> {tr('通过 ref 调用组件方法', 'call component methods via ref')}</li>
          </ul>
        </div>

        {/* Table container - constrained width to show horizontal scroll */}
        <div style={{
        border: '2px solid #1890ff',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
          <TreeTable<ApiParamNode> ref={tableRef}
        // ========== Data ==========
        data={data} defaultExpandedKeys={['3', '3-1']}

        // ========== Columns ==========
        columns={fullFeatureColumns}

        // ========== Action column ==========
        showActions actionsWidth={120} actionsPosition={actionsPosition} showDragHandle showExpandButton showAddButton showDeleteButton customActions={[{
          key: 'copy',
          icon: '📋',
          title: tr('复制节点', 'Copy node'),
          onClick: node => {
            const newNode = {
              ...node,
              id: \`node-\${Date.now()}\`,
              name: \`\${node.name}_copy\`
            };
            tableRef.current?.addSiblingNode(newNode, node.id);
          },
          visible: () => true
        }, {
          key: 'info',
          icon: 'ℹ️',
          title: tr('查看详情', 'View details'),
          onClick: node => {
            alert(tr(\`节点信息：\\nID: \${node.id}\\n名称: \${node.name}\\n类型: \${node.type}\`, \`Node info:\\nID: \${node.id}\\nName: \${node.name}\\nType: \${node.type}\`));
          }
        }]}

        // ========== Icons ==========
        expandIcon="➕" collapseIcon="➖" addIcon="✨" deleteIcon="🗑️" localeText={localeText}

        // ========== Footer ==========
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
                  {tr('➕ 添加根节点', '➕ Add root')}
                </button>
                <button onClick={() => tableRef.current?.expandAll()} style={{
            padding: '6px 12px',
            cursor: 'pointer'
          }}>
                  {tr('📂 展开全部', '📂 Expand all')}
                </button>
                <button onClick={() => tableRef.current?.collapseAll()} style={{
            padding: '6px 12px',
            cursor: 'pointer'
          }}>
                  {tr('📁 收起全部', '📁 Collapse all')}
                </button>
                <button onClick={() => {
            const currentData = tableRef.current?.getData();
            console.log('Current data:', currentData);
            alert(tr(\`数据已输出到控制台，共 \${currentData?.length} 个根节点\`, \`Data printed to console, \${currentData?.length} root nodes\`));
          }} style={{
            padding: '6px 12px',
            cursor: 'pointer'
          }}>
                  {tr('📊 导出数据', '📊 Export data')}
                </button>
              </div>}

        // ========== Events ==========
        onChange={newData => {
          console.log('Data changed:', newData);
          setData(newData);
        }} onAdd={parentId => {
          console.log('Add node, parent ID:', parentId);
          return createNewNode();
        }} onDelete={node => {
          console.log('Delete node:', node);
          const confirmed = window.confirm(tr(\`确定要删除节点 "\${node.name}" 吗？\`, \`Delete node "\${node.name}"?\`));
          return confirmed;
        }} onNodeChange={(node, field, value) => {
          console.log('Node field changed:', {
            node,
            field,
            value
          });
        }} onExpand={(node, expanded) => {
          console.log(\`Node \${expanded ? 'expanded' : 'collapsed'}:\`, node);
        }} onDrop={info => {
          console.log('Drag finished:', info);
        }}

        // ========== Drag config ==========
        draggable={{
          enabled: true,
          allowDrop: (dragNode, dropNode, position) => {
            // Example: disallow dropping parent into its child
            console.log('Drag check:', {
              dragNode,
              dropNode,
              position
            });
            return true;
          },
          onDragStart: node => {
            console.log('Drag start:', node);
          },
          onDragEnd: node => {
            console.log('Drag end:', node);
          }
        }}

        // ========== Resize ==========
        resizable onColumnResize={(key, width) => {
          console.log('Column resized:', {
            key,
            width
          });
        }}

        // ========== Scroll ==========
        scroll={{
          maxHeight: 500,
          minHeight: 300,
          minWidth: 1000,
          virtual: false,
          // set to true to enable virtual scroll
          // rowHeight: 40, // required when virtual is true
          // overscan: 5,
          onScrollBottom: () => {
            console.log('Reached bottom');
          },
          scrollBottomThreshold: 50,
          onScrollRight: () => {
            console.log('Reached right edge');
          },
          scrollRightThreshold: 50
        }}

        // ========== Styling ==========
        className="full-feature-table" style={{
          fontSize: '14px'
        }} rowClassName={(node, index) => {
          // Add background for even rows
          return index % 2 === 0 ? 'even-row' : 'odd-row';
        }} rowStyle={(node, index) => ({
          // Bold root nodes
          fontWeight: node.depth === 0 ? 'bold' : 'normal'
        })} headerClassName="custom-header" indentSize={indentSize} showTreeLine={showTreeLine}

        // ========== Empty state ==========
        emptyText={<div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#999'
        }}>
                <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>📭</div>
                <div>{tr('暂无数据，使用下方按钮添加行', 'No data yet, use the buttons below to add rows')}</div>
              </div>} />
        </div>

        {/* Data preview */}
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
        }}>
            {tr('📝 当前数据（JSON）：', '📝 Current data (JSON):')}
          </strong>
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
}`,...Te.parameters?.docs?.source},description:{story:"Full feature demo - showcases every capability",...Te.parameters?.docs?.description}}};const ir=["Basic","WithDraggable","WithResizable","WithScroll","CustomIcons","VirtualScroll","WithTreeLine","StickyColumns","ThemeSwitching","CustomTheme","FullFeature"];export{pe as Basic,ge as CustomIcons,we as CustomTheme,Te as FullFeature,be as StickyColumns,ve as ThemeSwitching,ye as VirtualScroll,he as WithDraggable,fe as WithResizable,me as WithScroll,xe as WithTreeLine,ir as __namedExportsOrder,sr as default};
