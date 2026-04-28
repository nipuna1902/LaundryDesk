# 🧼 LaundryDesk – Mini Laundry Order Management System

LaundryDesk is a lightweight full-stack application built to help dry cleaning stores manage their daily orders efficiently. It allows store owners to create orders, track their status, calculate billing, and view basic business insights through a simple dashboard.

This project was built using an **AI-first approach**, where AI tools were used to accelerate development, followed by manual improvements and debugging.

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/laundrydesk.git
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

Simply open:

```bash
frontend/index.html
```

in your browser.

---

## ✨ Features Implemented

### 🧾 Order Creation

* Add customer name and phone number
* Add garment type, quantity, and price
* Automatically generates a unique Order ID
* Calculates total bill amount

---

### 🔄 Order Status Management

* Status flow: `RECEIVED → PROCESSING → READY → DELIVERED`
* Prevents invalid transitions (e.g., skipping steps)
* Status updated directly from UI

---

### 💰 Payment Tracking

* Track payment status (`PENDING / PAID`)
* Update payment directly from order card

---

### 👕 Automated Pricing

* Auto-assigns price based on garment type (Shirt, Pants, Saree, etc.)
* Falls back to manual price if type is unknown
* Ensures consistency even if frontend input is incorrect

---

### 📋 View & Filter Orders

* View all orders in a board-style layout
* Filter by:

  * Status
  * Customer name (partial search)
  * Phone number

---

### 📊 Dashboard

* Total orders
* Total revenue
* Orders grouped by status

---

### 🎨 UI/UX Highlights

* Scrollable columns (fixed height)
* Interactive cards with inline controls
* Clean and minimal design

---

## 🤖 AI Usage Report

### Tools Used

* ChatGPT (primary)
* Gemini (low usage)

---

### How AI Helped

* Generated initial backend structure (Express + MongoDB)
* Created Mongoose schema and controllers
* Helped design API endpoints
* Assisted in frontend logic and UI ideas
* Debugging common errors (async issues, imports, validation)

---

### Sample Prompts Used

* “Create a Mongoose schema for a laundry order system”
* “Write an Express controller to calculate total bill from garments array”
* “How to implement status transition validation in Node.js”
* “Fix async/await error in Node.js controller”

---

### What AI Got Wrong

* Generated code with incorrect variable scope (e.g., using variables outside functions)
* Missed proper validation in some cases
* Incorrect DOM references in frontend (`name.value` issue)
* Suggested logic that caused runtime errors (like misplaced `await`)

---

### What I Improved

* Fixed scope and async errors manually
* Added proper validation for inputs
* Implemented strict status transition logic
* Refactored controller structure for clarity
* Improved UI/UX beyond basic implementation

---

## ⚖️ Tradeoffs

* Single garment input per order (for simplicity and faster implementation)
* No authentication system (kept out to avoid overengineering)
* No external notification system (SMS/email)
* Basic UI instead of full frontend framework

---

## 🚧 Future Improvements

* Support multiple garments in a single order
* Add authentication (admin/staff login)
* Notification system (SMS when order is ready)
* Invoice/receipt generation
* Customer order history
* Payment method tracking (UPI/Cash split)
* Deployment with full production setup

---

## 🏁 Conclusion

LaundryDesk is a functional MVP that demonstrates:

* Backend API development
* Real-world workflow design
* AI-assisted development
* Practical problem solving

---
