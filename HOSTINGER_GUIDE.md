# Hostinger Yayınlama Rehberi

Web sitenizi Hostinger üzerinde yayınlamak için aşağıdaki adımları takip edebilirsiniz.

## 1. Hazırlık
Sitenizin Hostinger altyapısında (Apache sunucular) yönlendirme sorunu yaşamaması için gerekli olan `.htaccess` dosyasını `public/` klasörüne ekledim. Bu dosya, sayfa yenilendiğinde "404 Not Found" hatası almanızı engeller.

## 2. Derleme (Build)
Sitenizi yayına hazırlamak için terminalde şu komutu çalıştırın:

```bash
npm run build
```

Bu işlem tamamlandığında proje ana dizininde `dist` isminde bir klasör oluşacaktır.

## 3. Paketleme
1. `dist` klasörünün **içine** girin.
2. Klasörün içindeki **tüm dosyaları seçin**.
3. Seçili dosyalara sağ tıklayıp "Sıkıştır" veya "Arşivle" diyerek bir **ZIP** dosyası oluşturun.
   * *Önemli: `dist` klasörünün kendisini değil, içindekileri ziplemelisiniz.*

## 4. Hostinger'a Yükleme
1. Hostinger panelinize (hPanel) giriş yapın.
2. **Dosya Yöneticisi (File Manager)** aracını açın.
3. `public_html` klasörüne çift tıklayarak girin.
4. İçeride varsayılan dosyalar varsa (örneğin `default.php`) silin.
5. Hazırladığınız ZIP dosyasını buraya **Yükle (Upload)** butonu ile yükleyin.
6. Yüklenen ZIP dosyasına sağ tıklayın ve **Extract (Çıkart)** seçeneğini seçin. Hedef olarak `.` (mevcut klasör) veya doğrudan çıkartma seçeneğini kullanın.
7. ZIP dosyasını silebilirsiniz.

Artık alan adınıza gittiğinizde siteniz çalışıyor olacaktır!
