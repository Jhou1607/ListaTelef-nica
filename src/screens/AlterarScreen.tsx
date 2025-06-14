import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { getContatoById, updateContato, getDbConnection } from '../database';

const db = getDbConnection();

export default function AlterarScreen({ navigation, route }: { navigation: any, route: any }) {
    const { contato_id } = route.params;
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        getContatoById(db, contato_id)
            .then(contato => {
                if (contato) {
                    setNome(contato.nome);
                    setTelefone(contato.telefone);
                }
            })
            .catch(() => {
                Alert.alert("Erro", "Não foi possível carregar os dados do contato.");
                navigation.goBack();
            });
    }, [contato_id]);

    const handleAtualizar = () => {
        if (nome.trim() === '' || telefone.trim() === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        updateContato(db, contato_id, nome, telefone)
            .then(() => {
                Alert.alert('Sucesso', 'Contato atualizado!');
                navigation.goBack();
            })
            .catch(() => {
                Alert.alert('Erro', 'Não foi possível atualizar o contato.');
            });
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
            <TouchableOpacity style={styles.button} onPress={handleAtualizar}>
                <Text style={styles.buttonText}>Atualizar Contato</Text>
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