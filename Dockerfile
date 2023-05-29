FROM node:16-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app


# copy source code to /app/src folder
COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "prd" ]