# Money Manager

A modern, elegant personal finance management application built with Next.js 14, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🌟 Features

- 💰 Track income and expenses
- 📊 Visual analytics and reporting
- 💱 Real-time currency exchange rates
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
git clone https://github.com/yourusername/money-manager.git
cd money-manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```env
NEXT_PUBLIC_EXCHANGE_API_KEY=your_exchange_rate_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
money-manager/
├── app/                    # Next.js 14 app directory
│   ├── analytics/         # Analytics page
│   ├── exchange/          # Currency exchange page
│   ├── home/             # Home page
│   └── layout.tsx        # Root layout
├── components/            # Reusable components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and helpers
├── public/               # Static assets
└── styles/              # Global styles
```

## 🧰 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** 
  - Radix UI
  - Shadcn UI
  - Framer Motion
- **Charts:** 
  - Chart.js
  - Recharts
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **State Management:** React Hooks

## 📱 Key Components

### Transaction Management
- Add, edit, and delete transactions
- Categorize transactions
- Filter and search functionality
- Real-time balance updates

### Analytics Dashboard
- Income vs. Expense visualization
- Spending trends
- Category-wise breakdown
- Custom date range analysis

### Currency Exchange
- Real-time exchange rates
- Support for multiple currencies
- Historical rate trends
- Currency conversion calculator

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [ExchangeRate-API](https://www.exchangerate-api.com/)

## 📞 Support

For support, email support@example.com or join our Slack channel.