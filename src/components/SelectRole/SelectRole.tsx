import { Role } from "@/types/application";
import SelectInput, { SelectInputProps } from "../SelectInput";

export interface SelectRoleProps extends SelectInputProps {
  roles: Role[];
}

export default function TableSelectRole({
  roles,
  ...restProps
}: SelectRoleProps) {
  return (
    <SelectInput
      options={[
        ...roles.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
      ]}
      {...restProps}
    />
  );
}
