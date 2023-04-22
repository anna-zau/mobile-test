import { View,  TouchableOpacity} from "react-native";
import { Feather  } from '@expo/vector-icons'; 

export default function  HeaderBackButton  ({ onPress })  {
    return (
      <View style={{ flexDirection: 'row' , marginLeft: 16}}>
  
      <TouchableOpacity onPress={onPress}>
        <Feather name="arrow-left" size={24} color="#212121" />
      </TouchableOpacity>
      </View>
  
    );
  };