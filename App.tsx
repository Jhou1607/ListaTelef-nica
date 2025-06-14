import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import AdicionarScreen from './src/screens/AdicionarScreen';
import AlterarScreen from './src/screens/AlterarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4A90E2',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Lista Telefônica' }}
                />
                <Stack.Screen
                    name="Adicionar"
                    component={AdicionarScreen}
                    options={{ title: 'Adicionar Contato' }}
                />
                <Stack.Screen
                    name="Alterar"
                    component={AlterarScreen}
                    options={{ title: 'Alterar Contato' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}