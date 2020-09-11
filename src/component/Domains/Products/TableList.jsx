import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import ModalPostAndUpdate from "./ModalPostAndUpdate";

const TableList = (props) => {
  const [UpdateModal, setUpdateModal] = useState(false);
  const [item, setItem] = useState();

  const tableBody = !props.items
    ? null
    : props.items.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.menuname}</td>
          <td>{item.harga}</td>
          <td>{item.stock}</td>
          <td>{item.category}</td>
          <td>{item.status}</td>
          <td>
            <Button
              onClick={() => {
                props.deleteProd(item.id);
              }}
            >
              x
            </Button>
            <Button
              onClick={() => {
                setItem(item);
                setUpdateModal(!UpdateModal);
              }}
            >
              edit
            </Button>
          </td>
        </tr>
      ));

  return (
    <div>
      {!UpdateModal ? null : (
        <ModalPostAndUpdate view={UpdateModal} toggleView={setUpdateModal} status={"Update"} item={item} />
      )}

      <Table striped bordered hover variant="white">
        <thead>
          <tr>
            <th>id</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </div>
  );
};

export default TableList;
