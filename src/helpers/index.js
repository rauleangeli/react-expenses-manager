export const generateId = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date;
}

export const formatDate = date => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES');
}