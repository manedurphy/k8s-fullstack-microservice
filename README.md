# Kubernetes Fullstack Microservice

This is a fullstack microservice application that I inherited and optimized on a team of other engineers who also received microservices. I have condensed the work I did into a single repository with the intension of demonstrating the work that I did, as well as have instructions on how to run this locally in Docker and Kubernetes, as well as deploying to the cloud on Linode.

[Install Docker](https://docs.docker.com/get-docker/)
[Install Kind](https://kind.sigs.k8s.io/)

## Running locally

To run this application locally, we will first need to generate some data for our PostgreSQL database. To do this, enter the `reviews-service` directory and run the following commands:
```bash
# Enter directory
cd reviews-service

# Install dependencies
npm install

# Run the data generation script
npm run data-generate
```

You sould see that some `.sql` files were created in the ./reviews-service/dumps directory. The one that will populate our database is `dump.sql`

In the terminal, go back to the root directory of the repository and run
```bash
# Run the pg-reviews service alone to seed the database without conflict
docker-compose up --build pg-reviews

# Stop the container
docker-compose down

# Start all the containers
docker-compose up --build
```

In the browser, you can now see a page with a list of reviews at `http://localhost/buildings/1`.
Now let's get this same thing running in Kubernetes.


## Local K8s w/ Kind

The steps to get this running in K8s is a little more involved. I have broken the steps into two Makefile commands.
```bash
# This will create the cluster, start a Postgres deployment and enter the shell of the pod single pod
make k8s-web-service-1

# Once the shell has started, we can seed the database
psql -U manedurphy -d reviews < /data/dump.sql

# After seeding, exit the shell of that container and start the other services
exit
make k8s-web-service-2
```

You should now be able to view the same application at `http://localhost:3000/buildings/1`