FROM onfinality/subql-node:latest

COPY ./ /app

RUN apk add --no-cache python3 py3-pip make g++\
    && rm -rf /var/cache/apk/*
RUN cd app\
    && yarn install\
    && yarn codegen && yarn build

CMD ["-f=/app", "--db-schema=app", "--log-level=debug", "--disable-historical=false", "--progress=plain"]