def register_and_login(client, email, role, city):
    r = client.post("/auth/register", json={
        "email": email, "password": "sifre1234", "full_name": "Test Kullanıcı",
        "role": role, "city": city,
    })
    assert r.status_code == 201
    r = client.post("/auth/login", json={"email": email, "password": "sifre1234"})
    assert r.status_code == 200
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


JOB = {
    "title": "Ankara'daki aracı ekspertize götürecek kişi arıyorum",
    "description": "2015 model araç, tam ekspertiz ve fotoğraf istiyorum.",
    "city": "Ankara", "category": "CAR_INSPECTION", "price": "1500.00",
}


def test_health(client):
    assert client.get("/health").json() == {"status": "ok"}


def test_duplicate_email_rejected(client):
    register_and_login(client, "a@b.com", "EMPLOYER", "Ağrı")
    r = client.post("/auth/register", json={
        "email": "a@b.com", "password": "sifre1234", "full_name": "Başka Kişi",
        "role": "WORKER", "city": "Ankara",
    })
    assert r.status_code == 409


def test_wrong_password_rejected(client):
    register_and_login(client, "a@b.com", "EMPLOYER", "Ağrı")
    r = client.post("/auth/login", json={"email": "a@b.com", "password": "yanlis-sifre"})
    assert r.status_code == 401


def test_employer_creates_and_lists_job(client):
    h = register_and_login(client, "isveren@x.com", "EMPLOYER", "Ağrı")
    r = client.post("/jobs", json=JOB, headers=h)
    assert r.status_code == 201
    assert r.json()["status"] == "OPEN"

    listed = client.get("/jobs", params={"city": "Ankara", "category": "CAR_INSPECTION"})
    assert listed.status_code == 200
    assert len(listed.json()) == 1
    assert client.get("/jobs", params={"city": "İzmir"}).json() == []


def test_worker_cannot_create_job(client):
    h = register_and_login(client, "isci@x.com", "WORKER", "Ankara")
    assert client.post("/jobs", json=JOB, headers=h).status_code == 403


def test_create_job_requires_login(client):
    assert client.post("/jobs", json=JOB).status_code == 401
