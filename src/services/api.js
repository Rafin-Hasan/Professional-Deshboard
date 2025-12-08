// --- 1. OVERVIEW DATA ---
const OVERVIEW_STATS = {
  revenue: 54230,
  users: 2450,
  bounceRate: 42,
  serverLoad: 34
};

const NOTIFICATIONS_DATA = [
  { id: 1, type: 'user', text: "New user registered", time: "2 min ago", color: "bg-blue-500" },
  { id: 2, type: 'alert', text: "Server CPU high (90%)", time: "15 min ago", color: "bg-red-500" },
  { id: 3, type: 'sale', text: "New sale: $120.00", time: "1 hour ago", color: "bg-emerald-500" },
  { id: 4, type: 'message', text: "Support ticket #402 opened", time: "2 hours ago", color: "bg-purple-500" },
  { id: 5, type: 'success', text: "Backup completed successfully", time: "5 hours ago", color: "bg-green-500" },
  { id: 6, type: 'user', text: "User Alex updated profile", time: "6 hours ago", color: "bg-blue-500" },
  { id: 7, type: 'alert', text: "Database connection retry", time: "8 hours ago", color: "bg-orange-500" },
  { id: 8, type: 'sale', text: "New sale: $450.00", time: "10 hours ago", color: "bg-emerald-500" },
];

// --- 2. CUSTOMERS DATA ---
const CUSTOMERS_DATA = [
  { id: 101, name: "Alice Freeman", email: "alice@example.com", status: "Active", spent: 1200.50, color: "text-green-400 bg-green-500/10" },
  { id: 102, name: "Bob Smith", email: "bob.smith@test.co", status: "Inactive", spent: 0.00, color: "text-gray-400 bg-gray-500/10" },
  { id: 103, name: "Charlie Davis", email: "charlie@dev.io", status: "Pending", spent: 350.20, color: "text-orange-400 bg-orange-500/10" },
  { id: 104, name: "Diana Prince", email: "diana@amaz.on", status: "Active", spent: 8900.00, color: "text-green-400 bg-green-500/10" },
  { id: 105, name: "Evan Wright", email: "evan@write.net", status: "Active", spent: 120.00, color: "text-green-400 bg-green-500/10" },
  { id: 106, name: "Fiona Gallagher", email: "fiona@shameless.tv", status: "Banned", spent: 50.00, color: "text-red-400 bg-red-500/10" },
];

// --- 3. ANALYTICS DATA ---
const ANALYTICS_DATA = {
  stats: {
    pageViews: 894300,
    avgSession: "4m 32s",
    bounceRate: 32.5
  },
  topPages: [
    { path: "/dashboard/overview", views: 24000 },
    { path: "/products/settings", views: 12500 },
    { path: "/profile/edit", views: 8200 },
    { path: "/reports/sales", views: 6400 },
  ],
  deviceTraffic: {
    desktop: 65,
    mobile: 28,
    tablet: 7
  }
};

// --- 4. SALES DATA ---
const SALES_DATA = {
  financials: {
    netProfit: 24500,
    grossRevenue: 68200,
    avgOrder: 124,
    refunds: 1.2
  },
  transactions: [
    { id: 1024, user: "Alex Morgan", date: "Dec 07, 2025", amount: 120.00, status: "Completed" },
    { id: 1023, user: "Sarah Connor", date: "Dec 06, 2025", amount: 450.50, status: "Processing" },
    { id: 1022, user: "James Bond", date: "Dec 06, 2025", amount: 900.00, status: "Completed" },
    { id: 1021, user: "Ellen Ripley", date: "Dec 05, 2025", amount: 65.00, status: "Failed" },
    { id: 1020, user: "Bruce Wayne", date: "Dec 05, 2025", amount: 1200.00, status: "Completed" },
  ]
};

// --- 5. USER PROFILE DATA ---
const USER_PROFILE = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex@nexusui.com",
  phone: "+1 (555) 123-4567",
  role: "Administrator",
  bio: "Product Manager with 5+ years of experience in SaaS development. Passionate about building user-centric interfaces and scalable backend systems."
};

// --- API METHODS (Instant Resolution) ---
export const api = {
  getOverviewStats: () => Promise.resolve(OVERVIEW_STATS),
  getNotifications: () => Promise.resolve(NOTIFICATIONS_DATA),
  getCustomers: () => Promise.resolve(CUSTOMERS_DATA),
  getAnalytics: () => Promise.resolve(ANALYTICS_DATA),
  getSales: () => Promise.resolve(SALES_DATA),
  getUserProfile: () => Promise.resolve(USER_PROFILE),
};