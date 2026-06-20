# 📚 PrepWise Lite

> AI-powered study plan generator — tell it your subject, topics, and
> exam date, and it builds you a day-by-day prep schedule.

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)

## 🔗 Live Demo

**App:** [prep-wise-ai-seven.vercel.app](https://prep-wise-ai-seven.vercel.app)

## 📌 What It Does

Most students struggle to break down "I have an exam in 2 weeks" into
an actual day-by-day plan. PrepWise Lite takes your subject, topics,
and exam date, sends it to an LLM, and returns a structured study
schedule — distributing topics evenly across the days you have left.

Generated plans can be saved and revisited anytime from the **My Plans**
page.

## ✨ Features

- 📝 **Simple input form** — Subject, Topics, Exam Date
- 🤖 **AI-generated study plan** — powered by Groq (Llama 3)
- 📅 **Day-by-day breakdown** — topics distributed across available days
- 💾 **Save plans** — persisted to a Postgres database via Supabase
- 📋 **View saved plans** — dedicated `/plans` page showing history
- ⚡ **Fast, serverless** — Next.js App Router + Edge-ready API routes

## 📸 Screenshot

![PrepWise Lite home screen](screenshots/home.png)

*Home screen — enter subject, topics, and exam date to generate a plan.*

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Groq API (Llama 3 — `llama3-8b-8192`) |
| Database | Supabase (Postgres) |
| Hosting | Vercel |

## ⚙️ How It Works

```
User fills form (Subject, Topics, Exam Date)
            ↓
   POST /api/generate
            ↓
  Prompt built with today's date + exam date
            ↓
     Groq LLM generates day-by-day plan
            ↓
   Plan displayed in PlanCard component
            ↓
   User clicks "Save This Plan"
            ↓
  Inserted into Supabase `plans` table
            ↓
  Visible anytime on /plans page
```

## 📁 Project Structure

```
prepwise-lite/
├── app/
│   ├── page.tsx              # Home — study plan form
│   ├── layout.tsx            # Root layout + navbar
│   ├── plans/
│   │   └── page.tsx          # Saved plans list
│   └── api/
│       └── generate/
│           └── route.ts      # Groq API route
├── components/
│   ├── StudyForm.tsx          # Form + generate/save logic
│   └── PlanCard.tsx           # Plan display card
├── lib/
│   └── supabase.ts            # Supabase client
├── .env.local                 # API keys (not committed)
└── package.json
```

## 🚀 Run Locally

### 1. Clone and install

```bash
git clone https://github.com/ksusmitha879-cyber/prepWiseAI.git
cd prepWiseAI/my-app
npm install
```

### 2. Set up environment variables

Create `.env.local` in the project root:

```
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Get a free Groq key at [console.groq.com](https://console.groq.com).
Get your Supabase URL/key from your project's **Settings → API Keys**.

### 3. Set up the database

In Supabase SQL Editor, run:

```sql
create table plans (
  id uuid default gen_random_uuid() primary key,
  subject text not null,
  topics text not null,
  exam_date date not null,
  plan_content text not null,
  created_at timestamp default now()
);

alter table plans enable row level security;

create policy "Allow public read"
  on plans for select using (true);

create policy "Allow public insert"
  on plans for insert with check (true);
```

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📡 API

### `POST /api/generate`

**Request body:**
```json
{
  "subject": "Data Structures",
  "topics": "Arrays, Linked Lists, Trees, Graphs",
  "examDate": "2026-07-15"
}
```

**Response:**
```json
{
  "plan": "Day 1: Review Arrays...\nDay 2: Linked Lists..."
}
```

## 🧗 Challenges Faced

This project hit two genuinely tricky bugs during deployment:

1. **Git submodule issue** — `my-app` got accidentally tracked as a
   submodule reference (`160000` gitlink) instead of regular files,
   causing Vercel to fail finding `package.json` even though it was
   right there. Fixed by removing the gitlink and re-adding the
   directory as normal tracked files.
2. **Unterminated string in JSX** — a missing closing quote in a
   navbar link caused a confusing parser error that pointed to the
   wrong line. Traced it back by reading the raw file content.

## 👩‍💻 Built By

**Karanam Susmitha**
CS Graduate | Full Stack + AI/ML 

[LinkedIn](https://www.linkedin.com/in/karanamsusmitha) ·
[GitHub](https://github.com/ksusmitha879-cyber)
