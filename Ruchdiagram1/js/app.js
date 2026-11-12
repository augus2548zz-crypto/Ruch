/**
 * ============================================================================
 * RUCHDIGICAM – ระบบแสดงผลหน้าเว็บไซต์ร้านเช่ากล้อง (ภาษาไทย)
 * ============================================================================
 */

(function () {
  const cameras = window.CAMERAS_DATA || [];
  const sampleAlbums = window.SAMPLE_ALBUMS || [];
  const shopConfig = window.SHOP_CONFIG || {};

  // สถานะการทำงานของหน้าเว็บ
  const state = {
    heroIndex: 0,
    searchQuery: "",
    sortBy: "featured",
    galleryAlbumFilter: "all",
    galleryViewMode: "grouped", // 'grouped' | 'grid'
    activeDetailCameraId: null,
    activeDetailImageMode: "crop", // 'crop' | 'poster'
    lightboxItems: [],
    lightboxIndex: 0
  };

  // กล้องรุ่นแนะนำสำหรับแสดงบนส่วนหัวเว็บ (Hero)
  const heroCameras = cameras.filter((c) => c.featured);

  // ==========================================================================
  // เริ่มต้นการทำงานเมื่อโหลดหน้าเว็บเสร็จ
  // ==========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    initBrandAndConfig();
    initNavigation();
    initHeroShowcase();
    renderFeaturedCameras();
    initCatalogControls();
    renderCatalog();
    initGallerySection();
    renderGallery();
    initLightboxEvents();
    handleHashRoute();
    window.addEventListener("hashchange", handleHashRoute);
  });

  // ==========================================================================
  // ตั้งค่าข้อมูลร้าน โลโก้ พิกัด และช่องทางติดต่อ
  // ==========================================================================
  function initBrandAndConfig() {
    const logoImgs = document.querySelectorAll(".js-shop-logo");
    logoImgs.forEach((img) => {
      if (shopConfig.logoUrl) {
        img.src = shopConfig.logoUrl;
      }
      img.addEventListener("error", () => {
        img.style.display = "none";
        const fallback = img.parentElement.querySelector(".brand-logo-fallback");
        if (fallback) fallback.style.display = "inline-block";
      });
    });

    const includedListEl = document.getElementById("included-bag-list");
    if (includedListEl && Array.isArray(shopConfig.includedWithEveryRental)) {
      includedListEl.innerHTML = shopConfig.includedWithEveryRental
        .map((item) => `<li><span>✨</span> <span>${escapeHtml(item)}</span></li>`)
        .join("");
    }

    const mapLinkEls = document.querySelectorAll(".js-google-maps-link");
    mapLinkEls.forEach((el) => {
      if (shopConfig.location && shopConfig.location.googleMapsUrl) {
        el.href = shopConfig.location.googleMapsUrl;
      }
    });

    const mapIframe = document.getElementById("samut-sakhon-map-iframe");
    if (mapIframe && shopConfig.location && shopConfig.location.googleMapsEmbedUrl) {
      mapIframe.src = shopConfig.location.googleMapsEmbedUrl;
    }

    const addressEl = document.getElementById("shop-address-placeholder");
    if (addressEl && shopConfig.location) {
      addressEl.textContent = shopConfig.location.addressPlaceholder;
    }

    const pickupEl = document.getElementById("shop-pickup-notes");
    if (pickupEl && shopConfig.location) {
      pickupEl.textContent = shopConfig.location.pickupNotes;
    }

    if (shopConfig.contact) {
      setLinkAndText(".js-contact-line", shopConfig.contact.lineUrl, shopConfig.contact.lineId);
      setLinkAndText(".js-contact-ig", shopConfig.contact.instagramUrl, shopConfig.contact.instagramHandle);
    }

    const copyLineBtn = document.getElementById("copy-line-id-btn");
    if (copyLineBtn && shopConfig.contact) {
      copyLineBtn.addEventListener("click", () => {
        navigator.clipboard?.writeText(shopConfig.contact.lineId);
        showToast(`คัดลอก LINE ID: ${shopConfig.contact.lineId} เรียบร้อยแล้ว ✨`);
      });
    }
  }

  function setLinkAndText(selector, href, text) {
    document.querySelectorAll(selector).forEach((el) => {
      if (href && el.tagName === "A") el.href = href;
      const strong = el.querySelector(".js-channel-val");
      if (strong && text) strong.textContent = text;
    });
  }

  // ==========================================================================
  // เมนูนำทาง (Navigation)
  // ==========================================================================
  function initNavigation() {
    const header = document.getElementById("site-header");
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinksWrap = document.getElementById("nav-links");
    const navBtns = document.querySelectorAll("[data-nav-target]");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
      updateActiveNavOnScroll();
    });

    mobileBtn?.addEventListener("click", () => {
      navLinksWrap?.classList.toggle("mobile-open");
    });

    navBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetId = btn.getAttribute("data-nav-target");
        if (!targetId) return;
        e.preventDefault();
        navLinksWrap?.classList.remove("mobile-open");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
        document.querySelectorAll(".nav-link").forEach((n) => {
          n.classList.toggle("active", n.getAttribute("data-nav-target") === targetId);
        });
      });
    });
  }

  function updateActiveNavOnScroll() {
    const sections = ["home", "cameras", "gallery", "location", "contact"];
    const scrollPos = window.scrollY + 180;
    let current = "home";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        current = id;
      }
    }
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-nav-target") === current);
    });
  }

  // ==========================================================================
  // ส่วนแสดงกล้องเด่นด้านบน (Hero Showcase)
  // ==========================================================================
  function initHeroShowcase() {
    if (!heroCameras.length) return;
    const dotsContainer = document.getElementById("hero-switcher-dots");
    const heroClickArea = document.getElementById("hero-camera-display");

    if (dotsContainer) {
      dotsContainer.innerHTML = heroCameras
        .map(
          (cam, idx) => `
          <button
            type="button"
            class="hero-dot ${idx === 0 ? "active" : ""}"
            style="background-color: ${cam.colorHex || "#F472B6"};"
            title="${escapeHtml(cam.name)}"
            aria-label="ดูตัวอย่าง ${escapeHtml(cam.name)}"
            data-hero-idx="${idx}"
          ></button>
        `
        )
        .join("");

      dotsContainer.addEventListener("click", (e) => {
        const dot = e.target.closest("[data-hero-idx]");
        if (!dot) return;
        state.heroIndex = Number(dot.getAttribute("data-hero-idx"));
        updateHeroDisplay();
      });
    }

    heroClickArea?.addEventListener("click", () => {
      const activeCam = heroCameras[state.heroIndex];
      if (activeCam) openCameraDetail(activeCam.id);
    });

    updateHeroDisplay();
  }

  function updateHeroDisplay() {
    const cam = heroCameras[state.heroIndex] || cameras[0];
    if (!cam) return;

    const watermarkEl = document.getElementById("hero-bg-watermark");
    const imgEl = document.getElementById("hero-camera-img");
    const priceStickerEl = document.getElementById("hero-price-sticker");
    const polaroidWrapEl = document.querySelector(".hero-floating-polaroid");
    const polaroidImgEl = document.getElementById("hero-polaroid-img");
    const polaroidCapEl = document.getElementById("hero-polaroid-caption");
    const modelNameEl = document.getElementById("hero-active-model-name");
    const modelToneEl = document.getElementById("hero-active-model-tone");

    if (watermarkEl) watermarkEl.textContent = cam.shortName.toUpperCase();
    if (imgEl) {
      imgEl.src = cam.image;
      imgEl.alt = cam.name;
    }
    if (priceStickerEl) {
      priceStickerEl.textContent = `✦ 1 วัน ${cam.prices.day1}.-`;
    }
    if (cam.samplePhotos && cam.samplePhotos.length > 0) {
      if (polaroidWrapEl) polaroidWrapEl.style.display = "block";
      if (polaroidImgEl) polaroidImgEl.src = cam.samplePhotos[0].url;
      if (polaroidCapEl) polaroidCapEl.textContent = cam.shortName;
    } else if (polaroidWrapEl) {
      polaroidWrapEl.style.display = "none";
    }
    if (modelNameEl) modelNameEl.textContent = cam.name;
    if (modelToneEl) {
      modelToneEl.textContent = `1 วัน ${cam.prices.day1}.- · 2 วัน ${cam.prices.day2}.- · 3 วัน ${cam.prices.day3}.-`;
    }

    document.querySelectorAll(".hero-dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === state.heroIndex);
    });
  }

  // ==========================================================================
  // การ์ดกล้อง (ไม่มีคำอธิบายกล้อง แสดงเฉพาะชื่อรุ่น เรทราคา และรูปตัวอย่าง)
  // ==========================================================================
  function createCameraCardHTML(cam) {
    const hasSamples = Array.isArray(cam.samplePhotos) && cam.samplePhotos.length > 0;
    const sampleStripHTML = hasSamples
      ? `
        <div class="card-sample-strip">
          <div class="card-sample-strip-label">
            <span>📸 รูปตัวอย่าง (${cam.samplePhotos.length} รูป)</span>
            <span style="color: var(--accent-pink); cursor: pointer;" data-action="open-detail" data-camera-id="${cam.id}">ดูทั้งหมด →</span>
          </div>
          <div class="card-sample-thumbs">
            ${cam.samplePhotos
              .slice(0, 4)
              .map(
                (photo, pIdx) => `
              <div
                class="card-sample-thumb"
                title="${escapeHtml(photo.title)}"
                data-action="open-sample-lightbox"
                data-camera-id="${cam.id}"
                data-photo-idx="${pIdx}"
              >
                <img src="${photo.url}" alt="${escapeHtml(photo.title)}" loading="lazy" />
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
      : "";

    return `
      <article class="camera-card" data-camera-card-id="${cam.id}">
        <div class="camera-card-media" data-action="open-detail" data-camera-id="${cam.id}">
          <div class="card-top-badges">
            <span class="category-badge">${escapeHtml(cam.category)}</span>
          </div>
          <img class="product-img" src="${cam.image}" alt="${escapeHtml(cam.name)}" loading="lazy" />
        </div>

        <div class="camera-card-body">
          <div class="camera-brand-row">
            <span class="brand-tag">${escapeHtml(cam.brand)}</span>
          </div>

          <h3 class="camera-card-title" data-action="open-detail" data-camera-id="${cam.id}">
            ${escapeHtml(cam.name)}
          </h3>

          ${sampleStripHTML}

          <div class="card-price-tiers" aria-label="ราคาค่าเช่า">
            <div class="price-tier-item highlight">
              <span class="price-tier-days">1 วัน</span>
              <span class="price-tier-amount">${cam.prices.day1}.-</span>
            </div>
            <div class="price-tier-item">
              <span class="price-tier-days">2 วัน</span>
              <span class="price-tier-amount">${cam.prices.day2}.-</span>
            </div>
            <div class="price-tier-item">
              <span class="price-tier-days">3 วัน</span>
              <span class="price-tier-amount">${cam.prices.day3}.-</span>
            </div>
          </div>

          <div class="card-actions-row">
            <button
              type="button"
              class="btn-view-details"
              data-action="open-detail"
              data-camera-id="${cam.id}"
            >
              ดูรูปตัวอย่างและเรทราคา ✨
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function bindCardContainerEvents(containerEl) {
    if (!containerEl) return;
    containerEl.addEventListener("click", (e) => {
      const thumbEl = e.target.closest('[data-action="open-sample-lightbox"]');
      if (thumbEl) {
        e.stopPropagation();
        const camId = thumbEl.getAttribute("data-camera-id");
        const photoIdx = Number(thumbEl.getAttribute("data-photo-idx") || 0);
        const cam = cameras.find((c) => c.id === camId);
        if (cam && cam.samplePhotos) {
          openPhotosInLightbox(cam.samplePhotos, photoIdx, cam.name, cam.id);
        }
        return;
      }

      const detailTrigger = e.target.closest('[data-action="open-detail"]');
      if (detailTrigger) {
        const camId = detailTrigger.getAttribute("data-camera-id");
        openCameraDetail(camId);
      }
    });
  }

  // ==========================================================================
  // ส่วนกล้องรุ่นยอดฮิตในหน้าแรก (Featured Cameras)
  // ==========================================================================
  function renderFeaturedCameras() {
    const featuredGrid = document.getElementById("featured-camera-grid");
    if (!featuredGrid) return;
    const featuredList = cameras.filter((c) => c.featured).slice(0, 4);
    featuredGrid.innerHTML = featuredList.map((cam) => createCameraCardHTML(cam)).join("");
    if (!featuredGrid.dataset.bound) {
      bindCardContainerEvents(featuredGrid);
      featuredGrid.dataset.bound = "true";
    }
  }

  // ==========================================================================
  // หน้ารวมกล้องทั้งหมด (ค้นหาและเรียงลำดับ)
  // ==========================================================================
  function initCatalogControls() {
    const searchInput = document.getElementById("camera-search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    const sortSelect = document.getElementById("camera-sort-select");
    const catalogGrid = document.getElementById("catalog-camera-grid");

    searchInput?.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = state.searchQuery ? "inline-flex" : "none";
      }
      renderCatalog();
    });

    clearSearchBtn?.addEventListener("click", () => {
      state.searchQuery = "";
      if (searchInput) searchInput.value = "";
      clearSearchBtn.style.display = "none";
      renderCatalog();
    });

    sortSelect?.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });

    if (catalogGrid && !catalogGrid.dataset.bound) {
      bindCardContainerEvents(catalogGrid);
      catalogGrid.dataset.bound = "true";
    }
  }

  function getFilteredAndSortedCameras() {
    const q = state.searchQuery.toLowerCase();
    const filtered = cameras.filter((cam) => {
      const searchableText = [cam.name, cam.shortName, cam.brand, cam.category]
        .join(" ")
        .toLowerCase();
      return !q || searchableText.includes(q);
    });

    return filtered.sort((a, b) => {
      if (state.sortBy === "price-asc") return a.prices.day1 - b.prices.day1;
      if (state.sortBy === "price-desc") return b.prices.day1 - a.prices.day1;
      if (state.sortBy === "name-asc") return a.name.localeCompare(b.name);
      return a.number - b.number;
    });
  }

  function renderCatalog() {
    const catalogGrid = document.getElementById("catalog-camera-grid");
    const countEl = document.getElementById("catalog-count-text");
    if (!catalogGrid) return;

    const list = getFilteredAndSortedCameras();
    if (countEl) {
      countEl.textContent = `แสดงกล้อง ${list.length} รุ่น จากทั้งหมด ${cameras.length} รุ่น`;
    }

    if (list.length === 0) {
      catalogGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; background: #FFFFFF; padding: 48px 24px; border-radius: 28px; border: 2px dashed #F9A8D4;">
          <p style="font-size: 2.2rem; margin-bottom: 8px;">📷✨</p>
          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 14px;">ไม่พบรุ่นกล้องที่ค้นหา</h3>
          <button type="button" class="btn btn-primary" id="reset-catalog-search-btn">ดูกล้องทั้งหมด</button>
        </div>
      `;
      document.getElementById("reset-catalog-search-btn")?.addEventListener("click", () => {
        state.searchQuery = "";
        const searchInput = document.getElementById("camera-search-input");
        const clearSearchBtn = document.getElementById("clear-search-btn");
        if (searchInput) searchInput.value = "";
        if (clearSearchBtn) clearSearchBtn.style.display = "none";
        renderCatalog();
      });
      return;
    }

    catalogGrid.innerHTML = list.map((cam) => createCameraCardHTML(cam)).join("");
  }

  // ==========================================================================
  // หน้ารายละเอียดกล้องและรูปตัวอย่าง (ไม่มีคำอธิบายกล้อง)
  // ==========================================================================
  function openCameraDetail(cameraId) {
    const cam = cameras.find((c) => c.id === cameraId);
    if (!cam) return;

    state.activeDetailCameraId = cam.id;
    state.activeDetailImageMode = "crop";

    const modal = document.getElementById("camera-detail-modal");
    const content = document.getElementById("camera-detail-content");
    if (!modal || !content) return;

    renderCameraDetailContent(cam, content);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    if (window.location.hash !== `#camera/${cam.id}`) {
      history.replaceState(null, "", `#camera/${cam.id}`);
    }
  }

  function closeCameraDetail() {
    const modal = document.getElementById("camera-detail-modal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
    state.activeDetailCameraId = null;
    if (window.location.hash.startsWith("#camera/")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  function renderCameraDetailContent(cam, container) {
    const activeImgSrc = state.activeDetailImageMode === "poster" ? cam.posterImage : cam.image;
    const hasSamples = Array.isArray(cam.samplePhotos) && cam.samplePhotos.length > 0;

    const sampleSectionHTML = hasSamples
      ? `
        <div class="detail-sample-section">
          <div class="detail-sample-header">
            <div>
              <span class="sparkle-badge">📸 รูปตัวอย่างจากกล้อง (${cam.samplePhotos.length} รูป)</span>
              <h3 style="font-family: var(--font-display); font-size: 1.45rem; margin-top: 8px; color: var(--text-brown-dark);">
                ${escapeHtml(cam.name)}
              </h3>
            </div>
          </div>

          <div class="gallery-photo-grid">
            ${cam.samplePhotos
              .map(
                (photo, idx) => `
              <div
                class="gallery-photo-card"
                data-detail-photo-idx="${idx}"
              >
                <div class="gallery-photo-img-wrap">
                  <img src="${photo.url}" alt="${escapeHtml(photo.title)}" loading="lazy" />
                  <span class="photo-zoom-badge" title="คลิกเพื่อดูภาพขนาดใหญ่">🔍</span>
                  <div class="photo-camera-pill">
                    <span>📸 ${escapeHtml(cam.shortName)}</span>
                    <span style="color: var(--accent-pink);">รูปที่ ${idx + 1}/${cam.samplePhotos.length}</span>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
      : `
        <div class="detail-sample-section" style="text-align: center;">
          <span class="sparkle-badge">📸 รูปตัวอย่างจากกล้อง</span>
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; margin: 12px 0 16px; color: var(--text-brown-dark);">
            ทัก LINE @101UQAES เพื่อขอดูรูปรีวิวเพิ่มเติมของ ${escapeHtml(cam.name)} ได้เลยค่ะ ✨
          </h3>
          <button type="button" class="btn btn-secondary" id="detail-go-gallery-btn">
            🖼️ ดูแกลเลอรีรูปตัวอย่างรุ่นอื่นๆ
          </button>
        </div>
      `;

    container.innerHTML = `
      <div class="modal-sticky-bar">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span class="sparkle-badge">✦ รุ่นที่ ${cam.number} จาก ${cameras.length}</span>
          <span class="category-badge">${escapeHtml(cam.category)}</span>
          <span class="brand-tag">${escapeHtml(cam.brand)}</span>
        </div>
        <button type="button" class="modal-close-btn" id="detail-modal-close-btn" aria-label="ปิดหน้าต่าง">✕</button>
      </div>

      <div class="detail-top-grid">
        <div class="detail-media-column">
          <div class="detail-main-image-box">
            <img id="detail-hero-img" src="${activeImgSrc}" alt="${escapeHtml(cam.name)}" />
          </div>

          <div class="media-view-switcher">
            <button
              type="button"
              class="media-switch-btn ${state.activeDetailImageMode === "crop" ? "active" : ""}"
              data-img-mode="crop"
            >
              📷 ดูรูปตัวกล้อง
            </button>
            <button
              type="button"
              class="media-switch-btn ${state.activeDetailImageMode === "poster" ? "active" : ""}"
              data-img-mode="poster"
            >
              🪧 ดูป้ายเรทราคาของร้าน
            </button>
          </div>
        </div>

        <div class="detail-info-column" style="justify-content: center;">
          <div>
            <span class="brand-tag">${escapeHtml(cam.brand)}</span>
            <span class="category-badge" style="margin-left: 6px;">${escapeHtml(cam.category)}</span>
            <h2 class="detail-title" style="margin-top: 10px;">${escapeHtml(cam.name)}</h2>
          </div>

          <div class="card-price-tiers" style="padding: 16px; border-width: 2px; margin: 8px 0;">
            <div class="price-tier-item highlight">
              <span class="price-tier-days">เช่า 1 วัน</span>
              <span class="price-tier-amount" style="font-size: 1.35rem;">${cam.prices.day1} บาท</span>
            </div>
            <div class="price-tier-item">
              <span class="price-tier-days">เช่า 2 วัน</span>
              <span class="price-tier-amount" style="font-size: 1.35rem;">${cam.prices.day2} บาท</span>
            </div>
            <div class="price-tier-item">
              <span class="price-tier-days">3 วัน</span>
              <span class="price-tier-amount" style="font-size: 1.35rem;">${cam.prices.day3} บาท</span>
            </div>
          </div>

          <div style="background: #FFF9FC; border: 1.5px solid #FBCFE8; border-radius: 20px; padding: 16px;">
            <h4 style="font-family: var(--font-display); font-size: 0.95rem; color: var(--accent-blue); margin-bottom: 8px;">
              🎒 อุปกรณ์ที่มีให้ฟรีในชุดเช่า:
            </h4>
            <ul style="list-style: none; font-size: 0.86rem; color: var(--text-brown-body); display: grid; gap: 5px;">
              ${(shopConfig.includedWithEveryRental || [])
                .map((item) => `<li>✓ ${escapeHtml(item)}</li>`)
                .join("")}
            </ul>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px;">
            <a
              href="${shopConfig.contact?.lineUrl || "#contact"}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
              style="width: 100%;"
            >
              💬 ทัก LINE เช่ากล้องรุ่นนี้ (${escapeHtml(shopConfig.contact?.lineId || "@101UQAES")})
            </a>
          </div>
        </div>
      </div>

      ${sampleSectionHTML}
    `;

    container.querySelector("#detail-modal-close-btn")?.addEventListener("click", closeCameraDetail);

    container.querySelectorAll("[data-img-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeDetailImageMode = btn.getAttribute("data-img-mode");
        const heroImg = container.querySelector("#detail-hero-img");
        if (heroImg) {
          heroImg.src = state.activeDetailImageMode === "poster" ? cam.posterImage : cam.image;
        }
        container.querySelectorAll("[data-img-mode]").forEach((b) => {
          b.classList.toggle("active", b.getAttribute("data-img-mode") === state.activeDetailImageMode);
        });
      });
    });

    container.querySelector("#detail-go-gallery-btn")?.addEventListener("click", () => {
      closeCameraDetail();
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    });

    container.querySelectorAll("[data-detail-photo-idx]").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = Number(card.getAttribute("data-detail-photo-idx") || 0);
        openPhotosInLightbox(cam.samplePhotos, idx, cam.name, cam.id);
      });
    });
  }

  document.addEventListener("click", (e) => {
    const modal = document.getElementById("camera-detail-modal");
    if (e.target === modal) {
      closeCameraDetail();
    }
  });

  function handleHashRoute() {
    const hash = window.location.hash || "";
    if (hash.startsWith("#camera/")) {
      const id = hash.replace("#camera/", "").trim();
      if (id && state.activeDetailCameraId !== id) {
        openCameraDetail(id);
      }
    }
  }

  // ==========================================================================
  // หน้าแกลเลอรีรูปตัวอย่างจริงจาก assets/samples (ครบทั้ง 6 รุ่น · 48 รูป)
  // ==========================================================================
  function initGallerySection() {
    const filterWrap = document.getElementById("gallery-camera-filters");
    const modeBtns = document.querySelectorAll("[data-gallery-mode]");
    const totalCount = sampleAlbums.reduce((acc, a) => acc + a.photos.length, 0);

    if (filterWrap) {
      filterWrap.innerHTML = `
        <button type="button" class="filter-pill ${state.galleryAlbumFilter === "all" ? "active" : ""}" data-gal-album="all">
          ✨ ดูทุกรุ่น (${totalCount} รูป)
        </button>
        ${sampleAlbums
          .map(
            (album) => `
          <button type="button" class="filter-pill ${state.galleryAlbumFilter === album.id ? "active" : ""}" data-gal-album="${album.id}">
            📷 ${escapeHtml(album.shortName)} (${album.photos.length})
          </button>
        `
          )
          .join("")}
      `;

      filterWrap.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-gal-album]");
        if (!btn) return;
        state.galleryAlbumFilter = btn.getAttribute("data-gal-album");
        filterWrap.querySelectorAll(".filter-pill").forEach((p) => {
          p.classList.toggle("active", p.getAttribute("data-gal-album") === state.galleryAlbumFilter);
        });
        renderGallery();
      });
    }

    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.galleryViewMode = btn.getAttribute("data-gallery-mode");
        modeBtns.forEach((b) => b.classList.toggle("active", b === btn));
        renderGallery();
      });
    });
  }

  function renderGallery() {
    const container = document.getElementById("gallery-display-container");
    if (!container) return;

    const targetAlbums =
      state.galleryAlbumFilter === "all"
        ? sampleAlbums
        : sampleAlbums.filter((a) => a.id === state.galleryAlbumFilter);

    if (state.galleryViewMode === "grouped") {
      container.innerHTML = targetAlbums
        .map(
          (album) => `
        <div class="gallery-camera-group">
          <div class="gallery-group-header">
            <div class="gallery-group-cam-info">
              <img class="gallery-group-cam-thumb" src="${album.thumb}" alt="${escapeHtml(album.name)}" loading="lazy" />
              <div>
                <span class="brand-tag">${escapeHtml(album.brand)} · ${album.photos.length} รูปตัวอย่างจริง</span>
                <h3>${escapeHtml(album.name)}</h3>
              </div>
            </div>
            ${
              album.cameraId
                ? `<button type="button" class="btn btn-secondary" data-gal-open-camera="${album.cameraId}" style="padding: 10px 18px; font-size: 0.88rem;">
                    ดูเรทราคาเช่า →
                  </button>`
                : `<a href="${shopConfig.contact?.lineUrl || "#contact"}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 10px 18px; font-size: 0.88rem;">
                    💬 ทัก LINE สอบถามรุ่นนี้ →
                  </a>`
            }
          </div>

          <div class="gallery-photo-grid">
            ${album.photos
              .map(
                (photo, pIdx) => `
              <div class="gallery-photo-card" data-gal-album-id="${album.id}" data-gal-photo-idx="${pIdx}">
                <div class="gallery-photo-img-wrap">
                  <img src="${photo.url}" alt="${escapeHtml(photo.title)}" loading="lazy" />
                  <span class="photo-zoom-badge">🔍</span>
                  <div class="photo-camera-pill">
                    <span>📸 ${escapeHtml(album.shortName)}</span>
                    <span style="color: var(--accent-pink);">รูปที่ ${pIdx + 1}/${album.photos.length}</span>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
        )
        .join("");
    } else {
      const allPhotos = [];
      targetAlbums.forEach((album) => {
        album.photos.forEach((photo, pIdx) => {
          allPhotos.push({ album, photo, pIdx });
        });
      });

      container.innerHTML = `
        <div class="gallery-photo-grid">
          ${allPhotos
            .map(
              ({ album, photo, pIdx }) => `
            <div class="gallery-photo-card" data-gal-album-id="${album.id}" data-gal-photo-idx="${pIdx}">
              <div class="gallery-photo-img-wrap">
                <img src="${photo.url}" alt="${escapeHtml(photo.title)}" loading="lazy" />
                <span class="photo-zoom-badge">🔍</span>
                <div class="photo-camera-pill">
                  <span>📸 ${escapeHtml(album.shortName)}</span>
                  <span style="color: var(--accent-pink);">รูปที่ ${pIdx + 1}/${album.photos.length}</span>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    if (!container.dataset.bound) {
      container.addEventListener("click", (e) => {
        const specBtn = e.target.closest("[data-gal-open-camera]");
        if (specBtn) {
          openCameraDetail(specBtn.getAttribute("data-gal-open-camera"));
          return;
        }
        const photoCard = e.target.closest("[data-gal-album-id]");
        if (photoCard) {
          const albumId = photoCard.getAttribute("data-gal-album-id");
          const pIdx = Number(photoCard.getAttribute("data-gal-photo-idx") || 0);
          const album = sampleAlbums.find((a) => a.id === albumId);
          if (album) {
            openPhotosInLightbox(album.photos, pIdx, album.name, album.cameraId);
          }
        }
      });
      container.dataset.bound = "true";
    }
  }

  // ==========================================================================
  // หน้าต่างดูรูปตัวอย่างขนาดเต็มจอ (Lightbox)
  // ==========================================================================
  function openPhotosInLightbox(photosArray, startPhotoIndex, cameraName, linkedCameraId) {
    if (!Array.isArray(photosArray) || !photosArray.length) return;

    state.lightboxItems = photosArray.map((photo) => ({
      ...photo,
      cameraId: linkedCameraId || "",
      cameraName: cameraName || ""
    }));
    state.lightboxIndex = startPhotoIndex || 0;
    updateLightboxUI();

    const lb = document.getElementById("sample-lightbox");
    lb?.classList.add("open");
  }

  function updateLightboxUI() {
    const item = state.lightboxItems[state.lightboxIndex];
    if (!item) return;

    const imgEl = document.getElementById("lightbox-img");
    const titleEl = document.getElementById("lightbox-title");
    const captionEl = document.getElementById("lightbox-caption");
    const cameraBadgeEl = document.getElementById("lightbox-camera-badge");
    const counterEl = document.getElementById("lightbox-counter");
    const openCamBtn = document.getElementById("lightbox-open-camera-btn");

    if (imgEl) {
      imgEl.src = item.url;
      imgEl.alt = `${item.title}`;
    }
    if (titleEl) titleEl.textContent = item.title;
    if (captionEl) captionEl.textContent = "";
    if (cameraBadgeEl) {
      cameraBadgeEl.textContent = `📸 ${item.cameraName}`;
    }
    if (counterEl) {
      counterEl.textContent = `รูปที่ ${state.lightboxIndex + 1} จาก ${state.lightboxItems.length}`;
    }
    if (openCamBtn) {
      if (item.cameraId) {
        openCamBtn.style.display = "inline-flex";
        openCamBtn.setAttribute("data-lb-cam-id", item.cameraId);
      } else {
        openCamBtn.style.display = "none";
      }
    }
  }

  function initLightboxEvents() {
    const lb = document.getElementById("sample-lightbox");
    const closeBtn = document.getElementById("lightbox-close-btn");
    const prevBtn = document.getElementById("lightbox-prev-btn");
    const nextBtn = document.getElementById("lightbox-next-btn");
    const openCamBtn = document.getElementById("lightbox-open-camera-btn");

    closeBtn?.addEventListener("click", closeLightbox);
    lb?.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });

    prevBtn?.addEventListener("click", () => {
      if (!state.lightboxItems.length) return;
      state.lightboxIndex = (state.lightboxIndex - 1 + state.lightboxItems.length) % state.lightboxItems.length;
      updateLightboxUI();
    });

    nextBtn?.addEventListener("click", () => {
      if (!state.lightboxItems.length) return;
      state.lightboxIndex = (state.lightboxIndex + 1) % state.lightboxItems.length;
      updateLightboxUI();
    });

    openCamBtn?.addEventListener("click", () => {
      const camId = openCamBtn.getAttribute("data-lb-cam-id");
      closeLightbox();
      if (camId) openCameraDetail(camId);
    });

    window.addEventListener("keydown", (e) => {
      if (lb?.classList.contains("open")) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevBtn?.click();
        if (e.key === "ArrowRight") nextBtn?.click();
      } else if (document.getElementById("camera-detail-modal")?.classList.contains("open")) {
        if (e.key === "Escape") closeCameraDetail();
      }
    });
  }

  function closeLightbox() {
    document.getElementById("sample-lightbox")?.classList.remove("open");
  }

  // ==========================================================================
  // ฟังก์ชันช่วยเหลือ & แจ้งเตือน (Toast)
  // ==========================================================================
  function showToast(message) {
    let toast = document.getElementById("ruch-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "ruch-toast";
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 400;
        background: #1546B8;
        color: #FFFFFF;
        padding: 12px 20px;
        border-radius: 999px;
        font-family: var(--font-display);
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 12px 28px rgba(21, 70, 184, 0.3);
        transition: opacity 0.25s ease, transform 0.25s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 2600);
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
