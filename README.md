# SocialSphere - Complete Social Media Platform

A modern, full-featured social media platform built with Next.js, featuring real-time messaging, marketplace, AI moderation, and end-to-end encryption.

## 🚀 Features

### Core Social Features
- **User Profiles** - Customizable profiles with bio, avatar, and cover images
- **Posts & Timeline** - Text, image, video posts with likes and comments
- **Stories** - Temporary content that disappears after 24 hours
- **Real-time Messaging** - End-to-end encrypted messaging with file sharing
- **Follow System** - Follow users and see their content in your feed

### Advanced Features
- **Marketplace** - Buy and sell items with secure Stripe payments
- **AI Content Moderation** - OpenAI-powered content filtering
- **Interactive Tutorials** - Guided onboarding and feature tutorials
- **Video Calls** - WebRTC video calling with virtual backgrounds
- **Collections** - Save and organize posts into collections
- **Polls** - Create and participate in polls
- **Analytics** - Comprehensive user and content analytics

### Security & Privacy
- **End-to-End Encryption** - Secure messaging using Web Crypto API
- **Content Moderation** - AI-powered content filtering
- **User Verification** - Verified user badges
- **Privacy Controls** - Granular privacy settings

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Real-time**: Socket.io for live messaging and notifications
- **Payments**: Stripe for marketplace transactions
- **AI**: OpenAI API for content moderation
- **Authentication**: JWT with bcrypt password hashing
- **Deployment**: Vercel with PostgreSQL database

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd socialsphere
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your environment variables:
   \`\`\`env
   DATABASE_URL="postgresql://..."
   OPENAI_API_KEY="sk-..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   JWT_SECRET="your-jwt-secret"
   FRONTEND_URL="http://localhost:3000"
   PORT="3000"
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   npm run db:push
   npm run db:seed
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   \`\`\`bash
   vercel
   \`\`\`

2. **Set up environment variables in Vercel dashboard**
   - Add all environment variables from your `.env.local`
   - Make sure to use production values for Stripe and database

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Database Setup

1. **Create a PostgreSQL database** (recommended: Neon, Supabase, or Railway)

2. **Run migrations**
   \`\`\`bash
   npm run db:push
   \`\`\`

3. **Seed the database**
   \`\`\`bash
   npm run db:seed
   \`\`\`

### Stripe Setup

1. **Create a Stripe account** at https://stripe.com
2. **Get your API keys** from the Stripe dashboard
3. **Set up webhooks** pointing to `https://yourdomain.com/api/payments/webhook`
4. **Add webhook events**: `checkout.session.completed`, `payment_intent.payment_failed`

## 🧪 Testing

### Health Check
Visit `/api/health` to check if all services are running correctly.

### Run Tests
\`\`\`bash
npm test
\`\`\`

### Test Database Connection
\`\`\`bash
npm run db:studio
\`\`\`

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Posts
- `GET /api/posts` - Get posts feed
- `POST /api/posts` - Create new post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Marketplace
- `GET /api/marketplace` - Get marketplace listings
- `POST /api/marketplace` - Create new listing
- `GET /api/marketplace/[id]` - Get specific listing

### Payments
- `POST /api/payments/create-checkout` - Create Stripe checkout session
- `POST /api/payments/webhook` - Handle Stripe webhooks

### Messages
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send new message

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `OPENAI_API_KEY` | OpenAI API key for moderation | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `FRONTEND_URL` | Frontend URL for redirects | ✅ |
| `PORT` | Server port | ❌ |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@socialsphere.com or join our Discord community.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Stripe](https://stripe.com/) for payment processing
- [OpenAI](https://openai.com/) for AI moderation
- [Vercel](https://vercel.com/) for hosting
- [Prisma](https://prisma.io/) for database management
