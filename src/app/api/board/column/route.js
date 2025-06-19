import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(),"src", "data", "board.json");


export async function POST(req) {
  const data = await req.json();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true, data:data });
}
