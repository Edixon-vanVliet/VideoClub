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
export const IdiomasPage = () => {
  const [idiomas, setIdiomas] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ _id: 0, descripcion: "" });

  const toggle = () => {
    setModal(!modal);
    setFormData({ _id: 0, descripcion: "" });
  };

  const handleSave = async () => {
    toggle();

    if (formData._id !== 0) {
      const updatedItems = idiomas.map((idioma) => {
        if (idioma._id === formData._id) {
          return formData;
        }

        return idioma;
      });

      setIdiomas(updatedItems);

      await apiService.put(`idiomas/${formData._id}`, formData);
    } else {
      const data = formData;
      delete data._id;

      const response = await apiService.post(`idiomas`, formData);

      setIdiomas([...idiomas, response.data]);
    }
  };

  const handleEdit = (idioma) => {
    toggle();
    setFormData(idioma);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que deseas eliminar este idioma?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        const updatedItems = idiomas.filter((idioma) => idioma._id !== id);
        setIdiomas(updatedItems);
        await apiService.delete(`idiomas/${id}`);

        Swal.fire("Eliminado", "El idioma ha sido eliminada.", "success");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.get("/idiomas");
      setIdiomas(response.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>Idiomas</h2>

      <Button color="success" className="float-end" onClick={toggle}>
        Agregar idioma
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!idiomas.length ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No hay Data
              </td>
            </tr>
          ) : (
            idiomas.map((idioma) => (
              <tr key={idioma._id}>
                <td>{idioma.descripcion}</td>
                <td>
                  <Button color="warning" onClick={() => handleEdit(idioma)}>
                    Editar
                  </Button>{" "}
                  <Button color="danger" onClick={() => handleDelete(idioma._id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{formData._id !== 0 ? "Editar idioma" : "Agregar idioma"}</ModalHeader>
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
