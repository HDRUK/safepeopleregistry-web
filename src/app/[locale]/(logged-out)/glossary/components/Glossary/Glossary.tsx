"use client";

import { Box } from "@mui/system";
import InfoPageWrapper from "../../../components/InfoPageWrapper";
import { PageBodyContainer, PageColumnBody, PageColumns } from "@/modules";
import { mockedGlossary } from "@/mocks/data/cms";
import { useState } from "react";
import { Typography } from "@mui/material";
import {
  GlossaryContainer,
  LetterNavigationContainer,
  LetterNavigationItem,
  HighlightedLetter,
  TermSection,
  TermContainer,
  LetterHeading,
  Term,
  Definition,
} from "./Glossary.styles";

const glossaryTerms = [
  {
    letter: "A",
    terms: [
      {
        term: "Administrator",
        definition:
          " An individual who configures a Data Custodian’s settings in the Safe People Registry and can add Approvers.",
      },
      {
        term: "Affliation",
        definition: `In the Safe People Registry, this is the formal process where an Organisation confirms that:\n• There is a verified link (e.g. employment contract, honorary contract, or student enrolment) between the User and Organisation.\n• The Safe People Registry User profile accurately matches the employee or student.\n• The Organisation approves the User to access sensitive data.\n• The User’s organisational email matches their official email address within the Organisation. `,
      },
      {
        term: "Approval",
        definition:
          "The decision by a Data Custodian that a project meets all necessary safety and compliance requirements, allowing them to share the requested sensitive data.",
      },
      {
        term: "Approver",
        definition:
          "An individual who can review and approve User/Organisations validations and record project approvals.",
      },
    ],
  },
  {
    letter: "D",
    terms: [
      {
        term: "Data Custodian",
        definition: `In the Safe People Registry, a Data Custodian is an organisation that hosts and controls a Trusted Research Environment (TRE), Secure Data Environment (SDE), Safe Haven, or a team providing access to a research dataset.
           Data Custodians are responsible for nominating Administrators to manage their Safe People Registry settings and input Data Custodian-specific information. They also nominate Approvers to make ‘safe people’ validation decisions based on information provided by Users and Organisations.`,
      },
      {
        term: "Delegates",
        definition:
          "Individuals from an Organisation, appointed by the SRO, who can affiliate Users with the Organisation but cannot make changes to the Organisation’s profile.",
      },
    ],
  },
  {
    letter: "O",
    terms: [
      {
        term: "Organisation",
        definition:
          "This is the university, institution, commercial research organisation, administrative body or other organisation that a User belongs to. An Organisation is ultimately responsible for the behaviour of their User requesting access to data from a Data Custodian. ",
      },
    ],
  },
  {
    letter: "S",
    terms: [
      {
        term: "Safe Haven",
        definition:
          "Are similar to TREs. One example is the Scottish Safe Haven Network.",
      },
      {
        term: "Secure Data Environment (SDE)",
        definition: (
          <>
            Are similar to TREs.{" "}
            <a
              href="https://digital.nhs.uk/services/secure-data-environment-service"
              target="_blank"
              rel="noopener noreferrer">
              One example is the NHS
            </a>
            . “The Secure Data Environment (SDE) is a secure data and research
            analysis platform. It is part of an interoperable NHS Research
            Secure Data Environment network.”
          </>
        ),
      },
      {
        term: "Senior Responsible Officer (SRO)",
        definition:
          "The person within an Organisation who creates and manages its Safe People Registry profile. The SRO can also appoint other administrative delegates.",
      },
      {
        term: "Sponsorship",
        definition:
          "The formal process where an Organisation takes legal responsibility for a project.",
      },
    ],
  },
  {
    letter: "T",
    terms: [
      {
        term: "Trusted Research Environment (TRE)",
        definition:
          "A secure digital platform that enables researchers and innovators to access sensitive data in a way that protects privacy and maintains public trust. TREs are designed to ensure that data is used safely, ethically, and legally, typically by providing controlled access, audit trails, and governance frameworks.",
      },
    ],
  },
  {
    letter: "U",
    terms: [
      {
        term: "User",
        definition:
          "A User may be an employee, student, or hold an honorary contract with an Organisation. In the Safe People Registry, Users create a profile containing details about their identity, research experience, training, and accreditations, and can request affiliation from their Organisation. This information is used by Data Custodians to validate their ‘safe people’ status. Each User account is linked to a unique identifier, allowing it to remain with the individual even if they change Organisations.",
      },
    ],
  },
  {
    letter: "V",
    terms: [
      {
        term: "Validated User",
        definition:
          "This is equivalent to the “Approved Researcher” (as defined in the standard DAA and the Safe People Guidance). A User accesses and uses the data in a TRE/SDE/Safe Haven for Approved Project(s).",
      },
      {
        term: "Validation",
        definition:
          "The process by which a Data Custodian confirms that a User or Organisation meets the required criteria for being considered ‘safe’.",
      },
    ],
  },
];

const allLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const activeLetters = glossaryTerms.map(term => term.letter);

export default function Glossary() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  return (
    <GlossaryContainer>
      <InfoPageWrapper>
        <PageBodyContainer heading={mockedGlossary.infoTitle}>
          <PageColumns>
            <PageColumnBody size={{ lg: 8 }}>
              <LetterNavigationContainer>
                {allLetters.map(letter => {
                  const isActive = activeLetters.includes(letter);
                  const isSelected = selectedLetter === letter;
                  return isActive ? (
                    <LetterNavigationItem
                      key={letter}
                      onClick={() =>
                        setSelectedLetter(isSelected ? null : letter)
                      }>
                      <HighlightedLetter href={`#glossary-${letter}`}>
                        {letter}
                      </HighlightedLetter>
                    </LetterNavigationItem>
                  ) : (
                    <LetterNavigationItem key={letter}>
                      {letter}
                    </LetterNavigationItem>
                  );
                })}
              </LetterNavigationContainer>
            </PageColumnBody>
            <PageColumnBody size={{ lg: 8 }}>
              {glossaryTerms.map(section => (
                <TermSection
                  key={section.letter}
                  id={`glossary-${section.letter}`}>
                  <LetterHeading>{section.letter}</LetterHeading>
                  {section.terms.map((item, i) => (
                    <TermContainer key={item.term}>
                      <Term>{item.term}</Term>
                      <Definition>{item.definition}</Definition>
                    </TermContainer>
                  ))}
                </TermSection>
              ))}
            </PageColumnBody>
          </PageColumns>
        </PageBodyContainer>
      </InfoPageWrapper>
    </GlossaryContainer>
  );
}
