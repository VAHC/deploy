const validation = (userInputs, inputsConfirm) => {
    const errors = {}

    if (userInputs.firstName === "") {
        errors.firstName = "Escribí tu nombre"
    }
    if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$/.test(userInputs.firstName)) {
        errors.firstName = "Tu nombre no puede contener números ni símbolos"
    }
    if (userInputs.lastName === "") {
        errors.lastName = "Escribí tu apellido"
    }
    if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$/.test(userInputs.lastName)) {
        errors.lastName = "Tu apellido no puede contener números ni símbolos"
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userInputs.email)) {
        errors.email = "Escribí un email válido"
    }
    if (userInputs.email !== inputsConfirm.emailC) {
        errors.emailConfirm = "Los correos no coinciden"
    }
    if (userInputs.phone.length > 15 || !/^[0-9]*$/.test(userInputs.phone)) {
        errors.phone = "Teléfono no válido"
    }
    if (userInputs.password === "") {
        errors.password = "Escribí una contraseña"
    }
    if (!/\d/.test(userInputs.password)) {
        errors.password = "Tu contraseña debe contener al menos un número"
    }
    if (userInputs.password.length < 8 || userInputs.password.length > 10) {
        errors.password = "Tu contraseña debe tener entre 8 y 10 caracteres"
    }
    if (userInputs.password !== inputsConfirm.passwordC) {
        errors.passwordConfirm = "Las contraseñas no coinciden"
    }
    return errors
}

export default validation;