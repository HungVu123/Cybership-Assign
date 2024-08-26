import { Order, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";

async function getData(): Promise<Order[]> {
  try {
    const response = await axios.get<Order[]>("http://localhost:3000/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
