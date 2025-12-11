import{j as o}from"./jsx-runtime-CDt2p4po.js";import{r as u,R as _e}from"./index-GiUgBvb1.js";/* empty css                  */var Mt=Symbol.for("immer-nothing"),Pt=Symbol.for("immer-draftable"),z=Symbol.for("immer-state");function M(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var W=Object,de=W.getPrototypeOf,Ie="constructor",Le="prototype",Ye="configurable",je="enumerable",Ee="writable",we="value",J=e=>!!e&&!!e[z];function G(e){return e?Bt(e)||$e(e)||!!e[Pt]||!!e[Ie]?.[Pt]||Ze(e)||We(e):!1}var Tn=W[Le][Ie].toString(),zt=new WeakMap;function Bt(e){if(!e||!ot(e))return!1;const t=de(e);if(t===null||t===W[Le])return!0;const n=W.hasOwnProperty.call(t,Ie)&&t[Ie];if(n===Object)return!0;if(!se(n))return!1;let r=zt.get(n);return r===void 0&&(r=Function.toString.call(n),zt.set(n,r)),r===Tn}function De(e,t,n=!0){ke(e)===0?(n?Reflect.ownKeys(e):W.keys(e)).forEach(a=>{t(a,e[a],e)}):e.forEach((r,a)=>t(a,r,e))}function ke(e){const t=e[z];return t?t.type_:$e(e)?1:Ze(e)?2:We(e)?3:0}var Lt=(e,t,n=ke(e))=>n===2?e.has(t):W[Le].hasOwnProperty.call(e,t),Je=(e,t,n=ke(e))=>n===2?e.get(t):e[t],Pe=(e,t,n,r=ke(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function _n(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var $e=Array.isArray,Ze=e=>e instanceof Map,We=e=>e instanceof Set,ot=e=>typeof e=="object",se=e=>typeof e=="function",Ke=e=>typeof e=="boolean",K=e=>e.copy_||e.base_,st=e=>e.modified_?e.copy_:e.base_;function Qe(e,t){if(Ze(e))return new Map(e);if(We(e))return new Set(e);if($e(e))return Array[Le].slice.call(e);const n=Bt(e);if(t===!0||t==="class_only"&&!n){const r=W.getOwnPropertyDescriptors(e);delete r[z];let a=Reflect.ownKeys(r);for(let s=0;s<a.length;s++){const i=a[s],d=r[i];d[Ee]===!1&&(d[Ee]=!0,d[Ye]=!0),(d.get||d.set)&&(r[i]={[Ye]:!0,[Ee]:!0,[je]:d[je],[we]:e[i]})}return W.create(de(e),r)}else{const r=de(e);if(r!==null&&n)return{...e};const a=W.create(r);return W.assign(a,e)}}function it(e,t=!1){return Oe(e)||J(e)||!G(e)||(ke(e)>1&&W.defineProperties(e,{set:Ae,add:Ae,clear:Ae,delete:Ae}),W.freeze(e),t&&De(e,(n,r)=>{it(r,!0)},!1)),e}function Dn(){M(2)}var Ae={[we]:Dn};function Oe(e){return e===null||!ot(e)?!0:W.isFrozen(e)}var ze="MapSet",et="Patches",Ht={};function ce(e){const t=Ht[e];return t||M(0,e),t}var kn=e=>!!Ht[e],Ce,Vt=()=>Ce,Sn=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:kn(ze)?ce(ze):void 0});function $t(e,t){t&&(e.patchPlugin_=ce(et),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function tt(e){nt(e),e.drafts_.forEach(Nn),e.drafts_=null}function nt(e){e===Ce&&(Ce=e.parent_)}var Zt=e=>Ce=Sn(Ce,e);function Nn(e){const t=e[z];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function Wt(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];if(e!==void 0&&e!==n){n[z].modified_&&(tt(t),M(4)),G(e)&&(e=Ot(t,e));const{patchPlugin_:a}=t;a&&a.generateReplacementPatches_(n[z].base_,e,t)}else e=Ot(t,n);return An(t,e,!0),tt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Mt?e:void 0}function Ot(e,t){if(Oe(t))return t;const n=t[z];if(!n)return lt(t,e.handledSet_,e);if(!qe(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){const{callbacks_:r}=n;if(r)for(;r.length>0;)r.pop()(e);Gt(n,e)}return n.copy_}function An(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&it(t,n)}function Ut(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var qe=(e,t)=>e.scope_===t,En=[];function Kt(e,t,n,r){const a=K(e),s=e.type_;if(r!==void 0&&Je(a,r,s)===t){Pe(a,r,n,s);return}if(!e.draftLocations_){const d=e.draftLocations_=new Map;De(a,(h,c)=>{if(J(c)){const f=d.get(c)||[];f.push(h),d.set(c,f)}})}const i=e.draftLocations_.get(t)??En;for(const d of i)Pe(a,d,n,s)}function Rn(e,t,n){e.callbacks_.push(function(a){const s=t;if(!s||!qe(s,a))return;a.mapSetPlugin_?.fixSetContents(s);const i=st(s);Kt(e,s.draft_??s,i,n),Gt(s,a)})}function Gt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||(e.assigned_?.size??0)>0)){const{patchPlugin_:r}=t;if(r){const a=r.getPath(e);a&&r.generatePatches_(e,a,t)}Ut(e)}}function In(e,t,n){const{scope_:r}=e;if(J(n)){const a=n[z];qe(a,r)&&a.callbacks_.push(function(){Re(e);const i=st(a);Kt(e,n,i,t)})}else G(n)&&e.callbacks_.push(function(){const s=K(e);Je(s,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&lt(Je(e.copy_,t,e.type_),r.handledSet_,r)})}function lt(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||J(e)||t.has(e)||!G(e)||Oe(e)||(t.add(e),De(e,(r,a)=>{if(J(a)){const s=a[z];if(qe(s,n)){const i=st(s);Pe(e,r,i,e.type_),Ut(s)}}else G(a)&&lt(a,t,n)})),e}function jn(e,t){const n=$e(e),r={type_:n?1:0,scope_:t?t.scope_:Vt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let a=r,s=dt;n&&(a=[r],s=Te);const{revoke:i,proxy:d}=Proxy.revocable(a,s);return r.draft_=d,r.revoke_=i,[d,r]}var dt={get(e,t){if(t===z)return e;const n=K(e);if(!Lt(n,t,e.type_))return Pn(e,n,t);const r=n[t];if(e.finalized_||!G(r))return r;if(r===Ge(e.base_,t)){Re(e);const a=e.type_===1?+t:t,s=at(e.scope_,r,e,a);return e.copy_[a]=s}return r},has(e,t){return t in K(e)},ownKeys(e){return Reflect.ownKeys(K(e))},set(e,t,n){const r=Xt(K(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const a=Ge(K(e),t),s=a?.[z];if(s&&s.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(_n(n,a)&&(n!==void 0||Lt(e.base_,t,e.type_)))return!0;Re(e),rt(e)}return e.copy_[t]===n&&(n!==void 0||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_.set(t,!0),In(e,t,n)),!0},deleteProperty(e,t){return Re(e),Ge(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),rt(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const n=K(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Ee]:!0,[Ye]:e.type_!==1||t!=="length",[je]:r[je],[we]:n[t]}},defineProperty(){M(11)},getPrototypeOf(e){return de(e.base_)},setPrototypeOf(){M(12)}},Te={};De(dt,(e,t)=>{Te[e]=function(){const n=arguments;return n[0]=n[0][0],t.apply(this,n)}});Te.deleteProperty=function(e,t){return Te.set.call(this,e,t,void 0)};Te.set=function(e,t,n){return dt.set.call(this,e[0],t,n,e[0])};function Ge(e,t){const n=e[z];return(n?K(n):e)[t]}function Pn(e,t,n){const r=Xt(t,n);return r?we in r?r[we]:r.get?.call(e.draft_):void 0}function Xt(e,t){if(!(t in e))return;let n=de(e);for(;n;){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r;n=de(n)}}function rt(e){e.modified_||(e.modified_=!0,e.parent_&&rt(e.parent_))}function Re(e){e.copy_||(e.assigned_=new Map,e.copy_=Qe(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var zn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(t,n,r)=>{if(se(t)&&!se(n)){const s=n;n=t;const i=this;return function(h=s,...c){return i.produce(h,f=>n.call(this,f,...c))}}se(n)||M(6),r!==void 0&&!se(r)&&M(7);let a;if(G(t)){const s=Zt(this),i=at(s,t,void 0);let d=!0;try{a=n(i),d=!1}finally{d?tt(s):nt(s)}return $t(s,r),Wt(a,s)}else if(!t||!ot(t)){if(a=n(t),a===void 0&&(a=t),a===Mt&&(a=void 0),this.autoFreeze_&&it(a,!0),r){const s=[],i=[];ce(et).generateReplacementPatches_(t,a,{patches_:s,inversePatches_:i}),r(s,i)}return a}else M(1,t)},this.produceWithPatches=(t,n)=>{if(se(t))return(i,...d)=>this.produceWithPatches(i,h=>t(h,...d));let r,a;return[this.produce(t,n,(i,d)=>{r=i,a=d}),r,a]},Ke(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Ke(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Ke(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){G(e)||M(8),J(e)&&(e=Ln(e));const t=Zt(this),n=at(t,e,void 0);return n[z].isManual_=!0,nt(t),n}finishDraft(e,t){const n=e&&e[z];(!n||!n.isManual_)&&M(9);const{scope_:r}=n;return $t(r,t),Wt(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const a=t[n];if(a.path.length===0&&a.op==="replace"){e=a.value;break}}n>-1&&(t=t.slice(n+1));const r=ce(et).applyPatches_;return J(e)?r(e,t):this.produce(e,a=>r(a,t))}};function at(e,t,n,r){const[a,s]=Ze(t)?ce(ze).proxyMap_(t,n):We(t)?ce(ze).proxySet_(t,n):jn(t,n);return(n?.scope_??Vt()).drafts_.push(a),s.callbacks_=n?.callbacks_??[],s.key_=r,n&&r!==void 0?Rn(n,s,r):s.callbacks_.push(function(h){h.mapSetPlugin_?.fixSetContents(s);const{patchPlugin_:c}=h;s.modified_&&c&&c.generatePatches_(s,[],h)}),a}function Ln(e){return J(e)||M(10,e),Yt(e)}function Yt(e){if(!G(e)||Oe(e))return e;const t=e[z];let n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Qe(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Qe(e,!0);return De(n,(a,s)=>{Pe(n,a,Yt(s))},r),t&&(t.finalized_=!1),n}var $n=new zn,ie=$n.produce;const Jt=e=>Array.isArray(e.children)&&e.children.length>0,Zn=e=>Jt(e)?e.children:[],le=(e,t,n=null)=>{for(let r=0;r<e.length;r++){if(e[r].id===t)return{node:e[r],parent:n,index:r,siblings:e};if(Jt(e[r])){const a=le(Zn(e[r]),t,e[r]);if(a.node)return a}}return{node:null,parent:null,index:-1,siblings:[]}};function Wn(e,t){switch(t.type){case"SET_DRAG_ID":return{...e,dragId:t.payload};case"SET_DROP_TARGET":return{...e,dropId:t.payload.dropId,dropPosition:t.payload.dropPosition};case"CLEAR_DRAG_STATE":return{dragId:null,dropId:null,dropPosition:null};default:return e}}function On(e){const{dragConfig:t,data:n,onDataUpdate:r,onDrop:a,onExpandNode:s}=e,[i,d]=u.useReducer(Wn,{dragId:null,dropId:null,dropPosition:null}),h=u.useRef(null),c=u.useRef(null),f=u.useRef({id:null,position:null}),g=u.useCallback((S,l)=>{if(!t.enabled)return;S.dataTransfer.effectAllowed="move",d({type:"SET_DRAG_ID",payload:l}),h.current=l;const y=le(n,l);y.node&&t.onDragStart?.(y.node)},[t,n]),_=u.useCallback(()=>{c.current!==null&&(cancelAnimationFrame(c.current),c.current=null);const{dropId:S,dropPosition:l}=i;if(h.current&&S&&l){const y=le(n,h.current),b=le(n,S);if(y.node&&b.node){if(t.allowDrop&&!t.allowDrop(y.node,b.node,l)){d({type:"CLEAR_DRAG_STATE"}),h.current=null,f.current={id:null,position:null};return}const w=y.node,A=b.node,N=ie(n,O=>{const x=le(O,h.current);if(!x.node)return;const{parent:L,index:F,siblings:$}=x,q=$[F];L&&L.children?(L.children.splice(F,1),L.children.length===0&&delete L.children):$.splice(F,1);const Y=le(O,S);if(!Y.node)return;const{node:P,parent:re,index:ae,siblings:ee}=Y;if(l==="inside")P.children||(P.children=[]),P.children.push(q);else{const te=re?.children||ee,Se=l==="before"?ae:ae+1;te.splice(Se,0,q)}});l==="inside"&&s?.(S),r(N),a?.({dragNode:w,dropNode:A,dropPosition:l}),t.onDragEnd?.(w)}}d({type:"CLEAR_DRAG_STATE"}),h.current=null,f.current={id:null,position:null}},[i,n,t,r,a,s]),E=u.useCallback((S,l)=>{if(S.preventDefault(),!t.enabled||h.current===l)return;const y=S.currentTarget.getBoundingClientRect(),b=S.clientY-y.top,w=y.height;let A;b<w*.25?A="before":b>w*.75?A="after":A="inside";const N=f.current;N.id===l&&N.position===A||(c.current!==null&&cancelAnimationFrame(c.current),c.current=requestAnimationFrame(()=>{f.current={id:l,position:A},d({type:"SET_DROP_TARGET",payload:{dropId:l,dropPosition:A}}),c.current=null}))},[t.enabled]),I=u.useCallback(()=>{c.current!==null&&(cancelAnimationFrame(c.current),c.current=null),f.current={id:null,position:null},d({type:"SET_DROP_TARGET",payload:{dropId:null,dropPosition:null}})},[]);return{dragState:i,handleDragStart:g,handleDragEnd:_,handleDragOver:E,handleDragLeave:I}}function qn(e){const{flattenedData:t,scroll:n}=e,[r,a]=u.useState(0),s=n?.virtual&&n?.rowHeight,i=n?.rowHeight??40,d=n?.overscan??5,{visibleData:h,totalHeight:c,offsetY:f}=u.useMemo(()=>{if(!s)return{visibleData:t,totalHeight:0,offsetY:0};const g=n?.maxHeight??400,_=t.length*i,E=Math.max(0,Math.floor(r/i)-d),I=Math.min(t.length,Math.ceil((r+g)/i)+d);return{visibleData:t.slice(E,I),totalHeight:_,offsetY:E*i}},[s,t,r,i,d,n?.maxHeight]);return{virtualEnabled:!!s,rowHeight:i,overscan:d,scrollTop:r,setScrollTop:a,visibleData:h,totalHeight:c,offsetY:f}}function Fn(e){const{columns:t,resizable:n,onColumnResize:r}=e,[a,s]=u.useState(()=>{const g={};return t.forEach(_=>{typeof _.width=="number"&&(g[_.key]=_.width)}),g}),i=u.useRef(null),d=u.useRef({handleMouseMove:null,handleMouseUp:null});u.useEffect(()=>()=>{const{handleMouseMove:g,handleMouseUp:_}=d.current;g&&document.removeEventListener("mousemove",g),_&&document.removeEventListener("mouseup",_),i.current&&(document.body.style.cursor="",document.body.style.userSelect="")},[]);const h=u.useCallback((g,_)=>{g.preventDefault(),g.stopPropagation();const{handleMouseMove:E,handleMouseUp:I}=d.current;E&&document.removeEventListener("mousemove",E),I&&document.removeEventListener("mouseup",I);const y=g.currentTarget.parentElement?.offsetWidth??100;i.current={key:_,startX:g.clientX,startWidth:y},s(A=>({...A,[_]:y}));const b=A=>{if(!i.current)return;const N=t.find($=>$.key===i.current.key),O=N?.minWidth??50,x=N?.maxWidth??1/0,L=A.clientX-i.current.startX,F=Math.min(Math.max(i.current.startWidth+L,O),x);s($=>({...$,[i.current.key]:F}))},w=()=>{if(i.current){const A=i.current.key,N=a[A]??i.current.startWidth;r?.(A,N)}i.current=null,document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",w),d.current={handleMouseMove:null,handleMouseUp:null},document.body.style.cursor="",document.body.style.userSelect=""};d.current={handleMouseMove:b,handleMouseUp:w},document.addEventListener("mousemove",b),document.addEventListener("mouseup",w),document.body.style.cursor="col-resize",document.body.style.userSelect="none"},[t,a,r]),c=u.useCallback(g=>{if(a[g.key]!==void 0)return a[g.key];if(typeof g.width=="number")return g.width},[a]),f=u.useCallback(g=>g.resizable!==void 0?g.resizable:n,[n]);return{columnWidths:a,handleResizeStart:h,getColumnWidth:c,isColumnResizable:f}}function Mn(e){const{scroll:t,virtualEnabled:n,setScrollTop:r}=e,a=u.useRef(null),s=u.useRef(null),i=u.useCallback(h=>{const c=h.currentTarget;if(n&&r&&r(c.scrollTop),s.current&&(s.current.scrollLeft=c.scrollLeft),t?.onScrollBottom){const f=t.scrollBottomThreshold??10;c.scrollHeight-c.scrollTop-c.clientHeight<=f&&t.onScrollBottom()}if(t?.onScrollRight){const f=t.scrollRightThreshold??10;c.scrollWidth-c.scrollLeft-c.clientWidth<=f&&t.onScrollRight()}},[t,n,r]),d=u.useCallback(h=>{const c=h.currentTarget;a.current&&(a.current.scrollLeft=c.scrollLeft)},[]);return{bodyRef:a,headerRef:s,handleBodyScroll:i,handleHeaderScroll:d}}const Xe=()=>{if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=Date.now().toString(36),t=Math.random().toString(36).substring(2,15),n=Math.random().toString(36).substring(2,15),r=(typeof performance<"u"&&performance.now?performance.now():0).toString(36).replace(".","");return`${e}-${t}-${n}-${r}`},Fe=e=>Array.isArray(e.children)&&e.children.length>0,ct=e=>Fe(e)?e.children:[],Qt=(e,t,n=0,r=null,a=[],s=[],i=0)=>{const d=[];let h=i;return e.forEach((c,f)=>{const g=Fe(c),_=t.has(c.id),E=[...a,f+1],I=[...s];if(d.push({...c,depth:n,index:f,parentId:r,indexPath:E,isExpanded:_,hasChildren:g,_original:c,_lineInfo:I,_globalIndex:h}),h++,g&&_){const S=ct(c),l=f<e.length-1,y=[...I,l],b=Qt(S,t,n+1,c.id,E,y,h);d.push(...b),h+=b.length}}),d},qt=e=>{const t=[],n=r=>{r.forEach(a=>{t.push(a.id),Fe(a)&&n(ct(a))})};return n(e),t},V=(e,t,n=null)=>{for(let r=0;r<e.length;r++){if(e[r].id===t)return{node:e[r],parent:n,index:r,siblings:e};if(Fe(e[r])){const a=V(ct(e[r]),t,e[r]);if(a.node)return a}}return{node:null,parent:null,index:-1,siblings:[]}};function Bn(e,t){switch(t.type){case"SET_DATA":return{...e,data:t.payload};case"TOGGLE_EXPAND":{const n=new Set(e.expandedIds);return n.has(t.payload)?n.delete(t.payload):n.add(t.payload),{...e,expandedIds:n}}case"EXPAND_NODE":{if(e.expandedIds.has(t.payload))return e;const n=new Set(e.expandedIds);return n.add(t.payload),{...e,expandedIds:n}}case"COLLAPSE_NODE":{if(!e.expandedIds.has(t.payload))return e;const n=new Set(e.expandedIds);return n.delete(t.payload),{...e,expandedIds:n}}case"EXPAND_ALL":return{...e,expandedIds:new Set(t.payload)};case"COLLAPSE_ALL":return{...e,expandedIds:new Set};default:return e}}const Hn=_e.memo(function({column:t,node:n,value:r,onChange:a}){if(t.render)return o.jsx(o.Fragment,{children:t.render(r,n._original,a)});const s=r!=null&&typeof r=="object"&&"toString"in r||r!=null?String(r):"";return o.jsx("span",{className:"cell-text",children:s})}),Vn=_e.memo(function({node:t,style:n,showExpandButton:r,showDragHandle:a,showAddButton:s,showDeleteButton:i,dragEnabled:d,expandIcon:h,collapseIcon:c,addIcon:f,deleteIcon:g,dragHandleTitle:_,addChildTitle:E,deleteNodeTitle:I,customActions:S,onToggleExpand:l,onAddChild:y,onDelete:b,stickyClass:w=""}){const A=u.useCallback(()=>{l(t.id)},[t.id,l]),N=u.useCallback(()=>{y(t.id)},[t.id,y]),O=u.useCallback(()=>{b(t.id)},[t.id,b]);return o.jsxs("div",{className:`cell cell-actions ${w}`,style:n,children:[r&&(t.hasChildren?o.jsx("button",{className:"expand-btn",onClick:A,children:t.isExpanded?c??"▼":h??"▶"}):o.jsx("span",{className:"expand-placeholder"})),a&&d&&o.jsx("span",{className:"drag-handle",title:_,children:"⋮⋮"}),s&&o.jsx("button",{className:"action-btn add",onClick:N,title:E,children:f??"+"}),i&&o.jsx("button",{className:"action-btn delete",onClick:O,title:I,children:g??"🗑"}),S.map(x=>{const L=x.visible?x.visible(t._original):!0,F=x.disabled?x.disabled(t._original):!1;return L?o.jsx("button",{className:"action-btn custom",onClick:()=>x.onClick(t._original),disabled:F,title:x.title,children:x.icon},x.key):null})]})}),Un=_e.memo(function({node:t,indentSize:n}){return t.depth===0?null:o.jsx(o.Fragment,{children:Array.from({length:t.depth}).map((r,a)=>o.jsx("span",{className:`tree-line tree-line-depth-${a}`,style:{left:a*n,width:n},children:a===t.depth-1?o.jsx("span",{className:"tree-line-corner"}):t._lineInfo[a]?o.jsx("span",{className:"tree-line-vertical"}):null},a))})}),Kn=_e.memo(function({column:t,node:n,value:r,isFirstColumn:a,indentSize:s,showTreeLine:i,onFieldChange:d}){const h=u.useCallback(f=>{d(n.id,t.key,f)},[n.id,t.key,d]),c=u.useMemo(()=>({width:n.depth*s}),[n.depth,s]);return o.jsxs(o.Fragment,{children:[a&&o.jsx("span",{className:"indent-space",style:c,children:i&&o.jsx(Un,{node:n,indentSize:s})}),o.jsx(Hn,{column:t,node:n,value:r,onChange:h})]})}),Ft=_e.memo(function({node:t,index:n,columns:r,actionsPosition:a,showActions:s,dragEnabled:i,indentSize:d,showTreeLine:h,rowHeight:c,getRowClassName:f,getRowStyle:g,getColumnWidth:_,onDragStart:E,onDragEnd:I,onDragOver:S,onDragLeave:l,onFieldChange:y,renderActionsCell:b,stickyOffsets:w}){const A=u.useCallback(x=>{E(x,t.id)},[t.id,E]),N=u.useCallback(x=>{S(x,t.id)},[t.id,S]),O=u.useMemo(()=>{const x=g(t,n);return c!==void 0?{...x,height:c}:x},[t,n,c,g]);return o.jsxs("div",{className:f(t,n),style:O,draggable:i,onDragStart:A,onDragEnd:I,onDragOver:N,onDragLeave:l,children:[a==="start"&&s&&b(t),r.map((x,L)=>{const F=L===0,$=_(x),q={};let Y="";x.sticky==="left"?(Y="cell-sticky-left",q.position="sticky",q.left=w.leftOffsets.get(x.key)??0,q.zIndex=2):x.sticky==="right"&&(Y="cell-sticky-right",q.position="sticky",q.right=w.rightOffsets.get(x.key)??0,q.zIndex=2);const P={width:$,minWidth:x.minWidth,flex:$!==void 0?void 0:x.flex,justifyContent:x.align==="center"?"center":x.align==="right"?"flex-end":"flex-start",...q},re=t,ae=x.key in re?re[x.key]:void 0;return o.jsx("div",{className:`cell cell-${x.key} ${Y}`,style:P,children:o.jsx(Kn,{column:x,node:t,value:ae,isFirstColumn:F,indentSize:d,showTreeLine:h,onFieldChange:y})},x.key)}),a==="end"&&s&&b(t)]})});function Gn(e,t){const{data:n,defaultExpandedKeys:r=[],defaultExpandAll:a=!1,columns:s,showActions:i=!0,actionsWidth:d=100,actionsPosition:h="start",showDragHandle:c=!0,showExpandButton:f=!0,showAddButton:g=!0,showDeleteButton:_=!0,customActions:E=[],expandIcon:I,collapseIcon:S,addIcon:l,deleteIcon:y,localeText:b,footer:w,onChange:A,onAdd:N,onDelete:O,onNodeChange:x,onExpand:L,onDrop:F,draggable:$=!1,resizable:q=!1,onColumnResize:Y,scroll:P,className:re="",style:ae,rowClassName:ee,rowStyle:te,headerClassName:Se="",indentSize:pt=20,emptyText:en="No data",showTreeLine:ht=!0}=e,Me=b??{},ft=Me.dragHandleTitle??"Drag to sort",gt=Me.addChildTitle??"Add child",mt=Me.deleteNodeTitle??"Delete node",[C,U]=u.useReducer(Bn,{data:n,expandedIds:a?new Set(qt(n)):new Set(r)}),Z=u.useCallback(p=>{U({type:"SET_DATA",payload:p}),A?.(p)},[A]),ue=u.useMemo(()=>typeof $=="boolean"?{enabled:$}:{enabled:!0,...$},[$]),{dragState:yt,handleDragStart:xt,handleDragEnd:bt,handleDragOver:vt,handleDragLeave:wt}=On({dragConfig:ue,data:C.data,onDataUpdate:Z,onDrop:F,onExpandNode:p=>U({type:"EXPAND_NODE",payload:p})}),{handleResizeStart:tn,getColumnWidth:oe,isColumnResizable:nn}=Fn({columns:s,resizable:q??!1,onColumnResize:Y}),Ne=u.useMemo(()=>{const p=new Map,m=new Map;let v=0,T=0;h==="start"&&i&&(v+=d),s.forEach(D=>{if(D.sticky==="left"){p.set(D.key,v);const k=oe(D)??D.minWidth??100;v+=k}});const R=[];h==="end"&&i&&(T=d);for(let D=s.length-1;D>=0;D--){const k=s[D];if(k.sticky==="right"){const H=oe(k)??k.minWidth??100;R.push({col:k,width:H})}}return R.forEach(({col:D,width:k})=>{m.set(D.key,T),T+=k}),{leftOffsets:p,rightOffsets:m}},[s,oe,d,h,i]);u.useEffect(()=>{U({type:"SET_DATA",payload:n})},[n]);const Be=u.useMemo(()=>Qt(C.data,C.expandedIds),[C.data,C.expandedIds]),{virtualEnabled:Ct,rowHeight:rn,setScrollTop:an,visibleData:on,totalHeight:sn,offsetY:ln}=qn({flattenedData:Be,scroll:P}),{bodyRef:dn,headerRef:cn,handleBodyScroll:un,handleHeaderScroll:pn}=Mn({scroll:P,virtualEnabled:Ct,setScrollTop:an}),hn=u.useCallback(p=>{const m=N?.(null),v=m||{id:Xe(),name:"newField",...p};if(m!==void 0||!N){const T=[...C.data,v];Z(T)}},[C.data,N,Z]),fn=u.useCallback((p,m)=>{const v=N?.(null),T=v||{id:Xe(),name:"newField",...p};if(v!==void 0||!N){const R=ie(C.data,D=>{if(m){const{index:k,siblings:H}=V(D,m);H&&H.splice(k+1,0,T)}else D.push(T)});Z(R)}},[C.data,N,Z]),He=u.useCallback((p,m)=>{const v=N?.(p),T=v||{id:Xe(),name:"newField",...m};if(v!==void 0||!N){const R=ie(C.data,D=>{const k=V(D,p);k.node&&(k.node.children||(k.node.children=[]),k.node.children.push(T))});U({type:"EXPAND_NODE",payload:p}),Z(R)}},[C.data,N,Z]),Ve=u.useCallback(p=>{const m=V(C.data,p);if(!m.node||O?.(m.node)===!1)return;const T=ie(C.data,R=>{const D=V(R,p);if(!D.node)return;const{parent:k,index:H,siblings:Cn}=D;k&&k.children?(k.children.splice(H,1),k.children.length===0&&delete k.children):Cn.splice(H,1)});Z(T)},[C.data,O,Z]),gn=u.useCallback((p,m)=>{const v=ie(C.data,T=>{const{node:R}=V(T,p);R&&Object.assign(R,m)});Z(v)},[C.data,Z]),mn=u.useCallback(p=>V(C.data,p).node??void 0,[C.data]),Tt=u.useCallback(p=>{const m=!C.expandedIds.has(p);U({type:"TOGGLE_EXPAND",payload:p});const v=V(C.data,p);v.node&&L?.(v.node,m)},[C.expandedIds,C.data,L]),yn=u.useCallback(()=>{U({type:"EXPAND_ALL",payload:qt(C.data)})},[C.data]),xn=u.useCallback(()=>{U({type:"COLLAPSE_ALL"})},[]),bn=u.useCallback(p=>{U({type:"EXPAND_NODE",payload:p})},[]),vn=u.useCallback(p=>{U({type:"COLLAPSE_NODE",payload:p})},[]),_t=u.useCallback((p,m,v)=>{const T=ie(C.data,D=>{const k=V(D,p);if(k.node){const H=k.node;H[m]=v}}),R=V(T,p);R.node&&(Z(T),x?.(R.node,m,v))},[C.data,Z,x]);u.useImperativeHandle(t,()=>({getData:()=>C.data,setData:Z,addRootNode:hn,addSiblingNode:fn,addChildNode:He,deleteNode:Ve,updateNode:gn,getNode:mn,expandAll:yn,collapseAll:xn,expandNode:bn,collapseNode:vn}));const Dt=u.useCallback((p,m)=>{const v=["tree-table-row"],{dragId:T,dropId:R,dropPosition:D}=yt;return T===p.id&&v.push("dragging"),R===p.id&&(v.push("drop-target"),D&&v.push(`drop-${D}`)),typeof ee=="string"?v.push(ee):typeof ee=="function"&&v.push(ee(p._original,m)),v.join(" ")},[yt,ee]),kt=u.useCallback((p,m)=>typeof te=="function"?te(p._original,m):te||{},[te]),Ue=u.useMemo(()=>({width:d,minWidth:d}),[d]),St=u.useMemo(()=>E,[E]),Nt=()=>{const p={};let m="";return h==="start"?(m="cell-sticky-left",p.position="sticky",p.left=0,p.zIndex=2):h==="end"&&(m="cell-sticky-right",p.position="sticky",p.right=0,p.zIndex=2),o.jsx("div",{className:`cell cell-actions ${m}`,style:{...Ue,...p}})},At=()=>o.jsxs(o.Fragment,{children:[h==="start"&&i&&Nt(),s.map(p=>{const m=oe(p),v=nn(p),T={};let R="";return p.sticky==="left"?(R="cell-sticky-left",T.position="sticky",T.left=Ne.leftOffsets.get(p.key)??0,T.zIndex=2):p.sticky==="right"&&(R="cell-sticky-right",T.position="sticky",T.right=Ne.rightOffsets.get(p.key)??0,T.zIndex=2),o.jsxs("div",{className:`cell cell-${p.key}${v?" resizable":""} ${R}`,style:{width:m,minWidth:p.minWidth,flex:m!==void 0?void 0:p.flex,justifyContent:p.align==="center"?"center":p.align==="right"?"flex-end":"flex-start",...T},children:[p.title,v&&o.jsx("div",{className:"column-resizer",onMouseDown:D=>tn(D,p.key)})]},p.key)}),h==="end"&&i&&Nt()]}),Et=u.useCallback(p=>{const m={};let v="";return h==="start"?(v="cell-sticky-left",m.position="sticky",m.left=0,m.zIndex=2):h==="end"&&(v="cell-sticky-right",m.position="sticky",m.right=0,m.zIndex=2),o.jsx(Vn,{node:p,style:{...Ue,...m},showExpandButton:f,showDragHandle:c,showAddButton:g,showDeleteButton:_,dragEnabled:ue.enabled,expandIcon:I,collapseIcon:S,addIcon:l,deleteIcon:y,dragHandleTitle:ft,addChildTitle:gt,deleteNodeTitle:mt,customActions:St,onToggleExpand:Tt,onAddChild:He,onDelete:Ve,stickyClass:v})},[Ue,h,f,c,g,_,ue.enabled,I,S,l,y,St,Tt,He,Ve,ft,gt,mt]),Rt=()=>o.jsx(o.Fragment,{children:Be.length===0?o.jsx("div",{className:"tree-table-empty",children:en}):Ct?o.jsx(o.Fragment,{children:o.jsx("div",{style:{height:sn,position:"relative"},children:o.jsx("div",{style:{transform:`translateY(${ln}px)`},children:on.map(p=>{const m=p._globalIndex??0;return o.jsx(Ft,{node:p,index:m,columns:s,actionsPosition:h,showActions:i,dragEnabled:ue.enabled,indentSize:pt,showTreeLine:ht,rowHeight:rn,getRowClassName:Dt,getRowStyle:kt,getColumnWidth:oe,onDragStart:xt,onDragEnd:bt,onDragOver:vt,onDragLeave:wt,onFieldChange:_t,renderActionsCell:Et,stickyOffsets:Ne},p.id)})})})}):Be.map((p,m)=>o.jsx(Ft,{node:p,index:m,columns:s,actionsPosition:h,showActions:i,dragEnabled:ue.enabled,indentSize:pt,showTreeLine:ht,getRowClassName:Dt,getRowStyle:kt,getColumnWidth:oe,onDragStart:xt,onDragEnd:bt,onDragOver:vt,onDragLeave:wt,onFieldChange:_t,renderActionsCell:Et,stickyOffsets:Ne},p.id))}),It=!!P,jt=P?{minWidth:P.minWidth,maxWidth:P.maxWidth}:{},wn=P?{minHeight:P.minHeight,maxHeight:P.maxHeight}:{};return o.jsx("div",{className:`tree-table-container ${re}`,style:ae,children:o.jsxs("div",{className:`tree-table${It?" tree-table-scrollable":""}`,children:[It?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"tree-table-header-wrapper",ref:cn,onScroll:pn,children:o.jsx("div",{className:`tree-table-head ${Se}`,style:jt,children:At()})}),o.jsx("div",{className:"tree-table-body-wrapper",ref:dn,style:wn,onScroll:un,children:o.jsx("div",{className:"tree-table-body",style:jt,children:Rt()})})]}):o.jsx("div",{className:"tree-table-scroll-wrapper",children:o.jsxs("div",{className:"tree-table-content",children:[o.jsx("div",{className:`tree-table-head ${Se}`,children:At()}),o.jsx("div",{className:"tree-table-body",children:Rt()})]})}),w&&o.jsx("div",{className:"tree-table-footer",children:w})]})})}const B=u.forwardRef(Gn);B.__docgenInfo={description:"",methods:[{name:"getData",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TreeTable",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"树形数据"},defaultExpandedKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"默认展开的节点ID列表"},defaultExpandAll:{required:!1,tsType:{name:"boolean"},description:"默认全部展开"},columns:{required:!0,tsType:{name:"Array",elements:[{name:"ColumnDef",elements:[{name:"T"}],raw:"ColumnDef<T>"}],raw:"ColumnDef<T>[]"},description:"列定义"},showActions:{required:!1,tsType:{name:"boolean"},description:"是否显示操作列"},actionsWidth:{required:!1,tsType:{name:"number"},description:"操作列宽度"},actionsPosition:{required:!1,tsType:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}]},description:"操作列位置"},showDragHandle:{required:!1,tsType:{name:"boolean"},description:"显示拖拽手柄"},showExpandButton:{required:!1,tsType:{name:"boolean"},description:"显示展开按钮"},showAddButton:{required:!1,tsType:{name:"boolean"},description:"显示添加子节点按钮"},showDeleteButton:{required:!1,tsType:{name:"boolean"},description:"显示删除按钮"},customActions:{required:!1,tsType:{name:"Array",elements:[{name:"ActionButton",elements:[{name:"T"}],raw:"ActionButton<T>"}],raw:"ActionButton<T>[]"},description:"自定义操作按钮"},expandIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义展开图标"},collapseIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义收起图标"},addIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义添加子节点图标"},deleteIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义删除图标"},localeText:{required:!1,tsType:{name:"LocaleText"},description:"内置文案配置"},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"自定义底部内容"},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: T[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"T"}],raw:"T[]"},name:"data"}],return:{name:"void"}}},description:"数据变化回调"},onAdd:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentId: string | null) => T | void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"parentId"}],return:{name:"union",raw:"T | void",elements:[{name:"T"},{name:"void"}]}}},description:"添加节点回调 - 返回新节点或自行处理"},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T) => boolean | void",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"union",raw:"boolean | void",elements:[{name:"boolean"},{name:"void"}]}}},description:"删除节点回调 - 返回 false 阻止删除"},onNodeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T, field: string, value: unknown) => void",signature:{arguments:[{type:{name:"T"},name:"node"},{type:{name:"string"},name:"field"},{type:{name:"unknown"},name:"value"}],return:{name:"void"}}},description:"节点字段变化回调"},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: T, expanded: boolean) => void",signature:{arguments:[{type:{name:"T"},name:"node"},{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"展开/收起回调"},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:"(info: DropInfo<T>) => void",signature:{arguments:[{type:{name:"DropInfo",elements:[{name:"T"}],raw:"DropInfo<T>"},name:"info"}],return:{name:"void"}}},description:"拖拽完成回调"},draggable:{required:!1,tsType:{name:"union",raw:"boolean | DragConfig<T>",elements:[{name:"boolean"},{name:"DragConfig",elements:[{name:"T"}],raw:"DragConfig<T>"}]},description:"拖拽配置"},resizable:{required:!1,tsType:{name:"boolean"},description:"是否启用列宽调整（全局开关，默认 false）"},onColumnResize:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: string, width: number) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"number"},name:"width"}],return:{name:"void"}}},description:"列宽变化回调"},scroll:{required:!1,tsType:{name:"ScrollConfig"},description:"滚动配置，启用后表头固定，表体可滚动"},className:{required:!1,tsType:{name:"string"},description:"容器类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"容器样式"},rowClassName:{required:!1,tsType:{name:"union",raw:"string | ((node: T, index: number) => string)",elements:[{name:"string"},{name:"unknown"}]},description:"行类名"},rowStyle:{required:!1,tsType:{name:"union",raw:"React.CSSProperties | ((node: T, index: number) => React.CSSProperties)",elements:[{name:"ReactCSSProperties",raw:"React.CSSProperties"},{name:"unknown"}]},description:"行样式"},headerClassName:{required:!1,tsType:{name:"string"},description:"表头类名"},indentSize:{required:!1,tsType:{name:"number"},description:"缩进大小"},rowHeight:{required:!1,tsType:{name:"number"},description:"行高"},showTreeLine:{required:!1,tsType:{name:"boolean"},description:"是否显示树形层级竖线"},emptyText:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"空状态文案"}}};const ut=[{label:"boolean",value:"boolean"},{label:"string",value:"string"},{label:"object",value:"object"},{label:"array[object]",value:"array[object]"},{label:"int64",value:"int64"},{label:"int32",value:"int32"},{label:"float",value:"float"},{label:"double",value:"double"}],j=e=>[{id:"1",name:"success",type:"boolean",required:!0,defaultValue:"true",description:e?"是否成功":"Whether the request succeeds"},{id:"2",name:"message",type:"string",required:!0,defaultValue:"ok",description:e?"错误或成功提示":"Error or success message"},{id:"3",name:"data",type:"object",required:!0,defaultValue:"",description:e?"数据对象":"Payload object",children:[{id:"3-1",name:"items",type:"array[object]",required:!0,defaultValue:"",description:e?"数据列表":"List of items",children:[{id:"3-1-1",name:"id",type:"int64",required:!0,defaultValue:"",description:e?"ID":"Item ID"},{id:"3-1-2",name:"name",type:"string",required:!0,defaultValue:"",description:e?"名称":"Item name"}]}]}],ne=e=>[{key:"name",title:e?"名称":"Name",flex:2,minWidth:180,render:(t,n,r)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof t=="string"?t:"",placeholder:e?"请输入名称":"Enter name",onChange:a=>r(a.target.value)})},{key:"type",title:e?"类型":"Type",width:140,render:(t,n,r)=>o.jsx("select",{className:"tree-table-select",value:typeof t=="string"?t:"",onChange:a=>r(a.target.value),children:ut.map(a=>o.jsx("option",{value:a.value,children:a.label},a.value))})},{key:"required",title:e?"必填":"Required",width:80,align:"center",render:(t,n,r)=>o.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!t,onChange:a=>r(a.target.checked)})},{key:"defaultValue",title:e?"默认值":"Default",width:120,render:(t,n,r)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof t=="string"?t:"",placeholder:e?"默认值":"Default value",onChange:a=>r(a.target.value)})},{key:"description",title:e?"描述":"Description",flex:1.5,minWidth:180,render:(t,n,r)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof t=="string"?t:"",placeholder:e?"请输入描述":"Enter description",onChange:a=>r(a.target.value)})}],X=e=>e?{dragHandleTitle:"拖拽排序",addChildTitle:"添加子节点",deleteNodeTitle:"删除节点"}:{dragHandleTitle:"Drag to sort",addChildTitle:"Add child",deleteNodeTitle:"Delete node"},Q=e=>({id:`node-${Date.now()}`,name:e?"新字段":"newField",type:"string",required:!1,defaultValue:"",description:e?"描述":""}),Qn={title:"Components/TreeTable",component:B,parameters:{layout:"padded",docs:{description:{component:`
## Install

\`\`\`bash
pnpm add @kfb/tree-table
\`\`\`

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
        `}}},tags:["autodocs"],argTypes:{data:{description:"Tree data source",control:"object"},columns:{description:"Column definitions",control:"object"},draggable:{description:"Enable drag-and-drop",control:"boolean"},resizable:{description:"Enable column resizing",control:"boolean"},showActions:{description:"Show action column",control:"boolean"},defaultExpandAll:{description:"Expand all by default",control:"boolean"},indentSize:{description:"Indent size (px)",control:{type:"number",min:0,max:50}}}},pe={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,a]=u.useState(()=>j(n)),s=ne(n),i=X(n);return u.useEffect(()=>{a(j(n))},[n]),o.jsx(B,{data:r,columns:s,localeText:i,onChange:a,onAdd:()=>Q(n),showActions:!0,defaultExpandedKeys:["3","3-1"]})}},he={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,a]=u.useState(()=>j(n)),s=ne(n),i=X(n);return u.useEffect(()=>{a(j(n))},[n]),o.jsx(B,{data:r,columns:s,localeText:i,onChange:a,onAdd:()=>Q(n),draggable:!0,showActions:!0,defaultExpandedKeys:["3","3-1"]})}},fe={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,a]=u.useState(()=>j(n)),s=ne(n),i=X(n);return u.useEffect(()=>{a(j(n))},[n]),o.jsx(B,{data:r,columns:s,localeText:i,onChange:a,onAdd:()=>Q(n),resizable:!0,showActions:!0,defaultExpandedKeys:["3","3-1"]})}},ge={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,a]=u.useState(()=>j(n)),s=ne(n),i=X(n);return u.useEffect(()=>{a(j(n))},[n]),o.jsx(B,{data:r,columns:s,localeText:i,onChange:a,onAdd:()=>Q(n),showActions:!0,defaultExpandedKeys:["3","3-1"],scroll:{maxHeight:300,minWidth:900}})}},me={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,a]=u.useState(()=>j(n)),s=ne(n),i=X(n);return u.useEffect(()=>{a(j(n))},[n]),o.jsx(B,{data:r,columns:s,localeText:i,onChange:a,onAdd:()=>Q(n),showActions:!0,defaultExpandedKeys:["3","3-1"],expandIcon:"➕",collapseIcon:"➖",addIcon:"✨",deleteIcon:"❌"})}},ye={render:(e,{globals:t})=>{const n=t.locale==="zh",r=ne(n),a=X(n),s=()=>{const h=[];for(let c=0;c<100;c++){const f={id:`node-${c}`,name:`field_${c}`,type:c%2===0?"string":"object",required:c%3===0,defaultValue:`value_${c}`,description:n?`第 ${c} 个字段的描述`:`Description for field ${c}`};if(c%5===0&&c<50){f.children=[];for(let g=0;g<10;g++)f.children.push({id:`node-${c}-${g}`,name:`child_${c}_${g}`,type:"string",required:!1,defaultValue:"",description:n?`子字段 ${g}`:`Child field ${g}`})}h.push(f)}return h},[i,d]=u.useState(s);return u.useEffect(()=>{d(s())},[n]),o.jsxs("div",{children:[o.jsxs("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px"},children:[o.jsx("strong",{children:n?"提示：":"Tip:"}),n?"虚拟滚动只渲染可见行以提升性能。":"Virtual scroll only renders visible rows to improve performance.",n?" 当前根节点数：":" Current root nodes: ",i.length]}),o.jsx(B,{data:i,columns:r,localeText:a,onChange:d,onAdd:()=>Q(n),showActions:!0,defaultExpandAll:!0,scroll:{maxHeight:500,minWidth:900,virtual:!0,rowHeight:40,overscan:5}})]})}},xe={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,a]=u.useState(()=>j(n)),[s,i]=u.useState(!0),d=ne(n),h=X(n);return u.useEffect(()=>{a(j(n))},[n]),o.jsxs("div",{children:[o.jsx("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px",display:"flex",alignItems:"center",gap:"8px"},children:o.jsxs("label",{children:[o.jsx("input",{type:"checkbox",checked:s,onChange:c=>i(c.target.checked)}),o.jsx("span",{style:{marginLeft:"4px"},children:n?"显示层级竖线":"Show tree guide lines"})]})}),o.jsx(B,{data:r,columns:d,localeText:h,onChange:a,onAdd:()=>Q(n),showActions:!0,showTreeLine:s,defaultExpandedKeys:["3","3-1"]})]})}},be={render:(e,{globals:t})=>{const n=t.locale==="zh",[r,a]=u.useState(()=>j(n)),s=X(n);u.useEffect(()=>{a(j(n))},[n]);const i=[{key:"name",title:n?"名称":"Name",width:180,sticky:"left",render:(d,h,c)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof d=="string"?d:"",placeholder:n?"请输入名称":"Enter name",onChange:f=>c(f.target.value)})},{key:"type",title:n?"类型":"Type",width:140,render:(d,h,c)=>o.jsx("select",{className:"tree-table-select",value:typeof d=="string"?d:"",onChange:f=>c(f.target.value),children:ut.map(f=>o.jsx("option",{value:f.value,children:f.label},f.value))})},{key:"required",title:n?"必填":"Required",width:80,align:"center",render:(d,h,c)=>o.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!d,onChange:f=>c(f.target.checked)})},{key:"defaultValue",title:n?"默认值":"Default",width:120,render:(d,h,c)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof d=="string"?d:"",placeholder:n?"默认值":"Default value",onChange:f=>c(f.target.value)})},{key:"description",title:n?"描述":"Description",width:200,sticky:"right",render:(d,h,c)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof d=="string"?d:"",placeholder:n?"请输入描述":"Enter description",onChange:f=>c(f.target.value)})}];return o.jsxs("div",{children:[o.jsxs("div",{style:{marginBottom:"12px",padding:"8px",background:"#f0f0f0",borderRadius:"4px"},children:[o.jsx("strong",{children:n?"提示：":"Tip:"})," ",n?"名称列左侧固定，描述列右侧固定，操作列保持可见。横向滚动查看效果。":"Name column is pinned left, description pinned right, and the action column stays visible. Scroll horizontally to see the effect."]}),o.jsx("div",{style:{width:"600px",border:"2px solid #1890ff",overflow:"auto"},children:o.jsx(B,{data:r,columns:i,localeText:s,onChange:a,onAdd:()=>Q(n),showActions:!0,actionsPosition:"start",defaultExpandedKeys:["3","3-1"],scroll:{maxHeight:400,minWidth:900}})})]})}},ve={render:(e,{globals:t})=>{const n=t.locale==="zh",r=(l,y)=>n?l:y,[a,s]=u.useState(()=>j(n)),i=u.useRef(null),[d,h]=u.useState(!0),[c,f]=u.useState("start"),[g,_]=u.useState(20),E=X(n);u.useEffect(()=>{s(j(n))},[n]);const I=()=>({id:`node-${Date.now()}`,name:r("新字段","newField"),type:"string",required:!0,defaultValue:"",description:r("新增字段","New field")}),S=[{key:"name",title:r("名称","Name"),width:180,minWidth:120,maxWidth:300,sticky:"left",resizable:!0,render:(l,y,b)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof l=="string"?l:"",placeholder:r("请输入名称","Enter name"),onChange:w=>b(w.target.value)})},{key:"type",title:r("类型","Type"),width:140,minWidth:100,resizable:!0,render:(l,y,b)=>o.jsx("select",{className:"tree-table-select",value:typeof l=="string"?l:"",onChange:w=>b(w.target.value),children:ut.map(w=>o.jsx("option",{value:w.value,children:w.label},w.value))})},{key:"required",title:r("必填","Required"),width:80,align:"center",render:(l,y,b)=>o.jsx("input",{type:"checkbox",className:"tree-table-checkbox",checked:!!l,onChange:w=>b(w.target.checked)})},{key:"defaultValue",title:r("默认值","Default"),width:150,minWidth:100,resizable:!0,render:(l,y,b)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof l=="string"?l:"",placeholder:r("默认值","Default value"),onChange:w=>b(w.target.value)})},{key:"description",title:r("描述","Description"),width:200,minWidth:150,sticky:"right",resizable:!0,render:(l,y,b)=>o.jsx("input",{type:"text",className:"tree-table-input",value:typeof l=="string"?l:"",placeholder:r("请输入描述","Enter description"),onChange:w=>b(w.target.value)})}];return o.jsxs("div",{style:{padding:"20px"},children:[o.jsxs("div",{style:{marginBottom:"16px",padding:"16px",background:"#f5f5f5",borderRadius:"8px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"12px"},children:[o.jsx("div",{children:o.jsxs("strong",{style:{display:"block",marginBottom:"8px"},children:["🎛️ ",r("控制面板","Controls")]})}),o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:o.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[o.jsx("input",{type:"checkbox",checked:d,onChange:l=>h(l.target.checked)}),r("显示层级线","Show tree lines")]})}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("label",{children:r("操作列位置：","Actions column position:")}),o.jsxs("select",{value:c,onChange:l=>f(l.target.value),style:{padding:"4px 8px"},children:[o.jsx("option",{value:"start",children:r("左侧","Left")}),o.jsx("option",{value:"end",children:r("右侧","Right")})]})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("label",{children:r("缩进大小：","Indent size:")}),o.jsx("input",{type:"range",min:"10",max:"40",value:g,onChange:l=>_(Number(l.target.value)),style:{width:"100px"}}),o.jsxs("span",{children:[g,"px"]})]})]}),o.jsxs("div",{style:{marginBottom:"16px",padding:"16px",background:"#e6f7ff",borderRadius:"8px",border:"1px solid #91d5ff"},children:[o.jsx("strong",{style:{display:"block",marginBottom:"8px"},children:r("✨ 本示例包含的所有功能：","✨ Features included in this demo:")}),o.jsxs("ul",{style:{margin:0,paddingLeft:"20px",lineHeight:"1.8"},children:[o.jsxs("li",{children:[o.jsx("strong",{children:r("数据管理：","Data management:")})," ",r("支持添加、删除、编辑节点","add, delete, and edit nodes")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("拖拽排序：","Drag-and-drop:")})," ",r("拖动行可调整顺序和层级关系","reorder rows and levels")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("列宽调整：","Resizable columns:")})," ",r("拖动列边框可调整列宽","drag borders to resize")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("列固定：","Sticky columns:")})," ",r("名称列左侧固定，描述列右侧固定","name pinned left, description pinned right")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("虚拟滚动：","Virtual scroll:")})," ",r("表头固定，表体可滚动（横向和纵向）","sticky header with horizontal/vertical scrolling")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("树形层级：","Tree lines:")})," ",r("支持多层嵌套，显示层级线条","multi-level nesting with guide lines")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("自定义渲染：","Custom render:")})," ",r("每列都可自定义渲染组件","every column supports custom components")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("自定义操作：","Custom actions:")})," ",r("支持自定义操作按钮","add your own action buttons")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("自定义图标：","Custom icons:")})," ",r("展开/收起、添加、删除图标可自定义","expand/collapse/add/delete icons configurable")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("样式定制：","Styling:")})," ",r("支持自定义类名、样式、行样式等","custom class names, styles, and row styles")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("事件回调：","Callbacks:")})," ",r("完整的生命周期回调","full lifecycle callbacks")]}),o.jsxs("li",{children:[o.jsx("strong",{children:r("Ref 方法：","Ref methods:")})," ",r("通过 ref 调用组件方法","call component methods via ref")]})]})]}),o.jsx("div",{style:{border:"2px solid #1890ff",borderRadius:"8px",overflow:"hidden"},children:o.jsx(B,{ref:i,data:a,defaultExpandedKeys:["3","3-1"],columns:S,showActions:!0,actionsWidth:120,actionsPosition:c,showDragHandle:!0,showExpandButton:!0,showAddButton:!0,showDeleteButton:!0,customActions:[{key:"copy",icon:"📋",title:r("复制节点","Copy node"),onClick:l=>{const y={...l,id:`node-${Date.now()}`,name:`${l.name}_copy`};i.current?.addSiblingNode(y,l.id)},visible:()=>!0},{key:"info",icon:"ℹ️",title:r("查看详情","View details"),onClick:l=>{alert(r(`节点信息：
ID: ${l.id}
名称: ${l.name}
类型: ${l.type}`,`Node info:
ID: ${l.id}
Name: ${l.name}
Type: ${l.type}`))}}],expandIcon:"➕",collapseIcon:"➖",addIcon:"✨",deleteIcon:"🗑️",localeText:E,footer:o.jsxs("div",{style:{display:"flex",gap:"8px",padding:"12px",background:"#fafafa",borderTop:"1px solid #d9d9d9"},children:[o.jsx("button",{onClick:()=>i.current?.addRootNode(I()),style:{padding:"6px 12px",cursor:"pointer"},children:r("➕ 添加根节点","➕ Add root")}),o.jsx("button",{onClick:()=>i.current?.expandAll(),style:{padding:"6px 12px",cursor:"pointer"},children:r("📂 展开全部","📂 Expand all")}),o.jsx("button",{onClick:()=>i.current?.collapseAll(),style:{padding:"6px 12px",cursor:"pointer"},children:r("📁 收起全部","📁 Collapse all")}),o.jsx("button",{onClick:()=>{const l=i.current?.getData();console.log("Current data:",l),alert(r(`数据已输出到控制台，共 ${l?.length} 个根节点`,`Data printed to console, ${l?.length} root nodes`))},style:{padding:"6px 12px",cursor:"pointer"},children:r("📊 导出数据","📊 Export data")})]}),onChange:l=>{console.log("Data changed:",l),s(l)},onAdd:l=>(console.log("Add node, parent ID:",l),I()),onDelete:l=>(console.log("Delete node:",l),window.confirm(r(`确定要删除节点 "${l.name}" 吗？`,`Delete node "${l.name}"?`))),onNodeChange:(l,y,b)=>{console.log("Node field changed:",{node:l,field:y,value:b})},onExpand:(l,y)=>{console.log(`Node ${y?"expanded":"collapsed"}:`,l)},onDrop:l=>{console.log("Drag finished:",l)},draggable:{enabled:!0,allowDrop:(l,y,b)=>(console.log("Drag check:",{dragNode:l,dropNode:y,position:b}),!0),onDragStart:l=>{console.log("Drag start:",l)},onDragEnd:l=>{console.log("Drag end:",l)}},resizable:!0,onColumnResize:(l,y)=>{console.log("Column resized:",{key:l,width:y})},scroll:{maxHeight:500,minHeight:300,minWidth:1e3,virtual:!1,onScrollBottom:()=>{console.log("Reached bottom")},scrollBottomThreshold:50,onScrollRight:()=>{console.log("Reached right edge")},scrollRightThreshold:50},className:"full-feature-table",style:{fontSize:"14px"},rowClassName:(l,y)=>y%2===0?"even-row":"odd-row",rowStyle:(l,y)=>({fontWeight:l.depth===0?"bold":"normal"}),headerClassName:"custom-header",indentSize:g,showTreeLine:d,emptyText:o.jsxs("div",{style:{padding:"40px",textAlign:"center",color:"#999"},children:[o.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"📭"}),o.jsx("div",{children:r("暂无数据，使用下方按钮添加行","No data yet, use the buttons below to add rows")})]})})}),o.jsxs("div",{style:{marginTop:"16px",padding:"16px",background:"#f5f5f5",borderRadius:"8px",maxHeight:"200px",overflow:"auto"},children:[o.jsx("strong",{style:{display:"block",marginBottom:"8px"},children:r("📝 当前数据（JSON）：","📝 Current data (JSON):")}),o.jsx("pre",{style:{margin:0,fontSize:"12px",lineHeight:"1.5",whiteSpace:"pre-wrap",wordBreak:"break-all"},children:JSON.stringify(a,null,2)})]})]})}};pe.parameters={...pe.parameters,docs:{...pe.parameters?.docs,source:{originalSource:`{
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
}`,...fe.parameters?.docs?.source},description:{story:"Column resizing - drag column borders to resize",...fe.parameters?.docs?.description}}};ge.parameters={...ge.parameters,docs:{...ge.parameters?.docs,source:{originalSource:`{
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
}`,...ge.parameters?.docs?.source},description:{story:"Scroll configuration - sticky header with scrollable body",...ge.parameters?.docs?.description}}};me.parameters={...me.parameters,docs:{...me.parameters?.docs,source:{originalSource:`{
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
}`,...me.parameters?.docs?.source},description:{story:"Custom icons - override expand/collapse/add/delete icons",...me.parameters?.docs?.description}}};ye.parameters={...ye.parameters,docs:{...ye.parameters?.docs,source:{originalSource:`{
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
}`,...ve.parameters?.docs?.source},description:{story:"Full feature demo - showcases every capability",...ve.parameters?.docs?.description}}};const er=["Basic","WithDraggable","WithResizable","WithScroll","CustomIcons","VirtualScroll","WithTreeLine","StickyColumns","FullFeature"];export{pe as Basic,me as CustomIcons,ve as FullFeature,be as StickyColumns,ye as VirtualScroll,he as WithDraggable,fe as WithResizable,ge as WithScroll,xe as WithTreeLine,er as __namedExportsOrder,Qn as default};
