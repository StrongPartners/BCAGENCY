# 🏛️ BC Agency - Yazılım Geliştirme Mimarisi ve Kuralları

Bu belge, projedeki tüm geliştirme süreçlerinde uyulması gereken kesin kuralları içerir.

## 1. Mimari Katmanlar
- **Model:** Sadece veri yapısı (Map/JSON dönüşümleri). İş mantığı içermez.
- **Repository Interface:** Veri erişim sözleşmeleri (`I` prefix ile).
- **Repository Implementation:** Veritabanına özel kodlar (SQL/NoSQL). İş mantığı/validasyon içermez.
- **UseCase:** Tek bir görevden sorumlu iş mantığı katmanı. Sadece Repository Interface kullanır.
- **Manager / Service:** UseCase orkestrasyonu. İsteği ilgili UseCase'e yönlendirir.
- **Controller / Router:** Dış dünya (HTTP) ile iletişim. Parametre alır, Manager'a iletir.
- **Frontend/Client:** Sadece sunum katmanı. Business logic içermez.

## 2. Kesin Kısıtlamalar
- 🚫 **Fat Manager Yasaktır:** İş mantığı UseCase'lerde olmalıdır.
- 💉 **Dependency Injection Zorunludur:** Bağımlılıklar constructor üzerinden alınır.
- 🔐 **Hardcode Yasaktır:** Tüm ayarlar `.env` üzerinden yönetilir.
- ⌨️ **Terminal Yasağı:** Kullanıcıya asla terminal komutu önerilmez, işler kod bloğu veya arka plan işlemi olarak halledilir.
- 🛑 **Sıfır Halüsinasyon:** Eksik bilgide uydurma kod yazılmaz, durulur ve teyit alınır.
- 🪵 **Loglama:** Tüm kritik işlemlerde loglama zorunludur.

## 3. Kod Kalitesi
- Clean Architecture
- SOLID Prensipleri (Özellikle SRP ve DIP)
- Domain Driven Design (DDD) yaklaşımları

---
*Bu mimari yapı Antigravity tarafından her aşamada kontrol edilecektir.*
