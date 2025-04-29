# Money Manager
### 【CS601 Term Project】 Author: Yifan Ding
A modern, elegant personal finance management application built with Next.js 14, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🌟 Features

- 💰 Track income and expenses
- 📊 Visual analytics and reporting
- 🌓 Dark/Light mode support
- 📱 Responsive design (Mobile-first)
- 🔄 Real-time updates
- 📈 Transaction history visualization
- 🎨 Modern UI with animations

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.17.0)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HeyDYF/Money-Manager.git
cd money-manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
money-manager/
├── app/                    # Next.js 14 app directory
│   ├── analytics/         # Analytics page with charts and statistics
│   ├── home/             # Main dashboard with transaction list
│   ├── onboarding/       # Initial setup page
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ui/              # UI components (shadcn/ui)
│   ├── AddTransactionDialog.tsx
│   ├── BalanceDisplay.tsx
│   ├── BottomNav.tsx
│   ├── MobileHeader.tsx
│   ├── TransactionList.tsx
│   └── TransactionAnalytics.tsx
├── hooks/                # Custom React hooks
│   └── useTransactions.ts
├── utils/               # Utility functions
│   ├── currencies.ts
│   └── transaction.ts
└── public/             # Static assets
```

## 🧰 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** 
  - Shadcn UI
  - Framer Motion
- **Charts:** Chart.js
- **State Management:** React Hooks
- **Form Handling:** React Hook Form

## 📱 Key Components

### Transaction Management
- Add, edit, and delete transactions
- Categorize transactions (Shopping, Restaurants, Transport, Entertainment, Other)
- Filter and search functionality
- Real-time balance updates

### Analytics Dashboard
- Spending trends by week/month/year
- Category-wise breakdown
- Visual charts and statistics
- Transaction history

## 🔧 Configuration

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color schemes
- Animation utilities
- Responsive breakpoints
- Dark mode support

### Next.js Configuration
Custom Next.js configuration includes:
- Optimized images
- Enhanced build performance
- Development optimization

## 📦 Available Scripts

```bash
# Development
npm run dev       # Start development server

# Production
npm run build     # Create production build
npm start         # Start production server

# Utility
npm run lint      # Run ESLint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Chart.js](https://www.chartjs.org/)