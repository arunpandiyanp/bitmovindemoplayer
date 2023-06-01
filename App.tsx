
import {
  View,
} from 'react-native';
import VideoView from './videoView';



function App(){
 

 
  // Make sure to pass the `player` prop in `PlayerView`.
  return (
    <View style={{flex:1}}>
     <VideoView/>
    </View>
  );
}



export default App;


