import { useEffect } from "react";
import { useUserContext } from "../../../../contexts/useUserContext";
import CustomTable from "../../../UI/molecules/CustomTable";
import { PageDefault } from "../PageDefault";
import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";


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

export default function UsersAdminPage() {

  const {users, getUsers, loading} = useUserContext()

  const headers = ['ID',
    'Name',
    'Email',
    'Role',
    'Address',
    "Creation Date",
    "Actions"
  ];

  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <PageDefault>
        <CustomTable headers={headers} itemsPerPage={36} totalItems={15} handlePageChange={()=> window.alert("Not Implemented")} loading={loading}>
          {users?.map((row:any) => (
          <StyledTableRow key={row.id}>
              <StyledTableCell align="left">
                  {row.id}
              </StyledTableCell>
              <StyledTableCell align="left">
                  {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                  {row.email}
              </StyledTableCell>
              <StyledTableCell align="left">
                  {row.role}
              </StyledTableCell>
              <StyledTableCell align="left">
                  {row.address}
              </StyledTableCell>
              <StyledTableCell align="left">
                  {row.updated_at}
              </StyledTableCell>
              <StyledTableCell align="left">
                <MdDeleteSweep color="red"/>
              </StyledTableCell>

              
             
          </StyledTableRow>
          ))}
      </CustomTable>
    </PageDefault>
  )
}
