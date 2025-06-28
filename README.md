# Travel Booking Platform

A comprehensive travel booking platform built with Next.js 14, TypeScript, and Tailwind CSS. This application provides a complete flight booking experience from search to passenger information collection.

## Features

### 🏠 Home Page
- Hero section with search functionality
- Popular travel packages showcase
- Value proposition section
- Travel recommendations with ratings and pricing
- Newsletter subscription
- Responsive design

### 🔍 Search & Results
- Advanced flight search with filters
- Real-time flight results display
- Filter by stops, airlines, price range, and duration
- Sorting options (Recommended, Fastest, Cheapest)
- Responsive flight cards with detailed information

### 👤 Authentication
- Simple login system (Firebase integration ready)
- Protected booking routes
- User session management

### 📝 Booking Flow
- Multi-step booking process (Details → Review → Payment)
- Dynamic passenger forms based on search criteria
- Adult and children form variations
- Comprehensive passenger information collection
- Booking summary with price breakdown
- Terms and conditions acceptance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd travel-booking-platform
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── booking/           # Booking page with dynamic routes
│   ├── login/             # Authentication page
│   ├── search/            # Search results page
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   ├── HeroSection.tsx   # Home page hero
│   ├── SearchForm.tsx    # Flight search form
│   ├── FlightResults.tsx # Search results display
│   └── ...               # Other components
├── contexts/             # React Context providers
│   ├── AuthContext.tsx   # Authentication state
│   └── SearchContext.tsx # Search state management
└── public/               # Static assets
\`\`\`

## API Integration

### Flight Search API
- **Endpoint**: `https://api.tbp.travel/flights`
- **Method**: POST
- **Payload**:
\`\`\`json
{
  "origin": "DAC",
  "destination": "DXB", 
  "departureDate": "12 Oct 2025",
  "returnDate": "20 Aug 2025",
  "passenger": {
    "adult": 2,
    "children": 0,
    "infant": 0
  }
}
\`\`\`

### Authentication
- Firebase integration ready
- Mock authentication implemented for demo

## Key Features Implementation

### 🔄 Dynamic Passenger Forms
- Forms automatically adjust based on passenger count
- Separate validation for adults and children
- Real-time form state management

### 🎯 Smart Routing
- Protected routes for booking
- Automatic login redirect for unauthenticated users
- Seamless navigation between search and booking

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### 🎨 Modern UI/UX
- Clean, professional design
- Consistent color scheme and typography
- Intuitive user flow

## Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles
- Component-level styling with Tailwind classes

### API Integration
- Replace mock data in `app/search/page.tsx`
- Implement real Firebase authentication in `contexts/AuthContext.tsx`
- Add error handling and loading states

### Features Extension
- Add hotel booking functionality
- Implement payment processing
- Add user profile management
- Include booking history

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Ensure environment variables are configured

## Environment Variables

Create a `.env.local` file:
\`\`\`env
NEXT_PUBLIC_API_URL=https://api.tbp.travel
FIREBASE_API_KEY=your_firebase_key
FIREBASE_AUTH_DOMAIN=your_domain
# Add other Firebase config
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team or create an issue in the repository.
