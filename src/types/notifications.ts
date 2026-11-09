import { NotificationLinkType } from "@/consts/notifications";
import { Action } from "./action";

export interface NotificationLink {
  type: NotificationLinkType;
  id: number;
}

export interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    message: string;
    time: string;
    details: Record<string, { old: string; new: string }>;
    buttonUrls?: Record<string, number>;
    actions?: Action[];
    link?: NotificationLink;
  };
  read_at: string | null;
  created_at: string;
  updated_at: string;
}
