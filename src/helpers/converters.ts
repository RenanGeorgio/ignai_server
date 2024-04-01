export function cepConverter(cep: string | number) {
  if(typeof cep === "number") return cep;
  return parseInt(cep.replace(/\D/g, ""), 10);
}