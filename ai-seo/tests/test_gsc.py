"""GSC modulu testleri."""

from utils.helpers import normalize_url, is_same_domain, slugify, count_words


def test_normalize_url_trailing_slash():
    assert normalize_url("https://example.com") == "https://example.com/"


def test_normalize_url_with_fragment():
    result = normalize_url("https://example.com/page#section")
    assert "#section" not in result


def test_is_same_domain_true():
    assert is_same_domain("https://example.com/a", "https://example.com/b")


def test_is_same_domain_false():
    assert not is_same_domain("https://example.com", "https://other.com")


def test_slugify():
    assert slugify("Merhaba Dunya! Test 123") == "merhaba-dunya-test-123"


def test_count_words():
    assert count_words("Bu bir test cumlesidir") == 4
