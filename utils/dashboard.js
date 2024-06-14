export const dashboard = (user) => {
  return `
<div class="py-6 px-9 bg-white rounded-md">
  <h1 class="text-2xl font-bold text-[#07074D] mb-5">
    Welcome ${user.firstName} ${user.lastName}
  </h1>
  <p class="text-base font-medium text-[#6B7280] mb-3">
    Email: ${user.email}
  </p>
  <p class="text-base font-medium text-[#6B7280] mb-5">
    Id: ${user._id}
  </p>
  <form action="/logout" method="GET" class="mb-5">
    <input
      type="submit"
      value="Logout"
      class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none cursor-pointer"
    />
  </form>
</div>

`;
};
