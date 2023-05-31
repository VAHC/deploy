const validation = (input) => {
    let errors = {};
    
      // Validación para el campo "title"
      if (!input.title) {
        errors.title = 'Debes darle un titulo a tu reseña';
      }
    
      // Validación para el campo "comment"
      if (!input.comment) {
        errors.comment = 'Debes dejar una reseña';
      } 
    
      // Validación para el campo "qualification"
      if (!input.qualification) {
        errors.qualification = 'Debes calificar el libro, elije una opción';
      }

      // Retorna los errores del formulario
      return errors;
}

export default validation;