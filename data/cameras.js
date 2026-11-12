/**
 * ============================================================================
 * RUCHDIGICAM – ข้อมูลร้าน รายการกล้อง และอัลบั้มรูปตัวอย่างจริง (DATA SOURCE)
 * ============================================================================
 */

window.SHOP_CONFIG = {
  shopName: "Ruchdigicam",
  tagline: "ร้านเช่ากล้องดิจิตอล Y2K สมุทรสาคร",
  logoUrl: "assets/logo/logo-placeholder.svg",
  useImageLogo: true,

  location: {
    city: "สมุทรสาคร (Samut Sakhon)",
    addressPlaceholder: "38 Ruch.digicam 1 ตำบลท่าทราย อำเภอเมืองสมุทรสาคร สมุทรสาคร 74000",
    pickupNotes: "นัดรับได้ในโซนสมุทรสาคร และมีบริการส่งแมสเซ็นเจอร์ / จัดส่งพัสดุด่วนทั่วประเทศ",
    googleMapsUrl: "https://maps.app.goo.gl/7i4nbDD8wCrX9unR6?g_st=ic",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=38+Ruch.digicam+1+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%A2+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%84%E0%B8%A3+%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%84%E0%B8%A3+74000&output=embed",
    openHours: "เปิดให้บริการทุกวัน: 09:30 – 20:30 น."
  },

  contact: {
    lineId: "@101UQAES",
    lineUrl: "https://line.me/R/ti/p/@101UQAES",
    instagramHandle: "@ruch.digicam",
    instagramUrl: "https://instagram.com/ruch.digicam"
  },

  includedWithEveryRental: [
    "เมมโมรี่การ์ดพร้อมใช้งาน",
    "แบตเตอรี่ + แท่นชาร์จครบชุด",
    "ตัวต่อการ์ดรีดเดอร์เข้ามือถือ (iPhone Lightning / Type-C / Android)",
    "ซองใส่กล้อง + สายคล้องมือ และผ้าเช็ดเลนส์"
  ]
};

// ============================================================================
// รูปตัวอย่างจริงจากทางร้าน (ดึงตรงจากโฟลเดอร์ assets/samples/ ทั้ง 7 รุ่น)
// ============================================================================
const SAMPLES_IXY510IS = [
  "assets/samples/ixy510is/0DDCA0ED-BF7D-4010-BAEE-B393AF4CBCB4.jpeg",
  "assets/samples/ixy510is/355F6D6B-0C50-41AB-A974-509CB0436A1D.jpeg",
  "assets/samples/ixy510is/4B0844E8-0857-4E34-B7CD-0F1C8980154E.jpeg",
  "assets/samples/ixy510is/5F3058B9-B1A5-4328-8480-66F509E6AE16.jpeg",
  "assets/samples/ixy510is/903009EE-711D-452A-8787-258392FDDCFF.jpeg",
  "assets/samples/ixy510is/9C5A1961-E9A0-46D1-9F85-0D24BC39C960.jpeg",
  "assets/samples/ixy510is/A44D3115-EBE3-4B77-A708-076AC1C99D21.jpeg",
  "assets/samples/ixy510is/A7AFD144-5E32-44B0-BD37-A67566657471.jpeg",
  "assets/samples/ixy510is/B3DDBBAE-0037-4C2A-95E2-DA30939822B1.jpeg",
  "assets/samples/ixy510is/B8D324E4-6A3A-4B6A-B90B-E4C771BA1AAF.jpeg",
  "assets/samples/ixy510is/C0DC703E-DF21-4B51-BDD9-4475B7B1C937.jpeg",
  "assets/samples/ixy510is/C7B1887D-C604-4B4C-9544-59F157CC4C9E.jpeg",
  "assets/samples/ixy510is/DBC9048D-BF76-4738-AF15-667063614A9A.jpeg",
  "assets/samples/ixy510is/E279C4EC-1035-45FC-A29E-4ABB3383CDF5.jpeg",
  "assets/samples/ixy510is/F5E6E48A-40C0-4FE4-8841-659F541F1CC3.jpeg",
  "assets/samples/ixy510is/FB3E96BE-2FC9-4463-98BB-00A13E21362E.jpeg",
  "assets/samples/ixy510is/FE763158-45EA-4B30-BA96-56E55675AEF3.jpeg"
].map((url, i) => ({
  id: `ixy510is-${i + 1}`,
  url,
  title: `Canon IXY 510 IS · รูปที่ ${i + 1}`
}));

const SAMPLES_IXY600F = [
  "assets/samples/ixy600f/26503B81-253E-4640-8222-D3E9C4126DDB.jpeg",
  "assets/samples/ixy600f/683782BA-7B8F-4F63-90D5-6A96C703E14A.jpeg",
  "assets/samples/ixy600f/95E0A68A-004A-4F53-ADD6-485E8311CAAF.jpeg",
  "assets/samples/ixy600f/C1F08A80-A4BA-4BC6-842F-66337E0069C0.jpeg"
].map((url, i) => ({
  id: `ixy600f-${i + 1}`,
  url,
  title: `Canon IXY 600F · รูปที่ ${i + 1}`
}));

const SAMPLES_IXY900IS = [
  "assets/samples/ixy900is/65.png",
  "assets/samples/ixy900is/66.png",
  "assets/samples/ixy900is/67.png",
  "assets/samples/ixy900is/68.png"
].map((url, i) => ({
  id: `ixy900is-${i + 1}`,
  url,
  title: `Canon IXY 900 IS · รูปที่ ${i + 1}`
}));

const SAMPLES_IXUS105IS = [
  "assets/samples/ixus105is/0141E91B-56F8-4560-94E6-8421AA57E6BC.jpeg",
  "assets/samples/ixus105is/0E025958-8DF8-4E0C-9B7B-5E1528C88729.jpeg",
  "assets/samples/ixus105is/25355F0C-CCB5-498F-9A41-F38575D67F43.jpeg",
  "assets/samples/ixus105is/55446BC8-99EB-4AC2-BB73-F131BF00ADE3.jpeg",
  "assets/samples/ixus105is/5C9376AA-68A7-4949-8B6B-D65B5325691E.jpeg",
  "assets/samples/ixus105is/77A2515E-2F22-4939-913A-656A3F3A4D1C.jpeg",
  "assets/samples/ixus105is/7EFFE720-63EE-499D-A531-11C0AD916913.jpeg",
  "assets/samples/ixus105is/80919D03-732D-4E6D-8C68-2F833B2DC2B7.jpeg",
  "assets/samples/ixus105is/984F55C9-305F-4D57-A062-750170DE9F5A.jpeg",
  "assets/samples/ixus105is/AB96D5D5-9C40-4B8F-A1EC-8EE494AA3FDC.jpeg",
  "assets/samples/ixus105is/D07A14D5-6031-4198-AA81-BC3EEF4AE59A.jpeg",
  "assets/samples/ixus105is/FED6F199-82F8-42C1-9AAF-A2F349011EE6.jpeg"
].map((url, i) => ({
  id: `ixus105is-${i + 1}`,
  url,
  title: `Canon IXUS 105 IS · รูปที่ ${i + 1}`
}));

const SAMPLES_IXUS80IS = [
  "assets/samples/ixus80is/190D154F-FC7A-4401-8B15-9D34F84B50BF.jpeg",
  "assets/samples/ixus80is/37F13B1C-7A48-4CD3-AB07-3DA439C662F3.jpeg",
  "assets/samples/ixus80is/5C69B2C0-1B1B-468D-8155-D902D0D8669A.jpeg",
  "assets/samples/ixus80is/7AFEFCC5-C918-4C3C-8A36-A75A13786269.jpeg",
  "assets/samples/ixus80is/8F5688CE-9F00-40E1-9E92-214D8BEE56BA.jpeg",
  "assets/samples/ixus80is/CDFD61F1-584D-48A7-AE8C-2CD13D8CA1FF.jpeg",
  "assets/samples/ixus80is/DA10223C-8DEE-4E20-A827-E44B1A8156B1.jpeg"
].map((url, i) => ({
  id: `ixus80is-${i + 1}`,
  url,
  title: `Canon IXUS 80 IS · รูปที่ ${i + 1}`
}));

const SAMPLES_IXY10S = [
  "assets/samples/ixy10s/B99A8824-3794-4F47-AF2A-B166C583E20F.jpeg",
  "assets/samples/ixy10s/D3609533-1960-437A-B57C-7BF84437D775.jpeg"
].map((url, i) => ({
  id: `ixy10s-${i + 1}`,
  url,
  title: `Canon IXY 10S · รูปที่ ${i + 1}`
}));

const SAMPLES_IXY930IS = [
  "assets/samples/ixy930is/223D963D-1678-48B4-89D3-42DFD508BDF2.jpeg",
  "assets/samples/ixy930is/2E7E9F67-FC02-4DE0-9369-4E315B968BA3.jpeg",
  "assets/samples/ixy930is/46B81D78-111A-46EF-A4A8-EC8E2BB6B933.jpeg",
  "assets/samples/ixy930is/4D90DE5F-A412-469F-86F2-B184AC00C6C1.jpeg",
  "assets/samples/ixy930is/63D78EA3-8A82-4D3A-B71A-2ED2917B43D8.jpeg",
  "assets/samples/ixy930is/AB800B3F-9D42-4200-AD74-494D3F641200.jpeg"
].map((url, i) => ({
  id: `ixy930is-${i + 1}`,
  url,
  title: `Canon IXY 930 IS · รูปที่ ${i + 1}`
}));

// ============================================================================
// รายการกล้องทั้งหมดของร้านจากโฟลเดอร์ Camera/รุ่นกล้องทั้งหมด (11.png – 17.png)
// ไม่มีคำอธิบายกล้อง แสดงเฉพาะรุ่น เรทราคา และรูปตัวอย่างจริง
// ============================================================================
window.CAMERAS_DATA = [
  {
    id: "canon-ixy-510is",
    albumId: "ixy510is",
    number: 1,
    brand: "Canon",
    name: "Canon IXY 510 IS / IXUS 110 IS",
    shortName: "Canon IXY 510 IS",
    category: "กล้องดิจิตอลคอมแพค",
    featured: true,
    colorHex: "#D8A7B1",
    image: "assets/cameras/crop_11.png",
    posterImage: "Camera/รุ่นกล้องทั้งหมด/11.png",
    prices: {
      day1: 250,
      day2: 400,
      day3: 500,
      currency: "บาท"
    },
    samplePhotos: SAMPLES_IXY510IS
  },
  {
    id: "canon-ixy-600f",
    albumId: "ixy600f",
    number: 2,
    brand: "Canon",
    name: "Canon IXY 600F / IXUS 230 HS",
    shortName: "Canon IXY 600F",
    category: "กล้องดิจิตอลคอมแพค",
    featured: true,
    colorHex: "#CBD5E1",
    image: "assets/cameras/crop_12.png",
    posterImage: "Camera/รุ่นกล้องทั้งหมด/12.png",
    prices: {
      day1: 250,
      day2: 400,
      day3: 500,
      currency: "บาท"
    },
    samplePhotos: SAMPLES_IXY600F
  },
  {
    id: "canon-ixy-900is",
    albumId: "ixy900is",
    number: 3,
    brand: "Canon",
    name: "Canon IXY 900 IS / IXUS 850 IS",
    shortName: "Canon IXY 900 IS",
    category: "กล้องดิจิตอลคอมแพค",
    featured: true,
    colorHex: "#94A3B8",
    image: "assets/cameras/crop_13.png",
    posterImage: "Camera/รุ่นกล้องทั้งหมด/13.png",
    prices: {
      day1: 250,
      day2: 400,
      day3: 500,
      currency: "บาท"
    },
    samplePhotos: SAMPLES_IXY900IS
  },
  {
    id: "canon-ixus-105is",
    albumId: "ixus105is",
    number: 4,
    brand: "Canon",
    name: "Canon IXY 200F / IXUS 105 IS",
    shortName: "Canon IXUS 105 IS",
    category: "กล้องดิจิตอลคอมแพค",
    featured: true,
    colorHex: "#F4B4C4",
    image: "assets/cameras/crop_14.png",
    posterImage: "Camera/รุ่นกล้องทั้งหมด/14.png",
    prices: {
      day1: 190,
      day2: 290,
      day3: 490,
      currency: "บาท"
    },
    samplePhotos: SAMPLES_IXUS105IS
  },
  {
    id: "canon-ixus-80is",
    albumId: "ixus80is",
    number: 5,
    brand: "Canon",
    name: "Canon IXY 20 IS / IXUS 80 IS",
    shortName: "Canon IXUS 80 IS",
    category: "กล้องดิจิตอลคอมแพค",
    featured: false,
    colorHex: "#D6C1B1",
    image: "assets/cameras/crop_15.png",
    posterImage: "Camera/รุ่นกล้องทั้งหมด/15.png",
    prices: {
      day1: 250,
      day2: 400,
      day3: 500,
      currency: "บาท"
    },
    samplePhotos: SAMPLES_IXUS80IS
  },
  {
    id: "canon-ixy-10s",
    albumId: "ixy10s",
    number: 6,
    brand: "Canon",
    name: "Canon IXY 10S / IXUS 210",
    shortName: "Canon IXY 10S",
    category: "กล้องดิจิตอลคอมแพค",
    featured: false,
    colorHex: "#475569",
    image: "assets/cameras/crop_16.png",
    posterImage: "Camera/รุ่นกล้องทั้งหมด/16.png",
    prices: {
      day1: 300,
      day2: 500,
      day3: 700,
      currency: "บาท"
    },
    samplePhotos: SAMPLES_IXY10S
  },
  {
    id: "canon-ixy-930is",
    albumId: "ixy930is",
    number: 7,
    brand: "Canon",
    name: "Canon IXY 930 IS / IXUS 200 IS",
    shortName: "Canon IXY 930 IS",
    category: "กล้องดิจิตอลคอมแพค",
    featured: false,
    colorHex: "#CBD5E1",
    image: "assets/cameras/crop_17.png",
    posterImage: "Camera/รุ่นกล้องทั้งหมด/17.png",
    prices: {
      day1: 250,
      day2: 400,
      day3: 500,
      currency: "บาท"
    },
    samplePhotos: SAMPLES_IXY930IS
  }
];

// ============================================================================
// อัลบั้มรูปตัวอย่างทั้งหมดในโฟลเดอร์ assets/samples (ครบทั้ง 7 รุ่น · 52 รูปจริง)
// ============================================================================
window.SAMPLE_ALBUMS = window.CAMERAS_DATA.map((cam) => ({
  id: cam.albumId,
  cameraId: cam.id,
  brand: cam.brand,
  name: cam.name,
  shortName: cam.shortName,
  category: cam.category,
  thumb: cam.image,
  photos: cam.samplePhotos
}));
