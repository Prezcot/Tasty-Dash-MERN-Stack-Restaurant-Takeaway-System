
function AdminItem({ item, onDelete }) {
    return (
      <div className="menu-card">
        <img src={item.itemImage} alt={item.itemName} />
        <div className="menu-info">
          <h3>{item.itemName}</h3>
          <p>{item.itemDescription}</p>
          <p>Price: ${item.itemPrice.toFixed(2)}</p>
        </div>
        <div className="menu-actions">
          <div className="quantity">
            <button className="remove-from-cart">
              Edit
            </button>
          </div>
          <button className="add-to-cart" onClick={onDelete}>Delete</button>
        </div>
      </div>
    );
  }
  export default AdminItem;