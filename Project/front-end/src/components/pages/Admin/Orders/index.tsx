import { useEffect } from "react";
import CustomTable from "../../../UI/molecules/CustomTable";
import { PageDefault } from "../PageDefault";
import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";
import { useOrderContext } from "../../../../contexts/useOrdersContext";


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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function OrdersAdminPage() {

    const { orders, getOrders, loading } = useOrderContext()

    const headers = ['ID',
        'Name',
        'Description',
        "Category",
        'Price',
        'Discount',
        "Creation Date",
        "Actions"
    ];

    useEffect(() => {
        getOrders()
    }, [])


    return (
        <PageDefault>
            <CustomTable headers={headers} itemsPerPage={36} totalItems={15} handlePageChange={() => window.alert("Not Implemented")} loading={loading}>
                {orders?.map((row: any) => (
                    <StyledTableRow key={row.id}>
                        <StyledTableCell align="left">
                            <img src={row.images[0]} alt="" style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%'
                            }} />
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {row.description}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {row.category}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {`${row.price}$`}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {row.discount}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {row.updated_at}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            <MdDeleteSweep color="red" />
                        </StyledTableCell>



                    </StyledTableRow>
                ))}
            </CustomTable>
        </PageDefault>
    )
}
