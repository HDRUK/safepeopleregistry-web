"use client";

import { useStore } from "@/data/store";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { useState } from "react";
import ClaimedSroCard from "./ClaimedSroCard";
import PendingSroCard from "./PendingSroCard";
import SroInviteForm from "./SroInviteForm";
import useSroActions from "./useSroActions";

// details: whatever the organisation's SRO state calls for. The other two open the invite form
// while there is already someone to show: a pending invitee, or the signed-in SRO.
type View = "details" | "invitingSomeoneElse" | "invitingReplacement";

/**
 * The organisation's SRO when the SRO requirement is off: the claimed SRO, otherwise the invited
 * SRO, otherwise a form to invite or appoint one. The SRO can also hand over or invite their
 * replacement.
 */
export default function SroDetailsPanel() {
  const { organisation } = useOrganisationStore();
  const user = useStore(state => state.getUser());
  const actions = useSroActions();

  const [view, setView] = useState<View>("details");
  const showDetails = () => setView("details");

  const claimedSro = organisation?.claimed_sro;
  const pendingSro = organisation?.pending_sro;
  const isSignedInSro = !!user && !!claimedSro && user.id === claimedSro.id;

  if (view === "invitingReplacement") {
    return (
      <SroInviteForm
        purpose="replacement"
        pendingSro={pendingSro}
        organisation={organisation}
        delegates={actions.delegates}
        onBack={showDetails}
        onInvite={invitee =>
          actions.invite(invitee, { replacement: true, onSuccess: showDetails })
        }
        onAppoint={delegate =>
          actions.appoint(delegate, { onSuccess: showDetails })
        }
      />
    );
  }

  if (claimedSro) {
    return (
      <ClaimedSroCard
        sro={claimedSro}
        isSignedInSro={isSignedInSro}
        pendingReplacement={pendingSro}
        delegates={actions.delegates}
        onHandOver={(delegate, onSuccess) =>
          actions.handOver(delegate, { onSuccess })
        }
        onInviteReplacement={() => setView("invitingReplacement")}
        onResendReplacementInvite={actions.resend}
      />
    );
  }

  if (pendingSro && view !== "invitingSomeoneElse") {
    return (
      <PendingSroCard
        sro={pendingSro}
        onResend={() => actions.resend(pendingSro)}
        onInviteSomeoneElse={() => setView("invitingSomeoneElse")}
      />
    );
  }

  return (
    <SroInviteForm
      purpose={pendingSro ? "replacePending" : "first"}
      pendingSro={pendingSro}
      organisation={organisation}
      delegates={actions.delegates}
      onBack={showDetails}
      onInvite={invitee => actions.invite(invitee, { onSuccess: showDetails })}
      onAppoint={delegate =>
        actions.appoint(delegate, { onSuccess: showDetails })
      }
    />
  );
}
