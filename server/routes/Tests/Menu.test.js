const request = require("supertest");
const express = require("express");
const Menu = require("../Menu");
const { Menuitem } = require("../../Schemas/Schemas");
const { default: mongoose } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongo_uri = mongoServer.getUri();
  await mongoose.connect(mongo_uri);
  const menu = new Menuitem({
    itemName: "FakeItem",
    itemDescription: "This is a fake menu item",
    itemPrice: 10.99,
    itemImage: "fake_image.jpg",
    itemType: "FakeType",
  });
  menu.save();
  app = express();
  app.use(express.json());
  app.use("/menu", Menu);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Menu Route Test", () => {
  it("Gets menu items from the database", async () => {
    const response = await request(app).get("/menu/data"); // Assuming this is the endpoint for retrieving menu data

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more specific assertions based on your data and expectations
  });

  it("AddS a menu item", async () => {
    const new_item = {
      itemName: "NewFakeItem",
      itemDescription: "This is a new fake menu item",
      itemPrice: 15.99,
      itemImage: "new_fake_image.jpg",
      itemType: "NewFakeType",
    };

    const response = await request(app).post("/menu/add").send(new_item);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    // Check if the added item matches the sent data
    expect(response.body.itemName).toBe(new_item.itemName);
    expect(response.body.itemDescription).toBe(new_item.itemDescription);
    expect(response.body.itemPrice).toBe(new_item.itemPrice);
    expect(response.body.itemImage).toBe(new_item.itemImage);
    expect(response.body.itemType).toBe(new_item.itemType);

    // Check if the item is present in the database
    const saved_item = await Menuitem.findOne({ itemName: new_item.itemName });
    expect(saved_item).toBeDefined();
    expect(saved_item.itemName).toBe(new_item.itemName);
  });

  it("should delete a menu item", async () => {
    // Create a menu item to be deleted
    const new_item = {
      itemName: "ItemToDelete",
      itemDescription: "This is a menu item to be deleted",
      itemPrice: 20.99,
      itemImage: "delete_image.jpg",
      itemType: "DeleteType",
    };

    await Menuitem.create(new_item);

    const response = await request(app).delete(
      `/menu/delete/${encodeURIComponent(new_item.itemName)}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("Item deleted successfully");

    // Check if the item is no longer present in the database
    const deletedItem = await Menuitem.findOne({ itemName: new_item.itemName });
    expect(deletedItem).toBeNull();
  });

  it("should update a menu item", async () => {
    // Create a menu item to be updated
    const new_item = {
      itemName: "ItemToUpdate",
      itemDescription: "This is a menu item to be updated",
      itemPrice: 20.99,
      itemImage: "update_image.jpg",
      itemType: "UpdateType",
      itemAvailability: 'in-stock',
    };

    await Menuitem.create(new_item);

    // Updated data
    const updated_item_data = {
      itemDescription: "Updated description",
      itemPrice: 25.99,
      itemImage: "updated_image.jpg",
      itemType: "UpdatedType",
      itemAvailability: 'in-stock',
    };

    const response = await request(app)
      .put(`/menu/edit/${encodeURIComponent(new_item.itemName)}`)
      .send(updated_item_data);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Item updated successfully");

    // Check if the item is updated in the database
    const updated_item = await Menuitem.findOne({ itemName: new_item.itemName });
    expect(updated_item).toBeDefined();
    expect(updated_item.itemDescription).toBe(updated_item_data.itemDescription);
    expect(updated_item.itemPrice).toBe(updated_item_data.itemPrice);
    expect(updated_item.itemImage).toBe(updated_item_data.itemImage);
    expect(updated_item.itemType).toBe(updated_item_data.itemType);
  });
});
