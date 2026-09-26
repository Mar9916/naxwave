# NAXWAVE Pet Safety 独立站

## 当前线上环境

- 网站：<https://naxwave-pet-safety.pages.dev>
- GitHub：`Mar9916/naxwave`，生产分支 `codex/pet-safety-site`
- Cloudflare Pages：仓库更新后自动构建发布，Astro 命令 `npm run build`，产物目录 `dist`
- 询盘数据库：D1 `naxwave-pet-inquiries`，绑定名 `DB`，表 `inquiries`

## Pages CMS 内容维护

1. 打开 <https://app.pagescms.org/> 并用 GitHub 登录。
2. 按提示为 `Mar9916` 安装 Pages CMS GitHub App，仅授予 `naxwave` 仓库访问权限。
3. 打开仓库并选择生产分支 `codex/pet-safety-site`。
4. 产品内容位于 `src/data/products/`，博客位于 `src/blog/`。保存到 GitHub 后 Cloudflare 会自动重新部署。

产品参数、图片、认证、MOQ、交期、价格、制造能力、经营主体和隐私政策，只能在取得确认资料后补充。

## 查看询盘

在 Cloudflare 控制台打开 **Storage & databases → D1 → naxwave-pet-inquiries**，进入 SQL Console 查询：

```sql
SELECT created_at, name, email, company, country, interest, quantity, message
FROM inquiries
ORDER BY created_at DESC;
```

目前表单通过 Pages Function `/api/inquiries` 写入 D1，包含隐藏字段垃圾提交拦截、字段长度限制及服务端必填校验。数据库不会自动发送邮件通知；请定期查看该表。隐私政策和实际经营主体资料仍待补充。

## 本地开发

```bash
npm install
npm run dev
```

Cloudflare 配置位于 `wrangler.toml`，询盘 API 位于 `functions/api/inquiries.ts`，表结构迁移位于 `migrations/0001_inquiries.sql`。

