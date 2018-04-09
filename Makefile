build:
	npm run build

docker-build:
	docker build -t latenssi/puzzle-demo .

docker-push:
	docker push latenssi/puzzle-demo