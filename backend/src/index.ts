import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get list of orders
app.get("/orders", async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
});

app.get("/", async (req: Request, res: Response) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
});

// Function to seed data
// async function seedData() {
//   try {
//     // Clear existing data
//     await prisma.order.deleteMany();

//     const orders = [];
//     for (let i = 0; i < 50; i++) {
//       orders.push({
//         customerName: faker.internet.userName(),
//         status: faker.helpers.arrayElement([
//           "Pending",
//           "Shipped",
//           "Delivered",
//           "Canceled",
//         ]),
//       });
//     }

//     await prisma.order.createMany({ data: orders });
//     console.log("Seed data added.");
//   } catch (error) {
//     console.error("Error seeding data:", error);
//   }
// }

// Start the server and run the seed script
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Run seed data function
  // await seedData();
});
