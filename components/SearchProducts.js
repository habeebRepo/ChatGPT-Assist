import React,{useState} from 'react';
import { View, Text,SafeAreaView,StyleSheet,Image } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { LoaderScreen,Colors, Card } from 'react-native-ui-lib';
import Icon from '@expo/vector-icons/AntDesign';
import SearchResults from './SearchResults';

const API_URL = "https://astounding-chimera-14ba5e.netlify.app/api"


function HomeScreen({navigation}) {
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [product, setProduct] = useState("");
  const [currency, setCurrency] = useState("");
  const [result, setResult] = useState();

  const[loading,setLoading] = useState(false);
  const onSubmit =async() =>{  
    setResult(''); 
    if(loading){
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/product-suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, product,currency }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        if(response.status === 502){
          setLoading(false);
        throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        setLoading(false);
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      setResult(data.result);
      if(data.result){
        navigation.navigate("Search",{value:data.result})
      }
      setLoading(false);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setLoading(false);
    }
  }

  const onTryAgain = () => {
    setResult('');
  };

  return (
    <SafeAreaView style={styles.container}>

<View style={{backgroundColor:"#FFF",height:"100%"}}>
<Image source ={require('../assets/AI.jpg')}
                    style={{width:"100%",height:"43%"}}
                />
      <TextInput style={styles.textbox}
        label="Product"
        type="flat"
        value={product}
        onChangeText={text => setProduct(text)}
      />      
      <TextInput style={styles.textbox}
        label="Price From"
        value={priceMin}
        onChangeText={text => setPriceMin(text)}
      />
     <TextInput style={styles.textbox}
        label="Price To"
        value={priceMax}
        onChangeText={text => setPriceMax(text)}
      />
      <TextInput style={styles.textbox}
        label="Currency Type (USD, INR etc..)"
        value={currency}
        onChangeText={text => setCurrency(text)}
      />
      {loading &&
        <LoaderScreen message={'Please wait!!'} color={Colors.orange}/>
      }  
      <Button style={styles.button} mode="contained" onPress={onSubmit}>
        Search
      </Button>
               
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent: 'center',
    backgroundImage:'../assets/back.jpg'
  },
  button:{
    backgroundColor: '#ff7d27',
    color: '#fff',
  },
  textbox:{
    marginBottom:10,
    backgroundColor: '#fff'    
  },
  result:{
    color: '#fff',
    marginBottom:5
  }
});

export default HomeScreen;
