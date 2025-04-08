function dateValidator(date: Date) {
  return date.getDate() > new Date(Date.now()).getDate();
}
export default dateValidator;
