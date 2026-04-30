import os
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    # Fallback to reading from /app/frontend/.env
    try:
        with open('/app/frontend/.env') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    BASE_URL = line.split('=', 1)[1].strip().rstrip('/')
                    break
    except Exception:
        pass
API = f"{BASE_URL}/api"


@pytest.fixture
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


def test_health(s):
    r = s.get(f"{API}/health", timeout=15)
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


def test_root(s):
    r = s.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    assert "message" in r.json()


def test_create_admission_valid(s):
    payload = {
        "full_name": "TEST_Alice Walker",
        "phone": "+91 9876543210",
        "school_name": "TEST_Greenwood High",
        "student_class": "10",
    }
    r = s.post(f"{API}/admissions", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("success") is True
    assert data.get("id")

    # email is async-ish; allow time
    time.sleep(1)
    rl = s.get(f"{API}/admissions", timeout=20)
    assert rl.status_code == 200
    items = rl.json()
    assert isinstance(items, list)
    found = next((i for i in items if i.get("id") == data["id"]), None)
    assert found is not None, "Admission not persisted"
    assert "_id" not in found
    # After Resend removal: there must be NO email_status field on the persisted record.
    assert "email_status" not in found, f"email_status field should be removed but found: {found.get('email_status')}"
    # most recent first
    assert items[0]["id"] == data["id"]


def test_backend_has_no_resend_references():
    """Verify backend code & env have no Resend/Sender/Admin email references after refactor."""
    forbidden_tokens = ["resend", "RESEND_API_KEY", "SENDER_EMAIL", "ADMIN_EMAIL"]
    for path in ("/app/backend/server.py", "/app/backend/.env"):
        try:
            with open(path) as f:
                content = f.read().lower()
        except FileNotFoundError:
            continue
        for tok in forbidden_tokens:
            assert tok.lower() not in content, f"Found '{tok}' in {path}"


def test_invalid_class(s):
    for bad in ["4", "13", "random", ""]:
        r = s.post(f"{API}/admissions", json={
            "full_name": "TEST User", "phone": "9876543210",
            "school_name": "TEST School", "student_class": bad,
        }, timeout=15)
        assert r.status_code == 422, f"class={bad} got {r.status_code}"


def test_invalid_payload(s):
    # too short name
    r = s.post(f"{API}/admissions", json={
        "full_name": "A", "phone": "9876543210",
        "school_name": "TEST School", "student_class": "10",
    }, timeout=15)
    assert r.status_code == 422
    # missing phone
    r = s.post(f"{API}/admissions", json={
        "full_name": "TEST User", "school_name": "TEST School", "student_class": "10",
    }, timeout=15)
    assert r.status_code == 422
    # bad phone format (letters)
    r = s.post(f"{API}/admissions", json={
        "full_name": "TEST User", "phone": "abc123!!", 
        "school_name": "TEST School", "student_class": "10",
    }, timeout=15)
    assert r.status_code == 422


def test_all_class_values(s):
    for cls in ["5", "6", "7", "8", "9", "10", "11", "12", "College/Above"]:
        r = s.post(f"{API}/admissions", json={
            "full_name": f"TEST_Class{cls}",
            "phone": "9876543210",
            "school_name": "TEST_School",
            "student_class": cls,
        }, timeout=30)
        assert r.status_code == 200, f"class={cls} status={r.status_code} body={r.text}"
        assert r.json().get("success") is True


def test_honeypot_silent_drop(s):
    # capture pre-count
    pre = s.get(f"{API}/admissions", timeout=20).json()
    pre_count = len(pre)

    payload = {
        "full_name": "TEST_Bot Spammer",
        "phone": "9876543210",
        "school_name": "TEST_BotSchool",
        "student_class": "10",
        "honeypot": "I am a bot",
    }
    r = s.post(f"{API}/admissions", json=payload, timeout=20)
    assert r.status_code == 200
    body = r.json()
    assert body.get("success") is True
    # No id returned
    assert body.get("id") is None

    post = s.get(f"{API}/admissions", timeout=20).json()
    assert len(post) == pre_count, "Honeypot submission should NOT be persisted"


def test_list_no_mongo_id_leak(s):
    r = s.get(f"{API}/admissions", timeout=20)
    assert r.status_code == 200
    items = r.json()
    for it in items:
        assert "_id" not in it
