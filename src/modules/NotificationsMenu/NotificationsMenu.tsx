"use client";

import { useStore } from "@/data/store";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
  CircularProgress,
} from "@mui/material";

import { formatDBDate } from "@/utils/date";
import { useTranslations } from "next-intl";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { NotificationPatchType } from "@/services/notifications/types";
import { NotificationModal } from "@/modules/NotifcationModal";
import { Notification } from "@/types/notifications";
import { formatNotificationType } from "@/utils/notifications";
import { useState, useEffect, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import usePatchNotification from "./hooks/usePatchNotification";
import useGetNotifcations from "./hooks/useGetNotifications";
import useGetNotificationsCount from "./hooks/useGetNotificationCounts";
import { StyledMenuItem } from "./NotificationsMenu.styles";

const NAMESPACE_TRANSLATIONS = "NotificationsMenu";

export default function NotificationsMenu() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const user = useStore(store => store.getUser());
  const [showNotificationModel, setShowNotificationModal] = useState(false);
  const [currentNotification, setCurrentNotification] =
    useState<Notification>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: notificationsCount, refetch: refetchCount } =
    useGetNotificationsCount(user?.id as number);

  const {
    data: notificationsData,
    refetch: refetchNotifications,
    fetchNextPage: fetchNextPageNotifications,
    hasNextPage: hasNextPageNotifications,
    isFetching: isFetchingNotifications,
    isFetchingNextPage: isFetchingNextPageNotifications,
  } = useGetNotifcations(user?.id as number);

  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (!notificationsCount?.data.total) return;
    // if the polled total count changes, refetch the notification data
    refetchNotifications();
  }, [notificationsCount?.data]);

  const { mutateAsync: mutateNotification } = usePatchNotification(
    user?.id as number
  );

  const notifications =
    notificationsData?.pages.flatMap(page => page.data.data) || [];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeReadStatus = (
    notificationId: string,
    type: NotificationPatchType
  ) => {
    mutateNotification({
      notificationId,
      type,
    }).then(() => {
      refetchNotifications();
      refetchCount();
    });
  };

  const handleViewNotification = (notif: Notification) => {
    if (!notif.read_at) changeReadStatus(notif.id, NotificationPatchType.READ);
    setCurrentNotification(notif);
    setShowNotificationModal(true);
  };

  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);
  const [debouncedIsNearBottom, setDebouncedIsNearBottom] = useDebounce(
    isNearBottom,
    500
  );

  useEffect(() => {
    if (
      debouncedIsNearBottom &&
      notifications.length < (notificationsCount?.data.total ?? 0)
    ) {
      fetchNextPageNotifications();
      setDebouncedIsNearBottom(false);
    }
  }, [debouncedIsNearBottom]);

  const [isLoadingMoreNotifications, setIsLoadingMoreNotifications] =
    useState<boolean>(false);

  useEffect(() => {
    if (!hasNextPageNotifications) {
      setIsLoadingMoreNotifications(false);
      return;
    }

    if (
      isFetchingNotifications ||
      isFetchingNextPageNotifications ||
      (isNearBottom && !debouncedIsNearBottom)
    ) {
      setIsLoadingMoreNotifications(true);
    }
  }, [
    hasNextPageNotifications,
    isFetchingNotifications,
    isFetchingNextPageNotifications,
    isNearBottom,
    debouncedIsNearBottom,
  ]);

  return (
    <Box>
      <IconButton
        data-testid="notifications-button"
        color={
          notificationsCount?.data.unread
            ? "notificationActive"
            : "notification"
        }
        onClick={handleOpen}
        sx={{
          height: "30px",
          width: "30px",
          minWidth: "30px",
          minHeight: "30px",
        }}>
        <Badge
          data-testid="notifications-badge"
          badgeContent={notificationsCount?.data.unread}
          color="error">
          {notificationsCount?.data.unread ? (
            <NotificationsActiveOutlinedIcon />
          ) : (
            <NotificationsOutlinedIcon />
          )}
        </Badge>
      </IconButton>

      <Menu
        data-testid="notifications-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: { width: "auto", maxHeight: "300px" },
            onScroll: (event: React.UIEvent<HTMLDivElement>) => {
              event.persist();
              const target = event.currentTarget;
              const { scrollTop, scrollHeight, clientHeight } = target;
              const isNearBottom = scrollTop + clientHeight >= scrollHeight - 5;
              setIsNearBottom(isNearBottom);
            },
          },
        }}>
        {notificationsCount?.data.total === 0 ? (
          <MenuItem disabled>
            <Typography>{t("noNotifications")}</Typography>
          </MenuItem>
        ) : (
          notifications.map(notif => (
            <StyledMenuItem
              key={notif.id}
              data-testid="notification-item"
              onClick={() => handleViewNotification(notif)}
              className={notif.read_at ? "read" : "unread"}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: "inherit" }}>
                {formatNotificationType(notif.type)}
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
                {notif.data.message}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: "inherit" }}>
                {formatDBDate(notif.data.time)}
              </Typography>
            </StyledMenuItem>
          ))
        )}

        {isLoadingMoreNotifications && (
          <StyledMenuItem>
            <CircularProgress sx={{ mx: "auto" }} />
          </StyledMenuItem>
        )}
      </Menu>

      {currentNotification && (
        <NotificationModal
          open={showNotificationModel}
          handleMarkAsUnread={() => {
            changeReadStatus(
              currentNotification.id,
              NotificationPatchType.UNREAD
            );
            setShowNotificationModal(false);
          }}
          onClose={() => setShowNotificationModal(false)}
          notification={currentNotification}
        />
      )}
    </Box>
  );
}
