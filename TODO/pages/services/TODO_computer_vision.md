# TODO: /services/computer-vision — Computer Vision Development

**Статус:** ❌ СТОРІНКА НЕ ІСНУЄ (створити!)
**Пріоритет:** 🔴 Критичний (Tier 1 money page)
**Primary KW:** `computer vision development UK`
**Secondary KW:** `CV object detection UK`, `image recognition AI company UK`, `visual inspection AI UK`
**Цільова довжина:** 1500–2000 слів
**Schema:** `Service` + `FAQPage` + `BreadcrumbList`

---

## Структура сторінки

### 1. Hero Section
- H1: `Computer Vision Development Services UK`
- Підзаголовок: "We build production-ready computer vision systems — from quality inspection pipelines to real-time object detection — for UK manufacturing, healthcare, and ecommerce."
- CTA: "Get CV Consultation" → /contact
- Badges: "Object Detection", "Image Classification", "OCR", "Quality Inspection"

### 2. What We Build (конкретні use cases)
- **Quality Control & Visual Inspection** — defect detection on production lines, automated QA
- **Object Detection & Tracking** — YOLO-based detection, warehouse automation, CCTV analytics
- **Medical Imaging** — cell classification, X-ray analysis, pathology assistance
- **Document OCR + Extraction** — invoice scanning, ID verification, form digitization
- **Visual Search & Recommendation** — "shop the look", similar product matching
- **Retail Analytics** — footfall counting, shelf monitoring, planogram compliance

### 3. CV Tech Stack
- Models: YOLOv9/v10, EfficientDet, ResNet, Vision Transformer (ViT), SAM (Segment Anything)
- Libraries: OpenCV, PyTorch, TorchVision, Ultralytics, Roboflow
- Infrastructure: GPU inference (NVIDIA TensorRT), edge deployment (ONNX, Jetson), cloud APIs

### 4. Process (4 steps)
1. Use case definition → labelling strategy
2. Data collection + annotation (bounding boxes, segmentation masks)
3. Model training + accuracy validation
4. Deployment: edge device / cloud API / on-premise

### 5. Metrics We Deliver
- Object detection: mAP@0.5 ≥ 0.85 (industry benchmark)
- Classification: accuracy ≥ 92% (production target)
- Inference speed: <100ms on standard GPU, <500ms on edge

### 6. FAQ (SEO) — 7 питань
1. "What can computer vision be used for in manufacturing?"
2. "How accurate is AI visual inspection vs human inspection?"
3. "Do I need a GPU server for computer vision?"
4. "How much training data is needed for CV model?"
5. "How much does computer vision development cost UK?"
6. "Can computer vision work in real-time (live video)?"
7. "What's the difference between object detection and image classification?"

---

## SEO Чеклист
- [ ] Primary KW у H1 (перші 3 слова)
- [ ] Meta description 150–160 символів + CTA
- [ ] `Service` schema: name, description, provider, areaServed: GB
- [ ] `FAQPage` schema (мінімум 5 питань)
- [ ] `BreadcrumbList`: Home → Services → Computer Vision
- [ ] Internal links: → /ml/healthcare, → /use-cases (QC use case), → /services/mlops (deployment), → /contact
- [ ] Outbound link: Papers with Code leaderboard або IEEE (E-E-A-T)
- [ ] OG image специфічний для CV
- [ ] hreflang: en + uk

---

## UK-версія
- H1: `Розробка систем комп'ютерного зору`
- URL: `/uk/services/computer-vision`
- Фокус: автоматизація виробничого контролю якості, медична візуалізація

---

## Зв'язані файли
- `src/lib/data/services.ts` — додати `computer-vision` slug
- `src/app/og/services/[slug]/route.tsx` — вже є `cv` config (перевірити slug match!)
- Sitemap — перевірити індексацію
