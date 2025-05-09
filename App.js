import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: '',
      Details: {
        path: 'details',
        parse: {
          id: (id) => `${id}`,
        },
      },
    },
  },
};

function HomeScreen() {
  const [url, setUrl] = useState('myapp://details?id=123');

  const openLink = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testar Deep Linking</Text>
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="Digite um deep link"
      />
      <Button title="Abrir Link" onPress={openLink} />
    </View>
  );
}

function DetailsScreen() {
  const route = useRoute();
  const id = route?.params?.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Detalhes</Text>
      <Text>ID Recebido: {id ?? 'Nenhum ID'}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
});
