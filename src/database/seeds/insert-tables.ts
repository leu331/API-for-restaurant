import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tables").del();

    // Inserts seed entries
    await knex("tables").insert([
        { table_number: 1, user_name: "Roberto Gomez" },
        { table_number: 2, user_name: "Linda Hammilton" },
        { table_number: 3, user_name: "Don Wright" },
        { table_number: 4, user_name: "Carlos Garcia" },
        { table_number: 5, user_name: "João Dedo" },
        { table_number: 6, user_name: "Quico Florindo" },
        { table_number: 7, user_name: "Ed Tomas" },
        { table_number: 8, user_name: "Carter Tobias" },
    ]);
};
