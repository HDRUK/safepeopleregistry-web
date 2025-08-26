import ChipStatus, { Status } from "@/components/ChipStatus";
import ContactLink from "@/components/ContactLink";
import Ol from "@/components/Ol";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export const mockedBannerContent = () => (
  <>
    BETA Preview: Please contact HDR UK if you'd like to help drive
    functionality during our initial preview phase: <ContactLink /> - Please be
    aware that some pages/features aren't fully available.
  </>
);

export const mockedOrganisationHomeIntro =
  "You'll see a list of tasks below to complete your profile.<br></br> The Organisation account is set up by a SRO (Senior Responsible Officer), who is required to get a declaration signed on behalf of their Organisation and upload this. The SRO must have a position of seniority, as they are held accountable for the data.<br></br> Please fill in your Organisation's profile, including uploading the SRO declaration. This is checked by HDR UK before full account privileges are granted.";

export const mockedProjectsIntro =
  "The project list below outlines your projects pending approval, including validated Users and Organisations. Clicking on a project will show you more information and next steps.";

export const mockedUserHomeIntro = (
  <>
    To complete your profile, please find a list of tasks assigned to you below.
    Before getting started, make sure you have the following ready:
    <ul>
      <li>A form of ID (e.g. passport or driving licence)</li>
      <li>Your ORCiD</li>
      <li>An up-to-date CV</li>
      <li>Any relevant training certificates or professional member IDs</li>
    </ul>
  </>
);

export const mockedPendingAffiliations = (
  <>
    <Typography mb={2}>
      Safe People Registry stores records of Users who are research-active
      working on sensitive data. As an Organisation you can confirm that a Safe
      People Registry User profile corresponds to an employee or student at your
      Organisation. This is called affiliating a User.
    </Typography>
    <Typography mb={2}>
      When affiliating a User you are confirming that:
    </Typography>
    <Ol>
      <li>
        The Safe People Registry User profile matches that of your employee /
        student
      </li>
      <li>
        The employee / student is an active researcher/innovator needing to
        work on sensitive data.
      </li>
      <li>
        The Organisational email address of the User corresponds to the correct
        email address in your Organisation.
      </li>
    </Ol>
  </>
);

export const mockedSafeProjectGuidanceProps = {
  infoTitle: "Did you know?",
  info: (
    <Typography>
      The project properties are following the data use register transparency
      standard.
    </Typography>
  ),
};

export const mockedPersonalDetailsGuidanceProps = {
  infoTitle: "This section relates to you as an individual",
  info: (
    <>
      <Typography mb={3}>Q. Why do we require this information?</Typography>
      <Typography>
        A. The primary purpose of Safe People Registry is to consolidate
        information about researchers and organisations to allow Data Custodians
        efficiently assess if a person/organisation is ‘Safe’. You can set up a
        profile in Safe People Registry which shares relevant information with
        Data Custodian, providing as much information about yourself as possible
        helps Data Custodians assess you more quickly and easily.
      </Typography>
    </>
  ),
};

export const mockedUserExperienceGuidanceProps = {
  infoTitle: "This section relates to your individual research experience",
  info: (
    <>
      <Typography mb={3}>
        Through Safe People Registry you can provide Data Custodians with an
        up-to-date record of your employment history, education, qualifications,
        and publication record.
      </Typography>
      <Typography component="aside">
        <Typography variant="subtitle1" fontWeight={700}>
          Please note:
        </Typography>
        <ul>
          <li>
            Only requiring access to NHS SDE Network you <b>do not</b> need to
            populate this page.
          </li>
          <li>
            Want access to data from any other Data Custodian please do populate
            this page.
          </li>
        </ul>
      </Typography>
    </>
  ),
};

export const mockedUserTrainingGuidanceProps = {
  infoTitle:
    "This section relates to your training and accreditations for accessing sensitive data",
  info: (
    <>
      <Typography mb={1}>
        Suggested text: Different Data Custodians may require the completions of
        different training courses. Please add all relevant safe researcher
        training courses completed. Potential safe researcher training courses
        to consider include:
      </Typography>
      <ul>
        <li>
          The{" "}
          <a
            href="https://www.scadr.ac.uk/administrative-data/training/ons-safe-researcher-training-course-ons-srt"
            target="_blank"
            rel="noreferrer">
            ONS safe researcher training course
          </a>{" "}
          – delivered by ONS, SCADR, UKDS (required for researchers accessing
          DEA accredited environments)
        </li>
        <li>
          The Medical Research Council, regulatory support centre –{" "}
          <a
            href="https://bygsystems.net/mrcrsc-lms/enrol/index.php?id=72"
            target="_blank"
            rel="noreferrer">
            Research, GDPR and confidentiality quiz
          </a>
        </li>
        <li>Any mandatory Host Organisation specific training course</li>
      </ul>
    </>
  ),
};

export const mockedRegisterGuidanceProps = {
  infoTitle: "Guidance",
  info: (
    <>
      <Typography mb={2}>
        Select an option to view more information about account types.
      </Typography>
      <Typography mb={2}>
        <strong>Note:</strong> If you hold multiple roles, you’ll need a
        separate account for each.
      </Typography>
    </>
  ),
};

export const mockedResearcherAffiliationsGuidance = {
  infoTitle:
    "This section relates to you as an employee or student of an Organisation",
  info: (
    <>
      <Typography mb={2}>
        Through Safe People Registry individuals are affiliated with
        Organisations (employers or higher education institutions or honorary
        contracts).
      </Typography>
      <Typography mb={2}>
        If your Organisation is not on Safe People Registry you can ask them to
        register for an account. Affiliated Organisations that haven’t already
        confirmed your status will be sent an invite to do so, when you click
        save. When you click save affiliated organisation will be invited to
        confirm your status, if they have not already do so.
      </Typography>
      <Typography mb={5}>
        Being affiliated by an Organisation is especially important for
        Organisations who are the host for a project you plan to work on.
      </Typography>
      <Typography variant="h4" mb={2}>
        The statuses
      </Typography>
      <ChipStatus status={Status.AFFILIATED} color="success" sx={{ mb: 2 }} />
      <Typography mb={3} sx={{ fontSize: "14px" }}>
        You have been affiliated by this Organisation
      </Typography>
      <ChipStatus status={Status.PENDING} sx={{ mb: 2 }} />
      <Typography mb={3} sx={{ fontSize: "14px" }}>
        The Organisation has been invited to confirm your affiliation, but has
        not yet done so. Once they have an account they will be automatically
        asked to confirm your affiliation
      </Typography>
      <ChipStatus status={Status.INVITE_SENT} sx={{ mb: 2 }} />
      <Typography sx={{ fontSize: "14px" }}>
        The Organisation has been invited to set up an account, but has not yet
        done so
      </Typography>
    </>
  ),
};

export const mockedCustodianIdvtInfoContent = (
  <>
    <Typography>
      IDVT tests an individual against the following criteria;
    </Typography>
    <ol>
      <li>Valid government issued identification. (Fraud)</li>
      <li>Likeness check against ID. (Identity)</li>
      <li>Liveness check. (Identity)</li>
      <li>Sanctions. (AML)</li>
    </ol>
    <Typography>
      This feature is supplied as part of Safe People Registry and is entirely
      up to you, as a Data Custodian, whether you want these additional security
      checks carried out, above and beyond what an employer would do.
    </Typography>
  </>
);
export const mockedSoursdHomepageInfo = {
  infoTitle: "SoursdInfo",
  info: (
    <>
      <Typography fontSize="48px" fontWeight="700" mb={1}>
        Safe People Registry
      </Typography>
      <Typography variant="h1" fontWeight="normal">
        A platform to enable ‘Safe People’ decision making
      </Typography>
    </>
  ),
};

export const mockedSoursdHomepageUsages = {
  infoTitle: "SoursdUsages",
  infoHeader: (
    <Typography variant="h2" mb={2}>
      With Safe People Registry you can...
    </Typography>
  ),
};

export const mockedManageDelegatesGuidance = {
  infoTitle: "Guidance",
  info: (
    <>
      <Typography variant="h3" mb={3}>
        Did you know?
      </Typography>
      <Typography mb={5}>
        Organisation delegates are nominated administrative groups or
        individuals that vouch for Users employed by their organisation. A
        delegate could be a HR representative, DPO representative, Contracts
        representative or Legal representative.
      </Typography>
    </>
  ),
};

export const mockedRorIdInfo = (
  <>
    <Typography>
      Research Organisation Registry (ROR) identification.
    </Typography>
    <Typography>E.g. https://ror.org/01abcde11</Typography>
  </>
);

export const mockedOrganisationUsersIntro = `
  As a representative of an Organisation, you have been given permission
  to associate your affiliated Users (an employee or student of your
  Organisation) with your Organisation’s Safe People Registry account. Users are
  individuals involved in active research projects using sensitive data.
`;

export const mockedOrganisationBulkInviteIntro = `
  Add new affiliated Users to Safe People Registry. Individual Users will create a
  Safe People Registry account for themselves and will affiliate themselves with an
  Organisation.
`;

export const mockedDelegateAdministationDescription = (
  <>
    <Typography variant="subtitle1" fontSize="large" sx={{ pb: 1 }}>
      Senior Responsible Officer (SRO) contact information
    </Typography>
    <Typography>
      As a representative of your Organisation, you have been nominated as a
      Senior Responsible Officer (SRO), with sufficient seniority and relevant
      responsibility to nominate Delegates from your Organisation to affiliate
      your employees or students. As an SRO, You can provide your individual
      information here:
    </Typography>
  </>
);

export const mockedDelegateListDescription = (
  <>
    <Typography variant="subtitle1" fontSize="large" sx={{ pb: 1 }}>
      Organisation administrative Delegates
    </Typography>
    <Typography>
      As a Senior Responsible Officer (SRO) for your Organisation, you can
      invite nominated Delegates from your Organisation to create a Safe People
      Registry account. A Delegate could be a Human Resources (HR)
      representative, Information Governance representative e.g. Data Protection
      Officer (DPO) , Contracts representative or Legal representative.You can
      invite nominated Delegates to register for a Safe People Registry account
      here:
    </Typography>
  </>
);

export const mockedEmployeeStudentAdminDescription = `
As a representative of an Organisation, you have been given permission to associate your affiliated users (an employee or student of your Organisation) with your Organisation’s Safe People Registry account. Users are individuals involved in active research projects using sensitive data. 

Individual users will create a Safe People Registry account for themselves and will affiliate themselves with an Organisation.

Automatically invite users to create a Safe People Registry account. Users will have one Safe People Registry account that will stay with them throughout their career. Select the user(s) you would like to invite to create a Safe People Registry account and select ‘Invite User to create a Safe People Registry account’ in the Actions below. 
`;

export const mockedWebhookDescription = (
  <Typography>
    Safe People Registry uses an exponential back-off mechanism to avoid missed
    callbacks. In the event of your server not returning an{" "}
    <strong>HTTP_OK (200) response</strong>, we will continuously try to re-send
    with increasing retry times, until we receive a{" "}
    <strong>HTTP_OK (200) response</strong>, or we reach our send cap.{" "}
    <Typography component="span" sx={{ color: "red" }}>
      We cannot resend events indefinitely. If we reach our retry cap, and the
      event is still unsent, it will be deleted.
    </Typography>
  </Typography>
);

export const mockedConfigurationRulesDescription = (
  <>
    <Typography mb={2}>
      Safe People Registry can be configured to flag if a certain property of a
      User or Organisation profile does not meet a set of individual Data
      Custodian "decision models" or criteria, supporting your decision making
      process. Safe People Registry does not make any decisions as to which
      Users or Organisations are considered "safe" - that decision remains with
      each Data Custodian.
    </Typography>
    <Typography mb={2}>
      A User or Organisation can still be approved by a Data Custodian to work
      on a particular project even if the User/Organisation is flagged as not
      meeting the requirements of a decision model.
    </Typography>
    <Typography mb={2}>
      Configure rules in line with your individual Trusted Research Environment
      or NHS Research Secure Data Environment policies or procedures below.
    </Typography>
  </>
);

export const mockedConfigurationRulesGuidanceProps = {
  infoTitle: "Guidance",
  info: (
    <>
      <Typography mb={5}>
        IDVT tests an individual against the following criteria:
      </Typography>
      <Typography mb={5}>
        <ol>
          <li>Valid government issued identification. (Fraud)</li>
          <li>Likeness check against ID. (Identity)</li>
          <li>Liveness check. (Identity)</li>
          <li>Sanctions. (AML)</li>
        </ol>
      </Typography>
      <Typography mb={5}>
        This feature is supplied as part of Safe People Registry and is entirely
        up to you, as a Data Custodian, whether you want these additional
        security checks carried out, above and beyond what an employer would do.
      </Typography>
    </>
  ),
};

interface GuidanceProps {
  infoTitle: string;
  info: ReactNode;
}
export type SubTabGuidance = Record<string, GuidanceProps>;

export type TabGuidance = Record<string, SubTabGuidance>;

export type ProfileGuidance = Record<string, TabGuidance>;

export const mockedOrganisationProfileGuidance: TabGuidance = {
  details: {
    "name-and-address": {
      infoTitle: "Why are we asking for this information?",
      info: (
        <>
          <Typography mb={5}>
            Providing the Safe People Registry with full Organisation information
            helps Data Custodians validate your Organisation. The more
            information you provide, the faster and easier the validation
            process becomes for Users (an employee or student of an Organisation) to gain access to sensitive data.
          </Typography>
        </>
      ),
    },
    "digital-identifiers": {
      infoTitle: "More information, faster validation",
      info: (
        <>
          <Typography mb={5}>
            Providing the Safe People Registry with your Organisation's
            persistent digital identifiers enables Data Custodians to rapidly validate your Organisation.
          </Typography>
          <Typography mb={5}>
            If your Organisation’s headquarters is based in the UK, your Organisation legal
            name and address should align with your Organisation's listing on Companies House.
          </Typography>
        </>
      ),
    },
    "sector-size-and-website": {
      infoTitle: "More facts, quicker access",
      info: (
        <Typography mb={5}>
          Providing the Safe People Registry with information on your Organisation’s
          sector, size and website accelerates Organisation validation by Data
          Custodians.
        </Typography>
      ),
    },
    "security-compliance": {
      infoTitle: "Security matters",
      info: (
        <>
          <Typography mb={5}>
            Data security compliance certifications are commonly (but not always!) required by Data Custodians
            for Organisation validation.
          </Typography>
          <Typography mb={5}>
            Some Data Custodians require this information even if Users are
            accessing data within Trusted Research Environments (TREs) or Secure
            Data Environments (SDEs).
          </Typography>
        </>
      ),
    },
  },
  "user-administration": {
    "employees-and-students": {
      infoTitle: "What does affiliation mean?",
      info: (
        <>
          <Typography mb={3}>
            The Safe People Registry stores records of Users who are or have been
            working with sensitive data. Why are we using the term 'User'? In our engagement with Organisations, we found that there was no single 'term' that referred to all the types of people who were accessing sensitive data - researchers, scientists, innovators, engineers, students, and more. Ultimately, the community landed on 'User' as the all-encompassing term.
          </Typography>

          <Typography mb={3}>
            A User has one Safe People Registry account that remains with them throughout their
            career and can be affiliated with multiple Organisations.  
          </Typography>

          <Typography mb={3}>
            When <strong>affiliating a User</strong>, your Organisation is responsible for their
            behaviour when accessing sensitive data. By affiliating, you are
            confirming:
          </Typography>

          <ul style={{ paddingLeft: "1.25rem" }}>
            <li>
              There is a verified link (e.g. employment contract, honorary
              contract, or student enrolment) between the User and your
              Organisation.
            </li>
            <li>
              The Safe People Registry User profile accurately matches that of your
              employee or student.
            </li>
            <li>
              Your Organisation approves the User to access sensitive data.
            </li>
            <li>
              The User’s Organisational email matches their official email
              address within your Organisation.
            </li>
          </ul>

          <Typography mt={3}>
            Users can create their own Safe People Registry accounts and request
            affiliation. Alternatively, your Organisation can invite Users to
            create or configure their account for affiliation by selecting{" "}
            <strong>'Add User'</strong> and following the steps.
          </Typography>
        </>
      ),
    },
    delegates: {
      infoTitle: "Organisation responsibilities",
      info: (
        <>
          <Typography mb={3}>
            Organisations are responsible for the behaviour of a User, who is
            either an employee, on an honorary contract, or a student of their
            institution.
          </Typography>

          <Typography mb={3}>
            <strong>Senior Responsible Officers (SROs)</strong> are accountable
            for overseeing their Organisation’s Safe People Registry presence.
            They are responsible for:
          </Typography>

          <ul style={{ marginBottom: "1rem", paddingLeft: "1.25rem" }}>
            <li>Creating the Organisation’s Safe People Registry account</li>
            <li>
              Nominating administrative <strong>Delegates</strong> to manage
              User affiliations
            </li>
            <li>
              Providing and maintaining accurate information in the
              Organisation’s Safe People Registry profile
            </li>
          </ul>

          <Typography mb={3}>
            It's essential that your Organisation designates an SRO at the
            Organisational level. Safe People Registry deals with sensitive data
            involving your employees or students, so senior-level accountability
            and visibility are critical.
          </Typography>

          <Typography mb={3}>
            <strong>Delegates</strong> are nominated administrative individuals
            or groups authorised to act on behalf of the Organisation. They are
            responsible for:
          </Typography>

          <ul style={{ marginBottom: "1rem", paddingLeft: "1.25rem" }}>
            <li>Verifying a User’s affiliation with the Organisation</li>
            <li>
              Accepting Safe People Registry's Terms of Use on behalf of the
              Organisation
            </li>
            <li>
              Ensuring information in Safe People Registry is accurate and
              properly authorised
            </li>
          </ul>
        </>
      ),
    },
  },
};

export const mockedProfileGuidance: ProfileGuidance = {
  organisation: mockedOrganisationProfileGuidance,
};

export const mockedAbout = {
  infoTitle: "About Safe People Registry",
  aboutTitle: "Empowering Safe Data Access for Research and Innovation",
  about: `Safe People Registry is a secure platform
designed to facilitate responsible access to sensitive data. Our mission is to enable
researchers, Organisations and Data Custodians to collaborate efficiently while
maintaining security and compliance.`,
  servingTitle: "## Who We Serve",
  usersTitle: "Users (e.g. researchers, innovators)",
  users: "Easily verify credentials and gain approval for data access.",
  organisationsTitle: "Organisations",
  organisations:
    "Maintain oversight of researchers’ credentials and approvals.",
  custodiansTitle: "Data Custodians",
  custodians:
    "Make informed decisions about granting access while ensuring compliance.",
  purposeTitle: "Our Purpose",
  purpose: `In today’s data-driven world, ensuring that the right people can access the right
data responsibly is crucial. Safe People Registry streamlines this process by:

- Providing a registry where Users and Organisations can establish their credentials
for working with sensitive data.
- Enhancing transparency by recording approvals across Data Custodians.
- Reducing administrative burden by minimising duplication of effort.
- Enabling seamless authentication with multiple identity providers.`,
  commitmentTitle: "Our Commitment",
  commitment: `Safe People Registry is built on principles of trust, security and efficiency. By fostering
collaboration between Data Custodians and Users, we help accelerate innovation
while safeguarding sensitive information.`,
  footer: "Join us in transforming the way safe data access is managed.",
};

export const mockedFeatures = {
  infoTitle: "Features",
  info: `
Safe People Registry is designed to streamline and secure access to sensitive data for researchers,
Organisations and Data Custodians. Our platform ensures efficiency, compliance and
security while reducing administrative burden.`,
  features: `# Key Features`,
  researchersTitle: `Researcher and Organisation Registry`,
  researchers: `
- Easily register as a researcher or Organisation to access and manage projects requiring sensitive data.
- Maintain a verified profile with credentials and approvals in one place.`,
  secureTitle: `Secure Access & Authentication`,
  secure: `
- Single sign-on (SSO) integration with multiple identity providers.
- Multi-factor authentication (MFA) for enhanced security.`,
  approvalsTitle: `Approval & Compliance tracking`,
  approvals: `
- Automatically log approvals and maintain a transparent history of data access requests.
- Ensure compliance with data governance policies.`,
  workflowTitle: `Streamlined Workflow for Data Custodians`,
  workflow: `
- Quickly verify researcher credentials and approve or deny access to projects.
- Reduce duplication of effort by leveraging a centralised registry.`,
  transparencyTitle: `Transparency & Oversight`,
  transparency: `
- Organisations can monitor researcher approvals and manage internal compliance.
- Researchers can track the status of their project access in real-time.`,
  footer: `Safe People Registry is your trusted partner in managing sensitive data access efficiently and securely.`,
  detailsTitle: `Why Choose Safe People Registry?`,
  details: `
- Saves time with direct access to approval teams.
- Enhances security with strong authentication methods.
- Reduces administrative overhead for Organisations and Data Custodians.
- Supports open, responsible research with transparent access processes.`,
};

export const mockedTermsOfService = {
  infoTitle: "Terms of Service",
};

export const mockedCookiePolicy = {
  infoTitle: "Cookie Policy",
};

export const mockedPrivacyPolicy = {
  infoTitle: "Privacy Policy",
};
