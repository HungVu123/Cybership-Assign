"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Enable CORS for all routes
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Route to get list of orders
app.get("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma.order.findMany();
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching orders." });
    }
}));
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
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${PORT}`);
    // Run seed data function
    // await seedData();
}));
