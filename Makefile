.PHONY: reviews-service go-get-data-service ssr-service client-service

go-get-data-service:
	cd go && docker build -t k8s/go-get-data-service:latest .

reviews-service:
	cd reviews-service && docker build -f Dockerfile.prod -t k8s/reviews-service:latest .

ssr-service:
	cd ssr && docker build -f Dockerfile.prod -t k8s/ssr-service:latest .

client-service:
	cd ssr/client && docker build -f Dockerfile.prod -t k8s/client-service:latest .

build: go-get-data-service reviews-service ssr-service client-service

docker-push: build
	docker tag k8s/reviews-service manedurphy/reviews-service
	docker tag k8s/go-get-data-service manedurphy/go-get-data-service
	docker tag k8s/ssr-service manedurphy/ssr-service
	docker tag k8s/client-service manedurphy/client-service
	docker push manedurphy/reviews-service
	docker push manedurphy/go-get-data-service
	docker push manedurphy/ssr-service
	docker push manedurphy/client-service

cluster:
	kind create cluster --config kind.yaml

load: build
	kind load docker-image k8s/go-get-data-service:latest
	kind load docker-image k8s/reviews-service:latest
	kind load docker-image k8s/ssr-service:latest
	kind load docker-image k8s/client-service:latest

database:
	kubectl apply -f kubernetes/database.yaml
	kubectl wait --for=condition=Ready --timeout=5m pod -l app=pg-reviews

shell:
	kubectl exec -it $(shell kubectl get pods | grep pg-reviews | awk '{print $$1}') -- bash

psql: database shell	

deploy:
	kubectl apply -f kubernetes/launch.yaml
	kubectl wait --for=condition=Ready --timeout=5m pod -l app=client

destroy:
	kubectl delete -f kubernetes

forward:
	kubectl port-forward service/client-service 3000:80

k8s-web-service-1: cluster psql
k8s-web-service-2: load deploy forward

linode-cli:
	docker run --rm -it -v $(pwd):/work -w /work --entrypoint /bin/bash manedurphy/linode-cli