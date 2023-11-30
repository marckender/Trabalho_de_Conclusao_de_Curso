
import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / (itemsPerPage || 36));

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onPageChange(value);
    console.log(event)
  };

  return (
    <div>
      <Stack spacing={2} justifyContent="center" style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <Pagination
          count={totalPages ? totalPages : 0}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default PaginationComponent;