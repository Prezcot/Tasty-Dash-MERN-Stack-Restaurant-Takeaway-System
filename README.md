# Restaurant Takeaway Website

This website allows two different types of users **Customers** and **Administrators** to enjoy the following features on this MERN stack takeaway ordering system.

### Customers

- Customers can securely sign in to their accounts to access personalized features and information.
- New customers can easily sign up with our website to enjoy an ordering experience tailored to them.
- Once signed in, customers can explore the diverse selection of menu items, and then add them to or remove them from their baskets.
- Customers can further update their order contents, including changing quantities of selected items, removing unwanted selections and also include any special instructions to be considered when the restaurant prepares their order(allergies, dietary restrictions, etc.).
- Customers can review their final order summary and make secure payments using integrated PayPal services or their debit/credit cards.
- Once an order is placed, customers can view the status of live orders and a history of all their past orders and refunded orders.
- Customers are also able to change account information like their password, and also delete their account with the restaurant if they wish to.

### Administrators

- Admin accounts are manually added to the user database, and admins can sign in securely to get access to the admin feature suite.
- Admins are presented with a dashboard that allows them to view all orders placed by customers. Admins can approve these orders and once completed(prepared by restarant and collected by customer), mark them as "collected". Furthermore, admins can decline orders in case they are unable to fulfill these orders due to unforeseen circumstances. The restaurant may then issue a refund to these customers.
- Admins can view a list of all declined orders that need refunds issued for them.
- Admins can view a history of all the restaurant's completed orders.
- Finally, Admins are provided with the ability to add new menu items, change their prices, and manage the availability of existing items, to ensure that the menu is always up to date on the customer's side.

## Account Credentials:

### Admin Login Credentials:

- Username: admin
- Password: admin

### Test User Login Credentials:

- Username: user
- Password: User!
  
### PayPal Payment Credentials:

After an order's details have been finalized the following fictitious PayPal credentials can be used to mimic an actual PayPal account in the PayPal developer sandbox environment and make a test payment.
- Username: sb-qrzuv28891158@personal.example.com
- Password: *w+8&"6J

## How to run the application

### Docker:

- Change the directory to the root directory of the folder and run a `docker-compose up --build`

### Windows:

- Open two different terminal windows in the root directory of the folder.
- Run the commands `npm run client` and `npm run server` on each respectively.

## How to run tests

The following commands should be run in the root directory.

### Client:

- `npm run client_test`
  
### Server:

- `npm run server_test`
