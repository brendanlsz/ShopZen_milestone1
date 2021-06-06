import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../redux/Products/products.actions";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import LoadMore from "./../../components/LoadMore";
import CKEditor from "ckeditor4-react";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
    setProductDetails("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productCategory !== "") {
      dispatch(
        addProductStart({
          productCategory,
          productName,
          productThumbnail,
          productPrice,
          productDesc,
          productDetails,
        })
      );
      resetForm();
    } else {
      alert("Please choose a category");
    }
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>
            <FormInput
              label="Name"
              placeholder="Name of Item"
              required
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />
            <FormInput
              label="Main image URL"
              type="url"
              placeholder="URL to image of item"
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              placeholder="Price of item"
              value={productPrice}
              required
              handleChange={(e) => setProductPrice(e.target.value)}
            />
            <FormSelect
              label="Category"
              className="category"
              required
              options={[
                {
                  value: "electronics",
                  name: "Electronics",
                },
                {
                  value: "others",
                  name: "Others",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />
            <FormInput
              label="Description"
              type="description"
              required
              handleChange={(evt) => setProductDesc(evt.target.value)}
              placeholder="Short description of item"
            />
            {/* <FormInput
              label="Details"
              type="text"
              placeholder="Include any details or specification of item"
              handleChange={(e) => setProductDetails(e.target.value)} />*/}
            <label>Details/Specifications(Optional)</label>
            <textarea
              placeholder="Include any details or specification of item"
              rows="5"
              onChange={(e) => setProductDetails(e.target.value)}
            />

            <br />
            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product, index) => {
                        const {
                          productName,
                          productThumbnail,
                          productPrice,
                          documentID,
                        } = product;

                        return (
                          <tr key={index}>
                            <td>
                              <img className="thumb" src={productThumbnail} />
                            </td>
                            <td>{productName}</td>
                            <td>${productPrice}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
