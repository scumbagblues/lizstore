import{r as e,j as d}from"./app-Dye-FGA5.js";const i=e.forwardRef(function({type:s="text",className:a="",isFocused:t=!1,...n},u){const o=e.useRef(null);return e.useImperativeHandle(u,()=>({focus:()=>{var r;return(r=o.current)==null?void 0:r.focus()}})),e.useEffect(()=>{var r;t&&((r=o.current)==null||r.focus())},[t]),d.jsx("input",{...n,type:s,className:"rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "+a,ref:o})});export{i as T};