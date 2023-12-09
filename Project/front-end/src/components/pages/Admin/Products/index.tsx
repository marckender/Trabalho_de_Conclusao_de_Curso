import { useEffect, useState } from "react";
import CustomTable from "../../../UI/molecules/CustomTable";
import { PageDefault } from "../PageDefault";
import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";
import { ProductInterface, useProductContext } from "../../../../contexts/useProductContext";
import { IoMdAddCircleOutline } from "react-icons/io";
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
// hide last border
'&:last-child td, &:last-child th': {
  border: 0,
},
}));

export default function ProductsAdminPage() {
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [discount, setDiscount] = useState<string>("")
  const [category, setCategory] = useState<string>("")

  const {products,
    getProducts,
    loading,
    modalCreate,
    setModalCreate,
  
  } = useProductContext()

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
    getProducts()
  }, [])
  

  return (
    <PageDefault>

    <CustomModal
            loading={loading}
            title="Product Creation"
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
                  value={name}
                  onChange={(e) => setName(e)}
                  placeholder="EX: lace wigs"
                />
                  <BaseInput
                  label="Price"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e)}
                  placeholder="EX: lace wigs"
                />
                    <BaseInput
                  label="Discount"
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e)}
                  placeholder="EX: lace wigs"
                />

              </div>
              <div>

              <BaseInput
                  label="Category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e)}
                  placeholder="EX: lace wigs"
                  />
              </div>
              <br />
            </div>
            {/* description */}
            description <br />

                  {/* Images */}
                  images
               

            </div>
      </CustomModal>

        <PagesHeader
          title="Products"
          rightButton = {
          <button onClick={() => {
            setModalCreate(true)
            }}>
            <IoMdAddCircleOutline /> Create Product
          </button>
          }
        />

        <CustomTable headers={headers} itemsPerPage={36} totalItems={15} handlePageChange={()=> window.alert("Not Implemented")} loading={loading}>
          {products?.map((row:  ProductInterface) => (
          <StyledTableRow key={row._id}>
              <StyledTableCell align="left">
                  <img src={row.images[0]} alt="" style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%'
                }}/>
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
                <MdDeleteSweep color="red"/>
              </StyledTableCell>

              
             
          </StyledTableRow>
          ))}
      </CustomTable>
    </PageDefault>
  )
}
