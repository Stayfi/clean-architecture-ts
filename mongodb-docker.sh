docker volume create --name=mongodata
docker run -d -p 27017:27017 -v mongodata:/data/db mongo
