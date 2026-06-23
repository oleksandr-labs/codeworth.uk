# TODO: /services/nlp — NLP & Text Processing

**Статус:** ❌ СТОРІНКА НЕ ІСНУЄ (створити!)
**Пріоритет:** 🔴 Критичний (Tier 1 money page)
**Primary KW:** `NLP development services UK`
**Secondary KW:** `natural language processing company UK`, `text classification service UK`, `NLP API UK`
**Цільова довжина:** 1500–2000 слів
**Schema:** `Service` + `FAQPage` + `BreadcrumbList`

---

## Структура сторінки

### 1. Hero Section
- H1: `NLP Development Services UK` (або "Natural Language Processing Services")
- Підзаголовок: "We build custom NLP systems that read, classify, and extract meaning from text at scale — for UK businesses in fintech, healthcare, and customer service."
- CTA: "Get NLP Consultation" → /contact
- Badges: "Sentiment Analysis", "Named Entity Recognition", "Document Extraction", "RAG Systems"

### 2. What We Build (конкретні use cases)
- **Text Classification & Routing** — customer tickets, email triage, intent detection
- **Sentiment & Opinion Analysis** — product reviews, social monitoring, NPS analysis
- **Named Entity Recognition (NER)** — contracts, medical records, financial documents
- **Document Intelligence** — invoice extraction, form parsing, OCR + NLP pipeline
- **RAG (Retrieval-Augmented Generation)** — internal knowledge base Q&A, document search
- **Conversational AI / Chatbots** — customer support, FAQ bot, internal helpdesk

### 3. NLP Tech Stack
- Transformers: BERT, RoBERTa, DistilBERT, Llama 3, GPT-4o fine-tuning
- Libraries: HuggingFace, spaCy, NLTK, LangChain, LlamaIndex
- Infrastructure: FastAPI + Redis queue, AWS Lambda, Google Cloud NL API

### 4. Process (4 steps)
1. Requirements → define NLP task type (classification / extraction / generation)
2. Data labelling → annotation pipeline setup
3. Model training + evaluation (F1, precision, recall)
4. Integration → REST API or direct embedding

### 5. Pricing / FAQ
- From £1,800 for PoC NLP prototype
- Production NLP system from £4,500
- Link to /pricing

### 6. FAQ (SEO) — 5 питань
1. "What is NLP and how can it help my business?"
2. "How long does it take to build a custom NLP model?"
3. "Do you work with multilingual NLP (Ukrainian, Polish)?"
4. "How accurate are NLP models for text classification?"
5. "Do I need to provide training data for NLP?"
6. "How much does NLP development cost in the UK?"
7. "What's the difference between NLP and AI chatbot?"

---

## SEO Чеклист
- [ ] Primary KW у H1 (перші 3 слова)
- [ ] Meta description 150–160 символів + CTA "Get a quote"
- [ ] `Service` schema із `name`, `description`, `provider`, `areaServed: GB`
- [ ] `FAQPage` schema (мінімум 5 питань)
- [ ] `BreadcrumbList`: Home → Services → NLP
- [ ] Internal links: → /services/machine-learning, → /services/llm-rag, → /ml/banking (NER use case), → /contact
- [ ] Outbound link: HuggingFace або Papers with Code (E-E-A-T)
- [ ] OG image (1200×630) специфічний для NLP
- [ ] hreflang: en + uk

---

## Відповідна UK-версія
- H1: `Розробка NLP-систем для бізнесу`
- URL: `/uk/services/nlp`
- Фокус на: обробка українських та англійських текстів, мультилінгвальний NLP

---

## Зв'язані файли
- `src/lib/data/services.ts` — додати `nlp` slug
- `src/app/[lang]/services/[slug]/page.tsx` — має підтягнути автоматично
- `src/app/og/services/[slug]/route.tsx` — додати nlp config
- Sitemap — перевірити що NLP сторінка індексується
