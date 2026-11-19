import { spawn } from "node:child_process";
import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, relative } from "node:path";
import { createHash } from "node:crypto";
const prototype=fileURLToPath(new URL("../",import.meta.url));
const root=resolve(prototype,"../..");
const output=resolve(root,"docs/sprint-2-evidence/ozgur");
await mkdir(resolve(output,"logs"),{recursive:true});
await writeFile(resolve(output,"verification.json"),JSON.stringify({date:"2026-11-19",status:"RUNNING"},null,2)+"\n");
const results=[];
const python=process.env.PROTOTYPE_PYTHON||resolve(root,".tools/sprint2-python/Scripts/python.exe");
const run=async(name,cmd,args,cwd=prototype,optional=false)=>{
  const started=new Date().toISOString();
  let stdout="",stderr="";
  const code=await new Promise(resolveCode=>{
    const child=spawn(cmd,args,{cwd,env:{...process.env,REDOCLY_TELEMETRY:"off"}});
    child.stdout.on("data",chunk=>{stdout+=chunk;});child.stderr.on("data",chunk=>{stderr+=chunk;});
    child.on("error",e=>{stderr+=e.message;resolveCode(-1);});child.on("exit",c=>resolveCode(c??-1));
  });
  await writeFile(resolve(output,"logs",`${name}.txt`),`cwd: ${relative(root,cwd)||"."}\ncommand: ${relative(root,cmd)||cmd} ${args.join(" ")}\nexit: ${code}\n\n${stdout}\n${stderr}`.trimEnd()+"\n");
  results.push({name,command:[relative(root,cmd)||cmd,...args],cwd:relative(root,cwd)||".",started,finished:new Date().toISOString(),exitCode:code,status:code===0?"PASS":optional?"BLOCKED":"FAIL",log:`logs/${name}.txt`});
  console.log(`${name}: ${results.at(-1).status}`);
  if(code!==0&&!optional)throw new Error(`${name} failed: ${stdout}\n${stderr}`);
};
let error;
try{
  await run("prototype-lint",process.execPath,["node_modules/eslint/bin/eslint.js","."]);
  await run("prototype-typecheck",process.execPath,["node_modules/typescript/bin/tsc","--noEmit"]);
  await run("prototype-build",process.execPath,["node_modules/vite/bin/vite.js","build"]);
  await run("prototype-browser",process.execPath,["scripts/run-browser.mjs"]);
  const browser=JSON.parse(await readFile(resolve(prototype,"test-results/browser-results.json"),"utf8"));
  await writeFile(resolve(output,"browser-summary.json"),JSON.stringify({date:"2026-11-19",engine:"Playwright 1.56.1 / Microsoft Edge",stats:browser.stats,projects:browser.config.projects.map(p=>({name:p.name,viewport:p.use?.viewport})),note:"WCAG 2 A/AA + WCAG 2.1 AA axe kontrolleri; gerçek Figma veya üretim güvenliği denetimi değildir."},null,2)+"\n");
  await run("mermaid",process.execPath,["scripts/validate-diagrams.mjs"]);
  await run("screens",process.execPath,["scripts/capture.mjs"]);
  await run("prototype-unit-docs",process.execPath,["--test","tests/model.test.ts","tests/docs.test.ts"]);
  await run("production-typecheck",process.execPath,["node_modules/typescript/bin/tsc","--noEmit"],resolve(root,"frontend"));
  await run("production-build",process.execPath,["node_modules/vite/bin/vite.js","build"],resolve(root,"frontend"));
  await run("contract-lint",process.execPath,["node_modules/@redocly/cli/bin/cli.js","lint","../../api/openapi.yaml","--config","redocly.yaml","--max-problems","50"],resolve(root,"tools/contract"));
  await run("contract-tests",process.execPath,["--test","validation.test.cjs"],resolve(root,"tools/contract"));
  await run("backend-tests",python,["-m","pytest","--cov=app","--cov-report=term-missing","--cov-fail-under=50","--basetemp=../.audit/sprint2-pytest-final"],resolve(root,"backend"));
  await run("compose-smoke",python,["scripts/compose_smoke.py"],root,true);
  await run("diff-check","git",["diff","--check"],root);
}catch(e){error=e;}
const hash=createHash("sha256");
async function fingerprint(dir){for(const e of(await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const p=resolve(dir,e.name);if(e.isDirectory())await fingerprint(p);else{hash.update(relative(root,p).replaceAll("\\","/"));hash.update((await readFile(p,"utf8")).replace(/\r\n/g,"\n"));}}}
for(const dir of ["src","tests","scripts","handoff"])await fingerprint(resolve(prototype,dir));
for(const f of ["package.json","package-lock.json","index.html","tsconfig.json","playwright.config.ts","eslint.config.js","vite.config.ts"])hash.update((await readFile(resolve(prototype,f),"utf8")).replace(/\r\n/g,"\n"));
await writeFile(resolve(output,"verification.json"),JSON.stringify({date:"2026-11-19",platform:process.platform,node:process.version,sourceBaseline:"d0abe1745f685333ff3073ecd112ea829cdcccfe",prototypeSourceSha256:hash.digest("hex"),results,limitations:["PostgreSQL integration skipped: isolated BOOTSTRAP_TEST_DATABASE_URL not supplied.","Docker daemon unavailable; Compose smoke blocked locally.","Figma/Lovable not connected; no external artifact/import/reviewer-access verification.","Local automated checks are not teammate acceptance or GitHub CI."],completedWithoutFailure:!error},null,2)+"\n");
if(error)throw error;
