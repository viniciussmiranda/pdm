import { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [idade, setIdade] = useState<string>('');
  const [anoNascimento, setAnoNascimento] = useState<number | null>(null);

  function calcularAno() {
    const idadeNumero = Number(idade);

    if (!idade || isNaN(idadeNumero) || idadeNumero <= 0) {
      Alert.alert('Erro', 'digite uma idade válida');
      return;
    }

    const anoAtual = new Date().getFullYear();
    const resultado = anoAtual - idadeNumero;

    setAnoNascimento(resultado);
  }

  return (
    <ThemedView style={styles.container} lightColor="#ffffff">
      <ThemedText type="title" style={styles.titulo}>
        Calculadora de ano de nascimento
      </ThemedText>

      <TextInput
        placeholder="digite sua idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Button title="calcular" onPress={calcularAno} color="#73e913" />

      {anoNascimento !== null && (
        <ThemedText style={styles.resultado}>
          Você nasceu em {anoNascimento}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,        
    justifyContent: 'center', 
    padding: 20,
    gap: 15,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  resultado: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});