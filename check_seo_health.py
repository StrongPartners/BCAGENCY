import os
import re

# Analysis Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BLOG_DATA_FILE = os.path.join(BASE_DIR, "src", "data", "blogPosts.js")

def check_seo_health():
    print("🔍 BC Creative Agency - SEO Health Check Running...\n")
    
    # 1. Check Blog Posts Quality
    if not os.path.exists(BLOG_DATA_FILE):
        print("❌ Error: Blog data file not found!")
        return

    with open(BLOG_DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Find all blog post objects (simplified search)
    # This matches objects within the array
    posts = re.findall(r'id:\s*(\d+).*?slug:\s*[\'"]([^\'"]+)[\'"].*?title:\s*\{\s*tr:\s*[\'"]([^\'"]+)[\'"]', content, re.DOTALL)
    
    print(f"📊 Analyzing {len(posts)} blog posts...")
    
    for pid, slug, title in posts:
        score = 100
        warnings = []
        
        # Rule: Title length (50-60 optimal)
        if len(title) < 40:
            score -= 20
            warnings.append(f"Title too short ({len(title)} chars)")
        elif len(title) > 70:
            score -= 10
            warnings.append(f"Title too long ({len(title)} chars)")
            
        # Rule: Keywords in slug
        if len(slug.split('-')) < 3:
            score -= 10
            warnings.append(f"Slug too generic ({slug})")
            
        print(f"   [{pid}] {slug}: Score {score}%")
        for w in warnings:
            print(f"      ❗ {w}")

    # 2. Check Meta Tags in Components
    components_dir = os.path.join(BASE_DIR, "src", "components")
    meta_found = 0
    for file in os.listdir(components_dir):
        if file.endswith(".jsx"):
            with open(os.path.join(components_dir, file), "r", encoding="utf-8") as f:
                c = f.read()
                if "useSEO" in c:
                    meta_found += 1
    
    print(f"\n🏷️  Page Meta Tags Coverage: {meta_found} components use dynamic SEO hooks.")

    # 3. Check for Robots.txt and Sitemap.xml
    public_dir = os.path.join(BASE_DIR, "public")
    if os.path.exists(os.path.join(public_dir, "robots.txt")):
        print("✅ robots.txt exists.")
    else:
        print("❌ robots.txt MISSING!")
        
    if os.path.exists(os.path.join(public_dir, "sitemap.xml")):
        print("✅ sitemap.xml exists.")
    else:
        print("⚠️  sitemap.xml not found! (Run manual script)")

    print("\n✅ Audit Complete!")

if __name__ == "__main__":
    check_seo_health()
