import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {

  const [numero, setNumero] = useState('00:00:00');
  const [botao, setBotao] = useState('Iniciar');
  const [ultimo, setUltimo] = useState(null);

  function iniciar() {
    if(timer !== null){
      //aqui vai parar o timer
      clearInterval(timer);
      timer = null;

      setBotao('Iniciar');
    }else {
      //começar a girar o timer
      timer = setInterval(() => {

        ss++;

        if(ss == 60) {
          ss = 0;
          mm++;
        }
        if(mm == 60) {
          mm = 0;
          hh++;
        }

        let format =
        (hh < 10 ? '0' + hh : hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss)

        setNumero(format)

      }, 1000)

      setBotao('Parar')
    }
  }

  function limpar() {
    if(timer !== null) {
      //parar o timer
      clearInterval(timer);
      timer = null;
    }
      
    setUltimo(numero)
    setNumero('00:00:00')
    ss = 0;
    mm = 0;
    hh = 0;

    setBotao('Iniciar')
    
  }

  return (
    <View style={styles.container} >

      <Image 
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer} > {numero} </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnTexto}> {botao} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTexto}>
          { ultimo ? `Último tempo: ${ultimo}` : '' }
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020e26'
  },
  timer: {
    marginTop: -165,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto: {
    color: '#020e26',
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer: {
    marginTop: 40,
  },
  footerTexto: {
    fontSize: 23,
    color: '#FFF',
    fontStyle: 'italic'
  }
})