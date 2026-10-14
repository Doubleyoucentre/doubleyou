/** Public destination only. Preserve existing giving until the reviewed standalone release is enabled. */
export function hallOfFameDestination(value:string|undefined,ready:string|undefined){
  if(ready!=='true'||!value)return null
  try{const url=new URL(value);return url.protocol==='https:'&&url.origin===value&&!url.username&&!url.password&&!/^(localhost|127\.|\[::1\])/.test(url.hostname)&&!url.hostname.endsWith('.localhost')&&!url.hostname.includes('african-impact-hall-of-fame-preview')?url.origin:null}catch{return null}
}
