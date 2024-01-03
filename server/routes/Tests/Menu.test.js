const request = require("supertest");
const express = require("express");
const Menu = require("../Menu");
const { Menuitem } = require("../../Schemas/Schemas");
const { default: mongoose } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
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
    const newItem = {
      itemName: "NewFakeItem",
      itemDescription: "This is a new fake menu item",
      itemPrice: 15.99,
      itemImage: "new_fake_image.jpg",
      itemType: "NewFakeType",
    };

    const response = await request(app).post("/menu/add").send(newItem);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    // Check if the added item matches the sent data
    expect(response.body.itemName).toBe(newItem.itemName);
    expect(response.body.itemDescription).toBe(newItem.itemDescription);
    expect(response.body.itemPrice).toBe(newItem.itemPrice);
    expect(response.body.itemImage).toBe(newItem.itemImage);
    expect(response.body.itemType).toBe(newItem.itemType);

    // Check if the item is present in the database
    const savedItem = await Menuitem.findOne({ itemName: newItem.itemName });
    expect(savedItem).toBeDefined();
    expect(savedItem.itemName).toBe(newItem.itemName);
  });

  it("should delete a menu item", async () => {
    // Create a menu item to be deleted
    const newItem = {
      itemName: "ItemToDelete",
      itemDescription: "This is a menu item to be deleted",
      itemPrice: 20.99,
      itemImage: "delete_image.jpg",
      itemType: "DeleteType",
    };

    await Menuitem.create(newItem);

    const response = await request(app).delete(
      `/menu/delete/${encodeURIComponent(newItem.itemName)}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("Item deleted successfully");

    // Check if the item is no longer present in the database
    const deletedItem = await Menuitem.findOne({ itemName: newItem.itemName });
    expect(deletedItem).toBeNull();
  });

  it("should update a menu item", async () => {
    // Create a menu item to be updated
    const newItem = {
      itemName: "ItemToUpdate",
      itemDescription: "This is a menu item to be updated",
      itemPrice: 20.99,
      itemImage: "update_image.jpg",
      itemType: "UpdateType",
      itemAvailability: 'in-stock',
    };

    await Menuitem.create(newItem);

    // Updated data
    const updatedItemData = {
      itemDescription: "Updated description",
      itemPrice: 25.99,
      itemImage: "updated_image.jpg",
      itemType: "UpdatedType",
      itemAvailability: 'in-stock',
    };

    const response = await request(app)
      .put(`/menu/edit/${encodeURIComponent(newItem.itemName)}`)
      .send(updatedItemData);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Item updated successfully");

    // Check if the item is updated in the database
    const updatedItem = await Menuitem.findOne({ itemName: newItem.itemName });
    expect(updatedItem).toBeDefined();
    expect(updatedItem.itemDescription).toBe(updatedItemData.itemDescription);
    expect(updatedItem.itemPrice).toBe(updatedItemData.itemPrice);
    expect(updatedItem.itemImage).toBe(updatedItemData.itemImage);
    expect(updatedItem.itemType).toBe(updatedItemData.itemType);
  });
});
