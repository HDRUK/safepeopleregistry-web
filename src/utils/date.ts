import dayjs from "dayjs";
import {
  FORMAT_DATE_DB,
  FORMAT_DATETIME_DB,
  FORMAT_DISPLAY_LONG_DATE,
  FORMAT_DISPLAY_SHORT_DATE,
  FORMAT_SHORT_DATE,
} from "../consts/date";

function isExpired(date: string) {
  const expirationTime = dayjs(date);

  return expirationTime.isAfter(dayjs());
}

function formatDisplayTimeDate(date?: string) {
  const djsDate = dayjs(date);

  return djsDate.isValid() ? djsDate.format("DD MMM HH:mm") : date;
}

function getDate(date?: string | null) {
  const djsDate = dayjs(date);

  if (djsDate.isValid()) {
    return date ? new Date(date) : undefined;
  }

  return undefined;
}

function formatDateToString(
  date: Date | string | null | undefined,
  format: string
) {
  const djsDate = dayjs(date);

  return djsDate.isValid() ? djsDate.format(format) : date;
}

function dateToString(
  date: Date | string | null | undefined,
  formatString: string = "YYYY-MM-DD"
) {
  formatDateToString(date, formatString);
}

function formatShortDate(date: Date | string | null | undefined) {
  return formatDateToString(date, FORMAT_SHORT_DATE);
}

function formatDisplayShortDate(date: Date | string | null | undefined) {
  return formatDateToString(date, FORMAT_DISPLAY_SHORT_DATE);
}

function formatDisplayLongDate(date: Date | string | null | undefined) {
  return formatDateToString(date, FORMAT_DISPLAY_LONG_DATE);
}

function formatNowDBDate() {
  return dayjs().format(FORMAT_DATETIME_DB);
}

function formatDBDateTime(date: Date | string | null | undefined) {
  return formatDateToString(date, FORMAT_DATETIME_DB);
}

function formatDBDate(date: Date | string | null | undefined) {
  return formatDateToString(date, FORMAT_DATE_DB);
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

function getDaysSince(date: string) {
  const djsDate = dayjs(date);

  return djsDate.isValid() ? dayjs().diff(djsDate, "day") : undefined;
}

export {
  dateToString,
  formatDBDate,
  formatDBDateTime,
  formatDisplayLongDate,
  formatDisplayShortDate,
  formatDisplayTimeDate,
  formatNowDBDate,
  formatShortDate,
  getDate,
  getDaysSince,
  isExpired,
  isExpiredInvite,
};
