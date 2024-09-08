import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      //`https://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=1`,
      `https://stageapi.monkcommerce.app/task/products/search`,
      
      {
        method: "GET",
        headers: {
          "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
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
