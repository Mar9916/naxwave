# NAXWAVE Pet Safety 独立站框架

基于 Astro 静态输出，目标部署到 Cloudflare Pages。网站英文；本说明及 `.pages.yml` CMS 字段标签为中文。

## 本地预览

```bash
npm install
npm run dev
```

生产构建：`npm run build`，静态产物在 `dist/`。

## 页面

- `/` 首页
- `/products/nax100/`、`/products/nax101/` 产品详情及比较入口
- `/oem-odm/` 合作能力
- `/solutions/` 应用方案
- `/resources/` 博客与采购指南入口
- `/contact/` 询盘与样品申请

## 内容维护

Pages CMS 配置草稿位于 `.pages.yml`。将仓库连接到 Pages CMS 后，可管理 `src/data/products/` 内产品 JSON 及 `src/blog/` 内博客 Markdown。未确认的规格、认证、MOQ、交期、价格和企业资料留空或标记待补。

## Cloudflare 询盘配置

询盘函数位于 `functions/api/inquiries.ts`，D1 表结构为 `migrations/0001_inquiries.sql`。创建 D1 数据库后，将 `wrangler.toml` 中 `database_id` 替换为实际 ID，并在 Pages 项目绑定 D1，绑定变量名为 `DB`。联系表单已调用 `/api/inquiries`；部署前需创建数据库、应用迁移并补充隐私政策及询盘通知方式。

命令顺序：

1. `npm run d1:create` 创建 D1；将命令返回的 ID 填入 `wrangler.toml`。
2. `npm run d1:migrate:remote` 建立线上数据表。
3. `npm run build` 后执行 `npm run deploy` 发布到 Cloudflare Pages。
4. 本地需要 Functions 时先构建，再运行 `npm run preview:pages`。

部署需先在 Cloudflare 登录 Wrangler，并在 Cloudflare 创建/授权 Pages 项目。GitHub 自动构建可在 Pages 控制台连接仓库并使用 `npm run build`、产物目录 `dist`。

## 待补资料

- 实际经营主体法定名称及对外地址/联系信息
- NAX100、NAX101 已确认产品参数、认证及产品图
- MOQ、交期、价格/报价方式、样品政策
- 研发制造能力及可公开证据
- OEM/ODM 合作范围、流程及限制
- 隐私政策、询盘接收与内部跟进人
- Cloudflare D1 数据库 ID 与生产域名
