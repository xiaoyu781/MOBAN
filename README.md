# Nutrition Planner v1.3.2 - Mobile Fast Load

- 首屏不再等待完整食材数据库下载，优先使用本地缓存/内置基础食材立即显示。
- 完整 313 条中文食材库在后台刷新，并缓存到手机本地。
- Service Worker 改为移动端友好的快速回退策略，弱网/断网优先打开已缓存界面。
- 静态 JS/CSS/图标使用长期缓存，HTML 与 Service Worker 保持即时更新。
- Vercel 根目录版，可直接部署。



## v1.3.3 mobile reliability
- Navigation is cache-first after first successful load.
- Removed the 1.6 second navigation abort that could surface as “server stopped responding” on mobile.
- Removed missing icon files from the Service Worker precache list.
- Added a readable offline/connection fallback page.
