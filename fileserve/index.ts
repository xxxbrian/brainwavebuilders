import { v4 as uuid } from "uuid";
import { Database } from "bun:sqlite";

// if the database does not exist, it will be created
const db = new Database("data.sqlite", { create: true });
// create the uploads table if it does not exist
// --------------------
// | uuid | fileName |
// --------------------

const query = db.query(
  "CREATE TABLE IF NOT EXISTS uploads (uuid TEXT PRIMARY KEY, fileName TEXT)",
);
query.run();

const server = Bun.serve({
  port: 4000,
  async fetch(req) {
    const url = new URL(req.url);

    // return index.html for root path
    if (url.pathname === "/")
      return new Response(Bun.file("index.html"), {
        headers: {
          "Content-Type": "text/html",
        },
      });

    // parse formdata at /upload
    if (url.pathname === "/upload" && req.method === "POST") {
      const formdata = await req.formData();
      const file = formdata.get("file");
      const fileName = formdata.get("fileName");
      if (!file) throw new Error("Must upload a file.");
      if (!fileName) throw new Error("Must provide a file name.");
      // store the file name in the database
      const id = uuid();
      const query = db.query(
        "INSERT INTO uploads (uuid, fileName) VALUES ($id, $fileName)",
      );
      query.run({ $id: id, $fileName: fileName.toString() });
      // write the file to the storage directory
      await Bun.write(`storage/${id}`, file);
      // return the id of the file
      return new Response(id);
    }

    // serve files from the uploads directory
    if (url.pathname.startsWith("/storage/")) {
      const id = url.pathname.slice(9);
      const query = db.query("SELECT fileName FROM uploads WHERE uuid = $id");
      const fileName = (query.get({ $id: id }) as { fileName: string })
        .fileName;
      console.log(fileName);
      if (!fileName) return new Response("Not Exists", { status: 404 });
      let file = Bun.file(`storage/${id}`);
      if (!file) {
        console.log("File Lost");
        return new Response("File Lost", { status: 404 });
      }
      return new Response(Bun.file(`storage/${id}`), {
        headers: {
          "Content-Disposition": `attachment; filename="${fileName}"`,
        },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at port ${server.port}`);
