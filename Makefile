run:
		docker-compose up -d

stop:
		docker-compose down

shell:
	 docker-compose exec api sh
