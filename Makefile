IMAGE_TAG ?= latest

build_base_image:
	IMAGE_TAG=$(IMAGE_TAG) docker-compose build base

ci_docker_jstest: build_base_image
	IMAGE_TAG=$(IMAGE_TAG) docker-compose run --rm test yarn test

ci_docker_push: build_base_image ci_docker_jstest
	docker push dockerhub..org/aa-react:$(IMAGE_TAG)

demo: build_base_image
	IMAGE_TAG=$(IMAGE_TAG) docker-compose run --rm test yarn run build-storybook

build_locale: build_base_image
	IMAGE_TAG=$(IMAGE_TAG) docker-compose run --rm test yarn run build-locale

clean_image:
	docker rmi -f dockerhub..org/aa-react:$(IMAGE_TAG)
