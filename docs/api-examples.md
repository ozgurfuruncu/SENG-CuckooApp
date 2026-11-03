# Representative draft API examples

Source: [canonical OpenAPI 3.1](../api/openapi.yaml), API `0.2.1-draft`.
Course PDF pp.10–12/17 asks for representative requests, success and error
behavior. These examples conform to the existing schemas; they are mock data,
not observed business responses. Only health is implemented in Sprint 1.
Error codes below illustrate the free-form `Problem.code` field; they do not
standardize additional codes or change any operation’s status codes.

## Create a task

`POST /api/v1/tasks` (`createTask`), authenticated `EMPLOYER`, JSON `NewTask`:

```json
{
  "title": "Permitted exterior vehicle photographs",
  "description": "Photograph the exterior with the owner's permission and record visible-condition notes only.",
  "city": "Ankara",
  "category": "VEHICLE_PHOTO_CHECK",
  "proposedCompensation": 250,
  "requiredEvidence": "Four exterior photographs and brief visible-condition notes.",
  "permissionConfirmed": true,
  "requestedBy": null
}
```

Representative `201 application/json`, schema `Task`:

```json
{
  "id": "TASK-001",
  "employerId": "USER-101",
  "assignedWorkerId": null,
  "title": "Permitted exterior vehicle photographs",
  "description": "Photograph the exterior with the owner's permission and record visible-condition notes only.",
  "city": "Ankara",
  "category": "VEHICLE_PHOTO_CHECK",
  "proposedCompensation": 250,
  "requiredEvidence": "Four exterior photographs and brief visible-condition notes.",
  "permissionConfirmed": true,
  "requestedBy": null,
  "status": "OPEN",
  "paymentSimulationStatus": "NOT_HELD",
  "createdAt": "2026-11-03T10:00:00Z"
}
```

`OPEN` is specified by the operation description; the unassigned/NOT_HELD
values are schema-permitted examples. Initial defaults still require the later
story’s review as explained in [US-03](specs/US-03-create-task.md).

For an invalid input such as `permissionConfirmed: false`, representative
`400 application/problem+json`, schema `Problem`:

```json
{
  "title": "Invalid task input",
  "status": 400,
  "code": "INVALID_INPUT",
  "detail": "permissionConfirmed must be true."
}
```

Creation also defines 401/403. It does not define a creation 409 or 422 response.

## Assignment conflict in the primary journey

`POST /api/v1/tasks/TASK-001/assignment` (`assignTask`) takes
`{"applicationId":"APP-012"}` from the task employer. It returns 200 Task for
successful single assignment, and 409 for domain/state conflicts such as a task
already assigned. A representative `409 application/problem+json` is:

```json
{
  "title": "Task already assigned",
  "status": 409,
  "code": "TASK_ALREADY_ASSIGNED",
  "detail": "The task already has a selected applicant."
}
```

`TASK_ALREADY_ASSIGNED` is also the existing schema’s example code. Do not infer
deployed atomic-assignment behavior from this draft: transaction/concurrency and
authorization tests belong to the future US-06 implementation.
