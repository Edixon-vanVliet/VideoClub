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
export const GenerosPage = () => {
  const [generos, setGeneros] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ _id: 0, descripcion: "" });

  const toggle = () => {
    setModal(!modal);
    setFormData({ _id: 0, descripcion: "" });
  };

  const handleSave = async () => {
    toggle();

    if (formData._id !== 0) {
      const updatedItems = generos.map((genero) => {
        if (genero._id === formData._id) {
          return formData;
        }

        return genero;
      });

      setGeneros(updatedItems);

      await apiService.put(`generos/${formData._id}`, formData);
    } else {
      const data = formData;
      delete data._id;

      const response = await apiService.post(`generos`, formData);

      setGeneros([...generos, response.data]);
    }
  };

  const handleEdit = (genero) => {
    toggle();
    setFormData(genero);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que deseas eliminar este genero?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        const updatedItems = generos.filter((genero) => genero._id !== id);
        setGeneros(updatedItems);
        await apiService.delete(`generos/${id}`);

        Swal.fire("Eliminado", "El genero ha sido eliminada.", "success");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.get("/generos");
      setGeneros(response.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>Generos</h2>

      <Button color="success" className="float-end" onClick={toggle}>
        Agregar genero
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!generos.length ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No hay Data
              </td>
            </tr>
          ) : (
            generos.map((genero) => (
              <tr key={genero._id}>
                <td>{genero.descripcion}</td>
                <td>
                  <Button color="warning" onClick={() => handleEdit(genero)}>
                    Editar
                  </Button>{" "}
                  <Button color="danger" onClick={() => handleDelete(genero._id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{formData._id !== 0 ? "Editar genero" : "Agregar genero"}</ModalHeader>
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
