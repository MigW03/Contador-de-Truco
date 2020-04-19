import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert} from 'react-native';

export default function App(){
	const [RPoints, setRPoints] = useState(0)
	const [LPoints, setLPoints] = useState(0)

	const [theme, setTheme] = useState('escuro')
	const [themeText, setThemeText] = useState('black')
	const [background, setBackground] = useState('white')
	const [themeButton, setThemeButton] = useState('rgb(64, 64, 64)')
	const [corR, setCorR] = useState('blue')
	const [corL, setCorL] = useState('red')
	const [status, setStatus] = useState('dark-content')

	function plusR(){
		setRPoints(RPoints + 1)
	}

	function plusL(){
		setLPoints(LPoints + 1)
	}

	function minusR(){
		if(RPoints > 0){
			setRPoints(RPoints - 1)
		}
	}

	function minusL(){
		if(LPoints > 0){
			setLPoints(LPoints - 1)
		}
	}

  function resetPnts(){
	  Alert.alert(
		  'Zerar',
		  'Deseja zerar a pontuação do jogo?',
		  [
			  {text: 'Cancelar'},
			  {text: 'OK', onPress: () => {
				  setRPoints(0)
				  setLPoints(0)
			  }
			}
		  ],
		  {cancelable: false}
	  )
  }

  function themeChange(){
	  switch(theme){
		case 'escuro':
			setTheme('claro')
			setThemeText('white')
			setBackground('black')
			setThemeButton('white')
			setCorR('rgb(11, 255, 1)')
			setCorL('rgb(255, 131, 0)')
			setStatus('light-content')
			break
		case 'claro':
			setTheme('escuro')
			setThemeText('black')
			setBackground('white')
			setThemeButton('rgb(64, 64, 64)')
			setCorR('blue')
			setCorL('red')
			setStatus('dark-content')
			break
			  
	  }
  }


	return (
		<View style={[styles.container, {backgroundColor: background}]}>
			<StatusBar backgroundColor={background} barStyle={status}/>
			<View style={[styles.theme, {width: '100%'}]}>
				<TouchableOpacity style={[styles.resetButton, {borderColor: themeButton}]} onPress={resetPnts}>
					<Text style={[styles.themeText, {color: themeText}]}>Zerar Pontuação</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.themeButton, {borderColor: themeButton}]} onPress={themeChange}>
					<Text style={[styles.themeText, {color: themeText}]}>Modo {theme}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.names}>
				<Text style={[{fontSize: 40, color: corL}]}>Nós</Text>
				<Text style={[{fontSize: 40, color: corR}]}>Eles</Text>
			</View>
			<View style={styles.pnts}>
				<Text style={[styles.pntsText, styles.pntL, {color: corL}]}>{LPoints}</Text>
				<Text style={[styles.pntsText, styles.pntR, {color: corR}]}>{RPoints}</Text>
			</View>
			<View style={styles.buttons}>
				<View style={styles.leftButtons}>
					<TouchableOpacity onPress={plusL}>
						<Text style={[styles.Buttons, {color: background, backgroundColor: corL}]}>+</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={minusL}>
						<Text style={[styles.Buttons, {color: background, backgroundColor: corL}]}>-</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.rightButtons]}>
					<TouchableOpacity onPress={plusR}>
						<Text style={[styles.Buttons, {color: background, backgroundColor: corR}]}>+</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={minusR}>
						<Text style={[styles.Buttons, {color: background, backgroundColor: corR}]}>-</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  names: {
	flex: 1,
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
	alignSelf: 'stretch',
  },
  pnts:{
	flex: 2,
	flexDirection: 'row',
	alignItems: 'center',
  },
  pntsText:{
	flex: 1,
	fontSize: 40,
	textAlign: 'center'
  },
  pntL:{
	borderRightWidth: 1,
	borderColor: 'grey',
  },
  pntR:{
	borderLeftWidth: 1,
	borderColor: 'grey',
  },
  buttons:{
	flex: 5,
	flexDirection: 'row',
	alignItems: 'center'
  },
  leftButtons:{
	flex: 1,
	flexDirection: 'column',
  },
  Buttons:{
	alignItems: 'center',
	fontSize: 40,
	textAlign: 'center',
	margin: 8,
	borderRadius: 20,
	overflow: 'hidden'
  },
  rightButtons:{
	flex: 1,
  },
  theme: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between'
  },
  themeText: {
	margin: 4
  },
  resetButton: {
	  alignSelf: 'flex-start',
	  borderWidth: 1,
	  borderRadius: 5,
	  margin: 7,
  },
  themeButton: {
	  alignSelf: 'flex-end',
	  borderWidth: 1,
	  borderRadius: 5,
	  margin: 7
  }
});
