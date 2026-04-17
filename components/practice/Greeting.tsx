  import { Text, View } from 'react-native';
                                                                                                                       
  export default function Greeting({ name }: {name: string}) {                                                                                 
    return (                                                                                                   
      <View>      
        <Text style={{ color: 'blue', fontSize:24 }}>{name}さん、おはようございます</Text>
      </View>
    );
  }
