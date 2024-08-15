<p align="center">
  <img src="/client/src/assets/images/logo.png" alt="Logo" width="auto" height="80"/>
</p>

## Project Link
You can view the live project here: [Jewelry Sales System](https://gemify.qlbv.vn/)

## Overview
Jewelry Sales System is a comprehensive software solution designed to manage jewelry sales at a retail store with multiple counters. The system facilitates inventory management, order processing, invoice generation, discount and promotional policies, buy-back procedures, and customer loyalty programs. Additionally, the system supports managing staff performance, pricing, and statistical analysis through a dashboard.

## Features
- **Order Management:** Generate sales orders at the counter, scan barcodes, and print invoices. The system supports warranty printing for jewelry items.
  - *Pricing Calculation:* 
    - Sale Price = Cost Price * Markup Rate
    - Cost Price = (Gold Price at the time * Product Weight) + Labor Cost + Stone Cost
- **Promotion Management:** Manage company promotions and customer-specific discounts, which require manager approval.
  - *Discount Calculation:*
    - Invoice Discount = Company Promotional Discount (if applicable) + Customer Discount (if applicable)
- **Buy-Back Policy:** Supports buy-back transactions at the counter with preferential pricing for customers.
  - *Jewelry Buy-Back:*
    - Non-precious stones: Only the actual gold content is bought back.
    - Precious stones: Bought back at a percentage of the original price (e.g., 70%).
    - Gold buy-back is based on the current gold price at the time.
- **Gold Price Display:** Displays gold prices on store TVs after the admin has set the prices.
- **Customer Loyalty Program:** Accumulate loyalty points for customers based on purchases.
- **Staff and Sales Management:** Track staff sales performance by counter and monitor revenue by counter and individual employees.
- **Product Management:** Manage store inventory, including product listings, pricing, and return policies.
- **Dashboard:** A statistical dashboard to display key sales metrics and performance indicators.

## Technologies Used
- **Frontend:** [Angular](https://angular.io/)
- **Backend:** [ASP.NET Web API](https://dotnet.microsoft.com/apps/aspnet/apis)
- **Deployment:** [Digital Ocean](https://www.digitalocean.com/)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/jewelry-sales-system.git
    ```

2. Navigate to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

3. Navigate to the backend directory and restore the .NET packages:
    ```bash
    cd backend
    dotnet restore
    ```

4. Configure the deployment settings for Digital Ocean in your project.

5. Run the frontend and backend:
    ```bash
    # For frontend
    ng serve

    # For backend
    dotnet run
    ```

## Usage
1. **Store Owner Role, Store Manager Role:**
   - Set up product catalogs, manage gold prices, and oversee staff and promotional policies.
2. **Staff Role:**
   - Add Products to the Baskets.
3. **Repurchaser Role:**
   - Examine Gold Weights and Gem Type (Rare or Normal) for Buy-back and Exchange Transactions.
4. **Cashier Role:**
   - Manage sales at the counter, process invoices, Buy-back and Exchange Transactions.
   - Approve discounts and special customer offers.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
