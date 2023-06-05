const validation = (input,file) => {
let errors = {};

  // Validación para el campo "title"
  if (!input.title) {
    errors.title = 'El titulo es obligatorio';
  }

  // Validación para el campo "publisher"
  if (!input.publisher) {
    errors.publisher = 'La editorial es obligatoria';
  } 

  // Validación para el campo "description"
  if (!input.description) {
    errors.description = 'La descripción es obligatoria';
  }

  // Validación para el campo "price"
  if (!input.price || input.price <= 0) {
    errors.price = 'El precio es obligatorio y debe ser un número positivo';
  }

  // Validación para el campo "stock"
  if (!input.stock || input.stock <= 0) {
    errors.stock = 'El stock es obligatorio y debe ser un número positivo';
  }

  // Validación para el campo "publishedDate"
  if (!input.publishedDate) {
    errors.publishedDate = 'La fecha de publicación es obligatoria';
  }

  // Validación para el campo "image"
  if (!input.image && (file === null)) {
    errors.image = 'La imagen de la portada es obligatoria';
  } 

  // Validación para el campo "authors"
  if (!input.authors || !input.authors.length) {
    errors.authors = 'Es obligatorio seleccionar al menos un autor';
  }

  // Validación para el campo "genders"
  if (!input.genders || !input.genders.length) {
    errors.genders = 'Es obligatorio seleccionar al menos un género';
  }

  // Retorna los errores del formulario
  return errors;
}

export default validation;

