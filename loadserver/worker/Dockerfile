# node base image to use
FROM node

# official maintainer
MAINTAINER Christian Haug

# create src directory
RUN mkdir -p /src
WORKDIR /src

# copy dependency files and install them
COPY package.json /src
RUN npm install

# copy master src code
COPY . /src

# container port to expose
EXPOSE 4000

# default command to execute when starting master container
CMD ["nodemon", "worker.js"]