# This Makefile is here just to make my life easier
# It is by no means required

build:
	npm run build

demo:
	docker build -t puzzle-demo .
	docker run --rm -p 8080:80 puzzle-demo

docker-build:
	docker build -t latenssi/puzzle-demo .

docker-push: docker-build
	docker push latenssi/puzzle-demo