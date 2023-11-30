import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ReactNode } from 'react';
import { Skeleton } from '@mui/material';
import PaginationComponent from '../Pagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(192, 192, 192, 0.80)',
    color: theme.palette.common.black,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxHeight: '150px'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface IECustomTable {
    headers: any;
    children?: ReactNode ; totalItems:number;
    itemsPerPage:number;
    handlePageChange:any;
    loading: boolean
}

function CustomTable( props : IECustomTable) {
  return (
    <>
    <TableContainer component={Paper} className="custom_table_container" style={{maxHeight: '70vh', overflowY: 'auto'}}>
        <Table sx={{ minWidth: 700, overflowY: 'none'}} aria-label="customized table" stickyHeader style={{minHeight:'10vh', overflowY: 'auto'}}>
          <TableHead>
            <TableRow>
              {props.headers.map((header:any, index:any) => (
                <StyledTableCell key={index + header}>{header}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {props.loading ?
          <>
          {Array.from({ length: 6}, (_, index) => (
            <StyledTableRow key={index}>
                {Array.from({ length: props.headers.length }, (_, cellIndex) => (
                  <StyledTableCell key={cellIndex}>
                    <Skeleton variant="rectangular" height={30} />
                  </StyledTableCell>
                ))}
            </StyledTableRow>
          ))}
        </>
          :
          <>
          {props.children}
          </> 
          }
          
          </TableBody>


        </Table>
      </TableContainer>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px'
      }}>
          <PaginationComponent
          totalItems={props?.totalItems}
          itemsPerPage={props?.itemsPerPage}
          onPageChange={props?.handlePageChange}
        />
      </div>

      </>
  );

}

export default CustomTable;