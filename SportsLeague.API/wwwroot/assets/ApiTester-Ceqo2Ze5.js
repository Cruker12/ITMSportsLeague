import{r as e}from"./rolldown-runtime-hePW80VL.js";import{n as t,o as n}from"./index-UTrhCtud.js";import{t as r}from"./client-GZv8jg-8.js";var i=e(n(),1),a=t(),o=[{method:`GET`,path:`/api/team`,description:`Listar equipos`,group:`Teams`,params:[{name:`page`,type:`query`,description:`Pagina`},{name:`pageSize`,type:`query`,description:`Tamaño de pagina`}]},{method:`GET`,path:`/api/team/{id}`,description:`Obtener equipo por ID`,group:`Teams`,params:[{name:`id`,type:`path`,required:!0,description:`ID del equipo`}]},{method:`POST`,path:`/api/team`,description:`Crear equipo`,group:`Teams`,bodyTemplate:`{
  "name": "",
  "city": "",
  "stadium": "",
  "foundedDate": "2020-01-01"
}`},{method:`PUT`,path:`/api/team/{id}`,description:`Actualizar equipo`,group:`Teams`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "name": "",
  "city": "",
  "stadium": "",
  "foundedDate": "2020-01-01"
}`},{method:`DELETE`,path:`/api/team/{id}`,description:`Eliminar equipo`,group:`Teams`,params:[{name:`id`,type:`path`,required:!0}]},{method:`GET`,path:`/api/player`,description:`Listar jugadores`,group:`Players`,params:[{name:`page`,type:`query`},{name:`pageSize`,type:`query`}]},{method:`GET`,path:`/api/player/{id}`,description:`Obtener jugador`,group:`Players`,params:[{name:`id`,type:`path`,required:!0}]},{method:`GET`,path:`/api/player/team/{teamId}`,description:`Jugadores por equipo`,group:`Players`,params:[{name:`teamId`,type:`path`,required:!0}]},{method:`POST`,path:`/api/player`,description:`Crear jugador`,group:`Players`,bodyTemplate:`{
  "firstName": "",
  "lastName": "",
  "birthDate": "2000-01-01",
  "number": 10,
  "position": 2,
  "teamId": 1
}`},{method:`PUT`,path:`/api/player/{id}`,description:`Actualizar jugador`,group:`Players`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "firstName": "",
  "lastName": "",
  "birthDate": "2000-01-01",
  "number": 10,
  "position": 2,
  "teamId": 1
}`},{method:`DELETE`,path:`/api/player/{id}`,description:`Eliminar jugador`,group:`Players`,params:[{name:`id`,type:`path`,required:!0}]},{method:`GET`,path:`/api/referee`,description:`Listar arbitros`,group:`Referees`,params:[{name:`page`,type:`query`},{name:`pageSize`,type:`query`}]},{method:`GET`,path:`/api/referee/{id}`,description:`Obtener arbitro`,group:`Referees`,params:[{name:`id`,type:`path`,required:!0}]},{method:`POST`,path:`/api/referee`,description:`Crear arbitro`,group:`Referees`,bodyTemplate:`{
  "firstName": "",
  "lastName": "",
  "nationality": ""
}`},{method:`PUT`,path:`/api/referee/{id}`,description:`Actualizar arbitro`,group:`Referees`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "firstName": "",
  "lastName": "",
  "nationality": ""
}`},{method:`DELETE`,path:`/api/referee/{id}`,description:`Eliminar arbitro`,group:`Referees`,params:[{name:`id`,type:`path`,required:!0}]},{method:`GET`,path:`/api/tournament`,description:`Listar torneos`,group:`Tournaments`,params:[{name:`page`,type:`query`},{name:`pageSize`,type:`query`}]},{method:`GET`,path:`/api/tournament/{id}`,description:`Obtener torneo`,group:`Tournaments`,params:[{name:`id`,type:`path`,required:!0}]},{method:`POST`,path:`/api/tournament`,description:`Crear torneo`,group:`Tournaments`,bodyTemplate:`{
  "name": "",
  "season": "2025-2026",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31"
}`},{method:`PUT`,path:`/api/tournament/{id}`,description:`Actualizar torneo`,group:`Tournaments`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "name": "",
  "season": "2025-2026",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31"
}`},{method:`DELETE`,path:`/api/tournament/{id}`,description:`Eliminar torneo`,group:`Tournaments`,params:[{name:`id`,type:`path`,required:!0}]},{method:`PATCH`,path:`/api/tournament/{id}/status`,description:`Cambiar estado`,group:`Tournaments`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "status": 1
}`},{method:`POST`,path:`/api/tournament/{id}/teams`,description:`Inscribir equipo`,group:`Tournaments`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "teamId": 1
}`},{method:`GET`,path:`/api/tournament/{id}/teams`,description:`Equipos inscritos`,group:`Tournaments`,params:[{name:`id`,type:`path`,required:!0}]},{method:`GET`,path:`/api/match/tournament/{tournamentId}`,description:`Partidos por torneo`,group:`Matches`,params:[{name:`tournamentId`,type:`path`,required:!0},{name:`page`,type:`query`},{name:`pageSize`,type:`query`}]},{method:`GET`,path:`/api/match/{id}`,description:`Obtener partido`,group:`Matches`,params:[{name:`id`,type:`path`,required:!0}]},{method:`POST`,path:`/api/match`,description:`Crear partido`,group:`Matches`,bodyTemplate:`{
  "tournamentId": 1,
  "homeTeamId": 1,
  "awayTeamId": 2,
  "refereeId": 1,
  "matchDate": "2025-06-01",
  "matchday": 1
}`},{method:`PUT`,path:`/api/match/{id}`,description:`Actualizar partido`,group:`Matches`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "tournamentId": 1,
  "homeTeamId": 1,
  "awayTeamId": 2,
  "refereeId": 1,
  "matchDate": "2025-06-01",
  "matchday": 1
}`},{method:`DELETE`,path:`/api/match/{id}`,description:`Eliminar partido`,group:`Matches`,params:[{name:`id`,type:`path`,required:!0}]},{method:`PATCH`,path:`/api/match/{id}/status`,description:`Cambiar estado partido`,group:`Matches`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "status": 1
}`},{method:`GET`,path:`/api/match/{matchId}/result`,description:`Obtener resultado`,group:`Match Events`,params:[{name:`matchId`,type:`path`,required:!0}]},{method:`POST`,path:`/api/match/{matchId}/result`,description:`Registrar resultado`,group:`Match Events`,params:[{name:`matchId`,type:`path`,required:!0}],bodyTemplate:`{
  "homeGoals": 2,
  "awayGoals": 1,
  "observations": ""
}`},{method:`GET`,path:`/api/match/{matchId}/goals`,description:`Goles del partido`,group:`Match Events`,params:[{name:`matchId`,type:`path`,required:!0}]},{method:`POST`,path:`/api/match/{matchId}/goals`,description:`Registrar gol`,group:`Match Events`,params:[{name:`matchId`,type:`path`,required:!0}],bodyTemplate:`{
  "playerId": 1,
  "minute": 45,
  "type": 0
}`},{method:`DELETE`,path:`/api/match/{matchId}/goals/{goalId}`,description:`Eliminar gol`,group:`Match Events`,params:[{name:`matchId`,type:`path`,required:!0},{name:`goalId`,type:`path`,required:!0}]},{method:`GET`,path:`/api/match/{matchId}/cards`,description:`Tarjetas del partido`,group:`Match Events`,params:[{name:`matchId`,type:`path`,required:!0}]},{method:`POST`,path:`/api/match/{matchId}/cards`,description:`Registrar tarjeta`,group:`Match Events`,params:[{name:`matchId`,type:`path`,required:!0}],bodyTemplate:`{
  "playerId": 1,
  "minute": 30,
  "type": 0
}`},{method:`DELETE`,path:`/api/match/{matchId}/cards/{cardId}`,description:`Eliminar tarjeta`,group:`Match Events`,params:[{name:`matchId`,type:`path`,required:!0},{name:`cardId`,type:`path`,required:!0}]},{method:`GET`,path:`/api/sponsor`,description:`Listar patrocinadores`,group:`Sponsors`},{method:`GET`,path:`/api/sponsor/{id}`,description:`Obtener patrocinador`,group:`Sponsors`,params:[{name:`id`,type:`path`,required:!0}]},{method:`POST`,path:`/api/sponsor`,description:`Crear patrocinador`,group:`Sponsors`,bodyTemplate:`{
  "name": "",
  "contactEmail": "",
  "phone": "",
  "category": 0
}`},{method:`PUT`,path:`/api/sponsor/{id}`,description:`Actualizar patrocinador`,group:`Sponsors`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "name": "",
  "contactEmail": "",
  "phone": "",
  "category": 0
}`},{method:`DELETE`,path:`/api/sponsor/{id}`,description:`Eliminar patrocinador`,group:`Sponsors`,params:[{name:`id`,type:`path`,required:!0}]},{method:`GET`,path:`/api/sponsor/{id}/tournaments`,description:`Torneos del patrocinador`,group:`Sponsors`,params:[{name:`id`,type:`path`,required:!0}]},{method:`POST`,path:`/api/sponsor/{id}/tournaments`,description:`Vincular a torneo`,group:`Sponsors`,params:[{name:`id`,type:`path`,required:!0}],bodyTemplate:`{
  "tournamentId": 1,
  "contractAmount": 10000
}`},{method:`DELETE`,path:`/api/sponsor/{id}/tournaments/{tournamentId}`,description:`Desvincular de torneo`,group:`Sponsors`,params:[{name:`id`,type:`path`,required:!0},{name:`tournamentId`,type:`path`,required:!0}]},{method:`GET`,path:`/api/standings`,description:`Tabla de posiciones`,group:`Stats`,params:[{name:`tournamentId`,type:`query`,required:!0}]},{method:`GET`,path:`/api/stats/scorers`,description:`Ranking goleadores`,group:`Stats`,params:[{name:`tournamentId`,type:`query`,required:!0}]},{method:`GET`,path:`/api/stats/cards`,description:`Ranking tarjetas`,group:`Stats`,params:[{name:`tournamentId`,type:`query`,required:!0}]},{method:`GET`,path:`/health`,description:`Health check`,group:`Infrastructure`}],s={GET:`var(--info)`,POST:`var(--success)`,PUT:`var(--warning)`,PATCH:`#8b5cf6`,DELETE:`var(--danger)`};function c(){let[e,t]=(0,i.useState)(o[0]),[n,c]=(0,i.useState)({}),[l,u]=(0,i.useState)({}),[d,f]=(0,i.useState)(e.bodyTemplate||``),[p,m]=(0,i.useState)(``),[h,g]=(0,i.useState)(null),[_,v]=(0,i.useState)(!1),[y,b]=(0,i.useState)([]),[x,S]=(0,i.useState)(1),[C,w]=(0,i.useState)(`Teams`),T=[...new Set(o.map(e=>e.group))],E=()=>{let t=e.path;e.params?.filter(e=>e.type===`path`).forEach(e=>{t=t.replace(`{${e.name}}`,n[e.name]||`{${e.name}}`)});let r=e.params?.filter(e=>e.type===`query`&&l[e.name]).map(e=>`${e.name}=${l[e.name]}`);return r?.length&&(t+=`?`+r.join(`&`)),t},D=e=>{t(e),f(e.bodyTemplate||``),c({}),u({}),m(``),g(null)},O=async()=>{v(!0),m(``),g(null);let t=Date.now(),n=E();try{let i={method:e.method.toLowerCase(),url:n};[`post`,`put`,`patch`].includes(e.method.toLowerCase())&&d&&(i.data=JSON.parse(d));let a=await r.request(i),o=Date.now()-t;g(a.status),m(JSON.stringify(a.data,null,2)),b(t=>[{id:x,method:e.method,url:n,status:a.status,time:o},...t.slice(0,19)]),S(e=>e+1)}catch(r){let i=Date.now()-t,a=r,o=a.response?.status||0,s=a.response?.data||a.message||`Error`;g(o),m(JSON.stringify(s,null,2)),b(t=>[{id:x,method:e.method,url:n,status:o,time:i},...t.slice(0,19)]),S(e=>e+1)}finally{v(!1)}},k=e.params?.filter(e=>e.type===`path`)||[],A=e.params?.filter(e=>e.type===`query`)||[],j=[`POST`,`PUT`,`PATCH`].includes(e.method);return(0,a.jsxs)(`div`,{className:`api-tester`,children:[(0,a.jsxs)(`aside`,{className:`tester-sidebar`,children:[(0,a.jsx)(`h2`,{children:`API Endpoints`}),(0,a.jsx)(`div`,{className:`tester-groups`,children:T.map(t=>(0,a.jsxs)(`div`,{className:`tester-group`,children:[(0,a.jsxs)(`button`,{className:`tester-group-header ${C===t?`expanded`:``}`,onClick:()=>w(C===t?null:t),children:[(0,a.jsx)(`span`,{children:t}),(0,a.jsx)(`span`,{children:C===t?`−`:`+`})]}),C===t&&(0,a.jsx)(`ul`,{className:`tester-endpoint-list`,children:o.filter(e=>e.group===t).map((t,n)=>(0,a.jsxs)(`li`,{className:`tester-endpoint-item ${e===t?`active`:``}`,onClick:()=>D(t),children:[(0,a.jsx)(`span`,{className:`method-badge-sm`,style:{background:s[t.method]},children:t.method}),(0,a.jsx)(`span`,{className:`endpoint-path`,children:t.path})]},n))})]},t))})]}),(0,a.jsxs)(`main`,{className:`tester-main`,children:[(0,a.jsxs)(`div`,{className:`tester-request-panel`,children:[(0,a.jsxs)(`div`,{className:`tester-url-bar`,children:[(0,a.jsx)(`span`,{className:`method-badge-lg`,style:{background:s[e.method]},children:e.method}),(0,a.jsx)(`input`,{type:`text`,value:E(),readOnly:!0,className:`tester-url-input`}),(0,a.jsx)(`button`,{className:`btn btn-primary`,onClick:O,disabled:_,children:_?`Enviando...`:`Enviar`})]}),(0,a.jsx)(`p`,{className:`endpoint-desc`,children:e.description}),k.length>0&&(0,a.jsxs)(`div`,{className:`params-section`,children:[(0,a.jsx)(`h4`,{children:`Path Parameters`}),k.map(e=>(0,a.jsxs)(`div`,{className:`param-row`,children:[(0,a.jsxs)(`label`,{children:[e.name,` `,e.required&&(0,a.jsx)(`span`,{className:`required-dot`,children:`*`})]}),(0,a.jsx)(`input`,{type:`text`,placeholder:e.description||e.name,value:n[e.name]||``,onChange:t=>c({...n,[e.name]:t.target.value})})]},e.name))]}),A.length>0&&(0,a.jsxs)(`div`,{className:`params-section`,children:[(0,a.jsx)(`h4`,{children:`Query Parameters`}),A.map(e=>(0,a.jsxs)(`div`,{className:`param-row`,children:[(0,a.jsx)(`label`,{children:e.name}),(0,a.jsx)(`input`,{type:`text`,placeholder:e.description||e.name,value:l[e.name]||``,onChange:t=>u({...l,[e.name]:t.target.value})})]},e.name))]}),j&&(0,a.jsxs)(`div`,{className:`params-section`,children:[(0,a.jsx)(`h4`,{children:`Request Body (JSON)`}),(0,a.jsx)(`textarea`,{value:d,onChange:e=>f(e.target.value),rows:10,className:`tester-body-input`,placeholder:`{"key": "value"}`})]})]}),h!==null&&(0,a.jsxs)(`div`,{className:`tester-response-panel`,children:[(0,a.jsxs)(`div`,{className:`response-header`,children:[(0,a.jsx)(`h4`,{children:`Response`}),(0,a.jsx)(`span`,{className:`status-badge ${h>=200&&h<300?`status-ok`:`status-err`}`,children:h})]}),(0,a.jsx)(`pre`,{className:`response-body`,children:p})]}),y.length>0&&(0,a.jsxs)(`div`,{className:`tester-history-panel`,children:[(0,a.jsx)(`h4`,{children:`Historial`}),(0,a.jsxs)(`table`,{className:`data-table`,children:[(0,a.jsx)(`thead`,{children:(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`th`,{children:`Metodo`}),(0,a.jsx)(`th`,{children:`URL`}),(0,a.jsx)(`th`,{children:`Status`}),(0,a.jsx)(`th`,{children:`Tiempo`})]})}),(0,a.jsx)(`tbody`,{children:y.map(e=>(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`td`,{children:(0,a.jsx)(`span`,{className:`method-badge-sm`,style:{background:s[e.method]},children:e.method})}),(0,a.jsx)(`td`,{className:`history-url`,children:e.url}),(0,a.jsx)(`td`,{className:e.status>=200&&e.status<300?`text-success`:`text-error`,children:e.status}),(0,a.jsxs)(`td`,{children:[e.time,`ms`]})]},e.id))})]})]})]})]})}export{c as default};