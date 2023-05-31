docker buildx build --platform linux/amd64 -t harbor.tuhutest.cn/mlp-algo-serving/g6vp:v0.0.3 -f packages/gi-site/docker/gi-site.Dockerfile --network=host .
