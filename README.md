# 孙雨霏 · 个人简历页面

这是一个零构建工具、零外部依赖的个人简历网页，仅依赖 Node.js (≥ 18)。

## 本地预览

```bash
cd resume
node preview-server.js          # 默认监听 http://127.0.0.1:8080
node preview-server.js 3000     # 自定义端口
```

打开浏览器访问 `http://127.0.0.1:8080/` 即可预览简历。

## 部署到 GitHub Pages

部署脚本会帮你：

1. 调用 GitHub API 创建名为 `resume` 的公开仓库
2. 推送当前目录内容到 `main` 分支
3. 启用 GitHub Pages
4. 输出公网 URL

### 1. 准备 Token

访问 https://github.com/settings/tokens/new 生成一个 **Fine-grained personal access token** 或经典 PAT：

- 经典 PAT：勾选 `repo` 全部权限
- Fine-grained：Repository access 选 `All repositories` 或只勾选 `resume`，Permissions 勾选 `Contents: Read and write` 与 `Pages: Read and write`

### 2. 方式 A — 环境变量（推荐）

Windows PowerShell:

```powershell
$env:GITHUB_USERNAME="你的GitHub用户名"
$env:GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
node deploy.js
```

macOS / Linux (bash):

```bash
GITHUB_USERNAME=yourname GITHUB_TOKEN=ghp_xxx node deploy.js
```

### 2. 方式 B — 编辑 `deploy.js`

打开 `deploy.js`，把 CONFIG 中的四个占位符替换为你的用户名和 Token，然后：

```bash
node deploy.js
```

### 3. 部署完成后

脚本会输出类似这样的地址：

```
GitHub Pages: https://<username>.github.io/resume
```

首次启用 GitHub Pages 需要 1~2 分钟才能访问。

## 文件说明

- `index.html` — 简历主页
- `preview-server.js` — 本地预览（零依赖）
- `deploy.js` — 一键部署脚本
- `package.json` — npm 快捷脚本 (`npm run preview` / `npm run deploy`)