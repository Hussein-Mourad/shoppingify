(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[276],{6814:function(e,t,n){"use strict";function r(e){if(null==e)throw new TypeError("Cannot destructure undefined")}n.d(t,{Z:function(){return r}})},1197:function(e,t,n){"use strict";var r=n(5318),s=n(862);t.Z=void 0;var i=s(n(7294)),a=(0,r(n(2108)).default)(i.createElement("path",{d:"M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"}),"ArrowForwardIos");t.Z=a},9260:function(e,t,n){"use strict";var r=n(5318),s=n(862);t.Z=void 0;var i=s(n(7294)),a=(0,r(n(2108)).default)(i.createElement("path",{d:"M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z"}),"EventNote");t.Z=a},7002:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r=n(5893),s=n(1917),i=n(1679),a=n(5477),c=n(7757),l=n.n(c),u=n(2137),o=n(6814),d=n(9669),m=n.n(d),f=n(7294),h=n(1197),x=n(9260),p=n(4184),v=n.n(p),w=n(9063),g=n(1163),y=n(9646);function j(e){var t=e.className,n=void 0===t?"":t,s=e.shoppingList,i=(0,g.useRouter)(),a=v()("inline-flex items-center justify-center px-2 py-1 mr-2 sm:mr-5 border rounded-lg text-sm ",{"border-lightBlue-400 text-lightBlue-400":"completed"===s.status},{"border-red-400 text-red-400":"cancelled"===s.status},{"border-green-400 text-green-400":"current"===s.status});return(0,r.jsx)("button",{className:"".concat(n," w-full text-left rounded-xl"),onClick:function(e){return i.push("/history/"+s._id)},children:(0,r.jsx)(w.Z,{className:"items-center justify-between w-full",leftElements:(0,r.jsx)("div",{className:"flex-1",children:(0,r.jsx)("p",{children:s.name})}),rightElements:(0,r.jsxs)("div",{className:"flex items-center justify-end",children:[(0,r.jsxs)("div",{className:"items-center hidden mr-2 text-sm text-gray-400 xs:flex sm:mr-5",children:[(0,r.jsx)(x.Z,{fontSize:"small"}),(0,r.jsx)("p",{className:"ml-2 font-semibold",children:(0,y.Z)(new Date(s.createdAt))})]}),(0,r.jsx)("div",{className:a,children:s.status}),(0,r.jsx)("span",{className:"p-1 rounded-md text-yellow-primary hover:text-yellow-600/80 active:text-yellow-600 focus:text-yellow-600/80 focus:ring-2 focus:ring-yellow-600/80",children:(0,r.jsx)(h.Z,{fontSize:"small"})})]})})})}function N(e){(0,o.Z)(e);var t=(0,f.useState)([]),n=t[0],s=t[1],i=(0,f.useState)(null),c=(i[0],i[1]),d=(0,f.useState)(!0),h=d[0],x=d[1],p=function(e,t){var n=(0,f.useState)([]),r=n[0],s=n[1];return t||(t=e),(0,f.useEffect)((function(){var t=[];return e.forEach((function(e){var n=t.find((function(t){var n,r;return(null===t||void 0===t||null===(n=t.date)||void 0===n?void 0:n.getMonth())==new Date(e.createdAt).getMonth()&&(null===t||void 0===t||null===(r=t.date)||void 0===r?void 0:r.getFullYear())==new Date(e.createdAt).getFullYear()}));n&&n.shoppingLists.push(e),!n&&t.push({date:new Date(e.createdAt),shoppingLists:[e]})})),s([].concat(t)),function(){}}),[t]),r}(n),v=["January","February","March","April","May","June","July","August","September","October","November","December"];return(0,f.useEffect)((function(){return(0,u.Z)(l().mark((function e(){var t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m().get("api/shoppinglists/");case 3:t=e.sent,s(t.data.shoppingLists),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),c("Couldn't find items.");case 10:x(!1);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))(),function(){}}),[]),h?(0,r.jsx)("div",{className:"absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-white",children:(0,r.jsx)(a.Z,{classes:{circle:"text-yellow-primary"}})}):0==p.length?(0,r.jsx)("div",{className:"flex items-center justify-center w-full h-72 text-red-500/90",children:"No data found."}):(0,r.jsx)("div",{children:p&&p.map((function(e){return(0,r.jsxs)("div",{className:"mt-8 mb-6",children:[(0,r.jsx)("h2",{className:"my-3 text-sm font-medium",children:v[e.date.getMonth()]+" "+e.date.getFullYear()}),e.shoppingLists.map((function(e){return(0,r.jsx)(j,{className:"mb-3",shoppingList:e},e._id)}))]},e.date.toString())}))})}function b(){var e=(0,i.Z)();e.user;return e.isLoading?(0,r.jsx)("div",{className:"fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white",children:(0,r.jsx)(a.Z,{classes:{circle:"text-yellow-primary"}})}):(0,r.jsx)(s.Z,{children:(0,r.jsxs)("div",{className:"min-h-screen p-2 sm:p-4 md:p-6",children:[(0,r.jsx)("h1",{className:"mb-3 text-2xl font-semibold sm:mb-5 text-trueGray-700",children:"Shopping history"}),(0,r.jsx)(N,{})]})})}},9646:function(e,t,n){"use strict";function r(e){var t=new Intl.DateTimeFormat("en",{weekday:"short"}).format(e),n=new Intl.DateTimeFormat("en",{day:"2-digit"}).format(e),r=new Intl.DateTimeFormat("en",{month:"numeric"}).format(e),s=new Intl.DateTimeFormat("en",{year:"numeric"}).format(e);return"".concat(t," ").concat(n,"/").concat(r,"/").concat(s)}n.d(t,{Z:function(){return r}})},2727:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/history",function(){return n(7002)}])}},function(e){e.O(0,[624,564,521,322,774,888,179],(function(){return t=2727,e(e.s=t);var t}));var t=e.O();_N_E=t}]);