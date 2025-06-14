import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { addContato, getDbConnection } from '../database';

const db = getDbConnection();

export default function AdicionarScreen({ navigation }: { navigation: any }) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSalvar = async () => {
        if (nome.trim() === '' || telefone.trim() === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            await addContato(db, nome, telefone);
            Alert.alert('Sucesso', 'Contato adicionado!');
            navigation.goBack();
        } catch (err) {
            console.error('Erro ao adicionar contato:', err);
            Alert.alert('Erro', 'Não foi possível adicionar o contato.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome do Contato"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#999"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                <Text style={styles.buttonText}>Salvar Contato</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    input: {
        height: 55,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});