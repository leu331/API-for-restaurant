import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    await knex("products").del();

    await knex("products").insert([
        {name: "Spaghetti à Carbonara", price: 45.90},
        {name: "Filé Mignon com Risoto de Parmesão", price: 72.50},
        {name: "Frango Grelhado com Legumes", price: 38.00},
        {name: "Lasanha à Bolonhesa", price: 49.90},
        {name: "Salmão ao Molho de Maracujá com Purê de Batata", price: 65.00},
        {name: "Pizza Marguerita", price: 58.90},
        {name: "Tacos de Carne com Guacamole", price: 32.00},
        {name: "Hambúrguer Artesanal com Batata Frita", price: 29.90},
    ]);
};
