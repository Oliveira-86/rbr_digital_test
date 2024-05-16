import mongoose from "mongoose";

// not woring ???
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

export const connect = () => {
    mongoose.connect(`mongodb+srv://tally:2y7rHrii3xl6dpeb@cluster0.rt6qf.mongodb.net/`)

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.error("Erro ao conectar com o mongoDB")
    })

    connection.on("open", () => {
        console.log("Conetado ao mongoDB com sucesso!")
    })
}
