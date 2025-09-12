import { ColumnDef } from "@tanstack/react-table";

function filterColumns<T, P>(
  initialColumns: ColumnDef<T, P>[],
  includeColumns: string[],
  extraColumns?: ColumnDef<T, P>[]
) {
  const replacedColumns = initialColumns.map(column => {
    let replacedColumn;

    const columnExists = (extraColumns || []).find(extraColumn => {
      const isSameColumn = column.id === extraColumn.id;

      if (isSameColumn) {
        replacedColumn = {
          ...column,
          ...extraColumn,
        };
      }

      return isSameColumn;
    });

    if (columnExists) {
      return replacedColumn;
    }

    return column;
  });

  const filteredExtraColumns = (extraColumns || []).filter(column => {
    return !initialColumns.find(extraColumn => column.id === extraColumn.id);
  });

  return replacedColumns
    .filter(({ id }) => (id ? includeColumns.includes(id) : true))
    .concat(filteredExtraColumns);
}

export { filterColumns };
