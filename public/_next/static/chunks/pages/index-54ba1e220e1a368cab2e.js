(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{6814:function(e,t,r){"use strict";function n(e){if(null==e)throw new TypeError("Cannot destructure undefined")}r.d(t,{Z:function(){return n}})},3957:function(e,t,r){"use strict";var n=r(5318),s=r(862);t.Z=void 0;var i=s(r(7294)),l=(0,n(r(2108)).default)(i.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=l},8995:function(e,t,r){"use strict";var n=r(5318),s=r(862);t.Z=void 0;var i=s(r(7294)),l=(0,n(r(2108)).default)(i.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.Z=l},1986:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(5893),s=r(1397),i=r(4184),l=r.n(i);function c(e){var t=e.className,r=e.children,i=(0,s.CG)((function(e){return e.layout.isSideDrawerOpen})),c=l()(t,"grid grid-cols-1  gap-5",{"xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4":!i},{"xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3":i});return(0,n.jsx)("div",{className:c,children:r})}function a(e){var t=e.name,r=e.className,s=e.children;return(0,n.jsxs)("div",{className:r,children:[(0,n.jsx)("h3",{className:"mb-2 text-lg font-medium",children:t}),(0,n.jsx)(c,{className:"mb-5",children:s})]})}},4357:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return C}});var n=r(5893),s=r(8995),i=r(1163),l=r(7294),c=r(4409),a=r(1397),o=r(4184),u=r.n(o);var f=function(){var e=(0,a.CG)((function(e){return e.layout.isSideDrawerOpen})),t=(0,i.useRouter)(),r=(0,l.useState)(t.query.filter||""),o=r[0],f=r[1],d=u()("flex-1  mb-3 text-2xl font-semibold text-trueGray-800 sm:mb-0 ",{"hidden md:block":!e},{"hidden lg:block":e}),m=u()("w-full mt-3 md:mt-0 ",{"md:w-72 lg:w-96 md:ml-4":!e},{"lg:w-52 xl:w-80 lg:ml-4":e});return(0,n.jsxs)("header",{className:"flex items-center w-full",children:[(0,n.jsxs)("h1",{className:d,children:[(0,n.jsx)("span",{className:"text-yellow-primary",children:"Shoppingify"})," allows you take your shopping list wherever you go"]}),(0,n.jsx)("div",{className:m,children:(0,n.jsx)(c.Z,{type:"search",className:"bg-white border-2 shadow-sm hover:border-gray-600 focus-within:border-gray-600 focus-within:shadow-md group ",inputClassName:"py-3 -ml-1 placeholder-gray-400 group-hover:placeholder-gray-600 group-focus-within:placeholder-gray-600",placeholder:"search item",leftElement:(0,n.jsx)(s.Z,{className:"z-10 ml-3 text-gray-400 group-hover:text-gray-600 group-focus-within:text-gray-600",fontSize:"medium"}),value:o,onChange:function(e){f(e.target.value),!e.target.value&&t.push("/")},onKeyPress:function(e){"Enter"===e.key&&(o&&t.push("/?filter="+o),!o&&t.push("/"))}})})]})},d=r(7876),m=r(1679),h=r(5477),p=r(6156),g=r(6814),y=r(2720),v=r(3957),x=r(155),w=r(9063),j=r(6215);function b(e){var t=e.item,r=(0,a.TL)();return(0,n.jsx)(w.Z,{leftElements:(0,n.jsx)("div",{className:"flex-1 mr-4",children:(0,n.jsx)(x.Z,{className:"w-full h-full font-medium text-left break-all hover:text-yellow-primary active:text-yellow-600/90",onClick:function(){r((0,y.Go)(t))},justify:"start",children:t.name})}),rightElements:(0,n.jsx)("div",{className:"w-5",children:(0,n.jsx)(x.Z,{className:"w-full h-full hover:text-yellow-primary active:text-yellow-600/90 group",onClick:function(){return r((0,j.gK)(t))},children:(0,n.jsx)(v.Z,{className:"font-medium text-gray-400 group-hover:text-yellow-primary"})})})})}var N=r(1986);function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){(0,p.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Z(e){(0,g.Z)(e);var t=(0,i.useRouter)(),r=(0,l.useState)(t.query.filter||""),s=r[0],c=r[1],o=(0,a.TL)(),u=(0,a.CG)((function(e){return e.products.status})),f=(0,a.CG)((function(e){return(0,y.T$)(e,s)})),d=(0,l.useState)([]),m=d[0],h=d[1];return(0,l.useEffect)((function(){var e=[];return f.forEach((function(t){var r=e.find((function(e){return e.name===t.category.name}));r&&r.items.push(t),!r&&e.push(E(E({},t.category),{},{items:[t]}))})),e.sort((function(e,t){return e.name.localeCompare(t.name)})),h([].concat(e)),function(){}}),[u,s,o]),(0,l.useEffect)((function(){var e;c(null!==(e=t.query.filter)&&void 0!==e?e:"")}),[t.query]),(0,l.useEffect)((function(){"idle"===u&&o((0,y.t2)())}),[u,o]),(0,n.jsx)("div",{className:"mt-4 sm:mt-6 md:mt-8",children:m.map((function(e){return(0,n.jsx)(N.Z,{name:e.name,children:e.items.map((function(e){return(0,n.jsx)(b,{item:e},e._id)}))},e._id)}))})}function C(){return(0,m.Z)().isLoading?(0,n.jsx)("div",{className:"fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white",children:(0,n.jsx)(h.Z,{classes:{circle:"text-yellow-primary"}})}):(0,n.jsx)(d.Z,{children:(0,n.jsxs)("div",{className:"p-2 sm:p-4 md:p-6",children:[(0,n.jsx)(f,{}),(0,n.jsx)(Z,{})]})})}},5301:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(4357)}])}},function(e){e.O(0,[624,564,521,346,774,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);