# Ruchdigicam – Camera Rental Showcase Website 📸✨

A cute, modern, pastel-themed camera rental catalog and sample photography showcase website for **Ruchdigicam** (Samut Sakhon, Thailand / ร้านเช่ากล้องสมุทรสาคร).

---

## 📁 Folder Structure (โครงสร้างไฟล์)

```text
Ruchdiagram1/
├── index.html                        # Main website (Home, Our Cameras, Gallery, Location, Contact)
├── css/
│   └── styles.css                    # Cute pastel stylesheet (Cream, Blush Pink, Pastel Yellow, Soft Brown)
├── js/
│   └── app.js                        # Reusable camera cards, search/filter, detail modal, compare & lightbox
├── data/
│   └── cameras.js                    # ⭐ EASY EDIT FILE: Shop config, contact links, and all 8 camera models
├── Camera/
│   └── Camera_1.png .. Camera_8.png  # Official Ruchdigicam rate card posters
└── assets/
    ├── logo/
    │   └── logo-placeholder.svg      # Temporary "Ruchdigicam" logo placeholder (Replace here!)
    ├── cameras/
    │   └── camera_1_crop.png ..      # Clean landscape camera product cutouts
    └── samples/                      # Sample photos grouped by each specific camera model:
        ├── camera_1_canon_ixy_510is/ (sample_1.jpg .. sample_4.jpg)
        ├── camera_2_canon_ixus_85is/ (sample_1.jpg .. sample_4.jpg)
        ├── camera_3_canon_ixus_105is/ (sample_1.jpg .. sample_4.jpg)
        ├── camera_4_canon_a2500/     (sample_1.jpg .. sample_4.jpg)
        ├── camera_5_sony_dsc_t10/    (sample_1.jpg .. sample_4.jpg)
        ├── camera_6_fujifilm_xa5/    (sample_1.jpg .. sample_4.jpg)
        ├── camera_7_instax_mini9/    (sample_1.jpg .. sample_4.jpg)
        └── camera_8_lumix_dmc_s2/    (sample_1.jpg .. sample_4.jpg)
```

---

## 🛠️ How to Customize & Replace Assets (วิธีแก้ไขข้อมูลและเปลี่ยนรูปภาพ)

### 1. Replace the Shop Logo (วิธีเปลี่ยนโลโก้ร้าน)
1. Place your new logo image file (e.g., `my-logo.png` or `logo.svg`) inside `assets/logo/`.
2. Open `data/cameras.js` and update `logoUrl` inside `window.SHOP_CONFIG`:
   ```js
   logoUrl: "assets/logo/my-logo.png",
   ```

### 2. Replace Sample Photos for Any Camera (วิธีเปลี่ยนรูปตัวอย่างจากกล้องแต่ละรุ่น)
- Open `assets/samples/` and go to the folder of the camera model you want to update (for example, `assets/samples/camera_1_canon_ixy_510is/`).
- Replace `sample_1.jpg`, `sample_2.jpg`, `sample_3.jpg`, or `sample_4.jpg` with your actual sample photos using the same filenames—no code changes required!
- Or add more sample photos in `data/cameras.js` under that camera's `samplePhotos` array.

### 3. Update Location & Contact Links (วิธีแก้พิกัดสมุทรสาคร และช่องทางติดต่อ)
- Open `data/cameras.js` and edit `window.SHOP_CONFIG.location` and `window.SHOP_CONFIG.contact` to set your exact Google Maps link, LINE Official link, Instagram, Facebook, and Phone Number.

### 4. Add a New Camera Model (วิธีเพิ่มกล้องรุ่นใหม่)
- Open `data/cameras.js` and copy one camera object inside `window.CAMERAS_DATA`, then update its `id`, `name`, `brand`, `category`, `prices`, `specs`, and `samplePhotos`.
