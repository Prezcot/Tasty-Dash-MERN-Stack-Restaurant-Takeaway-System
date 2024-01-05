# Restaurant Takeaway Website

This website allows two different types of users **Customers** and **Administrators** to enjoy the following features on this MERN stack takeaway ordering website.

### Customers

- Customers can securely sign in to their accounts to access personalized features and information.
- New customers can easily sign up with our website to enjoy a ordering experience tailored to them.
- Once signed in, customers can explore the diverse selection of menu items, and then add them to and remove them from their baskets.
- Customers can further update their order contents, including changing quantities of selected items, removing unwanted selections and also include any special instructions to be considered when the restaurant prepares their order(allergies, dietary restrictions etc.).
- Customers can the review their final order summary and make secure payments using integrated PayPal services or their debit/credit cards.
- Once an order is placed, customers can track the status of live orders as well as view a history of all their past orders and refunded orders.

### Administrators

- Admin logins are provided pre-made, and admins can sign in securely to get access to the admin feature suite.
- Admins are presented with a dashboard that allows them view all orders placed by customers. Admins can approve these orders and once completed, mark them as "collected"(moving these orders to the Collected Orders page). Furthermore admins can decline orders(moving these orders to the Refunded Items page), in the case they are unable to fulfill these orders due to unforseen cicumstances.
- Admins can view a list of all declined orders that have had refunds issued for them.
- Admins can view a history of all the shop's completed orders.
- Finally, Admins are provided with the ability to add new menu items, change their prices, manage availability of existing items, to ensure that the menu is always up to date on the Customer side.

## How to run

### Docker:

- Change the directory to the root directory of the folder and run a `docker-compose up --build`

### Windows:

- Open Two different terminal windows in the root directory of the folder.
- Run the commands `npm run client` and `npm run server` on each respectively.
