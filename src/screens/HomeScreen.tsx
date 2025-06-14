import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FAB } from '@rneui/themed';
import { getContatos, deleteContato, initDB, Contato, getDbConnection } from '../database';
import ContatoItem from '../components/ContatoItem';

const db = getDbConnection();

export default function HomeScreen({ navigation }: { navigation: any }) {
    const [contatos, setContatos] = useState<Contato[]>([]);
    const [busca, setBusca] = useState('');

    const loadContatos = useCallback(async () => {
        try {
            await initDB(db);
            const data = await getContatos(db);
            setContatos(data);
        } catch (err) {
            console.error('Erro ao buscar contatos:', err);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadContatos();
        }, [loadContatos])
    );

    const handleDelete = async (id: number) => {
        try {
            await deleteContato(db, id);
            loadContatos();
        } catch (err) {
            console.error(`Erro ao excluir contato ${id}:`, err);
        }
    };

    const contatosFiltrados = contatos.filter(contato =>
        contato.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar contato..."
                placeholderTextColor="#999"
                value={busca}
                onChangeText={setBusca}
            />
            {contatosFiltrados.length > 0 ? (
                <FlatList
                    data={contatosFiltrados}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ContatoItem
                            dados={item}
                            onDelete={handleDelete}
                            navigation={navigation}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhum contato encontrado.</Text>
                </View>
            )}

            <FAB
                visible={true}
                icon={{ name: 'add', color: 'white' }}
                color="#4A90E2"
                placement="right"
                onPress={() => navigation.navigate('Adicionar')}
                size="large"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    searchInput: {
        height: 50,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 20,
        margin: 16,
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        color: '#333',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888888',
    },
});