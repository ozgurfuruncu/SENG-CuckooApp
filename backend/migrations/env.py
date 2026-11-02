from alembic import context

from app.foundation.database import create_database_engine


if context.is_offline_mode():
    raise RuntimeError("Use online migrations with DATABASE_URL for this bootstrap.")

engine = create_database_engine()
try:
    with engine.connect() as connection:
        # No business metadata is selected by this bounded foundation. Never import
        # legacy models or use create_all to silently adopt their conflicting schema.
        context.configure(connection=connection, target_metadata=None)
        with context.begin_transaction():
            context.run_migrations()
finally:
    engine.dispose()
