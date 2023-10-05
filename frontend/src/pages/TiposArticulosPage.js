import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiService from "../services/apiService";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
export const TiposArticulosPage = () => {
  const [tiposArticulos, setTiposArticulos] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ _id: 0, descripcion: "" });

  const toggle = () => {
    setModal(!modal);
    setFormData({ _id: 0, descripcion: "" });
  };

  const handleSave = async () => {
    toggle();

    if (formData._id !== 0) {
      const updatedItems = tiposArticulos.map((tipoArticulo) => {
        if (tipoArticulo._id === formData._id) {
          return formData;
        }

        return tipoArticulo;
      });

      setTiposArticulos(updatedItems);

      await apiService.put(`tiposArticulos/${formData._id}`, formData);
    } else {
      const data = formData;
      delete data._id;

      const response = await apiService.post(`tiposArticulos`, formData);

      setTiposArticulos([...tiposArticulos, response.data]);
    }
  };

  const handleEdit = (tipoArticulo) => {
    toggle();
    setFormData(tipoArticulo);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que deseas eliminar este tipo de articulo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        const updatedItems = tiposArticulos.filter((tipoArticulo) => tipoArticulo._id !== id);
        setTiposArticulos(updatedItems);
        await apiService.delete(`tiposArticulos/${id}`);

        Swal.fire("Eliminado", "El tipo de articulo ha sido eliminada.", "success");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.get("/tiposArticulos");
      setTiposArticulos(response.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>Tipos de Articulos</h2>

      <Button color="success" className="float-end" onClick={toggle}>
        Agregar Tipo de Articulo
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!tiposArticulos.length ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No hay Data
              </td>
            </tr>
          ) : (
            tiposArticulos.map((tipoArticulo) => (
              <tr key={tipoArticulo._id}>
                <td>{tipoArticulo.descripcion}</td>
                <td>
                  <Button color="warning" onClick={() => handleEdit(tipoArticulo)}>
                    Editar
                  </Button>{" "}
                  <Button color="danger" onClick={() => handleDelete(tipoArticulo._id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {formData._id !== 0 ? "Editar tipo de articulo" : "Agregar tipo de articulo"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input
                type="textarea"
                id="description"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Guardar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};
