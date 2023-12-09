import { useEffect } from "react";
import CustomTable from "../../../UI/molecules/CustomTable";
import { PageDefault } from "../PageDefault";
import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { MdEditNote } from "react-icons/md";
import { useOrderContext } from "../../../../contexts/useOrdersContext";
import PagesHeader from "../../../UI/molecules/PagesHeader";
import { CustomModal } from "../../../UI/molecules/CustomModal";
import "./styles.scss"
import BaseInput from "../../../UI/atoms/BaseInput";

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
    const { orders, getOrders, modalCreate, setModalCreate, loading } = useOrderContext();

    const headers = [
        'Order Number',
        'User ID',
        'Address',
        'Total Cost',
        'Status',
        'Created At',
        'Updated At',
        'Actions',
    ];

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <PageDefault>

            <CustomModal
                loading={loading}
                title="Edit Order"
                open={modalCreate}
                setOpen={setModalCreate}
                onClickBtnConfirm={(): void => {
                    // handleConfirmCategoryCreation();
                }}
            >
                <div>
                    <div className="product_form_container">
                        <div>
                            <BaseInput
                                label="Name"
                                type="text"
                                onChange={(e) => ""}
                                placeholder="EX: lace wigs"
                            />
                            <BaseInput
                                label="Price"
                                type="text"
                                value=""
                                onChange={(e) => ""}
                                placeholder="EX: lace wigs"
                            />
                            <BaseInput
                                label="Discount"
                                type="text"
                                value=""
                                onChange={(e) => ""}
                                placeholder="EX: lace wigs"
                            />

                        </div>
                        <div>

                            <BaseInput
                                label="Category"
                                type="text"
                                value=""
                                onChange={(e) => ""}
                                placeholder="EX: lace wigs"
                            />
                        </div>
                        <br />
                    </div>
                    description <br />

                    images

                </div>
            </CustomModal>

            <PagesHeader
                title="Orders"

            />


            <CustomTable headers={headers} itemsPerPage={36} totalItems={15} handlePageChange={() => window.alert('Not Implemented')} loading={loading}>
                {orders?.map((order: any) => (
                    <StyledTableRow key={order._id}>
                        <StyledTableCell align="left">{order.order_number}</StyledTableCell>
                        <StyledTableCell align="left">{order.user_id}</StyledTableCell>
                        <StyledTableCell align="left">{order.address}</StyledTableCell>
                        <StyledTableCell align="left">{`${order.total_cost}$`}</StyledTableCell>
                        <StyledTableCell align="left">{order.status}</StyledTableCell>
                        <StyledTableCell align="left">{order.created_at.toString()}</StyledTableCell>
                        <StyledTableCell align="left">{order.updated_at.toString()}</StyledTableCell>
                        <StyledTableCell align="left">
                            <MdEditNote color="red" onClick={() => {
                                setModalCreate(true)
                            }} />
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </CustomTable>
        </PageDefault>
    );
}