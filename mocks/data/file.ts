import { FileStatus, FileType } from "@/consts/files";
import { FileResponse } from "@/services/files/types";
import { faker } from "@faker-js/faker";

const mockedFile = (file?: Partial<FileResponse>) => ({
  id: faker.number.int(),
  name: faker.system.fileName(),
  type: FileType.CV,
  status: FileStatus.PENDING,
  created_at: faker.date.soon().toString(),
  updated_at: faker.date.soon().toString(),
  ...file,
});

export { mockedFile };


const mockedSroDeclarationFile = (file?: Partial<FileResponse>) => ({
  id: faker.number.int(),
  name: "sro_declaration.pdf",
  type: FileType.DECLARATION_SRO,
  status: FileStatus.PROCESSED,
  created_at: faker.date.soon().toString(),
  updated_at: faker.date.soon().toString(),
  ...file,
});