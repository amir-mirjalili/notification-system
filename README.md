# 📬 Notification System

A modular, scalable, and extensible notification system built with **NestJS**, **BullMQ**, and **TypeORM**, designed to handle queued and immediate notification delivery through various strategies (email, SMS, etc.).

---

## 🧠 Assumptions

- Each notification type has its own strategy implementing a common `NotificationStrategy` interface.
- Currently only email is implemented; others can be easily extended.
- Redis is used for BullMQ queue handling.
- Notifications and delivery attempts are saved in a PostgreSQL database.
- Clean Architecture principles are used for separation of concerns.

---

## 🛠️ Setup Instructions

### 1. Clone the repo
```bash
  git clone https://github.com/amir-mirjalili/notification-system.git
  cd notification-system
```

### 2. Install dependencies
```bash
  npm install
```

### 3. Configure environment variables
Create a `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=USER
DB_PASS=PASSWORD
DB_NAME=DBNAME
```

### 4. Run database migrations
```bash
  npm run migration:create
```

### 5. Start the application
```bash
  npm run start:dev
```

### 6. test the application
```bash
  npm run test
```

---

## 🧱 Architecture Overview

```
src/
    :moduleName
        ├── entities/              # TypeORM Entities (Notification, Attempt)
        ├── strategies/            # Notification strategies (EmailStrategy)
        ├── queue/                 # Queue processor logic (BullMQ)
        ├── notification/          # Core module and service
        ├── exceptions/            # Custom exceptions like RetryableException
        └── main.ts                # App bootstrap
```

### 🔁 Features:
- **BullMQ Queue**: Background job processing.
- **Persistence**: All attempts tracked with success/failure.
- **Pluggable Strategies**: Easy to add new channels (SMS, Push).

---

## 🧪 Sample API Usage

### Queue a Notification:
```ts
await notificationService.send('EMAIL', {
  recipient: 'user@example.com',
  subject: 'Welcome!',
  data: {
    template: 'welcome',
    templateData: { name: 'Amir' },
  },
});
```

### Send Immediately:
```ts
await notificationService.sendImmediate('EMAIL', {
  recipient: 'user@example.com',
  subject: 'Your OTP',
  data: {
    template: 'otp',
    templateData: { code: '123456' },
  },
});
```


## 📈 Future Enhancements
- Add SMS/Push strategies
- Notification templates (Handlebars or EJS)
- Multi-tenant support
- Dashboard for retry/resend & analytics

---

## 🧑‍💻 Author
**Amir Mirjalili**  
GitHub: [amir-mirjalili](https://github.com/amir-mirjalili)

---

## 📄 License
MIT License

