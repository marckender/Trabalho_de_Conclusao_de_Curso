import { useEffect, useState } from "react";
import CustomTable from "../../../UI/molecules/CustomTable";
import { PageDefault } from "../PageDefault";
import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { MdDeleteSweep, MdEditNote } from "react-icons/md";
import { ICategory, useCategoryContext } from "../../../../contexts/useCategoryContext";
import ModalConfirm from "../../../UI/molecules/ModalConfirm";
import { IoMdAddCircleOutline } from "react-icons/io";
import PagesHeader from "../../../UI/molecules/PagesHeader";
import BaseInput from "../../../UI/atoms/BaseInput";
import { CustomModal } from "../../../UI/molecules/CustomModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(192, 192, 192, 0.80)",
    color: theme.palette.common.black,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CategoriesAdminPage() {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [category_name, setCategory_name] = useState<string>("");

  const {
    getCategories,
    handleDeleteCategory,
    categories,
    loading,
    modalCreate,
    setModalCreate,
    handleCreateCategory,
    modalUpdate,
    setModalUpdate,
    handleUpdateCategory
  } = useCategoryContext();

  const headers = ["Name", "Slug", "Update Date", "Actions"];

  useEffect(() => {
    getCategories();
  }, []);

  const handleConfirm = async (id: string) => {
    setOpenModalConfirm(true);
    setId(id);
  };

  const handleOpenModalEdit = async (row: ICategory) => {
    setModalUpdate(true);
    setId(row._id ?? "");
    setCategory_name(row.name)
  };
  // create
  const handleConfirmCategoryCreation = async () => {
    handleCreateCategory({ name: category_name});
  };

  const handleConfirmCategoryUpdate = async () => {
    handleUpdateCategory(id, { name: category_name});
  };

  return (
    <PageDefault>
      <ModalConfirm
        loading={loading}
        size={400}
        textBtnCancel="No"
        widthBtnCancel="60px"
        textBtnConfirm="Yes"
        widthBtnConfirm="60px"
        description="Do you really want to delete it??"
        open={openModalConfirm}
        setOpen={setOpenModalConfirm}
        onCLickBtnCancel={() => {
          setOpenModalConfirm(false);
        }}
        onClickBtnConfirm={() => {
          handleDeleteCategory(id);
        }}
      />

      <CustomModal
        loading={loading}
        title="Category Creation"
        open={modalCreate}
        setOpen={setModalCreate}
        onClickBtnConfirm={(): void => {
          handleConfirmCategoryCreation();
        }}
      >
        <div className="wallet_form_container">
          <br />
            <BaseInput
              label="Name"
              type="text"
              value={category_name}
              onChange={(e) => setCategory_name(e)}
              placeholder="EX: lace"
            />
        </div>
      </CustomModal>
<CustomModal
        loading={loading}
        title="Update Category"
        open={modalUpdate}
        setOpen={setModalUpdate}
        onClickBtnConfirm={(): void => {
          handleConfirmCategoryUpdate();
        }}
      >
        <div className="wallet_form_container">
          <br />
            <BaseInput
              label="Name"
              type="text"
              value={category_name}
              onChange={(e) => setCategory_name(e)}
              placeholder="EX: lace"
            />
        </div>
      </CustomModal>
      <PagesHeader
        title="Categories"
        rightButton={
          <button onClick={() => {
            setModalCreate(true)
            setCategory_name("")
            }}>
            <IoMdAddCircleOutline /> Create Category
          </button>
        }
      />
      <CustomTable
        headers={headers}
        itemsPerPage={36}
        totalItems={15}
        handlePageChange={() => window.alert("Not Implemented")}
        loading={loading}
      >
        {categories?.map((row: ICategory) => (
          <StyledTableRow key={row._id}>
            <StyledTableCell align="left">{row.name}</StyledTableCell>
            <StyledTableCell align="left">{row.SLUG}</StyledTableCell>
            <StyledTableCell align="left">{row.updated_at}</StyledTableCell>
            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  gap: "0 16px",
                }}
              >
                <MdDeleteSweep
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleConfirm(row._id ?? "")}
                />
                <MdEditNote
                  color="green"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenModalEdit(row)}
                />
              </div>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </CustomTable>
    </PageDefault>
  );
}
