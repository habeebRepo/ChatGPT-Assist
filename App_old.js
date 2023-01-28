import React,{useState} from 'react';
import { View, Text,SafeAreaView,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput,Button } from 'react-native-paper';

const API_URL = "https://astounding-chimera-14ba5e.netlify.app/api"


function HomeScreen() {
  const [technology,setTechnology] = useState("");
  const[loading,setLoading] = useState(false);
  const [result, setResult] = useState();

  const onSubmit =async() =>{   
    
    
    if(loading){
        return;
    }
    setLoading(true);  
    try {
      const response = await fetch(`${API_URL}/interview-questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ technology: technology }),
      });

      const data = await response.json();
      
      if (response.status !== 200) {
        setLoading(false);
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setLoading(false);
      
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      setLoading(false);
      alert(error.message);
    }
  }

  const onTryAgain = () => {
    setResult('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>Looking for {technology} questions💡</Text>       
      </View>
    );
  }
  
  if (result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Here are some {technology} questions 💡
        </Text>
        <Text style={styles.result}>{result}</Text>
        <Button onPress={onTryAgain} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput
        label="Technology"
        value={technology}
        onChangeText={text => setTechnology(text)}
      />
      <Button style={styles.button} mode="contained" onPress={onSubmit}>
        Press me
      </Button>
    </View> 
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10,
    justifyContent: 'center',
  },
  button:{
    margin:10,
  }
});

export default App;
