# Website for graphinsight

##################################### Builder ####################################
from docker.io/library/node:16 AS builder

COPY . /workspace/G6VP

# change the default shell to bash
SHELL ["/bin/bash", "-c"]

# gi-httpservice
RUN cd /workspace/G6VP/packages/gi-httpservice && rm -fr node_modules && npm install && npm run build:docker

# copy gi-site files to gi-httpservice
RUN cp /workspace/G6VP/packages/gi-site/dist/index.html /workspace/G6VP/packages/gi-httpservice/app/view/ && \
  cp -r /workspace/G6VP/packages/gi-site/dist/* /workspace/G6VP/packages/gi-httpservice/app/public/


##################################### Runtime ####################################
from docker.io/library/node:16-alpine

COPY --from=builder /workspace/G6VP/packages/gi-httpservice /workspace/graphinsight
COPY --from=builder /workspace/G6VP/packages/gi-site/docker/docker-entrypoint.sh /workspace/docker-entrypoint.sh

RUN npm install -g npm@9.4.2

# entrypoint
ENTRYPOINT ["/workspace/docker-entrypoint.sh"]
