import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Contato } from '../database';
import { Icon } from '@rneui/themed';

interface ContatoItemProps {
    dados: Contato;
    onDelete: (id: number) => void;
    navigation: any;
}

const ContatoItem: React.FC<ContatoItemProps> = (props) => {

    const handleLigar = () => {
        const phoneNumber = props.dados.telefone;
        Linking.openURL(`tel:${phoneNumber}`).catch(err => console.error('Erro ao tentar ligar:', err));
    };

    const handleExcluir = () => {
        Alert.alert(
            "Confirmar Exclusão",
            `Você tem certeza que deseja excluir o contato "${props.dados.nome}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: () => props.onDelete(props.dados.id), style: "destructive" }
            ]
        );
    };

    const handleAlterar = () => {
        props.navigation.navigate("Alterar", { contato_id: props.dados.id });
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Icon name="person-circle-outline" type="ionicon" size={42} color="#4A90E2" />
                <View style={styles.textContainer}>
                    <Text style={styles.nome}>{props.dados.nome}</Text>
                    <Text style={styles.telefone}>{props.dados.telefone}</Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={handleLigar} style={styles.button}>
                    <Icon name="call-outline" type="ionicon" color="#34C759" size={26}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAlterar} style={styles.button}>
                    <Icon name="pencil-outline" type="ionicon" color="#FF9500" size={26}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleExcluir} style={styles.button}>
                    <Icon name="trash-outline" type="ionicon" color="#FF3B30" size={26}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textContainer: {
        marginLeft: 15,
        flex: 1,
    },
    nome: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    telefone: {
        fontSize: 15,
        color: '#888888',
        marginTop: 4,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginLeft: 18,
        padding: 5,
    },
});

export default ContatoItem;