
### 03 如何发布版本

G6VP 采用 [changesets](https://pnpm.io/using-changesets) 来进行包版本管理和发布，因此不需要手动维护版本号，只需要在提交代码时，使用`pnpm run changeset`来生成对应的版本号即可。

- 1. 发布前准备

按照下列步骤选择要发布的子包并更新版本号

```bash
# 本地全部重新安装依赖，并且执行通过 build:all:es 和 build:all:umd

pnpm install --force

npm run build:all:umd

# 添加需要发布的子包
pnpm changeset

# 更新子包版本号，并生成 changeset 文件
pnpm changeset version
```

- 2. 进入 packages/gi-site 目录，使用如下命令以 docker 模式构建产物

```bash
npm run build:docker
```

- 3. 进入 G6VP 主目录，执行如下脚本构建自定义 docker 镜像

```bash
./build.sh
```
