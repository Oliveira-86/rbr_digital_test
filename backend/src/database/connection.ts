import mongoose from "mongoose";

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

export const connect = () => {
    mongoose.connect(`mongodb+srv://${db_user}:${db_password}@cluster0.rt6qf.mongodb.net/`)

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.error("Erro ao conectar com o mongoDB")
    })

    connection.on("open", () => {
        console.log("Conetado ao mongoDB com sucesso!")
    })
}
