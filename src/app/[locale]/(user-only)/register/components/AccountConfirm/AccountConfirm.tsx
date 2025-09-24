"use client";

import Guidance from "@/components/Guidance";
import LoadingWrapper from "@/components/LoadingWrapper";
import { Message } from "@/components/Message";
import SoursdLogo from "@/components/SoursdLogo";
import TermsAndConditions from "@/components/TermsAndConditions";
import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import useRegisterUser from "@/hooks/useRegisterUser";
import { ModalContent } from "@/organisms/Training/CertificateUploadModal.styles";
import { User } from "@/types/application";
import { handleRegister as handleRegisterKeycloak } from "@/utils/keycloak";
import { showAlert } from "@/utils/showAlert";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Link, Modal, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfilePathByEntity } from "@/utils/redirects";
import AccountOption from "../AccountOption";

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";
const NAMESPACE_TRANSLATION_TERMS_AND_CONDITIONS = "TermsAndConditions";

interface AccountConfirmProps {
  unclaimedUser: User | undefined;
  tokenUser: Partial<User>;
}

const isValidUserGroup = (userGroup?: string | null) => {
  return userGroup === UserGroup.USERS || userGroup === UserGroup.ORGANISATIONS;
};

export default function AccountConfirm({
  unclaimedUser,
  tokenUser,
}: AccountConfirmProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const tTerms = useTranslations(NAMESPACE_TRANSLATION_TERMS_AND_CONDITIONS);
  const router = useRouter();

  const [custodianModalOpen, setCustodianModalOpen] = useState<boolean>(false);

  const params = useSearchParams();

  const [userGroup, setUserGroup] = useState<UserGroup | null>(
    unclaimedUser?.user_group || params?.get("type")
  );
  const [termsDisplayed, setTermsDisplayed] = useState(false);

  const unclaimedOrgAdmin =
    unclaimedUser && unclaimedUser?.user_group === UserGroup.ORGANISATIONS
      ? unclaimedUser
      : undefined;

  const { handleRegister, ...registerUserState } = useRegisterUser({
    userGroup,
    unclaimedUser,
  });

  const handleSelect = (option: UserGroup) => {
    setUserGroup(option);
  };

  // Create a new account automatically if type query param exists
  useEffect(() => {
    const initRegister = async () => {
      if (tokenUser && isValidUserGroup(userGroup) && !unclaimedUser) {
        await handleRegister(tokenUser);
      }
    };

    initRegister();
  }, [unclaimedUser, tokenUser, userGroup]);

  const handleDeclineTerms = () => {
    setTimeout(() => {
      showAlert("warning", {
        text: tTerms("alertText"),
        title: tTerms("alertTitle"),
        confirmButtonText: tTerms("alertConfirm"),
        cancelButtonText: tTerms("alertCancel"),
        closeOnConfirm: true,
        closeOnCancel: true,
        preDeny: () => {
          router.push(ROUTES.homepage.path);
        },
      });
    }, 100);
  };

  const { isLoading, isError, error, isSuccess } = registerUserState;

  if (isSuccess && userGroup) {
    redirect(getProfilePathByEntity(userGroup));
  }

  if (isError || isLoading) {
    return (
      <Box
        sx={{
          height: "70vh",
          position: "relative",
        }}>
        <LoadingWrapper variant="basic" loading={isLoading}>
          <Message severity="error" sx={{ mb: 3 }}>
            {t(error)}
          </Message>
        </LoadingWrapper>
      </Box>
    );
  }

  const isContinueDisabled = userGroup === null || isLoading;
  const guidanceKey = userGroup?.toLowerCase();

  console.log("unclaimedUser", unclaimedUser);

  return (
    <>
      {!termsDisplayed && (
        <Guidance
          infoTitle={t(`${guidanceKey || "default"}Title`)}
          info={t(`${guidanceKey || "default"}Guidance`)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: 4,
            }}>
            <Box sx={{ textAlign: "center", marginBottom: 4 }}>
              <SoursdLogo sx={{ backgroundColor: "transparent" }} />
              <Typography variant="h3">
                {unclaimedOrgAdmin ? t("claimOrgAccount") : t("title")}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                marginBottom: 4,
              }}>
              <AccountOption
                icon={PeopleAltOutlinedIcon}
                label={t.rich("repMyselfButton", {
                  bold: chunks => <strong>{chunks}</strong>,
                })}
                onClick={handleSelect}
                name={UserGroup.USERS}
                selected={userGroup}
                disabled={!!unclaimedUser && userGroup !== UserGroup.USERS}
              />

              <AccountOption
                icon={BusinessIcon}
                label={
                  unclaimedOrgAdmin?.organisation?.organisation_name ||
                  t.rich("repOrgButton", {
                    bold: chunks => <strong>{chunks}</strong>,
                  })
                }
                onClick={handleSelect}
                name={UserGroup.ORGANISATIONS}
                selected={userGroup}
                disabled={
                  !!unclaimedUser && userGroup !== UserGroup.ORGANISATIONS
                }
              />

              <AccountOption
                icon={AdminPanelSettingsOutlined}
                label={t.rich("repCustodianButton", {
                  bold: chunks => <strong>{chunks}</strong>,
                  br: () => <br />,
                })}
                onClick={handleSelect}
                name={UserGroup.CUSTODIANS}
                selected={userGroup}
                disabled={!!unclaimedUser && userGroup !== UserGroup.CUSTODIANS}
              />
            </Box>

            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1,
              }}>
              {!unclaimedUser && (
                <LoadingButton
                  onClick={
                    userGroup !== UserGroup.CUSTODIANS
                      ? () => {
                          setTermsDisplayed(true);
                        }
                      : () => setCustodianModalOpen(true)
                  }
                  variant="contained"
                  disabled={isContinueDisabled}
                  sx={{ p: 2, minWidth: 300 }}
                  fullWidth>
                  {t("continueButton")}
                </LoadingButton>
              )}

              {unclaimedUser && (
                <LoadingButton
                  onClick={() => setTermsDisplayed(true)}
                  disabled={registerUserState.isLoading}
                  variant="contained"
                  sx={{ p: 2, minWidth: 300 }}
                  fullWidth>
                  {t("continueButton")}
                </LoadingButton>
              )}
            </Box>
          </Box>
        </Guidance>
      )}

      {termsDisplayed && (
        <TermsAndConditions
          userGroup={userGroup}
          onAccept={() =>
            unclaimedUser
              ? handleRegister(unclaimedUser)
              : handleRegisterKeycloak(userGroup)
          }
          onDecline={handleDeclineTerms}
        />
      )}

      <Modal
        open={custodianModalOpen}
        sx={{ p: 1 }}
        onClose={() => setCustodianModalOpen(false)}>
        <ModalContent>
          <Typography variant="h3">{t("custodianModalTitle")}</Typography>
          <Typography variant="body1" sx={{ my: 3 }}>
            {t("custodianModalContent")}{" "}
            <Link href={`mailto:${CONTACT_MAIL_ADDRESS}`}>
              {CONTACT_MAIL_ADDRESS}
            </Link>
          </Typography>
          <Button onClick={() => setCustodianModalOpen(false)}>
            {t("custodianModalClose")}
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
}
