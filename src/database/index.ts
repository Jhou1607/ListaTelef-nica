import * as SQLite from 'expo-sqlite';

export interface Contato {
    id: number;
    nome: string;
    telefone: string;
}

export function getDbConnection() {
    const db = SQLite.openDatabaseSync('contatos.db');
    return db;
}

export async function initDB(db: SQLite.SQLiteDatabase): Promise<void> {
    const query = `CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL
    );`;
    await db.execAsync(query);
}

export async function addContato(db: SQLite.SQLiteDatabase, nome: string, telefone: string): Promise<SQLite.SQLiteRunResult> {
    const query = 'INSERT INTO contatos (nome, telefone) VALUES (?, ?);';
    return await db.runAsync(query, nome, telefone);
}

export async function getContatos(db: SQLite.SQLiteDatabase): Promise<Contato[]> {
    const query = 'SELECT * FROM contatos ORDER BY nome ASC;';
    const allRows = await db.getAllAsync<Contato>(query);
    return allRows;
}

export async function getContatoById(db: SQLite.SQLiteDatabase, id: number): Promise<Contato | null> {
    const query = 'SELECT * FROM contatos WHERE id = ?;';
    const firstRow = await db.getFirstAsync<Contato>(query, id);
    return firstRow ?? null;
}

export async function updateContato(db: SQLite.SQLiteDatabase, id: number, nome: string, telefone: string): Promise<SQLite.SQLiteRunResult> {
    const query = 'UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?;';
    return await db.runAsync(query, nome, telefone, id);
}

export async function deleteContato(db: SQLite.SQLiteDatabase, id: number): Promise<SQLite.SQLiteRunResult> {
    const query = 'DELETE FROM contatos WHERE id = ?;';
    return await db.runAsync(query, id);
}