import React, { PropsWithChildren, useRef } from 'react';
import { Row, flexRender } from '@tanstack/react-table';
import { IDraggable } from 'app/V2/shared/types';
import { type IDnDContext } from '../../Layouts/DragAndDrop';
import { GrabIcon, RowWrapper } from './DraggableRow';

interface TableRowProps<T> extends PropsWithChildren {
  row: Row<T>;
  draggableRow?: boolean;
  dndContext?: IDnDContext<T>;
  item?: IDraggable<T>;
  highLightGroups?: boolean;
  subRowsKey?: string;
}

/* eslint-disable comma-spacing */
const TableRow = <T,>({
  draggableRow,
  row,
  dndContext,
  item,
  subRowsKey,
  highLightGroups = true,
}: TableRowProps<T>) => {
  const previewRef = useRef<HTMLTableRowElement>(null);
  const icons =
    draggableRow && dndContext && item
      ? [
          <GrabIcon
            row={row}
            dndContext={dndContext}
            previewRef={previewRef}
            item={item}
            subRowsKey={subRowsKey}
            highLightGroups={highLightGroups}
          />,
        ]
      : [];
  const isSubGroup = row.depth > 0;
  const bg =
    (row.getIsExpanded() && row.getCanExpand()) ||
    (highLightGroups && row.getCanExpand()) ||
    (subRowsKey && highLightGroups && Array.isArray((row.original as any)[subRowsKey]))
      ? 'bg-primary-100'
      : '';

  return (
    <RowWrapper
      className={`border-b ${bg}`}
      draggableRow={draggableRow}
      row={row}
      dndContext={dndContext}
      innerRef={previewRef}
      key={`row${row.id}`}
    >
      {row.getVisibleCells().map((cell, columnIndex) => {
        const isSelect = cell.column.id === 'checkbox-select';
        const firstColumnClass = draggableRow && columnIndex === 0 ? 'flex items-center gap-3' : '';

        let border = '';
        if (isSelect && isSubGroup) {
          border = 'border-r-2 border-primary-300';
        }

        return (
          <td
            key={cell.id}
            className={`${firstColumnClass} ${isSelect ? 'px-4' : 'px-6'} ${border} py-2 ${
              cell.column.columnDef.meta?.contentClassName || ''
            }`}
          >
            {icons[columnIndex]}
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </RowWrapper>
  );
};

export { TableRow };
