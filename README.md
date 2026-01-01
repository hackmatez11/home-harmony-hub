# 🏠 Real Estate SaaS Platform

A complete, production-ready Real Estate SaaS platform built with the MERN stack. This platform enables multiple real estate agencies and individual brokers to list and manage properties, while providing end users with advanced search capabilities, AI-powered chatbot, and voice search functionality.

## 🚀 Features

### For Public Users (Property Seekers)
- **Browse Properties**: Explore a comprehensive marketplace of properties from multiple agencies
- **Advanced Filtering**: Filter by price, location, property type, bedrooms, furnished status, and more
- **AI Chatbot**: Text-based intelligent assistant powered by Gemini API to help find perfect properties
- **Voice Search**: Multi-language voice search using Minimax Audio AI
- **Property Details**: View detailed information, images, location maps, and agency contacts
- **Direct Contact**: Connect with agencies and brokers via phone, email, or WhatsApp

### For Agencies & Brokers
- **Subscription Plans**: Choose from Basic, Pro, or Enterprise plans based on your needs
- **Property Management**: Add, edit, and delete property listings with image uploads
- **Storage Tracking**: Monitor storage usage with visual indicators and limits
- **Listing Limits**: Track number of active listings against plan limits
- **Agency Profile**: Customizable profile with logo, description, and social links
- **Dashboard Analytics**: View property statistics, views, and performance metrics
- **Subscription Management**: Upgrade, downgrade, or cancel subscriptions

### Platform Features
- **Multi-Agency Support**: Multiple agencies operate independently on a shared platform
- **Role-Based Access Control**: Different permissions for users, agencies, brokers, and admins
- **Subscription System**: Automated tracking and enforcement of plan limits
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and shadcn/ui
- **Multi-Language Support**: i18n implementation for global accessibility
- **Secure Authentication**: JWT-based authentication with password hashing

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **React Query** - Data fetching
- **i18next** - Internationalization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **bcrypt** - Password hashing

### AI Integration
- **Gemini API** - Text-based chatbot
- **Minimax Audio AI** - Voice bot (multi-language)
- **Google Maps** - Location integration

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd webapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realestate-saas
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
MINIMAX_API_KEY=your-minimax-api-key
FRONTEND_URL=http://localhost:5173
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Seed the database** (optional - adds sample data)
```bash
npm run seed
```

6. **Start the development servers**
```bash
# Start both frontend and backend concurrently
npm start

# Or start separately:
npm run server:dev  # Backend on port 5000
npm run dev         # Frontend on port 5173
```

## 📂 Project Structure

```
webapp/
├── server/                 # Backend code
│   ├── config/            # Database and configuration
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth, upload, etc.
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── seeds/            # Database seed files
│   └── server.js         # Express server entry
├── src/                   # Frontend code
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities and helpers
│   ├── services/        # API services
│   └── App.tsx          # Main app component
├── public/               # Static files
│   └── uploads/         # Uploaded images
└── package.json         # Dependencies and scripts
```

## 🔐 Test Accounts

After running `npm run seed`, you can use these test accounts:

### Public User
- Email: `john@example.com`
- Password: `password123`

### Agency 1 (Luxury Homes - Pro Plan)
- Email: `sarah@luxuryhomes.com`
- Password: `password123`

### Agency 2 (Urban Properties - Basic Plan)
- Email: `mike@urbanproperties.com`
- Password: `password123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/register-agency` - Register agency with subscription
- `GET /api/auth/profile` - Get current user profile

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (Agency only)
- `PUT /api/properties/:id` - Update property (Agency only)
- `DELETE /api/properties/:id` - Delete property (Agency only)
- `GET /api/properties/agency/my-properties` - Get agency's properties

### Agencies
- `GET /api/agencies/all` - Get all agencies
- `GET /api/agencies/public/:id` - Get agency by ID
- `GET /api/agencies/profile` - Get agency profile (Agency only)
- `PUT /api/agencies/profile` - Update agency profile (Agency only)
- `GET /api/agencies/dashboard/stats` - Get dashboard stats (Agency only)

### Subscriptions
- `GET /api/subscriptions/plans` - Get all subscription plans
- `GET /api/subscriptions/plans/:planName` - Get specific plan
- `POST /api/subscriptions/subscribe` - Subscribe to plan (Agency only)
- `GET /api/subscriptions/status` - Get subscription status (Agency only)
- `POST /api/subscriptions/cancel` - Cancel subscription (Agency only)

### AI
- `POST /api/ai/chatbot` - Chat with AI assistant
- `POST /api/ai/voicebot` - Voice-based search

## 💳 Subscription Plans

### Basic Plan - $29/month or $290/year
- 10 property listings
- 1GB storage
- Basic support
- Property search optimization
- Agency profile page

### Professional Plan - $79/month or $790/year
- 50 property listings
- 5GB storage
- Priority support
- Featured listings
- Advanced analytics
- Custom branding
- Lead management

### Enterprise Plan - $199/month or $1990/year
- 200 property listings
- 10GB storage
- 24/7 Premium support
- Unlimited featured listings
- Advanced analytics & reports
- Custom branding & domain
- API access
- Multi-agent management
- CRM integration

## 🌐 Database Models

### User
- Authentication and profile information
- Role-based access (user, agency, broker, admin)
- Subscription tracking
- Storage usage monitoring

### Agency
- Agency profile and branding
- Owner and contact information
- Subscription details with limits
- Property references
- Verification status

### Property
- Complete property details
- Location with Google Maps integration
- Multiple image support
- Availability status
- Agency and broker ownership
- Social links and contact information

### SubscriptionPlan
- Plan details and pricing
- Storage and listing limits
- Feature lists

## 🔧 Configuration

### MongoDB
For production, use MongoDB Atlas or your preferred MongoDB hosting:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/realestate-saas
```

### File Upload
Maximum file size: 5MB per image
Supported formats: JPEG, JPG, PNG, GIF, WebP
Storage location: `public/uploads/`

### AI Integration
To enable AI features, add your API keys:
- Gemini API: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Minimax Audio AI: Contact Minimax for API access

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection is configured
3. Build and deploy the Express server
4. Set up file storage (AWS S3, Cloudinary, etc.)

### Frontend Deployment
```bash
npm run build
```
Deploy the `dist` folder to your hosting platform (Vercel, Netlify, etc.)

## 📝 Development

### Adding New Features
1. Create necessary models in `server/models/`
2. Add controllers in `server/controllers/`
3. Define routes in `server/routes/`
4. Create frontend components in `src/components/`
5. Add pages in `src/pages/`
6. Update API service in `src/services/`

### Running Tests
```bash
npm run lint  # Lint checking
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review API endpoint examples

## 🎯 Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Property comparison feature
- [ ] Saved searches and alerts
- [ ] Virtual tour integration
- [ ] CRM integration
- [ ] Advanced reporting

---

**Built with ❤️ using MERN Stack**
