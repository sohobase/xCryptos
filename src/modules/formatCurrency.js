export default (value, fixed = 2) => parseFloat(value).toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
