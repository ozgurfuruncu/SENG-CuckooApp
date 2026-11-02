"""Approved Stack A foundation; legacy business routes are intentionally unmounted."""

from contextlib import asynccontextmanager
from typing import Literal

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict
from sqlalchemy import Engine, text
from sqlalchemy.exc import SQLAlchemyError

from .foundation.database import create_database_engine


class HealthResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")
    status: Literal["ok"]
    database: Literal["up"]


class HealthUnavailable(BaseModel):
    model_config = ConfigDict(extra="forbid")
    status: Literal["unavailable"]
    database: Literal["down"]


def create_app(database_engine: Engine | None = None) -> FastAPI:
    @asynccontextmanager
    async def lifespan(api: FastAPI):
        engine = database_engine if database_engine is not None else create_database_engine()
        api.state.database_engine = engine
        try:
            yield
        finally:
            if database_engine is None:
                engine.dispose()

    api = FastAPI(title="Cuckoo bootstrap API", version="0.2.1-draft", lifespan=lifespan)

    @api.get(
        "/health",
        tags=["System"],
        operation_id="getHealth",
        summary="Check API and database readiness",
        description="Bootstrap readiness only. No credentials or database error details are returned.",
        response_model=HealthResponse,
        response_description="API and database are ready",
        responses={503: {"model": HealthUnavailable, "description": "Database unavailable"}},
        openapi_extra={"security": []},
    )
    def health(request: Request):
        try:
            with request.app.state.database_engine.connect() as connection:
                connection.execute(text("SELECT 1")).scalar_one()
        except SQLAlchemyError:
            return JSONResponse(
                status_code=503,
                content=HealthUnavailable(status="unavailable", database="down").model_dump(),
            )
        return HealthResponse(status="ok", database="up")

    # The canonical contract's server URL includes /api/v1. Mounting keeps generated
    # operation paths relative to that same base instead of duplicating the prefix.
    application = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
    application.mount("/api/v1", api)

    # Starlette does not run mounted application lifespans automatically.
    @asynccontextmanager
    async def application_lifespan(_application: FastAPI):
        async with lifespan(api):
            yield

    application.router.lifespan_context = application_lifespan
    return application


app = create_app()
