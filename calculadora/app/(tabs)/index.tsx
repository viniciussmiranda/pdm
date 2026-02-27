import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [idade, setIdade] = useState<string>('');
  const [dia, setDia] = useState<string>('');
  const [mes, setMes] = useState<string>('');
  const [anoNascimento, setAnoNascimento] = useState<number | null>(null);

  useEffect(() => {
    calcularAno();
  }, [idade, dia, mes]); 

  function calcularAno() {
    const idadeNum = Number(idade);
    const diaNum = Number(dia);
    const mesNum = Number(mes);

    const idadeValida = idade !== '' && !isNaN(idadeNum) && idadeNum > 0;
    const dataValida =
      dia !== '' &&
      mes !== '' &&
      !isNaN(diaNum) &&
      !isNaN(mesNum) &&
      diaNum >= 1 && diaNum <= 31 &&
      mesNum >= 1 && mesNum <= 12;

    if (!idadeValida || !dataValida) {
      setAnoNascimento(null);
      return;
    }

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

   
    const aniversarioJaPassou =
      mesNum < mesAtual || (mesNum === mesAtual && diaNum <= diaAtual);

    const resultado = aniversarioJaPassou
      ? anoAtual - idadeNum
      : anoAtual - idadeNum - 1;

    setAnoNascimento(resultado);
  }

  return (
    <ThemedView style={styles.container} lightColor="#ffffff">
      <ThemedText type="title" style={styles.titulo}>
        Calculadora de ano de nascimento
      </ThemedText>

      <TextInput
        placeholder="Digite sua idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <ThemedText style={styles.subtitulo}>
        Data do seu aniversário
      </ThemedText>

      
      <View style={styles.linha}>
        <TextInput
          placeholder="Dia"
          value={dia}
          onChangeText={setDia}
          keyboardType="numeric"
          style={styles.inputPequeno}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Mês"
          value={mes}
          onChangeText={setMes}
          keyboardType="numeric"
          style={styles.inputPequeno}
          placeholderTextColor="#999"
        />
      </View>

      {anoNascimento !== null && (
        <ThemedText style={styles.resultado}>
          Seu ano de nascimento é: {anoNascimento}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20,
    gap: 20,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 10,
  },
  linha: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },

  inputPequeno: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});