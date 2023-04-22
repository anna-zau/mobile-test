import { View,  TouchableOpacity} from "react-native";
import { Feather  } from '@expo/vector-icons'; 


export default function HeaderLogoutButton ({ onPress }) {
    return (
      <View style={{ flexDirection: 'row' , marginRight: 16}}>
      <TouchableOpacity onPress={onPress}>
        <Feather name="log-out" size={24} color="#212121" />
      </TouchableOpacity>
      </View>
    );
  };

  