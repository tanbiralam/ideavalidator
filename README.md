# IdeaValidator

A web-based tool that helps validate SaaS ideas using AI analysis, Reddit discussions, and market trends.

## Features

- 🤖 AI-powered idea analysis using Gemini
- 💬 Real user pain points from Reddit discussions
- 📈 Market interest data from Google Trends
- 🎯 Detailed validation report with actionable insights
- 📊 Market fit score and verdict

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **AI**: Google's Gemini AI
- **APIs**: Reddit API, Google Trends
- **Animation**: Framer Motion

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/idea-validator.git
   cd idea-validator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_AI_API_KEY=your_gemini_api_key
   REDDIT_CLIENT_ID=your_reddit_client_id
   REDDIT_CLIENT_SECRET=your_reddit_client_secret
   ```

4. Set up Supabase:

   - Create a new project in Supabase
   - Create a table named `ideas` with the following schema:
     ```sql
     create table public.ideas (
       id uuid default gen_random_uuid() primary key,
       text text not null,
       score integer not null,
       verdict text not null,
       summary text,
       timestamp timestamptz default now()
     );
     ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # React components
│   ├── Layout/           # Layout components
│   └── ui/               # Reusable UI components
├── lib/                  # External service integrations
│   ├── api/             # API clients
│   └── supabase/        # Supabase client
├── utils/               # Utility functions
├── types/               # TypeScript types
└── styles/             # Global styles and theme
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
