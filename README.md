# Nami Portfolio - Bilingual Tattoo Artist Website

A modern, performant bilingual portfolio website for Korean fine-line tattoo artist Nami, built with Astro v5, Tailwind CSS, and React components.

## 🌸 Features

- **Bilingual Support**: Full Korean/English language toggle
- **Modern Design**: Dark charcoal canvas with pastel pink/blue accents
- **Optimized Performance**: SSG/SSR hybrid with minimal JavaScript
- **Gallery with Filters**: Interactive tattoo gallery with category filtering
- **Booking System**: Contact form with serverless API endpoint
- **Mobile-First**: Responsive design optimized for all devices
- **SEO Optimized**: Dynamic OG images and meta tags

## 🛠 Tech Stack

- **Framework**: Astro v5.8.0 (SSG/SSR hybrid)
- **Styling**: Tailwind CSS v3.4 + custom design tokens
- **Components**: React with Framer Motion for animations
- **Images**: Astro's built-in image optimization
- **Language**: TypeScript
- **Deployment**: Vercel with edge functions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nami-portfolio.git
cd nami-portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

5. Preview production build:
```bash
pnpm preview
```

## 🚀 Deployment

This project is configured for deployment to Vercel with server-side rendering for API endpoints.

### Deploy to Vercel

1. **One-click deployment:**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nami-portfolio)

2. **Manual deployment:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

### Environment Variables

For the booking form to send emails, set these environment variables in your Vercel dashboard:

- `RESEND_API_KEY`: Your Resend API key (get one at https://resend.com/)
- `FROM_EMAIL`: Email address to send from (e.g., `nami@euphoria-tattoo.com`)
- `TO_EMAIL`: Email address to receive bookings (e.g., `admin@euphoria-tattoo.com`)

**Note:** The site will work without these variables - bookings will be logged to the console instead of sent via email.

### Vercel Configuration

The project includes:
- `vercel.json` for deployment configuration
- `astro.config.mjs` with Vercel adapter
- API routes in `src/pages/api/` for server-side functionality

## 📁 Project Structure

```
/
├── public/
│   └── images/         # Tattoo gallery images
├── src/
│   ├── components/     # React components (Hero, Gallery, etc.)
│   ├── layouts/        # Astro layout components
│   ├── pages/          # Route pages
│   │   ├── api/        # API endpoints
│   │   ├── index.astro # Home page
│   │   ├── gallery.astro
│   │   ├── about.astro
│   │   └── book.astro
│   ├── styles/         # Global CSS
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## 🎨 Design System

### Colors
- **Charcoal**: `#111214` (background)
- **Ink**: `#E5E5E5` (text)
- **Accent Pink**: `#FFC3D9`
- **Accent Sky**: `#7DD3FC`

### Typography
- **Headings**: Bebas Neue (fallback for Stellar Condensed)
- **Body**: Pretendard

### Components
- **Cards**: 32px border radius
- **Tiles**: 16px border radius
- **Animations**: 0.8s spring easing with reduced motion support

## 📱 Pages

1. **Home** (`/`): Hero section with featured gallery items
2. **Gallery** (`/gallery`): Full tattoo portfolio with category filters
3. **About** (`/about`): Artist bio and studio information
4. **Book** (`/book`): Appointment booking form

## 🌐 Language Support

The site supports Korean and English languages. Switch languages using the toggle in the navigation bar. Language preference is maintained via URL parameter (`?lang=ko` or `?lang=en`).

## 🔧 Environment Variables

For production deployment with email functionality:

```env
RESEND_API_KEY=your_resend_api_key
```

## 📊 Performance

- **Lighthouse Score**: 90+ Performance, 95+ Accessibility
- **JavaScript Bundle**: < 90KB gzipped
- **LCP**: < 2.5s on 3G

## 📝 License

MIT License - feel free to use this project as a template for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with 💕 for Nami (@tattedbynami) 