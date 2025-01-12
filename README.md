# Primary School SMIS (Student Management Information System)

Welcome to the Primary School SMIS repository! This project is designed to manage student information and streamline administrative tasks for primary schools. The system provides essential modules for user management, academic management, and reporting and analytics.

## Features

### 1. **User Management**
- Manage user accounts, including administrators, teachers, students, and parents.
- Role-based access control for secure and structured permissions.

### 2. **Academic Management**
- Manage student records, class enrollment, and grade levels.
- Track key academic details such as enrollment dates and guardianship information.

### 3. **Reporting and Analytics**
- Generate insightful reports on student records and academic data.
- Visualize data trends to support decision-making (excluding financial reports).

## Tech Stack

### Frontend
- [Nuxt.js](https://nuxtjs.org/) for building a fast, responsive, and dynamic user interface.

### Backend
- [Supabase](https://supabase.com/) as the database and backend-as-a-service platform.

### Database
- PostgreSQL (via Supabase) for structured and reliable data storage.

### Deployment
- Hosted on [GitHub](https://github.com/darlingson/primary-school-smis.git).

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) and npm installed.
- A [Supabase](https://supabase.com/) account.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/darlingson/primary-school-smis.git
   cd primary-school-smis
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Setup
1. Create a Supabase project and configure your database using the SQL file provided.
2. Add your Supabase API keys to a `.env` file:
   ```env
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-api-key>
   ```

### Run the Application
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or suggestions, feel free to open an issue or reach out to [Darlingson](https://github.com/darlingson).

---
Thank you for using the Primary School SMIS! Let's simplify school management together.