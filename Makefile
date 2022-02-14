run:
		docker-compose up -d --build

stop:
		docker-compose down

clean:
		docker-compose down -v --rmi all

shell:
	 docker-compose exec api sh
