import React from 'react';
import {  Text,SafeAreaView,StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';


function SearchResults({navigation,route}) {
  const result = route.params.value;
  var list = result.split('\n');
  list =  list.filter(item=>item);
  console.log(result.split('\n'));
  return (
    <SafeAreaView style={styles.container}>
        
        
    <Text style={styles.result}>
      Here are some Suggestions 💡
    </Text>
    {
            list.map((x)=>{return(
                <Card style={styles.card} >
                    <Card.Content>      
                        <Text variant="bodyMedium">{x}</Text>
                    </Card.Content>
                </Card>
            );
                
            })
        }
    {/* <Button onPress={onTryAgain} style={styles.button}>
      <Text style={styles.button}>Try again</Text>
    </Button> */}
     <Button 
     style={styles.button}
        title='Search Again'
        onPress={() => {
          navigation.dispatch(
            StackActions.replace("SearchProducts")
          );
        }}
      > <Text style={styles.button}>Try again</Text>
      </Button>
  </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent: 'center',
    backgroundImage:'../assets/back.jpg'
  },
  button:{
    margin:10,
    backgroundColor: '#ff7d27',
    color: '#fff' 
  },
  textbox:{
    marginBottom:10,
    backgroundColor: '#fff'    
  },
  result:{   
    marginBottom:5,
    color:'black'
  },
  card:{
    margin:5
  }

});

export default SearchResults;
