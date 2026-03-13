"use client";

import Guidance from "@/components/Guidance";
import LoadingWrapper from "@/components/LoadingWrapper";
import SoursdLogo from "@/components/SoursdLogo";
import TermsAndConditions from "@/components/TermsAndConditions";
import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { ModalContent } from "@/organisms/Training/CertificateUploadModal.styles";
import { User } from "@/types/application";
import { getProfilePathByEntity } from "@/utils/entity";
import { handleRegister as handleRegisterKeycloak } from "@/utils/keycloak";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Link, Modal, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { acceptTCs, registerInvite, rejectTCs } from "../../actions";
import AccountOption from "../AccountOption";

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";
const NAMESPACE_TRANSLATION_TERMS_AND_CONDITIONS = "TermsAndConditions";

interface AccountConfirmProps {
  unclaimedUser: User | undefined;
}

export default function AccountConfirm({ unclaimedUser }: AccountConfirmProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const tTerms = useTranslations(NAMESPACE_TRANSLATION_TERMS_AND_CONDITIONS);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { showAlert, hideAlert } = useAlertModal();

  const [custodianModalOpen, setCustodianModalOpen] = useState<boolean>(false);

  const [userGroup, setUserGroup] = useState<UserGroup | null>(
    unclaimedUser?.user_group
  );
  const [termsDisplayed, setTermsDisplayed] = useState(false);

  const unclaimedOrgAdmin =
    unclaimedUser && unclaimedUser?.user_group === UserGroup.ORGANISATIONS
      ? unclaimedUser
      : undefined;

  const handleSelect = (option: UserGroup) => {
    setUserGroup(option);
  };

  const handleRegister = async (user: User) => {
    const path = getProfilePathByEntity(userGroup as UserGroup);
    console.log(path);
    setIsLoading(true);

    try {
      console.log("hii");
      await registerInvite(user, userGroup as UserGroup);
      console.log("i hit that lovely action");

      router.push(path);
    } finally {
      console.log("did i finish?");
      setIsLoading(false);
    }
  };

  const handleDeclineTerms = () => {
    setTimeout(() => {
      showAlert({
        severity: "warning",
        text: tTerms("alertText"),
        title: tTerms("alertTitle"),
        confirmButtonText: tTerms("alertConfirm"),
        cancelButtonText: tTerms("alertCancel"),
        onCancel: () => {
          router.push(ROUTES.homepage.path);

          hideAlert();
        },
      });
    }, 100);
  };

  const guidanceKey = userGroup?.toLowerCase();

  if (isLoading) {
    return <LoadingWrapper variant="basic" loading={isLoading} />;
  }

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
                  disabled={!userGroup}
                  sx={{ p: 2, minWidth: 300 }}
                  fullWidth>
                  {t("continueButton")}
                </LoadingButton>
              )}

              {unclaimedUser && (
                <LoadingButton
                  onClick={() => setTermsDisplayed(true)}
                  disabled={isLoading}
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
          onAccept={async () => {
            console.log("here 1");
            await acceptTCs(userGroup);
            console.log(unclaimedUser, "unclaimedUser");
            if (unclaimedUser) {
              console.log("1");
              handleRegister(unclaimedUser);
              console.log("2");
            } else {
              handleRegisterKeycloak(userGroup);
            }
          }}
          onDecline={async () => {
            await rejectTCs(userGroup);

            handleDeclineTerms();
          }}
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
