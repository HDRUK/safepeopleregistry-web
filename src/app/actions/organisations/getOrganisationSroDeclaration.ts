"use server";

import { getRequest } from "@/services/requests";

export default async (id: number) => {
  try {
    const response = (await getRequest(
      `/organisations/${id}/sro_declaration`
    )) as Response;
    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();

    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    const fileName =
      response.headers
        .get("Content-Disposition")
        ?.split("filename=")[1]
        ?.replace(/"/g, "") || "downloaded_file";

    return {
      blob,
      fileName,
      contentType,
    };
  } catch (error) {
    console.error("Download error:", error);
  }
};
