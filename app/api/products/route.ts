import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      //`https://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=1`,
      `https://stageapi.monkcommerce.app/task/products/search`,
      
      {
        method: "GET",
        headers: {
          "x-api-key": "72njgfa948d9aS7gs5",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: `Error occurred: ${err.message}` },
      { status: 500 }
    );
  }
}
