

const isFiveDaysOld = (dateString) => {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - inputDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return Math.abs(daysDifference) <= 5;
}

export { isFiveDaysOld };
