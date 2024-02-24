import {View, Text, StyleSheet} from 'react-native';

export default props => {
  return (
    <View style={displayStyles.display}>
      <Text style={displayStyles.displayValue}>
        {props.value}
      </Text>
    </View> 
  )
}

const displayStyles = StyleSheet.create({
  display: {
    flex: 1,
    padding: 16,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#000000'
  },
  displayValue: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'right'
  }
})