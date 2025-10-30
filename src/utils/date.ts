import { format } from "date-fns";
import dayjs from "dayjs";
import {
  FORMAT_DATE_DB,
  FORMAT_DISPLAY_LONG_DATE,
  FORMAT_DISPLAY_SHORT_DATE,
  FORMAT_SHORT_DATE,
} from "../consts/date";

function isExpired(date: string) {
  const expirationTime = dayjs(date);

  return expirationTime.isAfter(dayjs());
}

function dateToString(date?: Date, formatString: string = "yyyy-MM-dd") {
  return date ? format(date, formatString) : undefined;
}

function formatStringToISO(date?: string) {
  return date ? format(date, "yyyy-MM-dd") : undefined;
}

function getDate(date?: string | null) {
  return date ? new Date(date) : undefined;
}

function formatShortDate(date?: string) {
  return dayjs(date).format(FORMAT_SHORT_DATE);
}

function formatDisplayShortDate(date?: string) {
  const djsDate = dayjs(date);

  return djsDate.isValid() ? djsDate.format(FORMAT_DISPLAY_SHORT_DATE) : date;
}

function formatDisplayLongDate(date?: string) {
  const djsDate = dayjs(date);

  return djsDate.isValid() ? djsDate.format(FORMAT_DISPLAY_LONG_DATE) : date;
}

function formatDisplayTimeDate(date?: string) {
  const djsDate = dayjs(date);

  return djsDate.isValid() ? djsDate.format("DD MMM HH:mm") : date;
}

function formatNowDBDate() {
  return dayjs().format(FORMAT_DATE_DB);
}

function formatDBDate(date?: string) {
  return dayjs(date).format(FORMAT_DATE_DB);
}

function isExpiredInvite(invite_sent_at?: string) {
  return (
    invite_sent_at &&
    isExpired(
      dayjs(invite_sent_at)
        .add(+(process.env.NEXT_PUBLIC_INVITE_TIME_HOURS || 1), "hour")
        .format()
    )
  );
}

function getDaysSince(dateString: string) {
  const date = dayjs(dateString);
  return date.isValid() ? dayjs().diff(date, "day") : undefined;
}

export {
  dateToString,
  formatDBDate,
  formatDisplayLongDate,
  formatDisplayShortDate,
  formatNowDBDate,
  formatShortDate,
  formatStringToISO,
  getDate,
  getDaysSince,
  isExpired,
  isExpiredInvite,
  formatDisplayTimeDate,
};
