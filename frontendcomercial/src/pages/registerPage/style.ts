import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16,
    backgroundColor: '#f5f5f5',
    width: 400, 
  },
  logo: {
    width: 230, 
    height: 100, 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  inputContainer: {
    width: '100%', 
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    maxWidth: '100%', 
  },
  button: {
    marginTop: 20,
    backgroundColor: '#a3e200',
    width: '60%',
    borderRadius: 13,
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#a3e200',
  },
});