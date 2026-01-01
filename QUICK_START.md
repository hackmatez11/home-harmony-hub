# 🚀 Quick Start Guide - Real Estate SaaS Platform

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn**

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

The `.env` file is already configured with defaults. You can modify it if needed:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/realestate-saas

# JWT Secret
JWT_SECRET=realestate-saas-jwt-secret-2026

# AI API Keys (Optional)
GEMINI_API_KEY=
MINIMAX_API_KEY=

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod

# Or if using brew on macOS:
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)
If using MongoDB Atlas, update `MONGODB_URI` in `.env` with your connection string.

### 4. Seed the Database

Load sample data (3 users, 2 agencies, 8 properties, 3 subscription plans):

```bash
npm run seed
```

You should see output like:
```
✅ MongoDB connected successfully
🗑️  Clearing existing data...
💳 Creating subscription plans...
👤 Creating test users and agencies...
🏠 Creating sample properties...
🎉 DATABASE SEEDED SUCCESSFULLY!
```

### 5. Start the Application

#### Option A: Start Both Servers Concurrently
```bash
npm start
```

#### Option B: Start Servers Separately

**Terminal 1 - Backend:**
```bash
npm run server:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 🔐 Test Accounts

After seeding, you can login with these accounts:

### Public User
```
Email: john@example.com
Password: password123
Role: Regular user (browse properties)
```

### Agency 1 - Luxury Homes (Pro Plan)
```
Email: sarah@luxuryhomes.com
Password: password123
Role: Agency owner
Features: 50 listings, 5GB storage, Featured properties
```

### Agency 2 - Urban Properties (Basic Plan)
```
Email: mike@urbanproperties.com
Password: password123
Role: Agency owner
Features: 10 listings, 1GB storage
```

## 🎯 Key Features to Test

### As a Public User:
1. Browse properties on the home page
2. Use filters (price, location, type, bedrooms)
3. View property details
4. Contact agencies via phone/email/WhatsApp
5. Use chatbot for property search
6. Use voice search (experimental)

### As an Agency:
1. Login with agency credentials
2. View dashboard with statistics
3. Check storage and listing usage
4. Add new properties (up to plan limit)
5. Edit existing properties
6. Delete properties
7. View subscription status

## 📁 Project Structure

```
webapp/
├── server/                  # Backend (Node.js/Express)
│   ├── config/             # Database config
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & upload
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── seeds/             # Database seeds
│   └── server.js          # Express server
├── src/                    # Frontend (React/TypeScript)
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── contexts/         # React contexts
│   ├── i18n/            # Internationalization
│   └── types/           # TypeScript types
└── public/               # Static assets
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/register-agency` - Register agency
- `GET /api/auth/profile` - Get profile

### Properties
- `GET /api/properties` - List properties (with filters)
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (Agency)
- `PUT /api/properties/:id` - Update property (Agency)
- `DELETE /api/properties/:id` - Delete property (Agency)

### Agencies
- `GET /api/agencies/all` - List all agencies
- `GET /api/agencies/profile` - Get agency profile (Agency)
- `PUT /api/agencies/profile` - Update agency (Agency)
- `GET /api/agencies/dashboard/stats` - Get statistics (Agency)

### Subscriptions
- `GET /api/subscriptions/plans` - List plans
- `POST /api/subscriptions/subscribe` - Subscribe (Agency)
- `GET /api/subscriptions/status` - Get status (Agency)

### AI
- `POST /api/ai/chatbot` - Text chat
- `POST /api/ai/voicebot` - Voice search

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED
```
**Solution:** Ensure MongoDB is running. Start it with `mongod` or check service status.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the `PORT` in `.env` or kill the process using the port:
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependency Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎨 Frontend Development

### Available Scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

### Environment Variables (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your-key
VITE_MINIMAX_API_KEY=your-key
```

## 🚢 Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Update `MONGODB_URI` to production database
3. Update `FRONTEND_URL` to production URL
4. Deploy server code

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set `VITE_API_URL` to production API URL

## 📚 Next Steps

1. **Add Property Form** - Complete the Add/Edit property forms
2. **Property Filters Component** - Implement advanced filtering UI
3. **Payment Integration** - Add Stripe/PayPal for subscriptions
4. **Email Notifications** - Send emails for inquiries
5. **Image Upload** - Implement Cloudinary/S3 for production
6. **Admin Panel** - Add admin dashboard for platform management
7. **Analytics** - Track property views and user behavior
8. **Mobile App** - Build React Native version

## 💡 Tips

- Use **MongoDB Compass** for visual database management
- Use **Postman** for API testing
- Enable **React DevTools** for debugging
- Check browser console for errors
- Monitor backend logs for API issues

## 🆘 Support

For issues or questions:
1. Check the main README.md
2. Review API documentation
3. Check console/server logs
4. Create an issue in the repository

---

**Happy Coding! 🎉**
