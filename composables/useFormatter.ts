export const useformatter = {
  formatPhone: (number: string) => {
    let formattedNumber = null;
    number.length === 11 ? (formattedNumber = number.substring(1)) : (formattedNumber = number);

    if (formattedNumber.length === 10) {
      formattedNumber = `(${formattedNumber.slice(0, 3)}) ${formattedNumber.slice(3, 6)} - ${formattedNumber.slice(
        6,
        10
      )}`;
    }
    return formattedNumber;
  }
};
