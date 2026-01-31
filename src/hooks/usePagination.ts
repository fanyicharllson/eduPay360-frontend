import { useState } from 'react';

/**
 * Reusable pagination logic hook for any list or table.
 * @param totalItems Total number of items in the list
 * @param initialPage Initial page number (default 1)
 * @param itemsPerPage Items per page (default 5)
 */
export function usePagination(totalItems: number, initialPage = 1, itemsPerPage = 5) {
  const [page, setPage] = useState(initialPage);
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const paginated = (data: any[]) => data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return { page, setPage, pageCount, paginated, itemsPerPage };
}
