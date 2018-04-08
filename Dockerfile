#
# ---- Build ---
FROM tislaamo/node:8 AS build

ADD package.json .

RUN yarn install

ADD . .

RUN yarn build

#
# ---- Release ----
FROM tislaamo/nginx AS release

COPY --from=build /home/node/app/dist /usr/share/nginx/html