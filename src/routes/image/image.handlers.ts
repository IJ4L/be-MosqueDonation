import type { AppRouteHandler } from "../../lib/types.ts";
import type { GetRoute } from "./image.routes.ts";
import fs from "fs-extra";
import path from "path";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const getImage: AppRouteHandler<GetRoute> = async (c) => {
    const imageName = c.req.param("filename");
    const imagePath = path.join(process.cwd(), "uploads", imageName);

    if (!(await fs.pathExists(imagePath))) {
      return c.json({ message: "Image not found" }, HttpStatusCodes.NOT_FOUND);
    }

    const fileBuffer = await fs.readFile(imagePath);
    return c.body(fileBuffer, {
      headers: { "Content-Type": getMimeType(imageName) },
    });
}

const getMimeType = (filename: string): string => {
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
    };
    return mimeTypes[ext] || "application/octet-stream";
  };
