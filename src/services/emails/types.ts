import { Email } from "@/types/application";

type EmailsResponse = Email[];

interface PutResendEmailParams {
  id: number;
}

export type { EmailsResponse, PutResendEmailParams };
