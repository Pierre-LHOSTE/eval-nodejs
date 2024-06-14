export const message = ({ text, type }) => {
  let color = "blue";
  switch (type) {
    case "error":
      color = "red";
      break;
    case "success":
      color = "green";
      break;
    default:
      s;
      color = "blue";
      break;
  }
  return `
<div class="font-regular relative mb-4 mt-4 block w-full rounded-lg bg-${color}-100 p-4 text-base leading-5 text-black opacity-100">
  ${text}
</div>
`;
};
