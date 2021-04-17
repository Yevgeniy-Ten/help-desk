FROM node:15.11.0
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT ["sequeilize:db:create"]
ENTRYPOINT ["sequeilize:db:seed:all"]
CMD [ "npm", "run", "start" ]

