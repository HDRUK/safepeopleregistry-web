import deleteProfessionalRegistration from "@/app/actions/professional_registrations/deleteProfessionalRegistration";
import getProfessionalRegistrations from "@/app/actions/professional_registrations/getProfessionalRegistrations";
import getProjectDetails from "@/app/actions/professional_registrations/getProjectDetails";
import getProjectDetailsByProjectId from "@/app/actions/professional_registrations/getProjectDetailsByProjectId";
import postProfessionalRegistration from "@/app/actions/professional_registrations/postProfessionalRegistration";
import postProjectDetails from "@/app/actions/professional_registrations/postProjectDetails";
import postProjectDetailsFromGateway from "@/app/actions/professional_registrations/postProjectDetailsFromGateway";
import putProfessionalRegistration from "@/app/actions/professional_registrations/putProfessionalRegistration";
import putProjectDetails from "@/app/actions/professional_registrations/putProjectDetails";

export {
  postProjectDetailsFromGateway,
  getProjectDetailsByProjectId,
  putProjectDetails,
  putProfessionalRegistration,
  postProjectDetails,
  getProfessionalRegistrations,
  postProfessionalRegistration,
  deleteProfessionalRegistration,
  getProjectDetails,
};
