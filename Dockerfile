# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password

# Create a directory to store PostgreSQL data
RUN mkdir -p /var/lib/postgresql/data

# Set permissions for the directory
RUN chown -R postgres:postgres /var/lib/postgresql/data

# Use a volume to persist PostgreSQL data
VOLUME /var/lib/postgresql/data

# Expose the default PostgreSQL port
EXPOSE 5432

# Start PostgreSQL service
CMD ["postgres"]
