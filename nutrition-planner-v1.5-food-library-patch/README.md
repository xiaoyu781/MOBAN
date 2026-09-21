# Nutrition Planner v1.5.0 - Expanded Food Library + Cloud Accounts

- 首屏不再等待完整食材数据库下载，优先使用本地缓存/内置基础食材立即显示。
- 完整 800 条中文食材库在后台刷新，并缓存到手机本地。
- Service Worker 改为移动端友好的快速回退策略，弱网/断网优先打开已缓存界面。
- 静态 JS/CSS/图标使用长期缓存，HTML 与 Service Worker 保持即时更新。
- Vercel 根目录版，可直接部署。



## v1.3.3 mobile reliability
- Navigation is cache-first after first successful load.
- Removed the 1.6 second navigation abort that could surface as “server stopped responding” on mobile.
- Removed missing icon files from the Service Worker precache list.
- Added a readable offline/connection fallback page.


## v1.4.0 cloud accounts
- Supabase Email/Password login and registration.
- Same domain, separate per-user cloud data protected by RLS.
- Lossless cloud sync for existing `profile`, `fridge`, and `logs` state through `user_app_state`.
- First-login migration prompt prevents silently assigning old local data to the wrong account.
- Vercel `/api/config.js` reads the public Supabase URL and publishable key from project environment variables.
- Existing local JSON backup remains available as a secondary backup.


## v1.5.0 食材库升级
- 食材库从 313 条扩展到 800 条。
- 分类扩展为 17 类，新增：菌菇/藻类、薯类、加工食品/速食、零食/甜品。
- 食材分类下拉改为动态生成，后续继续扩库无需再手工维护分类数组。
- 冰箱筛选新增“菌菇”，主食筛选同时覆盖薯类。
- 单次搜索展示上限由 40 条提高到 60 条。
- 扩展条目为通用参考营养值，不等同于具体品牌或具体烹饪成品。
