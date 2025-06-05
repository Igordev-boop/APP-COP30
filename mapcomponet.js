import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapComponent() {
  // URL com marcador vermelho para o Mercado Ver-o-Peso, Belém - PA
  const embedUrl = "https://www.google.com/maps?q=Mercado+Ver-o-Peso,Belém,PA&output=embed";

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={styles.iframe}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa Ver-o-Peso"
        ></iframe>
      ) : (
        <WebView
          source={{ uri: embedUrl }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#eee',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
  iframe: {
    border: 'none',
  },
});