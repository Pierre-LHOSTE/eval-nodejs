export const body = (children) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Eval MongoDB</title>
          <script src="/tailwindcss.js"></script>
        </head>
        <div class="mx-auto w-full max-w-[550px] bg-white>
        ${children}
        </div>
      </html>
    `;
};
