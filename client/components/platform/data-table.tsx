"use client";
import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { EmptyState } from "./states";
export type Column<T> = {
  key: string;
  label: string;
  value: (row: T) => string | number;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
};
export function DataTable<T>({
  rows,
  columns,
  rowKey,
  actions,
  pageSize = 5,
  caption = "Results",
}: {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  actions?: (row: T) => ReactNode;
  pageSize?: number;
  caption?: string;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const filtered = rows.filter((row) =>
    columns.some((column) => String(column.value(row)).toLowerCase().includes(query.toLowerCase())),
  );
  const sortColumn = columns.find((column) => column.key === sort?.key);
  if (sort && sortColumn)
    filtered.sort((a, b) => {
      const av = sortColumn.value(a),
        bv = sortColumn.value(b);
      const result =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sort.direction === "asc" ? result : -result;
    });
  const limit = Math.max(1, Math.floor(pageSize));
  const pages = Math.max(1, Math.ceil(filtered.length / limit));
  const current = Math.min(page, pages - 1);
  return (
    <div className="space-y-4">
      <Input
        value={query}
        aria-label={`Filter ${caption}`}
        placeholder="Filter results…"
        onChange={(event) => {
          setQuery(event.target.value);
          setPage(0);
        }}
        className="max-w-sm"
      />
      {filtered.length ? (
        <div className="overflow-x-auto rounded-xl border">
          <Table className="w-full text-left text-sm">
            <caption className="sr-only">{caption}</caption>
            <TableHeader className="border-b bg-muted/50">
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    scope="col"
                    className="p-3 font-medium"
                    aria-sort={
                      sort?.key === column.key
                        ? sort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    {column.sortable === false ? (
                      column.label
                    ) : (
                      <button
                        className="inline-flex items-center gap-2 rounded-sm"
                        onClick={() => {
                          setSort({
                            key: column.key,
                            direction:
                              sort?.key === column.key && sort.direction === "asc" ? "desc" : "asc",
                          });
                          setPage(0);
                        }}
                      >
                        {column.label}
                        <Icon
                          icon={
                            sort?.key !== column.key
                              ? ArrowUpDown
                              : sort.direction === "asc"
                                ? ArrowUp
                                : ArrowDown
                          }
                          size="sm"
                        />
                      </button>
                    )}
                  </TableHead>
                ))}
                {actions && (
                  <TableHead scope="col" className="p-3">
                    <span className="sr-only">Row actions</span>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(current * limit, (current + 1) * limit).map((row) => (
                <TableRow key={rowKey(row)} className="border-b last:border-0 hover:bg-muted/50">
                  {columns.map((column) => (
                    <TableCell className="p-3" key={column.key}>
                      {column.render ? column.render(row) : column.value(row)}
                    </TableCell>
                  ))}
                  {actions && <TableCell className="p-3 text-right">{actions(row)}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState
          title="No matching results"
          description="Try a different search or clear the filter."
          action={
            <Button variant="outline" onClick={() => setQuery("")}>
              Clear filter
            </Button>
          }
        />
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-xs text-muted-foreground">
          {filtered.length} results · Page {current + 1} of {pages}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" disabled={current === 0} onClick={() => setPage(current - 1)}>
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={current + 1 >= pages}
            onClick={() => setPage(current + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
