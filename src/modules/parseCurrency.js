export default (value) => {
  const multiplicator = value < 0.1 ? 10000 : 100;

  return value >= 1000
    ? parseFloat(Math.round(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : parseFloat(Math.round(value * multiplicator) / multiplicator).toString();
};
