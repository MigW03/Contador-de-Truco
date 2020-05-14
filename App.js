import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert, AsyncStorage, Modal, TextInput} from 'react-native';

export default function App(){
	const [RPoints, setRPoints] = useState(0)
	const [LPoints, setLPoints] = useState(0)
	const [leftTeam, setLeftTeam] = useState('')
	const [rightTeam, setRightTeam] = useState('')
	const [modalopen, setModalOpen] = useState(false)
	const [inputData, setInputData] = useState('')
	const [teamOnModalTitle, setTeamOnModalTitle] = useState('')

	const [theme, setTheme] = useState('escuro')
	const [themeText, setThemeText] = useState('black')
	const [background, setBackground] = useState('white')
	const [themeButton, setThemeButton] = useState('rgb(64, 64, 64)')
	const [corR, setCorR] = useState('blue')
	const [corL, setCorL] = useState('red')
	const [status, setStatus] = useState('dark-content')

	useEffect(() => {
		getNames()
	}, [])

	async function getNames(){
		try {
			AsyncStorage.getItem('leftName').then(data => {
				(data) ? setLeftTeam(data) : setLeftTeam('Nós')
			})
			AsyncStorage.getItem('rightName').then(data => {
				(data) ? setRightTeam(data) : setRightTeam('Eles')
			})
		} catch (error) {
			Alert.alert('Erro ao pegar dados', 'Houve um erro para recuperar os nomes das equipes!!')
			setLeftTeam('Nós')
			setRightTeam('Eles')
		}
	}

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

  function resetNames(){
	  Alert.alert(
		  'Restaurar equipes',
		  `Você deseja restaurar os nomes das equipes para o padrão: \n${leftTeam} => Nós\n${rightTeam} => Eles`,
		  [
			  {text: 'Não'},
			  {
				  text: 'Sim',
				  onPress: () => {
					AsyncStorage.removeItem('leftName')
					AsyncStorage.removeItem('rightName')
					setLeftTeam('Nós')
					setRightTeam('Eles')
				  }
			  }
		  ]
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

  function openModal(nameToModalTitle){
	  setModalOpen(true)
	  setTeamOnModalTitle(nameToModalTitle)
  }

  function sendNameToSave(newName){
	  switch(teamOnModalTitle){
		case leftTeam:
			setLeftTeam(newName)
			saveNames('leftName', newName)
			break
		case rightTeam:
			setRightTeam(newName)
			saveNames('rightName', newName)
			break
	  }
	  setModalOpen(false)
  }

  async function saveNames(keyToSave, nameToSave){
	  try {
		  await AsyncStorage.setItem(keyToSave, nameToSave)
	  } catch (error) {
		  alert.alert('Erro', 'Houve um erro para salvar o nome dos times, por favor tente novamente mais tarde!')
	  }
  }


	return (
		<View style={[styles.container, {backgroundColor: background}]}>
			<StatusBar backgroundColor={background} barStyle={status}/>
			<View style={[styles.theme, {width: '100%'}]}>
				<TouchableOpacity style={[styles.resetButton, {borderColor: themeButton}]} onPress={resetPnts}>
					<Text style={[styles.themeText, {color: themeText}]}>Zerar Pontuação</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.resetButton, {borderColor: themeButton}]} onPress={resetNames}>
					<Text style={[styles.themeText, {color: themeText}]}>Restaurar equipes</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.themeButton, {borderColor: themeButton}]} onPress={themeChange}>
					<Text style={[styles.themeText, {color: themeText}]}>Modo {theme}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.names}>
				<Text style={[{flex: 1,fontSize: 40, color: corL, maxWidth: '50%', textAlign: 'center'}]} onPress={() => openModal(leftTeam)}>{leftTeam}</Text>
				<Text style={[{flex: 1,fontSize: 40, color: corR, maxWidth: '50%', textAlign: 'center'}]} onPress={() => openModal(rightTeam)}>{rightTeam}</Text>
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

			<Modal
				visible = {modalopen}
				animationType = 'fade'
				transparent = {true}
				statusBarTranslucent = {true}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalMainView}>
						<Text style={styles.modalTitle}>Alterar nome da equipe "{teamOnModalTitle}"</Text>
						<View style={styles.modalInputView}>
							<TextInput
								style={styles.modalInput}
								placeholder = 'Novo nome'
								value = {inputData}
								onChangeText = {text => setInputData(text)}
							/>
						</View>
						<View style={styles.modalButtonView}>
							<TouchableOpacity style={styles.modalCancelButton} onPress={() => {
								setModalOpen(false)
								setInputData('')
							}}>
								<Text style={styles.modalCancelText}>Cancelar</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.modalSaveButton} onPress={() => {
								if(inputData){
									sendNameToSave(inputData)
									setInputData('')
								}else{
									Alert.alert('Digite algo', `Por favor, para mudar o nome da equipe "${teamOnModalTitle}" digite um novo nome!`)
								}
							}}>
								<Text style={styles.modalSaveText}>Salvar nome</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
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
	justifyContent: 'space-between',
	marginBottom: 12
  },
  themeText: {
	margin: 4
  },
  resetButton: {
	borderWidth: 1,
	borderRadius: 5,
	margin: 7,
  },
  themeButton: {
	borderWidth: 1,
	borderRadius: 5,
	margin: 7
  },
  modalContainer: {
	flex: 1,
	backgroundColor: '#111111BD',
	alignItems: 'center',
	justifyContent: 'center'
  },
  modalMainView: {
	width: '75%',
	borderRadius: 23,
	elevation: 12,
	aspectRatio: 1,
	backgroundColor: '#FFF',
	alignItems: 'center',
	justifyContent: 'space-around'
  },
  modalInputView: {
	flex: 1,
	width: '100%',
	alignItems: 'center',
	justifyContent: 'center',
  },
  modalInput: {
	width: '60%',
	fontSize: 22,
	textAlign: 'center',
	borderBottomWidth: 2,
	borderBottomColor: '#555555'
  },
  modalTitle: {
	flex: 1,
	fontSize: 22,
	color: '#121212',
	fontWeight: 'bold',
	textAlign: 'center',
	alignSelf: 'center',
	textAlignVertical: 'center',
	maxWidth: '80%'
  },
  modalButtonView: {
	flex: 1,
	width: '90%',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
  },
  modalCancelButton: {
	  flex: 1,
	  backgroundColor: '#747474',
	  alignItems: 'center',
	  justifyContent: 'center',
	  margin: 4,
	  padding: 6,
	  borderRadius: 12
  },
  modalCancelText: {
	color: '#FFF',
	fontWeight: 'bold',
	fontSize: 18,
  },
  modalSaveButton: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	margin: 4,
  },
  modalSaveText: {
	fontWeight: 'bold',
	fontSize: 22,
	textAlign: 'center'
  }
});
