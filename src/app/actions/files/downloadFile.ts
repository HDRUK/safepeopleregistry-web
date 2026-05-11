"use server";

import { getRequest } from "@/services/requests";

export default async (id: number) => {
  try {
    const response = (await getRequest(`/files/${id}/download`)) as Response;

    if (!response.ok) {
      throw new Error("Failed to download file");
    }
    const blob = await response.blob();

    const fileName =
      response.headers
        .get("Content-Disposition")
        ?.split("filename=")[1]
        ?.replace(/"/g, "") || "downloaded_file";

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    if (window.URL.revokeObjectURL) window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};
