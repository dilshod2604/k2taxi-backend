import app from "./src/app";
import { VercelRequest, VercelResponse } from "@vercel/node";

// Это основной обработчик для Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Ожидаем, пока приложение не будет готово
    await app.ready();
    // Отправляем запрос на сервер Fastify
    app.server.emit('request', req, res);
  } catch (error) {
    // Обрабатываем ошибки, если они возникнут
    console.error('Error during request handling:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Локальный запуск только для разработки
if (process.env.NODE_ENV !== "production") {
  const start = async () => {
    try {
      // Локальный запуск сервера на порту 3000
      await app.listen({ port: 3000, host: "0.0.0.0" });
      console.log("Server is running on http://localhost:3000");
    } catch (error) {
      app.log.error(error);
      process.exit(1);
    }
  };
  start();
}
