export const EXTRAS_EN: Record<string, { titleEn: string; descriptionEn: string }> = {
  // AI features
  "ai-chatbot-rag": {
    titleEn: "AI Chatbot with Knowledge Base (RAG)",
    descriptionEn: "OpenAI GPT chatbot trained on your documents: FAQ, pricing, terms. Accurate answers with human fallback.",
  },
  "ai-product-descriptions": {
    titleEn: "AI Product Description Generator",
    descriptionEn: "Bulk SEO descriptions via OpenAI. Processes 100–1,000 catalogue items automatically.",
  },
  "ai-smart-search": {
    titleEn: "Semantic AI Search",
    descriptionEn: "Meaning-based search finding similar products, articles and services. Vector embeddings + Pinecone/Weaviate.",
  },
  "ai-image-alt": {
    titleEn: "AI Alt Text Generator",
    descriptionEn: "Auto-fill alt attributes for all site images via Vision AI. SEO and accessibility at once.",
  },
  "ai-personalization": {
    titleEn: "AI Content Personalisation",
    descriptionEn: "Show different content to different visitors based on behaviour: recommended services and personalised hero.",
  },
  "ai-review-sentiment": {
    titleEn: "AI Review Sentiment Analysis",
    descriptionEn: "Automatic review analysis: positive/negative/neutral, topic tagging and alert on negative feedback.",
  },
  "ai-seo-optimizer": {
    titleEn: "AI SEO Assistant",
    descriptionEn: "AI page content analysis: recommendations on keywords, readability and internal linking.",
  },
  "ai-lead-scoring": {
    titleEn: "AI Lead Scoring",
    descriptionEn: "Automatic lead quality scoring by source, behaviour and form data. CRM prioritisation.",
  },
  "ai-voice-search": {
    titleEn: "AI Voice Search",
    descriptionEn: "Microphone button on the site: the customer speaks — AI understands and searches. Web Speech API + NLP query processing. Perfect for mobile and e-commerce.",
  },
  "ai-auto-translate": {
    titleEn: "AI Auto-Translation",
    descriptionEn: "Automatic translation of articles, products and pages into multiple languages via GPT-4o. Preserves HTML structure, SEO tags and brand tone.",
  },
  "ai-price-optimizer": {
    titleEn: "AI Price Optimiser",
    descriptionEn: "Dynamic pricing: AI analyses demand, seasonality and competitors — suggests the optimal price. Modes: Maximise Profit or Maximise Sales.",
  },
  "ai-recommendations": {
    titleEn: "AI Recommendation Engine",
    descriptionEn: "\"Customers also buy\" and \"Similar services\" based on user behaviour. Collaborative filtering or content-based via OpenAI Embeddings.",
  },
  "ai-content-moderator": {
    titleEn: "AI Content Moderation",
    descriptionEn: "Automatic screening of reviews, comments and form submissions for spam, toxicity and irrelevant content. Moderator alerts + auto-blocking.",
  },
  "ai-copywriter": {
    titleEn: "AI Copywriter for Landing Pages",
    descriptionEn: "Generate hero texts, benefits, CTAs and about-page copy via GPT-4o. Brand tone, keyword targeting, A/B variants.",
  },
  "ai-faq-generator": {
    titleEn: "AI FAQ Generator",
    descriptionEn: "Automatically generate an FAQ section from site content, reviews and customer search queries. FAQPage Schema.org for featured snippets.",
  },
  "ai-demand-forecast": {
    titleEn: "AI Demand Forecasting",
    descriptionEn: "ML model forecasts sales for products and services 30–90 days ahead. Accounts for seasonality, holidays and trends. Dashboard with chart and recommendations.",
  },
  "ai-chat-summary": {
    titleEn: "AI Chat Summary",
    descriptionEn: "After every chat or call, AI auto-generates a concise CRM summary: topic, customer issue, next step. Saves 5–10 min per lead.",
  },
  "ai-form-assistant": {
    titleEn: "AI Form Assistant",
    descriptionEn: "Smart hints while filling forms: autocomplete, field explanations and real-time error correction. Increases completion rate by 25–35%.",
  },

  // AI — UK + UA Dual Market (2026-05-02)
  "ai-invoice-processor": {
    titleEn: "AI Invoice & Document Processing",
    descriptionEn: "GPT-4o Vision extracts data from PDF/photo/scans: supplier, amount, VAT, date, category. Syncs to Xero/QuickBooks. Making Tax Digital compliant. Confidence scoring + human review queue for uncertain fields.",
  },
  "ai-document-summary": {
    titleEn: "AI Document Summary",
    descriptionEn: "Upload a PDF contract or report → AI delivers in 30 seconds: key clauses, risks, dates, obligations. Supports EN + UK language documents. Ideal for legal, procurement and property.",
  },
  "ai-quiz-generator": {
    titleEn: "AI Quiz & Test Generator",
    descriptionEn: "Upload study material → AI generates tests: MCQ, true/false, open-ended. Difficulty levels, answer shuffling, instant feedback with explanations. Ideal for EdTech and corporate training.",
  },
  "ai-learning-path": {
    titleEn: "AI Personalised Learning Path",
    descriptionEn: "Diagnostic test → AI identifies knowledge gaps → builds an individual study plan. Adaptive difficulty. Teacher progress dashboard. Streaks and gamification. Ideal for language schools and corporate training.",
  },
  "ai-property-description": {
    titleEn: "AI Property Listing Description Generator",
    descriptionEn: "Agent enters parameters → AI writes a converting listing in EN or Ukrainian. Styles: casual, premium, investment. SEO-optimised title. Bulk mode: 50+ listings from one CSV upload. Compatible with Rightmove and DOM.RIA.",
  },
  "ai-property-matcher": {
    titleEn: "AI Natural Language Property Search",
    descriptionEn: "Buyer types in plain English: 'two-bed, quiet street, under 15 min to tube' → AI finds matching listings from your catalogue. Semantic search replaces rigid filters. OpenAI Embeddings + Qdrant.",
  },
  "ai-bilingual-chatbot": {
    titleEn: "AI Bilingual Chatbot UK/EN",
    descriptionEn: "RAG chatbot that replies in the customer's language — Ukrainian or English — automatically. One knowledge base → two languages, two locales (£/₴ pricing, local contacts). Built for Ukrainian businesses with UK offices.",
  },
  "ai-site-localization": {
    titleEn: "AI Site Localisation UK/UA",
    descriptionEn: "Automated translation and cultural adaptation of all site content: adapts prices (£↔₴), examples, CTAs to local context. Preserves HTML structure and SEO tags. Translations cached in Postgres.",
  },
  "ai-crop-analysis": {
    titleEn: "AI Drone Crop Analysis",
    descriptionEn: "Computer Vision analyses drone footage: disease detection (14 crop classes), stress zones, crop density assessment. YOLOv8 + OpenCV. Field map with risk zones and spray recommendations. UK precision farming compatible.",
  },
  "ai-auto-crop": {
    titleEn: "AI Smart Image Crop",
    descriptionEn: "Automatic image cropping to required aspect ratios (1:1, 16:9, 4:3, banner). Smart crop: AI identifies the main subject — face, product, logo — and frames around it. Batch processing up to 500 images. Niches: e-commerce catalogues, social media marketing, property photography.",
  },

  // ML extras (2026-06-24)
  "ml-anomaly-detector": {
    titleEn: "Anomaly Detection Module",
    descriptionEn: "ML model monitors business data streams in real time and flags unusual patterns: suspicious transactions, quality deviations and operational failures. Configurable alert thresholds with Slack or email notifications. Ideal for finance, manufacturing and logistics.",
  },
  "ml-nlp-email-classifier": {
    titleEn: "Smart Email Classifier",
    descriptionEn: "NLP model automatically routes inbound emails by intent, urgency and topic to the correct team or system. Reduces email handling time by 60–80% and eliminates manual triage for high-volume inboxes.",
  },
  "ml-churn-predictor": {
    titleEn: "Customer Churn Predictor",
    descriptionEn: "ML model identifies customers likely to leave within 30, 60 or 90 days and automatically fires retention triggers — discounts, call tasks or personalised offers. Reduces churn by 20–35% with CRM integration.",
  },
  "ml-sentiment-dashboard": {
    titleEn: "Sentiment Intelligence Dashboard",
    descriptionEn: "Real-time NLP analysis of customer feedback, reviews and support tickets. Trend charts, negative-spike alerts and product-level or channel-level breakdown help your team act before issues escalate.",
  },
  "ml-cv-quality-inspector": {
    titleEn: "Visual Quality Inspector",
    descriptionEn: "Computer Vision detects defects and anomalies on production lines in real time: scratches, cracks, misaligned labels and packaging faults. YOLOv8 + camera feed integration with instant reject signals.",
  },
  "ml-forecasting-engine": {
    titleEn: "Demand Forecasting Engine",
    descriptionEn: "Time-series ML forecasts sales, inventory and resource needs accounting for UK seasonality, bank holidays and market trends. Supports Prophet, XGBoost and LSTM. Dashboard with 7–90 day horizon and replenishment recommendations.",
  },
  "ml-entity-extractor": {
    titleEn: "Entity Extraction Pipeline",
    descriptionEn: "NLP pipeline automatically locates and structures names, dates, monetary amounts, company names and legal terms from unstructured documents — contracts, emails and reports. Outputs to JSON or direct CRM integration.",
  },
  "ml-personalized-notifications": {
    titleEn: "ML Push Notification Optimiser",
    descriptionEn: "ML determines the optimal send time, message content and channel (email, SMS or web push) for each individual user. A/B message testing and open-rate analytics included in the dashboard.",
  },
  "ml-document-classifier": {
    titleEn: "Intelligent Document Router",
    descriptionEn: "ML automatically classifies incoming documents — invoices, contracts, applications and briefs — and routes each to the correct team or workflow. Cuts manual sorting effort and reduces misfiling risk significantly.",
  },
  "ml-risk-scorer": {
    titleEn: "ML Risk Scoring API",
    descriptionEn: "Real-time API scores transactions or events across hundreds of features and returns a numeric risk score with SHAP explainability for every decision. FCA-aligned transparency, audit logging and ready to integrate with any platform.",
  },
};
