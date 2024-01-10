import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from "@nestjs/common";
import { AppService } from "./app.service";
import * as data from "./DB/data.json";
import { readFileSync, writeFileSync } from "fs";
import { promises as fs } from "fs";
import * as path from "path";
import { AllSeats } from "./seats";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/api/all-seats")
  async getAllSeats() {
    return data;
  }
  @Post("/api/reserve-seat")
  async reserveSeat(@Body() body) {
    const seatLetter = body.seat[0];
    const seatNum = body.seat[1];

    let arr: AllSeats = data;

    if (arr[seatLetter][seatNum].reserved === true) {
      throw new HttpException("Seat already reserved", 401);
    }

    if (arr[seatLetter][seatNum].reserved === false) {
      try {
        arr[seatLetter][seatNum].reserved = true;
        arr[seatLetter][seatNum].name = "User McUser";

        await fs.writeFile(
          path.resolve("./src/DB/data.json"), // from /server/
          JSON.stringify(arr),
        );

        const updatedData = await fs.readFile(
          path.resolve("./src/DB/data.json"), // from /server/
        );
        return {
          status: "DB updated",
          body: JSON.parse(updatedData.toString()),
        };
      } catch (error) {
        console.error(error);
        return { status: "Error updating DB" };
      }
    }
  }
}
