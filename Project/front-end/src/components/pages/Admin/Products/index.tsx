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
import { TbEdit } from "react-icons/tb";
import BaseSelect from "../../../UI/atoms/BaseSelect";
import { useCategoryContext } from "../../../../contexts/useCategoryContext";
import InputTextarea from "../../../UI/atoms/InputTextArea";
import InputImageUpload from "../../../UI/molecules/InputImageUpload";
import BaseMultipleSelect from "../../../UI/atoms/BaseMultipleSelect";

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
  const [ description, setDescription ] = useState<string>("")
  const [availableAmount, setAvailableAmount] = useState<string>("")
  const [colors, setColors] = useState([])
  const [densities, setDensities] = useState([])
  const { categories, getCategories } = useCategoryContext()

  const [firstImg, setFirstImg] = useState({ preview: "", raw: "" });
  const [secondImg, setSecondImg] = useState({ preview: "", raw: "" });
  const [thirdImg, setThirdImg] = useState({ preview: "", raw: "" });

  const { products,
    getProducts,
    loading,
    modalCreate,
    setModalCreate,
    removeProduct,
    createProduct
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
    getCategories()
  }, [])

  const handleSelectCategory = (e: any) => {
    setCategory(e.value)
  }

  
  const handleFirstImg =async (e:any)=> {
    if (e.target.files.length) {
        setFirstImg({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
          
    }
}
const handleSecondImg =(e:any)=> {
    if (e.target.files.length) {
        setSecondImg({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
    }
}
const handleThirdImg =(e:any)=> {
    if (e.target.files.length) {
        setThirdImg({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
    }
}

const arrayCategory = categories.map(category => {
  return {
    name: category.name,
    value: category._id
  }
})

const arrayColor = [
  {name: 'gray', value: 'gray'},
  {name: 'black', value: 'black'},
  {name: 'red', value: 'red'},
  {name: 'green', value: 'green'},
  {name: 'yellow', value: 'yellow'},
]

const arrayDensity = [
  {name: '100 Inch', value: '100 Inch'},
  {name: '200 Inch', value: '200 Inch'},
  {name: '300 Inch', value: '300 Inch'},
  {name: '400 Inch', value: '400 Inch'},
  
]

const handleSelectColor = (options: any) => {
  setColors(options)
}

const handleSelectDensity = (options: any) => {
  setDensities(options)
}

const handleSubmitProductCreation =()=> {
  console.log(category)
  const files = [
      firstImg.raw,
      secondImg.raw,
      thirdImg.raw,
  ]
  const data = {
    name,
    description,
    category_id: category,
    price: Number(price),
    discount:Number(discount),
    availableAmount: Number(availableAmount),
    colors: colors.map((color:{name: string, value: string}) => color.value),
    density: densities.map((density:{name: string, value: string}) => density.value),
    files
  }

  createProduct(data);
}



  return (
    <PageDefault>

      <CustomModal
        loading={loading}
        title="Product Creation"
        open={modalCreate}
        setOpen={setModalCreate}
        onClickBtnConfirm={(): void => {
          handleSubmitProductCreation()
        }}
      >
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
                placeholder="0.00"
              />
              <BaseInput label="Discount" type="text" value={discount} onChange={(e) => setDiscount(e)} placeholder="0.00" />
              <InputTextarea label="Description" onInput={(e)=> setDescription(e)} value={description}/>

            </div>
            <div>
              <BaseInput
                label="Available Amount"
                type="text"
                value={availableAmount}
                onChange={(e) => setAvailableAmount(e)}
                placeholder="Ex: 135"
              />
              <BaseSelect title='Category' options={arrayCategory} onSelect={handleSelectCategory} />
              <BaseMultipleSelect title='Color' options={arrayColor} onSelect={handleSelectColor} />
              <BaseMultipleSelect title='Density' options={arrayDensity} onSelect={handleSelectDensity} />
            </div>
          </div>
          <div className="product_form_container__images">

          <InputImageUpload label="img1" id="img1"   onChange={handleFirstImg} preview={firstImg.preview}/>
          <InputImageUpload label="img2" id="img2" onChange={handleSecondImg} preview={secondImg.preview}/>
          <InputImageUpload label="img3" id="img3" onChange={handleThirdImg} preview={thirdImg.preview}/>

          </div>
      </CustomModal>

      <PagesHeader
        title="Products"
        rightButton={
          <button onClick={() => {
            setModalCreate(true)
          }}>
            <IoMdAddCircleOutline /> Create Product
          </button>
        }
      />

      <CustomTable headers={headers} itemsPerPage={36} totalItems={15} handlePageChange={() => window.alert("Not Implemented")} loading={loading}>
        {products?.map((row: ProductInterface) => (
          <StyledTableRow key={row._id}>
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
              <div style={{
                display: 'flex',
                gap: '0 8px'
              }}>
                <MdDeleteSweep color="red" onClick={() => {
                  if (window.confirm("Are you sure you want to delete this product?")) {
                    removeProduct(row._id || '');
                  }
                }} />
                <TbEdit color="blue" />
              </div>
            </StyledTableCell>



          </StyledTableRow>
        ))}
      </CustomTable>
    </PageDefault>
  )
}
