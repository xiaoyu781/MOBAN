(() => {
  'use strict';

  const APP_VERSION = '1.5.0';
  const ROOT = document.getElementById('app');
  const DAY_MS = 86400000;
  const DB_NAME = 'nutrition-planner-foods';
  const DB_VERSION = 1;
  const STORE = 'foods';
  const FOOD_CACHE_KEY = 'np:foods-cache-v140';
  const FALLBACK_FOODS = [{"id":"demo-tomato","nameZh":"番茄","nameEn":"Tomato, raw","category":"蔬菜","state":"raw","per100g":{"calories":18,"protein":0.9,"fat":0.2,"carbs":3.9,"fiber":1.2,"sugar":2.6,"sodium":5},"source":"Starter demo seed","verified":false},{"id":"demo-lettuce","nameZh":"生菜","nameEn":"Lettuce, raw","category":"蔬菜","state":"raw","per100g":{"calories":15,"protein":1.4,"fat":0.2,"carbs":2.9,"fiber":1.3,"sugar":0.8,"sodium":28},"source":"Starter demo seed","verified":false},{"id":"demo-broccoli","nameZh":"西兰花","nameEn":"Broccoli, raw","category":"蔬菜","state":"raw","per100g":{"calories":34,"protein":2.8,"fat":0.4,"carbs":6.6,"fiber":2.6,"sugar":1.7,"sodium":33},"source":"Starter demo seed","verified":false},{"id":"demo-carrot","nameZh":"胡萝卜","nameEn":"Carrot, raw","category":"蔬菜","state":"raw","per100g":{"calories":41,"protein":0.9,"fat":0.2,"carbs":9.6,"fiber":2.8,"sugar":4.7,"sodium":69},"source":"Starter demo seed","verified":false},{"id":"demo-spinach","nameZh":"菠菜","nameEn":"Spinach, raw","category":"蔬菜","state":"raw","per100g":{"calories":23,"protein":2.9,"fat":0.4,"carbs":3.6,"fiber":2.2,"sugar":0.4,"sodium":79},"source":"Starter demo seed","verified":false},{"id":"demo-cucumber","nameZh":"黄瓜","nameEn":"Cucumber, raw","category":"蔬菜","state":"raw","per100g":{"calories":15,"protein":0.7,"fat":0.1,"carbs":3.6,"fiber":0.5,"sugar":1.7,"sodium":2},"source":"Starter demo seed","verified":false},{"id":"demo-chicken","nameZh":"鸡胸肉（熟）","nameEn":"Chicken breast, cooked","category":"禽类","state":"cooked","per100g":{"calories":165,"protein":31,"fat":3.6,"carbs":0,"fiber":0,"sugar":0,"sodium":74},"source":"Starter demo seed","verified":false},{"id":"demo-beef","nameZh":"牛里脊（熟）","nameEn":"Beef sirloin, cooked","category":"肉类","state":"cooked","per100g":{"calories":206,"protein":27,"fat":10,"carbs":0,"fiber":0,"sugar":0,"sodium":55},"source":"Starter demo seed","verified":false},{"id":"demo-pork","nameZh":"猪里脊（熟）","nameEn":"Pork tenderloin, cooked","category":"肉类","state":"cooked","per100g":{"calories":143,"protein":26,"fat":3.5,"carbs":0,"fiber":0,"sugar":0,"sodium":62},"source":"Starter demo seed","verified":false},{"id":"demo-salmon","nameZh":"三文鱼（熟）","nameEn":"Salmon, cooked","category":"水产","state":"cooked","per100g":{"calories":206,"protein":22,"fat":12,"carbs":0,"fiber":0,"sugar":0,"sodium":59},"source":"Starter demo seed","verified":false},{"id":"demo-shrimp","nameZh":"虾（熟）","nameEn":"Shrimp, cooked","category":"水产","state":"cooked","per100g":{"calories":99,"protein":24,"fat":0.3,"carbs":0.2,"fiber":0,"sugar":0,"sodium":111},"source":"Starter demo seed","verified":false},{"id":"demo-egg","nameZh":"鸡蛋","nameEn":"Whole egg","category":"蛋类","state":"raw","per100g":{"calories":143,"protein":12.6,"fat":9.5,"carbs":0.7,"fiber":0,"sugar":0.4,"sodium":142},"source":"Starter demo seed","verified":false},{"id":"demo-tofu","nameZh":"北豆腐","nameEn":"Tofu, firm","category":"豆类/豆制品","state":"unspecified","per100g":{"calories":144,"protein":17.3,"fat":8.7,"carbs":2.8,"fiber":2.3,"sugar":0.6,"sodium":14},"source":"Starter demo seed","verified":false},{"id":"demo-edamame","nameZh":"毛豆（熟）","nameEn":"Edamame, cooked","category":"豆类/豆制品","state":"cooked","per100g":{"calories":121,"protein":11.9,"fat":5.2,"carbs":8.9,"fiber":5.2,"sugar":2.2,"sodium":6},"source":"Starter demo seed","verified":false},{"id":"demo-lentils","nameZh":"扁豆（熟）","nameEn":"Lentils, cooked","category":"豆类/豆制品","state":"cooked","per100g":{"calories":116,"protein":9,"fat":0.4,"carbs":20.1,"fiber":7.9,"sugar":1.8,"sodium":2},"source":"Starter demo seed","verified":false},{"id":"demo-rice","nameZh":"白米饭（熟）","nameEn":"White rice, cooked","category":"谷物/主食","state":"cooked","per100g":{"calories":130,"protein":2.7,"fat":0.3,"carbs":28,"fiber":0.4,"sugar":0.1,"sodium":1},"source":"Starter demo seed","verified":false},{"id":"demo-brown-rice","nameZh":"糙米饭（熟）","nameEn":"Brown rice, cooked","category":"谷物/主食","state":"cooked","per100g":{"calories":123,"protein":2.7,"fat":1,"carbs":25.6,"fiber":1.6,"sugar":0.2,"sodium":4},"source":"Starter demo seed","verified":false},{"id":"demo-oats","nameZh":"燕麦","nameEn":"Oats, dry","category":"谷物/主食","state":"raw","per100g":{"calories":389,"protein":16.9,"fat":6.9,"carbs":66.3,"fiber":10.6,"sugar":0,"sodium":2},"source":"Starter demo seed","verified":false},{"id":"demo-sweetpotato","nameZh":"红薯（熟）","nameEn":"Sweet potato, cooked","category":"谷物/主食","state":"cooked","per100g":{"calories":90,"protein":2,"fat":0.2,"carbs":20.7,"fiber":3.3,"sugar":6.5,"sodium":36},"source":"Starter demo seed","verified":false},{"id":"demo-milk","nameZh":"全脂牛奶","nameEn":"Whole milk","category":"奶制品","state":"unspecified","per100g":{"calories":61,"protein":3.2,"fat":3.3,"carbs":4.8,"fiber":0,"sugar":5.1,"sodium":43},"source":"Starter demo seed","verified":false},{"id":"demo-yogurt","nameZh":"希腊酸奶","nameEn":"Greek yogurt","category":"奶制品","state":"unspecified","per100g":{"calories":97,"protein":9,"fat":5,"carbs":3.9,"fiber":0,"sugar":3.6,"sodium":36},"source":"Starter demo seed","verified":false},{"id":"demo-banana","nameZh":"香蕉","nameEn":"Banana, raw","category":"水果","state":"raw","per100g":{"calories":89,"protein":1.1,"fat":0.3,"carbs":22.8,"fiber":2.6,"sugar":12.2,"sodium":1},"source":"Starter demo seed","verified":false},{"id":"demo-apple","nameZh":"苹果","nameEn":"Apple, raw","category":"水果","state":"raw","per100g":{"calories":52,"protein":0.3,"fat":0.2,"carbs":13.8,"fiber":2.4,"sugar":10.4,"sodium":1},"source":"Starter demo seed","verified":false},{"id":"demo-avocado","nameZh":"牛油果","nameEn":"Avocado, raw","category":"水果","state":"raw","per100g":{"calories":160,"protein":2,"fat":14.7,"carbs":8.5,"fiber":6.7,"sugar":0.7,"sodium":7},"source":"Starter demo seed","verified":false},{"id":"demo-almond","nameZh":"杏仁","nameEn":"Almonds","category":"坚果/种子","state":"unspecified","per100g":{"calories":579,"protein":21.2,"fat":49.9,"carbs":21.6,"fiber":12.5,"sugar":4.4,"sodium":1},"source":"Starter demo seed","verified":false},{"id":"demo-oliveoil","nameZh":"橄榄油","nameEn":"Olive oil","category":"油脂","state":"unspecified","per100g":{"calories":884,"protein":0,"fat":100,"carbs":0,"fiber":0,"sugar":0,"sodium":2},"source":"Starter demo seed","verified":false}];

  const defaults = {
    profile: {
      sex: 'female', age: 28, height: 165, weight: 55, targetWeight: 52,
      activity: 1.55, goal: 'maintain', manualCalories: null,
    },
    fridge: [
      { id: cryptoId(), foodId: 'demo-tomato', grams: 450, expiry: dateOffset(2), low: 120 },
      { id: cryptoId(), foodId: 'demo-lettuce', grams: 300, expiry: dateOffset(5), low: 100 },
      { id: cryptoId(), foodId: 'demo-chicken', grams: 400, expiry: dateOffset(8), low: 150 },
      { id: cryptoId(), foodId: 'demo-egg', grams: 300, expiry: dateOffset(10), low: 100 },
      { id: cryptoId(), foodId: 'demo-carrot', grams: 300, expiry: dateOffset(12), low: 100 },
      { id: cryptoId(), foodId: 'demo-milk', grams: 250, expiry: dateOffset(4), low: 150 },
    ],
    logs: [],
  };

  const state = {
    tab: 'home',
    profile: loadJSON('profile', defaults.profile),
    fridge: loadJSON('fridge', defaults.fridge),
    logs: loadJSON('logs', defaults.logs),
    foods: loadCachedFoods(),
    foodMeta: { mode: 'instant', count: 0 },
    fridgeFilter: '全部',
    detailId: null,
    modal: null,
    lastPlans: [],
    foodSearchCategory: '全部',
    foodSearchState: '全部',
    selectedDate: todayKey(),
    historyOpen: false,
    historyRange: 7,
    historyMonth: todayKey().slice(0,7),
  };


  const AUTH_SESSION_KEY = 'np:supabase-session';
  const cloud = {
    config: null,
    session: null,
    user: null,
    initialized: false,
    authMode: 'login',
    authBusy: false,
    authError: '',
    authNotice: '',
    migrationPending: false,
    loadingState: false,
    syncing: false,
    syncTimer: null,
    syncError: '',
    lastSyncedAt: null,
  };

  function userCacheKey(userId=cloud.user?.id) { return userId ? `np:user-state:${userId}` : null; }
  function readUserCache(userId=cloud.user?.id) {
    const key=userCacheKey(userId); if(!key) return null;
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  }
  function writeUserCache() {
    const key=userCacheKey(); if(!key) return;
    try { localStorage.setItem(key, JSON.stringify({profile:state.profile,fridge:state.fridge,logs:state.logs,savedAt:new Date().toISOString()})); } catch {}
  }
  function loadStateObject(data) {
    if(data?.profile && typeof data.profile==='object') state.profile=data.profile;
    if(Array.isArray(data?.fridge)) state.fridge=data.fridge;
    if(Array.isArray(data?.logs)) state.logs=data.logs;
    state.detailId=null; state.modal=null; state.lastPlans=[]; state.selectedDate=todayKey();
  }
  function resetAccountState() {
    state.profile=structuredClone(defaults.profile);
    state.fridge=[];
    state.logs=[];
    state.detailId=null; state.modal=null; state.lastPlans=[]; state.selectedDate=todayKey();
  }
  function hasLegacyLocalData() {
    return ['np:profile','np:fridge','np:logs'].some(k=>localStorage.getItem(k)!==null);
  }
  function authHeaders(withUser=true) {
    const h={'Content-Type':'application/json','apikey':cloud.config?.publishableKey||''};
    if(withUser && cloud.session?.access_token) h.Authorization=`Bearer ${cloud.session.access_token}`;
    return h;
  }
  async function parseResponseError(resp) {
    let data=null; try { data=await resp.clone().json(); } catch {}
    return data?.msg || data?.message || data?.error_description || data?.error || `${resp.status} ${resp.statusText}`;
  }
  function normalizeSession(data) {
    if(!data?.access_token) return null;
    const expiresAt=Number(data.expires_at)||Math.floor(Date.now()/1000)+Number(data.expires_in||3600);
    return {...data,expires_at:expiresAt};
  }
  function persistSession(session) {
    cloud.session=session||null;
    try {
      if(session) localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      else localStorage.removeItem(AUTH_SESSION_KEY);
    } catch {}
  }
  async function refreshCloudSession() {
    const token=cloud.session?.refresh_token; if(!token) throw new Error('登录已过期，请重新登录');
    const resp=await fetch(`${cloud.config.url}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers:authHeaders(false),body:JSON.stringify({refresh_token:token})});
    if(!resp.ok) throw new Error(await parseResponseError(resp));
    const data=normalizeSession(await resp.json());
    if(!data) throw new Error('无法刷新登录状态');
    persistSession(data); cloud.user=data.user||cloud.user; return data;
  }
  async function cloudFetch(path, options={}, retry=true) {
    const opts={...options,headers:{...authHeaders(true),...(options.headers||{})}};
    let resp=await fetch(`${cloud.config.url}${path}`,opts);
    if(resp.status===401 && retry && cloud.session?.refresh_token){
      try { await refreshCloudSession(); } catch {}
      opts.headers={...authHeaders(true),...(options.headers||{})};
      resp=await fetch(`${cloud.config.url}${path}`,opts);
    }
    return resp;
  }
  async function fetchCurrentUser() {
    const resp=await cloudFetch('/auth/v1/user',{method:'GET'});
    if(!resp.ok) throw new Error(await parseResponseError(resp));
    return await resp.json();
  }
  async function loadCloudConfig() {
    const resp=await fetch('/api/config',{cache:'no-store'});
    if(!resp.ok) throw new Error('无法读取云端配置');
    const cfg=await resp.json();
    if(!cfg?.url || !cfg?.publishableKey) throw new Error('Vercel 环境变量尚未生效');
    cloud.config=cfg;
  }
  async function restoreCloudSession() {
    let saved=null; try { saved=JSON.parse(localStorage.getItem(AUTH_SESSION_KEY)||'null'); } catch {}
    if(!saved?.access_token || !saved?.refresh_token) return false;
    persistSession(saved);
    try {
      if(Number(saved.expires_at||0)*1000 < Date.now()+60000) await refreshCloudSession();
      cloud.user=await fetchCurrentUser();
      return true;
    } catch {
      try { await refreshCloudSession(); cloud.user=await fetchCurrentUser(); return true; }
      catch { persistSession(null); cloud.user=null; return false; }
    }
  }
  async function loadRemoteState() {
    if(!cloud.user?.id) return;
    cloud.loadingState=true; cloud.syncError='';
    try {
      const uid=encodeURIComponent(cloud.user.id);
      const resp=await cloudFetch(`/rest/v1/user_app_state?select=profile,fridge,logs,updated_at&user_id=eq.${uid}&limit=1`,{method:'GET',headers:{Accept:'application/json'}});
      if(!resp.ok) {
        const msg=await parseResponseError(resp);
        if(resp.status===404 || /user_app_state|relation/i.test(msg)) throw new Error('请先在 Supabase 运行 SUPABASE-MIGRATION-v1.4.sql');
        throw new Error(msg);
      }
      const rows=await resp.json();
      if(rows?.[0]) {
        loadStateObject(rows[0]);
        cloud.lastSyncedAt=rows[0].updated_at||null;
        writeUserCache();
        cloud.migrationPending=false;
      } else {
        const cache=readUserCache();
        if(cache) {
          loadStateObject(cache);
          cloud.migrationPending=false;
          await syncCloudState(true);
        } else if(hasLegacyLocalData() && !localStorage.getItem(`np:migration:${cloud.user.id}`)) {
          cloud.migrationPending=true;
        } else {
          resetAccountState();
          cloud.migrationPending=false;
          await syncCloudState(true);
        }
      }
    } finally { cloud.loadingState=false; }
  }
  async function syncCloudState(force=false) {
    if(!cloud.user?.id || !cloud.session?.access_token || (cloud.loadingState && !force)) return;
    if(cloud.syncing && !force) return;
    cloud.syncing=true; cloud.syncError=''; updateSyncIndicator();
    try {
      const payload={user_id:cloud.user.id,profile:state.profile,fridge:state.fridge,logs:state.logs,updated_at:new Date().toISOString()};
      const resp=await cloudFetch('/rest/v1/user_app_state?on_conflict=user_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(payload)});
      if(!resp.ok) throw new Error(await parseResponseError(resp));
      cloud.lastSyncedAt=payload.updated_at; writeUserCache();
    } catch(err) { cloud.syncError=err?.message||'同步失败'; }
    finally { cloud.syncing=false; updateSyncIndicator(); }
  }
  function scheduleCloudSync() {
    if(!cloud.user?.id || cloud.loadingState || cloud.migrationPending) return;
    clearTimeout(cloud.syncTimer); cloud.syncTimer=setTimeout(()=>syncCloudState(),650);
  }
  function syncStatusText() {
    if(cloud.syncing) return '正在同步…';
    if(cloud.syncError) return `同步失败：${cloud.syncError}`;
    if(cloud.lastSyncedAt) { const d=new Date(cloud.lastSyncedAt); return `已同步 ${d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`; }
    return '等待首次同步';
  }
  function updateSyncIndicator() { const el=document.getElementById('cloudSyncStatus'); if(el) el.textContent=syncStatusText(); }
  async function signInWithPassword(email,password) {
    const resp=await fetch(`${cloud.config.url}/auth/v1/token?grant_type=password`,{method:'POST',headers:authHeaders(false),body:JSON.stringify({email,password})});
    if(!resp.ok) throw new Error(await parseResponseError(resp));
    const session=normalizeSession(await resp.json()); if(!session) throw new Error('登录失败');
    persistSession(session); cloud.user=session.user||await fetchCurrentUser(); await loadRemoteState();
  }
  async function signUpWithPassword(email,password,nickname) {
    const resp=await fetch(`${cloud.config.url}/auth/v1/signup`,{method:'POST',headers:authHeaders(false),body:JSON.stringify({email,password,data:{nickname:nickname||email.split('@')[0]}})});
    if(!resp.ok) throw new Error(await parseResponseError(resp));
    const data=await resp.json();
    const session=normalizeSession(data);
    if(session) { persistSession(session); cloud.user=session.user||data.user; await loadRemoteState(); return {signedIn:true}; }
    return {signedIn:false,user:data.user||null};
  }
  async function signOutCloud() {
    try { if(cloud.session?.access_token) await cloudFetch('/auth/v1/logout',{method:'POST'}); } catch {}
    persistSession(null); cloud.user=null; cloud.migrationPending=false; cloud.authError=''; cloud.authNotice=''; cloud.syncError=''; cloud.lastSyncedAt=null;
    render();
  }
  function authView() {
    if(!cloud.initialized) return `<section class="auth-screen"><div class="auth-card"><div class="auth-brand">好好吃饭</div><h1>正在连接云端</h1><p>正在准备个人账户与数据同步…</p></div></section>`;
    if(!cloud.config) return `<section class="auth-screen"><div class="auth-card"><div class="auth-brand">好好吃饭</div><h1>云端配置未就绪</h1><p>${esc(cloud.authError||'无法读取 Supabase 配置')}</p><button class="primary" data-auth-action="retry">重新连接</button></div></section>`;
    if(cloud.user && cloud.authError) return `<section class="auth-screen"><div class="auth-card"><div class="auth-brand">云端数据</div><h1>Supabase 还差一步</h1><p>${esc(cloud.authError)}</p><button class="primary" data-auth-action="retry">完成后重新检查</button><button class="secondary" style="width:100%;margin-top:10px" data-auth-action="logout">退出当前账号</button></div></section>`;
    const register=cloud.authMode==='register';
    return `<section class="auth-screen"><div class="auth-card"><div class="auth-brand">好好吃饭</div><h1>${register?'创建个人账户':'登录你的账户'}</h1><p>${register?'每个人使用同一个域名，但数据会按账户完全分开。':'登录后会读取属于这个账户的冰箱、饮食和身体数据。'}</p>
      <div class="auth-tabs"><button type="button" class="${!register?'active':''}" data-auth-mode="login">登录</button><button type="button" class="${register?'active':''}" data-auth-mode="register">注册</button></div>
      <form id="authForm" class="auth-form">
        ${register?'<label class="field"><span>昵称</span><input name="nickname" autocomplete="nickname" placeholder="例如 Yu"></label>':''}
        <label class="field"><span>Email（邮箱）</span><input name="email" type="email" autocomplete="email" required></label>
        <label class="field"><span>Password（密码）</span><input name="password" type="password" minlength="6" autocomplete="current-password" required></label>
        ${cloud.authError?`<div class="auth-message error">${esc(cloud.authError)}</div>`:''}${cloud.authNotice?`<div class="auth-message">${esc(cloud.authNotice)}</div>`:''}
        <button class="primary auth-submit" type="submit" ${cloud.authBusy?'disabled':''}>${cloud.authBusy?'处理中…':register?'注册':'登录'}</button>
      </form>
      <div class="auth-foot">Supabase Auth（用户认证） · RLS（行级安全）</div>
    </div></section>`;
  }
  function migrationView() {
    return `<section class="auth-screen"><div class="auth-card migration-card"><div class="auth-brand">数据迁移</div><h1>检测到本机旧版数据</h1><p>当前登录账号：<strong>${esc(cloud.user?.email||'')}</strong></p><p>为避免把一台设备上的旧数据自动分配给错误账号，请选择一次：</p>
      <button class="primary" data-migration="import">导入本机数据到这个账号</button>
      <button class="secondary" data-migration="empty">不导入，使用空白账号</button>
      <p class="auth-hint">选择后，后续修改会自动同步到 Supabase（云数据库）。</p>
    </div></section>`;
  }
  function bindAuthEvents() {
    document.querySelectorAll('[data-auth-mode]').forEach(b=>b.addEventListener('click',()=>{cloud.authMode=b.dataset.authMode;cloud.authError='';cloud.authNotice='';render();}));
    document.querySelector('[data-auth-action="retry"]')?.addEventListener('click',()=>initCloudAuth(true));
    document.querySelector('[data-auth-action="logout"]')?.addEventListener('click',()=>signOutCloud());
    document.getElementById('authForm')?.addEventListener('submit',handleAuthSubmit);
  }
  async function handleAuthSubmit(e) {
    e.preventDefault(); if(cloud.authBusy) return;
    const fd=new FormData(e.currentTarget), email=String(fd.get('email')||'').trim(), password=String(fd.get('password')||'');
    cloud.authBusy=true; cloud.authError=''; cloud.authNotice=''; render();
    try {
      if(cloud.authMode==='register') {
        const result=await signUpWithPassword(email,password,String(fd.get('nickname')||'').trim());
        if(!result.signedIn){cloud.authMode='login';cloud.authNotice='注册成功。请先到邮箱完成验证，然后回来登录。';}
      } else await signInWithPassword(email,password);
    } catch(err) { cloud.authError=err?.message||'操作失败'; }
    finally { cloud.authBusy=false; render(); }
  }
  function bindMigrationEvents() {
    document.querySelectorAll('[data-migration]').forEach(b=>b.addEventListener('click',async()=>{
      const mode=b.dataset.migration; b.disabled=true;
      try {
        if(mode==='empty') resetAccountState();
        localStorage.setItem(`np:migration:${cloud.user.id}`,mode);
        cloud.migrationPending=false;
        writeUserCache();
        await syncCloudState(true);
      } catch(err) { cloud.syncError=err?.message||'迁移失败'; }
      render();
    }));
  }
  async function initCloudAuth(retry=false) {
    if(retry){cloud.config=null;cloud.authError='';}
    cloud.initialized=false; render();
    try {
      await loadCloudConfig();
      cloud.authError='';
      const signedIn=await restoreCloudSession();
      if(signedIn) await loadRemoteState();
    } catch(err) { cloud.authError=err?.message||'云端连接失败'; }
    finally { cloud.initialized=true; render(); }
  }

  function cryptoId() {
    return (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
  function loadJSON(key, fallback) {
    try { const v = localStorage.getItem(`np:${key}`); return v ? JSON.parse(v) : structuredClone(fallback); }
    catch { return structuredClone(fallback); }
  }
  function loadCachedFoods() {
    try {
      const cached = JSON.parse(localStorage.getItem(FOOD_CACHE_KEY) || 'null');
      if (Array.isArray(cached) && cached.length > 100) return cached;
    } catch {}
    return structuredClone(FALLBACK_FOODS);
  }
  function saveFoodCache(foods) {
    try { if (Array.isArray(foods) && foods.length > 100) localStorage.setItem(FOOD_CACHE_KEY, JSON.stringify(foods)); } catch {}
  }
  async function fetchWithTimeout(url, options={}, timeoutMs=3500) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try { return await fetch(url, {...options, signal: controller.signal}); }
    finally { clearTimeout(timer); }
  }
  function saveState() {
    if(cloud.user?.id) {
      writeUserCache();
      scheduleCloudSync();
      return;
    }
    localStorage.setItem('np:profile', JSON.stringify(state.profile));
    localStorage.setItem('np:fridge', JSON.stringify(state.fridge));
    localStorage.setItem('np:logs', JSON.stringify(state.logs));
  }
  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function dateOffset(days) {
    const d = new Date(); d.setDate(d.getDate() + days);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function daysUntil(date) {
    if (!date) return null;
    const [y,m,d] = date.split('-').map(Number);
    const target = Date.UTC(y,m-1,d);
    const now = new Date();
    const base = Date.UTC(now.getFullYear(),now.getMonth(),now.getDate());
    return Math.round((target-base)/DAY_MS);
  }
  function fmtDate(date) {
    if (!date) return '未设置';
    const [y,m,d] = date.split('-'); return `${y}.${m}.${d}`;
  }
  function esc(s='') { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function clamp(v,a,b) { return Math.min(b, Math.max(a,v)); }
  function r1(v) { return Math.round(v*10)/10; }
  function percent(a,b) { return clamp(Math.round((a/Math.max(1,b))*100),0,100); }
  function foodById(id) { return state.foods.find(f => f.id === id); }
  function nutrient(food, grams) {
    const q = grams/100, n = food?.per100g || {};
    return {
      calories:(n.calories||0)*q, protein:(n.protein||0)*q, fat:(n.fat||0)*q,
      carbs:(n.carbs||0)*q, fiber:(n.fiber||0)*q, sugar:(n.sugar||0)*q, sodium:(n.sodium||0)*q
    };
  }
  function logsForDate(date=state.selectedDate||todayKey()) { return state.logs.filter(x => x.date === date); }
  function currentLogs() { return logsForDate(state.selectedDate||todayKey()); }
  function shiftDate(date, days) {
    const [y,m,d]=String(date).split('-').map(Number);
    const dt=new Date(y,m-1,d); dt.setDate(dt.getDate()+days);
    return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
  }
  function dateLabel(date, includeYear=true) {
    const [y,m,d]=String(date).split('-').map(Number);
    const dt=new Date(y,m-1,d);
    const week='日一二三四五六'[dt.getDay()];
    return `${includeYear?`${y}年`:''}${m}月${d}日（周${week}）`;
  }
  function shortDate(date) { const [,m,d]=String(date).split('-').map(Number); return `${m}/${d}`; }
  function isToday(date=state.selectedDate) { return date===todayKey(); }
  function deductStock(foodId, grams) {
    const stock=state.fridge.find(x=>x.foodId===foodId&&x.grams>0&&expiryStatus(x).kind!=='danger');
    if(!stock) return null;
    const deducted=Math.min(Number(grams)||0, Number(stock.grams)||0);
    stock.grams=Math.max(0, stock.grams-deducted);
    return deducted>0 ? {fridgeItemId:stock.id, grams:deducted} : null;
  }
  function restoreStockForLog(log) {
    if(!log) return 0;
    let grams=0, stock=null;
    if(log.stockRef?.fridgeItemId && Number(log.stockRef.grams)>0){
      grams=Number(log.stockRef.grams);
      stock=state.fridge.find(x=>x.id===log.stockRef.fridgeItemId);
    } else if(log.meal==='推荐餐'){
      // Compatibility for recommendation records created by older versions.
      grams=Number(log.grams)||0;
      stock=state.fridge.find(x=>x.foodId===log.foodId);
    }
    if(stock&&grams>0){stock.grams+=grams;return grams;}
    return 0;
  }
  function logTotals(date=state.selectedDate||todayKey()) {
    return logsForDate(date).reduce((a,x) => {
      const food=foodById(x.foodId); if(!food) return a;
      const n=nutrient(food,x.grams); Object.keys(a).forEach(k => a[k]+=n[k]||0); return a;
    }, {calories:0,protein:0,fat:0,carbs:0,fiber:0,sugar:0,sodium:0});
  }
  function targets() {
    const p=state.profile;
    const sexOffset=p.sex==='male'?5:-161;
    const bmr=10*p.weight+6.25*p.height-5*p.age+sexOffset;
    const tdee=bmr*Number(p.activity||1.2);
    const cfg={loss:{energy:.85,protein:1.8,label:'减脂'},maintain:{energy:1,protein:1.6,label:'维持'},gain:{energy:1.08,protein:1.8,label:'增肌'}}[p.goal] || {energy:1,protein:1.6,label:'维持'};
    const calories=p.manualCalories ? Number(p.manualCalories) : tdee*cfg.energy;
    const protein=p.weight*cfg.protein;
    const fat=p.weight*.8;
    const carbs=Math.max(0,(calories-protein*4-fat*9)/4);
    return {calories,protein,fat,carbs,bmr,tdee,label:cfg.label};
  }
  function remaining(date=state.selectedDate||todayKey()) {
    const t=targets(), used=logTotals(date);
    return {
      calories:Math.max(0,t.calories-used.calories), protein:Math.max(0,t.protein-used.protein),
      fat:Math.max(0,t.fat-used.fat), carbs:Math.max(0,t.carbs-used.carbs)
    };
  }
  function expiryStatus(item) {
    const d=daysUntil(item.expiry);
    if (d===null) return {kind:'none',label:'未设置'};
    if (d<0) return {kind:'danger',label:`已过期 ${Math.abs(d)} 天`};
    if (d===0) return {kind:'danger',label:'今天到期'};
    if (d<=3) return {kind:'danger',label:`${d}天后过期`};
    if (d<=5) return {kind:'warn',label:`${d}天后过期`};
    return {kind:'ok',label:d>14?'新鲜':`${d}天后过期`};
  }
  // IndexedDB is used for the large optional USDA offline food database.
  function openFoodDB() {
    return new Promise((resolve,reject) => {
      const req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded=() => { const db=req.result; if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE,{keyPath:'id'}); };
      req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
    });
  }
  async function idbGetAllFoods() {
    const db=await openFoodDB();
    return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readonly');const req=tx.objectStore(STORE).getAll();req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);});
  }
  async function idbReplaceFoods(foods) {
    const db=await openFoodDB();
    await new Promise((resolve,reject)=>{
      const tx=db.transaction(STORE,'readwrite'),store=tx.objectStore(STORE);store.clear(); foods.forEach(f=>store.put(f));
      tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
    });
    localStorage.setItem('np:foodMeta',JSON.stringify({mode:'indexeddb-usda',count:foods.length,updatedAt:new Date().toISOString()}));
  }

  async function loadFoods() {
    // First paint never waits for the network. A tiny bundled fallback (or a previously cached
    // full database) is already in state.foods. Refresh the complete Chinese database in the background.
    try {
      const meta = JSON.parse(localStorage.getItem('np:foodMeta') || 'null');
      if (meta?.mode === 'indexeddb-usda') {
        try {
          const imported = await Promise.race([idbGetAllFoods(), new Promise((_, reject)=>setTimeout(()=>reject(new Error('idb-timeout')), 900))]);
          if (Array.isArray(imported) && imported.length > 100) {
            state.foods = imported;
            state.foodMeta = {mode:'indexeddb-usda',count:imported.length};
            return;
          }
        } catch {}
      }
      const bundled = await fetchWithTimeout('/data/common-foods-zh.json', {cache:'force-cache'}, 3500);
      if (bundled.ok) {
        const foods = await bundled.json();
        if (Array.isArray(foods) && foods.length > 100) {
          state.foods = foods;
          state.foodMeta = {mode:'bundled-zh-common',count:foods.length};
          saveFoodCache(foods);
          return;
        }
      }
    } catch(e) {
      console.warn('Chinese food database refresh skipped', e);
    }
    state.foodMeta = {mode: state.foods.length > 100 ? 'cached-zh-common' : 'starter-demo', count: state.foods.length};
  }

  function nav() {
    const items=[['home','assets/nav-home.png','首页'],['fridge','assets/nav-fridge.png','冰箱'],['recommend','assets/nav-recommend.png','推荐'],['profile','assets/nav-profile.png','我的']];
    return `<nav class="bottom-nav">${items.map(([id,img,label])=>`<button class="nav-btn ${state.tab===id?'active':''}" data-tab="${id}"><img src="${img}" alt=""><span>${label}</span></button>`).join('')}</nav>`;
  }

  function homeView() {
    const t=targets(),u=logTotals(),rem=remaining();
    const pct=percent(u.calories,t.calories);
    const selectedToday=isToday();
    return `<section class="screen page dashboard-page">
      <div class="dashboard-topbar">
        <div><h1>${selectedToday?'今日概览':'日期概览'}</h1><p class="muted dashboard-subtitle">科学饮食 · 更健康的自己</p></div>
        <label class="date-pill"><span>日期</span><b>${state.selectedDate.split('-')[0]}年${Number(state.selectedDate.split('-')[1])}月${Number(state.selectedDate.split('-')[2])}日</b><input id="homeDatePicker" type="date" value="${esc(state.selectedDate)}" max="${todayKey()}" aria-label="选择日期"></label>
      </div>

      <section class="overview-panel">
        <div class="calorie-side">
          <div class="ring dashboard-ring" style="--pct:${pct}%"><div class="ring-content"><strong>${Math.round(u.calories)}</strong><span>/ ${Math.round(t.calories)} 千卡</span></div></div>
          <div class="calorie-remaining">还可摄入 <strong>${Math.round(rem.calories)}</strong> 千卡</div>
        </div>
        <div class="dashboard-macros">
          ${dashboardMacro('蛋白质',u.protein,t.protein,'green')}
          ${dashboardMacro('碳水',u.carbs,t.carbs,'blue')}
          ${dashboardMacro('脂肪',u.fat,t.fat,'orange')}
        </div>
      </section>

      <div class="quick-grid dashboard-quick">
        <button class="quick quick-blue" data-action="add-log"><div class="quick-icon"><img src="assets/icons/ui-log.svg" alt=""></div><strong>记录饮食</strong><span>快速记录每一餐</span></button>
        <button class="quick quick-blue" data-action="fridge"><div class="quick-icon"><img src="assets/icons/ui-fridge.svg" alt=""></div><strong>我的冰箱</strong><span>管理食材库存</span></button>
        <button class="quick quick-blue" data-action="recommend"><div class="quick-icon"><img src="assets/icons/ui-recommend.svg" alt=""></div><strong>推荐食谱</strong><span>按营养缺口搭配</span></button>
        <button class="quick quick-orange" data-action="analysis"><div class="quick-icon"><img src="assets/icons/ui-analysis.svg" alt=""></div><strong>饮食分析</strong><span>查看趋势和完成度</span></button>
      </div>

      ${todayLogSection()}
      ${historyPreview()}
    </section>${nav()}`;
  }
  function dashboardMacro(label,used,target,tone) {
    const rawPct=Math.round((used/Math.max(1,target))*100);
    return `<div class="dashboard-macro-card ${tone}"><div class="row"><div><span>${label}</span><strong>${r1(used)} / ${Math.round(target)} g</strong></div><b>${rawPct}%</b></div><div class="progress"><i style="width:${clamp(rawPct,0,100)}%"></i></div></div>`;
  }
  function macroLine(label,used,target) {
    return `<div class="macro-line"><div class="row"><span>${label}</span><span>${r1(used)} / ${Math.round(target)} g</span></div><div class="progress"><i style="width:${percent(used,target)}%"></i></div></div>`;
  }
  function todayLogSection() {
    const logs=[...currentLogs()].sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
    const dayText=isToday()?'今日饮食记录':`${dateLabel(state.selectedDate,false)} 饮食记录`;
    if(!logs.length) return `<section id="today-log-section" class="card today-log-card dashboard-card"><div class="today-log-head"><div><h2>${dayText}</h2><span class="eyebrow">0 条记录</span></div><button class="outline-action" data-action="add-log">＋ 添加记录</button></div><div class="empty compact-empty">这个日期还没有饮食记录。</div></section>`;
    const latestPlan=logs.find(x=>x.source==='recommend'&&x.planId)?.planId||null;
    return `<section id="today-log-section" class="card today-log-card dashboard-card"><div class="today-log-head"><div><h2>${dayText}</h2><span class="eyebrow">${logs.length} 条记录</span></div><div class="log-actions">${latestPlan?`<button class="link-btn danger-link" data-remove-plan="${esc(latestPlan)}">撤销推荐</button>`:''}<button class="link-btn danger-link" data-action="clear-today-logs">清空</button><button class="outline-action" data-action="add-log">＋ 添加记录</button></div></div>
      <div class="daily-log-list">${logs.map(log=>{
        const food=foodById(log.foodId); if(!food) return '';
        const n=nutrient(food,log.grams);
        const source=log.source==='recommend'||log.meal==='推荐餐'?'推荐':'记录';
        return `<div class="daily-log-row"><div class="daily-log-copy"><div><strong>${esc(food.nameZh||food.nameEn)}</strong><span class="badge log-source">${source}</span></div><small>${r1(log.grams)}g · ${esc(log.meal||'未分类')} · ${Math.round(n.calories)} kcal</small></div><button type="button" class="log-delete" data-remove-log="${esc(log.id)}">删除</button></div>`;
      }).join('')}</div></section>`;
  }
  function historyPreview() {
    const days=[];
    for(let i=1;i<=3;i++){const date=shiftDate(state.selectedDate,-i);const totals=logTotals(date);if(logsForDate(date).length)days.push({date,totals});}
    return `<section class="card dashboard-card history-preview-card"><div class="section-heading"><div><h2>历史记录</h2><span class="eyebrow">最近饮食数据</span></div><button class="link-btn" data-action="open-history">查看全部 ›</button></div>${days.length?`<div class="history-preview-list">${days.map(x=>`<button class="history-preview-row" data-history-date="${x.date}"><span><strong>${dateLabel(x.date,false)}</strong><small>${Math.round(x.totals.calories)} 千卡</small></span><span class="history-preview-macros">蛋白质 ${Math.round(x.totals.protein)}g · 脂肪 ${Math.round(x.totals.fat)}g · 碳水 ${Math.round(x.totals.carbs)}g</span><b>›</b></button>`).join('')}</div>`:`<div class="empty compact-empty">有连续记录后，这里会显示最近几天的饮食历史。</div>`}</section>`;
  }

  function historyView() {
    const t=targets();
    const range=state.historyRange||7;
    const days=Array.from({length:range},(_,i)=>shiftDate(todayKey(),-(range-1-i)));
    const maxCalories=Math.max(t.calories*1.2,...days.map(d=>logTotals(d).calories*1.08),1);
    const listDays=[...new Set(state.logs.map(x=>x.date))].filter(d=>d.startsWith(state.historyMonth||todayKey().slice(0,7))).sort((a,b)=>b.localeCompare(a)).slice(0,31);
    return `<section class="screen page history-page">
      <div class="history-topbar"><button class="history-back" data-action="close-history">‹</button><div><h1>历史记录</h1><p class="muted">回顾饮食数据 · 看见长期变化</p></div><span></span></div>
      <div class="history-filters"><button class="history-chip ${range===1?'active':''}" data-history-range="1">今日</button><button class="history-chip ${range===7?'active':''}" data-history-range="7">最近7天</button><button class="history-chip ${range===30?'active':''}" data-history-range="30">最近30天</button><label class="month-filter"><b>${state.historyMonth?`${state.historyMonth.split('-')[0]}年${Number(state.historyMonth.split('-')[1])}月`:'选择月份'}</b><input id="historyMonth" type="month" value="${esc(state.historyMonth||todayKey().slice(0,7))}" aria-label="选择月份"></label></div>
      <section class="card dashboard-card trend-card"><div class="section-heading"><h2>最近 ${range} 天摄入趋势</h2><span class="eyebrow">单位：千卡</span></div><div class="chart-wrap"><div class="target-line" style="bottom:${clamp(t.calories/maxCalories*100,0,100)}%"><span>目标 ${Math.round(t.calories)}</span></div><div class="bar-chart">${days.map(d=>{const val=logTotals(d).calories;const h=clamp(val/maxCalories*100,1,100);return `<button class="bar-item ${d===todayKey()?'today':''}" data-history-date="${d}"><span class="bar" style="height:${h}%"></span><small>${shortDate(d)}</small></button>`;}).join('')}</div></div></section>
      <section class="history-records"><div class="section-heading"><h2>历史记录</h2><span class="eyebrow">按日期（近→远）</span></div>${listDays.length?`<div class="history-record-list">${listDays.map(d=>historyRecordRow(d,t)).join('')}</div>`:`<div class="card empty">还没有历史饮食记录。</div>`}</section>
    </section>${nav()}`;
  }
  function historyRecordRow(date,t) {
    const x=logTotals(date), count=logsForDate(date).length;
    const calPct=Math.round(x.calories/Math.max(1,t.calories)*100);
    const status=date===todayKey()?['进行中','ok']:calPct>105?['超标','danger']:['已完成','ok'];
    return `<button class="history-record-row" data-history-date="${date}"><div class="history-record-head"><div><strong>${dateLabel(date,false)}</strong><b>${Math.round(x.calories)} 千卡</b></div><span class="history-status ${status[1]}">${status[0]}</span></div><div class="history-record-macros"><span>蛋白质 ${Math.round(x.protein)}g <i>${Math.round(x.protein/Math.max(1,t.protein)*100)}%</i></span><span>脂肪 ${Math.round(x.fat)}g <i>${Math.round(x.fat/Math.max(1,t.fat)*100)}%</i></span><span>碳水 ${Math.round(x.carbs)}g <i>${Math.round(x.carbs/Math.max(1,t.carbs)*100)}%</i></span></div><small>${count} 条饮食记录</small><b class="history-chevron">›</b></button>`;
  }

  function fridgeView() {
    const categories=['全部','蔬菜','菌菇','水果','肉蛋','豆制品','水产','主食','乳制品','其他'];
    let items=state.fridge.map(x=>({item:x,food:foodById(x.foodId)})).filter(x=>x.food);
    if(state.fridgeFilter!=='全部') items=items.filter(({food})=>{
      if(state.fridgeFilter==='肉蛋') return ['肉类','禽类','蛋类'].includes(food.category);
      if(state.fridgeFilter==='豆制品') return food.category==='豆类/豆制品';
      if(state.fridgeFilter==='水产') return food.category==='水产';
      if(state.fridgeFilter==='菌菇') return food.category==='菌菇/藻类';
      if(state.fridgeFilter==='水果') return food.category==='水果';
      if(state.fridgeFilter==='主食') return ['谷物/主食','薯类','坚果/种子'].includes(food.category);
      if(state.fridgeFilter==='乳制品') return food.category==='奶制品';
      if(state.fridgeFilter==='蔬菜') return food.category==='蔬菜';
      return !['蔬菜','菌菇/藻类','薯类','水果','肉类','禽类','水产','蛋类','豆类/豆制品','谷物/主食','坚果/种子','奶制品'].includes(food.category);
    });
    return `<section class="screen page">
      <div class="header-row"><div><h1>我的冰箱</h1><p class="muted" style="margin-top:6px">让每一份食材都不被浪费</p></div><button class="primary" data-action="add-fridge">＋ 添加食材</button></div>
      <div class="chips">${categories.map(c=>`<button class="chip ${state.fridgeFilter===c?'active':''}" data-fridge-filter="${c}">${c}</button>`).join('')}</div>
      <div class="food-list">${items.length?items.map(foodRow).join(''):`<div class="empty">这个分类里还没有食材。</div>`}</div>
    </section>${nav()}`;
  }
  function foodRow({item,food}) {
    const st=expiryStatus(item);
    return `<button class="food-row" data-detail="${esc(item.id)}" style="width:100%;border-left:0;border-right:0;border-top:0;text-align:left;background:white;color:inherit">
      <div class="food-main"><strong>${esc(food.nameZh||food.nameEn)}</strong><span>${Math.round(item.grams)}g · ${esc(food.category)}</span></div>
      <div class="food-meta"><time>${fmtDate(item.expiry)}</time><span class="badge ${st.kind==='danger'?'danger':st.kind==='warn'?'warn':''}">${esc(st.label)}</span></div>
      <span class="chev">›</span>
    </button>`;
  }

  function detailView() {
    const item=state.fridge.find(x=>x.id===state.detailId); const food=item&&foodById(item.foodId);
    if(!item||!food){state.detailId=null;return fridgeView();}
    const st=expiryStatus(item), n=food.per100g||{};
    return `<section class="screen detail-screen">
      <div class="detail-topbar"><button class="detail-back" data-action="back-fridge">‹</button><strong>食材详情</strong><button class="detail-edit" data-action="edit-fridge">编辑</button></div>
      <div class="detail-body no-hero"><h1>${esc(food.nameZh||food.nameEn)}</h1><div class="tags"><span class="badge">${esc(food.category)}</span>${food.state&&food.state!=='unspecified'?`<span class="badge">${food.state==='raw'?'生':'熟'}</span>`:''}</div>
        <div class="info-grid"><div class="info-box"><small>当前数量</small><strong>${Math.round(item.grams)}g</strong></div><div class="info-box"><small>保质期</small><strong>${fmtDate(item.expiry)}</strong><div style="margin-top:6px"><span class="badge ${st.kind==='danger'?'danger':st.kind==='warn'?'warn':''}">${esc(st.label)}</span></div></div></div>
        <div class="section-title"><h2>营养成分 <span class="eyebrow">（每100g）</span></h2></div>
        <div class="nutrition-grid">${metric('热量',n.calories,'kcal')}${metric('碳水化合物',n.carbs,'g')}${metric('蛋白质',n.protein,'g')}${metric('膳食纤维',n.fiber,'g')}${metric('脂肪',n.fat,'g')}${metric('钠',n.sodium,'mg')}</div>
        <div class="tip"><strong>小贴士</strong><br>${st.kind==='danger'?'该食材已经到期或过期，不会进入智能推荐。':st.kind==='warn'?'这份食材接近过期，智能推荐会提高它的使用优先级。':'智能推荐会结合营养缺口、库存和过期时间计算建议克数。'}</div>
        <div class="form-actions"><button class="primary" data-action="eat-detail">记录食用</button><button class="secondary" data-action="delete-fridge">删除食材</button></div>
      </div>
    </section>`;
  }
  function metric(label,val,unit){return `<div class="metric"><span>${label}</span><strong>${r1(val||0)} ${unit}</strong></div>`;}

  function recommendView() {
    if(!isToday()){return `<section class="screen page"><div class="history-topbar"><button class="history-back" data-action="back-home-today">‹</button><div><h1>为你推荐</h1><p class="muted">智能推荐只针对今天的库存和营养缺口</p></div><span></span></div><div class="card empty" style="margin-top:16px">你当前正在查看 ${dateLabel(state.selectedDate)}。返回今天后即可生成推荐方案。</div><button class="primary" data-action="back-home-today" style="width:100%;margin-top:14px">返回今天</button></section>${nav()}`;}
    const rem=remaining();
    const valid=state.fridge.filter(x=>x.grams>=5&&expiryStatus(x).kind!=='danger'&&foodById(x.foodId));
    if(!state.lastPlans.length) state.lastPlans=generatePlans(valid,rem);
    return `<section class="screen page">
      <div class="header-row"><div><h1>为你推荐</h1><p class="muted" style="margin-top:6px">基于冰箱现有食材，生成简单又营养的搭配</p></div><img class="header-icon" src="assets/icons/ui-leaf.svg" alt="推荐图标"></div>
      <div class="chips"><button class="chip active">今日推荐</button><button class="chip" disabled>更多食谱</button></div>
      <div class="card flat" style="padding:12px 14px;margin-bottom:14px"><div class="eyebrow">今日还差</div><div style="display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:13px"><strong>${Math.round(rem.calories)} kcal</strong><span>P ${Math.round(rem.protein)}g</span><span>F ${Math.round(rem.fat)}g</span><span>C ${Math.round(rem.carbs)}g</span></div></div>
      <div class="recipe-list">${state.lastPlans.length?state.lastPlans.map((p,i)=>recipeCard(p,i)).join(''):`<div class="card empty">冰箱里可用食材不足。请先添加没有过期的食材。</div>`}</div>
      <button class="secondary" data-action="refresh-plans" style="width:100%;margin-top:14px">重新计算方案</button>
    </section>${nav()}`;
  }
  function recipeCard(plan,index) {
    const names=plan.items.map(x=>foodById(x.foodId)?.nameZh||foodById(x.foodId)?.nameEn).filter(Boolean);
    const title=index===0?'冰箱优先营养餐':index===1?'高蛋白轻食组合':'简单均衡搭配';
    return `<article class="recipe-card"><div><div style="display:flex;justify-content:space-between;gap:8px"><h3>${title}</h3><span class="badge">${Math.round(plan.total.calories)} kcal</span></div><p>${names.slice(0,3).map(esc).join('、')}</p><div class="recipe-meta">${plan.items.slice(0,3).map(x=>`<span class="badge">${esc(foodById(x.foodId)?.nameZh||'食材')} ${x.grams}g</span>`).join('')}</div><button class="link-btn" data-apply-plan="${index}">按这个吃 ›</button></div></article>`;
  }

  function generatePlans(valid, target) {
    if(valid.length<2||target.calories<80) return [];
    let best=[];
    for(let k=0;k<5000;k++){
      const pool=[...valid].sort(()=>Math.random()-.5); const count=Math.min(pool.length,2+Math.floor(Math.random()*3));
      const items=pool.slice(0,count).map(it=>{const max=Math.max(5,Math.min(Number(it.grams)||5,260));const grams=Math.min(max,Math.max(5,Math.round((5+Math.random()*Math.max(0,max-5))/5)*5));return {foodId:it.foodId,grams};});
      const total=items.reduce((a,x)=>{const z=nutrient(foodById(x.foodId),x.grams);Object.keys(a).forEach(key=>a[key]+=z[key]||0);return a;},{calories:0,protein:0,fat:0,carbs:0});
      const diff=(a,b)=>Math.abs(a-b)/Math.max(10,b);
      let score=.75*diff(total.calories,target.calories)+1.2*diff(total.protein,target.protein)+diff(total.fat,target.fat)+diff(total.carbs,target.carbs);
      items.forEach(x=>{const stock=valid.find(s=>s.foodId===x.foodId);const d=daysUntil(stock.expiry);if(d!==null&&d>=0&&d<=5)score-=(6-d)*.02;});
      best.push({score,total,items});best.sort((a,b)=>a.score-b.score);best=best.slice(0,30);
    }
    const unique=[]; for(const p of best){const sig=p.items.map(x=>x.foodId).sort().join('|');if(!unique.some(x=>x.sig===sig)){unique.push({...p,sig});if(unique.length===3)break;}}
    return unique;
  }

  function profileView() {
    const p=state.profile,t=targets();
    return `<section class="screen page">
      <h1>我的</h1><p class="muted" style="margin-top:6px">身体数据、营养目标与个人云端同步</p>
      <div class="card data-card account-card"><div class="data-status"><div><strong>Cloud Account（云端账户）</strong><span>${esc(cloud.user?.email||'')}</span></div><span class="badge">已登录</span></div><div class="account-sync-row"><span id="cloudSyncStatus">${esc(syncStatusText())}</span><button class="secondary compact-btn" type="button" data-action="sync-now">立即同步</button><button class="secondary compact-btn danger-outline" type="button" data-action="logout">退出登录</button></div></div>
      <form id="profileForm" class="card profile-card"><div class="form-grid">
        ${selectField('性别','sex',p.sex,[['female','女'],['male','男']])}
        ${numberField('年龄','age',p.age,14,100,1)}
        ${numberField('身高 cm','height',p.height,120,230,.1)}
        ${numberField('体重 kg','weight',p.weight,30,300,.1)}
        ${numberField('目标体重 kg','targetWeight',p.targetWeight,30,300,.1)}
        ${selectField('活动水平','activity',String(p.activity),[['1.2','久坐'],['1.375','每周1–3次'],['1.55','每周3–5次'],['1.725','每周6–7次'],['1.9','高强度']])}
        ${selectField('目标','goal',p.goal,[['loss','减脂'],['maintain','维持'],['gain','增肌']])}
        <label class="field"><span>手动热量 kcal</span><input name="manualCalories" type="number" min="800" max="6000" step="10" value="${p.manualCalories??''}" placeholder="留空自动计算"></label>
      </div><div class="form-actions"><button class="primary" type="submit">保存并重新计算</button></div></form>
      <div class="card data-card"><div class="data-status"><div><strong>每日建议</strong><span>BMR ${Math.round(t.bmr)} · TDEE ${Math.round(t.tdee)} kcal</span></div><span class="badge">${t.label}</span></div><div class="nutrition-grid">${metric('热量',t.calories,'kcal')}${metric('蛋白质',t.protein,'g')}${metric('脂肪',t.fat,'g')}${metric('碳水',t.carbs,'g')}</div></div>
      <div class="card data-card"><div class="data-status"><div><strong>Food Database（食材数据库）</strong><span>内置中文常用食材库 · ${state.foodMeta.count.toLocaleString()} 条 · ${foodCategoryCount()} 类</span></div><span class="badge">已就绪</span></div>
        <p class="muted" style="font-size:12px;line-height:1.55;margin-top:10px">支持中文名称、常用别名、英文名称搜索，并区分生、熟、干重与即食状态。营养值用于日常记录参考，品牌、品种和烹饪方式不同会产生差异；扩展条目为通用参考值。</p>
        <button class="secondary" type="button" data-action="browse-foods" style="width:100%;margin-top:12px">浏览 / 搜索食材库</button>
      </div>
      <div class="card data-card"><strong>本地备份</strong><p class="muted" style="font-size:12px;line-height:1.5;margin-top:6px">日常数据会自动同步到当前账号；这里仍可导出 JSON 作为额外备份。</p><div class="form-actions"><button class="secondary" type="button" data-action="backup">导出备份</button><label class="secondary" style="display:flex;align-items:center;justify-content:center;cursor:pointer">恢复备份<input id="restoreInput" type="file" accept="application/json" hidden></label></div></div>
      <p class="eyebrow" style="text-align:center;margin-top:16px">Nutrition Planner ${APP_VERSION}</p>
    </section>${nav()}`;
  }
  function numberField(label,name,value,min,max,step){return `<label class="field"><span>${label}</span><input name="${name}" type="number" min="${min}" max="${max}" step="${step}" value="${esc(value)}" required></label>`;}
  function selectField(label,name,value,opts){return `<label class="field"><span>${label}</span><select name="${name}">${opts.map(([v,l])=>`<option value="${v}" ${String(value)===String(v)?'selected':''}>${l}</option>`).join('')}</select></label>`;}

  const preferredFoodCategories=['蔬菜','菌菇/藻类','薯类','水果','肉类','禽类','水产','蛋类','豆类/豆制品','谷物/主食','奶制品','坚果/种子','油脂','调味品','饮品','加工食品/速食','零食/甜品'];
  function foodSearchCategories(){
    const available=new Set(state.foods.map(f=>f.category).filter(Boolean));
    const ordered=preferredFoodCategories.filter(c=>available.has(c));
    const extra=[...available].filter(c=>!preferredFoodCategories.includes(c)).sort((a,b)=>a.localeCompare(b,'zh-CN'));
    return ['全部',...ordered,...extra];
  }
  function foodCategoryCount(){ return new Set(state.foods.map(f=>f.category).filter(Boolean)).size; }
  const foodSearchStates=[['全部','全部状态'],['raw','生'],['cooked','熟'],['dry','干重'],['ready','即食']];
  function stateLabel(food){
    return food?.stateLabel || ({raw:'生',cooked:'熟',dry:'干重',ready:'即食',unspecified:'未区分'}[food?.state]||'未区分');
  }
  function searchFiltersMarkup(){
    return `<div class="search-filter-row"><label class="mini-field"><span>分类</span><select id="foodCategoryFilter">${foodSearchCategories().map(c=>`<option value="${esc(c)}" ${state.foodSearchCategory===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label><label class="mini-field"><span>状态</span><select id="foodStateFilter">${foodSearchStates.map(([v,l])=>`<option value="${v}" ${state.foodSearchState===v?'selected':''}>${l}</option>`).join('')}</select></label></div>`;
  }

  function addFridgeModal(editItem=null) {
    const food=editItem?foodById(editItem.foodId):null;
    return `<div class="modal-backdrop"><div class="modal"><div class="modal-head"><div><h2>${editItem?'编辑冰箱食材':'添加食材'}</h2><p class="muted" style="font-size:12px;margin-top:4px">库存克数 + 过期日期</p></div><button class="close" data-action="close-modal">×</button></div>
      ${editItem?`<div class="card flat text-food-summary"><div><strong>${esc(food.nameZh||food.nameEn)}</strong><div class="eyebrow">${esc(food.nameEn||'')}</div></div></div>`:`<label class="field full" style="margin-top:14px"><span>搜索食材</span><input id="foodSearch" placeholder="例如：鸡胸肉、豆腐、米饭"></label>${searchFiltersMarkup()}<div id="searchResults" class="results"></div>`}
      <form id="fridgeForm" style="margin-top:14px">${!editItem?`<input type="hidden" name="foodId" id="selectedFoodId">`: `<input type="hidden" name="foodId" value="${esc(editItem.foodId)}">`}
      <div class="inline-grid"><label class="field"><span>库存克数</span><input name="grams" type="number" min="1" max="10000" value="${editItem?editItem.grams:300}" required></label><label class="field"><span>低库存提醒</span><input name="low" type="number" min="0" max="5000" value="${editItem?editItem.low:100}" required></label></div>
      <label class="field full" style="margin-top:10px"><span>Expiry Date（过期日期）</span><input name="expiry" type="date" value="${editItem?esc(editItem.expiry||''):dateOffset(5)}"></label>
      <button class="primary" type="submit" style="width:100%;margin-top:16px">${editItem?'保存修改':'加入冰箱'}</button></form>
    </div></div>`;
  }

  function addLogModal(prefillFoodId=null) {
    const food=prefillFoodId?foodById(prefillFoodId):null;
    return `<div class="modal-backdrop"><div class="modal"><div class="modal-head"><div><h2>记录饮食</h2><p class="muted" style="font-size:12px;margin-top:4px">按实际食用克数自动计算营养</p></div><button class="close" data-action="close-modal">×</button></div>
      ${food?`<div class="card flat text-food-summary"><div><strong>${esc(food.nameZh||food.nameEn)}</strong><div class="eyebrow">每100g ${Math.round(food.per100g?.calories||0)} kcal</div></div></div>`:`<label class="field full" style="margin-top:14px"><span>搜索食材</span><input id="foodSearch" placeholder="搜索日常食材"></label>${searchFiltersMarkup()}<div id="searchResults" class="results"></div>`}
      <form id="logForm" style="margin-top:14px"><input type="hidden" name="foodId" id="selectedFoodId" value="${prefillFoodId||''}"><div class="inline-grid"><label class="field"><span>克数</span><input name="grams" type="number" min="1" max="2000" value="100" required></label><label class="field"><span>餐次</span><select name="meal"><option>早餐</option><option>午餐</option><option>晚餐</option><option>加餐</option></select></label></div><div class="log-date-note">记录日期：<strong>${dateLabel(state.selectedDate||todayKey())}</strong></div><label style="display:flex;gap:8px;align-items:center;margin-top:12px;font-size:13px"><input name="consumeStock" type="checkbox" ${isToday()?'checked':''}>如果冰箱里有该食材，同时扣减当前库存</label><button class="primary" type="submit" style="width:100%;margin-top:16px">完成记录</button></form>
    </div></div>`;
  }

  function browseFoodsModal() {
    return `<div class="modal-backdrop"><div class="modal"><div class="modal-head"><div><h2>中文常用食材库</h2><p class="muted" style="font-size:12px;margin-top:4px">${state.foodMeta.count.toLocaleString()} 条 · ${foodCategoryCount()} 类 · 中文 / 别名 / 英文搜索</p></div><button class="close" data-action="close-modal">×</button></div><label class="field full" style="margin-top:14px"><span>搜索食材</span><input id="foodSearch" placeholder="例如：西红柿、鸡胸肉、豆腐、糙米"></label>${searchFiltersMarkup()}<div id="searchResults" class="results"></div><p class="muted" style="font-size:11px;line-height:1.5;margin-top:12px">提示：同一种食材如果营养密度会因含水量明显变化，会分别提供生、熟或干重条目。</p></div></div>`;
  }

  function render() {
    if(!cloud.initialized || !cloud.config || !cloud.session || !cloud.user || cloud.authError) { ROOT.innerHTML=authView(); bindAuthEvents(); return; }
    if(cloud.migrationPending) { ROOT.innerHTML=migrationView(); bindMigrationEvents(); return; }
    ROOT.innerHTML = state.historyOpen ? historyView() : state.detailId ? detailView() : state.tab==='home'?homeView():state.tab==='fridge'?fridgeView():state.tab==='recommend'?recommendView():profileView();
    if(state.modal==='add-fridge') ROOT.insertAdjacentHTML('beforeend',addFridgeModal());
    if(state.modal==='edit-fridge'){const item=state.fridge.find(x=>x.id===state.detailId);ROOT.insertAdjacentHTML('beforeend',addFridgeModal(item));}
    if(state.modal?.startsWith('add-log')){const id=state.modal.split(':')[1]||null;ROOT.insertAdjacentHTML('beforeend',addLogModal(id));}
    if(state.modal==='browse-foods') ROOT.insertAdjacentHTML('beforeend',browseFoodsModal());
    bindEvents();
  }

  function normalizeSearch(value='') {
    return String(value).toLowerCase().replace(/[（）()\[\]【】,，.。\s_-]+/g,'');
  }
  function searchFoods(q) {
    const text=normalizeSearch(q);
    let rows=state.foods.filter(f=>{
      if(state.foodSearchCategory!=='全部' && f.category!==state.foodSearchCategory) return false;
      if(state.foodSearchState!=='全部' && f.state!==state.foodSearchState) return false;
      if(!text) return true;
      const hay=normalizeSearch([f.nameZh,f.nameEn,f.category,stateLabel(f),...(f.aliases||[])].filter(Boolean).join(' '));
      return hay.includes(text);
    });
    // Prefer exact/starts-with Chinese matches, then alphabetical stable order.
    rows.sort((a,b)=>{
      const an=normalizeSearch(a.nameZh||a.nameEn),bn=normalizeSearch(b.nameZh||b.nameEn);
      const ae=text&&an===text?0:text&&an.startsWith(text)?1:2;
      const be=text&&bn===text?0:text&&bn.startsWith(text)?1:2;
      return ae-be || (a.category||'').localeCompare(b.category||'','zh-CN') || an.localeCompare(bn,'zh-CN');
    });
    return rows.slice(0,60);
  }
  function renderSearchResults(q) {
    const box=document.getElementById('searchResults'); if(!box) return;
    const rows=searchFoods(q);
    box.innerHTML=rows.length?rows.map(f=>`<button type="button" class="result-row" data-pick-food="${esc(f.id)}"><span class="result-copy"><strong>${esc(f.nameZh||f.nameEn)}</strong><small>${esc(f.category)} · ${esc(stateLabel(f))} · ${Math.round(f.per100g?.calories||0)} kcal/100g</small><small>${esc(f.nameEn||'')}</small></span></button>`).join(''):`<div class="empty">没有找到符合条件的食材。</div>`;
    box.querySelectorAll('[data-pick-food]').forEach(btn=>btn.addEventListener('click',()=>{
      const id=btn.dataset.pickFood; const input=document.getElementById('selectedFoodId');
      // Browse mode has no hidden selection input, so clicking simply leaves the row visible.
      if(!input) return;
      input.value=id; const f=foodById(id);
      box.innerHTML=`<div class="result-row selected-result"><span class="result-copy"><strong>已选择：${esc(f.nameZh||f.nameEn)}</strong><small>${esc(f.category)} · ${esc(stateLabel(f))} · ${Math.round(f.per100g?.calories||0)} kcal/100g</small></span></div>`;
    }));
  }

  function bindEvents() {
    document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{state.tab=b.dataset.tab;state.detailId=null;state.historyOpen=false;state.lastPlans=[];if(state.tab!=='home')state.selectedDate=todayKey();render();}));
    document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',handleAction));
    document.querySelectorAll('[data-fridge-filter]').forEach(b=>b.addEventListener('click',()=>{state.fridgeFilter=b.dataset.fridgeFilter;render();}));
    document.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>{state.detailId=b.dataset.detail;render();}));
    document.querySelectorAll('[data-apply-plan]').forEach(b=>b.addEventListener('click',()=>applyPlan(Number(b.dataset.applyPlan))));
    document.querySelectorAll('[data-remove-log]').forEach(b=>b.addEventListener('click',()=>removeLog(b.dataset.removeLog)));
    document.querySelectorAll('[data-remove-plan]').forEach(b=>b.addEventListener('click',()=>removePlan(b.dataset.removePlan)));
    document.querySelectorAll('[data-history-date]').forEach(b=>b.addEventListener('click',()=>{state.selectedDate=b.dataset.historyDate;state.historyOpen=false;state.tab='home';render();}));
    document.querySelectorAll('[data-history-range]').forEach(b=>b.addEventListener('click',()=>{state.historyRange=Number(b.dataset.historyRange)||7;render();}));
    const hdp=document.getElementById('homeDatePicker'); if(hdp)hdp.addEventListener('change',e=>{state.selectedDate=e.target.value||todayKey();state.lastPlans=[];render();});
    const hm=document.getElementById('historyMonth'); if(hm)hm.addEventListener('change',e=>{state.historyMonth=e.target.value||todayKey().slice(0,7);render();});
    const s=document.getElementById('foodSearch'); if(s){renderSearchResults(s.value||'');s.addEventListener('input',e=>renderSearchResults(e.target.value));}
    const cf=document.getElementById('foodCategoryFilter'); if(cf)cf.addEventListener('change',e=>{state.foodSearchCategory=e.target.value;renderSearchResults(document.getElementById('foodSearch')?.value||'');});
    const sf=document.getElementById('foodStateFilter'); if(sf)sf.addEventListener('change',e=>{state.foodSearchState=e.target.value;renderSearchResults(document.getElementById('foodSearch')?.value||'');});
    const ff=document.getElementById('fridgeForm'); if(ff)ff.addEventListener('submit',saveFridgeForm);
    const lf=document.getElementById('logForm'); if(lf)lf.addEventListener('submit',saveLogForm);
    const pf=document.getElementById('profileForm'); if(pf)pf.addEventListener('submit',saveProfileForm);
    const fi=document.getElementById('foodImport'); if(fi)fi.addEventListener('change',importFoodFile);
    const ri=document.getElementById('restoreInput'); if(ri)ri.addEventListener('change',restoreBackup);
  }

  function handleAction(e) {
    const a=e.currentTarget.dataset.action;
    if(a==='profile'){state.tab='profile';render();}
    if(a==='fridge'||a==='back-fridge'){state.tab='fridge';state.detailId=null;render();}
    if(a==='recommend'){state.tab='recommend';state.lastPlans=[];render();}
    if(a==='add-fridge'){state.foodSearchCategory='全部';state.foodSearchState='全部';state.modal='add-fridge';render();}
    if(a==='add-log'){state.foodSearchCategory='全部';state.foodSearchState='全部';state.modal='add-log';render();}
    if(a==='close-modal'){state.modal=null;render();}
    if(a==='edit-fridge'){state.modal='edit-fridge';render();}
    if(a==='eat-detail'){const item=state.fridge.find(x=>x.id===state.detailId);if(item){state.foodSearchCategory='全部';state.foodSearchState='全部';state.modal=`add-log:${item.foodId}`;render();}}
    if(a==='delete-fridge'){state.fridge=state.fridge.filter(x=>x.id!==state.detailId);state.detailId=null;saveState();toast('已从冰箱移除');render();}
    if(a==='refresh-plans'){state.lastPlans=[];render();}
    if(a==='back-home-today'){state.selectedDate=todayKey();state.tab='home';state.historyOpen=false;state.lastPlans=[];render();}
    if(a==='clear-today-logs'){clearTodayLogs();}
    if(a==='analysis'){state.historyOpen=true;state.historyRange=7;render();}
    if(a==='open-history'){state.historyOpen=true;state.historyRange=7;render();}
    if(a==='close-history'){state.historyOpen=false;render();}
    if(a==='backup')exportBackup();
    if(a==='sync-now'){syncCloudState(true).then(()=>{toast(cloud.syncError?'同步失败':'同步完成');updateSyncIndicator();});}
    if(a==='logout'){signOutCloud();}
    if(a==='browse-foods'){state.foodSearchCategory='全部';state.foodSearchState='全部';state.modal='browse-foods';render();}
  }

  function saveFridgeForm(e) {
    e.preventDefault(); const fd=new FormData(e.currentTarget); const foodId=fd.get('foodId');
    if(!foodId){toast('请先选择食材');return;}
    const values={grams:Number(fd.get('grams')),low:Number(fd.get('low')),expiry:String(fd.get('expiry')||'')};
    if(state.modal==='edit-fridge'){
      const item=state.fridge.find(x=>x.id===state.detailId); if(item)Object.assign(item,values);
    } else {
      const same=state.fridge.find(x=>x.foodId===foodId&&x.expiry===values.expiry);
      if(same){same.grams+=values.grams;same.low=values.low;} else state.fridge.unshift({id:cryptoId(),foodId,...values});
    }
    saveState(); state.modal=null; toast('冰箱已更新'); render();
  }
  function saveLogForm(e) {
    e.preventDefault(); const fd=new FormData(e.currentTarget); const foodId=fd.get('foodId'); if(!foodId){toast('请先选择食材');return;}
    const grams=Number(fd.get('grams')); const meal=String(fd.get('meal')); const consume=fd.get('consumeStock')==='on';
    const stockRef=consume?deductStock(foodId,grams):null;
    state.logs.push({id:cryptoId(),foodId,grams,meal,source:'manual',stockRef,date:state.selectedDate||todayKey(),createdAt:new Date().toISOString()});
    saveState();state.modal=null;state.lastPlans=[];toast('已记录，可在首页删除');render();
  }
  function saveProfileForm(e) {
    e.preventDefault(); const fd=new FormData(e.currentTarget);
    state.profile={sex:fd.get('sex'),age:Number(fd.get('age')),height:Number(fd.get('height')),weight:Number(fd.get('weight')),targetWeight:Number(fd.get('targetWeight')),activity:Number(fd.get('activity')),goal:fd.get('goal'),manualCalories:fd.get('manualCalories')?Number(fd.get('manualCalories')):null};
    saveState();state.lastPlans=[];toast('目标已更新');render();
  }
  function applyPlan(index) {
    const plan=state.lastPlans[index]; if(!plan)return;
    const planId=cryptoId();
    plan.items.forEach(x=>{
      const stockRef=deductStock(x.foodId,x.grams);
      state.logs.push({id:cryptoId(),foodId:x.foodId,grams:x.grams,meal:'推荐餐',source:'recommend',planId,stockRef,date:state.selectedDate||todayKey(),createdAt:new Date().toISOString()});
    });
    saveState();state.lastPlans=[];state.tab='home';render();
    toast('推荐已加入今日饮食记录，可直接删除或撤销');
    requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById('today-log-section')?.scrollIntoView({behavior:'smooth',block:'start'})));
  }

  function removeLog(logId) {
    const log=state.logs.find(x=>x.id===logId); if(!log)return;
    const restored=restoreStockForLog(log);
    state.logs=state.logs.filter(x=>x.id!==logId);
    state.lastPlans=[];saveState();
    toast(restored>0?`已删除记录，并恢复 ${r1(restored)}g 库存`:'已删除记录');
    render();
  }
  function removePlan(planId) {
    const logs=state.logs.filter(x=>x.planId===planId); if(!logs.length)return;
    let restored=0; logs.forEach(x=>{restored+=restoreStockForLog(x);});
    state.logs=state.logs.filter(x=>x.planId!==planId);
    state.lastPlans=[];saveState();
    toast(restored>0?'已撤销推荐并恢复库存':'已撤销推荐');
    render();
  }
  function clearTodayLogs() {
    const day=state.selectedDate||todayKey(), logs=state.logs.filter(x=>x.date===day);
    if(!logs.length){toast('这个日期还没有饮食记录');return;}
    let restored=0; logs.forEach(x=>{restored+=restoreStockForLog(x);});
    state.logs=state.logs.filter(x=>x.date!==day);
    state.lastPlans=[];saveState();
    toast(restored>0?'已清空本日记录，并恢复可追溯库存':'已清空本日记录');
    render();
  }

  async function importFoodFile(e) {
    const file=e.target.files?.[0]; if(!file)return;
    try{
      const foods=JSON.parse(await file.text()); if(!Array.isArray(foods)||foods.length<100)throw new Error('食材数量过少或格式不正确');
      await idbReplaceFoods(foods); state.foods=foods; state.foodMeta={mode:'indexeddb-usda',count:foods.length}; toast(`已导入 ${foods.length.toLocaleString()} 条食材`);render();
    }catch(err){console.error(err);toast('导入失败：请使用脚本生成的 USDA JSON');}
    e.target.value='';
  }
  function exportBackup() {
    const payload={version:APP_VERSION,exportedAt:new Date().toISOString(),profile:state.profile,fridge:state.fridge,logs:state.logs};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`nutrition-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(a.href);
  }
  async function restoreBackup(e) {
    const file=e.target.files?.[0]; if(!file)return;
    try{const d=JSON.parse(await file.text());if(!d.profile||!Array.isArray(d.fridge)||!Array.isArray(d.logs))throw new Error('invalid');state.profile=d.profile;state.fridge=d.fridge;state.logs=d.logs;saveState();toast('备份已恢复');render();}catch{toast('备份文件格式不正确');}e.target.value='';
  }
  function toast(msg) {
    document.querySelector('.toast')?.remove(); const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2200);
  }

  function registerServiceWorker() {
    if(!('serviceWorker' in navigator) || location.protocol==='file:') return;
    navigator.serviceWorker.register('/sw.js', {updateViaCache:'none'}).then(reg=>reg.update()).catch(console.warn);
  }
  function init() {
    state.foodMeta = {mode: state.foods.length > 100 ? 'cached-zh-common' : 'starter-demo', count: state.foods.length};
    render();
    registerServiceWorker();
    initCloudAuth();
    // Full food data is a background enhancement and remains cached locally.
    loadFoods().then(() => {
      state.foodMeta.count = state.foods.length;
      if(cloud.initialized) render();
    }).catch(err => console.warn('Food refresh failed', err));
  }
  try { init(); }
  catch(err) { console.error(err); ROOT.innerHTML=`<div class="page"><h2>启动失败</h2><p class="muted" style="margin-top:8px">${esc(err.message)}</p></div>`; }
})();
