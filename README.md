# TrainWise Studio

A comprehensive fitness coaching platform built with Next.js, Prisma, and Stripe.

## Features

- **Role-Based Access Control**: Coach (admin) and customer roles with different permissions
- **Subscription Plans**: Trial, One-Time Payment, Standard, and Premium subscription options
- **Program Management**: Create, assign, and track fitness, nutrition, and mental health programs
- **Client Management**: Track client progress, requests, and subscription status
- **Content Creation**: Build structured programs with exercises, recipes, and mental health activities
- **Blog System**: Create and publish blog posts for customers
- **File Management**: Automatic and manual file delivery to customers
- **Shop**: Sell programs and other items to customers
- **Stripe Integration**: Handle payments and subscription management

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trainwisestudio"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
4. Seed the database:
   ```bash
   npm run seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Admin Access

Use these credentials to access the admin (coach) dashboard:
- Email: admin@admin.com
- Password: Password@123

## Deployment

### Deploying to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy the project:
   ```bash
   vercel
   ```
5. Set up environment variables in the Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: A secure random string
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

### Database Setup in Production

1. Create a PostgreSQL database (using services like Supabase, Railway, or Neon)
2. Run the database migrations:
   ```bash
   vercel env pull .env.production.local
   npx prisma migrate deploy
   ```
3. Seed the production database if needed:
   ```bash
   NODE_ENV=production npm run seed
   ```

## Project Structure

- `app/`: Next.js app directory with pages and API routes
- `components/`: UI components
- `lib/`: Utility functions and shared code
- `prisma/`: Database schema and migrations
- `public/`: Static assets
- `src/`: Legacy React components (being migrated)
- `scripts/`: Database seed and other scripts

## Subscription Plans

| Plan     | Access                                                      | Duration     | Notes                                  |
|----------|-------------------------------------------------------------|--------------|----------------------------------------|
| Trial    | 1 program, library preview, blog                            | 14 days      | Only usable once                       |
| OTP      | Assigned program only                                       | 30 days      | Time starts after assignment           |
| Standard | Full library, blog, shop, 1 program                         | Monthly      | Can search all exercises & recipes     |
| Premium  | Full access, all 3 programs, progress tracking, coach feedback | Monthly   | Best experience, tight coach feedback  |

## Program Categories

- **Fitness**: Exercises, logs reps, sets, kg
- **Nutrition**: Recipes, logs portions and additional macros
- **Mental Health**: Exercises, journaling, reflection, time spent

## License

This project is licensed under the MIT License - see the LICENSE file for details.
