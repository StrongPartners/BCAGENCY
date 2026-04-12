"""Crawler modulu testleri."""

from crawlers.parser import PageParser


SAMPLE_HTML = """<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Test meta description">
    <title>Test Page Title</title>
    <link rel="canonical" href="https://example.com/test">
    <script type="application/ld+json">
    {"@type": "Article", "headline": "Test"}
    </script>
</head>
<body>
    <h1>Test H1 Heading</h1>
    <p>Bu bir test paragraftir. Icerik burada bulunur.</p>
    <h2>Alt Baslik 1</h2>
    <p>Daha fazla icerik.</p>
    <img src="image1.jpg" alt="Test gorsel">
    <img src="image2.jpg">
    <a href="/internal-page">Internal Link</a>
    <a href="https://external.com">External Link</a>
    <h2>Alt Baslik 2</h2>
    <p>Son paragraf.</p>
</body>
</html>"""


def test_parser_title():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert result["title"] == "Test Page Title"


def test_parser_meta_description():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert result["meta_description"] == "Test meta description"


def test_parser_h1():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert result["h1"] == "Test H1 Heading"


def test_parser_h2_count():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert result["h2_count"] == 2


def test_parser_images_without_alt():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert result["images_without_alt"] == 1


def test_parser_schema_types():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert "Article" in result["schema_types"]


def test_parser_has_viewport():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert result["has_viewport"] is True


def test_parser_has_lang():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert result["has_lang"] is True


def test_parser_canonical():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert result["canonical"] == "https://example.com/test"


def test_parser_internal_links():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert "/internal-page" in result["internal_links"]


def test_parser_external_links():
    parser = PageParser()
    result = parser.parse(SAMPLE_HTML, "https://example.com/test")
    assert "https://external.com" in result["external_links"]
