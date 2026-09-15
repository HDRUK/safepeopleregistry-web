const MAX_UPLOAD_SIZE_BYTES = 10000000;

const DOCUMENT_FILE_EXTENSIONS = ["pdf", "doc", "docx"];

enum FileStatus {
  PENDING = "pending",
  PROCESSED = "processed",
  FAILED = "failed",
}

enum FileType {
  CV = "CV",
  CERTIFICATION = "CERTIFICATION",
  RESEARCHER_LIST = "RESEARCHER_LIST",
  DECLARATION = "DECLARATION",
  DECLARATION_SRO = "DECLARATION_SRO",
}

export {
  MAX_UPLOAD_SIZE_BYTES,
  DOCUMENT_FILE_EXTENSIONS,
  FileStatus,
  FileType,
};
