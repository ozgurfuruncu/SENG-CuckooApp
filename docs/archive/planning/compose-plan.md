> Historical pre-cleanup record. Commands and state below describe their original inspection, not current setup. Relative evidence links now point to the preserved source commit. See the current root README.

# Technology-neutral Compose plan

**2026-11-02:** Stack A is approved. The active bounded implementation is
`compose.bootstrap.yml`; follow [bootstrap instructions](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/README.bootstrap.md)
and [executed evidence](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/stack-a-bootstrap-evidence.md). The planning text below is
the pre-approval record. The legacy Compose/Dockerfiles remain unchanged.

Existing root `docker-compose.yml`, Dockerfiles and environment examples are
preserved team work. Their React/FastAPI/SQLAlchemy settings are candidates pending
ADR-001, not a fresh selection. No new containers, app skeletons or infrastructure
were provisioned.

After named stack approval and contract reconciliation, the separate bounded
bootstrap issue should define a single modular API service, web UI and PostgreSQL
service. Keep the five domain boundaries inside the monolith. Configure database
readiness, named PostgreSQL/evidence volumes, internal DB networking, environment
variables and a stack-appropriate health check. Select the ORM, migrations and
application test runners in the accepted ADR rather than adopting them from the
existing starter by accident.

The smoke test must boot the chosen services, probe health and a DB connection,
run chosen tests, restart without deleting volumes and verify persistence. Evidence
storage requires authenticated, authorized reads and validated uploads before
business use. Never use `down -v` to test persistence. Runtime boot, image builds,
DB connectivity and photo persistence have **not** been tested in this task.

`docker compose config --quiet` was run against both supplied and cloned Compose
files: exit 0, with Docker config-file access warnings. This validates configuration
syntax/interpolation only; it is not a running-service check.
