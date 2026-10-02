"use server";

import { getRequest } from "@/services/requests";

export default async (id: number) => {
  try {
    console.log("Downloading file with ID:", id);
    const response = (await getRequest(`/files/${id}/download`)) as Response;
    console.log("Response received:", response.ok, response.status, response.statusText);
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
    throw error;
  }
};
