"""Agent modulu testleri."""

import pytest

from agents.audit_agent import AuditAgent


@pytest.fixture
def audit_agent():
    """AuditAgent instance (LLM gerektirmeyen testler icin)."""
    # LLM baglantisi olmadan audit_page calisabilir
    agent = AuditAgent.__new__(AuditAgent)
    return agent


@pytest.mark.asyncio
async def test_audit_page_missing_title(audit_agent):
    page = {"url": "https://example.com", "status_code": 200, "title": None}
    result = await audit_agent.audit_page(page)
    issues = [i["type"] for i in result["issues"]]
    assert "missing_title" in issues


@pytest.mark.asyncio
async def test_audit_page_long_title(audit_agent):
    page = {
        "url": "https://example.com",
        "status_code": 200,
        "title": "A" * 70,
    }
    result = await audit_agent.audit_page(page)
    issues = [i["type"] for i in result["issues"]]
    assert "title_too_long" in issues


@pytest.mark.asyncio
async def test_audit_page_missing_h1(audit_agent):
    page = {
        "url": "https://example.com",
        "status_code": 200,
        "title": "Test",
        "h1": None,
    }
    result = await audit_agent.audit_page(page)
    issues = [i["type"] for i in result["issues"]]
    assert "missing_h1" in issues


@pytest.mark.asyncio
async def test_audit_page_slow_load(audit_agent):
    page = {
        "url": "https://example.com",
        "status_code": 200,
        "title": "Test",
        "load_time": 5.0,
    }
    result = await audit_agent.audit_page(page)
    issues = [i["type"] for i in result["issues"]]
    assert "slow_load_time" in issues


@pytest.mark.asyncio
async def test_audit_page_missing_viewport(audit_agent):
    page = {
        "url": "https://example.com",
        "status_code": 200,
        "title": "Test",
        "has_viewport": False,
    }
    result = await audit_agent.audit_page(page)
    issues = [i["type"] for i in result["issues"]]
    assert "missing_viewport" in issues


@pytest.mark.asyncio
async def test_audit_page_score():
    agent = AuditAgent.__new__(AuditAgent)
    page = {
        "url": "https://example.com",
        "status_code": 200,
        "title": "Good Title",
        "meta_description": "Good meta description",
        "h1": "Good H1",
        "images_without_alt": 0,
        "load_time": 1.0,
        "schema_types": ["Article"],
        "has_viewport": True,
    }
    result = await agent.audit_page(page)
    assert result["score"] == 100
