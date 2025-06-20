import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Alert, TouchableOpacity, StyleSheet,
  ImageBackground, Image, ScrollView, Dimensions, Share, Animated, Appearance
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import recipeImages from './recipeImages';
import { useColorScheme } from 'react-native';
import VideoPlayer from './VideoPlayer';
import MapComponent from './MapComponent';

const API_URL = ' https://40d9-168-0-100-253.ngrok-free.app';
const Stack = createNativeStackNavigator();
const userName = "Sarah";
const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 30;
const tacacaVideoId = '1089350483';

// SplashScreen
function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1551218808-94e220e084d2' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao App de Receitas</Text>
      </View>
    </ImageBackground>
  );
}

// LoginScreen
function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const loginPayload = { Email: usuario, Senha: senha };
    try {
      const response = await fetch(${API_URL}/api/login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
      });
      if (response.ok) {
        navigation.replace('Home');
      } else {
        const erro = await response.text();
        Alert.alert('Erro', erro || 'Usu�rio ou senha inv�lidos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Usu�rio" placeholderTextColor="#ccc"
            value={usuario} onChangeText={setUsuario}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Senha" placeholderTextColor="#ccc"
            value={senha} onChangeText={setSenha} secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>N�o tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// RegisterScreen
function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas n�o coincidem.');
      return;
    }
    try {
      const response = await fetch(${API_URL}/api/usuarios, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome, email: email, senha: senha }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Usu�rio cadastrado!');
        navigation.replace('Login');
      } else {
        const erro = await response.text();
        Alert.alert('Erro', erro || 'Erro ao cadastrar');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://imgs.search.brave.com/RUTbBOrE_GNYcG5IB4DFa0a3N9fyHhLBRSADSu2I-jo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/MzI3NjA2OS9wdC9m/b3RvL2JyYXppbGlh/bi1mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz15eGhD/emd0QnNXOFIxdzJ0/UGtUQVBDTVZwa0hT/OUp6Q1hhdUpLeDI0/OU5zPQ' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Criar Conta</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Nome" placeholderTextColor="#ccc"
            value={nome} onChangeText={setNome}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Email" placeholderTextColor="#ccc"
            value={email} onChangeText={setEmail}
            keyboardType="email-address" autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Senha" placeholderTextColor="#ccc"
            value={senha} onChangeText={setSenha} secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Confirmar Senha" placeholderTextColor="#ccc"
            value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
          <Text style={{ color: '#FF914D', fontWeight: 'bold', textDecorationLine: 'underline' }}>
            J� tem uma conta? Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// HomeScreen e RecipeDetails (COMPLETOS)
const chefTips = [
  "Para um sabor mais intenso, deixe os temperos marinar por pelo menos 2 horas.",
  "Use sempre ingredientes frescos para melhorar o sabor dos seus pratos.",
  "Cozinhe em fogo baixo para pratos que precisam de mais tempo para absorver os sabores.",
  "Experimente adicionar um pouco de lim�o para real�ar os sabores.",
  "Para pratos cremosos, adicione um pouco de leite de coco no final do cozimento.",
  "Sempre prove a comida durante o preparo para ajustar os temperos.",
  "Use ervas frescas para decorar e adicionar sabor aos seus pratos."
];

const initialRecipesCarousel = [
  { id: 1, name: 'Tacac�', image: recipeImages.tacaca, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Tucupi', 'Jambu', 'Goma de tapioca', 'Alho', 'Gengibre'] },
  { id: 2, name: 'Acaraj�', image: recipeImages.acaraje, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Feij�o fradinho', 'Cebola', 'Sal', 'Azeite de dend�', 'Camar�o seco'] },
  { id: 3, name: 'Pato no Tucupi', image: recipeImages.patoNoTucupi, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Pato', 'Tucupi', 'Jambu', 'Alho', 'Lim�o', 'Sal'] },
  { id: 4, name: 'Vatap�', image: recipeImages.vatapa, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['P�o', 'Camar�o seco', 'Leite de coco', 'Amendoim', 'Azeite de dend�'] },
  { id: 5, name: 'Caruru', image: recipeImages.caruru, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Quiabo', 'Camar�o seco', 'Cebola', 'Amendoim', 'Azeite de dend�'] },
  { id: 6, name: 'Moqueca', image: recipeImages.moqueca, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Peixe', 'Tomate', 'Piment�o', 'Leite de coco', 'Azeite de dend�'] },
  { id: 7, name: 'Bob� de Camar�o', image: recipeImages.BoboDeCamarao, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Camar�o', 'Mandioca', 'Leite de coco', 'Azeite de dend�', 'Cebola'] },
  { id: 8, name: 'Feijoada', image: recipeImages.Feijoada, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Feij�o preto', 'Carne seca', 'Lingui�a', 'Costelinha', 'Alho', 'Cebola'] },
];

const initialRecipesGrid = [
  { id: 1, name: 'Tacac�', image: recipeImages.tacaca, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Tucupi', 'Jambu', 'Goma de tapioca', 'Alho', 'Gengibre'] },
  { id: 2, name: 'Acaraj�', image: recipeImages.acaraje, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Feij�o fradinho', 'Cebola', 'Sal', 'Azeite de dend�', 'Camar�o seco'] },
  { id: 3, name: 'Pato no Tucupi', image: recipeImages.patoNoTucupi, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Pato', 'Tucupi', 'Jambu', 'Alho', 'Lim�o', 'Sal'] },
  { id: 4, name: 'Vatap�', image: recipeImages.vatapa, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 5, name: 'Caruru', image: recipeImages.caruru, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 6, name: 'Moqueca', image: recipeImages.moqueca, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 7, name: 'Bob� de Camar�o', image: recipeImages.BoboDeCamarao, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 8, name: 'Feijoada', image: recipeImages.Feijoada, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 9, name: 'Farofa', image: recipeImages.Farofa, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 10, name: 'Caldinho de Feij�o', image: recipeImages.CaldinhodeFeijao, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 11, name: 'Vatap� de Camar�o', image: recipeImages.VatapadeCamarao, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 12, name: 'Carne de Sol', image: recipeImages.CarnedeSol, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 13, name: 'Bai�o de Dois', image: recipeImages.BaiaodeDois, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 14, name: 'Pir�o', image: recipeImages.Pirao, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 15, name: 'Caldeirada', image: recipeImages.Caldeirada, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 16, name: 'Ensopado', image: recipeImages.Ensopado, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 17, name: 'Escondidinho', image: recipeImages.Escondidinho, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 18, name: 'Moqueca Capixaba', image: recipeImages.MoquecaCapixaba, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 19, name: 'Tapioca', image: recipeImages.Tapioca, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
  { id: 20, name: 'Quindim', image: recipeImages.Quindim, views: 0, rating: 0, ratingCount: 0,
    ingredients: ['Em breve...'] },
];

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipesGrid);
  const [favorites, setFavorites] = useState([]);
  const [recipesCarousel, setRecipesCarousel] = useState(initialRecipesCarousel);
  const [recipesGrid, setRecipesGrid] = useState(initialRecipesGrid);
  const [showTip, setShowTip] = useState(false);
  const [randomTip, setRandomTip] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const colorScheme = useColorScheme();

  useEffect(() => {
    const clearRecipeStorage = async () => {
      try {
        await AsyncStorage.removeItem('@recipes');
        console.log('AsyncStorage @recipes foi limpo!');
        // Se quiser limpar os favoritos tamb�m para um estado completamente novo:
        //await AsyncStorage.removeItem('@favorites');
        // console.log('AsyncStorage @favorites foi limpo!');
      } catch (e) {
        console.error('Falha ao limpar o AsyncStorage @recipes', e);
      }
    };

    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('@favorites');
        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (e) {
        console.error('Falha ao carregar favoritos', e);
      }
    };

    const loadRecipesData = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem('@recipes');
        if (savedRecipes !== null) {
          console.log('Dados de receitas carregados do AsyncStorage.');
          const parsedRecipes = JSON.parse(savedRecipes);
          setRecipesCarousel(parsedRecipes.slice(0, 8));
          setRecipesGrid(parsedRecipes);
          setFilteredRecipes(parsedRecipes);
        } else {
         
        }
      } catch (e) {
        console.error('Falha ao carregar dados das receitas', e);
      }
    };

    const initializeApp = async () => {


      await loadFavorites();
      await loadRecipesData();
    };

    initializeApp();

  }, []); 

  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(recipesGrid);
    } else {
      const filtered = recipesGrid.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, recipesGrid]);

  // Anima��o da dica do chef
  useEffect(() => {
    if (showTip) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [showTip]);

  const toggleFavorite = async (recipeId) => {
    try {
      let newFavorites;
      if (favorites.includes(recipeId)) {
        newFavorites = favorites.filter(id => id !== recipeId);
      } else {
        newFavorites = [...favorites, recipeId];
      }
      setFavorites(newFavorites);
      await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
    } catch (e) {
      console.error('Failed to save favorite', e);
    }
  };

  const showRandomTip = () => {
    const tip = chefTips[Math.floor(Math.random() * chefTips.length)];
    setRandomTip(tip);
    setShowTip(true);
    setTimeout(() => setShowTip(false), 5000);
  };

  const navigateToDetails = (clickedItem) => {
    const updatedRecipesGrid = recipesGrid.map(r =>
      r.id === clickedItem.id ? { ...r, views: (r.views || 0) + 1 } : r
    );

    setRecipesGrid(updatedRecipesGrid);
    setRecipesCarousel(updatedRecipesGrid.slice(0, 8));
    setFilteredRecipes(updatedRecipesGrid);

    AsyncStorage.setItem('@recipes', JSON.stringify(updatedRecipesGrid));

    const recipeToPass = updatedRecipesGrid.find(r => r.id === clickedItem.id);

    if (recipeToPass) {
      navigation.navigate('RecipeDetails', {
        recipe: recipeToPass,
        navigation,
        toggleFavorite,
        isFavorite: favorites.includes(clickedItem.id)
      });
    } else {
      console.error("Erro: N�o foi poss�vel encontrar a receita na grade atualizada. Navegando com dados potencialmente obsoletos.");
      navigation.navigate('RecipeDetails', {
        recipe: { ...clickedItem, views: (clickedItem.views || 0) + 1 },
        navigation,
        toggleFavorite,
        isFavorite: favorites.includes(clickedItem.id)
      });
    }
  };

  const dynamicStyles = colorScheme === 'dark' ? darkStyles : lightStyles;

  return (
    <ScrollView style={dynamicStyles.container}>
      {/* Header com foto usu�rio, sino e bot�o de tema */}
      <View style={dynamicStyles.header}>
        <Image
          source={{ uri: 'https://img.freepik.com/fotos-premium/diversidade-cativante-um-retrato-da-vida-real-em-4k-de-uma-mulher-americana-moderna-com-uma-expressao-surpresa_983420-41184.jpg' }}
          style={dynamicStyles.userPhoto}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={showRandomTip} style={{ marginRight: 15 }}>
            <Ionicons name="restaurant-outline" size={28} color={dynamicStyles.icon.color} />
          </TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color={dynamicStyles.icon.color} />
        </View>
      </View>

      {/* Dica do Chef (aparece com anima��o) */}
      {showTip && (
        <Animated.View style={[dynamicStyles.chefTipContainer, { opacity: fadeAnim }]}>
          <Text style={dynamicStyles.chefTipText}>????? Dica do Chef: {randomTip}</Text>
        </Animated.View>
      )}

      {/* Textos de boas vindas */}
      <View style={dynamicStyles.welcomeContainer}>
        <Text style={dynamicStyles.welcomeSmall}>Hello, {userName}</Text>
        <Text style={dynamicStyles.welcomeBig}>
          Make your own food stay at <Text style={dynamicStyles.yellow}>Home</Text>
        </Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={dynamicStyles.searchContainer}>
        <Ionicons name="search" size={20} color={dynamicStyles.icon.color} style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Search for recipes"
          style={dynamicStyles.searchInput}
          placeholderTextColor={dynamicStyles.placeholder.color}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Carrossel de receitas */}
      <View style={dynamicStyles.carouselContainer}>
        <Text style={dynamicStyles.title1}>Popular Recipes</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={dynamicStyles.carouselContent}
        >
          {recipesCarousel.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={dynamicStyles.recipeItem}
              onPress={() => navigateToDetails(item)}
            >
              <View style={dynamicStyles.recipeCircle}>
                {item.image ? (
                  <Image source={item.image} style={dynamicStyles.recipeImageSmall} />
                ) : (
                  <Ionicons name="fast-food-outline" size={24} color={dynamicStyles.icon.color} />
                )}
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  style={dynamicStyles.favoriteIcon}
                >
                  <Ionicons
                    name={favorites.includes(item.id) ? "heart" : "heart-outline"}
                    size={20}
                    color={favorites.includes(item.id) ? "#e74c3c" : "#fff"}
                  />
                </TouchableOpacity>
              </View>
              <Text style={dynamicStyles.recipeText}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="eye-outline" size={12} color={dynamicStyles.icon.color} />
                <Text style={{ fontSize: 10, marginLeft: 3, color: dynamicStyles.icon.color }}>
                  {item.views}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Se��o de favoritos */}
      {favorites.length > 0 && (
        <View style={dynamicStyles.sectionContainer}>
          <Text style={dynamicStyles.sectionTitle}>Your Favorites</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={dynamicStyles.carouselContent}
          >
            {recipesGrid
              .filter(recipe => favorites.includes(recipe.id))
              .map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={dynamicStyles.recipeItem}
                  onPress={() => navigateToDetails(item)}
                >
                  <View style={dynamicStyles.recipeCircle}>
                    {item.image ? (
                      <Image source={item.image} style={dynamicStyles.recipeImageSmall} />
                    ) : (
                      <Ionicons name="fast-food-outline" size={24} color={dynamicStyles.icon.color} />
                    )}
                  </View>
                  <Text style={dynamicStyles.recipeText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}

      {/* Se��o "All Recipes" com grid */}
      <View style={dynamicStyles.recipesSection}>
        <Text style={dynamicStyles.sectionTitle}>All Recipes</Text>

        {filteredRecipes.length === 0 ? (
          <Text style={dynamicStyles.noResultsText}>No recipes found</Text>
        ) : (
          <View style={dynamicStyles.gridContainer}>
            {filteredRecipes.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[dynamicStyles.gridItem, { width: itemWidth }]}
                  onPress={() => navigateToDetails(item)}
                >
                  <View style={[dynamicStyles.gridImageWrapper, { height: isEven ? 200 : 140 }]}>
                    {item.image ? (
                      <Image source={item.image} style={dynamicStyles.gridImage} />
                    ) : (
                      <View style={dynamicStyles.gridImagePlaceholder}>
                        <Ionicons name="fast-food-outline" size={40} color={dynamicStyles.icon.color} />
                      </View>
                    )}
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      style={dynamicStyles.gridFavoriteIcon}
                    >
                      <Ionicons
                        name={favorites.includes(item.id) ? "heart" : "heart-outline"}
                        size={20}
                        color={favorites.includes(item.id) ? "#e74c3c" : "#fff"}
                      />
                    </TouchableOpacity>
                    {item.rating > 0 && (
                      <View style={dynamicStyles.ratingBadge}>
                        <Ionicons name="star" size={12} color="gold" />
                        <Text style={dynamicStyles.ratingText}>{item.rating.toFixed(1)}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={dynamicStyles.gridItemText}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="eye-outline" size={12} color={dynamicStyles.icon.color} />
                    <Text style={{ fontSize: 10, marginLeft: 3, color: dynamicStyles.icon.color }}>
                      {item.views}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function RecipeDetails({ route }) {
  const { recipe, navigation, toggleFavorite, isFavorite } = route.params;

 

  const [currentStep, setCurrentStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [userRating, setUserRating] = useState(0); 
  const [tempRating, setTempRating] = useState(0); 
  const [isFav, setIsFav] = useState(isFavorite);
  const colorScheme = useColorScheme();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);

  
  const recipeSteps = {
    1: [ // Tacac�
      { id: 1, text: 'Ferva o tucupi com alho e gengibre por 30 minutos.', time: 30 },
      { id: 2, text: 'Cozinhe o jambu separado por 15 minutos.', time: 15 },
      { id: 3, text: 'Prepare a goma com �gua e aque�a at� virar um mingau.' },
      { id: 4, text: 'Monte o prato com goma no fundo, tucupi por cima e jambu.' },
      { id: 5, text: '? Enjoy your meal like a true Amazonian! ?' },
    ],
    2: [ // Acaraj�
      { id: 1, text: 'Deixe o feij�o fradinho de molho por 12 horas.', time: 720 },
      { id: 2, text: 'Bata o feij�o no liquidificador com cebola e sal.', time: 10 },
      { id: 3, text: 'Frite colheradas da massa em �leo quente.', time: 5 },
      { id: 4, text: 'Recheie com vatap�, caruru e camar�o seco.' },
      { id: 5, text: '? Bom apetite! ?' },
    ],
    3: [ // Pato no Tucupi
      { id: 1, text: 'Tempere o pato com sal, alho e lim�o por 2 horas.', time: 120 },
      { id: 2, text: 'Cozinhe o pato no tucupi por 40 minutos.', time: 40 },
      { id: 3, text: 'Adicione o jambu e cozinhe por mais 5 minutos.', time: 5 },
      { id: 4, text: 'Sirva com arroz branco e farinha de mandioca.' },
      { id: 5, text: '? Prato t�pico paraense! ?' },
    ],
    4: [ // Vatap�
      { id: 1, text: 'Cozinhe os camar�es secos por 15 minutos.', time: 15 },
      { id: 2, text: 'Bata no liquidificador p�o, amendoim e castanha.', time: 10 },
      { id: 3, text: 'Refogue a mistura com leite de coco e azeite de dend�.', time: 20 },
      { id: 4, text: 'Adicione os camar�es e cozinhe por mais 10 minutos.', time: 10 },
      { id: 5, text: '? Sirva quente com arroz branco! ?' },
    ],
    5: [ // Caruru
      { id: 1, text: 'Lave e cozinhe o quiabo por 10 minutos.', time: 10 },
      { id: 2, text: 'Refogue cebola, camar�o seco e amendoim.', time: 15 },
      { id: 3, text: 'Adicione o quiabo e o azeite de dend�.', time: 10 },
      { id: 4, text: 'Cozinhe em fogo baixo por 20 minutos.', time: 20 },
      { id: 5, text: '? Tradicional prato baiano! ?' },
    ],
    6: [ // Moqueca
      { id: 1, text: 'Tempere o peixe com lim�o, sal e alho por 30 minutos.', time: 30 },
      { id: 2, text: 'Monte camadas de cebola, tomate e piment�o.', time: 15 },
      { id: 3, text: 'Adicione leite de coco e azeite de dend�.', time: 10 },
      { id: 4, text: 'Cozinhe em fogo baixo por 25 minutos.', time: 25 },
      { id: 5, text: '? Sirva com arroz e pir�o! ?' },
    ],
    7: [ // Bob� de Camar�o
      { id: 1, text: 'Cozinhe a mandioca at� ficar macia.', time: 20 },
      { id: 2, text: 'Bata no liquidificador com leite de coco.', time: 5 },
      { id: 3, text: 'Refogue os camar�es com temperos.', time: 10 },
      { id: 4, text: 'Misture tudo e cozinhe por 15 minutos.', time: 15 },
      { id: 5, text: '? Prato cremoso e saboroso! ?' },
    ],
    8: [ // Feijoada
      { id: 1, text: 'Deixe o feij�o de molho por 8 horas.', time: 480 },
      { id: 2, text: 'Cozinhe as carnes separadamente.', time: 60 },
      { id: 3, text: 'Junte tudo e cozinhe por 2 horas.', time: 120 },
      { id: 4, text: 'Ajuste os temperos e sirva com acompanhamentos.' },
      { id: 5, text: '? O cl�ssico brasileiro! ?' },
    ],
  };

  // Timer logic
  useEffect(() => {
    let timer;
    if (running && secondsLeft > 0) {
      timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (running && secondsLeft === 0 && steps[currentStep] && steps[currentStep].time) { 
      setRunning(false);
      
      if (currentStep + 1 < steps.length) {
         
      }
    }
    return () => clearTimeout(timer);
  }, [secondsLeft, running, currentStep, steps]); 

  
  useEffect(() => {
    if (showRatingSuccess) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setShowRatingSuccess(false));
        }, 2000);
      });
    }
  }, [showRatingSuccess, fadeAnim]);

  const steps = recipeSteps[recipe.id] || [
    { id: 1, text: 'Prepare os ingredientes conforme a receita.' },
    { id: 2, text: 'Siga as instru��es de preparo tradicionais.' },
    { id: 3, text: 'Ajuste os temperos a gosto.' },
    { id: 4, text: 'Finalize e sirva conforme prefer�ncia.' },
    { id: 5, text: '? Bom apetite! ?' },
  ];

  const startStep = () => {
    if (!steps[currentStep]?.time) return; 
    setSecondsLeft(steps[currentStep].time * 60);
    setRunning(true);
  };

  const stopStep = () => setRunning(false);

  const skipTime = (skipSeconds) => {
    setSecondsLeft((prev) => Math.max(prev - skipSeconds, 0));
  };

  const nextStep = () => {
    setRunning(false); 
    setSecondsLeft(0);  
    if (currentStep + 1 < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return ${m}:${s};
  };

  const handleRating = async (ratingValue) => {
    setUserRating(ratingValue); 
    setTempRating(0); 

    try {
      const savedRecipesString = await AsyncStorage.getItem('@recipes');
      if (savedRecipesString) {
        let recipes = JSON.parse(savedRecipesString);
        const recipeIndex = recipes.findIndex(r => r.id === recipe.id);

        if (recipeIndex !== -1) {
          const currentRecipeData = recipes[recipeIndex];
          const oldRatingTotal = (currentRecipeData.rating || 0) * (currentRecipeData.ratingCount || 0);
          const newRatingCount = (currentRecipeData.ratingCount || 0) + 1;
          const newAverageRating = (oldRatingTotal + ratingValue) / newRatingCount;

          recipes[recipeIndex] = {
            ...currentRecipeData,
            rating: newAverageRating,
            ratingCount: newRatingCount,
          };

          await AsyncStorage.setItem('@recipes', JSON.stringify(recipes));
          setShowRatingSuccess(true);

         
        }
      }
    } catch (e) {
      console.error('Falha ao salvar avalia��o', e);
    }
  };

  const shareRecipe = async () => {
    try {
      await Share.share({
        message: Check out this delicious ${recipe.name} recipe on the Brazilian Recipes app!,
        url: 'https://example.com/recipes',
        title: Recipe: ${recipe.name}
      });
    } catch (error) {
      console.error('Error sharing recipe', error);
    }
  };

  const toggleFav = () => {
    setIsFav(!isFav);
    toggleFavorite(recipe.id);
  };
 // Fun��o para ler o passo atual em voz alta (apenas para Tacac�)
  const speakCurrentStep = () => {
    if (recipe.id !== 1) return; // Apenas para Tacac�
    
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      const currentStepText = steps[currentStep].text;
      Speech.speak(currentStepText, {
        language: 'en',
        rate: 0.7,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
      setIsSpeaking(true);
    }
  };
  const dynamicStyles = colorScheme === 'dark' ? darkStyles : lightStyles;
  const displayRating = recipe.ratingCount > 0 ? parseFloat(recipe.rating || 0).toFixed(1) : "N/A";
  const displayRatingCount = recipe.ratingCount || 0;


  return (
    <ScrollView style={{ flex: 1, backgroundColor: dynamicStyles.container.backgroundColor }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute', top: 50, left: 20, zIndex: 10,
          backgroundColor: dynamicStyles.card.backgroundColor, padding: 10, borderRadius: 20,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 5,
        }}
      >
        <Ionicons name="arrow-back" size={24} color={dynamicStyles.icon.color} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleFav}
        style={{
          position: 'absolute', top: 50, right: 20, zIndex: 10,
          backgroundColor: dynamicStyles.card.backgroundColor, padding: 10, borderRadius: 20,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 5,
        }}
      >
        <Ionicons name={isFav ? "heart" : "heart-outline"} size={24} color={isFav ? "#e74c3c" : dynamicStyles.icon.color} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={shareRecipe}
        style={{
          position: 'absolute', top: 50, right: 70, zIndex: 10,
          backgroundColor: dynamicStyles.card.backgroundColor, padding: 10, borderRadius: 20,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 5,
        }}
      >
        <Ionicons name="share-social-outline" size={24} color={dynamicStyles.icon.color} />
      </TouchableOpacity>

      <Image source={recipe.image} style={{ width: '100%', height: 300 }} />

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: dynamicStyles.text.color }}>
          {recipe.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 16, color: dynamicStyles.secondaryText.color, marginRight: 10 }}>
            Brazilian
          </Text>
          {recipe.ratingCount > 0 && ( 
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="star" size={16} color="gold" />
              <Text style={{ marginLeft: 3, color: dynamicStyles.text.color }}>
                {displayRating} ({displayRatingCount})
              </Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Ionicons name="eye-outline" size={16} color={dynamicStyles.secondaryText.color} />
            <Text style={{ marginLeft: 3, color: dynamicStyles.secondaryText.color }}>
              {recipe.views}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <View style={[dynamicStyles.infoBadge, { backgroundColor: '#f1c40f' }]}><Text style={dynamicStyles.infoText}>35{'\n'}Mins</Text></View>
          <View style={[dynamicStyles.infoBadge, { backgroundColor: '#2ecc71' }]}><Text style={dynamicStyles.infoText}>03{'\n'}Por��es</Text></View>
          <View style={[dynamicStyles.infoBadge, { backgroundColor: '#e74c3c' }]}><Text style={dynamicStyles.infoText}>103{'\n'}Cal</Text></View>
          <View style={[dynamicStyles.infoBadge, { backgroundColor: '#3498db' }]}><Text style={dynamicStyles.infoText}>F�cil</Text></View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={[dynamicStyles.sectionTitle, { color: dynamicStyles.text.color, marginBottom: 10 }]}>Rate this recipe</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                onPressIn={() => setTempRating(star)}
                onPressOut={() => setTempRating(0)}
              >
                <Ionicons
                  name={star <= (tempRating || userRating || Math.round(recipe.rating || 0)) ? "star" : "star-outline"}
                  size={32} color="gold" style={{ marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          {showRatingSuccess && (
            <Animated.View style={[dynamicStyles.ratingSuccess, { opacity: fadeAnim }]}>
              <Text style={dynamicStyles.ratingSuccessText}>Thanks for your rating!</Text>
            </Animated.View>
          )}
        </View>

        <Text style={[dynamicStyles.sectionTitle, { color: dynamicStyles.text.color }]}>Ingredients</Text>
        {(Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && recipe.ingredients[0].toLowerCase() !== 'em breve...') ? (
          <View style={{ marginBottom: 20 }}>
            {recipe.ingredients.map((item, idx) => (
              <Text key={idx} style={[dynamicStyles.bodyText, { color: dynamicStyles.text.color }]}>� {item}</Text>
            ))}
          </View>
        ) : (recipe.ingredients && recipe.ingredients[0] && recipe.ingredients[0].toLowerCase() === 'em breve...') ? (
            <Text style={[dynamicStyles.bodyText, { marginBottom: 20, color: dynamicStyles.text.color }]}>
              Ingredients coming soon...
            </Text>
        ) : (
          <Text style={[dynamicStyles.bodyText, { marginBottom: 20, color: dynamicStyles.text.color }]}>
            No ingredients registered for this recipe.
          </Text>
        )}

        <Text style={[dynamicStyles.sectionTitle, { color: dynamicStyles.text.color }]}>Preparation Steps</Text>
        {steps.map((step, index) => (
          <View key={step.id} style={{ marginBottom: 20 }}>
            {index < currentStep ? (
              <Text style={[dynamicStyles.completedStep, { color: dynamicStyles.secondaryText.color }]}>? {step.text}</Text>
            ) : index === currentStep ? (
              <>
                <Text style={[
                  dynamicStyles.currentStep,
                  { color: step.id === steps[steps.length - 1].id ? '#2ecc71' : dynamicStyles.text.color,
                    fontSize: step.id === steps[steps.length - 1].id ? 20 : 16,
                    fontWeight: step.id === steps[steps.length - 1].id ? 'bold' : 'normal',
                    marginTop: step.id === steps[steps.length - 1].id ? 20 : 0,
                    textAlign: 'left'
                  }
                ]}>
                
                  {step.text}
                </Text>
                
                {step.time && !running && (
                  <TouchableOpacity onPress={startStep} style={[dynamicStyles.actionButton, { backgroundColor: '#f1c40f' }]}>
                  
                    <Text style={[dynamicStyles.actionButtonText, { color: '#000' }]}>Start Step ({step.time} min)
                  
                    </Text>
                  </TouchableOpacity>
                )}
                {running && step.time && (
                  <>
                    <Text style={[dynamicStyles.timerText, { marginTop: 8, color: dynamicStyles.text.color }]}>
                      Time remaining: {formatTime(secondsLeft)}
                    </Text>
                    <View style={dynamicStyles.timerButtonsContainer}>
                      <TouchableOpacity onPress={stopStep} style={[dynamicStyles.timerButton, { backgroundColor: '#e74c3c' }]}>
                        <Text style={dynamicStyles.timerButtonText}>Stop</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => skipTime(30)} style={[dynamicStyles.timerButton, { backgroundColor: '#2980b9' }]}>
                        <Text style={dynamicStyles.timerButtonText}>Skip 30s</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {}
                {step.id !== steps[steps.length -1].id && (!step.time || (step.time && !running)) && (
                  <TouchableOpacity onPress={nextStep} style={[dynamicStyles.actionButton, { backgroundColor: '#3498db' }]}>
                    <Text style={[dynamicStyles.actionButtonText, { color: '#fff' }]}>Next Step</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
               <Text style={[dynamicStyles.bodyText, {color: dynamicStyles.secondaryText.color}]}>{step.text}</Text>
            )}
            
          </View>
        ))}
        <Text style={[dynamicStyles.bodyText, {marginTop: 10, marginBottom: 10,fontSize: 22,fontWeight: 'bold', color: dynamicStyles.text.color }]}>
           Learn with our chef
          </Text>
        {recipe.id === 1 && (
          <View style={{
            marginTop: 20,
            marginBottom: 20,
            width: '100%',
            alignItems: 'center',
            borderRadius: 10, // <--- Adicione esta linha com o valor que desejar (ex: 10, 15, 20)
            overflow: 'hidden', // <--- Essencial para que o borderRadius funcione em conte�do filho como o v�deo
          }}>
            <VideoPlayer videoId={tacacaVideoId} />
          </View>
)}

          <Text style={[dynamicStyles.bodyText, {marginTop: 10, marginBottom: 10,fontSize: 22,fontWeight: 'bold', color: dynamicStyles.text.color }]}>
            Buy or Try
          </Text>
           {recipe.id === 1 && ( // Condi��o para mostrar o mapa, se desejar
        <MapComponent /> 
      )}
      </View>
    </ScrollView>
  );
}

// --- App principal ---
export default function App() {
  const colorScheme = Appearance.getColorScheme();
  const navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- Styles do login/cadastro (igual aos seus) ---
const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    outline: 0,
  },
  button: {
    backgroundColor: '#FF914D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    marginTop: 15,
    color: '#FF914D',
    textDecorationLine: 'underline',
  },
});
const lightStyles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
header: {
flexDirection: 'row',
justifyContent: 'space-between',
paddingHorizontal: 20,
paddingTop: 50, 
alignItems: 'center',
marginBottom: 15,
},
userPhoto: {
width: 40,
height: 40,
borderRadius: 20,
backgroundColor: '#ccc', 
},
icon: {
color: '#333',
},
chefTipContainer: {
backgroundColor: '#f8f9fa', 
padding: 15,
marginHorizontal: 20,
borderRadius: 10,
borderLeftWidth: 5,
borderLeftColor: '#f1c40f', 
marginBottom: 15,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.1,
shadowRadius: 2,
elevation: 2,
},
chefTipText: {
fontSize: 14,
color: '#555', 
},
welcomeContainer: {
paddingHorizontal: 20,
marginBottom: 25,
},
welcomeSmall: {
fontSize: 14,
color: '#666',
},
welcomeBig: {
fontSize: 24,
fontWeight: 'bold',
color: '#333',
},
yellow: {
color: '#f1c40f', 
},
searchContainer: {
flexDirection: 'row',
backgroundColor: '#f0f0f0', 
marginHorizontal: 20,
borderRadius: 8,
alignItems: 'center',
height: 40, 
marginBottom: 30,
},
searchInput: {
flex: 1,
fontSize: 16,
paddingHorizontal: 10,
color: '#333',

},
placeholder: {
color: '#888', 
},
carouselContainer: { 
marginBottom: 20,

},
carouselContent: {
paddingTop: 10, 
paddingHorizontal: 20, 
alignItems: 'flex-start', 
},
sectionContainer: { 
paddingHorizontal: 20,
marginBottom: 20,
},
sectionTitle: {
fontSize: 22,
fontWeight: 'bold',
marginBottom: 15,
color: '#333', 
},
recipeItem: { 
width: 80, 
marginRight: 15,
alignItems: 'center',
},
recipeCircle: {
width: 70,
height: 70,
borderRadius: 35, 
backgroundColor: '#f8f8f8', 
justifyContent: 'center',
alignItems: 'center',
marginBottom: 5, 
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 3,
elevation: 3,
position: 'relative', 
},
favoriteIcon: {
position: 'absolute',
top: 5,
right: 5,
backgroundColor: 'rgba(0,0,0,0.3)', 
borderRadius: 10,
padding: 3,
},
recipeImageSmall: {
width: 70,
height: 70,
borderRadius: 35, 
},
recipeText: { 
fontSize: 12,
color: '#333',
textAlign: 'center',
fontWeight: '500', 
},
recipesSection: { 
paddingHorizontal: 20,
paddingBottom: 40, 
},
noResultsText: {
textAlign: 'center',
fontSize: 16,
color: '#888',
marginTop: 20,
},
gridContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-between', 
},
gridItem: { 
marginBottom: 25, 

},
gridImageWrapper: {
width: '100%', 
borderRadius: 15, 
overflow: 'hidden', 
backgroundColor: '#f8f8f8', 
marginBottom: 8, 
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 3,
elevation: 3,
position: 'relative', 
},
gridImage: {
width: '100%',
height: '100%', 
},
gridImagePlaceholder: { 
flex: 1,
backgroundColor: '#eee', 
justifyContent: 'center',
alignItems: 'center',
},
gridFavoriteIcon: {
position: 'absolute',
top: 10,
right: 10,
backgroundColor: 'rgba(0,0,0,0.3)', 
borderRadius: 10,
padding: 5,
},
gridItemText: { 
fontSize: 16,
fontWeight: '600', 
color: '#333',
textAlign: 'center',
},
ratingBadge: {
position: 'absolute',
bottom: 10,
left: 10,
backgroundColor: 'rgba(0,0,0,0.7)', 
borderRadius: 10,
paddingHorizontal: 6,
paddingVertical: 3,
flexDirection: 'row',
alignItems: 'center',
},
ratingText: { 
color: '#fff', 
fontSize: 12,
marginLeft: 3,
},

text: { 
color: '#333',
},
secondaryText: { 
color: '#777',
},
card: { 
backgroundColor: '#fff',
},
infoBadge: { 
paddingVertical: 8, 
paddingHorizontal: 5, 
borderRadius: 8,
minWidth: 70, 
alignItems: 'center',
justifyContent: 'center', 

},
infoText: { 
textAlign: 'center',
fontWeight: 'bold',
color: '#fff', 
fontSize: 11, 
lineHeight: 14, 
},

bodyText: { 
fontSize: 16,
lineHeight: 26, 
color: '#333',
textAlign: 'left', 
},
completedStep: { 
fontSize: 16,
textDecorationLine: 'line-through',
color: '#777', 
textAlign: 'left',
},
currentStep: { 
fontSize: 16,
fontWeight: 'bold', 

textAlign: 'left',
},
timerText: { 
fontSize: 18,
color: '#f39c12', 
textAlign: 'center',
fontWeight: 'bold',
marginVertical: 5,
},
timerButtonsContainer: { 
flexDirection: 'row',
marginTop: 10,
justifyContent: 'space-around', // Distribui os bot�es
},
timerButton: { 
paddingVertical: 10,
paddingHorizontal: 15,
borderRadius: 8,

marginHorizontal: 5,
alignItems: 'center',
minWidth: 100, 
},
timerButtonText: { 
color: 'white',
fontWeight: 'bold',
},
actionButton: {
marginTop: 10,
paddingVertical: 12,
paddingHorizontal: 20,
borderRadius: 8,
alignItems: 'center',

},
actionButtonText: { 
fontWeight: 'bold',
fontSize: 16,
// color � definido inline
},
ratingSuccess: {
backgroundColor: '#2ecc71', 
padding: 10,
borderRadius: 8,
marginTop: 10,
alignItems: 'center',
},
ratingSuccessText: {
color: 'white',
fontWeight: 'bold',
},
});

// Dark theme styles
const darkStyles = StyleSheet.create({
...lightStyles, 
container: {
...lightStyles.container,
backgroundColor: '#121212', 
},
icon: { 
color: '#fff',
},
chefTipContainer: {
...lightStyles.chefTipContainer,
backgroundColor: '#1e1e1e',
borderLeftColor: '#f1c40f', 
shadowColor: '#000', 
},
chefTipText: {
...lightStyles.chefTipText,
color: '#eee', 
},
welcomeSmall: {
...lightStyles.welcomeSmall,
color: '#aaa', 
},
welcomeBig: {
...lightStyles.welcomeBig,
color: '#fff', 
},
searchContainer: {
...lightStyles.searchContainer,
backgroundColor: '#1e1e1e', 
},
searchInput: {
...lightStyles.searchInput,
color: '#fff',
},
placeholder: {
color: '#888',
},
recipeCircle: { 
...lightStyles.recipeCircle,
backgroundColor: '#1e1e1e',
shadowColor: '#000',
},
favoriteIcon: { 
  ...lightStyles.favoriteIcon,
  
},
recipeText: { 
...lightStyles.recipeText,
color: '#eee', 
},
sectionTitle: { 
...lightStyles.sectionTitle,
color: '#fff',
},
title1:{
  marginLeft: 25,
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 15,
  color: '#fff',
},
gridImageWrapper: { 
...lightStyles.gridImageWrapper,
backgroundColor: '#1e1e1e', 
shadowColor: '#000',
},
gridImagePlaceholder: { 
...lightStyles.gridImagePlaceholder,
backgroundColor: '#1e1e1e',
},
gridFavoriteIcon: { 
  ...lightStyles.gridFavoriteIcon,
  
},
gridItemText: { 
...lightStyles.gridItemText,
color: '#eee', 
},
ratingBadge: { 
  ...lightStyles.ratingBadge,
},
ratingText: { 
  ...lightStyles.ratingText,
},
noResultsText: {
  ...lightStyles.noResultsText,
  color: '#aaa',
},

text: { 
color: '#fff',
},
secondaryText: { 
color: '#aaa',
},
card: { 
backgroundColor: '#1e1e1e',
},
infoBadge: { 
  ...lightStyles.infoBadge,
},
bodyText: { 
...lightStyles.bodyText,
color: '#eee', 
},
completedStep: { 
  ...lightStyles.completedStep,
  color: '#777', 
},
currentStep: { 
  ...lightStyles.currentStep,
 
},
timerText: { 
  ...lightStyles.timerText,
  color: '#f39c12', 
},
timerButton: { 
  ...lightStyles.timerButton,
},
actionButton: {
  ...lightStyles.actionButton,
  
},
ratingSuccess: { 
  ...lightStyles.ratingSuccess,
},
});